/**
 * XML 文字源解析器（试点：BB.1.1 一张表端到端验证）
 * =============================================================================
 * 目的：把调研页的「文字内容」（表概述 / 字段说明 / 规则要点 / 适用情形 / 数据关系 /
 * 财务报表项转换规则）从 TS 源码里搬到 src/data/texts/*.xml，让前端渲染与生成脚本
 * 都从同一份 XML 取文字，验证「XML 存文字 → 前端渲染读 XML → 生成脚本读 XML」整条链路。
 *
 * 两端共用同一套解析逻辑（parseFormTextXml），只是「原始 XML 文本从哪来」不同：
 *   · 前端（Vite）：import.meta.glob('/src/data/texts/*.xml', { as: 'raw' }) 打包期静态收集；
 *   · 脚本（Node/tsx）：scripts/generateResearchMarkdownContent.ts 用 fs 读盘后调用
 *     registerRawTexts()，Node 下不执行 import.meta.glob（已 try/catch 兜底为空表）。
 *
 * 迁移约定（见 src/data/texts/BB.1.1.xml 顶部注释）：
 *   · 长文本一律 CDATA 包裹 → 解析结果在 __cdata；
 *   · 短标识（code/name/source/fields/target/event/field/form）为 XML 属性，前缀 @_；
 *   · 结构化元数据（inputMode/required/dataType）不迁移，留在 BUDGET_FIELD_REGISTRY，
 *     由调用方按 fieldCode 合并（见 ResearchSummaryView.tsx 的 fieldsForDisplay）。
 *
 * 未登记 XML 的表：getFormText(code) 返回 undefined，调用方继续用原 TS 常量（本轮只迁 BB.1.1）。
 */
import { XMLParser } from 'fast-xml-parser';

// ── 类型（按需裁剪：只保留本试点用到的文字字段）────────────────────────────────

/** ② 字段与值说明：只承载文字（name/source/remark），结构化元数据留在 TS 注册表 */
export interface XmlFieldText {
  code: string;
  /** 登记名（= BUDGET_FIELD_REGISTRY.fieldName，A1.2 列登记簿按此列示） */
  name: string;
  /**
   * 渲染名（调研页②字段说明表显示用）。仅当调研页投影（financeResearchProjection /
   * 就地声明字段）与登记名不一致时写出，缺省时渲染名取 name 本身。
   */
  display: string;
  source: string;
  remark: string;
}

/** ③ 关键规则要点：一张表/一个子表可有多组（form + points） */
export interface XmlRuleGroup {
  form: string;
  points: string[];
}

/** ⑤ 数据来源（上游） */
export interface XmlDataSource {
  name: string;
  code: string;
  fields: string;
  relation: string;
}

/** ⑤ 输出影响（下游） */
export interface XmlOutput {
  target: string;
  path: string;
}

/** ⑤ 数据关系总结 */
export interface XmlRelation {
  summary: string;
  dataSources: XmlDataSource[];
  outputs: XmlOutput[];
  keyRules: string[];
}

/** ⑥ 财务报表项转换规则（一条业务事件一行） */
export interface XmlConversionEvent {
  event: string;
  field: string;
  pl: string;
  bs: string;
  cf: string;
  source: string;
  entry: string;
  note: string;
}

/** 三表取数规则：报表行级（PL/BS/CF 表样行与行级取数规则） */
export interface XmlStatementRow {
  family: string;
  code: string;
  name: string;
  seq: string;
  rule: string;
  source: string;
  isSection: boolean;
  isTotal: boolean;
}

/** 三表取数规则：A1.4.b 规则库一行 */
export interface XmlA14Rule {
  cat: string;
  code: string;
  name: string;
  rule: string;
  src: string;
  ref: string;
  isTotal: boolean;
}

/** 科目说明：统一科目主数据一条 */
export interface XmlAccountItem {
  code: string;
  family: string;
  name: string;
  fullName: string;
  description: string;
  standardRef: string;
}

/** 科目说明：科目编码规则一条 */
export interface XmlAccountCodingRule {
  family: string;
  prefix: string;
  familyName: string;
  codePattern: string;
  exampleCode: string;
  description: string;
  governingStandards: string;
  associatedStatements: string;
}

/** 科目说明：费用明细科目（FY）一条 */
export interface XmlExpenseSubject {
  code: string;
  name: string;
  fullName: string;
  description: string;
}

/** 一张表的全部文字 */
export interface FormText {
  code: string;
  name: string;
  /** 表概述 */
  overview: string;
  fields: XmlFieldText[];
  rules: XmlRuleGroup[];
  applies: string[];
  notApplies: string[];
  relation?: XmlRelation;
  events: XmlConversionEvent[];
  /** ⑥ 无转换规则时的说明文案（原 NO_VOUCHER_FORM_NOTE） */
  noVoucher: string;
  /** 三表取数规则·报表行级（仅 _statement-rules.xml 使用） */
  statementRows: XmlStatementRow[];
  /** 三表取数规则·A1.4.b 规则库（仅 _statement-rules.xml 使用） */
  a14Rules: XmlA14Rule[];
  /** 科目说明·统一科目（仅 _chart-of-accounts.xml 使用） */
  accounts: XmlAccountItem[];
  /** 科目说明·编码规则（仅 _chart-of-accounts.xml 使用） */
  accountCodingRules: XmlAccountCodingRule[];
  /** 科目说明·费用明细科目（仅 _chart-of-accounts.xml 使用） */
  expenseSubjects: XmlExpenseSubject[];
}

// ── 解析工具 ─────────────────────────────────────────────────────────────────

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  cdataPropName: '__cdata',
  trimValues: true,
  parseTagValue: false,
  parseAttributeValue: false,
  allowBooleanAttributes: true,
});

/** fast-xml-parser 对「单个子节点」不给数组 → 统一成数组 */
function asArray<T>(v: T | T[] | undefined | null): T[] {
  if (v === undefined || v === null) return [];
  return Array.isArray(v) ? v : [v];
}

/** 取节点文字：CDATA 优先（__cdata），其次纯文本节点（#text），字符串直接返回 */
function text(v: unknown): string {
  if (v === undefined || v === null) return '';
  if (typeof v === 'string') return v.trim();
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (typeof v !== 'object') return '';
  const o = v as Record<string, unknown>;
  const raw = o.__cdata ?? o['#text'];
  return typeof raw === 'string' ? raw.trim() : raw === undefined || raw === null ? '' : String(raw).trim();
}

/** 取属性值（字符串） */
function attr(v: unknown, name: string): string {
  if (v === undefined || v === null || typeof v !== 'object') return '';
  const raw = (v as Record<string, unknown>)[`@_${name}`];
  return raw === undefined || raw === null ? '' : String(raw);
}

/** 从 glob 路径里取表单编码（'/src/data/texts/BB.1.1.xml' → 'BB.1.1'） */
export function codeFromTextPath(path: string): string {
  const m = /([^/]+)\.xml$/i.exec(path);
  return m ? m[1] : '';
}

// ── 核心解析（两端共用）──────────────────────────────────────────────────────

/**
 * 解析一张表的文字 XML。
 * @param xml  XML 原文
 * @param fallbackCode 根节点未写 code 属性时的兜底编码（通常是文件名）
 */
export function parseFormTextXml(xml: string, fallbackCode = ''): FormText {
  const parsed = parser.parse(xml) as Record<string, unknown>;
  const root = (parsed.form ?? parsed) as Record<string, any>;
  const code = attr(root, 'code') || fallbackCode;
  const relationNode = root.relation;

  return {
    code,
    name: attr(root, 'name'),
    overview: text(root.overview),
    fields: asArray(root.fields?.field).map((f) => ({
      code: attr(f, 'code'),
      name: attr(f, 'name'),
      display: attr(f, 'display'),
      source: attr(f, 'source'),
      remark: text(f),
    })),
    rules: asArray(root.rules?.rule).map((r) => ({
      form: attr(r, 'form'),
      points: asArray(r.point).map(text).filter(Boolean),
    })),
    applies: asArray(root.scenarios?.applies?.item).map(text).filter(Boolean),
    notApplies: asArray(root.scenarios?.notApplies?.item).map(text).filter(Boolean),
    relation: relationNode
      ? {
          summary: text(relationNode.summary),
          dataSources: asArray(relationNode.dataSources?.source).map((s) => ({
            name: attr(s, 'name'),
            code: attr(s, 'code'),
            fields: attr(s, 'fields'),
            relation: text(s),
          })),
          outputs: asArray(relationNode.outputs?.output).map((o) => ({
            target: attr(o, 'target'),
            path: text(o),
          })),
          keyRules: asArray(relationNode.keyRules?.rule).map(text).filter(Boolean),
        }
      : undefined,
    events: asArray(root.events?.event).map((e) => ({
      event: attr(e, 'event'),
      field: attr(e, 'field'),
      pl: text(e.pl),
      bs: text(e.bs),
      cf: text(e.cf),
      source: text(e.source),
      entry: text(e.entry),
      note: text(e.note),
    })),
    noVoucher: text(root.noVoucher),
    statementRows: asArray(root.statementRows?.report).flatMap((rep) =>
      asArray(rep.row).map((row) => ({
        family: attr(rep, 'family'),
        code: attr(row, 'code'),
        name: attr(row, 'name'),
        seq: attr(row, 'seq'),
        rule: text(row.rule),
        source: text(row.source),
        isSection: attr(row, 'isSection') === '1',
        isTotal: attr(row, 'isTotal') === '1',
      })),
    ),
    a14Rules: asArray(root.a14Rules?.item).map((it) => ({
      cat: attr(it, 'cat'),
      code: attr(it, 'code'),
      name: attr(it, 'name'),
      rule: text(it.rule),
      src: text(it.src),
      ref: attr(it, 'ref'),
      isTotal: attr(it, 'isTotal') === '1',
    })),
    accounts: asArray(root.accounts?.account).map((a) => ({
      code: attr(a, 'code'),
      family: attr(a, 'family'),
      name: attr(a, 'name'),
      fullName: attr(a, 'fullName'),
      description: text(a.description),
      standardRef: text(a.standardRef),
    })),
    accountCodingRules: asArray(root.codingRules?.rule).map((r) => ({
      family: attr(r, 'family'),
      prefix: attr(r, 'prefix'),
      familyName: attr(r, 'familyName'),
      codePattern: text(r.codePattern),
      exampleCode: attr(r, 'exampleCode'),
      description: text(r.description),
      governingStandards: text(r.governingStandards),
      associatedStatements: text(r.associatedStatements),
    })),
    expenseSubjects: asArray(root.expenseSubjects?.item).map((it) => ({
      code: attr(it, 'code'),
      name: attr(it, 'name'),
      fullName: attr(it, 'fullName'),
      description: text(it.description),
    })),
  };
}

// ── 原始 XML 来源：浏览器 glob + 脚本注册 ─────────────────────────────────────

/**
 * 前端（Vite）打包期静态收集 src/data/texts/*.xml 原文。
 * as:'raw' → { '/src/data/texts/BB.1.1.xml': '<form …>' }。
 * Node（tsx 跑生成脚本）下 import.meta.glob 不存在 → 抛错被兜住，返回空表，
 * 由脚本调用 registerRawTexts() 注入磁盘读到的 XML。
 */
const GLOB_TEXTS: Record<string, string> = (() => {
  try {
    return import.meta.glob('/src/data/texts/*.xml', { as: 'raw', eager: true }) as Record<string, string>;
  } catch {
    return {};
  }
})();

/** 脚本端（Node）注册进来的原始 XML：路径 → 原文 */
const EXTERNAL_TEXTS: Record<string, string> = {};

let registry: Record<string, FormText> | null = null;

/**
 * 注册原始 XML 文本（Node/脚本两端通用）。
 * 生成脚本用 fs 读盘后调用；重复注册会覆盖同路径内容并重建索引。
 */
export function registerRawTexts(texts: Record<string, string>): void {
  Object.assign(EXTERNAL_TEXTS, texts);
  registry = null;
}

function buildRegistry(): Record<string, FormText> {
  const out: Record<string, FormText> = {};
  for (const [path, raw] of Object.entries({ ...GLOB_TEXTS, ...EXTERNAL_TEXTS })) {
    try {
      const parsed = parseFormTextXml(raw, codeFromTextPath(path));
      if (parsed.code) out[parsed.code] = parsed;
    } catch (err) {
      console.warn(`[xmlTexts] 解析失败：${path}`, err);
    }
  }
  return out;
}

/** 全部已登记的 XML 文字（按表单编码索引） */
export function getAllFormTexts(): Record<string, FormText> {
  if (!registry) registry = buildRegistry();
  return registry;
}

/** 取某张表的 XML 文字；未登记 XML 的表返回 undefined（调用方回退 TS 常量） */
export function getFormText(code: string | undefined | null): FormText | undefined {
  if (!code) return undefined;
  return getAllFormTexts()[code];
}
