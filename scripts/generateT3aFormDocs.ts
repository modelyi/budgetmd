/**
 * T3A/T3B 编制套表 · 表单文档生成脚本（Markdown + 内嵌 HTML 表样）
 * =============================================================================
 * 对当前范围（--scope t3a|multi|t4，缺省 t3a）内的每个表单生成一篇 Markdown 文档：
 *   · t3a（缺省）：T3A 范围（BA/BB/BF/BO 组，剔除原型隐藏集 PROTOTYPE_HIDDEN_CODES
 *     中的表单），37 篇 → docs/formdocs/<表单编码>.md；
 *   · multi：T3B 范围（= T3A 37 篇 + 6 个多主体专属表单），43 篇 → docs/formdocs-multi/，
 *     并关闭两级原型隐藏过滤（表单级 6 项由清单纳入；子表级 BB.1.2.d / BB.3.1.D /
 *     BB.3.3.D 的表样段与字段分节恢复，与页面 multi 模式一致）；
 *   · t4：T4 基础静态数据范围（AA/AB/AM 组），29 篇 → docs/formdocs-master/，
 *     本就无原型隐藏集，隐藏过滤字段对其不生效（与页面 T4 页签目录一致）。
 *
 * 铁律：**内容逐字取自 XML 文字源，一字不改**——不润色、不重写、不增删口径；
 * 「系统带出」等技术词属原文，保留不动。表样部分由 src/data/sheets/<code>.json
 * 表样分片转换为内嵌 HTML <table>（rowspan/colspan），复杂表头（两行表头/
 * 【全年合计】+【1~12月】时间组/度量子列）由 HTML 表格表达；沿用
 * generateT3aHtmlSheetDemo.ts 的转换逻辑，列覆盖断言升级为「占用网格」算法
 * （分片行内单元格会因上方合并区域占位而缺格，与 HTML rowspan 语义一致，
 * 不能用 sum(colSpan)==colCount 校验，须按占用网格展开断言）。
 *
 * 范围口径（与页面 T3A/T3B Tab 一致）：
 *   · 主 Tab 分组 = BA/BB/BF/BO（App.tsx TABS groups；BJ.* 页面归编入 BF 组）；
 *   · 文档按「表单」一篇（页面目录登记的表单条目，父子表 Tab 不单独成篇）；
 *   · t3a 剔除 prototype 隐藏集（ResearchSummaryView PROTOTYPE_HIDDEN_CODES）：
 *     BAA.11、BB.1.2.d、BB.3.1.D、BB.3.3.D、BB.4.2.b、BB.4.2.b.1（随 BB.4.2.b
 *     隐藏）、BJ.C（整组，连带 BJ.C.* 子表）、BJ.C.R、BO.ELIM。
 *     表单级文档中，隐藏子表的表样段同样不生成（与页面 Tab 切换器在
 *     prototype 模式下隐藏该 Tab 一致）；
 *   · multi 关闭两级隐藏过滤：表单级 6 项由 MULTI_FORM_CODES 直接纳入，子表级
 *     3 项恢复表样段与字段分节（与页面 multi 模式一致；BJ.C.R 无表样分片，
 *     生成器 existsSync 优雅跳过——其文档无「① 表样」节，属预期）。
 *
 * 每篇文档结构（固定，章节顺序与调研页 ResearchSummaryView 完全一致，表样置首）：
 *   H1 表单编码+名称 → ① 预算表样（内嵌 HTML，多子表多段）
 *   → ② 字段与值说明 → ④ 适用业务情形（适用于/不适用于两组）
 *   → ⑤ 预算编制视角：数据关系总结（数据来源（上游）/输出影响（下游））
 *   → ⑥ 财务报表项转换规则（两段式：可选「本表共用口径」+ 报表取数表 + 科目（报表项）入账表；
 *     仅登记的表单输出，无则整节省略。全部单元格只用报表项名——科目码与现金流量表行代号
 *     在渲染层剥除；已去原「取数说明 / 其他备注」两项）
 *
 * 用法：
 *   npx tsx scripts/generateT3aFormDocs.ts                # 缺省 t3a → docs/formdocs/（37 篇）
 *   npx tsx scripts/generateT3aFormDocs.ts --scope multi  # T3B → docs/formdocs-multi/（43 篇）
 *   npx tsx scripts/generateT3aFormDocs.ts --scope t4     # T4 → docs/formdocs-master/（29 篇）
 *   表样结构变化后重跑即可；生成文档是产物，不要手工编辑。
 *
 * 自测（脚本内置，--verify 时执行）：随机抽 3 篇比对文档正文与 XML 文字源
 * 逐字一致；列覆盖断言全程开启，任一失败立即报错退出。
 *   npx tsx scripts/generateT3aFormDocs.ts [--scope multi] --verify
 *   npx tsx scripts/generateT3aFormDocs.ts [--scope multi] --verify-code <表单编码>
 *   VERIFY_ALL=1 npx tsx scripts/generateT3aFormDocs.ts [--scope multi] --verify  # 全量逐字比对（缺省随机抽 3 篇）
 */
import { writeFileSync, readFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getAllFormTexts, registerRawTexts, type FormText } from '../src/utils/xmlTexts';
import type { MarkdownTableGrid, MarkdownTableCell } from '../src/utils/markdownTableConverter';
// 调研页对 BF.1/BF.3 的表样渲染投影（列名修订口径：本年累计分红/利息、计提利息等）——
// 文档表样与页面展示保持同一来源口径，复用同一投影函数，避免两处口径漂移。
import { projectFinanceResearchGrids } from '../src/utils/financeResearchProjection';
// A1 组（T1 总览）专属数据源：A1.3 ER 图取表单/字段登记（纯数据，无 React 依赖）。
import {
  BUDGET_FORM_REGISTRY,
  BUDGET_FIELD_REGISTRY,
  BUDGET_FIELD_FILL_REQUIREMENTS,
  BUDGET_TABLE_BEHAVIOR_NOTES,
} from '../src/data/budgetFormRegistry';
// T3A 单主体裁剪（原型口径）：T3A scope 应用裁剪规则、multi scope 保持原样，
// 保证 T3B（docs/formdocs-multi/）逐字不变。详见 scripts/t3aSingleEntityClip.ts。
import {
  clipFormText,
  clipT3aGrid,
  clipT3aClauses,
  collectMultiEntityResidue,
  type ClipGrid,
} from './t3aSingleEntityClip';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

/**
 * 内嵌表样样式块（每篇仅此一次，置于 H1 之后）。
 * 通用 `table/th/td` 规则覆盖全文所有表格：① 表样（HTML 表格）与 ②⑤ 等纯 Markdown 表格
 * 共用同一套深蓝表头/浅灰边框，避免「只有表样深蓝、其余表格白底黑字」的不一致。
 * 表样专有细节（时间组更深表头、数值右对齐、斑马纹、横向滚动）仍由 .t3a-html-sheet 系列规则叠加。
 * Markdown 单独打开时应用样式表不生效，故在文档内定义一次，表格本体只用 class 调用，
 * 不写内联 style，最大限度减少表格里的非信息类代码。
 */
const T3A_SHEET_STYLE_BLOCK = [
  '<style>',
  // 通用表格（同时命中表样 HTML 表格与纯 Markdown 表格）
  'table{border-collapse:collapse;font-size:12px;font-family:"Microsoft YaHei",Arial,sans-serif}',
  'table th{background:#002f6c;color:#fff;font-weight:600;text-align:center;border:1px solid #cbd5e1;padding:6px 10px;white-space:nowrap}',
  'table td{border:1px solid #cbd5e1;padding:6px 10px;vertical-align:top}',
  // 表样专有叠加（.t3a-html-sheet 系列，class 选择器优先级高于通用标签选择器）
  // 表样（HTML 表格）表头与数据格均不换行：合同编码等短码、列名不被拆成竖排/多行；
  // 通用 table td 保持可换行（字段说明等长文本 Markdown 表格照旧换行），故 nowrap 只在表样作用域叠加。
  '.t3a-html-sheet th,.t3a-html-sheet td{white-space:nowrap}',
  '.t3a-html-sheet th.t3a-th--time{background:#001e4a}',
  '.t3a-html-sheet td.t3a-num{text-align:right}',
  '.t3a-html-sheet tbody tr:nth-child(2n){background:#f8fafc}',
  // 横向滚动条置于表格上方：外层容器负责横向滚动并整体上下翻转（滚动条随之抬到上方），
  // 表格自己再翻回正立、且不再自己滚动（overflow 交给外层容器）。两层翻转互为镜像：
  // 若表格仍保留 overflow-x:auto，则双层翻转相互抵消、滚动条又落回下方（已实测的坑）。
  '.t3a-sheet-scroll{max-width:100%;overflow-x:auto;transform:rotateX(180deg)}',
  '.t3a-sheet-scroll > table.t3a-html-sheet{transform:rotateX(180deg)}',
  '.t3a-html-sheet{display:block;width:max-content}',
  // 横向滚动条常显且可见：默认 webkit 滚动条在 Windows 上过淡、易被忽略，
  // 加高到 10px 并给轨道/滑块上色，读者一眼可见「此处可横向滑动」。
  '.t3a-sheet-scroll::-webkit-scrollbar{height:10px}',
  '.t3a-sheet-scroll::-webkit-scrollbar-track{background:#eef2f7}',
  '.t3a-sheet-scroll::-webkit-scrollbar-thumb{background:#94a3b8;border-radius:5px}',
  '.t3a-html-sheet::-webkit-scrollbar{height:10px}',
  '.t3a-html-sheet::-webkit-scrollbar-track{background:#eef2f7}',
  '.t3a-html-sheet::-webkit-scrollbar-thumb{background:#94a3b8;border-radius:5px}',
  '</style>',
].join('\n');

// ── XML 文字源注册（与 generateT3aHtmlSheetDemo.ts 同一套读取方式） ──
const xmlTextsDir = resolve(ROOT, 'src/data/texts');
const xmlTextFiles = readdirSync(xmlTextsDir).filter((f) => f.toLowerCase().endsWith('.xml'));
registerRawTexts(
  Object.fromEntries(
    xmlTextFiles.map((f) => [`/src/data/texts/${f}`, readFileSync(resolve(xmlTextsDir, f), 'utf-8')]),
  ),
);

// ── T3A 范围：表单级编码清单（与页面 T3A Tab 目录一致的表单条目） ──
// BA 组（BAA.11 为 prototype 隐藏，剔除）：
const T3A_FORM_CODES = [
  'BA.5', 'BAP.2',
  'BAA.2', 'BAA.3', 'BAA.4', 'BAA.6', 'BAA.7', 'BAA.8', 'BAA.9', 'BAA.10',
  // BB 组（BB.4.2.b / BB.4.2.b.1 为 prototype 隐藏，剔除）：
  'BB.1.1', 'BB.1.2', 'BB.1.3', 'BB.1.4', 'BB.1.X',
  'BB.2.1',
  'BB.3.1', 'BB.3.2', 'BB.3.3', 'BB.3.X',
  'BB.4.1', 'BB.4.2.a', 'BB.4.2.a.1', 'BB.4.3', 'BB.4.4', 'BB.4.5', 'BB.4.6', 'BB.4.X',
  'BB.5.1', 'BB.5.2',
  // BF 组（BJ.C / BJ.C.R 为 prototype 隐藏，剔除）：
  'BF.1', 'BF.3', 'BF.4',
  // BO 组（BO.ELIM 为 prototype 隐藏，剔除）：
  'BO.PL', 'BO.BS', 'BO.CF',
];

// prototype 隐藏集（ResearchSummaryView PROTOTYPE_HIDDEN_CODES，逐字）：
// 表单级剔除 BAA.11、BB.4.2.b、BB.4.2.b.1、BJ.C、BJ.C.R、BO.ELIM；
// 子表级剔除 BB.1.2.d、BB.3.1.D、BB.3.3.D（父表单文档不生成这些子表的表样段）。
const PROTOTYPE_HIDDEN_FORMS = new Set([
  'BAA.11', 'BB.4.2.b', 'BB.4.2.b.1', 'BJ.C', 'BJ.C.R', 'BO.ELIM',
]);
const PROTOTYPE_HIDDEN_SUBSHEETS = new Set(['BB.1.2.d', 'BB.3.1.D', 'BB.3.3.D']);
T3A_FORM_CODES.forEach((code) => {
  if (PROTOTYPE_HIDDEN_FORMS.has(code)) {
    throw new Error(`T3A 清单混入 prototype 隐藏表单：${code}`);
  }
});

// ── T3B 范围：multi ＝ T3A 清单 37 项 + 6 个多主体专属表单（插入位置随目录序） ──
// 6 项＝BAA.11、BB.4.2.b、BB.4.2.b.1、BJ.C、BJ.C.R、BO.ELIM（prototype 原型隐藏、
// multi 多主体视角恢复）；子表级恢复项 BB.1.2.d / BB.3.1.D / BB.3.3.D 不单列条目，
// 由「关闭隐藏过滤」自动恢复其表样段与字段分节。
const MULTI_FORM_CODES = [
  'BA.5', 'BAP.2',
  'BAA.2', 'BAA.3', 'BAA.4', 'BAA.6', 'BAA.7', 'BAA.8', 'BAA.9', 'BAA.10', 'BAA.11',
  'BB.1.1', 'BB.1.2', 'BB.1.3', 'BB.1.4', 'BB.1.X',
  'BB.2.1',
  'BB.3.1', 'BB.3.2', 'BB.3.3', 'BB.3.X',
  'BB.4.1', 'BB.4.2.a', 'BB.4.2.a.1', 'BB.4.2.b', 'BB.4.2.b.1', 'BB.4.3', 'BB.4.4', 'BB.4.5', 'BB.4.6', 'BB.4.X',
  'BB.5.1', 'BB.5.2',
  'BF.1', 'BF.3', 'BF.4', 'BJ.C', 'BJ.C.R',
  'BO.PL', 'BO.BS', 'BO.CF', 'BO.ELIM',
];
// 守卫：multi 清单必须完整包含 T3A 全部编码；不得重复
T3A_FORM_CODES.forEach((code) => {
  if (!MULTI_FORM_CODES.includes(code)) {
    throw new Error(`T3B（multi）清单缺少 T3A 编码：${code}`);
  }
});
if (new Set(MULTI_FORM_CODES).size !== MULTI_FORM_CODES.length) {
  throw new Error('T3B（multi）清单存在重复编码');
}

// ── T4 范围：master ＝ 基础静态数据（AA/AB/AM 三组，29 篇） ──
// 与页面 T4 页签目录一致（App.tsx `master` 分支 groups=['AA','AB','AM']；
// ResearchSummaryView MENU_GROUP_DEFS 的 AA/AB/AM 三组编码同序）。
// AA/AB/AM 与原型隐藏集（BA/BB/BF/BO 相关）无交集：表单级 6 项不在其中，
// 子表级 3 项（BB.1.2.d / BB.3.1.D / BB.3.3.D）也不属本组表单——故本范围无需隐藏过滤，
// 隐藏子表过滤仅 t3a 生效（见 HIDE_PROTOTYPE_ONLY，t4 恒 false）。
const T4_FORM_CODES = [
  // AA 基础主数据（11；顺序随 MENU_GROUP_DEFS / T4 需求附录，AA.8、AA.9 紧随 AA.2）
  'AA.1', 'AA.2', 'AA.8', 'AA.9', 'AA.3', 'AA.4', 'AA.5', 'AA.6', 'AA.7', 'AA.10', 'AA.11',
  // AB 业务字典（16）
  'AB.2', 'AB.3', 'AB.4', 'AB.5', 'AB.6', 'AB.7', 'AB.8', 'AB.9', 'AB.10',
  'AB.11', 'AB.12', 'AB.13', 'AB.14', 'AB.15', 'AB.16', 'AB.17',
  // AM 勾稽与映射（2）
  'AM.1', 'AM.2',
];
// 守卫①：t4 清单混入非 AA/AB/AM 编码 → 报错（越界防线）
T4_FORM_CODES.forEach((code) => {
  if (!/^(AA|AB|AM)\./.test(code)) {
    throw new Error(`T4 清单混入非 AA/AB/AM 编码：${code}`);
  }
});
// 守卫②：t4 清单不得重复
if (new Set(T4_FORM_CODES).size !== T4_FORM_CODES.length) {
  throw new Error('T4 清单存在重复编码');
}

// ── A1 范围：T1 总览（A1 组 4 篇，顺序与页面 MENU_GROUP_DEFS group A1 codes 一致） ──
// A1.1/A1.2/A1.4 走标准文档生成（表样 + XML 文字源）；A1.4 含 A1.4.a/A1.4.b 两个子 Tab；
// A1.3（5 张图）为特殊表单，由 generateA1SpecialDoc 生成（图用 mermaid 代码块，与页面口径一致）。
const A1_FORM_CODES = ['A1.1', 'A1.2', 'A1.3', 'A1.4'];
// A1 特殊表单（无标准「XML 文字源 → 标准文档」映射，正文来自交互组件数据）：
const A1_SPECIAL_CODES = new Set(['A1.3']);

// ── CLI 范围参数（--scope t3a|multi|t4|a1；缺省 t3a，行为与现状一致） ──
const scopeIdx = process.argv.indexOf('--scope');
const scopeArg = scopeIdx >= 0 ? process.argv[scopeIdx + 1] : undefined;
if (scopeArg !== undefined && scopeArg !== 't3a' && scopeArg !== 'multi' && scopeArg !== 't4' && scopeArg !== 'a1') {
  throw new Error(`--scope 只支持 t3a / multi / t4 / a1，收到：${scopeArg}`);
}
const SCOPE: 't3a' | 'multi' | 't4' | 'a1' =
  scopeArg === 'multi' ? 'multi' : scopeArg === 't4' ? 't4' : scopeArg === 'a1' ? 'a1' : 't3a';
/** 原型隐藏过滤仅 t3a 生效；multi 关闭两级隐藏过滤（表单级由清单纳入、子表级恢复）；t4/a1 无隐藏集、同样不过滤 */
const HIDE_PROTOTYPE_ONLY = SCOPE === 't3a';
const SCOPED_FORM_CODES =
  SCOPE === 'multi'
    ? MULTI_FORM_CODES
    : SCOPE === 't4'
      ? T4_FORM_CODES
      : SCOPE === 'a1'
        ? A1_FORM_CODES
        : T3A_FORM_CODES;
const SCOPE_LABEL = SCOPE === 'multi' ? 'T3B' : SCOPE === 't4' ? 'T4' : SCOPE === 'a1' ? 'A1' : 'T3A';
const OUT_DIR_REL =
  SCOPE === 'multi'
    ? 'docs/formdocs-multi'
    : SCOPE === 't4'
      ? 'docs/formdocs-master'
      : SCOPE === 'a1'
        ? 'docs/formdocs-a1'
        : 'docs/formdocs';
const LOG_PREFIX =
  SCOPE === 'multi'
    ? '[t3b-formdocs]'
    : SCOPE === 't4'
      ? '[t4-formdocs]'
      : SCOPE === 'a1'
        ? '[a1-formdocs]'
        : '[t3a-formdocs]';

// ── HTML 工具（沿用 generateT3aHtmlSheetDemo.ts 逻辑） ─────────────────────

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** 数值单元格（金额/数量）右对齐：形如 150.0、-3.2、1,200.5 */
function isNumericText(s: string): boolean {
  return /^[(-]?[\d,]+(\.\d+)?[)]?%?$/.test(s.trim()) && /\d/.test(s);
}

/** 表样分片类型（src/data/sheets/{code}.json 的生成结构） */
interface SheetShard {
  grids: MarkdownTableGrid[];
}
type Grid = MarkdownTableGrid & { rows: MarkdownTableCell[][] };

/**
 * 列覆盖一致性校验（占用网格算法）：
 * 分片的行内单元格序列缺格承载「上方合并区域占位」（与 HTML rowspan 语义一致），
 * 故不能用简单 sum(colSpan)==colCount 校验。此处按 HTML 表格布局规则展开：
 * 每个单元格找到第一个未被占用的列位放置，标记其占用的矩形区域；断言
 *   ① 无重叠（同一格位不被两个单元格占用）；
 *   ② 无越界（每行末尾列位不超出 colCount）；
 *   ③ 无空洞（rowCount×colCount 的矩形网格每格都被占用 = 表头结构与现有表样
 *      一致、未增删列的机器断言）。
 * 任一失败立即报错退出，不产出文档。
 */
function assertGridCoverage(grid: Grid): void {
  const occupied = new Set<string>();
  const key = (r: number, c: number) => `${r}_${c}`;
  grid.rows.forEach((row, r) => {
    let c = 0;
    row.forEach((cell) => {
      while (occupied.has(key(r, c))) c++;
      for (let dr = 0; dr < cell.rowSpan; dr++) {
        for (let dc = 0; dc < cell.colSpan; dc++) {
          const k = key(r + dr, c + dc);
          if (occupied.has(k)) {
            throw new Error(`[${grid.name}] 单元格重叠于行列 (${r + dr},${c + dc})（表样结构疑被改动，终止生成）`);
          }
          occupied.add(k);
        }
      }
      c += cell.colSpan;
    });
    if (c > grid.colCount) {
      throw new Error(`[${grid.name}] 第 ${r + 1} 行末尾列位 ${c} 超出 colCount ${grid.colCount}（表样结构疑被改动，终止生成）`);
    }
  });
  const holes: string[] = [];
  for (let r = 0; r < grid.rowCount; r++) {
    for (let c = 0; c < grid.colCount; c++) {
      if (!occupied.has(key(r, c))) holes.push(`(${r + 1},${c + 1})`);
    }
  }
  if (holes.length > 0) {
    throw new Error(
      `[${grid.name}] 网格存在空洞 ${holes.length} 格（首格 ${holes[0]}）：单元格并集 ≠ rowCount×colCount（表样结构疑被改动，终止生成）`,
    );
  }
}

/**
 * 单张表样 → 内嵌 HTML <table>。
 * 与页面 MarkdownBudgetTable 同口径：表头/数据不分行数硬切，逐格按 cell.isHeader 判
 * <th>/<td>（标题行/子标题行 isHeader=false 落 <td>，真正的列头 isHeader=true 落 <th>），
 * rowspan/colspan 逐格照搬，数值数据单元格右对齐。表头三档 class（页面 CSS 上色，
 * 避免依赖被 sanitize 剥离的内联 style）：
 *   t3a-th        普通维度/度量表头
 *   t3a-th--time  时间组表头（【全年合计】/【N月】等，原 bg #001e4a）
 *   t3a-num       数值数据单元格（右对齐）
 */
function gridToHtmlTable(grid: Grid): string {
  assertGridCoverage(grid);

  const lines: string[] = [];
  lines.push(`<table class="t3a-html-sheet">`);
  lines.push(`  <tbody>`);
  grid.rows.forEach((row) => {
    lines.push(`    <tr>`);
    row.forEach((c) => {
      const span = [
        c.rowSpan > 1 ? ` rowspan="${c.rowSpan}"` : '',
        c.colSpan > 1 ? ` colspan="${c.colSpan}"` : '',
      ].join('');
      if (c.isHeader) {
        const cls = c.bg === '#001e4a' ? ' class="t3a-th t3a-th--time"' : ' class="t3a-th"';
        lines.push(`      <th${cls}${span}>${escapeHtml(c.text)}</th>`);
      } else {
        const cls = isNumericText(c.text) ? ' class="t3a-num"' : '';
        lines.push(`      <td${cls}${span}>${escapeHtml(c.text)}</td>`);
      }
    });
    lines.push(`    </tr>`);
  });
  lines.push(`  </tbody>`);
  lines.push(`</table>`);
  // 横向滚动条置于表格上方：仅加这一层包裹容器（表体逐格不变、不加任何额外属性）。
  // 外层容器负责横向滚动并整体翻转，表格由 CSS 翻回正立——见 T3A_SHEET_STYLE_BLOCK 注释。
  return `<div class="t3a-sheet-scroll">\n${lines.join('\n')}\n</div>`;
}

/** 子表是否属于 prototype 隐藏集（按 sheet 名称首个空格前的 TAB 编码判定）；multi 范围恒 false */
function isHiddenSubSheet(gridName: string): boolean {
  if (!HIDE_PROTOTYPE_ONLY) return false;
  const tabCode = gridName.split(' ')[0];
  return PROTOTYPE_HIDDEN_SUBSHEETS.has(tabCode);
}

// 子表 TAB 显示名（复用 src/data/researchSubEntries.ts 的 TAB 名称登记；
// 该文件为生成产物，与表样分片同名对应）：BB.1.2.a → 软硬件销售填报 等。
import { RESEARCH_SUB_ENTRIES } from '../src/data/researchSubEntries';

const SUB_NAME_BY_CODE = new Map(RESEARCH_SUB_ENTRIES.map((e) => [e.code, e.name]));

/** 表单的分片子表 TAB 编码列表（sheet 名称首个空格前部分，如 BB.1.2.a） */
function visibleTabCodes(code: string): string[] {
  const shardPath = resolve(ROOT, `src/data/sheets/${code}.json`);
  if (!existsSync(shardPath)) return [code];
  const shard = JSON.parse(readFileSync(shardPath, 'utf-8')) as SheetShard;
  const grids = code === 'BB.1.X'
    ? shard.grids.slice(0, 1)
    : projectFinanceResearchGrids(code, shard.grids);
  // 隐藏子表仅在 t3a 范围过滤；multi 恢复全部子表 TAB（与页面 multi 模式一致）
  const tabs = grids
    .map((g) => g.name.split(' ')[0])
    .filter((t) => !(HIDE_PROTOTYPE_ONLY && PROTOTYPE_HIDDEN_SUBSHEETS.has(t)));
  return tabs.length > 1 ? tabs : [code];
}

// ── 单篇文档生成（内容逐字取自 XML，一字不改） ─────────────────────────────

/** Markdown 表格单元格转义：竖管是列分隔符，须转义；其余字符原样保留 */
function mdCell(s: string): string {
  return s.replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>');
}

// ── ②「填报要求」列 / ① 表下注：登记表（budgetFormRegistry）→ 渲染 ─────────────
// 字段级约束：key = `${子表编码}::${字段编码}`。「必输 / 录入方式」由 BUDGET_FIELD_REGISTRY
// 的 required / inputMode 派生（原有登记，不改），补充分句取 BUDGET_FIELD_FILL_REQUIREMENTS。
// 表级约束：按表样名取 BUDGET_TABLE_BEHAVIOR_NOTES，渲染在该表下方一段。
const FIELD_META_BY_KEY = new Map(BUDGET_FIELD_REGISTRY.map((f) => [`${f.formCode}::${f.fieldCode}`, f]));
const FILL_REQ_BY_KEY = new Map(
  BUDGET_FIELD_FILL_REQUIREMENTS.map((r) => [`${r.formCode}::${r.fieldCode}`, r]),
);
/** 有「填报要求」登记的子表编码集合（仅这些子表的 ② 加第四列；未登记者保持原三列，避免全库错列） */
const FILL_REQ_FORM_CODES = new Set(BUDGET_FIELD_FILL_REQUIREMENTS.map((r) => r.formCode));
const TABLE_NOTES_BY_GRID = new Map(BUDGET_TABLE_BEHAVIOR_NOTES.map((n) => [n.gridName, n.notes]));

/** 录入方式短语（派生自登记表 inputMode/required；用户录入类带必输性，派生类不带、避免与说明冲突） */
function inputModePhrase(mode: string, required: boolean): string {
  switch (mode) {
    case '手工':
      return `${required ? '必输' : '选填'}；手工填报`;
    case '选择':
      return `${required ? '必输' : '选填'}；下拉选择`;
    case '系统带出':
      return '系统带出';
    case '公式':
      return '公式自动计算';
    case '自动':
      return '系统自动';
    default:
      return '';
  }
}

/**
 * 无派生值又无登记约束时的兜底（该子表开启了「填报要求」列，不得留空格）：
 * 由 XML「来源」列文本派生一句，与来源同义、不新增口径。
 */
function fallbackFromSource(src: string): string {
  const s = (src || '').trim();
  if (/公式/.test(s)) return '公式自动计算';
  if (/本表维护/.test(s)) return '手工维护';
  if (/本表录入|手工/.test(s)) return '手工填报';
  if (/字典|主数据|带出|视角|导入|接口/.test(s)) return '系统带出';
  return '按表样填报';
}

/** 字段级「填报要求」= 派生（必输/录入方式）+ 补充分句（登记表捡回的约束）；overrideBase 时只用补充值 */
function fillRequirementFor(formCode: string, fieldCode: string, sourceText = ''): string {
  const specificEntry = FILL_REQ_BY_KEY.get(`${formCode}::${fieldCode}`);
  const specific = specificEntry ? (SCOPE === 't3a' ? clipT3aClauses(specificEntry.requirement) : specificEntry.requirement) : '';
  if (specificEntry?.overrideBase) return specific || fallbackFromSource(sourceText);
  const parts: string[] = [];
  const meta = FIELD_META_BY_KEY.get(`${formCode}::${fieldCode}`);
  if (meta) {
    const phrase = inputModePhrase(meta.inputMode, meta.required);
    if (phrase) parts.push(phrase);
  }
  if (specific) parts.push(specific);
  const joined = parts.join('；');
  return joined || fallbackFromSource(sourceText);
}

/** 表级下注：T3A 逐句裁剪（剔除多主体残留句），其余范围原样 */
function tableBehaviorNotes(gridName: string): string[] {
  const notes = TABLE_NOTES_BY_GRID.get(gridName) ?? [];
  return notes.map((n) => (SCOPE === 't3a' ? clipT3aClauses(n) : n)).filter(Boolean);
}

// ── ⑥/⑤「输出影响」去代号（只留报表项名） ────────────────────────────────────
// 口径铁律：科目颗粒度止于报表项目行——渲染 ⑥ 与 ⑤「输出影响」时把会计科目码与现金流量表
// 行代号从文本里去掉、只保留报表项名；「预付账款」与「预付款项」统一为「预付款项」
// （与 BO.BS 报表行一致）。去代号只发生在文档渲染层，XML 文字源仍保留原始编码。
// 同一段文字若含 (1601)/(660301) 这类科目码时，这里统一按「括号内纯编码」「行内裸编码」
// 两档剥除；现金流量表行代号（如 CF-14）替换为该行的报表项名（取自 _statement-rules.xml
// 的 CF 家族报表行，单一来源），若该行名已在同段出现则直接删除代号、避免重复。
const CF_NAME_BY_CODE = (() => {
  const m = new Map<string, string>();
  const rows = getAllFormTexts()['_statement-rules']?.statementRows ?? [];
  rows.forEach((r) => {
    if (r.family === 'CF' && r.code) m.set(r.code, r.name);
  });
  return m;
})();
/** 报表行代号（PL/BS/CF 全家族）→ 报表项名：裸码（如「正数进 6115」）回填成报表项名，不再留码 */
const ROW_NAME_BY_CODE = (() => {
  const m = new Map<string, string>();
  const rows = getAllFormTexts()['_statement-rules']?.statementRows ?? [];
  rows.forEach((r) => {
    if (r.code && r.name && !m.has(r.code)) m.set(r.code, r.name);
  });
  return m;
})();
/** 括号内纯编码：(1601) （660301） (160401/1604) (14xx) (600101) */
const PAREN_CODE_RE = /[（(]\s*\d[\dA-Za-z./-]*\s*[)）]/g;
/** 行内裸编码：「应付账款 2202 (−)」「销售→6601/6602/6603」里的 6601 等；不误伤带「-」的单据号（如 PO-2027-0118）
 *  尾部禁用「.数字」——让 6401.1 这类带小数位的报表行码整段匹配（否则会截成 6401 留下游离的「.1」） */
const BARE_CODE_RE = /(?<![\d(（\-])\d{4,6}(?:\.\d+)?(?!\d|\.\d)/g;
/** 现金流量表行代号：CF-14 / CF-13.1 */
const CF_CODE_RE = /CF-\d+(?:\.\d+)*/g;
/** 分录括注（如「存货 (−) 领料出库（借1604贷1405）」）：信息已在科目入账列，删除以避免残留裸码 */
const ENTRY_GLOSS_RE = /[（(][^（）()]{0,60}?[借贷][^（）()]{0,60}?[)）]/g;

/** 归一空白（折叠多空格、去中文标点前空格） */
function tidyText(s: string): string {
  return s
    .replace(/[ \t\u3000]{2,}/g, ' ')
    .replace(/\s+([，。；：、）】」%])/g, '$1')
    .replace(/\s+([)）])/g, '$1')
    .replace(/([（【「])\s+/g, '$1')
    .replace(/：\s*[（(]\s*[)）]/g, '：')
    .replace(/([，。；：、])\s+/g, '$1') // 删码后遗留「， 预付款增加」这类悬空空格
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** 科目名与其报表行名「尾—首」相接（如「财务费用-租赁利息」的尾「利息」＝行名「其中：利息费用」的首「利息」）
 *  ——命中即说明裸码只是前面那个科目名的报表行标注，不是取数来源 */
function endsWithHeadOf(token: string, rowName: string): boolean {
  const head = rowName.replace(/^其中：/, '').match(/^[\u4e00-\u9fa5]{2}/)?.[0] ?? '';
  const tail = token.match(/[\u4e00-\u9fa5]{2}$/)?.[0] ?? '';
  return head.length === 2 && tail === head;
}

/** ⑥/⑤ 渲染用去代号归一（gloss=true 时同时删分录括注） */
function normReportText(s: string, opts: { gloss?: boolean } = {}): string {
  if (!s) return '';
  // 「预付账款」→「预付款项」必须在**去代号之前**统一：否则先按裸码回填报表项名「预付款项」、
  // 后改名把原文的「预付账款」也改成「预付款项」，同一格会出现「预付款项 预付款项」双写。
  let t = s.replace(/预付账款/g, '预付款项');
  if (opts.gloss) t = t.replace(ENTRY_GLOSS_RE, '');
  // 单元格里已出现任一行长名（如「…支付其他与经营活动有关的现金 CF-07」）时，行代号属冗余标注：
  // 直接删除代号、不再回填名称，免得同一格出现两个相互打架的现金流量表行名
  const hasAnyCfRowName = Array.from(CF_NAME_BY_CODE.values()).some((n) => t.includes(n));
  t = t.replace(CF_CODE_RE, (code, offset: number) => {
    const name = CF_NAME_BY_CODE.get(code);
    if (!name) return '';
    if (hasAnyCfRowName) return '';
    // 紧邻「/」的行代号（如「收回投资/取得投资收益收到的现金 CF-11/CF-12」）说明该报表行名
    // 已以前文「a/b」合写形式给出，直接删除代号、不再回填名称（避免正文里重复一段名称）
    const before = t[offset - 1] ?? '';
    const after = t[offset + code.length] ?? '';
    if (before === '/' || after === '/') return '';
    return t.includes(name) ? '' : name;
  });
  t = t.replace(/[/、]\s*(?=[（(])/g, ''); // 行代号删除后遗留的悬空「/」「、」
  t = t.replace(/[：:]\s*(?=[（(])/g, ' '); // 「…现金流出：CF-14 (+)」删代号后成「…现金流出 (+)」
  t = t.replace(PAREN_CODE_RE, '');
  t = t.replace(BARE_CODE_RE, (code, offset: number) => {
    // 裸码若本身承载报表行信息（如「正数进 6115」）→ 回填该行报表项名。
    // 该行名已在本格出现（前文，或紧随其后的同一个小句里，如「进 6401.1 主营业务成本」「1601（固定资产 (+)…）」）
    // 时，这个码只是那处名称的标注 → 直接删除，不再回填（避免「主营业务成本 主营业务成本」这类重词）。
    const name = ROW_NAME_BY_CODE.get(code);
    if (!name) return '';
    const short = name.replace(/^其中：/, '');
    const before = t.slice(0, offset);
    const after = t.slice(offset + code.length, offset + code.length + 14);
    if (before.includes(short) || after.includes(short)) return '';
    // 裸码紧跟在一个科目名之后（如「财务费用-租赁利息 6604.1」「管理费用-折旧费 6602」）时，该码只是
    // 这个科目名的报表行标注、不是取数来源：直接删除、不回填报表项名——回填会与前面的科目名拼出
    // 「…租赁利息 利息费用」这类重词。判据＝紧邻的汉字词与报表项名「尾—首」相接。
    const prevTok = (before.replace(/\s+$/, '').match(/([^\s，、；：／/（）()→＋+])+$/) || [])[0] ?? '';
    if (prevTok && endsWithHeadOf(prevTok, short)) return '';
    return short;
  });
  // 去码后清理悬空连接符（「销售→6601、管理→6602」→「销售、管理」；「…费用→6601/6602/6603 (+)」→「…费用 (+)」）
  t = t.replace(/(?:[→、/]\s*)+(?=[（(]|$)/g, '');
  t = t.replace(/→\s*(?=[、，。；)）])/g, '');
  t = t.replace(/[—–]\s+(?=[\u4e00-\u9fa5])/g, (m0) => m0.trimEnd());
  t = t.replace(/[，、；]\s*$/g, '');
  t = t.replace(/预付账款/g, '预付款项');
  return tidyText(t);
}

/** 科目性质：借方性质(资产/成本费用) 或 贷方性质(负债/权益/收入)；备抵类归贷方(增加在贷)；判不出返回 null */
function accountNature(rawTok: string): 'd' | 'c' | null {
  const codeM = rawTok.match(/[（(]\s*(\d[\d.]*)/);
  const code = codeM ? codeM[1] : '';
  const name = rawTok.replace(/[（(][^)）]*[)）]/g, '');
  // 备抵/净值类（累计折旧、坏账准备、*净值）：增加记贷——先于编码判定，避免落入资产类的借方
  if (/累计折旧|坏账准备|跌价准备|净值/.test(name)) return 'c';
  if (code) {
    if (/^1/.test(code)) return 'd'; // 资产类
    if (/^2/.test(code)) return 'c'; // 负债类
    if (/^4/.test(code)) return 'c'; // 所有者权益类
    if (/^3/.test(code)) return 'd'; // 成本类（生产成本等）
    if (/^6/.test(code)) return /^6[01]/.test(code) ? 'c' : 'd'; // 60/61=收入收益(贷)，其余成本费用(借)
  }
  if (/负债|应付|借款|贷款|应交|债券|收入|收益|薪酬|预收/.test(name)) return 'c';
  if (/资产|资金|应收|存货|材料|备件|产成品|在制品|费用|成本|支出|在建|固定|无形|长期股权|使用权|现金/.test(name)) return 'd';
  return null;
}

/** 科目颗粒度止于报表项目行：折叠「科目—明细」后缀为报表项名（保留「—内部往来」，内部交易仅允许该后缀） */
function collapseToReportItem(s: string): string {
  return s
    .replace(/([^\s，、；：/（）()])[—–‑-]([^—–‑\-，、；：/\s（）()]+)/g, (m, head, tail) => (/内部/.test(tail) ? m : head))
    .replace(/\/(?![\s）)])/g, ' / ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** 从增减清单里取「科目名」：去标签前缀（如「提款：」「费用重分类（…）：」）与「计入」引导词 */
function cleanAccountToken(n: string): string {
  return n
    .replace(/^[^：，、]{0,40}：/, '')
    .replace(/^.*计入/, '')
    .replace(/^[^\s（）()]{1,10}\s+(?=[^\s]*[（(\d])/, '') // 去「结算付款时 」这类标签前缀（仅当其后确实是科目名）
    .trim();
}

/**
 * ⑥「科目（报表项）入账」的 借/贷 拆分（逐文字源 entry 解析，不新增业务内容、不改方向）：
 *   ① entry 已显式写「借：…；贷：…」→ 按标记归属；
 *   ② entry 为「科目 (±)；科目 (±)」增减清单（文字源里与本表同口径的存量写法）→ 按科目性质
 *      与增减方向判借/贷（资产/成本费用 增记借、负债/权益/收入 增记贷，减记反向）；
 *   ③ 既无借/贷标记、也无可判方向的科目（纯说明性文字，如「本表不生成会计分录」）→ 两列均记「—」。
 */
function splitEntryToDebitCredit(entryRaw: string): [string, string] {
  const raw = (entryRaw ?? '').trim();
  if (!raw) return ['—', '—'];
  const segments = raw.split(/\r?\n|[；;。，]/).map((x) => x.trim()).filter(Boolean);
  const debits: string[] = [];
  const credits: string[] = [];
  let explicit = false;
  segments.forEach((seg) => {
    const marker = seg.match(/^(借|贷)\s*[:：]?\s*(.*)$/);
    if (marker) {
      explicit = true;
      const side = marker[1] === '借' ? debits : credits;
      const rest = normReportText(marker[2], { gloss: true }).trim();
      if (rest) side.push(rest);
      return;
    }
    // 无借/贷标记：「科目 (±)」按标号的增减与科目性质判方向。科目名只按「、」拆分，不按「/」拆，
    // 避免把「在建工程—基建工程(160401/1604)」这类把科目码写在括号内、含斜杠的写法拆断。
    const pieces = seg.split(/[（(]\s*([+＋−-])[^)）]*[)）]/);
    for (let i = 0; i + 1 < pieces.length; i += 2) {
      const sign = /[+＋]/.test(pieces[i + 1]) ? 'plus' : 'minus';
      pieces[i]
        .split(/[、,]/)
        .map(cleanAccountToken)
        .filter(Boolean)
        .forEach((nameTok) => {
          const nature = accountNature(nameTok);
          if (nature === null) return; // 无可判方向：不作借/贷断言
          const increase = sign === 'plus';
          const isDebit = nature === 'd' ? increase : !increase;
          const text = normReportText(nameTok).trim();
          if (text) (isDebit ? debits : credits).push(text);
        });
    }
  });
  const d = collapseToReportItem(Array.from(new Set(debits)).join('、')) || '—';
  const c = collapseToReportItem(Array.from(new Set(credits)).join('、')) || '—';
  return [d, c];
}

/** ⑥ 比较用归一：去空白与标点（判断「括号说明是否已在共用口径里说过」） */
function normForCompare(s: string): string {
  return s.replace(/[\s，。；：、（）()【】「」/·\-—+%＝=]/g, '');
}

/** ⑥ 三表列单元格：删掉与「本表共用口径」重复的括号说明（任一分句已在共用口径里出现过即整段删除；
 *  单句说明性的、共用口径未覆盖的括注（如「（先付款后到货）」「（按法人公司汇总）」）保留） */
function stripCommonGloss(cell: string, commonRendered: string): string {
  if (!cell || !commonRendered) return cell;
  const nc = normForCompare(commonRendered);
  return cell.replace(/（([^（）]*)）/g, (whole, inner: string) => {
    const clauses = inner.split(/[；;，,]/).map((s) => s.trim()).filter((s) => s.length >= 4);
    if (clauses.length === 0) return whole;
    return clauses.some((c) => nc.includes(normForCompare(c))) ? '' : whole;
  });
}

/** 斜杠两侧留空（与「科目（报表项）入账」表 collapseToReportItem 的写法一致，两表读起来同一套写法） */
function spaceSlashes(s: string): string {
  return s.replace(/\/(?![\s）)])/g, ' / ');
}

function generateFormDoc(code: string, text: FormText, allTexts: Record<string, FormText>): string {
  const out: string[] = [];

  // H1 表单编码+名称
  out.push(`# ${code} ${text.name}`);
  out.push('');

  // 内嵌表样样式块：每篇仅此一次，置于 H1 之后、① 表样之前。
  // 表格本体只用 class（t3a-html-sheet / t3a-th / t3a-th--time / t3a-num）调用，不写内联 style。
  out.push(T3A_SHEET_STYLE_BLOCK);
  out.push('');

  // ① 预算表样（内嵌 HTML 表格，由 sheet json 生成；多子表多段；页面①表样位于最前，故文档亦置首。
  //     prototype 隐藏的子表不生成表样段，与页面 Tab 切换器隐藏该 Tab 一致；
  //     BF.1/BF.3/BB.1.X 与页面同口径：BF.1/BF.3 过 projectFinanceResearchGrids
  //     投影，BB.1.X 仅取第一张 grid（页面 slice(0,1)，透视表为交互组件不入文档））
  const shardPath = resolve(ROOT, `src/data/sheets/${code}.json`);
  if (existsSync(shardPath)) {
    const shard = JSON.parse(readFileSync(shardPath, 'utf-8')) as SheetShard;
    const visibleGrids = (
      code === 'BB.1.X'
        ? shard.grids.filter((g) => !isHiddenSubSheet(g.name)).slice(0, 1)
        : projectFinanceResearchGrids(code, shard.grids).filter((g) => !isHiddenSubSheet(g.name))
    ).map((g) => (SCOPE === 't3a' ? clipT3aGrid(code, g as unknown as ClipGrid) as unknown as Grid : (g as Grid)));
    if (visibleGrids.length > 0) {
      out.push('## ① 预算表样');
      out.push('');
      visibleGrids.forEach((raw) => {
        const grid = raw as Grid;
        out.push(`### ${grid.name}`);
        out.push('');
        out.push(gridToHtmlTable(grid));
        out.push('');
        // ① 表下注：表级系统行为（自动汇总/不可直接编辑/确认提示/汇总口径等）——
        // 文字源为登记表 BUDGET_TABLE_BEHAVIOR_NOTES（按表样名取），T3A 逐句裁剪。
        tableBehaviorNotes(grid.name).forEach((n) => {
          out.push(n);
          out.push('');
        });
      });
    }
  }

  // 二、② 字段与值说明（含来源/说明；文字逐字取自 XML。总览类表单（A1.1/A1.2 等）无字段登记时整节省略，
  //     与页面「总览类表单不展示②字段说明」一致）
  const tabs = visibleTabCodes(code);
  const multiTab = tabs.length > 1 && text.fields.length === 0;
  const fieldSections: { tabCode: string; title: string; fields: FormText['fields'] }[] = [];
  if (multiTab) {
    tabs.forEach((tabCode) => {
      const tabText = allTexts[tabCode];
      if (tabText && tabText.fields.length > 0) {
        // TAB 标题：编码 + TAB 名（优先 researchSubEntries 登记名，其次 XML name）
        const tabName = SUB_NAME_BY_CODE.get(tabCode) || tabText.name;
        fieldSections.push({ tabCode, title: `${tabCode} ${tabName}`, fields: tabText.fields });
      }
    });
  } else if (text.fields.length > 0) {
    fieldSections.push({ tabCode: code, title: '', fields: text.fields });
  }
  if (fieldSections.length > 0) {
    out.push('## ② 字段与值说明');
    out.push('');
  }
  fieldSections.forEach((sec) => {
    if (sec.title) {
      out.push(`**${sec.title}**`);
      out.push('');
    }
    // ② 第四列「填报要求」：仅对登记表已登记的字段级约束子表开启（未登记者保持原三列），
    // 由登记表（required/inputMode 派生 + BUDGET_FIELD_FILL_REQUIREMENTS）渲染，T3A 逐句裁剪。
    const withReq = FILL_REQ_FORM_CODES.has(sec.tabCode);
    if (withReq) {
      out.push('| 字段 | 来源 | 说明 | 填报要求 |');
      out.push('| :--- | :--- | :--- | :--- |');
      sec.fields.forEach((f) => {
        out.push(
          `| ${mdCell(f.display || f.name)} | ${mdCell(f.source)} | ${mdCell(f.remark)} | ` +
            `${mdCell(fillRequirementFor(sec.tabCode, f.code, f.source))} |`,
        );
      });
    } else {
      out.push('| 字段 | 来源 | 说明 |');
      out.push('| :--- | :--- | :--- |');
      sec.fields.forEach((f) => {
        out.push(`| ${mdCell(f.display || f.name)} | ${mdCell(f.source)} | ${mdCell(f.remark)} |`);
      });
    }
    out.push('');
  });

  // ④ 适用业务情形（分「适用于」/「不适用于」两组，与页面一致；文字逐字取自 XML）
  if (text.applies.length > 0 || text.notApplies.length > 0) {
    out.push('## ④ 适用业务情形');
    out.push('');
    if (text.applies.length > 0) {
      out.push('**适用于**');
      out.push('');
      text.applies.forEach((p) => out.push(`- ${p}`));
      out.push('');
    }
    if (text.notApplies.length > 0) {
      out.push('**不适用于**');
      out.push('');
      text.notApplies.forEach((p) => out.push(`- ${p}`));
      out.push('');
    }
  }

  // ⑤ 预算编制视角：数据关系总结（两个子块：数据来源（上游）/输出影响（下游）；
  //     表格列与页面逐列一致：数据来源=来源表/编码/取数字段/关系说明，输出影响=目标报表/取数路径）
  const rel = text.relation;
  if (rel) {
    out.push('## ⑤ 预算编制视角：数据关系总结');
    out.push('');
    if (rel.summary) {
      out.push(rel.summary);
      out.push('');
    }
    if (rel.dataSources.length > 0) {
      out.push('**数据来源（上游）**');
      out.push('');
      out.push('| 来源表 | 编码 | 取数字段 | 关系说明 |');
      out.push('| :--- | :--- | :--- | :--- |');
      rel.dataSources.forEach((s) => {
        out.push(`| ${mdCell(s.name)} | ${mdCell(s.code)} | ${mdCell(s.fields)} | ${mdCell(s.relation)} |`);
      });
      out.push('');
    }
    if (rel.outputs.length > 0) {
      out.push('**输出影响（下游）**');
      out.push('');
      out.push('| 目标报表 | 取数路径 |');
      out.push('| :--- | :--- |');
      rel.outputs.forEach((o) => {
        // ⑤「输出影响」行去代号（只留报表项名，与 ⑥ 同一去代号口径）
        out.push(`| ${mdCell(normReportText(o.target, { gloss: true }))} | ${mdCell(normReportText(o.path, { gloss: true }))} |`);
      });
      out.push('');
    }
  }

  // ⑥ 财务报表项转换规则（仅登记的表单输出，无登记则整节省略）。
  //     形态（定稿）：节首一句共用口径（<events><common>，可选）→ 报表取数表 → 科目（报表项）入账表。
  //     全部单元格只用报表项名（去代号：科目码与现金流量表行代号在渲染层剥除），
  //     不再渲染原「取数说明 / 其他备注」（note 里有共用价值的口径已上提到 <common>，其余删除）。
  //     三表列单元格另做两步归一：① 删掉与节首共用口径重复的括号说明（同一口径不在两处各说一遍）；
  //     ② 斜杠两侧留空，与「科目（报表项）入账」表 collapseToReportItem 的写法一致。
  const conversionEvents = text.events;
  if (conversionEvents.length > 0) {
    const commonRendered = text.common ? normReportText(text.common) : '';
    const cell = (s: string): string => spaceSlashes(stripCommonGloss(normReportText(s, { gloss: true }), commonRendered));
    out.push('## ⑥ 财务报表项转换规则');
    out.push('');
    if (text.common) {
      out.push(`本表共用口径：${commonRendered}`);
      out.push('');
    }
    out.push('**报表取数**');
    out.push('');
    out.push('| 度量/报表项 | 取数字段 | 损益表 PL | 资产负债表 BS | 现金流量表 CF |');
    out.push('| :--- | :--- | :--- | :--- | :--- |');
    conversionEvents.forEach((item) => {
      out.push(
        `| ${mdCell(normReportText(item.event))} | ${mdCell(normReportText(item.field, { gloss: true }))} | ` +
          `${mdCell(cell(item.pl))} | ${mdCell(cell(item.bs))} | ${mdCell(cell(item.cf))} |`,
      );
    });
    out.push('');
    out.push('**科目（报表项）入账**');
    out.push('');
    out.push('| 度量/报表项 | 借 | 贷 |');
    out.push('| :--- | :--- | :--- |');
    conversionEvents.forEach((item) => {
      const [debit, credit] = splitEntryToDebitCredit(item.entry);
      out.push(`| ${mdCell(normReportText(item.event))} | ${mdCell(debit)} | ${mdCell(credit)} |`);
    });
    out.push('');
  }

  return out.join('\n');
}

// ── A1 专属：mermaid 图生成与特殊表单文档 ────────────────────────────────

/** mermaid 节点标签转义：双引号转全角、去反引号、换行压平（标签内嵌于引号串） */
function mermaidLabel(s: string): string {
  return s.replace(/"/g, '“').replace(/`/g, "'").replace(/\r?\n/g, ' ');
}

interface MermaidNodeDef {
  label: string;
  /** 可选分组（subgraph），用于把节点按层/组聚合，提升可读性 */
  group?: string;
}

/** 统一 mermaid 生成：节点按出现顺序编号 n0…，标签引号包裹；可选 subgraph 分组 */
function emitMermaidGraph(
  nodeDefs: MermaidNodeDef[],
  edges: [number, number, string?][],
  dir: 'LR' | 'TB' = 'LR',
): string {
  const lines = ['```mermaid', `flowchart ${dir}`];
  const hasGroup = nodeDefs.some((n) => n.group);
  if (hasGroup) {
    const groups = new Map<string, number[]>();
    nodeDefs.forEach((n, i) => {
      const g = n.group ?? '';
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g)!.push(i);
    });
    Array.from(groups.entries()).forEach(([g, idxs], gi) => {
      if (g) lines.push(`  subgraph sg${gi}["${mermaidLabel(g)}"]`);
      idxs.forEach((i) => lines.push(`    n${i}["${mermaidLabel(nodeDefs[i].label)}"]`));
      if (g) lines.push('  end');
    });
  } else {
    nodeDefs.forEach((n, i) => lines.push(`  n${i}["${mermaidLabel(n.label)}"]`));
  }
  edges.forEach(([f, t, lbl]) => {
    const tag = lbl ? `|${mermaidLabel(lbl)}|` : '';
    lines.push(`  n${f} -->${tag} n${t}`);
  });
  lines.push('```');
  return lines.join('\n');
}

// ── 图A 全面预算编制整体逻辑图（静态人工登记数据，转录自 ResearchSummaryView BUDGET_STAGE_NODES/EDGES）──
// BO 三表上游除业务预算 + 财务预算外，还叠加 BJ.A 报表通用调整与补录（源码 BUDGET_STAGE_EDGES 有
// badj→BO 三条边但 SVG 渲染因缺 badj 节点被丢弃；文档补全该节点，与文字口径「业务预算+财务预算+BJ.A」一致）。
function buildOverallLogicMermaid(): string {
  const nodes: MermaidNodeDef[] = [
    { label: '基础数据层\nAA/AB/AM 主数据字典', group: '基础数据层' },
    { label: '编制前提与假设层\nBAA/BAP', group: '编制前提与假设层' },
    { label: 'BB.1 收入与销售', group: '业务预算层' },
    { label: 'BB.2 生产制造', group: '业务预算层' },
    { label: 'BB.3 采购供应链', group: '业务预算层' },
    { label: 'BB.4 资本性支出', group: '业务预算层' },
    { label: 'BB.5 期间费用', group: '业务预算层' },
    { label: 'BF 财务预算层\nBF.1/BJ.C/BF.3/BF.4', group: '财务预算层' },
    { label: 'BO.PL 利润表', group: '预算输出层' },
    { label: 'BO.BS 资产负债表', group: '预算输出层' },
    { label: 'BO.CF 现金流量表', group: '预算输出层' },
    { label: 'BJ.A 预算调整\n（报表通用调整与补录）', group: '财务预算层' },
  ];
  const E = (f: number, t: number, l?: string): [number, number, string?] => [f, t, l];
  const edges: [number, number, string?][] = [
    E(0, 1, '基础字典'),
    E(0, 2), E(0, 3), E(0, 4), E(0, 5), E(0, 6),
    E(1, 2), E(1, 3), E(1, 4), E(1, 5), E(1, 6),
    E(2, 7, '资金测算'), E(3, 7), E(4, 7), E(5, 7), E(6, 7),
    E(2, 8), E(2, 9), E(2, 10),
    E(3, 8), E(3, 9),
    E(4, 9), E(4, 10),
    E(5, 9), E(5, 10),
    E(6, 8), E(6, 10),
    E(7, 8), E(7, 9), E(7, 10),
    E(11, 8), E(11, 9), E(11, 10),
  ];
  return emitMermaidGraph(nodes, edges, 'LR');
}

// ── 图B（TAB 级表单 ER 图）：复用 BUDGET_FORM_REGISTRY/BUDGET_FIELD_REGISTRY 与⑤同一套引用解析 ──
const A1_ER_GROUP_ORDER = ['A', 'BA', 'BB', 'BF', 'BO'] as const;
const A1_ER_GROUP_LABEL: Record<string, string> = {
  A: 'A 基础主数据', BA: 'BA 编制前提与假设', BB: 'BB 业务预算', BF: 'BF 资金财务', BO: 'BO 预算输出',
};
const A1_FORM_CODE_PATTERN = /\b[A-Z]{1,2}(?:\.[A-Z0-9]+){1,3}(?:\.[a-z])?\b/g;
function a1ToParentFormCode(code: string): string {
  return /\.[a-z]$/.test(code) ? code.slice(0, code.lastIndexOf('.')) : code;
}
function a1ExtractReferencedCodes(source: string | undefined, selfCode: string): string[] {
  if (!source) return [];
  const matches = source.match(A1_FORM_CODE_PATTERN) || [];
  const codes = new Set<string>();
  for (const m of matches) {
    if (m === selfCode) continue;
    const parentCode = /\.[a-z]$/.test(m) ? m.slice(0, m.lastIndexOf('.')) : m;
    if (BUDGET_FORM_REGISTRY.some((f) => f.code === m || f.code === parentCode)) codes.add(m);
  }
  return Array.from(codes);
}
function a1ComputeWeightedFormEdges(): { from: string; to: string; weight: number }[] {
  const weights = new Map<string, number>();
  for (const f of BUDGET_FIELD_REGISTRY) {
    const toCode = a1ToParentFormCode(f.formCode);
    for (const c of a1ExtractReferencedCodes(f.source, f.formCode)) {
      const fromCode = a1ToParentFormCode(c);
      if (fromCode === toCode) continue;
      const key = `${fromCode}|${toCode}`;
      weights.set(key, (weights.get(key) ?? 0) + 1);
    }
  }
  return Array.from(weights.entries()).map(([key, weight]) => {
    const [from, to] = key.split('|');
    return { from, to, weight };
  });
}
function buildErMermaid(): string {
  // 节点＝全部登记表单，剔除 A1/A2 方案类（与页面 FormErDiagram 同口径）
  const forms = BUDGET_FORM_REGISTRY.filter((f) => !(f.group === 'A' && /^(A1|A2)/.test(f.code)));
  const ordered: typeof forms = [];
  for (const g of A1_ER_GROUP_ORDER) ordered.push(...forms.filter((f) => f.group === g));
  const nodeIdx = new Map<string, number>();
  ordered.forEach((f, i) => nodeIdx.set(f.code, i));
  const nodes: MermaidNodeDef[] = ordered.map((f) => ({ label: `${f.code} ${f.name}`, group: A1_ER_GROUP_LABEL[f.group] ?? f.group }));
  const edgeSet = new Set<string>();
  const edges: [number, number, string?][] = [];
  for (const e of a1ComputeWeightedFormEdges()) {
    const from = nodeIdx.get(e.from);
    const to = nodeIdx.get(e.to);
    if (from === undefined || to === undefined || from === to) continue;
    const key = `${from}|${to}`;
    if (edgeSet.has(key)) continue;
    edgeSet.add(key);
    edges.push([from, to]);
  }
  return emitMermaidGraph(nodes, edges, 'LR');
}

// ── 图C/D/E（大类/表单级/明细流向图）：机械解析自⑥财务报表项转换规则字典（XML <events>）──
// 与页面 parseCoarseFlowGraph / parseFormLevelFlowGraph / parseDetailFlowGraph 同一套解析口径；
// 事件数据逐字取自 XML（FINANCIAL_STATEMENT_CONVERSION 逐字迁移而来），非人工登记。
const A1_FLOW_CATEGORY_DEFS: { key: string; label: string; match: (c: string) => boolean }[] = [
  { key: 'BB.1', label: 'BB.1 收入与销售', match: (c) => c.startsWith('BB.1') },
  { key: 'BB.2', label: 'BB.2 生产制造', match: (c) => c.startsWith('BB.2') },
  { key: 'BB.3', label: 'BB.3 采购供应链', match: (c) => c.startsWith('BB.3') },
  { key: 'BB.4', label: 'BB.4 资本性支出', match: (c) => c.startsWith('BB.4') },
  { key: 'BB.5', label: 'BB.5 期间费用', match: (c) => c.startsWith('BB.5') },
  { key: 'BF', label: 'BF 资金财务', match: (c) => c.startsWith('BF') },
];
function a1FlowCategoryOf(code: string): string | null {
  for (const c of A1_FLOW_CATEGORY_DEFS) if (c.match(code)) return c.key;
  return null;
}
function a1IsNoEffect(text: string): boolean {
  return /^—/.test((text ?? '').trim());
}
/**
 * A1.3 图D/图E 标签去代号：图注已自述「不展开到精确科目码/报表行编码」，故标签一律只留
 * 报表项/科目名——科目码（括号码与行内裸码）与现金流量表行代号（CF-xx）全部删除，
 * 「预付账款」随全库统一为「预付款项」（与 ⑥ 渲染层同一去代号口径）。
 */
function a1CleanLabel(s: string): string {
  return tidyText(
    (s ?? '')
      .replace(/预付账款/g, '预付款项')
      .replace(CF_CODE_RE, '')
      .replace(PAREN_CODE_RE, '')
      .replace(BARE_CODE_RE, '')
      .replace(/[，、；：）)]\s*$/g, ''),
  );
}
function a1ExtractStatementLabels(raw: string): string[] {
  if (a1IsNoEffect(raw)) return [];
  let text = raw.replace(/^按[^：]*：/, '');
  const clauses = text.split(/[；;、]/).map((s) => s.trim()).filter(Boolean);
  const labels: string[] = [];
  for (const c of clauses) {
    let label = c.split('→')[0];
    label = label.split(/[（(]/)[0];
    label = label.split(/[，,]/)[0];
    label = a1CleanLabel(label.replace(/^[，,\s]+/, '').trim());
    if (label) labels.push(label);
  }
  return Array.from(new Set(labels)).slice(0, 3);
}
function a1ExtractSubjects(entry: string): string[] {
  const subjects: string[] = [];
  const segments = (entry ?? '').split(/[；;]/);
  for (const seg of segments) {
    const m = seg.match(/^(?:借|贷)[:：]\s*(.+)$/);
    if (!m) continue;
    const tokens = m[1].split('/');
    for (const t of tokens) {
      let name = t.split(/[（(]/)[0].trim();
      name = a1CleanLabel(name.replace(/^[、\s]+/, ''));
      if (name) subjects.push(name);
    }
  }
  return Array.from(new Set(subjects));
}

/** ⑥转换规则字典的表单级编码清单（= FINANCIAL_STATEMENT_CONVERSION keys） */
const A1_CONVERSION_FORM_CODES = [
  'BB.1.1', 'BB.1.2', 'BB.1.3', 'BB.2.1', 'BB.3.1', 'BB.3.2', 'BB.3.3', 'BB.3.X',
  'BB.4.1', 'BB.4.3', 'BB.4.4', 'BB.4.5', 'BB.4.6', 'BB.5.1', 'BB.5.2',
  'BF.1', 'BF.3', 'BF.4', 'BJ.C',
];

/** 图C：6 大业务类 → 三表（边＝该大类下业务事件对某报表产生实际影响） */
function buildCoarseFlowMermaid(allTexts: Record<string, FormText>): string {
  const weights = new Map<string, number>();
  for (const code of A1_CONVERSION_FORM_CODES) {
    const cat = a1FlowCategoryOf(code);
    if (!cat) continue;
    const text = allTexts[code];
    if (!text) continue;
    for (const item of text.events) {
      (['pl', 'bs', 'cf'] as const).forEach((stmt) => {
        const val = (item as unknown as Record<string, string>)[stmt];
        if (a1IsNoEffect(val)) return;
        const key = `${cat}|${stmt.toUpperCase()}`;
        weights.set(key, (weights.get(key) ?? 0) + 1);
      });
    }
  }
  const catIdx = new Map<string, number>();
  A1_FLOW_CATEGORY_DEFS.forEach((c, i) => catIdx.set(c.key, i));
  const stmtKeys = ['PL', 'BS', 'CF'] as const;
  const nodes: MermaidNodeDef[] = [
    ...A1_FLOW_CATEGORY_DEFS.map((c) => ({ label: c.label, group: '6大业务类' })),
    ...stmtKeys.map((s) => ({ label: s === 'PL' ? '利润表 PL' : s === 'BS' ? '资产负债表 BS' : '现金流量表 CF', group: '财务三表' })),
  ];
  const stmtIdx = new Map<string, number>();
  stmtKeys.forEach((s, i) => stmtIdx.set(s, A1_FLOW_CATEGORY_DEFS.length + i));
  const edgeSet = new Set<string>();
  const edges: [number, number, string?][] = [];
  for (const [key] of weights) {
    const [cat, stmt] = key.split('|');
    const f = catIdx.get(cat);
    const t = stmtIdx.get(stmt);
    if (f === undefined || t === undefined) continue;
    const k = `${f}|${t}`;
    if (edgeSet.has(k)) continue;
    edgeSet.add(k);
    edges.push([f, t]);
  }
  return emitMermaidGraph(nodes, edges, 'LR');
}

/** 图D：23 张编制表 → 报表大项（报表项从 pl/bs/cf 文本标题粒度归并提取） */
function buildFormFlowMermaid(allTexts: Record<string, FormText>): string {
  const formIdx = new Map<string, number>();
  A1_CONVERSION_FORM_CODES.forEach((c, i) => formIdx.set(c, i));
  const formNodes: MermaidNodeDef[] = A1_CONVERSION_FORM_CODES.map((code) => ({
    label: `${code} ${allTexts[code]?.name ?? ''}`.trim(),
    group: '23张业务编制表',
  }));
  const itemIdx = new Map<string, number>();
  const itemNodes: MermaidNodeDef[] = [];
  const edgeSet = new Set<string>();
  const edges: [number, number, string?][] = [];
  const stmtGroup: Record<string, string> = { PL: '利润表 PL 报表大项', BS: '资产负债表 BS 报表大项', CF: '现金流量表 CF 报表大项' };
  for (const code of A1_CONVERSION_FORM_CODES) {
    const text = allTexts[code];
    if (!text) continue;
    for (const item of text.events) {
      (['pl', 'bs', 'cf'] as const).forEach((stmtKey) => {
        const stmtTag = stmtKey.toUpperCase();
        for (const label of a1ExtractStatementLabels((item as unknown as Record<string, string>)[stmtKey])) {
          const itemId = `${stmtTag}::${label}`;
          if (!itemIdx.has(itemId)) {
            itemIdx.set(itemId, itemNodes.length);
            itemNodes.push({ label, group: stmtGroup[stmtTag] });
          }
          const k = `${formIdx.get(code)}|${itemIdx.get(itemId)}`;
          if (edgeSet.has(k)) continue;
          edgeSet.add(k);
          edges.push([formIdx.get(code)!, itemIdx.get(itemId)!]);
        }
      });
    }
  }
  return emitMermaidGraph([...formNodes, ...itemNodes], edges, 'LR');
}

/** 图E：23 张表 → 会计科目（借/贷）→ 报表具体行（边不做权重合并，去重后列示） */
function buildDetailFlowMermaid(allTexts: Record<string, FormText>): string {
  const formIdx = new Map<string, number>();
  A1_CONVERSION_FORM_CODES.forEach((c, i) => formIdx.set(c, i));
  const formNodes: MermaidNodeDef[] = A1_CONVERSION_FORM_CODES.map((code) => ({
    label: `${code} ${allTexts[code]?.name ?? ''}`.trim(),
    group: '23张业务编制表',
  }));
  const subjectIdx = new Map<string, number>();
  const lineIdx = new Map<string, number>();
  const extraNodes: MermaidNodeDef[] = [];
  const extraGroup = new Map<number, string>();
  const edgeSet = new Set<string>();
  const edges: [number, number, string?][] = [];
  const stmtGroup: Record<string, string> = { PL: '利润表 PL 报表行', BS: '资产负债表 BS 报表行', CF: '现金流量表 CF 报表行' };
  const addNode = (id: string, label: string, group: string, idxMap: Map<string, number>): number => {
    if (!idxMap.has(id)) {
      idxMap.set(id, extraNodes.length);
      extraNodes.push({ label });
      extraGroup.set(idxMap.get(id)!, group);
    }
    return idxMap.get(id)!;
  };
  for (const code of A1_CONVERSION_FORM_CODES) {
    const text = allTexts[code];
    if (!text) continue;
    for (const item of text.events) {
      const subjects = a1ExtractSubjects(item.entry);
      const stmtLabels: { tag: 'PL' | 'BS' | 'CF'; label: string }[] = [];
      (['pl', 'bs', 'cf'] as const).forEach((k) => {
        a1ExtractStatementLabels((item as unknown as Record<string, string>)[k]).forEach((label) =>
          stmtLabels.push({ tag: k.toUpperCase() as 'PL' | 'BS' | 'CF', label }),
        );
      });
      for (const subj of subjects) {
        const si = addNode(`SUBJ::${subj}`, subj, '会计科目', subjectIdx);
        const fk = `${formIdx.get(code)}|${si}`;
        if (!edgeSet.has(fk)) {
          edgeSet.add(fk);
          edges.push([formIdx.get(code)!, si]);
        }
        for (const { tag, label } of stmtLabels) {
          const li = addNode(`${tag}::${label}`, label, stmtGroup[tag], lineIdx);
          const lk = `${si}|${li}`;
          if (!edgeSet.has(lk)) {
            edgeSet.add(lk);
            edges.push([si, li]);
          }
        }
      }
    }
  }
  // extraNodes 的 group 需要按顺序重建
  const extraNodesWithGroup: MermaidNodeDef[] = extraNodes.map((n, i) => ({
    label: n.label,
    group: extraGroup.get(i) ?? '',
  }));
  return emitMermaidGraph([...formNodes, ...extraNodesWithGroup], edges, 'LR');
}

/** A1 特殊表单（A1.3 总体逻辑与关系图）整篇文档生成 */
function generateA1SpecialDoc(code: string, text: FormText, allTexts: Record<string, FormText>): string {
  const out: string[] = [];
  const name = text.name ?? code;
  out.push(`# ${code} ${name}`);
  out.push('');
  out.push(T3A_SHEET_STYLE_BLOCK);
  out.push('');

  if (code === 'A1.3') {
    // ① 总体逻辑与关系图（5 张图，mermaid 代码块表达）
    out.push('## ① 总体逻辑与关系图');
    out.push('');
    out.push('内部 A/B/C/D/E 五张图，粒度递增、互为姊妹图；均不生成分录，属集团整体口径、不按法人编制。图用 mermaid 代码块表达（由阅读方编辑器渲染），失去原交互式的缩放/点击高亮。');
    out.push('');
    out.push('### A 全面预算编制整体逻辑图（CFO 汇报版）');
    out.push('');
    out.push(buildOverallLogicMermaid());
    out.push('');
    out.push('管理层汇报专用简化版：只画「模块级依赖」（基础数据 → 编制前提与假设（BAA/BAP）→ 业务预算 → 财务预算（BF.1~BF.4）→ BO 三表），BO 三表在「业务预算 + 财务预算 + BJ.A 预算调整」三个上游来源基础上汇总生成；不涉及会计科目/借贷分录/字段级引用。');
    out.push('');
    out.push('### B TAB 级别表单 ER 图');
    out.push('');
    out.push(buildErMermaid());
    out.push('');
    out.push('节点＝全部登记表单（按 A/BA/BB/BF/BO 分栏，A1/A2 方案类不参与），边＝遍历字段登记「数据来源」自动解析出的表单间引用关系（与⑤上下游引用关系同一套解析逻辑，非人工登记）。');
    out.push('');
    out.push('### C 大类流向图：6 大业务类 → 财务三表');
    out.push('');
    out.push(buildCoarseFlowMermaid(allTexts));
    out.push('');
    out.push('节点＝6 大业务类（BB.1 收入销售 / BB.2 生产制造 / BB.3 采购供应链 / BB.4 资本性支出 / BB.5 期间费用 / BF 资金财务）与财务三表（PL/BS/CF）；边＝按该大类下所有业务事件中对应报表产生实际影响（⑥区块 pl/bs/cf 字段非「—」）的条数计，机械解析自⑥财务报表项转换规则字典，非人工登记。');
    out.push('');
    out.push('### D 表单级流向图：23 张业务编制表 → 报表大项');
    out.push('');
    out.push(buildFormFlowMermaid(allTexts));
    out.push('');
    out.push('节点＝⑥财务报表项转换规则字典中登记的全部业务编制表单与其影响到的报表大项（从 pl/bs/cf 字段文本标题粒度归并提取，不展开到精确科目码/报表行编码）；边＝表单 → 报表大项的业务事件归集。日常查阅单张表最终流向哪几个报表科目大类。');
    out.push('');
    out.push('### E 明细流向图：23 张表 → 会计科目 → 报表具体行');
    out.push('');
    out.push(buildDetailFlowMermaid(allTexts));
    out.push('');
    out.push('节点＝业务编制表 → 会计科目（从⑥区块 entry 会计分录文本中的「借/贷」段落解析科目名称，仅文本标题粒度）→ 报表具体行（归并展示）；边＝一条业务事件的一次科目 → 报表行归集。供实施人员逐条对照配置转换引擎。');
    out.push('');
  }

  // ② 字段与值说明
  if (text.fields.length > 0) {
    out.push('## ② 字段与值说明');
    out.push('');
    out.push('| 字段 | 来源 | 说明 |');
    out.push('| :--- | :--- | :--- |');
    text.fields.forEach((f) => {
      out.push(`| ${mdCell(f.display || f.name)} | ${mdCell(f.source)} | ${mdCell(f.remark)} |`);
    });
    out.push('');
  }

  // ④ 适用业务情形
  if (text.applies.length > 0 || text.notApplies.length > 0) {
    out.push('## ④ 适用业务情形');
    out.push('');
    if (text.applies.length > 0) {
      out.push('**适用于**');
      out.push('');
      text.applies.forEach((p) => out.push(`- ${p}`));
      out.push('');
    }
    if (text.notApplies.length > 0) {
      out.push('**不适用于**');
      out.push('');
      text.notApplies.forEach((p) => out.push(`- ${p}`));
      out.push('');
    }
  }

  // ⑤ 预算编制视角：数据关系总结
  if (text.relation) {
    const rel = text.relation;
    out.push('## ⑤ 预算编制视角：数据关系总结');
    out.push('');
    if (rel.summary) {
      out.push(rel.summary);
      out.push('');
    }
    if (rel.dataSources.length > 0) {
      out.push('**数据来源（上游）**');
      out.push('');
      out.push('| 来源表 | 编码 | 取数字段 | 关系说明 |');
      out.push('| :--- | :--- | :--- | :--- |');
      rel.dataSources.forEach((s) => {
        out.push(`| ${mdCell(s.name)} | ${mdCell(s.code)} | ${mdCell(s.fields)} | ${mdCell(s.relation)} |`);
      });
      out.push('');
    }
    if (rel.outputs.length > 0) {
      out.push('**输出影响（下游）**');
      out.push('');
      out.push('| 目标报表 | 取数路径 |');
      out.push('| :--- | :--- |');
      rel.outputs.forEach((o) => {
        // ⑤「输出影响」行去代号（只留报表项名，与 ⑥ 同一去代号口径）
        out.push(`| ${mdCell(normReportText(o.target, { gloss: true }))} | ${mdCell(normReportText(o.path, { gloss: true }))} |`);
      });
      out.push('');
    }
  }

  return out.join('\n');
}

// ── 自测：文档正文与 XML 文字源逐字一致比对 ────────────────────────────────

/**
 * 抽样校验：重新解析 XML 并逐字比对生成的文档中出现的每段原文
 * （字段 name、source、remark / 适用情形 / 数据关系全部字段 / ⑥ events）。
 * 全部 must be contained verbatim（mdCell 转义除外——校验用同样的转义口径）。
 */
function verifyDocVerbatim(code: string, doc: string, textMap?: Record<string, FormText>): { ok: boolean; missing: string[] } {
  const texts = textMap ?? getAllFormTexts();
  const text = texts[code];
  if (!text) return { ok: false, missing: ['XML 文字源未登记'] };
  const missing: string[] = [];
  // 字段名：XML name 与 display（渲染名）二选一命中即通过——文档按页面口径
  // 优先 display（display 缺省时取 name），name 为登记名，两者都是 XML 原文属性
  const expect = (label: string, s: string) => {
    if (s && !doc.includes(s) && !doc.includes(mdCell(s))) missing.push(label);
  };
  const expectName = (label: string, name: string, display: string) => {
    if (display) {
      if (!doc.includes(display) && !doc.includes(mdCell(display))) missing.push(label);
    } else {
      expect(label, name);
    }
  };
  text.fields.forEach((f, i) => {
    expectName(`fields[${i}].name`, f.name, f.display);
    expect(`fields[${i}].source`, f.source);
    expect(`fields[${i}].remark`, f.remark);
  });
  text.applies.forEach((p, i) => expect(`applies[${i}]`, p));
  text.notApplies.forEach((p, i) => expect(`notApplies[${i}]`, p));
  if (text.relation) {
    expect('relation.summary', text.relation.summary);
    text.relation.dataSources.forEach((s, i) => {
      expect(`relation.dataSources[${i}].name`, s.name);
      expect(`relation.dataSources[${i}].fields`, s.fields);
      expect(`relation.dataSources[${i}].relation`, s.relation);
    });
    // ⑤「输出影响」行同样去代号（渲染层与文档一致；校验用同一归一）
    text.relation.outputs.forEach((o, i) => expect(`relation.outputs[${i}].target`, normReportText(o.target, { gloss: true })));
  }
  // ⑥ 财务报表项转换规则（XML <events> 逐字；渲染为两段式并去代号——校验用同一归一/拆分口径）
  const commonRendered = text.common ? normReportText(text.common) : '';
  // 三表列与渲染端取同一套归一（去代号 → 删与共用口径重复的括注 → 斜杠留空），保证「逐字」口径一致
  const cellExp = (s: string) => spaceSlashes(stripCommonGloss(normReportText(s, { gloss: true }), commonRendered));
  if (text.common) expect('events.common', commonRendered);
  text.events.forEach((e, i) => {
    // 与渲染端取同一归一选项（表体单元格渲染时带 gloss——删分录括注）
    expect(`events[${i}].event`, normReportText(e.event));
    expect(`events[${i}].field`, normReportText(e.field, { gloss: true }));
    expect(`events[${i}].pl`, cellExp(e.pl));
    expect(`events[${i}].bs`, cellExp(e.bs));
    expect(`events[${i}].cf`, cellExp(e.cf));
    const [debit, credit] = splitEntryToDebitCredit(e.entry);
    expect(`events[${i}].entry.debit`, debit);
    expect(`events[${i}].entry.credit`, credit);
  });
  // 多 Tab 表单：各 TAB 的子表 XML 字段原文也须逐字出现在文档中
  const tabs = visibleTabCodes(code);
  if (tabs.length > 1 && text.fields.length === 0) {
    tabs.forEach((tabCode) => {
      const tabText = texts[tabCode];
      tabText?.fields.forEach((f, i) => {
        expectName(`${tabCode}.fields[${i}].name`, f.name, f.display);
        expect(`${tabCode}.fields[${i}].source`, f.source);
        expect(`${tabCode}.fields[${i}].remark`, f.remark);
      });
    });
  }
  return { ok: missing.length === 0, missing };
}

/** 按「简单/复杂」各抽样：复杂=多子表 or 字段多；简单=其余。各随机抽，共 3 篇（2 复杂 + 1 简单）。 */
function pickSampleCodes(codes: string[], gridCounts: Map<string, number>): string[] {
  const complex = codes.filter((c) => (gridCounts.get(c) ?? 0) > 1);
  const simple = codes.filter((c) => (gridCounts.get(c) ?? 0) <= 1);
  const rnd = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];
  const picks = new Set<string>();
  if (complex.length > 0) picks.add(rnd(complex));
  if (complex.length > 1) {
    let second = rnd(complex);
    while (picks.has(second)) second = rnd(complex);
    picks.add(second);
  }
  if (simple.length > 0) picks.add(rnd(simple));
  return [...picks];
}

// ── 主流程 ─────────────────────────────────────────────────────────────────

const doVerify = process.argv.includes('--verify');
const verifyCodeIdx = process.argv.indexOf('--verify-code');
const verifyCode = verifyCodeIdx >= 0 ? process.argv[verifyCodeIdx + 1] : undefined;
// --only <code>：只生成指定表单一篇（其余不动），供单篇核对；缺省生成当前 scope 全清单
const onlyIdx = process.argv.indexOf('--only');
const onlyCode = onlyIdx >= 0 ? process.argv[onlyIdx + 1] : undefined;
if (onlyCode && !SCOPED_FORM_CODES.includes(onlyCode)) {
  throw new Error(`--only 指定的表单不在 ${SCOPE_LABEL} 清单内：${onlyCode}`);
}
const codes = onlyCode ? [onlyCode] : SCOPED_FORM_CODES;

// --verify-code 同样按当前 scope 生效：越界时给出跨范围提示（如 BJ.C 须在 --scope multi 下核）
if (verifyCode && !SCOPED_FORM_CODES.includes(verifyCode)) {
  const otherScopes: string[] = [];
  if (SCOPE !== 't3a' && T3A_FORM_CODES.includes(verifyCode)) otherScopes.push('T3A（缺省 --scope t3a）');
  if (SCOPE !== 'multi' && MULTI_FORM_CODES.includes(verifyCode)) otherScopes.push('T3B（--scope multi）');
  if (SCOPE !== 't4' && T4_FORM_CODES.includes(verifyCode)) otherScopes.push('T4（--scope t4）');
  const crossHint =
    otherScopes.length > 0 ? `（该编码属于 ${otherScopes.join(' / ')} 清单，请带上对应的 --scope）` : '';
  throw new Error(`--verify-code 指定的表单不在 ${SCOPE_LABEL} 清单内：${verifyCode}${crossHint}`);
}

const outDir = resolve(ROOT, OUT_DIR_REL);
mkdirSync(outDir, { recursive: true });

const gridCounts = new Map<string, number>();
const allTextsRaw = getAllFormTexts();
// T3A 单主体裁剪：仅 t3a scope 生效（multi 保持原样 → T3B 43 篇逐字不变；t4/a1 无多主体内容）
const allTexts: Record<string, FormText> =
  SCOPE === 't3a'
    ? (Object.fromEntries(Object.entries(allTextsRaw).map(([k, v]) => [k, clipFormText(v) as FormText])) as Record<
        string,
        FormText
      >)
    : allTextsRaw;
const generated: string[] = [];
const residueByCode: string[] = [];
codes.forEach((code) => {
  const text = allTexts[code];
  // A1.3（总体逻辑与关系图）走特殊生成，其余（含 A1.1/A1.2/A1.4）必须登记 XML 文字源。
  const isA1Special = SCOPE === 'a1' && A1_SPECIAL_CODES.has(code);
  if (!text) {
    throw new Error(`XML 文字源未登记：${code}（src/data/texts/${code}.xml）`);
  }
  const doc = isA1Special ? generateA1SpecialDoc(code, text, allTexts) : generateFormDoc(code, text, allTexts);
  writeFileSync(resolve(outDir, `${code}.md`), doc, 'utf-8');
  // T3A 残留兜底：逐篇收集多法人关联交易内容残留，全部生成后统一报错（不带残留交卷）
  if (SCOPE === 't3a') {
    const hits = collectMultiEntityResidue(doc);
    if (hits.length > 0) residueByCode.push(`[${code}] ${hits.length} 处：\n  ${hits.join('\n  ')}`);
  }
  generated.push(code);
  const shardPath = resolve(ROOT, `src/data/sheets/${code}.json`);
  if (existsSync(shardPath)) {
    const shard = JSON.parse(readFileSync(shardPath, 'utf-8')) as SheetShard;
    gridCounts.set(code, shard.grids.filter((g) => !isHiddenSubSheet(g.name)).length);
  } else {
    gridCounts.set(code, 0);
  }
});

if (residueByCode.length > 0) {
  const reportPath = resolve(ROOT, '.t3a-residue-report.txt');
  const report = `T3A 多法人关联交易内容残留 ${residueByCode.length} 篇\n\n${residueByCode.join('\n\n')}\n`;
  writeFileSync(reportPath, report, 'utf-8');
  console.error(`${LOG_PREFIX} 残留明细已写入 ${reportPath}`);
  throw new Error(
    `T3A 仍有多法人关联交易内容残留（${residueByCode.length} 篇）——须补全 scripts/t3aSingleEntityClip.ts 裁剪规则：\n${residueByCode.join('\n')}`,
  );
}
console.log(`${LOG_PREFIX} 已生成 ${generated.length} 篇文档 → ${OUT_DIR_REL}/（表单数 ${codes.length}${onlyCode ? '，--only 限定' : `，与 ${SCOPE_LABEL} 清单一致`}）`);
console.log(`${LOG_PREFIX} 表单编码清单：`);
console.log(generated.join('、'));

if (doVerify || verifyCode) {
  const sampleCodes = verifyCode ? [verifyCode] : (process.env.VERIFY_ALL ? codes : pickSampleCodes(codes, gridCounts));
  console.log(`${LOG_PREFIX} 抽样逐字比对（${sampleCodes.length} 篇）：${sampleCodes.join('、')}`);
  let fail = 0;
  sampleCodes.forEach((code) => {
    const doc = readFileSync(resolve(outDir, `${code}.md`), 'utf-8');
    const r = verifyDocVerbatim(code, doc, allTexts);
    if (r.ok) {
      console.log(`  ✓ ${code} 文档正文与 XML 文字源逐字一致`);
    } else {
      fail++;
      console.error(`  ✗ ${code} 逐字比对未通过，缺失：${r.missing.join('；')}`);
    }
  });
  if (fail > 0) throw new Error(`逐字比对未通过：${fail} 篇`);
  console.log(`${LOG_PREFIX} 抽样逐字比对全部通过`);
}
