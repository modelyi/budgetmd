// 抽查回读：用 node + xlsx 读取 docs/formexcel 下的抽查文件，
// 打印各 sheet 名、行数、列数、合并数、公式格数，并核对表头填充与「序号」列去除。
// 用法：node scripts/verifyFormExcel.mjs [文件...]  （默认 BB.1.1.xlsx、BB.3.1.xlsx）
import XLSX from 'xlsx';
import { readFileSync } from 'fs';

const files = process.argv.slice(2);
const targets = files.length > 0 ? files : ['docs/formexcel/BB.1.1.xlsx', 'docs/formexcel/BB.3.1.xlsx'];

let bad = 0;
for (const file of targets) {
  const wb = XLSX.read(readFileSync(file), { type: 'buffer', cellStyles: true });
  console.log(`== ${file} (sheet 数: ${wb.SheetNames.length})`);
  for (const name of wb.SheetNames) {
    const ws = wb.Sheets[name];
    const ref = XLSX.utils.decode_range(ws['!ref'] ?? 'A1');
    const rows = ref.e.r - ref.s.r + 1;
    const cols = ref.e.c - ref.s.c + 1;
    const merges = (ws['!merges'] ?? []).length;
    let formulas = 0;
    let formulaSample = '';
    let seqHit = false;
    for (const addr of Object.keys(ws)) {
      if (addr.startsWith('!')) continue;
      const cell = ws[addr];
      if (cell.f) {
        formulas += 1;
        if (!formulaSample) formulaSample = `${addr} =${cell.f}`;
      }
      const rc = XLSX.utils.decode_cell(addr);
      if (rc.r <= 1 && cell.v === '序号') seqHit = true;
    }
    const headSamples = [];
    for (let c = 0; c < Math.min(cols, 5); c++) {
      const cell = ws[XLSX.utils.encode_cell({ r: 0, c })];
      if (cell) {
        const fill = cell.s?.fgColor?.rgb ?? '';
        headSamples.push(`"${cell.v}"${fill ? ' fill:' + fill : ''}`);
      }
    }
    const m0 = (ws['!merges'] ?? [])[0];
    console.log(`  sheet="${name}"`);
    console.log(`    rows=${rows} cols=${cols} merges=${merges} formulas=${formulas} 序号列残留=${seqHit}`);
    console.log(`    表头样本(row0): ${headSamples.join(' | ')}`);
    if (formulaSample) console.log(`    公式样本: ${formulaSample}`);
    if (m0) console.log(`    合并样本: ${XLSX.utils.encode_range(m0)}`);
    if (seqHit) bad += 1;
  }
}
console.log(bad === 0 ? 'VERIFY OK' : `VERIFY FAILED (${bad} sheet(s) 残留序号列)`);
process.exitCode = bad === 0 ? 0 : 1;
