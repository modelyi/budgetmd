/**
 * T6「整体流程图」数据层（概览时间线 / 泳道 / 编制日历）
 * =============================================================================
 * 布局数值（x/y/w/color）与文字都在数据里；文字字段在页面经 Markdown 编辑
 * （进覆盖层）。FlowView 只负责按数据画图。
 */

// ── 概览时间线 ──────────────────────────────────────────────
export interface FlowStep {
  id: string;
  x: number;
  color: string;
  label: string;
  sub: string;
}
export const overviewSteps: FlowStep[] = [
  { id: 'ov1', x: 40, color: '#475569', label: '1. 启动', sub: '集团下达目标' },
  { id: 'ov2', x: 180, color: '#059669', label: '2. 准备', sub: '主数据/假设参数就绪' },
  { id: 'ov3', x: 320, color: '#ea580c', label: '3. 业务编制', sub: '销售/生产/采购/HR 填报' },
  { id: 'ov4', x: 480, color: '#7c3aed', label: '4. 财务汇总', sub: '财务视角/成本/三表试算' },
  { id: 'ov5', x: 640, color: '#dc2626', label: '5. 合并抵销', sub: '关联交易识别/抵销分录' },
  { id: 'ov6', x: 800, color: '#1d4ed8', label: '6. 审批', sub: '评审/上报/批复' },
  { id: 'ov7', x: 940, color: '#0f172a', label: '7. 定稿', sub: '发布执行/月度滚动' },
];
export const overviewTitle = '预算编制工作流总览';
export const overviewIntro = '横向是时间顺序，每个阶段谁牵头、做什么。表间数据取数关系见 T8。';
export const overviewFoot: { id: string; text: string }[] = [
  { id: 'ovf1', text: '准备期：财务定假设（标准成本/费率/加成比例/拆分比例），业务部门确认主数据' },
  { id: 'ovf2', text: '编制期：业务部门先报业务数（销量/产量/采购/人头），财务再补财务视角（成本/法人/分录）' },
];

// ── 泳道图 ─────────────────────────────────────────────────
export interface SwimLane { id: string; name: string; color: string; y: number }
export interface SwimPhase { id: string; label: string; x: number; w: number }
export interface SwimBlock { id: string; lane: number; x: number; w: number; lines: string[] }

export const swimLanes: SwimLane[] = [
  { id: 'sl1', name: '销售部', color: '#059669', y: 80 },
  { id: 'sl2', name: '生产部', color: '#0891b2', y: 170 },
  { id: 'sl3', name: '集团采购与供应链', color: '#d97706', y: 260 },
  { id: 'sl4', name: '集团HR/行政', color: '#7c3aed', y: 350 },
  { id: 'sl5', name: '集团财经', color: '#1d4ed8', y: 440 },
];
export const swimPhases: SwimPhase[] = [
  { id: 'sp1', label: '准备期', x: 130, w: 160 },
  { id: 'sp2', label: '业务编制期', x: 300, w: 260 },
  { id: 'sp3', label: '财务汇总期', x: 570, w: 180 },
  { id: 'sp4', label: '审批输出期', x: 760, w: 190 },
];
export const swimBlocks: SwimBlock[] = [
  { id: 'sb1', lane: 0, x: 310, w: 140, lines: ['报签约/销量/单价', 'BB.1.1 / BB.1.2.a'] },
  { id: 'sb2', lane: 0, x: 460, w: 90, lines: ['服务报价', 'BB.1.3.a'] },
  { id: 'sb3', lane: 1, x: 320, w: 160, lines: ['按销售排产', 'BB.2.1'] },
  { id: 'sb4', lane: 2, x: 320, w: 140, lines: ['设备/物料采购', 'BB.3.1 / BB.3.3'] },
  { id: 'sb5', lane: 2, x: 470, w: 100, lines: ['进销存', 'BB.3.X'] },
  { id: 'sb6', lane: 3, x: 140, w: 120, lines: ['维护组织/人员'] },
  { id: 'sb7', lane: 3, x: 310, w: 130, lines: ['报雇员费用', 'BB.5.1'] },
  { id: 'sb8', lane: 4, x: 140, w: 140, lines: ['定假设参数', '标准成本/费率/加成'] },
  { id: 'sb9', lane: 4, x: 310, w: 140, lines: ['补财务视角', '成本/法人/分录'] },
  { id: 'sb10', lane: 4, x: 460, w: 100, lines: ['关联交易', 'BJ.C'] },
  { id: 'sb11', lane: 4, x: 580, w: 80, lines: ['合并抵销', 'BO.ELIM'] },
  { id: 'sb12', lane: 4, x: 670, w: 80, lines: ['试算三表', 'BO.PL/BS/CF'] },
  { id: 'sb13', lane: 4, x: 770, w: 100, lines: ['评审/批复', '定稿发布'] },
];
export const swimTitle = '预算编制泳道图';
export const swimIntro = '按部门 × 时间阶段，箭头表示工作交接（不是数据取数）';

// ── 编制日历 ───────────────────────────────────────────────
export interface CalRow { id: string; who: string; color: string }
export interface CalBlock { id: string; row: number; start: number; span: number; lines: string[] }
export interface CalMilestone { id: string; col: number; label: string }
export interface CalNote { id: string; title: string; variant: 'blue' | 'amber'; items: string[] }

export const calRows: CalRow[] = [
  { id: 'cr1', who: '总裁办/经管会', color: '#0f172a' },
  { id: 'cr2', who: '集团财经', color: '#1d4ed8' },
  { id: 'cr3', who: '销售部', color: '#059669' },
  { id: 'cr4', who: '生产/采购部', color: '#d97706' },
  { id: 'cr5', who: 'HR/设备/IT', color: '#7c3aed' },
];
export const calBlocks: CalBlock[] = [
  { id: 'cb1', row: 0, start: 0, span: 1, lines: ['下达预算目标', '一上'] },
  { id: 'cb2', row: 1, start: 1, span: 2, lines: ['主数据/假设参数准备', '标准成本·费率·比例'] },
  { id: 'cb3', row: 2, start: 2, span: 2, lines: ['报签约/销量/单价', 'BB.1.1 / BB.1.2'] },
  { id: 'cb4', row: 3, start: 3, span: 2, lines: ['排产/采购计划', 'BB.2.1 / BB.3'] },
  { id: 'cb5', row: 4, start: 3, span: 2, lines: ['人头费用/CAPEX', 'BB.5.1 / BB.4'] },
  { id: 'cb6', row: 1, start: 5, span: 2, lines: ['补财务视角/成本/税金', '三表试算'] },
  { id: 'cb7', row: 1, start: 7, span: 1, lines: ['关联交易/合并抵销', 'BJ.C / BO.ELIM'] },
  { id: 'cb8', row: 0, start: 8, span: 1, lines: ['预算评审会', '二上二下'] },
  { id: 'cb9', row: 1, start: 8, span: 1, lines: ['按意见修改'] },
  { id: 'cb10', row: 0, start: 9, span: 1, lines: ['定稿批复/发布', '预算执行令'] },
  { id: 'cb11', row: 1, start: 10, span: 2, lines: ['执行+月度滚动预测', '偏差分析'] },
];
export const calMilestones: CalMilestone[] = [
  { id: 'cm1', col: 0, label: '目标下达' },
  { id: 'cm2', col: 5, label: '业务数齐套' },
  { id: 'cm3', col: 8, label: '评审会' },
  { id: 'cm4', col: 9, label: '定稿' },
];
export const calTitle = '预算编制日历（示例节奏）';
export const calIntro = '以上年 10 月启动、12 月底定稿、次年 1 月执行滚动为基准；具体日期按集团年度经营节奏调整。甘特条长度=工作持续时间。';
export const calNotes: CalNote[] = [
  {
    id: 'cn1', title: '关键节奏说明', variant: 'blue',
    items: [
      '一上（10月）：集团下达目标 → 业务部门报业务数（销量/产量/采购/人头），财务只定假设参数。',
      '一下（11月中）：财务反馈初步测算结果，业务部门按反馈调整。',
      '二上（12月上）：业务数齐套后，财务补财务视角、税金、合并抵销、三表试算。',
      '二下（12月下）：经管会评审，定稿批复，次年 1 月起执行并做月度滚动预测。',
    ],
  },
  {
    id: 'cn2', title: '里程碑（硬节点）', variant: 'amber',
    items: [
      '10月上旬：预算目标下达，主数据冻结。',
      '11月下旬：业务数全部齐套，不得再改业务口径。',
      '12月中旬：三表试算通过，上经管会评审。',
      '12月下旬：预算定稿发布，进入执行期。',
    ],
  },
];
