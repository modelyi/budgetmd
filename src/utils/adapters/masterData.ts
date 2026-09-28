import { createFlatDictSheet } from './declarativeSheetBuilder';
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
  OfficeLeaseDiscountRateItem,
  safeMonthlyValue
} from './shared';
import { ASSET_BOOK_DICTS, AssetBookDictItem } from '../../data/assetBookDict';
// XML 文字源（src/data/texts/_chart-of-accounts.xml）：科目说明文字优先读 XML，未登记时回退 TS 主数据。
import { getFormText } from '../xmlTexts';
import { CREDIT_TYPE_DICTS, CreditTypeDictItem } from '../../data/creditTypeDict';
import { FINANCING_TYPE_DICTS, FinancingTypeDictItem } from '../../data/financingTypeDict';

export function buildAdminDepartmentMasterSheet(items: HROrganizationItem[]): object {
  return createFlatDictSheet({
    name: 'AA.5 行政部门主数据字典',
    columns: [
      { label: '部门编码', width: 100 },
      { label: '部门名称', width: 200 },
      { label: '全称', width: 260 },
      { label: '类型', width: 80 },
      { label: '状态', width: 160 },
      { label: '备注', width: 320 },
    ],
    rows: items.map(it => [it.code, it.name, it.fullName, it.type, it.status, it.memo ?? '']),
  });
}


export function buildBudgetProjectMasterDictSheet(items: BudgetProjectMasterItem[]): object {
  return createFlatDictSheet({
    name: 'AA.6 预算项目主数据',
    columns: [
      { label: '项目编码', width: 110 },
      { label: '项目名称', width: 260 },
      { label: '项目性质', width: 100 },
      { label: '项目类型', width: 100 },
      { label: '项目类型编码', width: 120 },
    ],
    rows: items.map(it => [it.code, it.name, it.nature, it.projectType ?? '', it.projectTypeCode ?? '']),
  });
}


export function buildProductCategoryDictSheet(items: import('../../data/productCategoryDict').ProductCategoryDictItem[]): object {
  return createFlatDictSheet({
    name: 'AB.3 产品类别（财务口径）字典',
    columns: [
      { label: '编码', width: 80 },
      { label: '产品类别（财务口径）名', width: 160 },
      { label: '默认收入确认方式', width: 140 },
      { label: '成本率%', width: 80, isNum: true },
      { label: '备注', width: 180 },
      { label: '引用说明', width: 350 },
    ],
    rows: items.map(it => [
      it.code,
      it.name,
      it.defaultRevenueMethod,
      it.costRatePct,
      it.notes,
      'BB.1.3 技术服务收入与成本预算；BB.2.1 生产计划；AM.1 产品类别与收入映射'
    ]),
  });
}


export function buildRevenueMethodDictSheet(items: import('../../data/revenueMethodDict').RevenueMethodDictItem[]): object {
  return createFlatDictSheet({
    name: 'AB.4 收入确认方式字典',
    columns: [
      { label: '编码', width: 80 },
      { label: '方式名', width: 160 },
      { label: '准则分类(时点/时段)', width: 140 },
      { label: '月度分摆逻辑', width: 220 },
      { label: '备注', width: 180 },
      { label: '引用说明', width: 350 },
    ],
    rows: items.map(it => [
      it.code,
      it.name,
      it.recognitionType,
      it.monthlyDistribution,
      it.notes,
      'BB.1.2 存量订单执行；BB.1.3 技术服务收入与成本预算；AM.1 产品类别与收入映射；BO.A.2/BO.A.3 利润表'
    ]),
  });
}


export function buildContractNatureDictSheet(items: import('../../data/contractNatureDict').ContractNatureDictItem[]): object {
  return createFlatDictSheet({
    name: 'AB.5 合同性质字典',
    columns: [
      { label: '编码', width: 80 },
      { label: '性质名称', width: 140 },
      { label: '性质类型', width: 120 },
      { label: '备注', width: 180 },
      { label: '引用说明', width: 350 },
    ],
    rows: items.map(it => [
      it.code,
      it.name,
      it.natureType,
      it.notes,
      'BB.1.1 合同签约额预算表；BB.1.2 软硬件收入与成本预算'
    ]),
  });
}


export function buildSasacIndustryDictSheet(items: import('../../data/sasacIndustryDict').SasacIndustryDictItem[]): object {
  return createFlatDictSheet({
    name: 'AB.2 国资委行业分类字典',
    columns: [
      { label: '编码', width: 80 },
      { label: '行业门类', width: 140 },
      { label: '行业大类', width: 160 },
      { label: '战略新兴产业标识', width: 140 },
      { label: '说明', width: 300 },
    ],
    rows: items.map(it => [
      it.code,
      it.name,
      it.category,
      it.strategicEmerging,
      it.description
    ]),
  });
}


export function buildBudgetProductMasterSheet(items: BudgetProductMasterItem[]): any {
  return createFlatDictSheet({
    name: 'AA.7 预算产品主数据',
    columns: [
      { label: '产品编码', width: 120 },
      { label: '产品名称', width: 200 },
      { label: '规格型号', width: 180 },
      { label: '产品类别（财务口径）', width: 160 },
      { label: '计量单位', width: 90 },
      { label: '备注', width: 260 },
    ],
    rows: items.map(it => [it.code, it.name, it.specModel, it.productCategory, it.unit, it.notes ?? '']),
  });
}


export function buildBudgetPeriodMasterSheets(
  years: BudgetYearItemForSheet[],
  periods: BudgetPeriodItemForSheet[]
): any[] {
  // Sheet 1: 预算年度主数据
  const yearHeaders = [
    '预算年度', '年度全称', '编制性质/类型', '当前基准年度', '年度控制状态',
    '基准结算币种', '编制上报截止日', '年度编制说明与管控目标'
  ];
  const yearCelldata: any[] = [];
  yearHeaders.forEach((h, c) => {
    yearCelldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  years.forEach((yr, rIdx) => {
    const r = rIdx + 1;
    const isCurrent = yr.isCurrent ? '★ 当前生效基准' : '参考/预测';
    const typeLabel = yr.type === 'OFFICIAL' ? '正式预算 (OFFICIAL)' : yr.type === 'FORECAST' ? '滚动预测 (FORECAST)' : '历史归档 (ARCHIVED)';
    const statusLabel = yr.status === 'OPEN' ? '开放编制 (OPEN)' : yr.status === 'CLOSED' ? '已结账归档 (CLOSED)' : '规划中 (PLANNING)';
    const rowBg = yr.isCurrent ? '#f0fdf4' : r % 2 === 0 ? '#ffffff' : '#f8fafc';

    const rowVals = [
      { v: yr.year, isNum: true, fmt: '0' },
      { v: yr.name, isNum: false },
      { v: typeLabel, isNum: false },
      { v: isCurrent, isNum: false, highlight: yr.isCurrent ? '#166534' : undefined },
      { v: statusLabel, isNum: false },
      { v: yr.currency || 'CNY (人民币)', isNum: false },
      { v: yr.submissionDeadline, isNum: false },
      { v: yr.description, isNum: false }
    ];

    rowVals.forEach((cell, c) => {
      yearCelldata.push({
        r, c,
        v: {
          v: cell.v,
          m: String(cell.v),
          ct: cell.isNum ? { fa: cell.fmt || '#,##0', t: 'n' } : { fa: '@', t: 's' },
          bg: rowBg,
          fc: cell.highlight || '#0f172a',
          b: cell.highlight ? 1 : 0,
          ht: cell.isNum ? 2 : (c === 0 || c === 3 ? 1 : 0),
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    });
  });

  const yearSheet = {
    name: 'AA.1.a 预算年度主数据',
    color: '#2563eb',
    index: 'sheet_aa1_years',
    status: 1,
    order: 0,
    hide: 0,
    row: Math.max(years.length + 5, 12),
    column: yearHeaders.length,
    defaultRowHeight: 28,
    celldata: yearCelldata,
    config: {
      rowlen: { 0: 28 },
      columnlen: {
        0: 100, 1: 130, 2: 180, 3: 140, 4: 150, 5: 130, 6: 140, 7: 380
      },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };

  // Sheet 2: 预算期间日历
  const periodHeaders = [
    '期间编码', '所属年度', '月份序号', '期间名称', '所属季度',
    '起始日期', '结束日期', '期间状态', '上报截止日', '数据锁定日', '管控说明与备注'
  ];
  const periodCelldata: any[] = [];
  periodHeaders.forEach((h, c) => {
    periodCelldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  periods.forEach((p, rIdx) => {
    const r = rIdx + 1;
    const statusText = p.status === 'OPEN' ? '开放编制 (OPEN)' : p.status === 'LOCKED' ? '已锁定 (LOCKED)' : p.status === 'CLOSED' ? '已结账 (CLOSED)' : '待开启 (PENDING)';
    const statusColor = p.status === 'OPEN' ? '#166534' : p.status === 'CLOSED' ? '#64748b' : '#b45309';
    const rowBg = p.year === 2027 ? (r % 2 === 0 ? '#f0f9ff' : '#ffffff') : '#f8fafc';

    const rowVals = [
      { v: p.id, isNum: false, align: 1 },
      { v: p.year, isNum: true, fmt: '0', align: 1 },
      { v: `M${p.periodNum < 10 ? '0' + p.periodNum : p.periodNum}`, isNum: false, align: 1 },
      { v: p.periodName, isNum: false, align: 1 },
      { v: p.quarter, isNum: false, align: 1 },
      { v: p.startDate, isNum: false, align: 1 },
      { v: p.endDate, isNum: false, align: 1 },
      { v: statusText, isNum: false, align: 1, fc: statusColor, bold: 1 },
      { v: p.submissionDeadline, isNum: false, align: 1 },
      { v: p.freezeDate, isNum: false, align: 1 },
      { v: p.remarks, isNum: false, align: 0 }
    ];

    rowVals.forEach((cell, c) => {
      periodCelldata.push({
        r, c,
        v: {
          v: cell.v,
          m: String(cell.v),
          ct: cell.isNum ? { fa: cell.fmt || '#,##0', t: 'n' } : { fa: '@', t: 's' },
          bg: rowBg,
          fc: cell.fc || '#0f172a',
          b: cell.bold || 0,
          ht: cell.align !== undefined ? cell.align : (cell.isNum ? 2 : 0),
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    });
  });

  const periodSheet = {
    name: 'AA.1.b 预算期间日历',
    color: '#0284c7',
    index: 'sheet_aa1_periods',
    status: 0,
    order: 1,
    hide: 0,
    row: Math.max(periods.length + 5, 20),
    column: periodHeaders.length,
    defaultRowHeight: 28,
    celldata: periodCelldata,
    config: {
      rowlen: { 0: 28 },
      columnlen: {
        0: 100, 1: 90, 2: 90, 3: 110, 4: 80, 5: 110, 6: 110, 7: 150, 8: 110, 9: 110, 10: 280
      },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };

  return [yearSheet, periodSheet];
}


export function buildFormOverviewRegistrySheet(sheetsByForm: Record<string, string[]> = {}): object {
  const headers = [
    '序号', '表单编码', '表单名称', 'TAB表样名称', '所属大类', '大类说明', '系统Tab标识', '子页签SubTab', '是否参与凭证生成', '表单定位与业务用途',
    '表样锁定', '字段说明锁定', '上下游关系锁定', '凭证生成说明关系锁定'
  ];
  const celldata: any[] = [];
  headers.forEach((h, c) => {
    celldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  let rowIdx = 0;
  BUDGET_FORM_REGISTRY.forEach((form) => {
    const groupName = form.group === 'A' ? 'A.系统设置与基础数据' : form.group === 'BA' ? 'BA.编制前提与假设' : form.group === 'BB' ? 'BB.业务预算编制' : form.group === 'BF' ? 'BF.资金与财务预算' : 'BO.编制汇总与检查';
    const groupDesc = form.group === 'A' ? '组织/科目/期间/主数据字典' : form.group === 'BA' ? '定额标准/宏观假设/费用汇总' : form.group === 'BB' ? '销售/生产/CAPEX/OPEX源编制' : form.group === 'BF' ? '资金/投融资/税金/抵销与调整' : '三表合并/凭证账簿/多维分析';
    const generatesText = form.generatesVoucher ? '★ 参与凭证生成' : '否 (辅助/汇总表)';
    const generatesColor = form.generatesVoucher ? '#166534' : '#64748b';
    // 登记粒度具体到 TAB 表样：一个表单按其真实 sheet 逐行登记；
    // 未提供 sheet 信息时回退为表单级一行，保证不丢表单。
    const formSheets = sheetsByForm[form.code] && sheetsByForm[form.code].length > 0
      ? sheetsByForm[form.code]
      : [form.name];
    formSheets.forEach((sheetName) => {
      rowIdx += 1;
      const r = rowIdx;
      const rowBg = form.generatesVoucher ? '#f0fdf4' : (r % 2 === 0 ? '#f8fafc' : '#ffffff');

      const rowVals = [
        { v: rowIdx, align: 1 },
        { v: form.code, align: 1, bold: 1, fc: '#1d4ed8' },
        { v: form.name, align: 0, bold: 1 },
        { v: sheetName, align: 0, fc: '#0f766e' },
        { v: form.group, align: 1, bold: 1 },
        { v: groupDesc, align: 0 },
        { v: form.tab, align: 1 },
        { v: form.subTab || '-', align: 1 },
        { v: generatesText, align: 1, fc: generatesColor, bold: form.generatesVoucher ? 1 : 0 },
        { v: `${groupName} 下的预算业务单据与控制表单`, align: 0, fc: '#475569' },
        // 锁定状态由业务确认后填写；当前默认均为空，避免将未确认内容误标为锁定。
        { v: '', align: 1 },
        { v: '', align: 1 },
        { v: '', align: 1 },
        { v: '', align: 1 }
      ];

      rowVals.forEach((cell, c) => {
        celldata.push({
          r, c,
          v: {
            v: cell.v,
            m: String(cell.v),
            ct: typeof cell.v === 'number' ? { fa: '#,##0', t: 'n' } : { fa: '@', t: 's' },
            bg: rowBg,
            fc: cell.fc || '#0f172a',
            b: cell.bold || 0,
            ht: cell.align,
            vt: 1,
            bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
          }
        });
      });
    });
  });

  // 表底统计行：影响三表结果（参与凭证生成）的表单数量
  {
    const voucherFormCount = BUDGET_FORM_REGISTRY.filter((f) => f.generatesVoucher === true).length;
    const statRow = rowIdx + 1;
    const statBg = '#fef3c7';
    const statFc = '#92400e';
    const statBd = {
      l: { style: 1, color: '#f59e0b' },
      r: { style: 1, color: '#f59e0b' },
      t: { style: 2, color: '#d97706' },
      b: { style: 2, color: '#d97706' }
    };
    const statRowVals: Array<{ v: string | number; align?: number; bold?: number; fc?: string }> = [
      { v: '∑', align: 1, bold: 1 },
      { v: '', align: 1 },
      { v: '统计：影响三表结果的表单数量', align: 0, bold: 1 },
      { v: `${voucherFormCount} 个`, align: 1, bold: 1, fc: '#b45309' },
      { v: '', align: 1 },
      { v: '', align: 1 },
      { v: '', align: 1 },
      { v: '', align: 1 },
      { v: '', align: 1 },
      { v: '', align: 1 },
      { v: '', align: 1 },
      { v: '', align: 1 },
      { v: '', align: 1 },
      { v: '', align: 1 }
    ];
    statRowVals.forEach((cell, c) => {
      celldata.push({
        r: statRow, c,
        v: {
          v: cell.v,
          m: String(cell.v),
          ct: { fa: '@', t: 's' },
          bg: statBg,
          fc: cell.fc || statFc,
          b: cell.bold || 0,
          ht: cell.align,
          vt: 1,
          bd: statBd
        }
      });
    });
    rowIdx = statRow;
  }

  return {
    name: 'A1.1 表单整体登记簿',
    color: '#1e40af',
    index: 'sheet_aa1_1_form_overview',
    status: 1,
    order: 0,
    hide: 0,
    row: Math.max(rowIdx + 5, 45),
    column: headers.length,
    defaultRowHeight: 28,
    celldata,
    config: {
      rowlen: { 0: 28 },
      columnlen: {
        0: 60, 1: 100, 2: 220, 3: 260, 4: 80, 5: 200, 6: 160, 7: 140, 8: 150, 9: 300,
        10: 100, 11: 110, 12: 120, 13: 170
      },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };
}


export function buildFormColumnRegistrySheet(): object {
  const headers = [
    '序号', '所属表单编码', '所属表单名称', '已登记列编码 (Key)', '列显示名称', '字段类型', '输入/带出方式', '是否必输', '凭证关联映射说明'
  ];
  const celldata: any[] = [];
  headers.forEach((h, c) => {
    celldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  BUDGET_FIELD_REGISTRY.forEach((f, idx) => {
    const r = idx + 1;
    const form = getFormByCode(f.formCode);
    const formName = form ? form.name : f.formCode;
    const isVoucherCol = ['monthlyRevenue', 'monthlyPrepayment', 'monthlyAcceptCollection', 'investmentMonths', 'dividendMonths', 'months'].includes(f.fieldCode);
    const rowBg = isVoucherCol ? '#eef2ff' : (r % 2 === 0 ? '#f8fafc' : '#ffffff');

    const rowVals = [
      { v: idx + 1, align: 1 },
      { v: f.formCode, align: 1, bold: 1, fc: '#1d4ed8' },
      { v: formName, align: 0, bold: 1 },
      { v: f.fieldCode, align: 1, bold: 1, fc: '#4338ca' },
      { v: f.fieldName, align: 0, bold: isVoucherCol ? 1 : 0 },
      { v: f.dataType, align: 1 },
      { v: f.inputMode, align: 1, fc: f.inputMode === '手工' ? '#b45309' : f.inputMode === '公式' ? '#047857' : '#1e40af' },
      { v: f.required ? '是' : '否', align: 1 },
      { v: isVoucherCol ? `★ 自动关联预算凭证 [${f.fieldName}] 列追溯` : '业务维度/明细字段', align: 0, fc: isVoucherCol ? '#1e40af' : '#64748b' }
    ];

    rowVals.forEach((cell, c) => {
      celldata.push({
        r, c,
        v: {
          v: cell.v,
          m: String(cell.v),
          ct: typeof cell.v === 'number' ? { fa: '#,##0', t: 'n' } : { fa: '@', t: 's' },
          bg: rowBg,
          fc: cell.fc || '#0f172a',
          b: cell.bold || 0,
          ht: cell.align,
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    });
  });

  return {
    name: 'A1.2 编制表类列登记簿',
    color: '#0d9488',
    index: 'sheet_aa1_2_column_registry',
    status: 1,
    order: 0,
    hide: 0,
    row: Math.max(BUDGET_FIELD_REGISTRY.length + 5, 50),
    column: headers.length,
    defaultRowHeight: 28,
    celldata,
    config: {
      rowlen: { 0: 28 },
      columnlen: {
        0: 60, 1: 110, 2: 200, 3: 190, 4: 180, 5: 100, 6: 110, 7: 80, 8: 260
      },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };
}


/**
 * A2A 职场租赁预算解决方案（文档式表样）
 * 两行制表头：第 0 行整表标题（跨两列合并）、第 1 行列名「章节｜内容」；每行一个章节，单元格放白话正文。
 * 仅为调研页方案文档展示用：不含金额、公式与示例数据，不参与任何表间取数；
 * config.wrapText / config.colWidths 供渲染层对文档式表样开启自动换行与放宽列宽（其他表样不受影响）。
 */
export function buildLeaseSolutionDocSheet(): object {
  const headers = ['章节', '内容'];
  const celldata: any[] = [];
  const bodyBd = () => ({ r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' }, l: { style: 1, color: '#e2e8f0' }, t: { style: 1, color: '#e2e8f0' } });

  // 第 0 行：整表标题（跨两列合并）
  celldata.push({
    r: 0, c: 0,
    v: { v: 'A2A 职场租赁预算解决方案', m: 'A2A 职场租赁预算解决方案', ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
  });
  // 第 1 行：列名
  headers.forEach((h, c) => {
    celldata.push({
      r: 1, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueSubHeader }
    });
  });

  const rows: [string, string][] = [
    ['1. 一句话结论',
      '把职场租赁做成「一套参数（BAA.6 租赁参数 + AA.9 使用权资产折旧参数）、两张测算表、一个负债与现金流出口 + 折旧统一入口 BB.4.5」：场地与合同只登记一次，按整体租期分流成资本化/费用化；两张测算表只做租赁负债与现金流（负债初始、使用权资产原值、利息、本金偿付），使用权资产折旧与其它新增资产同链路在 BB.4.5 增量资产折旧计算表按月计提、经 BB.4.X.A 归集（剩余年限(月数)=租赁期月数、残值率取 AA.9 默认 0%、启用月=租赁期起始月、原值=租赁负债初始）；内部走关联交易与抵销、外部走对外应付不抵销，三表（PL/BS/CF）直接取数。'],
    ['2. 业务模块与涉及表单（四个模块）',
      '①基础数据：BAA.6.a 场所与出租方类型（内部持有/外部租入）/ b 年度租赁面积与单价（仅内部持有场所：单价列=市场单价，仅供内部 BB.4.2.b 取数；外部租入场所不在此维护）/ c 场所法人比例 / e 租赁折现率（默认取 BF.3 综合融资成本）；\n②租赁登记：内部 BB.4.2.b 内部职场租赁、外部 BB.4.2.a 外部职场租赁（外部租赁的租赁面积与合同单价按对外租赁合同在本表直接录入，不引用 BAA.6.b）；\n③租赁负债与现金流测算：BB.4.2.b.1 内部职场租赁·财务视角、BB.4.2.a.1 外部职场租赁·财务视角（不计提折旧，只出负债初始/使用权资产原值/利息/本金偿付）；\n④折旧与输出：使用权资产折旧在 BB.4.5 增量资产折旧计算表计提、经 BB.4.X.A 归集，输出 BO.PL/BO.BS/BO.CF 三表与 BB.3.X 存货线（在制品「费」腿）。\n前置引用：AA.2 法人、AA.5 部门、AA.6 预算项目、AA.9 资产类别与折旧、BAA.9.b 费用拆分、BAA.11 加成比例。'],
    ['3. 业务流程（端到端七步）',
      '①维护场地（场所、出租方类型、面积、单价、折现率）→②登记合同（内部 BB.4.2.b / 外部 BB.4.2.a，录入租期起止月与价款）→③系统判定（只看整体租期：>12 个月进资本化测算表、≤12 个月费用化直接进费用；开始日判定后不重分类）→④自动测算（生成负债初始、使用权资产原值、利息/本金；折旧改由 BB.4.5 按剩余年限(月数)计提）→⑤结转与结算（折旧按用途进四费、制造用途经在制品「费」腿；利息进财务费用；租金与结算按月付现）→⑥三表取数（PL 折旧与利息、BS 使用权资产净值与租赁负债、CF 本金/利息/租金付现）→⑦合并（内部整体消除、外部不抵销）。'],
    ['4. 表单 ER 关系',
      'BAA.6.a 是场所主数据，出租方类型决定走内部还是外部；BAA.6.b/c/e 按「年度×场所（×公司）」挂在场所下（单价在 BAA.6.b 随面积一并维护、仅内部持有场所）；BB.4.2.b 引用 BAA.6.b/.c/.e 带出面积/占比/单价/折现率，BB.4.2.a 只引用 BAA.6.a 场所与 BAA.6.e 折现率——其租赁面积与合同单价按对外租赁合同在本表直接录入、不引用 BAA.6.b；BB.4.2.b→BB.4.2.b.1、BB.4.2.a→BB.4.2.a.1 是「登记→测算」的一对一（一行资本化合同对应一行测算）；两张登记表与两张测算表（负债与现金流）汇入三表；BB.4.2.b.1 / BB.4.2.a.1 的使用权资产原值汇入 BB.4.5 计提折旧，制造用途折旧经 BB.4.X.A 归集进 BB.3.X 在制品「费」腿；内部租赁另外在 BB.4.2.b 末列登记出租方侧（折旧成本、应收租金余额）。'],
    ['5. 输入与输出（逐表）',
      'BAA.6.a/.b/.c/.e：输入=人工维护，输出→BB.4.2.b 内部职场租赁的面积/占比/单价与两张登记表的折现率（BAA.6.b 仅供内部租赁；外部 BB.4.2.a 的租赁面积与合同单价按对外合同本表录入）；\nBB.4.2.b / BB.4.2.a：输入=内部取 BAA.6 参数、外部取本表按对外合同手工录入的面积与合同单价 + 合同手工登记，输出=月租金（内部含加成款）→ 测算表与费用/收入；\nBB.4.2.b.1 / BB.4.2.a.1：输入=登记表的付款额、租期、折现率与折旧参数（折旧参数取 AA.9 默认账簿的「固定资产-使用权资产」行：方法=年限平均法、剩余年限(月数)=租赁期月数、残值率取账簿默认 0%），输出=租赁负债初始/使用权资产原值/剩余租赁月数/月度利息/月度本金偿付/租赁付款额 → 三表与 BB.4.5（折旧在 BB.4.5 计提：每月折旧额=原值×(1−残值率)÷剩余年限(月数)，经 BB.4.X.A 归集后进四费与存货线）；\nBO.PL/BO.BS/BO.CF：输入=上述折旧/利息/本金/结算，输出=利润表费用与利息、资产负债表使用权资产与租赁负债、现金流量表三类现金流。'],
    ['6. 财务视角：科目与落点（内部 vs 外部）',
      '共同项：使用权资产 1621（按净值列示、不单列 1622）、租赁负债 2602、折旧进 6601/6602/6603 或经在制品「费」腿进存货、利息进 6604.1、本金付现 CF-22.1、利息付现 CF-21、费用化租金付现 CF-08；\n内部多两件：出租方内部租金与加成收入 6001.2、承租方加成支出 6602、内部往来 1221/2241、租金收付 CF-03/CF-08；\n外部：对外应付 2202，无内部往来、无加成。'],
    ['7. 合并报表与抵销',
      '内部：收入↔费用互抵、1221↔2241 对冲归零、1621/2602 整体消除、内部结算现金流互抵；外部：全部保留（对外交易不抵销），单体与合并同额。'],
    ['8. 勾稽与校验（系统自动）',
      '利息+本金 = 当月付款额；年度组 = Σ12 月；卡片「年度租赁付款额」= 登记表该合同全年合计；使用权资产原值 = 租赁负债初始；累计折旧 = 每月折旧额 × 本年折旧月数（下月折）；折旧唯一入口=BB.4.5/BB.4.X.A（内部 BB.4.2.b.1 / 外部 BB.4.2.a.1 只出原值与剩余年限(月数)），BB.4.3 的「资产类别=使用权资产」记录提供原值、用于卡片/统计与 1621 列示（不进 1601 原值），其折旧与其它新增资产同链路经 BB.4.X.A 归集。'],
    ['9. 价值',
      '口径唯一（一套参数、两张测算表、一个折旧入口=BB.4.5）；费用可核（房租/物业直接来自合同，不再按面积估）；报表自动（三表不用手工调）；防重复（折旧只出一次）；内部与外部一眼分清（抵销与不抵销两条线）。'],
    ['10. 前提与风险',
      '前提：BAA.6 场所/面积/单价/折现率（内部租赁）、对外租赁合同上的面积与合同单价（外部租赁，在 BB.4.2.a 本表录入）与合同租期、起止月要录准；\n风险：跨年合同不因剩余租期变短而重分类（只在开始日判定）；基准单价或折现率变更需在 BAA.6 按年度覆盖重算（BAA.6.b 仅内部持有场所）、外部合同单价变更由 BB.4.2.a 按合同更新；短期租赁无判定外的例外简化。'],
  ];

  rows.forEach(([section, content], idx) => {
    const r = idx + 2;
    celldata.push({
      r, c: 0,
      v: { v: section, m: section, ct: { fa: '@', t: 's' }, bg: '#eef2ff', fc: '#1d4ed8', b: 1, ht: 0, vt: 1, tb: 2, bd: bodyBd() }
    });
    celldata.push({
      r, c: 1,
      v: { v: content, m: content, ct: { fa: '@', t: 's' }, bg: '#ffffff', fc: '#0f172a', ht: 0, vt: 1, tb: 2, bd: bodyBd() }
    });
  });

  return {
    name: 'A2A 职场租赁预算解决方案',
    color: '#1d4ed8',
    index: 'a2a_lease_solution_doc',
    status: 1,
    order: 0,
    hide: 0,
    row: rows.length + 4,
    column: headers.length,
    defaultRowHeight: 30,
    celldata,
    config: {
      merge: { '0_0': { r: 0, c: 0, rs: 1, cs: headers.length } },
      rowlen: { 0: 30, 1: 26 },
      columnlen: { 0: 150, 1: 900 },
      // 文档式表样标记：渲染层据此对本表开启单元格自动换行与放宽列宽（opt-in，其他表样不受影响）
      wrapText: true,
      colWidths: ['13%', '87%']
    }
  };
}

/**
 * A2B 销售预算及内部交易处理方案（PPT 风格文档式表样）
 * 两行制表头：第 0 行整表标题（跨两列合并）、第 1 行列名「章节｜内容」；每行一个章节，单元格放白话正文。
 * 仅为调研页方案文档展示用：不含金额、公式与示例数据，不参与任何表间取数；
 * config.wrapText / config.colWidths 供渲染层对文档式表样开启自动换行与放宽列宽（其他表样不受影响）。
 */
export function buildSalesSolutionDocSheet(): object {
  const headers = ['章节', '内容'];
  const celldata: any[] = [];
  const bodyBd = () => ({ r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' }, l: { style: 1, color: '#e2e8f0' }, t: { style: 1, color: '#e2e8f0' } });

  // 第 0 行：整表标题（跨两列合并）
  celldata.push({
    r: 0, c: 0,
    v: { v: 'A2B 销售预算及内部交易处理方案', m: 'A2B 销售预算及内部交易处理方案', ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
  });
  // 第 1 行：列名
  headers.forEach((h, c) => {
    celldata.push({
      r: 1, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueSubHeader }
    });
  });

  const rows: [string, string][] = [
    ['1. 一句话结论',
      '销售预算 = 签约额备查（BB.1.1）+ 软硬件销售（BB.1.2，硬件销售＋软件销售）+ 技术服务（BB.1.3）三条线，收入均按「签约主体（法人公司）」出对外口径；销售订单不再区分内部供应商（内部供货关系不进入销售订单登记）；合同负债 2204、合同资产 1407、预收款项 2203 三行直接手填。'],
    ['2. 业务模块与涉及表单（四个模块）',
      '①签约备查：BB.1.1 合同签约额（A列=合同编码、B列=合同名称、G列=区域、H列=一级部门，仅作预测口径与备查，不进三表）；\n②软硬件销售：BB.1.2.a 软硬件销售填报（存量+增量合并单表）/ BB.1.2.c 财务视角(存量+增量)；\n③技术服务销售：BB.1.3.a~.i（主表 + 物料明细 + 人工明细 + 财务查询）；\n④参数与输出：AB.4 收入确认方式、AA.2 法人组织架构、AA.6 预算项目、AA.7 预算产品 → 输出 BO.PL / BO.BS / BO.CF 三表。\n前置引用：AA.4 客户、AA.5 部门、AA.8 管理单元、AA.9 资产类别（成本侧）、BAA.2/BAA.3/BAA.4 标准成本（成本构成）。'],
    ['3. 业务流程（端到端四步）',
      '①合同签约（BB.1.1 备查登记，不生成凭证）→②销售填报（BB.1.2.a/b、BB.1.3.a/b：收入=销量×单价，预收/验收回款按月填，进 CF-01）→③财务视角合并（BB.1.2.c / BB.1.3.c 存量+增量自动合并、计成本）→④三表取数（PL 6001/6401、BS 1122/1405/1407/2204、CF CF-01）。'],
    ['4. 表单 ER 关系',
      'BB.1.1 签约额 → BB.1.2 / BB.1.3 销售填报（同一合同编码可按产品/机台多行拆分）；AB.4 → 收入确认方式、AA.2 → 签约主体（法人公司）、AA.6/AA.7 → 预算项目/产品；销售填报经财务视角（.c）合并后进三表。'],
    ['5. 输入与输出（逐表）',
      'BB.1.1：输入=合同编码/名称/区域/一级部门 + 签约额，输出→备查（不进三表）；\nBB.1.2.a/.b：输入=销量/单价/预收/验收回款，输出=销售收入（销量×单价）→ 6001.1 / 1122 / CF-01；\nBB.1.3.a/.b：输入=服务收入/预收/验收回款，输出→ 6001.1 / 1122 / CF-01；\nBO.PL/BS/CF：输入=上述取数，输出=利润表/资产负债表/现金流量表。'],
    ['6. 财务视角：科目与落点',
      '对外（签约主体法人）：主营业务收入 6001.1（600101 硬件销售 / 600103 软件销售 / 600105 技术服务）、营业成本 6401.1（按实际生产产品成本结转）、应收账款 1122、CF-01（预收+验收回款按适用税率单点乘税）；\n手工三行：2203 预收款项、2204 合同负债、1407 合同资产（直接在三表手工调整列填报，默认 0）。'],
    ['7. 合并报表与抵销',
      '集团合并层只保留对外收入与真实营业成本；在制品→产成品必须在同一法人公司内部结转，跨法人代工/调拨走 BJ.C 关联交易与内部抵销（BJ.C.a/BJ.C.e 代采购、BJ.C.d 资产转卖、BJ.C.f 内部借款）。'],
    ['8. 勾稽与校验（系统自动）',
      '收入=销量×单价；产品金额/服务金额=成本合计×(1+加成比例)；预收款+验收回款=产品金额（闭环）；预收款=产品金额×预收比例(默认 30%)；CF-01=Σ(预收+验收回款)×(1+适用税率：软硬件 13%、技术服务 6%)；应收账款=销售收入−验收回款。'],
    ['9. 价值',
      '口径唯一（三大主营线极简命名：硬件销售/软件销售/技术服务）；销售订单只认签约主体（法人公司）；三表自动出表。'],
    ['10. 前提与风险',
      '前提：BAA.11 加成比例、AB.4 收入确认方式、AA.2 法人、AA.6/AA.7 项目/产品要录准；\n风险：预收比例 30% 为系统默认值，项目级差异化需另行配置；合同负债/合同资产/预收款项为手工填、不与销售表自动联动。'],
  ];

  rows.forEach(([section, content], idx) => {
    const r = idx + 2;
    celldata.push({
      r, c: 0,
      v: { v: section, m: section, ct: { fa: '@', t: 's' }, bg: '#eef2ff', fc: '#1d4ed8', b: 1, ht: 0, vt: 1, tb: 2, bd: bodyBd() }
    });
    celldata.push({
      r, c: 1,
      v: { v: content, m: content, ct: { fa: '@', t: 's' }, bg: '#ffffff', fc: '#0f172a', ht: 0, vt: 1, tb: 2, bd: bodyBd() }
    });
  });

  return {
    name: 'A2B 销售预算及内部交易处理方案',
    color: '#1d4ed8',
    index: 'a2b_sales_solution_doc',
    status: 1,
    order: 0,
    hide: 0,
    row: rows.length + 4,
    column: headers.length,
    defaultRowHeight: 30,
    celldata,
    config: {
      merge: { '0_0': { r: 0, c: 0, rs: 1, cs: headers.length } },
      rowlen: { 0: 30, 1: 26 },
      columnlen: { 0: 150, 1: 900 },
      wrapText: true,
      colWidths: ['13%', '87%']
    }
  };
}


export function buildLegalEntityMasterSheets(entities: LegalEntity[]): any[] {
  const headers = ['法人编码', '法人名称', '父组织'];
  const celldata: any[] = [];
  headers.forEach((h, c) => {
    celldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  entities.forEach((ent, rIdx) => {
    const r = rIdx + 1;
    const parent = entities.find(e => e.code === ent.parentId);
    const parentLabel = parent ? `${parent.name} (${parent.code})` : (ent.level === 1 ? '（顶级母公司）' : '-');

    const rowBg = ent.level === 1 ? '#fef3c7' : ent.level === 2 ? '#f0fdf4' : '#ffffff';

    const rowVals = [
      { v: ent.code, isNum: false, align: 1, bold: 1, fc: '#1d4ed8' },
      { v: ent.name, isNum: false, align: 0, bold: 1 },
      { v: parentLabel, isNum: false, align: 0 }
    ];

    rowVals.forEach((cell, c) => {
      celldata.push({
        r, c,
        v: {
          v: cell.v,
          m: String(cell.v),
          ct: { fa: '@', t: 's' },
          bg: rowBg,
          fc: cell.fc || '#0f172a',
          b: cell.bold || 0,
          ht: cell.align !== undefined ? cell.align : 0,
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    });
  });

  const entitySheet = {
    name: 'AA.2 法人组织架构主数据',
    color: '#1e40af',
    index: 'sheet_aa2_entities',
    status: 1,
    order: 0,
    hide: 0,
    row: Math.max(entities.length + 5, 16),
    column: headers.length,
    defaultRowHeight: 28,
    celldata,
    config: {
      rowlen: { 0: 28 },
      columnlen: {
        0: 120, 1: 220, 2: 240
      },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };

  return [entitySheet, buildLegalEntityOrgChartSheet(entities)];
}


/**
 * AA.2 法人组织架构图（纯查询 TAB）：按父子层级树形缩进展示集团法人架构。
 * 树形顺序 = 先序遍历（母公司 → 一级子公司 → 二级子公司），缩进用全角空格 + 树线表示层级。
 */
export function buildLegalEntityOrgChartSheet(entities: LegalEntity[]): any {
  const headers = ['法人编码', '法人名称', '法人类别', '组织层级', '说明'];
  const celldata: any[] = [];
  headers.forEach((h, c) => {
    celldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  // 构建父子树（parentId → children）
  const childrenMap: Record<string, LegalEntity[]> = {};
  entities.forEach((e) => {
    const pid = e.parentId ?? 'ROOT';
    (childrenMap[pid] ||= []).push(e);
  });

  // DFS 先序遍历
  const ordered: { ent: LegalEntity; prefix: string }[] = [];
  const dfs = (pid: string | undefined, depth: number) => {
    const kids = childrenMap[pid ?? 'ROOT'] ?? [];
    kids.slice().sort((a, b) => a.code.localeCompare(b.code)).forEach((ent, i) => {
      const isLast = i === kids.length - 1;
      const indent = '　'.repeat(depth);
      const branch = depth === 0 ? '' : (isLast ? '└─ ' : '├─ ');
      ordered.push({ ent, prefix: indent + branch });
      dfs(ent.code, depth + 1);
    });
  };
  dfs(undefined, 0);

  ordered.forEach((item, idx) => {
    const r = idx + 1;
    const ent = item.ent;
    const levelLabel = ent.level === 1 ? '一级（母公司）' : ent.level === 2 ? '二级子公司' : '三级子公司';
    const rowBg = ent.level === 1 ? '#fef3c7' : ent.level === 2 ? '#f0fdf4' : '#ffffff';
    const vals = [
      { v: ent.code, fc: '#1d4ed8', bold: 1, align: 1 },
      { v: item.prefix + ent.name, bold: ent.level <= 2 ? 1 : 0, align: 0 },
      { v: ent.category, align: 0 },
      { v: levelLabel, align: 1 },
      { v: ent.description, align: 0 },
    ];
    vals.forEach((cell, c) => {
      celldata.push({
        r, c,
        v: {
          v: cell.v,
          m: String(cell.v),
          ct: { fa: '@', t: 's' },
          bg: rowBg,
          fc: cell.fc || '#0f172a',
          b: cell.bold || 0,
          ht: cell.align !== undefined ? cell.align : 0,
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    });
  });

  return {
    name: 'AA.2.b 法人组织架构图',
    color: '#1e40af',
    index: 'sheet_aa2_org_chart',
    status: 1,
    order: 1,
    hide: 0,
    row: Math.max(ordered.length + 5, 16),
    column: headers.length,
    defaultRowHeight: 28,
    celldata,
    config: {
      rowlen: { 0: 28 },
      columnlen: {
        0: 100, 1: 280, 2: 120, 3: 130, 4: 320
      }
    }
  };
}


export function buildManagementUnitMasterSheets(units: ManagementUnit[]): any[] {
  const headers = ['序号', '管理单元编码', '管理单元', '关联法人公司', '资产账簿', '备注'];
  const celldata: any[] = [];
  headers.forEach((h, c) => {
    celldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  units.forEach((unit, rIdx) => {
    const r = rIdx + 1;
    const rowBg = rIdx % 2 === 0 ? '#ffffff' : '#f8fafc';

    const rowVals = [
      { v: r, align: 1, isNum: true },
      { v: unit.code || `MU-${String(r).padStart(2, '0')}`, align: 1, bold: 1, fc: '#1d4ed8' },
      { v: unit.name, align: 0, bold: 1 },
      { v: unit.legalEntityName, align: 0, bold: 1, fc: '#047857' },
      { v: unit.assetBook || '', align: 0, bold: 1, fc: '#0d9488' },
      { v: unit.notes || '', align: 0 }
    ];

    rowVals.forEach((cell, c) => {
      celldata.push({
        r, c,
        v: {
          v: cell.v,
          m: String(cell.v),
          ct: cell.isNum ? { fa: '#,##0', t: 'n' } : { fa: '@', t: 's' },
          bg: rowBg,
          fc: cell.fc || '#0f172a',
          b: cell.bold || 0,
          ht: cell.align !== undefined ? cell.align : 0,
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    });
  });

  const maxRows = Math.max(units.length + 15, 25);
  const dataVerification: Record<string, any> = {};

  for (let r = 1; r < maxRows; r++) {
    dataVerification[`${r}_3`] = {
      type: 'dropdown',
      type2: null,
      value1: SIGNING_ENTITIES.join(','),
      value2: '',
      checked: false,
      remote: false,
      prohibitInput: false,
      hintShow: false,
      hintText: '请选择关联法人公司'
    };
  }

  return [{
    name: 'AA.8 管理单元主数据',
    color: '#0d9488',
    index: 'sheet_aa8_management_units',
    status: 1,
    order: 0,
    hide: 0,
    row: maxRows,
    column: headers.length,
    defaultRowHeight: 28,
    celldata,
    config: {
      rowlen: { 0: 30 },
      columnlen: {
        0: 60, 1: 130, 2: 260, 3: 200, 4: 180, 5: 240
      },
      dataVerification,
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  }];
}


// ---------------------------------------------------------------------------
// 科目说明文字源优先：src/data/texts/_chart-of-accounts.xml
// 统一科目主数据（名称/全称/核算说明/准则依据）、科目编码规则（家族名/编码结构/示例/层级定义/依据）
// 与费用明细科目（FY，名称/全称/核算范围说明）的文字统一从 XML 取；
// 未登记 XML、或条目数与 TS 主数据不一致时整体回退 TS（行为与迁移前一致）。
// 迁移：scripts/migrateTextsToXml.ts；逐字校验：scripts/validateTextsXml.ts。
// ---------------------------------------------------------------------------
const XML_CHART_OF_ACCOUNTS_CODE = '_chart-of-accounts';

function accountTextXmlFirst(accounts: UnifiedBudgetAccountItem[]): UnifiedBudgetAccountItem[] {
  const x = getFormText(XML_CHART_OF_ACCOUNTS_CODE)?.accounts ?? [];
  if (x.length === 0 || x.length !== accounts.length) return accounts;
  return accounts.map((a, i) => ({
    ...a,
    name: x[i].name || a.name,
    fullName: x[i].fullName || a.fullName,
    description: x[i].description || a.description,
    accountingStandardRef: x[i].standardRef || a.accountingStandardRef,
  }));
}

function codingRuleTextXmlFirst(rules: BudgetAccountCodingRule[]): BudgetAccountCodingRule[] {
  const x = getFormText(XML_CHART_OF_ACCOUNTS_CODE)?.accountCodingRules ?? [];
  if (x.length === 0 || x.length !== rules.length) return rules;
  return rules.map((r, i) => ({
    ...r,
    familyName: x[i].familyName || r.familyName,
    codePattern: x[i].codePattern || r.codePattern,
    exampleCode: x[i].exampleCode || r.exampleCode,
    description: x[i].description || r.description,
    governingStandards: x[i].governingStandards || r.governingStandards,
    associatedStatements: x[i].associatedStatements ? x[i].associatedStatements.split(' / ') : r.associatedStatements,
  }));
}

function expenseSubjectTextXmlFirst(subjects: ExpenseBudgetSubjectItem[]): ExpenseBudgetSubjectItem[] {
  const x = getFormText(XML_CHART_OF_ACCOUNTS_CODE)?.expenseSubjects ?? [];
  if (x.length === 0 || x.length !== subjects.length) return subjects;
  return subjects.map((it, i) => ({
    ...it,
    subjectName: x[i].name || it.subjectName,
    fullName: x[i].fullName || it.fullName,
    description: x[i].description || it.description,
  }));
}

export function buildUnifiedBudgetSubjectMasterSheets(
  accounts: UnifiedBudgetAccountItem[] = UNIFIED_BUDGET_ACCOUNTS,
  codingRules: BudgetAccountCodingRule[] = BUDGET_ACCOUNT_CODING_RULES,
  expenseSubjects: ExpenseBudgetSubjectItem[] = FIXED_EXPENSE_BUDGET_SUBJECTS
): any[] {
  // 科目说明文字：XML 优先（_chart-of-accounts.xml），未登记时用 TS 主数据
  accounts = accountTextXmlFirst(accounts);
  codingRules = codingRuleTextXmlFirst(codingRules);
  expenseSubjects = expenseSubjectTextXmlFirst(expenseSubjects);

  // Sheet 1: 统一科目总表 (PL/BS/CF)
  const accHeaders = [
    '科目编码', '科目名称', '科目全称', '科目家族', '分类归属',
    '层级', '上级编码', '借贷/流向', '直接列报行', '关联编制源表', '准则与核算说明'
  ];
  const accCelldata: any[] = [];
  accHeaders.forEach((h, c) => {
    accCelldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  accounts.forEach((acc, rIdx) => {
    const r = rIdx + 1;
    const familyColor = acc.family === 'PL' ? '#2563eb' : acc.family === 'BS' ? '#059669' : acc.family === 'CF' ? '#d97706' : '#7c3aed';
    const rowBg = acc.level === 1 ? '#eff6ff' : acc.level === 2 ? '#f8fafc' : '#ffffff';

    const rowVals = [
      { v: acc.code, align: 1, bold: 1, fc: familyColor },
      { v: acc.name, align: 0, bold: acc.level === 1 ? 1 : 0 },
      { v: acc.fullName, align: 0 },
      { v: `${acc.family} 体系`, align: 1, bold: 1, fc: familyColor },
      { v: acc.category, align: 0 },
      { v: `${acc.level} 级`, align: 1 },
      { v: acc.parentCode || '-', align: 1 },
      { v: acc.balanceDirection, align: 1 },
      { v: acc.isReportLineItem ? '是' : '否', align: 1 },
      { v: acc.budgetSourceWorkbench || '基础设置', align: 0 },
      { v: acc.accountingStandardRef || 'CAS / 集团统一预算科目口径', align: 0 }
    ];

    rowVals.forEach((cell, c) => {
      accCelldata.push({
        r, c,
        v: {
          v: cell.v,
          m: String(cell.v),
          ct: { fa: '@', t: 's' },
          bg: rowBg,
          fc: cell.fc || '#0f172a',
          b: cell.bold || 0,
          ht: cell.align,
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    });
  });

  const accountSheet = {
    name: 'AA.3.a 统一科目总表(PL/BS/CF)',
    color: '#2563eb',
    index: 'sheet_aa3_accounts',
    status: 1,
    order: 0,
    hide: 0,
    row: Math.max(accounts.length + 5, 20),
    column: accHeaders.length,
    defaultRowHeight: 28,
    celldata: accCelldata,
    config: {
      rowlen: { 0: 28 },
      columnlen: {
        0: 100, 1: 160, 2: 220, 3: 100, 4: 160, 5: 70, 6: 90, 7: 90, 8: 90, 9: 160, 10: 300
      },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };

  // Sheet 2: 费用明细科目 (FY)
  const expHeaders = ['费用科目编码', '费用科目名称', '科目全称', '层级', '上级编码', '支出性质', '默认映射财务报表项', '业务核算范围与口径说明'];
  const expCelldata: any[] = [];
  expHeaders.forEach((h, c) => {
    expCelldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  expenseSubjects.forEach((exp, idx) => {
    const r = idx + 1;
    const rowVals = [
      { v: exp.subjectCode, align: 1, bold: 1, fc: '#7c3aed' },
      { v: exp.subjectName, align: 0, bold: exp.level <= 2 ? 1 : 0 },
      { v: exp.fullName, align: 0 },
      { v: `${exp.level} 级`, align: 1 },
      { v: exp.parentCode || '-', align: 1 },
      {
        v: exp.expenseType || '—', align: 1,
        fc: exp.expenseType === '经营性支出' ? '#2563eb' : exp.expenseType === '资本性支出' ? '#059669' : '#94a3b8'
      },
      { v: exp.mappedReportRef || '—', align: 0 },
      { v: exp.description || '—', align: 0 }
    ];
    rowVals.forEach((cell, c) => {
      expCelldata.push({
        r, c,
        v: {
          v: cell.v,
          m: String(cell.v),
          ct: { fa: '@', t: 's' },
          bg: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
          fc: cell.fc || '#0f172a',
          b: cell.bold || 0,
          ht: cell.align,
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    });
  });

  const expenseSheet = {
    name: 'AA.3.b 费用明细科目(FY)',
    color: '#7c3aed',
    index: 'sheet_aa3_expenses',
    status: 0,
    order: 1,
    hide: 0,
    row: Math.max(expenseSubjects.length + 5, 20),
    column: expHeaders.length,
    defaultRowHeight: 28,
    celldata: expCelldata,
    config: {
      rowlen: { 0: 28 },
      columnlen: {
        0: 110, 1: 170, 2: 220, 3: 70, 4: 100, 5: 110, 6: 260, 7: 420
      },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };

  // Sheet 3: 科目编码规则表
  const ruleHeaders = ['家族前缀', '科目家族名称', '编码结构规范', '示例编码', '层级定义与长度', '关联财务主表', '会计准则依据'];
  const ruleCelldata: any[] = [];
  ruleHeaders.forEach((h, c) => {
    ruleCelldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  codingRules.forEach((rule, idx) => {
    const r = idx + 1;
    const rowVals = [
      { v: rule.prefix, align: 1, bold: 1, fc: '#1e40af' },
      { v: rule.familyName, align: 0, bold: 1 },
      { v: rule.codePattern, align: 1 },
      { v: rule.exampleCode, align: 1, bold: 1, fc: '#059669' },
      { v: rule.description, align: 0 },
      { v: rule.associatedStatements.join(' / '), align: 0 },
      { v: rule.governingStandards, align: 0 }
    ];
    rowVals.forEach((cell, c) => {
      ruleCelldata.push({
        r, c,
        v: {
          v: cell.v,
          m: String(cell.v),
          ct: { fa: '@', t: 's' },
          bg: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
          fc: cell.fc || '#0f172a',
          b: cell.bold || 0,
          ht: cell.align,
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    });
  });

  const ruleSheet = {
    name: 'AA.3.c 科目编码规则表',
    color: '#0891b2',
    index: 'sheet_aa3_rules',
    status: 0,
    order: 2,
    hide: 0,
    row: codingRules.length + 1,
    column: ruleHeaders.length,
    defaultRowHeight: 28,
    celldata: ruleCelldata,
    config: {
      rowlen: { 0: 28 },
      columnlen: {
        0: 90, 1: 160, 2: 140, 3: 110, 4: 260, 5: 180, 6: 220
      },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };

  return [accountSheet, expenseSheet, ruleSheet];
}


export function buildCustomerTypeDictSheet(items: import('../../data/customerTypeDict').CustomerTypeDictItem[]): any {
  return createFlatDictSheet({
    name: 'AB.8 客户类型业务字典',
    columns: [
      { label: '编码', width: 80 },
      { label: '客户类型', width: 160 },
      { label: '备注', width: 260 },
    ],
    rows: items.map(it => [it.code, it.name, it.notes || '']),
  });
}


export function buildCustomerFabMasterSheets(
  customersWithFabs: string[] = CUSTOMERS,
  customerTypeMapping: Record<string, string> = CUSTOMER_TYPE_MAPPING
): any[] {
  const buildSheet = (name: string, headers: string[], rows: string[][], widths: Record<number, number>) => {
    const celldata: any[] = [];
    headers.forEach((header, c) => celldata.push({
      r: 0, c,
      v: { v: header, m: header, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    }));
    rows.forEach((row, r) => row.forEach((value, c) => celldata.push({
      r: r + 1, c,
      v: {
        v: value,
        m: String(value ?? ''),
        ct: { fa: '@', t: 's' },
        bg: r % 2 === 0 ? '#ffffff' : '#f8fafc',
        fc: '#0f172a',
        ht: 0,
        vt: 1,
        bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
      }
    })));
    const dataVerification: Record<string, any> = {};
    const dropdown = (value: string) => ({ type: 'dropdown', type2: null, value1: value, value2: '', checked: false, remote: false, prohibitInput: false, hintShow: false, hintText: '' });
    const typeColumn = headers.indexOf('客户类型');
    const customerColumn = headers.indexOf('所属客户');
    for (let row = 1; row <= rows.length; row++) {
      if (typeColumn >= 0) dataVerification[`${row}_${typeColumn}`] = dropdown(ENABLED_CUSTOMER_TYPES.join(','));
      if (customerColumn >= 0) dataVerification[`${row}_${customerColumn}`] = dropdown(customerRows.map((item) => item[0]).join(','));
    }
    return {
      name,
      color: '#059669',
      index: 'sheet_aa4_customers',
      status: 1,
      order: 0,
      hide: 0,
      row: Math.max(rows.length + 5, 15),
      column: headers.length,
      defaultRowHeight: 28,
      celldata,
      dataVerification,
      config: {
        rowlen: { 0: 28 },
        columnlen: widths,
        frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
      }
    };
  };

  const customerRows = customersWithFabs.map((customer) => [
    customer,
    customerTypeMapping[customer] || '不分类型'
  ]);

  return [
    buildSheet('AA.4.a 客户主数据', ['客户', '客户类型'], customerRows, { 0: 220, 1: 220 })
  ];
}


export function buildProjectCatalogSheets(
  projects: any[],
  customerTypeMapping: Record<string, string> = CUSTOMER_TYPE_MAPPING,
  defaultCostRates: Record<string, number> = DEFAULT_PRODUCT_COST_RATES
): any[] {
  // Sheet 1: 项目与标的字典
  const projHeaders = [
    '项目编码', '项目全称 (自动带出)', '默认归属部门', '默认关联客户',
    '客户类型 (自动联动)', '关联产品线', '默认成本率(%)', '管控方式', '状态'
  ];
  const projCelldata: any[] = [];
  projHeaders.forEach((h, c) => {
    projCelldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  projects.forEach((p, idx) => {
    const r = idx + 1;
    const custType = customerTypeMapping[p.defaultCustomer] || '重点企业';
    const prodLine = (p.name.includes('和牛') || p.name.includes('牛排') || p.name.includes('牛肉')) ? '生鲜冷鲜肉类' : (p.name.includes('香肠') || p.name.includes('火腿') || p.name.includes('熟食')) ? '熟食深加工类' : (p.name.includes('配方') || p.name.includes('调理') || p.name.includes('肉馅')) ? '预制调理肉品' : '肉类食品与定制加工';
    const costRate = defaultCostRates[prodLine] || 65;

    const rowVals = [
      { v: p.code, align: 1, bold: 1, fc: '#2563eb' },
      { v: p.name, align: 0, bold: 1 },
      { v: p.defaultDept, align: 1 },
      { v: p.defaultCustomer, align: 0 },
      { v: custType, align: 1, fc: '#059669' },
      { v: prodLine, align: 0 },
      { v: costRate / 100, isNum: true, fmt: '0.00%', align: 2, bold: 1 },
      { v: '按项目台账锁定', align: 1 },
      { v: '执行中', align: 1, fc: '#166534' }
    ];

    rowVals.forEach((cell, col) => {
      projCelldata.push({
        r, c: col,
        v: {
          v: cell.v,
          m: cell.isNum ? `${(Number(cell.v) * 100).toFixed(2)}%` : String(cell.v),
          ct: cell.isNum ? { fa: cell.fmt, t: 'n' } : { fa: '@', t: 's' },
          bg: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
          fc: cell.fc || '#0f172a',
          b: cell.bold || 0,
          ht: cell.align,
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    });
  });

  const projSheet = {
    name: 'AB.1.1 项目与标的字典',
    color: '#d97706',
    index: 'sheet_ab3_projects',
    status: 1,
    order: 0,
    hide: 0,
    row: Math.max(projects.length + 5, 15),
    column: projHeaders.length,
    defaultRowHeight: 28,
    celldata: projCelldata,
    config: {
      rowlen: { 0: 28 },
      columnlen: {
        0: 100, 1: 240, 2: 120, 3: 160, 4: 120, 5: 160, 6: 120, 7: 120, 8: 90
      },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };

  // Sheet 2: 存量产品成本率基准
  const costHeaders = ['产品大类 / 业务线', '默认预算成本率(%)', '对应预算毛利率(%)', '成本核算口径', '准则依据与测算原则'];
  const costCelldata: any[] = [];
  costHeaders.forEach((h, c) => {
    costCelldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: '@', t: 's' }, ...SPREADSHEET_STYLES.deepBlueHeader }
    });
  });

  Object.entries(defaultCostRates).forEach(([cat, rate], idx) => {
    const r = idx + 1;
    const margin = 100 - rate;
    const rowVals = [
      { v: cat, align: 0, bold: 1 },
      { v: rate / 100, isNum: true, fmt: '0.00%', align: 2, bold: 1, fc: '#b45309' },
      { v: margin / 100, isNum: true, fmt: '0.00%', align: 2, bold: 1, fc: '#166534' },
      { v: '完全制造成本 = 直接材料 + 直接人工 + 制造费用分摊', align: 0 },
      { v: '依据存量历史订单实际结转率加权平均确定，用于存量交付成本自动测算', align: 0 }
    ];

    rowVals.forEach((cell, col) => {
      costCelldata.push({
        r, c: col,
        v: {
          v: cell.v,
          m: cell.isNum ? `${(Number(cell.v) * 100).toFixed(2)}%` : String(cell.v),
          ct: cell.isNum ? { fa: cell.fmt, t: 'n' } : { fa: '@', t: 's' },
          bg: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
          fc: cell.fc || '#0f172a',
          b: cell.bold || 0,
          ht: cell.align,
          vt: 1,
          bd: { r: { style: 1, color: '#e2e8f0' }, b: { style: 1, color: '#e2e8f0' } }
        }
      });
    });
  });

  const costSheet = {
    name: 'AB.1.2 存量产品成本率基准',
    color: '#059669',
    index: 'sheet_ab3_cost_rates',
    status: 0,
    order: 1,
    hide: 0,
    row: Math.max(Object.keys(defaultCostRates).length + 5, 10),
    column: costHeaders.length,
    defaultRowHeight: 28,
    celldata: costCelldata,
    config: {
      rowlen: { 0: 28 },
      columnlen: {
        0: 180, 1: 140, 2: 140, 3: 280, 4: 380
      },
      frozen: { type: 'rangeRow', range: { row_focus: 0, column_focus: 0 } }
    }
  };

  return [projSheet, costSheet];
}


export function buildOfficeLeaseSiteMasterSheet(items: OfficeLeaseSiteMasterItem[] = []): any {
  const celldata: any[] = [];
  // 出租方类型/出租方名称两列位于末尾（不挪动既有列序）：
  //   出租方类型 = 内部持有 / 外部租入，区分该场所走 BB.4.2.b 内部职场租赁还是 BB.4.2.a 外部职场租赁；
  //   出租方名称 = 外部租入时填写外部第三方出租方名称（内部持有时填集团内物业持有法人）。
  const headers = ['场所编码', '场所名称', '地址', '业主方(出租方)', '总面积 (㎡)', '启用状态', '出租方类型', '出租方名称'];
  headers.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  });
  items.forEach((it, idx) => {
    const r = idx + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false) => {
      celldata.push({ r, c, v: { v: val, m: String(val ?? ''), ct: { fa: isNum ? '#,##0' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 } });
    };
    setCell(0, it.code);
    setCell(1, it.name);
    setCell(2, it.address ?? '');
    setCell(3, it.lessor ?? '');
    setCell(4, it.totalArea ?? '', true);
    setCell(5, it.status ?? '启用');
    setCell(6, it.lessorType ?? '');
    setCell(7, it.lessorName ?? '');
  });
  return {
    name: 'BAA.6.a 场所基本信息维护',
    index: 'ba7_office_lease_site_master',
    status: 1,
    order: 0,
    row: Math.max(items.length + 5, 10),
    column: headers.length,
    defaultRowHeight: 28,
    defaultColWidth: 130,
    celldata,
    config: { columnlen: { 0: 100, 1: 160, 2: 220, 3: 160, 4: 110, 5: 90, 6: 110, 7: 180 } }
  };
}


export function buildOfficeLeaseAnnualAreaSheet(items: OfficeLeaseAreaItem[] = [], year: string = '2027'): any {
  const celldata: any[] = [];
  // 列「租赁期间(起止)」（fieldCode 仍为 leaseTerm）= 租赁合同的起止日期区间，自由文本
  // （如 2027/01/01-2029/12/31）；仅人眼识别，不参与判定与测算。
  // 与 AB.16 租赁期限字典（一年以内/一年以上，供 BB.4.2.a/BB.4.2.b 引用）同名不同义，故本列刻意避开「租赁期限」字样。
  // 列「单价(元/㎡·月)」= 按「年度×场所×公司」维护的内部场所单价（市场单价、内部定价基准、精度 2 位小数）。
  // 本表收窄为仅供内部职场租赁 BB.4.2.b 带出面积与单价；外部租入场所不在此维护，
  //   其租赁面积与合同单价由 BB.4.2.a 外部职场租赁按对外租赁合同本表直接录入（外部租赁不做场所面积按法人分摊）。
  const headers = ['年度', '场所选择', '公司', '租赁期间(起止)', '租赁面积 (㎡)', '单价(元/㎡·月)', '备注说明'];
  headers.forEach((h, c) => {
    celldata.push({
      r: 0, c,
      v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...((c === 4 || c === 5) ? SPREADSHEET_STYLES.deepBlueSumHeader : SPREADSHEET_STYLES.deepBlueHeader) }
    });
  });
  items.forEach((it, idx) => {
    const r = idx + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false, fmt = 'General') => {
      celldata.push({ r, c, v: { v: val, m: isNum && typeof val === 'number' ? val.toLocaleString('zh-CN') : String(val ?? ''), ct: { fa: fmt, t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 } });
    };
    setCell(0, year);
    setCell(1, it.location);
    setCell(2, it.company);
    setCell(3, it.leaseTerm);
    setCell(4, it.leaseArea, true, '#,##0.00');
    setCell(5, it.unitPrice ?? '', true, '#,##0.00');
    setCell(6, it.notes ?? '');
  });
  return {
    name: 'BAA.6.b 年度租赁面积维护',
    index: 'ba7_office_lease_annual_area',
    status: 1,
    order: 1,
    row: Math.max(items.length + 5, 10),
    column: headers.length,
    defaultRowHeight: 28,
    defaultColWidth: 110,
    celldata,
    config: { columnlen: { 0: 70, 1: 120, 2: 100, 3: 160, 4: 110, 5: 120, 6: 220 } }
  };
}


export function buildOfficeLeaseAllocationRatioSheet(
  years: number[] = [2027],
  locations: string[] = [],
  entityNames: string[] = LEGAL_ENTITIES.map((e) => e.name)
): any {
  const celldata: any[] = [];
  const headers = ['年度', '场所', ...entityNames, '合计'];
  headers.forEach((h, c) => {
    celldata.push({ r: 0, c, v: { v: h, m: h, ct: { fa: 'General', t: 'g' }, ...SPREADSHEET_STYLES.deepBlueHeader } });
  });
  const rows = years.flatMap((y) => (locations.length > 0 ? locations : ['']).map((loc) => ({ year: y, location: loc })));
  rows.forEach((row, idx) => {
    const r = idx + 1;
    const rowBg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const setCell = (c: number, val: any, isNum = false) => {
      celldata.push({ r, c, v: { v: val, m: String(val ?? ''), ct: { fa: isNum ? '0.00%' : 'General', t: isNum ? 'n' : 'g' }, bg: rowBg, ht: isNum ? 2 : 1, vt: 1 } });
    };
    setCell(0, row.year, true);
    setCell(1, row.location);
    entityNames.forEach((_, i) => setCell(2 + i, null));
    setCell(2 + entityNames.length, 1, true); // 合计=100%
  });
  return {
    name: 'BAA.6.c 场所法人比例查看',
    index: 'ba7_office_lease_allocation_ratio',
    status: 1,
    order: 1,
    row: Math.max(rows.length + 5, 10),
    column: headers.length,
    defaultRowHeight: 28,
    defaultColWidth: 110,
    celldata,
    config: { columnlen: { 0: 70, 1: 140 } }
  };
}


/**
 * BAA.6.e 租赁折现率维护（与 BAA.6.a/.b/.c 并列的子表）
 * 表样列 3 = 维度 3（年度 / 折现率(%) / 备注说明）
 * 用途：登记各年度租赁折现率（默认取 BF.3 综合融资成本，可在本表覆盖）；
 *   BB.4.2.b.1 内部职场租赁·财务视角按本表折现率将租赁付款额折现得到租赁负债初始，并据以计算各月利息。
 */
export function buildOfficeLeaseDiscountRateSheet(items: OfficeLeaseDiscountRateItem[] = [], year: string = '2027'): any {
  const celldata: any[] = [];
  const headers = ['年度', '折现率 (%)', '备注说明'];
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
          m: isNum && typeof val === 'number' ? `${val.toFixed(2)}%` : String(val ?? ''),
          ct: { fa: fmt, t: isNum ? 'n' : 'g' },
          bg: rowBg, ht: isNum ? 2 : 1, vt: 1
        }
      });
    };
    setCell(0, it.year ?? year);
    setCell(1, it.discountRate, true, '0.00%');
    setCell(2, it.notes ?? '');
  });
  return {
    name: 'BAA.6.e 租赁折现率维护',
    index: 'ba7_office_lease_discount_rate',
    status: 1,
    order: 4,
    row: Math.max(items.length + 5, 10),
    column: headers.length,
    defaultRowHeight: 28,
    defaultColWidth: 110,
    celldata,
    config: { columnlen: { 0: 70, 1: 120, 2: 320 } }
  };
}


export function buildMaterialQualityDictSheet(
  items: import('../../data/materialQualityDict').MaterialQualityDictItem[]
): object {
  return createFlatDictSheet({
    name: 'AB.6 物料好坏件字典',
    columns: [
      { label: '编码', width: 80 },
      { label: '好坏件', width: 80 },
      { label: '成本方向', width: 120 },
      { label: '业务含义说明', width: 280 },
      { label: '物料成本计算口径', width: 360 },
      { label: '引用表单', width: 400 },
    ],
    rows: items.map(it => [
      it.code,
      it.name,
      it.direction === '+' ? '正向计入（+）' : '反向抵减（-）',
      it.description,
      it.costFormula,
      it.refForms
    ]),
  });
}


export function buildProjectTypeDictSheet(
  items: Array<{ code: string; name: string; scope?: string; refForms?: string }>
): object {
  return createFlatDictSheet({
    name: 'AB.7 预算项目类型字典',
    columns: [
      { label: '编码', width: 80 },
      { label: '项目类型', width: 140 },
      { label: '适用范围说明', width: 360 },
      { label: '引用表单', width: 360 },
    ],
    rows: items.map(it => [it.code, it.name, it.scope, it.refForms]),
  });
}


export function buildInventoryMaterialCategoryDictSheet(
  items: import('../../data/inventoryMaterialCategoryDict').InventoryMaterialCategoryItem[]
): object {
  return createFlatDictSheet({
    name: 'AB.9 存货物料类别字典',
    columns: [
      { label: '编码', width: 70 },
      { label: '物料类别', width: 120 },
      { label: '适用范围说明', width: 320 },
      { label: '默认出库去向与财务科目', width: 420 },
      { label: '状态', width: 70 },
    ],
    rows: items.map(it => [it.code, it.name, it.scope, it.outboundRoute, it.status]),
  });
}


export function buildAssetBookDictSheet(items: AssetBookDictItem[]): object {
  return createFlatDictSheet({
    name: 'AB.10 资产账簿字典',
    columns: [
      { label: '账簿编码', width: 90 },
      { label: '账簿名称', width: 140 },
      { label: '默认标记', width: 90 },
      { label: '适用范围说明', width: 380 },
    ],
    rows: items.map(it => [it.code, it.name, it.isDefault ? '是' : '否', it.scope]),
  });
}


export function buildCreditTypeDictSheet(items: CreditTypeDictItem[]): object {
  return createFlatDictSheet({
    name: 'AB.10 授信类型字典',
    columns: [
      { label: '授信类型编码', width: 100 },
      { label: '授信类型名称', width: 160 },
      { label: '状态', width: 70 },
      { label: '适用范围说明', width: 360 },
    ],
    rows: items.map(it => [it.code, it.name, it.status, it.remarks]),
  });
}


export function buildExpenseAttributeDictSheet(
  items: import('../../data/expenseAttributeDict').ExpenseAttributeDictItem[]
): object {
  return createFlatDictSheet({
    name: 'AB.14 费用属性字典',
    columns: [
      { label: '费用属性编码', width: 100 },
      { label: '费用属性名称', width: 150 },
      { label: '适用范围与财务科目映射', width: 400 },
    ],
    rows: items.map(it => [it.code, it.name, it.scope]),
  });
}


export function buildLeaseTermDictSheet(
  items: import('../../data/leaseTermDict').LeaseTermDictItem[]
): object {
  return createFlatDictSheet({
    name: 'AB.16 租赁期限字典',
    columns: [
      { label: '租赁期限编码', width: 140 },
      { label: '租赁期限名称', width: 140 },
      { label: '适用范围与资本化判定说明', width: 460 },
    ],
    rows: items.map(it => [it.code, it.name, it.scope]),
  });
}


export function buildPositionDictSheet(
  items: import('../../data/positionDict').PositionDictItem[]
): object {
  return createFlatDictSheet({
    name: 'AB.11 岗位字典',
    columns: [
      { label: '岗位编码', width: 90 },
      { label: '岗位名称', width: 180 },
      { label: '状态', width: 70 },
      { label: '岗位说明', width: 280 },
    ],
    rows: items.map(it => [it.code, it.name, it.status, it.remarks]),
  });
}


export function buildRankDictSheet(
  items: import('../../data/rankDict').RankDictItem[]
): object {
  return createFlatDictSheet({
    name: 'AB.12 职级字典',
    columns: [
      { label: '职级编码', width: 90 },
      { label: '职级名称', width: 140 },
      { label: '状态', width: 70 },
      { label: '职级说明', width: 240 },
    ],
    rows: items.map(it => [it.code, it.name, it.status, it.remarks]),
  });
}


export function buildFinancingTypeDictSheet(items: FinancingTypeDictItem[]): object {
  return createFlatDictSheet({
    name: 'AB.17 融资类型字典',
    columns: [
      { label: '融资类型编码', width: 110 },
      { label: '业务名称', width: 160 },
      { label: '层级', width: 80 },
      { label: '上级编码', width: 100 },
      { label: '类型归属', width: 120 },
      { label: '状态', width: 70 },
      { label: '备注', width: 300 },
    ],
    rows: items.map(it => [it.code, it.name, it.level, it.parentCode || '', it.category, it.status, (it as any).notes || (it as any).description || '']),
  });
}
