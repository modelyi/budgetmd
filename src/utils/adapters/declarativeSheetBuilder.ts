import { SPREADSHEET_STYLES } from './shared';
import type { SpreadsheetSheetFixture } from '../spreadsheetTypes';

export interface MonthlyBudgetSheetColumn {
  label: string;
  width?: number;
  dropdown?: string;
  align?: 0 | 1 | 2; // 0: left, 1: center, 2: right
}

export interface MonthlyBudgetMetric {
  label: string;
  width?: number;
  format?: string; // default '#,##0.0'
}

export interface MonthlyBudgetRowSpec {
  dimensions: (string | number | null | undefined)[];
  month?: number; // 1~12 (for single-month event tables like asset resale/disposal)
  metrics?: (number | null | undefined)[]; // metric values for that target month
  monthlyValues?: Record<number, (number | null | undefined)[]>; // month (1~12) -> metric values
  annualValues?: (number | null | undefined)[]; // explicit annual total metric values
}

export interface MonthlyBudgetSheetSpec {
  name: string;
  order?: number;
  index?: string | number;
  sumHeaderLabel?: string; // default '【全年合计】'
  dimensions: MonthlyBudgetSheetColumn[];
  metrics: MonthlyBudgetMetric[];
  rows?: MonthlyBudgetRowSpec[];
  guideRow?: { [colIndex: number]: string };
  footerNotes?: string;
}

/**
 * 声明式「标准两行制时间度量预算表」构造器。
 *
 * 核心目标：
 * 消除全库手写坐标（r, c）、手拼单元格（push）与手动计算 merge/columnlen 的繁重负担。
 * 传入干净的维度清单与度量清单，自动输出完全符合 UI 规范的两行制表头（深海蓝）、
 * 【全年合计】首位展开、1~12月分月度量、自适应列宽、合并区域及下拉校验。
 */
export function createMonthlyBudgetSheet(spec: MonthlyBudgetSheetSpec): SpreadsheetSheetFixture {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};
  const DIM_COLS = spec.dimensions.length;
  const N_METRICS = spec.metrics.length;
  const MONTHS = 12;

  const COL_SUM = DIM_COLS;
  const moBase = (mo: number) => COL_SUM + N_METRICS + mo * N_METRICS;
  const TOTAL_COLS = moBase(MONTHS);

  const hdrBg = '#002f6c';
  const sumBg = '#001e4a';
  const subHdrBg = '#001e4a';
  const hdrFc = '#ffffff';

  // 1. Row 0: 维度列跨 2 行 + 时间分组大表头
  spec.dimensions.forEach((col, ci) => {
    celldata.push({
      r: 0, c: ci,
      v: { v: col.label, m: col.label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc }
    });
    celldata.push({
      r: 1, c: ci,
      v: { v: col.label, m: col.label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc }
    });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  });

  // 【全年合计】大表头 (cs = N_METRICS)
  celldata.push({
    r: 0, c: COL_SUM,
    v: { v: spec.sumHeaderLabel ?? '【全年合计】', m: spec.sumHeaderLabel ?? '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: sumBg, fc: hdrFc }
  });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: N_METRICS };

  // 1~12月各月大表头 (各 cs = N_METRICS)
  for (let mo = 0; mo < MONTHS; mo++) {
    const colIdx = moBase(mo);
    celldata.push({
      r: 0, c: colIdx,
      v: { v: `${mo + 1}月`, m: `${mo + 1}月`, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: subHdrBg, fc: hdrFc }
    });
    merge[`0_${colIdx}`] = { r: 0, c: colIdx, rs: 1, cs: N_METRICS };
  }

  // 2. Row 1: 度量子列表头（【全年合计】及各月下并列）
  spec.metrics.forEach((m, i) => {
    celldata.push({
      r: 1, c: COL_SUM + i,
      v: { v: m.label, m: m.label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader, bg: sumBg, fc: hdrFc }
    });
  });
  for (let mo = 0; mo < MONTHS; mo++) {
    const base = moBase(mo);
    spec.metrics.forEach((m, i) => {
      celldata.push({
        r: 1, c: base + i,
        v: { v: m.label, m: m.label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader, bg: subHdrBg, fc: hdrFc }
      });
    });
  }

  // 3. 数据行渲染
  let currentRow = 2;

  // 引导行（如果有）
  if (spec.guideRow) {
    const guideStyle = { bg: '#eff6ff', fc: '#1e40af', fs: 9, ht: 0, vt: 1, tb: 2, b: 0 };
    for (let c = 0; c < TOTAL_COLS; c++) {
      const text = spec.guideRow[c] ?? '';
      celldata.push({
        r: currentRow, c,
        v: { v: text, m: text, ct: { fa: 'General', t: 'g' }, ...guideStyle }
      });
    }
    currentRow++;
  }

  const rows = spec.rows ?? [];
  rows.forEach((rowSpec, idx) => {
    const r = currentRow + idx;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';

    const setCell = (c: number, val: any, isNum = false, fmt = 'General', f?: string, align?: 0 | 1 | 2) => {
      const ht = align !== undefined ? align : (isNum ? 2 : 1);
      const cell: any = {
        v: val,
        m: isNum && typeof val === 'number'
          ? (fmt.includes('%') ? `${val.toFixed(1)}%` : val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }))
          : String(val ?? ''),
        ct: { fa: fmt, t: isNum ? 'n' : 'g' },
        bg: rowBg,
        ht,
        vt: 1
      };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };

    // 渲染固定维度列
    rowSpec.dimensions.forEach((val, ci) => {
      const colDef = spec.dimensions[ci];
      const isPercentage = typeof val === 'string' && val.endsWith('%');
      const isNum = typeof val === 'number' && !isPercentage;
      const fmt = isPercentage ? '0.0%' : (isNum ? '0' : 'General');
      setCell(ci, val, isNum, fmt, undefined, colDef?.align ?? (isNum ? 2 : 1));
    });

    // 计算分月度量值
    const monthlyMetricData: Record<number, number[]> = {};
    for (let m = 1; m <= 12; m++) {
      if (rowSpec.monthlyValues?.[m]) {
        monthlyMetricData[m] = rowSpec.monthlyValues[m].map((v) => Number(v ?? 0));
      } else if (rowSpec.month === m && rowSpec.metrics) {
        monthlyMetricData[m] = rowSpec.metrics.map((v) => Number(v ?? 0));
      } else {
        monthlyMetricData[m] = new Array(N_METRICS).fill(0);
      }
    }

    // 计算【全年合计】度量值
    const annualTotals = spec.metrics.map((_, mi) => {
      if (rowSpec.annualValues && rowSpec.annualValues[mi] !== undefined) {
        return Number(rowSpec.annualValues[mi]);
      }
      let s = 0;
      for (let m = 1; m <= 12; m++) {
        s += monthlyMetricData[m][mi] ?? 0;
      }
      return Math.round(s * 10) / 10;
    });

    // 渲染【全年合计】
    annualTotals.forEach((tot, mi) => {
      const mDef = spec.metrics[mi];
      setCell(COL_SUM + mi, tot, true, mDef.format ?? '#,##0.0', undefined, 2);
    });

    // 渲染 1~12 月各月度量
    for (let mo = 0; mo < MONTHS; mo++) {
      const m = mo + 1;
      const base = moBase(mo);
      const mValues = monthlyMetricData[m];
      mValues.forEach((mv, mi) => {
        const mDef = spec.metrics[mi];
        setCell(base + mi, mv, true, mDef.format ?? '#,##0.0', undefined, 2);
      });
    }
  });

  const totalContentRows = currentRow + rows.length;
  const maxRows = Math.max(totalContentRows + 10, 20);

  // 底部备注（如果有）
  if (spec.footerNotes) {
    const noteRow = totalContentRows + 1;
    celldata.push({
      r: noteRow, c: 0,
      v: {
        v: spec.footerNotes, m: spec.footerNotes,
        ct: { fa: 'General', t: 'g' },
        bg: '#f8fafc', fc: '#475569', fs: 9, ht: 0, vt: 0, tb: 2
      }
    });
    merge[`${noteRow}_0`] = { r: noteRow, c: 0, rs: 2, cs: TOTAL_COLS };
  }

  // 下拉数据验证
  const dataVerification: Record<string, any> = {};
  spec.dimensions.forEach((col, ci) => {
    if (col.dropdown) {
      for (let r = 2; r < maxRows; r++) {
        dataVerification[`${r}_${ci}`] = {
          type: 'dropdown',
          type2: null,
          value1: col.dropdown,
          value2: '',
          checked: false,
          remote: false,
          prohibitInput: false,
          hintShow: false,
          hintText: ''
        };
      }
    }
  });

  // 列宽配置
  const columnlen: Record<number, number> = {};
  spec.dimensions.forEach((col, ci) => {
    columnlen[ci] = col.width ?? 120;
  });
  for (let c = DIM_COLS; c < TOTAL_COLS; c++) {
    const mi = (c - DIM_COLS) % N_METRICS;
    columnlen[c] = spec.metrics[mi]?.width ?? 95;
  }

  return {
    name: spec.name,
    row: maxRows,
    column: TOTAL_COLS,
    celldata,
    dataVerification,
    config: {
      merge,
      rowlen: { 0: 32, 1: 26 },
      columnlen
    }
  };
}


export interface SimpleMonthlyRowSpec {
  dimensions: (string | number | null | undefined)[];
  monthlyValues?: Record<number, number | null | undefined>; // 1~12 -> amount
  annualValue?: number;
}

export interface SimpleMonthlySheetSpec {
  name: string;
  dimensions: MonthlyBudgetSheetColumn[];
  sumLabel?: string; // default '【全年合计】'
  rows?: SimpleMonthlyRowSpec[];
  footerNotes?: string;
}

/**
 * 声明式「单度量月度预算表」构造器（如 销售费用明细表、综合费用预算表等）。
 * 表头为两行制深海蓝合并（维度列与各月列均跨 2 行），结构轻量纯粹。
 */
export function createSimpleMonthlySheet(spec: SimpleMonthlySheetSpec): SpreadsheetSheetFixture {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};
  const DIM_COLS = spec.dimensions.length;
  const MONTHS = 12;
  const COL_SUM = DIM_COLS;
  const TOTAL_COLS = COL_SUM + 1 + MONTHS; // dimensions + sum + 12 months

  const hdrBg = '#002f6c';
  const sumBg = '#001e4a';
  const hdrFc = '#ffffff';

  // Row 0 & 1: 维度列跨 2 行
  spec.dimensions.forEach((col, ci) => {
    celldata.push({
      r: 0, c: ci,
      v: { v: col.label, m: col.label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc }
    });
    celldata.push({
      r: 1, c: ci,
      v: { v: col.label, m: col.label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc }
    });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  });

  // 【全年合计】列跨 2 行
  const sumText = spec.sumLabel ?? '【全年合计】';
  celldata.push({
    r: 0, c: COL_SUM,
    v: { v: sumText, m: sumText, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader, bg: sumBg, fc: hdrFc }
  });
  celldata.push({
    r: 1, c: COL_SUM,
    v: { v: sumText, m: sumText, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader, bg: sumBg, fc: hdrFc }
  });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 2, cs: 1 };

  // 1~12月各月列跨 2 行
  for (let m = 1; m <= MONTHS; m++) {
    const ci = COL_SUM + m;
    const mText = `${m}月`;
    celldata.push({
      r: 0, c: ci,
      v: { v: mText, m: mText, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc }
    });
    celldata.push({
      r: 1, c: ci,
      v: { v: mText, m: mText, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc }
    });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  }

  // 数据行
  const rows = spec.rows ?? [];
  rows.forEach((rowSpec, idx) => {
    const r = 2 + idx;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';

    const setCell = (c: number, val: any, isNum = false, fmt = 'General', align?: 0 | 1 | 2) => {
      const ht = align !== undefined ? align : (isNum ? 2 : 1);
      celldata.push({
        r, c,
        v: {
          v: val,
          m: isNum && typeof val === 'number'
            ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
            : String(val ?? ''),
          ct: { fa: fmt, t: isNum ? 'n' : 'g' },
          bg: rowBg,
          ht,
          vt: 1
        }
      });
    };

    // 维度列
    rowSpec.dimensions.forEach((val, ci) => {
      const colDef = spec.dimensions[ci];
      const isNum = typeof val === 'number';
      setCell(ci, val, isNum, isNum ? '#,##0.0' : 'General', colDef?.align ?? (isNum ? 2 : 1));
    });

    // 计算分月
    let sumVal = 0;
    const mVals: number[] = [];
    for (let m = 1; m <= MONTHS; m++) {
      const v = Number(rowSpec.monthlyValues?.[m] ?? 0);
      mVals.push(v);
      sumVal += v;
    }
    const annual = rowSpec.annualValue !== undefined ? Number(rowSpec.annualValue) : Math.round(sumVal * 10) / 10;

    // 全年合计
    setCell(COL_SUM, annual, true, '#,##0.0', 2);

    // 各月
    mVals.forEach((v, i) => {
      setCell(COL_SUM + 1 + i, v, true, '#,##0.0', 2);
    });
  });

  const totalContentRows = 2 + rows.length;
  const maxRows = Math.max(totalContentRows + 10, 20);

  // 列宽
  const columnlen: Record<number, number> = {};
  spec.dimensions.forEach((col, ci) => {
    columnlen[ci] = col.width ?? 120;
  });
  columnlen[COL_SUM] = 100;
  for (let m = 1; m <= MONTHS; m++) {
    columnlen[COL_SUM + m] = 85;
  }

  return {
    name: spec.name,
    row: maxRows,
    column: TOTAL_COLS,
    celldata,
    config: {
      merge,
      rowlen: { 0: 32, 1: 26 },
      columnlen
    }
  };
}


export interface FlatDictSheetColumn {
  label: string;
  width?: number;
  isNum?: boolean;
}

export interface FlatDictSheetSpec {
  name: string;
  columns: FlatDictSheetColumn[];
  rows: (string | number | null | undefined)[][];
}

/**
 * 声明式「主数据与业务字典表」构造器（Archetype 3：单层平铺表头，无合并，纯粹键值清单）。
 */
export function createFlatDictSheet(spec: FlatDictSheetSpec): SpreadsheetSheetFixture {
  const celldata: any[] = [];
  const TOTAL_COLS = spec.columns.length;

  // Row 0: 列头
  spec.columns.forEach((col, c) => {
    celldata.push({
      r: 0, c,
      v: { v: col.label, m: col.label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.header }
    });
  });

  // 数据行
  spec.rows.forEach((row, idx) => {
    const r = idx + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    row.forEach((val, c) => {
      const colDef = spec.columns[c];
      const isNum = colDef?.isNum || (typeof val === 'number');
      celldata.push({
        r, c,
        v: {
          v: val,
          m: String(val ?? ''),
          ct: { fa: 'General', t: isNum ? 'n' : 'g' },
          bg: rowBg,
          ht: isNum ? 2 : 0,
          vt: 1
        }
      });
    });
  });

  const maxRows = Math.max(spec.rows.length + 5, 10);
  const columnlen: Record<number, number> = {};
  spec.columns.forEach((col, c) => {
    columnlen[c] = col.width ?? 140;
  });

  return {
    name: spec.name,
    row: maxRows,
    column: TOTAL_COLS,
    celldata,
    config: {
      merge: {},
      rowlen: { 0: 28 },
      columnlen
    }
  };
}
