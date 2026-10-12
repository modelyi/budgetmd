// 销售预算多维汇总分析 (BB.1.X) 透视基表示例数据（需求梳理用，脱敏虚构）
// 维度：客户 / 项目 / 产品 / 部门；度量：收入 / 成本 / 毛利润 / 销售直接费用 / 贡献利润（万元，不含税）
// 口径：毛利润 = 收入 − 成本；贡献利润 = 毛利润 − 销售直接费用。
export interface SalesPivotRow {
  customer: string;            // 客户
  project: string;             // 项目
  product: string;             // 产品
  department: string;          // 部门
  revenue: number;             // 收入（万元）
  cost: number;                // 成本（万元）
  grossProfit: number;         // 毛利润（万元）
  salesExpense: number;        // 销售直接费用（万元）
  contributionProfit: number;  // 贡献利润（万元）
}

// 透视维度（行维度可切换）与度量字段
export const SALES_PIVOT_DIMS = ['客户', '项目', '产品', '部门'] as const;
export type SalesPivotDim = (typeof SALES_PIVOT_DIMS)[number];
export const SALES_PIVOT_METRICS = ['收入', '成本', '毛利润', '销售直接费用', '贡献利润'] as const;
export type SalesPivotMetric = (typeof SALES_PIVOT_METRICS)[number];

// 维度键名 ↔ 中文名映射（供透视表组件按维度汇总）
export const SALES_PIVOT_DIM_KEY: Record<SalesPivotDim, keyof SalesPivotRow> = {
  客户: 'customer',
  项目: 'project',
  产品: 'product',
  部门: 'department',
};

// 度量键名 ↔ 中文名映射
export const SALES_PIVOT_METRIC_KEY: Record<SalesPivotMetric, keyof SalesPivotRow> = {
  收入: 'revenue',
  成本: 'cost',
  毛利润: 'grossProfit',
  销售直接费用: 'salesExpense',
  贡献利润: 'contributionProfit',
};

// 透视基表示例数据（6 行明细，覆盖 4 客户 / 6 项目 / 3 产品 / 2 部门）
export const SALES_PIVOT_SAMPLE: SalesPivotRow[] = [
  { customer: '华山派剑器工坊', project: '华山派剑器B17一期交付项目', product: '高功率光纤激光切割机整机系统', department: '销售一部', revenue: 830, cost: 515, grossProfit: 315, salesExpense: 108, contributionProfit: 207 },
  { customer: '华山派剑器工坊', project: '华山派剑器M9产线升级项目', product: '三维五轴激光切管机', department: '销售一部', revenue: 700, cost: 434, grossProfit: 266, salesExpense: 91, contributionProfit: 175 },
  { customer: '少林寺武备坊', project: '少林寺武备坊工坊12A装备交付项目', product: '高功率光纤激光切割机整机系统', department: '销售二部', revenue: 1125, cost: 698, grossProfit: 427, salesExpense: 146, contributionProfit: 281 },
  { customer: '武当山玄铁工坊', project: '武当山玄铁工坊T9产线调优项目', product: '三维五轴激光切管机', department: '销售二部', revenue: 885, cost: 549, grossProfit: 336, salesExpense: 115, contributionProfit: 221 },
  { customer: '松鼠仓储食品科技', project: '松鼠存储高精度核心子模块备件包', product: '高精度光学光束整形准直模组', department: '销售一部', revenue: 622, cost: 386, grossProfit: 236, salesExpense: 81, contributionProfit: 155 },
  { customer: '少林寺武备坊', project: '少林寺武备坊仓储机器人产线项目', product: '高精度光学光束整形准直模组', department: '销售二部', revenue: 540, cost: 335, grossProfit: 205, salesExpense: 70, contributionProfit: 135 },
];
