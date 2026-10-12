#!/usr/bin/env node
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const valueFor = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const url = valueFor('--url', process.env.QA_URL || 'http://127.0.0.1:3000/');
const timeout = Number(valueFor('--timeout', process.env.QA_TIMEOUT || '30000'));
const screenshot = valueFor('--screenshot', process.env.QA_SCREENSHOT || '');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
const pageErrors = [];
page.on('console', message => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});
page.on('pageerror', error => pageErrors.push(error.message));

try {
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout });
  if (!response || !response.ok()) {
    throw new Error(`Expected an HTTP 2xx response, got ${response?.status() ?? 'no response'} for ${url}`);
  }
  await page.locator('#root').waitFor({ state: 'attached', timeout });
  await page.waitForFunction(() => document.querySelector('#root')?.textContent?.trim(), null, { timeout });

  if (screenshot) await page.screenshot({ path: screenshot, fullPage: true });
  if (consoleErrors.length || pageErrors.length) {
    throw new Error([
      ...consoleErrors.map(error => `console.error: ${error}`),
      ...pageErrors.map(error => `pageerror: ${error}`),
    ].join('\n'));
  }

  console.log(JSON.stringify({
    status: 'passed',
    url,
    httpStatus: response.status(),
    title: await page.title(),
    rootTextLength: (await page.locator('#root').innerText()).trim().length,
    consoleErrors: 0,
    pageErrors: 0,
  }, null, 2));
} catch (error) {
  if (screenshot) await page.screenshot({ path: screenshot, fullPage: true }).catch(() => {});
  console.error(JSON.stringify({
    status: 'failed',
    url,
    error: error instanceof Error ? error.message : String(error),
    consoleErrors,
    pageErrors,
    screenshot: screenshot || undefined,
  }, null, 2));
  process.exitCode = 1;
} finally {
  await browser.close();
}
