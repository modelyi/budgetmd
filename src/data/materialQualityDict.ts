// AB.6 物料好坏件字典数据
// 定义服务物料附表中「物件类别」的取值及业务含义，用于 BB.1.3 服务物料明细表填报
// 财务视角物料成本 = Σ(好件物料成本) - Σ(坏件物料成本)，按合同/项目维度聚合后回写主表

export interface MaterialQualityDictItem {
  code: string;           // 编码
  name: '好件' | '坏件'; // 物件类别名称
  direction: '+' | '-';  // 成本方向：好件计入（+），坏件抵减（-）
  description: string;   // 业务含义说明
  costFormula: string;   // 物料成本计算口径
  refForms: string;      // 引用表单
}

export const MATERIAL_QUALITY_DICT: MaterialQualityDictItem[] = [
  {
    code: 'MQ-01',
    name: '好件',
    direction: '+',
    description: '正品物料，正常投入服务作业消耗，物料成本正向计入服务成本',
    costFormula: '好件物料成本 = Σ(好件数量 × 物料标准成本)',
    refForms: 'BB.1.3-③ 服务收入与成本预算附表_物料明细填报；BB.1.3-② 服务销售收入与成本预算_财务视角（物料成本列）',
  },
  {
    code: 'MQ-02',
    name: '坏件',
    direction: '-',
    description: '更换下来的旧件/缺陷件，核销或退库后可抵减当期物料成本，物料成本反向抵减',
    costFormula: '坏件抵减 = Σ(坏件数量 × 物料标准成本)；净物料成本 = 好件成本 - 坏件抵减',
    refForms: 'BB.1.3-③ 服务收入与成本预算附表_物料明细填报；BB.1.3-② 服务销售收入与成本预算_财务视角（物料成本列）',
  },
];
