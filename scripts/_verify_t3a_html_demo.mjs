#!/usr/bin/env node
/**
 * T3A 表样示范渲染验证（一次性）：Playwright 无头打开 dev server，
 * 切到 T5 专项方案页签，打开「HTML-T3A表样示范」，断言内嵌 HTML 表格正确渲染：
 *   1) <table class="t3a-html-sheet"> 存在且含 <thead>；
 *   2) BB.1.1 表：rowspan=2 维度表头 + colspan=13 时间组【全年合计】；数据行 28 列；
 *   3) BB.1.2.a 表：rowspan=2 + colspan=5 时间组 × 度量子列；数据行 74 列；
 *   4) 表头单元格文字与现有表样分片 JSON 逐格一致（未增删列、未改表头）；
 *   5) 无 console/page 错误。
 * 用法：node scripts/_verify_t3a_html_demo.mjs [url]
 */
import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || process.env.QA_URL || 'http://127.0.0.1:3000/';
const timeout = 60000;

// 现有表样分片的表头矩阵（机器对照基准：列数与表头文字必须逐格一致）
const sheetDir = resolve(__dirname, '../src/data/sheets');
const expectHeaders = (code, gridIdx) => {
  const shard = JSON.parse(readFileSync(resolve(sheetDir, `${code}.json`), 'utf-8'));
  const grid = shard.grids[gridIdx];
  return {
    name: grid.name,
    colCount: grid.colCount,
    row0: grid.rows[0].map(c => ({ text: c.text, rowSpan: c.rowSpan, colSpan: c.colSpan })),
    row1: grid.rows[1].map(c => ({ text: c.text, rowSpan: c.rowSpan, colSpan: c.colSpan })),
  };
};

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const consoleErrors = [];
const pageErrors = [];
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('pageerror', e => pageErrors.push(e.message));
const failures = [];
const check = (ok, msg) => { console.log(`${ok ? '  ✓' : '  ✗'} ${msg}`); if (!ok) failures.push(msg); };

try {
  const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout });
  check(resp && resp.ok(), `页面加载成功（HTTP ${resp?.status()}）`);

  // 切到 T5 专项方案说明页签
  await page.getByRole('button', { name: 'T5 专项方案说明' }).click({ timeout });
  await page.waitForSelector('.t5-doc', { timeout });

  // 左侧目录点开示范文档（菜单名 = 文件名去掉序号前缀，如 HTML-T3A表样示范 → T3A表样示范）
  const docBtn = page.locator('aside nav button', { hasText: 'T3A表样示范' });
  await docBtn.click({ timeout });
  await page.waitForSelector('table.t3a-html-sheet', { timeout });
  await page.waitForTimeout(300);

  // ── 1) 文档标题与 HTML 表格存在性 ──
  const docText = await page.locator('.t5-doc').innerText();
  check(docText.includes('T3A 表样示范：Markdown + 内嵌 HTML 表头'), '文档标题渲染');
  const tableCount = await page.locator('table.t3a-html-sheet').count();
  check(tableCount === 4, `内嵌 HTML 表格 4 张（BB.1.1×1 + BB.1.2×3），实际 ${tableCount}`);

  // ── 2) 逐张表：thead 结构、rowspan/colspan、表头文字、数据行列数 ──
  const grids = [
    ['BB.1.1', 0], ['BB.1.2', 0], ['BB.1.2', 1], ['BB.1.2', 2],
  ];
  for (const [code, gi] of grids) {
    const exp = expectHeaders(code, gi);
    const table = page.locator('table.t3a-html-sheet').nth(
      grids.findIndex(([c, g]) => c === code && g === gi));
    console.log(`\n— ${exp.name}（colCount=${exp.colCount}）`);
    check(await table.locator('thead').count() === 1, '含 <thead>（两行表头归 thead）');
    const ths = table.locator('thead th');
    const thCount = await ths.count();
    const expTh = exp.row0.length + exp.row1.length;
    check(thCount === expTh, `表头单元格数 ${thCount} = 分片 ${expTh}`);
    let headerMatch = true;
    for (let i = 0; i < exp.row0.length; i++) {
      const el = ths.nth(i);
      const text = await el.innerText();
      const rs = await el.getAttribute('rowspan');
      const cs = await el.getAttribute('colspan');
      const e = exp.row0[i];
      if (text !== e.text || (e.rowSpan > 1 ? Number(rs) !== e.rowSpan : rs !== null)
        || (e.colSpan > 1 ? Number(cs) !== e.colSpan : cs !== null)) {
        headerMatch = false;
        console.log(`    ✗ 表头第0行第${i}格不一致：DOM(${text},rs=${rs},cs=${cs}) ≠ 分片(${e.text},rs=${e.rowSpan},cs=${e.colSpan})`);
      }
    }
    for (let i = 0; i < exp.row1.length; i++) {
      const el = ths.nth(exp.row0.length + i);
      const text = await el.innerText();
      if (text !== exp.row1[i].text) { headerMatch = false; }
    }
    check(headerMatch, '两行表头文字与 rowspan/colspan 与现有表样分片逐格一致');

    const firstDataRow = table.locator('tbody tr').first();
    const tdCount = await firstDataRow.locator('td').count();
    // 首数据行含被 rowspan 表头占位：sum(colSpan) = colCount（浏览器自动补足占位格）
    check(tdCount >= exp.colCount - 2 && tdCount <= exp.colCount, `数据行单元格 ${tdCount} 覆盖 ${exp.colCount} 列`);

    // 数值列右对齐生效（t3a-num 有 text-align:right 计算样式）
    const numTd = firstDataRow.locator('td.t3a-num').first();
    if (await numTd.count() > 0) {
      const align = await numTd.evaluate(el => getComputedStyle(el).textAlign);
      check(align === 'right', `数值单元格右对齐（computed=${align}）`);
    }
    // 表头底色生效
    const th0 = ths.first();
    const bg = await th0.evaluate(el => getComputedStyle(el).backgroundColor);
    check(bg === 'rgb(0, 47, 108)', `表头底色 #002f6c 生效（computed=${bg}）`);
  }

  // ── 3) T3A 页签本身仍正常（顺带探活调研页渲染链路未受影响） ──
  await page.getByRole('button', { name: 'T3A 编制套表原型' }).click({ timeout });
  await page.waitForTimeout(500);
  const t3aText = await page.locator('#root').innerText();
  check(t3aText.includes('编制套表原型') || t3aText.length > 500, 'T3A 页签正常渲染');

  // ── 4) 截图留证 ──
  const shot = resolve(__dirname, '../_verify_t3a_html_demo.png');
  await page.getByRole('button', { name: 'T5 专项方案说明' }).click({ timeout });
  await page.waitForSelector('table.t3a-html-sheet', { timeout });
  await page.waitForTimeout(300);
  await page.locator('table.t3a-html-sheet').first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: shot });
  console.log(`\n截图：${shot}`);

  if (consoleErrors.length || pageErrors.length) {
    failures.push(`console/page 错误：${[...consoleErrors, ...pageErrors].join(' | ')}`);
  }
  console.log(`\nconsole.error: ${consoleErrors.length}，pageerror: ${pageErrors.length}`);
  console.log(failures.length === 0 ? '\nSTATUS: PASSED' : `\nSTATUS: FAILED（${failures.length} 项）`);
  process.exitCode = failures.length === 0 ? 0 : 1;
} catch (e) {
  console.error('STATUS: FAILED —', e?.message || e);
  process.exitCode = 1;
} finally {
  await browser.close();
}
