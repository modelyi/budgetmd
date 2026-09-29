/**
 * 一次性校验脚本（不属于产品代码）：从 ResearchSummaryView.tsx 中抽取真实的菜单
 * 数据与构建逻辑（MENU_GROUP_DEFS / SEGMENT_TITLES / subgroupCodePrefix / RESEARCH_MENU），
 * 用 esbuild 去掉 TS 类型后在 Node 中执行，打印并校验渲染用的菜单树。
 *
 * 用法：npx tsx scripts/verify-bb42-menu-order.ts
 * 校验点：
 *   1. BB 组「资本性支出 (CAPEX)」渲染顺序 = BB.4.1 → 职场租赁预算（BB.4.2.a/.a.1/.b/.b.1）→ BB.4.3~BB.4.X；
 *   2. 「职场租赁预算」为 CAPEX 目录下的嵌套子分组（不是独立子目录），编码前缀 BB.4.2；
 *   3. 四张 BB.4.2.* 表在各组内各出现且仅一次；
 *   4. 回归：未登记 children 的其它组/子目录，渲染项与既有表单序列逐项一致（层级与顺序不变）。
 */
import { readFileSync } from 'node:fs';
import { transformSync } from 'esbuild';
import { BUDGET_FORM_REGISTRY } from '../src/data/budgetFormRegistry';

const FILE = 'src/components/ResearchSummaryView.tsx';
const raw = readFileSync(FILE, 'utf8');

function slice(startMarker: string, endMarker: string, source: string): string {
  const a = source.indexOf(startMarker);
  if (a < 0) throw new Error(`未找到起点：${startMarker}`);
  const b = source.indexOf(endMarker, a);
  if (b < 0) throw new Error(`未找到终点：${endMarker}`);
  return source.slice(a, b);
}

function buildMenuTree(source: string) {
  const code = [
    slice('const GROUP_TITLES', '// ------', source),
    slice('const DISPLAY_CODE_OVERRIDE', 'interface ResearchMenuGroup', source),
    slice('const SEGMENT_TITLES', 'const menuGroupCollapseKey', source),
    slice('function subgroupCodePrefix', '// 表单编码 → 表样适配器映射', source),
  ].join('\n');
  const js = transformSync(code, { loader: 'ts', format: 'esm' }).code;
  // eslint-disable-next-line no-new-func
  return new Function('BUDGET_FORM_REGISTRY', `${js.replace(/export\s+/g, '')}\nreturn RESEARCH_MENU;`)(BUDGET_FORM_REGISTRY);
}

type Form = { code: string; name: string };
type Item = { form?: Form; group?: { key: string; title: string; prefix: string; forms: Form[] } };
type Segment = { prefix: string; name: string; segmentForm?: Form; forms: Form[]; items: Item[] };
type MenuGroup = { group: string; menuGroup: string; title: string; segments: Segment[] };

/** 把菜单树打印为「分组 → 段 → 行」的层级文本（嵌套分组用缩进标识） */
function dump(menu: MenuGroup[]): string {
  const lines: string[] = [];
  for (const mg of menu) {
    lines.push(mg.title);
    for (const seg of mg.segments) {
      lines.push(`  ${seg.prefix} ${seg.name}${seg.segmentForm ? '（段即表单）' : ''}`);
      if (seg.segmentForm) continue;
      for (const it of seg.items) {
        if (it.form) lines.push(`    ${it.form.code} ${it.form.name}`);
        else lines.push(`    ${it.group!.prefix} ${it.group!.title}   ← 嵌套子分组`);
        if (it.group) for (const f of it.group.forms) lines.push(`      ${f.code} ${f.name}`);
      }
    }
  }
  return lines.join('\n');
}

const menu = buildMenuTree(raw) as MenuGroup[];

// 「before」：仅把 BB 组 CAPEX 定义中的 children 块去掉（= 本次改动前的扁平登记），其余源码不动
const beforeMenu = (() => {
  // 仅替换 BB 组 CAPEX 定义中的 children 块，其余源码不动
  const flat = raw.replace(
    /codes: \['BB\.4\.1'[\s\S]*?\n\s*\],\n(\s*)\},\n(\s*)\{ title: '期间费用 \(OPEX\)'/,
    (_m, _i, indent) => `codes: ['BB.4.1', 'BB.4.2.a', 'BB.4.2.a.1', 'BB.4.2.b', 'BB.4.2.b.1', 'BB.4.3', 'BB.4.4', 'BB.4.5', 'BB.4.6', 'BB.4.X'] },\n${indent}{ title: '期间费用 (OPEX)'`,
  );
  if (flat === raw) throw new Error('before 兜底替换失败（未匹配 CAPEX 定义）');
  return buildMenuTree(flat) as MenuGroup[];
})();

const bb = menu.find((mg) => mg.menuGroup === 'BB')!;
const capex = bb.segments.find((seg) => seg.prefix === 'BB.4')!;

console.log('=== 菜单渲染树 · BB 组（after）===');
console.log(
  [
    bb.title,
    ...bb.segments.flatMap((seg) => {
      const head = `  ${seg.prefix} ${seg.name}`;
      if (seg.segmentForm) return [head];
      return [
        head,
        ...seg.items.flatMap((it) =>
          it.form
            ? [`    ${it.form.code} ${it.form.name}`]
            : [`    ${it.group!.prefix} ${it.group!.title}   ← 嵌套子分组`, ...it.group!.forms.map((f) => `      ${f.code} ${f.name}`)],
        ),
      ];
    }),
  ].join('\n'),
);

console.log('\n=== 菜单渲染树 · BB 组（before）===');
const bbBefore = beforeMenu.find((mg) => mg.menuGroup === 'BB')!;
console.log(
  [
    bbBefore.title,
    ...bbBefore.segments.flatMap((seg) => [
      `  ${seg.prefix} ${seg.name}${seg.segmentForm ? '（段即表单）' : ''}`,
      ...(seg.segmentForm ? [] : seg.items.flatMap((it) => (it.form ? [`    ${it.form.code} ${it.form.name}`] : []))),
    ]),
  ].join('\n'),
);

const CAPEX_ORDER = ['BB.4.1', 'BB.4.2.a', 'BB.4.2.a.1', 'BB.4.2.b', 'BB.4.2.b.1', 'BB.4.3', 'BB.4.4', 'BB.4.5', 'BB.4.6', 'BB.4.X'];
const flatOrder = capex.items.flatMap((it) => (it.form ? [it.form.code] : it.group!.forms.map((f) => f.code)));
const okOrder = JSON.stringify(flatOrder) === JSON.stringify(CAPEX_ORDER);

const nestGroups = capex.items.filter((it) => it.group);
const lease = nestGroups.find((it) => it.group!.title === '职场租赁预算');
const LEASE = ['BB.4.2.a', 'BB.4.2.a.1', 'BB.4.2.b', 'BB.4.2.b.1'];
const okNestUnique = nestGroups.length === 1 && lease !== undefined;
const okLeaseCodes = Boolean(lease) && JSON.stringify(lease!.group!.forms.map((f) => f.code)) === JSON.stringify(LEASE);
const okLeasePrefix = Boolean(lease) && lease!.group!.prefix === 'BB.4.2';
const idxPos = capex.items.findIndex((it) => it.group?.title === '职场租赁预算');
const okPosition =
  capex.items[idxPos - 1]?.form?.code === 'BB.4.1' && capex.items[idxPos + 1]?.form?.code === 'BB.4.3';
const allCodes = menu.flatMap((mg) => mg.segments).flatMap((seg) => seg.forms.map((f) => f.code));
const okOnce = LEASE.every((c) => allCodes.filter((x) => x === c).length === 1);
const okNoStandalone = !menu.some(
  (mg) => mg.segments.some((seg) => seg.name === '职场租赁预算' || seg.prefix === 'BB.4.2')
);
// 不变量：未登记嵌套子分组的段（items 全为表单行），渲染项与表单序列逐项一致
const okItemsInvariant = menu
  .flatMap((mg) => mg.segments)
  .filter((seg) => seg.items.every((it) => it.form))
  .every(
    (seg) =>
      seg.items.length === seg.forms.length &&
      seg.items.every((it, i) => it.form?.code === seg.forms[i]?.code),
  );

// 回归：其它组/子目录的段与行序列是否与 before 完全一致（BB.4 段除外）
const segSignature = (mm: MenuGroup[]) =>
  mm.map((mg) => `${mg.title}|${mg.segments.map((seg) => `${seg.prefix}:${seg.name}:${seg.forms.map((f) => f.code).join(',')}`).join(';')}`).join('\n');
const sigAfter = segSignature(menu).replace(/BB\.4:资本性支出 \(CAPEX\):([^\n;]*)/, 'BB.4:<CAPEX>');
const sigBefore = segSignature(beforeMenu).replace(/BB\.4:资本性支出 \(CAPEX\):([^\n;]*)/, 'BB.4:<CAPEX>');
const okRegression = sigAfter === sigBefore;

const checks: [string, boolean][] = [
  ['CAPEX 渲染顺序 = BB.4.1 → 4 张职场租赁 → BB.4.3~BB.4.X', okOrder],
  ['「职场租赁预算」为 CAPEX 下唯一嵌套子分组', okNestUnique],
  ['嵌套子分组 codes = BB.4.2.a/.a.1/.b/.b.1 且顺序一致', okLeaseCodes],
  ['嵌套子分组编码前缀 = BB.4.2（目录行显示 BB.4.2 职场租赁预算）', okLeasePrefix],
  ['嵌套子分组位置在 BB.4.1 之后、BB.4.3 之前', okPosition],
  ['四张表在菜单中出现且仅一次', okOnce],
  ['无「职场租赁预算」独立子目录（已收进 CAPEX）', okNoStandalone],
  ['不变量：各段 items 与 forms 逐项一致（未嵌套层的渲染不变）', okItemsInvariant],
  ['回归：其它组/子目录层级与行序完全不变', okRegression],
];

console.log('\n=== 校验 ===');
for (const [label, ok] of checks) console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label}`);
console.log(`  （分段签名 before/after 相同：${okRegression}；分段数 ${menu.reduce((n, mg) => n + mg.segments.length, 0)}）`);

const allPass = checks.every(([, ok]) => ok);
if (!allPass) process.exit(1);
console.log('\nPASS');
console.log(`\n（参考 dump 行数：${dump(menu).split('\n').length}）`);
