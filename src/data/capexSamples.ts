// 资本性支出预算调研页 3 张表的脱敏示例数据（需求梳理用，金额不勾稽）
// 说明：本文件仅提供示例数据数组，由 scripts/generateResearchMarkdownContent.ts 统一接入对应 build*Sheet 函数。
// 字段值沿用现有主数据风格（法人/部门/预算项目/供应商/资产类别均为脱敏虚构）。

import type {
  OtherFixedAssetAdditionItem,
  AssetDisposalItem,
} from '../utils/adapters/shared';

// ─────────────────────────────────────────────────────────────────────────────
// BB.3.2 基建工程采购预算 示例数据
// 对应函数：buildInfrastructureResearchSheet(items)（参数为 any[]，按下列字段取值）
// 维度=预算项目/部门/法人公司/业务类型/供应商；度量=期初金额 + 1~12月(验收额/付款额/转固金额)
// ─────────────────────────────────────────────────────────────────────────────
export interface InfrastructureResearchSampleItem {
  budgetProject: string;   // 预算项目 (AA.6)
  department: string;      // 部门 (AA.5，默认二级部门)
  entity: string;          // 法人公司 (AA.2)
  infraType: string;       // 业务类型 (土建/装修/土地购买)
  supplier: string;        // 供应商 (AA.10，非必输)
  openingAmount: number;   // 期初金额 (万元，基建在建工程年初余额)
  months: Record<string, {
    acceptanceAmount: number;  // 验收额 (万元)
    paymentAmount: number;     // 付款额 (万元)
    transferAmount: number;    // 转固金额 (万元)
  }>;
  totalAcceptanceAmount: number;  // 全年验收额合计 (万元)
  totalPaymentAmount: number;     // 全年付款额合计 (万元)
  totalTransferAmount: number;    // 全年转固金额合计 (万元)
  notes?: string;              // 备注说明
}

// 12 个月三项度量：默认全 0，仅覆盖非零月份
function infraMonths(
  overrides: Record<number, { acceptanceAmount?: number; paymentAmount?: number; transferAmount?: number }> = {}
): InfrastructureResearchSampleItem['months'] {
  const months: InfrastructureResearchSampleItem['months'] = {};
  for (let m = 1; m <= 12; m++) {
    const o = overrides[m] ?? {};
    months[`m${m}`] = {
      acceptanceAmount: o.acceptanceAmount ?? 0,
      paymentAmount: o.paymentAmount ?? 0,
      transferAmount: o.transferAmount ?? 0,
    };
  }
  return months;
}

export const INFRASTRUCTURE_SAMPLE: InfrastructureResearchSampleItem[] = [
  {
    budgetProject: '华东激光装备产业园一期厂房',
    department: '采购与供应链管理部',
    entity: '草莓慕斯公司',
    infraType: '土建',
    supplier: '博视激光核心部件供应商',
    openingAmount: 800,
    months: infraMonths({
      3: { acceptanceAmount: 400 },
      6: { acceptanceAmount: 500 },
      9: { acceptanceAmount: 400 },
      4: { paymentAmount: 300 },
      7: { paymentAmount: 400 },
      10: { paymentAmount: 400 },
      12: { paymentAmount: 200, transferAmount: 1300 },
    }),
    totalAcceptanceAmount: 1300,
    totalPaymentAmount: 1300,
    totalTransferAmount: 1300,
    notes: '一期厂房主体结构施工，预计年底竣工验收转固',
  },
  {
    budgetProject: '整机出厂检测与样件实验室改造',
    department: '制造工程部',
    entity: '甜甜圈集团公司',
    infraType: '装修',
    supplier: '用友网络信息技术股份有限公司',
    openingAmount: 0,
    months: infraMonths({
      4: { acceptanceAmount: 200 },
      7: { acceptanceAmount: 200 },
      5: { paymentAmount: 200 },
      8: { paymentAmount: 200 },
      9: { transferAmount: 400 },
    }),
    totalAcceptanceAmount: 400,
    totalPaymentAmount: 400,
    totalTransferAmount: 400,
    notes: '实验室装修改造，三季度末转固',
  },
  {
    budgetProject: '切割头装配车间基建',
    department: '信息技术部',
    entity: '芒果班戟公司',
    infraType: '土建',
    supplier: '博视激光核心部件供应商',
    openingAmount: 150,
    months: infraMonths({
      6: { acceptanceAmount: 250 },
      10: { acceptanceAmount: 250 },
      7: { paymentAmount: 200 },
      11: { paymentAmount: 300 },
    }),
    totalAcceptanceAmount: 500,
    totalPaymentAmount: 500,
    totalTransferAmount: 0,
    notes: '切割头装配车间土建，跨年实施，本年度不转固',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BB.4.3 其他固定资产新增表 示例数据
// 对应函数：buildOtherFixedAssetAdditionSheet(items: OtherFixedAssetAdditionItem[])
// 维度=预算项目/法人公司/预算部门/资产描述/资产类别/说明；度量=资产原值 + 预付款 + 付款（各含全年合计 + 1~12月每月三列）
// 语义：资产原值=资产增加（按取得时点确认）；预付款=先付的预付部分、付款=验收/尾款等实际付款（二者均属现金流出，合计驱动 CF-14）
// ─────────────────────────────────────────────────────────────────────────────

// 12 个月新增原值：默认全 0，仅覆盖非零月份
function assetAdditionMonths(overrides: Record<number, number> = {}): Record<string, number> {
  const months: Record<string, number> = {};
  for (let m = 1; m <= 12; m++) months[`m${m}`] = overrides[m] ?? 0;
  return months;
}

export const OTHER_FIXED_ASSET_SAMPLE: OtherFixedAssetAdditionItem[] = [
  {
    budgetProject: '激光装备产线扩能项目',
    legalEntity: '草莓慕斯公司',
    budgetDepartment: '制造工程部',
    assetDesc: '激光切割头装配测试台架（高功率切割头组件装配与联调用）',
    assetCategory: '固定资产-生产机器设备',
    notes: '新增激光切割头装配测试台架',
    months: assetAdditionMonths({ 4: 60, 8: 90 }),
    annualOriginalValue: 150,
    // 预付款与验收付款分开：先付部分（m3/m7）+ 验收付款余款（m4/m8）= 原值
    monthlyPrepayment: assetAdditionMonths({ 3: 30, 7: 45 }),
    annualPrepayment: 75,
    monthlyPayment: assetAdditionMonths({ 4: 30, 8: 45 }),
    annualPayment: 75,
  },
  {
    budgetProject: '研发楼建设配套项目',
    legalEntity: '甜甜圈集团公司',
    budgetDepartment: '综合管理部',
    assetDesc: '研发楼办公设备（研发工作站与办公终端）',
    assetCategory: '固定资产-电子与办公设备',
    notes: '研发楼办公设备集中采购',
    months: assetAdditionMonths({ 2: 25, 6: 25 }),
    annualOriginalValue: 50,
    // 预付款与验收付款分开：先付部分（m1/m5）+ 验收付款余款（m2/m6）= 原值
    monthlyPrepayment: assetAdditionMonths({ 1: 10, 5: 10 }),
    annualPrepayment: 20,
    monthlyPayment: assetAdditionMonths({ 2: 15, 6: 15 }),
    annualPayment: 30,
  },
  {
    budgetProject: '智能套料软件研发项目',
    legalEntity: '芒果班戟公司',
    budgetDepartment: '研发中心',
    assetDesc: '智能套料软件著作权（工业软件）',
    assetCategory: '无形资产-软件著作权/工业软件',
    notes: '智能套料软件著作权授权',
    months: assetAdditionMonths({ 9: 80 }),
    annualOriginalValue: 80,
    // 预付款（m8，取得前）与验收付款（m9，取得月）= 原值；软件著作权无 m10~m12 付款
    monthlyPrepayment: assetAdditionMonths({ 8: 20 }),
    annualPrepayment: 20,
    monthlyPayment: assetAdditionMonths({ 9: 60 }),
    annualPayment: 60,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BB.4.6 资产处置预算表 示例数据
// 对应函数：buildAssetDisposalSheet(items: AssetDisposalItem[])
// 维度=法人公司/预算部门/资产类别/资产描述/处置方式；度量=原值/累计折旧/净值/收款(不含税)/收款(含税)/损益
// 两类处置方式各给一行（对外出售、报废变卖），金额填在处置月份列，仅用于把业务逻辑讲清楚
function disposalMonths(overrides: Record<number, Record<string, number>> = {}): Record<string, any> {
  const months: Record<string, any> = {};
  for (let m = 1; m <= 12; m++) months[`m${m}`] = overrides[m] ?? {};
  return months;
}

export const ASSET_DISPOSAL_SAMPLE: AssetDisposalItem[] = [
  {
    legalEntity: '草莓慕斯公司',
    budgetDepartment: '制造工程部',
    category: '固定资产-生产机器设备',
    assetDesc: '高功率激光切割头测试台架（已使用 4 年，对外转让给第三方设备商）',
    disposalType: '对外出售',
    months: disposalMonths({ 6: { originalValue: 120.0, accumulatedDep: 40.0, disposalRevenueExTax: 95.0, disposalRevenueIncTax: 107.35 } }),
  },
  {
    legalEntity: '樱桃华夫公司',
    budgetDepartment: '检测中心',
    category: '固定资产-电子与办公设备',
    assetDesc: '检测终端 12 台（到期报废，残值变卖给回收商）',
    disposalType: '报废变卖',
    months: disposalMonths({ 11: { originalValue: 30.0, accumulatedDep: 27.6, disposalRevenueExTax: 0.6, disposalRevenueIncTax: 0.6 } }),
  },
];
