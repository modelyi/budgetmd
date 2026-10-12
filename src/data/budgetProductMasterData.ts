import { BudgetProductMasterItem } from '../types';

// AA.7 预算产品主数据演示登记册
// 覆盖 BAA.2 既有产品编码 + BB.1.2 既有产品名称，供编制表下拉同源
export const BUDGET_PRODUCT_MASTER_DATA: BudgetProductMasterItem[] = [
  {
    id: 'bp-001',
    code: 'PRD-LFC-3000',
    name: '高功率光纤激光切割机整机系统',
    specModel: 'LFC-3000K-光纤方案',
    productCategory: '整机台+验收款',
    unit: '套',
    notes: '主力量产光源整机，对应 BAA.2 本年定额基准'
  },
  {
    id: 'bp-002',
    code: 'PRD-OPM-880',
    name: '高精度光学光束整形准直模组',
    specModel: 'OPM-880-GEN3',
    productCategory: '关键模组+验收款',
    unit: '件',
    notes: '含反射镜组与双向消色差透镜'
  },
  {
    id: 'bp-003',
    code: 'PRD-DIS-350',
    name: '高压脉冲放电腔核心组件',
    specModel: 'DIS-350-V4',
    productCategory: '关键模组+验收款',
    unit: '件',
    notes: '核心产线放电腔体'
  },
  {
    id: 'bp-004',
    code: 'PRD-SRV-PKG-A',
    name: '整机年度全包维保服务包',
    specModel: 'PKG-ANNUAL-LFC',
    productCategory: '技术服务维保+服务款',
    unit: '年',
    notes: '含季度巡检与年度大修耗材'
  },
  {
    id: 'bp-005',
    code: 'PRD-SEN-CTRL',
    name: '纳秒级波长与能量闭环控制系统',
    specModel: 'CTRL-NS-09',
    productCategory: '零部件耗材+交付款',
    unit: '套',
    notes: '高速实时采样控制模块'
  },
  {
    id: 'bp-006',
    code: 'PRD-TUBE-5AXIS',
    name: '三维五轴激光切管机',
    specModel: 'LFC-3000',
    productCategory: '整机台+验收款',
    unit: '台',
    notes: 'BB.1.2 销售收入演示规格'
  },
  {
    id: 'bp-007',
    code: 'PRD-EBEAM-PRO',
    name: '自动化板材尺寸检测工作站',
    specModel: '板材检测工作站 Pro',
    productCategory: '整机台+验收款',
    unit: '台',
    notes: 'BB.1.2 销售收入演示规格'
  },
  {
    id: 'bp-008',
    code: 'PRD-ALIGN-X',
    name: '自动上下料与定位工作站',
    specModel: 'AlignMaster-X',
    productCategory: '整机台+验收款',
    unit: '台',
    notes: 'BB.1.2 销售收入演示规格'
  },
  {
    id: 'bp-009',
    code: 'PRD-OPTO-NA',
    name: 'OptoLens-NA0.85 高数值孔径投影物镜组件',
    specModel: 'OptoLens-NA0.85',
    productCategory: '零部件耗材+交付款',
    unit: '套',
    notes: 'BB.1.2 销售收入演示规格'
  },
  {
    id: 'bp-010',
    code: 'PRD-SUB-TWIN',
    name: '双工位高精度运动机构',
    specModel: 'Subsystem-Twin',
    productCategory: '关键模组+验收款',
    unit: '套',
    notes: 'BB.1.2 销售收入演示规格'
  },
  {
    id: 'bp-011',
    code: 'PRD-OPC-SUITE',
    name: 'OPC-OptiSuite Enterprise 计算仿真软件',
    specModel: 'OPC-OptiSuite Enterprise',
    productCategory: '软件授权+授权款',
    unit: '套',
    notes: 'BB.1.2 销售收入演示规格'
  },
  {
    id: 'bp-012',
    code: 'PRD-YIELD-AI',
    name: 'YieldMaster AI Pro 产线良率大数据分析平台',
    specModel: 'YieldMaster AI Pro',
    productCategory: '软件授权+授权款',
    unit: '套',
    notes: 'BB.1.2 销售收入演示规格'
  },
  {
    id: 'bp-013',
    code: 'PRD-VISION-SDK',
    name: 'VisionDeep Algorithm SDK 缺陷检测算法包',
    specModel: 'VisionDeep Algorithm SDK',
    productCategory: '软件授权+授权款',
    unit: '份',
    notes: 'BB.1.2 销售收入演示规格'
  },
  {
    id: 'bp-014',
    code: 'PRD-CUT-MET',
    name: '板材切缝质量检测与分析站',
    specModel: 'CutMetrology',
    productCategory: '整机台+验收款',
    unit: '台',
    notes: 'BB.1.2 销售收入演示规格'
  }
];

export const ENABLED_BUDGET_PRODUCTS = BUDGET_PRODUCT_MASTER_DATA;
