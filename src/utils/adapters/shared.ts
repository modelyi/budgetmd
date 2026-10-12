import {
  BudgetItem,
  StockOrderItem,
  HardSoftSalesRevenueItem,
  ServiceRevenueItem,
  FixedAssetProcurementItem,
  OpexBudgetItem,
  IntercompanyMarkupRateItem,
  IntercompanyProcurementBudgetItem,
  IntercompanySalesBudgetItem,
  IntercompanyLeasingBudgetItem,
  IntercompanyAssetTransferBudgetItem,
  BudgetAssumptionItem,
  BudgetPremiseItem,
  EmployeeExpenseBudgetItem,
  ProductStandardCostItem,
  HourlyStandardCostItem,
  MaterialStandardCostItem,
  FinancialInstrumentInvestmentItem,
  NonBankFinancialInstrumentItem,
  MaterialEquipmentProcurementItem,
  BudgetProductMasterItem,
  ProductionPlanItem,
  InventoryBudgetItem,
  SubjectBalanceRow,
  BudgetLedgerEntry,
  LegalEntity,
  MasterContract,
  CreditBudgetItem,
  OfficeLeaseAreaItem,
  FinancingBudgetDetailItem,
  FinancingSummaryProductRow,
  InternalBorrowingItem,
  InternalBorrowingMonthlyDetail,
  ManagementUnit,
  IncomeStatementItem,
  BalanceSheetItem,
  CashFlowStatementItem,
  FinancialStatementsCheckResult,
  SelfBuiltCipBudgetItem,
  SelfBuiltCipTransferItem,
  InfrastructureTransferItem,
  ServiceLaborDetailItem,
  ServiceMaterialDetailItem,
  MonthlyServiceDetail,
  HROrganizationItem,
  BudgetProjectMasterItem
} from '../../types';
import { CONTRACT_NATURE_DICT } from '../../data/contractNatureDict';
import { PRODUCT_CATEGORY_DICT } from '../../data/productCategoryDict';
import { REVENUE_METHOD_DICT } from '../../data/revenueMethodDict';
import { SASAC_INDUSTRY_DICT } from '../../data/sasacIndustryDict';
import { BUDGET_FORM_REGISTRY, BUDGET_FIELD_REGISTRY, getBudgetFields, getFormByCode } from '../../data/budgetFormRegistry';
import { SIGNING_ENTITIES, CUSTOMERS, CUSTOMER_TYPE_MAPPING, DEFAULT_PRODUCT_COST_RATES, FINANCING_SUMMARY_PRODUCTS, SUPPLIER_MASTER_DATA, MASTER_CONTRACTS, HR_ORGANIZATION_DATA, LEGAL_ENTITIES } from '../../mockData';
import type { SupplierMasterItem } from '../../mockData';
import { MANAGEMENT_UNITS } from '../../data/managementUnitData';
import { ENABLED_BUDGET_PRODUCTS } from '../../data/budgetProductMasterData';
import { BUDGET_PROJECT_MASTER_DATA, isSalesProject } from '../../data/budgetProjectData';
import { ENABLED_CUSTOMER_TYPES } from '../../data/customerTypeDict';
import { MATERIAL_MASTER_MAP } from '../../data/materialMasterData';
import { MATERIAL_QUALITY_DICT } from '../../data/materialQualityDict';
import { SALES_CONTRACT_NATURE_OPTIONS } from '../salesContractBudgetRules';
import type { MaterialMasterItem } from '../../data/materialMasterData';
import { UnifiedBudgetAccountItem, BudgetAccountCodingRule, UNIFIED_BUDGET_ACCOUNTS, BUDGET_ACCOUNT_CODING_RULES } from '../../data/unifiedBudgetChartOfAccounts';
import { ExpenseBudgetSubjectItem, FIXED_EXPENSE_BUDGET_SUBJECTS } from '../../data/expenseBudgetSubjectsData';
import { ASSET_CATEGORY_LIST } from '../../data/assetCategoryData';

// 销售、采购预算统一使用行政部门主数据的一级部门
export const ADMIN_LEVEL1_DEPARTMENT_OPTIONS = HR_ORGANIZATION_DATA
  .filter((item) => item.fullName.split('-').length === 2)
  .map((item) => item.name)
  .filter((name, index, names) => names.indexOf(name) === index)
  .join(',');

// 预算编制到二级部门的表（如 BB.3.2 基建）使用二级部门选项
export const ADMIN_LEVEL2_DEPARTMENT_OPTIONS = HR_ORGANIZATION_DATA
  .filter((item) => item.type === '普通')
  .map((item) => item.name)
  .filter((name, index, names) => names.indexOf(name) === index)
  .join(',');

/** Read a monthly scalar without assuming the monthly object exists. */

export const SPREADSHEET_STYLES = {
  // ══════════════════════════════════════════════════════
  // 全局统一皇室深海蓝表头系列（UI设计规范）
  // 严格对照参考图：
  //   - 主色 #002f6c（皇室深海蓝）
  //   - 全年合计/重点色 #001e4a（深海军蓝）
  //   - 四边细线边框 #4a7bb0
  //   - ht:1=居中，vt:1=垂直居中，b:1=加粗，fc:#ffffff，tb:2=自动换行
  // ══════════════════════════════════════════════════════

  // 一级大表头：深海蓝底 + 白字 + 浅蓝边框
  deepBlueHeader: {
    bg: '#002f6c',
    fc: '#ffffff',
    ht: 1,
    vt: 1,
    tb: 2,
    b: 1,
    fs: 10,
    bd: {
      l: { style: 1, color: '#4a7bb0' },
      r: { style: 1, color: '#4a7bb0' },
      t: { style: 1, color: '#4a7bb0' },
      b: { style: 1, color: '#4a7bb0' }
    }
  },

  // 二级小表头：深海蓝底 + 白字 + 浅蓝边框
  deepBlueSubHeader: {
    bg: '#002f6c',
    fc: '#ffffff',
    ht: 1,
    vt: 1,
    tb: 2,
    b: 1,
    fs: 9,
    bd: {
      l: { style: 1, color: '#4a7bb0' },
      r: { style: 1, color: '#4a7bb0' },
      t: { style: 1, color: '#4a7bb0' },
      b: { style: 1, color: '#4a7bb0' }
    }
  },

  // 全年合计列头：深海军蓝底 + 纯白粗字 + 浅蓝边框
  deepBlueSumHeader: {
    bg: '#001e4a',
    fc: '#ffffff',
    ht: 1,
    vt: 1,
    tb: 2,
    b: 1,
    fs: 10,
    bd: {
      l: { style: 1, color: '#4a7bb0' },
      r: { style: 1, color: '#4a7bb0' },
      t: { style: 1, color: '#4a7bb0' },
      b: { style: 1, color: '#4a7bb0' }
    }
  },

  // 全年合计列二级小表头
  deepBlueSumSubHeader: {
    bg: '#001e4a',
    fc: '#ffffff',
    ht: 1,
    vt: 1,
    tb: 2,
    b: 1,
    fs: 9,
    bd: {
      l: { style: 1, color: '#4a7bb0' },
      r: { style: 1, color: '#4a7bb0' },
      t: { style: 1, color: '#4a7bb0' },
      b: { style: 1, color: '#4a7bb0' }
    }
  },

  // ── BO 三表列性质色规范（只读列 vs 可修改列）──────────────────────
  // 规范见「需求设计约定 → 二、数据列规范」：
  //   只读列（系统带出/公式计算）＝冷灰蓝；可修改列（手工录入/手工导入/默认值可覆盖）＝暖琥珀。
  // 仅用于 BO.PL / BO.BS / BO.CF 三张结果表的度量列；维度列与时间分组列仍用深海蓝主色。
  readOnlyHeader: {
    bg: '#475569',
    fc: '#ffffff',
    ht: 1,
    vt: 1,
    tb: 2,
    b: 1,
    fs: 10,
    bd: {
      l: { style: 1, color: '#94a3b8' },
      r: { style: 1, color: '#94a3b8' },
      t: { style: 1, color: '#94a3b8' },
      b: { style: 1, color: '#94a3b8' }
    }
  },

  readOnlySubHeader: {
    bg: '#475569',
    fc: '#ffffff',
    ht: 1,
    vt: 1,
    tb: 2,
    b: 1,
    fs: 9,
    bd: {
      l: { style: 1, color: '#94a3b8' },
      r: { style: 1, color: '#94a3b8' },
      t: { style: 1, color: '#94a3b8' },
      b: { style: 1, color: '#94a3b8' }
    }
  },

  editableHeader: {
    bg: '#b45309',
    fc: '#ffffff',
    ht: 1,
    vt: 1,
    tb: 2,
    b: 1,
    fs: 10,
    bd: {
      l: { style: 1, color: '#e8b57a' },
      r: { style: 1, color: '#e8b57a' },
      t: { style: 1, color: '#e8b57a' },
      b: { style: 1, color: '#e8b57a' }
    }
  },

  editableSubHeader: {
    bg: '#b45309',
    fc: '#ffffff',
    ht: 1,
    vt: 1,
    tb: 2,
    b: 1,
    fs: 9,
    bd: {
      l: { style: 1, color: '#e8b57a' },
      r: { style: 1, color: '#e8b57a' },
      t: { style: 1, color: '#e8b57a' },
      b: { style: 1, color: '#e8b57a' }
    }
  },

  // 默认表头：统一为皇室深海蓝
  header: {
    bg: '#002f6c',
    fc: '#ffffff',
    ht: 1,
    vt: 1,
    tb: 2,
    b: 1,
    fs: 10,
    bd: {
      l: { style: 1, color: '#4a7bb0' },
      r: { style: 1, color: '#4a7bb0' },
      t: { style: 1, color: '#4a7bb0' },
      b: { style: 1, color: '#4a7bb0' }
    }
  },
  // 重点/汇总表头：深海军蓝
  accentHeader: {
    bg: '#001e4a',
    fc: '#ffffff',
    ht: 1,
    vt: 1,
    tb: 2,
    b: 1,
    fs: 10,
    bd: {
      l: { style: 1, color: '#4a7bb0' },
      r: { style: 1, color: '#4a7bb0' },
      t: { style: 1, color: '#4a7bb0' },
      b: { style: 1, color: '#4a7bb0' }
    }
  },
  emeraldHeader: {
    bg: '#001e4a',
    fc: '#ffffff',
    ht: 1,
    vt: 1,
    tb: 2,
    b: 1,
    fs: 10,
    bd: {
      l: { style: 1, color: '#4a7bb0' },
      r: { style: 1, color: '#4a7bb0' },
      t: { style: 1, color: '#4a7bb0' },
      b: { style: 1, color: '#4a7bb0' }
    }
  },
  indigoHeader: {
    bg: '#002f6c',
    fc: '#ffffff',
    ht: 1,
    vt: 1,
    tb: 2,
    b: 1,
    fs: 10,
    bd: {
      l: { style: 1, color: '#4a7bb0' },
      r: { style: 1, color: '#4a7bb0' },
      t: { style: 1, color: '#4a7bb0' },
      b: { style: 1, color: '#4a7bb0' }
    }
  },
  amberHeader: {
    bg: '#001e4a',
    fc: '#ffffff',
    ht: 1,
    vt: 1,
    tb: 2,
    b: 1,
    fs: 10,
    bd: {
      l: { style: 1, color: '#4a7bb0' },
      r: { style: 1, color: '#4a7bb0' },
      t: { style: 1, color: '#4a7bb0' },
      b: { style: 1, color: '#4a7bb0' }
    }
  },
  titleBanner: {
    bg: '#0f172a',
    fc: '#38bdf8',
    ht: 0, // left
    vt: 1,
    b: 1,
    fs: 12
  },
  summaryRow: {
    bg: '#f8fafc',
    fc: '#0f172a',
    ht: 1,
    vt: 1,
    b: 1,
    fs: 10
  },
  numCell: {
    ht: 2, // right
    vt: 1,
    ct: { fa: '¥#,##0.00', t: 'n' }
  },
  qtyCell: {
    ht: 2,
    vt: 1,
    ct: { fa: '#,##0', t: 'n' }
  },
  textCell: {
    ht: 1,
    vt: 1,
    ct: { fa: 'General', t: 'g' }
  }
};

export const colLetter = (col: number): string => {
  let temp = '';
  let c = col;
  while (c >= 0) {
    temp = String.fromCharCode((c % 26) + 65) + temp;
    c = Math.floor(c / 26) - 1;
  }
  return temp;
};

export const TAX_RATE_ASSUMPTIONS: BudgetAssumptionItem[] = [
  { id: 'tax-rate-it', seq: 1, category: '财税与优惠政策', paramCode: 'ASS-TAX-01', paramName: '高新技术企业所得税优惠税率', paramUnit: '%', baseValueCurrentYear: 15.0, budgetYearValue: 15.0, forecastYearPlus1: 15.0, forecastYearPlus2: 15.0, applicableEntity: '甜甜圈集团公司, 草莓慕斯公司, 蓝莓布丁公司', sourceBasis: '《中华人民共和国企业所得税法》第二十八条', sensitivityLevel: '高', status: '已审定', remarks: 'BF.4 企业所得税预缴计提比例取数来源' },
  { id: 'tax-rate-rd', seq: 2, category: '财税与优惠政策', paramCode: 'ASS-TAX-02', paramName: '研发费用企业所得税税前加计扣除比例', paramUnit: '%', baseValueCurrentYear: 100.0, budgetYearValue: 100.0, forecastYearPlus1: 100.0, forecastYearPlus2: 100.0, applicableEntity: '全集团具备研发资质主体', sourceBasis: '财政部 税务总局 科技部2023年第7号公告', sensitivityLevel: '高', status: '已审定', remarks: '所得税纳税调减与研发投入收益测算' },
  { id: 'tax-rate-umct', seq: 3, category: '财税与优惠政策', paramCode: 'ASS-TAX-03', paramName: '城市维护建设税税率 (市区主体)', paramUnit: '%', baseValueCurrentYear: 7.0, budgetYearValue: 7.0, forecastYearPlus1: 7.0, forecastYearPlus2: 7.0, applicableEntity: '甜甜圈集团公司, 草莓慕斯公司, 蓝莓布丁公司 (市区主体)', sourceBasis: '《中华人民共和国城市维护建设税法》第二条 (市区税率7%)', sensitivityLevel: '高', status: '已审定', remarks: '以实缴增值税为计税依据，BF.4城建税计提比例取数来源(ASS-TAX-03)' },
  { id: 'tax-rate-edu', seq: 4, category: '财税与优惠政策', paramCode: 'ASS-TAX-04', paramName: '教育费附加征收比率', paramUnit: '%', baseValueCurrentYear: 3.0, budgetYearValue: 3.0, forecastYearPlus1: 3.0, forecastYearPlus2: 3.0, applicableEntity: '全集团纳税主体统一', sourceBasis: '国务院《征收教育费附加的暂行规定》', sensitivityLevel: '高', status: '已审定', remarks: '以实缴增值税为计费依据，BF.4教育费附加计提比例取数来源(ASS-TAX-04)' },
  { id: 'tax-rate-local-edu', seq: 5, category: '财税与优惠政策', paramCode: 'ASS-TAX-05', paramName: '地方教育附加征收比率', paramUnit: '%', baseValueCurrentYear: 2.0, budgetYearValue: 2.0, forecastYearPlus1: 2.0, forecastYearPlus2: 2.0, applicableEntity: '全集团纳税主体统一', sourceBasis: '财政部财综〔2010〕98号', sensitivityLevel: '高', status: '已审定', remarks: '以实缴增值税为计费依据，与教育费附加(ASS-TAX-04)合计5%驱动BF.4' },
  { id: 'tax-rate-vat', seq: 6, category: '财税与优惠政策', paramCode: 'ASS-TAX-07', paramName: '增值税法定标准税率 (整机装备制造与备件销售)', paramUnit: '%', baseValueCurrentYear: 13.0, budgetYearValue: 13.0, forecastYearPlus1: 13.0, forecastYearPlus2: 13.0, applicableEntity: '全集团销售与采购主体统一', sourceBasis: '《中华人民共和国增值税法》标准税率13%', sensitivityLevel: '高', status: '已审定', remarks: '增值税为价外税，各业务编制表按不含税口径，BF.4增值税实缴由人工填列' },
  { id: 'tax-rate-vat-soft', seq: 7, category: '财税与优惠政策', paramCode: 'ASS-TAX-08', paramName: '软件产品增值税超税负即征即退政策比率', paramUnit: '%', baseValueCurrentYear: 3.0, budgetYearValue: 3.0, forecastYearPlus1: 3.0, forecastYearPlus2: 3.0, applicableEntity: '具备软件产品登记主体', sourceBasis: '财税〔2011〕100号 实际税负超3%部分即征即退', sensitivityLevel: '中', status: '已审定', remarks: 'BF.4"其中:增值税退税"行取值依据' },
  { id: 'tax-rate-vat-service', seq: 8, category: '财税与优惠政策', paramCode: 'ASS-TAX-09', paramName: '现代服务/技术服务增值税率', paramUnit: '%', baseValueCurrentYear: 6.0, budgetYearValue: 6.0, forecastYearPlus1: 6.0, forecastYearPlus2: 6.0, applicableEntity: '全集团销售与采购主体统一', sourceBasis: '《中华人民共和国增值税法》现代服务业税率6%', sensitivityLevel: '高', status: '已审定', remarks: 'BF.4.b增值税计提预算表技术服务销项、费用类可抵扣进项税率取数来源(ASS-TAX-09)' },
  { id: 'tax-rate-vat-construction', seq: 9, category: '财税与优惠政策', paramCode: 'ASS-TAX-10', paramName: '建筑服务增值税率', paramUnit: '%', baseValueCurrentYear: 9.0, budgetYearValue: 9.0, forecastYearPlus1: 9.0, forecastYearPlus2: 9.0, applicableEntity: '全集团销售与采购主体统一', sourceBasis: '《中华人民共和国增值税法》建筑服务税率9%', sensitivityLevel: '高', status: '已审定', remarks: 'BF.4.b增值税计提预算表基建工程采购进项税率取数来源(ASS-TAX-10)' },
];

export interface DeptAttributeMappingItem {
  department: string; // 部门（二级/三级）
  expenseNature: '销售费用' | '管理费用' | '研发费用' | '直接制造费用' | '间接制造费用';
  notes?: string;
}

export interface OtherFixedAssetAdditionItem {
  budgetProject?: string;    // 预算项目 (AA.6 预算项目主数据)
  legalEntity: string;       // 法人 (AA.2 法人组织架构)
  budgetDepartment?: string; // 预算部门 (AA.5 行政部门主数据字典，默认二级部门)
  assetDesc?: string;        // 资产描述（文本，仅人眼识别资产，不参与任何测算与分录）
  assetCategory: string;  // 资产类别 (AA.9 资产类别与折旧)
  notes?: string;         // 说明
  annualOriginalValue?: number; // 资产原值全年合计 (万元, 公式=SUM(1~12月))
  months?: { [key: string]: number }; // m1~m12 各月新增原值 (万元, 手工填报)
  annualPayment?: number; // 付款额全年合计 (万元, 公式=SUM(1~12月付款额))
  monthlyPayment?: { [key: string]: number }; // m1~m12 各月付款额 (万元, 手工填报)；验收/尾款等实际付款金额，付款列只驱动 CF-14，不参与原值确认
  annualPrepayment?: number; // 预付款额全年合计 (万元, 公式=SUM(1~12月预付款额))
  monthlyPrepayment?: { [key: string]: number }; // m1~m12 各月预付款额 (万元, 手工填报)；预付款金额（万元）；与付款分开填报，二者合计形成 CF-14 现金流出
}

export interface AssetDisposalItem {
  legalEntity: string;        // 法人公司 (AA.2)：处置主体（资产卡片所在法人）
  budgetDepartment?: string;  // 预算部门 (AA.5，默认二级部门)：资产原领用部门
  category: string;           // 资产类别 (AA.9)：层级写法「大类-小类」，如「固定资产-生产机器设备」
  assetDesc?: string;         // 资产描述（文本，仅人眼识别资产，不参与测算与分录）
  disposalType: string;       // 处置方式：对外出售 / 报废变卖
  months?: {                  // m1~m12：金额填在处置月份列
    [key: string]: {
      originalValue?: number;          // 处置资产原值 (万元)
      accumulatedDep?: number;         // 处置资产累计折旧 (万元)
      disposalRevenueExTax?: number;   // 处置收款-不含税 (万元)，处置损益测算基数
      disposalRevenueIncTax?: number;  // 处置收款-含税 (万元)，驱动 BO.CF CF-13.1
    };
  };
}

export interface ExistingAssetLedgerItem {
  source: string;             // 来源 (接口导入/手工补录)
  budgetProject?: string;     // 预算项目（AA.6）——存量资产折旧计算表维度
  assetDesc?: string;         // 资产描述（非必输，文本字段仅用于人眼识别资产（如设备名称/规格/用途），不参与任何测算与分录）
  assetCategory: string;      // 资产类别 (AA.9 资产类别与折旧)
  managementUnit: string;    // 管理单元 (AA.8；管理单元直接关联资产账簿)
  legalEntity?: string;      // 法人公司（由管理单元经 AA.8 映射带出，系统带出、不手工填）
  assetBook: string;          // 资产账簿 (AB.10 资产账簿字典: 财务账簿/税账簿)
  department: string;         // 资产领用部门 (AA.5)
  originalValue: number;      // 原值 (万元, 手工登记)
  accumulatedDepreciation: number; // 累计折旧 (万元, 手工登记, 截至预算期初)
  activationDate: string;     // 启用日期 (手工登记)
  expenseAttribution: string;   // 费用归属 (根据资产领用部门属性带出)
  monthlyDepreciation?: Record<string, number>; // 1~12月每月计提额 (m1...m12, 万元)
}

export interface BudgetYearItemForSheet {
  year: number;
  name: string;
  type: string;
  isCurrent: boolean;
  status: string;
  currency: string;
  submissionDeadline: string;
  description: string;
}

export interface BudgetPeriodItemForSheet {
  id: string;
  year: number;
  periodNum: number;
  periodName: string;
  quarter: string;
  startDate: string;
  endDate: string;
  status: string;
  submissionDeadline: string;
  freezeDate: string;
  remarks: string;
}

export interface OfficeLeaseSiteMasterItem {
  code: string;
  name: string;
  address?: string;
  lessor?: string;      // 业主方(出租方)
  totalArea?: number;   // 总面积 (㎡)
  status?: '启用' | '停用';
  lessorType?: '内部持有' | '外部租入'; // 出租方类型：内部持有=集团内物业持有法人出租给内部法人（BB.4.2.b 内部职场租赁）；外部租入=向集团外第三方租入（BB.4.2.a 外部职场租赁）
  lessorName?: string;  // 出租方名称：外部租入时填写外部第三方出租方名称；内部持有时填写集团内物业持有法人
}

// BAA.6.e 租赁折现率维护：维度=年度 / 折现率(%) / 备注
export interface OfficeLeaseDiscountRateItem {
  id?: string;
  year?: string;           // 年度（缺省取 build 参数带入的预算年度）
  discountRate: number;    // 折现率 (%)，保留 2 位小数
  notes?: string;
}

// BB.4.2.a 外部职场租赁：一行一笔对外（集团外第三方）职场租赁合同
// 租金算法同 BB.4.2.b 内部职场租赁（单价 × 面积 ÷ 10000 × 当月在租期内），但租赁面积与合同单价按对外租赁合同
// 在本表直接手工录入、不引用 BAA.6.b 年度租赁面积维护（该表仅供内部职场租赁 BB.4.2.b；外部租赁不做场所面积按法人分摊），
// 且无加成款、无内部往来、不参与集团合并抵销。
// 注意：本接口不设「租赁类型」入参——该列由「租赁期限」（租期）系统带出、派生展示、不可手工录，
// 资本化判定唯一来源＝租期（>12 个月→资本化、≤12 个月→费用化），不允许与租期矛盾的档位。
export interface ExternalOfficeLeaseItem {
  location: string;              // 场所（BAA.6.a 场所名称）
  lessorName: string;            // 出租方(外部第三方)（第三方名称，手工）
  lesseeEntity: string;          // 承租方（法人，AA.2）
  budgetProject: string;         // 预算项目（AA.6）
  budgetDepartment: string;      // 预算部门（AA.5，默认二级）
  leaseStartMonth: string;       // 租赁期起始月（YYYY-MM）
  leaseEndMonth: string;         // 租赁期终止月（YYYY-MM）
  leaseArea: number;             // 租赁面积(㎡)（按对外租赁合同本表手工录入，不引用 BAA.6.b）
  unitPrice: number;             // 单价(元/㎡·月)（按对外租赁合同本表手工录入的合同单价，不引用 BAA.6.b）
  discountRatePct?: number;      // 折现率(%)，默认取 BAA.6.e / BF.3 综合融资成本
}

// BB.4.2.a.1 外部职场租赁·财务视角：仅资本化合同一行（整体租期 > 12 个月），体例同 BB.4.2.b.1
export interface ExternalLeaseCapitalizationItem {
  budgetProject: string;         // 预算项目
  lesseeEntity: string;          // 法人公司(承租方)
  budgetDepartment: string;      // 预算部门
  location: string;              // 场所
  leaseStartMonth: string;       // 租赁期起始月
  leaseEndMonth: string;         // 租赁期终止月
  remainingMonths: number;       // 剩余租赁月数
  annualLeasePayment: number;    // 年度租赁付款额(不含税)(万元)（= BB.4.2.a 该合同月租金【全年合计】）
  discountRatePct: number;       // 折现率(%)，默认取 BAA.6.e / BF.3 综合融资成本
}

/** Read a monthly scalar without assuming the monthly object exists. */
export function safeMonthlyValue(monthly: unknown, month: number): number {
  if (!monthly || typeof monthly !== 'object') return 0;
  const value = (monthly as Record<string, unknown>)[`m${month}`];
  return typeof value === 'number' && Number.isFinite(value) ? value : Number(value) || 0;
}

// Re-export all imported symbols so domain files import from a single barrel
export type {
  BudgetItem,
  StockOrderItem,
  HardSoftSalesRevenueItem,
  ServiceRevenueItem,
  FixedAssetProcurementItem,
  OpexBudgetItem,
  IntercompanyMarkupRateItem,
  IntercompanyProcurementBudgetItem,
  IntercompanySalesBudgetItem,
  IntercompanyLeasingBudgetItem,
  IntercompanyAssetTransferBudgetItem,
  BudgetAssumptionItem,
  BudgetPremiseItem,
  EmployeeExpenseBudgetItem,
  ProductStandardCostItem,
  HourlyStandardCostItem,
  MaterialStandardCostItem,
  FinancialInstrumentInvestmentItem,
  NonBankFinancialInstrumentItem,
  MaterialEquipmentProcurementItem,
  BudgetProductMasterItem,
  ProductionPlanItem,
  InventoryBudgetItem,
  SubjectBalanceRow,
  BudgetLedgerEntry,
  LegalEntity,
  MasterContract,
  CreditBudgetItem,
  OfficeLeaseAreaItem,
  FinancingBudgetDetailItem,
  FinancingSummaryProductRow,
  InternalBorrowingItem,
  InternalBorrowingMonthlyDetail,
  ManagementUnit,
  IncomeStatementItem,
  BalanceSheetItem,
  CashFlowStatementItem,
  FinancialStatementsCheckResult,
  SelfBuiltCipBudgetItem,
  SelfBuiltCipTransferItem,
  InfrastructureTransferItem,
  ServiceLaborDetailItem,
  ServiceMaterialDetailItem,
  MonthlyServiceDetail,
  HROrganizationItem,
  BudgetProjectMasterItem,
  SupplierMasterItem,
  MaterialMasterItem,
  UnifiedBudgetAccountItem,
  BudgetAccountCodingRule,
  ExpenseBudgetSubjectItem
};

export {
  CONTRACT_NATURE_DICT,
  PRODUCT_CATEGORY_DICT,
  REVENUE_METHOD_DICT,
  SASAC_INDUSTRY_DICT,
  BUDGET_FORM_REGISTRY,
  BUDGET_FIELD_REGISTRY,
  getBudgetFields,
  getFormByCode,
  SIGNING_ENTITIES,
  CUSTOMERS,
  CUSTOMER_TYPE_MAPPING,
  DEFAULT_PRODUCT_COST_RATES,
  FINANCING_SUMMARY_PRODUCTS,
  SUPPLIER_MASTER_DATA,
  MASTER_CONTRACTS,
  HR_ORGANIZATION_DATA,
  LEGAL_ENTITIES,
  MANAGEMENT_UNITS,
  ENABLED_BUDGET_PRODUCTS,
  BUDGET_PROJECT_MASTER_DATA,
  isSalesProject,
  ENABLED_CUSTOMER_TYPES,
  MATERIAL_MASTER_MAP,
  MATERIAL_QUALITY_DICT,
  SALES_CONTRACT_NATURE_OPTIONS,
  UNIFIED_BUDGET_ACCOUNTS,
  BUDGET_ACCOUNT_CODING_RULES,
  FIXED_EXPENSE_BUDGET_SUBJECTS,
  ASSET_CATEGORY_LIST
};
