/**
 * 表单「内容源」适配器
 * =============================================================================
 * 把一张预算表（src/data/texts/<code>.xml 解析后的 FormText）的全部可编辑文本
 * （表概述 / 字段名·来源·说明 / 规则 / 适用情形 / 数据关系 / 报表项转换）
 * 转成 MdField；编辑结果写回表单覆盖层（textOverrides），渲染端据此生效。
 */
import type { ContentSource } from './contentSource';
import { getFormText, type FormText } from '../../utils/xmlTexts';
import {
  textKey, getAllOverrides, setOverride, clearOverride,
} from '../../utils/textOverrides';
import type { MdField, MdKind } from '../logic/logicMarkdown';

function collectFormFields(code: string, ft: FormText): MdField[] {
  const ovMap = getAllOverrides();
  const out: MdField[] = [];
  const push = (key: string, kind: MdKind, original: string, section?: string) => {
    out.push({ key, kind, original, value: ovMap[key] ?? original, section });
  };

  // ① 表概述
  if (ft.overview) push(textKey.overview(code), 'text', ft.overview, '① 表概述');

  // ② 字段说明（同 code 重复时用 occ 序号）
  const occSoFar: Record<string, number> = {};
  ft.fields.forEach((f) => {
    const occ = occSoFar[f.code] ?? 0;
    occSoFar[f.code] = occ + 1;
    push(textKey.field(code, f.code, occ, 'name'), 'title', f.name, '② 字段说明');
    if (f.source) push(textKey.field(code, f.code, occ, 'source'), 'label', f.source);
    if (f.remark) push(textKey.field(code, f.code, occ, 'remark'), 'text', f.remark);
  });

  // ③ 关键规则
  ft.rules.forEach((rg, ri) => {
    if (rg.form) push(textKey.ruleForm(code, ri), 'title', rg.form, '③ 关键规则');
    rg.points.forEach((pt, pi) => push(textKey.rulePoint(code, ri, pi), 'line', pt));
  });

  // ④ 适用 / 不适用情形
  ft.applies.forEach((t, i) => push(textKey.applies(code, i), 'line', t, '④ 适用情形'));
  ft.notApplies.forEach((t, i) => push(textKey.notApplies(code, i), 'line', t, '④ 不适用情形'));

  // ⑤ 数据关系
  if (ft.relation) {
    const r = ft.relation;
    if (r.summary) push(textKey.relationSummary(code), 'text', r.summary, '⑤ 数据关系 · 总结');
    r.dataSources.forEach((s, i) => {
      push(textKey.relationSource(code, i, 'name'), 'label', s.name, '⑤ 数据关系 · 上游来源');
      if (s.code) push(textKey.relationSource(code, i, 'code'), 'text', s.code);
      if (s.fields) push(textKey.relationSource(code, i, 'fields'), 'text', s.fields);
      if (s.relation) push(textKey.relationSource(code, i, 'relation'), 'text', s.relation);
    });
    r.outputs.forEach((o, i) => {
      push(textKey.relationOutput(code, i, 'target'), 'label', o.target, '⑤ 数据关系 · 下游输出');
      if (o.path) push(textKey.relationOutput(code, i, 'path'), 'text', o.path);
    });
    r.keyRules.forEach((t, i) => push(textKey.relationKeyRule(code, i), 'line', t, '⑤ 数据关系 · 关键规则'));
  }

  // ⑥ 报表项转换规则
  ft.events.forEach((ev, idx) => {
    if (ev.event) push(textKey.event(code, idx, 'event'), 'title', ev.event, '⑥ 报表项转换规则');
    if (ev.field) push(textKey.event(code, idx, 'field'), 'label', ev.field);
    if (ev.pl) push(textKey.event(code, idx, 'pl'), 'text', ev.pl, '⑥ 转换 · 损益 PL');
    if (ev.bs) push(textKey.event(code, idx, 'bs'), 'text', ev.bs, '⑥ 转换 · 资产 BS');
    if (ev.cf) push(textKey.event(code, idx, 'cf'), 'text', ev.cf, '⑥ 转换 · 现金流 CF');
    if (ev.source) push(textKey.event(code, idx, 'source'), 'text', ev.source, '⑥ 转换 · 取数');
    if (ev.entry) push(textKey.event(code, idx, 'entry'), 'text', ev.entry, '⑥ 转换 · 分录');
    if (ev.note) push(textKey.event(code, idx, 'note'), 'text', ev.note, '⑥ 转换 · 备注');
  });

  // 无凭证说明
  if (ft.noVoucher) push(textKey.noVoucher(code), 'text', ft.noVoucher, '⑥ 无凭证说明');

  return out;
}

/** 构造某张表的内容源；该表未登记 XML 时返回 undefined */
export function buildFormContentSource(code: string | undefined | null): ContentSource | undefined {
  if (!code) return undefined;
  const ft = getFormText(code);
  if (!ft) return undefined;

  return {
    id: `form:${code}`,
    title: `${code} ${ft.name}`,
    collect: () => collectFormFields(code, ft),
    apply: (parsed) => {
      const original: Record<string, string> = {};
      collectFormFields(code, ft).forEach((f) => {
        original[f.key] = f.original;
      });
      Object.entries(parsed).forEach(([k, v]) => {
        if (!(k in original)) return;
        if (v.trim() === original[k].trim()) clearOverride(k);
        else setOverride(k, v);
      });
    },
    reset: () => {
      Object.keys(getAllOverrides())
        .filter((k) => k.startsWith(`${code}::`))
        .forEach((k) => clearOverride(k));
    },
    count: () =>
      Object.keys(getAllOverrides()).filter((k) => k.startsWith(`${code}::`)).length,
  };
}
