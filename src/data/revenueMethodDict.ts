// AB.4 收入确认方式字典数据
// 字典化：吸收 RevenueMethod 联合类型

export interface RevenueMethodDictItem {
  code: string;                   // 编码
  name: string;                   // 方式名
  recognitionType: '时点法' | '时段法'; // 准则分类（CAS 14）
  monthlyDistribution: string;    // 月度分摆逻辑
  notes: string;                  // 报表驱动说明
}

export const REVENUE_METHOD_DICT: RevenueMethodDictItem[] = [
  {
    code: 'RM-01',
    name: '验收一次性',
    recognitionType: '时点法',
    monthlyDistribution: '一次性确认（验收当月全额确认）',
    notes: '客户验收合格时点全额确认收入，不产生合同资产/负债，按合同签收当月集中确认'
  },
  {
    code: 'RM-02',
    name: '直线法',
    recognitionType: '时段法',
    monthlyDistribution: '按月均摊（合同服务期内等额分摊）',
    notes: '服务/维保合同按服务期均摊收入，产生合同资产（已履约未收款）或合同负债（已收款未履约）'
  }
];
