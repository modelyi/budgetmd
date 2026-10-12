import { createMonthlyBudgetSheet, createSimpleMonthlySheet, type MonthlyBudgetRowSpec, type SimpleMonthlyRowSpec } from './declarativeSheetBuilder';
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
import type { EquityInvestmentItem, NonBankFinancialMonthlyData } from '../../types';

export function buildExpenseBudgetSummaryResearchSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const baseHeaders = ['预算项目', '预算部门', '费用科目'];
  const N_BASE = baseHeaders.length; // 3 (c0~c2)
  const COL_SUM = N_BASE;             // 3
  const moStart = (m: number) => COL_SUM + 1 + (m - 1); // 1月=c4 ... 12月=c15
  const COL_NOTES = moStart(12) + 1;  // 16
  const TOTAL_COLS = COL_NOTES + 1;   // 17

  // Row 0/1: 维度列表头 (两行制, r0 跨行合并)
  baseHeaders.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });

  // 全年合计 (r0 跨行合并)
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  celldata.push({ r: 1, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 2, cs: 1 };

  // 1~12月 (r0 跨行合并)
  for (let m = 1; m <= 12; m++) {
    const c = moStart(m);
    const label = `${m}月`;
    celldata.push({ r: 0, c, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  }

  // 备注说明 (r0 跨行合并)
  celldata.push({ r: 0, c: COL_NOTES, v: { v: '备注说明', m: '备注说明', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  celldata.push({ r: 1, c: COL_NOTES, v: { v: '备注说明', m: '备注说明', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  merge[`0_${COL_NOTES}`] = { r: 0, c: COL_NOTES, rs: 2, cs: 1 };

  // 数据行 (从 r2 开始)
  items.forEach((it, idx) => {
    const r = idx + 2;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, f?: string) => {
      const cell: any = { v: val, m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''), ct: { fa: isNum ? '#,##0.00' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };
    setCell(0, it.budgetProject ?? '');
    setCell(1, it.department ?? '');
    setCell(2, it.expenseSubject ?? '');
    const colLetter = (c: number): string => {
      let s = '', n = c + 1;
      while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
      return s;
    };
    const sumRefs = `${colLetter(moStart(1))}${r}:${colLetter(moStart(12))}${r}`;
    setCell(COL_SUM, it.annualTotal ?? 0, true, `=SUM(${sumRefs})`);
    for (let m = 1; m <= 12; m++) {
      setCell(moStart(m), it.months?.[`m${m}`] ?? 0, true);
    }
    setCell(COL_NOTES, it.notes ?? '');
  });

  const columnlen: Record<number, number> = { 0: 140, 1: 110, 2: 140 };
  columnlen[COL_SUM] = 90;
  for (let m = 1; m <= 12; m++) columnlen[moStart(m)] = 75;
  columnlen[COL_NOTES] = 220;

  return {
    name: 'BA.5 费用预算汇总表',
    index: 'ba5_expense_budget_summary_research',
    status: 1,
    order: 0,
    row: Math.max(items.length + 5, 10),
    column: TOTAL_COLS,
    celldata,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}


export function buildMaterialConsumptionSummarySheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const baseHeaders = ['预算项目', '预算部门', '物料名称', '物料类别', '领料用途'];
  const N_BASE = baseHeaders.length; // 5 (c0~c4)
  const COL_SUM = N_BASE;             // 5
  const moStart = (m: number) => COL_SUM + 1 + (m - 1); // 1月=c6 ... 12月=c17
  const COL_NOTES = moStart(12) + 1;  // 18
  const TOTAL_COLS = COL_NOTES + 1;   // 19

  // Row 0/1: 维度列表头 (两行制, r0 跨行合并)
  baseHeaders.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });

  // 全年合计 (r0 跨行合并)
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  celldata.push({ r: 1, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 2, cs: 1 };

  // 1~12月 (r0 跨行合并)
  for (let m = 1; m <= 12; m++) {
    const c = moStart(m);
    const label = `${m}月`;
    celldata.push({ r: 0, c, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  }

  // 备注说明 (r0 跨行合并)
  celldata.push({ r: 0, c: COL_NOTES, v: { v: '备注说明', m: '备注说明', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  celldata.push({ r: 1, c: COL_NOTES, v: { v: '备注说明', m: '备注说明', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  merge[`0_${COL_NOTES}`] = { r: 0, c: COL_NOTES, rs: 2, cs: 1 };

  // 数据行 (从 r2 开始)
  items.forEach((it, idx) => {
    const r = idx + 2;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, f?: string) => {
      const cell: any = { v: val, m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''), ct: { fa: isNum ? '#,##0.00' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };
    setCell(0, it.budgetProject ?? '');
    setCell(1, it.department ?? '');
    setCell(2, it.materialName ?? '');
    setCell(3, it.materialCategory ?? '');
    setCell(4, it.usage ?? '');
    const colLetter = (c: number): string => {
      let s = '', n = c + 1;
      while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
      return s;
    };
    const sumRefs = `${colLetter(moStart(1))}${r}:${colLetter(moStart(12))}${r}`;
    setCell(COL_SUM, it.annualTotal ?? 0, true, `=SUM(${sumRefs})`);
    for (let m = 1; m <= 12; m++) {
      setCell(moStart(m), it.months?.[`m${m}`] ?? 0, true);
    }
    setCell(COL_NOTES, it.notes ?? '');
  });

  const columnlen: Record<number, number> = { 0: 150, 1: 130, 2: 150, 3: 120, 4: 110 };
  columnlen[COL_SUM] = 90;
  for (let m = 1; m <= 12; m++) columnlen[moStart(m)] = 75;
  columnlen[COL_NOTES] = 220;

  return {
    name: 'BAP.2 物料消耗需求汇总表_常规',
    index: 'bap2_material_consumption_summary_research',
    status: 1,
    order: 0,
    row: Math.max(items.length + 5, 10),
    column: TOTAL_COLS,
    celldata,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}

/**
 * BB.3.X.b 领料与结转视图（进销存附表）
 * 生产领料消耗的会计分录单独承载于本附表：按法人公司×预算项目×预算部门×领料用途汇总领料金额，
 * 领料用途决定借方科目路由（生产类→生产成本-直接材料(5001)进在制品「料」腿；研发类→研发费用(6603)；
 * 销售类→销售费用(6601)；管理类及其他→管理费用(6602)），贷方统一为存货(1405)减少。
 * BAP.2 物料消耗需求汇总表_常规为前置接口表（外部模块数据汇总），本身不生成分录。
 */
export function buildMaterialConsumptionFinanceViewSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const baseHeaders = ['法人公司', '预算项目', '预算部门', '领料用途'];
  const N_BASE = baseHeaders.length; // 4 (c0~c3)
  const COL_SUM = N_BASE;             // 4
  const moStart = (m: number) => COL_SUM + 1 + (m - 1); // 1月=c5 ... 12月=c16
  const TOTAL_COLS = moStart(12) + 1;   // 17

  // Row 0/1: 维度列表头 (两行制, r0 跨行合并)
  baseHeaders.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });

  // 全年合计 (r0 跨行合并)
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  celldata.push({ r: 1, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 2, cs: 1 };

  // 1~12月 (r0 跨行合并)
  for (let m = 1; m <= 12; m++) {
    const c = moStart(m);
    const label = `${m}月`;
    celldata.push({ r: 0, c, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  }

  // 数据行 (从 r2 开始)
  items.forEach((it, idx) => {
    const r = idx + 2;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, f?: string) => {
      const cell: any = { v: val, m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''), ct: { fa: isNum ? '#,##0.00' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };
    setCell(0, it.legalEntity ?? '');
    setCell(1, it.budgetProject ?? '');
    setCell(2, it.department ?? '');
    setCell(3, it.usage ?? '');
    const colLetter = (c: number): string => {
      let s = '', n = c + 1;
      while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
      return s;
    };
    const sumRefs = `${colLetter(moStart(1))}${r}:${colLetter(moStart(12))}${r}`;
    setCell(COL_SUM, it.annualTotal ?? 0, true, `=SUM(${sumRefs})`);
    for (let m = 1; m <= 12; m++) {
      setCell(moStart(m), it.months?.[`m${m}`] ?? 0, true);
    }
  });

  const columnlen: Record<number, number> = { 0: 150, 1: 200, 2: 130, 3: 120 };
  columnlen[COL_SUM] = 90;
  for (let m = 1; m <= 12; m++) columnlen[moStart(m)] = 75;

  return {
    name: 'BB.3.X.b 领料与结转视图',
    index: 'bb3x_material_consumption_finance_view',
    status: 1,
    order: 1,
    row: Math.max(items.length + 5, 10),
    column: TOTAL_COLS,
    celldata,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}


export function buildRndMaterialConsumptionSummarySheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const baseHeaders = ['预算部门', '物料编码', '物料名称', '物料类别'];
  const N_BASE = baseHeaders.length; // 4 (c0~c3)
  const COL_SUM = N_BASE;             // 4
  const moStart = (m: number) => COL_SUM + 1 + (m - 1); // 1月=c5 ... 12月=c16
  const COL_NOTES = moStart(12) + 1;  // 17
  const TOTAL_COLS = COL_NOTES + 1;   // 18

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

  celldata.push({ r: 0, c: COL_NOTES, v: { v: '备注说明', m: '备注说明', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  celldata.push({ r: 1, c: COL_NOTES, v: { v: '备注说明', m: '备注说明', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  merge[`0_${COL_NOTES}`] = { r: 0, c: COL_NOTES, rs: 2, cs: 1 };

  items.forEach((it, idx) => {
    const r = idx + 2;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, f?: string) => {
      const cell: any = { v: val, m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''), ct: { fa: isNum ? '#,##0.00' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };
    setCell(0, it.department ?? '');
    setCell(1, it.materialCode ?? '');
    setCell(2, it.materialName ?? '');
    setCell(3, '研发物料');
    const colLetter = (c: number): string => {
      let s = '', n = c + 1;
      while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
      return s;
    };
    const sumRefs = `${colLetter(moStart(1))}${r}:${colLetter(moStart(12))}${r}`;
    setCell(COL_SUM, it.annualTotal ?? 0, true, `=SUM(${sumRefs})`);
    for (let m = 1; m <= 12; m++) {
      setCell(moStart(m), it.months?.[`m${m}`] ?? 0, true);
    }
    setCell(COL_NOTES, it.notes ?? '');
  });

  const columnlen: Record<number, number> = { 0: 130, 1: 120, 2: 160, 3: 110 };
  columnlen[COL_SUM] = 90;
  for (let m = 1; m <= 12; m++) columnlen[moStart(m)] = 75;
  columnlen[COL_NOTES] = 220;

  return {
    name: 'BAP.3 物料消耗需求汇总表_研发长期',
    index: 'bap3_rnd_material_consumption_summary_research',
    status: 1,
    order: 0,
    row: Math.max(items.length + 5, 10),
    column: TOTAL_COLS,
    celldata,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}


export function buildDeptAttributeMappingSheet(items: DeptAttributeMappingItem[] = []): any {
  const celldata: any[] = [];
  const headers = ['部门', '费用属性', '备注说明'];
  headers.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  });
  items.forEach((it, idx) => {
    const r = idx + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any) => {
      celldata.push({ r, c, v: { v: val, m: String(val ?? ''), ct: { fa: 'General', t: 'g' }, bg: rowBg, ht: 0, vt: 1 } });
    };
    setCell(0, it.department);
    setCell(1, it.expenseNature);
    setCell(2, it.notes ?? '');
  });
  return {
    name: 'AM.2 部门属性映射表',
    index: 'am3_dept_attribute_mapping',
    status: 1,
    order: 0,
    row: Math.max(items.length + 5, 10),
    column: headers.length,
    defaultRowHeight: 28,
    defaultColWidth: 140,
    celldata,
    config: { columnlen: { 0: 160, 1: 110, 2: 260 } }
  };
}


export function buildExpenseConversionRatioSheet(
  items: any[] = [],
  entityNames: string[] = LEGAL_ENTITIES.map((e) => e.name)
): any {
  const celldata: any[] = [];
  const baseHeaders = ['预算项目', '部门', '费用科目', '费用性质'];
  const headers = [...baseHeaders, ...entityNames, '合计'];
  headers.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  });
  items.forEach((it, idx) => {
    const r = idx + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false) => {
      celldata.push({ r, c, v: { v: val, m: String(val ?? ''), ct: { fa: isNum ? '0.00%' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 } });
    };
    setCell(0, it.budgetProject ?? '');
    setCell(1, it.department ?? '');
    setCell(2, it.expenseSubject ?? '');
    setCell(3, it.expenseNature ?? ''); // 默认由 AM.2 按部门带出，可人工修改（二级/三级部门维护费用属性映射，一级不维护）
    entityNames.forEach((name, i) => setCell(baseHeaders.length + i, it.entityRatios?.[name] ?? null, true));
    setCell(baseHeaders.length + entityNames.length, 1, true); // 合计=100%
  });
  return {
    name: 'BAA.8 经营费用转换比例表',
    index: 'ba9_expense_conversion_ratio',
    status: 1,
    order: 0,
    row: Math.max(items.length + 5, 10),
    column: headers.length,
    defaultRowHeight: 28,
    defaultColWidth: 110,
    celldata,
    config: { columnlen: { 0: 140, 1: 110, 2: 140, 3: 100 } }
  };
}


/**
 * BAA.10 进销存按法人拆分比例（参照 BAA.9.a 资产转换比例做法）：
 * 维度列=预算项目、预算部门（预算部门默认明细到二级部门）；度量列=各法人公司占比 + 合计。
 * 比例按「预算项目×预算部门」逐行维护，每行加和须=100%（仅文字说明提示，不强制校验/高亮）；
 * 定位：本年度不启用——BB.3.X 进销存预算已改为法人级单表（法人公司×存货类别，一表到底），各品类转入/转出逐来源
 * 按法人取数、不乘比例，本表不再参与 BB.3.X 拆分；仅作「无来源品类」的兜底比例保留（参照 BAA.7 的处理方式），
 * 后续年度启用该规则时再由本表统一提供兜底比例口径。表样与字段登记保留不变。
 * 本表无时间列，故表头为单行制（Row0 = 2 个维度列 + 各法人公司占比 + 合计）。
 * 示例行按「预算项目×预算部门」铺开多行：项目取自 AA.6 预算项目主数据示例值（集团统筹/P1/P2/P3/S1/产能项目），
 * 部门取 AA.5 二级部门（制造车间/研发部/销售大区/采购部）；各行法人集中度按业务合理性区分（主导法人分别落在
 * 整机制造基地、核心高精度制造、研发中心、国内销售主体、零部件子公司），每行各法人占比加和=100%。
 */
export function buildInventoryEntityRatioSheet(
  items: any[] = [],
  entityNames: string[] = LEGAL_ENTITIES.map((e) => e.name)
): any {
  const celldata: any[] = [];
  // 维度列：预算项目、预算部门（预算部门默认二级部门）；度量列：各法人公司占比 + 合计
  const baseHeaders = ['预算项目', '预算部门'];
  const headers = [...baseHeaders, ...entityNames, '合计'];
  headers.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  });
  // 示例行：按「预算项目×预算部门」铺开 6 行，各法人占比按业务合理性区分集中度（比例以 AA.2 法人编码书写、运行时映射为法人名称）
  const entityNameByCode = new Map(LEGAL_ENTITIES.map((e) => [e.code, e.name]));
  const ratiosByCode = (spec: Record<string, number>) =>
    Object.fromEntries(Object.entries(spec).map(([code, ratio]) => [entityNameByCode.get(code) ?? code, ratio]));
  const defaultItems = items.length > 0 ? items : [
    // 整机总装与联调：以草莓慕斯公司（智能装备整机制造基地）为主要生产主体，其余子公司分摊余量
    { project: '集团统筹', department: '整机总装与调试车间', entityRatios: ratiosByCode({ A: 0.55, B: 0.15, BA: 0.08, BB: 0.07, BC: 0.05, BD: 0.05, D: 0.05 }) },
    // 高精度机械加工：以蓝莓蛋挞公司（核心高精度装备制造）为主
    { project: 'P1 高功率平板光纤激光切割机', department: '高精度机械加工作业车间', entityRatios: ratiosByCode({ B: 0.45, A: 0.2, BB: 0.12, BA: 0.1, BC: 0.05, D: 0.04, BD: 0.04 }) },
    // 激光核心部件装配：草莓慕斯/蓝莓蛋挞双主体分摊
    { project: 'P2 三维五轴激光切管机', department: '激光核心部件装配车间', entityRatios: ratiosByCode({ A: 0.4, B: 0.3, BA: 0.1, BB: 0.08, BC: 0.06, BD: 0.04, D: 0.02 }) },
    // 前沿技术预研：以芒果班戟公司（前沿软件与算法研发中心）为主
    { project: 'P3 超快激光与复合加工预研', department: '前沿技术预研部', entityRatios: ratiosByCode({ C: 0.7, DC: 0.12, BD: 0.06, A: 0.05, D: 0.04, B: 0.03 }) },
    // 平板机区域销售：以西瓜泡芙公司（国内综合销售与客户服务）为主
    { project: 'S1 平板激光切割机', department: '华东销售大区', entityRatios: ratiosByCode({ D: 0.6, A: 0.15, B: 0.1, DA: 0.06, DB: 0.05, BC: 0.04 }) },
    // 产能扩建物料采购：以抹茶曲奇/樱桃华夫两家零部件子公司为主要供应主体
    { project: '产能项目', department: '激光器件采购部', entityRatios: ratiosByCode({ BA: 0.35, BB: 0.25, A: 0.15, B: 0.12, C: 0.08, BD: 0.05 }) },
  ];
  defaultItems.forEach((it, idx) => {
    const r = idx + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    // 比例/合计列按「2 位小数百分比」呈现：v 存小数原值、m 存百分比文本（单元格格式 0.00%），调研页与表格一致
    const setCell = (c: number, val: any, isRatio = false) => {
      const isNum = isRatio && typeof val === 'number';
      const text = isNum ? `${(val * 100).toFixed(2)}%` : String(val ?? '');
      celldata.push({ r, c, v: { v: val, m: text, ct: { fa: isNum ? '0.00%' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 } });
    };
    setCell(0, it.project ?? '');
    setCell(1, it.department ?? '');
    // 未参与该行拆分的法人显式填 0（保证 12 列逐列可见、逐行加和恒为 100%）
    entityNames.forEach((name, i) => setCell(baseHeaders.length + i, it.entityRatios?.[name] ?? 0, true));
    // 合计=各法人公司占比自动加总（示例行恒=100%，2 位小数）
    const entityRatioSum = entityNames.reduce((sum, name) => sum + (it.entityRatios?.[name] ?? 0), 0);
    setCell(baseHeaders.length + entityNames.length, Math.round(entityRatioSum * 100) / 100, true);
  });
  return {
    name: 'BAA.10 进销存按法人拆分比例',
    index: 'ba12_inventory_entity_ratio',
    status: 1,
    order: 0,
    row: Math.max(defaultItems.length + 5, 10),
    column: headers.length,
    defaultRowHeight: 28,
    defaultColWidth: 110,
    celldata,
    config: { columnlen: { 0: 180, 1: 150, [baseHeaders.length + entityNames.length]: 80 } }
  };
}


export function buildAssetConversionRatioSheet(
  items: any[] = [],
  entityNames: string[] = LEGAL_ENTITIES.map((e) => e.name)
): any {
  const celldata: any[] = [];
  // 维度列：预算项目、预算部门（预算部门默认二级部门）；度量列：各法人公司占比 + 合计
  const baseHeaders = ['预算项目', '预算部门'];
  const headers = [...baseHeaders, ...entityNames, '合计'];
  headers.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  });
  const defaultItems = items.length > 0 ? items : [
    { project: 'P1 高功率平板光纤激光切割机', department: '激光器件采购部', entityRatios: Object.fromEntries(entityNames.map((n, i) => [n, i === 0 ? 1 : 0])) },
    { project: 'P3 研发能力提升', department: '测试与验证实验室', entityRatios: Object.fromEntries(entityNames.map((n, i) => [n, i === 0 ? 1 : 0])) },
    { project: '集团统筹', department: '机械与电气采购部', entityRatios: Object.fromEntries(entityNames.map((n, i) => [n, i === 0 ? 1 : 0])) },
  ];
  defaultItems.forEach((it, idx) => {
    const r = idx + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false) => {
      celldata.push({ r, c, v: { v: val, m: String(val ?? ''), ct: { fa: isNum ? '0.00%' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 } });
    };
    setCell(0, it.project ?? '');
    setCell(1, it.department ?? '');
    entityNames.forEach((name, i) => setCell(2 + i, it.entityRatios?.[name] ?? null, true));
    setCell(2 + entityNames.length, 1, true); // 合计=100%
  });
  return {
    name: 'BAA.9.a 资产转换比例',
    index: 'ba10_asset_conversion_ratio',
    status: 1,
    order: 0,
    row: Math.max(defaultItems.length + 5, 10),
    column: headers.length,
    defaultRowHeight: 28,
    defaultColWidth: 110,
    celldata,
    config: { columnlen: { 0: 180, 1: 150, [2 + entityNames.length]: 80 } }
  };
}


export function buildDepreciationSplitRatioSheet(
  items: any[] = []
): any {
  const celldata: any[] = [];
  const baseHeaders = ['资产类别'];
  const ratioHeaders = ['销售费用比例', '管理费用比例', '研发费用比例', '制造费用比例'];
  const headers = [...baseHeaders, ...ratioHeaders, '合计(必须=100%)'];
  
  headers.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  });

  const displayItems = items && items.length > 0 ? items : [
    { parentCategory: '固定资产', categoryName: '生产机器设备', sales: 0.0, admin: 0.05, rnd: 0.05, mfg: 0.90 },
    { parentCategory: '固定资产', categoryName: '研发实验仪器', sales: 0.0, admin: 0.0, rnd: 0.95, mfg: 0.05 },
    { parentCategory: '固定资产', categoryName: '电子与办公设备', sales: 0.20, admin: 0.60, rnd: 0.15, mfg: 0.05 },
    { parentCategory: '固定资产', categoryName: '运输工具', sales: 0.30, admin: 0.50, rnd: 0.0, mfg: 0.20 },
    { parentCategory: '固定资产', categoryName: '房屋及建筑物', sales: 0.10, admin: 0.30, rnd: 0.10, mfg: 0.50 },
    { parentCategory: '固定资产', categoryName: '动力及辅助设施', sales: 0.0, admin: 0.05, rnd: 0.0, mfg: 0.95 },
    { parentCategory: '固定资产', categoryName: '工具器具及模具', sales: 0.0, admin: 0.0, rnd: 0.05, mfg: 0.95 },
    { parentCategory: '无形资产', categoryName: '软件著作权/工业软件', sales: 0.05, admin: 0.25, rnd: 0.60, mfg: 0.10 },
    { parentCategory: '无形资产', categoryName: '专利权', sales: 0.0, admin: 0.10, rnd: 0.85, mfg: 0.05 },
    { parentCategory: '无形资产', categoryName: '非专利技术', sales: 0.0, admin: 0.0, rnd: 0.90, mfg: 0.10 },
    { parentCategory: '无形资产', categoryName: '土地使用权', sales: 0.05, admin: 0.65, rnd: 0.0, mfg: 0.30 },
    { parentCategory: '无形资产', categoryName: '商标权', sales: 0.80, admin: 0.20, rnd: 0.0, mfg: 0.0 }
  ];

  displayItems.forEach((it, idx) => {
    const r = idx + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false) => {
      const formatted = isNum && typeof val === 'number' ? `${(val * 100).toFixed(2)}%` : String(val ?? '');
      celldata.push({ r, c, v: { v: val, m: formatted, ct: { fa: isNum ? '0.00%' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 } });
    };
    // 资产类别单列：层级写法「大类-小类」，取值域 AA.9 资产类别与折旧
    setCell(0, `${it.parentCategory ?? ''}-${it.categoryName ?? ''}`, false);
    setCell(1, it.sales ?? it.salesExpenseRatio ?? 0, true);
    setCell(2, it.admin ?? it.adminExpenseRatio ?? 0, true);
    setCell(3, it.rnd ?? it.rndExpenseRatio ?? 0, true);
    setCell(4, it.mfg ?? it.mfgExpenseRatio ?? 0, true);
    
    // 合计列公式 = SUM(C{r+1}:F{r+1})
    const er = r + 1;
    celldata.push({
      r, c: 5,
      v: {
        v: 1.0,
        m: '100.00%',
        ct: { fa: '0.00%', t: 'n' },
        bg: rowBg,
        ht: 2,
        vt: 1,
        f: `=SUM(B${er}:E${er})`
      }
    });
  });

  return {
    name: 'BAA.9.b 折旧费用拆分比例',
    index: 'ba11_depreciation_split_ratio',
    status: 1,
    order: 0,
    row: Math.max(displayItems.length + 5, 10),
    column: headers.length,
    defaultRowHeight: 28,
    defaultColWidth: 120,
    celldata,
    config: { columnlen: { 0: 200, 1: 110, 2: 110, 3: 110, 4: 110, 5: 130 } }
  };
}


export function buildExpenseConversionResultSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  // 维度含「预算科目」列——按部门费用性质带出对应会计科目：
  // 研发费用→6603 / 管理费用→6602 / 销售费用→6601 / 制造费用→5001。
  const baseHeaders = ['法人公司', '项目', '部门', '部门费用性质', '预算科目'];
  const N_BASE = baseHeaders.length; // 5 (c0~c4)
  const COL_SUM = N_BASE;             // 5
  const METRICS = ['研发费用', '管理费用', '销售费用', '制造费用'];
  const N_METRICS = METRICS.length;  // 4
  const moStart = (m: number) => COL_SUM + N_METRICS + (m - 1) * N_METRICS; // 1月=c8 ... 12月=c52
  const TOTAL_COLS = moStart(13); // 56

  // ── Row 0/1: 维度列（两行制，rs:2）──
  baseHeaders.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });

  // ── 全年合计大表头（cs:4）──
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: N_METRICS };
  METRICS.forEach((h, i) => {
    celldata.push({ r: 1, c: COL_SUM + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumSubHeader } });
  });

  // ── 1~12月大表头（每月cs:4）──
  for (let m = 1; m <= 12; m++) {
    const colStart = moStart(m);
    const label = `${m}月`;
    celldata.push({ r: 0, c: colStart, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${colStart}`] = { r: 0, c: colStart, rs: 1, cs: N_METRICS };
    METRICS.forEach((h, i) => {
      celldata.push({ r: 1, c: colStart + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader } });
    });
  }

  // 样例数据行
  const displayItems = items.length > 0 ? items : [
    {
      entity: '甜甜圈集团公司', project: '算法平台升级研发项目', department: '产品研发部', deptExpenseNature: '研发费用',
      months: {
        m1: { rnd: 80, admin: 0, sales: 0, mfg: 0 },
        m2: { rnd: 80, admin: 0, sales: 0, mfg: 0 },
        m3: { rnd: 85, admin: 0, sales: 0, mfg: 0 },
        m4: { rnd: 85, admin: 0, sales: 0, mfg: 0 },
        m5: { rnd: 85, admin: 0, sales: 0, mfg: 0 },
        m6: { rnd: 90, admin: 0, sales: 0, mfg: 0 },
        m7: { rnd: 90, admin: 0, sales: 0, mfg: 0 },
        m8: { rnd: 90, admin: 0, sales: 0, mfg: 0 },
        m9: { rnd: 95, admin: 0, sales: 0, mfg: 0 },
        m10: { rnd: 95, admin: 0, sales: 0, mfg: 0 },
        m11: { rnd: 95, admin: 0, sales: 0, mfg: 0 },
        m12: { rnd: 100, admin: 0, sales: 0, mfg: 0 },
      }
    },
    {
      entity: '甜甜圈集团公司', project: '华东区域销售推广', department: '销售部', deptExpenseNature: '销售费用',
      months: {
        m1: { rnd: 0, admin: 0, sales: 45, mfg: 0 },
        m2: { rnd: 0, admin: 0, sales: 45, mfg: 0 },
        m3: { rnd: 0, admin: 0, sales: 45, mfg: 0 },
        m4: { rnd: 0, admin: 0, sales: 48, mfg: 0 },
        m5: { rnd: 0, admin: 0, sales: 48, mfg: 0 },
        m6: { rnd: 0, admin: 0, sales: 48, mfg: 0 },
        m7: { rnd: 0, admin: 0, sales: 50, mfg: 0 },
        m8: { rnd: 0, admin: 0, sales: 50, mfg: 0 },
        m9: { rnd: 0, admin: 0, sales: 50, mfg: 0 },
        m10: { rnd: 0, admin: 0, sales: 52, mfg: 0 },
        m11: { rnd: 0, admin: 0, sales: 52, mfg: 0 },
        m12: { rnd: 0, admin: 0, sales: 55, mfg: 0 },
      }
    },
    {
      entity: '甜甜圈集团公司', project: '集团职能日常运营', department: '财务部', deptExpenseNature: '管理费用',
      months: {
        m1: { rnd: 0, admin: 30, sales: 0, mfg: 0 },
        m2: { rnd: 0, admin: 30, sales: 0, mfg: 0 },
        m3: { rnd: 0, admin: 30, sales: 0, mfg: 0 },
        m4: { rnd: 0, admin: 30, sales: 0, mfg: 0 },
        m5: { rnd: 0, admin: 30, sales: 0, mfg: 0 },
        m6: { rnd: 0, admin: 30, sales: 0, mfg: 0 },
        m7: { rnd: 0, admin: 32, sales: 0, mfg: 0 },
        m8: { rnd: 0, admin: 32, sales: 0, mfg: 0 },
        m9: { rnd: 0, admin: 32, sales: 0, mfg: 0 },
        m10: { rnd: 0, admin: 32, sales: 0, mfg: 0 },
        m11: { rnd: 0, admin: 32, sales: 0, mfg: 0 },
        m12: { rnd: 0, admin: 35, sales: 0, mfg: 0 },
      }
    },
    {
      entity: '甜甜圈集团公司', project: '烘焙产线精益化制造', department: '甜品制造部', deptExpenseNature: '制造费用',
      months: {
        m1: { rnd: 0, admin: 0, sales: 0, mfg: 35 },
        m2: { rnd: 0, admin: 0, sales: 0, mfg: 35 },
        m3: { rnd: 0, admin: 0, sales: 0, mfg: 38 },
        m4: { rnd: 0, admin: 0, sales: 0, mfg: 38 },
        m5: { rnd: 0, admin: 0, sales: 0, mfg: 40 },
        m6: { rnd: 0, admin: 0, sales: 0, mfg: 40 },
        m7: { rnd: 0, admin: 0, sales: 0, mfg: 42 },
        m8: { rnd: 0, admin: 0, sales: 0, mfg: 42 },
        m9: { rnd: 0, admin: 0, sales: 0, mfg: 42 },
        m10: { rnd: 0, admin: 0, sales: 0, mfg: 45 },
        m11: { rnd: 0, admin: 0, sales: 0, mfg: 45 },
        m12: { rnd: 0, admin: 0, sales: 0, mfg: 48 },
      }
    }
  ];

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  displayItems.forEach((it: any, idx: number) => {
    const r = idx + 2;
    const excelRow = r + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, f?: string) => {
      const cell: any = { v: val, m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''), ct: { fa: isNum ? '#,##0.00' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };
    setCell(0, it.entity ?? '');
    setCell(1, it.project ?? '');
    setCell(2, it.department ?? '');
    setCell(3, it.deptExpenseNature ?? '');
    // 预算科目列示例值按费用性质带出
    const subjectByExample: Record<string, string> = {
      '研发费用': '6603 研发费用', '管理费用': '6602 管理费用',
      '销售费用': '6601 销售费用', '制造费用': '5001 生产成本-制造费用',
    };
    setCell(4, subjectByExample[it.deptExpenseNature ?? ''] ?? '');

    // 1~12月各月4项度量 (研发/管理/销售/制造)
    for (let m = 1; m <= 12; m++) {
      const mo = it.months?.[`m${m}`] || {};
      const start = moStart(m);
      setCell(start, mo.rnd ?? 0, true);
      setCell(start + 1, mo.admin ?? 0, true);
      setCell(start + 2, mo.sales ?? 0, true);
      setCell(start + 3, mo.mfg ?? 0, true);
    }

    // 全年合计（4个度量子列分别 SUM 1~12月对应列）
    for (let i = 0; i < N_METRICS; i++) {
      const monthCells = Array.from({ length: 12 }, (_, m) => `${colLetter(moStart(m + 1) + i)}${excelRow}`);
      setCell(COL_SUM + i, 0, true, `=${monthCells.join('+')}`);
    }
  });

  const columnlen: Record<number, number> = { 0: 130, 1: 160, 2: 110, 3: 110, 4: 150 };
  for (let c = COL_SUM; c < TOTAL_COLS; c++) columnlen[c] = 85;

  return {
    name: 'BB.5.2 经营费用转换结果表',
    index: 'bb52_expense_conversion_result',
    status: 1,
    order: 0,
    row: Math.max(displayItems.length + 5, 10),
    column: TOTAL_COLS,
    celldata,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}


/**
 * BB.4.2.a 外部职场租赁（登记层；一行一笔对集团外第三方的职场租赁合同）
 * 表样列 27 = 维度 14（序号 / 场所 / 出租方(外部第三方) / 承租方(法人) / 预算项目 / 预算部门 /
 *                      租赁期起始月 / 租赁期终止月 / 租赁期限(月) / 租赁期限 / 租赁面积(㎡) /
 *                      单价(元/㎡·月) / 租赁类型 / 折现率(%)）
 *             + 度量 1×13 = 13（月租金(万元)：【全年合计】+1~12 月，每组 1 子列）。
 * 口径（与 BB.4.2.b 内部职场租赁分开）：
 *   ① 出租方为集团外第三方（手工填写名称）；无加成款、无内部往来、不参与集团合并抵销；
 *   ② 月租金 = 单价(元/㎡·月) × 租赁面积(㎡) ÷ 10000 × 当月在租期内(1/0)（算法同 BB.4.2.b 内部租金）；
 *      租赁面积与合同单价均按对外租赁合同在本表直接手工录入，不引用 BAA.6.b 年度租赁面积维护
 *      （该表仅供内部职场租赁 BB.4.2.b；外部租赁不做场所面积按法人分摊）；
 *   ③ 租赁期限(月) = 租赁期终止月 − 租赁期起始月 + 1（系统带出、不可手工录入），并在其后展示
 *      「租赁期限」档位列（引用 AB.16 租赁期限字典，系统按该月数落到档位、不可手工选）——
 *      两列同源、都用于展示整体租期并作为资本化判定依据（> 12 个月→资本化、≤ 12 个月→费用化）；
 *   ④ 租赁类型（系统带出、不可手工录入/选择）由「租赁期限」派生（AB.16 档位）：一年以内→费用化(一年以内)、
 *      一年以上→资本化(大于一年)；资本化判定的唯一来源＝整体租期（租赁期开始日起的不可撤销期间），
 *      不看剩余租期、不加金额门槛、开始日判定后不因剩余租期变短而重分类；同一场所不同合同各自判断；
 *      结果口径：一年以上→资本化（形成使用权资产 1621 与租赁负债 2602，由 BB.4.2.a.1 按月测算折旧与利息）；
 *      一年以下（含 12 个月）→费用化（月租金直接进当期费用，不形成使用权资产、不确认租赁负债）；
 *   ⑤ 折现率默认取 BAA.6.e 租赁折现率维护（默认取 BF.3 综合融资成本、可按年度覆盖）；
 *   ⑥ 场所（示例与取值域）：本表只用 BAA.6.a 中「出租方类型=外部租入」的场所——「场所」列下拉取值域
 *      ＝BAA.6.a 中出租方类型=外部租入的场所集合（史塔克大厦 / 瓦坎达科技园）；内部持有场所
 *      （花果山园区）只走 BB.4.2.b 内部职场租赁，不出现在本表示例与取值域中。
 */
export function buildExternalOfficeLeaseSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const dimHeaders = [
    '序号', '场所', '出租方(外部第三方)', '承租方(法人)', '预算项目', '预算部门',
    '租赁期起始月', '租赁期终止月', '租赁期限(月)', '租赁期限',
    '租赁面积(㎡)', '单价(元/㎡·月)', '租赁类型', '折现率(%)'
  ];
  const DIM_COLS = dimHeaders.length;                        // 14
  const C_SEQ = 0, C_LOCATION = 1, C_LESSOR = 2, C_LESSEE = 3, C_PROJECT = 4, C_DEPT = 5;
  const C_START = 6, C_END = 7, C_TERM_MONTHS = 8, C_TERM = 9;
  const C_AREA = 10, C_UNIT_PRICE = 11, C_TYPE = 12, C_RATE = 13;

  const N_SUB = 1;
  const subMetrics = ['月租金(万元)'];
  const COL_SUM = DIM_COLS;                                  // 【全年合计】起始列 = col 14
  const moBase = (mo: number) => COL_SUM + N_SUB + mo * N_SUB; // 1月=c15 … 12月=c26
  const TOTAL_COLS = moBase(12);                             // 27

  const sumBg = '#001e4a';
  const subHdrBg = '#001e4a';
  const hdrBg = '#002f6c';
  const hdrFc = '#ffffff';

  // Row 0 / Row 1：维度列（rs:2）+ 时间分组大表头（【全年合计】cs=1、1~12 月各 cs=1）
  dimHeaders.forEach((h, ci) => {
    celldata.push({ r: 0, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc } });
    celldata.push({ r: 1, c: ci, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: hdrBg, fc: hdrFc } });
    merge[`0_${ci}`] = { r: 0, c: ci, rs: 2, cs: 1 };
  });
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader, bg: sumBg, fc: hdrFc } });
  celldata.push({ r: 1, c: COL_SUM, v: { v: subMetrics[0], m: subMetrics[0], ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumSubHeader, bg: sumBg, fc: hdrFc } });
  for (let mo = 0; mo < 12; mo++) {
    celldata.push({ r: 0, c: moBase(mo), v: { v: `${mo + 1}月`, m: `${mo + 1}月`, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bg: subHdrBg, fc: hdrFc } });
    celldata.push({ r: 1, c: moBase(mo), v: { v: subMetrics[0], m: subMetrics[0], ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader, bg: subHdrBg, fc: hdrFc } });
  }

  const BUDGET_YEAR = '2027';
  const monthKeys = Array.from({ length: 12 }, (_v, mo) => `${BUDGET_YEAR}-${String(mo + 1).padStart(2, '0')}`);
  const inLeaseMonth = (mKey: string, start: string, end: string) => (mKey >= start && mKey <= end ? 1 : 0);
  const round1 = (x: number) => Math.round(x * 10) / 10;

  // 租赁期限(月) = 租赁期终止月 − 租赁期起始月 + 1（派生列、系统带出、不可手工录入）；
  // 「租赁期限」档位按该月数落 AB.16 租赁期限字典（与 BB.4.2.b 内部职场租赁共用同一字典）。
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

  // 示例数据：出租方均为集团外第三方；场所一律取 BAA.6.a 中「出租方类型=外部租入」的场所（史塔克大厦）——
  //   内部持有场所（花果山园区）只走 BB.4.2.b 内部职场租赁，外部示例不出现；
  //   行 1/2 整体租期 > 12 个月 → 资本化（进 BB.4.2.a.1）；
  //   行 3 整体租期 6 个月（2027-07~2027-12）→ 费用化（不进 BB.4.2.a.1，月租金按用途直接进损益）。
  //   示例行只给租期起止与单价、面积，不给「租赁类型」——该列由租期派生（系统带出），与「租赁期限」自洽。
  const displayItems = items.length > 0 ? items : [
    {
      location: '史塔克大厦', lessorName: '神盾局物业管理有限公司', lesseeEntity: '草莓慕斯公司',
      budgetProject: 'P1 高功率平板光纤激光切割机', budgetDepartment: '制造交付中心本部',
      leaseStartMonth: '2027-01', leaseEndMonth: '2029-12', leaseArea: 4000, unitPrice: 115,
      discountRatePct: 4.5
    },
    {
      location: '史塔克大厦', lessorName: '瓦坎达置业集团', lesseeEntity: '蓝莓蛋挞公司',
      budgetProject: 'P2 三维五轴激光切管机', budgetDepartment: '研发中心本部',
      leaseStartMonth: '2027-03', leaseEndMonth: '2028-06', leaseArea: 1200, unitPrice: 165,
      discountRatePct: 4.5
    },
    {
      location: '史塔克大厦', lessorName: '瓦坎达置业集团', lesseeEntity: '芒果班戟公司',
      budgetProject: 'P3 超快激光与复合加工预研', budgetDepartment: '软件与云平台部',
      leaseStartMonth: '2027-07', leaseEndMonth: '2027-12', leaseArea: 300, unitPrice: 95,
      discountRatePct: 4.5
    }
  ];

  displayItems.forEach((it: any, idx: number) => {
    const r = idx + 2;
    const excelRow = r + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    // 数值显示口径：百分比 2 位小数、金额（¥）1 位小数（万元精度 0.1）、单价 2 位小数、面积等整数
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
    const startKey = String(it.leaseStartMonth ?? '');
    const endKey = String(it.leaseEndMonth ?? '');
    const inLease = monthKeys.map((mk) => inLeaseMonth(mk, startKey, endKey));

    setCell(C_SEQ, idx + 1, true, '0');
    setCell(C_LOCATION, it.location ?? '');
    setCell(C_LESSOR, it.lessorName ?? '');
    setCell(C_LESSEE, it.lesseeEntity ?? '');
    setCell(C_PROJECT, it.budgetProject ?? '');
    setCell(C_DEPT, it.budgetDepartment ?? '');
    setCell(C_START, startKey);
    setCell(C_END, endKey);
    setCell(C_TERM_MONTHS, termMonths(startKey, endKey), true, '0');
    setCell(C_TERM, termTier(termMonths(startKey, endKey)));
    setCell(C_AREA, area, true, '#,##0');
    setCell(C_UNIT_PRICE, unitPrice, true, '#,##0.00');
    setCell(C_TYPE, leaseTypeByTerm(termMonths(startKey, endKey)));
    setCell(C_RATE, Number(it.discountRatePct ?? 0), true, '0.00%');

    // 月租金 = 单价 × 租赁面积 ÷ 10000 × 当月在租期内(1/0)
    const rentVals = inLease.map((f) => round1((unitPrice * area / 10000) * f));
    monthKeys.forEach((_mk, mo) => {
      const base = moBase(mo);
      setCell(base, rentVals[mo], true, '¥#,##0.00',
        `=${colLetter(C_UNIT_PRICE)}${excelRow}*${colLetter(C_AREA)}${excelRow}/10000*${inLease[mo]}`);
    });
    // 【全年合计】= SUM(1~12月)
    const sumRefs = monthKeys.map((_mk, mo) => `${colLetter(moBase(mo))}${excelRow}`).join(',');
    setCell(COL_SUM, round1(rentVals.reduce((a, b) => a + b, 0)), true, '¥#,##0.00', `=SUM(${sumRefs})`, '#f0f4ff');
  });

  const maxRows = Math.max(displayItems.length + 12, 22);
  const dataVerification: Record<string, any> = {};
  const yearMonthOptions = ['2027', '2028', '2029']
    .flatMap((y) => Array.from({ length: 12 }, (_v, mo) => `${y}-${String(mo + 1).padStart(2, '0')}`))
    .join(',');
  // 「场所」下拉取值域＝BAA.6.a 中「出租方类型=外部租入」的场所（外部职场租赁只用外部租入场所；
  //   内部持有场所 花果山园区 只走 BB.4.2.b 内部职场租赁，不在本表取值域内）
  const dropdownCols = [
    { col: C_LOCATION, val: '史塔克大厦,瓦坎达科技园' },
    { col: C_LESSEE, val: SIGNING_ENTITIES.join(',') },
    { col: C_PROJECT, val: BUDGET_PROJECT_MASTER_DATA.map((p: any) => p.name).filter(Boolean).join(',') },
    { col: C_DEPT, val: ADMIN_LEVEL2_DEPARTMENT_OPTIONS },
    { col: C_START, val: yearMonthOptions },
    { col: C_END, val: yearMonthOptions },
    { col: C_TYPE, val: '租赁期限带出' }
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
    0: 60, 1: 120, 2: 200, 3: 130, 4: 160, 5: 140, 6: 100, 7: 100, 8: 100, 9: 120,
    10: 100, 11: 140, 12: 130, 13: 90
  };
  for (let c = COL_SUM; c < TOTAL_COLS; c++) columnlen[c] = 100;

  return {
    name: 'BB.4.2.a 外部职场租赁',
    index: 118,
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
 * BB.4.2.a.1 外部职场租赁·财务视角（BB.4.2.a 表单同组子表；仅资本化合同一行）
 * 与 BB.4.2.b.1 内部职场租赁·财务视角同体例，差异只在：出租方为集团外第三方、无加成款/无内部往来、
 * 不参与集团合并抵销（内部租赁那条仍由 BB.4.2.b / BB.4.2.b.1 承担）。
 * 本表已收窄为「租赁负债与现金流测算」：不再计提使用权资产折旧（折旧统一改由 BB.4.5 增量资产折旧计算表计提、经 BB.4.X.A 归集）。
 * 表样列 50 = 维度 8（预算项目 / 法人公司(承租方) / 预算部门 / 场所 / 租赁期起始月 / 租赁期终止月 /
 *                    剩余租赁月数 / 折现率(%)）
 *           + 度量 3×13 = 39（【全年合计】+1~12 月，每组 3 子列：租赁付款额(不含税) / 月度利息 /
 *                            月度本金偿付）
 *           + 卡片列 3（年度租赁付款额(不含税)(万元) / 租赁负债初始(万元) / 使用权资产原值(万元)）。
 * 口径（与 BB.4.2.b.1 同算法）：
 *   ① 折现率默认取 BAA.6.e 租赁折现率维护（默认取 BF.3 综合融资成本、可覆盖）；
 *   ② 租赁负债初始 = 租赁付款额按折现率折现（月折现率 = 年折现率÷12，按剩余租赁月数折现）；
 *   ③ 使用权资产原值 = 租赁负债初始（使用权资产 1621 / 租赁负债 2602 同额初始确认）；
 *   ④ 使用权资产原值 = 租赁负债初始，作为 BB.4.5 增量资产折旧计算表的输入（剩余年限(月数)=租赁期月数，在 BB.4.5 按剩余年限(月数)表达）；折旧在 BB.4.5 计提（与其它新增资产同链路）、经 BB.4.X.A 归集，本表不再计提折旧；
 *   ⑤ 各月利息 = 期初租赁负债 × 年折现率 ÷ 12（随本金偿付递减）；本金偿付 = 当月租赁付款额 − 当月利息费用；
 *      利息进 6604.1 其中：利息费用、利息付现走 CF-21；本金偿付走 CF-22.1；
 *   ⑥ 折旧不再由本表计提：本表只输出负债与现金流（租赁付款额/利息/本金偿付），使用权资产原值连同剩余租赁月数（＝剩余年限(月数)）进 BB.4.5。
 */
export function buildExternalLeaseCapitalizationSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const dimHeaders = [
    '预算项目', '法人公司(承租方)', '预算部门', '场所', '租赁期起始月', '租赁期终止月', '剩余租赁月数', '折现率(%)'
  ];
  const DIM_COLS = dimHeaders.length;                        // 8
  const C_PROJECT = 0, C_LESSEE = 1, C_DEPT = 2, C_LOCATION = 3;
  const C_START = 4, C_END = 5, C_REMAIN_MONTHS = 6, C_DISCOUNT_RATE = 7;

  const N_SUB = 3;
  const subMetrics = ['租赁付款额(不含税)', '月度利息', '月度本金偿付'];
  const COL_SUM = DIM_COLS;                                  // 【全年合计】起始列 = col 8
  const moBase = (mo: number) => COL_SUM + N_SUB + mo * N_SUB; // 1月=c12 … 12月=c56
  const COL_CARD = moBase(11) + N_SUB;                        // 卡片列起始列 = col 60
  const cardHeaders = [
    '年度租赁付款额(不含税)(万元)', '租赁负债初始(万元)', '使用权资产原值(万元)'
  ];
  const TOTAL_COLS = COL_CARD + cardHeaders.length;           // 50
  const C_ANNUAL_PAYMENT = COL_CARD + 0, C_LIABILITY_INIT = COL_CARD + 1;
  const C_ROU_ORIGINAL = COL_CARD + 2;

  const sumBg = '#001e4a';
  const subHdrBg = '#001e4a';
  const hdrBg = '#002f6c';
  const hdrFc = '#ffffff';

  // Row 0 / Row 1：维度列 + 时间分组大表头（【全年合计】cs=4、1~12 月各 cs=4）+ 卡片列
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

  // 示例数据：与 BB.4.2.a 的两张资本化合同一一对应（场所同为 BAA.6.a 中出租方类型=外部租入的史塔克大厦；
  //   示例只改场所文本、卡片数值不重算——示例不校验）；
  //   租赁付款自租赁期起始月起按月等额支付（月付款额 = 年度租赁付款额 ÷ 年内租赁月数）。
  const displayItems = items.length > 0 ? items : [
    {
      budgetProject: 'P1 高功率平板光纤激光切割机', lesseeEntity: '草莓慕斯公司', budgetDepartment: '制造交付中心本部',
      location: '史塔克大厦', leaseStartMonth: '2027-01', leaseEndMonth: '2029-12',
      remainingMonths: 36, annualLeasePayment: 552, discountRatePct: 4.5
    },
    {
      budgetProject: 'P2 三维五轴激光切管机', lesseeEntity: '蓝莓蛋挞公司', budgetDepartment: '研发中心本部',
      location: '史塔克大厦', leaseStartMonth: '2027-03', leaseEndMonth: '2028-06',
      remainingMonths: 16, annualLeasePayment: 198, discountRatePct: 4.5
    }
  ];

  displayItems.forEach((it: any, idx: number) => {
    const r = idx + 2;
    const excelRow = r + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
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
    setCell(C_LOCATION, it.location ?? '');
    setCell(C_START, String(it.leaseStartMonth ?? ''));
    setCell(C_END, String(it.leaseEndMonth ?? ''));
    setCell(C_REMAIN_MONTHS, remainingMonths, true, '0');
    setCell(C_DISCOUNT_RATE, discountRatePct, true, '0.00%');

    // 各月：付款额 + 利息（期初租赁负债×年折现率÷12）+ 本金偿付（月付款额−利息）
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
      if (inTerm) {
        setCell(base + 0, payVals[mo], true, '¥#,##0.00',
          `=${colLetter(C_ANNUAL_PAYMENT)}${excelRow}/${monthsInYear}`);
        // 利息费用 = 期初租赁负债 × 年折现率 ÷ 12；期初租赁负债 = 租赁负债初始 − 累计本金偿付
        const interestFormula = mo === 0
          ? `=${colLetter(C_LIABILITY_INIT)}${excelRow}*${colLetter(C_DISCOUNT_RATE)}${excelRow}/100/12`
          : `=(${colLetter(C_LIABILITY_INIT)}${excelRow}-SUM(${colLetter(moBase(0) + 2)}${excelRow}:${colLetter(moBase(mo - 1) + 2)}${excelRow}))`
            + `*${colLetter(C_DISCOUNT_RATE)}${excelRow}/100/12`;
        setCell(base + 1, interestVals[mo], true, '¥#,##0.00', interestFormula);
        // 本金偿付 = 当月租赁付款额 − 当月利息费用
        setCell(base + 2, principalVals[mo], true, '¥#,##0.00', `=${colLetter(base)}${excelRow}-${colLetter(base + 1)}${excelRow}`);
      } else {
        // 租赁期起始月之前：租赁负债尚未确认，付款额/利息/本金偿付均为 0
        setCell(base + 0, 0, true, '¥#,##0.00');
        setCell(base + 1, 0, true, '¥#,##0.00');
        setCell(base + 2, 0, true, '¥#,##0.00');
      }
    }

    // 【全年合计】= SUM(1~12月对应子列)
    const sumRefs = (offset: number) => Array.from({ length: 12 }, (_v, mo) => `${colLetter(moBase(mo) + offset)}${excelRow}`).join(',');
    setCell(COL_SUM + 0, round1(payVals.reduce((a, b) => a + b, 0)), true, '¥#,##0.00', `=SUM(${sumRefs(0)})`, '#f0f4ff');
    setCell(COL_SUM + 1, round1(interestVals.reduce((a, b) => a + b, 0)), true, '¥#,##0.00', `=SUM(${sumRefs(1)})`, '#f0f4ff');
    setCell(COL_SUM + 2, round1(principalVals.reduce((a, b) => a + b, 0)), true, '¥#,##0.00', `=SUM(${sumRefs(2)})`, '#f0f4ff');

    // 卡片列：年度租赁付款额 / 租赁负债初始 / 使用权资产原值（= 租赁负债初始，作 BB.4.5 增量折旧的输入；剩余租赁月数即剩余年限(月数)）
    setCell(C_ANNUAL_PAYMENT, annualPayment, true, '¥#,##0.00');
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
    // 场所取值域同 BB.4.2.a：只取 BAA.6.a 中「出租方类型=外部租入」的场所（史塔克大厦 / 瓦坎达科技园）
    { col: C_LOCATION, val: '史塔克大厦,瓦坎达科技园' },
    { col: C_START, val: yearMonthOptions },
    { col: C_END, val: yearMonthOptions }
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

  const columnlen: Record<number, number> = { 0: 160, 1: 130, 2: 140, 3: 120, 4: 100, 5: 100, 6: 95, 7: 90 };
  for (let c = COL_SUM; c < COL_CARD; c++) columnlen[c] = 100;
  cardHeaders.forEach((_h, i) => { columnlen[COL_CARD + i] = 130; });

  return {
    name: 'BB.4.2.a.1 外部职场租赁·财务视角',
    index: 119,
    status: 0,
    order: 5,
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


export function buildEmployeeExpenseImportSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const baseHeaders = ['法人公司', '预算项目', '预算部门', '预算科目'];
  const N_BASE = baseHeaders.length; // 4 (c0~c3)
  const COL_SUM = N_BASE;             // 4
  const METRICS = ['销售费用', '研发费用', '管理费用', '制造费用', '实际发放'];
  const N_METRICS = METRICS.length;  // 5
  const moStart = (m: number) => COL_SUM + N_METRICS + (m - 1) * N_METRICS; // 1月=c9 ... 12月=c64
  const TOTAL_COLS = moStart(13); // 4 + 5*13 = 69

  // ── Row 0/1: 维度列（两行制，rs:2）──
  baseHeaders.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });

  // ── 全年合计大表头（cs:6）──
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: N_METRICS };
  METRICS.forEach((h, i) => {
    celldata.push({ r: 1, c: COL_SUM + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumSubHeader } });
  });

  // ── 1~12月大表头（每月cs:6）──
  for (let m = 1; m <= 12; m++) {
    const colStart = moStart(m);
    const label = `${m}月`;
    celldata.push({ r: 0, c: colStart, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${colStart}`] = { r: 0, c: colStart, rs: 1, cs: N_METRICS };
    METRICS.forEach((h, i) => {
      celldata.push({ r: 1, c: colStart + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader } });
    });
  }

  // 样例数据行
  const displayItems = items.length > 0 ? items : [
    {
      entity: '甜甜圈集团公司', budgetProject: '年度人工费用预算', department: '多部门汇总',
      months: {
        m1: { sales: 45, rnd: 80, admin: 30, mfg: 60, pay: 215 },
        m2: { sales: 45, rnd: 80, admin: 30, mfg: 62, pay: 217 },
        m3: { sales: 45, rnd: 80, admin: 30, mfg: 65, pay: 220 },
        m4: { sales: 48, rnd: 85, admin: 30, mfg: 65, pay: 228 },
        m5: { sales: 48, rnd: 85, admin: 30, mfg: 68, pay: 231 },
        m6: { sales: 48, rnd: 85, admin: 30, mfg: 70, pay: 233 },
        m7: { sales: 50, rnd: 90, admin: 32, mfg: 72, pay: 244 },
        m8: { sales: 50, rnd: 90, admin: 32, mfg: 75, pay: 247 },
        m9: { sales: 50, rnd: 90, admin: 32, mfg: 75, pay: 247 },
        m10: { sales: 52, rnd: 95, admin: 32, mfg: 78, pay: 257 },
        m11: { sales: 52, rnd: 95, admin: 32, mfg: 80, pay: 259 },
        m12: { sales: 55, rnd: 100, admin: 35, mfg: 82, pay: 272 },
      }
    }
  ];

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  displayItems.forEach((it: any, idx: number) => {
    const r = idx + 2;
    const excelRow = r + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, f?: string) => {
      const cell: any = { v: val, m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''), ct: { fa: isNum ? '#,##0.00' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };
    setCell(0, it.entity ?? '');
    setCell(1, it.budgetProject ?? '');
    setCell(2, it.department ?? '');
    setCell(3, it.budgetSubject ?? '2211 应付职工薪酬');

    // 1~12月各月5项度量
    for (let m = 1; m <= 12; m++) {
      const mo = it.months?.[`m${m}`] || {};
      const start = moStart(m);
      setCell(start, mo.sales ?? 0, true);
      setCell(start + 1, mo.rnd ?? 0, true);
      setCell(start + 2, mo.admin ?? 0, true);
      setCell(start + 3, mo.mfg ?? mo.wip ?? 0, true);
      setCell(start + 4, mo.pay ?? 0, true);
    }

    // 全年合计（5个度量子列分别 SUM 1~12月对应列）
    for (let i = 0; i < N_METRICS; i++) {
      const monthCells = Array.from({ length: 12 }, (_, m) => `${colLetter(moStart(m + 1) + i)}${excelRow}`);
      setCell(COL_SUM + i, 0, true, `=${monthCells.join('+')}`);
    }
  });

  const columnlen: Record<number, number> = { 0: 130, 1: 120, 2: 100, 3: 130 };
  for (let c = COL_SUM; c < TOTAL_COLS; c++) columnlen[c] = 85;

  return {
    name: 'BB.5.1 雇员费用编制/导入',
    index: 'bb41_employee_expense_import',
    status: 1,
    order: 0,
    row: Math.max(displayItems.length + 5, 10),
    column: TOTAL_COLS,
    celldata,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}


/**
 * BB.5.1 财务视角：人事口径计提数 − 资本化人工（自制在建工程列） − 服务人工（服务人工成本列）→
 *   销售/研发/管理/制造四项费用 + 服务人工成本 + 自制在建工程 + 实际发放（7 项度量）。
 *
 * 「服务人工成本」列取数口径（与 BB.1.3.i 人工明细_财务查询关联）：
 *   ① 正常（签约主体自供）：BB.1.3.i 工时×BAA.3 工时标准成本，按法人×部门×月度汇总，
 *      从人事口径该人员原归属费用计提项等额冲减、单列「服务人工成本」；借方落点为主营业务成本 6401.1（服务成本-人工）；
 *      不重复计提应付职工薪酬 2211（实际付现统一在「实际发放」列=CF-06）。
 *   ② 内部供应商提供（BB.1.3.g/.i「内部供应商」列非空且≠签约主体，默认规则=平移+加成，与采购线 BB.3.3.D/BB.3.1.D 同构）：
 *      人工成本按原始成本（工时×BAA.3 工时标准成本，不含加成）平移——提供方（内部供应商归属法人）转出该人工成本
 *      （对应冲减其原归属成本科目/服务人工成本）、签约主体（接受方）平价承接该人工成本进 6401.1（服务成本-人工），
 *      同一笔人工只归属一次、双方均不重复计提 2211；往来挂其他应收款/其他应付款-内部往来 1221.1/2241.1，
 *      转付即清偿（净发生额 0、期末余额 0，提供方收 1001、签约主体付 1001）。
 *      加成款=该行人工成本×BAA.11 加成比例，绝不进人工成本/6401.1（也不进本表任何费用列）：
 *      全额走提供方 6001.2 其他业务收入-内部往来 ↔ 签约主体 6602 管理费用-内部往来；集团合并层成本全额抵销、
 *      6001.2↔6602 全额对冲，集团层营业成本与损益均不变。
 */
export function buildEmployeeExpenseFinanceViewSheet(items: any[] = []): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const baseHeaders = ['法人公司', '预算项目', '预算部门', '预算科目'];
  const N_BASE = baseHeaders.length; // 4 (c0~c3)
  const COL_SUM = N_BASE;             // 4
  const METRICS = ['销售费用', '研发费用', '管理费用', '制造费用', '服务人工成本', '自制在建工程', '实际发放'];
  const N_METRICS = METRICS.length;  // 7
  const moStart = (m: number) => COL_SUM + N_METRICS + (m - 1) * N_METRICS;
  const TOTAL_COLS = moStart(13); // 4 + 7*13 = 95

  // ── Row 0/1: 维度列（两行制，rs:2）──
  baseHeaders.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });

  // ── 全年合计大表头（cs:6）──
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: N_METRICS };
  METRICS.forEach((h, i) => {
    celldata.push({ r: 1, c: COL_SUM + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumSubHeader } });
  });

  // ── 1~12月大表头（每月cs:6）──
  for (let m = 1; m <= 12; m++) {
    const colStart = moStart(m);
    const label = `${m}月`;
    celldata.push({ r: 0, c: colStart, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
    merge[`0_${colStart}`] = { r: 0, c: colStart, rs: 1, cs: N_METRICS };
    METRICS.forEach((h, i) => {
      celldata.push({ r: 1, c: colStart + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader } });
    });
  }

  // 样例数据行（财务视角：各费用 = 人事口径 − 资本化人工；自制在建工程=资本化人工）
  const displayItems = items.length > 0 ? items : [
    {
      entity: '甜甜圈集团公司', budgetProject: '年度人工费用预算', department: '多部门汇总',
      months: {
        m1: { sales: 42, rnd: 78, admin: 29, mfg: 48, svc: 8, cip: 12, pay: 215 },
        m2: { sales: 42, rnd: 78, admin: 29, mfg: 50, svc: 8, cip: 12, pay: 217 },
        m3: { sales: 42, rnd: 78, admin: 29, mfg: 52, svc: 9, cip: 13, pay: 220 },
        m4: { sales: 45, rnd: 83, admin: 29, mfg: 52, svc: 9, cip: 13, pay: 228 },
        m5: { sales: 45, rnd: 83, admin: 29, mfg: 55, svc: 9, cip: 13, pay: 231 },
        m6: { sales: 45, rnd: 83, admin: 29, mfg: 56, svc: 10, cip: 14, pay: 233 },
        m7: { sales: 47, rnd: 88, admin: 31, mfg: 58, svc: 10, cip: 14, pay: 244 },
        m8: { sales: 47, rnd: 88, admin: 31, mfg: 60, svc: 11, cip: 15, pay: 247 },
        m9: { sales: 47, rnd: 88, admin: 31, mfg: 60, svc: 11, cip: 15, pay: 247 },
        m10: { sales: 49, rnd: 93, admin: 31, mfg: 63, svc: 12, cip: 15, pay: 257 },
        m11: { sales: 49, rnd: 93, admin: 31, mfg: 65, svc: 12, cip: 15, pay: 259 },
        m12: { sales: 52, rnd: 98, admin: 34, mfg: 67, svc: 13, cip: 15, pay: 272 },
      }
    }
  ];

  const colLetter = (c: number): string => {
    let s = '', n = c + 1;
    while (n > 0) { s = String.fromCharCode(65 + ((n - 1) % 26)) + s; n = Math.floor((n - 1) / 26); }
    return s;
  };

  displayItems.forEach((it: any, idx: number) => {
    const r = idx + 2;
    const excelRow = r + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, f?: string) => {
      const cell: any = { v: val, m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''), ct: { fa: isNum ? '#,##0.00' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };
    setCell(0, it.entity ?? '');
    setCell(1, it.budgetProject ?? '');
    setCell(2, it.department ?? '');
    setCell(3, it.budgetSubject ?? '2211 应付职工薪酬');

    // 1~12月各月7项度量：销售/研发/管理/制造（已扣除资本化人工与服务人工）、服务人工成本（自BB.1.3.b冲减）、自制在建工程、实际发放
    // 服务人工成本口径含销售线内部供应商提供的人工成本平移（BB.1.3.g/.i「内部供应商」非空且≠签约主体：
    // 提供方转出该人工成本、签约主体平价承接进 6401.1；加成款=人工成本×BAA.11 走 6001.2↔6602，不进人工成本/本表费用列）
    for (let m = 1; m <= 12; m++) {
      const mo = it.months?.[`m${m}`] || {};
      const start = moStart(m);
      setCell(start, mo.sales ?? 0, true);
      setCell(start + 1, mo.rnd ?? 0, true);
      setCell(start + 2, mo.admin ?? 0, true);
      setCell(start + 3, mo.mfg ?? mo.wip ?? 0, true);
      setCell(start + 4, mo.svc ?? mo.serviceLabor ?? 0, true);
      setCell(start + 5, mo.cip ?? mo.cipExpense ?? 0, true);
      setCell(start + 6, mo.pay ?? 0, true);
    }

    // 全年合计（7个度量子列分别 SUM 1~12月对应列，v=演算真值 + f 公式供复核）
    const MET_KEYS = ['sales', 'rnd', 'admin', 'mfg', 'svc', 'cip', 'pay'];
    for (let i = 0; i < N_METRICS; i++) {
      const key = MET_KEYS[i];
      const annualVal = Array.from({ length: 12 }, (_, m) => Number(it.months?.[`m${m + 1}`]?.[key] ?? 0)).reduce((x, y) => x + y, 0);
      const monthCells = Array.from({ length: 12 }, (_, m) => `${colLetter(moStart(m + 1) + i)}${excelRow}`);
      setCell(COL_SUM + i, annualVal, true, `=${monthCells.join('+')}`);
    }
  });

  const columnlen: Record<number, number> = { 0: 130, 1: 120, 2: 100, 3: 130 };
  for (let c = COL_SUM; c < TOTAL_COLS; c++) columnlen[c] = 85;

  return {
    name: 'BB.5.1 财务视角',
    index: 'bb41_employee_expense_finance_view',
    status: 1,
    order: 1,
    row: Math.max(displayItems.length + 5, 10),
    column: TOTAL_COLS,
    celldata,
    config: { merge, rowlen: { 0: 32, 1: 24 }, columnlen }
  };
}


export function buildSalesExpenseDetailSheet(items: any[] = []): any {
  const displayItems = items;
  const rows: SimpleMonthlyRowSpec[] = displayItems.map(it => {
    const monthlyValues: Record<number, number> = {};
    for (let m = 1; m <= 12; m++) {
      monthlyValues[m] = it.months?.[`m${m}`] ?? 0;
    }
    return {
      dimensions: [
        it.product ?? '',
        it.customer ?? '',
        it.region ?? '',
        it.project ?? '',
        it.department ?? '',
        it.expenseSubject ?? '',
      ],
      monthlyValues,
    };
  });

  return createSimpleMonthlySheet({
    name: 'BB.1.4 销售费用预算明细表 (经营)',
    dimensions: [
      { label: '产品', width: 140 },
      { label: '客户', width: 140 },
      { label: '区域', width: 110 },
      { label: '项目', width: 150 },
      { label: '预算部门', width: 130 },
      { label: '费用科目', width: 140 },
    ],
    rows,
  });
}


export function buildFinancialInstrumentSheet(
  items: FinancialInstrumentInvestmentItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
): any {
  const safeItems = Array.isArray(items) ? items : [];
  const isConsolidated = org === '集团合并' || org === '全部' || org === '全部组织';
  const displayItems = isConsolidated
    ? safeItems
    : safeItems.filter(it => it.legalEntity === org || !it.legalEntity || org === '甜甜圈集团公司');

  const budgetYearNum = parseInt(year, 10) || 2027;
  const celldata: any[] = [];
  const merges: Record<string, { r: number; c: number; rs: number; cs: number }> = {};
  const columnlen: Record<number, number> = {
    0: 50,  // 序号
    1: 140, // 投资主体
    2: 110, // 投资类型
    3: 140, // 投资产品
    4: 130, // 银行名称
    5: 85,  // 利率%
    6: 120, // 全年 新增投资额
    7: 120, // 全年 减少投资额
    8: 120, // 全年 投资收益
    9: 100  // 全年 平均回报率%
  };

  // Helper for column letters (0-indexed)
  const getColLetter = (col: number): string => {
    let result = '';
    let n = col + 1;
    while (n > 0) {
      n--;
      result = String.fromCharCode(65 + (n % 26)) + result;
      n = Math.floor(n / 26);
    }
    return result;
  };

  const borderHeader = {
    top: { style: 1, color: '#93c5fd' },
    bottom: { style: 1, color: '#93c5fd' },
    left: { style: 1, color: '#93c5fd' },
    right: { style: 1, color: '#93c5fd' }
  };
  const borderData = {
    top: { style: 1, color: '#e2e8f0' },
    bottom: { style: 1, color: '#e2e8f0' },
    left: { style: 1, color: '#e2e8f0' },
    right: { style: 1, color: '#e2e8f0' }
  };

  const setCell = (r: number, c: number, val: any, opt: any = {}) => {
    const isNum = opt.isNum ?? (typeof val === 'number');
    let m = val !== undefined && val !== null ? String(val) : '';
    if (isNum && typeof val === 'number') {
      if (opt.fmt === '0.00%') {
        m = (val * 100).toFixed(2) + '%';
      } else if (opt.fmt === '¥#,##0.00' || opt.fmt === '#,##0.00') {
        m = '¥' + val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      } else if (opt.fmt === '0.00') {
        m = val.toFixed(2);
      } else {
        m = val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      }
    }
    const cell: any = {
      v: val,
      m,
      ct: { fa: opt.fmt || (isNum ? '¥#,##0.00' : 'General'), t: isNum ? 'n' : 'g' },
      bg: opt.bg || '#ffffff',
      fc: opt.fc || '#1e293b',
      bl: opt.bl ? 1 : 0,
      ht: opt.ht !== undefined ? opt.ht : (isNum ? 2 : 1),
      vt: 1,
      bd: opt.bd || borderData
    };
    if (opt.f) {
      cell.f = opt.f;
    }
    if (opt.ps) {
      cell.ps = opt.ps;
    }
    celldata.push({ r, c, v: cell });
  };

  // -------------------------------------------------------------
  // Row 0 & Row 1: Dual-row Header (Strictly following Rule 0.2)
  // -------------------------------------------------------------

  // 固定维度列 (rs: 2)
  const fixedCols = [
    { c: 0, title: '序号' },
    { c: 1, title: '投资主体' },
    { c: 2, title: '投资类型' },
    { c: 3, title: '投资产品' },
    { c: 4, title: '银行名称' },
    { c: 5, title: '利率%' }
  ];
  fixedCols.forEach(col => {
    setCell(0, col.c, col.title, { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
    setCell(1, col.c, '', { bg: '#002f6c', fc: '#ffffff', bd: borderHeader });
    merges[`0_${col.c}`] = { r: 0, c: col.c, rs: 2, cs: 1 };
  });

  // 批注说明
  const psNew = { value: '进现金流量表项“投资支付的现金”\n进资产负债表项“交易性金融资产/定期存款”', isshow: false };
  const psRedeem = { value: '进现金流量表项“收回投资收到的现金”\n进资产负债表项“交易性金融资产/定期存款”（回）', isshow: false };
  const psIncome = { value: '进利润表项“投资收益”；存款利息进利润表“财务费用-利息收入(负数)”', isshow: false };

  // Group 1: 【全年合计】 (cs: 4, col 6~9)
  setCell(0, 6, '【全年合计】', { bg: '#001e4a', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
  for (let c = 7; c <= 9; c++) {
    setCell(0, c, '', { bg: '#001e4a', fc: '#ffffff', bd: borderHeader });
  }
  merges['0_6'] = { r: 0, c: 6, rs: 1, cs: 4 };

  setCell(1, 6, '新增投资额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psNew });
  setCell(1, 7, '减少投资额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psRedeem });
  setCell(1, 8, '投资收益', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psIncome });
  setCell(1, 9, '平均回报率%', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });

  // Groups 2~13: 【1月】 ~ 【12月】 (各月 cs: 4, col 10 ~ col 57)
  for (let m = 1; m <= 12; m++) {
    const startC = 10 + (m - 1) * 4;
    const monthName = `${m}月`;
    setCell(0, startC, monthName, { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
    for (let offset = 1; offset < 4; offset++) {
      setCell(0, startC + offset, '', { bg: '#002f6c', fc: '#ffffff', bd: borderHeader });
    }
    merges[`0_${startC}`] = { r: 0, c: startC, rs: 1, cs: 4 };

    setCell(1, startC + 0, '新增投资额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psNew });
    setCell(1, startC + 1, '减少投资额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psRedeem });
    setCell(1, startC + 2, '投资收益', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psIncome });
    setCell(1, startC + 3, '回报率%', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });

    columnlen[startC + 0] = 110;
    columnlen[startC + 1] = 110;
    columnlen[startC + 2] = 105;
    columnlen[startC + 3] = 90;
  }

  // 后置说明与勾稽列 (rs: 2)
  const trailingCols = [
    { c: 58, title: '备注', width: 200 }
  ];
  trailingCols.forEach(tc => {
    setCell(0, tc.c, tc.title, { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
    setCell(1, tc.c, '', { bg: '#002f6c', fc: '#ffffff', bd: borderHeader });
    merges[`0_${tc.c}`] = { r: 0, c: tc.c, rs: 2, cs: 1 };
    columnlen[tc.c] = tc.width;
  });

  // -------------------------------------------------------------
  // Data Rows (Starting from Row 2)
  // -------------------------------------------------------------
  displayItems.forEach((item, idx) => {
    const r = idx + 2;
    const excelRow = r + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';

    // 0~5: Fixed dimensions
    setCell(r, 0, idx + 1, { bg: rowBg, ht: 1 });
    setCell(r, 1, item.legalEntity || org, { bg: rowBg, ht: 0 });
    setCell(r, 2, item.category, { bg: rowBg, ht: 0 });
    setCell(r, 3, item.productType, { bg: rowBg, ht: 0 });
    setCell(r, 4, item.bankName, { bg: rowBg, ht: 0 });
    setCell(r, 5, item.interestRatePct || 0, { bg: rowBg, fmt: '0.00', isNum: true });

    // 10~57: 1月 ~ 12月数据
    const monthlyNewCells: string[] = [];
    const monthlyRedeemCells: string[] = [];
    const monthlyIncomeCells: string[] = [];
    const monthlyRateCells: string[] = [];

    for (let m = 1; m <= 12; m++) {
      const raw = item.months?.[`m${m}`];
      const mData: { newInvestment: number; redemption: number; investmentIncome: number; returnRatePct: number } =
        raw && typeof raw === 'object'
          ? raw
          : { newInvestment: 0, redemption: 0, investmentIncome: 0, returnRatePct: 0 };
      const startC = 10 + (m - 1) * 4;

      const cNew = getColLetter(startC + 0) + excelRow;
      const cRedeem = getColLetter(startC + 1) + excelRow;
      const cIncome = getColLetter(startC + 2) + excelRow;
      const cRate = getColLetter(startC + 3) + excelRow;

      monthlyNewCells.push(cNew);
      monthlyRedeemCells.push(cRedeem);
      monthlyIncomeCells.push(cIncome);
      monthlyRateCells.push(cRate);

      setCell(r, startC + 0, mData.newInvestment || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
      setCell(r, startC + 1, mData.redemption || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
      setCell(r, startC + 2, mData.investmentIncome || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
      setCell(r, startC + 3, (mData.returnRatePct || item.interestRatePct || 0) / 100, {
        bg: rowBg,
        fmt: '0.00%',
        isNum: true
      });
    }

    // 6~9: 【全年合计】公式联动
    // Col 6: 全年新增投资额合计
    setCell(r, 6, item.annualNewInvestment || 0, {
      bg: '#f0fdfa',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${monthlyNewCells.join(',')})`
    });

    // Col 7: 全年减少投资额合计
    setCell(r, 7, item.annualRedemption || 0, {
      bg: '#f0fdfa',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${monthlyRedeemCells.join(',')})`
    });

    // Col 8: 全年投资收益合计
    setCell(r, 8, item.annualInvestmentIncome || 0, {
      bg: '#f0fdfa',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${monthlyIncomeCells.join(',')})`
    });

    // Col 9: 全年平均投资回报率%
    setCell(r, 9, (item.avgReturnRatePct || item.interestRatePct || 0) / 100, {
      bg: '#f0fdfa',
      bl: 1,
      fmt: '0.00%',
      isNum: true,
      f: `=AVERAGE(${monthlyRateCells.join(',')})`
    });

    // 58~61: 后置流向与备注
    setCell(r, 58, item.notes || '', { bg: rowBg, ht: 0 });
  });

  const totalCols = 59;
  const totalRows = Math.max(displayItems.length + 4, 12);

  return {
    name: 'BF.3.a 金融工具投融资-银行',
    color: '#0284c7',
    index: 'sheet_financial_inst_bank',
    status: 1,
    order: 0,
    row: totalRows,
    column: totalCols,
    celldata,
    config: {
      merge: merges,
      rowlen: { 0: 34, 1: 32 },
      columnlen,
      frozen: { type: 'rangeBoth', range: { row_focus: 1, column_focus: 5 } }
    }
  };
}


export function buildNonBankFinancialInstrumentSheet(
  items: NonBankFinancialInstrumentItem[],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
): any {
  const safeItems = Array.isArray(items) ? items : [];
  const isConsolidated = org === '集团合并' || org === '全部' || org === '全部组织';
  const displayItems = isConsolidated
    ? safeItems
    : safeItems.filter(it => it.legalEntity === org || !it.legalEntity || org === '甜甜圈集团公司');

  const budgetYearNum = parseInt(year, 10) || 2027;
  const priorYearNum = budgetYearNum - 1;

  const celldata: any[] = [];
  const merges: Record<string, { r: number; c: number; rs: number; cs: number }> = {};
  const columnlen: Record<number, number> = {
    0: 50,  // 序号
    1: 140, // 投资主体
    2: 130, // 投资类型
    3: 160, // 投资产品
    4: 220, // 项目名称
    5: 120, // 2026 平均资金占用额
    6: 95,  // 2026 投资回报率
    7: 120, // 2026 期末投资额
    8: 120, // 全年 新增投资额
    9: 120, // 全年 减少投资额
    10: 120,// 全年 期末投资额
    11: 110,// 全年 投资收益
    12: 170,// 全年 本年项目计划现金分红/利息资金流入
    13: 120,// 全年 平均资金占用额
    14: 95, // 全年 投资回报率
    15: 160 // 备注
  };

  // Helper for column letters (0-indexed)
  const getColLetter = (col: number): string => {
    let result = '';
    let n = col + 1;
    while (n > 0) {
      n--;
      result = String.fromCharCode(65 + (n % 26)) + result;
      n = Math.floor(n / 26);
    }
    return result;
  };

  const borderHeader = {
    top: { style: 1, color: '#93c5fd' },
    bottom: { style: 1, color: '#93c5fd' },
    left: { style: 1, color: '#93c5fd' },
    right: { style: 1, color: '#93c5fd' }
  };
  const borderData = {
    top: { style: 1, color: '#e2e8f0' },
    bottom: { style: 1, color: '#e2e8f0' },
    left: { style: 1, color: '#e2e8f0' },
    right: { style: 1, color: '#e2e8f0' }
  };

  const setCell = (r: number, c: number, val: any, opt: any = {}) => {
    const isNum = opt.isNum ?? (typeof val === 'number');
    let m = val !== undefined && val !== null ? String(val) : '';
    if (isNum && typeof val === 'number') {
      if (opt.fmt === '0.00%') {
        m = (val * 100).toFixed(2) + '%';
      } else if (opt.fmt === '¥#,##0.00' || opt.fmt === '#,##0.00') {
        m = '¥' + val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      } else {
        m = val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      }
    }
    const cell: any = {
      v: val,
      m,
      ct: { fa: opt.fmt || (isNum ? '¥#,##0.00' : 'General'), t: isNum ? 'n' : 'g' },
      bg: opt.bg || '#ffffff',
      fc: opt.fc || '#1e293b',
      bl: opt.bl ? 1 : 0,
      ht: opt.ht !== undefined ? opt.ht : (isNum ? 2 : 1),
      vt: 1,
      bd: opt.bd || borderData
    };
    if (opt.f) {
      cell.f = opt.f;
    }
    if (opt.ps) {
      cell.ps = opt.ps;
    }
    celldata.push({ r, c, v: cell });
  };

  // -------------------------------------------------------------
  // Row 0 & Row 1: Dual-row Header (Strictly following Rule 0.2 & screenshot)
  // -------------------------------------------------------------

  // Fixed Dimension Columns (rs: 2)
  const fixedCols = [
    { c: 0, title: '序号' },
    { c: 1, title: '投资主体' },
    { c: 2, title: '投资类型' },
    { c: 3, title: '投资产品' },
    { c: 4, title: '项目名称' }
  ];
  fixedCols.forEach(col => {
    setCell(0, col.c, col.title, { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
    setCell(1, col.c, '', { bg: '#002f6c', fc: '#ffffff', bd: borderHeader });
    merges[`0_${col.c}`] = { r: 0, c: col.c, rs: 2, cs: 1 };
  });

  // Group 1: 2026年预算情况 (cs: 3)
  setCell(0, 5, `${priorYearNum}年预算情况`, { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
  setCell(0, 6, '', { bg: '#002f6c', fc: '#ffffff', bd: borderHeader });
  setCell(0, 7, '', { bg: '#002f6c', fc: '#ffffff', bd: borderHeader });
  merges['0_5'] = { r: 0, c: 5, rs: 1, cs: 3 };

  setCell(1, 5, '平均资金占用额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
  setCell(1, 6, '投资回报率%', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
  setCell(1, 7, '期末投资额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });

  // Group 2: 【全年合计】 (cs: 8) - Rule 0.2
  setCell(0, 8, '【全年合计】', { bg: '#001e4a', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
  for (let c = 9; c <= 15; c++) {
    setCell(0, c, '', { bg: '#001e4a', fc: '#ffffff', bd: borderHeader });
  }
  merges['0_8'] = { r: 0, c: 8, rs: 1, cs: 8 };

  // Annotations / Notes strictly matching prototype
  const psNew = { value: '进现金流量表项“投资支付的现金”\n进资产负债表项“交易性金融资产”', isshow: false };
  const psRedeem = { value: '进现金流量表项“收回投资收到的现金”\n进资产负债表项“交易性金融资产”（回）', isshow: false };
  const psIncome = { value: '进利润表项“投资收益”', isshow: false };
  const psDividend = { value: '1. 累计分红进利润表表项“投资收益”；利息进利润表“财务费用-利息收入(负数)”；\n2. 进现金流量表项“取得投资收益收到的现金”', isshow: false };

  setCell(1, 8, '新增投资额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psNew });
  setCell(1, 9, '减少投资额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psRedeem });
  setCell(1, 10, '期末投资额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
  setCell(1, 11, '投资收益', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psIncome });
  setCell(1, 12, '本年计划分红/利息流入', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psDividend });
  setCell(1, 13, '平均资金占用额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
  setCell(1, 14, '投资回报率%', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
  setCell(1, 15, '备注', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });

  // Groups 3~14: 【1月】 ~ 【12月】 (各月 cs: 7)
  const monthColStart: number[] = [];
  for (let m = 1; m <= 12; m++) {
    const startC = 16 + (m - 1) * 7;
    monthColStart.push(startC);
    const monthName = `${m}月`;
    setCell(0, startC, monthName, { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
    for (let offset = 1; offset < 7; offset++) {
      setCell(0, startC + offset, '', { bg: '#002f6c', fc: '#ffffff', bd: borderHeader });
    }
    merges[`0_${startC}`] = { r: 0, c: startC, rs: 1, cs: 7 };

    setCell(1, startC + 0, '新增投资额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psNew });
    setCell(1, startC + 1, '减少投资额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psRedeem });
    setCell(1, startC + 2, '期末投资额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
    setCell(1, startC + 3, '投资收益', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psIncome });
    setCell(1, startC + 4, '计划分红/利息', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader, ps: psDividend });
    setCell(1, startC + 5, '资金占用额', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });
    setCell(1, startC + 6, '回报率%', { bg: '#002f6c', fc: '#ffffff', bl: 1, ht: 1, bd: borderHeader });

    columnlen[startC + 0] = 110;
    columnlen[startC + 1] = 110;
    columnlen[startC + 2] = 110;
    columnlen[startC + 3] = 105;
    columnlen[startC + 4] = 125;
    columnlen[startC + 5] = 110;
    columnlen[startC + 6] = 90;
  }

  // -------------------------------------------------------------
  // Data Rows (Starting from Row 2)
  // -------------------------------------------------------------
  displayItems.forEach((item, idx) => {
    const r = idx + 2;
    const excelRow = r + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';

    // 0~4: Fixed dimensions
    setCell(r, 0, idx + 1, { bg: rowBg, ht: 1 });
    setCell(r, 1, item.legalEntity || org, { bg: rowBg, ht: 0 });
    setCell(r, 2, item.investType, { bg: rowBg, ht: 0 });
    setCell(r, 3, item.productName, { bg: rowBg, ht: 0 });
    setCell(r, 4, item.projectName, { bg: rowBg, ht: 0 });

    // 5~7: 2026年预算情况
    setCell(r, 5, item.priorAvgCapitalOccupied || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
    setCell(r, 6, item.priorReturnRatePct || 0, { bg: rowBg, fmt: '0.00%', isNum: true });
    setCell(r, 7, item.priorEndingInvestment || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });

    // 16~99: 1月 ~ 12月数据
    const monthlyNewCells: string[] = [];
    const monthlyRedeemCells: string[] = [];
    const monthlyIncomeCells: string[] = [];
    const monthlyInflowCells: string[] = [];
    const monthlyOccupiedCells: string[] = [];

    for (let m = 1; m <= 12; m++) {
      const raw = item.months?.[`m${m}`];
      const mData: NonBankFinancialMonthlyData =
        raw && typeof raw === 'object'
          ? raw
          : { newInvestment: 0, redemption: 0, endingInvestment: 0, investmentIncome: 0, dividendInterestInflow: 0, avgCapitalOccupied: 0, returnRatePct: 0 };
      const startC = 16 + (m - 1) * 7;

      const cNew = getColLetter(startC + 0) + excelRow;
      const cRedeem = getColLetter(startC + 1) + excelRow;
      const cEnding = getColLetter(startC + 2) + excelRow;
      const cIncome = getColLetter(startC + 3) + excelRow;
      const cInflow = getColLetter(startC + 4) + excelRow;
      const cOccupied = getColLetter(startC + 5) + excelRow;

      monthlyNewCells.push(cNew);
      monthlyRedeemCells.push(cRedeem);
      monthlyIncomeCells.push(cIncome);
      monthlyInflowCells.push(cInflow);
      monthlyOccupiedCells.push(cOccupied);

      setCell(r, startC + 0, mData.newInvestment || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
      setCell(r, startC + 1, mData.redemption || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });

      // Monthly ending investment formula: prev ending + new - redeem
      const prevEndingCell = m === 1 ? `H${excelRow}` : `${getColLetter(startC - 7 + 2)}${excelRow}`;
      setCell(r, startC + 2, mData.endingInvestment || 0, {
        bg: rowBg,
        fmt: '¥#,##0.00',
        isNum: true,
        f: `=${prevEndingCell}+${cNew}-${cRedeem}`
      });

      setCell(r, startC + 3, mData.investmentIncome || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
      setCell(r, startC + 4, mData.dividendInterestInflow || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
      setCell(r, startC + 5, mData.avgCapitalOccupied || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
      setCell(r, startC + 6, mData.returnRatePct || 0, {
        bg: rowBg,
        fmt: '0.00%',
        isNum: true,
        f: `=${mData.returnRatePct ? mData.returnRatePct : 0}`
      });
    }

    // 8~15: 【全年合计】公式联动
    // Col 8: 全年新增投资额合计
    setCell(r, 8, item.annualNewInvestment || 0, {
      bg: '#f0fdfa',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${monthlyNewCells.join(',')})`
    });

    // Col 9: 全年减少投资额合计
    setCell(r, 9, item.annualRedemption || 0, {
      bg: '#f0fdfa',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${monthlyRedeemCells.join(',')})`
    });

    // Col 10: 全年期末投资额 (12月末投资额)
    const m12EndingCell = getColLetter(16 + 11 * 7 + 2) + excelRow;
    setCell(r, 10, item.annualEndingInvestment || 0, {
      bg: '#f0fdfa',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=${m12EndingCell}`
    });

    // Col 11: 全年投资收益合计
    setCell(r, 11, item.annualInvestmentIncome || 0, {
      bg: '#f0fdfa',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${monthlyIncomeCells.join(',')})`
    });

    // Col 12: 全年计划分红/利息流入合计
    setCell(r, 12, item.annualDividendInterestInflow || 0, {
      bg: '#f0fdfa',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${monthlyInflowCells.join(',')})`
    });

    // Col 13: 全年平均资金占用额
    setCell(r, 13, item.annualAvgCapitalOccupied || 0, {
      bg: '#f0fdfa',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=AVERAGE(${monthlyOccupiedCells.join(',')})`
    });

    // Col 14: 全年平均投资回报率
    setCell(r, 14, item.annualReturnRatePct || 0, {
      bg: '#f0fdfa',
      bl: 1,
      fmt: '0.00%',
      isNum: true,
      f: `=IF(N${excelRow}>0,L${excelRow}/N${excelRow},0)`
    });

    // Col 15: 备注
    setCell(r, 15, item.notes || '', { bg: '#f0fdfa', ht: 0 });
  });

  const totalCols = 16 + 12 * 7;
  const totalRows = Math.max(displayItems.length + 4, 12);

  return {
    name: 'BF.3.b 金融工具投资预算-非银',
    color: '#0d9488',
    index: 'sheet_financial_inst_nonbank',
    status: 0,
    order: 1,
    row: totalRows,
    column: totalCols,
    celldata,
    config: {
      merge: merges,
      rowlen: { 0: 34, 1: 32 },
      columnlen,
      frozen: { type: 'rangeBoth', range: { row_focus: 1, column_focus: 4 } }
    }
  };
}


export function buildCreditBudgetSheet(
  items: CreditBudgetItem[] = [],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
): any {
  const celldata: any[] = [];
  const merges: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  // 统一深海蓝表头样式
  const headerStyle = {
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
  };

  const headerSumStyle = {
    bg: '#001e4a',
    fc: '#fef08a',
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
  };

  // Row 0: 列头 (Columns Header)
  const headers = [
    '编号',
    '融资主体(法人公司)',
    '授信单位',
    '币种',
    '授信类型 (资金模块)',
    '授信期限',
    '上年末剩余授信额度 (万元)',
    '本年新增授信额度 (万元)',
    '合计'
  ];

  headers.forEach((h, c) => {
    celldata.push({
      r: 0,
      c,
      v: {
        v: h,
        m: h,
        ct: { fa: 'General', t: 'g' },
        ...(c === 8 ? headerSumStyle : headerStyle)
      }
    });
  });

  // Row 1: 指引/填报说明行
  const guideStyles = {
    bg: '#f1f5f9',
    fc: '#475569',
    it: 1,
    ht: 1,
    vt: 1,
    tb: 2,
    fs: 9,
    bd: {
      l: { style: 1, color: '#cbd5e1' },
      r: { style: 1, color: '#cbd5e1' },
      t: { style: 1, color: '#cbd5e1' },
      b: { style: 1, color: '#cbd5e1' }
    }
  };

  const guideRowValues: { c: number; v: string; fc?: string; b?: number; bg?: string }[] = [
    { c: 0, v: '1' },
    { c: 1, v: '法人公司' },
    { c: 2, v: '金融机构', fc: '#1d4ed8', b: 1 },
    { c: 3, v: '默认人民币' },
    { c: 4, v: '授信类型', fc: '#1d4ed8', b: 1 },
    { c: 5, v: '到期时间' },
    { c: 6, v: '手工填写' },
    { c: 7, v: '手工填写' },
    { c: 8, v: '自动计算\n=剩余+新增', fc: '#047857', b: 1, bg: '#ecfdf5' }
  ];

  guideRowValues.forEach(g => {
    celldata.push({
      r: 1,
      c: g.c,
      v: {
        v: g.v,
        m: g.v,
        ct: { fa: 'General', t: 'g' },
        ...guideStyles,
        ...(g.fc ? { fc: g.fc } : {}),
        ...(g.b ? { bl: g.b } : {}),
        ...(g.bg ? { bg: g.bg } : {})
      }
    });
  });

  const borderDef = {
    l: { style: 1, color: '#e2e8f0' },
    r: { style: 1, color: '#e2e8f0' },
    t: { style: 1, color: '#e2e8f0' },
    b: { style: 1, color: '#e2e8f0' }
  };

  const subtotalBorderDef = {
    l: { style: 1, color: '#cbd5e1' },
    r: { style: 1, color: '#cbd5e1' },
    t: { style: 1, color: '#94a3b8' },
    b: { style: 1, color: '#94a3b8' }
  };

  // 金额显示文本（万元、1 位小数）。调研页 Markdown 表样不计算公式，
  // 公式单元格需同时给出 m 显示值；未提供显示值时返回空串。
  const formatAmount = (n?: number): string =>
    typeof n === 'number'
      ? n.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
      : '';

  // 预置符合用户业务要求的示例数据：按法人公司+授信类型填报，并包含法人小计与集团授信类型小计
  interface CreditSampleRow {
    type: 'data' | 'entity_subtotal' | 'group_header' | 'type_subtotal' | 'grand_total';
    seq?: string;
    entity?: string;
    bank?: string;
    currency?: string;
    creditType?: string;
    expiry?: string;
    prior?: number;
    current?: number;
    formulaPrior?: string;
    formulaCurrent?: string;
    /** 公式单元格的预览显示值（调研页 Markdown 表样不计算公式，需同时给出显示文本） */
    priorDisplay?: number;
    currentDisplay?: number;
    totalDisplay?: number;
  }

  // 示例数据分两段结构：【第一段】法人层面逐笔填报 + 法人小计；【第二段】集团汇总（按授信类型小计 + 集团合计）。
  const sampleRows: CreditSampleRow[] = [
    // ── 第一段：法人层面逐笔填报 ──
    { type: 'data', seq: '1', entity: '甜甜圈集团公司', bank: '招商银行', currency: '人民币', creditType: '流动资金贷款', expiry: '2027-12-31', prior: 15000, current: 5000 },
    { type: 'data', seq: '2', entity: '甜甜圈集团公司', bank: '中信证券/银行', currency: '人民币', creditType: '债券', expiry: '2028-06-30', prior: 20000, current: 10000 },
    { type: 'data', seq: '3', entity: '甜甜圈集团公司', bank: '中国银行', currency: '人民币', creditType: '并购贷款', expiry: '2029-12-31', prior: 8000, current: 0 },
    // 法人小计
    { type: 'entity_subtotal', seq: '小计', entity: '甜甜圈集团公司', bank: '（法人小计）', currency: '', creditType: '—', expiry: '', formulaPrior: '=SUM(G3:G5)', formulaCurrent: '=SUM(H3:H5)', priorDisplay: 43000, currentDisplay: 15000, totalDisplay: 58000 },

    { type: 'data', seq: '4', entity: '草莓慕斯公司', bank: '建设银行', currency: '人民币', creditType: '固定资产贷款', expiry: '2028-12-31', prior: 12000, current: 6000 },
    { type: 'data', seq: '5', entity: '草莓慕斯公司', bank: '工商银行', currency: '人民币', creditType: '供应链融资', expiry: '2027-12-31', prior: 5000, current: 3000 },
    { type: 'data', seq: '6', entity: '草莓慕斯公司', bank: '农业银行', currency: '人民币', creditType: '流动资金贷款', expiry: '2027-12-31', prior: 4000, current: 2000 },
    // 法人小计
    { type: 'entity_subtotal', seq: '小计', entity: '草莓慕斯公司', bank: '（法人小计）', currency: '', creditType: '—', expiry: '', formulaPrior: '=SUM(G7:G9)', formulaCurrent: '=SUM(H7:H9)', priorDisplay: 21000, currentDisplay: 11000, totalDisplay: 32000 },

    { type: 'data', seq: '7', entity: '西瓜泡芙公司', bank: '交通银行', currency: '人民币', creditType: '贸易融资', expiry: '2027-12-31', prior: 6000, current: 4000 },
    { type: 'data', seq: '8', entity: '西瓜泡芙公司', bank: '浦发银行', currency: '人民币', creditType: '流动资金贷款', expiry: '2027-12-31', prior: 3000, current: 2000 },
    // 法人小计
    { type: 'entity_subtotal', seq: '小计', entity: '西瓜泡芙公司', bank: '（法人小计）', currency: '', creditType: '—', expiry: '', formulaPrior: '=SUM(G11:G12)', formulaCurrent: '=SUM(H11:H12)', priorDisplay: 9000, currentDisplay: 6000, totalDisplay: 15000 },

    // ── 第二段：集团汇总 ──
    { type: 'group_header', seq: '汇总', entity: '集团汇总（按授信类型口径）', bank: '按授信类型对全集团各法人已批复授信额度做小计归集，并与法人小计交叉校验；本段为集团口径汇总展示，不重复计入法人明细' },

    // 集团按授信类型小计
    { type: 'type_subtotal', seq: '类型小计1', entity: '集团（全法人）', bank: '（类型小计）', currency: '人民币', creditType: '流动资金贷款', expiry: '', formulaPrior: '=G3+G9+G12', formulaCurrent: '=H3+H9+H12', priorDisplay: 22000, currentDisplay: 9000, totalDisplay: 31000 },
    { type: 'type_subtotal', seq: '类型小计2', entity: '集团（全法人）', bank: '（类型小计）', currency: '人民币', creditType: '债券', expiry: '', formulaPrior: '=G4', formulaCurrent: '=H4', priorDisplay: 20000, currentDisplay: 10000, totalDisplay: 30000 },
    { type: 'type_subtotal', seq: '类型小计3', entity: '集团（全法人）', bank: '（类型小计）', currency: '人民币', creditType: '并购贷款', expiry: '', formulaPrior: '=G5', formulaCurrent: '=H5', priorDisplay: 8000, currentDisplay: 0, totalDisplay: 8000 },
    { type: 'type_subtotal', seq: '类型小计4', entity: '集团（全法人）', bank: '（类型小计）', currency: '人民币', creditType: '固定资产贷款', expiry: '', formulaPrior: '=G7', formulaCurrent: '=H7', priorDisplay: 12000, currentDisplay: 6000, totalDisplay: 18000 },
    { type: 'type_subtotal', seq: '类型小计5', entity: '集团（全法人）', bank: '（类型小计）', currency: '人民币', creditType: '供应链融资', expiry: '', formulaPrior: '=G8', formulaCurrent: '=H8', priorDisplay: 5000, currentDisplay: 3000, totalDisplay: 8000 },
    { type: 'type_subtotal', seq: '类型小计6', entity: '集团（全法人）', bank: '（类型小计）', currency: '人民币', creditType: '贸易融资', expiry: '', formulaPrior: '=G11', formulaCurrent: '=H11', priorDisplay: 6000, currentDisplay: 4000, totalDisplay: 10000 },

    // 集团合计
    { type: 'grand_total', seq: '集团合计', entity: '集团授信总额', bank: '（集团合计）', currency: '人民币', creditType: '全部类型', expiry: '', formulaPrior: '=SUM(G15:G20)', formulaCurrent: '=SUM(H15:H20)', priorDisplay: 73000, currentDisplay: 32000, totalDisplay: 105000 },
  ];

  let r = 2;
  sampleRows.forEach((rowItem) => {
    const excelRow = r + 1;

    if (rowItem.type === 'group_header') {
      celldata.push({
        r, c: 0,
        v: { v: rowItem.seq, m: rowItem.seq, ct: { fa: 'General', t: 'g' }, ht: 1, vt: 1, bg: '#e0e7ff', fc: '#3730a3', bl: 1, bd: borderDef }
      });
      celldata.push({
        r, c: 1,
        v: { v: rowItem.entity, m: rowItem.entity, ct: { fa: 'General', t: 'g' }, ht: 0, vt: 1, bg: '#e0e7ff', fc: '#3730a3', bl: 1, bd: borderDef }
      });
      celldata.push({
        r, c: 2,
        v: { v: rowItem.bank, m: rowItem.bank, ct: { fa: 'General', t: 'g' }, ht: 0, vt: 1, bg: '#e0e7ff', fc: '#4338ca', it: 1, bd: borderDef }
      });
      merges[`${r}_2`] = { r, c: 2, rs: 1, cs: 7 };
      for (let col = 3; col <= 8; col++) {
        celldata.push({ r, c: col, v: { v: '', m: '', ct: { fa: 'General', t: 'g' }, bg: '#e0e7ff', bd: borderDef } });
      }
      r++;
      return;
    }

    const isSubtotal = rowItem.type === 'entity_subtotal';
    const isTypeSubtotal = rowItem.type === 'type_subtotal';
    const isGrandTotal = rowItem.type === 'grand_total';

    let rowBg = '#ffffff';
    let rowFc = '#1e293b';
    let rowBorder = borderDef;
    let isBold = 0;

    if (isSubtotal) {
      rowBg = '#f1f5f9';
      rowFc = '#0f172a';
      rowBorder = subtotalBorderDef;
      isBold = 1;
    } else if (isTypeSubtotal) {
      rowBg = '#f8fafc';
      rowFc = '#1e3a8a';
      rowBorder = borderDef;
      isBold = 1;
    } else if (isGrandTotal) {
      rowBg = '#fde68a';
      rowFc = '#78350f';
      rowBorder = {
        l: { style: 1, color: '#f59e0b' },
        r: { style: 1, color: '#f59e0b' },
        t: { style: 2, color: '#d97706' },
        b: { style: 2, color: '#d97706' }
      };
      isBold = 1;
    }

    // Col 0: 编号
    celldata.push({
      r, c: 0,
      v: { v: rowItem.seq, m: String(rowItem.seq), ct: { fa: 'General', t: 'g' }, ht: 1, vt: 1, bg: rowBg, fc: rowFc, bl: isBold, bd: rowBorder }
    });

    // Col 1: 融资主体
    celldata.push({
      r, c: 1,
      v: { v: rowItem.entity, m: rowItem.entity, ct: { fa: 'General', t: 'g' }, ht: 0, vt: 1, bg: rowBg, fc: rowFc, bl: isBold, bd: rowBorder }
    });

    // Col 2: 授信单位
    celldata.push({
      r, c: 2,
      v: { v: rowItem.bank, m: rowItem.bank, ct: { fa: 'General', t: 'g' }, ht: 0, vt: 1, bg: rowBg, fc: rowFc, bl: isBold, bd: rowBorder }
    });

    // Col 3: 币种
    celldata.push({
      r, c: 3,
      v: { v: rowItem.currency, m: rowItem.currency, ct: { fa: 'General', t: 'g' }, ht: 1, vt: 1, bg: rowBg, fc: rowFc, bl: isBold, bd: rowBorder }
    });

    // Col 4: 授信类型
    celldata.push({
      r, c: 4,
      v: { v: rowItem.creditType, m: rowItem.creditType, ct: { fa: 'General', t: 'g' }, ht: 0, vt: 1, bg: rowBg, fc: isTypeSubtotal ? '#2563eb' : rowFc, bl: isBold, bd: rowBorder }
    });

    // Col 5: 授信期限
    celldata.push({
      r, c: 5,
      v: { v: rowItem.expiry, m: rowItem.expiry, ct: { fa: 'General', t: 'g' }, ht: 1, vt: 1, bg: rowBg, fc: rowFc, bd: rowBorder }
    });

    // Col 6: 上年末剩余授信额度 (万元)
    if (rowItem.formulaPrior) {
      celldata.push({
        r, c: 6,
        v: { v: rowItem.priorDisplay ?? null, f: rowItem.formulaPrior, m: formatAmount(rowItem.priorDisplay), ct: { fa: '¥#,##0.00', t: 'n' }, ht: 2, vt: 1, bg: isGrandTotal ? '#fef3c7' : rowBg, fc: rowFc, bl: isBold, bd: rowBorder }
      });
    } else {
      const p = rowItem.prior || 0;
      celldata.push({
        r, c: 6,
        v: { v: p, m: p.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), ct: { fa: '¥#,##0.00', t: 'n' }, ht: 2, vt: 1, bg: rowBg, fc: rowFc, bl: isBold, bd: rowBorder }
      });
    }

    // Col 7: 本年新增授信额度 (万元)
    if (rowItem.formulaCurrent) {
      celldata.push({
        r, c: 7,
        v: { v: rowItem.currentDisplay ?? null, f: rowItem.formulaCurrent, m: formatAmount(rowItem.currentDisplay), ct: { fa: '¥#,##0.00', t: 'n' }, ht: 2, vt: 1, bg: isGrandTotal ? '#fef3c7' : rowBg, fc: rowFc, bl: isBold, bd: rowBorder }
      });
    } else {
      const c = rowItem.current || 0;
      celldata.push({
        r, c: 7,
        v: { v: c, m: c.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), ct: { fa: '¥#,##0.00', t: 'n' }, ht: 2, vt: 1, bg: rowBg, fc: rowFc, bl: isBold, bd: rowBorder }
      });
    }

    // Col 8: 合计 (公式: =G{r+1}+H{r+1})
    const rowTotal = rowItem.totalDisplay
      ?? ((typeof rowItem.prior === 'number' || typeof rowItem.current === 'number')
        ? (rowItem.prior || 0) + (rowItem.current || 0)
        : undefined);
    celldata.push({
      r, c: 8,
      v: {
        v: rowTotal ?? null,
        f: `=G${excelRow}+H${excelRow}`,
        m: formatAmount(rowTotal),
        ct: { fa: '¥#,##0.00', t: 'n' },
        ht: 2,
        vt: 1,
        bg: isGrandTotal ? '#fde68a' : (isSubtotal || isTypeSubtotal ? '#ecfdf5' : '#f0fdf4'),
        fc: isGrandTotal ? '#78350f' : '#15803d',
        bl: 1,
        fs: isGrandTotal ? 11 : 10,
        bd: rowBorder
      }
    });

    r++;
  });

  const grandTotalRowIndex = r - 1;

  // Note: 业务说明行
  const noteRow = r + 1;
  const noteContent =
    '【授信预算编制业务指引与联动说明】\n' +
    '0. 子表与集团汇总口径（结构化示例，仅供说明表样与口径；实施顾问可根据需要在一张表内实现）：\n' +
    '   第①段 法人层面填报——按「融资主体(法人公司)×授信单位×授信类型」逐笔填报上年末剩余授信额度与本年新增授信额度，每户法人后附【法人小计】行（=该法人各笔合计，公式 SUM）；\n' +
    '   第②段 集团汇总——此处单独列出，仅用于说明「除法人层面逐笔填报外，还需要有集团汇总」这一口径要求（按授信类型对全集团归集出【类型小计】，并给出【集团授信总额】）；集团汇总可集中在同一张表内实现，也可由系统按需另设汇总视图，不强制拆成两个子表；\n' +
    '   交叉校验：集团授信总额 = 各法人小计之和 = 各授信类型小计之和（示例：法人小计 43,000+21,000+9,000 = 73,000 万元，类型小计合计 73,000 万元，两路径必须相等）；\n' +
    '   本表为授信额度的登记与上限参考（表外备查性质），不生成会计分录；示例数据仅供说明表样结构，不作为测算依据；法人明细行与集团汇总行不得重复计入同一笔授信。\n' +
    '1. 编制维度与填报：集团各法人单位（如总部、制造基地、销售公司）结合自身融资与授信需求，按合作金融机构与授信类型（流动资金贷款、并购贷款、固定资产贷款、供应链融资、贸易融资、债券等）逐笔填报。\n' +
    '2. 额度汇总与小计逻辑：表内不仅形成各法人单位的小计，同时在汇总区按「授信类型」进行全集团小计归集，并最终公式计算集团授信总额（合计授信额度 = 上年末剩余授信额度 + 本年新增批复额度）。\n' +
    '3. 资金强校验：全集团授信总额与各类型授信小计，直接作为融资筹资借款的上限边界，与《BF.3.c 融资预算明细表》、《BF.3.d 融资预算汇总表》以及《BO.CF.M 筹资试算表》筹资借款形成闭环强校验。';

  celldata.push({
    r: noteRow,
    c: 0,
    v: {
      v: noteContent,
      m: noteContent,
      ct: { fa: 'General', t: 'g' },
      ht: 0,
      vt: 0,
      tb: 2,
      fc: '#334155',
      bg: '#f8fafc',
      bd: {
        l: { style: 1, color: '#cbd5e1' },
        r: { style: 1, color: '#cbd5e1' },
        t: { style: 1, color: '#cbd5e1' },
        b: { style: 1, color: '#cbd5e1' }
      }
    }
  });
  merges[`${noteRow}_0`] = { r: noteRow, c: 0, rs: 1, cs: 9 };
  for (let c = 1; c <= 8; c++) {
    celldata.push({
      r: noteRow,
      c,
      v: { v: '', m: '', ct: { fa: 'General', t: 'g' }, bg: '#f8fafc', bd: {
        l: { style: 1, color: '#cbd5e1' },
        r: { style: 1, color: '#cbd5e1' },
        t: { style: 1, color: '#cbd5e1' },
        b: { style: 1, color: '#cbd5e1' }
      } }
    });
  }

  return {
    name: 'BF.3.e 授信预算表',
    color: '#002060',
    index: 'sheet_credit_budget',
    status: 0,
    order: 2,
    hide: 0,
    row: noteRow + 4,
    column: 9,
    defaultRowHeight: 28,
    celldata,
    config: {
      rowlen: {
        0: 34,
        1: 36,
        [grandTotalRowIndex]: 32,
        [noteRow]: 95
      },
      columnlen: {
        0: 60,  // 编号
        1: 170, // 融资主体(法人公司)
        2: 140, // 授信单位
        3: 100, // 币种
        4: 180, // 授信类型
        5: 120, // 授信期限
        6: 210, // 上年末剩余授信额度 (万元)
        7: 210, // 本年新增授信额度 (万元)
        8: 160  // 合计
      },
      merge: merges,
      frozen: { type: 'rangeRow', range: { row_focus: 1, column_focus: 0 } }
    }
  };
}


export function buildFinancingBudgetDetailSheet(
  items: FinancingBudgetDetailItem[] = [],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
): any {
  const isConsolidated = org === '集团合并' || org === '全部';
  const displayItems = isConsolidated
    ? items
    : items.filter(it => it.legalEntity === org || !it.legalEntity || org === '甜甜圈集团公司');

  const celldata: any[] = [];
  const merges: Record<string, { r: number; c: number; rs: number; cs: number }> = {};
  const columnlen: Record<number, number> = {
    0: 55,  // 编号
    1: 150, // 融资主体(法人公司)
    2: 90,  // 融资性质
    3: 150, // 融资类型（取值域＝AB.17 融资类型字典）
    4: 135, // 已有期初净额
    5: 85,  // 利率
    6: 95,  // 期限
    7: 105, // 到期时间
    8: 125, // 新增融资金额
    9: 110, // 减少
    10: 110 // 融资费用
  };

  const getColLetter = (colIndex: number): string => {
    let letter = '';
    let temp = colIndex;
    while (temp >= 0) {
      letter = String.fromCharCode((temp % 26) + 65) + letter;
      temp = Math.floor(temp / 26) - 1;
    }
    return letter;
  };

  const setCell = (
    r: number,
    c: number,
    val: any,
    opt?: {
      bg?: string;
      fc?: string;
      bl?: number;
      it?: number;
      ht?: number;
      vt?: number;
      tb?: number;
      fs?: number;
      fmt?: string;
      isNum?: boolean;
      f?: string;
    }
  ) => {
    const isNum = opt?.isNum || typeof val === 'number';
    let ct = { fa: opt?.fmt || 'General', t: isNum ? 'n' : 'g' };
    let m = val !== undefined && val !== null ? String(val) : '';
    if (isNum && typeof val === 'number') {
      if (opt?.fmt === '¥#,##0.00' || opt?.fmt === '#,##0.00') {
        m = val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      } else if (opt?.fmt === '0.00%') {
        m = (val * 100).toFixed(2) + '%';
      }
    }

    celldata.push({
      r,
      c,
      v: {
        v: val,
        m,
        ct,
        bg: opt?.bg || '#ffffff',
        fc: opt?.fc || '#1e293b',
        b: opt?.bl ?? 0,
        it: opt?.it ?? 0,
        ht: opt?.ht ?? (isNum ? 2 : 1),
        vt: opt?.vt ?? 1,
        tb: opt?.tb ?? 2,
        fs: opt?.fs ?? 10,
        ...(opt?.f ? { f: opt.f } : {})
      }
    });
  };

  // 表头主色与样式
  const headerRoyalStyle = {
    bg: '#002f6c',
    fc: '#ffffff',
    bl: 1,
    ht: 1,
    vt: 1,
    tb: 2,
    fs: 10
  };

  const headerTotalStyle = {
    bg: '#001e4a',
    fc: '#fef08a',
    bl: 1,
    ht: 1,
    vt: 1,
    tb: 2,
    fs: 10
  };

  // 月度大表头与全站 UI 规范色对齐（#002f6c），确保调研页表头正常识别渲染
  const headerMonthStyle = {
    bg: '#002f6c',
    fc: '#ffffff',
    bl: 1,
    ht: 1,
    vt: 1,
    tb: 2,
    fs: 10
  };

  // -------------------------------------------------------------
  // Row 0 & Row 1: 两行制时间主导表头构建
  // -------------------------------------------------------------
  // 固定列跨行 (rs: 2)
  setCell(0, 0, '编号', headerRoyalStyle);
  merges['0_0'] = { r: 0, c: 0, rs: 2, cs: 1 };

  // 融资主体(法人公司)：资本化利息按该法人归属计入 1604 在建工程（值域 AA.2 法人组织架构）
  setCell(0, 1, '融资主体(法人公司)', headerRoyalStyle);
  merges['0_1'] = { r: 0, c: 1, rs: 2, cs: 1 };

  setCell(0, 2, '融资性质', headerRoyalStyle);
  merges['0_2'] = { r: 0, c: 2, rs: 2, cs: 1 };

  setCell(0, 3, '融资类型', headerRoyalStyle);
  merges['0_3'] = { r: 0, c: 3, rs: 2, cs: 1 };

  // 融资信息分组 (cs: 4)
  setCell(0, 4, '融资信息', headerRoyalStyle);
  merges['0_4'] = { r: 0, c: 4, rs: 1, cs: 4 };

  setCell(1, 4, '已有期初净额', headerRoyalStyle);
  setCell(1, 5, '利率', headerRoyalStyle);
  setCell(1, 6, '期限', headerRoyalStyle);
  setCell(1, 7, '到期时间', headerRoyalStyle);

  // 固定数据列跨行
  setCell(0, 8, '新增融资金额', headerRoyalStyle);
  merges['0_8'] = { r: 0, c: 8, rs: 2, cs: 1 };

  setCell(0, 9, '减少', headerRoyalStyle);
  merges['0_9'] = { r: 0, c: 9, rs: 2, cs: 1 };

  setCell(0, 10, '融资费用', headerRoyalStyle);
  merges['0_10'] = { r: 0, c: 10, rs: 2, cs: 1 };

  // 全年合计分组 (Col 11 ~ 13, cs: 3)
  setCell(0, 11, '【全年合计】', headerTotalStyle);
  merges['0_11'] = { r: 0, c: 11, rs: 1, cs: 3 };
  columnlen[11] = 125;
  columnlen[12] = 130;
  columnlen[13] = 130;

  setCell(1, 11, '融资费用类型', headerTotalStyle);
  setCell(1, 12, '应付利息合计', headerTotalStyle);
  setCell(1, 13, '实付利息合计', headerTotalStyle);

  // 1-12月按月分组展开 (各月 cs: 3)
  for (let m = 1; m <= 12; m++) {
    const startC = 14 + (m - 1) * 3;
    setCell(0, startC, `【${m}月】`, headerMonthStyle);
    merges[`0_${startC}`] = { r: 0, c: startC, rs: 1, cs: 3 };

    columnlen[startC] = 115;
    columnlen[startC + 1] = 120;
    columnlen[startC + 2] = 120;

    setCell(1, startC, '融资费用类型', headerMonthStyle);
    setCell(1, startC + 1, '应付利息', headerMonthStyle);
    setCell(1, startC + 2, '实付利息', headerMonthStyle);
  }

  const notesCol = 14 + 12 * 3; // Col 50
  columnlen[notesCol] = 220;
  setCell(0, notesCol, '备注', headerRoyalStyle);
  merges[`0_${notesCol}`] = { r: 0, c: notesCol, rs: 2, cs: 1 };

  // -------------------------------------------------------------
  // Row 2: 编制说明与三表勾稽指引行 (Guide Row)
  // -------------------------------------------------------------
  const guideStyle = {
    bg: '#f8fafc',
    fc: '#475569',
    it: 1,
    ht: 1,
    vt: 1,
    tb: 2,
    fs: 9
  };

  setCell(2, 0, '1', guideStyle);
  setCell(2, 1, '法人公司', { ...guideStyle, fc: '#1d4ed8', bl: 1 });
  setCell(2, 2, '已有/新增', { ...guideStyle, fc: '#2563eb', bl: 1 });
  setCell(2, 3, '按 AB.17 字典下拉\n一级：XYZ-01 银行借款 / XYZ-07 债券融资\n二级：XYZ-0103 流动贷款 / XYZ-0101 银行长期贷款\n（内部借款 XYZ-16 不在本表编制，见 BF.3.f）', guideStyle);
  setCell(2, 4, '已有借款净额\n(上年末余额)', { ...guideStyle, fc: '#047857', bl: 1 });
  setCell(2, 5, '手工填写', guideStyle);
  setCell(2, 6, '长期/1年到期', guideStyle);
  setCell(2, 7, '手工填写', guideStyle);
  setCell(2, 8, '手工填写', guideStyle);
  setCell(2, 9, '手工填写', guideStyle);
  setCell(2, 10, '手工填写', guideStyle);

  setCell(2, 11, '下拉框:\n费用化/资本化', { ...guideStyle, fc: '#b45309', bl: 1 });
  setCell(2, 12, '(按月计提)\n应付未付利息', { ...guideStyle, fc: '#b45309', bl: 1 });
  setCell(2, 13, '(按季/按期实付)', { ...guideStyle, fc: '#b45309', bl: 1 });

  for (let m = 1; m <= 12; m++) {
    const startC = 14 + (m - 1) * 3;
    setCell(2, startC, '费用化/资本化', guideStyle);
    setCell(2, startC + 1, '自动/手工计算', guideStyle);
    setCell(2, startC + 2, '自动/手工计算', guideStyle);
  }
  setCell(2, notesCol, '勾稽备查', guideStyle);

  // -------------------------------------------------------------
  // Data Rows (Row 3 ~ N)
  // -------------------------------------------------------------
  displayItems.forEach((item, idx) => {
    const r = idx + 3;
    const excelRow = r + 1; // 1-based row in Excel
    const isEven = idx % 2 === 0;
    const rowBg = isEven ? '#ffffff' : '#f8fafc';

    setCell(r, 0, idx + 1, { bg: rowBg, ht: 1 });
    // 融资主体(法人公司)：优先取明细行法人，未指定时按当前编制法人归属（AA.2 值域）
    setCell(r, 1, item.legalEntity || org || '甜甜圈集团公司', { bg: rowBg, ht: 0, bl: 1 });
    setCell(r, 2, item.financingNature || '已有', { bg: rowBg, bl: 1, fc: item.financingNature === '新增' ? '#2563eb' : '#047857' });
    setCell(r, 3, item.financingType || '', { bg: rowBg, ht: 0, bl: 1 });
    setCell(r, 4, item.openingNetBalance || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
    setCell(r, 5, item.interestRate || 0, { bg: rowBg, fmt: '0.00%', isNum: true });
    setCell(r, 6, item.term || '', { bg: rowBg, ht: 1 });
    setCell(r, 7, item.dueDate || '', { bg: rowBg, ht: 1 });
    setCell(r, 8, item.newFinancingAmount || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
    setCell(r, 9, item.reductionAmount || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
    setCell(r, 10, item.financingFee || 0, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });

    // 收集各月应付利息和实付利息单元格引用，供全年合计自动公式求和
    const payableCells: string[] = [];
    const paidCells: string[] = [];

    for (let m = 1; m <= 12; m++) {
      const startC = 14 + (m - 1) * 3;
      const mKey = `m${m}`;
      const mData = item.months?.[mKey];
      const feeTypeVal = mData?.feeType || item.feeType || '费用化融资费用';
      const payableVal = mData?.interestPayable || 0;
      const paidVal = mData?.interestPaid || 0;

      const payableColLetter = getColLetter(startC + 1);
      const paidColLetter = getColLetter(startC + 2);
      payableCells.push(`${payableColLetter}${excelRow}`);
      paidCells.push(`${paidColLetter}${excelRow}`);

      setCell(r, startC, feeTypeVal, { bg: rowBg, ht: 1, fc: feeTypeVal === '资本化融资费用' ? '#d97706' : '#475569' });
      setCell(r, startC + 1, payableVal, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
      setCell(r, startC + 2, paidVal, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
    }

    // 全年合计列写入
    setCell(r, 11, item.feeType || '费用化融资费用', { bg: '#fef3c7', ht: 1, bl: 1, fc: item.feeType === '资本化融资费用' ? '#d97706' : '#1e293b' });
    setCell(r, 12, item.annualInterestPayable || 0, {
      bg: '#fef3c7',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${payableCells.join(',')})`
    });
    setCell(r, 13, item.annualInterestPaid || 0, {
      bg: '#fef3c7',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${paidCells.join(',')})`
    });

    setCell(r, notesCol, item.notes || '', { bg: rowBg, ht: 0 });
  });

  // -------------------------------------------------------------
  // Bottom Notes Row (底部编制说明与实现要点)
  // -------------------------------------------------------------
  const noteRow = displayItems.length + 5;
  setCell(
    noteRow,
    0,
    '编制说明与实现要点：\n1、融资类型：按 AB.17 融资类型字典下拉选择（编码+业务名称，两级：一级如 XYZ-01 银行借款/XYZ-09 保函，二级如 XYZ-0103 流动贷款/XYZ-0902 履约保函）；XYZ-01～XYZ-15=外部/银行类、XYZ-16～XYZ-20=集团内部类；固定值域字典，不可在编制表内新增值；内部借款（XYZ-16）不在本表编制，见 BF.3.f 内部借款预算表；\n2、根据规则分别自动计算应付利息和实付利息（例如：按月计提应付利息，按季/按期支付实付利息）；\n3、本表按「融资主体(法人公司)」编制，融资主体取 AA.2 法人组织架构；符合资本化条件的基建/大设备专项借款利息按融资主体(法人公司)归属计入 1604 在建工程（增在建工程/减应付利息(2231)或货币资金(1002)），不进入当期财务费用；资本化利息按法人公司分别归集，集团合并时各法人间不互抵；\n4、本表仅编制融资业务计划与利息测算，具体报表科目结转见 A1.4 财务报表项转换规则。',
    {
      bg: '#f8fafc',
      fc: '#475569',
      ht: 0,
      vt: 0,
      fs: 9,
      it: 1
    }
  );
  merges[`${noteRow}_0`] = { r: noteRow, c: 0, rs: 2, cs: notesCol + 1 };

  const totalCols = notesCol + 1;
  const totalRows = Math.max(displayItems.length + 12, 25);

  return {
    name: 'BF.3.c 融资预算明细表',
    color: '#2563eb',
    index: 'sheet_financing_budget_detail',
    status: 0,
    order: 2,
    row: totalRows,
    column: totalCols,
    celldata,
    config: {
      merge: merges,
      rowlen: { 0: 32, 1: 30, 2: 46, [noteRow]: 40, [noteRow + 1]: 40 },
      columnlen,
      frozen: { type: 'rangeBoth', range: { row_focus: 2, column_focus: 4 } }
    }
  };
}


export function buildFinancingBudgetSummarySheet(
  detailItems: FinancingBudgetDetailItem[] = [],
  summaryRows: FinancingSummaryProductRow[] = FINANCING_SUMMARY_PRODUCTS,
  org: string = '甜甜圈集团公司',
  year: string = '2027'
): any {
  const isConsolidated = org === '集团合并' || org === '全部';
  const filteredDetails = isConsolidated
    ? detailItems
    : detailItems.filter(it => it.legalEntity === org || !it.legalEntity || org === '甜甜圈集团公司');

  const celldata: any[] = [];
  const merges: Record<string, { r: number; c: number; rs: number; cs: number }> = {};
  const columnlen: Record<number, number> = {
    0: 55,  // 编号
    1: 150, // 融资主体(法人公司)
    2: 150, // 筹资类型
    3: 180  // 筹资产品
  };

  const getColLetter = (colIndex: number): string => {
    let letter = '';
    let temp = colIndex;
    while (temp >= 0) {
      letter = String.fromCharCode((temp % 26) + 65) + letter;
      temp = Math.floor(temp / 26) - 1;
    }
    return letter;
  };

  const setCell = (
    r: number,
    c: number,
    val: any,
    opt?: {
      bg?: string;
      fc?: string;
      bl?: number;
      it?: number;
      ht?: number;
      vt?: number;
      tb?: number;
      fs?: number;
      fmt?: string;
      isNum?: boolean;
      f?: string;
    }
  ) => {
    const isNum = opt?.isNum || typeof val === 'number';
    let ct = { fa: opt?.fmt || 'General', t: isNum ? 'n' : 'g' };
    let m = val !== undefined && val !== null ? String(val) : '';
    if (isNum && typeof val === 'number') {
      if (opt?.fmt === '¥#,##0.00' || opt?.fmt === '#,##0.00') {
        m = val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      } else if (opt?.fmt === '0.00%') {
        m = (val * 100).toFixed(2) + '%';
      }
    }

    celldata.push({
      r,
      c,
      v: {
        v: val,
        m,
        ct,
        bg: opt?.bg || '#ffffff',
        fc: opt?.fc || '#1e293b',
        b: opt?.bl ?? 0,
        it: opt?.it ?? 0,
        ht: opt?.ht ?? (isNum ? 2 : 1),
        vt: opt?.vt ?? 1,
        tb: opt?.tb ?? 2,
        fs: opt?.fs ?? 10,
        ...(opt?.f ? { f: opt.f } : {})
      }
    });
  };

  const headerRoyalStyle = {
    bg: '#002f6c',
    fc: '#ffffff',
    bl: 1,
    ht: 1,
    vt: 1,
    tb: 2,
    fs: 10
  };

  const headerTotalStyle = {
    bg: '#001e4a',
    fc: '#fef08a',
    bl: 1,
    ht: 1,
    vt: 1,
    tb: 2,
    fs: 10
  };

  // 月度大表头与全站 UI 规范色对齐（#002f6c），确保调研页表头正常识别渲染
  const headerMonthStyle = {
    bg: '#002f6c',
    fc: '#ffffff',
    bl: 1,
    ht: 1,
    vt: 1,
    tb: 2,
    fs: 10
  };

  // -------------------------------------------------------------
  // Row 0 & Row 1: 表头构建 (两行制时间主导)
  // -------------------------------------------------------------
  setCell(0, 0, '编号', headerRoyalStyle);
  merges['0_0'] = { r: 0, c: 0, rs: 2, cs: 1 };

  // 融资主体(法人公司)：汇总维度＝融资主体(法人公司)+筹资类型（值域 AA.2 法人组织架构）
  setCell(0, 1, '融资主体(法人公司)', headerRoyalStyle);
  merges['0_1'] = { r: 0, c: 1, rs: 2, cs: 1 };

  setCell(0, 2, '筹资类型', headerRoyalStyle);
  merges['0_2'] = { r: 0, c: 2, rs: 2, cs: 1 };

  setCell(0, 3, '筹资产品', headerRoyalStyle);
  merges['0_3'] = { r: 0, c: 3, rs: 2, cs: 1 };

  // 全年合计分组 (Col 4 ~ 8, cs: 5)
  setCell(0, 4, '【全年合计】', headerTotalStyle);
  merges['0_4'] = { r: 0, c: 4, rs: 1, cs: 5 };

  columnlen[4] = 135;
  columnlen[5] = 135;
  columnlen[6] = 125;
  columnlen[7] = 125;
  columnlen[8] = 150;

  setCell(1, 4, '当期新增融资总额', headerTotalStyle);
  setCell(1, 5, '当期减少融资总额', headerTotalStyle);
  setCell(1, 6, '资本化融资费用', headerTotalStyle);
  setCell(1, 7, '费用化融资费用', headerTotalStyle);
  setCell(1, 8, '当期流动性重分类金额', headerTotalStyle);

  // 1-12月按月分组展开 (各月 cs: 5)
  for (let m = 1; m <= 12; m++) {
    const startC = 9 + (m - 1) * 5;
    setCell(0, startC, `【${m}月】`, headerMonthStyle);
    merges[`0_${startC}`] = { r: 0, c: startC, rs: 1, cs: 5 };

    columnlen[startC] = 130;
    columnlen[startC + 1] = 130;
    columnlen[startC + 2] = 120;
    columnlen[startC + 3] = 120;
    columnlen[startC + 4] = 145;

    setCell(1, startC, '当期新增融资总额', headerMonthStyle);
    setCell(1, startC + 1, '当期减少融资总额', headerMonthStyle);
    setCell(1, startC + 2, '资本化融资费用', headerMonthStyle);
    setCell(1, startC + 3, '费用化融资费用', headerMonthStyle);
    setCell(1, startC + 4, '当期流动性重分类金额', headerMonthStyle);
  }

  const notesCol = 9 + 12 * 5; // Col 69
  columnlen[notesCol] = 200;
  setCell(0, notesCol, '备注', headerRoyalStyle);
  merges[`0_${notesCol}`] = { r: 0, c: notesCol, rs: 2, cs: 1 };

  // -------------------------------------------------------------
  // Data Rows (Row 2 ~ N): 逐项筹资产品行渲染与跨行合并
  // 基于明细表实时多维查询汇总
  // -------------------------------------------------------------
  summaryRows.forEach((row, idx) => {
    const r = idx + 2;
    const excelRow = r + 1; // 1-based
    const isEven = idx % 2 === 0;
    const rowBg = isEven ? '#ffffff' : '#f8fafc';

    setCell(r, 0, row.seq, { bg: rowBg, ht: 1 });

    // 从明细表中匹配属于该筹资产品的明细行 (支持产品名及类型模糊对应)
    const matchedDetails = filteredDetails.filter(d => {
      if (d.fundingProduct && (d.fundingProduct === row.productName || row.productName.includes(d.fundingProduct))) {
        return true;
      }
      if (d.financingType && (d.financingType === row.productName || row.productName.includes(d.financingType))) {
        return true;
      }
      if (row.category === '银行借款' && (d.financingType === '流动资金借款' || d.financingType === '贷款') && row.productName.includes('贷款')) {
        return true;
      }
      return false;
    });

    // 融资主体(法人公司)：优先取本行指定法人，其次取匹配明细的法人，最后按当前编制法人归属（AA.2 值域）
    const matchedEntity = matchedDetails.map(d => d.legalEntity).filter(Boolean)[0];
    const defaultEntity = !isConsolidated && org ? org : '甜甜圈集团公司';
    setCell(r, 1, row.legalEntity || matchedEntity || defaultEntity, { bg: rowBg, ht: 0, bl: 1 });

    // 筹资类型跨行合并逻辑
    if (row.isCategoryFirst && row.categoryRowSpan && row.categoryRowSpan > 1) {
      setCell(r, 2, row.category, { bg: rowBg, bl: 1, ht: 1, vt: 1 });
      merges[`${r}_2`] = { r, c: 2, rs: row.categoryRowSpan, cs: 1 };
    } else if (row.isCategoryFirst) {
      setCell(r, 2, row.category, { bg: rowBg, bl: 1, ht: 1 });
    }

    setCell(r, 3, row.productName, { bg: rowBg, ht: 0, bl: 1 });

    // 收集各月的单元格列名以供全年合计公式使用
    const monthlyNewCells: string[] = [];
    const monthlyRedeemCells: string[] = [];
    const monthlyCapCells: string[] = [];
    const monthlyExpCells: string[] = [];
    const monthlyReclassCells: string[] = [];

    // 1-12月计算与填入
    for (let m = 1; m <= 12; m++) {
      const startC = 9 + (m - 1) * 5;
      const mKey = `m${m}`;

      let mNew = 0;
      let mRedeem = 0;
      let mCapFee = 0;
      let mExpFee = 0;
      let mReclass = 0;

      matchedDetails.forEach(d => {
        const mData = d.months?.[mKey];
        if (mData) {
          mNew += mData.newFinancing || 0;
          mRedeem += mData.reduction || 0;
          if (mData.feeType === '资本化融资费用' || d.feeType === '资本化融资费用') {
            mCapFee += mData.financingFee || 0;
          } else {
            mExpFee += (mData.financingFee || 0) + (mData.interestPayable || 0);
          }
          mReclass += mData.liquidityReclassification || 0;
        }
      });

      const colNewL = getColLetter(startC);
      const colRedeemL = getColLetter(startC + 1);
      const colCapL = getColLetter(startC + 2);
      const colExpL = getColLetter(startC + 3);
      const colReclassL = getColLetter(startC + 4);

      monthlyNewCells.push(`${colNewL}${excelRow}`);
      monthlyRedeemCells.push(`${colRedeemL}${excelRow}`);
      monthlyCapCells.push(`${colCapL}${excelRow}`);
      monthlyExpCells.push(`${colExpL}${excelRow}`);
      monthlyReclassCells.push(`${colReclassL}${excelRow}`);

      setCell(r, startC, mNew, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
      setCell(r, startC + 1, mRedeem, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
      setCell(r, startC + 2, mCapFee, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
      setCell(r, startC + 3, mExpFee, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
      setCell(r, startC + 4, mReclass, { bg: rowBg, fmt: '¥#,##0.00', isNum: true });
    }

    // 全年合计公式
    let initialAnnualNew = 0;
    let initialAnnualRedeem = 0;
    let initialAnnualCap = 0;
    let initialAnnualExp = 0;
    let initialAnnualReclass = 0;

    matchedDetails.forEach(d => {
      initialAnnualNew += d.newFinancingAmount || 0;
      initialAnnualRedeem += d.reductionAmount || 0;
      if (d.feeType === '资本化融资费用') {
        initialAnnualCap += d.financingFee || 0;
      } else {
        initialAnnualExp += (d.financingFee || 0) + (d.annualInterestPayable || 0);
      }
      initialAnnualReclass += d.annualLiquidityReclassification || 0;
    });

    setCell(r, 4, initialAnnualNew, {
      bg: '#fef3c7',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${monthlyNewCells.join(',')})`
    });
    setCell(r, 5, initialAnnualRedeem, {
      bg: '#fef3c7',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${monthlyRedeemCells.join(',')})`
    });
    setCell(r, 6, initialAnnualCap, {
      bg: '#fef3c7',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${monthlyCapCells.join(',')})`
    });
    setCell(r, 7, initialAnnualExp, {
      bg: '#fef3c7',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${monthlyExpCells.join(',')})`
    });
    setCell(r, 8, initialAnnualReclass, {
      bg: '#fef3c7',
      bl: 1,
      fmt: '¥#,##0.00',
      isNum: true,
      f: `=SUM(${monthlyReclassCells.join(',')})`
    });

    setCell(r, notesCol, row.notes || (matchedDetails.length > 0 ? `关联 ${matchedDetails.length} 笔明细` : '-'), { bg: rowBg, ht: 0 });
  });

  // -------------------------------------------------------------
  // Bottom Notes Row (底部实现说明)
  // -------------------------------------------------------------
  const noteRow = summaryRows.length + 4;
  setCell(
    noteRow,
    0,
    '实现说明与业务要点：\n1、汇总表是基于明细表的查询表；\n2、融资类型来源于资金模块，由系统根据【融资预算明细表】录入的各项借款与融资自动按筹资产品进行多维动态查询与聚合统计；\n3、汇总维度＝「融资主体(法人公司)+筹资类型」，融资主体取 AA.2 法人组织架构，资本化融资费用按融资主体(法人公司)分别归集，集团合并时各法人间不互抵；\n4、自动汇总各月份及全年的新增融资、减少融资、资本化费用、费用化费用与流动性重分类金额；流动性重分类金额按到期日自动识别（依据明细表每笔融资的期限/到期时间判定剩余到期日落入预算年度内的长期借款本金，系统带出、不可手工填），不产生现金流、不改变负债合计，报表落点为 BO.BS 2504 一年内到期的非流动负债 (+) / 2501 长期借款 (−) 同额；\n5、汇总范围不含内部借款（XYZ-16）：内部借款在 BF.3.f 内部借款预算表单独编制、不并入本表汇总，集团合并层按「本方法人 + 对手方法人」配对互抵（见 BF.3.f）。',
    {
      bg: '#f8fafc',
      fc: '#475569',
      ht: 0,
      vt: 0,
      fs: 9,
      it: 1
    }
  );
  merges[`${noteRow}_0`] = { r: noteRow, c: 0, rs: 2, cs: notesCol + 1 };

  const totalCols = notesCol + 1;
  const totalRows = Math.max(summaryRows.length + 10, 30);

  return {
    name: 'BF.3.d 融资预算汇总表',
    color: '#1e40af',
    index: 'sheet_financing_budget_summary',
    status: 0,
    order: 3,
    row: totalRows,
    column: totalCols,
    celldata,
    config: {
      merge: merges,
      rowlen: { 0: 32, 1: 30, [noteRow]: 38, [noteRow + 1]: 38 },
      columnlen,
      frozen: { type: 'rangeBoth', range: { row_focus: 2, column_focus: 4 } }
    }
  };
}


/**
 * BF.3.f 内部借款预算表（集团内部法人之间的借款，融资类型固定 XYZ-16 内部借款）
 * 一行 = 一笔内部借款：方向列（借入/借出）决定分录路由，本方法人 + 对手方法人成对出现；
 * 列序：维度 7 列（借款方向｜本方法人｜对手方法人｜利率｜期限（月）｜到期时间｜期初净额）
 *      + 时间组 13 组（【全年合计】+ 【1月】…【12月】），每组 5 个度量子列
 *        （当月新增｜当月还本｜当月计提利息｜当月实付利息｜融资费用）→ 共 7 + 13×5 = 72 列。
 * 本表不设「融资类型」列（固定 XYZ-16）；外部/银行类融资仍在 BF.3.c 编制。
 */
export function buildInternalBorrowingSheet(
  items: InternalBorrowingItem[] = [],
  org: string = '甜甜圈集团公司',
  _year: string = '2027'
): any {
  const isConsolidated = org === '集团合并' || org === '全部';
  const displayItems = isConsolidated
    ? items
    : items.filter(it => it.legalEntity === org || !it.legalEntity || org === '甜甜圈集团公司');

  const rows: MonthlyBudgetRowSpec[] = displayItems.map(item => {
    const monthlyValues: Record<number, number[]> = {};
    for (let m = 1; m <= 12; m++) {
      const d = item.months?.[`m${m}`];
      monthlyValues[m] = [
        d?.newAmount ?? 0,
        d?.repayment ?? 0,
        d?.interestPayable ?? 0,
        d?.interestPaid ?? 0,
        d?.financingFee ?? 0
      ];
    }
    return {
      dimensions: [
        item.direction || '借入',
        item.legalEntity || org || '甜甜圈集团公司',
        item.counterpartyEntity || '',
        item.interestRate ? `${(item.interestRate * 100).toFixed(2)}%` : '0.00%',
        item.termMonths ?? 0,
        item.maturityDate || '',
        item.openingNetBalance || 0
      ],
      monthlyValues
    };
  });

  return createMonthlyBudgetSheet({
    name: 'BJ.C.f 内部借款预算表',
    order: 4,
    dimensions: [
      { label: '借款方向', width: 90, dropdown: '借入,借出' },
      { label: '本方法人', width: 130, dropdown: SIGNING_ENTITIES.join(',') },
      { label: '对手方法人', width: 130, dropdown: SIGNING_ENTITIES.join(',') },
      { label: '利率', width: 80 },
      { label: '期限（月）', width: 85 },
      { label: '到期时间', width: 105 },
      { label: '期初净额', width: 120 },
    ],
    metrics: [
      { label: '当月新增', width: 95 },
      { label: '当月还本', width: 95 },
      { label: '当月计提利息', width: 95 },
      { label: '当月实付利息', width: 95 },
      { label: '融资费用', width: 95 },
    ],
    rows,
    footerNotes: '编制说明与业务要点：\n1、融资类型固定为 XYZ-16 内部借款（集团内部类），本表不设「融资类型」列；外部/银行类借款请在 BF.3.c 融资预算明细表编制；\n2、借款方向列决定分录路由：借入方对应提款增加 2241.1、还本减少 2241.1、利息计提进 6604.1、利息实付冲 2241.1 现金流归 CF-21；借出方对应放款增加 1221.1 现金流归 CF-22.1、还本冲 1221.1 现金流归 CF-19.2、利息计提（收息）进 6001.2、实收利息收现归 CF-19.2；\n3、集团合并抵销：集团合并层按「本方法人 + 对手方法人」配对：1221.1 ↔ 2241.1 互抵归零，6001.2 ↔ 6604.1 互抵归零，CF-18 ↔ CF-22.1、CF-20/CF-21 ↔ CF-19.2 现金流全额对冲；\n4、本表按本方法人编制，不并入 BF.3.d 外部融资汇总表。'
  });
}


export function buildFinancialInstrumentSheets(
  bankItems: FinancialInstrumentInvestmentItem[] = [],
  nonBankItems: NonBankFinancialInstrumentItem[] = [],
  creditItems: CreditBudgetItem[] = [],
  financingDetailItems: FinancingBudgetDetailItem[] = [],
  org: string = '甜甜圈集团公司',
  year: string = '2027'
) {
  const sheet1 = buildFinancialInstrumentSheet(bankItems, org, year);
  const sheet2 = buildNonBankFinancialInstrumentSheet(nonBankItems, org, year);
  const sheet3 = buildFinancingBudgetDetailSheet(financingDetailItems, org, year);
  const sheet4 = buildFinancingBudgetSummarySheet(financingDetailItems, FINANCING_SUMMARY_PRODUCTS, org, year);
  const sheet5 = buildCreditBudgetSheet(creditItems, org, year);

  sheet1.status = 1;
  sheet1.order = 0;
  sheet2.status = 0;
  sheet2.order = 1;
  sheet3.status = 0;
  sheet3.order = 2;
  sheet4.status = 0;
  sheet4.order = 3;
  sheet5.status = 0;
  sheet5.order = 4;

  return [sheet1, sheet2, sheet3, sheet4, sheet5];
}


/**
 * 股权投资预算 (BJ.C 股权投资预算 - 严格按国资与企业标准表格规范，展开1-12月明细与公式联动)
 */
export function buildEquityInvestmentSheet(
  items: EquityInvestmentItem[] = [],
  _org: string = '甜甜圈集团公司',
  _year: string = '2027'
) {
  const celldata: any[] = [];
  const colCount = 42; // 16 basic + 2 sum + 12 invest months + 12 dividend months

  // Header Colors & Styles matching standard Excel template in screenshot
  const headerStyle = {
    bg: '#002f6c', // Royal Deep Navy Blue as in screenshot
    fc: '#ffffff',
    b: 1,
    ht: 1,
    vt: 1,
    tb: 2, // Text wrap
    bd: {
      l: { style: 1, color: '#4a7bb0' },
      r: { style: 1, color: '#4a7bb0' },
      t: { style: 1, color: '#4a7bb0' },
      b: { style: 1, color: '#4a7bb0' }
    }
  };

  const headerSumStyle = {
    bg: '#001e4a', // Darker Royal Navy for summary columns
    fc: '#ffffff',
    b: 1,
    ht: 1,
    vt: 1,
    tb: 2,
    bd: {
      l: { style: 1, color: '#4a7bb0' },
      r: { style: 1, color: '#4a7bb0' },
      t: { style: 1, color: '#4a7bb0' },
      b: { style: 1, color: '#4a7bb0' }
    }
  };

  const guideStyle = {
    bg: '#f1f5f9',
    fc: '#475569',
    b: 0,
    it: 0,
    ht: 1,
    vt: 1,
    bd: {
      l: { style: 1, color: '#cbd5e1' },
      r: { style: 1, color: '#cbd5e1' },
      t: { style: 1, color: '#cbd5e1' },
      b: { style: 1, color: '#cbd5e1' }
    }
  };

  // Row 0: Group Headers (Level 1 - Time-First Hierarchy)
  const l1Headers: { c: number; v: string; isSum?: boolean }[] = [
    { c: 0, v: '法人公司' },
    { c: 1, v: '被投资企业所属行业' },
    { c: 2, v: '投资对象' },
    { c: 3, v: '投资区域' },
    { c: 4, v: '项目启动时间 (年月)' },
    { c: 5, v: '预计结束时间 (年月)' },
    { c: 6, v: '项目投资总额' },
    { c: 7, v: '己方资本金投入' },
    { c: 8, v: '己方资本金投入' },
    { c: 9, v: '合伙人投入资本' },
    { c: 10, v: '至上年末累计投入' },
    { c: 11, v: '年末' },
    { c: 12, v: '年末' },
    { c: 13, v: '年末' },
    { c: 14, v: '预计每年收益' },
    { c: 15, v: '资本回收周期' },
    // 全年合计 (跨 投资金额、分红/利息 2列)
    { c: 16, v: '【全年合计】', isSum: true },
    { c: 17, v: '【全年合计】', isSum: true },
  ];

  // 各月展开 1月 ~ 12月 (每月跨 投资金额、分红/利息 2列)
  for (let m = 1; m <= 12; m++) {
    const startC = 16 + 2 * m;
    l1Headers.push({ c: startC, v: `${m}月` });
    l1Headers.push({ c: startC + 1, v: `${m}月` });
  }

  l1Headers.forEach(h => {
    celldata.push({
      r: 0,
      c: h.c,
      v: {
        v: h.v,
        m: h.v,
        ct: { fa: 'General', t: 'g' },
        ...(h.isSum ? headerSumStyle : headerStyle)
      }
    });
  });

  // Row 1: Sub Headers (Level 2 - Metric Items under each Time Group)
  const l2Headers: { c: number; v: string; isSum?: boolean }[] = [
    { c: 0, v: '法人公司' },
    { c: 1, v: '被投资企业所属行业' },
    { c: 2, v: '投资对象' },
    { c: 3, v: '投资区域' },
    { c: 4, v: '项目启动时间 (年月)' },
    { c: 5, v: '预计结束时间 (年月)' },
    { c: 6, v: '项目投资总额' },
    { c: 7, v: '己方投资比例' },
    { c: 8, v: '己方出资额' },
    { c: 9, v: '合伙人投入资本' },
    { c: 10, v: '至上年末累计投入' },
    { c: 11, v: '累计投资金额' },
    { c: 12, v: '累计分红/利息' },
    { c: 13, v: '持股比例-股权投' },
    { c: 14, v: '预计每年收益' },
    { c: 15, v: '资本回收周期' },
    // 全年合计下的指标
    { c: 16, v: '投资金额', isSum: true },
    { c: 17, v: '分红/利息收现', isSum: true }
  ];

  // 1月 ~ 12月 下的指标
  for (let m = 1; m <= 12; m++) {
    const startC = 16 + 2 * m;
    l2Headers.push({ c: startC, v: '投资金额' });
    l2Headers.push({ c: startC + 1, v: '分红/利息收现' });
  }

  l2Headers.forEach(h => {
    celldata.push({
      r: 1,
      c: h.c,
      v: {
        v: h.v,
        m: h.v,
        ct: { fa: 'General', t: 'g' },
        ...(h.isSum ? headerSumStyle : headerStyle)
      }
    });
  });

  // Row 2: Guidance Rules Row (填报指引说明)
  const guideTexts: string[] = [
    '下拉选择，值集参照法人组织架构',
    '下拉选择，值集参照国资委规则',
    '手工填写',
    '下拉选择：市内 / 境内市外 / 海外',
    '手工填写',
    '手工填写',
    '手工填写',
    '手工填写',
    '手工填写',
    '手工填写',
    '手工填写',
    '自动计算',
    '自动计算',
    '手工填写',
    '手工填写',
    '自动计算',
    // 全年合计 (2列)
    '自动计算', '自动计算'
  ];

  // 1月 ~ 12月 (每月 2 列)
  for (let m = 1; m <= 12; m++) {
    guideTexts.push('手工填写');
    guideTexts.push('手工填写');
  }

  guideTexts.forEach((g, cIdx) => {
    celldata.push({
      r: 2,
      c: cIdx,
      v: {
        v: g,
        m: g,
        ct: { fa: 'General', t: 'g' },
        ...guideStyle
      }
    });
  });

  // Data rows starting from Row 3 (Excel Row 4)
  items.forEach((item, idx) => {
    const r = idx + 3;
    const excelRow = r + 1;

    // Helper for cell creation
    const setCell = (c: number, val: any, isNum: boolean = false, fmt: string = 'General', f?: string, bg?: string, b: number = 0, align?: number) => {
      const isCalculated = !!f;
      const cell: any = {
        v: val,
        m: isNum && typeof val === 'number'
          ? (fmt.includes('%')
              ? `${(val * 100).toFixed(2)}%`
              : val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }))
          : String(val ?? ''),
        ct: { fa: fmt, t: isNum ? 'n' : 'g' },
        ht: align !== undefined ? align : (isNum ? 2 : 0),
        vt: 1,
        b,
        fc: '#0f172a',
        bg: bg || (isCalculated ? '#eff6ff' : (idx % 2 === 0 ? '#ffffff' : '#f8fafc')),
        bd: {
          l: { style: 1, color: '#e2e8f0' },
          r: { style: 1, color: '#e2e8f0' },
          t: { style: 1, color: '#e2e8f0' },
          b: { style: 1, color: '#e2e8f0' }
        }
      };
      if (f) cell.f = f;
      celldata.push({ r, c, v: cell });
    };

    const shareRatio = (item.ourShareholdingRatio || 40) / (item.ourShareholdingRatio > 1 ? 100 : 1);
    const endEquityRatio = (item.yearEndEquityRatio || item.ourShareholdingRatio || 40) / ((item.yearEndEquityRatio || item.ourShareholdingRatio || 40) > 1 ? 100 : 1);

    // Calculate sum of months for display values
    const invVals = [
      Number(item.investmentMonths?.m1) || 0,
      Number(item.investmentMonths?.m2) || 0,
      Number(item.investmentMonths?.m3) || 0,
      Number(item.investmentMonths?.m4) || 0,
      Number(item.investmentMonths?.m5) || 0,
      Number(item.investmentMonths?.m6) || 0,
      Number(item.investmentMonths?.m7) || 0,
      Number(item.investmentMonths?.m8) || 0,
      Number(item.investmentMonths?.m9) || 0,
      Number(item.investmentMonths?.m10) || 0,
      Number(item.investmentMonths?.m11) || 0,
      Number(item.investmentMonths?.m12) || 0
    ];
    const totalInv = invVals.reduce((a, b) => a + b, 0);

    const divVals = [
      Number(item.dividendMonths?.m1) || 0,
      Number(item.dividendMonths?.m2) || 0,
      Number(item.dividendMonths?.m3) || 0,
      Number(item.dividendMonths?.m4) || 0,
      Number(item.dividendMonths?.m5) || 0,
      Number(item.dividendMonths?.m6) || 0,
      Number(item.dividendMonths?.m7) || 0,
      Number(item.dividendMonths?.m8) || 0,
      Number(item.dividendMonths?.m9) || 0,
      Number(item.dividendMonths?.m10) || 0,
      Number(item.dividendMonths?.m11) || 0,
      Number(item.dividendMonths?.m12) || 0
    ];
    const totalDiv = divVals.reduce((a, b) => a + b, 0);

    // Col 0: 法人公司
    setCell(0, item.legalEntity || '', false, '@', undefined, undefined, 0, 0); // 法人公司
    // Col 1: 被投资企业所属行业
    setCell(1, item.industry || '烘焙与集成电路制造', false, '@', undefined, undefined, 0, 0);
    // Col 2: 投资对象
    setCell(2, item.targetCompany || '上海精芯糖光烘焙材料科技有限公司', false, '@', undefined, undefined, 0, 0);
    // Col 3: 投资区域 (下拉选择: 市内 / 境内市外 / 海外)
    setCell(3, item.region || '境内市外', false, '@', undefined, undefined, 0, 1);
    // Col 4: 项目启动时间 (年月)
    setCell(4, item.startDate || '202701', false, '@', undefined, undefined, 0, 1);
    // Col 5: 预计结束时间 (年月)
    setCell(5, item.endDate || '202702', false, '@', undefined, undefined, 0, 1);
    // Col 6: 项目投资总额
    setCell(6, item.totalProjectInvestment || 2000000, true, '#,##0.00');
    // Col 7: 己方投资比例
    setCell(7, shareRatio, true, '0.00%', undefined, undefined, 0, 2);
    // Col 8: 己方出资额
    setCell(8, item.ourCapitalContribution || 100000, true, '#,##0.00');
    // Col 9: 合伙人投入资本
    setCell(9, item.partnerCapital || 0, true, '#,##0.00');
    // Col 10: 至上年末累计投入
    setCell(10, item.priorYearCumulatedInvestment || 5000000, true, '#,##0.00');
    // Col 11: 累计投资金额 (自动计算: =K{row}+Q{row}) - Q列为全年合计投资金额
    const cumInvestVal = (item.priorYearCumulatedInvestment || 0) + totalInv;
    setCell(11, cumInvestVal, true, '#,##0.00', `=K${excelRow}+Q${excelRow}`, '#eff6ff', 1);
    // Col 12: 累计分红/利息 (自动计算: =R{row}) - R列为全年合计分红
    const cumDivVal = (item.priorYearCumulatedDividend || 0) + totalDiv;
    setCell(12, cumDivVal, true, '#,##0.00', `=R${excelRow}`, '#eff6ff', 1);
    // Col 13: 持股比例-股权投
    setCell(13, endEquityRatio, true, '0.00%', undefined, undefined, 0, 2);
    // Col 14: 预计每年收益
    setCell(14, item.annualReturn || 0, true, '#,##0.00');
    // Col 15: 资本回收周期（公式）
    const paybackPeriod = item.annualReturn ? (item.ourCapitalContribution || 0) / item.annualReturn : 0;
    setCell(15, paybackPeriod, true, '0.0', `=I${excelRow}/O${excelRow}`, '#eff6ff', 1);

    // Col 16: 全年合计 投资金额 (Q列) -> =SUM(S,U,W,Y,AA,AC,AE,AG,AI,AK,AM,AO)
    const invFormula = `=SUM(S${excelRow},U${excelRow},W${excelRow},Y${excelRow},AA${excelRow},AC${excelRow},AE${excelRow},AG${excelRow},AI${excelRow},AK${excelRow},AM${excelRow},AO${excelRow})`;
    setCell(16, totalInv, true, '#,##0.00', invFormula, '#eff6ff', 1);

    // Col 17: 全年合计 分红/利息 (R列) -> =SUM(T,V,X,Z,AB,AD,AF,AH,AJ,AL,AN,AP)
    const divFormula = `=SUM(T${excelRow},V${excelRow},X${excelRow},Z${excelRow},AB${excelRow},AD${excelRow},AF${excelRow},AH${excelRow},AJ${excelRow},AL${excelRow},AN${excelRow},AP${excelRow})`;
    setCell(17, totalDiv, true, '#,##0.00', divFormula, '#eff6ff', 1);

    // 1月 ~ 12月 明细数据填充 (Cols 18 ~ 41)
    for (let m = 1; m <= 12; m++) {
      const startC = 16 + 2 * m;
      // 投资金额
      setCell(startC, invVals[m - 1], true, '#,##0.00');
      // 分红/利息收现
      setCell(startC + 1, divVals[m - 1], true, '#,##0.00');
    }
  });

  // Empty data rows for editing
  const totalRowsSoFar = items.length + 3;
  const extraRows = Math.max(8 - items.length, 3);
  for (let e = 0; e < extraRows; e++) {
    const r = totalRowsSoFar + e;
    for (let c = 0; c < colCount; c++) {
      celldata.push({
        r, c,
        v: {
          v: '', m: '',
          ct: { fa: 'General', t: 'g' },
          bg: '#ffffff',
          bd: {
            l: { style: 1, color: '#f1f5f9' },
            r: { style: 1, color: '#f1f5f9' },
            t: { style: 1, color: '#f1f5f9' },
            b: { style: 1, color: '#f1f5f9' }
          }
        }
      });
    }
  }

  // Bottom Rules & Financial Reconciliation Notes (勾稽规则说明区域)
  const noteRow1 = totalRowsSoFar + extraRows + 1;
  const noteRow2 = noteRow1 + 1;

  // Note 1: 长期股权投资与现金流量表去向说明
  const noteText1 = '1. 若为股权类投资，进资产负债表表项“长期股权投资”，若为长期金融工具，进资产负债表的表项“债权投资”，若为短期金融工具，进资产负债表的表项“交易性金融资产”\n2. 进现金流量表表项“取得子公司及其他营业单位支付的现金净额”或“投资支付的现金”';
  celldata.push({
    r: noteRow1,
    c: 6,
    v: {
      v: noteText1,
      m: noteText1,
      ct: { fa: 'General', t: 'g' },
      ht: 0,
      vt: 0,
      tb: 2, // wrap text
      fc: '#334155',
      bg: '#f8fafc',
      b: 0,
      bd: {
        l: { style: 1, color: '#cbd5e1' },
        r: { style: 1, color: '#cbd5e1' },
        t: { style: 1, color: '#cbd5e1' },
        b: { style: 1, color: '#cbd5e1' }
      }
    }
  });

  // Note 2: 投资收益与分红收现说明
  const noteText2 = '进利润表的表项“投资收益”\n进现金流量表的表项“取得投资收益收到的现金”';
  celldata.push({
    r: noteRow1,
    c: 22,
    v: {
      v: noteText2,
      m: noteText2,
      ct: { fa: 'General', t: 'g' },
      ht: 0,
      vt: 0,
      tb: 2, // wrap text
      fc: '#334155',
      bg: '#f8fafc',
      b: 0,
      bd: {
        l: { style: 1, color: '#cbd5e1' },
        r: { style: 1, color: '#cbd5e1' },
        t: { style: 1, color: '#cbd5e1' },
        b: { style: 1, color: '#cbd5e1' }
      }
    }
  });

  // Data verification (下拉列表配置)
  const dataVerification: Record<string, any> = {};
  const sasacIndustryOptions = SASAC_INDUSTRY_DICT.map(d => d.name).join(',');
  const regionOptions = '市内,境内市外,海外';

  for (let rowIdx = 3; rowIdx <= totalRowsSoFar + extraRows; rowIdx++) {
    // Col 0: 法人公司 下拉列表
    dataVerification[`${rowIdx}_0`] = {
      type: 'dropdown',
      type2: null,
      value1: LEGAL_ENTITIES.map(e => e.name).join(','),
      value2: '',
      checked: false,
      remote: false,
      prohibitInput: false,
      hintShow: false,
      hintText: ''
    };
    // Col 1: 被投资企业所属行业 下拉列表
    dataVerification[`${rowIdx}_1`] = {
      type: 'dropdown',
      type2: null,
      value1: sasacIndustryOptions,
      value2: '',
      checked: false,
      remote: false,
      prohibitInput: false,
      hintShow: false,
      hintText: ''
    };
    // Col 3: 投资区域 下拉列表
    dataVerification[`${rowIdx}_3`] = {
      type: 'dropdown',
      type2: null,
      value1: regionOptions,
      value2: '',
      checked: false,
      remote: false,
      prohibitInput: false,
      hintShow: false,
      hintText: ''
    };
  }

  // Define column length config
  const columnlen: Record<number, number> = {
    0: 160, // 法人公司
    1: 220, // 被投资企业所属行业
    2: 260, // 投资对象
    3: 100, // 投资区域
    4: 110, // 项目启动时间
    5: 110, // 预计结束时间
    6: 130, // 项目投资总额
    7: 100, // 己方投资比例
    8: 120, // 己方出资额
    9: 130, // 合伙人投入资本
    10: 130, // 至上年末累计投入
    11: 130, // 累计投资金额
    12: 130, // 累计分红/利息
    13: 110, // 持股比例-股权投
    14: 120, // 预计每年收益
    15: 120, // 资本回收周期
    16: 120, // 全年合计 投资金额
    17: 110  // 全年合计 分红/利息收现
  };

  // 1月 ~ 12月 各指标列宽
  for (let m = 1; m <= 12; m++) {
    const startC = 16 + 2 * m;
    columnlen[startC] = 105;     // 投资金额
    columnlen[startC + 1] = 105; // 分红/利息收现
  }

  const mergeConfig: Record<string, { r: number; c: number; rs: number; cs: number }> = {
    '0_0': { r: 0, c: 0, rs: 2, cs: 1 },
    '0_1': { r: 0, c: 1, rs: 2, cs: 1 },
    '0_2': { r: 0, c: 2, rs: 2, cs: 1 },
    '0_3': { r: 0, c: 3, rs: 2, cs: 1 },
    '0_4': { r: 0, c: 4, rs: 2, cs: 1 },
    '0_5': { r: 0, c: 5, rs: 2, cs: 1 },
    '0_6': { r: 0, c: 6, rs: 2, cs: 1 },
    '0_7': { r: 0, c: 7, rs: 1, cs: 2 },    // 己方资本金投入 (跨2列)
    '0_9': { r: 0, c: 9, rs: 2, cs: 1 },    // 合伙人投入资本
    '0_10': { r: 0, c: 10, rs: 2, cs: 1 },  // 至上年末累计投入
    '0_11': { r: 0, c: 11, rs: 1, cs: 3 },  // 年末 (跨3列)
    '0_14': { r: 0, c: 14, rs: 2, cs: 1 },  // 预计每年收益
    '0_15': { r: 0, c: 15, rs: 2, cs: 1 },  // 资本回收周期
    '0_16': { r: 0, c: 16, rs: 1, cs: 2 },  // 全年合计 (跨 投资金额 + 分红/利息 2列)
    [`${noteRow1}_6`]: { r: noteRow1, c: 6, rs: 1, cs: 8 },
    [`${noteRow1}_18`]: { r: noteRow1, c: 18, rs: 1, cs: 14 }
  };

  // 1月 ~ 12月 时间分组跨列合并 (每月跨 投资金额 + 分红/利息 2列)
  for (let m = 1; m <= 12; m++) {
    const startC = 16 + 2 * m;
    mergeConfig[`0_${startC}`] = { r: 0, c: startC, rs: 1, cs: 2 };
  }

  return {
    name: 'BF.1 股权投资预算',
    color: '#002060',
    index: 'sheet_equity_investments',
    status: 1,
    order: 0,
    hide: 0,
    row: noteRow2 + 4,
    column: colCount,
    defaultRowHeight: 28,
    celldata,
    dataVerification,
    config: {
      rowlen: {
        0: 32,
        1: 36,
        2: 26,
        [noteRow1]: 85
      },
      columnlen,
      merge: mergeConfig,
      frozen: { type: 'both', range: { row_focus: 2, column_focus: 2 } }
    }
  };
}


export function buildTaxBudgetSheet(
  taxItems: import('../../types').TaxBudgetItem[] = [],
  currentOrg: string = '甜甜圈集团公司',
  budgetYear: number = 2027
) {
  const celldata: any[] = [];
  const merges: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const borderHeader = {
    r: { style: 1, color: '#93c5fd' },
    b: { style: 1, color: '#93c5fd' },
    l: { style: 1, color: '#93c5fd' },
    t: { style: 1, color: '#93c5fd' }
  };

  const borderCell = {
    r: { style: 1, color: '#e2e8f0' },
    b: { style: 1, color: '#e2e8f0' },
    l: { style: 1, color: '#e2e8f0' },
    t: { style: 1, color: '#e2e8f0' }
  };

  const borderSummary = {
    r: { style: 1, color: '#cbd5e1' },
    b: { style: 2, color: '#1e3a8a' },
    l: { style: 1, color: '#cbd5e1' },
    t: { style: 1, color: '#94a3b8' }
  };

  // Helper to safely write cells
  const setCell = (
    r: number,
    c: number,
    val: any,
    opt: {
      bg?: string;
      fc?: string;
      b?: number;
      ht?: number; // 0: left, 1: center, 2: right
      vt?: number;
      fmt?: string;
      f?: string;
      bd?: any;
    } = {}
  ) => {
    const isNum = typeof val === 'number';
    const cell: any = {
      v: val,
      m: isNum ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''),
      ct: { fa: opt.fmt || (isNum ? '¥#,##0.00' : 'General'), t: isNum ? 'n' : 'g' },
      ht: opt.ht !== undefined ? opt.ht : (isNum ? 2 : 1),
      vt: opt.vt !== undefined ? opt.vt : 1,
      b: opt.b || 0,
      bg: opt.bg || '#ffffff',
      fc: opt.fc || '#1e293b',
      bd: opt.bd || borderCell
    };
    if (opt.f) {
      cell.f = opt.f;
    }
    celldata.push({ r, c, v: cell });
  };

  // -------------------------------------------------------------
  // Row 0 & Row 1: Two-row header matching user's image exactly
  // -------------------------------------------------------------

  // Col 0: 序号 (rs: 2)
  setCell(0, 0, '序号', { bg: '#0066cc', fc: '#ffffff', b: 1, ht: 1, bd: borderHeader });
  setCell(1, 0, '', { bg: '#0066cc', fc: '#ffffff', bd: borderHeader });
  merges['0_0'] = { r: 0, c: 0, rs: 2, cs: 1 };

  // Col 1: 预算分类 (rs: 2)
  setCell(0, 1, '预算分类', { bg: '#0066cc', fc: '#ffffff', b: 1, ht: 1, bd: borderHeader });
  setCell(1, 1, '', { bg: '#0066cc', fc: '#ffffff', bd: borderHeader });
  merges['0_1'] = { r: 0, c: 1, rs: 2, cs: 1 };

  // Col 2: 2026年预计数 (rs: 2)
  const priorYearLabel = `${budgetYear - 1}年预计数`;
  setCell(0, 2, priorYearLabel, { bg: '#0066cc', fc: '#ffffff', b: 1, ht: 1, bd: borderHeader });
  setCell(1, 2, '', { bg: '#0066cc', fc: '#ffffff', bd: borderHeader });
  merges['0_2'] = { r: 0, c: 2, rs: 2, cs: 1 };

  // Col 3~4: 全年 (cs: 2) -> [预算计提, 缴纳预算]
  setCell(0, 3, '全年', { bg: '#0052a3', fc: '#ffffff', b: 1, ht: 1, bd: borderHeader });
  setCell(0, 4, '', { bg: '#0052a3', fc: '#ffffff', bd: borderHeader });
  merges['0_3'] = { r: 0, c: 3, rs: 1, cs: 2 };
  setCell(1, 3, '预算计提', { bg: '#e0f2fe', fc: '#0369a1', b: 1, ht: 1, bd: borderHeader });
  setCell(1, 4, '缴纳预算', { bg: '#bae6fd', fc: '#0284c7', b: 1, ht: 1, bd: borderHeader });

  // Col 5~28: 1月 ~ 12月 (各月 cs: 2)
  for (let m = 1; m <= 12; m++) {
    const startCol = 3 + m * 2; // m=1 -> col 5, m=2 -> col 7...
    const monthName = `${m}月`;
    setCell(0, startCol, monthName, { bg: '#0066cc', fc: '#ffffff', b: 1, ht: 1, bd: borderHeader });
    setCell(0, startCol + 1, '', { bg: '#0066cc', fc: '#ffffff', bd: borderHeader });
    merges[`0_${startCol}`] = { r: 0, c: startCol, rs: 1, cs: 2 };

    setCell(1, startCol, '预算计提', { bg: '#f0f9ff', fc: '#0369a1', b: 1, ht: 1, bd: borderHeader });
    setCell(1, startCol + 1, '缴纳预算', { bg: '#e0f2fe', fc: '#0284c7', b: 1, ht: 1, bd: borderHeader });
  }

  // Col 29: 备注 (rs: 2)
  setCell(0, 29, '备注', { bg: '#0066cc', fc: '#ffffff', b: 1, ht: 1, bd: borderHeader });
  setCell(1, 29, '', { bg: '#0066cc', fc: '#ffffff', bd: borderHeader });
  merges['0_29'] = { r: 0, c: 29, rs: 2, cs: 1 };

  // Filter items by currentOrg if not 集团合并
  const entityItems = (currentOrg === '集团合并' || currentOrg === '全部组织')
    ? taxItems
    : taxItems.filter(it => it.entity === currentOrg);

  const fallbackItems = entityItems.length > 0 ? entityItems : taxItems;

  // 城建税/教育费附加计提比率取自 AB.15 税费比率假设表 (ASS-TAX-03 城建7%、ASS-TAX-04 教育3%、ASS-TAX-05 地方教育2%)
  const UMCT_RATE = (TAX_RATE_ASSUMPTIONS.find(p => p.paramCode === 'ASS-TAX-03')?.budgetYearValue ?? 7.0) / 100;
  const EDU_RATE = ((TAX_RATE_ASSUMPTIONS.find(p => p.paramCode === 'ASS-TAX-04')?.budgetYearValue ?? 3.0)
    + (TAX_RATE_ASSUMPTIONS.find(p => p.paramCode === 'ASS-TAX-05')?.budgetYearValue ?? 2.0)) / 100;

  // Track specific row indices for formula calculations
  let currRow = 2;
  let vatRow = 2;
  let vatRebateRow = 3;
  let umctRow = 4;
  let eduRow = 5;
  let propertyRow = 6;
  let landRow = 7;
  let stampRow = 8;
  let otherTaxRow = 9;
  let plTaxSummaryRow = 10;
  let eitRow = 11;
  let cfTaxSummaryRow = 12;

  // Define the standard category structure according to user's image
  const standardCategories = [
    { cat: '增值税', seq: 1, prior: 10000, note: '增值税计提初始值取自附表 BF.4.b 辅助测算结果，允许用户直接手工修改；次月申报缴纳' },
    { cat: '其中: 增值税退税', seq: '其中', prior: '', note: '软件退税及先进制造业增值税加计抵减/即征即退' },
    { cat: '城市维护建设税', seq: 2, prior: '比率取AB.15假设设置', note: '城建税率取AB.15税费比率假设表ASS-TAX-03(市区7%)，以实缴增值税为计税依据' },
    { cat: '教育费附加 (含地方教育费附加)', seq: 3, prior: '比率取AB.15假设设置', note: '比率取AB.15税费比率假设表：教育费附加ASS-TAX-04 3% + 地方教育附加ASS-TAX-05 2% = 5%' },
    { cat: '房产税', seq: 4, prior: 10000, note: '自有房产按原值减除 30% 后的余值 × 1.2% 计征' },
    { cat: '土地使用税', seq: 5, prior: '', note: '土地面积定额计征' },
    { cat: '印花税', seq: 6, prior: 10000, note: '购销合同、产权转移书据按规定税率计缴' },
    { cat: '其他税费', seq: 7, prior: 10000, note: '车船税、环境保护税等' },
    { cat: '税费及附加合计(利润表口径)', isPLSummary: true },
    { cat: '企业所得税', seq: 8, prior: '', note: '利润总额调整后依适用税率(15%/25%)按季预缴' },
    { cat: '各项税费合计(现金流口径)', isCFSummary: true }
  ];

  standardCategories.forEach(itemConfig => {
    const r = currRow;
    const isPLSummary = itemConfig.isPLSummary;
    const isCFSummary = itemConfig.isCFSummary;
    const excelRow = r + 1;

    if (itemConfig.cat === '增值税') vatRow = excelRow;
    if (itemConfig.cat === '其中: 增值税退税') vatRebateRow = excelRow;
    if (itemConfig.cat === '城市维护建设税') umctRow = excelRow;
    if (itemConfig.cat === '教育费附加 (含地方教育费附加)') eduRow = excelRow;
    if (itemConfig.cat === '房产税') propertyRow = excelRow;
    if (itemConfig.cat === '土地使用税') landRow = excelRow;
    if (itemConfig.cat === '印花税') stampRow = excelRow;
    if (itemConfig.cat === '其他税费') otherTaxRow = excelRow;
    if (isPLSummary) plTaxSummaryRow = excelRow;
    if (itemConfig.cat === '企业所得税') eitRow = excelRow;
    if (isCFSummary) cfTaxSummaryRow = excelRow;

    // Find matching mock item if any
    const matched = fallbackItems.find(it => it.category === itemConfig.cat);

    const isSummaryRow = isPLSummary || isCFSummary;
    const rowBg = isPLSummary ? '#eff6ff' : isCFSummary ? '#f0fdf4' : (r % 2 === 0 ? '#fafafa' : '#ffffff');
    const textB = isSummaryRow ? 1 : 0;
    const textFc = isPLSummary ? '#1e40af' : isCFSummary ? '#166534' : '#1e293b';
    const borderToUse = isSummaryRow ? borderSummary : borderCell;

    // Col 0: 序号
    const seqDisplay = isSummaryRow ? '' : String(itemConfig.seq || '');
    setCell(r, 0, seqDisplay, { bg: rowBg, fc: textFc, b: textB, ht: 1, bd: borderToUse });

    // Col 1: 预算分类
    setCell(r, 1, itemConfig.cat, { bg: rowBg, fc: textFc, b: textB, ht: 0, bd: borderToUse });

    // Col 2: 2026年预计数 / 预测数
    let priorVal: any = itemConfig.prior;
    if (matched && matched.priorYearForecast !== undefined) {
      priorVal = matched.priorYearForecast;
    }

    if (itemConfig.cat === '城市维护建设税') {
      const vatMatched = fallbackItems.find(it => it.category === '增值税');
      const vatPrior = typeof vatMatched?.priorYearForecast === 'number' ? vatMatched.priorYearForecast : 10000;
      const umctRate = TAX_RATE_ASSUMPTIONS.find(p => p.paramCode === 'ASS-TAX-03')?.budgetYearValue ?? 7.0; // 取 AB.15 税费比率假设表
      const rate = umctRate / 100;
      const calcVal = Number((vatPrior * rate).toFixed(2));
      const priorFormula = `=C${vatRow}*${rate}`;
      setCell(r, 2, typeof priorVal === 'number' ? priorVal : calcVal, {
        bg: rowBg,
        fc: '#0369a1',
        b: textB,
        ht: 2,
        f: priorFormula,
        fmt: '¥#,##0.00',
        bd: borderToUse
      });
    } else if (itemConfig.cat === '教育费附加 (含地方教育费附加)') {
      const vatMatched = fallbackItems.find(it => it.category === '增值税');
      const vatPrior = typeof vatMatched?.priorYearForecast === 'number' ? vatMatched.priorYearForecast : 10000;
      const eduRate = (TAX_RATE_ASSUMPTIONS.find(p => p.paramCode === 'ASS-TAX-04')?.budgetYearValue ?? 3.0)
        + (TAX_RATE_ASSUMPTIONS.find(p => p.paramCode === 'ASS-TAX-05')?.budgetYearValue ?? 2.0); // 教育3%+地方教育2% 取AB.15
      const rate = eduRate / 100;
      const calcVal = Number((vatPrior * rate).toFixed(2));
      const priorFormula = `=C${vatRow}*${rate}`;
      setCell(r, 2, typeof priorVal === 'number' ? priorVal : calcVal, {
        bg: rowBg,
        fc: '#0369a1',
        b: textB,
        ht: 2,
        f: priorFormula,
        fmt: '¥#,##0.00',
        bd: borderToUse
      });
    } else if (isPLSummary) {
      // 利润表口径小计 2026 预计数 = SUM(C6:C11)
      const plCats = ['城市维护建设税', '教育费附加 (含地方教育费附加)', '房产税', '土地使用税', '印花税', '其他税费'];
      let plPriorSum = 0;
      plCats.forEach(cName => {
        if (cName === '城市维护建设税') {
          const vatMatched = fallbackItems.find(it => it.category === '增值税');
          const vatPrior = typeof vatMatched?.priorYearForecast === 'number' ? vatMatched.priorYearForecast : 10000;
          plPriorSum += vatPrior * UMCT_RATE;
        } else if (cName === '教育费附加 (含地方教育费附加)') {
          const vatMatched = fallbackItems.find(it => it.category === '增值税');
          const vatPrior = typeof vatMatched?.priorYearForecast === 'number' ? vatMatched.priorYearForecast : 10000;
          plPriorSum += vatPrior * EDU_RATE;
        } else {
          const it = fallbackItems.find(x => x.category === cName);
          if (typeof it?.priorYearForecast === 'number') {
            plPriorSum += it.priorYearForecast;
          }
        }
      });
      const priorFormula = `=SUM(C${umctRow}:C${otherTaxRow})`;
      setCell(r, 2, Number(plPriorSum.toFixed(2)), {
        bg: '#dbeafe',
        fc: '#1e40af',
        b: 1,
        ht: 2,
        f: priorFormula,
        fmt: '¥#,##0.00',
        bd: borderToUse
      });
    } else if (isCFSummary) {
      // 现金流口径合计 2026 预计数 = C4 + C12 + C13 (增值税 + 税金及附加合计 + 企业所得税)
      const vatMatched = fallbackItems.find(it => it.category === '增值税');
      const vatPrior = typeof vatMatched?.priorYearForecast === 'number' ? vatMatched.priorYearForecast : 10000;
      const eitMatched = fallbackItems.find(it => it.category === '企业所得税');
      const eitPrior = typeof eitMatched?.priorYearForecast === 'number' ? eitMatched.priorYearForecast : 750;

      const plCats = ['城市维护建设税', '教育费附加 (含地方教育费附加)', '房产税', '土地使用税', '印花税', '其他税费'];
      let plPriorSum = 0;
      plCats.forEach(cName => {
        if (cName === '城市维护建设税') {
          plPriorSum += vatPrior * UMCT_RATE;
        } else if (cName === '教育费附加 (含地方教育费附加)') {
          plPriorSum += vatPrior * EDU_RATE;
        } else {
          const it = fallbackItems.find(x => x.category === cName);
          if (typeof it?.priorYearForecast === 'number') {
            plPriorSum += it.priorYearForecast;
          }
        }
      });
      const totalCfPrior = vatPrior + plPriorSum + eitPrior;
      const priorFormula = `=C${vatRow}+C${plTaxSummaryRow}+C${eitRow}`;
      setCell(r, 2, Number(totalCfPrior.toFixed(2)), {
        bg: '#dcfce7',
        fc: '#166534',
        b: 1,
        ht: 2,
        f: priorFormula,
        fmt: '¥#,##0.00',
        bd: borderToUse
      });
    } else {
      const isPriorNum = typeof priorVal === 'number';
      setCell(r, 2, isPriorNum ? priorVal : (Number(priorVal) || 0), {
        bg: rowBg,
        fc: textFc,
        b: textB,
        ht: 2,
        fmt: '¥#,##0.00',
        bd: borderToUse
      });
    }

    if (itemConfig.cat === '城市维护建设税') {
      // 城市维护建设税: 基于增值税 × 城建税比率(AB.15 ASS-TAX-03) 公式计算，不需要手动填写
      const vatItem = fallbackItems.find(it => it.category === '增值税');
      let sumProv = 0;
      let sumPay = 0;

      for (let m = 1; m <= 12; m++) {
        const provCol = 3 + m * 2;
        const payCol = 4 + m * 2;
        const provColLetter = getExcelCol(provCol);
        const payColLetter = getExcelCol(payCol);

        const vatProv = vatItem?.months?.[m]?.provision || 0;
        const vatPay = vatItem?.months?.[m]?.payment || 0;
        const mProv = Number((vatProv * UMCT_RATE).toFixed(2));
        const mPay = Number((vatPay * UMCT_RATE).toFixed(2));
        sumProv += mProv;
        sumPay += mPay;

        const provFormula = `=${provColLetter}${vatRow}*${UMCT_RATE}`;
        const payFormula = `=${payColLetter}${vatRow}*${UMCT_RATE}`;

        setCell(r, provCol, mProv, { bg: '#f8fafc', fc: '#0369a1', ht: 2, f: provFormula, bd: borderToUse });
        setCell(r, payCol, mPay, { bg: '#f8fafc', fc: '#0284c7', ht: 2, f: payFormula, bd: borderToUse });
      }

      // Col 3 & 4: 全年合计
      const provFormula = `=SUM(F${excelRow},H${excelRow},J${excelRow},L${excelRow},N${excelRow},P${excelRow},R${excelRow},T${excelRow},V${excelRow},X${excelRow},Z${excelRow},AB${excelRow})`;
      const payFormula = `=SUM(G${excelRow},I${excelRow},K${excelRow},M${excelRow},O${excelRow},Q${excelRow},S${excelRow},U${excelRow},W${excelRow},Y${excelRow},AA${excelRow},AC${excelRow})`;
      setCell(r, 3, Number(sumProv.toFixed(2)), { bg: '#f0f9ff', fc: '#0369a1', b: 1, ht: 2, f: provFormula, bd: borderToUse });
      setCell(r, 4, Number(sumPay.toFixed(2)), { bg: '#e0f2fe', fc: '#0284c7', b: 1, ht: 2, f: payFormula, bd: borderToUse });

      // Col 29: 备注
      setCell(r, 29, '实缴增值税 × 城建税率(取自AB.15税费比率假设表ASS-TAX-03，公式自动计算)', { bg: rowBg, fc: '#0284c7', ht: 0, bd: borderToUse });

    } else if (itemConfig.cat === '教育费附加 (含地方教育费附加)') {
      // 教育费附加: 基于增值税 × (教育3%+地方教育2%)比率(AB.15 ASS-TAX-04/05) 公式计算，不需要手动填写
      const vatItem = fallbackItems.find(it => it.category === '增值税');
      let sumProv = 0;
      let sumPay = 0;

      for (let m = 1; m <= 12; m++) {
        const provCol = 3 + m * 2;
        const payCol = 4 + m * 2;
        const provColLetter = getExcelCol(provCol);
        const payColLetter = getExcelCol(payCol);

        const vatProv = vatItem?.months?.[m]?.provision || 0;
        const vatPay = vatItem?.months?.[m]?.payment || 0;
        const mProv = Number((vatProv * EDU_RATE).toFixed(2));
        const mPay = Number((vatPay * EDU_RATE).toFixed(2));
        sumProv += mProv;
        sumPay += mPay;

        const provFormula = `=${provColLetter}${vatRow}*${EDU_RATE}`;
        const payFormula = `=${payColLetter}${vatRow}*${EDU_RATE}`;

        setCell(r, provCol, mProv, { bg: '#f8fafc', fc: '#0369a1', ht: 2, f: provFormula, bd: borderToUse });
        setCell(r, payCol, mPay, { bg: '#f8fafc', fc: '#0284c7', ht: 2, f: payFormula, bd: borderToUse });
      }

      // Col 3 & 4: 全年合计
      const provFormula = `=SUM(F${excelRow},H${excelRow},J${excelRow},L${excelRow},N${excelRow},P${excelRow},R${excelRow},T${excelRow},V${excelRow},X${excelRow},Z${excelRow},AB${excelRow})`;
      const payFormula = `=SUM(G${excelRow},I${excelRow},K${excelRow},M${excelRow},O${excelRow},Q${excelRow},S${excelRow},U${excelRow},W${excelRow},Y${excelRow},AA${excelRow},AC${excelRow})`;
      setCell(r, 3, Number(sumProv.toFixed(2)), { bg: '#f0f9ff', fc: '#0369a1', b: 1, ht: 2, f: provFormula, bd: borderToUse });
      setCell(r, 4, Number(sumPay.toFixed(2)), { bg: '#e0f2fe', fc: '#0284c7', b: 1, ht: 2, f: payFormula, bd: borderToUse });

      // Col 29: 备注
      setCell(r, 29, '实缴增值税 × 教育费附加比率(教育3%+地方教育2%，取自AB.15税费比率假设表ASS-TAX-04/05，公式自动计算)', { bg: rowBg, fc: '#0284c7', ht: 0, bd: borderToUse });

    } else if (isPLSummary) {
      // 利润表口径: 城建 + 教育附加 + 房产 + 土地 + 印花 + 其他 (从 umctRow 到 otherTaxRow)
      const plCategories = ['城市维护建设税', '教育费附加 (含地方教育费附加)', '房产税', '土地使用税', '印花税', '其他税费'];
      let totalAnnualProv = 0;
      let totalAnnualPay = 0;

      // 1~12月各月计提与缴纳 = SUM(umctRow:otherTaxRow)
      for (let m = 1; m <= 12; m++) {
        const provCol = 3 + m * 2;
        const payCol = 4 + m * 2;
        const provColLetter = getExcelCol(provCol);
        const payColLetter = getExcelCol(payCol);

        // Precalculate initial sum for month m
        let mProvSum = 0;
        let mPaySum = 0;
        plCategories.forEach(cName => {
          if (cName === '城市维护建设税') {
            const vatItem = fallbackItems.find(it => it.category === '增值税');
            mProvSum += (vatItem?.months?.[m]?.provision || 0) * UMCT_RATE;
            mPaySum += (vatItem?.months?.[m]?.payment || 0) * UMCT_RATE;
          } else if (cName === '教育费附加 (含地方教育费附加)') {
            const vatItem = fallbackItems.find(it => it.category === '增值税');
            mProvSum += (vatItem?.months?.[m]?.provision || 0) * EDU_RATE;
            mPaySum += (vatItem?.months?.[m]?.payment || 0) * EDU_RATE;
          } else {
            const it = fallbackItems.find(x => x.category === cName);
            mProvSum += it?.months?.[m]?.provision || 0;
            mPaySum += it?.months?.[m]?.payment || 0;
          }
        });

        totalAnnualProv += mProvSum;
        totalAnnualPay += mPaySum;

        const provColFormula = `=SUM(${provColLetter}${umctRow}:${provColLetter}${otherTaxRow})`;
        const payColFormula = `=SUM(${payColLetter}${umctRow}:${payColLetter}${otherTaxRow})`;

        setCell(r, provCol, Number(mProvSum.toFixed(2)), { bg: '#eff6ff', fc: textFc, b: 1, ht: 2, f: provColFormula, bd: borderToUse });
        setCell(r, payCol, Number(mPaySum.toFixed(2)), { bg: '#dbeafe', fc: textFc, b: 1, ht: 2, f: payColFormula, bd: borderToUse });
      }

      // Col 3 & 4: 全年预算计提 & 缴纳
      const provFormula = `=SUM(F${excelRow},H${excelRow},J${excelRow},L${excelRow},N${excelRow},P${excelRow},R${excelRow},T${excelRow},V${excelRow},X${excelRow},Z${excelRow},AB${excelRow})`;
      const payFormula = `=SUM(G${excelRow},I${excelRow},K${excelRow},M${excelRow},O${excelRow},Q${excelRow},S${excelRow},U${excelRow},W${excelRow},Y${excelRow},AA${excelRow},AC${excelRow})`;
      setCell(r, 3, Number(totalAnnualProv.toFixed(2)), { bg: '#dbeafe', fc: textFc, b: 1, ht: 2, f: provFormula, bd: borderToUse });
      setCell(r, 4, Number(totalAnnualPay.toFixed(2)), { bg: '#bfdbfe', fc: textFc, b: 1, ht: 2, f: payFormula, bd: borderToUse });

      // Col 29: 备注
      setCell(r, 29, '进入利润表「税金及附加」科目 = 城建+教育+房产+土地+印花+其他 (系统公式自动汇总)', { bg: rowBg, fc: '#1e40af', b: 1, ht: 0, bd: borderToUse });

    } else if (isCFSummary) {
      // 现金流口径: 各项税费缴纳预算之和 (增值税缴纳 + 城建缴纳 + 教育缴纳 + 房产缴纳 + 土地缴纳 + 印花缴纳 + 其他缴纳 + 所得税缴纳)
      const allCategories = ['增值税', '城市维护建设税', '教育费附加 (含地方教育费附加)', '房产税', '土地使用税', '印花税', '其他税费', '企业所得税'];
      let totalAnnualProv = 0;
      let totalAnnualPay = 0;

      // 各月汇总: 计提汇总与缴纳汇总
      for (let m = 1; m <= 12; m++) {
        const provCol = 3 + m * 2;
        const payCol = 4 + m * 2;
        const provColLetter = getExcelCol(provCol);
        const payColLetter = getExcelCol(payCol);

        let mProvSum = 0;
        let mPaySum = 0;
        allCategories.forEach(cName => {
          if (cName === '城市维护建设税') {
            const vatItem = fallbackItems.find(it => it.category === '增值税');
            mProvSum += (vatItem?.months?.[m]?.provision || 0) * UMCT_RATE;
            mPaySum += (vatItem?.months?.[m]?.payment || 0) * UMCT_RATE;
          } else if (cName === '教育费附加 (含地方教育费附加)') {
            const vatItem = fallbackItems.find(it => it.category === '增值税');
            mProvSum += (vatItem?.months?.[m]?.provision || 0) * EDU_RATE;
            mPaySum += (vatItem?.months?.[m]?.payment || 0) * EDU_RATE;
          } else {
            const it = fallbackItems.find(x => x.category === cName);
            mProvSum += it?.months?.[m]?.provision || 0;
            mPaySum += it?.months?.[m]?.payment || 0;
          }
        });

        totalAnnualProv += mProvSum;
        totalAnnualPay += mPaySum;

        // 各月计提合计 (增值税 + 城建 + 教育 + 房产 + 土地 + 印花 + 其他 + 所得税)
        const monthProvFormula = `=${provColLetter}${vatRow}+${provColLetter}${umctRow}+${provColLetter}${eduRow}+${provColLetter}${propertyRow}+${provColLetter}${landRow}+${provColLetter}${stampRow}+${provColLetter}${otherTaxRow}+${provColLetter}${eitRow}`;
        setCell(r, provCol, Number(mProvSum.toFixed(2)), { bg: '#f0fdf4', fc: textFc, b: 1, ht: 2, f: monthProvFormula, bd: borderToUse });

        // 各月缴纳合计 (增值税实缴 + 城建实缴 + 教育实缴 + 房产实缴 + 土地实缴 + 印花实缴 + 其他实缴 + 所得税实缴)
        const monthPayFormula = `=${payColLetter}${vatRow}+${payColLetter}${umctRow}+${payColLetter}${eduRow}+${payColLetter}${propertyRow}+${payColLetter}${landRow}+${payColLetter}${stampRow}+${payColLetter}${otherTaxRow}+${payColLetter}${eitRow}`;
        setCell(r, payCol, Number(mPaySum.toFixed(2)), { bg: '#dcfce7', fc: textFc, b: 1, ht: 2, f: monthPayFormula, bd: borderToUse });
      }

      // Col 3 & 4: 全年合计
      const provFormula = `=SUM(F${excelRow},H${excelRow},J${excelRow},L${excelRow},N${excelRow},P${excelRow},R${excelRow},T${excelRow},V${excelRow},X${excelRow},Z${excelRow},AB${excelRow})`;
      const payFormula = `=SUM(G${excelRow},I${excelRow},K${excelRow},M${excelRow},O${excelRow},Q${excelRow},S${excelRow},U${excelRow},W${excelRow},Y${excelRow},AA${excelRow},AC${excelRow})`;
      setCell(r, 3, Number(totalAnnualProv.toFixed(2)), { bg: '#dcfce7', fc: textFc, b: 1, ht: 2, f: provFormula, bd: borderToUse });
      setCell(r, 4, Number(totalAnnualPay.toFixed(2)), { bg: '#bbf7d0', fc: textFc, b: 1, ht: 2, f: payFormula, bd: borderToUse });

      // Col 29: 备注
      setCell(r, 29, '进入现金流量表「支付的各项税费」科目 = 增值税+城建+教育+房产+土地+印花+其他+所得税 (系统公式自动汇总)', { bg: rowBg, fc: '#166534', b: 1, ht: 0, bd: borderToUse });

    } else {
      // Standard Data Rows
      // Col 3: 全年预算计提公式
      const provFormula = `=SUM(F${excelRow},H${excelRow},J${excelRow},L${excelRow},N${excelRow},P${excelRow},R${excelRow},T${excelRow},V${excelRow},X${excelRow},Z${excelRow},AB${excelRow})`;
      // Col 4: 全年缴纳预算公式
      const payFormula = `=SUM(G${excelRow},I${excelRow},K${excelRow},M${excelRow},O${excelRow},Q${excelRow},S${excelRow},U${excelRow},W${excelRow},Y${excelRow},AA${excelRow},AC${excelRow})`;

      setCell(r, 3, 0, { bg: '#f0f9ff', fc: '#0369a1', b: 1, ht: 2, f: provFormula, bd: borderToUse });
      setCell(r, 4, 0, { bg: '#e0f2fe', fc: '#0284c7', b: 1, ht: 2, f: payFormula, bd: borderToUse });

      // 1~12月 各月计提与缴纳数值
      for (let m = 1; m <= 12; m++) {
        const provCol = 3 + m * 2;
        const payCol = 4 + m * 2;
        const mDetail = matched?.months?.[m];
        const provVal = mDetail?.provision || 0;
        const payVal = mDetail?.payment || 0;

        setCell(r, provCol, provVal, { bg: rowBg, fc: '#1e293b', ht: 2, bd: borderToUse });
        setCell(r, payCol, payVal, { bg: rowBg, fc: '#1e293b', ht: 2, bd: borderToUse });
      }

      // Col 29: 备注
      const noteText = matched?.notes || itemConfig.note || '';
      setCell(r, 29, noteText, { bg: rowBg, fc: '#64748b', ht: 0, bd: borderToUse });
    }

    currRow++;
  });

  // Helper to convert 0-indexed column number to Excel column letters (A, B, ..., Z, AA, AB, AC, AD)
  function getExcelCol(colIdx: number): string {
    let col = colIdx + 1;
    let s = '';
    while (col > 0) {
      let m = (col - 1) % 26;
      s = String.fromCharCode(65 + m) + s;
      col = Math.floor((col - m) / 26);
    }
    return s;
  }

  // Row heights & column widths
  const columnlen: Record<number, number> = {
    0: 45,   // 序号
    1: 220,  // 预算分类
    2: 130,  // 2026年预测数
    3: 110,  // 全年-计提
    4: 110,  // 全年-缴纳
  };
  for (let c = 5; c <= 28; c++) {
    columnlen[c] = 95; // 1~12月计提与缴纳
  }
  columnlen[29] = 260; // 备注

  const rowlen: Record<number, number> = {
    0: 28,
    1: 28,
    2: 24
  };

  return {
    name: 'BF.4.a 税金及附加预算表',
    color: '#0284c7',
    index: 'sheet_tax_budget',
    status: 1,
    order: 0,
    hide: 0,
    row: currRow + 5,
    column: 30,
    defaultRowHeight: 28,
    celldata,
    config: {
      merge: merges,
      rowlen,
      columnlen,
      frozen: { type: 'both', range: { row_focus: 1, column_focus: 2 } }
    }
  };
}

// ==========================================================================
// BF.4.b 增值税计提预算表（BF.4《税金及附加预算表》之附表）
// --------------------------------------------------------------------------
// 定位：作为税金预算填报的附表，把 BF.4.a 主表「增值税」行由人工填列改为按
//       「销项税额 − 进项税额 ± 留抵结转」的标准测算链条带出。
// 口径：各业务编制表均按不含税口径填报，本表以不含税计税基数 × 适用税率测算税额；
//       增值税按法人公司分别申报缴纳，集团合并时各法人之间不得相互抵减。
// 税率：ASS-TAX-07（13%，整机装备制造与备件销售）、ASS-TAX-09（6%，现代服务/技术服务）。
// 说明：本表为需求梳理用静态表样，示例数据仅用于把测算口径讲清楚，不做精确勾稽。
// ==========================================================================
export function buildVatProvisionSheet(): any {
  const celldata: any[] = [];
  const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};

  const borderHeader = {
    r: { style: 1, color: '#4a7bb0' }, b: { style: 1, color: '#4a7bb0' },
    l: { style: 1, color: '#4a7bb0' }, t: { style: 1, color: '#4a7bb0' }
  };
  const borderCell = {
    r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' },
    l: { style: 1, color: '#e2e8f0' }, t: { style: 1, color: '#e2e8f0' }
  };

  const baseHeaders = ['序号', '测算项目', '计税基数取数来源（不含税口径）', '适用税率'];
  // 度量子列：每个时间组下并列「计税基数(不含税)」与「税额」，供编制人员逐月验算 基数×税率=税额
  const METRICS = ['上游自动取数（基数）', '税额'];
  const N_BASE = baseHeaders.length;                        // 4
  const N_METRICS = METRICS.length;                         // 2
  const COL_SUM = N_BASE;                                   // 4: 【全年合计】组起始列
  const moStart = (m: number) => COL_SUM + N_METRICS * m;   // m=1 -> 6
  const COL_NOTES = moStart(13);                            // 30: 备注
  const TOTAL_COLS = COL_NOTES + 1;                         // 31

  baseHeaders.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bd: borderHeader } });
    celldata.push({ r: 1, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bd: borderHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 2, cs: 1 };
  });

  // 【全年合计】时间组（跨 2 个度量子列）
  celldata.push({ r: 0, c: COL_SUM, v: { v: '【全年合计】', m: '【全年合计】', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader, bd: borderHeader } });
  merge[`0_${COL_SUM}`] = { r: 0, c: COL_SUM, rs: 1, cs: N_METRICS };
  METRICS.forEach((h, i) => {
    celldata.push({ r: 1, c: COL_SUM + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSumHeader, bd: borderHeader } });
  });

  // 1~12 月时间组（各跨 2 个度量子列）
  for (let m = 1; m <= 12; m++) {
    const c = moStart(m);
    const label = `${m}月`;
    celldata.push({ r: 0, c, v: { v: label, m: label, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bd: borderHeader } });
    merge[`0_${c}`] = { r: 0, c, rs: 1, cs: N_METRICS };
    METRICS.forEach((h, i) => {
      celldata.push({ r: 1, c: c + i, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueSubHeader, bd: borderHeader } });
    });
  }

  celldata.push({ r: 0, c: COL_NOTES, v: { v: '备注', m: '备注', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bd: borderHeader } });
  celldata.push({ r: 1, c: COL_NOTES, v: { v: '备注', m: '备注', ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader, bd: borderHeader } });
  merge[`0_${COL_NOTES}`] = { r: 0, c: COL_NOTES, rs: 2, cs: 1 };

  const round1 = (n: number) => Math.round(n * 10) / 10;
  // 示例数据：全年数近似均摊到各月（仅用于说明口径，不做精确勾稽）
  const spread = (total: number): number[] => {
    const per = round1(total / 12);
    const arr = new Array(12).fill(per);
    arr[11] = round1(total - per * 11);
    return arr;
  };
  const sumArr = (a: number[], b: number[]) => a.map((v, i) => round1(v + b[i]));
  const zeros = () => new Array(12).fill(0) as number[];
  const sumOf = (arr: number[]) => round1(arr.reduce((a, b) => a + b, 0));

  // 示例测算：先列不含税计税基数，再按适用税率推算税额（编制人员可逐行验算 基数×税率=税额）；内部交易（关联交易）销项与进项同额同率，单列两行以体现各法人独立申报口径
  const BASE_PRODUCT = 60000;      // 产品与整机装备销售收入（不含税）
  const BASE_SERVICE = 8000;       // 技术服务收入（不含税）
  const BASE_MATERIAL = 20000;     // 物料采购到货额（不含税）
  const BASE_EQUIPMENT = 9000;     // 设备及资本性采购（不含税）
  const BASE_CONSTRUCTION = 12000; // 基建工程验收额（不含税）
  const BASE_EXPENSE = 3000;       // 费用类可抵扣（不含税，手工填报示例）
  const BASE_NONDEDUCT = 500;      // 法定不可抵扣及进项税额转出（不含税，手工填报示例）
  // 内部交易（关联交易）为应税交易：各法人为独立纳税人，卖方/提供方计销项、买方/接受方计进项，同额同率
  const BASE_INTERNAL_GOODS = 2000;    // 内部交易·货物（代采购转移/资产转卖/销售线物料明细内部供应商出料＝BB.1.3.d 出库成本+加成款，不含税，示例）
  const BASE_INTERNAL_SERVICE = 300;   // 内部交易·现代服务（代销/代购服务费＝加成款，不含税，示例）
  const BASE_INTERNAL_LEASE = 500;     // 内部交易·不动产租赁（内部职场租赁，不含税，示例）

  // 月度计税基数（不含税）
  const baseProduct = spread(BASE_PRODUCT);
  const baseService = spread(BASE_SERVICE);
  const baseMaterial = spread(BASE_MATERIAL);
  const baseEquipment = spread(BASE_EQUIPMENT);
  const baseConstruction = spread(BASE_CONSTRUCTION);
  const baseExpense = spread(BASE_EXPENSE);
  const baseNonDeduct = spread(BASE_NONDEDUCT);
  const baseInternalGoods = spread(BASE_INTERNAL_GOODS);
  const baseInternalService = spread(BASE_INTERNAL_SERVICE);
  const baseInternalLease = spread(BASE_INTERNAL_LEASE);
  // 内部交易计税基数＝内部结算额（不含税）：货物 + 服务 + 不动产租赁
  const baseInternal = sumArr(sumArr(baseInternalGoods, baseInternalService), baseInternalLease);

  // 月度税额 = 当月计税基数 × 适用税率
  const outputProduct = baseProduct.map((v) => round1(v * 0.13));
  const outputService = baseService.map((v) => round1(v * 0.06));
  const inputMaterial = baseMaterial.map((v) => round1(v * 0.13));
  const inputEquipment = baseEquipment.map((v) => round1(v * 0.13));
  const inputConstruction = baseConstruction.map((v) => round1(v * 0.09));
  const inputExpense = baseExpense.map((v) => round1(v * 0.06));
  const inputNonDeduct = baseNonDeduct.map((v) => round1(v * 0.06));  // 减项
  // 内部交易：销项＝货物×13% + 服务×6% + 不动产租赁×9%；进项与销项同额同率（集团合并层自然对冲、净影响 0）
  const internalOutput = sumArr(sumArr(baseInternalGoods.map((v) => round1(v * 0.13)), baseInternalService.map((v) => round1(v * 0.06))), baseInternalLease.map((v) => round1(v * 0.09)));
  const internalInput = internalOutput.slice();

  const outputTotal = sumArr(sumArr(outputProduct, outputService), internalOutput);
  const inputTotal = sumArr(sumArr(sumArr(sumArr(inputMaterial, inputEquipment), inputConstruction), inputExpense), internalInput)
    .map((v, i) => round1(v - inputNonDeduct[i]));
  const payable = outputTotal.map((v, i) => round1(v - inputTotal[i]));
  const priorCredit = zeros();      // 示例：各月均处应缴状态，无留抵结转
  const payableVat = payable.map((v, i) => round1(Math.max(0, v - priorCredit[i])));
  const closingCredit = payable.map((v, i) => round1(Math.max(0, priorCredit[i] - v)));
  // 即征即退示例
  const vatRebate = spread(140);
  // 当月计提、次月申报缴纳：1月缴上年12月计提数（示例 270.0），2~12月缴上月计提数
  const actualPayment = payableVat.map((_, i) => (i === 0 ? 270.0 : payableVat[i - 1]));

  interface VatProvisionRow {
    kind: 'group' | 'row';
    label?: string;
    seq?: string;
    item?: string;
    source?: string;
    rate?: string;
    note?: string;
    bases?: number[];      // 月度计税基数（不含税）；合计行与测算行不填
    total?: number;
    months?: number[];
    emphasis?: 'subtotal' | 'key';
  }

  const rows: VatProvisionRow[] = [
    { kind: 'group', label: '一、销项税额（按收入类别 × 适用税率测算）' },
    { kind: 'row', seq: '1', item: '产品与整机装备销售收入', rate: '13%', source: 'BB.1.2.c 财务视角(存量+增量)·预计销售收入(不含税)',
      total: sumOf(outputProduct), months: outputProduct, bases: baseProduct,
      note: '整机装备制造与备件销售适用法定标准税率13%（AB.15 ASS-TAX-07）。基数取 BB.1.2.c 财务视角（已含存量订单与增量填报，不得再叠加 BB.1.1 签约额，否则增量重复计税）。预算口径按确认收入近似替代纳税义务发生时间。' },
    { kind: 'row', seq: '2', item: '技术服务收入', rate: '6%', source: 'BB.1.3.c 财务视角(存量+增量)·确认收入(不含税)',
      total: sumOf(outputService), months: outputService, bases: baseService,
      note: '现代服务/技术服务适用税率6%（AB.15 ASS-TAX-09）；如发生建筑安装类服务收入，按9%（ASS-TAX-10）另行增列。' },
    { kind: 'row', seq: '3', item: '内部交易销项税额（代采购转移/资产转卖/内部职场租赁/销售线内部供应商出料）', rate: '13%/9%/6%', source: 'BB.3.3.D·BB.3.1.D 代采购转移（到货额+加成款）、BJ.C.d 资产转卖（转卖价）、BB.4.2.b 内部职场租赁（内部租金+加成款）、BB.1.3.d 内部供应商出料（出库成本+加成款，货物 13%）：内部结算额(不含税)×适用税率（货物 13%、不动产租赁 9%、代销/代购服务 6%，税率取 AB.15）',
      total: sumOf(internalOutput), months: internalOutput, bases: baseInternal,
      note: '内部交易为应税交易（各法人为独立纳税人）：卖方/提供方计销项、买方/接受方计进项，同额同率；本行与本表「内部交易进项税额」行同额，集团合并层销项与进项自然对冲、对应纳税额测算净影响为 0（各法人单体分别申报、销项与进项不对抵）。' },
    { kind: 'row', seq: '4', item: '销项税额合计', rate: '—',
      source: '＝产品与整机装备销售收入销项税 ＋ 技术服务收入销项税 ＋ 内部交易销项税额（与内部交易进项同额、集团合并层自然对冲）',
      total: sumOf(outputTotal), months: outputTotal, emphasis: 'subtotal',
      note: '销项税额小计；带出至本表「销项减进项差额」行' },

    { kind: 'group', label: '二、进项税额（按采购/费用类别 × 适用税率测算）' },
    { kind: 'row', seq: '5', item: '物料采购进项税额', rate: '13%', source: 'BB.3.3.C 财务视角·到货额(万元，不含税)',
      total: sumOf(inputMaterial), months: inputMaterial, bases: baseMaterial,
      note: '按到货月测算（进项抵扣以取得增值税专用发票并申报认证为前提，预算口径按到货额近似）；小规模纳税人/免税供应商采购不产生可抵扣进项，编制时应从基数中剔除。' },
    { kind: 'row', seq: '6', item: '设备及资本性采购进项税额', rate: '13%', source: 'BB.3.1.C 财务视角·原值(万元，不含税，资产类别=固定资产) ＋ BB.4.3·资产原值(万元，不含税)',
      total: sumOf(inputEquipment), months: inputEquipment, bases: baseEquipment,
      note: '外购设备等固定资产进项按13%一次性全额抵扣。BB.3.1 中资产类别=无形资产的部分按票面税率分列：外购软件产品13%并入本行，技术转让/技术服务类6%并入「费用类可抵扣进项税额」行。' },
    { kind: 'row', seq: '7', item: '基建工程采购进项税额', rate: '9%', source: 'BB.3.2 基建工程采购预算·验收额(不含税)',
      total: sumOf(inputConstruction), months: inputConstruction, bases: baseConstruction,
      note: '建筑服务适用税率9%（AB.15 ASS-TAX-10）；按取得增值税专用发票的工程验收/结算额测算，预付工程款未取得发票前不得抵扣。' },
    { kind: 'row', seq: '8', item: '费用类可抵扣进项税额', rate: '6%/9%/13%', source: '本表手工填报',
      total: sumOf(inputExpense), months: inputExpense, bases: baseExpense,
      note: '由编制人员根据费用预算中可取得增值税专用发票的支出手工填报（含不含税基数与税额，综合税率约6%/9%/13%）。' },
    { kind: 'row', seq: '9', item: '减：不可抵扣进项税额及进项税额转出', rate: '—', source: '本表手工填报',
      total: sumOf(inputNonDeduct), months: inputNonDeduct, bases: baseNonDeduct,
      note: '法定不可抵扣项目（业务招待费、职工福利、贷款利息等）及进项税额转出，由编制人员根据管理实际手工填报；本行为进项减项。' },
    { kind: 'row', seq: '10', item: '内部交易进项税额（与内部交易销项同额对应）', rate: '13%/9%/6%', source: 'BB.3.3.D·BB.3.1.D 代采购转移、BJ.C.d 资产转卖、BB.4.2.b 内部职场租赁、BB.1.3.d 内部供应商出料（出库成本+加成款，货物 13%）：内部结算额(不含税)×适用税率（货物 13%、不动产租赁 9%、代购/代销服务 6%，税率取 AB.15）',
      total: sumOf(internalInput), months: internalInput, bases: baseInternal,
      note: '接受方/买方按取得的内部结算额（不含税）×适用税率计进项，与「内部交易销项税额」行同额同率；集团合并层自然对冲、对应纳税额测算净影响为 0。内部借款（BJ.C.f）利息属贷款服务——借入方取得的贷款服务进项税额不得抵扣，如单独列示应计入「减：不可抵扣进项税额及进项税额转出」行。' },
    { kind: 'row', seq: '11', item: '进项税额合计', rate: '—',
      source: '＝物料采购 ＋ 设备及资本性采购 ＋ 基建工程采购 ＋ 费用类可抵扣 − 不可抵扣及进项税额转出 ＋ 内部交易进项税额（与内部交易销项同额、集团合并层自然对冲）',
      total: sumOf(inputTotal), months: inputTotal, emphasis: 'subtotal',
      note: '进项税额小计（已扣除不可抵扣与转出）' },

    { kind: 'group', label: '三、应纳税额测算' },
    { kind: 'row', seq: '12', item: '销项减进项差额', rate: '—',
      source: '＝销项税额合计 − 进项税额合计',
      total: sumOf(payable), months: payable,
      note: '为正数表示当期需缴纳，为负数表示当期形成留抵（本行可为负，故不称「应纳税额」）' },
    { kind: 'row', seq: '13', item: '上期留抵税额结转', rate: '—',
      source: '1月手工录入（上年末留抵），2~12月取上月「期末留抵税额」（公式滚动）',
      total: sumOf(priorCredit), months: priorCredit,
      note: '1月为期初基准数，由财务人员根据上年末预计留抵手工补填；2~12月由系统自动按上月「期末留抵税额」滚动结转抵扣。留抵税额结转下期继续抵扣，符合条件的先进制造业等可申请增量留抵退税。' },
    { kind: 'row', seq: '14', item: '本期应纳增值税（计提）', rate: '—',
      source: '＝MAX(0, 销项减进项差额 − 上期留抵税额结转)',
      total: sumOf(payableVat), months: payableVat, emphasis: 'key',
      note: '本表为增值税计提辅助测算表；测算结果带入 BF.4.a 主表「增值税」行「预算计提」列作为初始值，但允许用户直接手工修改；并作为 BO.BS 应交税费(2221)计提数据源。内部交易销项与进项同额、集团合并层自然对冲，对本行测算净影响为 0（不影响集团应交税费净额；各法人单体按独立纳税人分别申报、销项与进项不对抵，由 BF.4.a 按法人公司分别申报缴纳）' },
    { kind: 'row', seq: '15', item: '期末留抵税额', rate: '—',
      source: '＝MAX(0, 上期留抵税额结转 − 销项减进项差额)',
      total: sumOf(closingCredit), months: closingCredit,
      note: '期末留抵结转下月抵扣，在 BO.BS 体现为应交税费借方余额（不得与其他税种贷方余额轧差列报）' },

    { kind: 'group', label: '四、税收优惠与申报缴纳' },
    { kind: 'row', seq: '16', item: '增值税即征即退/专项返还', rate: '—',
      source: '本表手工填报',
      total: sumOf(vatRebate), months: vatRebate,
      note: '由编制人员根据软件产品、半导体/集成电路及先进制造业增值税即征即退或专项返还政策手工填报预计数；属先征后退，带出至 BF.4.a「其中:增值税退税」行与 BO.CF 的 CF-02 收到的税费返还。' },
    { kind: 'row', seq: '17', item: '本期实际缴纳增值税', rate: '—',
      source: '＝上月「本期应纳增值税（计提）」（当月计提、次月申报缴纳；1月缴纳上年12月计提数，12月计提数在次年1月缴纳）',
      total: sumOf(actualPayment), months: actualPayment, emphasis: 'key',
      note: '带出至 BF.4.a「增值税」行缴纳列，并作为城市维护建设税(7%)、教育费附加(3%)、地方教育附加(2%)的计税基数——附加税以「实际缴纳的增值税」为基数，不以计提数为基数。即征即退为先征后退，本行不作扣减（否则 CF-07 少缴与 CF-02 收退税重复享受优惠）。' }
  ];

  const numFmt = '¥#,##0.0';
  let r = 2;
  rows.forEach((row) => {
    const rowBg = row.kind === 'group' ? '#e0f2fe' : (r % 2 === 1 ? '#f8fafc' : '#ffffff');
    const setCell = (c: number, val: any, opt: { num?: boolean; bold?: boolean; fc?: string; bg?: string } = {}) => {
      const isNum = typeof val === 'number';
      const cell: any = {
        v: val,
        m: isNum ? val.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : String(val ?? ''),
        ct: { fa: isNum ? numFmt : 'General', t: isNum ? 'n' : 'g' },
        ht: isNum ? 2 : (c === 1 ? 0 : 1),
        vt: 1,
        b: opt.bold ? 1 : 0,
        bg: opt.bg || rowBg,
        fc: opt.fc || '#1e293b',
        bd: borderCell
      };
      celldata.push({ r, c, v: cell });
    };

    if (row.kind === 'group') {
      setCell(0, '', { bg: '#e0f2fe' });
      setCell(1, row.label, { bold: true, fc: '#0369a1', bg: '#e0f2fe' });
      for (let c = 2; c < TOTAL_COLS; c++) setCell(c, '', { bg: '#e0f2fe' });
    } else {
      setCell(0, row.seq ?? '');
      setCell(1, row.item ?? '', { bold: Boolean(row.emphasis) });
      setCell(2, row.source ?? '');
      setCell(3, row.rate ?? '');
      const emBg = row.emphasis ? '#eff6ff' : undefined;
      // 【全年合计】组：计税基数 / 税额
      setCell(COL_SUM, row.bases ? sumOf(row.bases) : '', { bold: true, bg: emBg });
      setCell(COL_SUM + 1, row.total ?? 0, { bold: true, bg: emBg });
      // 1~12 月组：各月计税基数 / 税额
      for (let m = 1; m <= 12; m++) {
        setCell(moStart(m), row.bases ? row.bases[m - 1] : '', { bg: emBg });
        setCell(moStart(m) + 1, (row.months ?? [])[m - 1] ?? 0, { bg: emBg });
      }
      setCell(COL_NOTES, row.note ?? '');
    }
    r += 1;
  });

  const columnlen: Record<number, number> = { 0: 45, 1: 230, 2: 330, 3: 92 };
  columnlen[COL_SUM] = 120; columnlen[COL_SUM + 1] = 105;
  for (let m = 1; m <= 12; m++) { columnlen[moStart(m)] = 112; columnlen[moStart(m) + 1] = 95; }
  columnlen[COL_NOTES] = 320;

  const rowlen: Record<number, number> = { 0: 28, 1: 28 };

  return {
    name: 'BF.4.b 增值税计提预算表',
    color: '#0284c7',
    index: 'sheet_vat_provision',
    status: 1,
    order: 1,
    hide: 0,
    row: r + 2,
    column: TOTAL_COLS,
    defaultRowHeight: 28,
    celldata,
    config: { merge, rowlen, columnlen }
  };
}
