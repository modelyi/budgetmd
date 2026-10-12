// Barrel file: spreadsheetAdapters 拆分为按业务域的适配器文件。
// 对外 API 保持不变，所有 build*Sheet 函数与共享常量从各域文件 re-export。
export * from './adapters/shared';
export * from './adapters/sales';
export * from './adapters/capex';
export * from './adapters/production';
export * from './adapters/financial';
export * from './adapters/expense';
export * from './adapters/masterData';
export * from './adapters/intercompany';
