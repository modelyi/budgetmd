/**
 * T6「整体编制流程图」数据层 —— 年度预算编制流程图（全流程版）
 * =============================================================================
 * 7 个阶段 × 10 条泳道：阶段头 / 泳道 / 卡片（含徽标与卡内文字）/ 箭头 / 线旁标注 / 图例。
 * 坐标与配色为绘图数据，FlowView 按数据画图；文字经 makeKey 走人工覆盖层（只读展示）。
 *
 * 口径说明（与项目现行口径一致，勿回退）：
 *   · 合并抵销 BO.ELIM 只做五类抵销（内部购销 / 内部往来 / 内部现金流 / 未实现利润—存货 / 未实现利润—长期资产）；
 *     递延所得税等税层面影响由财务人工测算，系统不做、不列为抵销事项——卡面已按此口径书写。
 *   · 资本性支出汇总表编码为 BB.4.X。
 */

export interface DiagramViewBox { width: number; height: number }
export interface DiagramStage { id: string; label: string; x: number; w: number; y: number; h: number; rx: number; fill: string; stroke: string; color: string }
export interface DiagramLaneBand { x: number; w: number; rx: number }
export interface DiagramLane { id: string; name: string; y: number; h: number; labelY: number; fill: string; stroke: string; color: string; size: number }
export interface DiagramText { text: string; x: number; y: number; size: number; weight: number; color: string }
export interface DiagramBadge { text: string; x: number; y: number; w: number; h: number; rx: number; fill: string; stroke?: string | null; color: string; size: number }
export interface DiagramNode { id: string; kind: 'box' | 'decision'; x: number; y: number; w: number; h: number; rx: number; fill: string; stroke: string; strokeWidth: number; points: string; badge: DiagramBadge | null; lines: DiagramText[] }
export interface DiagramArrow { id: string; d: string; kind: 'solid' | 'supply' | 'return' }
export interface DiagramNote { id: string; text: string; x: number; y: number; color: string; size: number }
export interface DiagramLegend { id: string; label: string; kind: 'swatch' | 'dash'; color: string; borderColor?: string | null }

export const diagramTitle = '年度预算编制流程图'
export const diagramSubtitle = '装备制造集团全面预算 · 主线：启动 → 假设准备 → 业务编制 → 财务汇总 → 合并三表 → 评审平衡 → 定稿执行'
export const diagramViewBox: DiagramViewBox = { width: 1580, height: 1300 }

/** 阶段头（7 个）：① 编制启动 … ⑦ 定稿与执行 */
export const stageHeaders: DiagramStage[] = [
  { id: 'st1', label: '① 编制启动', x: 90, w: 204, y: 66, h: 42, rx: 10, fill: '#dbeafe', stroke: '#60a5fa', color: '#1e3a8a' },
  { id: 'st2', label: '② 假设与准备', x: 294, w: 204, y: 66, h: 42, rx: 10, fill: '#fef3c7', stroke: '#f59e0b', color: '#92400e' },
  { id: 'st3', label: '③ 业务编制', x: 498, w: 204, y: 66, h: 42, rx: 10, fill: '#dcfce7', stroke: '#16a34a', color: '#166534' },
  { id: 'st4', label: '④ 财务汇总', x: 702, w: 204, y: 66, h: 42, rx: 10, fill: '#e0f2fe', stroke: '#0284c7', color: '#0c4a6e' },
  { id: 'st5', label: '⑤ 合并与三表', x: 906, w: 204, y: 66, h: 42, rx: 10, fill: '#ede9fe', stroke: '#7c3aed', color: '#5b21b6' },
  { id: 'st6', label: '⑥ 评审与平衡', x: 1110, w: 204, y: 66, h: 42, rx: 10, fill: '#fee2e2', stroke: '#dc2626', color: '#991b1b' },
  { id: 'st7', label: '⑦ 定稿与执行', x: 1314, w: 186, y: 66, h: 42, rx: 10, fill: '#dbeafe', stroke: '#60a5fa', color: '#1e3a8a' },
];

/** 泳道背景：10 条横向色带（同宽同列，只有 y / 高 / 底色不同） */
export const laneBand: DiagramLaneBand = { x: 30, w: 1530, rx: 10 };
export const stageDividerY = { top: 112, bottom: 1278 };

/** 泳道（10 条，自上而下） */
export const lanes: DiagramLane[] = [
  { id: 'ln1', name: '预算办公室', y: 118, h: 108, labelY: 172, fill: '#fbfdff', stroke: '#e2e8f0', color: '#1f3b73', size: 15 },
  { id: 'ln2', name: '销售部门', y: 226, h: 120, labelY: 286, fill: '#ffffff', stroke: '#e2e8f0', color: '#1f3b73', size: 14 },
  { id: 'ln3', name: '采购与供应链', y: 346, h: 120, labelY: 406, fill: '#ffffff', stroke: '#e2e8f0', color: '#1f3b73', size: 14 },
  { id: 'ln4', name: '生产部门', y: 466, h: 120, labelY: 526, fill: '#ffffff', stroke: '#e2e8f0', color: '#1f3b73', size: 14 },
  { id: 'ln5', name: '后勤部门', y: 586, h: 80, labelY: 632, fill: '#f0f9ff', stroke: '#bae6fd', color: '#0c4a6e', size: 14 },
  { id: 'ln6', name: '成本管理部', y: 666, h: 80, labelY: 712, fill: '#fffbeb', stroke: '#fde68a', color: '#92400e', size: 14 },
  { id: 'ln7', name: '财经组', y: 746, h: 256, labelY: 874, fill: '#fbfdff', stroke: '#e2e8f0', color: '#1f3b73', size: 15 },
  { id: 'ln8', name: '人事部门', y: 1002, h: 88, labelY: 1050, fill: '#fff7ed', stroke: '#fed7aa', color: '#9a3412', size: 14 },
  { id: 'ln9', name: '系统维护组', y: 1090, h: 88, labelY: 1138, fill: '#f0fdf4', stroke: '#bbf7d0', color: '#166534', size: 14 },
  { id: 'ln10', name: '各项目/部门', y: 1178, h: 100, labelY: 1232, fill: '#ffffff', stroke: '#e2e8f0', color: '#1f3b73', size: 14 },
];

/** 箭头：solid=实线主线，supply=蓝虚线（数据供给），return=红虚线（评审退回） */
export const arrowStyles = {
  solid: { stroke: '#475569', width: 2.2, dash: '', marker: 'solid-marker' },
  supply: { stroke: '#2563eb', width: 1.6, dash: '6 4', marker: 'supply-marker' },
  return: { stroke: '#dc2626', width: 1.8, dash: '7 4', marker: 'return-marker' },
} as const;
export const arrows: DiagramArrow[] = [
  { id: 'ar1', d: 'M 192 204 L 192 283 L 304 283', kind: 'solid' },
  { id: 'ar2', d: 'M 488 283 L 502 283', kind: 'solid' },
  { id: 'ar3', d: 'M 682 283 L 906 283', kind: 'solid' },
  { id: 'ar4', d: 'M 682 403 C 760 403 840 340 906 296', kind: 'solid' },
  { id: 'ar5', d: 'M 682 523 C 760 523 840 380 906 310', kind: 'solid' },
  { id: 'ar6', d: 'M 682 626 C 760 626 840 400 906 320', kind: 'solid' },
  { id: 'ar7', d: 'M 1004 316 C 1004 460 802 680 802 816', kind: 'solid' },
  { id: 'ar8', d: 'M 682 853 L 706 853', kind: 'solid' },
  { id: 'ar9', d: 'M 802 890 L 802 902', kind: 'solid' },
  { id: 'ar10', d: 'M 898 919 L 910 853', kind: 'solid' },
  { id: 'ar11', d: 'M 1006 890 L 1006 902', kind: 'solid' },
  { id: 'ar12', d: 'M 1102 939 L 1114 853', kind: 'solid' },
  { id: 'ar13', d: 'M 1210 890 L 1210 902', kind: 'solid' },
  { id: 'ar14', d: 'M 1306 939 L 1318 939 L 1318 172 L 1296 172', kind: 'solid' },
  { id: 'ar15', d: 'M 1292 172 L 1326 172', kind: 'solid' },
  { id: 'ar16', d: 'M 396 1102 L 396 766', kind: 'supply' },
  { id: 'ar17', d: 'M 488 1048 C 520 960 500 840 490 786', kind: 'supply' },
  { id: 'ar18', d: 'M 670 1014 L 670 316', kind: 'supply' },
  { id: 'ar19', d: 'M 500 786 C 520 680 540 480 560 316', kind: 'supply' },
  { id: 'ar20', d: 'M 500 786 C 520 700 540 580 560 403', kind: 'supply' },
  { id: 'ar21', d: 'M 500 786 C 520 740 540 660 560 523', kind: 'supply' },
  { id: 'ar22', d: 'M 490 786 L 706 853', kind: 'supply' },
  { id: 'ar23', d: 'M 682 940 L 706 960', kind: 'supply' },
  { id: 'ar24', d: 'M 420 1190 L 420 800', kind: 'supply' },
  { id: 'ar25', d: 'M 488 706 C 510 660 510 580 502 523', kind: 'supply' },
  { id: 'ar26', d: 'M 570 436 L 570 816', kind: 'supply' },
  { id: 'ar27', d: 'M 592 652 L 592 816', kind: 'supply' },
  { id: 'ar28', d: 'M 614 1190 L 614 890', kind: 'supply' },
  { id: 'ar29', d: 'M 1212 212 L 1212 240 L 900 240 L 900 250', kind: 'return' },
];

/** 线旁标注 */
export const edgeNotes: DiagramNote[] = [
  { id: 'nt1', text: '退回调整', x: 1120, y: 233, color: '#dc2626', size: 11.5 },
  { id: 'nt2', text: '业务数齐套', x: 820, y: 480, color: '#64748b', size: 11 },
  { id: 'nt3', text: '复审通过', x: 1330, y: 930, color: '#64748b', size: 11 },
  { id: 'nt4', text: '主数据供给', x: 340, y: 960, color: '#2563eb', size: 11 },
  { id: 'nt5', text: '人工费率', x: 505, y: 920, color: '#2563eb', size: 11 },
  { id: 'nt6', text: '雇员费用', x: 680, y: 700, color: '#2563eb', size: 11 },
  { id: 'nt7', text: '假设参数', x: 512, y: 740, color: '#2563eb', size: 11 },
  { id: 'nt8', text: '折旧/费用', x: 690, y: 935, color: '#2563eb', size: 11 },
  { id: 'nt9', text: '费用/物料需求', x: 430, y: 1020, color: '#2563eb', size: 11 },
  { id: 'nt10', text: '标准成本', x: 495, y: 620, color: '#2563eb', size: 11 },
  { id: 'nt11', text: '资本化汇总', x: 625, y: 730, color: '#2563eb', size: 11 },
];

/** 卡片（含评审菱形） */
export const nodes: DiagramNode[] = [
  { id: 'cd1', kind: 'box', x: 104, y: 140, w: 176, h: 64, rx: 12, fill: '#dbeafe', stroke: '#2563eb', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '年度预算启动', x: 192, y: 170, size: 13.5, weight: 700, color: '#0f172a' },
    { text: '下达编制指引与时间表', x: 192, y: 190, size: 11, weight: 400, color: '#334155' },
  ] },
  { id: 'cd2', kind: 'decision', x: 1132.0, y: 132.0, w: 160.0, h: 80.0, rx: 0, fill: '#fee2e2', stroke: '#dc2626', strokeWidth: 1.6, points: '1212,132 1292,172 1212,212 1132,172', badge: null, lines: [
    { text: '预算评审会', x: 1212, y: 165, size: 13, weight: 700, color: '#7f1d1d' },
    { text: '通过 / 退回', x: 1212, y: 187, size: 10.5, weight: 400, color: '#991b1b' },
  ] },
  { id: 'cd3', kind: 'box', x: 1326, y: 140, w: 162, h: 64, rx: 12, fill: '#dbeafe', stroke: '#2563eb', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '终审定稿', x: 1407, y: 164, size: 13.5, weight: 700, color: '#0f172a' },
    { text: '预算执行令', x: 1407, y: 184, size: 11, weight: 400, color: '#334155' },
    { text: '发布 · 月度滚动', x: 1407, y: 199, size: 10.5, weight: 400, color: '#475569' },
  ] },
  { id: 'cd4', kind: 'box', x: 304, y: 250, w: 184, h: 66, rx: 12, fill: '#fef3c7', stroke: '#d97706', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '经营假设确认', x: 396, y: 276, size: 13, weight: 700, color: '#0f172a' },
    { text: '客户 / 项目 / 产能 / 在手订单', x: 396, y: 296, size: 11, weight: 400, color: '#334155' },
  ] },
  { id: 'cd5', kind: 'box', x: 502, y: 250, w: 180, h: 66, rx: 12, fill: '#dcfce7', stroke: '#16a34a', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '销售预算 BB.1', x: 592, y: 274, size: 12.5, weight: 700, color: '#0f172a' },
    { text: '签约 1.1 · 软硬件 1.2', x: 592, y: 294, size: 10.5, weight: 400, color: '#1f2937' },
    { text: '服务 1.3 · 销售费用 1.4', x: 592, y: 310, size: 10.5, weight: 400, color: '#1f2937' },
  ] },
  { id: 'cd6', kind: 'box', x: 906, y: 250, w: 196, h: 66, rx: 12, fill: '#fee2e2', stroke: '#dc2626', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '业务初审', x: 1004, y: 276, size: 13, weight: 700, color: '#0f172a' },
    { text: '销量 / 产量 / 采购 / 人头齐套', x: 1004, y: 296, size: 11, weight: 400, color: '#334155' },
  ] },
  { id: 'cd7', kind: 'box', x: 502, y: 370, w: 180, h: 66, rx: 12, fill: '#dcfce7', stroke: '#16a34a', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '采购预算 BB.3', x: 592, y: 394, size: 12.5, weight: 700, color: '#0f172a' },
    { text: '设备采购 3.1 · 物料 3.3', x: 592, y: 414, size: 10.5, weight: 400, color: '#1f2937' },
    { text: '进销存 3.X', x: 592, y: 430, size: 10.5, weight: 400, color: '#1f2937' },
  ] },
  { id: 'cd8', kind: 'box', x: 502, y: 490, w: 180, h: 66, rx: 12, fill: '#dcfce7', stroke: '#16a34a', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '生产预算', x: 592, y: 518, size: 12.5, weight: 700, color: '#0f172a' },
    { text: '生产排产 BB.2.1', x: 592, y: 538, size: 10.5, weight: 400, color: '#1f2937' },
  ] },
  { id: 'cd9', kind: 'box', x: 502, y: 600, w: 180, h: 52, rx: 12, fill: '#dcfce7', stroke: '#16a34a', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '基建工程预算', x: 592, y: 622, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.3.2 基建工程', x: 592, y: 640, size: 10.5, weight: 400, color: '#1f2937' },
  ] },
  { id: 'cd10', kind: 'box', x: 304, y: 685, w: 184, h: 42, rx: 10, fill: '#ffffff', stroke: '#d97706', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '标准成本维护', x: 396, y: 707, size: 11.5, weight: 700, color: '#0f172a' },
    { text: 'BAA.2 产品单位成本 · BAA.4 物料单位成本', x: 396, y: 721, size: 9.5, weight: 400, color: '#334155' },
  ] },
  { id: 'cd11', kind: 'box', x: 304, y: 766, w: 184, h: 42, rx: 10, fill: '#ffffff', stroke: '#d97706', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '假设与前置信息', x: 396, y: 788, size: 11.5, weight: 700, color: '#0f172a' },
    { text: '税率/拆分比例', x: 396, y: 802, size: 9.5, weight: 400, color: '#334155' },
  ] },
  { id: 'cd12', kind: 'box', x: 502, y: 816, w: 180, h: 74, rx: 12, fill: '#e2e8f0', stroke: '#64748b', strokeWidth: 1, points: '', badge: { text: '系统计算', x: 624, y: 818, w: 58, h: 18, rx: 9, fill: '#64748b', color: '#ffffff', size: 10 }, lines: [
    { text: '资本性支出预算', x: 592, y: 850, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.4.X 资本性支出汇总', x: 592, y: 869, size: 10.5, weight: 400, color: '#334155' },
    { text: '设备采购·自制设备·基建', x: 592, y: 885, size: 10, weight: 400, color: '#475569' },
  ] },
  { id: 'cd13', kind: 'box', x: 706, y: 816, w: 192, h: 74, rx: 12, fill: '#e2e8f0', stroke: '#64748b', strokeWidth: 1, points: '', badge: { text: '系统计算', x: 838, y: 818, w: 58, h: 18, rx: 9, fill: '#64748b', color: '#ffffff', size: 10 }, lines: [
    { text: '财务视角补充', x: 802, y: 850, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.1.2.c / BB.1.3.c 成本·法人·分录', x: 802, y: 869, size: 10.5, weight: 400, color: '#334155' },
    { text: '代采按净额法（CAS 14）', x: 802, y: 884, size: 10, weight: 400, color: '#475569' },
  ] },
  { id: 'cd14', kind: 'box', x: 502, y: 902, w: 180, h: 76, rx: 12, fill: '#e2e8f0', stroke: '#64748b', strokeWidth: 1, points: '', badge: { text: '财经经营组', x: 624, y: 904, w: 58, h: 18, rx: 9, fill: '#0f766e', color: '#ffffff', size: 10 }, lines: [
    { text: '折旧与费用归集', x: 592, y: 936, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.4 折旧计提', x: 592, y: 955, size: 10.5, weight: 400, color: '#334155' },
    { text: 'BB.5.2 费用转换归集', x: 592, y: 971, size: 10.5, weight: 400, color: '#334155' },
  ] },
  { id: 'cd15', kind: 'box', x: 706, y: 902, w: 192, h: 35, rx: 10, fill: '#e2e8f0', stroke: '#64748b', strokeWidth: 1, points: '', badge: { text: '财经资金组', x: 828, y: 904, w: 64, h: 14, rx: 7, fill: '#1d4ed8', color: '#ffffff', size: 9 }, lines: [
    { text: '资金预算 BF.1/BF.3', x: 770, y: 924, size: 11.5, weight: 700, color: '#0f172a' },
  ] },
  { id: 'cd16', kind: 'box', x: 706, y: 943, w: 192, h: 35, rx: 10, fill: '#e2e8f0', stroke: '#64748b', strokeWidth: 1, points: '', badge: { text: '财经税金组', x: 828, y: 945, w: 64, h: 14, rx: 7, fill: '#dc2626', color: '#ffffff', size: 9 }, lines: [
    { text: '税金测算 BF.4 增值税', x: 770, y: 965, size: 11.5, weight: 700, color: '#0f172a' },
  ] },
  { id: 'cd17', kind: 'box', x: 910, y: 816, w: 192, h: 74, rx: 12, fill: '#e2e8f0', stroke: '#dc2626', strokeWidth: 1.5, points: '', badge: { text: '财经税金组', x: 1030, y: 818, w: 64, h: 16, rx: 8, fill: '#dc2626', color: '#ffffff', size: 9.5 }, lines: [
    { text: '关联交易识别', x: 1006, y: 850, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BJ.C 内部交易识别', x: 1006, y: 869, size: 10.5, weight: 400, color: '#334155' },
    { text: '跨法人购销 / 代采 / 租赁', x: 1006, y: 885, size: 10, weight: 400, color: '#475569' },
  ] },
  { id: 'cd18', kind: 'box', x: 910, y: 902, w: 192, h: 74, rx: 12, fill: '#e2e8f0', stroke: '#dc2626', strokeWidth: 1.5, points: '', badge: { text: '财经税金组', x: 1030, y: 904, w: 64, h: 16, rx: 8, fill: '#dc2626', color: '#ffffff', size: 9.5 }, lines: [
    { text: '合并抵销', x: 1006, y: 936, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BO.ELIM 五类抵销底稿', x: 1006, y: 955, size: 10.5, weight: 400, color: '#334155' },
    { text: '五类抵销 · 递延所得税由人工测算', x: 1006, y: 971, size: 10, weight: 400, color: '#475569' },
  ] },
  { id: 'cd19', kind: 'box', x: 1114, y: 816, w: 192, h: 74, rx: 12, fill: '#e2e8f0', stroke: '#64748b', strokeWidth: 1, points: '', badge: { text: '财经经营组', x: 1246, y: 818, w: 58, h: 18, rx: 9, fill: '#0f766e', color: '#ffffff', size: 10 }, lines: [
    { text: '三表试算', x: 1210, y: 850, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BO.PL / BO.BS / BO.CF', x: 1210, y: 869, size: 10.5, weight: 400, color: '#334155' },
    { text: '勾稽：资产负债平衡 · 现金一致', x: 1210, y: 884, size: 10, weight: 400, color: '#475569' },
  ] },
  { id: 'cd20', kind: 'box', x: 1114, y: 902, w: 192, h: 74, rx: 12, fill: '#ffffff', stroke: '#dc2626', strokeWidth: 1, points: '', badge: { text: '财经经营组', x: 1246, y: 904, w: 58, h: 18, rx: 9, fill: '#0f766e', color: '#ffffff', size: 10 }, lines: [
    { text: '财务复审', x: 1210, y: 936, size: 12.5, weight: 700, color: '#0f172a' },
    { text: '三表勾稽 / 平衡校验 / 风险事项', x: 1210, y: 955, size: 10.5, weight: 400, color: '#334155' },
  ] },
  { id: 'cd21', kind: 'box', x: 304, y: 1014, w: 184, h: 68, rx: 12, fill: '#fff7ed', stroke: '#f97316', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '岗位工时费率设置', x: 396, y: 1044, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BAA.3', x: 396, y: 1066, size: 10.5, weight: 400, color: '#334155' },
  ] },
  { id: 'cd22', kind: 'box', x: 560, y: 1014, w: 220, h: 68, rx: 12, fill: '#fff7ed', stroke: '#f97316', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '雇员费用编制/导入', x: 670, y: 1044, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.5.1', x: 670, y: 1066, size: 10.5, weight: 400, color: '#334155' },
  ] },
  { id: 'cd23', kind: 'box', x: 304, y: 1102, w: 184, h: 70, rx: 12, fill: '#f0fdf4', stroke: '#16a34a', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '基础静态数据设置', x: 396, y: 1132, size: 12, weight: 700, color: '#0f172a' },
    { text: '主数据 AA/AB/AM · 系统初始化', x: 396, y: 1154, size: 10, weight: 400, color: '#334155' },
  ] },
  { id: 'cd24', kind: 'box', x: 304, y: 1190, w: 184, h: 80, rx: 12, fill: '#ffffff', stroke: '#16a34a', strokeWidth: 1, points: '', badge: { text: '手工录入', x: 434, y: 1192, w: 52, h: 18, rx: 9, fill: '#dcfce7', stroke: '#16a34a', color: '#166534', size: 10 }, lines: [
    { text: '费用与物料需求', x: 396, y: 1226, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BA.5 费用预算 · BAP 物料需求', x: 396, y: 1246, size: 10.5, weight: 400, color: '#334155' },
    { text: '各项目/部门填报', x: 396, y: 1262, size: 10, weight: 400, color: '#475569' },
  ] },
  { id: 'cd25', kind: 'box', x: 502, y: 1190, w: 180, h: 80, rx: 12, fill: '#ffffff', stroke: '#16a34a', strokeWidth: 1, points: '', badge: { text: '手工录入', x: 624, y: 1192, w: 52, h: 18, rx: 9, fill: '#dcfce7', stroke: '#16a34a', color: '#166534', size: 10 }, lines: [
    { text: '自制设备预算', x: 592, y: 1226, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.4.1 人工·领料·转固', x: 592, y: 1246, size: 10.5, weight: 400, color: '#334155' },
    { text: '各项目/部门编制', x: 592, y: 1262, size: 10, weight: 400, color: '#475569' },
  ] },
];

/** 图例（8 项） */
export const legendItems: DiagramLegend[] = [
  { id: 'lg1', label: '手工填报', kind: 'swatch', color: '#ffffff', borderColor: '#94a3b8' },
  { id: 'lg2', label: '系统计算', kind: 'swatch', color: '#e2e8f0', borderColor: '#64748b' },
  { id: 'lg3', label: '启动/假设/评审', kind: 'swatch', color: '#fef3c7', borderColor: '#d97706' },
  { id: 'lg4', label: '业务编制', kind: 'swatch', color: '#dcfce7', borderColor: '#16a34a' },
  { id: 'lg5', label: '财务汇总', kind: 'swatch', color: '#e0f2fe', borderColor: '#0284c7' },
  { id: 'lg6', label: '合并与三表', kind: 'swatch', color: '#ede9fe', borderColor: '#7c3aed' },
  { id: 'lg7', label: '数据供给', kind: 'dash', color: '#2563eb' },
  { id: 'lg8', label: '评审退回', kind: 'dash', color: '#dc2626' },
];

