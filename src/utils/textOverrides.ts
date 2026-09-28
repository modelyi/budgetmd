/**
 * 调研页「文字覆盖」store + 后端写回 + 导出固化
 * =============================================================================
 * 目的：页面上直接点编辑改文字（表概述 / ②字段说明 / ③规则要点 / ④适用情形 /
 * ⑤数据关系 / ⑥转换规则），保存时**优先写回服务器磁盘 XML**（开发期后端 =
 * vite 中间件 POST /api/save-text，见 scripts/saveTextPlugin.ts）—— AI 直接改
 * src/data/texts/*.xml 与人工在页面改，改的是同一份文字源；写盘后 dev server
 * watch 到变化 → HMR 整页刷新 → 页面显示磁盘上的最新文字；导出 spa.html 从磁盘
 * XML 构建，自然带上人工改动。
 * 后端不可用（导出的 spa.html 单文件、生产静态托管、未重启 dev 服务）→ 自动降级
 * 成浏览器 localStorage 覆盖（刷新不丢），渲染优先级 = localStorage 覆盖 >
 * XML 原文（src/data/texts/*.xml）> TS 兜底常量。
 * 另提供「导出文字」：XML 原文 + 覆盖值做文本级 CDATA/属性替换，打包成 zip 下载，
 * 解压覆盖磁盘 src/data/texts/*.xml 即完成降级改动的固化。
 *
 * 覆盖键约定：`${formCode}::${kind}::…`（见 textKey），例如
 *   · BB.1.1::overview                    —— 表概述
 *   · BB.1.1::field::contractCode#0::name —— ②字段说明的字段名（#n = 同 code 第 n 次出现）
 *       槽位：name（登记名/渲染名）、source（数据来源）、remark（其他说明）
 *   · BB.1.1::rule::0::form               —— ③规则要点·规则分组标题
 *   · BB.1.1::rule::0::point::2           —— ③规则要点·第 3 条要点
 *   · BB.1.1::applies::0 / notApplies::0  —— ④适用业务情形（适用 / 不适用）
 *   · BB.1.1::relation::summary           —— ⑤数据关系·总结
 *   · BB.1.1::relation::source::0::name|code|fields|relation —— ⑤上游来源行各列
 *   · BB.1.1::relation::output::0::target|path               —— ⑤下游输出行各列
 *   · BB.1.1::relation::keyRule::0        —— ⑤关键编制规则
 *   · BB.1.1::event::0::event|field|pl|bs|cf|source|entry|note —— ⑥转换规则各行
 *   · BB.1.1::noVoucher                   —— ⑥「不生成分录」说明文案
 *
 * 无法写回 XML 的文字（未登记 XML 的表、`::rulesBlock` 这类把多组规则合成一段的
 * 聚合键、文字里含 `]]>`）→ 后端返回 ok:false + reason，前端降级成 localStorage
 * 覆盖并在提示条里说明原因，导出 zip 时计入 unmappedKeys。
 *
 * 两端共用：本模块在 Node（tsx 跑生成脚本）下 import 不报错——localStorage / window /
 * document / import.meta.glob 全部做了存在性与 try/catch 兜底。
 */
import { useSyncExternalStore } from 'react';
import { patchXml, resolveSlotOriginal } from './textXmlPatch';
import { getFormText, parseFormTextXml, type FormText } from './xmlTexts';

/** localStorage 存储键（升级数据结构时改版本号即可，旧数据自动忽略） */
export const TEXT_OVERRIDE_STORAGE_KEY = 'budgetdemo:textOverrides:v1';

export type TextOverrideMap = Record<string, string>;

// ── 覆盖键 ───────────────────────────────────────────────────────────────────

/**
 * 覆盖键生成器（渲染端与导出端共用，避免手写字符串拼错）。
 * 键结构：`${formCode}::${kind}::…`，formCode 内不含 `::`，故可按 `::` 反解。
 */
export const textKey = {
  overview: (code: string) => `${code}::overview`,
  noVoucher: (code: string) => `${code}::noVoucher`,
  /** occ：同 fieldCode 在字段清单里的出现序号（从 0 起，对应 XML 同 code 的第 n 个节点） */
  field: (code: string, fieldCode: string, occ: number, slot: 'name' | 'source' | 'remark') =>
    `${code}::field::${fieldCode}#${occ}::${slot}`,
  ruleForm: (code: string, ruleIdx: number) => `${code}::rule::${ruleIdx}::form`,
  rulePoint: (code: string, ruleIdx: number, pointIdx: number) => `${code}::rule::${ruleIdx}::point::${pointIdx}`,
  /** ③关键规则要点整块编辑（一个编辑按钮，覆盖整个 rules 区块为纯文本） */
  rulesBlock: (code: string) => `${code}::rulesBlock`,
  applies: (code: string, idx: number) => `${code}::applies::${idx}`,
  notApplies: (code: string, idx: number) => `${code}::notApplies::${idx}`,
  relationSummary: (code: string) => `${code}::relation::summary`,
  relationSource: (code: string, idx: number, slot: 'name' | 'code' | 'fields' | 'relation') =>
    `${code}::relation::source::${idx}::${slot}`,
  relationOutput: (code: string, idx: number, slot: 'target' | 'path') =>
    `${code}::relation::output::${idx}::${slot}`,
  relationKeyRule: (code: string, idx: number) => `${code}::relation::keyRule::${idx}`,
  event: (
    code: string,
    idx: number,
    slot: 'event' | 'field' | 'pl' | 'bs' | 'cf' | 'source' | 'entry' | 'note',
  ) => `${code}::event::${idx}::${slot}`,
};

// ── store（模块级 pub/sub + localStorage 持久化）─────────────────────────────

const hasLocalStorage = (() => {
  try {
    return typeof localStorage !== 'undefined' && localStorage !== null;
  } catch {
    return false;
  }
})();

function loadOverrides(): TextOverrideMap {
  if (!hasLocalStorage) return {};
  try {
    const raw = localStorage.getItem(TEXT_OVERRIDE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const out: TextOverrideMap = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === 'string') out[k] = v;
    }
    return out;
  } catch (err) {
    console.warn('[textOverrides] 读取 localStorage 失败，按无覆盖处理', err);
    return {};
  }
}

/** 当前覆盖表（始终整表替换，不做原地改写 → useSyncExternalStore 快照引用稳定） */
let overrides: TextOverrideMap = loadOverrides();

const listeners = new Set<() => void>();

function persist(next: TextOverrideMap): void {
  if (!hasLocalStorage) return;
  try {
    localStorage.setItem(TEXT_OVERRIDE_STORAGE_KEY, JSON.stringify(next));
  } catch (err) {
    console.warn('[textOverrides] 写入 localStorage 失败（改动仅本次会话有效）', err);
  }
}

function commit(next: TextOverrideMap): void {
  overrides = next;
  persist(next);
  listeners.forEach((l) => l());
}

/** 订阅覆盖表变化（配合 useSyncExternalStore，也可自行订阅） */
export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** 当前覆盖表快照（引用仅在改动时变化） */
export function getOverridesSnapshot(): TextOverrideMap {
  return overrides;
}

// 多标签页同步：其它标签改了同一键时刷新本地快照
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (ev) => {
    if (ev.key !== TEXT_OVERRIDE_STORAGE_KEY) return;
    overrides = loadOverrides();
    listeners.forEach((l) => l());
  });
}

/** 读一个覆盖值；无覆盖返回 undefined */
export function getOverride(key: string | undefined | null): string | undefined {
  if (!key) return undefined;
  return overrides[key];
}

/** 全部覆盖（key → 文字） */
export function getAllOverrides(): TextOverrideMap {
  return overrides;
}

/** 写一个覆盖值（空白值视为删除覆盖；存的是 trim 后的文字，与 XML 解析端 trimValues 口径一致） */
export function setOverride(key: string, value: string): void {
  if (!key) return;
  const v = value.trim();
  if (!v) {
    clearOverride(key);
    return;
  }
  if (overrides[key] === v) return;
  commit({ ...overrides, [key]: v });
}

/** 清除一个覆盖（恢复 XML 原文 / TS 兜底） */
export function clearOverride(key: string): void {
  if (!key || overrides[key] === undefined) return;
  const next = { ...overrides };
  delete next[key];
  commit(next);
}

/** 清除全部覆盖（回到磁盘 XML 原文） */
export function clearAllOverrides(): void {
  if (Object.keys(overrides).length === 0) return;
  commit({});
}

/** 订阅整张覆盖表（组件内任何改文字都会触发重渲染） */
export function useAllOverrides(): TextOverrideMap {
  return useSyncExternalStore(subscribe, getOverridesSnapshot, getOverridesSnapshot);
}

/** 取某键的生效文字：有覆盖用覆盖，否则用兜底 */
export function useTextOverride(key: string | undefined, fallback: string): string {
  const map = useAllOverrides();
  const v = key ? map[key] : undefined;
  return v === undefined ? fallback : v;
}

// ── 导出固化：XML 原文 + 覆盖值 → 合并后的 XML 文件 ──────────────────────────

/** 前端（Vite）打包期收集 XML 原文；Node 下为空表（导出仅在浏览器触发） */
const RAW_XML: Record<string, string> = (() => {
  try {
    return import.meta.glob('/src/data/texts/*.xml', { as: 'raw', eager: true }) as Record<string, string>;
  } catch {
    return {};
  }
})();

function codeFromTextPath(path: string): string {
  const m = /([^/]+)\.xml$/i.exec(path);
  return m ? m[1] : '';
}

export interface MergedXmlFile {
  /** 表单编码（= XML 根节点 code 或文件名） */
  code: string;
  /** 磁盘相对路径（/src/data/texts/BB.1.1.xml） */
  path: string;
  /** 合并后的 XML 全文 */
  xml: string;
  /** 成功定位并替换的覆盖键 */
  mergedKeys: string[];
  /** 未能定位（原文节点缺失/文字与 XML 不一致）的覆盖键 */
  unmappedKeys: string[];
}

export interface TextExportResult {
  /** 参与合并且有改动的 XML 文件 */
  files: MergedXmlFile[];
  /** 无法定位到 XML 的覆盖键（含未登记 XML 的表） */
  unmappedKeys: string[];
  /** 覆盖总条数 */
  totalOverrides: number;
  /** 下载文件名 */
  fileName: string;
}

/*
 * 文本级定位 / 替换（resolveSlotOriginal · patchXml · findOriginal · maskComments ·
 * escapeXmlAttr · CDATA_UNSAFE）已抽到 src/utils/textXmlPatch.ts——纯函数、无 react 依赖，
 * 供本模块（导出固化）与开发期写回中间件（scripts/saveTextPlugin.ts）共用。
 */

/** 把 localStorage 覆盖值与 XML 原文合并，产出每个受影响 XML 的完整新内容
 * @param rawTexts 可选：原始 XML 映射（路径 → 原文）；缺省用浏览器 glob 收集的 src/data/texts/*.xml
 *                 —— 供 Node 侧（tsx 验证脚本）传入 fs 读到的 XML 做离线校验
 */
export function buildMergedXmlFiles(rawTexts?: Record<string, string>): { files: MergedXmlFile[]; unmappedKeys: string[]; totalOverrides: number } {
  const all = getAllOverrides();
  const keys = Object.keys(all);
  if (keys.length === 0) return { files: [], unmappedKeys: [], totalOverrides: 0 };

  // 覆盖键按表单编码分组
  const keysByCode = new Map<string, string[]>();
  for (const key of keys) {
    const code = key.split('::')[0];
    if (!code) continue;
    const list = keysByCode.get(code);
    if (list) list.push(key);
    else keysByCode.set(code, [key]);
  }

  // 编码 → 原始 XML（文件名兜底：后台专属 XML 用文件名当编码）
  const rawByCode = new Map<string, { path: string; raw: string }>();
  for (const [path, raw] of Object.entries(rawTexts ?? RAW_XML)) {
    rawByCode.set(codeFromTextPath(path), { path, raw });
  }

  const files: MergedXmlFile[] = [];
  const unmapped: string[] = [];

  for (const [code, codeKeys] of keysByCode) {
    const hit = rawByCode.get(code);
    if (!hit) {
      unmapped.push(...codeKeys);
      continue;
    }
    let ft: FormText;
    try {
      ft = parseFormTextXml(hit.raw, code);
    } catch (err) {
      console.warn(`[textOverrides] 解析 ${hit.path} 失败，跳过硬编码固化`, err);
      unmapped.push(...codeKeys);
      continue;
    }

    const candidates: { key: string; original: string; next: string; attr: boolean; attrName?: string }[] = [];
    const unresolvedKeys: string[] = [];
    for (const key of codeKeys) {
      const slot = resolveSlotOriginal(ft, key);
      if (!slot) {
        unresolvedKeys.push(key);
        continue;
      }
      candidates.push({ key, original: slot.original, next: all[key], attr: slot.attr, attrName: slot.attrName });
    }
    if (candidates.length === 0) {
      unmapped.push(...unresolvedKeys);
      continue;
    }

    const { xml, appliedKeys, skippedKeys } = patchXml(hit.raw, candidates);
    // 定位到原文但文本级替换没命中（原文重复且被占用、文字含 ]]> 等）→ 计入未固化
    const unmappedKeys = [...unresolvedKeys, ...skippedKeys];
    unmapped.push(...unmappedKeys);

    files.push({
      code,
      path: hit.path,
      xml,
      mergedKeys: appliedKeys,
      unmappedKeys,
    });
  }

  files.sort((x, y) => x.code.localeCompare(y.code));
  return { files, unmappedKeys: unmapped, totalOverrides: keys.length };
}

// ── 下载（zip：合并后的 XML + 覆盖清单；零依赖极简 zip writer，仅 store 不压缩）──

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function zipStore(entries: { name: string; data: Uint8Array }[]): Blob {
  const enc = new TextEncoder();
  const d = new Date();
  const dosTime = (d.getHours() << 11) | (d.getMinutes() << 5) | Math.floor(d.getSeconds() / 2);
  const dosDate = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();

  const locals: Uint8Array[] = [];
  const centrals: Uint8Array[] = [];
  let offset = 0;

  for (const e of entries) {
    const nameBytes = enc.encode(e.name);
    const crc = crc32(e.data);
    const local = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0x0800, true); // UTF-8 文件名标记
    lv.setUint16(8, 0, true); // 存储方式：不压缩
    lv.setUint16(10, dosTime, true);
    lv.setUint16(12, dosDate, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, e.data.length, true);
    lv.setUint32(22, e.data.length, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);
    local.set(nameBytes, 30);
    locals.push(local, e.data);

    const central = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0x0800, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, dosTime, true);
    cv.setUint16(14, dosDate, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, e.data.length, true);
    cv.setUint32(24, e.data.length, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, 0, true);
    cv.setUint32(42, offset, true);
    central.set(nameBytes, 46);
    centrals.push(central);

    offset += local.length + e.data.length;
  }

  const centralSize = centrals.reduce((s, c) => s + c.length, 0);
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, entries.length, true);
  ev.setUint16(10, entries.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);

  return new Blob([...locals, ...centrals, eocd], { type: 'application/zip' });
}

function stamp(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.style.position = 'fixed';
  a.style.left = '-9999px';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

const INSTALL_TXT = [
  '文字改动固化包（由调研页「导出文字」按钮生成）',
  '',
  '1. 解压后，把 src/data/texts 下的 *.xml 覆盖到项目同名目录（路径一致，直接替换）；',
  '2. 覆盖后刷新页面：页面渲染会回到「XML 原文」口径，此时可点页面上的「清空改动」清掉浏览器覆盖值；',
  '3. text-overrides.json 是本次导出时的浏览器覆盖清单（key → 文字），仅作备份与核对；',
  '4. 若清单里还有未能定位到 XML 的键（unmapped），说明该表未登记 XML、原文与 XML 不一致，',
  '   或改动文字里含 CDATA 结束符 ]]>（无法写回单个 CDATA），需人工处理。',
  '',
  '注意：XML 内长文本一律 CDATA 包裹，短标识（code/name/source/fields/target/event/field/form）为属性。',
].join('\n');

/**
 * 导出：合并后的 XML（打包 zip）+ 覆盖清单 JSON。
 * 无任何覆盖时不下载，返回 files=[] 让调用方提示。
 * @param rawTexts 可选：原始 XML 映射（路径 → 原文），仅离线校验用；缺省用浏览器 glob 结果
 */
export function exportTextOverrides(rawTexts?: Record<string, string>): TextExportResult {
  const { files, unmappedKeys, totalOverrides } = buildMergedXmlFiles(rawTexts);
  const fileName = `texts-xml-${stamp()}.zip`;
  if (totalOverrides === 0 || files.length === 0) {
    return { files: [], unmappedKeys, totalOverrides, fileName: '' };
  }

  const manifest = {
    generator: 'budgetdemo 调研页「导出文字」',
    exportedAt: new Date().toISOString(),
    storageKey: TEXT_OVERRIDE_STORAGE_KEY,
    totalOverrides,
    mergedFiles: files.map((f) => ({ code: f.code, path: f.path, mergedKeys: f.mergedKeys })),
    unmappedKeys,
    overrides: getAllOverrides(),
  };

  const enc = new TextEncoder();
  const entries = [
    ...files.map((f) => ({ name: f.path.replace(/^\//, ''), data: enc.encode(f.xml) })),
    { name: 'text-overrides.json', data: enc.encode(JSON.stringify(manifest, null, 2)) },
    { name: 'INSTALL.txt', data: enc.encode(INSTALL_TXT) },
  ];
  downloadBlob(zipStore(entries), fileName);
  return { files, unmappedKeys, totalOverrides, fileName };
}

// ── 后端写回：页面改动直接落到磁盘 src/data/texts/<formCode>.xml ────────────────
/**
 * 背景：文字源就是磁盘上的 src/data/texts/*.xml（AI 直接改文件、人工在页面改，都改这一份）。
 * 页面「✎ 编辑」保存 → 优先 POST 到开发期后端中间件（见 scripts/saveTextPlugin.ts，
 * 由 vite.config.ts 注册）把新值写回磁盘 XML；写盘后 dev server watch 到变化 → HMR 整页刷新
 * → 页面直接显示磁盘上的最新文字（导出的 spa.html 从磁盘 XML 构建，自然同步最新）。
 *
 * 服务器不可用（导出的 spa.html 单文件 / 生产静态托管 / 未重启 dev 服务）→ 降级成
 * localStorage 覆盖，行为与改造前完全一致（仍可用「导出文字」把覆盖合并回 XML 包）。
 *
 * 三层「改动」状态：
 *   · overrides（localStorage 覆盖）——服务器不可用时的暂存，渲染优先级最高，刷新不丢；
 *   · serverOriginals（已写入磁盘 XML）——记录「首次写入前的原文」，供页面「恢复原文」
 *     把 XML 还原；键一旦固化到 XML，下次页面加载时浏览器覆盖会自动清掉
 *     （pruneSyncedOverrides：覆盖值与 XML 文字一致 = 已固化，覆盖是冗余的）。
 */

/** 写回中间件响应体（见 scripts/saveTextPlugin.ts） */
export interface SaveTextApiResponse {
  ok: boolean;
  /** 失败原因：bad-request / no-xml-file / unmapped / cdata-unsafe / not-found / parse-error … */
  reason?: string;
  error?: string;
  /** 写入前该节点的原文 */
  original?: string;
  attr?: boolean;
  /** 是否真的改了盘（false = 该节点内容与写入值一致，未写文件） */
  changed?: boolean;
  /** 落盘文件（相对项目根，如 src/data/texts/BB.1.1.xml） */
  path?: string;
}

/** 写回接口（vite 中间件只注册在 dev server 上） */
export const TEXT_SAVE_ENDPOINT = '/api/save-text';

/** 已写入磁盘 XML 的键 → 首次写入前的原文（用于「恢复原文」把 XML 还原） */
export const TEXT_SERVER_ORIGINALS_KEY = 'budgetdemo:textServerOriginals:v1';

export type TextServerOriginalMap = Record<string, string>;

function loadServerOriginals(): TextServerOriginalMap {
  if (!hasLocalStorage) return {};
  try {
    const raw = localStorage.getItem(TEXT_SERVER_ORIGINALS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const out: TextServerOriginalMap = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === 'string') out[k] = v;
    }
    return out;
  } catch (err) {
    console.warn('[textOverrides] 读取「已写入 XML」记录失败，按空处理', err);
    return {};
  }
}

let serverOriginals: TextServerOriginalMap = loadServerOriginals();

function persistServerOriginals(next: TextServerOriginalMap): void {
  if (!hasLocalStorage) return;
  try {
    localStorage.setItem(TEXT_SERVER_ORIGINALS_KEY, JSON.stringify(next));
  } catch (err) {
    console.warn('[textOverrides] 写入「已写入 XML」记录失败（仅影响还原按钮）', err);
  }
}

function commitServerOriginals(next: TextServerOriginalMap): void {
  serverOriginals = next;
  persistServerOriginals(next);
  listeners.forEach((l) => l());
}

/** 已写入磁盘 XML 的键 → 首次写入前的原文 */
export function getServerOriginals(): TextServerOriginalMap {
  return serverOriginals;
}

function getServerOriginalsSnapshot(): TextServerOriginalMap {
  return serverOriginals;
}

function rememberServerOriginal(key: string, original: string): void {
  if (serverOriginals[key] !== undefined) return;
  commitServerOriginals({ ...serverOriginals, [key]: original });
}

function forgetServerOriginal(key: string): void {
  if (serverOriginals[key] === undefined) return;
  const next = { ...serverOriginals };
  delete next[key];
  commitServerOriginals(next);
}

// 页面判定「这处文字被改过」的合并视图：浏览器覆盖 ∪ 已写入 XML
// （快照只在两张表引用变化时重建，保证 useSyncExternalStore 的引用稳定）
let editedCache: Record<string, true> = {};
let editedDeps: [TextOverrideMap, TextServerOriginalMap] | null = null;

export function getEditedSnapshot(): Record<string, true> {
  if (editedDeps && editedDeps[0] === overrides && editedDeps[1] === serverOriginals) return editedCache;
  const out: Record<string, true> = {};
  for (const k of Object.keys(overrides)) out[k] = true;
  for (const k of Object.keys(serverOriginals)) out[k] = true;
  editedCache = out;
  editedDeps = [overrides, serverOriginals];
  return out;
}

/** 订阅「被改过的键」合并视图（决定「已改」标记与「恢复原文」按钮是否显示） */
export function useTextEdited(): Record<string, true> {
  return useSyncExternalStore(subscribe, getEditedSnapshot, getEditedSnapshot);
}

/**
 * 清掉「覆盖值与磁盘 XML 文字一致」的浏览器覆盖：
 * 这类覆盖是页面保存时写盘留下的冗余（写盘后刷新，XML 已经是新值），
 * 留在浏览器里只会挡住后续 AI 对同一节点的修改 → 页面加载时自清。
 */
function pruneSyncedOverrides(): void {
  const keys = Object.keys(overrides);
  if (keys.length === 0) return;
  const next = { ...overrides };
  let dropped = 0;
  for (const key of keys) {
    const ft = getFormText(key.split('::')[0]);
    if (!ft) continue;
    const slot = resolveSlotOriginal(ft, key);
    if (slot && slot.original === overrides[key]) {
      delete next[key];
      dropped += 1;
    }
  }
  if (dropped > 0) commit(next);
}

if (typeof window !== 'undefined') pruneSyncedOverrides();

// ── 保存提示（页面顶部一行，说明这次改动落在服务器 XML 还是浏览器暂存）────────

let saveNotice: string | null = null;
let saveNoticeTimer: ReturnType<typeof setTimeout> | undefined;

export function getSaveNotice(): string | null {
  return saveNotice;
}

/** 最近一次文字保存的提示（null = 无）。dev server 写盘后整页刷新，提示随之消失 */
export function useTextSaveNotice(): string | null {
  return useSyncExternalStore(subscribe, getSaveNotice, getSaveNotice);
}

function setSaveNotice(msg: string, ttlMs = 10000): void {
  saveNotice = msg;
  if (saveNoticeTimer) clearTimeout(saveNoticeTimer);
  saveNoticeTimer = setTimeout(() => {
    saveNotice = null;
    listeners.forEach((l) => l());
  }, ttlMs);
  listeners.forEach((l) => l());
}

// ── 中间件调用 ───────────────────────────────────────────────────────────────

/** 后端可用性：unknown = 还没试过（首次保存时探测）；down = 本会话不再试（静态页/无中间件） */
let backendState: 'unknown' | 'up' | 'down' = 'unknown';

export function getTextBackendState(): 'unknown' | 'up' | 'down' {
  return backendState;
}

/** 重新探测后端（中间件重启后想再写盘时可调用；正常无需调用） */
export function resetTextBackendState(): void {
  backendState = 'unknown';
}

const SAVE_TIMEOUT_MS = 8000;

/**
 * 调写回中间件。返回值：
 *   · SaveTextApiResponse —— 中间件答复（ok=false 时 reason 说明为何没写盘，可能是定位失败）；
 *   · null               —— 中间件不可用（静态页 / 未重启 dev 服务 / 超时 / 非 JSON 响应），调用方降级。
 */
async function postSaveText(key: string, value: string): Promise<SaveTextApiResponse | null> {
  if (typeof fetch !== 'function') return null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), SAVE_TIMEOUT_MS);
  try {
    const res = await fetch(TEXT_SAVE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formCode: key.split('::')[0], key, value }),
      signal: ctrl.signal,
    });
    // 静态托管（spa.html）常见答复：404 / 405，或 SPA fallback 返回 index.html（200 但非 JSON）
    const data = (await res.json().catch(() => null)) as SaveTextApiResponse | null;
    if (res.status === 404 || res.status === 405 || res.status === 501 || !data || typeof data.ok !== 'boolean') {
      backendState = 'down';
      return null;
    }
    backendState = 'up';
    return data;
  } catch {
    backendState = 'down';
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** 失败原因 → 中文提示（写盘没成功时告诉用户为什么，以及该怎么固化） */
const SAVE_REASON_TEXT: Record<string, string> = {
  'empty-value': '新值为空',
  unmapped: '这处文字在 XML 里定位不到对应节点（该表未登记 XML，或属于「整块规则要点」这类聚合文字）',
  'cdata-unsafe': '文字里含 CDATA 结束符 ]]>，无法写入 XML',
  'code-mismatch': '覆盖键的表单编码与 XML 文件不一致（拿错文件）',
  'not-found': 'XML 原文与页面文字不一致，定位不到可替换的原文',
  'parse-error': 'XML 解析失败',
  'no-xml-file': 'src/data/texts 下没有该表对应的 XML 文件',
  'bad-request': '请求参数不合法',
  'backend-unavailable': '写回中间件不可用（静态页 / dev server 未重启使插件生效）',
};

function reasonText(reason: string | undefined): string {
  if (!reason) return SAVE_REASON_TEXT['backend-unavailable'];
  return SAVE_REASON_TEXT[reason] ?? reason;
}

// ── 对外：保存 / 还原一处文字 ─────────────────────────────────────────────────

export type TextSaveMode =
  /** 已写回磁盘 XML（后端可用） */
  | 'server'
  /** 后端不可用 → 存浏览器 localStorage 覆盖（降级，行为同改造前） */
  | 'local'
  /** 与原文一致 / 已清除，未写盘 */
  | 'cleared';

export interface TextSaveOutcome {
  mode: TextSaveMode;
  /** server：是否真的改了盘（false = 内容与磁盘一致） */
  changed?: boolean;
  /** local/cleared：降级或未写盘的原因 */
  reason?: string;
  error?: string;
  /** 写入前该节点的原文（后端返回） */
  original?: string;
  /** 落盘文件（相对项目根） */
  path?: string;
}

/**
 * 保存一处文字（页面「✎ 编辑」→ 保存）。
 * 优先级：写回服务器 XML（AI 与人工同一文字源）> 降级 localStorage 覆盖。
 * 与原文一致或清空 → 视为「改回原文」，不写盘，只清浏览器覆盖。
 */
export async function saveTextEdit(
  key: string | undefined,
  original: string | undefined,
  next: string,
): Promise<TextSaveOutcome> {
  if (!key) return { mode: 'cleared', reason: 'no-key' };
  const v = next.trim();
  const before = (original ?? '').trim();

  if (!v || v === before) {
    // 改回了原文：XML 本来就该是这个值，不必写盘（若浏览器里暂存过覆盖则清掉）
    clearOverride(key);
    setSaveNotice(v ? '该处文字与原文一致，未写入 XML。' : '已清空该处改动（文字回到 XML 原文）。');
    const hadServer = serverOriginals[key] !== undefined;
    if (hadServer && v === serverOriginals[key]) forgetServerOriginal(key);
    return { mode: 'cleared', reason: v ? 'same-as-original' : 'empty-value' };
  }

  const res = await postSaveText(key, v);
  if (res && res.ok) {
    if (res.original) rememberServerOriginal(key, res.original);
    // 写盘成功：XML 已是最新，这里同时留一份「本次会话的覆盖」，让页面在 dev server 自动刷新
    // 之前（或 HMR 关闭时）也显示新值；下次加载时 pruneSyncedOverrides 会发现它与 XML 一致而清掉
    // ——即「固化到 XML 后浏览器不再持有覆盖」，只是不抢在刷新前把文字闪回旧值。
    setOverride(key, v);
    if (v === serverOriginals[key]) forgetServerOriginal(key);
    const where = res.path ? `（${res.path}）` : '';
    setSaveNotice(
      res.changed === false
        ? `该处文字在 XML 里已是这个值，无需改动${where}。`
        : `已写回服务器 XML${where}，页面将自动刷新显示最新文字。`,
    );
    return { mode: 'server', changed: res.changed !== false, original: res.original, path: res.path };
  }

  // 降级：后端不可用或定位不到节点 → 存浏览器覆盖（与改造前完全一致）
  setOverride(key, v);
  const why = res ? reasonText(res.reason) : reasonText(undefined);
  setSaveNotice(`未写入服务器 XML：${why} → 改动已暂存浏览器（刷新不丢），可用「导出文字」固化。`);
  return { mode: 'local', reason: res?.reason ?? 'backend-unavailable', error: res?.error };
}

/**
 * 恢复一处文字到原文（页面「恢复原文」按钮）。
 * · 若该键曾写盘（有 serverOriginals 记录）→ 调中间件把 XML 节点还原成首次写入前的原文；
 * · 否则只需清掉浏览器覆盖。
 */
export async function clearTextEdit(key: string | undefined): Promise<TextSaveOutcome> {
  if (!key) return { mode: 'cleared', reason: 'no-key' };
  const pristine = serverOriginals[key];
  clearOverride(key);
  if (pristine === undefined) {
    setSaveNotice('已清除该处浏览器改动，文字回到 XML 原文。');
    return { mode: 'cleared', reason: 'local-only' };
  }
  const res = await postSaveText(key, pristine);
  if (res && res.ok) {
    forgetServerOriginal(key);
    setSaveNotice(`已把 XML 里该处文字还原为原文${res.path ? `（${res.path}）` : ''}，页面将自动刷新。`);
    return { mode: 'server', changed: res.changed !== false, original: pristine, path: res.path };
  }
  setSaveNotice(`未能还原 XML：${res ? reasonText(res.reason) : reasonText(undefined)}（浏览器改动已清除）。`);
  return { mode: 'local', reason: res?.reason ?? 'backend-unavailable', error: res?.error };
}

export interface ClearAllTextEditsResult {
  /** 已还原到 XML 原文的键数 */
  restored: number;
  /** 已清除的浏览器覆盖键数 */
  clearedLocal: number;
  /** 还原失败的键（服务器不可用等） */
  failed: string[];
}

/** 「清空改动」：已写盘的逐键还原 XML，浏览器覆盖一次性清空 */
export async function clearAllTextEdits(): Promise<ClearAllTextEditsResult> {
  const serverKeys = Object.keys(serverOriginals);
  const localKeys = Object.keys(overrides);
  const result: ClearAllTextEditsResult = { restored: 0, clearedLocal: 0, failed: [] };

  for (const key of serverKeys) {
    const pristine = serverOriginals[key];
    const res = await postSaveText(key, pristine);
    if (res && res.ok) {
      forgetServerOriginal(key);
      result.restored += 1;
    } else {
      result.failed.push(key);
    }
  }
  if (localKeys.length > 0) {
    const next = { ...overrides };
    for (const key of localKeys) delete next[key];
    commit(next);
    result.clearedLocal = localKeys.length;
  }
  return result;
}
