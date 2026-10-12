#!/usr/bin/env node
/* 依据 `tsc --noUnusedLocals` 的诊断，删除未使用的 import（default / named / namespace / 整行）。
 * 只处理 import 声明；非 import 的未使用声明（局部变量、函数、类型）不自动改，最后列出供人工处理。
 * 用法：
 *   node scripts/cleanUnusedImports.cjs --dry                 # 预演（全部文件）
 *   node scripts/cleanUnusedImports.cjs --exclude adapters    # 排除路径片段
 */
const ts = require('typescript');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const excludeIdx = args.indexOf('--exclude');
const excludes = excludeIdx >= 0 ? args[excludeIdx + 1].split(',').map((s) => s.trim()) : [];

const isExcluded = (rel) => {
  const n = rel.replace(/\\/g, '/');
  return excludes.some((e) => n.includes(e));
};

// 1) 跑 tsc，收集未使用声明名（per file）
let tscOut = '';
try {
  tscOut = execSync('npx tsc --noEmit --noUnusedLocals --noUnusedParameters', {
    cwd: root,
    encoding: 'utf8',
  });
} catch (e) {
  tscOut = e.stdout || '';
}
const re = /^(.+?)\(\d+,\d+\): error TS(?:6133|6196): '([^']+)' is declared but/gm;
const unused = new Map();
let mm;
while ((mm = re.exec(tscOut))) {
  if (isExcluded(mm[1])) continue;
  const file = path.resolve(root, mm[1]);
  if (!unused.has(file)) unused.set(file, new Set());
  unused.get(file).add(mm[2]);
}

// 2) 逐文件用 AST 重写 import
const unhandled = [];
let totalEdits = 0;
for (const [file, names] of unused) {
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  const kind = file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, kind);
  const edits = [];
  const deleted = new Set();

  for (const stmt of sf.statements) {
    if (!ts.isImportDeclaration(stmt) || !stmt.importClause) continue;
    const clause = stmt.importClause;
    const moduleText = stmt.moduleSpecifier.getText(sf);

    const keepDefault = clause.name && !names.has(clause.name.text) ? clause.name.text : null;
    if (clause.name && names.has(clause.name.text)) deleted.add(clause.name.text);

    let keptNamed = [];
    let hadNamed = false;
    if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
      hadNamed = true;
      for (const el of clause.namedBindings.elements) {
        const local = el.name.text;
        if (names.has(local)) {
          deleted.add(local);
          continue;
        }
        let spec = el.propertyName ? `${el.propertyName.text} as ${el.name.text}` : el.name.text;
        if (el.isTypeOnly) spec = 'type ' + spec;
        keptNamed.push(spec);
      }
    }

    let nsKeep = null;
    if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
      const nsName = clause.namedBindings.name.text;
      if (names.has(nsName)) {
        deleted.add(nsName);
      } else {
        nsKeep = nsName;
      }
    }

    const namedDropped = hadNamed ? clause.namedBindings.elements.length - keptNamed.length : 0;
    const nsDropped = clause.namedBindings && ts.isNamespaceImport(clause.namedBindings) && !nsKeep;
    const willDelete =
      (clause.name && names.has(clause.name.text)) || namedDropped > 0 || !!nsDropped;
    if (!willDelete) continue;

    const hasAny = keepDefault || nsKeep || keptNamed.length > 0;
    if (!hasAny) {
      let end = stmt.getEnd();
      if (text[end] === '\r') end++;
      if (text[end] === '\n') end++;
      edits.push({ start: stmt.getStart(sf), end, repl: '' });
    } else {
      let body = keepDefault || '';
      if (nsKeep) body += (body ? ', ' : '') + `* as ${nsKeep}`;
      if (keptNamed.length) body += (body ? ', ' : '') + `{ ${keptNamed.join(', ')} }`;
      const repl = `import ${clause.isTypeOnly ? 'type ' : ''}${body} from ${moduleText};`;
      edits.push({ start: stmt.getStart(sf), end: stmt.getEnd(), repl });
    }
  }

  let out = text;
  for (const e of edits.sort((a, b) => b.start - a.start)) {
    out = out.slice(0, e.start) + e.repl + out.slice(e.end);
  }
  totalEdits += edits.length;
  console.log(`${dry ? '[DRY]  ' : '[WRITE]'} ${path.relative(root, file)}: ${edits.length} import(s)`);
  if (!dry && edits.length) fs.writeFileSync(file, out, 'utf8');

  for (const n of names) {
    if (!deleted.has(n)) unhandled.push(`${path.relative(root, file)} :: ${n}`);
  }
}

console.log(`\n${dry ? 'would apply' : 'applied'} ${totalEdits} import edits`);
if (unhandled.length) {
  console.log(`\nNOT on imports (handle manually, ${unhandled.length}):`);
  unhandled.forEach((u) => console.log('  ' + u));
}
