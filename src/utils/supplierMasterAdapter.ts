import { SUPPLIER_MASTER_DATA } from '../mockData';
import { SPREADSHEET_STYLES } from './spreadsheetAdapters';

export function buildSupplierMasterSheets(): any[] {
  const headers = ['供应商编码', '供应商名称', '供应商类型', '归属主体', '供货/服务范围', '状态', '备注说明', '引用说明'];
  const celldata: any[] = headers.map((h, c) => ({ r: 0, c, v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader } }));
  SUPPLIER_MASTER_DATA.forEach((item, idx) => {
    const r = idx + 1;
    const values = [item.code, item.name, item.supplierType, item.owningEntity, item.scope, item.status, item.notes, 'BB.1.1 合同签约额预算（内部供应商）'];
    values.forEach((value, c) => celldata.push({ r, c, v: { v: value, m: String(value), ct: { fa: '@', t: 's' }, bg: idx % 2 ? '#f8fafc' : '#ffffff', ht: c === 1 || c === 4 || c === 6 || c === 7 ? 0 : 1, vt: 1 } }));
  });
  return [{ name: 'AA.10 供应商主数据', index: 'sheet_aa10_suppliers', status: 1, order: 0, row: Math.max(SUPPLIER_MASTER_DATA.length + 5, 15), column: headers.length, celldata, config: { rowlen: { 0: 28 }, columnlen: { 0: 110, 1: 180, 2: 90, 3: 130, 4: 220, 5: 80, 6: 180, 7: 280 }, frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } } } }];
}
