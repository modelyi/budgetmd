// ----------------------------------------------------------------------
// BA. 编制前提与假设 (BAA 预算假设 & BAP 预算前提 & 雇员费用 & 费用汇总)
// ----------------------------------------------------------------------

// BAA. 年度预算编制假设数据模型
export interface BudgetAssumptionItem {
  id: string;
  seq: number;
  category: '宏观经济与市场增长' | '通货膨胀与物价指数' | '资金利率与借贷成本' | '关键外汇汇率' | '财税与优惠政策' | '人力社保公积金基数' | '生产与运营效率';
  paramCode: string;          // 参数编码 (如 ASS-MACRO-01)
  paramName: string;          // 参数名称 (如 烘焙产业复合增长率, USD/CNY 汇率)
  paramUnit: string;          // 单位 (%, 元, 点, 借贷利差)
  baseValueCurrentYear: number; // 2026年基准值 (实际/估计)
  budgetYearValue: number;    // 2027年预算假设值
  forecastYearPlus1: number;  // 2028年预测假设值
  forecastYearPlus2: number;  // 2029年预测假设值
  applicableEntity: string;   // 适用法人组织 (集团统一 / 各主体差异化)
  sourceBasis: string;        // 依据来源 (如: 统计局预测报告, 央行LPR, 财政部文件, 行业白皮书)
  sensitivityLevel: '高' | '中' | '低'; // 敏感性等级
  status: '已审定' | '草案' | '待评估';
  remarks?: string;
}

// BAP. 年度预算编制前提与战略原则数据模型
export interface BudgetPremiseItem {
  id: string;
  seq: number;
  category: '核心经营目标与财务KPI底线' | '组织与核算主体边界' | '预算周期与关键节点' | '刚性预算管控与授权' | '资本性支出审批底线' | '关联交易与税收筹划';
  premiseCode: string;        // 前提编号 (如 PRE-FIN-01)
  premiseTitle: string;       // 前提条款/原则名称 (如 全年签约额底线, 研发费用加计扣除筹划)
  coreMetric?: string;        // 核心指标要求 (如 ≥12.8亿元, ≤58%)
  applicableScope: string;    // 适用范围 (如 全集团, 各子公司, 研发中心)
  responsibleDept: string;    // 主责部门 (如 财务部, 战略企划部, 预算管理委员会)
  controlPrinciple: '刚性红线' | '指导性原则' | '弹性控制' | '前置审批';
  detailedGuidelines: string; // 细化指引与执行要求
  accountingReference: string;// 会计准则/法规依据 (如 CAS 14, CAS 21, 国资委考核办法)
  status: '生效执行' | '待审议' | '归档';
}

// 雇员费用与人力成本编制数据模型 (包含岗位定编、薪酬构成、五险一金测算、福利等)
export interface EmployeeExpenseBudgetItem {
  id: string;
  seq: number;
  legalEntity: string;        // 归属法人公司 (集团公司, A公司, B公司...)
  department: string;         // 归属部门 (如: 产品研发部, 甜品制造部, 糖光业务部, 销售部, 财务部)
  costCenterCode: string;     // 成本中心编码
  positionName: string;       // 岗位名称 (如: 高级糖艺系统架构师, 资深算法专家, 销售总监, 产线测试工程师)
  jobGrade: string;           // 职级体系 (如 P3, P4, P5, P6, M1, M2)
  employeeType: '正式员工' | '关键研发专家' | '实习生' | '顾问外包';
  expenseAccountType: '直接人工(生产成本)' | '研发费用(人员人工)' | '销售费用(人员薪酬)' | '管理费用(管理人员薪酬)';
  
  // 人数编制
  existingHeadcount: number;  // 期初在册人数
  budgetNewHeadcount: number; // 预算新增人数
  onboardMonth: number;       // 预计到岗月份 (1~12月)
  planResignCount: number;    // 预计离职人数
  yearEndHeadcount: number;   // 年末定编人数 (公式: 期初 + 新增 - 离职)
  
  // 薪酬构成 (人均月度基准, 万元/月/人)
  monthlyBaseSalary: number;  // 基本月薪
  monthlyPerformanceBonus: number; // 月度绩效奖金
  annualBonusMonths: number;  // 年终奖发放月数 (如 2.5个月)
  allowanceMonthly: number;   // 每月津贴/餐补/交通补 (万元)
  
  // 五险一金测算费率与公司承担部分 (万元/年)
  socialInsuranceRatePct: number; // 五险综合企业费率% (默认约 26.2%)
  housingFundRatePct: number;     // 住房公积金企业费率% (默认 12%)
  annualSocialInsurancePerCapita: number; // 人均年社会保险公司缴费额 (公式计算)
  annualHousingFundPerCapita: number;     // 人均年公积金公司缴费额 (公式计算)
  
  // 其他间接雇员费用 (人均年, 万元)
  trainingExpensePerCapita: number;  // 人均培训费
  recruitingExpensePerCapita: number;// 人均招聘/猎头分摊费
  welfareAndHealthPerCapita: number; // 员工体检与节日福利费
  
  // 汇总总额 (万元)
  annualTotalDirectSalary: number;   // 全年直接工资总额 (含基本工资+绩效+年终奖)
  annualTotalSocialAndBenefits: number; // 全年五险一金及间接福利总额
  annualTotalLaborCost: number;      // 全年综合人工成本总额 (直接工资 + 五险一金 + 间接福利)
  
  // 1~12月月度支出节奏 (万元)
  months: MonthlyBudget;
  
  status: '已审核' | '编制中' | '待提交';
  notes?: string;
}

// 办公场所租赁维护数据模型 (由后勤人员维护，作为内部职场租赁 BB.4.2.b 与对外职场租赁 BB.4.2.a/BB.4.2.a.1 的口径依据)
export interface OfficeLeaseAreaItem {
  id: string;
  seq: number;
  location: string;            // 场所选择 (如 花果山园区、史塔克大厦、瓦坎达科技园)
  company: string;             // 归属公司 (如 A公司、B公司、C公司、BB公司、DB公司等)
  leaseTerm: string;           // 租赁期间(起止) (自由文本日期区间, 如 2027/01/01-2029/12/31；仅人眼识别, 不参与判定与测算)
  leaseArea: number;           // 租赁面积 (㎡, 手工填写)
  unitPrice: number;           // 单价 (元/㎡·月, 手工维护；仅内部持有场所=市场单价，供 BB.4.2.b 内部职场租赁按「年度×场所×公司」带出；外部租入场所不在此维护)
  ratio?: number;              // 比例 (自动计算: 该公司面积 / 该场所总面积)
  managedByRole?: string;      // 维护角色: '后勤人员' (Facility / Logistics Admin)
  notes?: string;              // 备注说明
}

export type ContractNature = 
  | '存量框架合同'
  | '新增商业机会'
  | '历史框架合同'
  | '新增机会点'
  | '存量'
  | '新增';

export type ContractType = 
  | '销售'
  | '技术服务'
  | '部件销售'
  | '软件授权'
  | '研发定制';

export type Region = 
  | '北京'
  | '广州'
  | '上海'
  | '深圳'
  | '武汉'
  | '成都'
  | '西安'
  | '合肥'
  | '无锡'
  | '海外' | string;

export type ProductCategory = 
  | '整机台+验收款'
  | '关键模组+验收款'
  | '零部件耗材+交付款'
  | '软件授权+授权款'
  | '技术服务维保+服务款' | string;

export type RevenueMethod = 
  | '验收一次性'
  | '直线法';

// AB.3/AB.4 字典类型 re-export（字典化后统一从 data 文件引用）
export type { ProductCategoryDictItem } from './data/productCategoryDict';
export type { RevenueMethodDictItem } from './data/revenueMethodDict';
export type { ManagementUnit } from './data/managementUnitData';

// 法人公司层级结构模型 (匹配用户提供的法人编码-法人名称-父公司关系)
export interface LegalEntity {
  code: string;       // 法人编码: JT, A, B, C, D, BA, BB, BC, BD, DA, DB, DC
  name: string;       // 法人名称: 集团公司, A公司, B公司, C公司, D公司, BA公司...
  parentId?: string;  // 父公司法人编码: JT, B, D (顶级为空)
  level: number;      // 层级: 1 (集团公司), 2 (一级子公司), 3 (二级孙公司)
  isConsolidated?: boolean; // 是否纳入合并报表
  category?: '制造基地' | '研发中心' | '销售主体' | '海外中心' | '综合管理';
  description?: string;
}

// 人力组织架构主数据 (独立存储备用，暂不参与预算编制业务计算)
export interface HROrganizationItem {
  code: string;           // 组织编码 (如 Y02, 100065, 100067)
  name: string;           // 组织名称 (如 产品研发部, 电子电气工程部)
  fullName: string;       // 组织全称 (如 运营管理本部-产品研发部)
  type: '管理' | '普通';   // 组织类型
  parentFullName?: string;// 上级组织路径
  status: '存储备用(暂未启用)' | '已启用' | '停用';
  memo?: string;          // 备注说明
}

// 预算项目主数据 (Budget Project Master Data)
export interface BudgetProjectMasterItem {
  // 底层原始数据 (保留在后端/内存数据库)
  code: string;           // 组织/项目编号 (如 Y01, Y0102, 9210001)
  name: string;           // 组织/项目名称 (如 IT, 产品化项目, 3X, AiLT DY APPT V500R003C00)
  namingStrategy: string; // 全称策略 (如 上级名称-本级名称)
  fullName: string;       // 组织/项目全称 (如 3X-APPT-APPT-AiLT DY APPT V500R003C00)
  shortName: string;      // 组织/项目简称 (如 AiLT DY APPT V500R003C00, APPT)
  nature: '汇总' | '普通'; // 组织/项目性质 (汇总节点 / 普通执行项目)
  projectType?: '产品化' | '产能' | '销售' | '业务交付' | '基建' | '职能' | '公共平台' | '研发'; // 项目类型
  projectTypeCode?: 'PRODUCT' | 'CAPACITY' | 'SALE' | 'DELIVERY' | 'CAPEX' | 'FUNCTION' | 'PLATFORM' | 'R&D'; // 稳定筛选编码，避免消费端依赖展示名称
  status?: '有效' | '草稿' | '已结项';
  memo?: string;          // 备注说明

  // 前端脱敏显示专用字段
  maskedCode?: string;       // 脱敏编码 (如 PRJ0001, PRJ0028, PRJ0057)
  maskedName?: string;       // 脱敏名称 (如 数字化系统研发, P1-运动定位子系统, P1-双工件台机构研发)
  maskedFullName?: string;   // 脱敏全称
  maskedShortName?: string;  // 脱敏简称
}

export interface MonthlyBudget {
  m1: number;
  m2: number;
  m3: number;
  m4: number;
  m5: number;
  m6: number;
  m7: number;
  m8: number;
  m9: number;
  m10: number;
  m11: number;
  m12: number;
}

export interface BudgetItem {
  id: string;
  seq: number;
  contractNature: ContractNature;
  contractCode: string; // e.g. HT002 or virtual custom code
  contractType: ContractType;
  department: string;
  region: Region;
  productCategory: ProductCategory;
  budgetProduct?: string; // 预算产品 (关联 AA.7 预算产品主数据)
  machineCode?: string; // 机台 (文本，用户必输)
  revenueMethod: RevenueMethod;
  projectName: string; // 销售项目（从 AA.6 预算项目主数据中筛选 projectTypeCode='SALE' 且 nature≠'汇总' 的项目下拉选择）
  signingEntity: string; // e.g. D公司, BA公司, BB公司, 甜甜圈集团公司
  legalEntity?: string;
  internalSupplier: string; // 内部供应商
  customer: string;

  months: MonthlyBudget;
  nextYearBudget: number; // 下年预算
  yearAfterNextBudget: number; // 后年预算
  notes?: string;
  status?: '草稿' | '已确认' | '预警';
}

export interface MasterContract {
  code: string;
  name: string;
  type: ContractType;
  defaultDepartment: string;
  defaultCustomer: string;
  defaultFab: string;
  defaultSigningEntity: string;
  defaultRegion: Region;
  isFramework: boolean;
}

export interface ProductRevenueRule {
  productCategory: ProductCategory;
  defaultRevenueMethod: RevenueMethod;
  description: string;
}

export interface BudgetVersion {
  id: string;
  versionName: string;
  createdAt: string;
  createdBy: string;
  status: '编制中' | '已提交' | '审核通过' | '已锁定基准';
  itemsCount: number;
  totalAnnualAmount: number;
  remarks: string;
}

// 存量订单执行表数据模型 (Matching user's reference image exactly)
export interface StockOrderItem {
  id: string;
  seq: number;
  projectCode: string;       // 项目编码 (下拉选择)
  projectName: string;       // 项目名称 (下拉选择带出)
  department: string;        // 部门名称 (手工填写)
  contractCode: string;      // 销售合同 (下拉选择)
  contractName?: string;     // 销售合同名称
  region: Region;            // 区域 (下拉选择)
  productCategory: ProductCategory; // 产品类别(分类) (下拉选择)
  machineCode?: string;      // 机台 (文本，用户必输)
  customer: string;          // 客户 (下拉选择)
  signingEntity?: string;    // 签约主体（法人公司），从销售合同签约主体带出
  customerType: string;      // 客户类型 (根据客户自动带出)
  revenueMethod: RevenueMethod; // 产品类别收入方式 (自动带出)
  contractAmount: number;    // 签约金额 (手填)
  conversionRate?: number;
  // 月度数据：1~12 月（确认收入 & 预收款 & 已回款）
  monthlyRecognized?: { m1?: number; m2?: number; m3?: number; m4?: number; m5?: number; m6?: number; m7?: number; m8?: number; m9?: number; m10?: number; m11?: number; m12?: number };
  monthlyPrepayment?: { m1?: number; m2?: number; m3?: number; m4?: number; m5?: number; m6?: number; m7?: number; m8?: number; m9?: number; m10?: number; m11?: number; m12?: number };
  monthlyCollection?: { m1?: number; m2?: number; m3?: number; m4?: number; m5?: number; m6?: number; m7?: number; m8?: number; m9?: number; m10?: number; m11?: number; m12?: number };
  // 派生字段（由月度合计计算）
  recognizedAmount?: number;  // 已确认收入金额（全年合计，公式计算）
  collectedAmount?: number;   // 已回款金额（全年合计，公式计算）
  backlogRevenue?: number;    // 订未收 = 签约金额 - 确认收入合计（公式计算）
  uncollectedAmount?: number; // 未回款金额 = 签约金额 - 回款合计（公式计算）
  // 业务履约辅助属性
  deliverySchedule?: '2027-Q1' | '2027-Q2' | '2027-Q3' | '2027-Q4' | '2027-全年均衡' | '2028及以后';
  costRate?: number;
  status?: '履约中' | '待终验' | '质保期' | '已完成';
  notes?: string;
}

// ----------------------------------------------------------------------
// 基础表-产品单位成本预算表 (工时标准成本 & 物料标准成本 & 产品综合标准成本)
// ----------------------------------------------------------------------
export interface ProductStandardCostItem {
  id: string;
  costItem: string;              // 成本项目 (如：标准成本)
  productSubsystem: string;      // 产品/子系统
  productCode: string;           // 产品编码
  lastYearQuota: number;         // 上年定额 (元)
  lastYearActual: number;        // 上年实际 (元)
  thisYearQuota: number;         // 本年定额 (元) - 手工填写
  remarks?: string;              // 备注
}

export interface HourlyStandardCostItem {
  id: string;
  seq: number;
  position: string;         // 岗位 (如: 岗位1, 岗位2, 岗位3, 现场支持专家, 系统实施架构师)
  rank: string;             // 职级 (如: 职级1, 职级2, 职级3, T1, T2, T3)
  hourlyCost: number;       // 工时标准成本 (手工填写, 万元/标准工时)
  remarks?: string;         // 备注

}

export interface MaterialStandardCostItem {
  id: string;
  seq: number;
  partCategory: '好件' | '坏件'; // 同一物料可分别维护好件/坏件成本
  materialCode: string;     // AA.11 物料编码
  materialName: string;     // AA.11 自动带出
  materialType: string;     // AA.11 自动带出
  unit: string;             // AA.11 自动带出
  standardCost: number | null;     // 物料标准成本（万元/标准单位），不区分法人；缺失时为空
  remarks?: string;
}

// ----------------------------------------------------------------------
// 收入预算-服务 (服务主收入表、附表1工时明细、附表2物料明细)
// ----------------------------------------------------------------------

// 附表1：工时数量与成本明细
export interface ServiceLaborDetailItem {
  id: string;
  serviceRevenueId: string; // 关联服务主收入表 ID
  seq: number;
  productName: string;      // 产品名称 (自动与主表保持一致)
  projectName: string;      // 项目名称
  department: string;       // 部门名称
  contractCode: string;     // 销售合同
  region: Region;           // 区域
  productCategory: string;  // 产品类别(财)
  customer: string;         // 客户
  customerType: string;     // 客户类型
  signingEntity?: string;   // 签约主体（法人公司），从销售合同签约主体带出
  internalSupplier?: string;// 内部供应商（AA.10 供应商主数据，供应商类型=内部）；留空=签约主体自己提供（自供，不构成内部交易），填=其他法人提供
  position: string;         // 岗位 (下拉: 岗位1, 岗位2, 岗位3...)
  rank: string;             // 职级 (下拉: 职级1, 职级2, 职级3...)
  monthlyHours: MonthlyBudget; // 1月 ~ 12月工时数量预测
  hourlyStandardCost: number;  // 工时标准成本 (根据当前法人+岗位+职级从工时成本库获取)
  monthlyCosts?: MonthlyBudget; // 1月 ~ 12月工时成本 (数量 * 标准成本)
  totalHours: number;       // 全年工时数量小计
  totalLaborCost: number;   // 全年工时成本小计 (自动汇总回写主表人工成本)
  notes?: string;
}

// 附表2：物料明细
export interface ServiceMaterialDetailItem {
  id: string;
  serviceRevenueId: string; // 关联服务主收入表 ID
  seq: number;
  productName: string;      // 产品名称
  projectName: string;      // 项目名称
  department: string;       // 部门名称
  contractCode: string;     // 销售合同
  region: Region;           // 区域
  productCategory: string;  // 产品类别(财)
  customer: string;         // 客户
  customerType: string;     // 客户类型
  signingEntity?: string;   // 签约主体（法人公司），从销售合同签约主体带出
  internalSupplier?: string;// 内部供应商（AA.10 供应商主数据，供应商类型=内部）；留空=签约主体自己提供（自供，不构成内部交易），填=其他法人提供
  partCategory: '好件' | '坏件'; // 物件类别 (好件 / 坏件)
  materialCode: string;     // 物料编码
  materialName: string;     // 物料名称 (AA.11 带出)
  materialType?: string;     // 物料类型 (AA.11 带出)
  unit?: string;             // 计量单位 (AA.11 带出)
  monthlyQuantities: MonthlyBudget; // 1月 ~ 12月物料数量预测
  materialStandardCost: number | null;    // 物料标准成本 (根据物料库获取；缺失时明确为空)
  monthlyCosts?: MonthlyBudget;    // 1月 ~ 12月物料成本 (数量 * 标准成本)
  totalQuantity: number;    // 全年物料数量小计
  totalMaterialCost: number;// 全年物料成本小计 (好件成本 + 坏件成本，自动汇总回写主表物料成本)
  notes?: string;
}

// 服务主收入表 (服务销售收入表)
export interface MonthlyServiceDetail {
  salesVolume: number;
  unitPrice: number;
  backlogAmount: number;
  uncollectedAmount: number;
  recognizedRevenue: number;
  revenueNature: '开票当月收' | '开票后1月收' | '按验收进度收' | '开票后收' | '里程碑分期收';
  prepayment?: number;          // 预收款（新增）
  acceptCollection?: number;    // 验收回款（新增）
  cashRecoveryAmount: number;   // 资金回笼合计（= 预收款 + 验收回款，兼容旧字段）
  cashRecoveryNature: '预付款' | '进度款' | '验收款' | '质保金';
  materialCost: number;
  laborCost: number;
  otherExpenses: number;
  grossProfit?: number;
  grossMargin?: number;
}

export interface ServiceRevenueItem {
  id: string;
  seq: number;
  productName: string;      // 产品名称
  machineCode?: string;     // 机台 (文本，用户必输)
  projectName: string;      // 项目名称
  department: string;       // 部门名称 (手工填写)
  contractCode: string;     // 销售合同 (下拉选择)
  region: Region;           // 区域 (下拉选择)
  productCategory: ProductCategory; // 产品类别(财)(分类) (下拉选择)
  customer: string;         // 客户 (下拉选择)
  signingEntity?: string;   // 签约主体（法人公司），从销售合同签约主体带出
  customerType: string;     // 客户类型 (根据客户自动带出)
  revenueMethod: RevenueMethod; // 收入方式 (下拉: 验收一次性, 直线法)
  estimatedAcceptanceTime: string; // 预计结验收时间 (根据产品类别(财)自动带出/手工调整, 如 "2027-06" 或 "Q2 15%")
  
  // 全年汇总指标
  annualSalesVolume: number;      // 全年销量
  annualUnitPrice: number;        // 单价 (不含税)
  annualBacklog: number;          // 订未收
  annualUncollected: number;      // 未回款金额
  annualRevenue: number;          // 预计销售收入 (不含税 = 全年销量 * 单价)
  revenueNature: '开票当月收' | '开票后1月收' | '按验收进度收' | '开票后收' | '里程碑分期收'; // 收入性质
  annualCashRecovery: number;     // 预计资金回笼
  cashRecoveryNature: '预付款' | '进度款' | '验收款' | '质保金'; // 资金回笼性质
  annualMaterialCost: number;     // 物料成本 (标黄：自动来源于附表2物料汇总)
  annualLaborCost: number;        // 人工成本 (标黄：自动来源于附表1工时成本汇总)
  annualOtherExpenses: number;    // 其他费用 (手工填入)
  annualGrossProfit: number;      // 毛利额 (预计销售收入 - 物料成本 - 人工成本 - 其他费用)
  annualGrossMargin: number;      // 毛利率 (%)
  
  // 1-12月月度明细数据
  months: Record<string, MonthlyServiceDetail>; // key: 'm1' ~ 'm12'
  status?: '草稿' | '已审核' | '已锁定';
  notes?: string;
}

export interface BalanceSheetItem {
  id: string;
  category: '流动资产' | '非流动资产' | '流动负债' | '非流动负债' | '所有者权益';
  code: string;
  name: string;
  ruleDescription: string; // 取数规则 (如: 取<现金流量表>-期末现金及现金等价物余额)
  isSubItem?: boolean;    // 是否为 "其中:" 明细科目
  isTotal?: boolean;      // 是否为小计/合计行
  isFormula?: boolean;    // 是否为公式计算项
  y2026Actual: number;    // 2026年数 (基准年实际/期初数)
  budget2027: number;     // 2027年预算数 (原始取数/编制数)
  adjustedAmount: number; // 调整数 (+/-)
  adjustedTotal: number;  // 合计 (预算数 + 调整数)
  adjustmentNote?: string;// 调整说明
  accountBreakdown?: string; // 对应科目(金额) - 用于穿透追溯报表与科目发生额/余额的关系
}

// 现金流量表科目定义 (匹配用户图片3)
export interface CashFlowStatementItem {
  id: string;
  section: '经营活动' | '投资活动' | '筹资活动' | '汇率变动' | '现金净增加' | '期末现金';
  code: string;
  name: string;
  ruleDescription: string; // 取数规则
  isTotal?: boolean;      // 是否为流入/流出小计或净额
  y2026Budget: number;    // 2026年预算情况
  budget2027: number;     // 2027年预算数
  adjustedAmount?: number;// 调整数
  adjustedTotal?: number; // 调整后合计
  growthRate: number;     // 增减率 (%)
  notes?: string;         // 备注
  accountBreakdown?: string; // 对应科目(金额) - 用于穿透追溯报表与现金及对方科目发生额的关系
}

// 利润表科目定义
export interface IncomeStatementItem {
  id: string;
  code: string;
  name: string;
  ruleDescription: string; // 取数规则 (如: 取<销售收入预算>+<存量转收入>)
  isTotal?: boolean;      // 是否为营业利润/利润总额/净利润合计
  isSubItem?: boolean;    // 是否为 "其中:" 明细
  y2026Actual: number;    // 2026年实际
  budget2027: number;     // 2027年预算数
  adjustedAmount: number; // 调整数
  adjustedTotal: number;  // 调整后合计
  growthRate: number;     // 增减率 (%)
  ratioToRevenue: number; // 占营业收入比重 (%)
  notes?: string;         // 备注
  accountBreakdown?: string; // 对应科目(金额) - 用于穿透追溯报表与损益科目发生额的关系
}

// 预算综合调整表科目行数据 (供预算管理员直接录入调控，支持1~12月月度明细调整)
export interface BudgetAdjustmentRow {
  id: string;
  legalEntity?: string;    // 所属法人公司 (单法人核算与综合调控)
  targetStatement: '利润表' | '资产负债表' | '现金流量表' | '综合经营指标';
  subjectCategory: string; // 科目分类 (如: 营业收入类, 成本费用类, 资产类, 负债类, 资本支出)
  subjectCode: string;     // 科目代码
  subjectName: string;     // 科目名称
  baselineBudget: number;  // 基础预算数 (全年)
  adjustType: '增量调整' | '全量调整' | 'amount' | 'percentage'; // 调整方式 (增量调整 / 全量调整)
  adjustValue: number;     // 全年调整值 (+/- 或 目标全量绝对值)
  effectiveAdjustAmount: number; // 全年生效调控差额 (+/-，用于财务三表增量入账与勾稽)
  adjustedBudget: number;  // 调整后全年最终预算数
  months?: { [month: string]: number }; // 1~12月各月调整值 (m1 ~ m12)
  baselineMonths?: { [month: string]: number }; // 1~12月各月基准预算数
  adjustedMonths?: { [month: string]: number }; // 1~12月各月调整后最终预算数
  adjustmentReason: string;// 调整说明与依据 (必填/建议)
  driverFactor?: string;   // 结构调控驱动因子 (如: 销售目标上浮、采购控本降本、DSO账期优化、CapEx推迟)
  lastUpdated: string;     // 最后调整时间
}

// 预算综合调控宏观驱动杠杆配置
export interface MacroAdjustmentLevers {
  revenueGrowthTargetPct: number;    // 营业收入目标宏观调控系数 (%)
  targetCostReductionPct: number;    // 综合采购与制造成本降本率 (%)
  salesExpenseRatioCap: number;      // 销售费用率上限控制 (%)
  rdIntensityPct: number;            // 研发投入强度目标 (%)
  dsoDaysReduction: number;          // 应收账款周转天数压缩 (天, 提速经营性现金回款)
  capexAdjustmentPct: number;        // 固定资产资本支出 CapEx 调整 (%)
  debtFinancingAdjustment: number;   // 银行及外部债务融资调整 (万元)
  dividendPayoutRatio: number;       // 预计利润分红比例 (%)
}

// 三表平衡与勾稽校验诊断结果
export interface FinancialStatementsCheckResult {
  isBalanceSheetBalanced: boolean;   // 资产 = 负债 + 所有者权益
  balanceSheetDiff: number;          // 资产 - (负债 + 权益) 差额
  isCashFlowAligned: boolean;        // 现金流量表期末余额 = 资产负债表货币资金
  cashFlowDiff: number;              // 差额
  isNetIncomeAligned: boolean;       // 利润表净利润与资产负债表未分配利润变动勾稽
  netIncomeDiff: number;             // 差额
  status: 'passed' | 'warning' | 'error';
  summary: string;
  cashDiff?: number;
  retainedEarningsDiff?: number;
}

// ----------------------------------------------------------------------
// B.4 资产类采购预算 (设备类采购, 物料类采购, 基建类采购)
// ----------------------------------------------------------------------
export type AssetProcurementCategory = '设备类采购' | '物料类采购' | '基建类采购';

export type CapexCategory = '设备类采购' | '物料类采购' | '基建类采购' | '固定资产购置' | '无形资产购置' | '在建基建工程';

export type AcceptancePaymentTiming = '当月付款' | '次月付款' | '第三月付款';

// 固定资产采购月度指标明细 (每月包括: 下单金额、验收金额、预付款、验收付款、付款金额)
export interface MonthlyProcurementDetail {
  orderAmount: number;      // 下单金额 (万元)
  acceptanceAmount: number; // 验收金额 (万元) - 只需要验收金额本身
  advancePayment: number;   // 预付款 (万元, 手工填报)
  acceptancePayment: number; // 验收付款 (万元, 手工填报)
  paymentAmount: number;    // 付款金额 (万元) = 预付款 + 验收付款，公式列
}

export interface FixedAssetProcurementItem {
  id: string;
  seq: number;
  legalEntity: string;             // 关联法人 (法人公司, 如: 草莓慕斯公司, 抹茶曲奇公司, 甜甜圈集团公司等)
  orderingEntity?: string;         // 下单主体 (关联管理单元, 如: 草莓慕斯-泛烘焙装备制造单元)
  managementUnitCode?: string;     // 管理单元编码 (如: MU-A-01)
  beneficiaryEntity?: string;      // 受益主体 (手工填写，当前无对应的数据处理——不参与取数、金额测算与分录)
  signingEntity?: string;
  benefitEntity?: string;
  name?: string;
  category?: string;
  department: string;              // 申购/使用部门 (如: 制造工程部, 甜品研发部, 质量检验部, IT信息部)
  assetCategory?: AssetProcurementCategory; // 资产类采购大类: 设备类采购 | 物料类采购 | 基建类采购
  assetCode: string;               // 资产/设备编码 (如: FA-2027-001)
  assetName: string;               // 资产/设备名称 (如: 综合检测仪, 高精度五轴智能机床)
  specModel?: string;              // 规格型号 (如: 榆光 Verifire HD+)
  supplier?: string;               // 供应商/厂商 (如: 昆仑工坊, 华山工艺中心)
  quantity: number;                // 采购数量 (台/套)
  unit: string;                    // 计量单位 (台, 套, 套件)
  unitPriceTaxExcluded: number;    // 单价 (万元)

  // 全年汇总三大核心指标
  totalOrderAmount: number;        // 全年下单金额合计 (万元)
  totalAcceptanceAmount: number;   // 全年验收金额合计 (万元, 只需要验收金额本身)
  totalAdvancePayment: number;     // 全年预付款合计 (万元) = SUM(1~12月预付款)
  totalAcceptancePayment: number;  // 全年验收付款合计 (万元) = SUM(1~12月验收付款)
  totalPaymentAmount: number;      // 全年付款金额合计 (万元) = 全年预付款合计 + 全年验收付款合计

  // 12个月各月明细数据 (m1 ~ m12) 每月均包含: 下单金额, 验收金额, 付款金额
  months: {
    m1: MonthlyProcurementDetail;
    m2: MonthlyProcurementDetail;
    m3: MonthlyProcurementDetail;
    m4: MonthlyProcurementDetail;
    m5: MonthlyProcurementDetail;
    m6: MonthlyProcurementDetail;
    m7: MonthlyProcurementDetail;
    m8: MonthlyProcurementDetail;
    m9: MonthlyProcurementDetail;
    m10: MonthlyProcurementDetail;
    m11: MonthlyProcurementDetail;
    m12: MonthlyProcurementDetail;
  };

  // 辅助与兼容字段
  orderMonth?: number;              // 下单月份 (1~12月)
  orderAmount?: number;             // 下单金额 (万元, 采购合同签约总额)
  advancePaymentRatio?: number;     // 预付款比例 (%, 如 30%, 20%, 50%)
  advancePaymentTiming?: '下单当月' | '下单次月'; // 预付款支付时点
  advancePaymentAmount?: number;    // 测算预付款金额 (万元 = 下单金额 × 预付款比例)
  advancePaymentMonth?: number;     // 预付款实际支付月份

  // 2. 验收与到货付款测算 (当月/次月/第三月付款)
  acceptanceMonth?: number;         // 验收月份 (1~12月, 到货/安装调试/终验转固)
  acceptanceAmount?: number;        // 验收金额 (万元, 资产入账与转固原值)
  acceptancePaymentTiming?: AcceptancePaymentTiming; // 验收金额付款时点: '当月付款' | '次月付款' | '第三月付款'
  acceptancePaymentRatio?: number;  // 验收款支付比例 (%, 如 60%, 70%)
  acceptancePaymentAmount?: number; // 验收付款金额 (万元 = 验收金额 × 验收款支付比例)
  acceptancePaymentMonth?: number;  // 验收款实际支付月份 (当月=acceptanceMonth, 次月=acceptanceMonth+1, 第三月=acceptanceMonth+2)

  // 3. 质保金/尾款
  warrantyRatio?: number;           // 质保金留存比例 (%, 如 10%)
  warrantyAmount?: number;          // 质保金金额 (万元 = 下单金额 × 质保金比例)
  warrantyPaymentMonth?: number;    // 质保金预计支付月份 (通常跨年或验收12个月后)

  // 4. 月度现金付款计划 (1~12月支出汇总)
  monthlyPaymentSchedule?: MonthlyBudget; // 1~12月各月实际付款金额汇总 (预付款 + 验收付款 + 尾款)
  annualPaymentTotal?: number;      // 2027预算年度付款总金额 (万元 = m1 + ... + m12)
  futureYearPayment?: number;       // 递延至2028及以后年度付款金额 (万元)

  // 5. 转固入账与折旧联动 (企业会计准则 CAS 4)
  residualRatePct?: number;         // 预计净残值率 (%, 默认 5%)
  monthlyDepreciation?: number;     // 转固次月起每月计提折旧额 (万元)
  budgetYearDepreciation?: number;  // 2027年预算内累计折旧额 (万元)

  status?: string;
  notes?: string;
}

export interface CapexBudgetItem {
  id: string;
  seq: number;
  legalEntity: string;      // 法人公司 (JT, A, B, C, D, BA~DC)
  department: string;       // 归属部门 (如: 甜品研发部, 制造工程部, IT信息部)
  category: CapexCategory;  // 资本化类别
  projectCode: string;      // 资本化项目/资产编码
  projectName: string;      // 项目/设备/资产名称
  specModel?: string;       // 规格型号/版本
  vendorSupplier?: string;  // 供应商/承建方
  paymentTerms?: string;    // 付款条件/结算方式
  months: MonthlyBudget;    // 1~12月资本化支出投入金额 (万元)
  annualTotal: number;      // 全年资本化预算总额 (万元)
  targetCapitalizeDate: string; // 预计达到预定可使用状态 / 转固/资本化时点 (如 "2027-09")
  estimatedUsefulLifeMonths: number; // 预计折旧/摊销期限 (月)
  monthlyDepreciationPostCap: number; // 转固后月度预计折旧摊销额 (万元)
  status: '已立项审批' | '编制中' | '待管理层审核' | '已纳入年度投资基准';
  notes?: string;
}

// -----------------------------------------------------------------------------
// BB.3.1 基建采购预算 (Infrastructure Capex) 数据模型
export interface InfrastructureProcurementItem {
  id: string;
  seq?: number;
  legalEntity: string;                // 填报主体 (法人公司, 如 甜甜圈集团公司, 草莓慕斯公司, 蓝莓蛋挞公司等)
  projectCode: string;                // 基建工程项目编码 (如 INFRA-2027-001)
  projectName: string;                // 基建工程项目名称 (如 智能制造二期装备厂房建设工程)
  projectCategory: string;            // 工程类别 (厂房土建工程 / 装备装调车间改造 / 动力站房与配电工程 / 园区道路与管网)
  contractor: string;                 // 总承包/施工单位 (如 中建八局第一建设, 华西安装工程)
  constructionSite: string;           // 建设地点/园区 (如 华东糖光装备产业园, 临港先导制造基地)
  department: string;                 // 申管/责任部门 (如 基建工程部, 智能制造中心)
  startDate: string;                  // 开工时间
  completionDate: string;             // 预计竣工/移交时间
  totalContractAmount: number;        // 合同总金额 (万元)
  // 全年汇总指标
  annualOutputTotal?: number;         // 全年产值/验收额合计 (万元)
  annualPaymentTotal?: number;        // 全年付款额合计 (万元)
  // 12个月各月明细数据 (产值/验收额 与 付款额)
  monthlyData?: Array<{
    month: number;
    outputAmount: number;             // 当月产值/验收额 (万元)
    paymentAmount: number;            // 当月付款额 (万元)
  }>;
  notes?: string;                     // 备注说明
  approvalStatus?: string;
}

// BB.3.2 附表：基建转固明细表 数据模型
export interface InfrastructureTransferItem {
  id: string;
  seq?: number;
  budgetProject?: string;             // 预算项目(基建工程)
  department: string;                 // 部门 (默认二级部门)
  entity?: string;                    // 法人公司 (AA.2 法人组织架构；转固分录按法人公司汇总生成)
  transferMonth: string;              // 转固月份 (如 "9月")
  assetCategory: string;              // 资产类别 (关联 AA.9 资产类别)
  originalValue: number;              // 原值 (万元)
  assetDesc?: string;                 // 资产描述（末列；转固资产的描述（建筑物/工程名称、用途），仅用于人眼识别，不参与任何测算与分录；与 BB.4.1.d/BB.4.3/BB.4.4.b/BB.4.5 的资产描述同口径）
}

// -----------------------------------------------------------------------------
// BB.4.1 自制设备预算 (Self-Built Equipment Budget) 数据模型
export interface SelfBuiltCipBudgetItem {
  id: string;
  seq: number;
  budgetProject?: string;             // 预算项目(自制设备)
  legalEntity?: string;               // 法人公司
  remark?: string;                    // 备注（第4列，项目级备注：自制设备项目的备注说明，仅人眼阅读识别，不参与任何测算与分录；与末列「备注说明」（行级补充说明）位置不同、含义不同）
  department: string;                 // 一级部门
  openingAmount?: number;             // 期初金额 (万元，全年口径，不按月展开)
  months: {                           // 1~12月各月三项投入 (万元)
    [key: string]: {
      laborInput?: number;            // 人工投入 (直接从 BB.5.1 雇员费用-自制在建工程按一级部门+期间获取)
      materialInput?: number;         // 领料投入
      capitalizeOut?: number;         // 转固转出
    };
  };
  notes?: string;                     // 备注说明（末列，行级补充说明；与第4列「备注」（项目级备注）位置不同、含义不同）
}

// BB.4.1 附表：自制设备转固明细表 数据模型
export interface SelfBuiltCipTransferItem {
  id: string;
  seq: number;
  budgetProject?: string;             // 预算项目(自制设备)
  legalEntity?: string;               // 法人公司 (AA.2 法人组织架构；转固分录按法人公司汇总生成)
  department: string;                 // 一级部门
  transferMonth: string;              // 转固月份 (如 "6月")
  assetCategory: string;              // 资产类别 (关联 AA.9 资产类别)
  originalValue: number;              // 原值 (万元)
  assetDesc?: string;                 // 资产描述（末列；转固资产的描述（设备名称/规格/用途），仅用于人眼识别，不参与任何测算与分录；与 BB.4.3/BB.4.4.b/BB.4.5 同口径）
}


// ----------------------------------------------------------------------
// 费用类支出预算 (OpEx) 数据模型
// ----------------------------------------------------------------------
export type OpexCategory = '销售费用' | '管理费用' | '研发费用' | '研发费用(费用化)' | '制造费用' | '财务费用';

// ----------------------------------------------------------------------
// 软硬件销售收入预算 (Software & Hardware Sales Revenue) 数据模型
// 参照用户标准 Excel 模板设计：包含合同性质、产品/项目编码与名称、发货/到货/验收时间、
// 月度销量/单价/销售收入/预计资金回笼/预收/验收回款、单位成本与销售成本
// ----------------------------------------------------------------------
export interface HardSoftSalesRevenueItem {
  id: string;
  seq: number;
  contractNature?: '历史框架合同' | '新增机会点' | string; // 合同性质（取自 AB.5 合同性质字典）
  productCode?: string;          // 产品编码 (如 CP001, CP002, CP003, LP001)
  productName?: string;          // 产品名称 (根据产品编码自动带出)
  projectCode?: string;          // 项目编码 (如 XM001, XM002, XM003, LPJ001)
  projectName?: string;          // 项目名称 (根据项目编码自动带出)
  department: string;            // 部门名称 (手工填写 / 根据项目自动带出)
  salesContract?: string;        // 销售合同编号 (关联合同自动带出 / 下拉选择)
  region: Region | string;       // 区域 (华东区, 华南区, 华北区, 西南区, 海外区)
  productCategory: ProductCategory | string; // 产品类别 (硬件 / 软件 / 零配件 / 整机台+验收款)
  recognitionMethod: RevenueMethod | string; // 收入方式 (根据产品类别自动带出 / 验收一次性 / 直线法)
  customer: string;              // 客户 (下拉选择，如 少林寺武备坊, 武当山玄铁工坊)
  customerType?: string;         // 客户类型 (根据客户自动带出: 战略重点客户 / 行业龙头 / 常规客户 / 集团内部关联方)
  
  // 交付节点时间 (手工填入)
  estShipDate?: string;          // 预计发货时间 (如 Jan-27, 2027-01, 1月)
  estArrivalDate?: string;       // 预计到货时间 (如 Mar-27, 2027-03, 3月)
  estAcceptDate?: string;        // 预计验收时间 (如 May-27, 2027-05, 5月)
  
  // 全年汇总/基准量价
  salesQty: number;              // 计划销售数量 (台/套/份)
  unitPriceTaxExcluded: number;  // 不含税销售单价 (万元/台)
  taxRatePct?: number;           // 适用增值税率 (%, 默认 13%)
  contractTotalTaxIncluded?: number; // 含税销售合同总额 (万元)
  salesRevenueTotal: number;     // 不含税销售总额 (万元 = salesQty * unitPriceTaxExcluded)
  
  // 成本与毛利测算 (单位成本 & 销售成本)
  unitStandardCost: number;      // 单位成本 (万元/台)
  totalStandardCost: number;     // 销售成本 (万元 = salesQty * unitStandardCost)
  grossProfitAmount: number;     // 预算毛利额 (万元 = budgetYearRevenueTotal - totalStandardCost)
  grossMarginPct: number;        // 预算毛利率 (%)
  
  // 时间序列各月多口径数据 (一月~十二月)
  monthlySalesQty?: MonthlyBudget;         // 月度销量 (手工填入)
  monthlyUnitPrice?: MonthlyBudget;        // 月度单价 (手工填入)
  months: MonthlyBudget;                   // 月度预计销售收入 (不含税, 自动计算: 销量 * 单价)
  monthlyCashCollection?: MonthlyBudget;   // 月度预计资金回笼 (万元)
  monthlyCollection?: MonthlyBudget;
  monthlyPrepayment?: MonthlyBudget;       // 月度预收 (万元)
  monthlyAcceptCollection?: MonthlyBudget; // 月度验收回款 (万元)
  monthlyCost?: MonthlyBudget;             // 月度销售成本 (万元)

  // 组织与兼容字段
  legalEntity: string;           // 签约法人组织 (字量屏, 甜甜圈集团公司, 草莓慕斯公司...)
  customerIndustry?: string;     // 客户行业 (烘焙制造, 先进封装, 光伏, 新能源, 科研高校)
  contractCode?: string;         // 关联销售合同代码 (兼容别名)
  productModel?: string;         // 规格型号 (兼容别名)
  deliveryQuarter?: 'Q1' | 'Q2' | 'Q3' | 'Q4'; // 预计交付季度
  budgetYearRevenueTotal: number;// 2027年预算确认收入合计 (万元)
  futureYearRevenue?: number;    // 递延至2028及以后确认金额 (万元)
  paymentTerms?: string;         // 付款条款 (如 3-3-3-1, 5-4-1, 100%预付)
  budgetYearCashCollection?: number; // 2027预算回款额 (含税万元)
  
  status: '草稿' | '已审核' | '已锁定';
  notes?: string;
}

export interface OpexBudgetItem {
  id: string;
  seq: number;
  legalEntity: string;      // 法人公司
  department: string;       // 归属部门
  category: OpexCategory;   // 费用大类
  subjectCode: string;      // 会计科目代码 (如 660101, 660205, 660301)
  subjectName: string;      // 二级/三级科目名称 (如 差旅费, 薪酬福利, 办公租赁, 咨询服务, 展会费)
  costNature: '刚性费用' | '弹性费用' | '战略性投入' | '法定支出'; // 费用属性
  controlMethod: '总额包干' | '定额控制' | '按收入比例管控' | '项目制报销'; // 管控机制
  months: MonthlyBudget;    // 1~12月费用预算金额 (万元)
  annualTotal: number;      // 全年费用预算总额 (万元)
  lastYearActual: number;   // 上年实际发生数 (万元)
  growthRatePct: number;    // 同比增减率 (%)
  status: '部门已确认' | '财务已初审' | '已锁定';
  notes?: string;
}



// ----------------------------------------------------------------------
// 财务类预算 (Financial Budgets) 数据模型
// ----------------------------------------------------------------------
export interface TreasuryCashBudgetItem {
  id: string;
  seq: number;
  legalEntity: string;
  flowType: string;
  category: string;
  itemCode: string;
  itemName: string;         // 如: 销售回款, 采购付款, 薪酬社保支付, 设备投资付款, 银行借款注入, 偿还本息
  months: MonthlyBudget;
  annualTotal: number;
  responsibleDept: string;
  status?: string;
}

export interface TaxBudgetItemLegacy {
  id: string;
  seq: number;
  legalEntity: string;
  taxType: string;
  calculationBasis: string;
  months: MonthlyBudget;
  annualTotal: number;
  taxRatePct: number;
}

// ----------------------------------------------------------------------
// 预算多维宽表与 OLAP 透视分析数据模型
// ----------------------------------------------------------------------
export interface BudgetWideRecord {
  id: string;
  legalEntityCode: string;  // JT, A, B, C, D, BA...
  legalEntityName: string;  // 集团公司, A公司...
  budgetMainType: '收入类预算' | '资本化支出' | '费用类支出' | '生产制造类' | '财务与资金';
  subCategory: string;      // 合同签约, 服务收入, 销售费用, 直接材料, 资金流出等
  department: string;
  region: string;
  productCategory: string;
  projectCode?: string;
  projectName?: string;
  subjectCode: string;
  subjectName: string;
  // 12个月金额 (万元)
  m1: number;
  m2: number;
  m3: number;
  m4: number;
  m5: number;
  m6: number;
  m7: number;
  m8: number;
  m9: number;
  m10: number;
  m11: number;
  m12: number;
  annualTotal: number;
  costNature?: string;
  status: string;
}

// ----------------------------------------------------------------------
// 股权投资预算 (Equity Investment Budget) 数据模型
// 依据国资委与企业全面预算填报规范
// ----------------------------------------------------------------------
export type InvestmentRegion = '市内' | '境内市外' | '海外';

export interface EquityInvestmentItem {
  id: string;
  seq: number;
  legalEntity: string;             // 法人公司（投资主体/出资法人）(如: 集团公司, A公司...)
  industry: string;                // 被投资企业所属行业 (参照国资委行业分类体系)
  targetCompany: string;           // 投资对象 (企业/项目名称)
  region: InvestmentRegion;        // 投资区域 (下拉选择: 市内 / 境内市外 / 海外)
  startDate: string;               // 项目启动时间 (年月, 如 202701)
  endDate: string;                 // 预计结束时间 (年月, 如 202702)
  totalProjectInvestment: number;  // 项目投资总额 (元/万元)
  
  // 己方资本金投入
  ourShareholdingRatio: number;    // 己方投资比例 (%)
  ourCapitalContribution: number;  // 己方出资额 (元/万元)
  priorYearCumulatedInvestment: number; // 至上年末累计投入 (元/万元)
  priorYearCumulatedDividend?: number;  // 至上年末累计分红/利息 (元/万元)
  partnerCapital: number;  // 合伙人投入资本（其他股东投入）
  annualReturn: number;    // 预计每年收益（年度口径）
  paybackPeriod?: number;  // 资本回收周期（年）= 己方出资额 ÷ 预计每年收益
  
  // 年末指标
  yearEndCumulatedInvestment: number;  // 累计投资金额 (自动计算 = 至上年末累计投入 + 全年1-12月投资金额)
  yearEndCumulatedDividend: number;    // 累计分红/利息 (自动计算 = 至上年末累计分红 + 全年1-12月分红合计)
  yearEndEquityRatio: number;          // 持股比例-股权投 (%)
  
  // 1-12月各月投入与分红明细
  investmentMonths: MonthlyBudget;     // 1~12月投资金额 (现金流出)
  dividendMonths: MonthlyBudget;       // 1~12月分红/利息收现（预计收到的投资收益现金）
  
  status?: '草稿' | '已立项' | '董事会审议' | '已实施出资';
  notes?: string;
}

// ----------------------------------------------------------------------
// 关联交易预算 (Intercompany Transaction Budgets) 数据模型
// 涵盖：关联交易加成比例表、代采购、内部职场租赁、资产转卖
// ----------------------------------------------------------------------

// 关联交易内部交易类型（对应四张关联交易表：代采购物料/代采购资产/内部职场租赁/资产转卖）
export type InternalTransactionType =
  | '代采购物料'
  | '代采购资产'
  | '内部职场租赁'
  | '资产转卖';

// 1. 关联交易加成比例表数据模型 (BAA.11)
export interface IntercompanyMarkupRateItem {
  id: string;
  seq: number;
  internalTransactionType: InternalTransactionType; // 内部交易类型：代采购物料/代采购资产/内部职场租赁/资产转卖
  budgetProject: string;           // 预算项目（AA.6 预算项目主数据）
  markupRatePct: number;           // 加成比例% (如: 10%)
}

// 2. 代采购预算编制表数据模型 (对应 BJ.C.a 物料代采购, BJ.C.e 资产代采购)
export interface IntercompanyProcurementBudgetItem {
  id: string;
  seq: number;
  procurementType: '物料' | '资产';  // 采购类型（物料代采购已并回 BB.3.3.D 口径，资产类在 BJ.C.e）
  procurementObject: string;         // 代采购对象（物料类型/服务内容/资产名称）
  providerEntity: string;            // 提供方（代采购方，法人）
  receiverEntity: string;            // 接受方（受益方，法人）
  budgetProject: string;             // 预算项目（AA.6 预算项目主数据）
  budgetDepartment: string;          // 预算部门（AA.5 行政部门字典）
  monthlyDeliveryAmount?: number[];   // 到货额（不含税，1~12月，=平价转移金额，加成计算基数）
  monthlyProcurementAmount?: number[]; // 兼容字段（等同到货额，原「采购金额(不含税)」）
  prepaymentRatioPct?: number;        // 预付款比例(%)：预付款=当月到货额×比例（口径待确认，示例缺省 30）
  monthlyPrepayment?: number[];       // 预付款（1~12月，本笔对外采购预付给供应商的款项，同 BB.3.1/BB.3.3 口径、由下单主体 A 支付；不构成内部结算）
  monthlyPayment?: number[];          // 付款额（1~12月，本笔对外采购到货验收后付给供应商的款项；不构成内部结算）
  markupRatePct: number;             // 加成比例%（BAA.11 带出）
  monthlyMarkupFee?: number[];       // 加成款（= 各月到货额 × 加成比例，公式，1~12月）
  notes?: string;
}

// 3. 内部销售预算表数据模型 (对应图片 3)
export interface IntercompanySalesBudgetItem {
  id: string;
  seq: number;
  legalEntity: string;             // 预算组织
  projectName: string;             // 项目 (场景小类/业务项目: 软硬件销售, 技术服务分包, 委托研发服务, 仓储物流等)
  budgetSubjectCode: string;       // 预算科目编码 (自动带出: PL0101 主营业务收入 / PL0201 营业成本 / PL05 研发费用)
  budgetSubjectName: string;       // 预算科目名称
  providerEntity: string;          // 提供方 (如: C公司, BB公司, DB公司, A公司等 12 法人公司)
  receiverEntity: string;          // 接受方 (如: BD公司, B公司, BA公司等 12 法人公司)
  amountTaxExcluded: number;       // 金额(不含税) (元 / 万元)
  taxRatePct: number;              // 税率% (如 13%, 6%)
  amountTaxIncluded: number;       // 金额(含税) (公式计算)
  markupRatePct: number;           // 加成比例% (自动取数: 联动关联交易加成比例表 BAA.11, 如 10%)
  markupAmountTaxExcluded: number; // 加成金额(不含税) (公式: 金额(不含税) * 加成比例)
  markupAmountTaxIncluded: number; // 加成金额(含税) (公式: 金额(含税) * 加成比例)
  transactionPeriod: string;       // 交易期间 (如: 202701 ~ 202712 / 一月 ~ 十二月)
  months?: MonthlyBudget;          // 1~12月月度明细
  
  // 报表流向与合并抵销
  providerPLStatement: string;     // 提供方：进利润表“主营业务收入”
  providerCFStatement: string;     // 提供方：进现金流量表“销售商品、提供劳务收到的现金”
  receiverPLStatement: string;     // 接受方：进利润表“研发费用” / “管理费用” / “营业成本”
  receiverCFStatement: string;     // 接受方：进现金流量表“购买商品、接受劳务支付的现金”
  eliminationEntry: string;        // 集团合并抵销分录: 借: 营业收入, 贷: 营业成本/研发费用, 贷: 存货/资产(未实现内部销售利润)
  status: string;
  notes?: string;
}

// 4. 内部职场租赁预算表数据模型 (对应图片 4 - 场地租赁)
export interface IntercompanyLeasingBudgetItem {
  id: string;
  seq: number;
  legalEntity: string;             // 预算组织
  businessScenario: '租赁第三方房产' | '自有房产租赁'; // 业务场景 (下拉选择)
  providerEntity: string;          // 提供方 (出租方，如 A公司)
  receiverEntity: string;          // 接受方 (承租方，如 B公司)
  leaseAssetName: string;          // 租赁资产名称 (如: 甜甜圈高新园区1号楼3层职场, 智能制造A区车间)
  leaseStartDate: string;          // 租赁开始日 (如: 2027-01-01)
  leasePeriodType: '费用化(小于一年)' | '资本化(使用权资产租赁-大于一年)'; // 租赁期限
  leaseAccountingType: '使用权资产租赁' | '经营租赁费用化'; // 租赁类型
  annualRentTaxIncluded: number;   // 合同年租金(含税) (元 / 万元)
  annualRentTaxExcluded: number;   // 合同年租金(不含税) (元 / 万元)
  taxRatePct: number;              // 适用税率% (如 9%, 5%)
  
  // 出租方(母公司/出租主体)口径
  providerRentalRevenue: number;   // 本期租赁收入(不含税)
  providerDepreciationCost: number;// 本期折旧成本 (元 / 万元)
  providerReceivableEndingBalance: number; // 期末应收租金余额 (元 / 万元)
  
  // 承租方(子公司/承租主体)口径 (符合 CAS 21 新租赁准则)
  receiverRightOfUseAssetOriginal: number; // 使用权资产原值 (元 / 万元)
  receiverRightOfUseAssetAccumDepr: number; // 使用权资产累计折旧 (元 / 万元)
  receiverLeaseLiabilityBalance: number; // 租赁负债余额 (元 / 万元)
  receiverDepreciationExpense: number; // 本期折旧费用 (元 / 万元)
  receiverInterestExpense: number; // 本期利息费用 (元 / 万元)
  receiverLeaseExpense: number;    // 本期租赁费 (费用化口径)
  receiverPayableEndingBalance: number; // 期末应付租金余额 (元 / 万元)
  
  // 交易结算与加成明细
  amountTaxExcluded: number;       // 金额(不含税)
  amountTaxIncluded: number;       // 金额(含税)
  transactionPeriod: string;       // 交易期间 (如: 202701 ~ 202712)
  markupRatePct: number;           // 加成比例% (联动基础表, 如 10%)
  markupAmountTaxExcluded: number; // 加成金额(不含税)
  markupAmountTaxIncluded: number; // 加成金额(含税)
  
  // 报表流向与抵销说明
  eliminationExplanation: string;  // 报表流向与抵销说明 (出租方进利润表其他业务收入/主营业务收入, 承租方进折旧/利息/管理费用, 集团层面抵销)
  status: string;
  notes?: string;
}

// 5. 内部交易预算-资产转卖数据模型 (BJ.C.d 资产转卖预算表)
// 口径：账面价值平移 + 关联交易加成。转卖价 = 账面净值 × (1 + 加成比例)，加成比例取 BAA.11 关联交易加成比例（内部交易类型=资产转卖）。
// 不创造科目：只用现有报表项目 1001 货币资金 / 1601 固定资产净值 / 6115 资产处置收益。
export interface IntercompanyAssetTransferBudgetItem {
  id: string;
  seq: number;
  sellerEntity: string;            // 卖方(法人) (AA.2 法人组织架构)
  buyerEntity: string;             // 买方(法人) (AA.2 法人组织架构)
  assetDesc: string;               // 资产描述 (文本，仅人眼识别，不参与测算/分录)
  assetCategory: string;           // 资产类别 (AA.9 资产类别与折旧字典)
  netBookValue: number;            // 账面净值(万元)：存量转卖=原值−累计折旧；本表仅承载存量资产内部转卖，新增资产代采购归 BJ.C.e
  markupRatePct: number;           // 加成比例%(BAA.11 关联交易加成比例，内部交易类型=资产转卖，系统带出)
  transferPrice: number;           // 转卖价(万元) = 账面净值 × (1 + 加成比例)，公式
  transferMonth: string;           // 转让月份 (一月~十二月)
  remainingDeprMonths: number;     // 剩余折旧期限(月)：受让后剩余可折旧月数（= 受让时剩余可折旧年限×12）；买方后续折旧 = 转卖价 ÷ 剩余折旧期限(月)
  status: string;
  notes?: string;
}

// ----------------------------------------------------------------------
// BB.3.1 物料与设备采购预算表 (基础表单: 每月下单额/入库额/付款额)
// ----------------------------------------------------------------------
export type MaterialEquipmentCategory = '物料采购' | '设备采购';

// 每月三项核心指标
export interface MonthlyOrderInboundPayment {
  orderAmount: number;    // 下单额 (万元)
  inboundAmount: number;  // 入库额 (万元)
  paymentAmount: number;  // 付款额 (万元)
}

export interface MaterialEquipmentProcurementItem {
  id: string;
  seq: number;
  legalEntity: string;              // 关联法人 (法人单位, 下拉选择)
  orderingEntity?: string;          // 下单主体 (关联管理单元, 如: 蓝莓蛋挞-核心制造单元)
  managementUnitCode?: string;      // 管理单元编码 (如: MU-B-01)
  beneficiaryEntity?: string;       // 受益主体 (手工填写，当前无对应的数据处理——不参与取数、金额测算与分录)
  department: string;               // 申购部门 (手工填写)
  category: MaterialEquipmentCategory; // 采购类别 (下拉: 物料采购 | 设备采购)
  itemCode: string;                 // 物料/设备编码
  itemName: string;                 // 物料/设备名称
  specModel?: string;               // 规格型号
  supplier?: string;                // 供应商 (手工填写/下拉)
  unit: string;                     // 计量单位 (件/套/台/批)
  taxRatePct: number;               // 适用税率% (如 13%)
  // 1-12月明细 (每月: 下单额/入库额/付款额)
  months: Record<string, MonthlyOrderInboundPayment>; // key: 'm1' ~ 'm12'
  // 全年汇总三大指标
  totalOrderAmount: number;         // 全年下单额合计 (万元)
  totalInboundAmount: number;       // 全年入库额合计 (万元)
  totalPaymentAmount: number;       // 全年付款额合计 (万元)
  status: string;
  notes?: string;
}

// ----------------------------------------------------------------------
// BF.3 金融工具投融资预算表 - 银行 (存款/理财等金融工具投资预算)
// ----------------------------------------------------------------------
export type FinancialInstrumentCategory = '银行存款' | '银行理财';

export interface FinancialInstrumentInvestmentItem {
  id: string;
  seq: number;
  legalEntity: string;             // 投资主体 (法人单位, 下拉选择)
  category: FinancialInstrumentCategory; // 投资类型 (一级下拉框: 银行存款 / 银行理财)
  productType: string;             // 投资产品 (二级下拉框: 活期存款/定期存款/通知存款/结构性存款/其他银行理财产品)
  bankName: string;                // 银行名称 (手工填写)
  interestRatePct: number;         // 利率% (手工填写, 仅存款)
  months: Record<string, { newInvestment: number; redemption: number; investmentIncome: number; returnRatePct: number } | number>;                              // key: 'm1' ~ 'm12'
  annualNewInvestment: number;     // 全年新增投资额合计
  annualRedemption: number;        // 全年减少投资额合计
  annualInvestmentIncome: number;  // 全年投资收益合计
  avgReturnRatePct: number;        // 全年平均投资回报率
  // 报表流向勾稽说明
  cfOutflowImpact: string;         // 进现金流量表项目 "投资支付的现金"
  cfInflowImpact: string;          // 进现金流量表项目 "收回投资收到的现金"
  bsImpact: string;                // 进资产负债表项目 (交易性金融资产等)
  plImpact: string;                // 利润表流向: 存款利息进财务费用(负数)/利息收入; 理财收益进投资收益
  cfIncomeImpact: string;          // 进现金流量表项目 "取得投资收益收到的现金"
  status: string;
  notes?: string;
}

// ----------------------------------------------------------------------
// BF.3 金融工具投资预算 - 非银 (证券/基金/信托/衍生品/资管产品等)
// ----------------------------------------------------------------------
export type NonBankInvestmentType = '交易性金融资产' | '其他权益工具投资' | '债权投资' | '其他债权投资' | string;

export type NonBankInvestmentProduct =
  | '债券投资'
  | '公募基金投资'
  | '私募基金投资'
  | '对外委托贷款'
  | '委托理财'
  | '金融期货（权）及衍生品投资'
  | '商品期货（权）及衍生品投资'
  | '资产管理产品投资（金融机构）'
  | '股票投资'
  | string;

export interface NonBankFinancialMonthlyData {
  newInvestment: number;          // 新增投资额 (进现金流量表项“投资支付的现金”，进资产负债表项“交易性金融资产”)
  redemption: number;             // 减少投资额 (进现金流量表项“收回投资收到的现金”，进资产负债表项“交易性金融资产”（回）)
  endingInvestment: number;       // 期末投资额
  investmentIncome: number;       // 投资收益 (进利润表项“投资收益”)
  dividendInterestInflow: number; // 本年项目计划现金分红/利息资金流入 (1. 累计分红进利润表“投资收益”，利息进“财务费用-利息收入”；2. 进现金流量表“取得投资收益收到的现金”)
  avgCapitalOccupied: number;     // 平均资金占用额
  returnRatePct: number;          // 投资回报率 (%)
}

export interface NonBankFinancialInstrumentItem {
  id: string;
  seq: number;
  legalEntity: string;              // 投资主体 (法人单位, 如 甜甜圈集团公司 / 草莓慕斯公司)
  investType: NonBankInvestmentType; // 投资类型 (一级下拉框: 交易性金融资产 / 其他权益工具投资)
  productName: NonBankInvestmentProduct; // 投资产品 (二级下拉框: 债券投资/公募基金/私募基金/对外委托贷款/委托理财/金融期货衍生品/商品期货衍生品/资管产品/股票投资)
  projectName: string;              // 项目名称
  // 2026年预算情况 (基期/上年情况)
  priorAvgCapitalOccupied: number;  // 2026年平均资金占用额 (手工填写)
  priorReturnRatePct: number;       // 2026年投资回报率 (%) (手工填写)
  priorEndingInvestment: number;    // 2026年期末投资额 (手工填写)
  // 2027年各月明细 (m1 ~ m12)
  months: Record<string, NonBankFinancialMonthlyData | number>;
  // 全年合计指标
  annualNewInvestment: number;      // 全年新增投资额合计
  annualRedemption: number;         // 全年减少投资额合计
  annualEndingInvestment: number;   // 全年期末投资额
  annualInvestmentIncome: number;   // 全年投资收益合计
  annualDividendInterestInflow: number; // 全年计划现金分红/利息资金流入合计
  annualAvgCapitalOccupied: number; // 全年平均资金占用额
  annualReturnRatePct: number;      // 全年投资回报率 (%)
  budgetReturnRatePct?: number;
  notes?: string;                   // 备注
}

// ----------------------------------------------------------------------
// BF.3 融资预算明细表与汇总表 (Financing Budget Detail & Summary)
// ----------------------------------------------------------------------
export type FinancingNature = '已有' | '新增' | string;

export type FinancingFeeType = '费用化融资费用' | '资本化融资费用';

export type FinancingFundingType =
  | '流动资金借款'
  | '贷款'
  | '债券'
  | '融资租赁'
  | '供应链融资'
  | '贸易融资'
  | '其他'
  | string;

export interface FinancingMonthlyDetail {
  newFinancing: number;           // 新增融资金额 (万元)
  reduction: number;              // 减少融资金额 (万元)
  financingFee: number;           // 融资费用 (万元)
  feeType: FinancingFeeType;      // 融资费用类型 (费用化 / 资本化)
  interestPayable: number;        // 应付利息 (按月计提, 进利润表财务费用, 资产负债表其他应付款)
  interestPaid: number;           // 实付利息 (按季/期支付, 进现金流偿债支付利息)
  liquidityReclassification: number; // 当期流动性重分类金额 (一年内到期非流动负债)
}

export interface FinancingBudgetDetailItem {
  id: string;
  seq: number;
  legalEntity: string;            // 预算组织: 法人单位 (例如 甜甜圈集团公司 / 草莓慕斯公司)
  financingNature: FinancingNature; // 融资性质 (已有 / 新增)
  financingType: string;          // 融资类型 (取值域＝AB.17 融资类型字典：编码+业务名称、两级；如 XYZ-0103 流动贷款 / XYZ-0101 银行长期贷款 / XYZ-07 债券融资 / XYZ-16 内部借款；XYZ-01～XYZ-15=外部/银行类、XYZ-16～XYZ-20=集团内部类；固定值域、不可在编制表内新增值)
  fundingProduct?: string;        // 对应筹资产品细分
  // 融资信息
  openingNetBalance: number;      // 已有期初净额 (进资产负债表长期借款/一年内到期, 进现金流借款收到现金)
  interestRate: number;           // 利率 (如 0.04 表示 4%)
  term: string;                   // 期限 (如 "长期" / "1年到期" / "3年期")
  dueDate: string;                // 到期时间 (如 "20270202" / "2027-12-31")
  newFinancingAmount: number;     // 新增融资金额 (万元)
  reductionAmount: number;        // 减少 (万元)
  financingFee: number;           // 融资费用 (万元)
  feeType: FinancingFeeType;      // 融资费用类型 (费用化融资费用 / 资本化融资费用)
  // 1~12月分月明细 (月度计息付息与流向)
  months: Record<string, FinancingMonthlyDetail>;
  // 全年合计
  annualInterestPayable: number;  // 应付利息全年合计
  annualInterestPaid: number;     // 实付利息全年合计
  annualLiquidityReclassification: number; // 流动性重分类金额全年合计
  notes?: string;                 // 备注
}

// ----------------------------------------------------------------------
// BJ.C.f 内部借款预算表（融资类型固定 XYZ-16 内部借款；方向列决定分录路由）
// ----------------------------------------------------------------------
export type InternalBorrowingDirection = '借入' | '借出';

export interface InternalBorrowingMonthlyDetail {
  newAmount: number;        // 当月新增 (万元)：借入方=提款流入 / 借出方=放款流出
  repayment: number;        // 当月还本 (万元)：借入方=还本流出 / 借出方=收本流入
  interestPayable: number;  // 当月计提利息 (万元)：借入方进 6604.1 / 借出方进 6001.2 其他业务收入-内部往来
  interestPaid: number;     // 当月实付利息 (万元)：借入方=付息付现 / 借出方=收息收现 (实收利息)
  financingFee: number;     // 当月融资费用 (万元)：手续费类，费用化进 6604
}

export interface InternalBorrowingItem {
  id: string;
  seq: number;
  direction: InternalBorrowingDirection; // 借款方向 (借入 / 借出)，决定分录路由
  legalEntity: string;                    // 本方法人 (AA.2 法人组织架构)
  counterpartyEntity: string;             // 对手方法人 (AA.2 法人组织架构)
  interestRate: number;                   // 利率 (如 0.035 表示 3.5%)
  termMonths: number;                     // 期限（月）
  maturityDate: string;                   // 到期时间 (如 "2027-12-31")
  openingNetBalance: number;              // 期初净额 (上年末未偿还本金余额，万元)
  // 1~12月分月明细 (月度借还本金、计提/实付利息、融资费用)
  months: Record<string, InternalBorrowingMonthlyDetail>;
  notes?: string;                         // 备注
}

export interface FinancingSummaryProductRow {
  seq: number;
  category: string;               // 筹资类型 (银行借款 / 非银行金融机构借款 / 关联企业借款 / 融资租赁 / 应付债券 / 供应链融资 / 贸易融资 / 其他)
  productName: string;            // 筹资产品 (如 流动资金贷款 / 并购贷款 / 固定资产贷款 / 股东借款 / 应付债券-短期债券 / 应收账款融资 / 保函...)
  legalEntity?: string;           // 融资主体(法人公司) (AA.2 法人组织架构；未指定时按当前编制法人归属)
  categoryRowSpan?: number;       // 筹资类型跨行合并行数
  isCategoryFirst?: boolean;      // 是否为该筹资类型首行
  notes?: string;                 // 备注
}

// ----------------------------------------------------------------------
// AA.7 预算产品主数据 (Budget Product Master Data)
// ----------------------------------------------------------------------
export interface BudgetProductMasterItem {
  id: string;
  code: string;              // 产品编码 PRD-xxx
  name: string;              // 产品名称
  specModel: string;         // 规格型号
  productCategory: string;   // 产品类别(财)（AB.3）
  unit: string;              // 计量单位
  status?: '启用' | '停用';
  notes?: string;
}


// ----------------------------------------------------------------------
// BB.2.1 产量计划表
// ----------------------------------------------------------------------
export interface ProductionPlanItem {
  id: string;
  seq: number;
  legalEntity: string;            // 预算组织/法人
  productCode: string;            // 产品编码 (如 CP001)
  productName: string;            // 产品名称
  productCategory: string;        // 产品类别(财) (从字典读)
  subSeries?: string;             // 子系列/子系统 (如 A、B)
  productionCycleMonths?: string; // 生产周期 (如 "6个月")
  lastYearActual?: number;        // 上年实际产量 (自动带出)
  months: MonthlyBudget;          // 1~12月排产计划 (手工)
  annualTotal: number;            // 本年预算合计 (公式=m1+...+m12)
  annualTargetUnits?: number;
  unitBOMCost?: number;
  unit?: string;                  // 计量单位 (台/套/件)
  notes?: string;
}

// ----------------------------------------------------------------------
// BB.2.2 生产类存货预算表 (原材料/在制品/产成品 分月度进销存预算)
// ----------------------------------------------------------------------
export interface InventoryBudgetItem {
  id: string;
  seq: number;
  legalEntity: string;                          // 预算组织
  stockType: string;    // 存货类别
  itemCode?: string;                            // 物料/存货编码
  itemName: string;                             // 物料/产品名称
  spec?: string;                                // 规格型号 / 业务属性
  unit: string;                                 // 计量单位
  priorYearOpeningBalance?: number;             // 上年年初库存 (2026.01.01)
  priorYearIn1_10?: number;                     // 上年 1-10月累计流入 (万元)
  priorYearOut1_10?: number;                    // 上年 1-10月累计流出 (万元)
  priorYearEndBalance10?: number;               // 上年 10月末实际库存 (万元)
  priorYearIn11_12?: number;                    // 上年 11-12月预计流入 (万元)
  priorYearOut11_12?: number;                   // 上年 11-12月预计流出 (万元)
  priorYearForecastEndBalance?: number;         // 上年年末预计库存 (2026.12.31 预计，即 2027 年初)
  openingBalance: number;                       // 期初库存 (万元)
  monthlyIn: MonthlyBudget;                     // 1~12月流入 (手工填)
  monthlyOut: MonthlyBudget;                    // 1~12月流出 (手工填)
  monthlyBalance: MonthlyBudget;                // 1~12月末库存 (公式: 期初+累计流入-累计流出)
  notes?: string;
  currentYearEndingTarget?: number;
  monthsIn?: MonthlyBudget;
}

// ----------------------------------------------------------------------
// BO.3.1 预算科目余额表 (Budget Subject Ledger) 数据模型
// 软硬销售收入三口径 → 业务事件预算分录 → 逐科目月度借贷余额 → 三表取数
// ----------------------------------------------------------------------

// 业务事件类型 (预算分录来源: BB.1.2 软硬件收入与成本三口径 / BF.1 股权投资 / BF.4 税金及附加 / BF.E 科目级综合调整)
export type LedgerEventType = '收入确认' | '销售成本结转' | '收预收款' | '验收回款' | '股权投资出资' | '投资分红流入' | '其他业务收入' | '其他业务成本' | '营业外收入' | '营业外支出' | '税金计提' | '税金缴纳' | '增值税退税' | '科目综合调整';

// BF.E 科目级综合调整行数据模型
export interface SubjectAdjustmentItem {
  id: string;
  seq?: number;
  legalEntity: string;        // 所属法人公司
  subjectCode: string;        // 预算科目代码 (如 PL0101/BS0101/BS0102等)
  subjectName: string;        // 预算科目名称
  direction: '借' | '贷';     // 调整方向 (借方发生/贷方发生)
  counterpartSubject?: string;// 对方科目代码 (平账对冲科目，默认根据科目属性自动匹配或待转调控)
  annualTotal?: number;       // 全年调整发生额合计 (万元)
  months: { [month: string]: number }; // 1~12月各月调整发生额 (m1 ~ m12)
  adjustmentReason?: string;  // 调整原因与说明
  driverFactor?: string;      // 调控驱动因子
  lastUpdated?: string;       // 最后调整时间
}

// 预算分录 / 预算凭证 (业务事件驱动的单笔会计分录, 万元)
export interface BudgetLedgerEntry {
  id: string;               // 分录编号 格式: ent-{itemId}-m{月}-{seq 全局自增}
  month: number;            // 月份 1~12
  eventType: LedgerEventType; // 业务事件类型
  voucherSummary: string;   // 凭证摘要 (客户名 产品型号 业务事件)
  debitSubject: string;     // 借方科目编码 (BS0101/BS0102/...)
  debitSubjectName: string; // 借方科目名称
  creditSubject: string;    // 贷方科目编码 (BS0303/PL01xx/BS0102)
  creditSubjectName: string; // 贷方科目名称
  amount: number;           // 金额 (万元, 借贷双方相等)
  sourceFormCode: string;   // 表单来源编码 (见 data/budgetFormRegistry)
  sourceFormName: string;   // 表单来源名称
  sourceColumnCode: string; // 来源表单列编码
  sourceColumnName: string; // 来源表单列名称
  sourceItemId: string;     // 来源表单行 id
}

// 科目单月余额 (月度借方发生/贷方发生/期末余额)
export interface SubjectMonthlyBalance {
  month: number;         // 月份 1~12
  debit: number;         // 借方发生额 (万元)
  credit: number;        // 贷方发生额 (万元)
  endingBalance: number; // 月末余额 (按科目类别递推)
}

// 科目余额表行 (逐科目: 期初 + 12个月借贷余 + 全年合计 + 年末余额)
export interface SubjectBalanceRow {
  subjectCode: string;   // 科目编码 (BS0101/BS0102/BS0303/PL0101/PL0102/PL0103)
  subjectName: string;   // 科目名称
  category: '资产' | '负债' | '损益'; // 科目类别
  direction: '借' | '贷'; // 余额方向
  openingBalance: number; // 期初余额 (万元)
  monthly: SubjectMonthlyBalance[]; // 1~12月 月度借贷余额
  totalDebit: number;   // 全年借方合计 (万元)
  totalCredit: number;  // 全年贷方合计 (万元)
  endingBalance: number; // 年末余额 (万元)
}

// ----------------------------------------------------------------------
// BF.4 税金及附加预算表 (Taxes & Surcharges Budget) 数据模型
// ----------------------------------------------------------------------

export type TaxCategoryType =
  | '增值税'
  | '其中: 增值税退税'
  | '城市维护建设税'
  | '教育费附加 (含地方教育费附加)'
  | '房产税'
  | '土地使用税'
  | '印花税'
  | '其他税费'
  | '税费及附加合计(利润表口径)'
  | '企业所得税'
  | '各项税费合计(现金流口径)';

export interface TaxMonthlyDetail {
  provision: number; // 预算计提 (万元)
  payment: number;   // 缴纳预算 (万元)
}

export interface TaxBudgetItem {
  id: string;
  seq: number | string;                 // 序号 (1, 2, 3... 或合计)
  category: TaxCategoryType | string;   // 预算分类
  priorYearForecast: number | string;   // 2026年预测数 / 历史基数 (万元 / 或比率设置说明)
  entity: string;                       // 所属法人公司 (甜甜圈集团公司 / 草莓慕斯公司 / 蓝莓布丁公司 / 集团合并)
  isTotalRow?: boolean;                 // 是否为小计/合计行 (利润表口径 / 现金流口径)
  isGroupHeader?: boolean;              // 是否为分组标题 (如: 加基础表)
  rateAssumption?: string;              // 比率假设说明 (如: 比率取假设设置 7% / 5%)
  months: { [month: number]: TaxMonthlyDetail }; // 1~12月 各月计提与缴纳
  totalAnnualProvision?: number;        // 全年预算计提合计 (万元)
  totalAnnualPayment?: number;          // 全年缴纳预算合计 (万元)
  notes?: string;                       // 备注
}

// ----------------------------------------------------------------------
// 授信预算表 (Credit Line / Credit Facility Budget) 数据模型
// ----------------------------------------------------------------------

export type CreditLineType = 
  | '流动资金贷款'
  | '并购贷款'
  | '固定资产贷款'
  | '债券'
  | '供应链融资'
  | '贸易融资'
  | '其他授信'
  | '授信总额';

export interface CreditBudgetItem {
  id: string;
  seq: number;                          // 编号 (1, 2, 3...)
  financingEntity: string;              // 融资主体 (法人单位，如: 甜甜圈集团公司 / 草莓慕斯公司 / 蓝莓布丁公司)
  creditGrantingInstitution: string;    // 授信单位 (下拉选择: 招商银行 / 建设银行 / 工商银行 / 农业银行 / 中国银行 / 交通银行 / 浦发银行 / 中信银行 / 兴业银行...)
  currency: string;                     // 币种 (手工填写 -- 默认人民币, e.g. 人民币, 美元, 欧元, 港币)
  creditType: CreditLineType;           // 授信类型 (资金模块) (下拉选择: 流动资金贷款 / 并购贷款 / 固定资产贷款 / 债券 / 供应链融资 / 贸易融资 / 其他授信 / 授信总额)
  creditPeriodExpiry: string;           // 授信期限 (到期时间, 如 2027-12-31, 2028-06-30...)
  priorYearRemainingCredit: number;     // 上年末剩余授信额度 (万元, 手工填写)
  currentYearNewCredit: number;         // 本年新增授信额度 (万元, 手工填写)
  totalCredit: number;                  // 合计 (万元, 自动计算 = 剩余 + 新增)
  status?: '草稿' | '已授信批复' | '审批中' | '已生效';
  notes?: string;
}

// ----------------------------------------------------------------------
// 需求说明与表样规范 (Requirement Specs & Sample Table Mockups)
// ----------------------------------------------------------------------

export interface SampleTableHeaderCell {
  text: string;
  rowSpan?: number;
  colSpan?: number;
  bg?: string;
  color?: string;
  isYearTotal?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  bold?: boolean;
}

export interface SampleTableCell {
  text: string;
  align?: 'left' | 'center' | 'right';
  isFormula?: boolean;
  isTotal?: boolean;
  bold?: boolean;
  color?: string;
  bg?: string;
}

export interface SampleTableLayout {
  sheetTitle: string;
  formulaNote?: string;
  headerRows: SampleTableHeaderCell[][];
  bodyRows: SampleTableCell[][];
  summaryRows?: SampleTableCell[][];
  footerNotes?: string[];
}

// 预算凭证转换规则：编制表业务事件 ➔ 预算分录(凭证行)的借贷转换契约
export interface VoucherConversionRule {
  seq?: number;                 // 序号
  eventType: string;            // 业务事件类型 (如 收入确认 / 销售成本结转 / 收预收款 / 验收回款)
  sourceTrigger: string;        // 编制表来源触发字段 (如 1~12月预计销售收入)
  triggerTiming: string;        // 触发时点与月份判定规则
  debitSubject: string;         // 借方科目编码 (如 BS0102)
  debitSubjectName: string;     // 借方科目名称
  creditSubject: string;        // 贷方科目编码 (如 PL0101)
  creditSubjectName: string;    // 贷方科目名称
  amountBasis: string;          // 金额取数口径 (如 该月预计销售收入(不含税))
  voucherSummary: string;       // 凭证摘要拼接规则
  sourceColumnCode: string;     // 来源表单列编码 (如 monthlyRevenue)
  balanceImpact: string;         // 对科目余额与三表的影响
  cashFlowItems?: {              // 对现金流量表科目的影响 (讲解条目，非记账科目)
    code: string;                // CF 科目编码 (如 CF0101)
    name: string;                // CF 科目/行项目名称
    direction: '现金流入' | '现金流出' | '不涉及现金';
    basis: string;               // 金额口径与取数说明
  }[];
}

export interface ThreeStatementsImpactSpec {
  // 1. 利润表影响
  incomeStatement: {
    impactSummary: string;
    affectedSubjects: { subject: string; direction: string; formulaOrAmount?: string; note?: string }[];
    mechanism: string;
  };
  // 2. 资产负债表影响
  balanceSheet: {
    impactSummary: string;
    affectedSubjects: { subject: string; direction: string; formulaOrAmount?: string; note?: string }[];
    mechanism: string;
  };
  // 3. 现金流量表影响
  cashFlowStatement: {
    impactSummary: string;
    affectedSubjects: { subject: string; direction: string; formulaOrAmount?: string; note?: string }[];
    mechanism: string;
  };
  // 4. 三表勾稽闭环等式与核算逻辑
  reconciliationSummary?: string;
}

export interface TableSpecDoc {
  id: string;
  category: string;
  code: string;
  title: string;
  desc: string;
  demoTab: string;
  demoTabName: string;
  status?: 'verified';
  // 1. 适用情形
  applicableScenario: {
    targetEntities: string;
    businessContext: string;
    problemSolved: string;
  };
  // 2. 关键字段说明
  keyFields: {
    fieldName: string;
    fieldType: string; // 维度 / 度量 / 计算派生 / 枚举状态
    dataSource?: string; // 选择（下拉） / 手填 / 系统计算（公式） / 自动带出
    required?: string; // 是 / 否 / 系统自动生成
    description: string;
    rule: string;
  }[];
  // 3. 与其他表的输入输出关系
  ioRelations: {
    upstreamInputs: { table: string; field: string; note?: string }[];
    downstreamOutputs: { table: string; field: string; note?: string }[];
    reconciliationRules: string[];
  };
  // 4. 对财务三表(资产负债表/利润表/现金流量表)的影响与勾稽说明
  threeStatementsImpact?: ThreeStatementsImpactSpec;
  // 4.5 预算凭证转换规则 (编制表业务事件 ➔ 预算分录/凭证行 的借贷转换契约)
  voucherConversionRules?: VoucherConversionRule[];
  // 5. 真实表样 (Sample Table Mockup)
  sampleTable?: SampleTableLayout;
  // 6. 编制说明与业务逻辑规范 (OB24 逻辑说明与主数据联动体系)
  preparationGuidelines?: {
    title: string;
    rules: string[];
  }[];
  // 7. 核对检查清单
  checklist: string[];
}





