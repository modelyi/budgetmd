/**
 * XML 优先取数的渲染等价性校验（无需浏览器 / 无需 build）
 * =============================================================================
 * 用法：npx tsx scripts/verifyXmlFirstRender.ts
 *
 * 目的：证明把调研页六处文字取数改成「XML 优先、TS 兜底」后，**取数结果与迁移前逐字相同**：
 *   ① 基线（迁移前行为）：不注册任何 XML，全部取 TS 常量；
 *   ② 现状（迁移后行为）：注册 src/data/texts/*.xml 后，按前端同款表达式取数
 *      （getFormText(code)?.xxx ?? TS 兜底）。
 *   两者对每张表逐字段深比较，必须完全一致（含各区块「有/无」语义）。
 *
 * 覆盖：表概述 / ②字段说明（调用组件真实函数 fieldsForDisplay vs fieldsForDisplayFromTs）/
 *       ③规则要点（含配色按 TS 分组下标）/ ④适用情形 / ⑤数据关系 / ⑥转换事件 + 无分录说明。
 * 另：A1.2 列登记簿、三表取数规则、科目说明的 XML 优先覆盖，由
 *     scripts/generateResearchMarkdownContent.ts 产物 md5 与迁移前一致来证明（见任务报告）。
 */
import { readdirSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { isDeepStrictEqual } from 'util';
const __dirname = dirname(fileURLToPath(import.meta.url));

import { registerRawTexts, getFormText } from '../src/utils/xmlTexts';
import { BUDGET_FIELD_REGISTRY } from '../src/data/budgetFormRegistry';
import { RESEARCH_SUB_ENTRIES } from '../src/data/researchSubEntries';
import {
  BUSINESS_BLOCKS,
  findRules,
  findSubRules,
  fieldsForDisplay,
  fieldsForDisplayFromTs,
  FORM_LEVEL_NOTES,
  APPLICABLE_SCENARIOS,
  FORM_DATA_RELATION_SUMMARY,
  FINANCIAL_STATEMENT_CONVERSION,
  NO_VOUCHER_FORM_NOTE,
} from '../src/components/ResearchSummaryView';
import type { BudgetFieldDef } from '../src/data/budgetFormRegistry';

const textsDir = resolve(__dirname, '../src/data/texts');

// ── 候选编码（与迁移脚本一致：菜单/子条目/六个文字区块/业务分组）────────────────
const candidates = new Set<string>();
BUDGET_FIELD_REGISTRY.forEach((f) => candidates.add(f.formCode));
RESEARCH_SUB_ENTRIES.forEach((e) => {
  candidates.add(e.code);
  candidates.add(e.parent);
});
Object.keys(FORM_LEVEL_NOTES).forEach((c) => candidates.add(c));
Object.keys(APPLICABLE_SCENARIOS).forEach((c) => candidates.add(c));
Object.keys(FORM_DATA_RELATION_SUMMARY).forEach((c) => candidates.add(c));
Object.keys(FINANCIAL_STATEMENT_CONVERSION).forEach((c) => candidates.add(c));
Object.keys(NO_VOUCHER_FORM_NOTE).forEach((c) => candidates.add(c));
BUSINESS_BLOCKS.forEach((b) => b.formCodes.forEach((c) => candidates.add(c)));
const codes = [...candidates].sort().filter((c) => c && !/[\/\s、]/.test(c));

// TAB 子条目编码 → 父表单编码（前端 selectedSubEntry 语义）
const PARENT = new Map(RESEARCH_SUB_ENTRIES.map((e) => [e.code, e.parent]));

interface RenderText {
  formLevelNote: string | undefined;
  scenario: { applies: string[]; notApplies: string[] } | undefined;
  relation: unknown;
  conversion: { items: unknown[] } | undefined;
  noVoucher: string | undefined;
  rules: { form: string; points: string[]; color: string }[];
  fields: { fieldCode: string; fieldName: string; source: string; remark: string }[];
}

const normFields = (list: BudgetFieldDef[]) =>
  list.map((f) => ({ fieldCode: f.fieldCode, fieldName: f.fieldName, source: f.source, remark: f.remark }));

/** 迁移前行为：全部取 TS 常量（此时尚未注册任何 XML），子条目无专属内容时回退父表单编码 */
function baseline(code: string): RenderText {
  const parent = PARENT.get(code) ?? code;
  const isSub = PARENT.has(code);
  // 与组件内 formLevelNoteKey / scenarioKey / relationKey / conversionKey 的「迁移前」表达式一致
  const subRules = isSub ? findSubRules(code) : null;
  const fromTsRules = (subRules && subRules.length > 0 ? subRules : findRules(parent)).map((r) => ({
    form: r.form,
    points: r.points,
    color: r.color,
  }));
  const formLevelNoteKey = isSub && FORM_LEVEL_NOTES[code] ? code : parent;
  const scenarioKey = isSub && APPLICABLE_SCENARIOS[code] ? code : parent;
  const relationKey = isSub && FORM_DATA_RELATION_SUMMARY[code] ? code : parent;
  const conversionKey =
    isSub && (FINANCIAL_STATEMENT_CONVERSION[code] || NO_VOUCHER_FORM_NOTE[code]) ? code : parent;
  return {
    formLevelNote: FORM_LEVEL_NOTES[formLevelNoteKey],
    scenario: APPLICABLE_SCENARIOS[scenarioKey],
    relation: FORM_DATA_RELATION_SUMMARY[relationKey],
    conversion: FINANCIAL_STATEMENT_CONVERSION[conversionKey],
    noVoucher: NO_VOUCHER_FORM_NOTE[conversionKey],
    rules: fromTsRules,
    fields: normFields(fieldsForDisplayFromTs(code)),
  };
}

/** 迁移后行为：与 ResearchSummaryView 组件内完全相同的 XML 优先取数表达式 */
function xmlFirst(code: string, parent: string): RenderText {
  // ③ 规则要点：子条目无专属规则时回退父表单编码（组件 rules useMemo 同款）
  const xmlRuleCode = PARENT.has(code) && (getFormText(code)?.rules.length ?? 0) > 0 ? code : parent;
  const fromTsRules = (PARENT.has(code) && findSubRules(code) ? findSubRules(code)! : findRules(parent)).map((r) => ({
    form: r.form,
    points: r.points,
    color: r.color,
  }));
  const xmlRules = getFormText(xmlRuleCode)?.rules;
  const rules = xmlRules && xmlRules.length > 0
    ? xmlRules.map((r, i) => ({ form: r.form, points: r.points, color: fromTsRules[i]?.color ?? fromTsRules[0]?.color ?? '#2563eb' }))
    : fromTsRules;

  // ④⑤⑥ + 表概述：子条目有内容时用子条目编码，否则回退父表单编码
  const scenarioKey = PARENT.has(code) && (APPLICABLE_SCENARIOS[code] || (getFormText(code)?.applies.length ?? 0)) ? code : parent;
  const relationKey = PARENT.has(code) && (FORM_DATA_RELATION_SUMMARY[code] || getFormText(code)?.relation) ? code : parent;
  const conversionKey = PARENT.has(code) && (FINANCIAL_STATEMENT_CONVERSION[code] || NO_VOUCHER_FORM_NOTE[code] || (getFormText(code)?.events.length ?? 0) || getFormText(code)?.noVoucher) ? code : parent;
  const formLevelNoteKey = PARENT.has(code) && (FORM_LEVEL_NOTES[code] || getFormText(code)?.overview) ? code : parent;

  const formLevelNote = getFormText(formLevelNoteKey)?.overview || FORM_LEVEL_NOTES[formLevelNoteKey];
  const scenario = (() => {
    const t = getFormText(scenarioKey);
    if (t && (t.applies.length > 0 || t.notApplies.length > 0)) return { applies: t.applies, notApplies: t.notApplies };
    return APPLICABLE_SCENARIOS[scenarioKey];
  })();
  const relation = getFormText(relationKey)?.relation ?? FORM_DATA_RELATION_SUMMARY[relationKey];
  const conversion = (() => {
    const t = getFormText(conversionKey)?.events;
    if (t && t.length > 0) return { items: t };
    return FINANCIAL_STATEMENT_CONVERSION[conversionKey];
  })();
  const noVoucher = getFormText(conversionKey)?.noVoucher || NO_VOUCHER_FORM_NOTE[conversionKey];

  return { formLevelNote, scenario, relation, conversion, noVoucher, rules, fields: normFields(fieldsForDisplay(code)) };
}

// ── ① 先算基线（此刻 xmlTexts 未注册任何 XML，glob 在 Node 下为空 → 纯 TS 行为）──
const baseByCode = new Map<string, RenderText>();
for (const code of codes) baseByCode.set(code, baseline(code));

// ── ② 注册全部 XML 后按 XML 优先取数 ─────────────────────────────────────────
if (!existsSync(textsDir)) {
  console.error(`[verify] 文字源目录不存在：${textsDir}`);
  process.exit(1);
}
const files = readdirSync(textsDir).filter((f) => f.toLowerCase().endsWith('.xml'));
registerRawTexts(Object.fromEntries(files.map((f) => [`/src/data/texts/${f}`, readFileSync(resolve(textsDir, f), 'utf-8')])));

const bad: string[] = [];
let compared = 0;
for (const code of codes) {
  const a = baseByCode.get(code)!;
  const b = xmlFirst(code, PARENT.get(code) ?? code);
  compared += 1;
  (Object.keys(a) as (keyof RenderText)[]).forEach((k) => {
    if (!isDeepStrictEqual(a[k], b[k])) {
      bad.push(`${code}.${k}\n    TS 兜底: ${JSON.stringify(a[k])?.slice(0, 400)}\n    XML 优先: ${JSON.stringify(b[k])?.slice(0, 400)}`);
    }
  });
}

console.log(`[verify] 已注册 XML ${files.length} 个；比对表单/TAB 编码 ${compared} 个 × 7 类取数（表概述/字段/规则要点/适用情形/数据关系/转换规则/无分录说明）`);
if (bad.length === 0) {
  console.log('[verify] ✅ XML 优先取数与 TS 兜底取数逐字一致：渲染结果与迁移前完全相同（0 处差异）');
  process.exit(0);
}
console.error(`[verify] ❌ 差异 ${bad.length} 处：`);
bad.forEach((b, i) => console.error(`\n  ${i + 1}. ${b}`));
process.exit(1);
