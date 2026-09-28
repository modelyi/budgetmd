// -----------------------------------------------------------------------------
// 预算调研页 BA 系列假设表 + BAP.3 脱敏示例数据
// -----------------------------------------------------------------------------
// 用途：为 src/utils/adapters 下各 build*Sheet 函数提供 2~3 行虚构示例数据，
//       使调研页表样除表头外还能展示示例行（金额/比例仅为示意，不要求勾稽）。
// 说明：本文件只导出示例数组，不修改生成脚本 scripts/generateResearchMarkdownContent.ts，
//       由主会话统一接入对应 build*Sheet 函数。
// -----------------------------------------------------------------------------

import type {
  HourlyStandardCostItem,
  MaterialStandardCostItem,
  OfficeLeaseAreaItem,
  OfficeLeaseSiteMasterItem,
  OfficeLeaseDiscountRateItem,
} from '../utils/adapters/shared';

/** 构造 1~12 月月度节奏对象（万元），数值仅供示意。 */
function monthly(vals: number[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (let i = 0; i < 12; i++) out[`m${i + 1}`] = vals[i] ?? 0;
  return out;
}

// -----------------------------------------------------------------------------
// BAA.3 服务人工标准成本 —— 传入 buildHourlyStandardCostSheet()
// 列：岗位 / 职级 / 费率 (万元/标准工时) / 备注
// -----------------------------------------------------------------------------
export const hourlyStandardCostSamples: HourlyStandardCostItem[] = [
  {
    id: 'hsc-1',
    seq: 1,
    position: '初级工程师',
    rank: 'P1',
    hourlyCost: 0.008,
    remarks: '现场安装调试工时标准成本',
  },
  {
    id: 'hsc-2',
    seq: 2,
    position: '中级工程师',
    rank: 'P2',
    hourlyCost: 0.012,
    remarks: '系统集成与联调工时标准成本',
  },
  {
    id: 'hsc-3',
    seq: 3,
    position: '高级工程师',
    rank: 'P3',
    hourlyCost: 0.018,
    remarks: '架构设计与技术评审工时标准成本',
  },
];

// -----------------------------------------------------------------------------
// BAA.4 服务物料定额标准 —— 传入 buildMaterialStandardCostSheet()
// 列：部件类别 (好件/坏件) / 物料编码 / 物料名称 / 物料类型 / 计量单位 / 标准成本 (万元/标准单位) / 核算说明
// 物料编码取自 AA.11 物料主数据 (MATERIAL_MASTER_MAP)，用于下拉与名称/类型/单位自动带出。
// -----------------------------------------------------------------------------
export const materialStandardCostSamples: MaterialStandardCostItem[] = [
  {
    id: 'msc-1',
    seq: 1,
    partCategory: '好件',
    materialCode: 'MAT-OPT-001',
    materialName: '聚焦镜组',
    materialType: '光学件',
    unit: '套',
    standardCost: 0.8,
    remarks: '整机光学系统耗用',
  },
  {
    id: 'msc-2',
    seq: 2,
    partCategory: '好件',
    materialCode: 'MAT-DRV-005',
    materialName: '伺服驱动组件',
    materialType: '核心部件',
    unit: '台',
    standardCost: 2.5,
    remarks: '伺服进给系统耗用',
  },
  {
    id: 'msc-3',
    seq: 3,
    partCategory: '坏件',
    materialCode: 'MAT-RTN-001',
    materialName: '返修镜组',
    materialType: '返修件',
    unit: '套',
    standardCost: 0.45,
    remarks: '售后返修置换',
  },
];

// -----------------------------------------------------------------------------
// BA.5 费用预算汇总表 —— 传入 buildExpenseBudgetSummaryResearchSheet()
// 列：预算项目 / 预算部门 / 费用科目 / 全年合计(公式) / 1~12月 / 备注说明
// annualTotal 由行内 SUM 公式计算，无需填写。
// -----------------------------------------------------------------------------
export const expenseBudgetSummaryResearchSamples = [
  {
    budgetProject: 'P1 高功率平板光纤激光切割机',
    department: '销售一部',
    expenseSubject: '差旅费',
    months: monthly([2.0, 1.5, 2.5, 1.8, 2.0, 2.2, 1.6, 2.4, 2.1, 1.9, 2.3, 2.0]),
    notes: '销售工程师驻场差旅',
  },
  {
    budgetProject: 'P1 高功率平板光纤激光切割机',
    department: '销售一部',
    expenseSubject: '招待费',
    months: monthly([0.8, 0.6, 1.0, 0.7, 0.9, 0.5, 0.8, 1.1, 0.6, 0.7, 1.0, 0.9]),
    notes: '客户接待与商务宴请',
  },
  {
    budgetProject: '集团统筹',
    department: '研发中心',
    expenseSubject: '广告费',
    months: monthly([1.2, 0.5, 0.5, 0.8, 0.6, 0.5, 0.6, 1.0, 0.8, 0.5, 0.9, 1.5]),
    notes: '行业展会与线上投放',
  },
];

// -----------------------------------------------------------------------------
// BAA.6.a 场所基本信息维护 —— 传入 buildOfficeLeaseSiteMasterSheet()
// 列：场所编码 / 场所名称 / 地址 / 业主方(出租方) / 总面积 (㎡) / 启用状态 / 出租方类型 / 出租方名称
// 口径：出租方类型=内部持有（走 BB.4.2.b 内部职场租赁）/ 外部租入（走 BB.4.2.a 外部职场租赁）；
//      出租方名称=外部租入时填外部第三方名称，内部持有时填集团内物业持有法人。
// -----------------------------------------------------------------------------
export const officeLeaseSiteMasterSamples: OfficeLeaseSiteMasterItem[] = [
  {
    code: 'SITE-001',
    name: '花果山园区',
    address: '上海市浦东新区花果山路 1888 号',
    lessor: '神盾局物业管理有限公司',
    totalArea: 12000,
    status: '启用',
    lessorType: '内部持有',
    lessorName: '甜甜圈集团公司',
  },
  {
    code: 'SITE-002',
    name: '史塔克大厦',
    address: '上海市浦东新区史塔克工业园博云路 2 号',
    lessor: '瓦坎达置业集团',
    totalArea: 6800,
    status: '启用',
    lessorType: '外部租入',
    lessorName: '瓦坎达置业集团',
  },
  {
    code: 'SITE-003',
    name: '瓦坎达科技园',
    address: '上海市瓦坎达科技园大道 1550 号',
    lessor: '瓦坎达产业区开发有限公司',
    totalArea: 24000,
    status: '停用',
    lessorType: '外部租入',
    lessorName: '瓦坎达产业区开发有限公司',
  },
];

// -----------------------------------------------------------------------------
// BAA.6.b 年度租赁面积维护 —— 传入 buildOfficeLeaseAnnualAreaSheet()
// 列：年度(由参数带入) / 场所选择 / 公司 / 租赁期间(起止) / 租赁面积 (㎡) / 单价(元/㎡·月) / 备注说明
// 「租赁期间(起止)」= 租赁合同的起止日期区间，自由文本；仅人眼识别，不参与判定与测算
// （与 AB.16 租赁期限字典口径无关，避开同名）
// 定位：本表**只**服务内部职场租赁 BB.4.2.b —— 仅登记出租方类型=内部持有的场所面积与单价（内部租赁按法人分摊），
//   单价=市场单价（内部定价基准）、精度 2 位小数；本列是 BB.4.2.b「单价(元/㎡·月)」列的唯一取数来源（系统带出）。
//   外部租入场所不在此维护：BB.4.2.a 外部职场租赁的租赁面积与合同单价按对外租赁合同在本表直接录入。
//   示例 2 行均为出租方类型=内部持有的场所（花果山园区）；外部租入场所（史塔克大厦 / 瓦坎达科技园）
//   在本表无示例行、也不应登记，只在 BB.4.2.a 外部职场租赁的示例里出现。
// -----------------------------------------------------------------------------
export const officeLeaseAnnualAreaSamples: OfficeLeaseAreaItem[] = [
  {
    id: 'ola-1',
    seq: 1,
    location: '花果山园区',
    company: '甜甜圈集团公司',
    leaseTerm: '2027/01/01-2029/12/31',
    leaseArea: 8000,
    unitPrice: 120,
    notes: '集团总部办公与研发；场所出租方类型=内部持有，单价取市场单价',
  },
  {
    id: 'ola-2',
    seq: 2,
    location: '花果山园区',
    company: '草莓慕斯公司',
    leaseTerm: '2027/01/01-2029/12/31',
    leaseArea: 4000,
    unitPrice: 120,
    notes: '整机装配车间；场所出租方类型=内部持有，单价取市场单价',
  },
];

// -----------------------------------------------------------------------------
// BAA.6.e 租赁折现率维护 —— 传入 buildOfficeLeaseDiscountRateSheet()
// 列：年度(由参数带入) / 折现率 (%) / 备注说明
// 口径：默认取 BF.3 综合融资成本；本表可按年度覆盖。
// -----------------------------------------------------------------------------
export const officeLeaseDiscountRateSamples: OfficeLeaseDiscountRateItem[] = [
  {
    id: 'oldr-1',
    year: '2027',
    discountRate: 4.5,
    notes: '默认取 BF.3 综合融资成本（2027 年度 4.50%）；本表可按年度覆盖',
  },
  {
    id: 'oldr-2',
    year: '2028',
    discountRate: 4.75,
    notes: '2028 年度预测折现率（示例行，仅示意按年度维护、逐年覆盖的口径）',
  },
];

// -----------------------------------------------------------------------------
// BAA.8 经营费用转换比例表 —— 传入 buildExpenseConversionRatioSheet()
// 列：预算项目 / 部门 / 费用科目 / 费用性质 / 各法人占比 / 合计(恒为 100%)
// entityRatios 以法人名称为键，填写的比例合计应为 1（合计列由函数固定写 1）。
// -----------------------------------------------------------------------------
export const expenseConversionRatioSamples = [
  {
    budgetProject: 'P1 高功率平板光纤激光切割机',
    department: '销售一部',
    expenseSubject: '差旅费',
    expenseNature: '销售费用',
    entityRatios: { 甜甜圈集团公司: 0.2, 西瓜泡芙公司: 0.5, 草莓慕斯公司: 0.3 },
  },
  {
    budgetProject: 'P1 高功率平板光纤激光切割机',
    department: '研发中心',
    expenseSubject: '广告费',
    expenseNature: '销售费用',
    entityRatios: { 甜甜圈集团公司: 1 },
  },
  {
    budgetProject: '集团统筹',
    department: '制造工程部',
    expenseSubject: '佣金',
    expenseNature: '销售费用',
    entityRatios: { 甜甜圈集团公司: 0.4, 芒果班戟公司: 0.6 },
  },
];

// -----------------------------------------------------------------------------
// BAP.3 物料消耗需求汇总表_研发长期 —— 传入 buildRndMaterialConsumptionSummarySheet()
// 列：预算部门 / 物料编码 / 物料名称 / 全年合计(公式) / 1~12月 / 备注说明
// annualTotal 由行内 SUM 公式计算，无需填写。
// -----------------------------------------------------------------------------
export const rndMaterialConsumptionSummarySamples = [
  {
    department: '研发中心',
    materialCode: 'MAT-OPT-001',
    materialName: '聚焦镜组',
    months: monthly([0.6, 0.4, 0.5, 0.3, 0.4, 0.5, 0.3, 0.6, 0.4, 0.3, 0.5, 0.4]),
    notes: '光学系统样机验证消耗',
  },
  {
    department: '研发中心',
    materialCode: 'MAT-DRV-005',
    materialName: '伺服驱动组件',
    months: monthly([1.0, 0.5, 0.5, 1.0, 0.5, 1.0, 0.5, 1.0, 0.5, 0.5, 1.0, 0.5]),
    notes: '运动控制台架测试',
  },
  {
    department: '制造工程部',
    materialCode: 'MAT-COL-006',
    materialName: '循环机组组件',
    months: monthly([0.8, 0.4, 0.6, 0.4, 0.6, 0.8, 0.4, 0.6, 0.4, 0.6, 0.8, 0.6]),
    notes: '热管理验证平台',
  },
];
