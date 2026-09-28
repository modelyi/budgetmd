/**
 * 逐字一致性校验：把 src/data/texts/*.xml 的解析结果与 TS 文字源逐字段比对
 * =============================================================================
 * 用法：npx tsx scripts/validateTextsXml.ts
 *   · 退出码 0 = 全部一致（不一致清单为空）
 *   · 退出码 1 = 存在不一致（逐条打印「编码 / 区块 / 字段 / TS 原值 / XML 值」）
 *
 * 校验两层：
 *   ① 结构化逐字比对：表概述 / 每个字段的 登记名+渲染名+数据来源+其他说明 / 每条规则要点 /
 *      每条适用情形 / 数据关系（summary+dataSources+outputs+keyRules）/ 每个转换事件 8 列 /
 *      无分录说明 / 三表报表行（name+seq+rule+source）/ A1.4.b 规则库（cat+code+name+rule+src+ref）/
 *      科目说明（名称+全称+说明+准则依据）/ 编码规则 / FY 明细科目；
 *   ② 字节级 CDATA 比对：文件中每个 CDATA 原文必须在该编码的 TS 文字里逐字出现（多重集相等），
 *      用于捕获「解析端 trim 掩盖的前后空白」等结构比较看不到的差异。
 */
import { readdirSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import { registerRawTexts, getAllFormTexts } from '../src/utils/xmlTexts';
import { BUDGET_FIELD_REGISTRY, getFormName } from '../src/data/budgetFormRegistry';
import { RESEARCH_SUB_ENTRIES } from '../src/data/researchSubEntries';
import { UNIFIED_BUDGET_ACCOUNTS, BUDGET_ACCOUNT_CODING_RULES } from '../src/data/unifiedBudgetChartOfAccounts';
import { FIXED_EXPENSE_BUDGET_SUBJECTS } from '../src/data/expenseBudgetSubjectsData';
import { PL_ROWS, BS_ROWS, CF_ROWS, STATEMENT_RULES } from '../src/utils/adapters/financial';
import {
  BUSINESS_BLOCKS,
  findRules,
  findSubRules,
  fieldsForDisplayFromTs,
  FORM_LEVEL_NOTES,
  APPLICABLE_SCENARIOS,
  FORM_DATA_RELATION_SUMMARY,
  FINANCIAL_STATEMENT_CONVERSION,
  NO_VOUCHER_FORM_NOTE,
} from '../src/components/ResearchSummaryView';

const textsDir = resolve(__dirname, '../src/data/texts');
if (!existsSync(textsDir)) {
  console.error(`[validate] 文字源目录不存在：${textsDir}`);
  process.exit(1);
}

const files = readdirSync(textsDir).filter((f) => f.toLowerCase().endsWith('.xml')).sort();
const rawByPath = Object.fromEntries(files.map((f) => [`/src/data/texts/${f}`, readFileSync(resolve(textsDir, f), 'utf-8')]));
registerRawTexts(rawByPath);
const formTexts = getAllFormTexts();

const mismatches: string[] = [];
let checks = 0;

function cmp(where: string, tsValue: unknown, xmlValue: unknown): void {
  checks += 1;
  const a = tsValue === undefined || tsValue === null ? '' : String(tsValue);
  const b = xmlValue === undefined || xmlValue === null ? '' : String(xmlValue);
  if (a !== b) mismatches.push(`${where}\n    TS : ${JSON.stringify(a)}\n    XML: ${JSON.stringify(b)}`);
}

function cmpList(where: string, tsList: string[], xmlList: string[]): void {
  checks += 1;
  if (tsList.length !== xmlList.length) {
    mismatches.push(`${where} 条数不一致：TS ${tsList.length} 条 / XML ${xmlList.length} 条`);
    return;
  }
  tsList.forEach((v, i) => cmp(`${where}[${i}]`, v, xmlList[i]));
}

// ── 表单文字逐字比对 ─────────────────────────────────────────────────────────

const SUB_ENTRY_CODES = new Set(RESEARCH_SUB_ENTRIES.map((e) => e.code));
const REGISTRY_FORM_CODES = new Set(BUDGET_FIELD_REGISTRY.map((f) => f.formCode));
const REG_NAME = new Map<string, string>();
BUDGET_FIELD_REGISTRY.forEach((f) => REG_NAME.set(`${f.formCode}|${f.fieldCode}`, f.fieldName));

const candidates = new Set<string>();
BUDGET_FIELD_REGISTRY.forEach((f) => candidates.add(f.formCode));
RESEARCH_SUB_ENTRIES.forEach((e) => {
  candidates.add(e.code);
  candidates.add(e.parent);
});
[FORM_LEVEL_NOTES, APPLICABLE_SCENARIOS, FORM_DATA_RELATION_SUMMARY, FINANCIAL_STATEMENT_CONVERSION, NO_VOUCHER_FORM_NOTE]
  .forEach((rec) => Object.keys(rec).forEach((c) => candidates.add(c)));
BUSINESS_BLOCKS.forEach((b) => b.formCodes.forEach((c) => candidates.add(c)));

const specialCodes = new Set(['_statement-rules', '_chart-of-accounts']);
let comparedForms = 0;
let sectionCount = { overview: 0, fields: 0, rules: 0, scenarios: 0, relation: 0, events: 0, noVoucher: 0 };

for (const code of [...candidates].sort()) {
  if (!code || specialCodes.has(code) || /[\/\s、]/.test(code)) continue;
  const ft = formTexts[code];

  const tsOverview = FORM_LEVEL_NOTES[code];
  const emitFields = REGISTRY_FORM_CODES.has(code) || code === 'A1.RACI' || code.startsWith('BB.4.X.');
  const tsFields = emitFields ? fieldsForDisplayFromTs(code) : [];
  const subRules = SUB_ENTRY_CODES.has(code) ? findSubRules(code) : null;
  const ruleCode = SUB_ENTRY_CODES.has(code) ? RESEARCH_SUB_ENTRIES.find((e) => e.code === code)?.parent ?? code : code;
  const tsRules = subRules && subRules.length > 0 ? subRules : findRules(ruleCode);
  const tsScenario = APPLICABLE_SCENARIOS[code];
  const tsRelation = FORM_DATA_RELATION_SUMMARY[code];
  const tsEvents = FINANCIAL_STATEMENT_CONVERSION[code]?.items ?? [];
  const tsNoVoucher = NO_VOUCHER_FORM_NOTE[code];

  const hasAny =
    !!tsOverview || tsFields.length > 0 || tsRules.length > 0 ||
    (!!tsScenario && (tsScenario.applies.length > 0 || tsScenario.notApplies.length > 0)) ||
    !!tsRelation || tsEvents.length > 0 || !!tsNoVoucher;

  if (!hasAny) {
    if (ft) mismatches.push(`${code}：TS 无任何文字，但存在 XML 文件 ${code}.xml（会改变渲染语义）`);
    continue;
  }
  comparedForms += 1;
  if (!ft) {
    mismatches.push(`${code}：TS 有文字但缺少 XML 文件 ${code}.xml`);
    continue;
  }

  // 文件名 / 根节点编码 / 根节点名称
  cmp(`${code}.code`, code, ft.code);
  cmp(`${code}.name`, getFormName(code) || RESEARCH_SUB_ENTRIES.find((e) => e.code === code)?.name || code, ft.name);

  // ① 表概述
  cmp(`${code}.overview`, tsOverview ?? '', ft.overview);
  if (tsOverview) sectionCount.overview += 1;

  // ② 字段与值说明（登记名 / 渲染名 / 数据来源 / 其他说明）
  cmpList(`${code}.fields.code`, tsFields.map((f) => f.fieldCode), ft.fields.map((f) => f.code));
  tsFields.forEach((f, i) => {
    const x = ft.fields[i];
    if (!x) return;
    const regName = REG_NAME.get(`${code}|${f.fieldCode}`);
    cmp(`${code}.fields[${f.fieldCode}].name(登记名)`, regName ?? f.fieldName, x.name);
    cmp(`${code}.fields[${f.fieldCode}].display(渲染名)`, f.fieldName, x.display || x.name);
    cmp(`${code}.fields[${f.fieldCode}].source`, f.source, x.source);
    cmp(`${code}.fields[${f.fieldCode}].remark`, f.remark, x.remark);
  });
  sectionCount.fields += tsFields.length;

  // ③ 规则要点（分组 form + points 逐条）
  cmpList(`${code}.rules.form`, tsRules.map((r) => r.form), ft.rules.map((r) => r.form));
  tsRules.forEach((r, i) => {
    const x = ft.rules[i];
    if (!x) return;
    cmpList(`${code}.rules[${i}].points`, r.points, x.points);
  });
  sectionCount.rules += tsRules.reduce((n, r) => n + r.points.length, 0);

  // ④ 适用业务情形
  cmpList(`${code}.applies`, tsScenario?.applies ?? [], ft.applies);
  cmpList(`${code}.notApplies`, tsScenario?.notApplies ?? [], ft.notApplies);
  sectionCount.scenarios += (tsScenario?.applies.length ?? 0) + (tsScenario?.notApplies.length ?? 0);

  // ⑤ 数据关系
  if (tsRelation) {
    const r = ft.relation;
    if (!r) {
      mismatches.push(`${code}.relation：TS 有数据关系，XML 缺失`);
    } else {
      cmp(`${code}.relation.summary`, tsRelation.summary, r.summary);
      cmpList(`${code}.relation.dataSources.code`, tsRelation.dataSources.map((d) => d.code), r.dataSources.map((d) => d.code));
      cmpList(`${code}.relation.dataSources.name`, tsRelation.dataSources.map((d) => d.name), r.dataSources.map((d) => d.name));
      cmpList(`${code}.relation.dataSources.fields`, tsRelation.dataSources.map((d) => d.fields), r.dataSources.map((d) => d.fields));
      cmpList(`${code}.relation.dataSources.relation`, tsRelation.dataSources.map((d) => d.relation), r.dataSources.map((d) => d.relation));
      cmpList(`${code}.relation.outputs.target`, tsRelation.outputs.map((o) => o.target), r.outputs.map((o) => o.target));
      cmpList(`${code}.relation.outputs.path`, tsRelation.outputs.map((o) => o.path), r.outputs.map((o) => o.path));
      cmpList(`${code}.relation.keyRules`, tsRelation.keyRules, r.keyRules);
      sectionCount.relation += tsRelation.dataSources.length + tsRelation.outputs.length + tsRelation.keyRules.length;
    }
  } else if (ft.relation) {
    mismatches.push(`${code}.relation：XML 有数据关系，TS 无（会改变渲染语义）`);
  }

  // ⑥ 转换规则事件（8 列逐列）
  cmpList(`${code}.events.event`, tsEvents.map((e) => e.event), ft.events.map((e) => e.event));
  cmpList(`${code}.events.field`, tsEvents.map((e) => e.field), ft.events.map((e) => e.field));
  (['pl', 'bs', 'cf', 'source', 'entry', 'note'] as const).forEach((k) => {
    cmpList(`${code}.events.${k}`, tsEvents.map((e) => e[k]), ft.events.map((e) => e[k]));
  });
  sectionCount.events += tsEvents.length;

  // ⑥ 无分录说明
  cmp(`${code}.noVoucher`, tsNoVoucher ?? '', ft.noVoucher);
  if (tsNoVoucher) sectionCount.noVoucher += 1;
}

// ── 三表取数规则（_statement-rules.xml）─────────────────────────────────────

const sr = formTexts['_statement-rules'];
if (!sr) {
  mismatches.push('_statement-rules.xml 缺失');
} else {
  const families: [string, { code: string; name: string; seq?: string; rule: string; source: string }[]][] = [
    ['PL', PL_ROWS],
    ['BS', BS_ROWS],
    ['CF', CF_ROWS],
  ];
  for (const [family, rows] of families) {
    const xs = sr.statementRows.filter((r) => r.family === family);
    cmp(`${family}.statementRows 行数`, rows.length, xs.length);
    rows.forEach((row, i) => {
      const x = xs[i];
      if (!x) return;
      cmp(`${family}[${i}].code`, row.code, x.code);
      cmp(`${family}[${i}].name`, row.name, x.name);
      cmp(`${family}[${i}].seq`, row.seq ?? '', x.seq);
      cmp(`${family}[${i}].rule`, row.rule, x.rule);
      cmp(`${family}[${i}].source`, row.source, x.source);
    });
  }
  cmp('A1.4.b 规则库行数', STATEMENT_RULES.length, sr.a14Rules.length);
  STATEMENT_RULES.forEach((item, i) => {
    const x = sr.a14Rules[i];
    if (!x) return;
    const anyItem = item as { cat: string; code: string; name: string; rule: string; src?: string; source?: string; ref: string };
    cmp(`A1.4.b[${i}].cat`, anyItem.cat, x.cat);
    cmp(`A1.4.b[${i}].code`, anyItem.code, x.code);
    cmp(`A1.4.b[${i}].name`, anyItem.name, x.name);
    cmp(`A1.4.b[${i}].rule`, anyItem.rule, x.rule);
    cmp(`A1.4.b[${i}].src`, anyItem.src !== undefined ? anyItem.src : anyItem.source ?? '', x.src);
    cmp(`A1.4.b[${i}].ref`, anyItem.ref, x.ref);
  });
}

// ── 科目说明（_chart-of-accounts.xml）──────────────────────────────────────

const ca = formTexts['_chart-of-accounts'];
if (!ca) {
  mismatches.push('_chart-of-accounts.xml 缺失');
} else {
  cmp('accounts 条数', UNIFIED_BUDGET_ACCOUNTS.length, ca.accounts.length);
  UNIFIED_BUDGET_ACCOUNTS.forEach((a, i) => {
    const x = ca.accounts[i];
    if (!x) return;
    cmp(`account[${i}:${a.code}].code`, a.code, x.code);
    cmp(`account[${i}:${a.code}].family`, a.family, x.family);
    cmp(`account[${i}:${a.code}].name`, a.name, x.name);
    cmp(`account[${i}:${a.code}].fullName`, a.fullName, x.fullName);
    cmp(`account[${i}:${a.code}].description`, a.description, x.description);
    cmp(`account[${i}:${a.code}].standardRef`, a.accountingStandardRef, x.standardRef);
  });
  cmp('codingRules 条数', BUDGET_ACCOUNT_CODING_RULES.length, ca.accountCodingRules.length);
  BUDGET_ACCOUNT_CODING_RULES.forEach((r, i) => {
    const x = ca.accountCodingRules[i];
    if (!x) return;
    cmp(`codingRule[${i}:${r.family}].family`, r.family, x.family);
    cmp(`codingRule[${i}:${r.family}].prefix`, r.prefix, x.prefix);
    cmp(`codingRule[${i}:${r.family}].familyName`, r.familyName, x.familyName);
    cmp(`codingRule[${i}:${r.family}].codePattern`, r.codePattern, x.codePattern);
    cmp(`codingRule[${i}:${r.family}].exampleCode`, r.exampleCode, x.exampleCode);
    cmp(`codingRule[${i}:${r.family}].description`, r.description, x.description);
    cmp(`codingRule[${i}:${r.family}].governingStandards`, r.governingStandards, x.governingStandards);
    cmp(`codingRule[${i}:${r.family}].associatedStatements`, r.associatedStatements.join(' / '), x.associatedStatements);
  });
  cmp('expenseSubjects 条数', FIXED_EXPENSE_BUDGET_SUBJECTS.length, ca.expenseSubjects.length);
  FIXED_EXPENSE_BUDGET_SUBJECTS.forEach((it, i) => {
    const x = ca.expenseSubjects[i];
    if (!x) return;
    cmp(`expenseSubject[${i}:${it.subjectCode}].code`, it.subjectCode, x.code);
    cmp(`expenseSubject[${i}:${it.subjectCode}].name`, it.subjectName, x.name);
    cmp(`expenseSubject[${i}:${it.subjectCode}].fullName`, it.fullName, x.fullName);
    cmp(`expenseSubject[${i}:${it.subjectCode}].description`, it.description ?? '', x.description);
  });
}

// ── ② 字节级 CDATA 比对（多重集）───────────────────────────────────────────

const CDATA_RE = /<!\[CDATA\[([\s\S]*?)\]\]>/g;
const tsStringsByCode = new Map<string, string[]>();
function pushTs(code: string, values: (string | undefined)[]) {
  const arr = tsStringsByCode.get(code) ?? [];
  values.forEach((v) => arr.push(v ?? ''));
  tsStringsByCode.set(code, arr);
}
for (const code of [...candidates].sort()) {
  if (!code || specialCodes.has(code) || /[\/\s、]/.test(code)) continue;
  const emitFields = REGISTRY_FORM_CODES.has(code) || code === 'A1.RACI' || code.startsWith('BB.4.X.');
  const tsFields = emitFields ? fieldsForDisplayFromTs(code) : [];
  const subRules = SUB_ENTRY_CODES.has(code) ? findSubRules(code) : null;
  const ruleCode = SUB_ENTRY_CODES.has(code) ? RESEARCH_SUB_ENTRIES.find((e) => e.code === code)?.parent ?? code : code;
  const tsRules = subRules && subRules.length > 0 ? subRules : findRules(ruleCode);
  const tsScenario = APPLICABLE_SCENARIOS[code];
  const tsRelation = FORM_DATA_RELATION_SUMMARY[code];
  const tsEvents = FINANCIAL_STATEMENT_CONVERSION[code]?.items ?? [];
  pushTs(code, ([
    // 表概述/无分录说明：未登记时不写 XML，故仅在有值时纳入比较
    ...(FORM_LEVEL_NOTES[code] !== undefined ? [FORM_LEVEL_NOTES[code]] : []),
    ...(NO_VOUCHER_FORM_NOTE[code] !== undefined ? [NO_VOUCHER_FORM_NOTE[code]] : []),
    ...tsFields.map((f) => f.remark),
    ...tsRules.flatMap((r) => r.points),
    ...(tsScenario?.applies ?? []),
    ...(tsScenario?.notApplies ?? []),
    ...(tsRelation ? [tsRelation.summary, ...tsRelation.dataSources.map((d) => d.relation), ...tsRelation.outputs.map((o) => o.path), ...tsRelation.keyRules] : []),
    ...tsEvents.flatMap((e) => [e.pl, e.bs, e.cf, e.source, e.entry, e.note]),
    // undefined 与空串在 XML 中同为 <![CDATA[]]>，比较前统一为 ''
  ] as (string | undefined)[]).map((v) => v ?? ''));
}
pushTs('_statement-rules', [
  ...PL_ROWS.flatMap((r) => [r.rule, r.source]),
  ...BS_ROWS.flatMap((r) => [r.rule, r.source]),
  ...CF_ROWS.flatMap((r) => [r.rule, r.source]),
  ...STATEMENT_RULES.flatMap((it) => {
    const a = it as { rule: string; src?: string; source?: string };
    return [a.rule, a.src !== undefined ? a.src : a.source ?? ''];
  }),
]);
pushTs('_chart-of-accounts', [
  ...UNIFIED_BUDGET_ACCOUNTS.flatMap((a) => [a.description, a.accountingStandardRef]),
  ...BUDGET_ACCOUNT_CODING_RULES.flatMap((r) => [r.codePattern, r.description, r.governingStandards, r.associatedStatements.join(' / ')]),
  ...FIXED_EXPENSE_BUDGET_SUBJECTS.map((it) => it.description ?? ''),
]);

let cdataTotal = 0;
for (const file of files) {
  const code = file.replace(/\.xml$/i, '');
  // 先剥离文件头注释（口径约定说明里含 CDATA 示例字样，不参与正文比对）
  const raw = rawByPath[`/src/data/texts/${file}`].replace(/<!--[\s\S]*?-->/g, '');
  const found: string[] = [];
  CDATA_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = CDATA_RE.exec(raw)) !== null) found.push(m[1]);
  cdataTotal += found.length;

  const expected = tsStringsByCode.get(code);
  if (!expected) {
    mismatches.push(`${file}：不在候选编码集合内（多余文件）`);
    continue;
  }
  const countOf = (arr: string[]) => arr.reduce((map, v) => map.set(v, (map.get(v) ?? 0) + 1), new Map<string, number>());
  const expMap = countOf(expected);
  const gotMap = countOf(found);
  for (const v of new Set([...expected, ...found])) {
    const a = expMap.get(v) ?? 0;
    const b = gotMap.get(v) ?? 0;
    if (a !== b) {
      mismatches.push(
        `${file}：CDATA 多重集不一致 —— TS 文字出现 ${a} 次 / XML 出现 ${b} 次\n` +
        `    TS 原文: ${JSON.stringify(v.slice(0, 120))}${v.length > 120 ? '…' : ''}`,
      );
    }
  }
}

// ── 报告 ─────────────────────────────────────────────────────────────────────

console.log(`[validate] XML 文件 ${files.length} 个（含 _statement-rules / _chart-of-accounts）`);
console.log(`[validate] 逐字比对的表单 ${comparedForms} 个；比对项合计 ${checks} 项；CDATA 原文 ${cdataTotal} 段`);
console.log(
  `[validate] 覆盖：表概述 ${sectionCount.overview} · 字段 ${sectionCount.fields} · 规则要点 ${sectionCount.rules} · ` +
  `适用情形 ${sectionCount.scenarios} · 数据关系项 ${sectionCount.relation} · 转换事件 ${sectionCount.events} · 无分录说明 ${sectionCount.noVoucher}`,
);
console.log(`[validate] 三表报表行 PL${PL_ROWS.length}/BS${BS_ROWS.length}/CF${CF_ROWS.length} · A1.4.b ${STATEMENT_RULES.length} 行` +
  ` · 科目 ${UNIFIED_BUDGET_ACCOUNTS.length} 条 · 编码规则 ${BUDGET_ACCOUNT_CODING_RULES.length} 条 · FY 明细科目 ${FIXED_EXPENSE_BUDGET_SUBJECTS.length} 条`);

if (mismatches.length === 0) {
  console.log('\n[validate] ✅ 不一致清单为空：XML 文字源与 TS 原文逐字一致（100% 一致）');
  process.exit(0);
}
console.error(`\n[validate] ❌ 不一致 ${mismatches.length} 处：`);
mismatches.forEach((m, i) => console.error(`\n  ${i + 1}. ${m}`));
process.exit(1);
