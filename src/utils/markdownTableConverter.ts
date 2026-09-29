import type { SpreadsheetSheetFixture, SpreadsheetCell } from './spreadsheetTypes';

/**
 * 调研总结页 Markdown/HTML 表格渲染器。
 *
 * 目的：调研页只做只读展示，不需要 Univer 电子表格引擎的交互能力（编辑/公式重算/
 * 下拉校验等）。本模块把现有 build*Sheet() 适配器返回的 celldata/merge/columnlen
 * 结构直接解析成一张朴素的 HTML <table>，取代 Univer 渲染层。
 *
 * 设计原则：
 * - 不重写 35+ 张表的数据源，只重写渲染方式（复用 celldata/merge，解析成二维网格）。
 * - rowspan/colspan 还原 Univer 的两行制表头合并效果。
 * - 深蓝表头背景色（#002f6c / #001e4a，来自 SPREADSHEET_STYLES）用于识别表头行，
 *   转换成 <th>；其余转换成 <td>。
 * - 不做任何交互（无冻结、无编辑、无下拉），与"易看易读"的调研页展示原则一致。
 */

const HEADER_BG_COLORS = new Set([
  '#002f6c', // deepBlueHeader / deepBlueSubHeader（维度列与时间分组列主色）
  '#001e4a', // deepBlueSumHeader / deepBlueSumSubHeader（合计强调色）
  '#475569', // readOnlyHeader / readOnlySubHeader（只读列：系统带出/公式）
  '#b45309', // editableHeader / editableSubHeader（可修改列：手工录入/导入/默认值可覆盖）
]);

export interface MarkdownTableCell {
  text: string;
  isHeader: boolean;
  rowSpan: number;
  colSpan: number;
  align?: 'left' | 'center' | 'right';
  /** 表头底色（来自 adapters 的 SPREADSHEET_STYLES），用于区分只读列/可修改列 */
  bg?: string;
  /** 表单跳转链接（来源编制表列专用）：{ code: 表单编号, name: 表单名 } */
  links?: { code: string; name: string }[];
  /** 结构化来源（来源编制表列专用）：{ formCode, formName, field }，渲染时表编号+表名可点击跳转 */
  sources?: { formCode: string; formName: string; field?: string }[];
}

export interface MarkdownTableGrid {
  name: string;
  rows: MarkdownTableCell[][];
  rowCount: number;
  colCount: number;
  /** 文档式表样（如 A2A 方案文档）：开启单元格自动换行，不横向拉伸成一行 */
  wrap?: boolean;
  /** 文档式表样的列宽提示（CSS 宽度值，如 ['13%','87%']），仅在 wrap 时生效 */
  colWidths?: string[];
}

function cellText(cell: SpreadsheetCell): string {
  const v = cell.v;
  if (v === null || v === undefined) return '';
  if (typeof v !== 'object') return String(v);
  const obj = v as Record<string, unknown>;
  if (obj.m !== undefined && obj.m !== null && obj.m !== '') return String(obj.m);
  if (obj.v !== undefined && obj.v !== null) return String(obj.v);
  return '';
}

function cellIsHeader(cell: SpreadsheetCell): boolean {
  const v = cell.v;
  if (typeof v !== 'object' || v === null) return false;
  const bg = (v as Record<string, unknown>).bg;
  return typeof bg === 'string' && HEADER_BG_COLORS.has(bg);
}

/** 读取表头单元格底色，供渲染层区分只读列/可修改列。 */
function cellHeaderBg(cell: SpreadsheetCell): string | undefined {
  const v = cell.v;
  if (typeof v !== 'object' || v === null) return undefined;
  const bg = (v as Record<string, unknown>).bg;
  return typeof bg === 'string' && HEADER_BG_COLORS.has(bg) ? bg : undefined;
}

/** 读取 celldata 单元格上的结构化来源（formCode/formName/field）。 */
function cellSources(cell: SpreadsheetCell): { formCode: string; formName: string; field?: string }[] | undefined {
  const v = cell.v;
  if (typeof v !== 'object' || v === null) return undefined;
  const raw = (v as Record<string, unknown>).sources;
  if (!Array.isArray(raw)) return undefined;
  const sources = raw
    .filter((s): s is { formCode?: unknown; formName?: unknown; field?: unknown } => typeof s === 'object' && s !== null)
    .map((s) => ({
      formCode: String((s as { formCode?: unknown }).formCode ?? ''),
      formName: String((s as { formName?: unknown }).formName ?? ''),
      field: (s as { field?: unknown }).field ? String((s as { field?: unknown }).field) : undefined,
    }))
    .filter((s) => s.formName !== '');
  return sources.length > 0 ? sources : undefined;
}

/** 读取 celldata 单元格上的表单跳转链接（只保留 code/name 两个字段）。 */
function cellLinks(cell: SpreadsheetCell): { code: string; name: string }[] | undefined {
  const v = cell.v;
  if (typeof v !== 'object' || v === null) return undefined;
  const raw = (v as Record<string, unknown>).links;
  if (!Array.isArray(raw)) return undefined;
  const links = raw
    .filter((l): l is { code: unknown; name: unknown } => typeof l === 'object' && l !== null)
    .map((l) => ({ code: String((l as { code?: unknown }).code ?? ''), name: String((l as { name?: unknown }).name ?? '') }))
    .filter((l) => l.code !== '');
  return links.length > 0 ? links : undefined;
}

/**
 * 将单个 SpreadsheetSheetFixture 转换为可直接渲染的表格网格。
 * 合并单元格（config.merge）转换为 rowSpan/colSpan；被合并覆盖的从属格跳过输出。
 */
export function sheetToMarkdownGrid(sheet: SpreadsheetSheetFixture): MarkdownTableGrid {
  const cellMap = new Map<string, SpreadsheetCell>();
  let maxRow = 0;
  let maxCol = 0;
  sheet.celldata.forEach((cell) => {
    cellMap.set(`${cell.r}_${cell.c}`, cell);
    maxRow = Math.max(maxRow, cell.r);
    maxCol = Math.max(maxCol, cell.c);
  });

  const declaredRows = sheet.row ?? 0;
  const declaredCols = sheet.column ?? 0;
  const rowCount = Math.max(maxRow + 1, declaredRows, 1);
  const colCount = Math.max(maxCol + 1, declaredCols, 1);

  // 合并区域：r_c(起点) -> {rs, cs}；同时记录所有被覆盖的从属格坐标，渲染时跳过
  const mergeStarts = new Map<string, { rs: number; cs: number }>();
  const mergedAway = new Set<string>();
  const mergeConfig = sheet.config?.merge ?? {};
  Object.values(mergeConfig).forEach((m) => {
    const rs = Math.max(1, m.rs ?? 1);
    const cs = Math.max(1, m.cs ?? 1);
    mergeStarts.set(`${m.r}_${m.c}`, { rs, cs });
    for (let dr = 0; dr < rs; dr++) {
      for (let dc = 0; dc < cs; dc++) {
        if (dr === 0 && dc === 0) continue;
        mergedAway.add(`${m.r + dr}_${m.c + dc}`);
      }
    }
  });

  // 调研页表样统一去掉"序号"列（展示装饰列，非业务字段）：
  // 识别表头行（r=0 或 r=1）中文本恰为"序号"的列，整列跳过渲染。
  // 例外：A1.1 表单整体登记簿 / A1.2 编制表类列登记簿 需保留序号列（用户要求）。
  const keepSeqColumn = sheet.name.startsWith('A1.1') || sheet.name.startsWith('A1.2');
  const skipCols = new Set<number>();
  if (!keepSeqColumn) {
    for (let c = 0; c < colCount; c++) {
      for (const r of [0, 1]) {
        const cell = cellMap.get(`${r}_${c}`);
        if (cell && cellText(cell) === '序号') { skipCols.add(c); break; }
      }
    }
  }

  const rows: MarkdownTableCell[][] = [];
  for (let r = 0; r < rowCount; r++) {
    const rowCells: MarkdownTableCell[] = [];
    for (let c = 0; c < colCount; c++) {
      if (skipCols.has(c)) continue; // "序号"列，调研页不展示
      const key = `${r}_${c}`;
      if (mergedAway.has(key)) continue; // 被合并覆盖，不单独渲染
      const cell = cellMap.get(key);
      const span = mergeStarts.get(key);
      const links = cell ? cellLinks(cell) : undefined;
      const sources = cell ? cellSources(cell) : undefined;
      const bg = cell ? cellHeaderBg(cell) : undefined;
      rowCells.push({
        text: cell ? cellText(cell) : '',
        isHeader: cell ? cellIsHeader(cell) : false,
        rowSpan: span?.rs ?? 1,
        colSpan: span?.cs ?? 1,
        ...(bg ? { bg } : {}),
        ...(links ? { links } : {}),
        ...(sources ? { sources } : {}),
      });
    }
    rows.push(rowCells);
  }

  // 文档式表样标记（opt-in）：build*Sheet() 在 config 上写 wrapText/colWidths 时，
  // 该表样在渲染层开启单元格自动换行并按 colWidths 放宽列宽；未标记的表样行为完全不变。
  const wrapText = sheet.config?.wrapText === true;
  const colWidths = Array.isArray(sheet.config?.colWidths)
    ? (sheet.config?.colWidths as unknown[]).map((w) => String(w))
    : undefined;

  return {
    name: sheet.name,
    rows,
    rowCount,
    colCount: colCount - skipCols.size,
    ...(wrapText ? { wrap: true } : {}),
    ...(colWidths && colWidths.length > 0 ? { colWidths } : {}),
  };
}
