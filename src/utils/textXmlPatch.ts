/**
 * XML 文字节点的「文本级定位 + 替换」（纯函数：无 React、无 localStorage、无 window）
 * =============================================================================
 * 从 src/utils/textOverrides.ts 的「导出固化」逻辑里抽出的核心，两端共用：
 *   · 浏览器：把 localStorage 覆盖值合并回 XML 原文（导出 zip / 固化包）；
 *   · Node（开发期后端中间件 scripts/saveTextPlugin.ts）：把页面编辑直接写回磁盘 XML。
 *
 * 为什么单独一个文件：vite.config.ts 里的插件需要在 Node 下 import 本模块，
 * 而 textOverrides.ts 依赖 react（useSyncExternalStore）→ 不能进配置打包图。
 *
 * 定位策略（两级，先精确后兼容）：
 *   ① 节点级定位 resolveNodeScope：按覆盖键反解出「目标节点」在原文中的区间
 *      （`<fields>` 里 code=X 的第 n 个 `<field>`、`<rules>` 里第 i 个 `<rule>` 的第 j 个
 *      `<point>`、`<relation>/<dataSources>` 里第 i 个 `<source>` …），替换只在该区间内进行；
 *      · 属性槽位再按「属性名 + 值」定位（`name="…"`），避免命中同元素里别的属性
 *        （如 `<source code="区域主数据" name="区域主数据">` 的两个同名值）；
 *      · 正文槽位在该元素正文区间里找 CDATA / 文本节点。
 *   ② 兼容：结构定位不到（未知键形态、老格式文件）时退回「全文首处命中」的旧行为。
 *
 * 为什么必须做节点级定位：属性值大量重复（如 22 个字段的 source 都是「本表维护」），
 * 只按文字首处命中会把改动写到「文件里第一个同文字节点」上 —— 改 A 字段的数据来源，
 * B 字段跟着变。旧版导出固化的人工下载流程还能靠人工核对兜住，写盘自动保存不行。
 *
 * 三个坑（沿用原实现，勿改）：
 *   ① 文件头部注释里常出现表单名/表码，必须屏蔽注释，否则「第一处命中」会落到注释里；
 *   ② 属性值命中要求前一字符是引号（且属性名前是空白），避免命中 CDATA 正文或别的属性；
 *   ③ 正文里含 `]]>` 时无法用单个 CDATA 承载（fast-xml-parser 会把相邻 CDATA 拼成数组），
 *      这类新值直接拒绝，交调用方降级处理。
 */
import { parseFormTextXml, type FormText } from './xmlTexts';

/** 槽位原文：attr=true 表示 XML 属性（需要实体转义后再检索/替换） */
export interface SlotSource {
  original: string;
  attr: boolean;
  /** 属性槽位的属性名（name/source/display/form/code/fields/target/event/field）——按属性名精确定位用 */
  attrName?: string;
}

/** 覆盖键 → XML 里的原始文字（取不到返回 null = 无法定位） */
export function resolveSlotOriginal(ft: FormText, key: string): SlotSource | null {
  const parts = key.split('::');
  const kind = parts[1];
  const t = (v: string | undefined): SlotSource | null => (v ? { original: v, attr: false } : null);
  const a = (v: string | undefined, attrName: string): SlotSource | null =>
    v ? { original: v, attr: true, attrName } : null;

  switch (kind) {
    case 'overview':
      return t(ft.overview);
    case 'noVoucher':
      return t(ft.noVoucher);
    case 'field': {
      const [fieldCode, occRaw] = (parts[2] ?? '').split('#');
      const idx = Number(occRaw) || 0;
      const slot = parts[3];
      const f = ft.fields.filter((x) => x.code === fieldCode)[idx];
      if (!f) return null;
      // 页面显示名 = display || name（与 fieldsForDisplay 一致）：有 display 属性就改 display
      if (slot === 'name') return f.display ? a(f.display, 'display') : a(f.name, 'name');
      if (slot === 'source') return a(f.source, 'source');
      if (slot === 'remark') return t(f.remark);
      return null;
    }
    case 'rule': {
      const idx = Number(parts[2]) || 0;
      const g = ft.rules[idx];
      if (!g) return null;
      if (parts[3] === 'form') return a(g.form, 'form');
      if (parts[3] === 'point') return t(g.points[Number(parts[4]) || 0]);
      return null;
    }
    case 'applies':
      return t(ft.applies[Number(parts[2]) || 0]);
    case 'notApplies':
      return t(ft.notApplies[Number(parts[2]) || 0]);
    case 'relation': {
      const rel = ft.relation;
      if (!rel) return null;
      if (parts[2] === 'summary') return t(rel.summary);
      if (parts[2] === 'keyRule') return t(rel.keyRules[Number(parts[3]) || 0]);
      if (parts[2] === 'source') {
        const s = rel.dataSources[Number(parts[3]) || 0];
        if (!s) return null;
        const slot = parts[4];
        if (slot === 'name') return a(s.name, 'name');
        if (slot === 'code') return a(s.code, 'code');
        if (slot === 'fields') return a(s.fields, 'fields');
        if (slot === 'relation') return t(s.relation);
        return null;
      }
      if (parts[2] === 'output') {
        const o = rel.outputs[Number(parts[3]) || 0];
        if (!o) return null;
        if (parts[4] === 'target') return a(o.target, 'target');
        if (parts[4] === 'path') return t(o.path);
        return null;
      }
      return null;
    }
    case 'event': {
      const e = ft.events[Number(parts[2]) || 0];
      if (!e) return null;
      const slot = parts[3];
      if (slot === 'event') return a(e.event, 'event');
      if (slot === 'field') return a(e.field, 'field');
      if (slot === 'pl') return t(e.pl);
      if (slot === 'bs') return t(e.bs);
      if (slot === 'cf') return t(e.cf);
      if (slot === 'source') return t(e.source);
      if (slot === 'entry') return t(e.entry);
      if (slot === 'note') return t(e.note);
      return null;
    }
    default:
      // 含 rulesBlock（整块规则要点，页面把多组规则合成一段纯文本）等聚合键：
      // XML 里没有对应的单个节点 → 无法定位，调用方降级（浏览器覆盖 / 提示人工处理）。
      return null;
  }
}

// ── 节点级定位：覆盖键 → 目标节点在原文中的区间 ───────────────────────────────

/** 元素在原文里的位置：起始标签 [tagStart, tagEnd) + 正文 [bodyStart, bodyEnd) */
interface ElemRange {
  tagStart: number;
  tagEnd: number;
  tagText: string;
  bodyStart: number;
  bodyEnd: number;
}

/** 目标区间：属性槽位用 attr* 区间，正文槽位用 body* 区间 */
export interface NodeScope {
  attrStart: number;
  attrEnd: number;
  bodyStart: number;
  bodyEnd: number;
}

function scopeOf(el: ElemRange | null): NodeScope | null {
  if (!el) return null;
  return { attrStart: el.tagStart, attrEnd: el.tagEnd, bodyStart: el.bodyStart, bodyEnd: el.bodyEnd };
}

/** 扫描 `<tag …>` 元素区间（不做真解析：本文字源的标签不嵌套同名标签，首个 `</tag>` 即闭合） */
function elementRanges(xml: string, tag: string, from = 0, to = xml.length): ElemRange[] {
  const out: ElemRange[] = [];
  const open = `<${tag}`;
  let pos = from;
  while (pos < to) {
    const at = xml.indexOf(open, pos);
    if (at < 0 || at >= to) break;
    const after = xml[at + open.length];
    if (after !== undefined && !/[\s/>]/.test(after)) {
      pos = at + 1;
      continue;
    }
    // 起始标签结束位置（按引号状态找 `>`，属性值里的 `>` 已由迁移脚本转义，这里再防一手）
    let i = at + open.length;
    let quote = '';
    while (i < xml.length) {
      const ch = xml[i];
      if (quote) {
        if (ch === quote) quote = '';
      } else if (ch === '"' || ch === "'") {
        quote = ch;
      } else if (ch === '>') {
        break;
      }
      i += 1;
    }
    if (i >= xml.length) break;
    const tagEnd = i + 1;
    const selfClosing = xml[tagEnd - 2] === '/';
    let bodyStart = tagEnd;
    let bodyEnd = tagEnd;
    let rangeEnd = tagEnd;
    if (!selfClosing) {
      const close = xml.indexOf(`</${tag}>`, tagEnd);
      if (close < 0 || close > to) {
        pos = tagEnd;
        continue;
      }
      bodyStart = tagEnd;
      bodyEnd = close;
      rangeEnd = close + tag.length + 3;
    }
    out.push({ tagStart: at, tagEnd, tagText: xml.slice(at, tagEnd), bodyStart, bodyEnd });
    pos = Math.max(rangeEnd, at + 1);
  }
  return out;
}

/** 起始标签里某个属性的值（未做实体解码，够用于 code/name 这类短标识比对） */
function attrValueOf(tagText: string, name: string): string | null {
  const m = new RegExp(`(?:^|\\s)${name}="([^"]*)"`).exec(tagText);
  return m ? m[1] : null;
}

function nthElement(xml: string, tag: string, nth: number, from?: number, to?: number): ElemRange | null {
  return elementRanges(xml, tag, from, to)[nth] ?? null;
}

function nthElementByAttr(
  xml: string,
  tag: string,
  attrName: string,
  attrValue: string,
  nth: number,
  from?: number,
  to?: number,
): ElemRange | null {
  const hits = elementRanges(xml, tag, from, to).filter((r) => attrValueOf(r.tagText, attrName) === attrValue);
  return hits[nth] ?? null;
}

/**
 * 覆盖键 → 目标节点区间（null = 结构定位不到，调用方退回全文首处命中）。
 * 序号与解析端一致：`#occ` / 第 i 个 / 第 j 个 都是文档顺序。
 */
export function resolveNodeScope(xml: string, key: string): NodeScope | null {
  const parts = key.split('::');
  const kind = parts[1];
  const num = (v: string | undefined): number => Number(v) || 0;

  switch (kind) {
    case 'overview':
      return scopeOf(nthElement(xml, 'overview', 0));
    case 'noVoucher':
      return scopeOf(nthElement(xml, 'noVoucher', 0));
    case 'field': {
      const fields = nthElement(xml, 'fields', 0);
      if (!fields) return null;
      const [code, occRaw] = (parts[2] ?? '').split('#');
      if (!code) return null;
      return scopeOf(
        nthElementByAttr(xml, 'field', 'code', code, Number(occRaw) || 0, fields.bodyStart, fields.bodyEnd),
      );
    }
    case 'rule': {
      const rules = nthElement(xml, 'rules', 0);
      if (!rules) return null;
      const rule = nthElement(xml, 'rule', num(parts[2]), rules.bodyStart, rules.bodyEnd);
      if (!rule) return null;
      if (parts[3] === 'form') return scopeOf(rule);
      if (parts[3] === 'point') {
        return scopeOf(nthElement(xml, 'point', num(parts[4]), rule.bodyStart, rule.bodyEnd));
      }
      return null;
    }
    case 'applies':
    case 'notApplies': {
      const scenarios = nthElement(xml, 'scenarios', 0);
      if (!scenarios) return null;
      const group = nthElement(xml, kind, 0, scenarios.bodyStart, scenarios.bodyEnd);
      if (!group) return null;
      return scopeOf(nthElement(xml, 'item', num(parts[2]), group.bodyStart, group.bodyEnd));
    }
    case 'relation': {
      const rel = nthElement(xml, 'relation', 0);
      if (!rel) return null;
      const sub = parts[2];
      if (sub === 'summary') return scopeOf(nthElement(xml, 'summary', 0, rel.bodyStart, rel.bodyEnd));
      if (sub === 'keyRule') {
        const kr = nthElement(xml, 'keyRules', 0, rel.bodyStart, rel.bodyEnd);
        if (!kr) return null;
        return scopeOf(nthElement(xml, 'rule', num(parts[3]), kr.bodyStart, kr.bodyEnd));
      }
      if (sub === 'source') {
        const ds = nthElement(xml, 'dataSources', 0, rel.bodyStart, rel.bodyEnd);
        if (!ds) return null;
        return scopeOf(nthElement(xml, 'source', num(parts[3]), ds.bodyStart, ds.bodyEnd));
      }
      if (sub === 'output') {
        const outs = nthElement(xml, 'outputs', 0, rel.bodyStart, rel.bodyEnd);
        if (!outs) return null;
        return scopeOf(nthElement(xml, 'output', num(parts[3]), outs.bodyStart, outs.bodyEnd));
      }
      return null;
    }
    case 'event': {
      const events = nthElement(xml, 'events', 0);
      if (!events) return null;
      const ev = nthElement(xml, 'event', num(parts[2]), events.bodyStart, events.bodyEnd);
      if (!ev) return null;
      const slot = parts[3];
      if (slot === 'event' || slot === 'field') return scopeOf(ev);
      if (!slot) return null;
      return scopeOf(nthElement(xml, slot, 0, ev.bodyStart, ev.bodyEnd));
    }
    default:
      return null;
  }
}

// ── 文本级定位 / 替换 ────────────────────────────────────────────────────────

/** XML 属性值转义（检索原文与写入新值共用同一套，保证能对上） */
export function escapeXmlAttr(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** 属性值转义 + 空白字符引用（迁移脚本对属性里的换行/制表符写字符引用，比对时要两种形态都认） */
export function escapeXmlAttrFull(text: string): string {
  return escapeXmlAttr(text).replace(/\n/g, '&#10;').replace(/\r/g, '&#13;').replace(/\t/g, '&#9;');
}

/**
 * CDATA 写入安全：正文含 `]]>` 时无法用单个 CDATA 承载，
 * 标准做法 `]]]]><![CDATA[>` 会被 fast-xml-parser 解析成数组（相邻 CDATA 不合并）→ 取数会串味。
 * 因此这类文字不入 XML，由调用方计入 unmappedKeys 提示人工处理。
 */
export const CDATA_UNSAFE = ']]>';

/** 把 XML 注释内容替换成等长哨兵字符：避免「第一处命中」落到文件头部注释里（如 `BB.1.1 合同签约额预算表`） */
export function maskComments(xml: string): string {
  let out = '';
  let i = 0;
  while (i < xml.length) {
    const start = xml.indexOf('<!--', i);
    if (start < 0) {
      out += xml.slice(i);
      break;
    }
    const end = xml.indexOf('-->', start + 4);
    const stop = end < 0 ? xml.length : end + 3;
    out += xml.slice(i, start) + '\u0000'.repeat(stop - start);
    i = stop;
  }
  return out;
}

/**
 * 在「已屏蔽注释」的副本里定位原文，返回原串下标（-1 = 未命中）：
 * · attr=true（属性值）：要求命中处前一个字符是引号，避免命中 CDATA 正文或属性名；
 * · 正文：优先命中 CDATA 起点（`[`）或节点文字起点（`>`）之后的正文，找不到再退回任意命中。
 * @param from/to 限定检索窗口（节点级定位用；注释屏蔽保持等长，下标可直接比对）
 */
export function findOriginal(xml: string, needle: string, attr: boolean, from = 0, to = xml.length): number {
  if (needle === '') return -1;
  const mask = maskComments(xml);
  if (attr) {
    let p = from;
    while (p <= to) {
      const at = mask.indexOf(needle, p);
      if (at < 0 || at + needle.length > to) return -1;
      if (xml[at - 1] === '"') return at;
      p = at + 1;
    }
    return -1;
  }
  let p = from;
  let first = -1;
  while (p <= to) {
    const at = mask.indexOf(needle, p);
    if (at < 0 || at + needle.length > to) break;
    if (first < 0) first = at;
    const prev = xml[at - 1];
    if (prev === '[' || prev === '>') return at;
    p = at + 1;
  }
  return first < 0 || first + needle.length > to ? -1 : first;
}

/**
 * 在起始标签区间里按「属性名 + 值」定位属性值，返回 { at, length }（值在原串里的位置与长度）。
 * 值必须是原值的等价写法之一（原样 / 实体转义 / 含空白字符引用），避免把同元素的别的属性改掉。
 */
function findAttrValueIn(
  xml: string,
  start: number,
  end: number,
  attrName: string,
  original: string,
): { at: number; length: number } | null {
  const variants = new Set([original, escapeXmlAttr(original), escapeXmlAttrFull(original)]);
  const needle = `${attrName}="`;
  let pos = start;
  while (pos < end) {
    const at = xml.indexOf(needle, pos);
    if (at < 0 || at + needle.length > end) return null;
    const prev = xml[at - 1];
    if (prev === undefined || !/\s/.test(prev)) {
      pos = at + 1;
      continue;
    }
    const valStart = at + needle.length;
    const valEnd = xml.indexOf('"', valStart);
    if (valEnd < 0 || valEnd > end) return null;
    const raw = xml.slice(valStart, valEnd);
    if (variants.has(raw)) return { at: valStart, length: raw.length };
    pos = at + 1;
  }
  return null;
}

/**
 * 文本级替换（每个键只替换第一处命中）：
 * 先按原文长度降序处理，避免「短原文是长原文子串」时误替换到长文本内部。
 * 每个键都先做节点级定位，只在该节点区间内替换；定位不到才退回全文首处命中（兼容旧行为）。
 */
export function patchXml(
  raw: string,
  pairs: { key: string; original: string; next: string; attr: boolean; attrName?: string }[],
): { xml: string; appliedKeys: string[]; scopedKeys: string[]; skippedKeys: string[] } {
  let xml = raw;
  const appliedKeys: string[] = [];
  const scopedKeys: string[] = [];
  const skippedKeys: string[] = [];
  const ordered = [...pairs].sort((x, y) => y.original.length - x.original.length);

  for (const p of ordered) {
    if (p.next.includes(CDATA_UNSAFE) && !p.attr) {
      // 文字里有 ]]> 结束符：写入 CDATA 后前端解析会串味，交回调用方报告
      skippedKeys.push(p.key);
      continue;
    }
    const replacement = p.attr ? escapeXmlAttr(p.next) : p.next;
    let at = -1;
    let takeLength = p.original.length;

    const scope = resolveNodeScope(xml, p.key);
    if (scope) {
      if (p.attr && p.attrName) {
        const hit = findAttrValueIn(xml, scope.attrStart, scope.attrEnd, p.attrName, p.original);
        if (hit) {
          at = hit.at;
          takeLength = hit.length;
        }
      } else if (!p.attr) {
        const hit = findOriginal(xml, p.original, false, scope.bodyStart, scope.bodyEnd);
        if (hit >= 0) at = hit;
      } else {
        for (const candidate of [escapeXmlAttr(p.original), p.original]) {
          const hit = findOriginal(xml, candidate, true, scope.attrStart, scope.attrEnd);
          if (hit >= 0) {
            at = hit;
            takeLength = candidate.length;
            break;
          }
        }
      }
      if (at >= 0) scopedKeys.push(p.key);
    }

    if (at < 0) {
      // 兼容路径：结构定位不到（未知键形态 / 非标准写法）→ 全文首处命中（旧行为）
      const candidates = p.attr ? [escapeXmlAttr(p.original), p.original] : [p.original];
      for (const candidate of candidates) {
        const hit = findOriginal(xml, candidate, p.attr);
        if (hit >= 0) {
          at = hit;
          takeLength = candidate.length;
          break;
        }
      }
    }

    if (at >= 0) {
      xml = xml.slice(0, at) + replacement + xml.slice(at + takeLength);
      appliedKeys.push(p.key);
    } else {
      skippedKeys.push(p.key);
    }
  }
  return { xml, appliedKeys, scopedKeys, skippedKeys };
}

// ── 单键写入：XML 原文 + (覆盖键, 新值) → 替换后的 XML 全文 ────────────────────

/** 写入失败原因（调用方据此决定降级 / 提示）：见各值注释 */
export type ApplyOverrideReason =
  /** 新值为空（应走「还原原文」而不是写入空串） */
  | 'empty-value'
  /** 覆盖键在 XML 里定位不到对应节点（未登记 XML / 聚合键如 rulesBlock / 节点文字为空） */
  | 'unmapped'
  /** 覆盖键的表单编码与 XML 根节点编码不一致（拿错文件了） */
  | 'code-mismatch'
  /** 新值含 CDATA 结束符 ]]>，无法写入单个 CDATA */
  | 'cdata-unsafe'
  /** 定位到了原文，但文本级替换没命中（原文重复且已被占用等） */
  | 'not-found'
  /** XML 解析失败（文件损坏） */
  | 'parse-error';

export interface ApplyOverrideResult {
  ok: boolean;
  /** 替换后的 XML 全文（ok=true 时存在） */
  xml?: string;
  /** 命中位置在写入前的原文（供前端记录「恢复原文」目标） */
  original?: string;
  /** 命中位置是否 XML 属性 */
  attr?: boolean;
  /** 属性名（attr=true 时有值） */
  attrName?: string;
  /** 替换结果是否与原文相同（相同 = 无需落盘） */
  changed?: boolean;
  /** 是否走了节点级精确定位（false = 退回全文首处命中） */
  scoped?: boolean;
  reason?: ApplyOverrideReason;
  error?: string;
}

/**
 * 把一处覆盖写入 XML 原文：定位 → 替换 → 返回新的 XML 全文。
 * 纯函数：不做任何 I/O，落盘由调用方（浏览器 zip / dev 中间件）负责。
 *
 * @param xmlRaw        XML 原文
 * @param key           覆盖键（`${formCode}::…`，见 textOverrides.textKey）
 * @param value         新的文字（trim 后写入，与 setOverride 口径一致）
 * @param fallbackCode  根节点未写 code 属性时的兜底编码（通常是文件名）
 */
export function applyOverrideToXml(
  xmlRaw: string,
  key: string,
  value: string,
  fallbackCode = '',
): ApplyOverrideResult {
  const next = value.trim();
  if (!next) return { ok: false, reason: 'empty-value' };

  let ft: FormText;
  try {
    ft = parseFormTextXml(xmlRaw, fallbackCode);
  } catch (err) {
    return { ok: false, reason: 'parse-error', error: err instanceof Error ? err.message : String(err) };
  }

  // 覆盖键前缀是「表单编码」（= 磁盘文件名）；与文件根节点编码对不上说明拿错了文件 → 拒绝
  // （根节点没写 code 属性时，ft.code 已回退成 fallbackCode = 文件名）
  const keyCode = key.split('::')[0] ?? '';
  if (keyCode && ft.code && keyCode !== ft.code) {
    return { ok: false, reason: 'code-mismatch', error: `覆盖键编码 ${keyCode} ≠ 文件编码 ${ft.code}` };
  }

  const slot = resolveSlotOriginal(ft, key);
  if (!slot) return { ok: false, reason: 'unmapped' };
  if (!slot.attr && next.includes(CDATA_UNSAFE)) {
    return { ok: false, reason: 'cdata-unsafe', original: slot.original };
  }

  const { xml, appliedKeys, scopedKeys } = patchXml(xmlRaw, [
    { key, original: slot.original, next, attr: slot.attr, attrName: slot.attrName },
  ]);
  if (appliedKeys.length === 0) {
    return { ok: false, reason: 'not-found', original: slot.original, attr: slot.attr, attrName: slot.attrName };
  }

  return {
    ok: true,
    xml,
    original: slot.original,
    attr: slot.attr,
    attrName: slot.attrName,
    changed: xml !== xmlRaw,
    scoped: scopedKeys.length > 0,
  };
}
