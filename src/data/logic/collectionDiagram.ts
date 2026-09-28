/**
 * 整体逻辑图（二）· 数据归集与责任流转 —— 声明式数据（v2）
 * =============================================================================
 * 自上而下：③ 总部汇总层 → 归集汇总中枢 → ② 归口层 → ① 采集层。
 * 归集方向自下而上（采集→归口→总部），目标下达自上而下（左侧红线）。
 *
 * 你（预算顾问）优化这张图，直接改本文件：改文字改 title/lines；加/删块照格式加一条。
 */
import type { LogicDiagramData } from './logicTypes';

export const collectionDiagram: LogicDiagramData = {
  id: 'collection',
  width: 1040,
  legend: true,
  targetDown: true,
  targetDownLabel: '目标下达 · 评审退回（自上而下）',
  legendEntries: [
    { type: 'box', fill: '#ffffff', stroke: '#94a3b8', text: '主数据维护' },
    { type: 'box', fill: '#3b82f6', text: '手工填报' },
    { type: 'box', fill: '#6b7280', text: '系统计算 / 调整' },
    { type: 'box', fill: '#f97316', text: '系统生成（报表项可调整）' },
    { type: 'line', fill: '#334155', text: '填报归集（自下而上）' },
    { type: 'line', fill: '#dc2626', dashed: true, text: '目标下达 / 退回（自上而下）' },
  ],

  root: {
    kind: 'group', id: 'collection-root', flow: 'column',
    padX: [70, 20], padY: 44,
    spacing: [6, 8, 36],

    children: [
      /* ── ③ 总部汇总层 ── */
      {
        kind: 'group', id: 'hq', flow: 'column',
        label: '③ 总部汇总层（预算管理委员会 · 财务总部）：汇总平衡、叠加目标、合并抵销、生成三表',
        labelColor: '#0f172a', caption: true,
        fill: '#eef2f7', stroke: '#94a3b8', rx: 10, padX: 10, padY: 8,
        children: [
          {
            kind: 'group', id: 'hq-row', flow: 'row',
            trackW: [222, 222, 222, 222], gap: 14,
            children: [
              {
                kind: 'node', id: 'hq-assumption', col: 0,
                title: '统一假设 · 目标下达', titleFs: 11, lineFs: 9,
                fill: '#ffffff', stroke: '#cbd5e1', h: 80,
                lines: ['年度经营目标（收入 / 利润）', '统一预算假设与参数 BA'],
                lineFills: ['#475569', '#475569'],
              },
              {
                kind: 'node', id: 'hq-balance', col: 1,
                title: '汇总平衡 · 报表项调整', titleFs: 11, lineFs: 9,
                fill: '#e5e7eb', stroke: '#6b7280', h: 80,
                lines: ['按报表项目汇总、平衡', '三表报表项可直接调整 / 补录'],
                lineFills: ['#374151', '#b45309'],
              },
              {
                kind: 'node', id: 'hq-elim', col: 2,
                title: '合并抵销', titleFs: 11, lineFs: 9,
                fill: '#fee2e2', stroke: '#dc2626', h: 80,
                lines: ['关联交易识别', '五类抵销底稿 BJ.C'],
                lineFills: ['#991b1b', '#991b1b'],
              },
              {
                kind: 'node', id: 'hq-statements', col: 3,
                title: '预算三表', titleFs: 11, lineFs: 9,
                fill: '#ffedd5', stroke: '#f97316', h: 80,
                lines: ['上游数据自动规则+报表项直接调整', '单体加总 ／ 合并 ± 抵销'],
                lineFills: ['#9a3412', '#c2410c'],
              },
            ],
          },
        ],
      },

      /* ── 归集汇总中枢 ── */
      {
        kind: 'hub', id: 'hub', h: 22,
        fill: '#f1f5f9', stroke: '#94a3b8',
        label: '模块归口汇总 → 按预算单项 / 报表项目归集（多对多，上下位置不代表一一对应）',
        labelColor: '#475569',
      },

      /* ── ② 归口层 ── */
      {
        kind: 'group', id: 'func', flow: 'column',
        label: '② 归口层（职能部门）：本级数据审核、调整，归口到职能部门统一汇总',
        labelColor: '#78350f', caption: true,
        fill: '#fffdf5', stroke: '#fde68a', rx: 10, padX: 10, padY: 8,
        children: [
          {
            kind: 'group', id: 'func-row', flow: 'row',
            trackW: [145, 145, 145, 145, 145, 145], gap: 12,
            children: [
              {
                kind: 'node', id: 'func-sales', col: 0,
                title: '销售 / 市场部', titleFs: 10, lineFs: 8.8,
                fill: '#dbeafe', stroke: '#3b82f6', h: 82,
                lines: ['收入 · 合同归口', '销售费用审核'],
                lineFills: ['#334155', '#334155'],
                foot: '审核 · 调整 · 归口', footFill: '#64748b',
              },
              {
                kind: 'node', id: 'func-mfg', col: 1,
                title: '生产 / 制造部', titleFs: 10, lineFs: 8.8,
                fill: '#dcfce7', stroke: '#16a34a', h: 82,
                lines: ['产量 · 物料需求', '制造费用审核'],
                lineFills: ['#334155', '#334155'],
                foot: '审核 · 调整 · 归口', footFill: '#64748b',
              },
              {
                kind: 'node', id: 'func-procure', col: 2,
                title: '集团采购与供应链', titleFs: 10, lineFs: 8.8,
                fill: '#d1fae5', stroke: '#10b981', h: 82,
                lines: ['采购归口', '进销存平衡'],
                lineFills: ['#334155', '#334155'],
                foot: '审核 · 调整 · 归口', footFill: '#64748b',
              },
              {
                kind: 'node', id: 'func-engineering', col: 3,
                title: '工程 / 资产部', titleFs: 10, lineFs: 8.8,
                fill: '#ffedd5', stroke: '#f97316', h: 82,
                lines: ['资本化归口', '资产 · 折旧审核'],
                lineFills: ['#334155', '#334155'],
                foot: '审核 · 调整 · 归口', footFill: '#64748b',
              },
              {
                kind: 'node', id: 'func-hr', col: 4,
                title: '集团HR', titleFs: 10, lineFs: 8.8,
                fill: '#fce7f3', stroke: '#ec4899', h: 82,
                lines: ['人工费用归口', '编制 · 工资审核'],
                lineFills: ['#334155', '#334155'],
                foot: '审核 · 调整 · 归口', footFill: '#64748b',
              },
              {
                kind: 'node', id: 'func-finance', col: 5,
                title: '集团财经', titleFs: 10, lineFs: 8.8,
                fill: '#ede9fe', stroke: '#8b5cf6', h: 82,
                lines: ['费用按属性归集', '资金 · 税金'],
                lineFills: ['#334155', '#334155'],
                foot: '审核 · 调整 · 归口', footFill: '#64748b',
              },
            ],
          },
        ],
      },

      /* ── ① 采集层 ── */
      {
        kind: 'group', id: 'collect', flow: 'column',
        label: '① 采集层（业务单元 / 管理单元 / 部门基层）：分业务对象、分表单、分部门录入（最明细）',
        labelColor: '#1e3a8a', caption: true,
        fill: '#f5f9ff', stroke: '#bfdbfe', rx: 10, padX: 10, padY: 8,
        children: [
          {
            kind: 'group', id: 'collect-row', flow: 'row',
            trackW: [145, 145, 145, 145, 145, 145], gap: 12,
            children: [
              {
                kind: 'node', id: 'collect-sales', col: 0,
                title: '销售业务 BB.1', titleFs: 9.8, lineFs: 8.8,
                fill: '#dbeafe', stroke: '#3b82f6', h: 86,
                lines: ['合同签约 · 收入', '销量 · 单价'],
                lineFills: ['#334155', '#334155'],
              },
              {
                kind: 'node', id: 'collect-prod', col: 1,
                title: '生产 BB.2', titleFs: 9.8, lineFs: 8.8,
                fill: '#dcfce7', stroke: '#16a34a', h: 86,
                lines: ['产量计划', '在制 · 完工'],
                lineFills: ['#334155', '#334155'],
              },
              {
                kind: 'node', id: 'collect-proc', col: 2,
                title: '采购 BB.3', titleFs: 9.8, lineFs: 8.8,
                fill: '#d1fae5', stroke: '#10b981', h: 86,
                lines: ['设备 · 基建 · 物料'],
                lineFills: ['#334155'],
              },
              {
                kind: 'node', id: 'collect-cap', col: 3,
                title: '资本化 BB.4', titleFs: 9.8, lineFs: 8.8,
                fill: '#ffedd5', stroke: '#f97316', h: 86,
                lines: ['自制 · 租赁 · 新增', '处置'],
                lineFills: ['#334155', '#334155'],
              },
              {
                kind: 'node', id: 'collect-labor', col: 4,
                title: '人工 BB.5.1', titleFs: 9.8, lineFs: 8.8,
                fill: '#fce7f3', stroke: '#ec4899', h: 86,
                lines: ['工资 · 社保 · 公积金'],
                lineFills: ['#334155'],
              },
              /* 第 6 槽：两个来源小条，同槽叠放 */
              {
                kind: 'node', id: 'collect-genfee', col: 5, stack: 0,
                title: '一般费用', titleFs: 8.6, lineFs: 7.8,
                w: 129, h: 38, fill: '#eff6ff', stroke: '#2563eb', dashed: true,
                lines: ['外部费用模块 BA.5'], lineFills: ['#1e40af'],
              },
              {
                kind: 'node', id: 'collect-dep', col: 5, stack: 1,
                title: '折旧费用', titleFs: 8.6, lineFs: 7.8,
                w: 129, h: 34, fill: '#e5e7eb', stroke: '#6b7280',
                lines: ['资本化资产 · 系统计提'], lineFills: ['#4b5563'],
              },
            ],
          },
        ],
      },
    ],
  },

  /* ── 归集边（箭头朝上） ── */
  edges: [
    // 采集 → 归口
    { id: 'g-cf1', from: { ref: 'collect-sales', anchor: 'top' }, to: { ref: 'func-sales', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.2 },
    { id: 'g-cf2', from: { ref: 'collect-prod', anchor: 'top' }, to: { ref: 'func-mfg', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.2 },
    { id: 'g-cf3', from: { ref: 'collect-proc', anchor: 'top' }, to: { ref: 'func-procure', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.2 },
    { id: 'g-cf4', from: { ref: 'collect-cap', anchor: 'top' }, to: { ref: 'func-engineering', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.2 },
    { id: 'g-cf5', from: { ref: 'collect-labor', anchor: 'top' }, to: { ref: 'func-hr', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.2 },
    { id: 'g-cf6', from: { ref: 'collect-genfee', anchor: 'top' }, to: { ref: 'func-finance', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.2 },

    // 归口 → 中枢
    { id: 'g-fh1', from: { ref: 'func-sales', anchor: 'top' }, to: { ref: 'hub', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.2 },
    { id: 'g-fh2', from: { ref: 'func-mfg', anchor: 'top' }, to: { ref: 'hub', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.2 },
    { id: 'g-fh3', from: { ref: 'func-procure', anchor: 'top' }, to: { ref: 'hub', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.2 },
    { id: 'g-fh4', from: { ref: 'func-engineering', anchor: 'top' }, to: { ref: 'hub', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.2 },
    { id: 'g-fh5', from: { ref: 'func-hr', anchor: 'top' }, to: { ref: 'hub', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.2 },
    { id: 'g-fh6', from: { ref: 'func-finance', anchor: 'top' }, to: { ref: 'hub', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.2 },

    // 中枢 → 总部
    { id: 'g-hq1', from: { ref: 'hub', anchor: 'top' }, to: { ref: 'hq-assumption', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.3 },
    { id: 'g-hq2', from: { ref: 'hub', anchor: 'top' }, to: { ref: 'hq-balance', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.3 },
    { id: 'g-hq3', from: { ref: 'hub', anchor: 'top' }, to: { ref: 'hq-elim', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.3 },
    { id: 'g-hq4', from: { ref: 'hub', anchor: 'top' }, to: { ref: 'hq-statements', anchor: 'bottom' }, kind: 'flow', color: '#334155', width: 1.3 },
  ],
};
