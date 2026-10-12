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
  SUPPLIER_MASTER_DATA,
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
import {
  SALES_PIVOT_SAMPLE,
  SALES_PIVOT_DIMS,
  SALES_PIVOT_METRICS,
  SALES_PIVOT_DIM_KEY,
  SALES_PIVOT_METRIC_KEY,
} from '../../data/salesPivotSample';

/**
 * 1. 销售合同签约额预算表 (1.1) Spreadsheet Adapter
 */
export function buildSalesContractSheet(items: BudgetItem[], org: string = '甜甜圈集团公司', year: string = '2027') {
  const celldata: any[] = [];
  // 表样列序（与调研页字段说明一致）：序号 | 合同编码 | 合同名称 | 合同性质 | 客户 | 预算项目 | 预算产品 | 机台 |
  // 区域 | 预算部门 | 法人公司 | 内部供应商 | 产品类别 | 收入方式 | 【全年合计】(本年签约额+1~12月) | 下年 | 后年 | 编制说明
  // 销售视角（不设内部供应商，内部供货在关联交易视角填写）：序号 | 合同编码 | 合同名称 | 合同性质 | 客户 | 预算项目 | 预算产品 | 机台 | 区域 | 预算部门 | 法人公司 | 产品类别 | 收入方式 | ...
  const headers = ['序号', '合同编码', '合同名称', '合同性质', '客户', '预算项目', '预算产品', '机台', '区域', '预算部门', '法人公司', '产品类别', '收入方式', `${year}年签约额`, ...Array.from({ length: 12 }, (_, i) => `${i + 1}月签约额`), '下年签约额', '后年签约额', '编制说明'];
  const firstDataRow = 2;
  const annualCol = 13;
  const monthStartCol = 14;
  const nextYearCol = 26;
  const yearAfterNextCol = 27;
  const notesCol = 28;
  const addHeader = (r: number, c: number, value: string, style: any) => celldata.push({ r, c, v: { v: value, m: value, ct: { fa: 'General', t: 'g' }, ...style } });
  headers.slice(0, 14).forEach((header, col) => addHeader(0, col, header, SPREADSHEET_STYLES.header));
  addHeader(0, annualCol, '【全年合计】', SPREADSHEET_STYLES.accentHeader);
  addHeader(0, nextYearCol, '下年', SPREADSHEET_STYLES.accentHeader);
  addHeader(0, yearAfterNextCol, '后年', SPREADSHEET_STYLES.accentHeader);
  addHeader(0, notesCol, '编制说明', SPREADSHEET_STYLES.header);
  headers.forEach((header, col) => addHeader(1, col, header, col === annualCol || col === nextYearCol || col === yearAfterNextCol ? SPREADSHEET_STYLES.accentHeader : SPREADSHEET_STYLES.header));

  items.forEach((item, index) => {
    const row = firstDataRow + index;
    const excelRow = row + 1;
    const it = item as BudgetItem & { legalEntity?: string; contractName?: string; machineCode?: string };
    const setCell = (col: number, value: unknown, numeric = false, formula?: string) => {
      const cell: any = { v: value, m: numeric ? Number(value ?? 0).toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(value ?? ''), ct: { fa: numeric ? '¥#,##0.00' : 'General', t: numeric ? 'n' : 'g' }, ht: numeric ? 2 : 1, vt: 1 };
      if (formula) cell.f = formula;
      celldata.push({ r: row, c: col, v: cell });
    };
    const contractCodeOfRow = it.contractCode || '';
    setCell(0, index + 1, true);
    setCell(1, contractCodeOfRow);
    // 合同名称：存量合同按合同编码从合同主数据带出；新增商业机会无合同主数据时留空（可手填商机/项目名称）
    setCell(2, MASTER_CONTRACTS.find(c => c.code === contractCodeOfRow)?.name || it.contractName || '');
    setCell(3, it.contractNature === '历史框架合同' || it.contractNature === '存量' ? '存量框架合同' : it.contractNature === '新增机会点' || it.contractNature === '新增' ? '新增商业机会' : it.contractNature || '');
    setCell(4, it.customer);
    setCell(5, it.projectName);
    setCell(6, it.budgetProduct);
    setCell(7, it.machineCode || '机台-01'); // 机台 (文本，用户必输)
    setCell(8, it.region);
    setCell(9, it.department ?? '');
    setCell(10, it.legalEntity || it.signingEntity || org);
    setCell(11, it.productCategory);
    setCell(12, it.revenueMethod);
    setCell(annualCol, 0, true, `=SUM(O${excelRow}:Z${excelRow})`);
    for (let month = 1; month <= 12; month += 1) setCell(monthStartCol + month - 1, (it.months as any)?.[`m${month}`] ?? 0, true);
    setCell(nextYearCol, it.nextYearBudget ?? 0, true);
    setCell(yearAfterNextCol, it.yearAfterNextBudget ?? 0, true);
    setCell(notesCol, it.notes || '');
  });

  const maxRows = Math.max(items.length + firstDataRow + 15, 30);
  const dataVerification: Record<string, any> = {};
  const dropdowns: Array<[number, string, boolean]> = [
    [1, [...MASTER_CONTRACTS.map(c => c.code)].join(','), true],
    [3, SALES_CONTRACT_NATURE_OPTIONS.join(','), true],
    [4, CUSTOMERS.join(','), true],
    [5, BUDGET_PROJECT_MASTER_DATA.filter(isSalesProject).map((p: any) => p.name).filter(Boolean).join(','), true],
    [6, ENABLED_BUDGET_PRODUCTS.map(p => p.name).join(','), true],
    [8, '北京,广州,上海,深圳,武汉,成都,西安,合肥,无锡,海外', true],
    [9, ADMIN_LEVEL2_DEPARTMENT_OPTIONS, true],
    [10, SIGNING_ENTITIES.join(','), true],
    [11, PRODUCT_CATEGORY_DICT.map(d => d.name).join(','), true],
    [12, REVENUE_METHOD_DICT.map(d => d.name).join(','), true],
  ];
  for (let row = firstDataRow; row < maxRows; row += 1) {
    dropdowns.forEach(([column, value, required]) => { dataVerification[`${row}_${column}`] = { type: 'dropdown', value1: value, value2: '', prohibitInput: required, allowBlank: !required, hintShow: true, hintText: required ? '请选择主数据值（必填）' : '请选择主数据值' }; });
  }
  return {
    name: 'BB.1.1.a 销售合同签约额预算', index: 0, status: 1, order: 0, row: maxRows + 1, column: notesCol + 1, celldata, dataVerification,
    config: { merge: { ...Object.fromEntries(Array.from({ length: 14 }, (_, col) => [`0_${col}`, { r: 0, c: col, rs: 2, cs: 1 }])), [`0_${annualCol}`]: { r: 0, c: annualCol, rs: 1, cs: 13 }, [`0_${nextYearCol}`]: { r: 0, c: nextYearCol, rs: 2, cs: 1 }, [`0_${yearAfterNextCol}`]: { r: 0, c: yearAfterNextCol, rs: 2, cs: 1 }, [`0_${notesCol}`]: { r: 0, c: notesCol, rs: 2, cs: 1 } }, rowlen: { 0: 28, 1: 26 }, columnlen: { 0: 45, 1: 120, 2: 160, 3: 120, 4: 140, 5: 160, 6: 140, 7: 120, 8: 85, 9: 130, 10: 130, 11: 130, 12: 150, 13: 120, 14: 110, 15: 85, 16: 85, 17: 85, 18: 85, 19: 85, 20: 85, 21: 85, 22: 85, 23: 85, 24: 85, 25: 85, 26: 85, 27: 100, 28: 100, 29: 220 } }
  };
}


/**
 * 2. 存量在手订单执行表 (BB.1.2) Spreadsheet Adapter — 两行制月度时间序列版本
 *
 * 列结构：固定维度 c0-c7 (rs:2 跨行合并，FIX_COLS 动态取值):
 *   序号|订单编号|销售合同|销售项目|销售产品|区域|预算部门|客户名称
 *   时间区（每组 cs:METRICS）: 【全年合计】|1月|2月|…|12月
 *   每个期间内按度量展开（销售视角 5 项：销量|单价(不含税)|预计销售收入(不含税)|预收|验收回款；
 *   财务视角 6 项，多一列「预计销售成本」，位于预计销售收入之后、预收之前）
 *
 * 公式:
 *   预计销售收入(不含税) = 本月销量 × 本月单价(不含税)
 *   全年合计各度量 = SUM(12个月同度量列)
 *
 * 口径:
 *   部门维度为单列「预算部门」（默认明细到二级部门，来源 AA.5 行政部门主数据字典），
 *   与 BB.1.1 保持同口径；「区域」列位于销售产品之后、预算部门之前（来源 区域主数据）。
 */
export function buildStockOrderSheet(
  orders: StockOrderItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027',
  role: 'stock' | 'incremental' | 'finance' = 'finance'
) {
  const celldata: any[] = [];

  // ── 固定维度：序号/订单编号/销售合同/销售项目/销售产品/机台/区域/预算部门/客户名称/签约主体（法人公司） ──
  // 销售订单不再区分「内部供应商」维度（内部供货关系不再在销售订单登记）。
  const isFinance = role === 'finance';
  const fixedHeaders = ['序号', '订单编号', '销售合同', '销售项目', '销售产品', '机台', '区域', '预算部门', '客户名称', '签约主体（法人公司）'];
  const FIX_COLS = fixedHeaders.length;

  // ── 度量结构：销量/单价/预计销售收入/预收/验收回款，财务视角多一列预计销售成本 ──
  const sumSubHeaders = role === 'finance'
    ? ['销量', '单价(不含税)', '预计销售收入(不含税)', '预计销售成本', '预收', '验收回款']
    : ['销量', '单价(不含税)', '预计销售收入(不含税)', '预收', '验收回款'];
  const METRICS = sumSubHeaders.length; // sales:6  finance:7
  const MONTHS = 12;

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  const COL_SUM = FIX_COLS; // 全年合计起始列
  const moBase = (mo: number) => COL_SUM + METRICS + mo * METRICS; // mo: 0-based月索引
  const TOTAL_COLS = moBase(MONTHS);

  const hdrBg = '#002f6c';
  const hdrFc = '#ffffff';
  const sumBg = '#001e4a';
  const monthBg = '#001e4a';
  const subHdrBg = '#001e4a';

  const setCell = (r: number, c: number, val: any, isNum = false, fmt = 'General', f?: string, bg?: string, fc?: string, bold?: boolean) => {
    const cell: any = {
      v: val,
      m: isNum && typeof val === 'number'
        ? (fmt === '#,##0' || fmt === '#,##0.0000' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }))
        : String(val ?? ''),
      ct: { fa: fmt, t: isNum ? 'n' : 'g' },
      ht: isNum ? 2 : 1,
      vt: 1
    };
    if (f) cell.f = f;
    if (bg) cell.bg = bg;
    if (fc) cell.fc = fc;
    if (bold) cell.bl = 1;
    celldata.push({ r, c, v: cell });
  };

  // r:0 顶级分组表头
  fixedHeaders.forEach((h, ci) => setCell(0, ci, h, false, 'General', undefined, hdrBg, hdrFc, true));
  setCell(0, COL_SUM, '【全年合计】', false, 'General', undefined, sumBg, hdrFc, true);
  for (let mo = 0; mo < MONTHS; mo++) {
    setCell(0, moBase(mo), `${mo + 1}月`, false, 'General', undefined, monthBg, hdrFc, true);
  }

  // r:1 度量子表头
  sumSubHeaders.forEach((h, i) => setCell(1, COL_SUM + i, h, false, 'General', undefined, sumBg, hdrFc));
  for (let mo = 0; mo < MONTHS; mo++) {
    sumSubHeaders.forEach((h, i) => setCell(1, moBase(mo) + i, h, false, 'General', undefined, subHdrBg, hdrFc));
  }

  // ── r:2 起数据行 ──
  const firstDataRow = 2;
  const idxQty = 0, idxPrice = 1, idxRevenue = 2;
  const idxCost = role === 'finance' ? 3 : -1;
  const idxPrepay = role === 'finance' ? 4 : 3;
  const idxAccept = role === 'finance' ? 5 : 4;

  orders.forEach((ord, idx) => {
    const r = idx + firstDataRow;
    const er = r + 1;
    const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
    const o = ord as any;

    setCell(r, 0, idx + 1, true, '#,##0', undefined, rowBg);
    setCell(r, 1, o.orderCode || '', false, 'General', undefined, rowBg);
    setCell(r, 2, o.contractCode || '', false, 'General', undefined, rowBg);
    setCell(r, 3, o.projectName || '', false, 'General', undefined, rowBg);
    setCell(r, 4, o.budgetProduct || '', false, 'General', undefined, rowBg);
    setCell(r, 5, o.machineCode || '机台-01', false, 'General', undefined, rowBg); // 机台 (文本，用户必输)
    setCell(r, 6, o.region || '', false, 'General', undefined, rowBg);
    setCell(r, 7, o.department || '', false, 'General', undefined, rowBg);
    setCell(r, 8, o.customer || '', false, 'General', undefined, rowBg);
    setCell(r, 9, o.signingEntity || o.legalEntity || '', false, 'General', undefined, rowBg);

    const mQty = o.monthlyQty || {};
    const mPrice = o.monthlyPrice || {};
    const mPrepay = o.monthlyPrepayment || {};
    const mAccept = o.monthlyAcceptCollection || {};

    for (let mo = 0; mo < MONTHS; mo++) {
      const base = moBase(mo);
      const qty = Number(mQty[`m${mo + 1}`] ?? 0);
      const price = Number(mPrice[`m${mo + 1}`] ?? 0);
      const prepay = Number(mPrepay[`m${mo + 1}`] ?? 0);
      const accept = Number(mAccept[`m${mo + 1}`] ?? 0);
      setCell(r, base + idxQty, qty, true, '#,##0', undefined, rowBg);
      setCell(r, base + idxPrice, price, true, '#,##0.00', undefined, rowBg);
      // 销售收入 = 销量×单价(不含税)，公式
      setCell(r, base + idxRevenue, qty * price, true, '#,##0.00', `=${colLetter(base + idxQty)}${er}*${colLetter(base + idxPrice)}${er}`, rowBg);
      if (role === 'finance') {
        const cost = Number(o.monthlyCost?.[`m${mo + 1}`] ?? 0);
        setCell(r, base + idxCost, cost, true, '#,##0.00', undefined, rowBg);
      }
      setCell(r, base + idxPrepay, prepay, true, '#,##0.00', undefined, rowBg);
      setCell(r, base + idxAccept, accept, true, '#,##0.00', undefined, rowBg);
    }

    // 全年合计（各度量 = SUM(12个月同度量列)）
    sumSubHeaders.forEach((_, mi) => {
      const refs = Array.from({ length: MONTHS }, (_, mo) => `${colLetter(moBase(mo) + mi)}${er}`).join(',');
      setCell(r, COL_SUM + mi, 0, true, '#,##0.00', `=SUM(${refs})`, '#f0f4ff');
    });
  });

  // ── Merge 配置（两行制） ──
  const merge: Record<string, any> = {};
  for (let ci = 0; ci < FIX_COLS; ci++) {
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  }
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: METRICS };
  for (let mo = 0; mo < MONTHS; mo++) {
    merge[`0_${moBase(mo)}`] = { r: 0, c: moBase(mo), rs: 1, cs: METRICS };
  }

  // ── 列宽配置 ──
  const columnlen: Record<number, number> = { 0: 42, 1: 110, 2: 130, 3: 150, 4: 130, 5: 72, 6: 100, 7: 130, 9: 110 };
  for (let c = COL_SUM; c < TOTAL_COLS; c++) columnlen[c] = 90;

  // 销售订单不再登记「内部供应商」，本表不再设下拉数据校验
  const dataVerification: Record<string, any> = {};

  return {
    name: role === 'finance' ? 'BB.1.2.c 财务视角(存量+增量)' : 'BB.1.2.a 软硬件销售填报',
    index: 1,
    status: 0,
    order: 1,
    row: Math.max(orders.length + firstDataRow + 10, 25),
    column: TOTAL_COLS,
    celldata,
    dataVerification,
    config: {
      merge,
      rowlen: { 0: 32, 1: 24 },
      columnlen,
      frozen: { type: 'rangeRow', range: { row_focus: 1, column_focus: FIX_COLS } }
    }
  };
}


/**
 * BB.1.2.d 产品内部调拨预算安排 — 集团内法人间产品/软件调拨
 * 交易路径岗填报：调出方/调入方/产品/月度数量；成本带出、加成 BAA.11。
 * 提供方：6001.2（成本+加成）/6401.2（成本）；接受方：6401.1（成本+加成）。
 */
export function buildProductTransferSheet(
  items: any[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
) {
  const celldata: any[] = [];
  const fixedHeaders = ['序号', '内部供应商(调出方)', '调入方法人(签约主体)', '销售产品', '预算部门'];
  const FIX_COLS = fixedHeaders.length;
  const sumSubHeaders = ['调拨数量', '调出单位成本', '加成比例', '内部调拨单价', '调出成本额', '加成额', '内部销售额'];
  const METRICS = sumSubHeaders.length;
  const MONTHS = 12;

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  const COL_SUM = FIX_COLS;
  const moBase = (mo: number) => COL_SUM + METRICS + mo * METRICS;
  const TOTAL_COLS = moBase(MONTHS);

  const hdrBg = '#002f6c', hdrFc = '#ffffff';
  const setCell = (r: number, c: number, val: any, isNum = false, fmt = 'General', f?: string, bg?: string, fc?: string, bold?: boolean) => {
    const cell: any = {
      v: val,
      m: isNum && typeof val === 'number'
        ? (fmt === '#,##0' || fmt === '#,##0.0000' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }))
        : String(val ?? ''),
      ct: { fa: fmt, t: isNum ? 'n' : 'g' },
      ht: isNum ? 2 : 1, vt: 1
    };
    if (f) cell.f = f;
    if (bg) cell.bg = bg;
    if (fc) cell.fc = fc;
    if (bold) cell.bl = 1;
    celldata.push({ r, c, v: cell });
  };

  fixedHeaders.forEach((h, ci) => setCell(0, ci, h, false, 'General', undefined, hdrBg, hdrFc, true));
  setCell(0, COL_SUM, '【全年合计】', false, 'General', undefined, '#001e4a', hdrFc, true);
  for (let mo = 0; mo < MONTHS; mo++) setCell(0, moBase(mo), `${mo + 1}月`, false, 'General', undefined, '#001e4a', hdrFc, true);

  sumSubHeaders.forEach((h, i) => setCell(1, COL_SUM + i, h, false, 'General', undefined, '#001e4a', hdrFc));
  for (let mo = 0; mo < MONTHS; mo++) {
    sumSubHeaders.forEach((h, i) => setCell(1, moBase(mo) + i, h, false, 'General', undefined, '#001e4a', hdrFc));
  }

  items.forEach((it: any, idx) => {
    const r = idx + 2; const er = r + 1;
    const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
    setCell(r, 0, idx + 1, true, '#,##0', undefined, rowBg);
    setCell(r, 1, it.fromEntity || '', false, 'General', undefined, rowBg); // 内部供应商=调出方法人
    setCell(r, 2, it.toEntity || '', false, 'General', undefined, rowBg);
    setCell(r, 3, it.product || '', false, 'General', undefined, rowBg);
    setCell(r, 4, it.department || '', false, 'General', undefined, rowBg);

    for (let mo = 0; mo < MONTHS; mo++) {
      const b = moBase(mo);
      const qty = Number(it.monthlyQty?.[`m${mo + 1}`] ?? 0);
      const unitCost = Number(it.unitCost ?? 0);
      const markupRate = Number(it.markupRate ?? 0.1);
      setCell(r, b + 0, qty, true, '#,##0', undefined, rowBg);
      setCell(r, b + 1, unitCost, true, '#,##0.00', undefined, rowBg);
      setCell(r, b + 2, markupRate, true, '0%', undefined, rowBg);
      setCell(r, b + 3, 0, true, '#,##0.00', `=${colLetter(b + 1)}${er}*(1+${colLetter(b + 2)}${er})`, rowBg);
      setCell(r, b + 4, 0, true, '#,##0.00', `=${colLetter(b + 0)}${er}*${colLetter(b + 1)}${er}`, rowBg);
      setCell(r, b + 5, 0, true, '#,##0.00', `=${colLetter(b + 0)}${er}*${colLetter(b + 1)}${er}*${colLetter(b + 2)}${er}`, rowBg);
      setCell(r, b + 6, 0, true, '#,##0.00', `=${colLetter(b + 0)}${er}*${colLetter(b + 3)}${er}`, rowBg);
    }

    sumSubHeaders.forEach((_, mi) => {
      const refs = Array.from({ length: MONTHS }, (_, mo) => `${colLetter(moBase(mo) + mi)}${er}`).join(',');
      setCell(r, COL_SUM + mi, 0, true, '#,##0.00', `=SUM(${refs})`, '#f0f4ff');
    });
  });

  const merge: Record<string, any> = {};
  for (let ci = 0; ci < FIX_COLS; ci++) merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: METRICS };
  for (let mo = 0; mo < MONTHS; mo++) merge[`0_${moBase(mo)}`] = { r: 0, c: moBase(mo), rs: 1, cs: METRICS };

  const columnlen: Record<number, number> = { 0: 42, 1: 140, 2: 160, 3: 140, 4: 120 };
  for (let c = COL_SUM; c < TOTAL_COLS; c++) columnlen[c] = 95;

  return {
    name: 'BB.1.2.d 产品内部调拨预算安排',
    index: 1, status: 0, order: 1,
    row: Math.max(items.length + 12, 20),
    column: TOTAL_COLS,
    celldata,
    dataVerification: {},
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen, frozen: { type: 'rangeRow', range: { row_focus: 1, column_focus: FIX_COLS } } }
  };
}

/**
 * BJ.C.g 内部销售预算 — 集团内法人之间纯购销（A 卖物料/产成品给 B）
 * 交易路径岗填报，按「交易类型」分两条线：
 * · 产品销售（A 卖自己生产的产成品给 B）：A 按内部销售价（产成品成本+加成款）确认 6001.1 主营业务收入、
 *   结转 6401.1 主营业务成本（=A 产成品成本）；B 按「入库类型」入 1405 对应明细——原材料 / 半成品(在制品) /
 *   产成品(B 直接转卖)，加成进存货成本，后续随 B 领用→完工→对外销售结转 6401.1。
 * · 物料销售（A 出零星物料，同 BB.1.3.f）：A 走 6001.2 其他业务收入 / 6401.2 其他业务成本。
 * 增值税货物 13%；往来 1221.1/2241.1 按含税价真实现金结算、期末保留余额。
 * 典型场景：A 是制造主体、B 是另一个法人，A 的产成品到 B 手里是半成品，B 拿去进一步加工成自己的整机再对外卖。
 */
export function buildIntercompanySalesBudgetSheet(
  items: any[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
) {
  const celldata: any[] = [];
  const fixedHeaders = ['序号', '内部供应商(卖出方)', '内部客户(买入方)', '交易类型', '入库类型(买入方)', '产品/物料', '预算部门'];
  const FIX_COLS = fixedHeaders.length;
  const sumSubHeaders = ['数量', '卖出方单位成本', '加成比例', '内部销售单价', '卖出方成本额', '加成额', '内部销售额'];
  const METRICS = sumSubHeaders.length;
  const MONTHS = 12;

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  const COL_SUM = FIX_COLS;
  const moBase = (mo: number) => COL_SUM + METRICS + mo * METRICS;
  const TOTAL_COLS = moBase(MONTHS);

  const hdrBg = '#002f6c', hdrFc = '#ffffff';
  const setCell = (r: number, c: number, val: any, isNum = false, fmt = 'General', f?: string, bg?: string, fc?: string, bold?: boolean) => {
    const cell: any = {
      v: val,
      m: isNum && typeof val === 'number'
        ? (fmt === '#,##0' || fmt === '#,##0.0000' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }))
        : String(val ?? ''),
      ct: { fa: fmt, t: isNum ? 'n' : 'g' },
      ht: isNum ? 2 : 1, vt: 1
    };
    if (f) cell.f = f; if (bg) cell.bg = bg; if (fc) cell.fc = fc; if (bold) cell.bl = 1;
    celldata.push({ r, c, v: cell });
  };

  fixedHeaders.forEach((h, ci) => setCell(0, ci, h, false, 'General', undefined, hdrBg, hdrFc, true));
  setCell(0, COL_SUM, '【全年合计】', false, 'General', undefined, '#001e4a', hdrFc, true);
  for (let mo = 0; mo < MONTHS; mo++) setCell(0, moBase(mo), `${mo + 1}月`, false, 'General', undefined, '#001e4a', hdrFc, true);
  sumSubHeaders.forEach((h, i) => setCell(1, COL_SUM + i, h, false, 'General', undefined, '#001e4a', hdrFc));
  for (let mo = 0; mo < MONTHS; mo++) sumSubHeaders.forEach((h, i) => setCell(1, moBase(mo) + i, h, false, 'General', undefined, '#001e4a', hdrFc));

  items.forEach((it: any, idx) => {
    const r = idx + 2; const er = r + 1;
    const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
    setCell(r, 0, idx + 1, true, '#,##0', undefined, rowBg);
    setCell(r, 1, it.seller || '', false, 'General', undefined, rowBg);
    setCell(r, 2, it.buyer || '', false, 'General', undefined, rowBg);
    setCell(r, 3, it.tradeType || '物料销售', false, 'General', undefined, rowBg);
    setCell(r, 4, it.inboundType || '原材料', false, 'General', undefined, rowBg);
    setCell(r, 5, it.product || '', false, 'General', undefined, rowBg);
    setCell(r, 6, it.department || '', false, 'General', undefined, rowBg);

    for (let mo = 0; mo < MONTHS; mo++) {
      const b = moBase(mo);
      const qty = Number(it.monthlyQty?.[`m${mo + 1}`] ?? 0);
      const unitCost = Number(it.unitCost ?? 0);
      const markupRate = Number(it.markupRate ?? 0.1);
      setCell(r, b + 0, qty, true, '#,##0', undefined, rowBg);
      setCell(r, b + 1, unitCost, true, '#,##0.00', undefined, rowBg);
      setCell(r, b + 2, markupRate, true, '0%', undefined, rowBg);
      setCell(r, b + 3, 0, true, '#,##0.00', `=${colLetter(b + 1)}${er}*(1+${colLetter(b + 2)}${er})`, rowBg);
      setCell(r, b + 4, 0, true, '#,##0.00', `=${colLetter(b + 0)}${er}*${colLetter(b + 1)}${er}`, rowBg);
      setCell(r, b + 5, 0, true, '#,##0.00', `=${colLetter(b + 0)}${er}*${colLetter(b + 1)}${er}*${colLetter(b + 2)}${er}`, rowBg);
      setCell(r, b + 6, 0, true, '#,##0.00', `=${colLetter(b + 0)}${er}*${colLetter(b + 3)}${er}`, rowBg);
    }
    sumSubHeaders.forEach((_, mi) => {
      const refs = Array.from({ length: MONTHS }, (_, mo) => `${colLetter(moBase(mo) + mi)}${er}`).join(',');
      setCell(r, COL_SUM + mi, 0, true, '#,##0.00', `=SUM(${refs})`, '#f0f4ff');
    });
  });

  const merge: Record<string, any> = {};
  for (let ci = 0; ci < FIX_COLS; ci++) merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: METRICS };
  for (let mo = 0; mo < MONTHS; mo++) merge[`0_${moBase(mo)}`] = { r: 0, c: moBase(mo), rs: 1, cs: METRICS };

  const columnlen: Record<number, number> = { 0: 42, 1: 150, 2: 150, 3: 90, 4: 110, 5: 140, 6: 110 };
  for (let c = COL_SUM; c < TOTAL_COLS; c++) columnlen[c] = 95;

  return {
    name: 'BJ.C.g 内部销售预算',
    index: 1, status: 0, order: 1,
    row: Math.max(items.length + 12, 20),
    column: TOTAL_COLS,
    celldata, dataVerification: {},
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen, frozen: { type: 'rangeRow', range: { row_focus: 1, column_focus: FIX_COLS } } }
  };
}

/**
 * BB.1.3 技术服务收入与料工费预算表 — 两行制月度时间序列版本
 *
 * 列结构 (财务视角共 90 列；调研页展示列数在此基础上少 1 列序号展示列 = 89):
 *   固定维度 c0-c10 (rs:2): 序号|预算部门|项目|订单编号|区域|产品|机台|客户|客户类型|收入方式|签约主体（法人公司）
 *   全年合计 c11-c15 (cs:5): 销量|单价(不含税)|确认收入|预收款|验收回款（销售视角）/ 确认收入|预收款|验收回款|人工成本|物料成本|其他费用（财务视角 cs:6）
 *   1月~12月 (每月同度量): 同度量
 *   备注 c89 (rs:2)
 *
 * 销售订单不再区分「内部供应商」维度（内部供货关系不再在销售订单登记）。
 */
export function buildServiceRevenueSheet(
  items: ServiceRevenueItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027',
  role: 'sales' | 'stock' | 'incremental' | 'finance' = 'finance',
  serviceMaterials: ServiceMaterialDetailItem[] = [],
  materialCosts: MaterialStandardCostItem[] = []
) {
  const currentCostMap = new Map(materialCosts.map(cost => [`${cost.materialCode}|${cost.partCategory}`, cost.standardCost == null ? null : Number(cost.standardCost)]));
  const matCostMap = new Map<string, Record<number, number | null>>();
  const missingMaterialCost = new Set<string>();
  if (!serviceMaterials) serviceMaterials = [];
  for (const sm of serviceMaterials) {
    if (!matCostMap.has(sm.serviceRevenueId)) matCostMap.set(sm.serviceRevenueId, {});
    const monthly = matCostMap.get(sm.serviceRevenueId)!;
    const sign = sm.partCategory === '坏件' ? -1 : 1;
    const currentCost = currentCostMap.get(`${sm.materialCode}|${sm.partCategory}`);
    const unitCost = currentCost ?? null;
    if (unitCost == null) missingMaterialCost.add(sm.serviceRevenueId);
    const mq = (sm as any).monthlyQuantities ?? {};
    for (let mo = 1; mo <= 12; mo++) {
      const qty = Number(mq[`m${mo}`] ?? 0);
      monthly[mo] = unitCost == null ? null : (monthly[mo] ?? 0) + sign * qty * unitCost;
    }
  }
  const celldata: any[] = [];

  // ── 列索引常量 ──────────────────────────────────────────────
  const isSales = role !== 'finance';
  const fixedDims = ['序号', '预算部门', '项目', '订单编号', '区域', '产品', '机台', '客户', '客户类型', '收入方式', '签约主体（法人公司）'];
  const FIX = fixedDims.length;
  const MX  = isSales ? 5 : 6;
  const MOS = 12;
  const COL_SUM_START = FIX;
  const COL_MON_START = FIX + MX;
  const COL_NOTES     = COL_MON_START + MOS * MX;
  const TOTAL_COLS    = COL_NOTES + 1;

  const moStart = (mo: number) => COL_MON_START + mo * MX; // mo=0..11

  // ── Excel 列字母 ─────────────────────────────────────────────
  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  // ── 单元格写入辅助 ───────────────────────────────────────────
  const sc = (r: number, c: number, val: any, isNum = false, fmt = 'General', f?: string, bg?: string, fc?: string, bold?: boolean) => {
    const cell: any = {
      v: val,
      m: isNum && typeof val === 'number' ? (fmt === '#,##0' || fmt === '#,##0.0000' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })) : String(val ?? ''),
      ct: { fa: fmt, t: isNum ? 'n' : 'g' },
      ht: isNum ? 2 : 1, vt: 1
    };
    if (f)    cell.f  = f;
    if (bg)   cell.bg = bg;
    if (fc)   cell.fc = fc;
    if (bold) cell.bl = 1;
    celldata.push({ r, c, v: cell });
  };

  const hBg  = '#002f6c'; const hFc  = '#ffffff';
  const sBg  = '#001e4a'; const mBg  = '#001e4a';

  // ── r:0 顶级分组表头 ─────────────────────────────────────────
  fixedDims.forEach((h, ci) => sc(0, ci, h, false, 'General', undefined, hBg, hFc, true));

  // 全年合计（cs:6）
  sc(0, COL_SUM_START, '【全年合计】', false, 'General', undefined, sBg, hFc, true);

  // 1~12 月（每月 cs:6）
  for (let mo = 0; mo < MOS; mo++) {
    sc(0, moStart(mo), `${mo + 1}月`, false, 'General', undefined, mBg, hFc, true);
  }
  sc(0, COL_NOTES, '备注', false, 'General', undefined, hBg, hFc, true);

  // ── r:1 指标明细表头 ─────────────────────────────────────────
  const subItems = isSales
    ? ['销量', '单价(不含税)', '确认收入', '预收款', '验收回款']
    : ['确认收入', '预收款', '验收回款', '人工成本', '物料成本', '其他费用'];
  subItems.forEach((s, i) => sc(1, COL_SUM_START + i, s, false, 'General', undefined, sBg, hFc));
  for (let mo = 0; mo < MOS; mo++) {
    subItems.forEach((s, i) => sc(1, moStart(mo) + i, s, false, 'General', undefined, mBg, hFc));
  }

  // ── r:2 起数据行 ────────────────────────────────────────────
  const firstDataRow = 2;
  items.forEach((item, idx) => {
    const r   = idx + firstDataRow;
    const er  = r + 1;
    const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
    const o   = item as any;

    // 月度累计
    const sumField = (field: keyof MonthlyServiceDetail) =>
      Array.from({ length: 12 }, (_, i) => Number((o.months?.[`m${i + 1}`] as any)?.[field] ?? 0)).reduce((a, b) => a + b, 0);

    const totalQty     = sumField('salesVolume');
    const totalPrice   = sumField('unitPrice');
    const totalRev     = sumField('recognizedRevenue');
    const totalPrepay  = sumField('prepayment');
    const totalAccept  = sumField('acceptCollection');
    const totalLbr     = sumField('laborCost');
    const matByMonth = matCostMap.get(o.id) ?? null;
    const matMissing = missingMaterialCost.has(o.id);
    const totalMat = matMissing ? null : Array.from({ length: 12 }, (_, i) => matByMonth?.[i + 1] ?? 0).reduce((a, b) => a + b, 0);
    const totalOth     = sumField('otherExpenses');
    const totalGP      = totalMat == null ? null : totalRev - totalLbr - totalMat - totalOth;

    const sumCols = (offset: number) =>
      Array.from({ length: 12 }, (_, i) => `${colLetter(moStart(i) + offset)}${er}`).join('+');

    // 固定维度
    sc(r, 0, idx + 1, true, '#,##0', undefined, rowBg);
    sc(r, 1, o.department || '', false, 'General', undefined, rowBg);
    sc(r, 2, o.projectName || '', false, 'General', undefined, rowBg);
    sc(r, 3, MASTER_CONTRACTS.find(c => c.code === o.contractCode)?.name || o.contractName || '', false, 'General', undefined, rowBg);
    sc(r, 4, o.region || '', false, 'General', undefined, rowBg);
    sc(r, 5, o.productName || '', false, 'General', undefined, rowBg);
    sc(r, 6, o.machineCode || '机台-01', false, 'General', undefined, rowBg); // 机台 (文本，用户必输)
    sc(r, 7, o.customer || '', false, 'General', undefined, rowBg);
    sc(r, 8, CUSTOMER_TYPE_MAPPING[o.customer] || '不分类型', false, 'General', undefined, rowBg);
    sc(r, 9, o.revenueMethod || '直线法', false, 'General', undefined, rowBg);
    sc(r, 10, o.signingEntity || o.legalEntity || '', false, 'General', undefined, rowBg);

    // 全年合计（公式汇总各月）
    if (isSales) {
      sc(r, COL_SUM_START + 0, totalQty,    true, '#,##0',    `=${sumCols(0)}`, '#f0f4ff');
      sc(r, COL_SUM_START + 1, totalPrice,  true, '#,##0.00', `=${sumCols(1)}`, '#f0f4ff');
      sc(r, COL_SUM_START + 2, totalRev,    true, '#,##0.00', `=${sumCols(2)}`, '#f0f4ff');
      sc(r, COL_SUM_START + 3, totalPrepay, true, '#,##0.00', `=${sumCols(3)}`, '#f0f4ff');
      sc(r, COL_SUM_START + 4, totalAccept, true, '#,##0.00', `=${sumCols(4)}`, '#f0f4ff');
    } else {
      sc(r, COL_SUM_START + 0, totalRev,    true, '#,##0.00', `=${sumCols(0)}`, '#f0f4ff');
      sc(r, COL_SUM_START + 1, totalPrepay, true, '#,##0.00', `=${sumCols(1)}`, '#f0f4ff');
      sc(r, COL_SUM_START + 2, totalAccept, true, '#,##0.00', `=${sumCols(2)}`, '#f0f4ff');
      sc(r, COL_SUM_START + 3, totalLbr,    true, '#,##0.00', `=${sumCols(3)}`, '#f0f4ff');
      sc(r, COL_SUM_START + 4, matMissing ? '待维护 BAA.4 成本' : totalMat, !matMissing, '#,##0.00', matMissing ? undefined : `=${sumCols(4)}`, '#f0f4ff');
      sc(r, COL_SUM_START + 5, totalOth,    true, '#,##0.00', `=${sumCols(5)}`, '#f0f4ff');
    }

    // 1~12 月月度值
    for (let mo = 0; mo < MOS; mo++) {
      const md  = (o.months?.[`m${mo + 1}`] || {}) as any;
      const cs  = moStart(mo);
      if (isSales) {
        const qty   = Number(md.salesVolume ?? 0);
        const price = Number(md.unitPrice ?? 0);
        const pre   = Number(md.prepayment ?? 0);
        const acc   = Number(md.acceptCollection ?? md.cashRecoveryAmount ?? 0);
        sc(r, cs + 0, qty,   true, '#,##0',    undefined, rowBg);
        sc(r, cs + 1, price, true, '#,##0.00', undefined, rowBg);
        // 确认收入 = 销量 × 单价(不含税)，公式
        sc(r, cs + 2, qty * price, true, '#,##0.00', `=${colLetter(cs + 0)}${er}*${colLetter(cs + 1)}${er}`, rowBg);
        sc(r, cs + 3, pre,   true, '#,##0.00', undefined, rowBg);
        sc(r, cs + 4, acc,   true, '#,##0.00', undefined, rowBg);
      } else {
        const rev  = Number(md.recognizedRevenue ?? 0);
        const pre  = Number(md.prepayment ?? 0);
        const acc  = Number(md.acceptCollection ?? md.cashRecoveryAmount ?? 0);
        const lbr  = Number(md.laborCost ?? 0);
        const mat  = matMissing ? '待维护 BAA.4 成本' : (matByMonth?.[mo + 1] ?? 0);
        const oth  = Number(md.otherExpenses ?? 0);
        sc(r, cs + 0, rev,  true, '#,##0.00', undefined, rowBg);
        sc(r, cs + 1, pre,  true, '#,##0.00', undefined, rowBg);
        sc(r, cs + 2, acc,  true, '#,##0.00', undefined, rowBg);
        sc(r, cs + 3, lbr,  true, '#,##0.00', undefined, rowBg);
        sc(r, cs + 4, mat,  true, '#,##0.00', undefined, rowBg);
        sc(r, cs + 5, oth,  true, '#,##0.00', undefined, rowBg);
      }
    }

    sc(r, COL_NOTES, o.notes || '', false, 'General', undefined, rowBg);
  });

  // ── Merge 配置 ───────────────────────────────────────────────
  const merge: Record<string, any> = {};
  for (let ci = 0; ci < FIX; ci++) merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  merge[`0_${COL_SUM_START}`] = { r: 0, c: COL_SUM_START, rs: 1, cs: MX };
  for (let mo = 0; mo < MOS; mo++) merge[`0_${moStart(mo)}`] = { r: 0, c: moStart(mo), rs: 1, cs: MX };
  merge[`0_${COL_NOTES}`] = { r: 0, c: COL_NOTES, rs: 2, cs: 1 };

  // ── 下拉校验 ─────────────────────────────────────────────────
  const maxRows = Math.max(items.length + firstDataRow + 15, 25);
  const dv: Record<string, any> = {};
  const mkDv = (val: string) => ({ type: 'dropdown', type2: null, value1: val, value2: '', checked: false, remote: false, prohibitInput: false, hintShow: false, hintText: '' });
  const salesProjectOptions4srv = BUDGET_PROJECT_MASTER_DATA
    .filter((p: any) => isSalesProject(p) && p.nature !== '汇总')
    .map((p: any) => p.name)
    .filter(Boolean)
    .join(',');
  const serviceContractOptions = MASTER_CONTRACTS.map(c => c.name).join(',');
  const dvCols = [
    { col: 1, val: ADMIN_LEVEL1_DEPARTMENT_OPTIONS },
    { col: 2, val: salesProjectOptions4srv },
    { col: 3, val: serviceContractOptions },
    { col: 5, val: ENABLED_BUDGET_PRODUCTS.map(p => p.name).join(',') },
    { col: 7, val: CUSTOMERS.join(',') },
    { col: 9, val: REVENUE_METHOD_DICT.map(d => d.name).join(',') },
  ];
  for (let r = firstDataRow; r < maxRows; r++) dvCols.forEach(({ col, val }) => { dv[`${r}_${col}`] = mkDv(val); });

  // ── 列宽 ─────────────────────────────────────────────────────
  const columnlen: Record<number, number> = {
    0: 42, 1: 100, 2: 160, 3: 180, 4: 70, 5: 120, 6: 110, 7: 110, 8: 100, 9: 80, 10: 110,
    [COL_NOTES]: 150
  };
  for (let i = 0; i < MX; i++) columnlen[COL_SUM_START + i] = i === 0 ? 85 : 80;
  for (let mo = 0; mo < MOS; mo++) for (let i = 0; i < MX; i++) columnlen[moStart(mo) + i] = 78;

  return {
    name: role === 'finance' ? 'BB.1.3.c 财务视角(存量+增量)' : 'BB.1.3.a 服务销售填报',
    index: 3, status: 0, order: 3,
    row: Math.max(items.length + firstDataRow + 10, 25),
    column: TOTAL_COLS,
    celldata,
    dataVerification: dv,
    config: {
      merge,
      rowlen: { 0: 32, 1: 24 },
      columnlen,
      frozen: { type: 'rangeRow', range: { row_focus: 1, column_focus: 0 } }
    }
  };
}


/**
 * BB.1.3.d 物料明细（技术服务物料消耗明细）— 填报口径单表
 *
 * 存量订单与增量合并为一张表，由「订单编号」区分：存量订单行由系统带出（orderCode 有值、取自存量订单导入），
 * 增量行可用虚拟订单号或可不填（与 BB.1.2.a 订单编号口径一致）。原本按存量订单（.d）/增量（.e）分拆的两张填报表已合并为一张，故 role 不再区分存量/增量。
 * role='finance' 另出 BB.1.3.f 物料明细_财务查询（多「标准成本(万元/标准单位)」列、每月数量+成本两子列），财务口径不变。
 */
export function buildServiceMaterialSheet(
  items: ServiceMaterialDetailItem[],
  allMaterials: { code: string; name: string; displayName?: string; type?: string; unit?: string; standardCost?: number | null; badCost?: number | null }[] = [],
  org: string = '甜甜圈集团公司',
  year: string = '2027',
  role: 'sales' | 'finance' = 'sales'
): any {
  const celldata: any[] = [];
  const isSales = role !== 'finance';

  // ── 列索引 ───────────────────────────────────────────────────
  // 销售：固定维度去掉「物料标准成本」列（15列），每月只有「数量」1项
  // 财务：保留全部16固定维度，每月「数量+成本」2项
  // 固定维度在「签约主体（法人公司）」之后含「内部供应商」（留空=签约主体自己提供、填 AA.10 内部供应商=其他法人提供）
  const FIX         = isSales ? 15 : 16;
  const MX          = isSales ? 1 : 2;
  const MOS         = 12;
  const COL_SUM     = FIX;
  const COL_MON     = FIX + (isSales ? 1 : MX);
  const COL_NOTES   = COL_MON + MOS * MX;
  const TOTAL_COLS  = COL_NOTES + 1;

  const moStart = (mo: number) => COL_MON + mo * MX;

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  const sc = (r: number, c: number, val: any, isNum = false, fmt = 'General', f?: string, bg?: string, fc?: string, bold?: boolean) => {
    const cell: any = {
      v: val,
      m: isNum && typeof val === 'number' ? (fmt === '#,##0' || fmt === '#,##0.0000' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })) : String(val ?? ''),
      ct: { fa: fmt, t: isNum ? 'n' : 'g' }, ht: isNum ? 2 : 1, vt: 1
    };
    if (f)    cell.f  = f;
    if (bg)   cell.bg = bg;
    if (fc)   cell.fc = fc;
    if (bold) cell.bl = 1;
    celldata.push({ r, c, v: cell });
  };

  const hBg = '#002f6c'; const hFc = '#ffffff';
  const sBg = '#001e4a'; const mBg = '#001e4a';

  // ── r:0 顶级表头 ─────────────────────────────────────────────
  const fixedDimsFin  = ['序号','项目','预算部门','订单编号','区域','产品类别','客户','客户类型','签约主体（法人公司）','内部供应商','好坏件','物料类型','物料名称','物料编码','计量单位','标准成本(万元/标准单位)'];
  const fixedDimsSale = ['序号','项目','预算部门','订单编号','区域','产品类别','客户','客户类型','签约主体（法人公司）','内部供应商','好坏件','物料类型','物料名称','物料编码','计量单位'];
  const fixedDims = isSales ? fixedDimsSale : fixedDimsFin;
  fixedDims.forEach((h, ci) => sc(0, ci, h, false, 'General', undefined, hBg, hFc, true));
  sc(0, COL_SUM, '【全年合计】', false, 'General', undefined, sBg, hFc, true);
  for (let mo = 0; mo < MOS; mo++) sc(0, moStart(mo), `${mo + 1}月`, false, 'General', undefined, mBg, hFc, true);
  sc(0, COL_NOTES, '备注', false, 'General', undefined, hBg, hFc, true);

  // ── r:1 指标子表头 ───────────────────────────────────────────
  if (isSales) {
    sc(1, COL_SUM, '数量(标准单位)', false, 'General', undefined, sBg, hFc);
    for (let mo = 0; mo < MOS; mo++) sc(1, moStart(mo), '数量(标准单位)', false, 'General', undefined, mBg, hFc);
  } else {
    sc(1, COL_SUM,     '数量(标准单位)', false, 'General', undefined, sBg, hFc);
    sc(1, COL_SUM + 1, '成本合计', false, 'General', undefined, sBg, hFc);
    for (let mo = 0; mo < MOS; mo++) {
      sc(1, moStart(mo),     '数量(标准单位)', false, 'General', undefined, mBg, hFc);
      sc(1, moStart(mo) + 1, '成本',     false, 'General', undefined, mBg, hFc);
    }
  }

  // ── r:2 起数据行 ─────────────────────────────────────────────
  const firstDataRow = 2;
  items.forEach((item, idx) => {
    const r   = idx + firstDataRow;
    const er  = r + 1;
    const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
    const o   = item as any;
    const materialOption = allMaterials.find(m => m.code === o.materialCode);
    const unitCost = o.materialCode
      ? (o.partCategory === '坏件' ? (materialOption?.badCost ?? null) : (materialOption?.standardCost ?? null))
      : null;
    const costDisplay = unitCost == null ? '待维护 BAA.4 成本' : unitCost;
    const mq  = (o.monthlyQuantities || {}) as Record<string, number>;

    // 全年数量 = Σ各月数量（公式）
    const qtySum = Array.from({ length: 12 }, (_, i) => `${colLetter(moStart(i))}${er}`).join('+');
    const totalQty  = Array.from({ length: 12 }, (_, i) => Number(mq[`m${i + 1}`] ?? 0)).reduce((a, b) => a + b, 0);
    const totalCost = unitCost == null ? null : totalQty * unitCost;

    // 固定维度（销售视角少写最后一列 物料标准成本）
    sc(r, 0,  idx + 1,          true,  '#,##0',    undefined, rowBg);
    sc(r, 1,  o.projectName || '', false, 'General', undefined, rowBg);
    sc(r, 2,  o.department  || '', false, 'General', undefined, rowBg);
    // 订单编号：存量订单行取 orderCode（系统带出）、增量行可为虚拟订单号；无 orderCode 时回退合同名/合同编码
    sc(r, 3,  o.orderCode || MASTER_CONTRACTS.find(c => c.code === o.contractCode)?.name || o.contractName || o.contractCode || '', false, 'General', undefined, rowBg);
    sc(r, 4,  o.region      || '', false, 'General', undefined, rowBg);
    sc(r, 5,  o.productCategory || '', false, 'General', undefined, rowBg);
    sc(r, 6,  o.customer    || '', false, 'General', undefined, rowBg);
    sc(r, 7,  CUSTOMER_TYPE_MAPPING[o.customer] || o.customerType || '', false, 'General', undefined, rowBg);
    sc(r, 8,  o.signingEntity || o.legalEntity || '', false, 'General', undefined, rowBg);
    sc(r, 9,  o.internalSupplier || '', false, 'General', undefined, rowBg);
    sc(r, 10, o.partCategory || '好件', false, 'General', undefined, rowBg);
    const master = MATERIAL_MASTER_MAP[o.materialCode];
    sc(r, 11, master?.materialType || o.materialType || '', false, 'General', undefined, rowBg);
    sc(r, 12, master?.materialName || o.materialName || '', false, 'General', undefined, rowBg);
    sc(r, 13, o.materialCode || '', false, 'General', undefined, rowBg);
    sc(r, 14, master?.unit || o.unit || '', false, 'General', undefined, rowBg);
    if (!isSales) sc(r, 15, costDisplay, unitCost != null, '#,##0.0000', undefined, rowBg);

    // 全年合计
    sc(r, COL_SUM, totalQty, true, '#,##0', `=${qtySum}`, '#f0f4ff');
    if (!isSales) sc(r, COL_SUM + 1, unitCost == null ? costDisplay : totalCost, unitCost != null, '#,##0.00', unitCost == null ? undefined : `=${colLetter(COL_SUM)}${er}*${colLetter(15)}${er}`, '#f0f4ff');

    // 月度
    for (let mo = 0; mo < MOS; mo++) {
      const qty  = Number(mq[`m${mo + 1}`] ?? 0);
      const cost = unitCost == null ? null : qty * unitCost;
      const cs   = moStart(mo);
      sc(r, cs, qty, true, '#,##0', undefined, rowBg);
      if (!isSales) sc(r, cs + 1, unitCost == null ? costDisplay : cost, unitCost != null, '#,##0.00', unitCost == null ? undefined : `=${colLetter(cs)}${er}*${colLetter(15)}${er}`, rowBg);
    }

    sc(r, COL_NOTES, o.notes || '', false, 'General', undefined, rowBg);
  });


  // ── Merge ─────────────────────────────────────────────────────
  const merge: Record<string, any> = {};
  for (let ci = 0; ci < FIX; ci++) merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  merge[`0_${COL_SUM}`]   = { r: 0, c: COL_SUM, rs: 1, cs: MX };
  for (let mo = 0; mo < MOS; mo++) merge[`0_${moStart(mo)}`] = { r: 0, c: moStart(mo), rs: 1, cs: MX };
  merge[`0_${COL_NOTES}`] = { r: 0, c: COL_NOTES, rs: 2, cs: 1 };

  // ── 数据校验（下拉）──────────────────────────────────────────
  const maxRows = Math.max(items.length + firstDataRow + 15, 25);
  const dv: Record<string, any> = {};
  const mkDv = (val: string) => ({ type: 'dropdown', type2: null, value1: val, value2: '', checked: false, remote: false, prohibitInput: false, hintShow: false, hintText: '' });
  const materialOptions = allMaterials.map(m => m.code).filter(Boolean).join(',');
  const salesProjectOptions4mat = BUDGET_PROJECT_MASTER_DATA
    .filter((p: any) => isSalesProject(p) && p.nature !== '汇总')
    .map((p: any) => p.name)
    .filter(Boolean)
    .join(',');
  const serviceContractOptions4mat = MASTER_CONTRACTS.map(c => c.name).join(',');
  const internalSupplierOptions = SUPPLIER_MASTER_DATA
    .filter((s: any) => s.supplierType === '内部' && s.status !== '停用')
    .map((s: any) => s.name)
    .filter(Boolean)
    .join(',');
  const dvCols = [
    { col: 1,  val: salesProjectOptions4mat },
    { col: 2,  val: ADMIN_LEVEL1_DEPARTMENT_OPTIONS },
    { col: 3,  val: serviceContractOptions4mat },
    { col: 4,  val: '华东区,华南区,华北区,西南区,海外区' },
    { col: 5,  val: PRODUCT_CATEGORY_DICT.map((d: any) => d.name).join(',') },
    { col: 6,  val: CUSTOMERS.join(',') },
    { col: 9,  val: internalSupplierOptions },
    { col: 10, val: MATERIAL_QUALITY_DICT.map(item => item.name).join(',') },
    { col: 13, val: allMaterials.map(m => m.code).filter(Boolean).join(',') },
  ];
  for (let r = firstDataRow; r < maxRows; r++) dvCols.forEach(({ col, val }) => { dv[`${r}_${col}`] = mkDv(val); });

  // ── 列宽 ─────────────────────────────────────────────────────
  const columnlen: Record<number, number> = {
    0: 42, 1: 160, 2: 100, 3: 110, 4: 72, 5: 120, 6: 110, 7: 100, 8: 110, 9: 130, 10: 70, 11: 170, 12: 110, 13: 110, 14: 90,
    [COL_SUM]: 72, [COL_SUM + 1]: 80, [COL_NOTES]: 150
  };
  if (!isSales) columnlen[15] = 110;
  for (let mo = 0; mo < MOS; mo++) { columnlen[moStart(mo)] = 65; columnlen[moStart(mo) + 1] = 70; }

  return {
    name: role === 'finance' ? 'BB.1.3.f 物料明细_财务查询' : 'BB.1.3.d 物料明细',
    index: 4, status: 0, order: 4,
    row: Math.max(items.length + firstDataRow + 10, 25),
    column: TOTAL_COLS,
    celldata,
    dataVerification: dv,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen, frozen: { type: 'rangeRow', range: { row_focus: 1, column_focus: 0 } } }
  };
}


/**
 * BB.1.3.g 人工明细（技术服务人工投入明细）— 填报口径单表
 *
 * 存量订单与增量合并为一张表，由「订单编号」区分：存量订单行由系统带出（orderCode 有值、取自存量订单导入），
 * 增量行可用虚拟订单号或可不填。原本按存量订单（.g）/增量（.h）分拆的两张填报表已合并为一张，故 role 不再区分存量/增量。
 * role='finance' 另出 BB.1.3.i 人工明细_财务查询（多「工时标准成本(万元/标准工时)」列、每月工时+成本两子列），财务口径不变。
 */
export function buildServiceLaborSheet(
  items: ServiceLaborDetailItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027',
  role: 'sales' | 'finance' = 'sales'
): any {
  const celldata: any[] = [];
  const isSales = role !== 'finance';

  // ── 列索引 ───────────────────────────────────────────────────────────
  // 固定维度在「签约主体（法人公司）」之后含「内部供应商」（留空=签约主体自己提供、填 AA.10 内部供应商=其他法人提供）
  // Sales:   FIX=12 (c0-c11), COL_SUM=12 (1列), COL_MON=13, NOTES=25
  // Finance: FIX=13 (c0-c12), COL_SUM=13 (2列), COL_MON=15, NOTES=39
  const FIX       = isSales ? 12 : 13;
  const MX        = isSales ? 1 : 2;
  const MOS       = 12;
  const COL_SUM   = FIX;
  const COL_MON   = FIX + (isSales ? 1 : 2);
  const COL_NOTES = COL_MON + MOS * MX;
  const TOTAL_COLS = COL_NOTES + 1;

  const moStart = (mo: number) => COL_MON + mo * MX;

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  const sc = (r: number, c: number, val: any, isNum = false, fmt = 'General', f?: string, bg?: string, fc?: string, bold?: boolean) => {
    const cell: any = {
      v: val,
      m: isNum && typeof val === 'number' ? (fmt === '#,##0' || fmt === '#,##0.0000' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })) : String(val ?? ''),
      ct: { fa: fmt, t: isNum ? 'n' : 'g' }, ht: isNum ? 2 : 1, vt: 1
    };
    if (f)    cell.f  = f;
    if (bg)   cell.bg = bg;
    if (fc)   cell.fc = fc;
    if (bold) cell.bl = 1;
    celldata.push({ r, c, v: cell });
  };

  const hBg = '#002f6c'; const hFc = '#ffffff';
  const sBg = '#001e4a'; const mBg = '#001e4a';

  // ── r:0 顶级表头 ─────────────────────────────────────────────────────
  const fixedDimsSale = ['序号','项目','预算部门','订单编号','区域','产品类别','客户','客户类型','签约主体（法人公司）','内部供应商','岗位','职级'];
  const fixedDimsFin  = ['序号','项目','预算部门','订单编号','区域','产品类别','客户','客户类型','签约主体（法人公司）','内部供应商','岗位','职级','工时标准成本(万元/标准工时)'];
  const fixedDims = isSales ? fixedDimsSale : fixedDimsFin;
  fixedDims.forEach((h, ci) => sc(0, ci, h, false, 'General', undefined, hBg, hFc, true));

  if (isSales) {
    // Sales: 全年合计 + 各月 rs:2
    sc(0, COL_SUM, '【全年合计】', false, 'General', undefined, sBg, hFc, true);
    for (let mo = 0; mo < MOS; mo++) sc(0, moStart(mo), `${mo + 1}月`, false, 'General', undefined, mBg, hFc, true);
  } else {
    // Finance: 全年合计组 + 各月组
    sc(0, COL_SUM, '【全年合计】', false, 'General', undefined, sBg, hFc, true);
    for (let mo = 0; mo < MOS; mo++) sc(0, moStart(mo), `${mo + 1}月`, false, 'General', undefined, mBg, hFc, true);
  }
  sc(0, COL_NOTES, '备注', false, 'General', undefined, hBg, hFc, true);

  // ── r:1 指标子表头 ──────────────────────────────────────────────────
  if (isSales) {
    // sales: 全年 + 各月都是单列rs:2，不需要r:1子表头（合并到r:0），但需要留空以配合merge
    // (no sub-header cells needed; columns are merged rs:2)
  } else {
    sc(1, COL_SUM,     '工时(小时)', false, 'General', undefined, sBg, hFc);
    sc(1, COL_SUM + 1, '人工成本',   false, 'General', undefined, sBg, hFc);
    for (let mo = 0; mo < MOS; mo++) {
      sc(1, moStart(mo),     '工时(小时)', false, 'General', undefined, mBg, hFc);
      sc(1, moStart(mo) + 1, '成本',       false, 'General', undefined, mBg, hFc);
    }
  }

  // ── r:2 起数据行 ────────────────────────────────────────────────────
  const firstDataRow = 2;
  items.forEach((item, idx) => {
    const r = idx + firstDataRow;
    const er = r + 1; // Excel 1-based row
    const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
    const mh = (item.monthlyHours || {}) as Record<string, number>;
    const unitCost = Number(item.hourlyStandardCost ?? 0);

    // 全年工时公式
    const hoursSum = Array.from({ length: 12 }, (_, i) => `${colLetter(moStart(i))}${er}`).join('+');

    // 固定维度
    sc(r, 0, idx + 1,                true,  '#,##0',   undefined, rowBg);
    sc(r, 1, item.productName || '', false, 'General', undefined, rowBg);
    sc(r, 2, item.department  || '', false, 'General', undefined, rowBg);
    // 订单编号：存量订单行取 orderCode（系统带出）、增量行可为虚拟订单号；无 orderCode 时回退合同名/合同编码
    sc(r, 3, (item as any).orderCode || (item.contractCode ? (MASTER_CONTRACTS.find(c => c.code === item.contractCode)?.name || item.contractCode) : ''), false, 'General', undefined, rowBg);
    sc(r, 4, item.region      || '', false, 'General', undefined, rowBg);
    sc(r, 5, item.productCategory || '', false, 'General', undefined, rowBg);
    sc(r, 6, item.customer    || '', false, 'General', undefined, rowBg);
    sc(r, 7, item.customerType|| '', false, 'General', undefined, rowBg);
    sc(r, 8, item.signingEntity || '', false, 'General', undefined, rowBg);
    sc(r, 9, item.internalSupplier || '', false, 'General', undefined, rowBg);
    sc(r, 10, item.position    || '', false, 'General', undefined, rowBg);
    sc(r, 11, item.rank        || '', false, 'General', undefined, rowBg);
    if (!isSales) sc(r, 12, unitCost, true, '#,##0.0000', undefined, rowBg);

    if (isSales) {
      // 全年合计工时（公式）
      const totalH = Array.from({ length: 12 }, (_, i) => Number(mh[`m${i + 1}`] ?? 0)).reduce((a, b) => a + b, 0);
      sc(r, COL_SUM, totalH, true, '#,##0', `=${hoursSum}`, '#f0f4ff');
    } else {
      const totalH = Array.from({ length: 12 }, (_, i) => Number(mh[`m${i + 1}`] ?? 0)).reduce((a, b) => a + b, 0);
      const totalC = totalH * unitCost;
      sc(r, COL_SUM,     totalH, true, '#,##0',    `=${hoursSum}`, '#f0f4ff');
      sc(r, COL_SUM + 1, totalC, true, '#,##0.00', `=${colLetter(COL_SUM)}${er}*${colLetter(12)}${er}`, '#f0f4ff');
    }

    // 月度
    for (let mo = 0; mo < MOS; mo++) {
      const h = Number(mh[`m${mo + 1}`] ?? 0);
      const cs = moStart(mo);
      sc(r, cs, h, true, '#,##0', undefined, rowBg);
      if (!isSales) {
        const cost = h * unitCost;
        sc(r, cs + 1, cost, true, '#,##0.00', `=${colLetter(cs)}${er}*${colLetter(12)}${er}`, rowBg);
      }
    }

    sc(r, COL_NOTES, item.notes || '', false, 'General', undefined, rowBg);
  });

  // ── Merge ────────────────────────────────────────────────────────────
  const merge: Record<string, any> = {};
  // 固定维度：各列 rs:2
  for (let ci = 0; ci < FIX; ci++) merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  if (isSales) {
    // 全年工时：rs:2 (单列)
    merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 2, cs: 1 };
    // 各月：rs:2
    for (let mo = 0; mo < MOS; mo++) merge[`0_${moStart(mo)}`] = { r: 0, c: moStart(mo), rs: 2, cs: 1 };
  } else {
    // 全年合计：cs:2
    merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: 2 };
    // 各月：cs:2
    for (let mo = 0; mo < MOS; mo++) merge[`0_${moStart(mo)}`] = { r: 0, c: moStart(mo), rs: 1, cs: 2 };
  }
  merge[`0_${COL_NOTES}`] = { r: 0, c: COL_NOTES, rs: 2, cs: 1 };

  // ── 数据校验（下拉）─────────────────────────────────────────────────
  const maxRows = Math.max(items.length + firstDataRow + 15, 25);
  const dv: Record<string, any> = {};
  const mkDv = (val: string) => ({ type: 'dropdown', type2: null, value1: val, value2: '', checked: false, remote: false, prohibitInput: false, hintShow: false, hintText: '' });
  const positionOptions = '高级激光装调工程师,数控算法开发专家,电气控制维保技师,机械装配专家,光学装调工程师,激光工艺专家,MES实施架构师,现场应用培训讲师,环境试验测试工程师,机械精调技师长';
  const rankOptions     = '职级1,职级2,T1,T2,T3,T4,T5';
  const salesProjectOptions4lbr = BUDGET_PROJECT_MASTER_DATA
    .filter((p: any) => isSalesProject(p) && p.nature !== '汇总')
    .map((p: any) => p.name)
    .filter(Boolean)
    .join(',');
  const serviceContractOptions4lbr = MASTER_CONTRACTS.map(c => c.name).join(',');
  const internalSupplierOptions4lbr = SUPPLIER_MASTER_DATA
    .filter((s: any) => s.supplierType === '内部' && s.status !== '停用')
    .map((s: any) => s.name)
    .filter(Boolean)
    .join(',');
  const dvCols = [
    { col: 1, val: salesProjectOptions4lbr },
    { col: 2, val: ADMIN_LEVEL1_DEPARTMENT_OPTIONS },
    { col: 3, val: serviceContractOptions4lbr },
    { col: 4, val: '华东区,华南区,华北区,西南区,海外区' },
    { col: 5, val: PRODUCT_CATEGORY_DICT.map((d: any) => d.name).join(',') },
    { col: 6, val: CUSTOMERS.join(',') },
    { col: 9, val: internalSupplierOptions4lbr },
    { col: 10, val: positionOptions },
    { col: 11, val: rankOptions },
  ];
  for (let r = firstDataRow; r < maxRows; r++) dvCols.forEach(({ col, val }) => { dv[`${r}_${col}`] = mkDv(val); });

  // ── 列宽 ─────────────────────────────────────────────────────────────
  const columnlen: Record<number, number> = {
    0: 42, 1: 160, 2: 100, 3: 110, 4: 72, 5: 120, 6: 110, 7: 100, 8: 110, 9: 130, 10: 140, 11: 80,
    [COL_NOTES]: 150
  };
  if (!isSales) columnlen[12] = 120;
  columnlen[COL_SUM] = 80;
  if (!isSales) columnlen[COL_SUM + 1] = 80;
  for (let mo = 0; mo < MOS; mo++) {
    columnlen[moStart(mo)] = 65;
    if (!isSales) columnlen[moStart(mo) + 1] = 70;
  }

  return {
    name: role === 'finance' ? 'BB.1.3.i 人工明细_财务查询' : 'BB.1.3.g 人工明细',
    index: 5, status: 0, order: 5,
    row: Math.max(items.length + firstDataRow + 10, 25),
    column: TOTAL_COLS,
    celldata,
    dataVerification: dv,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen, frozen: { type: 'rangeRow', range: { row_focus: 1, column_focus: 0 } } }
  };
}


export function buildProductRevenueMappingSheet(
  items: import('../../data/productCategoryDict').ProductCategoryDictItem[]
): object {
  const celldata: object[] = [];

  // ── 列结构（9列）──
  // 产品编码 | 产品类别（财务口径）名 | 默认收入确认方式 | 收入方式编码 | 准则分类 | 月度分摆逻辑 | 标准成本率% | 毛利率% | 映射说明
  const headers = [
    '产品编码', '产品类别（财务口径）名', '默认收入确认方式', '方式编码',
    '准则分类', '月度分摆逻辑', '标准成本率(%)', '毛利率(%)', '映射说明'
  ];

  // 列头（r:0）用统一深蓝样式
  headers.forEach((h, c) => {
    celldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  // 从 AB.4 字典构建收入方式快查
  const methodMap = new Map(REVENUE_METHOD_DICT.map(m => [m.name, m]));

  // 数据行（r:1 起）
  items.forEach((item, idx) => {
    const r = idx + 1;
    const method = methodMap.get(item.defaultRevenueMethod);
    const isEven = idx % 2 === 0;
    const rowBg = isEven ? '#ffffff' : '#f7f9fc';

    const vals: { v: string | number; isNum?: boolean }[] = [
      { v: item.code },
      { v: item.name },
      { v: item.defaultRevenueMethod },
      { v: method?.code || '-' },
      { v: method?.recognitionType || '-' },
      { v: method?.monthlyDistribution || '-' },
      { v: item.costRatePct, isNum: true },
      { v: Math.round((100 - item.costRatePct) * 10) / 10, isNum: true },
      { v: item.notes },
    ];

    vals.forEach(({ v, isNum }, c) => {
      celldata.push({
        r, c,
        v: {
          v, m: isNum ? String(v) : String(v),
          ct: isNum ? { fa: '0.0', t: 'n' } : { fa: '@', t: 's' },
          bg: rowBg,
          ht: isNum ? 2 : 0,  // 数字右对齐，文本左对齐
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    });
  });

  return {
    name: 'AM.1 产品类别（财务口径）与收入映射',
    color: '',
    index: 'am2_product_revenue_mapping',
    status: 1,
    order: 0,
    hide: 0,
    row: Math.max(items.length + 5, 10),
    column: 9,
    defaultRowHeight: 28,
    defaultColWidth: 110,
    celldata,
    config: {
      rowlen: { 0: 28 },
      columnlen: {
        0: 80,   // 产品编码
        1: 160,  // 产品类别（财务口径）名
        2: 140,  // 默认收入确认方式
        3: 80,   // 方式编码
        4: 80,   // 准则分类
        5: 240,  // 月度分摆逻辑
        6: 90,   // 标准成本率
        7: 80,   // 毛利率
        8: 320,  // 映射说明
      },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };
}


/**
 * 销售预算多维汇总分析 (BB.1.X, 经营) — 经营分析用报表
 * 口径：本表为经营分析用报表，不区分法人，不涉及预算三表的引用与计算。
 * 度量 = 收入/成本/毛利润/销售直接费用/贡献利润（万元，不含税；毛利润=收入−成本，贡献利润=毛利润−销售直接费用）。
 * 返回：BB.1.X.a 透视基表（客户×项目×产品×部门明细，含示例数据） + BB.1.X.b 透视表（默认按客户汇总，前端交互组件可切换 客户/项目/产品/部门）。
 */
export function buildSalesBudgetSummarySheet(
  items: BudgetItem[] = [],
  stockOrders: StockOrderItem[] = [],
  org: string = '集团公司',
  year: string = '2027'
): any[] {
  const rows = SALES_PIVOT_SAMPLE;
  const dims = [...SALES_PIVOT_DIMS];
  const metrics = [...SALES_PIVOT_METRICS];
  const N_DIM = dims.length;
  const N_METRIC = metrics.length;

  // 单元格写入辅助：数值统一万元、保留 1 位小数
  const numCell = (celldata: any[], r: number, c: number, val: any, isNum: boolean, bg: string, fc: string, extra: any = {}) => {
    celldata.push({
      r, c,
      v: {
        v: val,
        m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''),
        ct: { fa: isNum ? '#,##0.0' : 'General', t: isNum ? 'n' : 'g' },
        bg, fc, ht: isNum ? 2 : 1, vt: 1, ...extra,
      },
    });
  };

  // ① BB.1.X.a 透视基表：明细数据（客户×项目×产品×部门 + 5 指标全年合计）
  const buildBaseSheet = () => {
    const celldata: any[] = [];
    const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};
    dims.forEach((h, c) => {
      celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    });
    metrics.forEach((m, mi) => {
      const c = N_DIM + mi;
      celldata.push({ r: 0, c, v: { v: m, m, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    });
    rows.forEach((row, ri) => {
      const r = 1 + ri;
      const bg = ri % 2 === 1 ? '#f8fafc' : '#ffffff';
      dims.forEach((d, di) => numCell(celldata, r, di, row[SALES_PIVOT_DIM_KEY[d]], false, bg, '#1e293b'));
      metrics.forEach((m, mi) => numCell(celldata, r, N_DIM + mi, row[SALES_PIVOT_METRIC_KEY[m]], true, bg, '#0f172a'));
    });
    const columnlen: Record<number, number> = { 0: 150, 1: 260, 2: 210, 3: 110 };
    for (let c = N_DIM; c < N_DIM + N_METRIC; c++) columnlen[c] = 90;
    return {
      name: 'BB.1.X.a 透视基表（客户×项目×产品×部门）',
      color: '#3b82f6',
      index: 'sheet_sales_summary',
      status: 1,
      order: 0,
      hide: 0,
      row: 1 + rows.length,
      column: N_DIM + N_METRIC,
      defaultRowHeight: 24,
      celldata,
      config: { merge, rowlen: { 0: 26 }, columnlen },
    };
  };

  // ② BB.1.X.b 透视表：默认按客户透视（静态兜底）；前端交互组件可切换 客户/项目/产品/部门
  const buildPivotSheet = () => {
    const map = new Map<string, { revenue: number; cost: number; grossProfit: number; salesExpense: number; contributionProfit: number }>();
    rows.forEach((r) => {
      if (!map.has(r.customer)) map.set(r.customer, { revenue: 0, cost: 0, grossProfit: 0, salesExpense: 0, contributionProfit: 0 });
      const t = map.get(r.customer)!;
      t.revenue += r.revenue; t.cost += r.cost; t.grossProfit += r.grossProfit; t.salesExpense += r.salesExpense; t.contributionProfit += r.contributionProfit;
    });
    const pivotRows = Array.from(map.entries()).map(([customer, v]) => ({ customer, ...v }));

    const celldata: any[] = [];
    const headers = ['客户', '收入', '成本', '毛利润', '销售直接费用', '贡献利润'];
    headers.forEach((h, c) => {
      celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    });
    pivotRows.forEach((row, ri) => {
      const r = 1 + ri;
      const bg = ri % 2 === 1 ? '#f8fafc' : '#ffffff';
      numCell(celldata, r, 0, row.customer, false, bg, '#1e293b');
      numCell(celldata, r, 1, row.revenue, true, bg, '#0f172a');
      numCell(celldata, r, 2, row.cost, true, bg, '#0f172a');
      numCell(celldata, r, 3, row.grossProfit, true, bg, '#0f172a');
      numCell(celldata, r, 4, row.salesExpense, true, bg, '#0f172a');
      numCell(celldata, r, 5, row.contributionProfit, true, bg, '#0f172a');
    });
    return {
      name: 'BB.1.X.b 透视表（按客户/项目/产品/部门切换）',
      color: '#3b82f6',
      index: 'sheet_sales_pivot',
      status: 1,
      order: 1,
      hide: 0,
      row: 1 + pivotRows.length,
      column: 6,
      defaultRowHeight: 24,
      celldata,
      config: { columnlen: { 0: 180, 1: 100, 2: 100, 3: 100, 4: 120, 5: 100 } },
    };
  };

  return [buildBaseSheet(), buildPivotSheet()];
}
