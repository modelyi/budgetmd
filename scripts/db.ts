/**
 * SQLite 数据库初始化（dev server 专用）
 * 存两类数据：
 *   sheet_cells    —— 用户在 Luckysheet 里编辑过的单元格（formCode × sheet × row × col → value）
 *   text_overrides —— 页面编辑的文字说明覆盖（formCode × overrideKey → value）
 * DB 文件落在项目根 data/budget.db，不进 src、不进 git。
 */
import Database from 'better-sqlite3';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

let db: Database.Database | null = null;

export function getDb(root: string): Database.Database {
  if (db) return db;
  const dir = resolve(root, 'data');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const file = resolve(dir, 'budget.db');
  db = new Database(file);
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS sheet_cells (
      formCode   TEXT NOT NULL,
      sheetIndex INTEGER NOT NULL DEFAULT 0,
      row        INTEGER NOT NULL,
      col        INTEGER NOT NULL,
      value      TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now','localtime')),
      PRIMARY KEY (formCode, sheetIndex, row, col)
    );
    CREATE TABLE IF NOT EXISTS text_overrides (
      formCode    TEXT NOT NULL,
      overrideKey TEXT NOT NULL,
      value       TEXT NOT NULL,
      updated_at  TEXT NOT NULL DEFAULT (datetime('now','localtime')),
      PRIMARY KEY (formCode, overrideKey)
    );
  `);
  console.log(`[db] SQLite ready: ${file}`);
  return db;
}

export interface SavedCell { r: number; c: number; v: string }

export function loadSheetCells(root: string, formCode: string): SavedCell[] {
  const d = getDb(root);
  const rows = d.prepare('SELECT row, col, value FROM sheet_cells WHERE formCode=? AND sheetIndex=0').all(formCode) as {row:number,col:number,value:string}[];
  return rows.map(x => ({ r: x.row, c: x.col, v: x.value }));
}

export function upsertSheetCells(root: string, formCode: string, cells: SavedCell[]): number {
  const d = getDb(root);
  const stmt = d.prepare(`INSERT INTO sheet_cells(formCode,sheetIndex,row,col,value)
    VALUES(?,0,?,?,?)
    ON CONFLICT(formCode,sheetIndex,row,col) DO UPDATE SET value=excluded.value, updated_at=datetime('now','localtime')`);
  const tx = d.transaction((list: SavedCell[]) => {
    let n = 0;
    for (const cell of list) stmt.run(formCode, cell.r, cell.c, cell.v);
    n = list.length;
    return n;
  });
  return tx(cells);
}

export function loadTextOverrides(root: string, formCode: string): Record<string,string> {
  const d = getDb(root);
  const rows = d.prepare('SELECT overrideKey, value FROM text_overrides WHERE formCode=?').all(formCode) as {overrideKey:string,value:string}[];
  const out: Record<string,string> = {};
  for (const r of rows) out[r.overrideKey] = r.value;
  return out;
}

export function upsertTextOverride(root: string, formCode: string, key: string, value: string): void {
  const d = getDb(root);
  d.prepare(`INSERT INTO text_overrides(formCode,overrideKey,value) VALUES(?,?,?)
    ON CONFLICT(formCode,overrideKey) DO UPDATE SET value=excluded.value, updated_at=datetime('now','localtime')`)
    .run(formCode, key, value);
}
