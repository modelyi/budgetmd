#!/usr/bin/env node
/**
 * 断言脚本：口径枚举一致性（「同一套枚举在多处登记、改一处漏别处」的自动捕获）
 *
 * 背景：同一套口径枚举（如 BB.4.5 增量资产折旧计算表的资产来源五类）会被重复登记在
 *   多个地方——budgetFormRegistry.ts 的字段登记行、ResearchSummaryView.tsx 的调研文案、
 *   src/utils/adapters/*.ts 的规则 note 与示例行、src/data/sheets/*.json 的生成分片。
 *   这些副本之间没有代码级联动，只靠人工逐字核对，历史上出现过「表样/文案已改、字段登记
 *   未同步」的漏点（枚举成员增减后只改了其中几处）。本脚本把这件事变成机器判断。
 *
 * 检查项（对登记表 ENUM_GROUPS 里每个枚举组各做两类）：
 *   A. 权威登记点：由 authoritative 指定的 表+字段 登记行（budgetFormRegistry.ts）
 *      按引号感知解析出「可选值：…」说明文本，逐项拆开（/ 分隔，先剥掉括号注解），
 *      必须齐备该组全部成员；缺任一成员即 FAIL，并打印 file:line 与缺失成员名。
 *   B. 全库扫描：在 scan.files 指定的候选文件里逐行扫描，某行同时出现该组 ≥2 个成员
 *      却缺少其余成员（即看起来在枚举这套口径、但没列全）时报 FAIL，打印 file:line、
 *      已出现成员与缺失成员。
 *
 * 误报抑制规则（B 项）：
 *   1. 括号归一化：先把 （…）/(…) 注解整体剥掉再比对，故「采购类有PO（BB.3.1有PO到货）」
 *      与「采购类有PO」等价；代价是完全落在括号内的成员名不计入（见文件末尾「局限」）。
 *   2. 触发词门槛：仅当该行同时命中 scan.triggers（如「来源」「可选值」「口径」「六类」）时
 *      才判定为「在登记这套枚举」。这样可放过「到货转原值、基建验收与转固、自制转固、手工新增、折旧」
 *      这类只是顺口提到两个类目的业务叙述句。
 *   3. 只出现 1 个成员的行一律跳过（示例数据行 src/utils/adapters/*.ts 的 source: '采购类有PO'、
 *      生成分片里的单个单元格都属于这一类，不算漏登记）。
 *   4. allowlist：对确实合法但形似枚举的行，可在该组 allowlist 里按 file + 文本片段登记并写明理由。
 *
 * 用法：node scripts/assert-enum-consistency.mjs
 * 退出码：0 = 全部通过；1 = 存在失败项。
 */
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const read = (p) => readFileSync(resolve(root, p), 'utf-8');

// ───────────────────────── 口径枚举登记表（可扩展） ─────────────────────────
/**
 * 新增一组枚举时，复制下面模板即可（示例见数组尾部的注释模板）：
 * {
 *   id: 唯一标识,
 *   title: 人类可读标题,
 *   members: ['成员1','成员2', ...],                 // 权威成员全集，顺序即展示顺序
 *   authoritative: { file, table, field },           // budgetFormRegistry.ts 里 表+字段 的登记行
 *   scan: { files: [相对路径或 glob], triggers: [正则], minMembers: 2 },
 *   allowlist: [{ file, match, reason }],            // 可选
 * }
 */
const ENUM_GROUPS = [
  {
    id: 'BB.4.5.source',
    title: 'BB.4.5 增量资产折旧计算表 · 来源（资产来源五类）',
    members: ['采购类有PO', '采购类无PO', '基建转固', '自制转固', '手工新增'],
    authoritative: {
      file: 'src/data/budgetFormRegistry.ts',
      table: 'BB.4.5',
      field: 'source',
      notePrefix: '可选值：',
    },
    scan: {
      files: [
        'src/data/budgetFormRegistry.ts',
        'src/components/ResearchSummaryView.tsx',
        'src/utils/adapters/*.ts',
        'src/data/sheets/*.json',
      ],
      triggers: [/来源/, /可选值/, /枚举/, /口径/, /(六|五|七|八|四)类/],
      minMembers: 2,
    },
    allowlist: [],
  },
  // ── 后续可扩展的模板（本版本暂不启用，避免引入未确认口径的报警）──
  // 注意 1：本版本只强校验 BB.4.5.source。其他登记组（全库共 17 组带「可选值：」的字段登记）已用同一规则
  //         试探扫描过，未发现真正的漏登记，命中项都是成员名作为普通词汇出现在业务叙述里（销售费用/管理费用等），
  //         启用前需先给该组补 triggers 与 allowlist，否则噪声很大。
  // 注意 2：BB.4.6 处置方式的枚举写在登记行「来源」列，前缀是「本表枚举：」而非「可选值：」，
  //         notePrefix 要跟着改；口径已落地：BB.4.6 两类（对外出售 / 报废变卖）+ BJ.C.d 内部转卖
  //         （单表化到 BJ.C.d 资产转卖预算表，BO.BS 1601 行两处来源已同步）。
  // {
  //   id: 'BB.4.6.disposalType',
  //   title: 'BB.4.6 资产处置预算表 · 处置方式',
  //   members: ['对外出售', '报废变卖'],   // 待确认：内部转卖是否计入本枚举
  //   authoritative: { file: 'src/data/budgetFormRegistry.ts', table: 'BB.4.6', field: 'disposalType', notePrefix: '本表枚举：' },
  //   scan: { files: ['src/components/ResearchSummaryView.tsx','src/utils/adapters/*.ts','src/data/sheets/*.json'], triggers: [/处置/, /可选值/], minMembers: 2 },
  //   allowlist: [],
  // },
  // {
  //   id: 'BB.4.5.depConvention',
  //   title: 'BB.4.5/AA.9 折旧惯例（下月折/本月折）',
  //   members: ['下月折', '本月折'],
  //   authoritative: { file: 'src/data/budgetFormRegistry.ts', table: 'BB.4.5', field: 'depConvention', notePrefix: '可选值：' },
  //   scan: { files: ['src/components/ResearchSummaryView.tsx','src/utils/adapters/*.ts','src/data/sheets/*.json'], triggers: [/折旧惯例/, /可选值/], minMembers: 2 },
  //   allowlist: [],
  // },
];

// ───────────────────────── 通用工具 ─────────────────────────
/** 剥掉所有 （…）/(…) 括号注解（支持嵌套），用于把「采购类有PO（BB.3.1有PO到货）」归一化成「采购类有PO」 */
function stripParens(t) {
  let prev;
  do {
    prev = t;
    t = t.replace(/（[^（）]*）/g, '').replace(/\([^()]*\)/g, '');
  } while (t !== prev);
  return t;
}
const cleanItem = (s) => s.replace(/^[\s·、,，]+|[\s。；;]+$/g, '').trim();

/** 把一段文本拆成「候选枚举项」：先剥括号、再按 / 与 、 拆 */
function splitItems(text) {
  return stripParens(text)
    .split(/[\/、]/)
    .map(cleanItem)
    .filter(Boolean);
}

/** 引号感知地取出一个数组字面量（从 '[' 起配对 ']'，忽略字符串内的括号） */
function matchArray(text, start) {
  let depth = 0;
  let quote = false;
  for (let i = start; i < text.length; i += 1) {
    const ch = text[i];
    if (quote) {
      if (ch === '\\') i += 1;
      else if (ch === "'") quote = false;
      continue;
    }
    if (ch === "'") quote = true;
    else if (ch === '[') depth += 1;
    else if (ch === ']') {
      depth -= 1;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

/** 从一个数组字面量里取出所有单引号字符串字面量（引号感知） */
function stringLiterals(arrayText) {
  return arrayText.match(/'(?:[^'\\]|\\.)*'/g)?.map((s) => s.slice(1, -1)) ?? [];
}

/** 在 budgetFormRegistry.ts 里定位 表+字段 的全部登记行（同一物理行可能含多条登记） */
function findRegistrations(text, table, field) {
  const out = [];
  const lines = text.split('\n');
  const needle = new RegExp(`'${table.replace(/\./g, '\\.')}'\\s*,\\s*'${field}'`);
  lines.forEach((line, i) => {
    if (!needle.test(line)) return;
    let from = 0;
    for (;;) {
      const at = line.indexOf('[', from);
      if (at < 0) break;
      const arr = matchArray(line, at);
      if (!arr) break;
      const lits = stringLiterals(arr);
      if (lits[0] === table && lits[1] === field) {
        out.push({ line: i + 1, literals: lits, raw: line });
        // 同一行理论上同一 表+字段 只登记一次，取到即换下一行
        break;
      }
      from = at + 1;
    }
  });
  return out;
}

/** 展开 scan.files 里的 glob（仅支持 * 文件名通配，覆盖 adapters/*.ts 与 sheets/*.json 用法） */
function expandFiles(patterns) {
  const out = [];
  for (const p of patterns) {
    if (!p.includes('*')) {
      if (existsSync(resolve(root, p))) out.push(p);
      continue;
    }
    const dir = p.slice(0, p.lastIndexOf('/'));
    const glob = p.slice(p.lastIndexOf('/') + 1);
    const re = new RegExp(`^${glob.replace(/\./g, '\\.').replace(/\*/g, '.*')}$`);
    for (const f of readdirSync(resolve(root, dir)).sort()) {
      if (re.test(f)) out.push(`${dir}/${f}`);
    }
  }
  return out;
}

// ───────────────────────── 检查 ─────────────────────────
const failures = [];
const notes = [];
const results = [];

for (const g of ENUM_GROUPS) {
  const groupFailures = [];

  // ── 检查 A：权威登记点必须齐备全部成员 ──
  const authText = read(g.authoritative.file);
  const regs = findRegistrations(authText, g.authoritative.table, g.authoritative.field);
  const authLines = [];
  if (regs.length === 0) {
    groupFailures.push(`[A] 权威登记点缺失：${g.authoritative.file} 未找到 ['${g.authoritative.table}','${g.authoritative.field}'] 登记行`);
  }
  for (const reg of regs) {
    const note = reg.literals.find((l) => l.trim().startsWith(g.authoritative.notePrefix))
      ?? reg.literals.find((l) => l.includes(g.authoritative.notePrefix));
    if (!note) {
      groupFailures.push(`[A] ${g.authoritative.file}:${reg.line} 登记行未找到「${g.authoritative.notePrefix}」说明文本，无法核对枚举`);
      continue;
    }
    const items = splitItems(note.slice(note.indexOf(g.authoritative.notePrefix) + g.authoritative.notePrefix.length));
    const missing = g.members.filter((m) => !items.includes(m));
    const extra = items.filter((i) => !g.members.includes(i));
    authLines.push({
      line: reg.line,
      count: items.length,
      missing,
      extra,
      ok: missing.length === 0,
    });
    if (missing.length > 0) {
      groupFailures.push(
        `[A] ${g.authoritative.file}:${reg.line} 权威登记缺 ${missing.length} 个成员：${missing.map((m) => `「${m}」`).join('、')}`,
      );
    }
  }

  // ── 检查 B：全库扫描「出现 ≥2 个成员却缺其余成员」 ──
  const files = expandFiles(g.scan.files);
  const fullHits = [];      // 齐备全部成员的登记位置
  const partialHits = [];   // 报警位置
  const skipped = [];       // 被误报抑制规则放过、但形似枚举的位置（信息性）
  for (const f of files) {
    const lines = read(f).split('\n');
    lines.forEach((raw, i) => {
      const text = stripParens(raw);
      const found = g.members.filter((m) => text.includes(m));
      if (found.length < (g.scan.minMembers ?? 2)) return;         // 规则3：只出现 1 个成员 → 跳过
      const missing = g.members.filter((m) => !found.includes(m));
      const isAuthLine = f === g.authoritative.file
        && regs.some((r) => r.line === i + 1);
      if (missing.length === 0) {
        fullHits.push({ file: f, line: i + 1, count: found.length, isAuthLine });
        return;
      }
      const allow = (g.allowlist ?? []).find((a) => a.file === f && raw.includes(a.match));
      if (allow) {
        skipped.push({ file: f, line: i + 1, reason: allow.reason });
        return;
      }
      if (!g.scan.triggers.some((re) => re.test(text))) {           // 规则2：无触发词 → 业务叙述，不算登记
        skipped.push({ file: f, line: i + 1, reason: '未命中触发词（非枚举登记口径的叙述句）' });
        return;
      }
      partialHits.push({ file: f, line: i + 1, found, missing, excerpt: text.slice(0, 160) });
    });
  }
  for (const h of partialHits) {
    groupFailures.push(
      `[B] ${h.file}:${h.line} 已出现 ${h.found.length} 个成员（${h.found.join('、')}），缺 ${h.missing.length} 个成员：${h.missing.map((m) => `「${m}」`).join('、')}`,
    );
  }

  results.push({ group: g, authLines, fullHits, partialHits, skipped, groupFailures });
  failures.push(...groupFailures);
  if (groupFailures.length === 0) {
    notes.push(`${g.id}: PASS（权威登记 ${authLines.length} 处齐备，全库 ${fullHits.length} 处完整登记）`);
  }
}

// ───────────────────────── 输出 ─────────────────────────
const rel = (p) => relative(root, resolve(root, p)) || p;   // 始终以仓库根为基准，任意 cwd 下输出一致
console.log('口径枚举一致性检查（scripts/assert-enum-consistency.mjs）');
console.log(`仓库：${root}`);
console.log(`枚举组：${ENUM_GROUPS.length} 组\n`);

for (const r of results) {
  const g = r.group;
  const ok = r.groupFailures.length === 0;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${g.title}  [${g.id}]`);
  console.log(`      成员（${g.members.length}）：${g.members.join(' / ')}`);
  // A
  if (r.authLines.length === 0 && r.groupFailures.some((f) => f.startsWith('[A] 权威登记点缺失'))) {
    console.log(`  [A] 权威登记点 ${rel(g.authoritative.file)} ['${g.authoritative.table}','${g.authoritative.field}']：未找到`);
  }
  for (const a of r.authLines) {
    console.log(`  [A] ${a.ok ? 'PASS' : 'FAIL'} 权威登记 ${rel(g.authoritative.file)}:${a.line} 登记 ${a.count} 项${a.extra.length ? `（超出本组登记表的项：${a.extra.join('、')}）` : ''}${a.ok ? '' : ` 缺：${a.missing.join('、')}`}`);
  }
  // B
  console.log(`  [B] 全库扫描 ${expandFiles(g.scan.files).length} 个文件`);
  for (const h of r.fullHits) {
    console.log(`        PASS 完整登记 ${rel(h.file)}:${h.line}（${h.count}/${g.members.length} 个成员齐备）${h.isAuthLine ? ' ← 权威登记行，齐备性以 [A] 为准' : ''}`);
  }
  for (const h of r.partialHits) {
    console.log(`        FAIL 部分登记 ${rel(h.file)}:${h.line} 缺：${h.missing.join('、')}`);
    console.log(`             行内已出现：${h.found.join('、')}`);
    console.log(`             片段：${h.excerpt}`);
  }
  for (const s of r.skipped) {
    console.log(`        --  跳过 ${rel(s.file)}:${s.line}（${s.reason}）`);
  }
  console.log('');
}

console.log(`${results.filter((r) => r.groupFailures.length === 0).length}/${results.length} 枚举组通过`);
if (failures.length > 0) {
  console.log('\n不一致清单：');
  failures.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
  console.error(`\n${failures.length} 项枚举一致性断言 FAILED（退出码 1）`);
  process.exit(1);
}
console.log('\n全部枚举组一致（退出码 0）');
