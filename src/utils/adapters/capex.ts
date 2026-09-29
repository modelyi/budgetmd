import { createMonthlyBudgetSheet, type MonthlyBudgetRowSpec } from './declarativeSheetBuilder';
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
  UnifiedBudgetAccountItem,
  BudgetAccountCodingRule,
  UNIFIED_BUDGET_ACCOUNTS,
  BUDGET_ACCOUNT_CODING_RULES,
  ExpenseBudgetSubjectItem,
  FIXED_EXPENSE_BUDGET_SUBJECTS,
  ASSET_CATEGORY_LIST,
  SupplierMasterItem,
  MaterialMasterItem,
  ADMIN_LEVEL1_DEPARTMENT_OPTIONS,
  ADMIN_LEVEL2_DEPARTMENT_OPTIONS,
  SPREADSHEET_STYLES,
  colLetter,
  TAX_RATE_ASSUMPTIONS,
  DeptAttributeMappingItem,
  OtherFixedAssetAdditionItem,
  AssetDisposalItem,
  ExistingAssetLedgerItem,
  BudgetYearItemForSheet,
  BudgetPeriodItemForSheet,
  OfficeLeaseSiteMasterItem,
  safeMonthlyValue
} from './shared';

/**
 * BB.3.1 设备采购预算 —— 对外导出入口（兼容旧调用签名），等价于 BB.3.1.A 有PO采购视角表样。
 */
export function buildCapexSheet(
  items: FixedAssetProcurementItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
) {
  return buildCapexWithPoSheet(items, org, year);
}

/**
 * BB.3.1.A 有PO-设备及无形资产采购预算（采购视角）——只含「PO标记=有PO」的采购行：
 *  ①维度=预算项目｜预算部门｜下单主体｜PO标记（本表恒为「有PO」的固定值列，不可修改）｜资产类别｜资产名称或备注｜供应商（受益主体列已按两岗接力代采购模型移除——由关联交易预算员在 BB.3.1.D 关联交易视角补填）；
 *  ②度量=到货额/下单额/预付款比例/预付款/验收付款（各按【全年合计】+1~12月展开，5×13=65 列），列结构与拆分前 BB.3.1.A 完全一致；
 *  ③有PO行按下单主体（AA.8 管理单元）与法人一一对应，直接带出归属法人，无需比例拆分；
 *  ④本表不生成会计分录，法人分录由 BB.3.1.C 财务视角按法人公司汇总生成。
 */
export function buildCapexWithPoSheet(
  items: FixedAssetProcurementItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
) {
  const withPo = items.filter((it) => String((it as any).poFlag ?? '').trim() === '有PO');
  return buildCapexLikeSheet(withPo, org, year, '资产类别', 'BB.3.1.A 有PO-设备及无形资产采购预算', false, false, true, true, '有PO');
}

/**
 * BB.3.1.B 无PO-设备及无形资产采购预算（采购视角）——只含「PO标记=无PO」的采购行：
 *  ①维度与度量与 BB.3.1.A 有PO表样完全一致（列数与列序相同），仅 PO标记 为恒为「无PO」的固定值列（不可修改）；
 *  ②无PO行无法从下单主体指认法人的，按 BAA.9.a 资产转换比例拆到法人（资本性支出法人拆分的唯一入口仍在财务视角 BB.3.1.C）；
 *  ③本表不生成会计分录，法人分录由 BB.3.1.C 财务视角按法人公司汇总生成。
 */
export function buildCapexNoPoSheet(
  items: FixedAssetProcurementItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
) {
  const noPo = items.filter((it) => String((it as any).poFlag ?? '').trim() === '无PO');
  return buildCapexLikeSheet(noPo, org, year, '资产类别', 'BB.3.1.B 无PO-设备及无形资产采购预算', false, false, true, true, '无PO');
}


/**
 * BB.3.3 物料类采购预算 —— 对外导出入口（兼容旧调用签名），等价于 BB.3.3.A 有PO采购视角表样。
 */
export function buildMaterialProcurementSheet(
  items: FixedAssetProcurementItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
) {
  return buildMaterialProcurementWithPoSheet(items, org, year);
}

/**
 * BB.3.3.A 有PO-物料类采购预算（采购视角）——只含「PO标记=有PO」的采购行，与 BB.3.1.A 同模式：
 *   ①维度=预算项目｜预算部门｜下单主体｜PO标记（本表恒为「有PO」的固定值列，不可修改）｜物料类别｜供应商（受益主体列已按两岗接力代采购模型移除——由关联交易预算员在 BB.3.3.D 关联交易视角补填）；
 *   ②度量=到货额/下单额/预付款比例/预付款/验收付款（各按【全年合计】+1~12月展开，5×13=65 列），列结构与拆分前 BB.3.3.A 完全一致
 *     （预付款比例位于每月「下单额」之后、「预付款」之前；「付款金额」列已移除，付款总额由预付款+验收付款承载，CF-05 取数=预付款+验收付款）；
 *   ③有PO行按下单主体（AA.8 管理单元）与法人一一对应，直接带出归属法人，无需比例拆分；
 *   ④数据来源（须与无PO表样互斥防重复）：采购订单导入（PO标记=有PO）；
 *   ⑤本表不生成会计分录，法人分录由 BB.3.3.C 财务视角按法人公司汇总生成。
 */
export function buildMaterialProcurementWithPoSheet(
  items: FixedAssetProcurementItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
) {
  const withPo = items.filter((it) => String((it as any).poFlag ?? '').trim() === '有PO');
  return buildCapexLikeSheet(withPo, org, year, '物料类别', 'BB.3.3.A 有PO-物料类采购预算', false, false, true, false, '有PO');
}

/**
 * BB.3.3.B 无PO-物料类采购预算（采购视角）——只含「PO标记=无PO」的采购行：
 *   ①维度与度量与 BB.3.3.A 有PO表样完全一致（列数与列序相同），仅 PO标记 为恒为「无PO」的固定值列（不可修改）；
 *   ②数据来源（须与有PO表样互斥防重复）：物料消耗采集表 BAP.2 获取（无下单的）、BAP.3 物料消耗需求汇总表_研发长期、其他手工增加；
 *   ③无PO行无法从下单主体指认法人的，按 BAA.10《进销存按法人拆分比例表》兜底拆分到法人
 *     （拆分入口在财务视角 BB.3.3.C；BAA.10 本年度不启用，兜底口径为后续年度预留）；
 *   ④本表不生成会计分录，法人分录由 BB.3.3.C 财务视角按法人公司汇总生成。
 */
export function buildMaterialProcurementNoPoSheet(
  items: FixedAssetProcurementItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
) {
  const noPo = items.filter((it) => String((it as any).poFlag ?? '').trim() === '无PO');
  return buildCapexLikeSheet(noPo, org, year, '物料类别', 'BB.3.3.B 无PO-物料类采购预算', false, false, true, false, '无PO');
}


// ─────────────────────────────────────────────────────────────────────────────
// 关联交易视角（两岗接力代采购模型的第二岗填报表）——BB.3.1.D 设备及无形资产 / BB.3.3.D 物料类
//
// 字段名：本视角「下单主体」（对外下单签约付款方）、
// 「受益主体」（实际使用方）。
// 两岗分工：采购人员编预算时在采购视角（BB.3.1.A/.B、BB.3.3.A/.B）只填下单主体、不填受益主体；
// 关联交易预算员在本视角（.D）补填受益主体；系统比对下单主体/受益主体各自关联的法人公司
// （经 AA.8 管理单元主数据的「关联法人公司」）——同法人=自购自用、不触发代采购；不同法人=跨法人代采购，
// 带出 BAA.11 加成比例、按「到货额×加成比例」测算加成款。
// 读法：本视角是代采购的填报源（两岗接力第二岗：关联交易预算员补填受益主体、系统判定代采购并登记到货额/加成款/预付款/验收付款），
//     据此生成资产平移、存货转移、内部往来、加成款与三表后续处理（分录见⑥转换规则）；BJ.C.a/BJ.C.e 为只读查询表
//     （只读镜像本视角、表样完全一致；不做业务生成、不做会计分录生成），采购自身的法人分录由 BB.3.1.C/BB.3.3.C 财务视角汇总生成。
// ─────────────────────────────────────────────────────────────────────────────

// 关联交易视角的维度列引用（下单主体/受益主体 值域=AA.8 管理单元主数据；加成比例值域=BAA.11）
const INTERCOMPANY_VIEW_MANAGEMENT_UNIT_OPTIONS = MANAGEMENT_UNITS.map((u) => u.name).join(',');
// 资产类别下拉值：与 BJ.C.e 代采购资产查询表保持同一值域（AA.9 资产类别与折旧）
const INTERCOMPANY_VIEW_ASSET_CATEGORY_OPTIONS =
  '固定资产-生产机器设备,固定资产-研发实验仪器,固定资产-电子与办公设备,固定资产-运输工具,固定资产-房屋及建筑物,固定资产-动力及辅助设施,固定资产-工具器具及模具';
// 物料类别下拉值：与 BJ.C.a 代采购物料查询表保持同一值域（AB.9 存货物料类别字典）
const INTERCOMPANY_VIEW_MATERIAL_CATEGORY_OPTIONS =
  '生产物料,研发物料,服务物料,专项储备,其他物料,自制设备用料';

/**
 * 关联交易视角（.D）月度度量装配：每月 4 个度量 = [到货额, 加成款, 预付款, 验收付款]。
 * 预付款 = 到货额×30%（对外预收比例平移）、验收付款 = 到货额−预付款（四舍五入 0.1）；
 * 同法人自购自用行（isIntercompany=false）不构成代采购、无内部转移，预付款/验收付款留 0
 * （该行对外采购的预付款/验收付款仍在采购视角 A/B 归集，本视角只读）。
 */
function buildIntercompanyViewMonthly(
  arrivals: number[],
  markupRate: number,
  isIntercompany: boolean = true
): Record<number, number[]> {
  const round1 = (x: number) => Math.round(x * 10) / 10;
  return Object.fromEntries(
    arrivals.map((amt, i) => {
      if (!isIntercompany) return [i + 1, [amt, 0, 0, 0]];
      const advance = round1(amt * 0.3);
      // 新口径：arrivals=含加成完整转移价（=下单方出库成本+加成款），加成款=完整价中加成部分=amt*rate/(1+rate)
      const markup = markupRate > 0 ? round1(amt * markupRate / (1 + markupRate)) : 0;
      return [i + 1, [amt, markup, advance, round1(amt - advance)]];
    })
  );
}

/**
 * BB.3.1.D 关联交易视角（设备及无形资产采购）——采购视角（BB.3.1.A/.B）的关联交易补填报表：
 *   ①维度（8 列，顺序固定）=序号（展示列，调研页自动剔列）｜下单主体（系统带出自采购视角）｜
 *     受益主体（关联交易预算员填报，值域 AA.8 管理单元）｜预算项目（AA.6）｜预算部门（AA.5）｜
 *     资产类别（AA.9）｜代采购对象（资产名称/备注）｜加成比例%(BAA.11带出)；
 *   ②度量（4 个，顺序固定）=到货额(万元)/加成款(万元)/预付款(万元)/验收付款(万元)（各按【全年合计】+1~12月展开）；
 *   ③判定口径：系统比对下单主体与受益主体各自关联的法人公司——
 *     同法人=自购自用、不触发代采购（加成比例留「—」、加成款 0）；不同法人=跨法人代采购，
 *     带出 BAA.11 加成比例、加成款=到货额×加成比例；
 *   ④到货额=含加成完整转移价（=下单方出库成本+加成款，即受益方固定资产入账原值，
 *     与采购视角同月同类别到货额勾稽）；资产到货月即受益方启用月、折旧只在受益方建卡计提（经 BB.4.5 来源=代采购转入）；加成部分随卡片折旧经 BB.4.5 拆入四大费用，合并层由 BO.ELIM 抵销；
 *   ⑤预付款/验收付款=下单主体对外采购的预付款与验收付款，系统带出自采购视角（BB.3.1.A/.B，预付款=到货额×30%、
 *     验收付款=到货额−预付款），本视角只读展示、不构成内部结算；同法人自购自用行留 0；
 *   ⑥本表是代采购的填报源（两岗接力第二岗），据此生成资产平移、内部往来、加成款与三表后续处理（分录见⑦转换规则）；
 *     BJ.C.e 代采购资产查询表为只读查询表（只读镜像本表，表样完全一致；不做业务生成、不做会计分录生成），
 *     采购自身的法人分录由 BB.3.1.C 财务视角按法人汇总生成。
 *
 * 入参：name 覆盖 sheet 名（BJ.C.e 代采购资产查询表镜像本表时传入）；rowsSample 覆盖示例行（省缺用内置示例）。
 */
export function buildCapexIntercompanyViewSheet(name?: string, rowsSample?: any[]): any {
  const defaultRowsSample = [
    // ① 跨法人代采购（下单主体 草莓慕斯公司 ≠ 受益主体 蓝莓蛋挞公司）：触发电采购，带出 BAA.11 加成比例 10%
    {
      dimensions: [1, '草莓慕斯-泛烘焙装备制造单元', '蓝莓蛋挞-核心制造单元', 'P1 高功率平板光纤激光切割机', '机械与电气采购部', '固定资产-生产机器设备', '生产机器设备（立式加工中心）', '10.0%'],
      monthlyValues: buildIntercompanyViewMonthly([0, 0, 200, 200, 200, 200, 100, 100, 0, 0, 0, 0], 0.1),
    },
    // ② 跨法人代采购（下单主体 甜甜圈集团公司 ≠ 受益主体 草莓慕斯公司）：带出 BAA.11 加成比例 8%
    {
      dimensions: [2, '甜甜圈集团公司', '草莓慕斯-泛烘焙装备制造单元', 'P2 三维五轴激光切管机', '研发中心本部', '固定资产-研发实验仪器', '研发实验仪器（光谱分析仪）', '8.0%'],
      monthlyValues: buildIntercompanyViewMonthly([0, 0, 0, 0, 60, 60, 60, 60, 60, 60, 60, 0], 0.08),
    },
    // ③ 同法人（下单主体 = 受益主体 = 甜甜圈集团公司）：自购自用、不触发代采购（加成比例留「—」、加成款 0，
    //    预付款/验收付款留 0——该行不构成代采购、无内部转移）
    {
      dimensions: [3, '甜甜圈集团公司', '甜甜圈集团公司', '集团统筹', '信息技术部', '固定资产-电子与办公设备', '企业级服务器集群（机房核心设备）（自购自用，不触发代采购）', '—'],
      monthlyValues: buildIntercompanyViewMonthly([30, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0], 0, false),
    },
  ];

  return createMonthlyBudgetSheet({
    name: name ?? 'BB.3.1.D 关联交易视角（设备及无形资产采购）',
    order: 2,
    dimensions: [
      { label: '序号', width: 45 },
      { label: '下单主体', width: 170 },
      { label: '受益主体', width: 170, dropdown: INTERCOMPANY_VIEW_MANAGEMENT_UNIT_OPTIONS },
      { label: '预算项目', width: 180 },
      { label: '预算部门', width: 130 },
      { label: '资产类别', width: 160, dropdown: INTERCOMPANY_VIEW_ASSET_CATEGORY_OPTIONS },
      { label: '代采购对象', width: 200 },
      { label: '加成比例%(BAA.11带出)', width: 120 },
    ],
    metrics: [
      { label: '到货额(万元)' },
      { label: '加成款(万元)' },
      { label: '预付款(万元)' },
      { label: '验收付款(万元)' },
    ],
    rows: (rowsSample && rowsSample.length > 0 ? rowsSample : defaultRowsSample) as unknown as MonthlyBudgetRowSpec[]
  });
}

/**
 * BB.3.3.D 关联交易视角（物料类采购）——采购视角（BB.3.3.A/.B）的关联交易补填报表，与 BB.3.1.D 同结构，
 * 两处差异：①「资产类别」换为「物料类别」（AB.9 存货物料类别字典，决定平价转移在 BB.3.X 进销存的存货类别归属：
 * 下单方法人该类别存货转出 − / 受益方法人同类别转入 +）；②「代采购对象」=物料名称/备注。
 *   判定口径同 BB.3.1.D：同法人=自购自用不触发；不同法人=跨法人代采购（BAA.11 加成比例、加成款=到货额×加成比例）。
 *   本表是代采购的填报源（两岗接力第二岗），据此生成存货转移、内部往来、加成款与三表后续处理（分录见⑥转换规则）；
 *   BJ.C.a 代采购物料查询表为只读查询表（只读镜像本表，表样完全一致；不做业务生成、不做会计分录生成），
 *   法人入库存货成本与付款由 BB.3.3.C 财务视角承担。
 *   与 BB.3.1.D 同结构、同度量（4 个：到货额/加成款/预付款/验收付款）；预付款=到货额×30%、验收付款=到货额−预付款，
 *   系统带出自采购视角 BB.3.3.A/.B，本视角只读展示、不构成内部结算；同法人自购自用行留 0。
 *
 * 入参：name 覆盖 sheet 名（BJ.C.a 代采购物料查询表镜像本表时传入）；rowsSample 覆盖示例行（省缺用内置示例）。
 */
export function buildMaterialProcurementIntercompanyViewSheet(name?: string, rowsSample?: any[]): any {
  const defaultRowsSample = [
    // ① 跨法人代采购（下单主体 草莓慕斯公司 ≠ 受益主体 蓝莓蛋挞公司）：触发电采购，带出 BAA.11 加成比例 10%
    {
      dimensions: [1, '草莓慕斯-泛烘焙装备制造单元', '蓝莓蛋挞-核心制造单元', 'P1 高功率平板光纤激光切割机', '机械与电气采购部', '生产物料', '高功率光纤激光切割头组件', '10.0%'],
      monthlyValues: buildIntercompanyViewMonthly([100, 100, 100, 100, 100, 0, 100, 100, 100, 100, 100, 0], 0.1),
    },
    // ② 跨法人代采购（下单主体 甜甜圈集团公司 ≠ 受益主体 草莓慕斯公司）：带出 BAA.11 加成比例 8%
    {
      dimensions: [2, '甜甜圈集团公司', '草莓慕斯-泛烘焙装备制造单元', 'P2 三维五轴激光切管机', '研发中心本部', '研发物料', '三维五轴激光切管机功能部件样件（研发试制）', '8.0%'],
      monthlyValues: buildIntercompanyViewMonthly([0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50], 0.08),
    },
    // ③ 同法人（下单主体 = 受益主体 = 甜甜圈集团公司）：自购自用、不触发代采购（加成比例留「—」、加成款 0，
    //    预付款/验收付款留 0——该行不构成代采购、无内部转移）
    {
      dimensions: [3, '甜甜圈集团公司', '甜甜圈集团公司', '集团统筹', '信息技术部', '服务物料', '机房耗材与备品备件（自购自用，不触发代采购）', '—'],
      monthlyValues: buildIntercompanyViewMonthly([20, 0, 0, 0, 20, 0, 0, 0, 20, 0, 0, 0], 0, false),
    },
  ];

  return createMonthlyBudgetSheet({
    name: name ?? 'BB.3.3.D 关联交易视角（物料类采购）',
    order: 2,
    dimensions: [
      { label: '序号', width: 45 },
      { label: '下单主体', width: 170 },
      { label: '受益主体', width: 170, dropdown: INTERCOMPANY_VIEW_MANAGEMENT_UNIT_OPTIONS },
      { label: '预算项目', width: 180 },
      { label: '预算部门', width: 130 },
      { label: '物料类别', width: 140, dropdown: INTERCOMPANY_VIEW_MATERIAL_CATEGORY_OPTIONS },
      { label: '代采购对象', width: 200 },
      { label: '加成比例%(BAA.11带出)', width: 120 },
    ],
    metrics: [
      { label: '到货额(万元)' },
      { label: '加成款(万元)' },
      { label: '预付款(万元)' },
      { label: '验收付款(万元)' },
    ],
    rows: (rowsSample && rowsSample.length > 0 ? rowsSample : defaultRowsSample) as unknown as MonthlyBudgetRowSpec[]
  });
}


/**
 * BB.3.3.C 财务视角：物料类采购预算按法人公司×预算项目×预算部门×PO标记×物料类别汇总到货额/预付款/验收付款
 * （【全年合计】+1~12月，从两张采购视角表样（BB.3.3.A 有PO / BB.3.3.B 无PO）逐笔数据汇总而来），并据此按法人公司生成本年度物料采购的会计分录。
 * 维度=法人公司｜预算项目｜预算部门｜PO标记（4 列，顺序固定：PO标记 置于 3 个业务维度之后）｜物料类别（第 5 列）；
 * 度量=到货额(万元)/预付款(万元)/验收付款(万元)（3 度量×（【全年合计】+1~12月）共 39 列，合计 5+39=44 列）。
 * PO标记为下拉维度（枚举：有PO / 无PO，非固定值列，与两张采购视角表样的固定值列不同）：区分本行金额是按下单主体直接指认法人、还是按 BAA.10 比例拆分到法人——
 *   有PO（BB.3.3.A）=按下单主体（AA.8 管理单元）直接指认归属法人（同一法人行）；无PO（BB.3.3.B）=按 BAA.10《进销存按法人拆分比例表》兜底拆分后落入各法人（同一预算项目/预算部门可能落到多个法人行）。
 * 法人指认口径：能按下单主体（AA.8 管理单元）指认到法人的，直接指认到法人（有PO行即按下单主体指认）；
 * 指认不到的部分（无PO行）才按 BAA.10 进销存按法人兜底拆分比例拆（BAA.10 本年度不启用，兜底口径为后续年度预留）
 * ——物料类采购法人拆分的唯一入口在本表，两张采购视角表样均不生成会计分录。
 * 法人归属与 BB.3.X 法人级单表（法人公司×存货类别，一表到底）的同一法人行保持一致，避免存货与采购的法人口径冲突。
 * 财务口径：物料类采购属经营采购——到货额入库（存货 1405 增加，非现金事件）；预付款与验收付款为现金流出（CF-05），
 * 其中预付款增加预付账款(1123)、验收付款减少应付账款(2202)并减少货币资金(1002)。
 */
export function buildMaterialProcurementFinanceViewSheet(): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const baseHeaders = ['法人公司', '预算项目', '预算部门', 'PO标记', '物料类别'];
  const N_BASE = baseHeaders.length; // 5
  const subMetrics = ['到货额(万元)', '预付款(万元)', '验收付款(万元)'];
  const N_MET = subMetrics.length; // 3
  const COL_SUM = N_BASE; // 全年合计起始
  const moStart = (m: number) => COL_SUM + N_MET + (m - 1) * N_MET;
  const TOTAL_COLS = moStart(13); // 5 + 3 + 36 = 44

  // 维度列（两行制 rs:2）
  baseHeaders.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });

  // 全年合计（cs:3）
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: N_MET };
  subMetrics.forEach((h, i) => {
    celldata.push({ r: 1, c: COL_SUM + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumSubHeader } });
  });

  // 1~12月（每月 cs:3）
  for (let m = 1; m <= 12; m++) {
    const base = moStart(m);
    celldata.push({ r: 0, c: base, v: { v: `${m}月`, m: `${m}月`, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${base}`] = { r: 0, c: base, rs: 1, cs: N_MET };
    subMetrics.forEach((h, i) => {
      celldata.push({ r: 1, c: base + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader } });
    });
  }

  // 示例数据（脱敏）：法人取 AA.2 法人组织架构真实值，物料类别取 AB.9 存货物料类别字典值；
  // 到货额按100%确认为验收付款，与采购视角（BB.3.3.A 有PO / BB.3.3.B 无PO）同口径。
  // PO标记：有PO（BB.3.3.A）按下单主体（AA.8 管理单元）直接指认法人（同一法人行）；
  //         无PO（BB.3.3.B）按 BAA.10 兜底比例拆分到法人（同一预算项目/预算部门可能落到多个法人行）。
  const rows = [
    { legalEntity: '草莓慕斯公司', project: 'P1 高功率平板光纤激光切割机', dept: '采购与供应链管理部', poFlag: '有PO', category: '生产物料',
      orig: { m1: 36, m2: 38, m3: 40, m4: 40, m5: 38, m6: 42, m7: 40, m8: 42, m9: 44, m10: 42, m11: 40, m12: 42 },
      adv: { m1: 12, m2: 12.6, m3: 13.2, m4: 12, m5: 12.6, m6: 13.2, m7: 12.6, m8: 13.2, m9: 13.8, m10: 13.2, m11: 12.6, m12: 13.2 } },
    { legalEntity: '芒果班戟公司', project: '产品化项目', dept: '研发中心', poFlag: '无PO', category: '研发物料',
      orig: { m1: 12, m2: 13, m3: 14, m4: 15, m5: 15, m6: 16, m7: 15, m8: 16, m9: 17, m10: 16, m11: 15, m12: 16 },
      adv: { m1: 4.5, m2: 4.8, m3: 4.5, m4: 5.1, m5: 4.8, m6: 5.4, m7: 4.8, m8: 5.1, m9: 5.4, m10: 5.1, m11: 4.8, m12: 5.1 } },
    { legalEntity: '甜甜圈集团公司', project: '集团统筹', dept: '制造工程部', poFlag: '无PO', category: '其他物料',
      orig: { m1: 8, m2: 7, m3: 8, m4: 7, m5: 8, m6: 9, m7: 8, m8: 8, m9: 9, m10: 8, m11: 7, m12: 8 },
      adv: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 } },
    { legalEntity: '蓝莓蛋挞公司', project: '集团统筹', dept: '智能制造与交付中心', poFlag: '无PO', category: '服务物料',
      orig: { m1: 5, m2: 5, m3: 5, m4: 6, m5: 5, m6: 5, m7: 5, m8: 5, m9: 6, m10: 5, m11: 5, m12: 5 },
      adv: { m1: 1.8, m2: 1.5, m3: 1.8, m4: 1.8, m5: 1.5, m6: 1.8, m7: 1.5, m8: 1.8, m9: 1.8, m10: 1.5, m11: 1.8, m12: 1.8 } },
    // 无PO 通道（同一预算项目/预算部门按 BAA.10 兜底比例拆分后落到多个法人的示例，本行为拆分后金额；
    // BAA.10 本年度不启用，示例仅示意无PO 行的法人落点）：P3 超快激光与复合加工预研 34.0 拆入 草莓慕斯 18.0 + 芒果班戟 16.0
    { legalEntity: '草莓慕斯公司', project: 'P3 超快激光与复合加工预研', dept: '研发工程部', poFlag: '无PO', category: '研发物料',
      orig: { m1: 0, m2: 5, m3: 0, m4: 0, m5: 4, m6: 0, m7: 0, m8: 5, m9: 0, m10: 0, m11: 4, m12: 0 },
      adv: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 } },
    { legalEntity: '芒果班戟公司', project: 'P3 超快激光与复合加工预研', dept: '研发工程部', poFlag: '无PO', category: '研发物料',
      orig: { m1: 0, m2: 4, m3: 0, m4: 0, m5: 4, m6: 0, m7: 0, m8: 4, m9: 0, m10: 0, m11: 4, m12: 0 },
      adv: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 } },
  ];

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  rows.forEach((row, idx) => {
    const r = idx + 2;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const er = r + 1;
    const setCell = (c: number, val: any, isNum = false, f?: string) => {
      const cell: any = { v: val, m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''), ct: { fa: isNum ? '#,##0.00' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };
    setCell(0, row.legalEntity);
    setCell(1, row.project);
    setCell(2, row.dept);
    setCell(3, row.poFlag); // PO标记（下拉维度：有PO=按下单主体指认法人 / 无PO=按 BAA.10 兜底拆分到法人）
    setCell(4, row.category);

    // 1~12月每月 3 子列（到货额/预付款/验收付款）；到货额按100%确认为验收付款
    for (let m = 1; m <= 12; m++) {
      const base = moStart(m);
      const arrival = row.orig[`m${m}`] ?? 0;
      setCell(base, arrival, true);
      setCell(base + 1, row.adv[`m${m}`] ?? 0, true);
      setCell(base + 2, arrival, true);
    }

    // 全年合计 3 子列 = SUM(12个月对应子列)
    for (let i = 0; i < N_MET; i++) {
      const refs = Array.from({ length: 12 }, (_, m) => `${colLetter(moStart(m + 1) + i)}${er}`).join(',');
      setCell(COL_SUM + i, 0, true, `=SUM(${refs})`);
    }
  });

  const columnlen: Record<number, number> = { 0: 160, 1: 220, 2: 150, 3: 90, 4: 120 };
  for (let c = COL_SUM; c < TOTAL_COLS; c++) columnlen[c] = 80;

  // ── 数据校验（下拉）：PO标记 维度（枚举：有PO/无PO，非固定值列，可修改）──
  const maxFinanceRows = Math.max(rows.length + 15, 30);
  const financeDataVerification: Record<string, any> = {};
  for (let r = 2; r < maxFinanceRows; r++) {
    financeDataVerification[`${r}_3`] = {
      type: 'dropdown', type2: null, value1: '有PO,无PO', value2: '', checked: false,
      remote: false, prohibitInput: false, hintShow: true,
      hintText: '有PO=按下单主体（AA.8 管理单元）直接指认归属法人；无PO=按 BAA.10 进销存按法人兜底拆分比例拆分到法人（同一预算项目/预算部门可能落到多个法人行；BAA.10 本年度不启用）'
    };
  }

  return {
    name: 'BB.3.3.C 财务视角',
    index: 'bb33_finance_view',
    status: 1,
    order: 6,
    row: Math.max(rows.length + 5, 10),
    column: TOTAL_COLS,
    defaultRowHeight: 28,
    defaultColWidth: 120,
    celldata,
    dataVerification: financeDataVerification,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}


export function buildInfrastructureResearchSheet(items: any[] = [], org: string = '甜甜圈集团公司', year: string = '2027') {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  // ── 维度列：预算项目、部门（默认二级部门）、法人公司、业务类型、供应商 ──
  const baseCols = ['序号', '预算项目', '部门', '法人公司', '业务类型', '供应商'];
  const postCols = ['备注说明'];

  const N_BASE  = baseCols.length;                          // 6 (c0~c5)
  const COL_OPEN = N_BASE;                                  // 6: 期初金额（单列，全年口径）
  const COL_SUM = COL_OPEN + 1;                             // 7  全年合计起始 (c7~c9)
  const moStart = (m: number) => COL_SUM + 3 + (m - 1) * 3; // 1月=c10 … 12月=c43
  const COL_NOTES = moStart(13);                            // 46 备注说明
  const TOTAL_COLS = COL_NOTES + 1;                         // 47

  // ── Row 0/1: 维度列表头 (两行制, r0 跨行合并 rs:2) ──
  baseCols.forEach((h, ci) => {
    celldata.push({
      r: 0, c: ci,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
    celldata.push({
      r: 1, c: ci,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  });

  // ── 期初金额（单列，rs:2，全年口径不展开到月）──
  const openHeader = '期初金额(万元)';
  celldata.push({ r: 0, c: COL_OPEN, v: { v: openHeader, m: openHeader, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  celldata.push({ r: 1, c: COL_OPEN, v: { v: openHeader, m: openHeader, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  merge[`0_${COL_OPEN}`] = { r: 0, c: COL_OPEN, rs: 2, cs: 1 };

  // ── Row 0: 全年合计大表头 (cs:3) ──
  for (let c = COL_SUM; c < COL_SUM + 3; c++) {
    celldata.push({
      r: 0, c,
      v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader }
    });
  }
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: 3 };

  // ── Row 0: 1月~12月大表头 (每月3列, cs:3) ──
  for (let m = 1; m <= 12; m++) {
    const colStart = moStart(m);
    for (let c = colStart; c < colStart + 3; c++) {
      celldata.push({
        r: 0, c,
        v: { v: `${m}月`, m: `${m}月`, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader }
      });
    }
    merge[`0_${colStart}`] = { r: 0, c: colStart, rs: 1, cs: 3 };
  }

  // ── 末尾列: 备注说明 (r0 跨行合并 rs:2) ──
  postCols.forEach((h, idx) => {
    const ci = COL_NOTES + idx;
    celldata.push({
      r: 0, c: ci,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
    celldata.push({
      r: 1, c: ci,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  });

  // ── Row 1: 度量子表头 (验收额 / 付款额 / 转固金额) ──
  const subMetrics = ['验收额', '付款额', '转固金额'];
  subMetrics.forEach((h, i) => {
    celldata.push({
      r: 1, c: COL_SUM + i,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumSubHeader }
    });
  });
  for (let m = 1; m <= 12; m++) {
    subMetrics.forEach((h, i) => {
      celldata.push({
        r: 1, c: moStart(m) + i,
        v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader }
      });
    });
  }

  // ── 数据行 ──
  items.forEach((item: any, rowIdx: number) => {
    const r = rowIdx + 2;
    const setCell = (c: number, val: any, isNum: boolean = false, fmt: string = 'General', f?: string) => {
      const cellObj: any = {
        ct: { fa: fmt, t: isNum ? 'n' : 'g' },
        v: val,
        m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''),
        ht: isNum ? 2 : 1,
        vt: 1
      };
      if (f) cellObj.f = f;
      celldata.push({ r, c, v: cellObj });
    };

    setCell(0, rowIdx + 1, true, '#,##0');
    setCell(1, item.budgetProject ?? '');                                     // 预算项目 (AA.6)
    setCell(2, item.department ?? '');                                       // 部门 (AA.5，默认二级部门)
    setCell(3, item.entity ?? '');                                           // 法人公司 (AA.2)
    setCell(4, item.infraType ?? '');                                        // 业务类型 (土建/装修/土地购买)
    setCell(5, item.supplier ?? '');                                         // 供应商 (AA.10，下拉，非必输)
    setCell(COL_OPEN, item.openingAmount ?? 0, true, '#,##0.00');              // 期初金额（基建在建工程年初余额）

    // 12个月度量: 验收额 / 付款额 / 转固金额
    for (let m = 1; m <= 12; m++) {
      const mData = item.months ? (item.months as any)[`m${m}`] : null;
      const colStart = moStart(m);
      setCell(colStart,     mData?.acceptanceAmount || 0, true, '#,##0.00');
      setCell(colStart + 1, mData?.paymentAmount || 0,    true, '#,##0.00');
      setCell(colStart + 2, mData?.transferAmount || 0,   true, '#,##0.00');
    }

    // 全年合计 =SUM(12个对应月度列)
    const er = r + 1;
    const sumRefs = (offset: number) =>
      Array.from({ length: 12 }, (_, i) => `${colLetter(moStart(i + 1) + offset)}${er}`).join(',');
    setCell(COL_SUM,     item.totalAcceptanceAmount || 0, true, '¥#,##0.00', `=SUM(${sumRefs(0)})`);
    setCell(COL_SUM + 1, item.totalPaymentAmount || 0,    true, '¥#,##0.00', `=SUM(${sumRefs(1)})`);
    setCell(COL_SUM + 2, item.totalTransferAmount || 0,   true, '¥#,##0.00', `=SUM(${sumRefs(2)})`);

    setCell(COL_NOTES, item.notes || '');
  });

  // ── 列宽 ──
  const columnlen: Record<number, number> = {
    0: 45, 1: 150, 2: 110, 3: 120, 4: 110, 5: 130, [COL_OPEN]: 130
  };
  for (let c = COL_SUM; c < COL_NOTES; c++) columnlen[c] = 85;
  columnlen[COL_NOTES] = 140;

  // ── 数据校验（下拉，仅维度列，度量列不接校验）──
  const maxRows = Math.max(items.length + 15, 30);
  const dataVerification: Record<string, any> = {};
  const mkDv = (val: string) => ({ type: 'dropdown', type2: null, value1: val, value2: '', checked: false, remote: false, prohibitInput: false, hintShow: false, hintText: '' });
  const budgetProjectOptions = BUDGET_PROJECT_MASTER_DATA
    .map((p: any) => p.name)
    .filter(Boolean)
    .join(',');
  const entityOptions = LEGAL_ENTITIES.map((e: any) => e.name).filter(Boolean).join(',');
  const dropdownCols = [
    { col: 1, val: budgetProjectOptions },            // 预算项目 (AA.6)
    { col: 2, val: ADMIN_LEVEL2_DEPARTMENT_OPTIONS }, // 部门 (AA.5，默认二级部门)
    { col: 3, val: entityOptions },                   // 法人公司 (AA.2)
    { col: 4, val: '土建,装修,土地购买' },              // 业务类型
    { col: 5, val: SUPPLIER_MASTER_DATA.filter((s: any) => s.status !== '停用').map((s: any) => s.name).filter(Boolean).join(',') }, // 供应商 (AA.10，下拉，非必输)
  ];
  for (let r = 2; r < maxRows; r++) {
    dropdownCols.forEach(({ col, val }) => {
      dataVerification[`${r}_${col}`] = mkDv(val);
    });
  }

  return {
    name: 'BB.3.2 基建工程采购预算',
    index: 6,
    status: 0,
    order: 6,
    row: maxRows,
    column: TOTAL_COLS,
    celldata,
    dataVerification,
    config: {
      merge,
      rowlen: { 0: 32, 1: 36 },
      columnlen,
      frozen: { type: 'both', range: { row_focus: 2, column_focus: N_BASE } }
    }
  };
}


/**
 * BB.3.2 附表：基建转固明细表 (buildInfrastructureTransferSheet)
 * 参照 BB.4.1.d 自制设备转固明细表逻辑：
 * 维度=序号、预算项目(基建工程)、部门、法人公司、转固月份、资产类别；度量=原值；末列=资产描述（文本，仅人眼识别转固资产）。
 * 末列「资产描述」=转固资产的描述（建筑物/工程名称、用途），仅用于人眼识别，不参与任何测算与分录，
 * 与 BB.4.1.d/BB.4.3/BB.4.4.b/BB.4.5 的资产描述同口径。单行制表头，用户直接填报。
 */
export function buildInfrastructureTransferSheet(items: InfrastructureTransferItem[] = []) {
  const celldata: any[] = [];
  const headers = ['序号', '预算项目(基建工程)', '部门', '法人公司', '转固月份', '资产类别', '原值(万元)', '资产描述'];
  const entityOptions = LEGAL_ENTITIES.map((e: any) => e.name).filter(Boolean).join(',');

  headers.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  });

  const defaultItems: InfrastructureTransferItem[] = items.length > 0 ? items : [
    { id: '1', seq: 1, budgetProject: '总部大楼智能化改造项目', department: '基建工程部', entity: '甜甜圈集团公司', transferMonth: '9月', assetCategory: '固定资产-房屋及建筑物', originalValue: 350, assetDesc: '总部大楼智能化改造（一期土建与装饰工程）' },
    { id: '2', seq: 2, budgetProject: '总部大楼智能化改造项目', department: '基建工程部', entity: '甜甜圈集团公司', transferMonth: '12月', assetCategory: '固定资产-动力及辅助设施', originalValue: 210, assetDesc: '总部大楼智能化改造（二期电力增容与消防工程）' }
  ];

  defaultItems.forEach((it, idx) => {
    const r = idx + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false) => {
      celldata.push({
        r, c,
        v: {
          v: isNum ? Number(val) : String(val ?? ''),
          m: isNum ? Number(val).toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''),
          ct: { fa: isNum ? '¥#,##0.00' : 'General', t: isNum ? 'n' : 'g' },
          ht: isNum ? 2 : 1, vt: 1, bg: rowBg
        }
      });
    };
    setCell(0, idx + 1, true);
    setCell(1, it.budgetProject || '总部大楼智能化改造项目');
    setCell(2, it.department || '');
    setCell(3, it.entity || '');
    setCell(4, it.transferMonth || '');
    setCell(5, it.assetCategory || '');
    setCell(6, it.originalValue || 0, true);
    setCell(7, it.assetDesc || '');
  });

  const maxRows = Math.max(defaultItems.length + 15, 25);
  const dataVerification: Record<string, any> = {};
  const assetCategoryOptions = ASSET_CATEGORY_LIST.map((a: any) => a.categoryName || a.name).filter(Boolean).join(',');
  for (let r = 1; r < maxRows; r++) {
    dataVerification[`${r}_2`] = { type: 'dropdown', type2: null, value1: ADMIN_LEVEL2_DEPARTMENT_OPTIONS };
    dataVerification[`${r}_3`] = { type: 'dropdown', type2: null, value1: entityOptions };
    dataVerification[`${r}_4`] = { type: 'dropdown', type2: null, value1: '1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月' };
    dataVerification[`${r}_5`] = { type: 'dropdown', type2: null, value1: assetCategoryOptions };
  }

  return {
    name: 'BB.3.2.b 基建转固明细表',
    index: 7,
    status: 0,
    order: 7,
    row: maxRows,
    column: headers.length,
    celldata,
    dataVerification,
    config: {
      rowlen: { 0: 32 },
      columnlen: { 0: 50, 1: 180, 2: 140, 3: 150, 4: 100, 5: 140, 6: 130, 7: 200 },
      frozen: { type: 'both', range: { row_focus: 1, column_focus: 4 } }
    }
  };
}


/**
 * BB.4.1 自制设备预算 (buildSelfBuiltCipSheet)
 * 主表：维度=预算部门；度量=期初金额(全年单列，不按月展开) + 人工投入(取自BB.5.1自制在建工程)/领料投入/转固转出
 *   （全年合计+1~12月展开，两行制表头：全年合计(cs:3) + 1~12月(每月cs:3)）
 * 列结构（45 列）=序号/预算项目(自制设备)/法人公司/预算部门/备注（第4列，项目级备注，仅人眼阅读）
 *   + 期初金额(万元) + 3度量×13 + 末列备注说明（行级补充说明）。
 *   第4列「备注」=项目级备注、末列「备注说明」=行级补充说明，两者位置不同、含义不同，不合并。
 * 附表一：自制设备转固明细表（buildSelfBuiltCipTransferSheet）——维度=法人公司/预算部门/转固月份/资产类别/资产描述，度量=原值（转固分录按法人公司汇总生成）
 * 附表二：自制设备领料投入明细表（buildSelfBuiltMaterialDetailSheet）——维度=法人公司/预算部门/物料名称/物料类别，度量=领料金额（领料分录按法人公司汇总生成）
 * 三表通过同一编码 BB.4.1 的多 sheet 机制（Tab切换）呈现，不新建独立编码。
 */
export function buildSelfBuiltCipSheet(
  items: SelfBuiltCipBudgetItem[],
  _org: string = '甜甜圈集团公司',
  year: string = '2027'
) {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const baseCols = ['序号', '预算项目(自制设备)', '法人公司', '预算部门', '备注'];
  const N_BASE = baseCols.length; // 5
  const COL_OPEN = N_BASE;        // 6: 期初金额（单列，全年口径）
  const COL_SUM = COL_OPEN + 1;   // 7: 全年合计起始（3个子度量）
  const METRICS = ['人工投入', '领料投入', '转固转出'];
  const N_METRICS = METRICS.length; // 3
  const moStart = (m: number) => COL_SUM + N_METRICS + (m - 1) * N_METRICS; // 1月起始列
  const COL_NOTES = moStart(13); // 12月结束后的备注列
  const TOTAL_COLS = COL_NOTES + 1;

  // ── Row 0/1: 维度列（两行制，rs:2）──
  baseCols.forEach((h, ci) => {
    celldata.push({ r: 0, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  });

  // ── 期初金额（单列，rs:2，全年口径不展开到月）──
  const openHeader = '期初金额(万元)';
  celldata.push({ r: 0, c: COL_OPEN, v: { v: openHeader, m: openHeader, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  celldata.push({ r: 1, c: COL_OPEN, v: { v: openHeader, m: openHeader, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  merge[`0_${COL_OPEN}`] = { r: 0, c: COL_OPEN, rs: 2, cs: 1 };

  // ── 全年合计大表头（cs:3）──
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: N_METRICS };
  METRICS.forEach((h, i) => {
    celldata.push({ r: 1, c: COL_SUM + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumSubHeader } });
  });

  // ── 1~12月大表头（每月cs:3）──
  for (let m = 1; m <= 12; m++) {
    const colStart = moStart(m);
    const label = `${m}月`;
    celldata.push({ r: 0, c: colStart, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${colStart}`] = { r: 0, c: colStart, rs: 1, cs: N_METRICS };
    METRICS.forEach((h, i) => {
      celldata.push({ r: 1, c: colStart + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader } });
    });
  }

  // ── 备注说明（rs:2）──
  celldata.push({ r: 0, c: COL_NOTES, v: { v: '备注说明', m: '备注说明', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  celldata.push({ r: 1, c: COL_NOTES, v: { v: '备注说明', m: '备注说明', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  merge[`0_${COL_NOTES}`] = { r: 0, c: COL_NOTES, rs: 2, cs: 1 };

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  const defaultItems = items.length > 0 ? items : [
    {
      id: '1', seq: 1, legalEntity: '甜甜圈集团公司', department: '制造工程部', remark: '烘焙生产线自动化升级改造（自制整线及配套装置）', openingAmount: 150,
      months: {
        m1: { laborInput: 20, materialInput: 15, capitalizeOut: 0 },
        m2: { laborInput: 25, materialInput: 20, capitalizeOut: 0 },
        m3: { laborInput: 25, materialInput: 20, capitalizeOut: 0 },
        m4: { laborInput: 30, materialInput: 25, capitalizeOut: 0 },
        m5: { laborInput: 30, materialInput: 25, capitalizeOut: 0 },
        m6: { laborInput: 25, materialInput: 30, capitalizeOut: 180 },
        m7: { laborInput: 20, materialInput: 15, capitalizeOut: 0 },
        m8: { laborInput: 15, materialInput: 10, capitalizeOut: 0 },
        m9: { laborInput: 10, materialInput: 10, capitalizeOut: 0 },
        m10: { laborInput: 10, materialInput: 5, capitalizeOut: 0 },
        m11: { laborInput: 5, materialInput: 5, capitalizeOut: 0 },
        m12: { laborInput: 5, materialInput: 5, capitalizeOut: 120 },
      },
      notes: '烘焙生产线自动化升级改造（人工投入直接取自BB.5.1雇员费用）'
    }
  ];

  // ── 数据行 ──
  defaultItems.forEach((it, idx) => {
    const r = idx + 2;
    const excelRow = r + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, fmt = '¥#,##0.00', f?: string) => {
      const cell: any = {
        v: isNum ? Number(val) : String(val ?? ''),
        m: isNum ? (typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val)) : String(val ?? ''),
        ct: { fa: isNum ? fmt : 'General', t: isNum ? 'n' : 'g' },
        ht: isNum ? 2 : 1, vt: 1, bg: rowBg
      };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };

    setCell(0, idx + 1, true, '0');
    setCell(1, it.budgetProject || '烘焙自动化升级改造项目');
    setCell(2, it.legalEntity || _org || '甜甜圈集团公司');
    setCell(3, it.department || '');
    setCell(4, it.remark || '');
    setCell(COL_OPEN, it.openingAmount || 0, true);

    // 各月三度量
    for (let m = 1; m <= 12; m++) {
      const monthly = (it.months as any)?.[`m${m}`] || {};
      setCell(moStart(m), monthly.laborInput || 0, true);
      setCell(moStart(m) + 1, monthly.materialInput || 0, true);
      setCell(moStart(m) + 2, monthly.capitalizeOut || 0, true);
    }

    // 全年合计（三个子度量各自 SUM 各月）
    for (let i = 0; i < N_METRICS; i++) {
      const monthCols = Array.from({ length: 12 }, (_, m) => `${colLetter(moStart(m + 1) + i)}${excelRow}`);
      setCell(COL_SUM + i, 0, true, '¥#,##0.00', `=${monthCols.join('+')}`);
    }

    setCell(COL_NOTES, it.notes || '');
  });

  const columnlen: Record<number, number> = { 0: 50, 1: 180, 2: 140, 3: 130, 4: 220, [COL_OPEN]: 130 };
  for (let c = COL_SUM; c < COL_NOTES; c++) columnlen[c] = 95;
  columnlen[COL_NOTES] = 220;

  const maxRows = Math.max(defaultItems.length + 15, 25);
  const dataVerification: Record<string, any> = {};
  for (let r = 2; r < maxRows; r++) {
    dataVerification[`${r}_2`] = { type: 'dropdown', type2: null, value1: '甜甜圈集团公司,草莓慕斯公司,蓝莓蛋挞公司,芒果班戟公司,西瓜泡芙公司,抹茶曲奇公司,樱桃华夫公司,椰香可露丽公司,海盐芝士公司,蜜桃千层公司,香橙舒芙蕾公司,青提马卡龙公司' };
    dataVerification[`${r}_3`] = { type: 'dropdown', type2: null, value1: ADMIN_LEVEL2_DEPARTMENT_OPTIONS };
  }

  return {
    name: 'BB.4.1.a 自制设备工程预算汇总表',
    index: 7,
    status: 1,
    order: 7,
    row: maxRows,
    column: TOTAL_COLS,
    celldata,
    dataVerification,
    config: {
      merge,
      rowlen: { 0: 32, 1: 36 },
      columnlen,
      frozen: { type: 'both', range: { row_focus: 2, column_focus: N_BASE } }
    }
  };
}


/**
 * BB.4.1 附表：自制设备转固明细表 (buildSelfBuiltCipTransferSheet)
 * 维度=法人公司、预算部门、转固月份、资产类别、资产描述（末列，文本，仅人眼识别转固资产）；度量=原值。单行制表头，用户直接填报。
 * 「法人公司」列位于「预算项目(自制设备)」之后、「预算部门」之前，与主表 BB.4.1.a / 附表 BB.4.1.b 一致；
 * 「资产描述」与 BB.4.3/BB.4.4.b/BB.4.5 同口径（转固资产描述：设备名称/规格/用途，不参与任何测算与分录）。
 * 转固分录（借1601固定资产/贷1604在建工程）按法人公司汇总生成。
 */
export function buildSelfBuiltCipTransferSheet(
  items: SelfBuiltCipTransferItem[] = []
) {
  const celldata: any[] = [];
  const headers = ['序号', '预算项目(自制设备)', '法人公司', '预算部门', '转固月份', '资产类别', '原值(万元)', '资产描述'];

  headers.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  });

  const defaultItems = items.length > 0 ? items : [
    { id: '1', seq: 1, budgetProject: '烘焙自动化升级改造项目', legalEntity: '甜甜圈集团公司', department: '制造工程部', transferMonth: '6月', assetCategory: '固定资产-生产机器设备', originalValue: 180, assetDesc: '自制烘焙机组自动化整线（一期自制整线设备）' },
    { id: '2', seq: 2, budgetProject: '烘焙自动化升级改造项目', legalEntity: '甜甜圈集团公司', department: '制造工程部', transferMonth: '12月', assetCategory: '固定资产-电子与办公设备', originalValue: 120, assetDesc: '自动化控制系统（二期，含PLC与上位机软件）' }
  ];

  defaultItems.forEach((it, idx) => {
    const r = idx + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false) => {
      celldata.push({
        r, c,
        v: {
          v: isNum ? Number(val) : String(val ?? ''),
          m: isNum ? Number(val).toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''),
          ct: { fa: isNum ? '¥#,##0.00' : 'General', t: isNum ? 'n' : 'g' },
          ht: isNum ? 2 : 1, vt: 1, bg: rowBg
        }
      });
    };
    setCell(0, idx + 1, true);
    setCell(1, it.budgetProject || '烘焙自动化升级改造项目');
    setCell(2, it.legalEntity || '');
    setCell(3, it.department || '');
    setCell(4, it.transferMonth || '');
    setCell(5, it.assetCategory || '');
    setCell(6, it.originalValue || 0, true);
    setCell(7, it.assetDesc || '');
  });

  const maxRows = Math.max(defaultItems.length + 15, 25);
  const dataVerification: Record<string, any> = {};
  const assetCategoryOptions = ASSET_CATEGORY_LIST.map((a: any) => a.categoryName || a.name).filter(Boolean).join(',');
  const entityOptions = LEGAL_ENTITIES.map((e: any) => e.name).filter(Boolean).join(',');
  for (let r = 1; r < maxRows; r++) {
    dataVerification[`${r}_2`] = { type: 'dropdown', type2: null, value1: entityOptions };
    dataVerification[`${r}_3`] = { type: 'dropdown', type2: null, value1: ADMIN_LEVEL2_DEPARTMENT_OPTIONS };
    dataVerification[`${r}_4`] = { type: 'dropdown', type2: null, value1: '1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月' };
    dataVerification[`${r}_5`] = { type: 'dropdown', type2: null, value1: assetCategoryOptions };
  }

  return {
    name: 'BB.4.1.d 自制设备转固明细表',
    index: 10,
    status: 0,
    order: 10,
    row: maxRows,
    column: headers.length,
    celldata,
    dataVerification,
    config: {
      rowlen: { 0: 32 },
      columnlen: { 0: 50, 1: 180, 2: 140, 3: 140, 4: 100, 5: 140, 6: 130, 7: 200 },
      frozen: { type: 'both', range: { row_focus: 1, column_focus: 4 } }
    }
  };
}


export function buildSelfBuiltLaborDetailSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const baseCols = ['序号', '预算项目(自制设备)', '法人公司', '预算部门', '岗位/工种'];
  const N_BASE = baseCols.length; // 5
  const COL_SUM = N_BASE;         // 5: 全年合计
  const moStart = (m: number) => COL_SUM + 1 + (m - 1); // 1月起始列
  const COL_NOTES = moStart(13);  // 18: 备注说明
  const TOTAL_COLS = COL_NOTES + 1;

  // 维度列（rs:2）
  baseCols.forEach((h, ci) => {
    celldata.push({ r: 0, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  });

  // 全年合计（rs:2，单列）
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  celldata.push({ r: 1, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 2, cs: 1 };

  // 1~12月（rs:2，每月单列）
  for (let m = 1; m <= 12; m++) {
    const label = `${m}月(万元)`;
    const col = moStart(m);
    celldata.push({ r: 0, c: col, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c: col, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${col}`] = { r: 0, c: col, rs: 2, cs: 1 };
  }

  // 备注说明（rs:2）
  celldata.push({ r: 0, c: COL_NOTES, v: { v: '备注说明', m: '备注说明', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  celldata.push({ r: 1, c: COL_NOTES, v: { v: '备注说明', m: '备注说明', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  merge[`0_${COL_NOTES}`] = { r: 0, c: COL_NOTES, rs: 2, cs: 1 };

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  const defaultItems = items.length > 0 ? items : [
    {
      seq: 1, budgetProject: '烘焙自动化升级改造项目', legalEntity: '甜甜圈集团公司', department: '制造工程部', position: '机械自动化工程师',
      months: { m1: { amount: 12 }, m2: { amount: 15 }, m3: { amount: 15 }, m4: { amount: 18 }, m5: { amount: 18 }, m6: { amount: 15 }, m7: { amount: 12 }, m8: { amount: 9 }, m9: { amount: 6 }, m10: { amount: 6 }, m11: { amount: 3 }, m12: { amount: 3 } },
      notes: '生产线机械结构设计与组装调试'
    },
    {
      seq: 2, budgetProject: '烘焙自动化升级改造项目', legalEntity: '甜甜圈集团公司', department: '制造工程部', position: '电气控制及PLC工程师',
      months: { m1: { amount: 8 }, m2: { amount: 10 }, m3: { amount: 10 }, m4: { amount: 12 }, m5: { amount: 12 }, m6: { amount: 10 }, m7: { amount: 8 }, m8: { amount: 6 }, m9: { amount: 4 }, m10: { amount: 4 }, m11: { amount: 2 }, m12: { amount: 2 } },
      notes: '控制系统编程与联调'
    }
  ];

  defaultItems.forEach((it: any, idx: number) => {
    const r = idx + 2;
    const er = r + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, f?: string) => {
      const v: any = {
        v: isNum ? Number(val) : String(val ?? ''),
        m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''),
        ct: { fa: isNum ? '#,##0.00' : 'General', t: isNum ? 'n' : 'g' },
        bg: rowBg,
        ht: isNum ? 2 : 1,
        vt: 1
      };
      if (f) v.f = f;
      celldata.push({ r, c, v });
    };

    setCell(0, idx + 1, true);
    setCell(1, it.budgetProject ?? '烘焙自动化升级改造项目');
    setCell(2, it.legalEntity ?? '甜甜圈集团公司');
    setCell(3, it.department ?? '');
    setCell(4, it.position ?? '');

    for (let m = 1; m <= 12; m++) {
      const amt = it.months?.[`m${m}`]?.amount ?? 0;
      setCell(moStart(m), amt, true);
    }

    const monthCols = Array.from({ length: 12 }, (_, m) => `${colLetter(moStart(m + 1))}${er}`);
    setCell(COL_SUM, 0, true, `=SUM(${monthCols.join(',')})`);
    setCell(COL_NOTES, it.notes ?? '');
  });

  const maxRows = Math.max(defaultItems.length + 15, 25);
  const columnlen: Record<number, number> = { 0: 45, 1: 180, 2: 140, 3: 130, 4: 160, [COL_SUM]: 110 };
  for (let m = 1; m <= 12; m++) columnlen[moStart(m)] = 90;
  columnlen[COL_NOTES] = 180;

  return {
    name: 'BB.4.1.b 人工投入明细表',
    index: 8,
    status: 0,
    order: 8,
    row: maxRows,
    column: TOTAL_COLS,
    celldata,
    config: {
      merge,
      rowlen: { 0: 32, 1: 24 },
      columnlen,
      frozen: { type: 'both', range: { row_focus: 2, column_focus: N_BASE } }
    }
  };
}


export function buildSelfBuiltMaterialDetailSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const baseCols = ['序号', '预算项目(自制设备)', '法人公司', '预算部门', '物料名称', '物料类别'];
  const N_BASE = baseCols.length; // 6
  const COL_SUM = N_BASE;         // 6: 全年合计
  const moStart = (m: number) => COL_SUM + 1 + (m - 1); // 1月起始列
  const COL_NOTES = moStart(13);  // 19: 备注说明
  const TOTAL_COLS = COL_NOTES + 1;

  // 维度列（rs:2）
  baseCols.forEach((h, ci) => {
    celldata.push({ r: 0, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  });

  // 全年合计（rs:2，单列）
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  celldata.push({ r: 1, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 2, cs: 1 };

  // 1~12月（rs:2，每月单列）
  for (let m = 1; m <= 12; m++) {
    const label = `${m}月(万元)`;
    const col = moStart(m);
    celldata.push({ r: 0, c: col, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c: col, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${col}`] = { r: 0, c: col, rs: 2, cs: 1 };
  }

  // 备注说明（rs:2）
  celldata.push({ r: 0, c: COL_NOTES, v: { v: '备注说明', m: '备注说明', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  celldata.push({ r: 1, c: COL_NOTES, v: { v: '备注说明', m: '备注说明', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  merge[`0_${COL_NOTES}`] = { r: 0, c: COL_NOTES, rs: 2, cs: 1 };

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  const defaultItems = items.length > 0 ? items : [
    {
      seq: 1, budgetProject: '烘焙自动化升级改造项目', legalEntity: '甜甜圈集团公司', department: '制造工程部', materialCode: 'MAT-CIP-001', materialName: '伺服电机及驱动总成',
      months: { m1: { amount: 10 }, m2: { amount: 12 }, m3: { amount: 12 }, m4: { amount: 15 }, m5: { amount: 15 }, m6: { amount: 20 }, m7: { amount: 10 }, m8: { amount: 6 }, m9: { amount: 6 }, m10: { amount: 3 }, m11: { amount: 3 }, m12: { amount: 3 } },
      notes: '核心驱动电机'
    },
    {
      seq: 2, budgetProject: '烘焙自动化升级改造项目', legalEntity: '甜甜圈集团公司', department: '制造工程部', materialCode: 'MAT-CIP-002', materialName: 'PLC及工控触摸屏套件',
      months: { m1: { amount: 5 }, m2: { amount: 8 }, m3: { amount: 8 }, m4: { amount: 10 }, m5: { amount: 10 }, m6: { amount: 10 }, m7: { amount: 5 }, m8: { amount: 4 }, m9: { amount: 4 }, m10: { amount: 2 }, m11: { amount: 2 }, m12: { amount: 2 } },
      notes: '控制系统配件'
    }
  ];

  // 数据行
  defaultItems.forEach((it: any, idx: number) => {
    const r = idx + 2;
    const er = r + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, f?: string) => {
      const v: any = { v: isNum ? Number(val) : String(val ?? ''), m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''), ct: { fa: isNum ? '#,##0.00' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 };
      if (f) v.f = f;
      celldata.push({ r, c, v });
    };
    setCell(0, idx + 1, true);
    setCell(1, it.budgetProject ?? '烘焙自动化升级改造项目');
    setCell(2, it.legalEntity ?? '');
    setCell(3, it.department ?? '');
    setCell(4, it.materialName ?? '');
    setCell(5, it.materialCategory ?? '自制设备用料');
    for (let m = 1; m <= 12; m++) {
      setCell(moStart(m), it.months?.[`m${m}`]?.amount ?? (typeof it.months?.[`m${m}`] === 'number' ? it.months?.[`m${m}`] : 0), true);
    }
    // 全年合计 = SUM(1~12月)
    const refs = Array.from({ length: 12 }, (_, i) => `${colLetter(moStart(i + 1))}${er}`).join(',');
    setCell(COL_SUM, 0, true, `=SUM(${refs})`);
    setCell(COL_NOTES, it.notes ?? '');
  });

  const maxRows = Math.max(defaultItems.length + 15, 25);
  const dataVerification: Record<string, any> = {};
  const entityOptions = LEGAL_ENTITIES.map((e: any) => e.name).filter(Boolean).join(',');
  for (let r = 2; r < maxRows; r++) {
    dataVerification[`${r}_2`] = { type: 'dropdown', type2: null, value1: entityOptions };
    dataVerification[`${r}_3`] = { type: 'dropdown', type2: null, value1: ADMIN_LEVEL2_DEPARTMENT_OPTIONS };
  }

  const columnlen: Record<number, number> = { 0: 45, 1: 180, 2: 140, 3: 130, 4: 160, 5: 140, [COL_SUM]: 110 };
  for (let m = 1; m <= 12; m++) columnlen[moStart(m)] = 90;
  columnlen[COL_NOTES] = 160;

  return {
    name: 'BB.4.1.c 领料投入明细',
    index: 9, status: 0, order: 9,
    row: maxRows,
    column: TOTAL_COLS,
    celldata,
    dataVerification,
    config: {
      merge,
      rowlen: { 0: 32, 1: 32 },
      columnlen,
      frozen: { type: 'both', range: { row_focus: 2, column_focus: N_BASE } }
    }
  };
}


export function buildOtherFixedAssetAdditionSheet(items: OtherFixedAssetAdditionItem[] = []): any {
  const displayItems = items;
  const rows: MonthlyBudgetRowSpec[] = displayItems.map(it => {
    const monthlyValues: Record<number, number[]> = {};
    for (let m = 1; m <= 12; m++) {
      monthlyValues[m] = [
        it.months?.[`m${m}`] ?? 0,
        it.monthlyPrepayment?.[`m${m}`] ?? 0,
        it.monthlyPayment?.[`m${m}`] ?? 0,
      ];
    }
    return {
      dimensions: [
        it.budgetProject ?? '',
        it.legalEntity ?? '',
        it.budgetDepartment ?? '',
        it.assetDesc ?? '',
        it.assetCategory ?? '',
        it.notes ?? '',
      ],
      monthlyValues,
    };
  });

  return createMonthlyBudgetSheet({
    name: 'BB.4.3 其他固定资产新增表',
    dimensions: [
      { label: '预算项目', width: 140 },
      { label: '法人公司', width: 140, dropdown: LEGAL_ENTITIES.map(e => e.name).join(',') },
      { label: '预算部门', width: 140 },
      { label: '资产描述', width: 200 },
      { label: '资产类别', width: 140, dropdown: ASSET_CATEGORY_LIST.filter((c: any) => c.status !== '停用').map((c: any) => `${c.parentCategory}-${c.categoryName}`).join(',') },
      { label: '说明', width: 220 },
    ],
    metrics: [
      { label: '资产原值(万元)' },
      { label: '预付款(万元)' },
      { label: '付款(万元)' },
    ],
    rows,
  });
}


export function buildAssetDisposalSheet(items: AssetDisposalItem[] = []): any {
  const displayItems = items;
  const rows: MonthlyBudgetRowSpec[] = displayItems.map(it => {
    const monthlyValues: Record<number, number[]> = {};
    for (let m = 1; m <= 12; m++) {
      const mo: any = it.months?.[`m${m}`] ?? {};
      const ov = Number(mo.originalValue ?? 0);
      const ad = Number(mo.accumulatedDep ?? 0);
      const nv = ov - ad;
      const ex = Number(mo.disposalRevenueExTax ?? 0);
      const inc = Number(mo.disposalRevenueIncTax ?? 0);
      const gain = ex - nv;
      monthlyValues[m] = [ov, ad, nv, ex, inc, gain];
    }
    return {
      dimensions: [
        it.legalEntity ?? '',
        it.budgetDepartment ?? '',
        it.category ?? '',
        it.assetDesc ?? '',
        it.disposalType ?? '',
      ],
      monthlyValues,
    };
  });

  const assetCategoryOptions = ASSET_CATEGORY_LIST
    .filter((c: any) => c.status !== '停用')
    .map((c: any) => `${c.parentCategory}-${c.categoryName}`)
    .filter(Boolean)
    .join(',');

  return createMonthlyBudgetSheet({
    name: 'BB.4.6 资产处置预算表',
    dimensions: [
      { label: '法人公司', width: 130, dropdown: LEGAL_ENTITIES.map(e => e.name).join(',') },
      { label: '预算部门', width: 130 },
      { label: '资产类别', width: 160, dropdown: assetCategoryOptions },
      { label: '资产描述', width: 200 },
      { label: '处置方式', width: 110, dropdown: '对外出售,报废变卖,内部转卖' },
    ],
    metrics: [
      { label: '资产原值(万元)' },
      { label: '累计折旧(万元)' },
      { label: '资产净值(万元)' },
      { label: '处置收款-不含税(万元)' },
      { label: '处置收款-含税(万元)' },
      { label: '处置损益(万元)' },
    ],
    rows,
  });
}


export function buildExistingAssetDepreciationSheet(
  items: ExistingAssetLedgerItem[] = []
): any {
  const defaultItems: ExistingAssetLedgerItem[] = items.length > 0 ? items : [
    {
      source: '接口导入', budgetProject: '烘焙产线扩能项目', assetDesc: '高精度数控机床A（生产用立式加工中心）', assetCategory: '固定资产-生产机器设备', managementUnit: '管理单元01', legalEntity: '甜甜圈集团公司', assetBook: '甲资产账簿', department: '生产部',
      originalValue: 1800, accumulatedDepreciation: 540, activationDate: '2024-03-15', expenseAttribution: '制造费用',
      monthlyDepreciation: { m1: 14.25, m2: 14.25, m3: 14.25, m4: 14.25, m5: 14.25, m6: 14.25, m7: 14.25, m8: 14.25, m9: 14.25, m10: 14.25, m11: 14.25, m12: 14.25 }
    },
    {
      source: '接口导入', budgetProject: '办公环境改善项目', assetDesc: '企业级服务器集群（机房核心设备）', assetCategory: '固定资产-电子与办公设备', managementUnit: '管理单元02', legalEntity: '甜甜圈集团公司', assetBook: '甲资产账簿', department: '行政部',
      originalValue: 360, accumulatedDepreciation: 180, activationDate: '2023-06-20', expenseAttribution: '管理费用',
      monthlyDepreciation: { m1: 9.5, m2: 9.5, m3: 9.5, m4: 9.5, m5: 9.5, m6: 9.5, m7: 9.5, m8: 9.5, m9: 9.5, m10: 9.5, m11: 9.5, m12: 9.5 }
    },
    {
      source: '手工补录', budgetProject: '食品研发检测能力项目', assetDesc: '光学频谱分析仪（研发检测仪器）', assetCategory: '固定资产-研发实验仪器', managementUnit: '管理单元03', legalEntity: '甜甜圈集团公司', assetBook: '甲资产账簿', department: '研发部',
      originalValue: 950, accumulatedDepreciation: 285, activationDate: '2026-11-05', expenseAttribution: '研发费用',
      monthlyDepreciation: { m1: 15.04, m2: 15.04, m3: 15.04, m4: 15.04, m5: 15.04, m6: 15.04, m7: 15.04, m8: 15.04, m9: 15.04, m10: 15.04, m11: 15.04, m12: 15.04 }
    }
  ];

  const ATTR_IDX: Record<string, number> = { '制造费用': 0, '研发费用': 1, '管理费用': 2, '销售费用': 3 };

  const rows: MonthlyBudgetRowSpec[] = defaultItems.map(it => {
    const ai = ATTR_IDX[it.expenseAttribution ?? ''] ?? 0;
    const monthlyValues: Record<number, number[]> = {};
    for (let m = 1; m <= 12; m++) {
      const dep = it.monthlyDepreciation?.[`m${m}`] ?? 0;
      monthlyValues[m] = [0, 0, 0, 0];
      monthlyValues[m][ai] = dep;
    }
    return {
      dimensions: [
        it.budgetProject ?? '',
        it.assetDesc ?? '',
        it.assetCategory ?? '',
        it.managementUnit ?? '',
        it.legalEntity ?? '',
        it.assetBook ?? '',
        it.department ?? '',
        it.originalValue ?? 0,
        it.activationDate ?? '',
        it.expenseAttribution ?? '',
      ],
      monthlyValues,
    };
  });

  return createMonthlyBudgetSheet({
    name: 'BB.4.4.b 存量资产折旧计算表',
    sumHeaderLabel: '【全年折旧】',
    dimensions: [
      { label: '预算项目', width: 130 },
      { label: '资产描述', width: 200 },
      { label: '资产类别', width: 140 },
      { label: '管理单元', width: 130 },
      { label: '法人公司', width: 140 },
      { label: '资产账簿', width: 120 },
      { label: '资产领用部门', width: 130 },
      { label: '原值(万元)', width: 120 },
      { label: '启用日期', width: 110 },
      { label: '费用归属', width: 110 },
    ],
    metrics: [
      { label: '制造费用折旧' },
      { label: '研发费用折旧与摊销' },
      { label: '管理费用折旧与摊销' },
      { label: '销售费用折旧与摊销' },
    ],
    rows,
  });
}


export function buildDepreciationExpenseSummarySheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  // 资产类别：单列、取值域 AA.9 资产类别与折旧的层级写法「大类-小类」（固定资产-xxx / 无形资产-xxx）；
  // 含「固定资产-使用权资产」行——使用权资产的折旧由 BB.4.5 计提、经本表归集（与其它资产同链路）
  const baseHeaders = ['预算项目', '预算部门', '资产类别'];
  const N_BASE = baseHeaders.length; // 3

  const expenseGroups = [
    { name: '制造费用折旧', key: 'mfg' },
    { name: '研发费用折旧与摊销', key: 'rnd' },
    { name: '管理费用折旧与摊销', key: 'admin' },
    { name: '销售费用折旧与摊销', key: 'sales' },
    { name: '【全年折旧合计】', key: 'total' },
  ];
  const subMetrics = ['存量折旧', '增量折旧', '小计'];

  // 列索引规划：
  // 0, 1, 2: 基础维度列
  // 3 ~ 17: 全年费用分布 (5 组 * 3 = 15 列)
  // 18 ~ 29: 1~12月折旧合计 (12 列)
  const COL_EXPENSE_START = N_BASE; // 3
  const TOTAL_EXPENSE_COLS = expenseGroups.length * subMetrics.length; // 15
  const COL_MONTH_START = COL_EXPENSE_START + TOTAL_EXPENSE_COLS; // 18
  const TOTAL_COLS = COL_MONTH_START + 12; // 30

  // 1. 维度表头 (r0 跨行合并)
  baseHeaders.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });

  // 2. 全年费用分布表头 (5 组大表头各跨 3 列 + 3 个子表头)
  expenseGroups.forEach((group, gIdx) => {
    const startC = COL_EXPENSE_START + gIdx * 3;
    const isSumGroup = gIdx === expenseGroups.length - 1;
    const headerStyle = isSumGroup ? SPREADSHEET_STYLES.deepBlueSumHeader : SPREADSHEET_STYLES.deepBlueHeader;
    const subHeaderStyle = isSumGroup ? SPREADSHEET_STYLES.deepBlueSumSubHeader : SPREADSHEET_STYLES.deepBlueSubHeader;

    celldata.push({ r: 0, c: startC, v: { v: group.name, m: group.name, ct: { fa: 'General', t: 'g' }, ...headerStyle } });
    merge[`0_${startC}`] = { r: 0, c: startC, rs: 1, cs: 3 };

    subMetrics.forEach((sm, smIdx) => {
      const metricLabel = isSumGroup ? (sm === '小计' ? '总计' : `${sm.slice(0, 2)}小计`) : sm;
      celldata.push({ r: 1, c: startC + smIdx, v: { v: metricLabel, m: metricLabel, ct: { fa: 'General', t: 'g' }, ...subHeaderStyle } });
    });
  });

  // 3. 1~12月折旧合计表头
  celldata.push({ r: 0, c: COL_MONTH_START, v: { v: '【各月折旧合计】', m: '【各月折旧合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  merge[`0_${COL_MONTH_START}`] = { r: 0, c: COL_MONTH_START, rs: 1, cs: 12 };
  for (let m = 1; m <= 12; m++) {
    const col = COL_MONTH_START + m - 1;
    const label = `${m}月`;
    celldata.push({ r: 1, c: col, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader } });
  }

  // 默认演示行（覆盖固定资产与无形资产典型类别）
  const defaultRows = [
    {
      budgetProject: '烘焙产线扩能项目',
      budgetDepartment: '制造工程部',
      assetCategory: '固定资产-生产机器设备',
      mfg: { existing: 180.0, addition: 45.0 },
      rnd: { existing: 0.0, addition: 0.0 },
      admin: { existing: 0.0, addition: 0.0 },
      sales: { existing: 0.0, addition: 0.0 },
      months: [16.5, 17.0, 17.5, 18.0, 18.5, 19.5, 20.0, 20.5, 21.0, 21.5, 22.0, 23.0]
    },
    {
      budgetProject: '食品研发检测能力项目',
      budgetDepartment: '研发中心',
      assetCategory: '固定资产-研发实验仪器',
      mfg: { existing: 0.0, addition: 0.0 },
      rnd: { existing: 95.0, addition: 32.0 },
      admin: { existing: 0.0, addition: 0.0 },
      sales: { existing: 0.0, addition: 0.0 },
      months: [9.2, 9.5, 10.0, 10.2, 10.5, 11.0, 11.5, 11.8, 12.0, 12.5, 12.8, 14.0]
    },
    {
      budgetProject: '办公环境改善项目',
      budgetDepartment: '综合管理部',
      assetCategory: '固定资产-电子与办公设备',
      mfg: { existing: 12.0, addition: 3.5 },
      rnd: { existing: 24.0, addition: 6.5 },
      admin: { existing: 48.0, addition: 15.0 },
      sales: { existing: 18.0, addition: 5.0 },
      months: [10.2, 10.5, 10.8, 11.0, 11.2, 11.5, 11.8, 12.0, 12.2, 12.5, 13.0, 13.3]
    },
    {
      budgetProject: '冷链物流能力项目',
      budgetDepartment: '销售部',
      assetCategory: '固定资产-运输工具',
      mfg: { existing: 5.0, addition: 1.0 },
      rnd: { existing: 0.0, addition: 0.0 },
      admin: { existing: 20.0, addition: 4.5 },
      sales: { existing: 15.0, addition: 3.5 },
      months: [3.8, 3.9, 4.0, 4.0, 4.1, 4.2, 4.2, 4.3, 4.3, 4.4, 4.4, 4.6]
    },
    {
      budgetProject: '烘焙中心基建项目',
      budgetDepartment: '制造工程部',
      assetCategory: '固定资产-房屋及建筑物',
      mfg: { existing: 85.0, addition: 12.0 },
      rnd: { existing: 15.0, addition: 2.0 },
      admin: { existing: 35.0, addition: 5.0 },
      sales: { existing: 10.0, addition: 1.0 },
      months: [13.4, 13.5, 13.6, 13.6, 13.8, 13.9, 14.0, 14.1, 14.2, 14.2, 14.3, 14.4]
    },
    {
      budgetProject: '烘焙中心基建项目',
      budgetDepartment: '制造工程部',
      assetCategory: '固定资产-动力及辅助设施',
      mfg: { existing: 42.0, addition: 8.0 },
      rnd: { existing: 0.0, addition: 0.0 },
      admin: { existing: 5.0, addition: 1.0 },
      sales: { existing: 0.0, addition: 0.0 },
      months: [4.4, 4.5, 4.6, 4.6, 4.7, 4.8, 4.8, 4.9, 4.9, 5.0, 5.2, 5.6]
    },
    {
      budgetProject: '烘焙产线扩能项目',
      budgetDepartment: '制造工程部',
      assetCategory: '固定资产-工具器具及模具',
      mfg: { existing: 28.0, addition: 6.5 },
      rnd: { existing: 0.0, addition: 0.0 },
      admin: { existing: 0.0, addition: 0.0 },
      sales: { existing: 0.0, addition: 0.0 },
      months: [2.6, 2.7, 2.8, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.8]
    },
    {
      budgetProject: '智能制造信息化项目',
      budgetDepartment: '研发中心',
      assetCategory: '无形资产-软件著作权/工业软件',
      mfg: { existing: 6.0, addition: 2.0 },
      rnd: { existing: 35.0, addition: 12.0 },
      admin: { existing: 8.0, addition: 2.5 },
      sales: { existing: 0.0, addition: 0.0 },
      months: [5.2, 5.3, 5.4, 5.5, 5.5, 5.6, 5.7, 5.8, 6.0, 6.1, 6.2, 6.2]
    },
    {
      budgetProject: '研发成果转化项目',
      budgetDepartment: '研发中心',
      assetCategory: '无形资产-专利权',
      mfg: { existing: 0.0, addition: 0.0 },
      rnd: { existing: 45.0, addition: 8.0 },
      admin: { existing: 0.0, addition: 0.0 },
      sales: { existing: 0.0, addition: 0.0 },
      months: [4.2, 4.3, 4.3, 4.4, 4.4, 4.5, 4.5, 4.6, 4.6, 4.7, 4.7, 4.8]
    },
    {
      budgetProject: '研发成果转化项目',
      budgetDepartment: '研发中心',
      assetCategory: '无形资产-非专利技术',
      mfg: { existing: 4.0, addition: 1.0 },
      rnd: { existing: 20.0, addition: 4.0 },
      admin: { existing: 0.0, addition: 0.0 },
      sales: { existing: 0.0, addition: 0.0 },
      months: [2.3, 2.3, 2.4, 2.4, 2.5, 2.5, 2.5, 2.6, 2.6, 2.6, 2.6, 2.7]
    },
    {
      budgetProject: '花果山园区用地项目',
      budgetDepartment: '综合管理部',
      assetCategory: '无形资产-土地使用权',
      mfg: { existing: 18.0, addition: 0.0 },
      rnd: { existing: 0.0, addition: 0.0 },
      admin: { existing: 12.0, addition: 0.0 },
      sales: { existing: 0.0, addition: 0.0 },
      months: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
    },
    {
      budgetProject: '品牌建设项目',
      budgetDepartment: '市场部',
      assetCategory: '无形资产-商标权',
      mfg: { existing: 0.0, addition: 0.0 },
      rnd: { existing: 0.0, addition: 0.0 },
      admin: { existing: 0.0, addition: 0.0 },
      sales: { existing: 10.0, addition: 2.0 },
      months: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
    },
    // 使用权资产（两类职场租赁）：折旧口径与其它资产同链路——由 BB.4.5 计提（剩余年限(月数)=租赁期月数、残值率取 AA.9 默认 0%）、
    // 经本表归集；BB.4.2.b.1 / BB.4.2.a.1 只做租赁负债/利息/现金流测算，不计提折旧
    {
      budgetProject: '办公环境改善项目',
      budgetDepartment: '研发中心',
      assetCategory: '固定资产-使用权资产',
      mfg: { existing: 0.0, addition: 493.02 },
      rnd: { existing: 0.0, addition: 472.56 },
      admin: { existing: 0.0, addition: 0.0 },
      sales: { existing: 0.0, addition: 0.0 },
      months: [0.0, 87.78, 87.78, 87.78, 87.78, 87.78, 87.78, 87.78, 87.78, 87.78, 87.78, 87.78]
    }
  ];

  const displayRows = items && items.length > 0 ? items : defaultRows;

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  displayRows.forEach((row, idx) => {
    const r = idx + 2;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const er = r + 1;

    // 维度列
    celldata.push({
      r, c: 0,
      v: { v: row.budgetProject ?? '', m: row.budgetProject ?? '', ct: { fa: 'General', t: 'g' }, bg: rowBg, ht: 1, vt: 1 }
    });
    celldata.push({
      r, c: 1,
      v: { v: row.budgetDepartment ?? '', m: row.budgetDepartment ?? '', ct: { fa: 'General', t: 'g' }, bg: rowBg, ht: 1, vt: 1 }
    });
    celldata.push({
      r, c: 2,
      v: { v: row.assetCategory ?? '', m: row.assetCategory ?? '', ct: { fa: 'General', t: 'g' }, bg: rowBg, ht: 1, vt: 1 }
    });

    // 前四大费用分布填充 (每组: 存量, 增量, 小计)
    const expenseKeys = ['mfg', 'rnd', 'admin', 'sales'];
    expenseKeys.forEach((key, gIdx) => {
      const startC = COL_EXPENSE_START + gIdx * 3;
      const gData = (row as any)[key] ?? {};
      const ex = gData.existing ?? 0;
      const ad = gData.addition ?? 0;
      const sub = Math.round((ex + ad) * 100) / 100;

      const colEx = colLetter(startC);
      const colAd = colLetter(startC + 1);

      celldata.push({
        r, c: startC,
        v: { v: ex, m: ex.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), ct: { fa: '#,##0.00', t: 'n' }, bg: rowBg, ht: 2, vt: 1 }
      });
      celldata.push({
        r, c: startC + 1,
        v: { v: ad, m: ad.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), ct: { fa: '#,##0.00', t: 'n' }, bg: rowBg, ht: 2, vt: 1 }
      });
      celldata.push({
        r, c: startC + 2,
        v: { v: sub, m: sub.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), ct: { fa: '#,##0.00', t: 'n' }, bg: rowBg, ht: 2, vt: 1, f: `=${colEx}${er}+${colAd}${er}` }
      });
    });

    // 全年折旧合计 (存量小计、增量小计、总计)
    const colTotStart = COL_EXPENSE_START + 4 * 3; // 14
    const exRefs = expenseKeys.map((_, i) => `${colLetter(COL_EXPENSE_START + i * 3)}${er}`).join('+');
    const adRefs = expenseKeys.map((_, i) => `${colLetter(COL_EXPENSE_START + i * 3 + 1)}${er}`).join('+');
    const totEx = expenseKeys.reduce((acc, k) => acc + (((row as any)[k]?.existing) ?? 0), 0);
    const totAd = expenseKeys.reduce((acc, k) => acc + (((row as any)[k]?.addition) ?? 0), 0);
    const totGrand = Math.round((totEx + totAd) * 100) / 100;

    celldata.push({
      r, c: colTotStart,
      v: { v: Math.round(totEx * 100) / 100, m: (Math.round(totEx * 100) / 100).toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), ct: { fa: '#,##0.00', t: 'n' }, bg: rowBg, ht: 2, vt: 1, f: `=${exRefs}` }
    });
    celldata.push({
      r, c: colTotStart + 1,
      v: { v: Math.round(totAd * 100) / 100, m: (Math.round(totAd * 100) / 100).toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), ct: { fa: '#,##0.00', t: 'n' }, bg: rowBg, ht: 2, vt: 1, f: `=${adRefs}` }
    });
    celldata.push({
      r, c: colTotStart + 2,
      v: { v: totGrand, m: totGrand.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), ct: { fa: '#,##0.00', t: 'n' }, bg: rowBg, ht: 2, vt: 1, f: `=${colLetter(colTotStart)}${er}+${colLetter(colTotStart + 1)}${er}` }
    });

    // 1~12月各月折旧合计
    const monthsData = row.months ?? [];
    for (let m = 1; m <= 12; m++) {
      const col = COL_MONTH_START + m - 1;
      const mVal = monthsData[m - 1] ?? 0;
      celldata.push({
        r, c: col,
        v: { v: mVal, m: mVal.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), ct: { fa: '#,##0.00', t: 'n' }, bg: rowBg, ht: 2, vt: 1 }
      });
    }
  });

  const columnlen: Record<number, number> = { 0: 130, 1: 110, 2: 140 };
  for (let c = COL_EXPENSE_START; c < TOTAL_COLS; c++) {
    columnlen[c] = c < COL_MONTH_START ? 82 : 75;
  }

  return {
    name: 'BB.4.X.A 折旧计算汇总表',
    index: 'bb42_depreciation_expense_summary',
    status: 1,
    order: 0,
    row: Math.max(displayRows.length + 6, 15),
    column: TOTAL_COLS,
    celldata,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}


/**
 * BB.4.5 增量资产折旧计算表（一行一卡）
 * 本表是本年度新增资产折旧的唯一计提表（含代采购资产与使用权资产）：
 *   ①采购类卡片取数路径：按 BB.3.1.A / BB.3.1.B 采购视角表样的明细行「一行一卡」建卡——资产类别、资产描述
 *     取该明细行（资产类别取值域 AA.9 的层级写法）；法人公司取 BB.3.1.C 财务视角的拆分结果
 *     （有PO 按下单主体直接指认法人、无PO 按 BAA.9.a 资产转换比例拆分到法人；无PO 比例拆分不改变资产类别）；
 *   ②代采购资产不在 A 侧建折旧卡：代采购转入资产由本表按来源「代采购转入」一行一卡建卡（法人=受益主体关联法人、
 *     资产类别/原值经 BB.3.1.D 传递、启用月=到货月份、折旧参数取默认资产账簿对应的 AA.9、下月折、按 BAA.9.b 拆四大费用）；
 *   ③使用权资产折旧在本表计提（剩余年限(月数)=租赁期月数、残值率取 AA.9 默认 0%），经 BB.4.X.A 归集；
 *     BB.4.2.b.1 / BB.4.2.a.1 只做租赁负债/利息/现金流测算，不计提折旧。
 */
export function buildIncrementalDepreciationDetailSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  // 卡片级明细结构：维度列（预算项目/法人公司/预算部门/来源/资产类别/资产描述/启用月份/折旧惯例/剩余年限(月数)/残值率/原值/月折旧额/折旧月数）
  // 度量：全年折旧（四大类费用）+ 1~12月各月折旧（每月单列）
  const baseHeaders = ['预算项目', '法人公司', '预算部门', '来源', '资产类别', '资产描述', '启用月份', '折旧惯例', '剩余年限(月数)', '预计净残值率', '本年新增原值', '每月折旧额', '本年折旧月数'];
  const N_BASE = baseHeaders.length; // 13
  const subMetrics = ['制造费用折旧', '研发费用折旧与摊销', '管理费用折旧与摊销', '销售费用折旧与摊销'];
  const N_SUB = subMetrics.length; // 4
  const COL_SUM = N_BASE; // 全年折旧4子列起始
  const moStart = (m: number) => COL_SUM + N_SUB + (m - 1) * N_SUB; // 月度列：每月4子列
  const TOTAL_COLS = moStart(13); // 13+4+12*4 = 65列

  // 两行制表头
  baseHeaders.forEach((h, c) => {
    const style = SPREADSHEET_STYLES.deepBlueHeader;
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...style } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...style } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年折旧】', m: '【全年折旧】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: N_SUB };
  subMetrics.forEach((h, i) => {
    celldata.push({ r: 1, c: COL_SUM + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumSubHeader } });
  });
  for (let m = 1; m <= 12; m++) {
    const base = moStart(m);
    const label = `${m}月`;
    celldata.push({ r: 0, c: base, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${base}`] = { r: 0, c: base, rs: 1, cs: N_SUB };
    subMetrics.forEach((h, i) => {
      celldata.push({ r: 1, c: base + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader } });
    });
  }

  const DEP_KEYS = ['mfg', 'rnd', 'admin', 'sales'];

  const defaultRows: any[] = [
    { budgetProject: '烘焙产线扩能项目', legalEntity: '草莓慕斯公司', budgetDepartment: '制造工程部', source: '采购类有PO', category: '固定资产-生产机器设备', assetDesc: '高速烘焙成型机（产线核心成型设备）', startMonth: 1, depConvention: '下月折', depLifeMonths: 120, residualRate: 0.05, origValue: 120, monthlyDep: 0.95, depMonths: 11, annualDep: 10.45, mfgDep: 9.41, rndDep: 0.52, adminDep: 0.52, salesDep: 0, monthDeps: { m1: 0, m2: 0.95, m3: 0.95, m4: 0.95, m5: 0.95, m6: 0.95, m7: 0.95, m8: 0.95, m9: 0.95, m10: 0.95, m11: 0.95, m12: 0.95 } },
    { budgetProject: '烘焙产线扩能项目', legalEntity: '草莓慕斯公司', budgetDepartment: '制造工程部', source: '采购类有PO', category: '固定资产-生产机器设备', assetDesc: '隧道式烘烤炉（连续烘烤设备）', startMonth: 6, depConvention: '下月折', depLifeMonths: 120, residualRate: 0.05, origValue: 150, monthlyDep: 1.19, depMonths: 6, annualDep: 7.14, mfgDep: 6.42, rndDep: 0.36, adminDep: 0.36, salesDep: 0, monthDeps: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 1.19, m8: 1.19, m9: 1.19, m10: 1.19, m11: 1.19, m12: 1.19 } },
    { budgetProject: '食品研发检测能力项目', legalEntity: '芒果班戟公司', budgetDepartment: '研发中心', source: '采购类有PO', category: '固定资产-研发实验仪器', assetDesc: '食品成分分析仪（研发检测仪器）', startMonth: 3, depConvention: '下月折', depLifeMonths: 60, residualRate: 0.05, origValue: 60, monthlyDep: 0.95, depMonths: 9, annualDep: 8.55, mfgDep: 0.43, rndDep: 8.12, adminDep: 0, salesDep: 0, monthDeps: { m1: 0, m2: 0, m3: 0, m4: 0.95, m5: 0.95, m6: 0.95, m7: 0.95, m8: 0.95, m9: 0.95, m10: 0.95, m11: 0.95, m12: 0.95 } },
    { budgetProject: '食品研发检测能力项目', legalEntity: '芒果班戟公司', budgetDepartment: '研发中心', source: '采购类有PO', category: '固定资产-研发实验仪器', assetDesc: '质构分析仪（研发检测仪器）', startMonth: 9, depConvention: '下月折', depLifeMonths: 60, residualRate: 0.05, origValue: 80, monthlyDep: 1.27, depMonths: 3, annualDep: 3.81, mfgDep: 0.19, rndDep: 3.62, adminDep: 0, salesDep: 0, monthDeps: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 0, m10: 1.27, m11: 1.27, m12: 1.27 } },
    { budgetProject: '办公环境改善项目', legalEntity: '甜甜圈集团公司', budgetDepartment: '综合管理部', source: '采购类无PO', category: '固定资产-电子与办公设备', assetDesc: '研发工作站（研发用计算机终端）', startMonth: 2, depConvention: '下月折', depLifeMonths: 36, residualRate: 0.05, origValue: 30, monthlyDep: 0.79, depMonths: 10, annualDep: 7.90, mfgDep: 0.40, rndDep: 1.18, adminDep: 4.74, salesDep: 1.58, monthDeps: { m1: 0, m2: 0, m3: 0.79, m4: 0.79, m5: 0.79, m6: 0.79, m7: 0.79, m8: 0.79, m9: 0.79, m10: 0.79, m11: 0.79, m12: 0.79 } },
    { budgetProject: '办公环境改善项目', legalEntity: '甜甜圈集团公司', budgetDepartment: '综合管理部', source: '采购类无PO', category: '固定资产-电子与办公设备', assetDesc: '会议室显示系统（含拼接屏与音响）', startMonth: 8, depConvention: '下月折', depLifeMonths: 36, residualRate: 0.05, origValue: 40, monthlyDep: 1.06, depMonths: 4, annualDep: 4.24, mfgDep: 0.21, rndDep: 0.64, adminDep: 2.54, salesDep: 0.85, monthDeps: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 1.06, m10: 1.06, m11: 1.06, m12: 1.06 } },
    { budgetProject: '冷链物流能力项目', legalEntity: '草莓慕斯公司', budgetDepartment: '销售部', source: '采购类有PO', category: '固定资产-运输工具', assetDesc: '冷链配送车（冷藏厢式货车）', startMonth: 4, depConvention: '下月折', depLifeMonths: 48, residualRate: 0.05, origValue: 40, monthlyDep: 0.79, depMonths: 8, annualDep: 6.32, mfgDep: 1.26, rndDep: 0, adminDep: 3.16, salesDep: 1.90, monthDeps: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0.79, m6: 0.79, m7: 0.79, m8: 0.79, m9: 0.79, m10: 0.79, m11: 0.79, m12: 0.79 } },
    { budgetProject: '智能制造信息化项目', legalEntity: '芒果班戟公司', budgetDepartment: '研发中心', source: '采购类无PO', category: '无形资产-软件著作权/工业软件', assetDesc: '生产执行系统(MES)软件', startMonth: 1, depConvention: '下月折', depLifeMonths: 36, residualRate: 0, origValue: 50, monthlyDep: 1.39, depMonths: 11, annualDep: 15.29, mfgDep: 1.53, rndDep: 9.17, adminDep: 3.82, salesDep: 0.77, monthDeps: { m1: 0, m2: 1.39, m3: 1.39, m4: 1.39, m5: 1.39, m6: 1.39, m7: 1.39, m8: 1.39, m9: 1.39, m10: 1.39, m11: 1.39, m12: 1.39 } },
    { budgetProject: '智能制造信息化项目', legalEntity: '芒果班戟公司', budgetDepartment: '研发中心', source: '采购类无PO', category: '无形资产-软件著作权/工业软件', assetDesc: '数据采集与监控(SCADA)软件', startMonth: 8, depConvention: '下月折', depLifeMonths: 36, residualRate: 0, origValue: 60, monthlyDep: 1.67, depMonths: 4, annualDep: 6.68, mfgDep: 0.67, rndDep: 4.01, adminDep: 1.67, salesDep: 0.33, monthDeps: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 1.67, m10: 1.67, m11: 1.67, m12: 1.67 } },
    { budgetProject: '研发成果转化项目', legalEntity: '芒果班戟公司', budgetDepartment: '研发中心', source: '采购类无PO', category: '无形资产-专利权', assetDesc: '烘焙工艺专利（发明专利权）', startMonth: 7, depConvention: '下月折', depLifeMonths: 120, residualRate: 0, origValue: 100, monthlyDep: 0.83, depMonths: 5, annualDep: 4.15, mfgDep: 0.21, rndDep: 3.53, adminDep: 0.41, salesDep: 0, monthDeps: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0.83, m9: 0.83, m10: 0.83, m11: 0.83, m12: 0.83 } },
    { budgetProject: '研发成果转化项目', legalEntity: '芒果班戟公司', budgetDepartment: '研发中心', source: '采购类无PO', category: '无形资产-非专利技术', assetDesc: '配方保密技术（非专利技术）', startMonth: 8, depConvention: '下月折', depLifeMonths: 120, residualRate: 0, origValue: 80, monthlyDep: 0.67, depMonths: 4, annualDep: 2.68, mfgDep: 0.27, rndDep: 2.41, adminDep: 0, salesDep: 0, monthDeps: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 0.67, m10: 0.67, m11: 0.67, m12: 0.67 } },
    { budgetProject: '烘焙中心基建项目', legalEntity: '草莓慕斯公司', budgetDepartment: '制造工程部', source: '基建转固', category: '固定资产-房屋及建筑物', assetDesc: '烘焙中心厂房（生产用房屋建筑物）', startMonth: 6, depConvention: '下月折', depLifeMonths: 240, residualRate: 0.05, origValue: 500, monthlyDep: 1.98, depMonths: 6, annualDep: 11.88, mfgDep: 5.94, rndDep: 1.19, adminDep: 3.56, salesDep: 1.19, monthDeps: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 1.98, m8: 1.98, m9: 1.98, m10: 1.98, m11: 1.98, m12: 1.98 } },
    { budgetProject: '烘焙中心基建项目', legalEntity: '草莓慕斯公司', budgetDepartment: '制造工程部', source: '基建转固', category: '固定资产-动力及辅助设施', assetDesc: '中央空调系统（厂房动力及辅助设施）', startMonth: 5, depConvention: '下月折', depLifeMonths: 120, residualRate: 0.05, origValue: 80, monthlyDep: 0.63, depMonths: 7, annualDep: 4.41, mfgDep: 4.19, rndDep: 0, adminDep: 0.22, salesDep: 0, monthDeps: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0.63, m7: 0.63, m8: 0.63, m9: 0.63, m10: 0.63, m11: 0.63, m12: 0.63 } },
    { budgetProject: '自制设备工程项目', legalEntity: '草莓慕斯公司', budgetDepartment: '制造工程部', source: '自制转固', category: '固定资产-生产机器设备', assetDesc: '自制打包流水线（自制整线设备）', startMonth: 2, depConvention: '下月折', depLifeMonths: 120, residualRate: 0.05, origValue: 25, monthlyDep: 0.20, depMonths: 10, annualDep: 2.00, mfgDep: 1.80, rndDep: 0.10, adminDep: 0.10, salesDep: 0, monthDeps: { m1: 0, m2: 0, m3: 0.20, m4: 0.20, m5: 0.20, m6: 0.20, m7: 0.20, m8: 0.20, m9: 0.20, m10: 0.20, m11: 0.20, m12: 0.20 } },
    { budgetProject: '自制设备工程项目', legalEntity: '草莓慕斯公司', budgetDepartment: '制造工程部', source: '自制转固', category: '固定资产-生产机器设备', assetDesc: '自制分拣装置（自制成套装置）', startMonth: 7, depConvention: '下月折', depLifeMonths: 120, residualRate: 0.05, origValue: 35, monthlyDep: 0.28, depMonths: 5, annualDep: 1.40, mfgDep: 1.26, rndDep: 0.07, adminDep: 0.07, salesDep: 0, monthDeps: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0.28, m9: 0.28, m10: 0.28, m11: 0.28, m12: 0.28 } },
    { budgetProject: '花果山园区用地项目', legalEntity: '甜甜圈集团公司', budgetDepartment: '综合管理部', source: '手工新增', category: '无形资产-土地使用权', assetDesc: '花果山园区地块（土地使用权）', startMonth: 1, depConvention: '下月折', depLifeMonths: 480, residualRate: 0, origValue: 300, monthlyDep: 0.63, depMonths: 11, annualDep: 6.93, mfgDep: 2.08, rndDep: 0, adminDep: 4.50, salesDep: 0.35, monthDeps: { m1: 0, m2: 0.63, m3: 0.63, m4: 0.63, m5: 0.63, m6: 0.63, m7: 0.63, m8: 0.63, m9: 0.63, m10: 0.63, m11: 0.63, m12: 0.63 } },
    { budgetProject: '品牌建设项目', legalEntity: '甜甜圈集团公司', budgetDepartment: '市场部', source: '手工新增', category: '无形资产-商标权', assetDesc: '品牌商标注册（商标权）', startMonth: 9, depConvention: '下月折', depLifeMonths: 120, residualRate: 0, origValue: 30, monthlyDep: 0.25, depMonths: 3, annualDep: 0.75, mfgDep: 0, rndDep: 0, adminDep: 0.15, salesDep: 0.60, monthDeps: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0.25, m11: 0.25, m12: 0.25 } },
    // 代采购转入（来源=BB.3.1.D 关联交易视角到货额，一行一卡）：提供方 A 代买、接受方 B 承接，卡片只在接受方 B 建
    //   （法人=受益主体关联法人、资产类别=BB.3.1.D.资产类别、原值=到货额、启用月=到货月份、预算部门=BB.3.1.D.预算部门、资产描述=代采购对象；
    //    A 侧不建折旧卡、不计提折旧）。折旧参数取默认资产账簿对应的 AA.9、下月折、按 BAA.9.b 拆四大费用。
    { budgetProject: 'P1 高功率平板光纤激光切割机', legalEntity: '草莓慕斯公司', budgetDepartment: '制造交付中心本部', source: '代采购转入', category: '固定资产-生产机器设备', assetDesc: '生产机器设备（立式加工中心）', startMonth: 1, depConvention: '下月折', depLifeMonths: 120, residualRate: 0.05, origValue: 8000, monthlyDep: 63.33, depMonths: 11, annualDep: 696.63, mfgDep: 626.97, rndDep: 34.83, adminDep: 34.83, salesDep: 0, monthDeps: { m1: 0, m2: 63.33, m3: 63.33, m4: 63.33, m5: 63.33, m6: 63.33, m7: 63.33, m8: 63.33, m9: 63.33, m10: 63.33, m11: 63.33, m12: 63.33 } },
    { budgetProject: 'P2 三维五轴激光切管机', legalEntity: '蓝莓蛋挞公司', budgetDepartment: '研发中心本部', source: '代采购转入', category: '固定资产-研发实验仪器', assetDesc: '研发实验仪器（光谱分析仪）', startMonth: 5, depConvention: '下月折', depLifeMonths: 60, residualRate: 0.05, origValue: 420, monthlyDep: 6.65, depMonths: 7, annualDep: 46.55, mfgDep: 2.33, rndDep: 44.22, adminDep: 0, salesDep: 0, monthDeps: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 6.65, m7: 6.65, m8: 6.65, m9: 6.65, m10: 6.65, m11: 6.65, m12: 6.65 } },
    // 使用权资产（两类职场租赁）：由 BB.4.2.b.1（内部职场租赁·财务视角）/ BB.4.2.a.1（外部职场租赁·财务视角）的资本化租赁经 BB.4.3 自动带出（原值=租赁负债初始、剩余年限(月数)=租赁期月数、残值率取 AA.9 默认 0%、启用月=租赁期起始月），与其它新增资产一样在本表计提折旧
    { budgetProject: 'P1 高功率平板光纤激光切割机', legalEntity: '草莓慕斯公司', budgetDepartment: '制造交付中心本部', source: '内部职场租赁', category: '固定资产-使用权资产', assetDesc: '天宫A座装备总装工坊（内部职场租赁资本化，原值=租赁负债初始）', startMonth: 1, depConvention: '下月折', depLifeMonths: 36, residualRate: 0, origValue: 1613.6, monthlyDep: 44.82, depMonths: 11, annualDep: 493.02, mfgDep: 493.02, rndDep: 0, adminDep: 0, salesDep: 0, monthDeps: { m1: 0, m2: 44.82, m3: 44.82, m4: 44.82, m5: 44.82, m6: 44.82, m7: 44.82, m8: 44.82, m9: 44.82, m10: 44.82, m11: 44.82, m12: 44.82 } },
    { budgetProject: '办公环境改善项目', legalEntity: '蓝莓蛋挞公司', budgetDepartment: '研发中心', source: '外部职场租赁', category: '固定资产-使用权资产', assetDesc: '史塔克大厦（外部职场租赁资本化，原值=租赁负债初始）', startMonth: 1, depConvention: '下月折', depLifeMonths: 36, residualRate: 0, origValue: 1546.4, monthlyDep: 42.96, depMonths: 11, annualDep: 472.56, mfgDep: 0, rndDep: 472.56, adminDep: 0, salesDep: 0, monthDeps: { m1: 0, m2: 42.96, m3: 42.96, m4: 42.96, m5: 42.96, m6: 42.96, m7: 42.96, m8: 42.96, m9: 42.96, m10: 42.96, m11: 42.96, m12: 42.96 } },
  ];

  const displayRows = items && items.length > 0 ? items : defaultRows;

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  displayRows.forEach((row, idx) => {
    const r = idx + 2;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const er = r + 1;
    const setCell = (c: number, val: any, isNum = false, isPct = false, formula?: string) => {
      const cellV: any = {
        v: val,
        m: isPct && typeof val === 'number' ? `${(val * 100).toFixed(2)}%` : (isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? '')),
        ct: { fa: isPct ? '0.00%' : (isNum ? '#,##0.00' : 'General'), t: (isNum || isPct) ? 'n' : 'g' },
        bg: rowBg,
        ht: (isNum || isPct) ? 2 : 1,
        vt: 1
      };
      if (formula) cellV.f = formula;
      celldata.push({ r, c, v: cellV });
    };
    setCell(0, row.budgetProject ?? '');
    setCell(1, row.legalEntity ?? '');
    setCell(2, row.budgetDepartment ?? '');
    setCell(3, row.source ?? '');
    setCell(4, row.category ?? '');
    setCell(5, row.assetDesc ?? '');
    setCell(6, row.startMonth ?? '', true);
    setCell(7, row.depConvention ?? '下月折');
    setCell(8, row.depLifeMonths ?? '', true);
    setCell(9, row.residualRate ?? 0, true, true);
    setCell(10, row.origValue ?? 0, true);
    setCell(11, row.monthlyDep ?? 0, true);
    setCell(12, row.depMonths ?? 0, true);

    // 四大费用拆分比例 = 全年四大费用 / 全年折旧合计（BAA.9.b 折旧费用拆分比例）
    const annualTotal = row.annualDep ?? 0;
    const ratio = (k: number) => (annualTotal > 0 ? k / annualTotal : 0);
    const round1 = (x: number) => Math.round(x * 100) / 100;

    // 1~12月各月折旧按四大费用比例拆分（每月4子列）
    for (let m = 1; m <= 12; m++) {
      const base = moStart(m);
      const md = (row.monthDeps ?? {})[`m${m}`] ?? 0;
      setCell(base + 0, round1(md * ratio(row.mfgDep ?? 0)), true);
      setCell(base + 1, round1(md * ratio(row.rndDep ?? 0)), true);
      setCell(base + 2, round1(md * ratio(row.adminDep ?? 0)), true);
      setCell(base + 3, round1(md * ratio(row.salesDep ?? 0)), true);
    }

    // 全年折旧四大类 = SUM(1~12月对应费用子列)
    for (let i = 0; i < N_SUB; i++) {
      const refs = Array.from({ length: 12 }, (_, m) => `${colLetter(moStart(m + 1) + i)}${er}`).join(',');
      setCell(COL_SUM + i, 0, true, false, `=SUM(${refs})`);
    }
  });

  const columnlen: Record<number, number> = { 0: 130, 1: 120, 2: 120, 3: 90, 4: 170, 5: 200, 6: 80, 7: 95, 8: 100, 9: 110, 10: 95, 11: 90, 12: 90 };

  return {
    name: 'BB.4.5 增量资产折旧计算表',
    index: 'bb47_incremental_dep_calc',
    status: 1,
    order: 0,
    row: Math.max(displayRows.length + 6, 15),
    column: TOTAL_COLS,
    celldata,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}


export function buildEquipmentProcurementPaymentRatioSheet(): any {
  return buildPaymentRatioSingleSheet('BAA.7 设备类采购付款比例表', 'ba8_equipment_payment_ratio', 0);
}


export function buildMaterialProcurementPaymentRatioSheet(): any {
  return buildPaymentRatioSingleSheet('BAA.7 物料类采购付款比例表', 'ba8_material_payment_ratio', 1);
}


export function buildMaterialEquipmentSheet(
  items: MaterialEquipmentProcurementItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
): any {
  const celldata: any[] = [];

  const baseHeaders = [
    '序号', '关联法人', '下单主体', '受益主体', '申购部门', '采购类别', '物料/设备编码', '物料/设备名称',
    '规格型号', '供应商', '单位', '税率%',
    '全年下单额', '全年入库额', '全年付款额'
  ];
  const monthHeaders: string[] = [];
  for (let i = 1; i <= 12; i++) {
    monthHeaders.push(`${i}月下单`, `${i}月入库`, `${i}月付款`);
  }
  const headers = [...baseHeaders, ...monthHeaders, '状态', '备注'];

  headers.forEach((h, c) => {
    const isAnnual = c >= 12 && c <= 14;
    celldata.push({
      r: 0, c,
      v: {
        v: h, m: h,
        ct: { fa: 'General', t: 'g' },
        ...(isAnnual ? SPREADSHEET_STYLES.deepBlueSumHeader : SPREADSHEET_STYLES.deepBlueHeader)
      }
    });
  });

  const monthKeys = ['m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','m11','m12'];

  items.forEach((it, idx) => {
    const r = idx + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, fmt = 'General', bg?: string) => {
      celldata.push({
        r, c,
        v: {
          v: val,
          m: isNum && typeof val === 'number'
            ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
            : String(val ?? ''),
          ct: { fa: fmt, t: isNum ? 'n' : 'g' },
          bg: bg || rowBg,
          ht: isNum ? 2 : (c === 0 ? 1 : 0),
          vt: 1
        }
      });
    };

    setCell(0, idx + 1);
    setCell(1, it.legalEntity);
    setCell(2, it.orderingEntity || (it.legalEntity ? `${it.legalEntity}-管理单元` : ''));
    setCell(3, it.beneficiaryEntity || '');
    setCell(4, it.department);
    setCell(5, it.category);
    setCell(6, it.itemCode);
    setCell(7, it.itemName);
    setCell(8, it.specModel || '-');
    setCell(9, it.supplier || '-');
    setCell(10, it.unit);
    setCell(11, it.taxRatePct, true, '0.0');
    // 全年三大合计 (高亮)
    setCell(12, it.totalOrderAmount, true, '#,##0.0', '#fef3c7');
    setCell(13, it.totalInboundAmount, true, '#,##0.0', '#fef3c7');
    setCell(14, it.totalPaymentAmount, true, '#,##0.0', '#fef3c7');
    // 12 月 x 3 列明细
    monthKeys.forEach((mk, mi) => {
      const md = (it.months || {})[mk] || { orderAmount: 0, inboundAmount: 0, paymentAmount: 0 };
      setCell(15 + mi * 3, md.orderAmount, true, '#,##0.0');
      setCell(16 + mi * 3, md.inboundAmount, true, '#,##0.0');
      setCell(17 + mi * 3, md.paymentAmount, true, '#,##0.0');
    });
    setCell(51, it.status);
    setCell(52, it.notes || '');
  });

  const maxMatRows = Math.max(items.length + 12, 30);
  const matDataVerification: Record<string, any> = {};
  const matDropdownCols = [
    { col: 1, val: SIGNING_ENTITIES.concat(['外部供应商', '无关联']).join(',') }, // 关联法人
    { col: 2, val: SIGNING_ENTITIES.join(',') }, // 下单主体
    { col: 3, val: SIGNING_ENTITIES.join(',') }, // 受益主体
    { col: 4, val: ADMIN_LEVEL1_DEPARTMENT_OPTIONS }, // 申购部门
    { col: 5, val: '机器设备,物料备件,仪器仪表,研发物料,办公设备' },
    { col: 51, val: '已下单,待审批,已交付,草稿' }
  ];

  for (let r = 1; r < maxMatRows; r++) {
    matDropdownCols.forEach(({ col, val }) => {
      matDataVerification[`${r}_${col}`] = {
        type: 'dropdown',
        type2: null,
        value1: val,
        value2: '',
        checked: false,
        remote: false,
        prohibitInput: false,
        hintShow: false,
        hintText: ''
      };
    });
  }

  return {
    name: 'BB.3.1 物料与设备采购',
    index: 222,
    status: 1,
    order: 0,
    row: maxMatRows,
    column: 54,
    celldata,
    dataVerification: matDataVerification,
    config: {
      merge: {},
      rowlen: { 0: 32 },
      columnlen: (() => {
        const cols: Record<number, number> = {
          0: 50, 1: 110, 2: 180, 3: 90, 4: 100, 5: 90, 6: 120, 7: 200,
          8: 140, 9: 130, 10: 60, 11: 60,
          12: 100, 13: 100, 14: 100
        };
        for (let c = 15; c <= 50; c++) cols[c] = 80;
        cols[51] = 70;
        cols[52] = 200;
        return cols;
      })(),
      frozen: { type: 'rangeBoth', range: { row_focus: 0, column_focus: 8 } }
    }
  };
}


export function buildAssetCategoryMasterSheets(_categories: any[] = []): any[] {
  const celldata: any[] = [];

  // 7 字段单行表头（简化：资产类别级概览；具体折旧参数仍按 ASSET_CATEGORY_LIST 逐行测算）
  const headers = ['资产账簿', '资产类别', '折旧方法', '折旧惯例', '折旧年限(月)', '残值率', '备注'];
  headers.forEach((h, c) => {
    celldata.push({
      r: 0,
      c,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, vt: 1 }
    });
  });

  const rows = [
    { book: '甲资产账簿', cat: '固定资产-生产机器设备', method: '年限平均法', convention: '当月增加、次月计提', months: '120', residual: '5%', note: '税法最低120个月(10年)；高端装备可享加速折旧' },
    { book: '甲资产账簿', cat: '固定资产-研发实验仪器', method: '年限平均法', convention: '当月增加、次月计提', months: '60', residual: '5%', note: '会计估计60个月(5年)；研发用途可享加计扣除' },
    { book: '甲资产账簿', cat: '固定资产-电子与办公设备', method: '年限平均法', convention: '当月增加、次月计提', months: '36', residual: '5%', note: '电子设备税法最低36个月(3年)' },
    { book: '甲资产账簿', cat: '固定资产-运输工具', method: '年限平均法', convention: '当月增加、次月计提', months: '48', residual: '5%', note: '运输工具税法最低48个月(4年)' },
    { book: '甲资产账簿', cat: '固定资产-房屋及建筑物', method: '年限平均法', convention: '当月增加、次月计提', months: '240', residual: '5%', note: '房屋建筑物税法最低240个月(20年)' },
    { book: '甲资产账簿', cat: '固定资产-动力及辅助设施', method: '年限平均法', convention: '当月增加、次月计提', months: '120', residual: '5%', note: '动力站房等比照机器设备120个月(10年)' },
    { book: '甲资产账簿', cat: '固定资产-工具器具及模具', method: '年限平均法', convention: '当月增加、次月计提', months: '60', residual: '5%', note: '器具工具税法最低60个月(5年)' },
    { book: '甲资产账簿', cat: '无形资产-软件著作权/工业软件', method: '直线法', convention: '当月增加、当月摊销', months: '36', residual: '0%', note: '重点软件企业摊销最短24个月(2年)' },
    { book: '甲资产账簿', cat: '无形资产-专利权', method: '直线法', convention: '当月增加、当月摊销', months: '120', residual: '0%', note: '外购专利不低于120个月(10年)摊销' },
    { book: '甲资产账簿', cat: '无形资产-非专利技术', method: '直线法', convention: '当月增加、当月摊销', months: '120', residual: '0%', note: '按合同及受益年限，无约定不低于120个月(10年)' },
    { book: '甲资产账簿', cat: '无形资产-土地使用权', method: '直线法', convention: '当月增加、当月摊销', months: '480', residual: '0%', note: '工业用地480个月(40年)；与地上建筑物分别核算' },
    { book: '甲资产账簿', cat: '无形资产-商标权', method: '直线法', convention: '当月增加、当月摊销', months: '120', residual: '0%', note: '外购商标不低于120个月(10年)摊销' },
  ];

  rows.forEach((row, idx) => {
    const r = idx + 1;
    const isEven = idx % 2 === 0;
    const bg = isEven ? '#ffffff' : '#f7f9fc';
    const cell = (c: number, val: string, align: number = 0) => {
      celldata.push({
        r,
        c,
        v: { v: val, m: val, ct: { fa: 'General', t: 'g' }, bg, ht: align, vt: 1 }
      });
    };
    cell(0, row.book, 1);
    cell(1, row.cat, 1);
    cell(2, row.method, 1);
    cell(3, row.convention, 0);
    cell(4, row.months, 1);
    cell(5, row.residual, 1);
    cell(6, row.note, 0);
  });

  return [{
    name: 'AA.9 资产类别及折旧参数',
    index: 'sheet_asset_category_master',
    status: 1,
    order: 0,
    row: Math.max(rows.length + 5, 12),
    column: 7,
    celldata,
    config: {
      rowlen: { 0: 30 },
      columnlen: { 0: 110, 1: 120, 2: 120, 3: 140, 4: 120, 5: 90, 6: 400 },
      frozen: { type: 'rangeRow', range: { row_focus: 1, column_focus: 0 } }
    }
  }];
}
function buildCapexLikeSheet(
  items: FixedAssetProcurementItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027',
  categoryColumnLabel: string = '资产类别',
  sheetName: string = 'BB.3.1 设备采购预算',
  includePaymentTotal: boolean = true,
  includeAdvanceRatioColumn: boolean = false,
  monthlyAdvanceRatio: boolean = false,  // BB.3.1 新模式：预付款比例作为月度子列（不要付款金额）
  includeAssetName: boolean = false,       // BB.3.1 加「资产名称或备注」列
  fixedPoFlag?: string                     // BB.3.1.A/.B 拆表后：PO标记 为固定值列（恒为「有PO」/「无PO」，不可修改）
) {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  // ── 表样: 维度列(+可选 预付款比例) + 全年合计(N_MET) + 12月×N_MET 度量 + 备注说明 ──
  // 采购视角不设「受益主体」列（由关联交易预算员在 BB.3.1.D / BB.3.3.D 关联交易视角补填——
  // 两岗接力代采购模型：采购人员只填下单主体，受益主体在 .D 视角登记）。
  const baseCols = ['序号', '预算项目', '预算部门', '下单主体', 'PO标记', categoryColumnLabel];
  if (includeAssetName) baseCols.push('资产名称或备注');
  baseCols.push('供应商');
  if (includeAdvanceRatioColumn) baseCols.push('预付款比例');
  const postCols = ['备注说明'];
  // 全站统一模式（BB.3.1 与 BB.3.3 一致）：每月子列=到货额/下单额/预付款比例/预付款/验收付款。
  // 预付款比例从整年维度列转入每月（位于下单额之后、预付款之前），「付款金额/付款额」列已按用户要求移除，
  // 付款总额不再单独展示，由预付款+验收付款承载（CF-05 取数=BB.3.3.预付款+BB.3.3.验收付款）。
  const subMetrics = monthlyAdvanceRatio
    ? ['到货额', '下单额', '预付款比例', '预付款', '验收付款']
    : includePaymentTotal
      ? ['到货额', '下单额', '预付款', '验收付款', '付款额']
      : ['到货额', '下单额', '预付款', '验收付款', '付款金额'];
  const N_MET = subMetrics.length; // 5
  const COL_RATIO = includeAdvanceRatioColumn ? baseCols.length - 1 : -1; // 预付款比例列索引

  const N_BASE  = baseCols.length;                          // 8 (c0~c7)
  const COL_SUM = N_BASE;                                   // 8  全年合计起始
  const moStart = (m: number) => COL_SUM + N_MET + (m - 1) * N_MET;
  const COL_NOTES = moStart(12) + N_MET;
  const TOTAL_COLS = COL_NOTES + 1;

  // ── Row 0/1: 维度列表头 (两行制, r0 跨行合并 rs:2) ──
  baseCols.forEach((h, ci) => {
    celldata.push({
      r: 0, c: ci,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
    celldata.push({
      r: 1, c: ci,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  });

  // ── Row 0: 全年合计大表头 ──
  for (let c = COL_SUM; c < COL_SUM + N_MET; c++) {
    celldata.push({
      r: 0, c,
      v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader }
    });
  }
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: N_MET };

  // ── Row 0: 1月~12月大表头 ──
  for (let m = 1; m <= 12; m++) {
    const colStart = moStart(m);
    for (let c = colStart; c < colStart + N_MET; c++) {
      celldata.push({
        r: 0, c,
        v: { v: `${m}月`, m: `${m}月`, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader }
      });
    }
    merge[`0_${colStart}`] = { r: 0, c: colStart, rs: 1, cs: N_MET };
  }

  // ── 末尾列: 备注说明 (r0 跨行合并 rs:2) ──
  postCols.forEach((h, idx) => {
    const ci = COL_NOTES + idx;
    celldata.push({
      r: 0, c: ci,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
    celldata.push({
      r: 1, c: ci,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  });

  // ── Row 1: 度量子表头 ──
  subMetrics.forEach((h, i) => {
    celldata.push({
      r: 1, c: COL_SUM + i,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumSubHeader }
    });
  });
  for (let m = 1; m <= 12; m++) {
    subMetrics.forEach((h, i) => {
      celldata.push({
        r: 1, c: moStart(m) + i,
        v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader }
      });
    });
  }

  // ── 数据行 ──
  items.forEach((item, rowIdx) => {
    const r = rowIdx + 2;
    const setCell = (c: number, val: any, isNum: boolean = false, fmt: string = 'General', f?: string) => {
      const cellObj: any = {
        ct: { fa: fmt, t: isNum ? 'n' : 'g' },
        v: val,
        m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''),
        ht: isNum ? 2 : 1,
        vt: 1
      };
      if (f) cellObj.f = f;
      celldata.push({ r, c, v: cellObj });
    };

    const anyIt = item as any;
    setCell(0, rowIdx + 1, true, '#,##0');
    setCell(1, anyIt.budgetProject ?? '');                                     // 预算项目 (AA.6)
    setCell(2, item.department ?? '');                                         // 预算部门 (AA.5，默认二级部门)
    setCell(3, item.orderingEntity || (item.legalEntity ? `${item.legalEntity}-管理单元` : '')); // 下单主体(AA.8 管理单元)
    setCell(4, fixedPoFlag ?? anyIt.poFlag ?? '');                             // PO标记（BB.3.1.A/.B 为固定值列：恒为有PO/无PO）
    setCell(5, item.assetCategory || '设备类采购');                            // 资产类别/物料类别 (AA.9/AB.9)
    if (includeAssetName) setCell(6, anyIt.assetNameOrRemark ?? '');           // 资产名称或备注 (BB.3.1)
    setCell(includeAssetName ? 7 : 6, item.supplier ?? '');                    // 供应商 (AA.10, 可选)
    if (includeAdvanceRatioColumn) {
      const ratio = anyIt.advancePaymentRatio ?? 0;
      // 预付款比例：数值存 0.3（供公式乘法），显示为百分比串 30.00%
      celldata.push({
        r, c: COL_RATIO,
        v: { v: ratio, m: `${(ratio * 100).toFixed(2)}%`, ct: { fa: '0.00%', t: 'n' }, bg: 'transparent', ht: 2, vt: 1 }
      });
    }

          // 12个月度量（根据模式写入）
    const payValues: number[] = [];
    for (let m = 1; m <= 12; m++) {
      const mData = item.months ? (item.months as any)[`m${m}`] : null;
      const colStart = moStart(m);
      const advance = mData?.advancePayment || 0;
      const acceptPay = mData?.acceptancePayment || 0;
      const arrival = mData?.acceptanceAmount || 0;
      const order = mData?.orderAmount || 0;

      if (monthlyAdvanceRatio) {
        // BB.3.1 新模式：到货额/下单额/预付款比例/预付款/验收付款（无付款金额）
        const ratio = mData?.advancePaymentRatio ?? (anyIt.advancePaymentRatio ?? 0);
        setCell(colStart,     arrival,    true,  '#,##0.00');
        setCell(colStart + 1, order,      true,  '#,##0.00');
        // 预付款比例：显示百分比
        celldata.push({ r, c: colStart + 2, v: { v: ratio, m: `${(ratio * 100).toFixed(2)}%`, ct: { fa: '0.00%', t: 'n' }, ht: 2, vt: 1 } });
        setCell(colStart + 3, advance,    true,  '#,##0.00');
        setCell(colStart + 4, acceptPay,  true,  '#,##0.00');
      } else {
        setCell(colStart,     arrival, true, '#,##0.00');
        setCell(colStart + 1, order,   true, '#,##0.00');
        setCell(colStart + 2, advance, true, '#,##0.00');
        setCell(colStart + 3, acceptPay, true, '#,##0.00');
        // 付款金额/付款额 公式列
        const payFormula = includePaymentTotal
          ? `=${colLetter(colStart + 2)}${r + 1}+${colLetter(colStart + 3)}${r + 1}`
          : `=${colLetter(colStart + 1)}${r + 1}*$${colLetter(COL_RATIO)}${r + 1}+${colLetter(colStart)}${r + 1}`;
        const payValue = includePaymentTotal
          ? (mData?.paymentAmount ?? (advance + acceptPay))
          : Math.round((order * (anyIt.advancePaymentRatio ?? 0) + arrival) * 100) / 100;
        setCell(colStart + 4, payValue, true, '#,##0.00', payFormula);
        payValues.push(payValue);
      }
    } // end for m

    // 全年合计 =SUM(12个对应月度列)
    const er = r + 1;
    const sumRefs = (offset: number) =>
      Array.from({ length: 12 }, (_, i) => `${colLetter(moStart(i + 1) + offset)}${er}`).join(',');
    setCell(COL_SUM,     item.totalAcceptanceAmount || 0, true, '¥#,##0.00', `=SUM(${sumRefs(0)})`);
    setCell(COL_SUM + 1, item.totalOrderAmount || 0,      true, '¥#,##0.00', `=SUM(${sumRefs(1)})`);
    if (monthlyAdvanceRatio) {
      // 全年合计：预付款比例列留空（无意义加总），预付款/验收付款各自汇总
      setCell(COL_SUM + 3, item.totalAdvancePayment || 0,   true, '¥#,##0.00', `=SUM(${sumRefs(3)})`);
      setCell(COL_SUM + 4, item.totalAcceptancePayment || 0, true, '¥#,##0.00', `=SUM(${sumRefs(4)})`);
    } else {
      setCell(COL_SUM + 2, item.totalAdvancePayment || 0,   true, '¥#,##0.00', `=SUM(${sumRefs(2)})`);
      setCell(COL_SUM + 3, item.totalAcceptancePayment || 0, true, '¥#,##0.00', `=SUM(${sumRefs(3)})`);
      setCell(COL_SUM + 4, Math.round(payValues.reduce((a, b) => a + b, 0) * 10) / 10, true, '¥#,##0.00', `=SUM(${sumRefs(4)})`);
    }

    setCell(COL_NOTES, item.notes || '');
  });

  // ── 列宽 ──
  const columnlen: Record<number, number> = {
    0: 45, 1: 150, 2: 110, 3: 170, 4: 70, 5: 120, 6: 180, 7: 140, 8: 90
  };
  for (let c = COL_SUM; c < COL_NOTES; c++) columnlen[c] = 85;
  columnlen[COL_NOTES] = 140;

  // ── 数据校验（下拉）─────────────────────────────────────────────────
  const maxCapexRows = Math.max(items.length + 15, 30);
  const capexDataVerification: Record<string, any> = {};
  const mkDv = (val: string, prohibitInput = false) => ({ type: 'dropdown', type2: null, value1: val, value2: '', checked: false, remote: false, prohibitInput, hintShow: false, hintText: '' });
  const budgetProjectOptions4capex = BUDGET_PROJECT_MASTER_DATA
    .map((p: any) => p.name)
    .filter(Boolean)
    .join(',');
  const assetCategoryOptions4capex = ASSET_CATEGORY_LIST
    .filter((c) => c.status === '启用')
    .map((c) => c.categoryName)
    .join(',');
  const supplierOptions4capex = SUPPLIER_MASTER_DATA
    .filter((s: any) => s.status !== '停用')
    .map((s: any) => s.name)
    .filter(Boolean)
    .join(',');
  const capexDropdownCols = [
    { col: 1, val: budgetProjectOptions4capex },            // 预算项目 (AA.6)
    { col: 2, val: ADMIN_LEVEL2_DEPARTMENT_OPTIONS },       // 预算部门 (AA.5，默认二级部门)
    { col: 3, val: MANAGEMENT_UNITS.map((u) => u.name).join(',') }, // 下单主体(AA.8 管理单元)
    // 受益主体列已从采购视角移除：由关联交易预算员在 BB.3.1.D / BB.3.3.D 关联交易视角补填
    { col: 4, val: fixedPoFlag ?? '有PO,无PO', prohibit: Boolean(fixedPoFlag) }, // PO标记（BB.3.1.A/.B 为固定值列：只允许该固定值，不可修改）
    { col: 5, val: assetCategoryOptions4capex },            // 资产类别/物料类别 (AA.9/AB.9)
    { col: includeAssetName ? 7 : 6, val: supplierOptions4capex }  // 供应商 (AA.10, 可选)
  ];
  for (let r = 2; r < maxCapexRows; r++) {
    capexDropdownCols.forEach(({ col, val, prohibit }) => {
      capexDataVerification[`${r}_${col}`] = mkDv(val, prohibit);
    });
  }

  // 预付款比例列：百分比格式，非下拉（仅 BB.3.3 存在）
  if (includeAdvanceRatioColumn) {
    for (let r = 2; r < maxCapexRows; r++) {
      capexDataVerification[`${r}_${COL_RATIO}`] = {
        type: 'number', type2: null, value1: '', value2: '', checked: false,
        remote: false, prohibitInput: false, hintShow: true,
        hintText: '手工填报的预付款比例，付款金额=下单额×预付款比例+到货额'
      };
    }
  }

  return {
    name: sheetName,
    index: 5,
    status: 0,
    order: 5,
    row: maxCapexRows,
    column: TOTAL_COLS,
    celldata,
    dataVerification: capexDataVerification,
    config: {
      merge,
      rowlen: { 0: 32, 1: 36 },
      columnlen,
      frozen: { type: 'both', range: { row_focus: 2, column_focus: 7 } }
    }
  };
}

function buildPaymentRatioSingleSheet(
  sheetName: string,
  sheetIndex: string,
  sheetOrder: number
): any {
  const celldata: any[] = [];
  const headers = [
    '序号', '一级部门',
    '预付款首月(0月)比例', '预付款次月(1月)比例',
    '验收付款首月(0月)比例', '验收付款第1月比例', '验收付款第2月比例'
  ];

  headers.forEach((h, c) => {
    celldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  const BLANK_ROWS = 10;
  for (let idx = 0; idx < BLANK_ROWS; idx++) {
    const r = idx + 1;
    const rowBg = idx % 2 === 0 ? '#ffffff' : '#f7f9fc';
    const setCell = (c: number, val: any, isPct: boolean = false) => {
      celldata.push({
        r, c,
        v: {
          v: val,
          m: String(val ?? ''),
          ct: { fa: isPct ? '0.00%' : 'General', t: isPct ? 'n' : 'g' },
          bg: rowBg,
          ht: isPct ? 2 : 1,
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    };
    setCell(0, idx + 1);                 // 序号
    setCell(1, '');                      // 一级部门（下拉：AA.5）
    for (let c = 2; c <= 6; c++) setCell(c, '', true); // 五个比例列，百分比格式
  }

  const maxRows = BLANK_ROWS + 1;
  const dataVerification: Record<string, any> = {};
  const dropdown = (value1: string) => ({
    type: 'dropdown',
    type2: null,
    value1,
    value2: '',
    checked: false,
    remote: false,
    prohibitInput: false,
    hintShow: false,
    hintText: ''
  });
  for (let r = 1; r < maxRows; r++) {
    dataVerification[`${r}_1`] = dropdown(ADMIN_LEVEL1_DEPARTMENT_OPTIONS);
  }

  return {
    name: sheetName,
    index: sheetIndex,
    status: sheetOrder === 0 ? 1 : 0,
    order: sheetOrder,
    row: maxRows,
    column: headers.length,
    celldata,
    dataVerification,
    config: {
      merge: {},
      rowlen: { 0: 32 },
      columnlen: {
        0: 50,   // 序号
        1: 140,  // 一级部门
        2: 150,  // 预付款首月(0月)比例
        3: 150,  // 预付款次月(1月)比例
        4: 150,  // 验收付款首月(0月)比例
        5: 140,  // 验收付款第1月比例
        6: 140   // 验收付款第2月比例
      },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };
}


// BB.3.1.C 财务视角：按法人×项目×部门×PO标记汇总原值/预付款/验收付款（全年合计+1~12月，从采购视角逐笔数据汇总而来）
// 维度=法人公司｜预算项目｜预算部门｜PO标记（4 列，顺序固定：PO标记置于 3 个业务维度之后）；度量=原值(万元)/预付款(万元)/验收付款(万元)（3 度量×（【全年合计】+1~12月）共 39 列，合计 43 列）。
// PO标记为下拉维度（枚举：有PO / 无PO，非固定值列，与采购视角 BB.3.1.A/.B 的固定值列不同）：区分本行金额是按下单主体直接指认法人、还是按 BAA.9.a 比例拆分到法人——
//   有PO=按下单主体（AA.8 管理单元）直接指认归属法人（同一法人行）；无PO=按 BAA.9.a 资产转换比例拆分后落入各法人（同一预算项目/预算部门可能落到多个法人行）。
// 法人指认：有PO行（BB.3.1.A）按下单主体（AA.8 管理单元）与法人一一对应直接带出归属法人；无PO行（BB.3.1.B）按 BAA.9.a 资产转换比例拆分到法人
// ——资本性支出法人拆分的唯一入口在本表，BB.4.5 增量折旧直接取本表拆分后法人、不再拆分。
// 本表据法人汇总结果生成会计分录：到货额→原值 1601/1701（+）、预付款 1123（+）、验收付款 2202（−）、付款进 CF-14；本表不计提折旧，原值汇入 BB.4.5。
export function buildCapexFinanceViewSheet(): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const baseHeaders = ['法人公司', '预算项目', '预算部门', 'PO标记'];
  const N_BASE = baseHeaders.length; // 4
  const subMetrics = ['原值(万元)', '预付款(万元)', '验收付款(万元)'];
  const N_MET = subMetrics.length; // 3
  const COL_SUM = N_BASE; // 全年合计起始
  const moStart = (m: number) => COL_SUM + N_MET + (m - 1) * N_MET;
  const TOTAL_COLS = moStart(13); // 4 + 3 + 36 = 43

  // 维度列（两行制 rs:2）
  baseHeaders.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });

  // 全年合计（cs:3）
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: N_MET };
  subMetrics.forEach((h, i) => {
    celldata.push({ r: 1, c: COL_SUM + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumSubHeader } });
  });

  // 1~12月（每月 cs:3）
  for (let m = 1; m <= 12; m++) {
    const base = moStart(m);
    celldata.push({ r: 0, c: base, v: { v: `${m}月`, m: `${m}月`, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${base}`] = { r: 0, c: base, rs: 1, cs: N_MET };
    subMetrics.forEach((h, i) => {
      celldata.push({ r: 1, c: base + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader } });
    });
  }

  const rows = [
    // 有PO 通道：按下单主体（AA.8 管理单元）直接指认法人，同一法人一行
    { legalEntity: '草莓慕斯公司', project: 'P1 高功率平板光纤激光切割机', dept: '采购与供应链管理部', poFlag: '有PO',
      orig: { m1: 0, m2: 80, m3: 80, m4: 100, m5: 60, m6: 80, m7: 0, m8: 60, m9: 60, m10: 80, m11: 0, m12: 60 },
      adv: { m1: 36, m2: 0, m3: 30, m4: 0, m5: 24, m6: 0, m7: 18, m8: 0, m9: 24, m10: 0, m11: 18, m12: 0 },
      acc: { m1: 0, m2: 56, m3: 56, m4: 70, m5: 42, m6: 56, m7: 0, m8: 42, m9: 42, m10: 56, m11: 0, m12: 42 } },
    // 无PO 通道：按 BAA.9.a 资产转换比例拆分后落入法人（本行为拆分后金额）
    { legalEntity: '芒果班戟公司', project: 'P3 研发能力提升', dept: '研发工程部', poFlag: '无PO',
      orig: { m1: 20, m2: 0, m3: 30, m4: 0, m5: 25, m6: 0, m7: 20, m8: 0, m9: 25, m10: 0, m11: 20, m12: 0 },
      adv: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 },
      acc: { m1: 20, m2: 0, m3: 30, m4: 0, m5: 25, m6: 0, m7: 20, m8: 0, m9: 25, m10: 0, m11: 20, m12: 0 } },
    // 有PO 通道：集团统筹无形资产采购，按下单主体直接指认甜甜圈集团公司
    { legalEntity: '甜甜圈集团公司', project: '集团统筹', dept: '信息技术部', poFlag: '有PO',
      orig: { m1: 0, m2: 0, m3: 60, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 },
      adv: { m1: 30, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 },
      acc: { m1: 0, m2: 0, m3: 30, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 } },
    // 无PO 通道（同一预算项目/预算部门按 BAA.9.a 拆分到多个法人的示例）：P3 超快激光与复合加工预研 42.0 按 BAA.9.a 拆入 草莓慕斯 22.0 + 芒果班戟 20.0
    { legalEntity: '草莓慕斯公司', project: 'P3 超快激光与复合加工预研', dept: '研发工程部', poFlag: '无PO',
      orig: { m1: 0, m2: 6, m3: 0, m4: 0, m5: 5, m6: 0, m7: 0, m8: 6, m9: 0, m10: 0, m11: 5, m12: 0 },
      adv: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 },
      acc: { m1: 0, m2: 6, m3: 0, m4: 0, m5: 5, m6: 0, m7: 0, m8: 6, m9: 0, m10: 0, m11: 5, m12: 0 } },
    { legalEntity: '芒果班戟公司', project: 'P3 超快激光与复合加工预研', dept: '研发工程部', poFlag: '无PO',
      orig: { m1: 0, m2: 6, m3: 0, m4: 0, m5: 4, m6: 0, m7: 0, m8: 6, m9: 0, m10: 0, m11: 4, m12: 0 },
      adv: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 },
      acc: { m1: 0, m2: 6, m3: 0, m4: 0, m5: 4, m6: 0, m7: 0, m8: 6, m9: 0, m10: 0, m11: 4, m12: 0 } },
  ];

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  rows.forEach((row, idx) => {
    const r = idx + 2;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const er = r + 1;
    const setCell = (c: number, val: any, isNum = false, f?: string) => {
      const cell: any = { v: val, m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''), ct: { fa: isNum ? '#,##0.00' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };
    setCell(0, row.legalEntity);
    setCell(1, row.project);
    setCell(2, row.dept);
    setCell(3, row.poFlag); // PO标记（下拉维度：有PO=按下单主体指认法人 / 无PO=按 BAA.9.a 拆分到法人）

    // 1~12月每月 3 子列（原值/预付款/验收付款）
    for (let m = 1; m <= 12; m++) {
      const base = moStart(m);
      setCell(base, row.orig[`m${m}`] ?? 0, true);
      setCell(base + 1, row.adv[`m${m}`] ?? 0, true);
      setCell(base + 2, row.acc[`m${m}`] ?? 0, true);
    }

    // 全年合计 3 子列 = SUM(每月对应子列)
    for (let i = 0; i < N_MET; i++) {
      const refs = Array.from({ length: 12 }, (_, m) => `${colLetter(moStart(m + 1) + i)}${er}`).join(',');
      setCell(COL_SUM + i, 0, true, `=SUM(${refs})`);
    }
  });

  const columnlen: Record<number, number> = { 0: 160, 1: 220, 2: 150, 3: 90 };
  for (let c = COL_SUM; c < TOTAL_COLS; c++) columnlen[c] = 80;

  // ── 数据校验（下拉）：PO标记 维度（枚举：有PO/无PO，非固定值列，可修改）──
  const maxFinanceRows = Math.max(rows.length + 15, 30);
  const financeDataVerification: Record<string, any> = {};
  for (let r = 2; r < maxFinanceRows; r++) {
    financeDataVerification[`${r}_3`] = {
      type: 'dropdown', type2: null, value1: '有PO,无PO', value2: '', checked: false,
      remote: false, prohibitInput: false, hintShow: true,
      hintText: '有PO=按下单主体（AA.8 管理单元）直接指认归属法人；无PO=按 BAA.9.a 资产转换比例拆分到法人（同一预算项目/预算部门可能落到多个法人行）'
    };
  }

  return {
    name: 'BB.3.1.C 财务视角',
    index: 'bb31_finance_view',
    status: 1,
    order: 1,
    row: Math.max(rows.length + 5, 10),
    column: TOTAL_COLS,
    defaultRowHeight: 28,
    defaultColWidth: 120,
    celldata,
    dataVerification: financeDataVerification,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}
