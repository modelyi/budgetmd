// 预算调研页 AM 映射表 + AA.1 主数据 脱敏示例数据
//
// 用途：scripts/generateResearchMarkdownContent.ts 生成调研页表样时，为以下 3 张表
// 提供示例数据行（原脚本传空数组，仅渲染表头）。主会话接入时按下表传参即可：
//
//   buildProductRevenueMappingSheet(PRODUCT_REVENUE_MAPPING_SAMPLE)  // AM.1
//   buildDeptAttributeMappingSheet(DEPT_ATTRIBUTE_MAPPING_SAMPLE)    // AM.2
//   buildBudgetPeriodMasterSheets(BUDGET_YEAR_MASTER_SAMPLE, BUDGET_PERIOD_CALENDAR_SAMPLE)  // AA.1
//
// 说明：
//   - 全部为脱敏虚构数据；成本率/日期等数值不要求勾稽，仅用于示意与阅读理解。
//   - AM.1 的 defaultRevenueMethod 必须命中 src/data/revenueMethodDict.ts 中 REVENUE_METHOD_DICT
//     的 name（'验收一次性' / '直线法'），否则渲染时「方式编码 / 准则分类 / 月度分摆逻辑」三列回退为 '-'。
//   - AA.1 期间日历按 2027 年度展开 12 行（1月~12月），年度主数据给 3 行（历史归档 / 当前基准 / 滚动预测）。

import type { ProductCategoryDictItem } from './productCategoryDict';
import type {
  BudgetYearItemForSheet,
  BudgetPeriodItemForSheet,
  DeptAttributeMappingItem,
} from '../utils/adapters/shared';

// ---------------------------------------------------------------------------
// AM.1 产品类别（财务口径）与收入映射 → buildProductRevenueMappingSheet(PRODUCT_REVENUE_MAPPING_SAMPLE)
// 列：产品编码 | 产品类别（财务口径）名 | 默认收入确认方式 | 方式编码 | 准则分类 | 月度分摆逻辑 | 标准成本率% | 毛利率% | 映射说明
// 其中「方式编码 / 准则分类 / 月度分摆逻辑」由适配器按 defaultRevenueMethod 查 REVENUE_METHOD_DICT 自动带出，
// 毛利率% = 100 − 标准成本率%，也由适配器计算，无需在示例行中提供。
// ---------------------------------------------------------------------------
export const PRODUCT_REVENUE_MAPPING_SAMPLE: ProductCategoryDictItem[] = [
  {
    code: 'PC-S01',
    name: '整机台+验收款',
    defaultRevenueMethod: '验收一次性',
    costRatePct: 44,
    notes: '整机台设备验收合格当月一次性确认收入（时点法），毛利率56%',
  },
  {
    code: 'PC-S02',
    name: '关键模组+验收款',
    defaultRevenueMethod: '验收一次性',
    costRatePct: 48,
    notes: '核心子系统模组现场测试合格验收当月确认收入，毛利率52%',
  },
  {
    code: 'PC-S03',
    name: '零部件耗材+交付款',
    defaultRevenueMethod: '验收一次性',
    costRatePct: 52,
    notes: '标准零部件与耗材交付签收当月一次性确认收入，毛利率48%',
  },
  {
    code: 'PC-S04',
    name: '软件授权+授权款',
    defaultRevenueMethod: '验收一次性',
    costRatePct: 18,
    notes: '软件授权与 Key 下发，上线验收一次性确认收入，毛利率82%',
  },
  // 如需演示「时段法」，可追加：{ code: 'PC-S05', name: '技术服务维保+服务款', defaultRevenueMethod: '直线法', costRatePct: 35, notes: '驻场服务与年度维保按服务期均摊（时段法）' }
];

// ---------------------------------------------------------------------------
// AM.2 部门属性映射表 → buildDeptAttributeMappingSheet(DEPT_ATTRIBUTE_MAPPING_SAMPLE)
// 列：部门 | 费用属性 | 备注说明
// ---------------------------------------------------------------------------
export const DEPT_ATTRIBUTE_MAPPING_SAMPLE: DeptAttributeMappingItem[] = [
  { department: '销售一部', expenseNature: '销售费用', notes: '面向华东区整机台销售，费用属性带出为销售费用' },
  { department: '研发中心', expenseNature: '研发费用', notes: '产品研发与工艺预研，费用属性带出为研发费用' },
  { department: '制造工程部', expenseNature: '直接制造费用', notes: '整机总装与工艺制造直接耗用，费用属性带出为直接制造费用' },
  { department: '设备动力部', expenseNature: '间接制造费用', notes: '设备维护与动力等需分摊的制造费用，费用属性带出为间接制造费用' },
  { department: '采购与供应链管理部', expenseNature: '管理费用', notes: '职能管理单元，费用属性带出为管理费用' },
];

// ---------------------------------------------------------------------------
// AA.1.a 预算年度主数据 → buildBudgetPeriodMasterSheets(BUDGET_YEAR_MASTER_SAMPLE, ...)
// 列：预算年度 | 年度全称 | 编制性质/类型 | 当前基准年度 | 年度控制状态 | 基准结算币种 | 编制上报截止日 | 年度编制说明与管控目标
// type: 'OFFICIAL'（正式预算）/ 'FORECAST'（滚动预测）/ 其他（历史归档）；status: 'OPEN' / 'CLOSED' / 其他（规划中）。
// ---------------------------------------------------------------------------
export const BUDGET_YEAR_MASTER_SAMPLE: BudgetYearItemForSheet[] = [
  {
    year: 2026,
    name: '2026年度预算',
    type: 'ARCHIVED',
    isCurrent: false,
    status: 'CLOSED',
    currency: 'CNY (人民币)',
    submissionDeadline: '2025-11-28',
    description: '2026年度已结账归档，作为2027年度编制的历史对比基期',
  },
  {
    year: 2027,
    name: '2027年度预算',
    type: 'OFFICIAL',
    isCurrent: true,
    status: 'OPEN',
    currency: 'CNY (人民币)',
    submissionDeadline: '2026-11-30',
    description: '2027年度正式预算，当前生效基准年度，全员编制期开放中',
  },
  {
    year: 2028,
    name: '2028年度滚动预测',
    type: 'FORECAST',
    isCurrent: false,
    status: 'PLANNING',
    currency: 'CNY (人民币)',
    submissionDeadline: '2027-09-30',
    description: '2028年度滚动预测（规划中），随季度滚动刷新',
  },
];

// ---------------------------------------------------------------------------
// AA.1.b 预算期间日历 → buildBudgetPeriodMasterSheets(_, BUDGET_PERIOD_CALENDAR_SAMPLE)
// 列：期间编码 | 所属年度 | 月份序号 | 期间名称 | 所属季度 | 起始日期 | 结束日期 | 期间状态 | 上报截止日 | 数据锁定日 | 管控说明与备注
// status: 'OPEN'（开放编制）/ 'LOCKED'（已锁定）/ 'CLOSED'（已结账）/ 其他（待开启）。
// ---------------------------------------------------------------------------

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

// 生成某预算年度 12 个月的预算期间日历（1月~12月）
function buildPeriodCalendar(year: number): BudgetPeriodItemForSheet[] {
  return Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    const days = new Date(year, m, 0).getDate(); // 当月天数
    const end = `${year}-${pad2(m)}-${pad2(days)}`;
    const freeze = new Date(year, m - 1, days + 3); // 月末 +3 天为数据锁定日（自动跨月/跨年）
    return {
      id: `P-${year}-${pad2(m)}`,
      year,
      periodNum: m,
      periodName: `${m}月`,
      quarter: `Q${Math.floor((m - 1) / 3) + 1}`,
      startDate: `${year}-${pad2(m)}-01`,
      endDate: end,
      status: 'OPEN',
      submissionDeadline: end,
      freezeDate: `${freeze.getFullYear()}-${pad2(freeze.getMonth() + 1)}-${pad2(freeze.getDate())}`,
      remarks: `${year}年${m}月预算期间，月末上报、次月3日数据锁定`,
    };
  });
}

export const BUDGET_PERIOD_CALENDAR_SAMPLE: BudgetPeriodItemForSheet[] = buildPeriodCalendar(2027);
