#!/usr/bin/env node
/* 按补丁清单做"唯一匹配替换"：每个 old 必须在目标文件中恰好出现 1 次，否则跳过并报错。
 * 用法：node scripts/applyReplacements.cjs <patches.cjs>
 * 补丁文件形如：module.exports = [ { file:'src/x.ts', note:'...', old:`...`, new:`...` } ]
 */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const patches = require(path.resolve(process.argv[2]));

let fail = 0;
for (const p of patches) {
  const file = path.resolve(root, p.file);
  const text = fs.readFileSync(file, 'utf8');
  const n = text.split(p.old).length - 1;
  if (n !== 1) {
    console.error(`SKIP ${p.file} (${p.note || ''}): ${n} matches`);
    fail++;
    continue;
  }
  fs.writeFileSync(file, text.replace(p.old, p.new), 'utf8');
  console.log('OK   ' + p.file + '   ' + (p.note || ''));
}
console.log(`\n${patches.length - fail}/${patches.length} applied`);
if (fail) process.exit(1);
