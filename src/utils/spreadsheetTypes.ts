/**
 * 表样数据结构类型定义（独立于 Univer 引擎）。
 *
 * 这些类型描述 spreadsheetAdapters.ts 的 build*Sheet() 函数返回的数据结构，
 * 被 markdownTableConverter.ts（生成脚本）和调研页运行时共同使用。
 * 从 univerAdapters.ts 抽出，消除调研页对 @univerjs 的间接依赖。
 */

export type SpreadsheetPrimitive = string | number | boolean | null;

export type SpreadsheetCellValue = SpreadsheetPrimitive | {
  v?: SpreadsheetPrimitive; m?: string; f?: string;
  ct?: { fa?: string; t?: string }; [key: string]: unknown;
};

export type SpreadsheetCell = { r: number; c: number; v?: SpreadsheetCellValue };

export type SpreadsheetSheetFixture = {
  name: string; index?: number; row?: number; column?: number; celldata: SpreadsheetCell[];
  config?: {
    merge?: Record<string, { r: number; c: number; rs?: number; cs?: number }>;
    rowlen?: Record<number | string, number>; columnlen?: Record<number | string, number>;
    rowhidden?: Record<number | string, number>; colhidden?: Record<number | string, number>;
    frozen?: { type?: string; range?: { row_focus?: number; column_focus?: number } };
    freeze?: { startRow?: number; startColumn?: number };
    borderInfo?: unknown;
    customWidth?: Record<number | string, number>;
    [key: string]: unknown;
  };
  dataVerification?: Record<string, Record<string, unknown>>;
  authority?: { allowEdit?: boolean; [key: string]: unknown };
  calcChain?: unknown[];
  hidden?: boolean;
};
