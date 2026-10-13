// 临时脚本：T1/T3B/T4/T6 页签渲染验证（控制台报错 + 页面文本含 CAS + 截图）
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const OUT = process.argv[2] || '.'
const URL = 'http://127.0.0.1:29999/'
const TABS = ['T1 总览', 'T3B 多主体编制套表', 'T4 基础静态数据', 'T6 整体编制流程图']

fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 })

const consoleErrors = []
const pageErrors = []
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text())
})
page.on('pageerror', (e) => pageErrors.push(String(e)))

await page.goto(URL, { waitUntil: 'load' })
await page.waitForTimeout(1500)

const results = []
for (const label of TABS) {
  const btn = page.getByRole('button', { name: label, exact: true })
  await btn.click()
  await page.waitForTimeout(1800)
  const text = await page.evaluate(() => document.body.innerText)
  const casHits = (text.match(/CAS/gi) || []).length
  const casCtx = [...text.matchAll(/.{0,30}CAS.{0,30}/gi)].map((m) => m[0]).slice(0, 5)
  const overflow = await page.evaluate(() => {
    const el = document.querySelector('main, [class*="overflow"]')
    return el ? { scrollH: el.scrollHeight, clientH: el.clientHeight } : null
  })
  const file = path.join(OUT, `tab-${label.split(' ')[0]}.png`)
  await page.screenshot({ path: file })
  results.push({ label, casHits, casCtx, overflow, shot: file, textLen: text.length })
}

for (const r of results) {
  console.log(`[${r.label}] 文本长度=${r.textLen} CAS命中=${r.casHits} 截图=${r.shot}`)
  if (r.casCtx.length) console.log('   CAS 上下文: ' + JSON.stringify(r.casCtx))
  console.log(`   overflow=${JSON.stringify(r.overflow)}`)
}
console.log('console.error 数=' + consoleErrors.length)
for (const e of consoleErrors.slice(0, 10)) console.log('  ERR: ' + e.slice(0, 300))
console.log('pageerror 数=' + pageErrors.length)
for (const e of pageErrors.slice(0, 10)) console.log('  PAGEERR: ' + e.slice(0, 300))

await browser.close()
