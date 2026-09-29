// AB.9 存货物料类别字典
// 定义存货物料分类，用于 BB.3.3 物料采购预算归类、BB.3.X 进销存品类拆分、及出库去向流转

export interface InventoryMaterialCategoryItem {
  code: string;        // 类别编码
  name: string;        // 类别名称
  scope: string;       // 适用范围与业务说明
  outboundRoute: string; // 默认出库去向与财务科目
  status: string;      // 状态
}

export const INVENTORY_MATERIAL_CATEGORIES: InventoryMaterialCategoryItem[] = [
  {
    code: 'IMC-01',
    name: '生产物料',
    scope: '直接用于产成品制造装配的原材料、零部件及主辅料',
    outboundRoute: '车间生产领料 → 转出进入在制品「料」小类，最终结转产成品成本',
    status: '启用'
  },
  {
    code: 'IMC-02',
    name: '研发物料',
    scope: '用于研发试制、测试验证、实验开发消耗的专属元器件与耗材',
    outboundRoute: '研发项目领用 → 计入 6603 研发费用',
    status: '启用'
  },
  {
    code: 'IMC-03',
    name: '服务物料',
    scope: '用于售后维保、交付调试、客户现场技术支持消耗的配件与耗材',
    outboundRoute: '售后技术服务消耗 → 对齐 BB.1.3 服务物料明细，计入 640103 主营业务成本—技术服务直接物料',
    status: '启用'
  },
  {
    code: 'IMC-04',
    name: '专项储备',
    scope: '为战略保供、长周期关键件储备、应急响应设立的安全库存备件',
    outboundRoute: '日常不轻易出库，仅在应急调拨或定期报废时在 BB.3.X 进销存预算表「转出数」列直接调整',
    status: '启用'
  },
  {
    code: 'IMC-05',
    name: '其他物料',
    scope: '行政办公、仓储包装、厂务运行维护及零星杂项通用物料',
    outboundRoute: '部门日常领用 → 按领用性质计入 6601 销售费用 或 6602 管理费用',
    status: '启用'
  },
  {
    code: 'IMC-06',
    name: '自制设备用料',
    scope: '用于自制设备/自制在建工程建造装配的专用物料',
    outboundRoute: '自制设备工程领料 → 计入 1604 在建工程，转固后按 AA.9 参数计提折旧',
    status: '启用'
  }
];
