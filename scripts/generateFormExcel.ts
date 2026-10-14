/**
 * 生成脚本（第一步）：把 AA / BA / BB 三类表单的完整表样信息 dump 成中间 JSON
 * （docs/formexcel/.dump/<表单编码>.json），由 scripts/generateFormExcel.py 用 openpyxl
 * 统一写出带样式的 Excel 文件（docs/formexcel/<表单编码>.xlsx）。
 *
 * 数据来源：与 scripts/generateResearchMarkdownContent.ts 的 FORM_SHEET_BUILDERS 完全一致的
 * 运行时 build*Sheet() 构建结果（该文件 import 即执行主流程、无 require.main 守卫，故本脚本
 * 自行维护一份相同映射，只覆盖 AA/BA/BB 三类 45 张表单，避免副作用）。
 *
 * 用法：npx tsx scripts/generateFormExcel.ts && python scripts/generateFormExcel.py
 * 输出：docs/formexcel/AA.*.xlsx（11 个）、BA*.xlsx（12 个）、BB.*.xlsx（22 个），合计 45 个。
 *
 * 注：不再使用 SheetJS 社区版 + zip 级 styles.xml 注入（该方式生成的样式损坏，
 * Office/LibreOffice 渲染整表发黑）；改为 dump + openpyxl 写样式。
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { SpreadsheetSheetFixture, SpreadsheetCell } from '../src/utils/spreadsheetTypes';
import { BUDGET_FORM_REGISTRY } from '../src/data/budgetFormRegistry';
import { registerRawTexts } from '../src/utils/xmlTexts';
import { HR_ORGANIZATION_DATA, LEGAL_ENTITIES, MANAGEMENT_UNITS } from '../src/mockData';
import { BUDGET_PROJECT_MASTER_DATA } from '../src/data/budgetProjectData';
import { ASSET_CATEGORY_LIST } from '../src/data/assetCategoryData';
import { ENABLED_BUDGET_PRODUCTS } from '../src/data/budgetProductMasterData';
import { MATERIAL_MASTER_DATA } from '../src/data/materialMasterData';
import {
  hourlyStandardCostSamples, materialStandardCostSamples, expenseBudgetSummaryResearchSamples,
  officeLeaseSiteMasterSamples, officeLeaseAnnualAreaSamples, officeLeaseDiscountRateSamples,
  expenseConversionRatioSamples,
} from '../src/data/assumptionSamples';
import { BUDGET_YEAR_MASTER_SAMPLE, BUDGET_PERIOD_CALENDAR_SAMPLE } from '../src/data/mappingSamples';
import { SALES_CONTRACT_SAMPLE, STOCK_ORDER_SAMPLE, SERVICE_REVENUE_SAMPLE, SERVICE_MATERIAL_SAMPLE, SERVICE_LABOR_SAMPLE, SALES_EXPENSE_SAMPLE } from '../src/data/salesSamples';
import { INFRASTRUCTURE_SAMPLE, OTHER_FIXED_ASSET_SAMPLE, ASSET_DISPOSAL_SAMPLE } from '../src/data/capexSamples';
import { externalOfficeLeaseSamples, externalLeaseCapitalizationSamples } from '../src/data/externalLeaseSamples';
import { buildSupplierMasterSheets } from '../src/utils/supplierMasterAdapter';
import {
  buildSalesContractSheet, buildStockOrderSheet, buildProductTransferSheet,
  buildServiceRevenueSheet, buildServiceMaterialSheet, buildServiceLaborSheet,
  buildProductionPlanResearchSheet, buildProductionPlanFinanceViewSheet,
  buildOtherFixedAssetAdditionSheet, buildAssetDisposalSheet, buildExistingAssetDepreciationSheet,
  buildSalesExpenseDetailSheet,
  buildCapexWithPoSheet, buildCapexNoPoSheet, buildCapexIntercompanyViewSheet, buildCapexFinanceViewSheet,
  buildMaterialProcurementWithPoSheet, buildMaterialProcurementNoPoSheet, buildMaterialProcurementIntercompanyViewSheet, buildMaterialProcurementFinanceViewSheet,
  buildInventoryFlowBudgetSheet, buildInventoryFlowRuleDetailSheet,
  buildInfrastructureResearchSheet, buildInfrastructureTransferSheet,
  buildSelfBuiltCipSheet, buildSelfBuiltLaborDetailSheet, buildSelfBuiltCipTransferSheet, buildSelfBuiltMaterialDetailSheet,
  buildProductStandardCostSheet, buildHourlyStandardCostSheet, buildMaterialStandardCostSheet,
  buildEquipmentProcurementPaymentRatioSheet, buildMaterialProcurementPaymentRatioSheet,
  buildExpenseBudgetSummaryResearchSheet, buildMaterialConsumptionSummarySheet,
  buildExpenseConversionRatioSheet, buildAssetConversionRatioSheet, buildDepreciationSplitRatioSheet, buildInventoryEntityRatioSheet,
  buildDepreciationExpenseSummarySheet, buildIncrementalDepreciationDetailSheet, buildExpenseConversionResultSheet,
  buildExternalOfficeLeaseSheet, buildExternalLeaseCapitalizationSheet,
  buildEmployeeExpenseImportSheet, buildEmployeeExpenseFinanceViewSheet,
  buildOfficeLeaseSiteMasterSheet, buildOfficeLeaseAnnualAreaSheet, buildOfficeLeaseAllocationRatioSheet, buildOfficeLeaseDiscountRateSheet,
  buildIntercompanyMarkupRatesSheet, buildIntercompanyLeasingSheet, buildIntercompanyLeaseCapitalizationSheet,
  buildSalesBudgetSummarySheet,
  buildBudgetPeriodMasterSheets, buildLegalEntityMasterSheets, buildUnifiedBudgetSubjectMasterSheets,
  buildCustomerFabMasterSheets, buildAdminDepartmentMasterSheet, buildBudgetProjectMasterDictSheet,
  buildBudgetProductMasterSheet, buildManagementUnitMasterSheets, buildAssetCategoryMasterSheets, buildMaterialMasterSheet,
} from '../src/utils/spreadsheetAdapters';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─────────────────────────────────────────────────────────────────────────────
// XML 文字源注册：与 generateResearchMarkdownContent.ts 相同——AA.3 统一科目体系等
// 构建函数通过 getFormText 读取 src/data/texts/*.xml，Node 下必须先注册。
// ─────────────────────────────────────────────────────────────────────────────
const xmlTextsDir = resolve(__dirname, '../src/data/texts');
const xmlTextFiles: string[] = existsSync(xmlTextsDir)
  ? readdirSync(xmlTextsDir).filter((f) => f.toLowerCase().endsWith('.xml'))
  : [];
registerRawTexts(
  Object.fromEntries(
    xmlTextFiles.map((f) => [`/src/data/texts/${f}`, readFileSync(resolve(xmlTextsDir, f), 'utf-8')]),
  ),
);
console.log(`[xmlTexts] 已注册 XML 文字源：${xmlTextFiles.length} 个文件`);

// ─────────────────────────────────────────────────────────────────────────────
// 示例数据（与 generateResearchMarkdownContent.ts 中的局部常量逐字一致）
// ─────────────────────────────────────────────────────────────────────────────

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

// BB.2.1.B 财务视角的单位标准成本带出数据（productName/standardCost 键，供完工生产成本=产量×单位标准成本计算）。
// BAA.2 表样自身的示例已内置在 buildProductStandardCostSheet 默认值中，不再由此常量传入。
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

// ─────────────────────────────────────────────────────────────────────────────
// FORM_SHEET_BUILDERS：与 generateResearchMarkdownContent.ts 的映射对 AA/BA/BB
// 45 张表单逐字一致（同一 builder 调用、同一示例数据）。
// ─────────────────────────────────────────────────────────────────────────────
const FORM_SHEET_BUILDERS: Record<string, () => SpreadsheetSheetFixture[]> = {
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
  'BAA.2': () => [buildProductStandardCostSheet()] as unknown as SpreadsheetSheetFixture[],
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
    // 研发长期物料需求（需求类型=研发长期；物料类别固定「研发物料」）——原独立研发长期表的行，已并入本表
    { budgetProject: 'P3 超快激光与复合加工预研', department: '研发中心', demandType: '研发长期', materialCode: 'MAT-OPT-001', materialName: '聚焦镜组', materialCategory: '研发物料', usage: '研发类',
      months: { m1: 0.6, m2: 0.4, m3: 0.5, m4: 0.3, m5: 0.4, m6: 0.5, m7: 0.3, m8: 0.6, m9: 0.4, m10: 0.3, m11: 0.5, m12: 0.4 } },
    { budgetProject: 'P3 超快激光与复合加工预研', department: '研发中心', demandType: '研发长期', materialCode: 'MAT-DRV-005', materialName: '伺服驱动组件', materialCategory: '研发物料', usage: '研发类',
      months: { m1: 1.0, m2: 0.5, m3: 0.5, m4: 1.0, m5: 0.5, m6: 1.0, m7: 0.5, m8: 1.0, m9: 0.5, m10: 0.5, m11: 1.0, m12: 0.5 } },
    { budgetProject: 'P3 超快激光与复合加工预研', department: '制造工程部', demandType: '研发长期', materialCode: 'MAT-COL-006', materialName: '循环机组组件', materialCategory: '研发物料', usage: '研发类',
      months: { m1: 0.8, m2: 0.4, m3: 0.6, m4: 0.4, m5: 0.6, m6: 0.8, m7: 0.4, m8: 0.6, m9: 0.4, m10: 0.6, m11: 0.8, m12: 0.6 } },
  ])] as unknown as SpreadsheetSheetFixture[],
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
  'BAA.11': () => [buildIntercompanyMarkupRatesSheet([])] as unknown as SpreadsheetSheetFixture[],
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
      // ② 从 BAP.2（需求类型=研发长期）获取（研发长期物料消耗需求）—— 研发专用物料，归属研发物料
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
  'BB.1.X': () => buildSalesBudgetSummarySheet() as unknown as SpreadsheetSheetFixture[],
};

// ─────────────────────────────────────────────────────────────────────────────
// 中间 JSON dump：与调研页 markdownTableConverter 的约定一致——
//   · 公式格：formula = v.f、v = 显示文本（m 优先，回落 v）；
//   · 表头判定与底色取 v.bg（只认表头四色）；
//   · 合并取 config.merge（起点 r_c → {r,c,rs,cs}），并随「序号」列跳过收缩；
//   · 「序号」列（表头 r=0/r=1 文本恰为「序号」）整列跳过，跳过后的 c 重新连续编号；
//   · 列宽取 config.columnlen（Univer px），由 generateFormExcel.py 换算为 Excel 字符宽。
// 输出 docs/formexcel/.dump/<表单编码>.json，随后由 scripts/generateFormExcel.py
// 用 openpyxl 统一写出带样式 xlsx（不再使用 SheetJS + zip 级样式注入）。
// ─────────────────────────────────────────────────────────────────────────────

/** 表头四色（深蓝×2 / 只读灰 / 可修改琥珀），与 SPREADSHEET_STYLES 一致 */
const HEADER_BG_COLORS = new Set(['#002f6c', '#001e4a', '#475569', '#b45309']);

/** 单元格显示文本：优先 m（格式化显示文本），再回落 v。 */
function cellText(cell: SpreadsheetCell): string {
  const v = cell.v;
  if (v === null || v === undefined) return '';
  if (typeof v !== 'object') return String(v);
  const obj = v as Record<string, unknown>;
  if (obj.m !== undefined && obj.m !== null && obj.m !== '') return String(obj.m);
  if (obj.v !== undefined && obj.v !== null) return String(obj.v);
  return '';
}

function hasPreviewCellContent(value: unknown): boolean {
  if (value === null || value === undefined || value === '') return false;
  if (typeof value !== 'object') return true;
  const v = value as Record<string, unknown>;
  return (v.v !== null && v.v !== undefined && v.v !== '') || Boolean(v.m) || Boolean(v.f);
}

/** 表头判定：v.bg 属于表头四色。 */
function cellIsHeader(cell: SpreadsheetCell): boolean {
  const v = cell.v;
  if (typeof v !== 'object' || v === null) return false;
  const bg = (v as Record<string, unknown>).bg;
  return typeof bg === 'string' && HEADER_BG_COLORS.has(bg);
}

/** 表头底色（仅四色之一，其余样式 bg 一律不带出）。 */
function cellHeaderBg(cell: SpreadsheetCell): string | undefined {
  const v = cell.v;
  if (typeof v !== 'object' || v === null) return undefined;
  const bg = (v as Record<string, unknown>).bg;
  return typeof bg === 'string' && HEADER_BG_COLORS.has(bg) ? bg : undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// dump 结构
// ─────────────────────────────────────────────────────────────────────────────
interface DumpCell {
  r: number; c: number;
  v: string | number | boolean;
  formula: string | null;
  isHeader: boolean;
  bg?: string;
}
interface DumpMerge { r: number; c: number; rs: number; cs: number }
interface DumpSheet {
  name: string;
  cells: DumpCell[];
  merges: DumpMerge[];
  colWidths: Record<string, number>;
}
interface DumpFile { fileName: string; sheets: DumpSheet[] }

interface SheetStats { name: string; rows: number; cols: number; merges: number; formulas: number }

/** celldata → dump sheet（「序号」列跳过、列号重新连续编号、merge 随之收缩）。 */
function fixtureToDumpSheet(sheet: SpreadsheetSheetFixture): { dump: DumpSheet; stats: SheetStats } {
  const cellMap = new Map<string, SpreadsheetCell>();
  let maxRow = 0;
  let maxCol = 0;
  let lastContentRow = -1;
  for (const cell of sheet.celldata) {
    cellMap.set(`${cell.r}_${cell.c}`, cell);
    maxRow = Math.max(maxRow, cell.r);
    maxCol = Math.max(maxCol, cell.c);
    if (hasPreviewCellContent(cell.v)) lastContentRow = Math.max(lastContentRow, cell.r);
  }
  const declaredCols = typeof sheet.column === 'number' && sheet.column > 0 ? sheet.column : 0;
  const rowCount = Math.max(1, lastContentRow + 1); // 与调研页一致：裁剪到最后一个有内容行
  const colCount = Math.max(maxCol + 1, declaredCols, 1);

  // 去掉「序号」列（表头 r=0/r=1 文本恰为「序号」；A1.1/A1.2 例外不在本次范围）
  const keepSeqColumn = sheet.name.startsWith('A1.1') || sheet.name.startsWith('A1.2');
  const skipCols = new Set<number>();
  if (!keepSeqColumn) {
    for (let c = 0; c < colCount; c++) {
      for (const r of [0, 1]) {
        const cell = cellMap.get(`${r}_${c}`);
        if (cell && cellText(cell) === '序号') { skipCols.add(c); break; }
      }
    }
  }
  const colMap = new Map<number, number>();
  let newCol = 0;
  for (let c = 0; c < colCount; c++) {
    if (!skipCols.has(c)) colMap.set(c, newCol++);
  }

  const cells: DumpCell[] = [];
  let formulaCount = 0;
  for (const cell of cellMap.values()) {
    if (skipCols.has(cell.c)) continue;
    const v = cell.v;
    if (v === null || v === undefined) continue;
    let dump: DumpCell | null = null;
    if (typeof v !== 'object') {
      if (v === '') continue;
      dump = { r: cell.r, c: colMap.get(cell.c)!, v: v as string | number | boolean, formula: null, isHeader: false };
    } else {
      const obj = v as Record<string, any>;
      const formula = typeof obj.f === 'string' && obj.f.trim() !== '' ? obj.f : null;
      const text = cellText(cell);
      if (formula === null && text === '') continue;
      const bg = cellHeaderBg(cell);
      const isHeader = cellIsHeader(cell);
      let value: string | number | boolean;
      if (formula !== null) {
        value = text; // 公式格：v 存显示文本、formula 存公式
      } else if (obj.m !== undefined && obj.m !== null && obj.m !== '') {
        value = String(obj.m);
      } else if (typeof obj.v === 'number' || typeof obj.v === 'boolean') {
        value = obj.v;
      } else {
        value = text;
      }
      dump = { r: cell.r, c: colMap.get(cell.c)!, v: value, formula, isHeader, ...(bg ? { bg } : {}) };
    }
    if (dump.formula) formulaCount += 1;
    cells.push(dump);
  }

  // 合并：起点 {r,c}，跨 {rs,cs}（列经「序号」跳过映射收缩；整块落在跳过列则丢弃）
  const merges: DumpMerge[] = [];
  const mergeConfig = sheet.config?.merge ?? {};
  for (const m of Object.values(mergeConfig)) {
    if (!m || typeof m.r !== 'number' || typeof m.c !== 'number') continue;
    const rs = Math.max(1, m.rs ?? 1);
    const cs = Math.max(1, m.cs ?? 1);
    const kept: number[] = [];
    for (let c = m.c; c <= m.c + cs - 1; c++) {
      const mapped = colMap.get(c);
      if (mapped !== undefined) kept.push(mapped);
    }
    if (kept.length === 0) continue; // 整块落在「序号」列
    const minC = Math.min(...kept);
    merges.push({ r: m.r, c: minC, rs, cs: Math.max(...kept) - minC + 1 });
  }

  // 列宽：config.columnlen（Univer px），按跳过后的列号输出，Python 侧换算 wch
  const colWidths: Record<string, number> = {};
  const columnlen = (sheet.config?.columnlen ?? sheet.config?.customWidth ?? {}) as Record<number | string, number | undefined>;
  for (let c = 0; c < colCount; c++) {
    if (skipCols.has(c)) continue;
    const raw = columnlen[c] ?? columnlen[String(c)];
    if (typeof raw === 'number' && raw > 0) colWidths[String(colMap.get(c)!)] = raw;
  }

  return {
    dump: { name: sheet.name, cells, merges, colWidths },
    stats: { name: sheet.name, rows: rowCount, cols: colCount - skipCols.size, merges: merges.length, formulas: formulaCount },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 主流程：dump 中间 JSON（45 张），随后由 scripts/generateFormExcel.py 写 xlsx
// ─────────────────────────────────────────────────────────────────────────────
const outDir = resolve(__dirname, '../docs/formexcel');
const dumpDir = resolve(outDir, '.dump');
mkdirSync(dumpDir, { recursive: true });

const registryName = new Map(BUDGET_FORM_REGISTRY.map((f) => [f.code, f.name]));
const AA_CODES = BUDGET_FORM_REGISTRY.filter((f) => f.code.startsWith('AA.')).map((f) => f.code);
const BA_CODES = BUDGET_FORM_REGISTRY.filter((f) => f.group === 'BA').map((f) => f.code);
const BB_CODES = BUDGET_FORM_REGISTRY.filter((f) => f.group === 'BB').map((f) => f.code);
const TARGET_CODES = new Set([...AA_CODES, ...BA_CODES, ...BB_CODES]);

const expected = TARGET_CODES.size;
const written: string[] = [];
let failures = 0;

console.log(`目标清单：AA ${AA_CODES.length} 张、BA ${BA_CODES.length} 张、BB ${BB_CODES.length} 张，合计 ${expected} 张\n`);

for (const form of BUDGET_FORM_REGISTRY) {
  if (!TARGET_CODES.has(form.code)) continue;
  const builder = FORM_SHEET_BUILDERS[form.code];
  if (!builder) {
    console.error(`FAIL ${form.code} ${form.name}: 缺少 builder`);
    failures += 1;
    continue;
  }
  try {
    const fixtures = builder().filter((s) => s && Array.isArray(s.celldata) && s.celldata.length > 0);
    const sheets: DumpSheet[] = [];
    for (const fixture of fixtures) {
      const { dump, stats } = fixtureToDumpSheet(fixture);
      sheets.push(dump);
      console.log(`    └ ${fixture.name}: ${stats.rows} 行 × ${stats.cols} 列, 合并 ${stats.merges}, 公式 ${stats.formulas}`);
    }
    const dumpFile: DumpFile = { fileName: form.code, sheets };
    const file = resolve(dumpDir, `${form.code}.json`);
    writeFileSync(file, JSON.stringify(dumpFile, null, 2), 'utf8');
    written.push(form.code);
    console.log(`OK   ${form.code} ${form.name} → ${file.replace(resolve(__dirname, '..') + '\\', '')} [${sheets.length} sheet]`);
  } catch (err) {
    console.error(`FAIL ${form.code} ${form.name}:`, err);
    failures += 1;
  }
}

// 分类统计
const countBy = (codes: string[]) => codes.filter((c) => written.includes(c)).length;
const aaN = countBy(AA_CODES);
const baN = countBy(BA_CODES);
const bbN = countBy(BB_CODES);

// 清理输出目录：旧 _preview 目录、不在目标清单内的残留 xlsx（防止残留污染计数）
if (existsSync(resolve(outDir, '_preview'))) {
  rmSync(resolve(outDir, '_preview'), { recursive: true, force: true });
  console.log('[cleanup] 已删除旧 _preview 目录');
}
for (const f of readdirSync(outDir)) {
  if (f === '.dump') continue;
  if (!f.endsWith('.xlsx')) continue;
  const code = f.slice(0, -'.xlsx'.length);
  if (!TARGET_CODES.has(code)) {
    rmSync(resolve(outDir, f), { force: true });
    console.log(`[cleanup] 已删除目标清单外的残留文件 ${f}`);
  }
}

console.log('\n════════ dump 完成（第二步：python scripts/generateFormExcel.py 写 xlsx）════════');
console.log(`AA 类（code 以 AA. 开头）: ${aaN}/${AA_CODES.length} 个 dump`);
console.log(`BA 类（group=BA）       : ${baN}/${BA_CODES.length} 个 dump`);
console.log(`BB 类（group=BB）       : ${bbN}/${BB_CODES.length} 个 dump`);
console.log(`合计: ${written.length}/${expected} 个 dump, 失败 ${failures}`);

const exitCode = failures === 0 && written.length === expected ? 0 : 1;
process.exitCode = exitCode;
