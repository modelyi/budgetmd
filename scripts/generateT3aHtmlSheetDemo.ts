/**
 * T3A 表样示范文档生成脚本：把 src/data/sheets/{code}.json 的结构化表样（celldata 语义的
 * rows/rowSpan/colSpan 网格）转换为「Markdown 文字 + 内嵌 HTML 表格」示范文档。
 *
 * 背景：Markdown 表格无法表达两行表头、【全年合计】+【1~12月】时间组、度量子列这类复杂表头；
 * 本脚本从表样分片 JSON 自动生成 <table>（rowspan/colspan）片段，表头内容与现有表样逐格一致、
 * 零手写；概述/规则/适用情形等普通文字保持纯 Markdown（取自 src/data/texts/{code}.xml 文字源）。
 *
 * 用法：npx tsx scripts/generateT3aHtmlSheetDemo.ts [表单编码...]
 *   默认示范 BB.1.1（合同签约额，两行表头+时间组）、BB.1.2（软硬件收入与成本，时间组+度量子列）。
 *   生成物：docs/solutions/HTML-T3A表样示范.md。
 *   表样结构变化后重跑即可；该文档是生成产物，不要手工编辑表样部分。
 *
 * 校验：脚本内置列覆盖一致性断言（两行表头的跨行/跨列并集 = colCount，每个数据行 sum(colSpan)
 * = colCount），保证「表头结构与现有表样一致、未增删列」；断言失败立即报错退出，不产出文档。
 */
import { writeFileSync, readFileSync, readdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getAllFormTexts, registerRawTexts } from '../src/utils/xmlTexts';
import type { MarkdownTableGrid, MarkdownTableCell } from '../src/utils/markdownTableConverter';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── XML 文字源注册（与 scripts/generateResearchMarkdownContent.ts 同一套读取方式） ──
const xmlTextsDir = resolve(__dirname, '../src/data/texts');
const xmlTextFiles: string[] = existsSync(xmlTextsDir)
  ? readdirSync(xmlTextsDir).filter((f) => f.toLowerCase().endsWith('.xml'))
  : [];
registerRawTexts(
  Object.fromEntries(
    xmlTextFiles.map((f) => [`/src/data/texts/${f}`, readFileSync(resolve(xmlTextsDir, f), 'utf-8')]),
  ),
);

/** 默认示范表：BB.1.1（时间组表头）、BB.1.2（时间组+度量子列） */
const DEFAULT_FORM_CODES = ['BB.1.1', 'BB.1.2'];
const formCodes = process.argv.slice(2).length > 0 ? process.argv.slice(2) : DEFAULT_FORM_CODES;

/** 表样分片类型（src/data/sheets/{code}.json 的生成结构） */
interface SheetShard {
  grids: MarkdownTableGrid[];
}
type Grid = MarkdownTableGrid & { rows: MarkdownTableCell[][] };

// ── HTML 工具 ────────────────────────────────────────────────────────────────

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

/**
 * 单张表样 → 内嵌 HTML <table>。
 * 表头三档 class（页面 CSS 上色，避免依赖被 sanitize 剥离的内联 style）：
 *   t3a-th        普通维度/度量表头（原 bg #002f6c）
 *   t3a-th--time  时间组表头（原 bg #001e4a：【全年合计】/【N月】/下年/后年等）
 *   t3a-num       数值数据单元格（右对齐）
 */
function gridToHtmlTable(grid: Grid): string {
  const colCount = grid.colCount;

  // ── 列覆盖一致性校验（表头结构 = 现有表样，未增删列的机器断言）──
  // 第 0 行 rowSpan=2 的格子会占住第 1 行的列位；两行并集必须铺满 colCount。
  const occupiedByRow0 = grid.rows[0]
    .filter((c) => c.rowSpan >= 2)
    .reduce((n, c) => n + c.colSpan, 0);
  const row1Covered = grid.rows[1].reduce((n, c) => n + c.colSpan, 0) + occupiedByRow0;
  if (row1Covered !== colCount) {
    throw new Error(
      `[${grid.name}] 两行表头列覆盖不一致：并集 ${row1Covered} ≠ colCount ${colCount}（表样结构疑被改动，终止生成）`,
    );
  }
  grid.rows.slice(2).forEach((row, i) => {
    const covered = row.reduce((n, c) => n + c.colSpan, 0);
    if (covered !== colCount) {
      throw new Error(
        `[${grid.name}] 数据行 ${i + 3} 列覆盖不一致：${covered} ≠ colCount ${colCount}（表样结构疑被改动，终止生成）`,
      );
    }
  });

  const lines: string[] = [];
  lines.push(`<table class="t3a-html-sheet">`);
  lines.push(`  <thead>`);
  grid.rows.slice(0, 2).forEach((row) => {
    lines.push(`    <tr>`);
    row.forEach((c) => {
      const span = [
        c.rowSpan > 1 ? ` rowspan="${c.rowSpan}"` : '',
        c.colSpan > 1 ? ` colspan="${c.colSpan}"` : '',
      ].join('');
      const cls = c.bg === '#001e4a' ? ' class="t3a-th t3a-th--time"' : ' class="t3a-th"';
      lines.push(`      <th${cls}${span}>${escapeHtml(c.text)}</th>`);
    });
    lines.push(`    </tr>`);
  });
  lines.push(`  </thead>`);
  lines.push(`  <tbody>`);
  grid.rows.slice(2).forEach((row) => {
    lines.push(`    <tr>`);
    row.forEach((c) => {
      const span = [
        c.rowSpan > 1 ? ` rowspan="${c.rowSpan}"` : '',
        c.colSpan > 1 ? ` colspan="${c.colSpan}"` : '',
      ].join('');
      const cls = isNumericText(c.text) ? ' class="t3a-num"' : '';
      lines.push(`      <td${cls}${span}>${escapeHtml(c.text)}</td>`);
    });
    lines.push(`    </tr>`);
  });
  lines.push(`  </tbody>`);
  lines.push(`</table>`);
  return lines.join('\n');
}

// ── 单表单段落（概述 / 表样 / ③ 关键规则 / ④ 适用情形：普通文字纯 Markdown） ──

function formSection(code: string): string {
  const shardPath = resolve(__dirname, `../src/data/sheets/${code}.json`);
  if (!existsSync(shardPath)) throw new Error(`表样分片不存在：${shardPath}（先跑 generateResearchMarkdownContent.ts）`);
  const shard = JSON.parse(readFileSync(shardPath, 'utf-8')) as SheetShard;
  const text = getAllFormTexts()[code];
  if (!text) throw new Error(`XML 文字源未登记：${code}（src/data/texts/${code}.xml）`);

  const out: string[] = [];
  out.push(`## ${code} ${text.name}`);
  out.push('');
  out.push('### 表概述');
  out.push('');
  out.push(text.overview);
  out.push('');

  shard.grids.forEach((raw) => {
    const grid = raw as Grid;
    out.push(`### 表样：${grid.name}`);
    out.push('');
    out.push(gridToHtmlTable(grid));
    out.push('');
  });

  const rulePoints = text.rules.flatMap((r) => r.points);
  if (rulePoints.length > 0) {
    out.push('### ③ 关键规则要点');
    out.push('');
    rulePoints.forEach((p) => out.push(`- ${p}`));
    out.push('');
  }
  if (text.applies.length > 0 || text.notApplies.length > 0) {
    out.push('### ④ 适用业务情形');
    out.push('');
    text.applies.forEach((p) => out.push(`- ${p}`));
    text.notApplies.forEach((p) => out.push(`- 不适用：${p}`));
    out.push('');
  }
  return out.join('\n');
}

// ── 文档头（模式说明：示范怎么读、怎么再生成） ──────────────────────────────

const header = `# T3A 表样示范：Markdown + 内嵌 HTML 表头

> 本篇示范「Markdown + 表头 HTML 嵌入」的表样表达模式：两行表头、【全年合计】+【1~12月】时间组、
> 度量子列这类 Markdown 表格表达不了的复杂表头，用内嵌 HTML \`<table>\`（rowspan/colspan）表达；
> 概述、规则、适用情形等普通内容保持纯 Markdown。

## 一、这个模式解决什么问题

| 内容 | 表达方式 | 原因 |
| :--- | :--- | :--- |
| 概述、关键规则、适用情形 | 纯 Markdown（标题/列表） | 普通文字，Markdown 足够 |
| 单行表头的简单表格 | 纯 Markdown 表格 | Markdown 原生支持 |
| 两行表头/时间组/度量子列 | 内嵌 HTML \`<table>\` | Markdown 表格无法跨行跨列合并表头 |

示范范围（T3A 编制套表原型 · 单体视角，其余 45 张表按此模式逐步推广）：

| 表单 | 表样结构 | 示范要点 |
| :--- | :--- | :--- |
| BB.1.1 合同签约额预算表 | 维度列双行表头 + 【全年合计】时间组 + 下年/后年 | rowspan=2 维度列、colspan=13 时间组 |
| BB.1.2 软硬件收入与成本预算 | 【全年合计】+【1~12月】时间组 × 度量子列（销量/单价/收入/预收/回款） | rowspan×colspan 组合表达 |

## 二、表样怎么维护

表样部分是**生成产物、不手写**：由 \`npx tsx scripts/generateT3aHtmlSheetDemo.ts\` 从
\`src/data/sheets/*.json\` 表样分片（含合并单元格信息）自动转换，表头内容与现有表样逐格一致；
生成时内置列覆盖校验（跨行/跨列并集 = 总列数），杜绝增删列。表样结构变化后重跑脚本即可。

---

`;

// ── 生成文档 ─────────────────────────────────────────────────────────────────

const sections = formCodes.map(formSection);
const doc = header + sections.join('\n') + [
  '---',
  '',
  '## 三、口径核查说明',
  '',
  '- 本篇为表达形式改造：表头结构、列名、列序均由表样分片自动转换，未增删列、未改任何财务口径；',
  '- 金额、单价等数值口径（不含税、万元、0.1 精度）沿用现有表样原文，本篇不做任何取数加工；',
  '- T3A 为单体视角，内部交易相关子表（如 BB.1.2.d 产品内部调拨）不在本篇展开口径说明，仅作表样结构示范来源。',
  '',
].join('\n');

const outPath = resolve(__dirname, '../docs/solutions/HTML-T3A表样示范.md');
writeFileSync(outPath, doc, 'utf-8');
console.log(`[t3a-html-demo] 已生成：${outPath}`);
console.log(`[t3a-html-demo] 示范表单：${formCodes.join('、')}（表样 ${formCodes.reduce((n, c) => {
  const g = (JSON.parse(readFileSync(resolve(__dirname, `../src/data/sheets/${c}.json`), 'utf-8')) as SheetShard).grids;
  return n + g.length;
}, 0)} 张，列覆盖校验全部通过）`);
