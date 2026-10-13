// 临时脚本：以已清干净的 SVG 为准，按 viewBox 等比渲染为 2x PNG。
// 用法：node scripts/_renderFlowchartPngs.mjs
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const ROOT = path.resolve(process.cwd())
const SCALE = 2

const targets = [
  ['docs/年度预算编制流程图-横向.svg', 'docs/年度预算编制流程图-横向.png'],
  ['docs/年度预算编制流程图-纵向.svg', 'docs/年度预算编制流程图-纵向.png'],
  ['docs/年度预算编制流程图-PPT-总览.svg', 'docs/年度预算编制流程图-PPT-总览.png'],
]

function readViewBox(file) {
  const head = fs.readFileSync(file, 'utf8').slice(0, 1200)
  const vb = /viewBox="([^"]+)"/.exec(head)
  const nums = vb[1].trim().split(/[\s,]+/).map(Number)
  return { x: nums[0], y: nums[1], w: nums[2], h: nums[3] }
}

const browser = await chromium.launch()
for (const [svgRel, pngRel] of targets) {
  const svgAbs = path.join(ROOT, svgRel)
  const pngAbs = path.join(ROOT, pngRel)
  const vb = readViewBox(svgAbs)
  const page = await browser.newPage({
    viewport: { width: Math.ceil(vb.w), height: Math.ceil(vb.h) },
    deviceScaleFactor: SCALE,
  })
  await page.goto(pathToFileURL(svgAbs).href, { waitUntil: 'load' })
  await page.evaluate(() => {
    const el = document.documentElement
    el.style.background = '#ffffff'
    el.style.margin = '0'
  })
  await page.waitForTimeout(300)
  const box = await page.locator('svg').first().boundingBox()
  const clip = {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: Math.min(vb.w, box.width),
    height: Math.min(vb.h, box.height),
  }
  await page.screenshot({ path: pngAbs, clip, omitBackground: false })
  const stat = fs.statSync(pngAbs)
  console.log(`${svgRel} -> ${pngRel}  viewBox=${vb.w}x${vb.h}  box=${box.width}x${box.height}  clip=${clip.width}x${clip.height}  2x=${clip.width * SCALE}x${clip.height * SCALE}  bytes=${stat.size}`)
  await page.close()
}
await browser.close()
