/**
 * 一次性迁移脚本：把调研页的「文字内容」从 TS 源码逐字搬迁到 src/data/texts/*.xml
 * =============================================================================
 * 用法：npx tsx scripts/migrateTextsToXml.ts
 *
 * 迁移原则：逐字搬运，不改一字（CDATA 内原文照搬，含换行/引号/特殊字符；短标识用 XML 属性）。
 * 每张表一个 src/data/texts/<formCode>.xml；另生成两个非表单文件：
 *   · src/data/texts/_statement-rules.xml   —— 三表取数规则（financial.ts PL_ROWS/BS_ROWS/CF_ROWS + STATEMENT_RULES）
 *   · src/data/texts/_chart-of-accounts.xml —— 科目说明（unifiedBudgetChartOfAccounts.ts + expenseBudgetSubjectsData.ts）
 *
 * 文字来源（逐字取值，取的都是「渲染实际使用的文字」）：
 *   1. 表概述           ResearchSummaryView.tsx FORM_LEVEL_NOTES
 *   2. ②字段说明        fieldsForDisplayFromTs()（= BUDGET_FIELD_REGISTRY + 调研页投影/就地声明字段）
 *                       name=登记名（BUDGET_FIELD_REGISTRY.fieldName，供 A1.2 列登记簿）；
 *                       display=渲染名（投影与登记名不同时写出，缺省渲染名取 name）
 *   3. ③规则要点        findRules(parentCode) / findSubRules(subCode) 聚合结果
 *   4. ④适用情形        APPLICABLE_SCENARIOS
 *   5. ⑤数据关系        FORM_DATA_RELATION_SUMMARY
 *   6. ⑥转换规则        FINANCIAL_STATEMENT_CONVERSION + NO_VOUCHER_FORM_NOTE
 *   7. 三表取数规则      src/utils/adapters/financial.ts
 *   8. 科目说明          src/data/unifiedBudgetChartOfAccounts.ts（+ src/data/expenseBudgetSubjectsData.ts 的 FY 明细科目）
 *
 * 逐字校验：npx tsx scripts/validateTextsXml.ts（把 XML 解析结果与上述 TS 原值逐字段比对）
 * 结构化元数据（inputMode / required / dataType / 层级 / 是否列报行等）不迁移，继续留在 TS。
 */
import { writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import { BUDGET_FIELD_REGISTRY, getFormName } from '../src/data/budgetFormRegistry';
import { RESEARCH_SUB_ENTRIES } from '../src/data/researchSubEntries';
import {
  UNIFIED_BUDGET_ACCOUNTS,
  BUDGET_ACCOUNT_CODING_RULES,
} from '../src/data/unifiedBudgetChartOfAccounts';
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

// ── XML 生成工具 ─────────────────────────────────────────────────────────────

/** 属性值转义（& < > " 必须转义；换行/制表符转字符引用，避免解析端空白归一化） */
function esc(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '&#10;')
    .replace(/\r/g, '&#13;')
    .replace(/\t/g, '&#9;');
}

/** 长文本 CDATA；正文含 ]]> 时按 XML 规范拆分拼接（解析结果与原串完全一致） */
function cdata(s: string): string {
  return `<![CDATA[${String(s ?? '').replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

const usedAttrs = new Map<string, string>();
/** 属性写法：短标识用属性；同时登记以便校验（含换行的属性值会单独提示） */
function attr(name: string, value: string | undefined): string {
  if (value === undefined || value === null || value === '') return `${name}=""`;
  usedAttrs.set(`${name}=${value}`, value);
  return `${name}="${esc(value)}"`;
}

const FILE_HEADER = (code: string, name: string, source: string) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<!--\n` +
  `  ${code} ${name} · 文字源（由 scripts/migrateTextsToXml.ts 自动生成，请勿手工编辑）\n` +
  `\n` +
  `  口径约定：\n` +
  `    · 长文本一律 CDATA 包裹（<![CDATA[ 原文 ]]>），CDATA 与标签紧邻、不留空白；\n` +
  `    · 短标识（code / name / source / fields / target / event / field / form / cat / ref / family）用 XML 属性；\n` +
  `    · 结构化元数据（inputMode / required / dataType 等）不写在本文件，继续留在 TS 源；\n` +
  `    · 文字只搬不改：内容与 TS 文字源逐字一致（校验见 scripts/validateTextsXml.ts）。\n` +
  `\n` +
  `  迁移源：${source}\n` +
  `  解析：src/utils/xmlTexts.ts（两端共用 parseFormTextXml）\n` +
  `    前端 —— import.meta.glob('/src/data/texts/*.xml', { as: 'raw' })\n` +
  `    脚本 —— scripts/generateResearchMarkdownContent.ts（readdirSync/readFileSync → registerRawTexts）\n` +
  `-->\n`;

const SOURCE_NOTE =
  'ResearchSummaryView.tsx（表概述/字段说明/规则要点/适用情形/数据关系/⑥转换规则）、budgetFormRegistry.ts（字段登记名）';

// ── 表单文字：按 formCode 组织 ───────────────────────────────────────────────

interface FormXmlInput {
  code: string;
  name: string;
}

/** 子条目编码集合（TAB 级目录条目），用于区分「子表专属规则」与「父表单聚合规则」 */
const SUB_ENTRY_CODES = new Set(RESEARCH_SUB_ENTRIES.map((e) => e.code));
const REGISTRY_FORM_CODES = new Set(BUDGET_FIELD_REGISTRY.map((f) => f.formCode));
const REGISTRY_FIELD_NAME = new Map<string, string>();
BUDGET_FIELD_REGISTRY.forEach((f) => REGISTRY_FIELD_NAME.set(`${f.formCode}|${f.fieldCode}`, f.fieldName));

/** 一张表的 XML 正文（各区块：有内容才写，保证渲染取数语义与迁移前一致） */
function buildFormXml(code: string, name: string): { xml: string; stat: string } {
  const parts: string[] = [];
  const count = { overview: 0, fields: 0, rules: 0, scenarios: 0, relation: 0, events: 0, noVoucher: 0 };

  // ① 表概述
  const overview = FORM_LEVEL_NOTES[code];
  if (overview) {
    parts.push(`  <!-- 表概述（原 FORM_LEVEL_NOTES['${code}']） -->\n  <overview>${cdata(overview)}</overview>\n`);
    count.overview = 1;
  }

  // ② 字段与值说明（文字：登记名 / 渲染名 / 数据来源 / 其他说明）
  const emitFields = REGISTRY_FORM_CODES.has(code) || code === 'A1.RACI' || code.startsWith('BB.4.X.');
  const fields = emitFields ? fieldsForDisplayFromTs(code) : [];
  if (fields.length > 0) {
    const lines = fields.map((f) => {
      const regName = REGISTRY_FIELD_NAME.get(`${code}|${f.fieldCode}`);
      const nameAttr = regName ?? f.fieldName;
      const display = f.fieldName !== nameAttr ? ` ${attr('display', f.fieldName)}` : '';
      return `    <field ${attr('code', f.fieldCode)} ${attr('name', nameAttr)}${display} ${attr('source', f.source)}>${cdata(f.remark)}</field>`;
    });
    parts.push(`  <!-- ② 字段与值说明（原 BUDGET_FIELD_REGISTRY / 调研页字段投影，formCode='${code}'） -->\n  <fields>\n${lines.join('\n')}\n  </fields>\n`);
    count.fields = fields.length;
  }

  // ③ 关键规则要点（与前端 rules 取数完全一致：子条目专属规则优先，无专属规则时用父表单聚合规则）
  const subRules = SUB_ENTRY_CODES.has(code) ? findSubRules(code) : null;
  const ruleCode = SUB_ENTRY_CODES.has(code) ? RESEARCH_SUB_ENTRIES.find((e) => e.code === code)?.parent ?? code : code;
  const ruleGroups = subRules && subRules.length > 0 ? subRules : findRules(ruleCode);
  if (ruleGroups.length > 0) {
    const groups = ruleGroups.map(
      (g) =>
        `    <rule ${attr('form', g.form)}>\n` +
        g.points.map((p) => `      <point>${cdata(p)}</point>`).join('\n') +
        `\n    </rule>`,
    );
    parts.push(`  <!-- ③ 关键规则要点（原 BUSINESS_BLOCKS 按表单编码聚合） -->\n  <rules>\n${groups.join('\n')}\n  </rules>\n`);
    count.rules = ruleGroups.length;
  }

  // ④ 适用业务情形
  const scenario = APPLICABLE_SCENARIOS[code];
  if (scenario && (scenario.applies.length > 0 || scenario.notApplies.length > 0)) {
    parts.push(
      `  <!-- ④ 适用业务情形（原 APPLICABLE_SCENARIOS['${code}']） -->\n  <scenarios>\n` +
        `    <applies>\n${scenario.applies.map((t) => `      <item>${cdata(t)}</item>`).join('\n')}\n    </applies>\n` +
        `    <notApplies>\n${scenario.notApplies.map((t) => `      <item>${cdata(t)}</item>`).join('\n')}\n    </notApplies>\n  </scenarios>\n`,
    );
    count.scenarios = scenario.applies.length + scenario.notApplies.length;
  }

  // ⑤ 数据关系总结
  const relation = FORM_DATA_RELATION_SUMMARY[code];
  if (relation) {
    parts.push(
      `  <!-- ⑤ 预算编制视角：数据关系总结（原 FORM_DATA_RELATION_SUMMARY['${code}']） -->\n  <relation>\n` +
        `    <summary>${cdata(relation.summary)}</summary>\n` +
        `    <dataSources>\n${
          relation.dataSources
            .map((s) => `      <source ${attr('code', s.code)} ${attr('name', s.name)} ${attr('fields', s.fields)}>${cdata(s.relation)}</source>`)
            .join('\n')
        }\n    </dataSources>\n` +
        `    <outputs>\n${
          relation.outputs.map((o) => `      <output ${attr('target', o.target)}>${cdata(o.path)}</output>`).join('\n')
        }\n    </outputs>\n` +
        `    <keyRules>\n${relation.keyRules.map((r) => `      <rule>${cdata(r)}</rule>`).join('\n')}\n    </keyRules>\n  </relation>\n`,
    );
    count.relation = relation.dataSources.length + relation.outputs.length + relation.keyRules.length;
  }

  // ⑥ 财务报表项转换规则
  const conversion = FINANCIAL_STATEMENT_CONVERSION[code];
  if (conversion && conversion.items.length > 0) {
    const events = conversion.items.map(
      (e) =>
        `    <event ${attr('event', e.event)} ${attr('field', e.field)}>\n` +
        `      <pl>${cdata(e.pl)}</pl>\n` +
        `      <bs>${cdata(e.bs)}</bs>\n` +
        `      <cf>${cdata(e.cf)}</cf>\n` +
        `      <source>${cdata(e.source)}</source>\n` +
        `      <entry>${cdata(e.entry)}</entry>\n` +
        `      <note>${cdata(e.note)}</note>\n` +
        `    </event>`,
    );
    parts.push(`  <!-- ⑥ 财务报表项转换规则（原 FINANCIAL_STATEMENT_CONVERSION['${code}'].items） -->\n  <events>\n${events.join('\n')}\n  </events>\n`);
    count.events = conversion.items.length;
  }

  // ⑥ 无转换规则时的说明文案
  const noVoucher = NO_VOUCHER_FORM_NOTE[code];
  if (noVoucher) {
    parts.push(`  <!-- ⑥ 无转换规则说明（原 NO_VOUCHER_FORM_NOTE['${code}']） -->\n  <noVoucher>${cdata(noVoucher)}</noVoucher>\n`);
    count.noVoucher = 1;
  }

  const hasContent = parts.length > 0;
  const xml = hasContent
    ? FILE_HEADER(code, name, SOURCE_NOTE) + `<form ${attr('code', code)} ${attr('name', name)}>\n\n` + parts.join('\n') + `\n</form>\n`
    : '';
  const stat = `概述${count.overview} 字段${count.fields} 规则组${count.rules} 情形${count.scenarios} 关系项${count.relation} 事件${count.events} 无分录${count.noVoucher}`;
  return { xml, stat };
}

// ── 三表取数规则（_statement-rules.xml）─────────────────────────────────────

function buildStatementRulesXml(): string {
  const reports: string[] = [];
  const families: [string, typeof PL_ROWS | typeof BS_ROWS | typeof CF_ROWS][] = [
    ['PL', PL_ROWS],
    ['BS', BS_ROWS],
    ['CF', CF_ROWS],
  ];
  for (const [family, rows] of families) {
    const rowXml = rows
      .map((r) => {
        const anyRow = r as { code: string; name: string; seq?: string; rule: string; source: string; isSection?: boolean; isTotal?: boolean };
        return (
          `      <row ${attr('code', anyRow.code)} ${attr('name', anyRow.name)} ${attr('seq', anyRow.seq)}` +
          `${anyRow.isSection ? ' isSection="1"' : ''}${anyRow.isTotal ? ' isTotal="1"' : ''}>\n` +
          `        <rule>${cdata(anyRow.rule)}</rule>\n` +
          `        <source>${cdata(anyRow.source)}</source>\n` +
          `      </row>`
        );
      })
      .join('\n');
    reports.push(`    <report ${attr('family', family)}>\n${rowXml}\n    </report>`);
  }

  const a14 = STATEMENT_RULES.map((item) => {
    const anyItem = item as { cat: string; code: string; name: string; rule: string; src?: string; source?: string; ref: string; isTotal?: boolean };
    const src = anyItem.src !== undefined ? anyItem.src : anyItem.source ?? '';
    return (
      `    <item ${attr('cat', anyItem.cat)} ${attr('code', anyItem.code)} ${attr('name', anyItem.name)} ${attr('ref', anyItem.ref)}` +
      `${anyItem.isTotal ? ' isTotal="1"' : ''}>\n` +
      `      <rule>${cdata(anyItem.rule)}</rule>\n` +
      `      <src>${cdata(src)}</src>\n` +
      `    </item>`
    );
  }).join('\n');

  const body =
    `  <!-- 报表行级取数规则（原 src/utils/adapters/financial.ts 的 PL_ROWS / BS_ROWS / CF_ROWS）\n` +
    `       同时驱动 BO.PL/BO.BS/BO.CF 表样行与 BO.PL.b/BO.BS.b/BO.CF.b 上游自动取数规则表；\n` +
    `       行序与 TS 数组一一对应（按行序取数，不按编码匹配——编码可重复）。 -->\n` +
    `  <statementRows>\n${reports.join('\n')}\n  </statementRows>\n\n` +
    `  <!-- A1.4.b 财务三表取数与科目汇总规则库（原 financial.ts buildFinancialConversionOverviewSheets 内的 STATEMENT_RULES）。\n` +
    `       行序与 TS 数组一一对应。 -->\n` +
    `  <a14Rules>\n${a14}\n  </a14Rules>\n`;

  return FILE_HEADER('_statement-rules', '三表取数规则（报表行级 + A1.4.b 规则库）', 'src/utils/adapters/financial.ts（PL_ROWS / BS_ROWS / CF_ROWS / STATEMENT_RULES）') +
    `<form ${attr('code', '_statement-rules')} ${attr('name', '三表取数规则（报表行级 + A1.4.b 规则库）')}>\n\n${body}\n</form>\n`;
}

// ── 科目说明（_chart-of-accounts.xml）──────────────────────────────────────

function buildChartOfAccountsXml(): string {
  const accounts = UNIFIED_BUDGET_ACCOUNTS.map(
    (a) =>
      `    <account ${attr('code', a.code)} ${attr('family', a.family)} ${attr('name', a.name)} ${attr('fullName', a.fullName)}>\n` +
      `      <description>${cdata(a.description)}</description>\n` +
      `      <standardRef>${cdata(a.accountingStandardRef)}</standardRef>\n` +
      `    </account>`,
  ).join('\n');

  const codingRules = BUDGET_ACCOUNT_CODING_RULES.map(
    (r) =>
      `    <rule ${attr('family', r.family)} ${attr('prefix', r.prefix)} ${attr('familyName', r.familyName)} ${attr('exampleCode', r.exampleCode)}>\n` +
      `      <codePattern>${cdata(r.codePattern)}</codePattern>\n` +
      `      <description>${cdata(r.description)}</description>\n` +
      `      <governingStandards>${cdata(r.governingStandards)}</governingStandards>\n` +
      `      <associatedStatements>${cdata(r.associatedStatements.join(' / '))}</associatedStatements>\n` +
      `    </rule>`,
  ).join('\n');

  const expenseSubjects = FIXED_EXPENSE_BUDGET_SUBJECTS.map(
    (it) =>
      `    <item ${attr('code', it.subjectCode)} ${attr('name', it.subjectName)} ${attr('fullName', it.fullName)}>\n` +
      `      <description>${cdata(it.description ?? '')}</description>\n` +
      `    </item>`,
  ).join('\n');

  const body =
    `  <!-- 统一科目主数据（原 src/data/unifiedBudgetChartOfAccounts.ts UNIFIED_BUDGET_ACCOUNTS），\n` +
    `       文字=科目名称/科目全称/核算范围说明/会计准则依据；结构化列（家族/层级/借贷方向/是否列报行等）留在 TS。 -->\n` +
    `  <accounts>\n${accounts}\n  </accounts>\n\n` +
    `  <!-- 科目编码规则（原 BUDGET_ACCOUNT_CODING_RULES），文字=家族名/编码结构/示例/说明/层级定义/准则依据。 -->\n` +
    `  <codingRules>\n${codingRules}\n  </codingRules>\n\n` +
    `  <!-- 费用明细科目 FY（原 src/data/expenseBudgetSubjectsData.ts FIXED_EXPENSE_BUDGET_SUBJECTS），\n` +
    `       文字=科目名称/科目全称/业务核算范围与口径说明（AA.3.b 渲染列）。 -->\n` +
    `  <expenseSubjects>\n${expenseSubjects}\n  </expenseSubjects>\n`;

  return FILE_HEADER('_chart-of-accounts', '统一预算科目与科目编码规则（科目说明）', 'src/data/unifiedBudgetChartOfAccounts.ts + src/data/expenseBudgetSubjectsData.ts') +
    `<form ${attr('code', '_chart-of-accounts')} ${attr('name', '统一预算科目与科目编码规则（科目说明）')}>\n\n${body}\n</form>\n`;
}

// ── 主流程 ───────────────────────────────────────────────────────────────────

const textsDir = resolve(__dirname, '../src/data/texts');
if (!existsSync(textsDir)) mkdirSync(textsDir, { recursive: true });

// 清空旧 XML（保证没有手工编辑残留；重新生成全部文字源）
const stale = existsSync(textsDir) ? readdirSync(textsDir).filter((f) => f.toLowerCase().endsWith('.xml')) : [];
stale.forEach((f) => unlinkSync(resolve(textsDir, f)));
console.log(`[migrate] 已清理旧 XML ${stale.length} 个：${stale.join('、') || '（无）'}`);

// 候选表单编码：注册表表单 + TAB 子条目 + 六个文字区块的登记编码 + 业务分组登记的表单编码
// （不收集规则 form 的首 token：其中含组合写法/分组标签，不是可选中表单编码；findRules 已按编码聚合规则）
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

const written: { code: string; file: string; stat: string }[] = [];
const skipped: string[] = [];
for (const code of [...candidates].sort()) {
  if (!code) continue;
  // 规则 form 首 token 可能是组合写法（如 'BAA.2/BAA.3/BAA.4'）：不是单表编码，跳过
  if (/[\/\s、]/.test(code)) {
    skipped.push(code);
    continue;
  }
  const sub = RESEARCH_SUB_ENTRIES.find((e) => e.code === code);
  const name = getFormName(code) || (sub ? `${getFormName(sub.parent) || sub.parent} ${sub.name}` : code);
  const { xml, stat } = buildFormXml(code, name);
  if (!xml) {
    skipped.push(code);
    continue;
  }
  const file = `${code}.xml`;
  writeFileSync(resolve(textsDir, file), xml, 'utf-8');
  written.push({ code, file, stat });
}

// 两个非表单文字源
writeFileSync(resolve(textsDir, '_statement-rules.xml'), buildStatementRulesXml(), 'utf-8');
written.push({ code: '_statement-rules', file: '_statement-rules.xml', stat: `报表行 PL${PL_ROWS.length}/BS${BS_ROWS.length}/CF${CF_ROWS.length} + A1.4.b ${STATEMENT_RULES.length}` });
writeFileSync(resolve(textsDir, '_chart-of-accounts.xml'), buildChartOfAccountsXml(), 'utf-8');
written.push({ code: '_chart-of-accounts', file: '_chart-of-accounts.xml', stat: `科目${UNIFIED_BUDGET_ACCOUNTS.length} 编码规则${BUDGET_ACCOUNT_CODING_RULES.length} FY明细${FIXED_EXPENSE_BUDGET_SUBJECTS.length}` });

console.log(`\n[migrate] 输出目录：${textsDir}`);
for (const w of written) console.log(`  写入 ${w.file.padEnd(28)} ${w.stat}`);
console.log(`\n[migrate] 共写入 ${written.length} 个 XML（表 ${written.length - 2} 个 + 三表取数规则 + 科目说明）；无文字未生成：${skipped.length} 个`);
if (skipped.length > 0) console.log(`[migrate] 无文字编码（跳过）：${skipped.join('、')}`);

const attrWithNewline = [...usedAttrs.values()].filter((v) => /[\n\r\t]/.test(v));
console.log(`[migrate] 属性值个数 ${usedAttrs.size}；含换行/制表符的属性值 ${attrWithNewline.length} 个（已转字符引用，解析端按原串还原）`);
