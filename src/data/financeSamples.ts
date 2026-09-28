/**
 * 财务表样示例数据（脱敏虚构，仅用于调研页表样预览展示）
 *
 * 本文件为 3 个 build*Sheet 函数提供示例数据行，使表样在只有表头之外
 * 还能渲染出数据行，便于调研页核对列结构、表头与勾稽说明的排版。
 *
 * 注意：
 * - 全部为脱敏虚构数据，法人/金融机构/产品均沿用主数据命名风格；
 * - 金额单位为「万元」，未与任何业务表勾稽（示例数据不要求平账）；
 * - 月份数据做了简化：仅按稀疏月份填报，其余月份由 build*Sheet 函数
 *   以 0 兜底渲染。
 *
 * 消费方（由主会话在 scripts/generateResearchMarkdownContent.ts 中接入）：
 * - FINANCIAL_INSTRUMENT_SAMPLE   -> buildFinancialInstrumentSheets(bankItems, ...)
 * - NONBANK_INSTRUMENT_SAMPLE     -> buildFinancialInstrumentSheets(_, nonBankItems, ...)
 * - LEGAL_ENTITY_ADJUST_SAMPLE    -> buildLegalEntityStatementAdjustmentSheet(items)
 */
import type {
  FinancialInstrumentInvestmentItem,
  NonBankFinancialInstrumentItem,
  FinancingBudgetDetailItem,
  FinancingFeeType,
} from '../types';

// ----------------------------------------------------------------------
// BF.3.a 金融工具投融资-银行（银行存款 / 银行理财）
// ----------------------------------------------------------------------

type BankMonth = {
  newInvestment: number;
  redemption: number;
  investmentIncome: number;
  returnRatePct: number;
};

/** 按稀疏月份生成 12 个月明细（缺失月份补 0）。利率为「百分数」口径（2.35 表示 2.35%）。 */
function makeBankMonths(
  plan: Partial<Record<number, Partial<BankMonth>>>,
  baseRatePct: number
): Record<string, BankMonth> {
  const months: Record<string, BankMonth> = {};
  for (let m = 1; m <= 12; m++) {
    const p = plan[m] || {};
    months[`m${m}`] = {
      newInvestment: p.newInvestment ?? 0,
      redemption: p.redemption ?? 0,
      investmentIncome: p.investmentIncome ?? 0,
      returnRatePct: p.returnRatePct ?? baseRatePct,
    };
  }
  return months;
}

export const FINANCIAL_INSTRUMENT_SAMPLE: FinancialInstrumentInvestmentItem[] = [
  {
    id: 'fi-bank-01',
    seq: 1,
    legalEntity: '甜甜圈集团公司',
    category: '银行存款',
    productType: '结构性存款',
    bankName: '中国银行',
    interestRatePct: 2.35,
    months: makeBankMonths(
      {
        1: { newInvestment: 3000 },
        4: { newInvestment: 2000 },
        6: { investmentIncome: 35.25 },
        7: { redemption: 1000 },
        10: { redemption: 500 },
        12: { investmentIncome: 47.0 },
      },
      2.35
    ),
    annualNewInvestment: 5000,
    annualRedemption: 1500,
    annualInvestmentIncome: 82.25,
    avgReturnRatePct: 2.35,
    cfOutflowImpact: '进现金流量表项目“投资支付的现金”',
    cfInflowImpact: '进现金流量表项目“收回投资收到的现金”',
    bsImpact: '进资产负债表项目“交易性金融资产/定期存款”',
    plImpact: '存款利息进利润表“财务费用-利息收入(负数)”',
    cfIncomeImpact: '进现金流量表项目“取得投资收益收到的现金”',
    status: '启用',
    notes: '集团本部结构性存款，挂钩利率 2.35%，季末计息。',
  },
  {
    id: 'fi-bank-02',
    seq: 2,
    legalEntity: '甜甜圈集团公司',
    category: '银行存款',
    productType: '大额存单',
    bankName: '工商银行',
    interestRatePct: 2.6,
    months: makeBankMonths(
      {
        2: { newInvestment: 2000 },
        5: { newInvestment: 1000 },
        8: { investmentIncome: 52.0 },
        11: { redemption: 800 },
        12: { investmentIncome: 26.0 },
      },
      2.6
    ),
    annualNewInvestment: 3000,
    annualRedemption: 800,
    annualInvestmentIncome: 78.0,
    avgReturnRatePct: 2.6,
    cfOutflowImpact: '进现金流量表项目“投资支付的现金”',
    cfInflowImpact: '进现金流量表项目“收回投资收到的现金”',
    bsImpact: '进资产负债表项目“交易性金融资产/定期存款”',
    plImpact: '存款利息进利润表“财务费用-利息收入(负数)”',
    cfIncomeImpact: '进现金流量表项目“取得投资收益收到的现金”',
    status: '启用',
    notes: '一年期大额存单，到期一次性还本付息。',
  },
  {
    id: 'fi-bank-03',
    seq: 3,
    legalEntity: '草莓慕斯公司',
    category: '银行理财',
    productType: '银行理财',
    bankName: '招商银行',
    interestRatePct: 3.1,
    months: makeBankMonths(
      {
        3: { newInvestment: 1500 },
        6: { newInvestment: 500 },
        9: { redemption: 600 },
        12: { investmentIncome: 31.0 },
      },
      3.1
    ),
    annualNewInvestment: 2000,
    annualRedemption: 600,
    annualInvestmentIncome: 31.0,
    avgReturnRatePct: 3.1,
    cfOutflowImpact: '进现金流量表项目“投资支付的现金”',
    cfInflowImpact: '进现金流量表项目“收回投资收到的现金”',
    bsImpact: '进资产负债表项目“交易性金融资产”',
    plImpact: '理财收益进利润表“投资收益”',
    cfIncomeImpact: '进现金流量表项目“取得投资收益收到的现金”',
    status: '启用',
    notes: '制造基地闲置资金流动性管理，开放式银行理财。',
  },
];

// ----------------------------------------------------------------------
// BF.3.b 金融工具投资预算-非银（债券/基金/股票等）
// ----------------------------------------------------------------------

type NonBankMonth = {
  newInvestment: number;
  redemption: number;
  endingInvestment: number;
  investmentIncome: number;
  dividendInterestInflow: number;
  avgCapitalOccupied: number;
  returnRatePct: number;
};

/**
 * 按稀疏月份生成 12 个月明细（缺失月份补 0）。
 * 注意：非银表 returnRatePct 为「小数」口径（0.032 表示 3.2%），与银行表不同。
 */
function makeNonBankMonths(
  plan: Partial<Record<number, Partial<NonBankMonth>>>,
  baseRate = 0.03
): Record<string, NonBankMonth> {
  const months: Record<string, NonBankMonth> = {};
  for (let m = 1; m <= 12; m++) {
    const p = plan[m] || {};
    months[`m${m}`] = {
      newInvestment: p.newInvestment ?? 0,
      redemption: p.redemption ?? 0,
      endingInvestment: p.endingInvestment ?? 0,
      investmentIncome: p.investmentIncome ?? 0,
      dividendInterestInflow: p.dividendInterestInflow ?? 0,
      avgCapitalOccupied: p.avgCapitalOccupied ?? 0,
      returnRatePct: p.returnRatePct ?? baseRate,
    };
  }
  return months;
}

export const NONBANK_INSTRUMENT_SAMPLE: NonBankFinancialInstrumentItem[] = [
  {
    id: 'fi-nonbank-01',
    seq: 1,
    legalEntity: '甜甜圈集团公司',
    investType: '交易性金融资产',
    productName: '债券投资',
    projectName: '国债及高等级信用债投资组合',
    priorAvgCapitalOccupied: 8000,
    priorReturnRatePct: 0.032,
    priorEndingInvestment: 8500,
    months: makeNonBankMonths(
      {
        1: { newInvestment: 2000, endingInvestment: 10500, avgCapitalOccupied: 9000 },
        4: { newInvestment: 1500, endingInvestment: 12000, avgCapitalOccupied: 11000 },
        6: { investmentIncome: 96, dividendInterestInflow: 96, avgCapitalOccupied: 12000 },
        9: { redemption: 1000, endingInvestment: 11000, avgCapitalOccupied: 11500 },
        12: { investmentIncome: 88, dividendInterestInflow: 88, avgCapitalOccupied: 11000 },
      },
      0.032
    ),
    annualNewInvestment: 3500,
    annualRedemption: 1000,
    annualEndingInvestment: 11000,
    annualInvestmentIncome: 184.0,
    annualDividendInterestInflow: 184.0,
    annualAvgCapitalOccupied: 11000,
    annualReturnRatePct: 0.032,
    notes: '配置型债券组合，票息按季收取，锁定长期稳定收益。',
  },
  {
    id: 'fi-nonbank-02',
    seq: 2,
    legalEntity: '草莓慕斯公司',
    investType: '其他权益工具投资',
    productName: '股票投资',
    projectName: '核心客户战略配售股票投资',
    priorAvgCapitalOccupied: 3000,
    priorReturnRatePct: 0.045,
    priorEndingInvestment: 3200,
    months: makeNonBankMonths(
      {
        2: { newInvestment: 1200, endingInvestment: 4400, avgCapitalOccupied: 3800 },
        6: { investmentIncome: 45, dividendInterestInflow: 45, avgCapitalOccupied: 4400 },
        10: { redemption: 600, endingInvestment: 3800, avgCapitalOccupied: 4100 },
        12: { investmentIncome: 38, dividendInterestInflow: 38, avgCapitalOccupied: 3800 },
      },
      0.045
    ),
    annualNewInvestment: 1200,
    annualRedemption: 600,
    annualEndingInvestment: 3800,
    annualInvestmentIncome: 83.0,
    annualDividendInterestInflow: 83.0,
    annualAvgCapitalOccupied: 4000,
    annualReturnRatePct: 0.045,
    notes: '产业链核心客户战略配售，持有期红利再投资。',
  },
  {
    id: 'fi-nonbank-03',
    seq: 3,
    legalEntity: '甜甜圈集团公司',
    investType: '交易性金融资产',
    productName: '公募基金投资',
    projectName: '货币市场基金流动性配置',
    priorAvgCapitalOccupied: 5000,
    priorReturnRatePct: 0.021,
    priorEndingInvestment: 5000,
    months: makeNonBankMonths(
      {
        1: { newInvestment: 1000, endingInvestment: 6000, avgCapitalOccupied: 5500 },
        5: { redemption: 1000, endingInvestment: 5000, avgCapitalOccupied: 5500 },
        12: { investmentIncome: 12.6, dividendInterestInflow: 12.6, avgCapitalOccupied: 5000 },
      },
      0.021
    ),
    annualNewInvestment: 1000,
    annualRedemption: 1000,
    annualEndingInvestment: 5000,
    annualInvestmentIncome: 12.6,
    annualDividendInterestInflow: 12.6,
    annualAvgCapitalOccupied: 5000,
    annualReturnRatePct: 0.021,
    notes: '货币基金作为集团日常流动性蓄水池，随借随取。',
  },
];

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

/**
 * buildLegalEntityStatementAdjustmentSheet 以 `any[]` 接收数据，实际读取字段：
 * businessType / legalEntity / summary / relatedLine / annualTotal /
 * months.m1~m12 / adjustmentReason。
 */
export interface LegalEntityAdjustSampleItem {
  businessType: string;
  legalEntity: string;
  summary: string;
  relatedLine: string;
  annualTotal: number;
  months: Record<string, number>;
  adjustmentReason: string;
}

/** 按稀疏月份生成 1~12 月金额（缺失月份补 0）。 */
function makeAdjustMonths(plan: Partial<Record<number, number>>): Record<string, number> {
  const months: Record<string, number> = {};
  for (let m = 1; m <= 12; m++) {
    months[`m${m}`] = plan[m] ?? 0;
  }
  return months;
}

export const LEGAL_ENTITY_ADJUST_SAMPLE: LegalEntityAdjustSampleItem[] = [
  {
    businessType: '报表调整',
    legalEntity: '甜甜圈集团公司',
    summary: '长期借款一年内到期部分重分类补录',
    relatedLine: 'BO.BS 2501 长期借款',
    annualTotal: 500,
    months: makeAdjustMonths({ 12: 500 }),
    adjustmentReason: '报表层重分类调整：长期借款一年内到期部分，负债合计不变。',
  },
  {
    businessType: '其他业务收入',
    legalEntity: '草莓慕斯公司',
    summary: '零星备件维保收入补录',
    relatedLine: 'BO.PL 6001.2 其他业务收入',
    annualTotal: 320,
    months: makeAdjustMonths({ 3: 80, 6: 80, 9: 80, 12: 80 }),
    adjustmentReason: '制造基地零星备件维保服务收入，按季度均摊补录。',
  },
  {
    businessType: '其他业务支出',
    legalEntity: '蓝莓蛋挞公司',
    summary: '闲置厂房维护性支出补录',
    relatedLine: 'BO.PL 6401.2 其他业务成本',
    annualTotal: 100,
    months: makeAdjustMonths({ 6: 60, 12: 40 }),
    adjustmentReason: '闲置厂房日常维护及消防改造支出，分两期计入。',
  },
  {
    businessType: '报表调整',
    legalEntity: '甜甜圈集团公司',
    summary: '经营活动其他现金流入补录',
    relatedLine: 'BO.CF CF-03 收到其他与经营活动有关的现金',
    annualTotal: 60,
    months: makeAdjustMonths({ 9: 60 }),
    adjustmentReason: '报表层补录：其他与经营活动有关的现金流入。',
  },
];

// ----------------------------------------------------------------------
// BF.3.c 融资预算明细表（融资类型示例行，取值一律来自 AB.17 融资类型字典）
// 三行示例覆盖两级取值：二级 XYZ-0103 流动贷款 / XYZ-0101 银行长期贷款；一级 XYZ-07 债券融资。
// 内部借款 XYZ-16 不在本表编制（见 BJ.C.f 内部借款预算表），故本表不再登记 XYZ-16 示例行。
// 「融资类型」列直接写「编码 + 业务名称」，与 AB.17 字典一一对应；金额为虚构演示值，不与任何业务表勾稽。
// ----------------------------------------------------------------------

function makeFinancingMonths(
  plan: Partial<Record<number, { payable?: number; paid?: number; fee?: number; feeType?: FinancingFeeType; reclass?: number }>>
): FinancingBudgetDetailItem['months'] {
  const months: FinancingBudgetDetailItem['months'] = {};
  for (let m = 1; m <= 12; m++) {
    const p = plan[m] || {};
    months[`m${m}`] = {
      newFinancing: 0,
      reduction: 0,
      financingFee: p.fee ?? 0,
      feeType: p.feeType ?? '费用化融资费用',
      interestPayable: p.payable ?? 0,
      interestPaid: p.paid ?? 0,
      liquidityReclassification: p.reclass ?? 0,
    };
  }
  return months;
}

/** AB.17 引用说明：一级如 XYZ-01 银行借款/XYZ-09 保函/XYZ-16 内部借款，二级如 XYZ-0103 流动贷款/XYZ-0902 履约保函。 */
export const FINANCING_BUDGET_DETAIL_SAMPLE: FinancingBudgetDetailItem[] = [
  {
    id: 'fin-detail-01',
    seq: 1,
    legalEntity: '甜甜圈集团公司',
    financingNature: '已有',
    financingType: 'XYZ-0103 流动贷款',
    openingNetBalance: 8000,
    interestRate: 0.032,
    term: '1年到期',
    dueDate: '2027-09-30',
    newFinancingAmount: 0,
    reductionAmount: 4000,
    financingFee: 12,
    feeType: '费用化融资费用',
    months: makeFinancingMonths({
      1: { payable: 21.3, fee: 1 }, 2: { payable: 21.3, fee: 1 }, 3: { payable: 21.3, paid: 64, fee: 1 },
      4: { payable: 21.3, fee: 1 }, 5: { payable: 21.3, fee: 1 }, 6: { payable: 21.3, paid: 64, fee: 1 },
      7: { payable: 21.3, fee: 1 }, 8: { payable: 21.3, fee: 1 }, 9: { payable: 21.3, paid: 64, fee: 1 },
      10: { fee: 1 }, 11: { fee: 1 }, 12: { fee: 1 },
    }),
    annualInterestPayable: 191.7,
    annualInterestPaid: 192,
    annualLiquidityReclassification: 0,
    notes: '融资类型取 AB.17 二级值 XYZ-0103 流动贷款（上级 XYZ-01 银行借款，外部/银行类）。',
  },
  {
    id: 'fin-detail-02',
    seq: 2,
    legalEntity: '草莓慕斯公司',
    financingNature: '新增',
    financingType: 'XYZ-0101 银行长期贷款',
    openingNetBalance: 0,
    interestRate: 0.039,
    term: '长期',
    dueDate: '2030-06-30',
    newFinancingAmount: 12000,
    reductionAmount: 0,
    financingFee: 30,
    feeType: '费用化融资费用',
    months: makeFinancingMonths({
      3: { payable: 39, fee: 10 }, 4: { payable: 39, fee: 2 }, 5: { payable: 39, fee: 2 }, 6: { payable: 39, paid: 117, fee: 2 },
      7: { payable: 39, fee: 2 }, 8: { payable: 39, fee: 2 }, 9: { payable: 39, fee: 2 }, 10: { payable: 39, fee: 2 },
      11: { payable: 39, fee: 2 }, 12: { payable: 39, paid: 117, fee: 2 },
    }),
    annualInterestPayable: 390,
    annualInterestPaid: 234,
    annualLiquidityReclassification: 0,
    notes: '融资类型取 AB.17 二级值 XYZ-0101 银行长期贷款（上级 XYZ-01 银行借款，外部/银行类）。',
  },
  {
    id: 'fin-detail-03',
    seq: 3,
    legalEntity: '蓝莓蛋挞公司',
    financingNature: '新增',
    financingType: 'XYZ-07 债券融资',
    openingNetBalance: 0,
    interestRate: 0.042,
    term: '3年期',
    dueDate: '2029-12-31',
    newFinancingAmount: 20000,
    reductionAmount: 0,
    financingFee: 45,
    feeType: '费用化融资费用',
    months: makeFinancingMonths({
      2: { payable: 70, fee: 4 }, 3: { payable: 70, fee: 4 }, 4: { payable: 70, fee: 4 }, 5: { payable: 70, fee: 4 },
      6: { payable: 70, fee: 4 }, 7: { payable: 70, fee: 4 }, 8: { payable: 70, fee: 4 }, 9: { payable: 70, fee: 4 },
      10: { payable: 70, fee: 4 }, 11: { payable: 70, fee: 4 }, 12: { payable: 70, paid: 840, fee: 5 },
    }),
    annualInterestPayable: 770,
    annualInterestPaid: 840,
    annualLiquidityReclassification: 0,
    notes: '融资类型取 AB.17 一级值 XYZ-07 债券融资（外部/银行类）。',
  },
];
