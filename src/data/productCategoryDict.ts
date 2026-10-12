// AB.3 产品类别(财)字典数据
// 字典化：吸收 ProductCategory 联合类型 + DEFAULT_PRODUCT_COST_RATES + PRODUCT_REVENUE_RULES 映射

export interface ProductCategoryDictItem {
  code: string;                  // 编码
  name: string;                  // 产品类别(财)名
  defaultRevenueMethod: string;  // 默认收入确认方式
  costRatePct: number;           // 标准成本率 %
  notes: string;                 // 备注说明
}

export const PRODUCT_CATEGORY_DICT: ProductCategoryDictItem[] = [
  {
    code: 'PC-01',
    name: '整机台+验收款',
    defaultRevenueMethod: '验收一次性',
    costRatePct: 44,
    notes: '整机台设备验收合格当月一次性确认收入（时点法）；毛利率56%'
  },
  {
    code: 'PC-02',
    name: '关键模组+验收款',
    defaultRevenueMethod: '验收一次性',
    costRatePct: 48,
    notes: '核心子系统模组，现场测试合格验收当月确认；毛利率52%'
  },
  {
    code: 'PC-03',
    name: '零部件耗材+交付款',
    defaultRevenueMethod: '验收一次性',
    costRatePct: 52,
    notes: '标准零部件与耗材，交付签收当月一次性确认；毛利率48%'
  },
  {
    code: 'PC-04',
    name: '软件授权+授权款',
    defaultRevenueMethod: '验收一次性',
    costRatePct: 18,
    notes: '软件授权与Key下发，上线验收一次性确认；毛利率82%'
  },
  {
    code: 'PC-05',
    name: '技术服务维保+服务款',
    defaultRevenueMethod: '直线法',
    costRatePct: 35,
    notes: '驻场服务与年度维保，服务期内按月均摊确认（时段法）；毛利率65%'
  }
];
