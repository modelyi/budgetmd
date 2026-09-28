/**
 * 一次性生成脚本：把调研总结页当前依赖的 Univer build*Sheet() 数据源，
 * 转换为按表单编码分片的 Markdown 表格 JSON（src/data/sheets/{code}.json）。
 *
 * 目的：调研页运行时不再引用任何 Univer 类型/工具文件（univerAdapters.ts、
 * spreadsheetAdapters.ts 等），彻底与 Univer 解耦，只读取本文件生成的静态数据。
 *
 * 用法：npx tsx scripts/generateResearchMarkdownContent.ts
 * 何时需要重跑：调研页涉及的任一 build*Sheet() 适配器的表样结构发生变化时。
 * 生成的 JSON 是产物，不需要手工编辑；如需调整表样，改共享适配器后重跑本脚本。
 */
import { writeFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { sheetToMarkdownGrid, type MarkdownTableGrid } from '../src/utils/markdownTableConverter';
import type { SpreadsheetSheetFixture } from '../src/utils/spreadsheetTypes';
import {
  buildSalesContractSheet,
  buildStockOrderSheet,
  buildProductTransferSheet,
  buildIntercompanySalesBudgetSheet,
  buildServiceRevenueSheet,
  buildServiceMaterialSheet,
  buildServiceLaborSheet,
  buildProductionPlanResearchSheet,
  buildProductionPlanFinanceViewSheet,
  buildOtherFixedAssetAdditionSheet,
  buildAssetDisposalSheet,
  buildExistingAssetDepreciationSheet,
  buildSalesExpenseDetailSheet,
  buildMaterialEquipmentSheet,
  buildInventoryBudgetSheet,
  buildCapexWithPoSheet,
  buildCapexNoPoSheet,
  buildCapexIntercompanyViewSheet,
  buildCapexFinanceViewSheet,
  buildMaterialProcurementWithPoSheet,
  buildMaterialProcurementNoPoSheet,
  buildMaterialProcurementIntercompanyViewSheet,
  buildMaterialProcurementFinanceViewSheet,
  buildInventoryFlowBudgetSheet,
  buildInfrastructureResearchSheet,
  buildInfrastructureTransferSheet,
  buildSelfBuiltCipSheet,
  buildSelfBuiltLaborDetailSheet,
  buildSelfBuiltCipTransferSheet,
  buildSelfBuiltMaterialDetailSheet,
  buildTaxRateAssumptionSheet,
  buildProductStandardCostSheet,
  buildHourlyStandardCostSheet,
  buildMaterialStandardCostSheet,
  buildEquipmentProcurementPaymentRatioSheet,
  buildMaterialProcurementPaymentRatioSheet,
  buildExpenseBudgetSummaryResearchSheet,
  buildMaterialConsumptionSummarySheet,
  buildRndMaterialConsumptionSummarySheet,
  buildDeptAttributeMappingSheet,
  buildExpenseConversionRatioSheet,
  buildAssetConversionRatioSheet,
  buildDepreciationSplitRatioSheet,
  buildInventoryEntityRatioSheet,
  buildDepreciationExpenseSummarySheet,
  buildIncrementalDepreciationDetailSheet,
  buildExpenseConversionResultSheet,
  buildExternalOfficeLeaseSheet,
  buildExternalLeaseCapitalizationSheet,
  buildEmployeeExpenseImportSheet,
  buildEmployeeExpenseFinanceViewSheet,
  buildFormOverviewRegistrySheet,
  buildFormColumnRegistrySheet,
  buildLeaseSolutionDocSheet,
  buildSalesSolutionDocSheet,
  buildOfficeLeaseSiteMasterSheet,
  buildOfficeLeaseAnnualAreaSheet,
  buildOfficeLeaseAllocationRatioSheet,
  buildOfficeLeaseDiscountRateSheet,
  buildEquityInvestmentSheet,
  buildIntercompanyMarkupRatesSheet,
  buildIntercompanyLeasingSheet,
  buildIntercompanyLeaseCapitalizationSheet,
  buildIntercompanyAssetTransferSheet,
  buildFinancialInstrumentSheets,
  buildInternalBorrowingSheet,
  buildTaxBudgetSheet,
  buildVatProvisionSheet,
  buildSalesBudgetSummarySheet,
  buildProfitLossResearchSheet,
  buildBalanceSheetResearchSheet,
  buildCashFlowResearchSheet,
  buildConsolidationEliminationSheet,
  buildBudgetPeriodMasterSheets,
  buildLegalEntityMasterSheets,
  buildUnifiedBudgetSubjectMasterSheets,
  buildCustomerFabMasterSheets,
  buildAdminDepartmentMasterSheet,
  buildBudgetProjectMasterDictSheet,
  buildBudgetProductMasterSheet,
  buildManagementUnitMasterSheets,
  buildAssetCategoryMasterSheets,
  buildMaterialMasterSheet,
  buildProjectCatalogSheets,
  buildSasacIndustryDictSheet,
  buildProductCategoryDictSheet,
  buildRevenueMethodDictSheet,
  buildContractNatureDictSheet,
  buildMaterialQualityDictSheet,
  buildProjectTypeDictSheet,
  buildCustomerTypeDictSheet,
  buildInventoryMaterialCategoryDictSheet,
  buildAssetBookDictSheet,
  buildCreditTypeDictSheet,
  buildExpenseAttributeDictSheet,
  buildLeaseTermDictSheet,
  buildFinancingTypeDictSheet,
  buildPositionDictSheet,
  buildRankDictSheet,
  buildFinancialConversionOverviewSheets,
  buildInventoryFlowRuleDetailSheet,
  buildProductRevenueMappingSheet,
} from '../src/utils/spreadsheetAdapters';
import { buildSupplierMasterSheets } from '../src/utils/supplierMasterAdapter';
// XML 文字源解析器（两端共用；脚本端从磁盘读 src/data/texts/*.xml 后注册）
import { getFormText, getAllFormTexts, registerRawTexts } from '../src/utils/xmlTexts';
import {
  HR_ORGANIZATION_DATA,
  LEGAL_ENTITIES,
  MANAGEMENT_UNITS,
  PROJECT_CATALOG,
  CUSTOMER_TYPE_MAPPING,
  DEFAULT_PRODUCT_COST_RATES,
} from '../src/mockData';
import { BUDGET_PROJECT_MASTER_DATA } from '../src/data/budgetProjectData';
import { ASSET_CATEGORY_LIST } from '../src/data/assetCategoryData';
import { ENABLED_BUDGET_PRODUCTS } from '../src/data/budgetProductMasterData';
import { MATERIAL_MASTER_DATA } from '../src/data/materialMasterData';
import { INVENTORY_MATERIAL_CATEGORIES } from '../src/data/inventoryMaterialCategoryDict';
import { ASSET_BOOK_DICTS } from '../src/data/assetBookDict';
import { CREDIT_TYPE_DICTS } from '../src/data/creditTypeDict';
import { EXPENSE_ATTRIBUTE_DICTS } from '../src/data/expenseAttributeDict';
import { LEASE_TERM_DICTS } from '../src/data/leaseTermDict';
import { FINANCING_TYPE_DICTS } from '../src/data/financingTypeDict';
import { POSITION_DICTS } from '../src/data/positionDict';
import { RANK_DICTS } from '../src/data/rankDict';
import { PRODUCT_CATEGORY_DICT } from '../src/data/productCategoryDict';
import { REVENUE_METHOD_DICT } from '../src/data/revenueMethodDict';
import { MATERIAL_QUALITY_DICT } from '../src/data/materialQualityDict';
import { CUSTOMER_TYPE_DICT } from '../src/data/customerTypeDict';
import { hourlyStandardCostSamples, materialStandardCostSamples, expenseBudgetSummaryResearchSamples, officeLeaseSiteMasterSamples, officeLeaseAnnualAreaSamples, officeLeaseDiscountRateSamples, expenseConversionRatioSamples, rndMaterialConsumptionSummarySamples } from '../src/data/assumptionSamples';
import { PRODUCT_REVENUE_MAPPING_SAMPLE, DEPT_ATTRIBUTE_MAPPING_SAMPLE, BUDGET_YEAR_MASTER_SAMPLE, BUDGET_PERIOD_CALENDAR_SAMPLE } from '../src/data/mappingSamples';
import { SALES_CONTRACT_SAMPLE, STOCK_ORDER_SAMPLE, SERVICE_REVENUE_SAMPLE, SERVICE_MATERIAL_SAMPLE, SERVICE_LABOR_SAMPLE, SALES_EXPENSE_SAMPLE } from '../src/data/salesSamples';
import { INFRASTRUCTURE_SAMPLE, OTHER_FIXED_ASSET_SAMPLE, ASSET_DISPOSAL_SAMPLE } from '../src/data/capexSamples';
import { externalOfficeLeaseSamples, externalLeaseCapitalizationSamples } from '../src/data/externalLeaseSamples';
import { FINANCIAL_INSTRUMENT_SAMPLE, NONBANK_INSTRUMENT_SAMPLE, FINANCING_BUDGET_DETAIL_SAMPLE } from '../src/data/financeSamples';
import { INTERNAL_BORROWING_SAMPLE } from '../src/data/internalBorrowingSamples';

/**
 * BB.2.1 生产制造产量计划表示例数据（仅产成品；维度=法人公司+部门+产品）
 * 主表 BB.2.1.A 手工填报产量；财务视角 BB.2.1.B（生产成本）按「法人公司×预算部门×产品」只读带出
 * 完工产量（带出主表）、单位标准成本（BAA.2 带出）与完工生产成本。
 * 完工生产成本 = 当月产量 × BAA.2 单位标准成本，不再单独编制生产成本表。
 */
const PRODUCTION_PLAN_SAMPLE = [
  { entity: '草莓慕斯公司', department: '生产运营与制造部', productName: '高功率光纤激光切割机整机系统',
    months: { m1: 10, m2: 12, m3: 14, m4: 13, m5: 14, m6: 15, m7: 13, m8: 14, m9: 15, m10: 14, m11: 12, m12: 14 } },
  { entity: '蓝莓蛋挞公司', department: '光学制造部', productName: '高精度光学光束整形准直模组',
    months: { m1: 38, m2: 40, m3: 43, m4: 42, m5: 42, m6: 44, m7: 43, m8: 43, m9: 44, m10: 43, m11: 41, m12: 43 } },
];



// BAA.2 产品标准成本设置示例数据（简化3列：产品/标准成本/备注；含整机、重要部件等）
const BA2_PRODUCT_STANDARD_COST_SAMPLE = [
  { productName: '高功率光纤激光切割机整机系统', standardCost: 1280000, remarks: '整机' },
  { productName: '三维五轴激光切管机', standardCost: 960000, remarks: '整机' },
  { productName: '高精度光学光束整形准直模组', standardCost: 265000, remarks: '重要部件' },
  { productName: 'OptoLens-NA0.85 高数值孔径投影物镜组件', standardCost: 480000, remarks: '重要部件' },
  { productName: '高压脉冲放电腔核心组件', standardCost: 158000, remarks: '重要部件' },
];


const INVENTORY_FLOW_SAMPLE_ITEMS = [
    // 在制品汇总行：体现在制品整体的期初/转入/转出/期末（浅蓝小计行）
    // 转入 = 料+工+费各月转入合计；转出 = 结转各月转出（完工生产成本）
    { majorCategory: '在制品', minorCategory: '',  openingBalance: 75,
      months: { m1: { transferIn: 13, transferOut: 12 }, m2: { transferIn: 12, transferOut: 10 }, m3: { transferIn: 12, transferOut: 12 }, m4: { transferIn: 11, transferOut: 10 }, m5: { transferIn: 11, transferOut: 11 }, m6: { transferIn: 13, transferOut: 11 }, m7: { transferIn: 10, transferOut: 11 }, m8: { transferIn: 12, transferOut: 11 }, m9: { transferIn: 12, transferOut: 11 }, m10: { transferIn: 11, transferOut: 11 }, m11: { transferIn: 11, transferOut: 10 }, m12: { transferIn: 11, transferOut: 11 } } },
    // 在制品料：只有转入（无前置收集表，手工填报；生产物料转出直接取自该转入数），无直接转出；转出经结转小类汇总结转
    { majorCategory: '在制品', minorCategory: '料', openingBalance: 0,
      months: { m1: { transferIn: 6, transferOut: 0 }, m2: { transferIn: 5, transferOut: 0 }, m3: { transferIn: 6, transferOut: 0 }, m4: { transferIn: 5, transferOut: 0 }, m5: { transferIn: 5, transferOut: 0 }, m6: { transferIn: 6, transferOut: 0 }, m7: { transferIn: 5, transferOut: 0 }, m8: { transferIn: 5, transferOut: 0 }, m9: { transferIn: 6, transferOut: 0 }, m10: { transferIn: 5, transferOut: 0 }, m11: { transferIn: 5, transferOut: 0 }, m12: { transferIn: 5, transferOut: 0 } } },
    // 在制品工：只有转入（来自 BB.5.1 制造费用人工），无直接转出
    { majorCategory: '在制品', minorCategory: '工', openingBalance: 0,
      months: { m1: { transferIn: 4, transferOut: 0 }, m2: { transferIn: 4, transferOut: 0 }, m3: { transferIn: 4, transferOut: 0 }, m4: { transferIn: 3, transferOut: 0 }, m5: { transferIn: 4, transferOut: 0 }, m6: { transferIn: 4, transferOut: 0 }, m7: { transferIn: 3, transferOut: 0 }, m8: { transferIn: 4, transferOut: 0 }, m9: { transferIn: 4, transferOut: 0 }, m10: { transferIn: 3, transferOut: 0 }, m11: { transferIn: 4, transferOut: 0 }, m12: { transferIn: 3, transferOut: 0 } } },
    // 在制品费：只有转入（来自 BB.5.2 制造费用+BB.4.X 折旧），无直接转出
    { majorCategory: '在制品', minorCategory: '费', openingBalance: 0,
      months: { m1: { transferIn: 3, transferOut: 0 }, m2: { transferIn: 3, transferOut: 0 }, m3: { transferIn: 2, transferOut: 0 }, m4: { transferIn: 3, transferOut: 0 }, m5: { transferIn: 2, transferOut: 0 }, m6: { transferIn: 3, transferOut: 0 }, m7: { transferIn: 2, transferOut: 0 }, m8: { transferIn: 3, transferOut: 0 }, m9: { transferIn: 2, transferOut: 0 }, m10: { transferIn: 3, transferOut: 0 }, m11: { transferIn: 2, transferOut: 0 }, m12: { transferIn: 3, transferOut: 0 } } },
    // 在制品结转：只有转出（= 当月完工生产成本 BB.2.1×BAA.2），无转入；料/工/费经此小类汇总结转产成品
    { majorCategory: '在制品', minorCategory: '结转', openingBalance: 0,
      months: { m1: { transferIn: 0, transferOut: 12 }, m2: { transferIn: 0, transferOut: 10 }, m3: { transferIn: 0, transferOut: 12 }, m4: { transferIn: 0, transferOut: 10 }, m5: { transferIn: 0, transferOut: 11 }, m6: { transferIn: 0, transferOut: 11 }, m7: { transferIn: 0, transferOut: 11 }, m8: { transferIn: 0, transferOut: 11 }, m9: { transferIn: 0, transferOut: 11 }, m10: { transferIn: 0, transferOut: 11 }, m11: { transferIn: 0, transferOut: 10 }, m12: { transferIn: 0, transferOut: 11 } } },
    { majorCategory: '产成品', minorCategory: '', openingBalance: 90,
      months: { m1: { transferIn: 12, transferOut: 15 }, m2: { transferIn: 10, transferOut: 14 }, m3: { transferIn: 12, transferOut: 16 }, m4: { transferIn: 10, transferOut: 14 }, m5: { transferIn: 11, transferOut: 15 }, m6: { transferIn: 11, transferOut: 13 }, m7: { transferIn: 11, transferOut: 14 }, m8: { transferIn: 11, transferOut: 15 }, m9: { transferIn: 11, transferOut: 13 }, m10: { transferIn: 11, transferOut: 14 }, m11: { transferIn: 10, transferOut: 12 }, m12: { transferIn: 11, transferOut: 13 } } },
    // 生产物料（直接用于产成品装配）
    { majorCategory: '生产物料', minorCategory: '', openingBalance: 25,
      months: { m1: { transferIn: 8, transferOut: 6 }, m2: { transferIn: 7, transferOut: 5 }, m3: { transferIn: 8, transferOut: 6 }, m4: { transferIn: 7, transferOut: 5 }, m5: { transferIn: 7, transferOut: 5 }, m6: { transferIn: 8, transferOut: 6 }, m7: { transferIn: 7, transferOut: 5 }, m8: { transferIn: 7, transferOut: 5 }, m9: { transferIn: 8, transferOut: 6 }, m10: { transferIn: 7, transferOut: 5 }, m11: { transferIn: 7, transferOut: 5 }, m12: { transferIn: 7, transferOut: 5 } } },
    // 研发物料（研发项目与试制专属）
    { majorCategory: '研发物料', minorCategory: '', openingBalance: 15,
      months: { m1: { transferIn: 4, transferOut: 3 }, m2: { transferIn: 3, transferOut: 3 }, m3: { transferIn: 4, transferOut: 3 }, m4: { transferIn: 3, transferOut: 3 }, m5: { transferIn: 3, transferOut: 3 }, m6: { transferIn: 4, transferOut: 3 }, m7: { transferIn: 3, transferOut: 3 }, m8: { transferIn: 3, transferOut: 3 }, m9: { transferIn: 4, transferOut: 3 }, m10: { transferIn: 3, transferOut: 3 }, m11: { transferIn: 3, transferOut: 3 }, m12: { transferIn: 3, transferOut: 3 } } },
    // 服务物料（售后与维保配件）
    { majorCategory: '服务物料', minorCategory: '', openingBalance: 12,
      months: { m1: { transferIn: 3, transferOut: 2 }, m2: { transferIn: 2, transferOut: 2 }, m3: { transferIn: 3, transferOut: 2 }, m4: { transferIn: 2, transferOut: 2 }, m5: { transferIn: 2, transferOut: 2 }, m6: { transferIn: 3, transferOut: 2 }, m7: { transferIn: 2, transferOut: 2 }, m8: { transferIn: 2, transferOut: 2 }, m9: { transferIn: 3, transferOut: 2 }, m10: { transferIn: 2, transferOut: 2 }, m11: { transferIn: 2, transferOut: 2 }, m12: { transferIn: 2, transferOut: 2 } } },
    // 专项储备（安全库存与战略备件）
    { majorCategory: '专项储备', minorCategory: '', openingBalance: 30,
      months: { m1: { transferIn: 2, transferOut: 0 }, m2: { transferIn: 0, transferOut: 0 }, m3: { transferIn: 2, transferOut: 0 }, m4: { transferIn: 0, transferOut: 0 }, m5: { transferIn: 0, transferOut: 0 }, m6: { transferIn: 2, transferOut: 0 }, m7: { transferIn: 0, transferOut: 0 }, m8: { transferIn: 0, transferOut: 0 }, m9: { transferIn: 2, transferOut: 0 }, m10: { transferIn: 0, transferOut: 0 }, m11: { transferIn: 0, transferOut: 0 }, m12: { transferIn: 2, transferOut: 0 } } },
    // 其他物料（行政包装与通用杂项）
    { majorCategory: '其他物料', minorCategory: '', openingBalance: 8,
      months: { m1: { transferIn: 2, transferOut: 1 }, m2: { transferIn: 1, transferOut: 1 }, m3: { transferIn: 2, transferOut: 1 }, m4: { transferIn: 1, transferOut: 1 }, m5: { transferIn: 1, transferOut: 1 }, m6: { transferIn: 2, transferOut: 1 }, m7: { transferIn: 1, transferOut: 1 }, m8: { transferIn: 1, transferOut: 1 }, m9: { transferIn: 2, transferOut: 1 }, m10: { transferIn: 1, transferOut: 1 }, m11: { transferIn: 1, transferOut: 1 }, m12: { transferIn: 1, transferOut: 1 } } },
    // 自制设备用料（自制设备工程领料专用存货，转出=BB.4.1.c 领料出库进在建工程）
    { majorCategory: '自制设备用料', minorCategory: '', openingBalance: 20,
      months: { m1: { transferIn: 10, transferOut: 15 }, m2: { transferIn: 10, transferOut: 20 }, m3: { transferIn: 10, transferOut: 20 }, m4: { transferIn: 10, transferOut: 25 }, m5: { transferIn: 10, transferOut: 25 }, m6: { transferIn: 15, transferOut: 30 }, m7: { transferIn: 0, transferOut: 15 }, m8: { transferIn: 0, transferOut: 10 }, m9: { transferIn: 0, transferOut: 10 }, m10: { transferIn: 0, transferOut: 5 }, m11: { transferIn: 0, transferOut: 5 }, m12: { transferIn: 0, transferOut: 5 } } },
    ];

// BB.3.X 已改为法人级单表（法人公司×存货类别，一表到底），业务上各法人的转入/转出由各来源表逐来源按法人取数，
// 并不存在「集团主表×比例拆法人」的层级。本函数仅为示例数据构造：把集团口径示例值按固定的示例权重分摊到 AA.2 的 12 家法人，
// 前 11 家按权重向下取整到 0.1，末家取残差，保证各法人同品类同月加总恰好等于集团口径示例值（便于核对文字口径）。
const INVENTORY_FLOW_ENTITY_WEIGHTS: Record<string, number> = {
  JT: 0.06, A: 0.22, B: 0.18, C: 0.10, D: 0.09, BA: 0.08, BB: 0.06, BC: 0.05, BD: 0.05, DA: 0.04, DB: 0.04, DC: 0.03,
};

function buildEntityLevelInventoryFlowSample(): any[] {
  const rows: any[] = [];
  const allocated = new Map<string, number>();
  const floor1 = (v: number) => Math.floor(v * 10 + 1e-9) / 10;
  const round1 = (v: number) => Math.round(v * 10) / 10;
  const lastIdx = LEGAL_ENTITIES.length - 1;

  LEGAL_ENTITIES.forEach((entity, ei) => {
    const weight = INVENTORY_FLOW_ENTITY_WEIGHTS[entity.code] ?? 0;
    const isLast = ei === lastIdx;
    const split = (key: string, groupValue: number): number => {
      if (isLast) {
        const value = round1(groupValue - (allocated.get(key) ?? 0));
        allocated.set(key, groupValue);
        return value;
      }
      const value = floor1(groupValue * weight);
      allocated.set(key, round1((allocated.get(key) ?? 0) + value));
      return value;
    };

    INVENTORY_FLOW_SAMPLE_ITEMS.forEach((item, ii) => {
      const months: Record<string, { transferIn: number; transferOut: number }> = {};
      for (let m = 1; m <= 12; m++) {
        const md = item.months?.[`m${m}`] ?? {};
        months[`m${m}`] = {
          transferIn: split(`${ii}|in${m}`, md.transferIn ?? 0),
          transferOut: split(`${ii}|out${m}`, md.transferOut ?? 0),
        };
      }
      rows.push({
        legalEntity: entity.name,
        majorCategory: item.majorCategory,
        minorCategory: item.minorCategory,
        openingBalance: split(`${ii}|open`, item.openingBalance ?? 0),
        months,
      });
    });
  });

  return rows;
}

// ---------------------------------------------------------------------------
// XML 文字源（src/data/texts/*.xml）：脚本端从磁盘读取后注册到 src/utils/xmlTexts，
// 与前端（Vite import.meta.glob 读同一批 XML）共用同一套解析逻辑（parseFormTextXml）。
// 这样「XML 存文字」成为前端渲染与生成脚本的同一份真相来源；未登记 XML 的表仍读 TS 注册表。
// ---------------------------------------------------------------------------
const xmlTextsDir = resolve(__dirname, '../src/data/texts');
const xmlTextFiles: string[] = existsSync(xmlTextsDir)
  ? readdirSync(xmlTextsDir).filter((f) => f.toLowerCase().endsWith('.xml'))
  : [];
registerRawTexts(
  Object.fromEntries(
    xmlTextFiles.map((f) => [`/src/data/texts/${f}`, readFileSync(resolve(xmlTextsDir, f), 'utf-8')]),
  ),
);
console.log(`[xmlTexts] 已注册 XML 文字源：${xmlTextFiles.join('、') || '（无）'}`);

/**
 * A1.2 编制表类列登记簿（字段名列从 XML 文字源取）：
 * sheet 结构仍由 buildFormColumnRegistrySheet() 生成（列顺序：0序号 1表单编码 2表单名称
 * 3已登记列编码 4列显示名称 5字段类型 6输入/带出方式 7是否必输 8凭证关联映射说明），
 * 这里把每一行的「列显示名称」(c=4) 换成 src/data/texts/{formCode}.xml 里按 fieldCode 登记的
 * 字段登记名（name 属性，= BUDGET_FIELD_REGISTRY.fieldName）——覆盖全部表单（不再只 BB.1.1）。
 * 未登记 XML 的表 / 未登记 XML 的字段一律不动；文字逐字一致时写入值不变（产物零差异）。
 */
function buildFormColumnRegistrySheetWithXml(): object {
  const sheet = buildFormColumnRegistrySheet() as any;
  const cells: any[] = sheet?.celldata ?? [];
  if (cells.length === 0) return sheet;

  // 预取「表单编码|列编码 → 登记名」（全部 XML 文字源）
  const xmlNameByField = new Map<string, string>();
  for (const [code, ft] of Object.entries(getAllFormTexts())) {
    for (const f of ft.fields) {
      if (f.code && f.name) xmlNameByField.set(`${code}|${f.code}`, f.name);
    }
  }
  if (xmlNameByField.size === 0) return sheet;

  const formByRow = new Map<number, string>();
  const fieldByRow = new Map<number, string>();
  cells.forEach((cell) => {
    if (cell.c === 1) formByRow.set(cell.r, String(cell.v?.v ?? '')); // 所属表单编码
    if (cell.c === 3) fieldByRow.set(cell.r, String(cell.v?.v ?? '')); // 已登记列编码 (Key)
  });

  let patched = 0;
  cells.forEach((cell) => {
    if (cell.c !== 4 || !cell.v) return; // 列显示名称
    const xmlName = xmlNameByField.get(`${formByRow.get(cell.r)}|${fieldByRow.get(cell.r)}`);
    if (xmlName && xmlName !== cell.v.v) {
      cell.v = { ...cell.v, v: xmlName, m: xmlName };
      patched += 1;
    }
  });
  console.log(`[xmlTexts] A1.2 列登记簿：XML 登记名与 TS 登记值不一致并覆盖的行 ${patched} 行（逐字迁移下应为 0）`);
  return sheet;
}

// FORM_SHEET_BUILDERS：与 ResearchSummaryView.tsx 完全一致的映射表（此处独立维护一份，
// 因为该文件是 .tsx 组件，脚本环境不便直接 import 组件内部私有常量）。
const FORM_SHEET_BUILDERS: Record<string, () => SpreadsheetSheetFixture[]> = {
  'A1.2': () => [buildFormColumnRegistrySheetWithXml()] as unknown as SpreadsheetSheetFixture[],
  // A2A 职场租赁预算解决方案（A2 专项方案，文档式表样：章节｜内容 两列）
  'A2A': () => [buildLeaseSolutionDocSheet()] as unknown as SpreadsheetSheetFixture[],
  'A2B': () => [buildSalesSolutionDocSheet()] as unknown as SpreadsheetSheetFixture[],
  'AB.15': () => [buildTaxRateAssumptionSheet()] as unknown as SpreadsheetSheetFixture[],
  'BAA.2': () => [buildProductStandardCostSheet(BA2_PRODUCT_STANDARD_COST_SAMPLE as any)] as unknown as SpreadsheetSheetFixture[],
  'BAA.3': () => [buildHourlyStandardCostSheet(hourlyStandardCostSamples as any)] as unknown as SpreadsheetSheetFixture[],
  'BAA.4': () => [buildMaterialStandardCostSheet(materialStandardCostSamples as any)] as unknown as SpreadsheetSheetFixture[],
  'BA.5': () => [buildExpenseBudgetSummaryResearchSheet(expenseBudgetSummaryResearchSamples)] as unknown as SpreadsheetSheetFixture[],
  'BAP.2': () => [buildMaterialConsumptionSummarySheet([
    { budgetProject: 'P3 超快激光与复合加工预研', department: '激光源研发部', materialName: '研发打样材料', materialCategory: '研发物料', usage: '研发类',
      months: { m1: 2, m2: 2, m3: 2, m4: 2, m5: 2, m6: 2, m7: 2, m8: 2, m9: 2, m10: 2, m11: 2, m12: 2 } },
    { budgetProject: 'P3 超快激光与复合加工预研', department: '激光器研发部', materialName: '研发测试耗材', materialCategory: '研发物料', usage: '研发类',
      months: { m1: 1, m2: 1, m3: 1, m4: 1, m5: 1, m6: 1, m7: 1, m8: 1, m9: 1, m10: 1, m11: 1, m12: 1 } },
    { budgetProject: '职能部门', department: '会计核算组', materialName: '办公消耗用品', materialCategory: '其他物料', usage: '管理类及其他',
      months: { m1: 1, m2: 1, m3: 1, m4: 1, m5: 1, m6: 1, m7: 1, m8: 1, m9: 1, m10: 1, m11: 1, m12: 1 } },
    { budgetProject: '职能部门', department: '综合管理部', materialName: '行政后勤耗材', materialCategory: '其他物料', usage: '管理类及其他',
      months: { m1: 1, m2: 1, m3: 1, m4: 1, m5: 1, m6: 1, m7: 1, m8: 1, m9: 1, m10: 1, m11: 1, m12: 1 } },
    { budgetProject: 'P1 高功率平板光纤激光切割机', department: '销售一部', materialName: '销售演示耗材', materialCategory: '其他物料', usage: '销售类',
      months: { m1: 1, m2: 1, m3: 1, m4: 1, m5: 2, m6: 1, m7: 1, m8: 1, m9: 2, m10: 1, m11: 1, m12: 1 } },
  ])] as unknown as SpreadsheetSheetFixture[],
  'BAP.3': () => [buildRndMaterialConsumptionSummarySheet(rndMaterialConsumptionSummarySamples)] as unknown as SpreadsheetSheetFixture[],
  'BAA.6': () => [
    buildOfficeLeaseSiteMasterSheet(officeLeaseSiteMasterSamples),
    // BAA.6.b 年度租赁面积维护（含「单价(元/㎡·月)」列，仅供 BB.4.2.b 内部职场租赁取面积与单价）
    buildOfficeLeaseAnnualAreaSheet(officeLeaseAnnualAreaSamples),
    buildOfficeLeaseAllocationRatioSheet(),
    // BAA.6.e 租赁折现率维护（BB.4.2.b.1 租赁负债折现的折现率来源）
    buildOfficeLeaseDiscountRateSheet(officeLeaseDiscountRateSamples),
  ] as unknown as SpreadsheetSheetFixture[],
  'BAA.7': () => [
    buildEquipmentProcurementPaymentRatioSheet(),
    buildMaterialProcurementPaymentRatioSheet()
  ] as unknown as SpreadsheetSheetFixture[],
  'BAA.8': () => [buildExpenseConversionRatioSheet(expenseConversionRatioSamples)] as unknown as SpreadsheetSheetFixture[],
  'BAA.9': () => [buildAssetConversionRatioSheet([]), buildDepreciationSplitRatioSheet([])] as unknown as SpreadsheetSheetFixture[],
  'BAA.10': () => [buildInventoryEntityRatioSheet([])] as unknown as SpreadsheetSheetFixture[],
  'BB.1.1': () => [
    buildSalesContractSheet(SALES_CONTRACT_SAMPLE as any),
  ] as unknown as SpreadsheetSheetFixture[],
  'BB.1.2': () => [
    buildStockOrderSheet(STOCK_ORDER_SAMPLE as any, '甜甜圈集团公司', '2027', 'stock'),
    buildStockOrderSheet(STOCK_ORDER_SAMPLE as any, '甜甜圈集团公司', '2027', 'finance'),
    buildProductTransferSheet([{ fromEntity: '甜甜圈(东莞)装备公司', toEntity: '甜甜圈集团公司', product: 'YYZ-200 整机', department: '销售一部', unitCost: 85.5, markupRate: 0.1, monthlyQty: { m1: 2, m3: 3, m6: 2 } }], '甜甜圈集团公司', '2027'),
  ] as unknown as SpreadsheetSheetFixture[],
  'BB.1.3': () => [
    buildServiceRevenueSheet(SERVICE_REVENUE_SAMPLE as any, '甜甜圈集团公司', '2027', 'sales'),
    buildServiceRevenueSheet(SERVICE_REVENUE_SAMPLE as any, '甜甜圈集团公司', '2027', 'finance'),
    // 物料明细/人工明细的存量与增量已合并为同一张填报表（由「订单编号」区分），故填报口径只出 1 张（role='sales'）
    buildServiceMaterialSheet(SERVICE_MATERIAL_SAMPLE as any, [], '甜甜圈集团公司', '2027', 'sales'),
    buildServiceMaterialSheet(SERVICE_MATERIAL_SAMPLE as any, [], '甜甜圈集团公司', '2027', 'finance'),
    buildServiceLaborSheet(SERVICE_LABOR_SAMPLE as any, '甜甜圈集团公司', '2027', 'sales'),
    buildServiceLaborSheet(SERVICE_LABOR_SAMPLE as any, '甜甜圈集团公司', '2027', 'finance'),
  ] as unknown as SpreadsheetSheetFixture[],
  'BB.1.4': () => [buildSalesExpenseDetailSheet(SALES_EXPENSE_SAMPLE as any)] as unknown as SpreadsheetSheetFixture[],
  // BB.2.1 由单 Tab 改为两个 Tab（同页切换）：BB.2.1.A 主表（产量填报）+ BB.2.1.B 财务视角（生产成本，只读带出完工产量/单位标准成本/完工生产成本）
  'BB.2.1': () => [
    buildProductionPlanResearchSheet(PRODUCTION_PLAN_SAMPLE),
    buildProductionPlanFinanceViewSheet(PRODUCTION_PLAN_SAMPLE, BA2_PRODUCT_STANDARD_COST_SAMPLE),
  ] as unknown as SpreadsheetSheetFixture[],
  // BB.3.1 由单采购视角改为三个 Tab（同页切换）：BB.3.1.A 有PO-设备及无形资产采购预算（采购视角）
  //   + BB.3.1.B 无PO-设备及无形资产采购预算（采购视角）+ BB.3.1.C 财务视角（原 BB.3.1.B 整体改号）。
  //   两张采购视角表样的列结构完全相同（列数与改号前一致，仅 PO标记 为固定值列：A 表恒为「有PO」、B 表恒为「无PO」）；
  //   示例数据按原 BB.3.1.A 示例的有PO/无PO 行分别拆到两张表样，无PO 表样另补 2 行示例（取值沿用现有资产类别/预算项目值）。
  'BB.3.1': () => [
    buildCapexWithPoSheet([
      // ① 有PO设备采购 —— P1项目激光切割头组件，分批到货，预付款比例30%
      { budgetProject: 'P1 高功率平板光纤激光切割机', department: '采购与供应链管理部', orderingEntity: '草莓慕斯-泛烘焙装备制造单元', benefitEntity: '草莓慕斯-泛烘焙装备制造单元', poFlag: '有PO', assetCategory: '固定资产-生产机器设备', assetNameOrRemark: '高功率平板光纤激光切割头组件（PO：PO-2027-0118）', supplier: '博视激光核心部件供应商',
        months: {
          m1: { orderAmount: 120, acceptanceAmount: 0,  advancePaymentRatio: 0.3, advancePayment: 36,  acceptancePayment: 0  },
          m2: { orderAmount: 0,   acceptanceAmount: 80, advancePaymentRatio: 0,   advancePayment: 0,   acceptancePayment: 56 },
          m3: { orderAmount: 100, acceptanceAmount: 80, advancePaymentRatio: 0.3, advancePayment: 30,  acceptancePayment: 56 },
          m4: { orderAmount: 0,   acceptanceAmount: 100,advancePaymentRatio: 0,   advancePayment: 0,   acceptancePayment: 70 },
          m5: { orderAmount: 80,  acceptanceAmount: 60, advancePaymentRatio: 0.3, advancePayment: 24,  acceptancePayment: 42 },
          m6: { orderAmount: 0,   acceptanceAmount: 80, advancePaymentRatio: 0,   advancePayment: 0,   acceptancePayment: 56 },
          m7: { orderAmount: 60,  acceptanceAmount: 0,  advancePaymentRatio: 0.3, advancePayment: 18,  acceptancePayment: 0  },
          m8: { orderAmount: 0,   acceptanceAmount: 60, advancePaymentRatio: 0,   advancePayment: 0,   acceptancePayment: 42 },
          m9: { orderAmount: 80,  acceptanceAmount: 60, advancePaymentRatio: 0.3, advancePayment: 24,  acceptancePayment: 42 },
          m10: { orderAmount: 0,  acceptanceAmount: 80, advancePaymentRatio: 0,   advancePayment: 0,   acceptancePayment: 56 },
          m11: { orderAmount: 60, acceptanceAmount: 0,  advancePaymentRatio: 0.3, advancePayment: 18,  acceptancePayment: 0  },
          m12: { orderAmount: 0,  acceptanceAmount: 60, advancePaymentRatio: 0,   advancePayment: 0,   acceptancePayment: 42 },
        },
        totalOrderAmount: 500, totalAcceptanceAmount: 660, totalAdvancePayment: 150, totalAcceptancePayment: 462 },
      // ② 有PO无形资产采购 —— ERP模块软件著作权授权，一次性采购，签约即付50%，验收付50%
      { budgetProject: '集团统筹', department: '信息技术部', orderingEntity: '甜甜圈集团公司', benefitEntity: '甜甜圈集团公司', poFlag: '有PO', assetCategory: '无形资产-软件著作权/工业软件', assetNameOrRemark: 'ERP 系统模块软件著作权授权', supplier: '用友网络信息技术股份有限公司',
        months: {
          m1: { orderAmount: 60, acceptanceAmount: 0,  advancePaymentRatio: 0.5, advancePayment: 30, acceptancePayment: 0  },
          m2: { orderAmount: 0,  acceptanceAmount: 0,  advancePaymentRatio: 0,   advancePayment: 0,  acceptancePayment: 0  },
          m3: { orderAmount: 0,  acceptanceAmount: 60, advancePaymentRatio: 0,   advancePayment: 0,  acceptancePayment: 30 },
          m4: { orderAmount: 0,  acceptanceAmount: 0,  advancePaymentRatio: 0,   advancePayment: 0,  acceptancePayment: 0  },
          m5: { orderAmount: 0,  acceptanceAmount: 0,  advancePaymentRatio: 0,   advancePayment: 0,  acceptancePayment: 0  },
          m6: { orderAmount: 0,  acceptanceAmount: 0,  advancePaymentRatio: 0,   advancePayment: 0,  acceptancePayment: 0  },
          m7: { orderAmount: 0,  acceptanceAmount: 0,  advancePaymentRatio: 0,   advancePayment: 0,  acceptancePayment: 0  },
          m8: { orderAmount: 0,  acceptanceAmount: 0,  advancePaymentRatio: 0,   advancePayment: 0,  acceptancePayment: 0  },
          m9: { orderAmount: 0,  acceptanceAmount: 0,  advancePaymentRatio: 0,   advancePayment: 0,  acceptancePayment: 0  },
          m10: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0,   advancePayment: 0,  acceptancePayment: 0  },
          m11: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0,   advancePayment: 0,  acceptancePayment: 0  },
          m12: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0,   advancePayment: 0,  acceptancePayment: 0  },
        },
        totalOrderAmount: 60, totalAcceptanceAmount: 60, totalAdvancePayment: 30, totalAcceptancePayment: 30 },
    ] as any),
    buildCapexNoPoSheet([
      // ① 无PO设备采购 —— 研发实验台（预算内批量小件，无正式PO，到货即付款）
      { budgetProject: 'P3 研发能力提升', department: '研发工程部', orderingEntity: '奥斯丁-智能激光装备研发单元', benefitEntity: '奥斯丁-智能激光装备研发单元', poFlag: '无PO', assetCategory: '固定资产-研发实验仪器', assetNameOrRemark: '研发实验台（设备采购说明：研发能力提升配套，无正式PO）', supplier: '',
        months: {
          m1: { orderAmount: 0, acceptanceAmount: 20, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 20 },
          m2: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m3: { orderAmount: 0, acceptanceAmount: 30, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 30 },
          m4: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m5: { orderAmount: 0, acceptanceAmount: 25, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 25 },
          m6: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m7: { orderAmount: 0, acceptanceAmount: 20, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 20 },
          m8: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m9: { orderAmount: 0, acceptanceAmount: 25, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 25 },
          m10: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m11: { orderAmount: 0, acceptanceAmount: 20, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 20 },
          m12: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
        },
        totalOrderAmount: 0, totalAcceptanceAmount: 140, totalAdvancePayment: 0, totalAcceptancePayment: 140 },
      // ② 无PO设备采购（补充示例）—— P3 预研配套的实验数据处理终端等电子与办公设备零星采购，到货即付款
      { budgetProject: 'P3 超快激光与复合加工预研', department: '研发工程部', orderingEntity: '奥斯丁-智能激光装备研发单元', benefitEntity: '奥斯丁-智能激光装备研发单元', poFlag: '无PO', assetCategory: '固定资产-电子与办公设备', assetNameOrRemark: '激光工艺实验数据处理终端（设备采购说明：预研配套零星采购，无正式PO）', supplier: '',
        months: {
          m1: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m2: { orderAmount: 0, acceptanceAmount: 12, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 12 },
          m3: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m4: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m5: { orderAmount: 0, acceptanceAmount: 9,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 9  },
          m6: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m7: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m8: { orderAmount: 0, acceptanceAmount: 12, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 12 },
          m9: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m10: { orderAmount: 0, acceptanceAmount: 0, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m11: { orderAmount: 0, acceptanceAmount: 9, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 9  },
          m12: { orderAmount: 0, acceptanceAmount: 0, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
        },
        totalOrderAmount: 0, totalAcceptanceAmount: 42, totalAdvancePayment: 0, totalAcceptancePayment: 42 },
      // ③ 无PO设备采购（补充示例）—— 产线扩建配套工装夹具与专用工具，无正式PO，到货即付款
      { budgetProject: '整机总装与联调产线扩建（一期）', department: '制造工程部', orderingEntity: '草莓慕斯-泛烘焙装备制造单元', benefitEntity: '草莓慕斯-泛烘焙装备制造单元', poFlag: '无PO', assetCategory: '固定资产-工具器具及模具', assetNameOrRemark: '整机总装工装夹具与专用工具（设备采购说明：产线扩建零星工装，无正式PO）', supplier: '',
        months: {
          m1: { orderAmount: 0, acceptanceAmount: 15, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 15 },
          m2: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m3: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m4: { orderAmount: 0, acceptanceAmount: 12, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 12 },
          m5: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m6: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m7: { orderAmount: 0, acceptanceAmount: 15, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 15 },
          m8: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m9: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m10: { orderAmount: 0, acceptanceAmount: 12, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 12 },
          m11: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
          m12: { orderAmount: 0, acceptanceAmount: 0,  advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0  },
        },
        totalOrderAmount: 0, totalAcceptanceAmount: 54, totalAdvancePayment: 0, totalAcceptancePayment: 54 },
    ] as any),
    // BB.3.1.D 关联交易视角（设备及无形资产采购）——两岗接力代采购模型的第二岗填报表（关联交易预算员补填受益主体）。
    //   顺序：A 有PO / B 无PO（采购视角）→ D 关联交易视角 → C 财务视角。
    buildCapexIntercompanyViewSheet(),
    buildCapexFinanceViewSheet(),
  ] as unknown as SpreadsheetSheetFixture[],
  // BB.3.3 由单采购视角改为三个 Tab（同页切换）：BB.3.3.A 有PO-物料类采购预算（采购视角）
  //   + BB.3.3.B 无PO-物料类采购预算（采购视角）+ BB.3.3.C 财务视角（原 BB.3.3.B 整体改号，并新增 PO标记 维度列，43 → 44 列）。
  //   两张采购视角表样的列结构完全相同（列数与改号前 BB.3.3.A 一致，仅 PO标记 为固定值列：A 表恒为「有PO」、B 表恒为「无PO」）；
  //   示例数据按原 BB.3.3.A 示例的有PO/无PO 行分别拆到两张表样，有PO 表样另补 1 行示例（取值沿用现有物料类别/预算项目/供应商值）。
  'BB.3.3': () => [
    buildMaterialProcurementWithPoSheet([
      // ① 有PO物料采购 —— P1项目生产物料，分批下单、分批到货，预付款比例30%
      { budgetProject: 'P1 高功率平板光纤激光切割机', department: '采购与供应链管理部', orderingEntity: '草莓慕斯-泛烘焙装备制造单元', benefitEntity: '', poFlag: '有PO', assetCategory: '生产物料', supplier: '普雷茨特光学核心件供应商',
        months: {
          m1: { orderAmount: 40, acceptanceAmount: 36, advancePaymentRatio: 0.3, advancePayment: 12,   acceptancePayment: 36 },
          m2: { orderAmount: 42, acceptanceAmount: 38, advancePaymentRatio: 0.3, advancePayment: 12.6, acceptancePayment: 38 },
          m3: { orderAmount: 44, acceptanceAmount: 40, advancePaymentRatio: 0.3, advancePayment: 13.2, acceptancePayment: 40 },
          m4: { orderAmount: 40, acceptanceAmount: 40, advancePaymentRatio: 0.3, advancePayment: 12,   acceptancePayment: 40 },
          m5: { orderAmount: 42, acceptanceAmount: 38, advancePaymentRatio: 0.3, advancePayment: 12.6, acceptancePayment: 38 },
          m6: { orderAmount: 44, acceptanceAmount: 42, advancePaymentRatio: 0.3, advancePayment: 13.2, acceptancePayment: 42 },
          m7: { orderAmount: 42, acceptanceAmount: 40, advancePaymentRatio: 0.3, advancePayment: 12.6, acceptancePayment: 40 },
          m8: { orderAmount: 44, acceptanceAmount: 42, advancePaymentRatio: 0.3, advancePayment: 13.2, acceptancePayment: 42 },
          m9: { orderAmount: 46, acceptanceAmount: 44, advancePaymentRatio: 0.3, advancePayment: 13.8, acceptancePayment: 44 },
          m10: { orderAmount: 44, acceptanceAmount: 42, advancePaymentRatio: 0.3, advancePayment: 13.2, acceptancePayment: 42 },
          m11: { orderAmount: 42, acceptanceAmount: 40, advancePaymentRatio: 0.3, advancePayment: 12.6, acceptancePayment: 40 },
          m12: { orderAmount: 44, acceptanceAmount: 42, advancePaymentRatio: 0.3, advancePayment: 13.2, acceptancePayment: 42 },
        },
        totalOrderAmount: 514, totalAcceptanceAmount: 484, totalAdvancePayment: 154.2, totalAcceptancePayment: 484 },
      // ② 有PO物料采购（补充示例）—— 产线扩建配套原材料及零部件，按月下单到货，预付款比例30%
      { budgetProject: '整机总装与联调产线扩建（一期）', department: '采购与供应链管理部', orderingEntity: '草莓慕斯-泛烘焙装备制造单元', benefitEntity: '', poFlag: '有PO', assetCategory: '生产物料', supplier: '柏楚数控核心部件供应商',
        months: {
          m1: { orderAmount: 24, acceptanceAmount: 22, advancePaymentRatio: 0.3, advancePayment: 7.2, acceptancePayment: 22 },
          m2: { orderAmount: 26, acceptanceAmount: 25, advancePaymentRatio: 0.3, advancePayment: 7.8, acceptancePayment: 25 },
          m3: { orderAmount: 28, acceptanceAmount: 26, advancePaymentRatio: 0.3, advancePayment: 8.4, acceptancePayment: 26 },
          m4: { orderAmount: 25, acceptanceAmount: 24, advancePaymentRatio: 0.3, advancePayment: 7.5, acceptancePayment: 24 },
          m5: { orderAmount: 27, acceptanceAmount: 26, advancePaymentRatio: 0.3, advancePayment: 8.1, acceptancePayment: 26 },
          m6: { orderAmount: 30, acceptanceAmount: 28, advancePaymentRatio: 0.3, advancePayment: 9,   acceptancePayment: 28 },
          m7: { orderAmount: 26, acceptanceAmount: 25, advancePaymentRatio: 0.3, advancePayment: 7.8, acceptancePayment: 25 },
          m8: { orderAmount: 28, acceptanceAmount: 27, advancePaymentRatio: 0.3, advancePayment: 8.4, acceptancePayment: 27 },
          m9: { orderAmount: 30, acceptanceAmount: 28, advancePaymentRatio: 0.3, advancePayment: 9,   acceptancePayment: 28 },
          m10: { orderAmount: 27, acceptanceAmount: 26, advancePaymentRatio: 0.3, advancePayment: 8.1, acceptancePayment: 26 },
          m11: { orderAmount: 26, acceptanceAmount: 25, advancePaymentRatio: 0.3, advancePayment: 7.8, acceptancePayment: 25 },
          m12: { orderAmount: 28, acceptanceAmount: 27, advancePaymentRatio: 0.3, advancePayment: 8.4, acceptancePayment: 27 },
        },
        totalOrderAmount: 325, totalAcceptanceAmount: 309, totalAdvancePayment: 97.5, totalAcceptancePayment: 309 },
    ] as any),
    buildMaterialProcurementNoPoSheet([
      // ① 物料消耗采集表获取（无下单，PO标记=无PO）—— 耗材，归属其他物料
      { budgetProject: '集团统筹', department: '制造工程部', orderingEntity: '', benefitEntity: '', poFlag: '无PO', assetCategory: '其他物料', supplier: '',
        months: {
          m1: { orderAmount: 0, acceptanceAmount: 8, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 8 },
          m2: { orderAmount: 0, acceptanceAmount: 7, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 7 },
          m3: { orderAmount: 0, acceptanceAmount: 8, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 8 },
          m4: { orderAmount: 0, acceptanceAmount: 7, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 7 },
          m5: { orderAmount: 0, acceptanceAmount: 8, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 8 },
          m6: { orderAmount: 0, acceptanceAmount: 9, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 9 },
          m7: { orderAmount: 0, acceptanceAmount: 8, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 8 },
          m8: { orderAmount: 0, acceptanceAmount: 8, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 8 },
          m9: { orderAmount: 0, acceptanceAmount: 9, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 9 },
          m10: { orderAmount: 0, acceptanceAmount: 8, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 8 },
          m11: { orderAmount: 0, acceptanceAmount: 7, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 7 },
          m12: { orderAmount: 0, acceptanceAmount: 8, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 8 },
        },
        totalOrderAmount: 0, totalAcceptanceAmount: 95, totalAdvancePayment: 0, totalAcceptancePayment: 95 },
      // ② 从 BAP.3 获取（研发长期物料消耗需求）—— 研发专用物料，归属研发物料
      { budgetProject: '产品化项目', department: '研发中心', orderingEntity: '', benefitEntity: '', poFlag: '无PO', assetCategory: '研发物料', supplier: '新代伺服驱动系统供应商',
        months: {
          m1: { orderAmount: 15, acceptanceAmount: 12, advancePaymentRatio: 0.3, advancePayment: 4.5, acceptancePayment: 12 },
          m2: { orderAmount: 16, acceptanceAmount: 13, advancePaymentRatio: 0.3, advancePayment: 4.8, acceptancePayment: 13 },
          m3: { orderAmount: 15, acceptanceAmount: 14, advancePaymentRatio: 0.3, advancePayment: 4.5, acceptancePayment: 14 },
          m4: { orderAmount: 17, acceptanceAmount: 15, advancePaymentRatio: 0.3, advancePayment: 5.1, acceptancePayment: 15 },
          m5: { orderAmount: 16, acceptanceAmount: 15, advancePaymentRatio: 0.3, advancePayment: 4.8, acceptancePayment: 15 },
          m6: { orderAmount: 18, acceptanceAmount: 16, advancePaymentRatio: 0.3, advancePayment: 5.4, acceptancePayment: 16 },
          m7: { orderAmount: 16, acceptanceAmount: 15, advancePaymentRatio: 0.3, advancePayment: 4.8, acceptancePayment: 15 },
          m8: { orderAmount: 17, acceptanceAmount: 16, advancePaymentRatio: 0.3, advancePayment: 5.1, acceptancePayment: 16 },
          m9: { orderAmount: 18, acceptanceAmount: 17, advancePaymentRatio: 0.3, advancePayment: 5.4, acceptancePayment: 17 },
          m10: { orderAmount: 17, acceptanceAmount: 16, advancePaymentRatio: 0.3, advancePayment: 5.1, acceptancePayment: 16 },
          m11: { orderAmount: 16, acceptanceAmount: 15, advancePaymentRatio: 0.3, advancePayment: 4.8, acceptancePayment: 15 },
          m12: { orderAmount: 17, acceptanceAmount: 16, advancePaymentRatio: 0.3, advancePayment: 5.1, acceptancePayment: 16 },
        },
        totalOrderAmount: 198, totalAcceptanceAmount: 180, totalAdvancePayment: 59.4, totalAcceptancePayment: 180 },
      // ③ 服务物料类采购 —— 技术服务专用配件，归属服务物料
      { budgetProject: '集团统筹', department: '智能制造与交付中心', orderingEntity: '', benefitEntity: '', poFlag: '无PO', assetCategory: '服务物料', supplier: '柏楚数控核心部件供应商',
        months: {
          m1: { orderAmount: 6, acceptanceAmount: 5, advancePaymentRatio: 0.3, advancePayment: 1.8, acceptancePayment: 5 },
          m2: { orderAmount: 5, acceptanceAmount: 5, advancePaymentRatio: 0.3, advancePayment: 1.5, acceptancePayment: 5 },
          m3: { orderAmount: 6, acceptanceAmount: 5, advancePaymentRatio: 0.3, advancePayment: 1.8, acceptancePayment: 5 },
          m4: { orderAmount: 6, acceptanceAmount: 6, advancePaymentRatio: 0.3, advancePayment: 1.8, acceptancePayment: 6 },
          m5: { orderAmount: 5, acceptanceAmount: 5, advancePaymentRatio: 0.3, advancePayment: 1.5, acceptancePayment: 5 },
          m6: { orderAmount: 6, acceptanceAmount: 5, advancePaymentRatio: 0.3, advancePayment: 1.8, acceptancePayment: 5 },
          m7: { orderAmount: 5, acceptanceAmount: 5, advancePaymentRatio: 0.3, advancePayment: 1.5, acceptancePayment: 5 },
          m8: { orderAmount: 6, acceptanceAmount: 5, advancePaymentRatio: 0.3, advancePayment: 1.8, acceptancePayment: 5 },
          m9: { orderAmount: 6, acceptanceAmount: 6, advancePaymentRatio: 0.3, advancePayment: 1.8, acceptancePayment: 6 },
          m10: { orderAmount: 5, acceptanceAmount: 5, advancePaymentRatio: 0.3, advancePayment: 1.5, acceptancePayment: 5 },
          m11: { orderAmount: 6, acceptanceAmount: 5, advancePaymentRatio: 0.3, advancePayment: 1.8, acceptancePayment: 5 },
          m12: { orderAmount: 6, acceptanceAmount: 5, advancePaymentRatio: 0.3, advancePayment: 1.8, acceptancePayment: 5 },
        },
        totalOrderAmount: 68, totalAcceptanceAmount: 62, totalAdvancePayment: 20.4, totalAcceptancePayment: 62 },
      // ④ 专项战略储备类物料采购 —— 战略储备
      { budgetProject: '集团统筹', department: '采购与供应链管理部', orderingEntity: '', benefitEntity: '', poFlag: '无PO', assetCategory: '专项储备', supplier: '战略备件合作厂商',
        months: {
          m1: { orderAmount: 10, acceptanceAmount: 0, advancePaymentRatio: 0.3, advancePayment: 3, acceptancePayment: 0 },
          m2: { orderAmount: 0, acceptanceAmount: 10, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 10 },
          m3: { orderAmount: 0, acceptanceAmount: 0, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0 },
          m4: { orderAmount: 0, acceptanceAmount: 0, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0 },
          m5: { orderAmount: 0, acceptanceAmount: 0, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0 },
          m6: { orderAmount: 10, acceptanceAmount: 0, advancePaymentRatio: 0.3, advancePayment: 3, acceptancePayment: 0 },
          m7: { orderAmount: 0, acceptanceAmount: 10, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 10 },
          m8: { orderAmount: 0, acceptanceAmount: 0, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0 },
          m9: { orderAmount: 0, acceptanceAmount: 0, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0 },
          m10: { orderAmount: 0, acceptanceAmount: 0, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0 },
          m11: { orderAmount: 0, acceptanceAmount: 0, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0 },
          m12: { orderAmount: 0, acceptanceAmount: 0, advancePaymentRatio: 0, advancePayment: 0, acceptancePayment: 0 },
        },
        totalOrderAmount: 20, totalAcceptanceAmount: 20, totalAdvancePayment: 6, totalAcceptancePayment: 20 },
    ] as any),
    // BB.3.3.D 关联交易视角（物料类采购）——两岗接力代采购模型的第二岗填报表（关联交易预算员补填受益主体）。
    //   顺序：A 有PO / B 无PO（采购视角）→ D 关联交易视角 → C 财务视角。
    buildMaterialProcurementIntercompanyViewSheet(),
    buildMaterialProcurementFinanceViewSheet(),
  ] as unknown as SpreadsheetSheetFixture[],
  'BB.3.X': () => [
    buildInventoryFlowBudgetSheet(buildEntityLevelInventoryFlowSample()),
    buildInventoryFlowRuleDetailSheet(),
  ] as unknown as SpreadsheetSheetFixture[],
  'BB.3.2': () => [buildInfrastructureResearchSheet(INFRASTRUCTURE_SAMPLE), buildInfrastructureTransferSheet([])] as unknown as SpreadsheetSheetFixture[],
  'BB.4.1': () => [
    buildSelfBuiltCipSheet([]),
    buildSelfBuiltLaborDetailSheet([]),
    buildSelfBuiltMaterialDetailSheet([]),
    buildSelfBuiltCipTransferSheet([])
  ] as unknown as SpreadsheetSheetFixture[],
  'BB.4.X': () => [
    buildDepreciationExpenseSummarySheet([])
  ] as unknown as SpreadsheetSheetFixture[],
  'BB.4.5': () => [buildIncrementalDepreciationDetailSheet([])] as unknown as SpreadsheetSheetFixture[],
  'BB.4.6': () => [buildAssetDisposalSheet(ASSET_DISPOSAL_SAMPLE)] as unknown as SpreadsheetSheetFixture[],
  'BB.4.3': () => [buildOtherFixedAssetAdditionSheet(OTHER_FIXED_ASSET_SAMPLE)] as unknown as SpreadsheetSheetFixture[],
  'BB.4.4': () => [buildExistingAssetDepreciationSheet([])] as unknown as SpreadsheetSheetFixture[],
  'BB.5.1': () => [buildEmployeeExpenseImportSheet([]), buildEmployeeExpenseFinanceViewSheet([])] as unknown as SpreadsheetSheetFixture[],
  'BB.5.2': () => [buildExpenseConversionResultSheet([])] as unknown as SpreadsheetSheetFixture[],
  // BB.4.2.a 外部职场租赁（BB.4 资本性支出组，菜单子目录紧接 BB.4 资本性支出之后）：BB.4.2.a 外部职场租赁（登记层，一行一笔外部租赁合同）
  //   + BB.4.2.a.1 外部职场租赁·财务视角（仅资本化合同一行，体例同 BB.4.2.b.1）。
  //   口径与 BB.4.2.b 内部职场租赁分开：外部出租方、无加成款、无内部往来、不参与集团合并抵销。
  'BB.4.2.a': () => [buildExternalOfficeLeaseSheet(externalOfficeLeaseSamples)] as unknown as SpreadsheetSheetFixture[],
  'BB.4.2.a.1': () => [buildExternalLeaseCapitalizationSheet(externalLeaseCapitalizationSamples)] as unknown as SpreadsheetSheetFixture[],
  // BB.4.2.b 内部职场租赁 / BB.4.2.b.1 内部职场租赁·财务视角（原 BJ.C 组内两张内部租赁表拆出，成为 BB.4.2 下的独立表单）
  'BB.4.2.b': () => [buildIntercompanyLeasingSheet([])] as unknown as SpreadsheetSheetFixture[],
  'BB.4.2.b.1': () => [buildIntercompanyLeaseCapitalizationSheet([])] as unknown as SpreadsheetSheetFixture[],
  'BF.1': () => [buildEquityInvestmentSheet([])] as unknown as SpreadsheetSheetFixture[],
  // BJ.C 关联交易与内部抵销：两张「查询表」全部只读镜像对应的关联交易填报表（维度+度量完全一致）——
  //   BJ.C.a 代采购物料查询表 ↔ BB.3.3.D（物料采购关联交易视角，去掉采购分类维度：只承载物料代采购，服务费用不再走代采购）；
  //   BJ.C.e 代采购资产查询表 ↔ BB.3.1.D（设备采购关联交易视角）；
  //   （原软硬件/技术服务内部销售查询表及其内部交易视角已整体删除，本轮不再生成）
  // 查询表与填报表共用同一构造函数（传查询表名覆盖 sheet 名），表样不做任何增减。
  'BJ.C': () => [
    buildMaterialProcurementIntercompanyViewSheet('BJ.C.a 代采购物料查询表'),
    buildCapexIntercompanyViewSheet('BJ.C.e 代采购资产查询表'),
    buildIntercompanyAssetTransferSheet([]),
    buildInternalBorrowingSheet(INTERNAL_BORROWING_SAMPLE),
    buildIntercompanySalesBudgetSheet([{ seller: '甜甜圈(东莞)装备公司', buyer: '甜甜圈集团公司', tradeType: '物料销售', inboundType: '原材料', product: '钢板 SPHC', department: '生产一部', unitCost: 12.5, markupRate: 0.1, monthlyQty: { m2: 50, m5: 80, m8: 60 } }, { seller: '甜甜圈(苏州)软件公司', buyer: '甜甜圈集团公司', tradeType: '产成品销售', inboundType: '产成品', product: 'MES 软件 V3', department: '销售二部', unitCost: 30, markupRate: 0.1, monthlyQty: { m4: 3, m9: 2 } }]),
  ] as unknown as SpreadsheetSheetFixture[],
  'BAA.11': () => [buildIntercompanyMarkupRatesSheet([])] as unknown as SpreadsheetSheetFixture[],
  'BF.3': () => buildFinancialInstrumentSheets(FINANCIAL_INSTRUMENT_SAMPLE, NONBANK_INSTRUMENT_SAMPLE, undefined, FINANCING_BUDGET_DETAIL_SAMPLE) as unknown as SpreadsheetSheetFixture[],
  'BF.4': () => [buildTaxBudgetSheet([]), buildVatProvisionSheet()] as unknown as SpreadsheetSheetFixture[],
  'BO.PL': () => buildProfitLossResearchSheet() as unknown as SpreadsheetSheetFixture[],
  'BO.BS': () => buildBalanceSheetResearchSheet() as unknown as SpreadsheetSheetFixture[],
  'BO.CF': () => buildCashFlowResearchSheet() as unknown as SpreadsheetSheetFixture[],
  'BO.ELIM': () => [buildConsolidationEliminationSheet()] as unknown as SpreadsheetSheetFixture[],
  'BB.1.X': () => buildSalesBudgetSummarySheet() as unknown as SpreadsheetSheetFixture[],
  'AA.1': () => buildBudgetPeriodMasterSheets(BUDGET_YEAR_MASTER_SAMPLE as any, BUDGET_PERIOD_CALENDAR_SAMPLE as any) as unknown as SpreadsheetSheetFixture[],
  'AA.2': () => [buildLegalEntityMasterSheets(LEGAL_ENTITIES)].flat() as unknown as SpreadsheetSheetFixture[],
  'AA.3': () => buildUnifiedBudgetSubjectMasterSheets() as unknown as SpreadsheetSheetFixture[],
  'AA.4': () => buildCustomerFabMasterSheets() as unknown as SpreadsheetSheetFixture[],
  'AA.5': () => [buildAdminDepartmentMasterSheet(HR_ORGANIZATION_DATA)] as unknown as SpreadsheetSheetFixture[],
  'AA.6': () => [buildBudgetProjectMasterDictSheet(BUDGET_PROJECT_MASTER_DATA)] as unknown as SpreadsheetSheetFixture[],
  'AA.7': () => [buildBudgetProductMasterSheet(ENABLED_BUDGET_PRODUCTS)] as unknown as SpreadsheetSheetFixture[],
  'AA.8': () => [buildManagementUnitMasterSheets(MANAGEMENT_UNITS)].flat() as unknown as SpreadsheetSheetFixture[],
  'AA.9': () => buildAssetCategoryMasterSheets(ASSET_CATEGORY_LIST) as unknown as SpreadsheetSheetFixture[],
  'AA.10': () => buildSupplierMasterSheets() as unknown as SpreadsheetSheetFixture[],
  'AA.11': () => [buildMaterialMasterSheet(MATERIAL_MASTER_DATA)] as unknown as SpreadsheetSheetFixture[],
  'AB.2': () => [buildSasacIndustryDictSheet([])] as unknown as SpreadsheetSheetFixture[],
  'AB.3': () => [buildProductCategoryDictSheet(PRODUCT_CATEGORY_DICT)] as unknown as SpreadsheetSheetFixture[],
  'AB.4': () => [buildRevenueMethodDictSheet(REVENUE_METHOD_DICT)] as unknown as SpreadsheetSheetFixture[],
  'AB.5': () => [buildContractNatureDictSheet([])] as unknown as SpreadsheetSheetFixture[],
  'AB.6': () => [buildMaterialQualityDictSheet(MATERIAL_QUALITY_DICT)] as unknown as SpreadsheetSheetFixture[],
  'AB.7': () => [buildProjectTypeDictSheet([])] as unknown as SpreadsheetSheetFixture[],
  'AB.8': () => [buildCustomerTypeDictSheet(CUSTOMER_TYPE_DICT)] as unknown as SpreadsheetSheetFixture[],
  'AB.9': () => [buildInventoryMaterialCategoryDictSheet(INVENTORY_MATERIAL_CATEGORIES)] as unknown as SpreadsheetSheetFixture[],
  'AB.10': () => [buildAssetBookDictSheet(ASSET_BOOK_DICTS)] as unknown as SpreadsheetSheetFixture[],
  'AB.11': () => [buildPositionDictSheet(POSITION_DICTS)] as unknown as SpreadsheetSheetFixture[],
  'AB.12': () => [buildRankDictSheet(RANK_DICTS)] as unknown as SpreadsheetSheetFixture[],
  'AB.13': () => [buildCreditTypeDictSheet(CREDIT_TYPE_DICTS)] as unknown as SpreadsheetSheetFixture[],
  'AB.14': () => [buildExpenseAttributeDictSheet(EXPENSE_ATTRIBUTE_DICTS)] as unknown as SpreadsheetSheetFixture[],
  'AB.16': () => [buildLeaseTermDictSheet(LEASE_TERM_DICTS)] as unknown as SpreadsheetSheetFixture[],
  // AB.17 融资类型字典（固定值域字典，两级编码；供 BF.3.c 融资预算明细表「融资类型」字段下拉引用）
  'AB.17': () => [buildFinancingTypeDictSheet(FINANCING_TYPE_DICTS)] as unknown as SpreadsheetSheetFixture[],
  'A1.4': () => buildFinancialConversionOverviewSheets() as unknown as SpreadsheetSheetFixture[],
  'AM.1': () => [buildProductRevenueMappingSheet(PRODUCT_REVENUE_MAPPING_SAMPLE)] as unknown as SpreadsheetSheetFixture[],
  'AM.2': () => [buildDeptAttributeMappingSheet(DEPT_ATTRIBUTE_MAPPING_SAMPLE)] as unknown as SpreadsheetSheetFixture[],
};

// 调研页表样列顺序：BB.1.1 维度列已按目标顺序排列（FAB 维度已删除），
// 无需列重排；仅做表头覆盖（0→合同编码、1→合同名称、7→预算部门）与表头边框提亮、去冻结、行数裁剪。
function hasPreviewCellContent(value: unknown): boolean {
  if (value === null || value === undefined || value === '') return false;
  if (typeof value !== 'object') return true;
  const v = value as Record<string, unknown>;
  return (v.v !== null && v.v !== undefined && v.v !== '') || Boolean(v.m) || Boolean(v.f);
}

// 与 ResearchSummaryView.tsx 中 previewSheets 完全一致的预览变换逻辑
// （BB.1.1 表头覆盖、表头边框提亮、去冻结、行数裁剪）。
function toPreviewSheets(formCode: string, sheets: SpreadsheetSheetFixture[]): SpreadsheetSheetFixture[] {
  return sheets.map((sheet) => {
    const celldata = sheet.celldata.map((cell) => {
      let out = cell;
      if (cell.r <= 1 && typeof cell.v === 'object' && cell.v !== null) {
        const v = cell.v as Record<string, any>;
        const isHeader = v.bg === '#002f6c' || v.bg === '#001e4a';
        let next = v;
        if (isHeader) {
          const clearBd = { style: 1, color: '#ffffff' };
          next = { ...v, bd: { l: clearBd, r: clearBd, t: clearBd, b: clearBd } };
        }
        if (next !== v) out = { ...cell, v: next };
      }
      return out;
    });
    const lastContentRow = sheet.celldata.reduce(
      (lastRow, cell) => (hasPreviewCellContent(cell.v) ? Math.max(lastRow, cell.r) : lastRow),
      -1,
    );
    const config = sheet.config ? { ...sheet.config, frozen: undefined } : sheet.config;
    return { ...sheet, celldata, config, row: Math.max(1, lastContentRow + 1) };
  });
}

const output: Record<string, { grids: MarkdownTableGrid[] }> = {};
// 收集每个表单的真实 sheet（TAB 表样）清单，供 A1.1 登记簿细化到 TAB 使用。
const sheetsByForm: Record<string, string[]> = {};

for (const formCode of Object.keys(FORM_SHEET_BUILDERS)) {
  try {
    const rawSheets = FORM_SHEET_BUILDERS[formCode]().filter(
      (s) => s && Array.isArray(s.celldata) && s.celldata.length > 0,
    );
    sheetsByForm[formCode] = rawSheets.map((s) => String((s as { name?: string }).name || formCode));
    const previewed = toPreviewSheets(formCode, rawSheets);
    const grids = previewed.map((s) => sheetToMarkdownGrid(s));
    output[formCode] = { grids };
    console.log(`OK   ${formCode}: ${grids.length} sheet(s)`);
  } catch (err) {
    console.error(`FAIL ${formCode}:`, err);
  }
}

// A1.1 表单整体登记簿：登记粒度具体到 TAB 表样，依赖全部表单的 sheet 清单，故最后单独生成。
try {
  const a11Raw = [buildFormOverviewRegistrySheet(sheetsByForm)] as unknown as SpreadsheetSheetFixture[];
  const previewed = toPreviewSheets('A1.1', a11Raw);
  const grids = previewed.map((s) => sheetToMarkdownGrid(s));
  output['A1.1'] = { grids };
  const tabCount = Object.values(sheetsByForm).reduce((n, arr) => n + arr.length, 0);
  console.log(`OK   A1.1: ${grids.length} sheet(s) [登记 ${Object.keys(sheetsByForm).length} 个表单 / ${tabCount} 个 TAB 表样]`);
} catch (err) {
  console.error('FAIL A1.1:', err);
}

// 分片输出：每个表单一个 JSON 文件，落到 src/data/sheets/，供前端按需 import.meta.glob 加载
const sheetsDir = resolve(__dirname, '../src/data/sheets');
if (!existsSync(sheetsDir)) mkdirSync(sheetsDir, { recursive: true });
let writtenCount = 0;
for (const [code, content] of Object.entries(output)) {
  writeFileSync(resolve(sheetsDir, `${code}.json`), JSON.stringify(content, null, 2), 'utf-8');
  writtenCount += 1;
}
console.log(`\nWritten ${writtenCount} sheet files to ${sheetsDir}`);
console.log(`Total form codes: ${Object.keys(output).length}`);

// ---------------------------------------------------------------------------
// 子条目（TAB 级目录条目）生成：凡一张表单有多个 TAB 表样（sheetsByForm[code].length > 1），
// 在调研页左侧目录里把该表单拆成「表单目录 + 各 TAB 条目」。
//   子条目编码：优先取 sheet 名称自带的 TAB 编码（如 BB.1.3.a、BO.CF.M）；
//               sheet 名称只有父编码时（如「BAA.7 设备类采购付款比例表」）用 父编码-①/② 兜底。
// 输出 src/data/researchSubEntries.ts，由前端 ResearchSummaryView 直接 import（侧边栏需全量清单，
// 不能依赖按需加载的分片）。
// ---------------------------------------------------------------------------
const CN_CIRCLED = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫'];
interface GeneratedSubEntry { code: string; name: string; parent: string; sheetName: string }
const subEntries: GeneratedSubEntry[] = [];
for (const [formCode, names] of Object.entries(sheetsByForm)) {
  if (names.length <= 1) continue; // 单 TAB 表单不拆目录
  let fallbackIdx = 0;
  for (const sheetName of names) {
    const m = /^([A-Za-z0-9][A-Za-z0-9.]*)\s+(.*)$/.exec(sheetName);
    const token = m ? m[1] : '';
    const rest = m ? m[2] : sheetName;
    if (token && token !== formCode) {
      subEntries.push({ code: token, name: rest, parent: formCode, sheetName });
    } else {
      // sheet 名称未带独立 TAB 编码（或与父编码相同）：按父编码 + 圈号兜底
      fallbackIdx += 1;
      subEntries.push({
        code: `${formCode}-${CN_CIRCLED[fallbackIdx - 1] ?? fallbackIdx}`,
        name: rest,
        parent: formCode,
        sheetName,
      });
    }
  }
}
const subEntriesFile = resolve(__dirname, '../src/data/researchSubEntries.ts');
const subEntriesContent =
  '// ⚠ 本文件由 scripts/generateResearchMarkdownContent.ts 自动生成，请勿手工编辑。\n' +
  '// 生成规则：凡一张表单有多个 TAB 表样，即拆为「表单目录 + 各 TAB 条目」，供调研页左侧目录使用。\n' +
  '// 重新生成：npx tsx scripts/generateResearchMarkdownContent.ts\n\n' +
  'export interface ResearchSubEntry {\n' +
  '  /** 子条目编码（TAB 编码，如 BB.1.3.a；无独立编码时为 父编码-① 形式） */\n' +
  '  code: string;\n' +
  '  /** 子条目名称（TAB 名称） */\n' +
  '  name: string;\n' +
  '  /** 父表单编码 */\n' +
  '  parent: string;\n' +
  '  /** 对应 sheet 的 name（适配器返回值），用于定位到该 TAB */\n' +
  '  sheetName: string;\n' +
  '}\n\n' +
  'export const RESEARCH_SUB_ENTRIES: ResearchSubEntry[] = ' +
  JSON.stringify(subEntries, null, 2) +
  ';\n';
writeFileSync(subEntriesFile, subEntriesContent, 'utf-8');
const multiTabForms = new Set(subEntries.map((e) => e.parent)).size;
console.log(`Written ${subEntries.length} sub-entries (from ${multiTabForms} multi-TAB forms) to ${subEntriesFile}`);

