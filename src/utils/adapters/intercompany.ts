import { createMonthlyBudgetSheet } from './declarativeSheetBuilder';
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
  ADMIN_LEVEL2_DEPARTMENT_OPTIONS,
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

export function buildIntercompanyMarkupRatesSheet(items: IntercompanyMarkupRateItem[]): any {
  const celldata: any[] = [];
  const headers = [
    '序号', '内部交易类型', '预算项目', '加成比例'
  ];


  // Headers
  headers.forEach((h, c) => {
    celldata.push({
      r: 0, c,
      v: {
        v: h,
        m: h,
        ct: { fa: 'General', t: 'g' },
        ...SPREADSHEET_STYLES.indigoHeader
      }
    });
  });

  // Data rows
  items.forEach((it, idx) => {
    const r = idx + 1;
    const setCell = (c: number, val: any, isNum: boolean = false, fmt: string = 'General') => {
      celldata.push({
        r, c,
        v: {
          v: val,
          m: isNum && typeof val === 'number' ? (fmt.includes('%') ? `${val.toFixed(2)}%` : val.toLocaleString()) : String(val ?? ''),
          ct: { fa: fmt, t: isNum ? 'n' : 'g' },
          ht: isNum ? 2 : 1,
          vt: 1
        }
      });
    };

    setCell(0, idx + 1);
    setCell(1, it.internalTransactionType);
    setCell(2, it.budgetProject);
    setCell(3, it.markupRatePct, true, '0.00%');
  });

  const maxMarkupRows = Math.max(items.length + 10, 30);
  const markupDataVerification: Record<string, any> = {};
  const markupDropdownCols = [
    { col: 1, val: '代采购物料,代采购资产,内部职场租赁,资产转卖' },
    { col: 2, val: BUDGET_PROJECT_MASTER_DATA.map((p: any) => p.name).filter(Boolean).join(',') }
  ];

  for (let r = 1; r < maxMarkupRows; r++) {
    markupDropdownCols.forEach(({ col, val }) => {
      markupDataVerification[`${r}_${col}`] = {
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
    name: 'BAA.11 关联交易加成比例',
    index: 101,
    status: 1,
    order: 1,
    row: maxMarkupRows,
    column: 4,
    celldata,
    dataVerification: markupDataVerification,
    config: {
      merge: {},
      rowlen: { 0: 30 },
      columnlen: { 0: 55, 1: 140, 2: 200, 3: 120 }
    }
  };
}


/**
 * BB.4.2.b 内部职场租赁（主表 = 登记层，两行制表头）
 * 表样列 67 = 维度 15（场所(BAA.6.a) / 租赁标的(房产/工位名称) / 出租方(法人) / 承租方(法人) / 预算项目 / 预算部门 /
 *                     租赁期起始月 / 租赁期终止月 / 租赁期限(月) / 租赁期限 / 租赁类型 / 租赁面积(㎡) / 面积占比(%) /
 *                     单价(元/㎡·月)(BAA.6.b带出、仅内部持有场所市场单价) / 加成比例%(BAA.11带出)）
 *           + 度量 4×13 = 52（【全年合计】+1~12月，每组 4 子列：内部租金(万元) / 加成款(万元) /
 *                              出租方折旧成本(万元) / 应收租金余额(万元)）。
 * 口径（已定）：
 *   ① 租金基数 = 单价 × 租赁面积：内部租金[月] = 单价(元/㎡·月) × 租赁面积(㎡) ÷ 10000 × 当月在租期内(1/0)；
 *      单价按「年度×场所×公司」取 BAA.6.b（内部场所=市场单价；BAA.6.b 仅供内部职场租赁，外部租入场所的
 *      面积与合同单价由 BB.4.2.a 按对外合同本表录入）；
 *   ② 加成款[月] = 内部租金[月] × 加成比例%（BAA.11，内部交易类型=内部职场租赁）；
 *   ③ 应收租金余额[月] = 累计（内部租金+加成款）− 累计结算收付；本表不设结算收付列（结算按合同约定、来自内部结算登记），
 *      示例按「次月结清上月租金」测算，故月末余额 = 当月内部租金 + 当月加成款；
 *      【全年合计】列的应收租金余额取 12 月末余额（余额口径不按月求和，其余三个度量按各月求和）；
 *   ④ 出租方侧只有「出租方折旧成本、应收租金余额」两个数，不单独立表，挂本表末两列；
 *      出租方折旧成本由 BB.4.4 存量资产折旧 / BB.4.5 增量资产折旧按出租方(法人)+场所带出；
 *   ⑤ 「租赁期限(月)」为派生列（系统带出、不可手工录入）= 租赁期终止月 − 租赁期起始月 + 1，并在其后展示
 *      「租赁期限」档位列（引用 AB.16 租赁期限字典，系统按该月数落到档位、不可手工选）——与 BB.4.2.a 外部职场租赁
 *      同名、同说明、同录入方式，两表共用同一字典；两列同源，用于展示整体租期并作为资本化判定依据；
 *   ⑥ 某月是否在租期内由「租赁期起始月/租赁期终止月」判定（1/0）；租赁类型（系统带出、不可手工选）由「租赁期限」派生：
 *      一年以内→费用化(一年以内)、一年以上→资本化(大于一年)；资本化判定唯一来源＝整体租期（不看剩余租期）：
 *      整体租期 > 12 个月 → 资本化，≤ 12 个月 → 费用化；同一场所不同合同各自判断；
 *      结果口径：一年以上→资本化（形成使用权资产 1621 与租赁负债 2602，由 BB.4.2.b.1 按月测算折旧与利息）；
 *      一年以下（含 12 个月）→费用化（月租金直接进当期费用，不形成使用权资产、不确认租赁负债）。
 * 下游：资本化合同的承租方测算（使用权资产折旧/利息费用/本金偿付）由同表单的 BB.4.2.b.1 内部职场租赁·财务视角承载；
 *      费用化合同不进 BB.4.2.b.1，其租金费用即本表内部租金。
 */
export function buildIntercompanyLeasingSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  // 维度列 (Col 0 ~ 12, rs: 2)
  const dimHeaders = [
    '场所', '租赁标的(房产/工位名称)', '出租方(法人)', '承租方(法人)', '预算项目', '预算部门',
    '租赁期起始月', '租赁期终止月', '租赁期限(月)', '租赁期限', '租赁类型', '租赁面积(㎡)', '面积占比(%)',
    '单价(元/㎡·月)', '加成比例%(BAA.11带出)'
  ];
  const DIM_COLS = dimHeaders.length;                        // 15
  const C_LOCATION = 0, C_LEASE_OBJECT = 1, C_LESSOR = 2, C_LESSEE = 3, C_PROJECT = 4, C_DEPT = 5;
  const C_START = 6, C_END = 7, C_TERM_MONTHS = 8, C_TERM = 9;
  const C_TYPE = 10, C_AREA = 11, C_RATIO = 12, C_UNIT_PRICE = 13, C_MARKUP = 14;

  // 度量子列：内部租金 / 加成款 / 出租方折旧成本 / 应收租金余额
  const N_SUB = 4;
  const subMetrics = ['内部租金(万元)', '加成款(万元)', '出租方折旧成本(万元)', '应收租金余额(万元)'];
  const COL_SUM = DIM_COLS;                                  // 【全年合计】起始列 = col 15
  const moBase = (mo: number) => COL_SUM + N_SUB + mo * N_SUB; // 1月=c19 … 12月=c63
  const TOTAL_COLS = moBase(12);                             // 67
  const COL_LAST_BAL = moBase(11) + 3;                       // 12月末余额列 = col 66

  const sumBg = '#001e4a';
  const subHdrBg = '#001e4a';
  const hdrBg = '#002f6c';
  const hdrFc = '#ffffff';

  // Row 0：维度列 + 时间分组大表头（【全年合计】cs=4、1~12月各 cs=4）
  dimHeaders.forEach((h, ci) => {
    celldata.push({ r: 0, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc } });
    celldata.push({ r: 1, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc } });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  });
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader, bg: sumBg, fc: hdrFc } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: N_SUB };
  subMetrics.forEach((h, i) => {
    celldata.push({ r: 1, c: COL_SUM + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumSubHeader, bg: sumBg, fc: hdrFc } });
  });
  for (let mo = 0; mo < 12; mo++) {
    celldata.push({ r: 0, c: moBase(mo), v: { v: `${mo + 1}月`, m: `${mo + 1}月`, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: subHdrBg, fc: hdrFc } });
    merge[`0_${moBase(mo)}`] = { r: 0, c: moBase(mo), rs: 1, cs: N_SUB };
    subMetrics.forEach((h, i) => {
      celldata.push({ r: 1, c: moBase(mo) + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader, bg: subHdrBg, fc: hdrFc } });
    });
  }

  const BUDGET_YEAR = '2027';
  const monthKeys = Array.from({ length: 12 }, (_v, mo) => `${BUDGET_YEAR}-${String(mo + 1).padStart(2, '0')}`);
  const inLeaseMonth = (mKey: string, start: string, end: string) => (mKey >= start && mKey <= end ? 1 : 0);
  const round1 = (x: number) => Math.round(x * 10) / 10;

  // 租赁期限(月) = 租赁期终止月 − 租赁期起始月 + 1（派生列、系统带出、不可手工录入）；
  // 「租赁期限」档位按该月数落 AB.16 租赁期限字典（与 BB.4.2.a 外部职场租赁共用同一字典）。
  const termMonths = (start: string, end: string) => {
    const [sy, sm] = String(start).split('-').map(Number);
    const [ey, em] = String(end).split('-').map(Number);
    if (!sy || !sm || !ey || !em) return 0;
    return (ey - sy) * 12 + (em - sm) + 1;
  };
  const termTier = (months: number) => {
    if (months <= 0) return '';
    return months <= 12 ? '一年以内' : '一年以上';
  };
  // 租赁类型为派生展示列（系统带出、不可手工改）：由「租赁期限」档位派生——
  //   一年以内→费用化(一年以内)、一年以上→资本化(大于一年)；资本化判定唯一来源＝租期，本列只是它的展示结果。
  const leaseTypeByTerm = (months: number) => {
    if (months <= 0) return '';
    return months <= 12 ? '费用化(一年以内)' : '资本化(大于一年)';
  };

  // 示例数据：出租方均为物业持有法人（甜甜圈集团公司），承租方为实际使用法人；
  //   场所一律取 BAA.6.a 中「出租方类型=内部持有」的场所（花果山园区）——内部职场租赁只用内部持有场所，
  //   外部租入场所（史塔克大厦 / 瓦坎达科技园）只在 BB.4.2.a 外部职场租赁出现，本表不出现；
  //   行 1/2/3 整体租期 > 12 个月 → 资本化（进 BB.4.2.b.1）；行 4 整体租期 6 个月（2027-07~2027-12）→ 费用化（不进 BB.4.2.b.1）；
  //   行 1/2/3/4 同一场所（花果山园区）不同合同（标的按分区区分），各自按整体租期判断，互不影响。
  //   示例行只给租期起止与单价、面积，不给「租赁类型」——该列由租期派生（系统带出），与「租赁期限」自洽、不可手工改。
  //   面积占比示例值按「该合同面积 ÷ 场所总面积（花果山园区 12000㎡）」给出；单价为示例值，仅供看出取数逻辑、不做校验。
  const displayItems = items.length > 0 ? items : [
    {
      location: '花果山园区', leaseObject: '天宫A座装备总装工坊', lessorEntity: '甜甜圈集团公司', lesseeEntity: '草莓慕斯公司',
      budgetProject: 'P1 高功率平板光纤激光切割机', budgetDepartment: '制造交付中心本部',
      leaseStartMonth: '2027-01', leaseEndMonth: '2029-12',
      leaseArea: 4000, areaRatioPct: 33.33, unitPrice: 120, markupRatePct: 8, providerMonthlyDepreciation: 30
    },
    {
      location: '花果山园区', leaseObject: '凌霄殿B座整机装配车间', lessorEntity: '甜甜圈集团公司', lesseeEntity: '西瓜泡芙公司',
      budgetProject: 'P1 高功率平板光纤激光切割机', budgetDepartment: '制造交付中心本部',
      leaseStartMonth: '2027-01', leaseEndMonth: '2028-12',
      leaseArea: 1500, areaRatioPct: 12.5, unitPrice: 110, markupRatePct: 8, providerMonthlyDepreciation: 12.5
    },
    {
      location: '花果山园区', leaseObject: '蟠桃园C座研发职场', lessorEntity: '甜甜圈集团公司', lesseeEntity: '蓝莓蛋挞公司',
      budgetProject: 'P2 三维五轴激光切管机', budgetDepartment: '研发中心本部',
      leaseStartMonth: '2027-03', leaseEndMonth: '2028-06',
      leaseArea: 1200, areaRatioPct: 10, unitPrice: 150, markupRatePct: 6, providerMonthlyDepreciation: 12
    },
    {
      location: '花果山园区', leaseObject: '东海龙宫D座软件工位区', lessorEntity: '甜甜圈集团公司', lesseeEntity: '芒果班戟公司',
      budgetProject: 'P3 超快激光与复合加工预研', budgetDepartment: '软件与云平台部',
      leaseStartMonth: '2027-07', leaseEndMonth: '2027-12',
      leaseArea: 300, areaRatioPct: 2.5, unitPrice: 90, markupRatePct: 5, providerMonthlyDepreciation: 2
    }
  ];

  displayItems.forEach((it, idx) => {
    const r = idx + 2;
    const excelRow = r + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    // 数值显示口径：百分比 2 位小数、金额（¥）1 位小数（万元精度 0.1）、单价 2 位小数、面积/月数等整数
    const displayNum = (val: number, fmt: string) => {
      if (fmt.includes('%')) return `${val.toFixed(2)}%`;
      if (fmt.startsWith('¥')) return val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      if (fmt.includes('#,##0.00')) return val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (fmt === '0' || fmt === '#,##0') return val.toLocaleString('zh-CN');
      return val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    };
    const setCell = (c: number, val: any, isNum: boolean = false, fmt: string = 'General', f?: string, bg?: string) => {
      const cell: any = {
        v: val,
        m: isNum && typeof val === 'number' ? displayNum(val, fmt) : String(val ?? ''),
        ct: { fa: fmt, t: isNum ? 'n' : 'g' },
        bg: bg ?? rowBg,
        ht: isNum ? 2 : 1,
        vt: 1
      };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };

    const area = Number(it.leaseArea ?? 0);
    const unitPrice = Number(it.unitPrice ?? 0);
    const markup = Number(it.markupRatePct ?? 0);
    const providerDep = Number(it.providerMonthlyDepreciation ?? 0);
    const startKey = String(it.leaseStartMonth ?? '');
    const endKey = String(it.leaseEndMonth ?? '');
    const inLease = monthKeys.map((mk) => inLeaseMonth(mk, startKey, endKey));

    setCell(C_LOCATION, it.location ?? '');
    setCell(C_LEASE_OBJECT, it.leaseObject ?? '');
    setCell(C_LESSOR, it.lessorEntity ?? '');
    setCell(C_LESSEE, it.lesseeEntity ?? '');
    setCell(C_PROJECT, it.budgetProject ?? '');
    setCell(C_DEPT, it.budgetDepartment ?? '');
    setCell(C_START, startKey);
    setCell(C_END, endKey);
    setCell(C_TERM_MONTHS, termMonths(startKey, endKey), true, '0');
    setCell(C_TERM, termTier(termMonths(startKey, endKey)));
    setCell(C_TYPE, leaseTypeByTerm(termMonths(startKey, endKey)));
    setCell(C_AREA, area, true, '#,##0');
    setCell(C_RATIO, Number(it.areaRatioPct ?? 0), true, '0.00%');
    setCell(C_UNIT_PRICE, unitPrice, true, '#,##0.00');
    setCell(C_MARKUP, markup, true, '0.00%');

    // 内部租金 = 单价 × 租赁面积 ÷ 10000 × 当月在租期内(1/0)；加成款 = 内部租金 × 加成比例%（单价由 BAA.6.b 带出）
    const rentVals = inLease.map((f) => round1((unitPrice * area / 10000) * f));
    const addonVals = rentVals.map((rent) => round1(rent * markup / 100));
    monthKeys.forEach((_mk, mo) => {
      const base = moBase(mo);
      setCell(base + 0, rentVals[mo], true, '¥#,##0.00',
        `=${colLetter(C_UNIT_PRICE)}${excelRow}*${colLetter(C_AREA)}${excelRow}/10000*${inLease[mo]}`);
      setCell(base + 1, addonVals[mo], true, '¥#,##0.00',
        `=${colLetter(base)}${excelRow}*${colLetter(C_MARKUP)}${excelRow}/100`);
      setCell(base + 2, round1(providerDep * inLease[mo]), true, '¥#,##0.00');
      // 应收租金余额 = 上月余额 + 当月内部租金 + 当月加成款 − 当月结算收付（示例：次月结清上月租金）
      const balFormula = mo === 0
        ? `=${colLetter(base)}${excelRow}+${colLetter(base + 1)}${excelRow}`
        : `=${colLetter(moBase(mo - 1) + 3)}${excelRow}+${colLetter(base)}${excelRow}+${colLetter(base + 1)}${excelRow}`
          + `-${colLetter(moBase(mo - 1))}${excelRow}-${colLetter(moBase(mo - 1) + 1)}${excelRow}`;
      setCell(base + 3, round1(rentVals[mo] + addonVals[mo]), true, '¥#,##0.00', balFormula);
    });

    // 【全年合计】：内部租金/加成款/出租方折旧成本 = SUM(1~12月对应子列)；应收租金余额 = 12 月末余额
    const sumRefs = (offset: number) => monthKeys.map((_mk, mo) => `${colLetter(moBase(mo) + offset)}${excelRow}`).join(',');
    setCell(COL_SUM + 0, round1(rentVals.reduce((a, b) => a + b, 0)), true, '¥#,##0.00', `=SUM(${sumRefs(0)})`, '#f0f4ff');
    setCell(COL_SUM + 1, round1(addonVals.reduce((a, b) => a + b, 0)), true, '¥#,##0.00', `=SUM(${sumRefs(1)})`, '#f0f4ff');
    setCell(COL_SUM + 2, round1(providerDep * inLease.reduce((a, b) => a + b, 0)), true, '¥#,##0.00', `=SUM(${sumRefs(2)})`, '#f0f4ff');
    setCell(COL_SUM + 3, round1(rentVals[11] + addonVals[11]), true, '¥#,##0.00', `=${colLetter(COL_LAST_BAL)}${excelRow}`, '#f0f4ff');
  });

  const maxRows = Math.max(displayItems.length + 12, 22);
  const dataVerification: Record<string, any> = {};
  const yearMonthOptions = ['2027', '2028', '2029']
    .flatMap((y) => Array.from({ length: 12 }, (_v, mo) => `${y}-${String(mo + 1).padStart(2, '0')}`))
    .join(',');
  const dropdownCols = [
    // 场所取值域：BAA.6.a 中「出租方类型=内部持有」的场所（示例仅 花果山园区）——外部租入场所
    // （史塔克大厦 / 瓦坎达科技园）不参与内部职场租赁，只在 BB.4.2.a 外部职场租赁出现。
    { col: C_LOCATION, val: '花果山园区' },
    { col: C_LESSOR, val: SIGNING_ENTITIES.join(',') },
    { col: C_LESSEE, val: SIGNING_ENTITIES.join(',') },
    { col: C_PROJECT, val: BUDGET_PROJECT_MASTER_DATA.map((p: any) => p.name).filter(Boolean).join(',') },
    { col: C_DEPT, val: ADMIN_LEVEL2_DEPARTMENT_OPTIONS },
    { col: C_START, val: yearMonthOptions },
    { col: C_END, val: yearMonthOptions },
    { col: C_TYPE, val: '租赁期限带出' },
    { col: C_MARKUP, val: 'BAA.11带出' }
  ];
  for (let r = 2; r < maxRows; r++) {
    dropdownCols.forEach(({ col, val }) => {
      dataVerification[`${r}_${col}`] = {
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

  const columnlen: Record<number, number> = {
    0: 120, 1: 200, 2: 130, 3: 130, 4: 160, 5: 140,
    6: 100, 7: 100, 8: 100, 9: 120, 10: 130, 11: 100, 12: 95, 13: 140, 14: 130
  };
  for (let c = COL_SUM; c < TOTAL_COLS; c++) columnlen[c] = 100;

  return {
    name: 'BB.4.2.b 内部职场租赁',
    index: 104,
    status: 0,
    order: 4,
    row: maxRows,
    column: TOTAL_COLS,
    celldata,
    dataVerification,
    config: {
      merge,
      rowlen: { 0: 32, 1: 26 },
      columnlen
    }
  };
}


/**
 * BB.4.2.b.1 内部职场租赁·财务视角（BJ.C 表单下与 BB.4.2.b 同页的 TAB）
 * 一行一笔资本化合同（整体租期 > 12 个月）；费用化合同不进本表（其租金费用已在 BB.4.2.b 内部租金体现）。
 * 本表已收窄为「租赁负债与现金流测算」：不再计提使用权资产折旧（折旧统一改由 BB.4.5 增量资产折旧计算表计提、经 BB.4.X.A 归集）。
 * 表样列 51 = 维度 8（预算项目 / 法人公司(承租方) / 预算部门 / 资产类别 / 场所 / 租赁标的 /
 *                     租赁期起始月 / 剩余租赁月数）
 *           + 度量 3×13 = 39（【全年合计】+1~12月，每组 3 子列：租赁付款额(不含税) / 月度利息 / 月度本金偿付）
 *           + 卡片列 4（年度租赁付款额(不含税)(万元) / 折现率(%) / 租赁负债初始(万元) / 使用权资产原值(万元)）。
 * 口径（已定）：
 *   ① 折现率取 BAA.6.e 租赁折现率维护（默认取 BF.3 综合融资成本、可覆盖）；
 *   ② 租赁负债初始 = 租赁付款额按折现率折现（月折现率 = 年折现率÷12，按剩余租赁月数折现）；
 *   ③ 使用权资产原值 = 租赁负债初始（使用权资产 1621 / 租赁负债 2602 同额初始确认）；
 *   ④ 使用权资产原值 = 租赁负债初始，作为 BB.4.5 增量资产折旧计算表的输入（剩余年限(月数)=租赁期月数，按剩余年限(月数)表达）；折旧在 BB.4.5 计提（与其它新增资产同链路）、经 BB.4.X.A 归集，本表不再计提折旧；
 *   ⑤ 各月利息 = 期初租赁负债 × 年折现率 ÷ 12（随本金偿付递减）；本金偿付 = 当月租赁付款额 − 当月利息费用；
 *      利息计 6604.1 其中：利息费用，利息付现走 CF-21；本金偿付走 CF-22.1。
 * 校验：利息费用 + 本金偿付 = 当月租赁付款额；年度租赁付款额 = BB.4.2.b 该合同内部租金全年合计。
 */
export function buildIntercompanyLeaseCapitalizationSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  // 维度列 (Col 0 ~ 7, rs: 2)
  const dimHeaders = [
    '预算项目', '法人公司(承租方)', '预算部门', '资产类别', '场所', '租赁标的', '租赁期起始月', '剩余租赁月数'
  ];
  const DIM_COLS = dimHeaders.length;                        // 8
  const C_PROJECT = 0, C_LESSEE = 1, C_DEPT = 2, C_ASSET_CATEGORY = 3;
  const C_LOCATION = 4, C_LEASE_OBJECT = 5, C_START = 6, C_REMAIN_MONTHS = 7;

  const N_SUB = 3;
  const subMetrics = ['租赁付款额(不含税)', '月度利息', '月度本金偿付'];
  const COL_SUM = DIM_COLS;                                  // 【全年合计】起始列 = col 8
  const moBase = (mo: number) => COL_SUM + N_SUB + mo * N_SUB; // 1月=c11 … 12月=c44
  const COL_CARD = moBase(11) + N_SUB;                        // 卡片列起始列 = col 47
  const cardHeaders = [
    '年度租赁付款额(不含税)(万元)', '折现率(%)', '租赁负债初始(万元)', '使用权资产原值(万元)'
  ];
  const TOTAL_COLS = COL_CARD + cardHeaders.length;           // 51
  const C_ANNUAL_PAYMENT = COL_CARD + 0, C_DISCOUNT_RATE = COL_CARD + 1, C_LIABILITY_INIT = COL_CARD + 2;
  const C_ROU_ORIGINAL = COL_CARD + 3;

  const sumBg = '#001e4a';
  const subHdrBg = '#001e4a';
  const hdrBg = '#002f6c';
  const hdrFc = '#ffffff';

  // Row 0 / Row 1：维度列 + 时间分组大表头（【全年合计】cs=3、1~12月各 cs=3）+ 卡片列
  dimHeaders.forEach((h, ci) => {
    celldata.push({ r: 0, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc } });
    celldata.push({ r: 1, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc } });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  });
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader, bg: sumBg, fc: hdrFc } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: N_SUB };
  subMetrics.forEach((h, i) => {
    celldata.push({ r: 1, c: COL_SUM + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumSubHeader, bg: sumBg, fc: hdrFc } });
  });
  for (let mo = 0; mo < 12; mo++) {
    celldata.push({ r: 0, c: moBase(mo), v: { v: `${mo + 1}月`, m: `${mo + 1}月`, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: subHdrBg, fc: hdrFc } });
    merge[`0_${moBase(mo)}`] = { r: 0, c: moBase(mo), rs: 1, cs: N_SUB };
    subMetrics.forEach((h, i) => {
      celldata.push({ r: 1, c: moBase(mo) + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader, bg: subHdrBg, fc: hdrFc } });
    });
  }
  cardHeaders.forEach((h, i) => {
    const ci = COL_CARD + i;
    celldata.push({ r: 0, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc } });
    celldata.push({ r: 1, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc } });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  });

  const round1 = (x: number) => Math.round(x * 10) / 10;
  // 租赁付款额按折现率折现（年金现值）：租赁负债初始 = Σ 月租赁付款额 ÷ (1 + 年折现率÷12)^k，k = 1..剩余租赁月数
  const presentValue = (monthlyPayment: number, months: number, annualRatePct: number) => {
    const r = annualRatePct / 100 / 12;
    let pv = 0;
    for (let k = 1; k <= months; k++) pv += monthlyPayment / Math.pow(1 + r, k);
    return round1(pv);
  };

  // 示例数据：与 BB.4.2.b 示例同一批资本化合同（行 1/2/3 对应 BB.4.2.b 的资本化行，年度租赁付款额 = 该合同内部租金全年合计）；
  //   场所一律取 BAA.6.a 中「出租方类型=内部持有」的场所（花果山园区）——内部职场租赁只用内部持有场所；
  //   卡片数值（年度租赁付款额 / 租赁负债初始 / 使用权资产原值）不随示例场所调整重算（示例不校验）。
  //   租赁付款均自租赁期起始月起按月支付、每月等额（月付款额 = 年度租赁付款额 ÷ 年内租赁月数）。
  const displayItems = items.length > 0 ? items : [
    {
      budgetProject: 'P1 高功率平板光纤激光切割机', lesseeEntity: '草莓慕斯公司', budgetDepartment: '制造交付中心本部',
      assetCategory: '固定资产-使用权资产', location: '花果山园区', leaseObject: '天宫A座装备总装工坊',
      leaseStartMonth: '2027-01', remainingMonths: 36, annualLeasePayment: 576, discountRatePct: 4.5
    },
    {
      budgetProject: 'P1 高功率平板光纤激光切割机', lesseeEntity: '西瓜泡芙公司', budgetDepartment: '制造交付中心本部',
      assetCategory: '固定资产-使用权资产', location: '花果山园区', leaseObject: '凌霄殿B座整机装配车间',
      leaseStartMonth: '2027-01', remainingMonths: 24, annualLeasePayment: 198, discountRatePct: 4.5
    },
    {
      budgetProject: 'P2 三维五轴激光切管机', lesseeEntity: '蓝莓蛋挞公司', budgetDepartment: '研发中心本部',
      assetCategory: '固定资产-使用权资产', location: '花果山园区', leaseObject: '蟠桃园C座研发职场',
      leaseStartMonth: '2027-03', remainingMonths: 16, annualLeasePayment: 180, discountRatePct: 4.5
    }
  ];

  displayItems.forEach((it, idx) => {
    const r = idx + 2;
    const excelRow = r + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    // 数值显示口径：百分比 2 位小数、金额（¥）1 位小数（万元精度 0.1）、月数等整数
    const displayNum = (val: number, fmt: string) => {
      if (fmt.includes('%')) return `${val.toFixed(2)}%`;
      if (fmt.startsWith('¥')) return val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      if (fmt.includes('#,##0.00')) return val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (fmt === '0' || fmt === '#,##0') return val.toLocaleString('zh-CN');
      return val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    };
    const setCell = (c: number, val: any, isNum: boolean = false, fmt: string = 'General', f?: string, bg?: string) => {
      const cell: any = {
        v: val,
        m: isNum && typeof val === 'number' ? displayNum(val, fmt) : String(val ?? ''),
        ct: { fa: fmt, t: isNum ? 'n' : 'g' },
        bg: bg ?? rowBg,
        ht: isNum ? 2 : 1,
        vt: 1
      };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };

    const annualPayment = Number(it.annualLeasePayment ?? 0);
    const discountRatePct = Number(it.discountRatePct ?? 0);
    const remainingMonths = Number(it.remainingMonths ?? 0);
    const startMonthIdx = Number(String(it.leaseStartMonth ?? '').slice(5, 7)) || 1;   // 起始月序号 1~12
    const monthsInYear = 13 - startMonthIdx;                                            // 年内租赁月数
    const monthlyPayment = round1(annualPayment / (monthsInYear || 1));                 // 月租赁付款额
    const liabilityInit = presentValue(monthlyPayment, remainingMonths, discountRatePct); // 租赁负债初始 = 付款额折现
    const rouOriginal = liabilityInit;                                                   // 使用权资产原值 = 租赁负债初始
    // 本表不计提折旧：使用权资产原值（= 租赁负债初始）连同剩余租赁月数（= 剩余年限(月数)）作为 BB.4.5 增量折旧的输入

    setCell(C_PROJECT, it.budgetProject ?? '');
    setCell(C_LESSEE, it.lesseeEntity ?? '');
    setCell(C_DEPT, it.budgetDepartment ?? '');
    setCell(C_ASSET_CATEGORY, it.assetCategory ?? '');
    setCell(C_LOCATION, it.location ?? '');
    setCell(C_LEASE_OBJECT, it.leaseObject ?? '');
    setCell(C_START, String(it.leaseStartMonth ?? ''));
    setCell(C_REMAIN_MONTHS, remainingMonths, true, '0');

    // 各月：租赁付款额 + 利息（期初租赁负债×年折现率÷12）+ 本金偿付（月付款额−利息）
    const payVals: number[] = [];
    const interestVals: number[] = [];
    const principalVals: number[] = [];
    let balance = liabilityInit;
    for (let mo = 0; mo < 12; mo++) {
      const inTerm = mo + 1 >= startMonthIdx;
      const interest = inTerm ? round1(balance * discountRatePct / 100 / 12) : 0;
      const principal = inTerm ? round1(monthlyPayment - interest) : 0;
      if (inTerm) balance = round1(balance - principal);
      payVals.push(inTerm ? monthlyPayment : 0);
      interestVals.push(interest);
      principalVals.push(principal);
    }
    for (let mo = 0; mo < 12; mo++) {
      const base = moBase(mo);
      const inTerm = mo + 1 >= startMonthIdx;
      // 租赁付款额：自租赁期起始月起按月等额支付
      if (inTerm) {
        setCell(base + 0, payVals[mo], true, '¥#,##0.00',
          `=${colLetter(C_ANNUAL_PAYMENT)}${excelRow}/${monthsInYear}`);
      } else {
        setCell(base + 0, 0, true, '¥#,##0.00');
      }
      // 利息费用 = 期初租赁负债 × 年折现率 ÷ 12；期初租赁负债 = 租赁负债初始 − 累计本金偿付
      if (inTerm) {
        const interestFormula = mo === 0
          ? `=${colLetter(C_LIABILITY_INIT)}${excelRow}*${colLetter(C_DISCOUNT_RATE)}${excelRow}/100/12`
          : `=(${colLetter(C_LIABILITY_INIT)}${excelRow}-SUM(${colLetter(moBase(0) + 2)}${excelRow}:${colLetter(moBase(mo - 1) + 2)}${excelRow}))`
            + `*${colLetter(C_DISCOUNT_RATE)}${excelRow}/100/12`;
        setCell(base + 1, interestVals[mo], true, '¥#,##0.00', interestFormula);
        // 本金偿付 = 当月租赁付款额 − 当月利息费用
        setCell(base + 2, principalVals[mo], true, '¥#,##0.00',
          `=${colLetter(base)}${excelRow}-${colLetter(base + 1)}${excelRow}`);
      } else {
        // 租赁期起始月之前：租赁负债尚未确认，付款额/利息/本金偿付均为 0
        setCell(base + 1, 0, true, '¥#,##0.00');
        setCell(base + 2, 0, true, '¥#,##0.00');
      }
    }

    // 【全年合计】= SUM(1~12月对应子列)
    const sumRefs = (offset: number) => Array.from({ length: 12 }, (_v, mo) => `${colLetter(moBase(mo) + offset)}${excelRow}`).join(',');
    setCell(COL_SUM + 0, round1(payVals.reduce((a, b) => a + b, 0)), true, '¥#,##0.00', `=SUM(${sumRefs(0)})`, '#f0f4ff');
    setCell(COL_SUM + 1, round1(interestVals.reduce((a, b) => a + b, 0)), true, '¥#,##0.00', `=SUM(${sumRefs(1)})`, '#f0f4ff');
    setCell(COL_SUM + 2, round1(principalVals.reduce((a, b) => a + b, 0)), true, '¥#,##0.00', `=SUM(${sumRefs(2)})`, '#f0f4ff');

    // 卡片列：年度租赁付款额 / 折现率 / 租赁负债初始 / 使用权资产原值（= 租赁负债初始，作 BB.4.5 增量折旧的输入）
    setCell(C_ANNUAL_PAYMENT, annualPayment, true, '¥#,##0.00');
    setCell(C_DISCOUNT_RATE, discountRatePct, true, '0.00%');
    setCell(C_LIABILITY_INIT, liabilityInit, true, '¥#,##0.00');
    setCell(C_ROU_ORIGINAL, rouOriginal, true, '¥#,##0.00', `=${colLetter(C_LIABILITY_INIT)}${excelRow}`, '#f0f4ff');
  });

  const maxRows = Math.max(displayItems.length + 12, 22);
  const dataVerification: Record<string, any> = {};
  const yearMonthOptions = ['2027', '2028', '2029']
    .flatMap((y) => Array.from({ length: 12 }, (_v, mo) => `${y}-${String(mo + 1).padStart(2, '0')}`))
    .join(',');
  const dropdownCols = [
    { col: C_PROJECT, val: BUDGET_PROJECT_MASTER_DATA.map((p: any) => p.name).filter(Boolean).join(',') },
    { col: C_LESSEE, val: SIGNING_ENTITIES.join(',') },
    { col: C_DEPT, val: ADMIN_LEVEL2_DEPARTMENT_OPTIONS },
    // 资产类别（单列，col 3）：取值域 AA.9 资产类别与折旧的层级写法「大类-小类」，与 BB.4.5 一致
    { col: C_ASSET_CATEGORY, val: ASSET_CATEGORY_LIST.map((c: any) => `${c.parentCategory}-${c.categoryName}`).filter(Boolean).join(',') },
    // 场所取值域：同 BB.4.2.b，只取 BAA.6.a 中「出租方类型=内部持有」的场所（示例仅 花果山园区）
    { col: C_LOCATION, val: '花果山园区' },
    { col: C_START, val: yearMonthOptions }
  ];
  for (let r = 2; r < maxRows; r++) {
    dropdownCols.forEach(({ col, val }) => {
      dataVerification[`${r}_${col}`] = {
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

  const columnlen: Record<number, number> = { 0: 160, 1: 130, 2: 140, 3: 140, 4: 120, 5: 200, 6: 100, 7: 95 };
  for (let c = COL_SUM; c < COL_CARD; c++) columnlen[c] = 100;
  cardHeaders.forEach((_h, i) => { columnlen[COL_CARD + i] = 130; });

  return {
    name: 'BB.4.2.b.1 内部职场租赁·财务视角',
    index: 109,
    status: 0,
    order: 9,
    row: maxRows,
    column: TOTAL_COLS,
    celldata,
    dataVerification,
    config: {
      merge,
      rowlen: { 0: 32, 1: 26 },
      columnlen
    }
  };
}

export function buildIntercompanyAssetTransferSheet(_items: any[] = []): any {
  return createMonthlyBudgetSheet({
    name: 'BJ.C.d 资产转卖预算表',
    dimensions: [
      { label: '卖方(法人)', width: 120, dropdown: SIGNING_ENTITIES.join(',') },
      { label: '买方(法人)', width: 120, dropdown: SIGNING_ENTITIES.join(',') },
      { label: '资产描述', width: 180 },
      { label: '资产类别', width: 160, dropdown: '固定资产-生产机器设备,固定资产-研发实验仪器,固定资产-电子与办公设备,固定资产-运输工具,固定资产-房屋及建筑物,固定资产-动力及辅助设施,固定资产-工具器具及模具' },
      { label: '加成比例%(BAA.11带出)', width: 120 },
      { label: '剩余折旧期限(月)', width: 110 },
    ],
    metrics: [
      { label: '账面净值(万元)' },
      { label: '加成收入(万元)' },
      { label: '转卖价(不含税)(万元)' },
    ],
    rows: [
      {
        dimensions: ['草莓慕斯公司', '蓝莓蛋挞公司', '高功率光纤激光切割头组件（整机系统）', '固定资产-生产机器设备', '10.0%', 24],
        month: 3,
        metrics: [600.0, 60.0, 660.0],
      },
      {
        dimensions: ['草莓慕斯公司', '橙子蛋糕公司', '高精度光谱分析仪（研发检测仪器）', '固定资产-研发实验仪器', '8.0%', 36],
        month: 5,
        metrics: [420.0, 33.6, 453.6],
      },
    ],
  });
}

export function buildTaxRateAssumptionSheet(items: BudgetAssumptionItem[] = TAX_RATE_ASSUMPTIONS): any {
  const celldata: any[] = [];
  const headers = [
    '序号', '税费/参数分类', '参数编码', '参数指标名称', '计量单位',
    '2026年基准值', '2027年预算假设', '2028年预测假设', '2029年预测假设',
    '适用组织/主体', '依据来源与文件', '敏感性等级', '审定状态', '应用说明/被引用'
  ];
  headers.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  });
  items.forEach((it, idx) => {
    const r = idx + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, fmt = 'General') => {
      celldata.push({
        r, c,
        v: {
          v: val,
          m: isNum && typeof val === 'number' ? (fmt.includes('%') ? `${val.toFixed(2)}%` : String(val)) : String(val ?? ''),
          ct: { fa: fmt, t: isNum ? 'n' : 'g' },
          bg: rowBg, ht: isNum ? 2 : (c === 0 ? 1 : 0), vt: 1
        }
      });
    };
    setCell(0, idx + 1);
    setCell(1, it.category);
    setCell(2, it.paramCode, false);
    setCell(3, it.paramName);
    setCell(4, it.paramUnit);
    setCell(5, it.baseValueCurrentYear, true, '0.00%');
    setCell(6, it.budgetYearValue, true, '0.00%');
    setCell(7, it.forecastYearPlus1, true, '0.00%');
    setCell(8, it.forecastYearPlus2, true, '0.00%');
    setCell(9, it.applicableEntity);
    setCell(10, it.sourceBasis);
    setCell(11, it.sensitivityLevel);
    setCell(12, it.status);
    setCell(13, it.remarks || '');
  });
  return {
    name: 'AB.15 税率及附加税比率字典',
    index: 'ba11_tax_rate_assumption',
    status: 1,
    order: 0,
    row: Math.max(items.length + 5, 10),
    column: headers.length,
    defaultRowHeight: 28,
    celldata,
    config: { columnlen: { 0: 50, 1: 130, 2: 110, 3: 230, 4: 70, 5: 90, 6: 100, 7: 100, 8: 100, 9: 210, 10: 240, 11: 80, 12: 80, 13: 280 } }
  };
}
