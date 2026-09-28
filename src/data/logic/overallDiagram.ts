/**
 * 整体逻辑图（一）· 预算模块全景与费用归集 —— 声明式数据
 * =============================================================================
 * 主流向自上而下（编制顺序）：编制基础 → 业务编制 → 财务测算与费用归集 → 预算三表。
 *
 * 你（预算顾问）优化这张图，直接改本文件：
 * - 改文字：title / lines / label；
 * - 加/删块：在对应 row 容器 children 里照格式加一条；
 * - 改连接：edges 用元素 id 引用，横贯 hub 自动遮盖形成「归集 / 分发」断点。
 */
import type { LogicDiagramData } from './logicTypes';

export const overallDiagram: LogicDiagramData = {
  id: 'overall',
  width: 1040,
  legend: true,
  legendEntries: [
    { type: 'line', fill: '#334155', text: '业务主干' },
    { type: 'box', fill: '#f1f5f9', stroke: '#94a3b8', text: '归集 / 重分类中枢' },
    { type: 'line', fill: '#2563eb', dashed: true, text: '外部模块取数' },
    { type: 'line', fill: '#dc2626', dashed: true, text: '内部交易 / 抵销' },
    { type: 'box', fill: '#16a34a', text: 'a 纯经营不进三表' },
    { type: 'box', fill: '#2563eb', text: 'b 挂法人平铺' },
    { type: 'box', fill: '#dc2626', text: 'c 关联交易 / 抵销' },
  ],

  root: {
    kind: 'group', id: 'overall-root', flow: 'column',
    padX: 20, padY: 14,
    spacing: [14, 6, 10, 8, 3, 0],

    children: [
      /* ═══════ ① 编制基础 ═══════ */
      {
        kind: 'group', id: 'sec1', flow: 'column',
        label: '① 编制基础：主数据 ＋ 假设参数（编制前一次性准备，年度滚动沿用）',
        labelColor: '#0f172a', caption: true,
        fill: '#f8fafc', stroke: '#cbd5e1', rx: 10, padX: 14, padY: 8,
        children: [
          {
            kind: 'group', id: 'sec1-row', flow: 'row',
            trackW: [478, 478], gap: 16,
            children: [
              {
                kind: 'node', id: 'n-master', col: 0,
                title: '主数据 AA / AB / AM', titleFs: 10.5,
                fill: '#ffffff', stroke: '#cbd5e1', h: 48,
                lines: [
                  '组织（法人 · 管理单元 · 部门）· 产品 · 客户 · 供应商 · 物料',
                  '资产类别 · 统一科目 · 税率 / 费用属性等业务字典',
                ],
                lineFs: 9.4, lineFills: ['#475569', '#475569'],
              },
              {
                kind: 'node', id: 'n-ba', col: 1,
                title: '编制假设与参数 BA / BAA / BAP', titleFs: 10.5,
                fill: '#ffffff', stroke: '#cbd5e1', h: 48,
                lines: [
                  '标准成本 · 工时费率 · 物料定额 · 付款比例 · 费用转换比例',
                  '资本化拆分比例 · 关联交易加成率 · 费用预算汇总',
                ],
                lineFs: 9.4, lineFills: ['#475569', '#475569'],
              },
            ],
          },
        ],
      },

      /* ═══════ ② 业务编制 ═══════ */
      {
        kind: 'group', id: 'sec2', flow: 'column',
        label: '② 业务编制（业务部门填报，按编制顺序：签约 → 排产 → 采购 → 资本化）',
        labelColor: '#14532d', caption: true,
        fill: '#f0fdf4', stroke: '#bbf7d0', rx: 10, padX: 14, padY: 8,
        children: [
          {
            kind: 'group', id: 'sec2-row', flow: 'row',
            trackW: [231, 231, 231, 231], gap: 16,
            children: [
              {
                kind: 'node', id: 'biz1', col: 0,
                title: 'BB.1 销售与收入', titleFs: 10.6,
                fill: '#dbeafe', stroke: '#3b82f6', h: 88, badge: 'a+b',
                lines: [
                  '1.1 合同签约',
                  '1.2 软硬件收入 · 1.3 技术服务',
                  '1.4 销售费用 · 1.X 多维分析',
                ],
                lineFs: 9.2, lineFills: ['#334155', '#334155', '#334155'],
              },
              {
                kind: 'node', id: 'biz2', col: 1,
                title: 'BB.2 生产排产', titleFs: 10.6,
                fill: '#dcfce7', stroke: '#16a34a', h: 88, badge: 'b',
                lines: ['2.1 生产产量计划'],
                lineFs: 9.2, lineFills: ['#334155'],
              },
              {
                kind: 'node', id: 'biz3', col: 2,
                title: 'BB.3 采购', titleFs: 10.6,
                fill: '#d1fae5', stroke: '#10b981', h: 88, badge: 'b·D=c',
                lines: ['3.1 设备采购', '3.2 基建工程 · 3.3 物料采购'],
                lineFs: 9.2, lineFills: ['#334155', '#334155'],
              },
              {
                kind: 'node', id: 'biz4', col: 3,
                title: 'BB.4 资本化', titleFs: 10.6,
                fill: '#ffedd5', stroke: '#f97316', h: 88, badge: 'b·4.2.b=c',
                lines: [
                  '4.1 自制设备',
                  '4.2 职场租赁资本化 · 4.3 其他新增',
                  '4.4/4.5 折旧 · 4.6 处置',
                ],
                lineFs: 9.2, lineFills: ['#334155', '#334155', '#334155'],
              },
            ],
          },
        ],
      },

      /* ═══════ 归集中枢 1 ═══════ */
      {
        kind: 'hub', id: 'hub1', h: 26,
        fill: '#f1f5f9', stroke: '#94a3b8',
        label: '业务数据归集 · 重分类 · 再分配（多对多：数据在此混合后按口径分发，上下位置不代表一一对应）',
        labelColor: '#475569',
      },

      /* ═══════ ③ 财务测算与费用归集 ═══════ */
      {
        kind: 'group', id: 'sec3', flow: 'column',
        label: '③ 财务测算 · 汇总平衡 · 费用归集 · 合并抵销（财务编制）',
        labelColor: '#78350f', caption: true,
        fill: '#fffbeb', stroke: '#fde68a', rx: 10, padX: 0, padY: 8,
        children: [
          {
            kind: 'group', id: 'sec3-row', flow: 'row',
            trackW: [156, 156, 324, 156, 156], gap: 12,
            children: [
              {
                kind: 'node', id: 'calc-inv', col: 0,
                title: 'BB.3.X 进销存平衡', titleFs: 10,
                fill: '#fef9c3', stroke: '#ca8a04', h: 120,
                lines: ['法人 × 存货类别', '收发存滚动平衡', '营业成本 / 期末存货'],
                lineFs: 8.8, lineFills: ['#334155', '#334155', '#334155'],
                foot: '来源 BB.1 / 2 / 3', footFill: '#1d4ed8',
              },
              {
                kind: 'node', id: 'calc-capexsum', col: 1,
                title: 'BB.4.X 资本化汇总', titleFs: 10,
                fill: '#fed7aa', stroke: '#ea580c', h: 120,
                lines: ['原值 / 累计折旧 / 净值', '折旧费用归集'],
                lineFs: 8.8, lineFills: ['#334155', '#334155'],
                foot: '来源 BB.3 / 4', footFill: '#1d4ed8',
              },

              /* ── 费用归集组（三来源 → BB.5.2 → PL / 存货） ── */
              {
                kind: 'group', id: 'fee-group', col: 2, flow: 'column',
                fill: '#f8fbff', stroke: '#93c5fd', rx: 8,
                padX: 6, padY: 6, spacing: [10, 11],
                children: [
                  {
                    kind: 'group', id: 'fee-row', flow: 'row',
                    trackW: [98, 98, 100], gap: 8,
                    children: [
                      {
                        kind: 'node', id: 'fee-labor', col: 0,
                        title: '人工费用', titleFs: 9.4,
                        fill: '#fce7f3', stroke: '#ec4899', h: 42,
                        lines: ['BB.5.1 工资社保公积金'],
                        lineFs: 7.7, lineFills: ['#831843'],
                      },
                      {
                        kind: 'node', id: 'fee-dep', col: 1,
                        title: '折旧费用', titleFs: 9.4,
                        fill: '#e2e8f0', stroke: '#64748b', h: 42,
                        lines: ['资本化资产 · 系统计提'],
                        lineFs: 7.7, lineFills: ['#475569'],
                      },
                      {
                        kind: 'node', id: 'fee-gen', col: 2,
                        title: '一般费用', titleFs: 9.4,
                        fill: '#eff6ff', stroke: '#2563eb', dashed: true, h: 42,
                        lines: ['外部费用模块 BA.5'],
                        lineFs: 7.7, lineFills: ['#1e40af'],
                      },
                    ],
                  },
                  {
                    kind: 'hub', id: 'hub52', h: 26,
                    fill: '#bfdbfe', stroke: '#2563eb',
                    label: 'BB.5.2 费用按属性归集', labelColor: '#1e3a8a',
                  },
                  {
                    kind: 'node', id: 'fee-out',
                    title: '', fill: '#ffffff', stroke: '#2563eb', h: 22,
                    lines: ['销售/管理/研发费用 → PL ｜ 制造费用 → 存货'],
                    lineFs: 8.6, lineFills: ['#1e3a8a'],
                  },
                ],
              },

              {
                kind: 'node', id: 'calc-bf', col: 3,
                title: 'BF 资金与税金', titleFs: 10,
                fill: '#ede9fe', stroke: '#8b5cf6', h: 120,
                lines: ['BF.4 税金及增值税', 'BF.1 股权投资', 'BF.3 金融工具投融资'],
                lineFs: 8.8, lineFills: ['#334155', '#334155', '#334155'],
                foot: '来源 BB.1/3 · 投融资计划', footFill: '#1d4ed8',
              },
              {
                kind: 'node', id: 'calc-bjc', col: 4,
                title: 'BJ.C 关联交易抵销', titleFs: 10,
                fill: '#fecaca', stroke: '#dc2626', h: 120,
                lines: ['内部交易识别', '五类抵销底稿'],
                lineFs: 8.8, lineFills: ['#334155', '#334155'],
                foot: '来源 BB.1/3/4 内部交易', footFill: '#b91c1c',
              },
            ],
          },
        ],
      },

      /* ═══════ 归集中枢 2 ═══════ */
      {
        kind: 'hub', id: 'hub2', h: 25,
        fill: '#f1f5f9', stroke: '#94a3b8',
        label: '按报表项目行归集出表（报表项可直接调整）｜ 集团口径在此叠加关联交易抵销',
        labelColor: '#475569',
      },

      /* ═══════ 红抵销汇流总线（无填充，仅水平红虚线） ═══════ */
      {
        kind: 'hub', id: 'elim-bus', h: 8, bus: true,
        fill: 'none', stroke: '#dc2626', dashed: true,
      },

      /* ═══════ ④ 预算三表 ═══════ */
      {
        kind: 'group', id: 'sec4', flow: 'column',
        label: '④ 预算三表（自动生成）',
        labelColor: '#312e81', caption: true,
        fill: '#eef2ff', stroke: '#c7d2fe', rx: 10, padX: 14, padY: 8,
        children: [
          {
            kind: 'group', id: 'sec4-row', flow: 'row',
            trackW: [313, 313, 313], gap: 16,
            children: [
              {
                kind: 'node', id: 'out-pl', col: 0,
                title: 'BO.PL 利润表', titleFs: 14,
                fill: '#e0e7ff', stroke: '#6366f1', h: 66,
                lines: ['全年合计 ＋ 1~12 月'],
                lineFs: 10.2, lineFills: ['#4338ca'],
              },
              {
                kind: 'node', id: 'out-bs', col: 1,
                title: 'BO.BS 资产负债表', titleFs: 14,
                fill: '#e0e7ff', stroke: '#6366f1', h: 66,
                lines: ['年初 / 发生 / 调整 / 期末'],
                lineFs: 10.2, lineFills: ['#4338ca'],
              },
              {
                kind: 'node', id: 'out-cf', col: 2,
                title: 'BO.CF 现金流量表', titleFs: 14,
                fill: '#e0e7ff', stroke: '#6366f1', h: 66,
                lines: ['本年累计 1 列'],
                lineFs: 10.2, lineFills: ['#4338ca'],
              },
            ],
          },
        ],
      },
    ],
  },

  /* ═══════════════════ 边（连接） ═══════════════════ */
  edges: [
    // ① → ②
    {
      id: 'e-1to2', from: { ref: 'sec1', anchor: 'bottom' }, to: { ref: 'sec2', anchor: 'top' },
      kind: 'flow', color: '#94a3b8', label: '维度 · 字典 · 参数驱动（默认值可覆盖）', labelDx: 10,
    },

    // 业务主干（水平，深色）
    { id: 'e-biz12', from: { ref: 'biz1', anchor: 'right' }, to: { ref: 'biz2', anchor: 'left' }, kind: 'flow', color: '#334155', label: '销量', labelDy: -7 },
    { id: 'e-biz23', from: { ref: 'biz2', anchor: 'right' }, to: { ref: 'biz3', anchor: 'left' }, kind: 'flow', color: '#334155', label: '产量/需求', labelDy: -7 },
    { id: 'e-biz34', from: { ref: 'biz3', anchor: 'right' }, to: { ref: 'biz4', anchor: 'left' }, kind: 'flow', color: '#334155', label: '设备转固', labelDy: -7 },

    // 业务 → 财务（穿过 hub1，hub1 遮盖形成两段；箭头在 sec3-row 顶）
    { id: 'e-b1', from: { ref: 'biz1', anchor: 'bottom' }, to: { ref: 'sec3-row', anchor: 'top' }, kind: 'flow', color: '#cbd5e1', arrow: false },
    { id: 'e-b2', from: { ref: 'biz2', anchor: 'bottom' }, to: { ref: 'sec3-row', anchor: 'top' }, kind: 'flow', color: '#cbd5e1', arrow: false },
    { id: 'e-b3', from: { ref: 'biz3', anchor: 'bottom' }, to: { ref: 'sec3-row', anchor: 'top' }, kind: 'flow', color: '#cbd5e1', arrow: false },
    { id: 'e-b4', from: { ref: 'biz4', anchor: 'bottom' }, to: { ref: 'sec3-row', anchor: 'top' }, kind: 'flow', color: '#cbd5e1', arrow: false },

    // 费用组内部：fee → hub52（细连线）；hub52 → fee-out（箭头）
    { id: 'e-fl1', from: { ref: 'fee-labor', anchor: 'bottom' }, to: { ref: 'hub52', anchor: 'top' }, kind: 'link', color: '#94a3b8' },
    { id: 'e-fl2', from: { ref: 'fee-dep', anchor: 'bottom' }, to: { ref: 'hub52', anchor: 'top' }, kind: 'link', color: '#94a3b8' },
    { id: 'e-fl3', from: { ref: 'fee-gen', anchor: 'bottom' }, to: { ref: 'hub52', anchor: 'top' }, kind: 'link', color: '#94a3b8' },
    { id: 'e-fl4', from: { ref: 'hub52', anchor: 'bottom' }, to: { ref: 'fee-out', anchor: 'top' }, kind: 'flow', color: '#94a3b8' },

    // 财务 → hub2（calc-bjc 不走此线）
    { id: 'e-h2a', from: { ref: 'calc-inv', anchor: 'bottom' }, to: { ref: 'hub2', anchor: 'top' }, kind: 'link', color: '#cbd5e1' },
    { id: 'e-h2b', from: { ref: 'calc-capexsum', anchor: 'bottom' }, to: { ref: 'hub2', anchor: 'top' }, kind: 'link', color: '#cbd5e1' },
    { id: 'e-h2c', from: { ref: 'fee-group', anchor: 'bottom' }, to: { ref: 'hub2', anchor: 'top' }, kind: 'link', color: '#cbd5e1' },
    { id: 'e-h2d', from: { ref: 'calc-bf', anchor: 'bottom' }, to: { ref: 'hub2', anchor: 'top' }, kind: 'link', color: '#cbd5e1' },

    // hub2 → 三表（灰，箭头）
    { id: 'e-o1', from: { ref: 'hub2', anchor: 'bottom' }, to: { ref: 'out-pl', anchor: 'top' }, kind: 'flow', color: '#cbd5e1' },
    { id: 'eo2', from: { ref: 'hub2', anchor: 'bottom' }, to: { ref: 'out-bs', anchor: 'top' }, kind: 'flow', color: '#cbd5e1' },
    { id: 'eo3', from: { ref: 'hub2', anchor: 'bottom' }, to: { ref: 'out-cf', anchor: 'top' }, kind: 'flow', color: '#cbd5e1' },

    // 红抵销：BJ.C → bus；bus → 三表
    { id: 'e-elim0', from: { ref: 'calc-bjc', anchor: 'bottom' }, to: { ref: 'elim-bus', anchor: 'top' }, kind: 'elim', label: '合并抵销', labelDx: -28, labelDy: -4 },
    { id: 'e-elim1', from: { ref: 'elim-bus', anchor: 'bottom' }, to: { ref: 'out-pl', anchor: 'top' }, kind: 'elim' },
    { id: 'e-elim2', from: { ref: 'elim-bus', anchor: 'bottom' }, to: { ref: 'out-bs', anchor: 'top' }, kind: 'elim' },
    { id: 'e-elim3', from: { ref: 'elim-bus', anchor: 'bottom' }, to: { ref: 'out-cf', anchor: 'top' }, kind: 'elim' },
  ],
};
