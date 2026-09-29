/**
 * 表格单元格读写 API（Vite 插件，dev server 专用）
 *   GET  /api/sheet/:formCode          → { cells: [{r,c,v}] }
 *   POST /api/sheet/:formCode          body { cells: [{r,c,v}] } → upsert
 *   GET  /api/text-overrides/:formCode → { overrides: {key: value} }
 * 用户在 Luckysheet 里改的单元格落到 SQLite，刷新不丢。
 */
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin, ViteDevServer } from 'vite';
import { getDb, loadSheetCells, upsertSheetCells, loadTextOverrides, type SavedCell } from './db';

function sendJson(res: ServerResponse, status: number, payload: unknown): void {
  const body = JSON.stringify(payload);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(body);
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []; let size = 0;
    req.on('data', (c: Buffer) => { size += c.length; if (size > 5*1024*1024) { req.destroy(); reject(new Error('too-big')); } chunks.push(c); });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    req.on('error', reject);
  });
}

function safeCode(code: string): boolean {
  return code && !code.includes('/') && !code.includes('\\') && !code.includes('..') && code.length < 120;
}

export function sheetDataPlugin(): Plugin {
  return {
    name: 'budgetdemo:sheet-data',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      const root = server.config.root;
      // 启动即建表
      try { getDb(root); } catch (e) { console.error('[db] init failed', e); }

      server.middlewares.use('/api/sheet', async (req, res) => {
        const url = (req.url || '').split('?')[0];
        // Connect use('/api/sheet') 已剥掉前缀，此处 url = '/BB.3.1.A'
        const m = url.match(/^\/([^/]+)$/);
        if (!m) { sendJson(res, 404, { ok:false, url }); return; }
        const formCode = decodeURIComponent(m[1]);
        if (!safeCode(formCode)) { sendJson(res, 400, { ok:false, reason:'bad-code' }); return; }

        const method = (req.method||'GET').toUpperCase();
        if (method === 'GET') {
          try {
            const cells = loadSheetCells(root, formCode);
            sendJson(res, 200, { ok:true, formCode, cells });
          } catch (e) { sendJson(res, 500, { ok:false, error:String(e) }); }
          return;
        }
        if (method === 'POST') {
          try {
            const body = await readBody(req);
            const parsed = JSON.parse(body) as { cells?: SavedCell[] };
            if (!Array.isArray(parsed.cells)) { sendJson(res, 400, { ok:false, reason:'need cells[]' }); return; }
            const n = upsertSheetCells(root, formCode, parsed.cells);
            sendJson(res, 200, { ok:true, saved:n });
          } catch (e) { sendJson(res, 500, { ok:false, error:String(e) }); }
          return;
        }
        res.setHeader('Allow','GET,POST'); sendJson(res, 405, { ok:false });
      });

      server.middlewares.use('/api/text-overrides', async (req, res) => {
        const url = (req.url||'').split('?')[0];
        const m = url.match(/^\/([^/]+)$/);
        if (!m) { sendJson(res, 404, { ok:false }); return; }
        const formCode = decodeURIComponent(m[1]);
        if (!safeCode(formCode)) { sendJson(res, 400, { ok:false }); return; }
        if ((req.method||'GET').toUpperCase() !== 'GET') { sendJson(res, 405, { ok:false }); return; }
        try {
          const overrides = loadTextOverrides(root, formCode);
          sendJson(res, 200, { ok:true, formCode, overrides });
        } catch (e) { sendJson(res, 500, { ok:false, error:String(e) }); }
      });

      console.log('[sheet-data] mounted GET/POST /api/sheet/:formCode, GET /api/text-overrides/:formCode');
    },
  };
}

export default sheetDataPlugin;
