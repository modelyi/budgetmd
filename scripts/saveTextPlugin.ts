/**
 * 开发期「文字写回」中间件（Vite 插件）：POST /api/save-text 把页面编辑的文字写回磁盘 XML
 * =============================================================================
 * 目的：调研页「✎ 编辑」保存不再只进浏览器 localStorage，而是直接落到
 * src/data/texts/<formCode>.xml —— 与 AI 直接改 XML 文件用的是同一份文字源；
 * 写盘后 dev server watch 到 XML 变化 → HMR 整页刷新 → 页面显示最新文字；
 * 导出 spa.html（npm run build:spa）从磁盘 XML 构建，自然带上人工改动。
 *
 * 接口：
 *   POST /api/save-text   body JSON { formCode, key, value }
 *     · key   = 覆盖键（见 src/utils/textOverrides.ts 的 textKey），
 *               `${formCode}::…`，例：`BB.1.1::overview`、`BB.1.1::field::contractCode#0::name`
 *     · value = 新文字（trim 后写入；空值 = 参数不合法，拒绝）
 *     ← 200 { ok:true, path, original, attr, changed }
 *     ← 200 { ok:false, reason }  定位不到 / 含 ]]> / 无法替换 …（前端据此降级 localStorage）
 *     ← 400/404/405/413          参数不合法 / 文件不存在 / 方法不允许 / body 过大
 *   GET  /api/save-text   ← 200 { ok:true, endpoint, textsDir }（用于探活/curl 自检）
 *
 * 定位与替换逻辑复用 src/utils/textXmlPatch.applyOverrideToXml（纯函数，无 react 依赖，
 * 与前端「导出文字」固化走的是同一套：屏蔽注释、属性要求前置引号、同名 fieldCode 按 #occ 区分）。
 *
 * 另一路接口（T5 专项方案 Markdown 写回，纯 Markdown 文件是唯一基准源）：
 *   GET  /api/save-solution   ← 200 { ok:true, endpoint, solutionsDir }（探活/curl 自检）
 *   POST /api/save-solution   body JSON { key, content }
 *     · key     = 方案文件名去扩展名（如 `AA-内部关联交易方案`、`01-对外软硬件销售`）
 *     · content = 方案全文 Markdown（trim 后为空 = 拒绝）
 *     ← 200 { ok:true, path, changed }  /  { ok:false, error }
 *     只允许写**已存在**的 docs/solutions/<key>.md（不新建文件），防路径穿越；
 *     写盘后 dev server watch 到 .md 变化 → HMR 整页刷新 → 页面显示磁盘最新正文。
 *
 * 只注册在 dev server（apply:'serve'）：生产构建 / spa.html 静态页没有这个后端。
 * save-text 前端探测失败后降级 localStorage 覆盖；save-solution 前端明确提示未落盘
 * （方案正文不允许进浏览器缓存）。
 */
import type { IncomingMessage, ServerResponse } from 'node:http';
import { existsSync, readFileSync, renameSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';

import { applyOverrideToXml } from '../src/utils/textXmlPatch';

/** 文字源目录（相对项目根） */
export const TEXTS_REL_DIR = 'src/data/texts';

/** 请求体上限（一处文字不可能接近，纯粹防误发大包） */
const MAX_BODY_BYTES = 2 * 1024 * 1024;

/** 项目根 → src/data/texts 绝对路径 */
export function textsDirOf(root: string): string {
  return resolve(root, TEXTS_REL_DIR);
}

/**
 * 表单编码 → 磁盘 XML 路径。
 * 编码来自覆盖键前缀（= 文件名，如 `BB.1.1`、`AA.2-①`、`_statement-rules`），
 * 必须挡掉路径穿越（`../`、`/`、`\`、绝对路径）与空编码。
 */
export function resolveTextFile(root: string, formCode: string): string | null {
  const code = String(formCode ?? '').trim();
  if (!code) return null;
  if (code.includes('/') || code.includes('\\') || code.includes('\0') || code.includes('..')) return null;
  if (code.length > 120) return null;
  const dir = textsDirOf(root);
  const file = resolve(dir, `${code}.xml`);
  // 双保险：解析后的绝对路径必须还在文字源目录里
  if (file !== resolve(dir, `${code}.xml`) || !file.startsWith(dir + sep)) return null;
  return file;
}

export interface SaveTextApplyResult {
  ok: boolean;
  /** 落盘文件（相对项目根，如 src/data/texts/BB.1.1.xml） */
  path?: string;
  /** 写入前该节点的原文（前端用来记「恢复原文」目标） */
  original?: string;
  /** 命中位置是否 XML 属性 */
  attr?: boolean;
  /** 是否真的改了盘 */
  changed?: boolean;
  reason?: string;
  error?: string;
}

/** 真写盘：readFileSync → applyOverrideToXml → writeFileSync（先写临时文件再 rename，避免 watcher 读到半截） */
export function saveTextToDisk(root: string, formCode: string, key: string, value: string): SaveTextApplyResult {
  const file = resolveTextFile(root, formCode);
  if (!file) return { ok: false, reason: 'bad-request', error: `非法的表单编码：${formCode}` };
  if (!key.startsWith(`${formCode}::`)) {
    return { ok: false, reason: 'bad-request', error: `覆盖键与表单编码不匹配：${key}` };
  }
  if (!existsSync(file)) return { ok: false, reason: 'no-xml-file', error: `不存在 ${relative(root, file)}` };

  let raw: string;
  try {
    raw = readFileSync(file, 'utf-8');
  } catch (err) {
    return { ok: false, reason: 'parse-error', error: `读取失败：${err instanceof Error ? err.message : String(err)}` };
  }

  const applied = applyOverrideToXml(raw, key, value, formCode);
  if (!applied.ok || applied.xml === undefined) {
    return { ok: false, reason: applied.reason, error: applied.error };
  }

  const relPath = relative(root, file).split(sep).join('/');
  if (applied.changed === false) {
    return { ok: true, path: relPath, original: applied.original, attr: applied.attr, changed: false };
  }

  const tmp = `${file}.save-text-${process.pid}.tmp`;
  try {
    writeFileSync(tmp, applied.xml, 'utf-8');
    renameSync(tmp, file);
  } catch (err) {
    return { ok: false, reason: 'write-failed', error: `写入失败：${err instanceof Error ? err.message : String(err)}` };
  }
  return { ok: true, path: relPath, original: applied.original, attr: applied.attr, changed: true };
}

// ── T5 专项方案 Markdown 写回（docs/solutions/*.md）────────────────────────────

/** 方案正文目录（相对项目根）；T5 页签正文的唯一基准源 */
export const SOLUTIONS_REL_DIR = 'docs/solutions';

/** 项目根 → docs/solutions 绝对路径 */
export function solutionsDirOf(root: string): string {
  return resolve(root, SOLUTIONS_REL_DIR);
}

/**
 * 方案 key（文件名去 `.md`）→ 磁盘路径。
 * 挡掉路径穿越（`../`、`/`、`\`）、空字节、空 key 与隐藏文件名；
 * 「只改已有文件、不新建」的守卫在 saveSolutionToDisk（existsSync）。
 */
export function resolveSolutionFile(root: string, key: string): string | null {
  const k = String(key ?? '').trim();
  if (!k) return null;
  if (k.includes('/') || k.includes('\\') || k.includes('\0') || k.includes('..')) return null;
  if (k.startsWith('.') || k.length > 120) return null;
  const dir = solutionsDirOf(root);
  const file = resolve(dir, `${k}.md`);
  // 双保险：解析后的绝对路径必须还在方案目录里
  if (!file.startsWith(dir + sep)) return null;
  return file;
}

export interface SaveSolutionResult {
  ok: boolean;
  /** 落盘文件（相对项目根，如 docs/solutions/AA-内部关联交易方案.md） */
  path?: string;
  /** 是否真的改了盘（false = 内容与磁盘一致，未触碰文件） */
  changed?: boolean;
  error?: string;
}

/** 真写盘：readFileSync 原文件比对 → 内容有变才 writeFileSync（临时文件 + rename，避免 watcher 读到半截） */
export function saveSolutionToDisk(root: string, key: string, content: string): SaveSolutionResult {
  const file = resolveSolutionFile(root, key);
  if (!file) return { ok: false, error: `非法的方案名（含路径分隔符或穿越片段）：${JSON.stringify(key)}` };
  if (typeof content !== 'string' || !content.trim()) return { ok: false, error: '方案内容为空，拒绝写入' };
  if (!existsSync(file)) {
    return { ok: false, error: `方案文件不存在：${SOLUTIONS_REL_DIR}/${key}.md（页面写回只改已有文件，不新建）` };
  }
  let before: string;
  try {
    before = readFileSync(file, 'utf-8');
  } catch (err) {
    return { ok: false, error: `读取失败：${err instanceof Error ? err.message : String(err)}` };
  }
  const relPath = relative(root, file).split(sep).join('/');
  if (before === content) return { ok: true, path: relPath, changed: false };

  const tmp = `${file}.save-solution-${process.pid}.tmp`;
  try {
    writeFileSync(tmp, content, 'utf-8');
    renameSync(tmp, file);
  } catch (err) {
    return { ok: false, error: `写入失败：${err instanceof Error ? err.message : String(err)}` };
  }
  return { ok: true, path: relPath, changed: true };
}

function sendJson(res: ServerResponse, status: number, payload: unknown): void {
  const body = JSON.stringify(payload);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(body);
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolveBody, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('body-too-large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf-8')));
    req.on('error', reject);
  });
}

async function handleSaveText(server: ViteDevServer, req: IncomingMessage, res: ServerResponse): Promise<void> {
  const root = server.config.root;
  const method = (req.method ?? 'GET').toUpperCase();

  if (method === 'GET' || method === 'HEAD') {
    sendJson(res, 200, {
      ok: true,
      endpoint: '/api/save-text',
      textsDir: relative(root, textsDirOf(root)).split(sep).join('/'),
      hint: 'POST { formCode, key, value } 写回磁盘 XML',
    });
    return;
  }
  if (method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    sendJson(res, 405, { ok: false, reason: 'bad-request', error: `不支持的方法：${method}` });
    return;
  }

  let body: string;
  try {
    body = await readBody(req);
  } catch (err) {
    sendJson(res, 413, {
      ok: false,
      reason: 'bad-request',
      error: err instanceof Error && err.message === 'body-too-large' ? '请求体过大' : '读取请求体失败',
    });
    return;
  }

  let parsed: { formCode?: unknown; key?: unknown; value?: unknown };
  try {
    parsed = JSON.parse(body) as typeof parsed;
  } catch {
    sendJson(res, 400, { ok: false, reason: 'bad-request', error: '请求体不是合法 JSON' });
    return;
  }

  const key = typeof parsed.key === 'string' ? parsed.key.trim() : '';
  const value = typeof parsed.value === 'string' ? parsed.value : '';
  // 表单编码以覆盖键前缀为准（单一事实源），请求里带了就必须一致
  const formCode = key.split('::')[0] ?? '';
  const claimed = typeof parsed.formCode === 'string' ? parsed.formCode.trim() : '';
  if (!key || !formCode) {
    sendJson(res, 400, { ok: false, reason: 'bad-request', error: '缺少 key（覆盖键）' });
    return;
  }
  if (claimed && claimed !== formCode) {
    sendJson(res, 400, {
      ok: false,
      reason: 'bad-request',
      error: `formCode（${claimed}）与覆盖键前缀（${formCode}）不一致`,
    });
    return;
  }
  if (!value.trim()) {
    sendJson(res, 400, { ok: false, reason: 'empty-value', error: '新值为空：还原原文请发送原文内容' });
    return;
  }

  const result = saveTextToDisk(root, formCode, key, value);
  if (!result.ok) {
    const status = result.reason === 'unmapped' || result.reason === 'not-found' || result.reason === 'cdata-unsafe' ? 200 : 400;
    console.warn(`[save-text] 未写入：${key} —— ${result.reason}${result.error ? `（${result.error}）` : ''}`);
    sendJson(res, status === 200 ? 200 : 400, {
      ok: false,
      reason: result.reason,
      error: result.error,
      original: result.original,
    });
    return;
  }

  console.log(
    `[save-text] ${result.changed ? '已写入' : '内容一致未改动'} ${result.path} ← ${key}（${value.trim().length} 字）`,
  );
  sendJson(res, 200, {
    ok: true,
    path: result.path,
    original: result.original,
    attr: result.attr,
    changed: result.changed,
  });
}

async function handleSaveSolution(server: ViteDevServer, req: IncomingMessage, res: ServerResponse): Promise<void> {
  const root = server.config.root;
  const method = (req.method ?? 'GET').toUpperCase();

  if (method === 'GET' || method === 'HEAD') {
    sendJson(res, 200, {
      ok: true,
      endpoint: '/api/save-solution',
      solutionsDir: relative(root, solutionsDirOf(root)).split(sep).join('/'),
      hint: 'POST { key, content } 写回磁盘 Markdown（docs/solutions/<key>.md，只改已有文件）',
    });
    return;
  }
  if (method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    sendJson(res, 405, { ok: false, error: `不支持的方法：${method}` });
    return;
  }

  let body: string;
  try {
    body = await readBody(req);
  } catch (err) {
    sendJson(res, 413, {
      ok: false,
      error: err instanceof Error && err.message === 'body-too-large' ? '请求体过大' : '读取请求体失败',
    });
    return;
  }

  let parsed: { key?: unknown; content?: unknown };
  try {
    parsed = JSON.parse(body) as typeof parsed;
  } catch {
    sendJson(res, 400, { ok: false, error: '请求体不是合法 JSON' });
    return;
  }

  const key = typeof parsed.key === 'string' ? parsed.key.trim() : '';
  const content = typeof parsed.content === 'string' ? parsed.content : '';
  if (!key) {
    sendJson(res, 400, { ok: false, error: '缺少 key（方案文件名去扩展名）' });
    return;
  }

  const result = saveSolutionToDisk(root, key, content);
  if (!result.ok) {
    console.warn(`[save-solution] 未写入：${key} —— ${result.error}`);
    sendJson(res, 400, { ok: false, error: result.error });
    return;
  }
  console.log(`[save-solution] ${result.changed ? '已写入' : '内容一致未改动'} ${result.path}（${content.length} 字）`);
  sendJson(res, 200, { ok: true, path: result.path, changed: result.changed });
}

/** 写回插件（dev server 专用） */
export function saveTextPlugin(): Plugin {
  return {
    name: 'budgetdemo:save-text',
    apply: 'serve',
    configureServer(server) {
      // 启动时确保文字源目录存在（缺目录时中间件仍可用 GET 探活）
      const dir = textsDirOf(server.config.root);
      if (!existsSync(dir)) {
        try {
          mkdirSync(dir, { recursive: true });
        } catch {
          /* 交后端返回 no-xml-file，不影响启动 */
        }
      }
      server.middlewares.use('/api/save-text', (req, res) => {
        void handleSaveText(server, req, res).catch((err) => {
          console.error('[save-text] 处理请求异常', err);
          if (!res.headersSent) sendJson(res, 500, { ok: false, reason: 'write-failed', error: String(err) });
          else res.end();
        });
      });
      console.log(`[save-text] 已挂载 POST /api/save-text → ${relative(server.config.root, dir) || dir}`);

      // T5 专项方案 Markdown 写回：docs/solutions/<key>.md（只改已有文件）
      const solDir = solutionsDirOf(server.config.root);
      if (!existsSync(solDir)) {
        try {
          mkdirSync(solDir, { recursive: true });
        } catch {
          /* 交后端返回文件不存在，不影响启动 */
        }
      }
      server.middlewares.use('/api/save-solution', (req, res) => {
        void handleSaveSolution(server, req, res).catch((err) => {
          console.error('[save-solution] 处理请求异常', err);
          if (!res.headersSent) sendJson(res, 500, { ok: false, error: String(err) });
          else res.end();
        });
      });
      console.log(
        `[save-solution] 已挂载 POST /api/save-solution → ${relative(server.config.root, solDir).split(sep).join('/')}`,
      );
    },
  };
}

export default saveTextPlugin;
