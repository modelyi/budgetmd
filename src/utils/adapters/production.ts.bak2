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
  SPREADSHEET_STYLES,
  colLetter,
  TAX_RATE_ASSUMPTIONS,
  DeptAttributeMappingItem,
  OtherFixedAssetAdditionItem,
  ExistingAssetLedgerItem,
  BudgetYearItemForSheet,
  BudgetPeriodItemForSheet,
  OfficeLeaseSiteMasterItem,
  safeMonthlyValue
} from './shared';

/**
 * BB.2.1.A 生产制造产量计划表（主表）—— 手工填报各产成品的月度产量计划。
 *
 * 列结构（共 16 列）：3 个维度列（法人公司 | 部门 | 产品）+ 1 个度量（产量）×【全年合计】+1~12月（1×13=13）。
 * 全表仅产成品、不含在制品；产量为唯一手工填报度量，【全年合计】=SUM(1~12月)。
 * 本表与 BB.2.1.B 财务视角（生产成本）同页 Tab 切换：主表负责产量填报，
 * 财务视角按「法人公司×预算部门×产品」只读带出完工产量、单位标准成本与完工生产成本。
 */
export function buildProductionPlanResearchSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const baseHeaders = ['法人公司', '部门', '产品'];
  const N_BASE = baseHeaders.length; // 3
  const COL_SUM = N_BASE;             // 3
  const moStart = (m: number) => COL_SUM + 1 + (m - 1); // 1月=c4 ... 12月=c15
  const TOTAL_COLS = moStart(12) + 1; // 16

  baseHeaders.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });

  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  celldata.push({ r: 1, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 2, cs: 1 };

  for (let m = 1; m <= 12; m++) {
    const c = moStart(m);
    const label = `${m}月`;
    celldata.push({ r: 0, c, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  }

  items.forEach((it, idx) => {
    const r = idx + 2;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, f?: string) => {
      const cell: any = { v: val, m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 0 }) : String(val ?? ''), ct: { fa: isNum ? '#,##0' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };
    setCell(0, it.entity ?? '');
    setCell(1, it.department ?? '');
    setCell(2, it.productName ?? '');
    const colLetter = (c: number): string => {
      let s = '', n = c + 1;
      while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
      return s;
    };
    const er = r + 1;
    const sumRefs = `${colLetter(moStart(1))}${er}:${colLetter(moStart(12))}${er}`;
    // 【全年合计】=SUM(1~12月)；未显式给定 annualTotal 时按 1~12月产量示例值求和，保证示例行合计与月度数据自洽
    const annualTotal = it.annualTotal ?? Array.from({ length: 12 }, (_, i) => Number(it.months?.[`m${i + 1}`] ?? 0)).reduce((a, b) => a + b, 0);
    setCell(COL_SUM, annualTotal, true, `=SUM(${sumRefs})`);
    for (let m = 1; m <= 12; m++) setCell(moStart(m), it.months?.[`m${m}`] ?? 0, true);
  });

  const columnlen: Record<number, number> = { 0: 140, 1: 110, 2: 140 };
  columnlen[COL_SUM] = 90;
  for (let m = 1; m <= 12; m++) columnlen[moStart(m)] = 75;

  return {
    name: 'BB.2.1.A 生产制造产量计划表',
    index: 'bb21_production_plan_research',
    status: 1,
    order: 0,
    row: Math.max(items.length + 5, 10),
    column: TOTAL_COLS,
    celldata,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}


/**
 * BB.2.1.B 财务视角（生产成本）—— 与主表（BB.2.1.A）同页 Tab 切换的只读财务视角，
 * 按「法人公司×预算部门×产品」展示完工产量、单位标准成本与完工生产成本，并据以按法人公司汇总生成完工入库分录。
 *
 * 列结构（共 42 列 = 3 个维度列 + 3 个度量 ×（【全年合计】+1~12月）= 3 + 3×13）：
 *   维度（3 列）：法人公司（取 AA.2）| 预算部门（取 AA.5，默认二级部门）| 产品（取 AA.7 / 主表带出）
 *   度量（每月展开，【全年合计】在前 + 1~12月，共 13 列/度量）：
 *     ① 完工产量(台)          —— 带出主表 BB.2.1.A 同法人/同部门/同产品产量
 *     ② 单位标准成本(元/台)    —— BAA.2 产品标准成本设置带出
 *     ③ 完工生产成本(万元)     —— = 完工产量 × 单位标准成本 ÷ 10000（公式）
 * 口径：全部为系统带出 / 公式列，不可手工编辑（与 BB.3.1.C、BB.3.3.C 财务视角性质一致）；
 *   法人落点与主表一致，完工生产成本按法人公司汇总，法人分录由本表按法人公司汇总生成
 *   （完工入库：存货—库存商品(1405) (+) / 生产成本—完工转出(500199) (−)）。
 */
export function buildProductionPlanFinanceViewSheet(items: any[] = [], standardCosts: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const baseHeaders = ['法人公司', '预算部门', '产品'];
  const N_BASE = baseHeaders.length; // 3
  const subMetrics = [
    '完工产量(台)',
    '单位标准成本(元/台)',
    '完工生产成本(万元)',
  ];
  const N_MET = subMetrics.length; // 3
  const COL_SUM = N_BASE; // 3：全年合计起始列
  const moStart = (m: number) => COL_SUM + N_MET + (m - 1) * N_MET; // 1月=6
  const TOTAL_COLS = moStart(13); // 3 + 3 + 36 = 42

  // 维度列（两行制 rs:2）
  baseHeaders.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });

  // 【全年合计】（cs:3）
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

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };
  const round1 = (v: number): number => Math.round(v * 10) / 10;
  const fmt1 = (v: number): string => v.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const fmtInt = (v: number): string => v.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  // BAA.2 产品标准成本（单位标准成本，元/台）按产品名称索引
  const stdMap = new Map<string, any>();
  standardCosts.forEach((sc) => {
    const key = sc?.productName ?? sc?.productSubsystem;
    if (key) stdMap.set(String(key), sc);
  });

  items.forEach((it, idx) => {
    const r = idx + 2;
    const er = r + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: number | string, fmt: 'int' | 'amount' | 'text', f?: string) => {
      const isNum = fmt !== 'text';
      const cell: any = {
        v: val,
        m: fmt === 'int' ? fmtInt(Number(val)) : fmt === 'amount' ? fmt1(Number(val)) : String(val ?? ''),
        ct: { fa: fmt === 'int' ? '#,##0' : fmt === 'amount' ? '#,##0.0' : 'General', t: isNum ? 'n' : 'g' },
        bg: rowBg, ht: isNum ? 2 : 1, vt: 1,
      };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };

    // 维度：与主表同一法人公司 / 预算部门 / 产品
    setCell(0, it.entity ?? '', 'text');
    setCell(1, it.department ?? '', 'text');
    const productName = it.productName ?? '';
    setCell(2, productName, 'text');

    // BAA.2 单位标准成本（元/台）
    const sc = stdMap.get(String(productName)) ?? {};
    const unitCost = Number(sc.standardCost ?? 0);

    // 1~12月 3 个度量（③ = ① × ② ÷ 10000）
    let qtySum = 0;
    let costSum = 0;
    for (let m = 1; m <= 12; m++) {
      const base = moStart(m);
      const qty = Number(it.months?.[`m${m}`] ?? 0);
      const cost = round1(qty * unitCost / 10000);
      qtySum += qty;
      costSum = round1(costSum + cost);

      setCell(base,     qty,      'int');
      setCell(base + 1, unitCost, 'int');
      setCell(base + 2, cost,     'amount', `=${colLetter(base)}${er}*${colLetter(base + 1)}${er}/10000`);
    }

    // 【全年合计】3 个子列：数量与金额 = SUM(12个月对应子列)；单位标准成本为产品单位值（各月同值、不累加）
    const sumRefs = (offset: number) =>
      Array.from({ length: 12 }, (_, i) => `${colLetter(moStart(i + 1) + offset)}${er}`).join(',');
    setCell(COL_SUM,     qtySum,   'int',    `=SUM(${sumRefs(0)})`);
    setCell(COL_SUM + 1, unitCost, 'int',    `=${colLetter(moStart(1) + 1)}${er}`);
    setCell(COL_SUM + 2, costSum,  'amount', `=SUM(${sumRefs(2)})`);
  });

  const columnlen: Record<number, number> = { 0: 150, 1: 140, 2: 200 };
  for (let c = COL_SUM; c < TOTAL_COLS; c++) columnlen[c] = 90;

  return {
    name: 'BB.2.1.B 财务视角（生产成本）',
    index: 'bb21_production_plan_finance_view',
    status: 1,
    order: 1,
    row: Math.max(items.length + 5, 10),
    column: TOTAL_COLS,
    celldata,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}


/**
 * BB.3.X 进销存预算 —— 法人级单表：法人公司 × 存货类别，一表到底（平表结构，无分组行）。
 *
 * 列结构：法人公司 | 存货类别 | 年初余额 |【1月】期初数/转入数/转出数/期末数 | …… |【12月】同 | 年末余额，
 *   共 3 + 12×4 + 1 = 52 列（在集团口径主表 51 列基础上，维度列最左侧增加「法人公司」列）。
 * 行结构：一行 = 法人公司×存货类别（法人公司与存货类别为前两个维度列，连续排列，无分组行、无自动合计行）。
 *   品类：在制品（汇总行，下设料/工/费/结转 4 个小类；明细行只填转入或转出、不填期初/期末）、
 *   产成品、生产物料、研发物料、服务物料、专项储备、其他物料、自制设备用料。
 * 度量：年初余额（手工一次性，仅非明细行）、月度期初数（公式：1月=年初余额，2~12月=上月期末数滚动）、
 *   月度转入数/转出数（系统带出）、月度期末数（公式=期初+转入−转出）、年末余额（公式=12月期末数）。
 *
 * 法人取数口径：各法人的转入/转出按来源表逐来源取数，不按比例拆分（BAA.10 仅作无来源品类的兜底比例、本年度不启用）——
 *   采购入库=BB.3.3.C 财务视角各法人到货额（物料类存货转入=采购入库 + 代采购物料平价转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧平价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +；不含加成，加成款走 6001.2↔6602 不进存货） + 销售线物料明细内部供应商真实购销转入（BB.1.3.f 物料明细_财务查询 中「内部供应商」非空且≠签约主体的物料行：签约主体单体按采购价＝出库成本+加成款采购入库，加成进成本不走 6602），按提供方/接受方法人分别取数，集团合并层抵销内部加成、只保留原始出库成本，不改变集团合并层存货净额）；完工入库=BB.2.1 法人产量×BAA.2 标准成本（产成品转入=同一法人在制品结转，14xx 存货总额不变）；
 *   在制品「料」无前置物料消耗收集表，转入数由编制人员在在制品「料」行手工填写；生产物料的转出数直接取自同一法人在制品「料」的转入数（形态转换：生产物料转出 = 在制品料转入）；「工」=BB.5.1 制造费用法人、「费」=BB.5.2 制造费用 + BB.4.X.A「制造费用折旧」小计（按法人；含存量、本年新增与使用权资产）；折旧唯一入口=BB.4.5/BB.4.X.A（含使用权资产），各来源不重叠取数；
 *   其他出入库调整（盘盈/盘亏/报废、跨期补记等）=本表「转入数」/「转出数」列直接手工录入（按法人归属，与自动取数互斥、不重复计；
 *   不再单独设存货类出入库明细调整表）。产成品转出=BB.1.2 财务视角对外销售成本（法人归属按订单/合同所属法人=签约主体）；物料类存货转出另含代采购物料平价转出（BB.3.3.D 下单主体法人侧转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +）——下单主体法人侧按其法人平价转出、与受益主体法人侧平价转入配对，逐笔按各自法人取数，集团合并层抵消、不改变集团合并层存货净额；物料类存货转出另含销售线物料明细内部供应商出库转出（BB.1.3.f 物料明细_财务查询 中「内部供应商」非空且≠签约主体的物料行：提供方（内部供应商归属法人）侧按原始出库成本出库转出 −，确认 6001.2 收入与 6401.2 成本；签约主体侧按采购价＝出库成本+加成款入库并随服务消耗进 6401.1，集团合并层抵销内部购销与加成利润，只保留提供方真实出库成本）。
 * 集团口径：各法人同品类同月加总即为集团口径（仅文字口径说明，本表不新增自动合计行）。
 * 硬约束：在制品→产成品的形态转换必须在同一法人公司内部结转（法人甲的在制品只能转为法人甲的产成品，14xx 存货总额不变）；
 *   跨法人代工/调拨属内部交易，走 BJ.C 关联交易与内部抵销，不在本表内直接结转。销售线物料明细（BB.1.3.d/.f）「内部供应商」非空且≠签约主体的物料行属跨法人内部供货：
 *   单体公司层面按真实购销与业务本质处理（兄弟公司出料带加成，按原始出库成本转出并确认 6001.2 收入与 6401.2 成本，签约主体按出库成本+加成款采购进 1405/6401.1，加成进成本不走 6602）；
 *   集团合并层面进行合并抵销（抵销内部购销 6001.2 ↔ 6401.1/1405 与未实现利润，还原为真实出库成本；内部往来与增值税对冲）。本表不做跨法人形态转换。
 */
export function buildInventoryFlowBudgetSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  // 维度列：法人公司 + 存货类别（大类+小类合并，明细行用全角空格缩进）+ 年初余额
  const baseHeaders = ['法人公司', '存货类别', '年初余额'];
  const N_BASE = baseHeaders.length; // 3
  const subMetrics = ['期初数', '转入数', '转出数', '期末数'];
  const N_SUB = subMetrics.length; // 4
  const moStart = (m: number) => N_BASE + (m - 1) * N_SUB; // 1月起始列
  const COL_YEAREND = moStart(13); // 年末余额列
  // 其中:内部加成跟踪列（年度口径，不展开月度；月度变动系统后台算）
  const COL_IM_OPEN = COL_YEAREND + 1;   // 内部加成-年初
  const COL_IM_ADD = COL_YEAREND + 2;    // 内部加成-本年新增
  const COL_IM_REAL = COL_YEAREND + 3;   // 内部加成-本年实现
  const COL_IM_END = COL_YEAREND + 4;    // 内部加成-年末
  const TOTAL_COLS = COL_IM_END + 1;     // 3 + 48 + 1 + 4 = 56

  // 维度列 (r0 跨行合并)
  baseHeaders.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });

  // 1~12月 大表头(cs:4) + 子表头4个
  for (let m = 1; m <= 12; m++) {
    const base = moStart(m);
    const label = `${m}月`;
    celldata.push({ r: 0, c: base, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${base}`] = { r: 0, c: base, rs: 1, cs: N_SUB };
    subMetrics.forEach((h, i) => {
      celldata.push({ r: 1, c: base + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader } });
    });
  }

  // 年末余额 (r0 跨行合并)
  celldata.push({ r: 0, c: COL_YEAREND, v: { v: '年末余额', m: '年末余额', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  celldata.push({ r: 1, c: COL_YEAREND, v: { v: '年末余额', m: '年末余额', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_YEAREND}`] = { r: 0, c: COL_YEAREND, rs: 2, cs: 1 };
  // 其中:内部加成 4 列（r0+r1 跨行合并）
  const imHeaders = ['其中:内部加成-年初', '其中:内部加成-本年新增', '其中:内部加成-本年实现', '其中:内部加成-年末'];
  imHeaders.forEach((h, i) => {
    const cc = COL_IM_OPEN + i;
    celldata.push({ r: 0, c: cc, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c: cc, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${cc}`] = { r: 0, c: cc, rs: 2, cs: 1 };
  });

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  // 存货类别显示文案：在制品汇总="在制品"，料/工/费/结转 用全角空格缩进，其余大类直接显示
  const WIP_DETAIL_MINOR = new Set(['料', '工', '费', '结转']);
  const isWipDetail = (it: any) => it.majorCategory === '在制品' && WIP_DETAIL_MINOR.has(it.minorCategory);
  const isWipSubtotal = (it: any) => it.majorCategory === '在制品' && (it.minorCategory === '' || it.minorCategory == null);
  const categoryLabel = (it: any): string => {
    if (isWipDetail(it)) return `　　${it.minorCategory}`; // 两个全角空格缩进
    return it.majorCategory ?? '';
  };

  items.forEach((it, idx) => {
    const r = idx + 2;
    const er = r + 1;
    // 在制品汇总行用浅蓝小计背景色；明细行交替白/浅灰
    const rowBg = isWipSubtotal(it) ? '#dbeafe' : (idx % 2 === 1 ? '#f8fafc' : '#ffffff');
    const setCell = (c: number, val: number | string, isNum = false, formula?: string) => {
      celldata.push({
        r, c,
        v: {
          v: val,
          m: isNum ? (typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : '0.0') : String(val ?? ''),
          ct: { fa: isNum ? '#,##0.00' : 'General', t: isNum ? 'n' : 'g' },
          bg: rowBg, ht: isNum ? 2 : 1, vt: 1,
          ...(formula ? { f: formula } : {}),
        }
      });
    };
    setCell(0, it.legalEntity ?? '');        // 法人公司（维度列最左）
    setCell(1, categoryLabel(it));           // 存货类别（含缩进）

    const detail = isWipDetail(it);
    // 年初余额：明细归集行（料/工/费/结转）不显示
    if (!detail) setCell(2, it.openingBalance ?? 0, true);

    let rollingClosing = it.openingBalance ?? 0;
    for (let m = 1; m <= 12; m++) {
      const base = moStart(m);
      const md = it.months?.[`m${m}`] ?? {};
      const transferIn = md.transferIn ?? 0;
      const transferOut = md.transferOut ?? 0;
      const opening = rollingClosing;
      const closing = opening + transferIn - transferOut;

      if (detail) {
        // 明细归集行：只填转入或转出（不填期初/期末）
        if (it.minorCategory === '结转') {
          setCell(base + 2, transferOut, true); // 仅转出
        } else {
          setCell(base + 1, transferIn, true);  // 仅转入
        }
      } else {
        // 非明细行（在制品汇总/产成品/各物料大类）：完整期初+转入+转出+期末
        // 期初公式：1月=年初余额(c=2)；2~12月=上月期末数
        const openingFormula = m === 1 ? `=${colLetter(2)}${er}` : `=${colLetter(moStart(m - 1) + 3)}${er}`;
        setCell(base + 0, opening, true, openingFormula);
        setCell(base + 1, transferIn, true);
        setCell(base + 2, transferOut, true);
        const closingFormula = `=${colLetter(base)}${er}+${colLetter(base + 1)}${er}-${colLetter(base + 2)}${er}`;
        setCell(base + 3, closing, true, closingFormula);
        rollingClosing = closing;
      }
    }
    // 年末余额：仅非明细行填写
    if (!detail) setCell(COL_YEAREND, rollingClosing, true, `=${colLetter(moStart(12) + 3)}${er}`);
    // 其中:内部加成 4 列（业务部门不填，系统按 BB.3.3.D 自动算）
    if (!detail) {
      const imOpen = it.internalMarkupOpening ?? 0;
      const imAdd = it.internalMarkupAdd ?? 0;
      const imRealized = it.internalMarkupRealized ?? 0;
      setCell(COL_IM_OPEN, imOpen, true);
      setCell(COL_IM_ADD, imAdd, true);
      setCell(COL_IM_REAL, imRealized, true);
      setCell(COL_IM_END, imOpen + imAdd - imRealized, true, `=${colLetter(COL_IM_OPEN)}${er}+${colLetter(COL_IM_ADD)}${er}-${colLetter(COL_IM_REAL)}${er}`);
    }
  });

  const columnlen: Record<number, number> = { 0: 150, 1: 160, 2: 100 }; // 法人公司/存货类别列宽加大以容纳缩进文字
  for (let m = 1; m <= 12; m++) {
    const base = moStart(m);
    for (let i = 0; i < N_SUB; i++) columnlen[base + i] = 85;
  }
  columnlen[COL_YEAREND] = 100;
  columnlen[COL_IM_OPEN] = 110; columnlen[COL_IM_ADD] = 120; columnlen[COL_IM_REAL] = 120; columnlen[COL_IM_END] = 110;

  return {
    name: 'BB.3.X 进销存预算',
    index: 'bb3x_inventory_flow_budget',
    status: 1,
    order: 0,
    row: Math.max(items.length + 5, 10),
    column: TOTAL_COLS,
    celldata,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}



/**
 * 23. 基础表-产品单位成本预算表 Spreadsheet Adapter (简化版: 7列人工录入)
 */
export function buildProductStandardCostSheet(
  items: ProductStandardCostItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
) {
  const celldata: any[] = [];

  // 简化版列结构: 产品 | 标准成本 | 备注
  const headers = ['产品', '标准成本(元)', '备注'];

  headers.forEach((h, c) => {
    celldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  items.forEach((it, idx) => {
    const r = idx + 1;
    const isEven = idx % 2 === 0;
    const rowBg = isEven ? '#ffffff' : '#f7f9fc';

    const setCell = (c: number, val: any, isNum: boolean = false) => {
      celldata.push({
        r, c,
        v: {
          v: val,
          m: isNum && typeof val === 'number'
            ? val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : String(val ?? ''),
          ct: { fa: isNum ? '#,##0.00' : 'General', t: isNum ? 'n' : 'g' },
          bg: rowBg,
          ht: isNum ? 2 : 1,
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    };

    setCell(0, it.productSubsystem || '');
    setCell(1, it.thisYearQuota, true);   // 标准成本：手工填写
    setCell(2, it.remarks || '');
  });

  return {
    name: 'BAA.2 产品标准成本设置',
    index: 'ba2_product_standard_cost',
    status: 1,
    order: 0,
    row: Math.max(items.length + 10, 20),
    column: 3,
    celldata,
    config: {
      merge: {},
      rowlen: { 0: 32 },
      columnlen: {
        0: 260,   // 产品
        1: 140,   // 标准成本
        2: 280    // 备注
      },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };
}


/**
 * 24. 工时标准成本编制表 Spreadsheet Adapter
 */
export function buildHourlyStandardCostSheet(
  items: HourlyStandardCostItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
) {
  const celldata: any[] = [];

  // BAA.3 的序号属于展示装饰，不进入 Univer 字段模型。
  const headers = ['岗位', '职级', '费率 (万元/标准工时)', '备注'];

  headers.forEach((h, c) => {
    celldata.push({
      r: 0, c,
      v: {
        v: h,
        m: h,
        ct: { fa: 'General', t: 'g' },
        bg: '#002f6c', // 项目规范深海蓝
        fc: '#ffffff',
        bl: 1,
        ht: 1,
        vt: 1
      }
    });
  });

  items.forEach((it, idx) => {
    const r = idx + 1;
    const isEven = idx % 2 === 1;
    const rowBg = isEven ? '#ecfdf5' : '#ffffff';

    const setCell = (c: number, val: any, isNum: boolean = false, fmt: string = 'General') => {
      celldata.push({
        r, c,
        v: {
          v: val,
          m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : String(val ?? ''),
          ct: { fa: fmt, t: isNum ? 'n' : 'g' },
          bg: rowBg,
          ht: isNum ? 2 : (c === 0 ? 1 : 0),
          vt: 1
        }
      });
    };

    setCell(0, it.position);
    setCell(1, it.rank);
    setCell(2, it.hourlyCost, true, '#,##0.0000');
    setCell(3, it.remarks || '');
  });

  const maxHourlyRows = Math.max(items.length + 10, 25);
  const hourlyDataVerification: Record<string, any> = {};

  return {
    name: 'BAA.3 服务人工标准成本',
    index: 206,
    status: 0,
    order: 1,
    row: maxHourlyRows,
    column: 4,
    celldata,
    config: {
      merge: {},
      rowlen: { 0: 32 },
      columnlen: { 0: 50, 1: 160, 2: 110, 3: 160 },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };
}


export function buildMaterialMasterSheet(items: MaterialMasterItem[]) {
  const headers = ['物料编码', '物料名称', '物料类型', '计量单位'];
  const celldata: any[] = [];
  headers.forEach((h, c) => celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, vt: 1 } }));
  items.forEach((item, i) => {
    const r = i + 1; const bg = i % 2 ? '#f8fafc' : '#ffffff';
    [item.materialCode, item.materialName, item.materialType, item.unit].forEach((value, c) => celldata.push({ r, c, v: { v: value, m: value, ct: { fa: 'General', t: 'g' }, bg, vt: 1 } }));
  });
  return { name: 'AA.11 物料主数据', index: 211, status: 0, order: 0, row: Math.max(items.length + 10, 25), column: 4, celldata, config: { merge: {}, rowlen: { 0: 30 }, columnlen: { 0: 130, 1: 180, 2: 110, 3: 80 } } };
}


/**
 * 25. 物料标准成本编制表 Spreadsheet Adapter
 */
export function buildMaterialStandardCostSheet(
  items: MaterialStandardCostItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
) {
  const celldata: any[] = [];
  const dataVerification: Record<string, any> = {};
  const dropdown = (value: string) => ({ type: 'dropdown', type2: null, value1: value, value2: '', checked: false, remote: false, prohibitInput: false, hintShow: true, hintText: '请选择好件/坏件或物料编码' });
  const headers = [
    '部件类别 (好件/坏件)', '物料编码', '物料名称', '物料类型', '计量单位', '标准成本 (万元/标准单位)', '核算说明'
  ];

  headers.forEach((h, c) => {
    celldata.push({
      r: 0, c,
      v: {
        v: h,
        m: h,
        ct: { fa: 'General', t: 'g' },
        bg: '#002f6c', // 项目规范深海蓝
        fc: '#ffffff',
        bl: 1,
        ht: 1,
        vt: 1
      }
    });
  });

  items.forEach((it, idx) => {
    const r = idx + 1;
    const isEven = idx % 2 === 1;
    const rowBg = isEven ? '#fffbeb' : '#ffffff';

    const setCell = (c: number, val: any, isNum: boolean = false, fmt: string = 'General') => {
      celldata.push({
        r, c,
        v: {
          v: val,
          m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : String(val ?? ''),
          ct: { fa: fmt, t: isNum ? 'n' : 'g' },
          bg: rowBg,
          ht: isNum ? 2 : (c === 0 ? 1 : 0),
          vt: 1
        }
      });
    };

    const master = MATERIAL_MASTER_MAP[it.materialCode];
    setCell(0, it.partCategory);
    setCell(1, it.materialCode);
    setCell(2, master?.materialName || it.materialName);
    setCell(3, master?.materialType || it.materialType);
    setCell(4, master?.unit || it.unit);
    setCell(5, it.standardCost == null ? '待维护 BAA.4 成本' : it.standardCost, it.standardCost != null, '¥#,##0.0000');
    setCell(6, it.remarks || '');
    dataVerification[`${r}_0`] = dropdown('好件,坏件');
    dataVerification[`${r}_1`] = dropdown(Object.keys(MATERIAL_MASTER_MAP).join(','));
  });

  // 预留新增行也必须带有真实选项，避免点击时只显示“请选择字典值”。
  for (let r = items.length + 1; r < Math.max(items.length + 10, 25); r++) {
    dataVerification[`${r}_0`] = dropdown('好件,坏件');
    dataVerification[`${r}_1`] = dropdown(Object.keys(MATERIAL_MASTER_MAP).join(','));
  }


  return {
    name: 'BAA.4 服务物料定额标准',
    index: 207,
    status: 0,
    order: 2,
    row: Math.max(items.length + 10, 25),
    column: 7,
    celldata,
    dataVerification,
    config: {
      merge: {},
      rowlen: { 0: 32 },
      columnlen: { 0: 160, 1: 130, 2: 160, 3: 100, 4: 70, 5: 160, 6: 260 },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };
}


export function buildInventoryBudgetSheet(items: InventoryBudgetItem[]): any {
  const celldata: any[] = [];

  // 列头样式配色
  const HDR_BG_BASE   = '#1e3a5f';  // 基础信息列 - 深蓝
  const HDR_BG_IN     = '#065f46';  // 流入相关  - 深绿
  const HDR_BG_OUT    = '#7f1d1d';  // 流出相关  - 深红
  const HDR_BG_BAL    = '#3730a3';  // 月末库存  - 深紫
  const ROW_BG_IN     = '#f0fdf4';  // 流入行底色
  const ROW_BG_OUT    = '#fff1f2';  // 流出行底色
  const ROW_BG_BAL    = '#eef2ff';  // 库存行底色
  const ROW_BG_IN_ALT = '#dcfce7';
  const ROW_BG_OUT_ALT= '#ffe4e6';
  const ROW_BG_BAL_ALT= '#e0e7ff';

  const mkHdr = (v: string, bg: string) => ({
    v, m: v,
    ct: { fa: 'General', t: 'g' },
    bg, fc: '#ffffff', bl: 1, ht: 1, vt: 1, tb: 2, fs: 9
  });

  const mkNum = (v: number | null, bg: string, formula?: string) => ({
    v: formula ? null : (v ?? 0),
    m: formula ? '' : String(v ?? 0),
    f: formula,
    ct: { fa: '#,##0.00', t: 'n' },
    bg, fc: '#1e293b', ht: 2, vt: 1, fs: 9
  });

  const mkText = (v: string, bg: string, bold = false) => ({
    v, m: v,
    ct: { fa: 'General', t: 'g' },
    bg, fc: '#1e293b', bl: bold ? 1 : 0, ht: 1, vt: 1, fs: 9
  });

  // 列头行 r=0
  const headers = [
    { label: '序号',     bg: HDR_BG_BASE },
    { label: '预算组织', bg: HDR_BG_BASE },
    { label: '存货类别', bg: HDR_BG_BASE },
    { label: '名称',     bg: HDR_BG_BASE },
    { label: '单位',     bg: HDR_BG_BASE },
    { label: '输入类型', bg: HDR_BG_BASE },
    { label: '期初库存', bg: HDR_BG_BASE },
    { label: '1月',  bg: HDR_BG_IN },
    { label: '2月',  bg: HDR_BG_IN },
    { label: '3月',  bg: HDR_BG_IN },
    { label: '4月',  bg: HDR_BG_IN },
    { label: '5月',  bg: HDR_BG_IN },
    { label: '6月',  bg: HDR_BG_IN },
    { label: '7月',  bg: HDR_BG_IN },
    { label: '8月',  bg: HDR_BG_IN },
    { label: '9月',  bg: HDR_BG_IN },
    { label: '10月', bg: HDR_BG_IN },
    { label: '11月', bg: HDR_BG_IN },
    { label: '12月', bg: HDR_BG_IN },
    { label: '备注',     bg: HDR_BG_BASE },
  ];

  headers.forEach(({ label, bg }, c) => {
    celldata.push({ r: 0, c, v: mkHdr(label, bg) });
  });

  // 每条 item 展开 3 行：流入(A) / 流出(B) / 月末库存(C)
  items.forEach((it, idx) => {
    const baseRow = 1 + idx * 3;  // r_A = baseRow, r_B = baseRow+1, r_C = baseRow+2
    const isEven = idx % 2 === 0;

    const bgIn  = isEven ? ROW_BG_IN  : ROW_BG_IN_ALT;
    const bgOut = isEven ? ROW_BG_OUT : ROW_BG_OUT_ALT;
    const bgBal = isEven ? ROW_BG_BAL : ROW_BG_BAL_ALT;

    // 行 A: 流入
    celldata.push({ r: baseRow,   c: 0, v: mkText(String(idx + 1),       bgIn) });
    celldata.push({ r: baseRow,   c: 1, v: mkText(it.legalEntity,       bgIn) });
    celldata.push({ r: baseRow,   c: 2, v: mkText(it.stockType,         bgIn) });
    celldata.push({ r: baseRow,   c: 3, v: mkText(it.itemName,          bgIn, true) });
    celldata.push({ r: baseRow,   c: 4, v: mkText(it.unit,              bgIn) });
    celldata.push({ r: baseRow,   c: 5, v: { ...mkText('流入', bgIn), bg: HDR_BG_IN, fc: '#ffffff', bl: 1 } });
    celldata.push({ r: baseRow,   c: 6, v: mkNum(it.openingBalance,     bgIn) });
    for (let m = 1; m <= 12; m++) {
      celldata.push({ r: baseRow, c: 6 + m, v: mkNum(safeMonthlyValue(it.monthlyIn, m), bgIn) });
    }
    celldata.push({ r: baseRow,   c: 19, v: mkText(it.notes || '',     bgIn) });

    // 行 B: 流出
    celldata.push({ r: baseRow+1, c: 0, v: mkText('',                  bgOut) });
    celldata.push({ r: baseRow+1, c: 1, v: mkText('',                  bgOut) });
    celldata.push({ r: baseRow+1, c: 2, v: mkText('',                  bgOut) });
    celldata.push({ r: baseRow+1, c: 3, v: mkText('',                  bgOut) });
    celldata.push({ r: baseRow+1, c: 4, v: mkText('',                  bgOut) });
    celldata.push({ r: baseRow+1, c: 5, v: { ...mkText('流出', bgOut), bg: HDR_BG_OUT, fc: '#ffffff', bl: 1 } });
    celldata.push({ r: baseRow+1, c: 6, v: mkNum(null,                 bgOut) });
    for (let m = 1; m <= 12; m++) {
      celldata.push({ r: baseRow+1, c: 6 + m, v: mkNum(safeMonthlyValue(it.monthlyOut, m), bgOut) });
    }
    celldata.push({ r: baseRow+1, c: 19, v: mkText('',                 bgOut) });

    // 行 C: 月末库存 (公式: 期初 + ∑In[1..m] - ∑Out[1..m])
    // 期初库存在 Row A, col G (index 6) → Spreadsheet cell ref = G + (baseRow+1)
    // Row A 的月份数据: cols H(7)~S(18)
    // Row B 的月份数据: cols H(7)~S(18) (同行 baseRow+1 + 1 = baseRow+2 for balance)
    const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'];
    // Row A = baseRow+1 in 1-based Spreadsheet formula (r is 0-based, formula rows 1-based = r+1)
    const rA1 = baseRow + 1;   // 1-based row index for Row A
    const rB1 = baseRow + 2;   // 1-based row index for Row B

    celldata.push({ r: baseRow+2, c: 0, v: mkText('',                  bgBal) });
    celldata.push({ r: baseRow+2, c: 1, v: mkText('',                  bgBal) });
    celldata.push({ r: baseRow+2, c: 2, v: mkText('',                  bgBal) });
    celldata.push({ r: baseRow+2, c: 3, v: mkText('',                  bgBal) });
    celldata.push({ r: baseRow+2, c: 4, v: mkText('',                  bgBal) });
    celldata.push({ r: baseRow+2, c: 5, v: { ...mkText('月末库存', bgBal), bg: HDR_BG_BAL, fc: '#ffffff', bl: 1 } });
    // 期初 (col 6 = G) from Row A
    celldata.push({ r: baseRow+2, c: 6, v: mkNum(null, bgBal, `=G${rA1}`) });

    for (let m = 1; m <= 12; m++) {
      const col = 6 + m;  // H=7 for m1 ... S=18 for m12
      const colL = letters[col]; // col letter
      // balance[m] = openingBalance + SUM(In[1..m]) - SUM(Out[1..m])
      // opening = G_rA; In cols = H..colL in row rA; Out cols = H..colL in row rB
      const inRange  = m === 1 ? `${colL}${rA1}` : `H${rA1}:${colL}${rA1}`;
      const outRange = m === 1 ? `${colL}${rB1}` : `H${rB1}:${colL}${rB1}`;
      const formula = `=G${rA1}+SUM(${inRange})-SUM(${outRange})`;
      celldata.push({
        r: baseRow+2, c: col,
        v: { ...mkNum(null, bgBal, formula), ct: { fa: '#,##0.00', t: 'n' } }
      });
    }
    celldata.push({ r: baseRow+2, c: 19, v: mkText('',                 bgBal) });
  });

  const maxInvRows = Math.max(items.length * 3 + 5, 20);
  const invDataVerification: Record<string, any> = {};
  const invDropdownCols = [
    { col: 1, val: SIGNING_ENTITIES.join(',') }, // 预算组织(法人)
    { col: 2, val: '产成品,原材料,在制品,发出商品,包装物及低值易耗品' }
  ];

  for (let r = 1; r < maxInvRows; r++) {
    invDropdownCols.forEach(({ col, val }) => {
      invDataVerification[`${r}_${col}`] = {
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
    name: 'BB.2.2 存货预算',
    index: 'bb23_inventory_budget',
    status: 1,
    order: 0,
    hide: 0,
    row: maxInvRows,
    column: 20,
    defaultRowHeight: 24,
    defaultColWidth: 70,
    celldata,
    dataVerification: invDataVerification,
    config: {
      columnlen: {
        0: 40,    // 序号
        1: 120,   // 预算组织
        2: 75,    // 存货类别
        3: 175,   // 名称
        4: 50,    // 单位
        5: 72,    // 输入类型
        6: 75,    // 期初库存
        7: 68, 8: 68, 9: 68, 10: 68, 11: 68, 12: 68,
        13: 68, 14: 68, 15: 68, 16: 68, 17: 68, 18: 68,
        19: 180   // 备注
      }
    }
  };
}


/**
 * BB.3.X.b 转入转出逻辑明细表（口径说明表）
 * 表格式呈现 BB.3.X 进销存预算各存货品类的转入来源、转出去向与处理规则。
 */
export function buildInventoryFlowRuleDetailSheet(): object {
  const headers = ['存货品类', '方向', '数据来源 / 去向', '处理规则（口径）'];
  const celldata: any[] = [];

  headers.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  });

  const rows: [string, string, string, string][] = [
    ['生产物料', '转入', 'BB.3.3.C「到货额」arrivalAmount（物料类别=生产物料，按法人） + 代采购物料平价转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧平价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +；不含加成，加成款走 6001.2↔6602 不进存货）', '采购入库，按 AB.9（IMC-01 生产物料）归集，随到货自动关联；代采购物料平价转入为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'],
    ['生产物料', '转出', '取同一法人在制品「料」转入数（生产物料转出 = 在制品料转入） + 代采购物料平价转出（BB.3.3.D 下单主体法人侧转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +）', '生产领料形态转换：直接取自在制品「料」行手工录入的转入数，生产物料转出对应在制品料投入；代采购物料平价转出为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'],
    ['研发物料', '转入', 'BB.3.3.C「到货额」arrivalAmount（物料类别=研发物料，按法人） + 代采购物料平价转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧平价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +；不含加成，加成款走 6001.2↔6602 不进存货）', '采购入库，按 AB.9（IMC-02 研发物料）归集；代采购物料平价转入为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'],
    ['研发物料', '转出', 'BAP.2「月度消耗金额」monthlyAmount（领料用途=研发类、物料类别=研发物料）→ 6603 研发费用 + 代采购物料平价转出（BB.3.3.D 下单主体法人侧转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +）', '研发试制/测试验证/实验开发消耗；代采购物料平价转出为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'],
    ['服务物料', '转入', 'BB.3.3.C「到货额」arrivalAmount（物料类别=服务物料，按法人） + 代采购物料平价转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧平价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +；不含加成，加成款走 6001.2↔6602 不进存货） + 销售线物料明细内部供应商真实购销转入（BB.1.3.f 物料明细_财务查询 中「内部供应商」非空且≠签约主体的物料行：签约主体单体按采购价＝出库成本+加成款采购入库，加成进成本不走 6602，集团合并层抵销内部购销与加成利润、只保留原始出库成本）', '采购入库，按 AB.9（IMC-03 服务物料）归集；内部交易在集团合并层抵销、不改变集团合并层存货净额'],
    ['服务物料', '转出', 'BB.1.3.d/f「serviceMaterials.monthlyCosts 成本」（服务物料明细）→ 640103 主营业务成本（法人落点=签约主体）+ 代采购物料平价转出（BB.3.3.D 下单主体法人侧转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +） + 销售线物料明细内部供应商出库转出（BB.1.3.d/.f 物料明细「内部供应商」非空且≠签约主体的物料行：提供方（内部供应商归属法人）侧按原始出库成本出库转出 −，确认 6001.2 收入与 6401.2 成本；签约主体单体采购价含加成并随服务消耗进 6401.1）', '售后维保/交付调试/客户现场技术支持消耗；单体公司层面按业务本质处理，集团合并层抵销内部购销与加成利润，只保留提供方真实出库成本'],
    ['专项储备', '转入', 'BB.3.3.C「到货额」arrivalAmount（物料类别=专项储备，按法人） + 代采购物料平价转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧平价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +；不含加成，加成款走 6001.2↔6602 不进存货）', '采购入库，按 AB.9（IMC-04 专项储备）归集；代采购物料平价转入为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'],
    ['专项储备', '转出', '本表「转出数」列手工录入（手工调整，大类=专项储备） + 代采购物料平价转出（BB.3.3.D 下单主体法人侧转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +）', '应急调拨/定期报废，战略保供/长周期关键件/应急安全库存，日常不轻易出库；代采购物料平价转出为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'],
    ['其他物料', '转入', 'BB.3.3.C「到货额」arrivalAmount（物料类别=其他物料，按法人） + 代采购物料平价转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧平价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +；不含加成，加成款走 6001.2↔6602 不进存货）', '采购入库，按 AB.9（IMC-05 其他物料）归集；代采购物料平价转入为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'],
    ['其他物料', '转出', 'BAP.2「月度消耗金额」monthlyAmount（领料用途=销售类/管理类及其他、物料类别=其他物料）→ 6601 销售费用 / 6602 管理费用 + 代采购物料平价转出（BB.3.3.D 下单主体法人侧转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +）', '行政办公/仓储包装/厂务运维及零星杂项通用物料；代采购物料平价转出为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'],
    ['自制设备用料', '转入', 'BB.3.3.C「到货额」arrivalAmount（物料类别=自制设备用料，按法人） + 代采购物料平价转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧平价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +；不含加成，加成款走 6001.2↔6602 不进存货）', '采购入库，按 AB.9（IMC-06 自制设备用料）归集；代采购物料平价转入为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'],
    ['自制设备用料', '转出', 'BB.4.1.c「月度领料金额」monthlyAmount → 1604 在建工程 + 代采购物料平价转出（BB.3.3.D 下单主体法人侧转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +）', '自制设备/自制在建工程建造装配专用，转固后按 AA.9 参数计提折旧；代采购物料平价转出为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'],
    ['在制品-料', '转入', '本表手工填写（无前置收集表，根据生产计划填报投料成本）', '在制品成本「料」小类：无前置物料消耗收集表，由编制人员在在制品「料」行直接手工录入；其金额同时自动驱动生产物料的转出数'],
    ['在制品-工', '转入', 'BB.5.1「制造费用」mfgExpense（按法人）', '在制品成本「工」小类，直接人工'],
    ['在制品-费', '转入', 'BB.5.2「制造费用」mfgExpense + BB.4.X.A「制造费用折旧」小计（按法人，含存量、本年新增与使用权资产折旧）', '在制品成本「费」小类，制造费用（含折旧：固定资产/无形资产折旧 + 使用权资产折旧）；折旧唯一入口=BB.4.5 增量资产折旧计算表（使用权资产与其它新增资产同链路）/BB.4.X.A 折旧小计，各来源不重叠取数、全链只取一次，与 BB.5.2 不得重叠取数'],
    ['在制品-结转', '转出', 'BB.2.1「月度产量」monthlyProduction × BAA.2「标准成本」standardCost', '完工生产成本，同一法人内转出至产成品（14xx 存货总额不变）'],
    ['产成品', '转入', '在制品「结转」转出（同一笔完工入库）', '完工入库增加产成品（14xx 存货总额不变）'],
    ['产成品', '转出', 'BB.1.2.c「预计销售成本」monthlyCost（对外销售，法人=签约主体）', '随对外销售成本结转（驱动主营业务成本硬件直接材料）'],
    ['各品类（手工调整）', '转入/转出', '本表「转入数」/「转出数」列手工录入（手工调整，按本表法人与存货类别行直接填列）', '盘盈/盘亏/报废、跨期补记等手工调整，作为各品类转入/转出的补充调整来源（与自动取数互斥、不重复计）'],
  ];

  rows.forEach((row, idx) => {
    const r = idx + 1;
    const rowBg = idx === rows.length - 1 ? '#fef9c3' : (idx % 2 === 1 ? '#f8fafc' : '#ffffff');
    row.forEach((val, c) => {
      celldata.push({
        r, c,
        v: {
          v: val, m: val,
          ct: { fa: '@', t: 's' },
          bg: rowBg, fc: '#0f172a', ht: 0, vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    });
  });

  return {
    name: 'BB.3.X.b 转入转出逻辑明细表',
    index: 'bb3x_transfer_rule_detail',
    status: 0,
    order: 1,
    hide: 0,
    row: rows.length + 6,
    column: headers.length,
    defaultRowHeight: 30,
    celldata,
    config: {
      rowlen: { 0: 30 },
      columnlen: { 0: 140, 1: 70, 2: 320, 3: 340 }
    }
  };
}
