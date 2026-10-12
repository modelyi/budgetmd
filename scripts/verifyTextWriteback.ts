/**
 * 文字写回自检：applyOverrideToXml 在全部 src/data/texts/*.xml 上的覆盖键矩阵
 * =============================================================================
 * 用法：npx tsx scripts/verifyTextWriteback.ts（退出码 0 = 全绿，1 = 有失败项）
 *
 * 校验什么（每个可定位槽位写一次）：
 *   ① 结构定位：写入必须走「节点级精确定位」而不是全文首处命中
 *      —— 属性值大量重复（22 个字段的 source 都是「本表维护」）时，首处命中会改错节点；
 *   ② 回读：目标槽位读出来 = 写入值（属性转义 / CDATA 都过一遍）；
 *   ③ 无损：正向写新值 → 反向写回原文，结果必须与原文件**逐字节一致**（证明没误伤别的节点）；
 *   ④ 边角：特殊字符转义、含 ]]> 拒绝、聚合键 rulesBlock 定位不到、空值拒绝、
 *      同键连续两次写入、编码与文件不符拒绝。
 *
 * 只读校验（全部在内存里做文本替换），不写任何文件；
 * 页面↔中间件的联调另用 curl 打 dev server 的 POST /api/save-text（见 docs 说明）。
 */
import { readdirSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import { applyOverrideToXml, resolveSlotOriginal } from '../src/utils/textXmlPatch';
import { parseFormTextXml } from '../src/utils/xmlTexts';

const textsDir = resolve(__dirname, '../src/data/texts');
const files = readdirSync(textsDir).filter((f) => f.endsWith('.xml')).sort();

const MARK = '【写回校验①②】';
const SPECIAL = ' <&>"\'` 特殊字符';
let checks = 0;
let scopedCount = 0;
const failures: string[] = [];
const reasonCount: Record<string, number> = {};
let skippedUnsafe = 0;

function openKeys(code: string, ft: ReturnType<typeof parseFormTextXml>): string[] {
  const keys: string[] = [`${code}::overview`];
  if (ft.noVoucher) keys.push(`${code}::noVoucher`);
  const occ = new Map<string, number>();
  for (const f of ft.fields) {
    const n = occ.get(f.code) ?? 0;
    occ.set(f.code, n + 1);
    for (const slot of ['name', 'source', 'remark'] as const) keys.push(`${code}::field::${f.code}#${n}::${slot}`);
  }
  ft.rules.forEach((r, i) => {
    keys.push(`${code}::rule::${i}::form`);
    r.points.forEach((_, j) => keys.push(`${code}::rule::${i}::point::${j}`));
  });
  ft.applies.forEach((_, i) => keys.push(`${code}::applies::${i}`));
  ft.notApplies.forEach((_, i) => keys.push(`${code}::notApplies::${i}`));
  if (ft.relation) {
    keys.push(`${code}::relation::summary`);
    ft.relation.keyRules.forEach((_, i) => keys.push(`${code}::relation::keyRule::${i}`));
    ft.relation.dataSources.forEach((_, i) => {
      for (const slot of ['name', 'code', 'fields', 'relation'] as const) keys.push(`${code}::relation::source::${i}::${slot}`);
    });
    ft.relation.outputs.forEach((_, i) => {
      for (const slot of ['target', 'path'] as const) keys.push(`${code}::relation::output::${i}::${slot}`);
    });
  }
  ft.events.forEach((_, i) => {
    for (const slot of ['event', 'field', 'pl', 'bs', 'cf', 'source', 'entry', 'note'] as const) {
      keys.push(`${code}::event::${i}::${slot}`);
    }
  });
  return keys;
}

for (const file of files) {
  const code = file.replace(/\.xml$/i, '');
  const raw = readFileSync(resolve(textsDir, file), 'utf-8');
  const ft = parseFormTextXml(raw, code);
  const rawLines = raw.split('\n').length;
  // 写回前置条件：文件名（= 覆盖键前缀）必须等于根节点 code（中间件据此定位文件 + 守卫据此拒错文件）
  if (ft.code !== code) failures.push(`${file} → 根节点 code=${JSON.stringify(ft.code)} 与文件名不一致（写回会被守卫拒绝）`);

  for (const key of openKeys(code, ft)) {
    const slot = resolveSlotOriginal(ft, key);
    if (!slot) continue; // 空原文 / 定位不到：跳过（前端会降级）
    const tag = `${file} :: ${key}`;
    if (!slot.attr && slot.original.includes(']]>')) {
      skippedUnsafe += 1;
      continue;
    }
    checks += 1;
    const next = slot.original + MARK;
    const res = applyOverrideToXml(raw, key, next, code);
    if (!res.ok || !res.xml) {
      failures.push(`${tag} → 写入失败 reason=${res.reason}`);
      reasonCount[String(res.reason)] = (reasonCount[String(res.reason)] ?? 0) + 1;
      continue;
    }
    if (res.scoped) scopedCount += 1;
    else failures.push(`${tag} → 未走节点级定位（退回全文首处命中，有误改风险）`);

    // ① 回读：目标槽位 = 新值
    const ft2 = parseFormTextXml(res.xml, code);
    const back = resolveSlotOriginal(ft2, key);
    if (!back) failures.push(`${tag} → 回读定位不到`);
    else if (back.original !== next) {
      failures.push(`${tag} → 回读不一致（期望 ${JSON.stringify(next.slice(0, 60))}，实得 ${JSON.stringify(back.original.slice(0, 60))}）`);
      continue;
    }

    // ② 结构：节点数、行数不变
    if (res.xml.split('\n').length !== rawLines) failures.push(`${tag} → 行数被改变`);
    if (ft2.fields.length !== ft.fields.length || ft2.events.length !== ft.events.length
      || ft2.rules.length !== ft.rules.length || ft2.applies.length !== ft.applies.length
      || ft2.relation?.dataSources.length !== ft.relation?.dataSources.length) {
      failures.push(`${tag} → 节点数被改变`);
    }

    // ③ 反写原文必须与原文件逐字节一致（= 只改了目标节点，没有误伤别处）
    const rev = applyOverrideToXml(res.xml, key, slot.original, code);
    if (!rev.ok || rev.xml !== raw) {
      failures.push(`${tag} → 反写后与原文件不一致（${rev.ok ? '字节差异' : `reason=${rev.reason}`}）`);
    }
  }
}

// ── 边角：特殊字符转义 / 非法值 / 重复文字 ────────────────────────────────────
const raw = readFileSync(resolve(textsDir, 'BB.1.1.xml'), 'utf-8');
const ft = parseFormTextXml(raw, 'BB.1.1');
const attrKey = 'BB.1.1::field::contractCode#0::name';
const cdataKey = 'BB.1.1::overview';
const edge = (label: string, ok: boolean, detail = '') => {
  checks += 1;
  if (!ok) failures.push(`边角[${label}] 未通过 ${detail}`);
};
{
  // 写入端会 trim（与 setOverride 口径一致），期望值统一按 trim 后比对
  const special = SPECIAL.trim();
  const r = applyOverrideToXml(raw, attrKey, SPECIAL, 'BB.1.1');
  edge('属性特殊字符', r.ok && !!r.xml && r.xml.includes('&amp;') && r.xml.includes('&quot;'));
  edge('属性特殊字符回读', !!r.xml && resolveSlotOriginal(parseFormTextXml(r.xml, 'BB.1.1'), attrKey)?.original === special);
  const rc = applyOverrideToXml(raw, cdataKey, SPECIAL, 'BB.1.1');
  edge('CDATA 特殊字符原样写入', rc.ok && !!rc.xml && rc.xml.includes(special));
  edge('CDATA 特殊字符回读', !!rc.xml && resolveSlotOriginal(parseFormTextXml(rc.xml, 'BB.1.1'), cdataKey)?.original === special);
  edge('含 ]]> 被拒', applyOverrideToXml(raw, cdataKey, 'x ]]> y', 'BB.1.1').reason === 'cdata-unsafe');
  edge('聚合键 rulesBlock 定位不到', applyOverrideToXml(raw, 'BB.1.1::rulesBlock', 'x', 'BB.1.1').reason === 'unmapped');
  edge('空值被拒', applyOverrideToXml(raw, cdataKey, '   ', 'BB.1.1').reason === 'empty-value');
  edge('编码与文件不符被拒', applyOverrideToXml(raw, 'ZZ.9::overview', 'x', 'ZZ.9').reason === 'code-mismatch');
  edge('同一值不改盘', applyOverrideToXml(raw, cdataKey, ft.overview, 'BB.1.1').changed === false);

  // 重复文字：22 个字段里 source="本表录入" 重复出现 —— 只应改到目标字段
  const dupSource = '本表录入';
  const dupIdx = ft.fields.findIndex((f) => f.source === dupSource);
  const dupCount = ft.fields.filter((f) => f.source === dupSource).length;
  if (dupIdx >= 0 && dupCount > 1) {
    const key = `BB.1.1::field::${ft.fields[dupIdx].code}#0::source`;
    const r2 = applyOverrideToXml(raw, key, dupSource + MARK, 'BB.1.1');
    const f2 = r2.xml ? parseFormTextXml(r2.xml, 'BB.1.1').fields : [];
    const changedCount = f2.filter((f) => f.source === dupSource + MARK).length;
    const others = f2.filter((f) => f.source === dupSource).length;
    edge(`重复属性值只改目标字段（source 重复 ${dupCount} 个）`, changedCount === 1 && others === dupCount - 1,
      `改到 ${changedCount} 个，剩余同名 ${others} 个`);
    edge('重复属性值反写还原', !!r2.xml && applyOverrideToXml(r2.xml, key, dupSource, 'BB.1.1').xml === raw);
  }
  // 同键连续两次
  const r1 = applyOverrideToXml(raw, attrKey, '甲', 'BB.1.1');
  const r2 = r1.xml ? applyOverrideToXml(r1.xml, attrKey, '乙', 'BB.1.1') : { ok: false };
  edge('同键连续两次写入', r2.ok === true && !!r2.xml && r2.xml.includes('name="乙"') && !r2.xml.includes('name="甲"'));
}

console.log(`扫描文件：${files.length} 个 XML`);
console.log(`用例数：${checks}（其中节点级精确定位 ${scopedCount}）`);
console.log(`跳过「原文含 ]]>」槽位：${skippedUnsafe}`);
console.log(`失败：${failures.length}`);
if (Object.keys(reasonCount).length) console.log('失败原因分布：', reasonCount);
for (const f of failures.slice(0, 15)) console.log('  ✗', f);
process.exit(failures.length === 0 ? 0 : 1);
