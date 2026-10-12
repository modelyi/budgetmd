import { makeKey, useContentEditor } from '../data/content/contentEditor';
import {
  diagramTitle, diagramSubtitle, diagramViewBox,
  stageHeaders, laneBand, stageDividerY, lanes,
  nodes, arrows, arrowStyles, edgeNotes, legendItems,
} from '../data/pages/flowData';

/**
 * T6 整体流程图 —— 年度预算编制流程图（全流程版）。
 * 7 个阶段（① 编制启动 … ⑦ 定稿与执行）× 10 条泳道，只讲编制工作流（谁在什么时候做什么），
 * 不讲表间取数关系（那是 T7）。绘图数据全在 data/pages/flowData.ts，本文件只按数据画图。
 * 口径：合并抵销只做五类抵销，递延所得税等税层面影响由财务人工测算、系统不做。
 * 页面内容只读展示，不提供编辑入口。
 */

const NS = 'page:flow';
type TFn = (id: string, field: string, orig: string) => string;

const ARROW_COLORS: Record<string, string> = {
  solid: '#475569',
  supply: '#2563eb',
  return: '#dc2626',
};

export function FlowView() {
  const ov = useContentEditor();
  // 只读展示：直接渲染源数据（含此前已生效的文字）
  const t: TFn = (id, field, orig) => ov[makeKey(NS, id, field)]?.value ?? orig;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-auto">
      <div className="flex items-center gap-3 px-6 py-4 bg-white border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">T6 整体编制流程图（业务编制工作流）</h2>
        <span className="text-xs text-slate-500">全流程版：7 个阶段 × 10 条泳道，图较宽，可左右滚动看全</span>
      </div>

      <div className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow border border-slate-200 p-5">
          <div className="flex flex-wrap justify-between items-end gap-3 mb-3">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{t('af-title', 'text', diagramTitle)}</h3>
              <p className="text-xs text-slate-500 mt-1">{t('af-subtitle', 'text', diagramSubtitle)}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-600 max-w-3xl">
              {legendItems.map((g) => (
                <span key={g.id} className="inline-flex items-center gap-1.5">
                  {g.kind === 'swatch' ? (
                    <i className="inline-block w-3.5 h-3.5 rounded-sm border"
                      style={{ background: g.color, borderColor: g.borderColor ?? 'rgba(15,23,42,.18)' }} />
                  ) : (
                    <svg width="22" height="8" aria-hidden="true">
                      <line x1="1" y1="4" x2="21" y2="4" stroke={g.color} strokeWidth="1.8" strokeDasharray="4 3" />
                    </svg>
                  )}
                  {t(g.id, 'label', g.label)}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <div style={{ minWidth: 1580 }}>
              <svg
                viewBox={`0 0 ${diagramViewBox.width} ${diagramViewBox.height}`}
                className="block w-full h-auto"
                role="img"
                aria-label="年度预算编制流程图（全流程版）"
                fontFamily={'"Microsoft YaHei","PingFang SC","Noto Sans CJK SC",Arial,sans-serif'}
              >
                <defs>
                  {(Object.keys(arrowStyles) as Array<keyof typeof arrowStyles>).map((k) => (
                    <marker key={k} id={arrowStyles[k].marker} viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill={ARROW_COLORS[k]} />
                    </marker>
                  ))}
                  <filter id="af-shadow" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.1" />
                  </filter>
                </defs>

                {/* 阶段分隔虚线（取相邻阶段头边界） */}
                {stageHeaders.slice(0, -1).map((s) => (
                  <line key={s.id} x1={s.x + s.w} y1={stageDividerY.top} x2={s.x + s.w} y2={stageDividerY.bottom}
                    stroke="#cbd5e1" strokeWidth="1" strokeDasharray="5 5" />
                ))}

                {/* 阶段头 */}
                {stageHeaders.map((s) => (
                  <g key={s.id}>
                    <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx} fill={s.fill} stroke={s.stroke} />
                    <text x={s.x + s.w / 2} y={s.y + 26} textAnchor="middle" fontSize="15" fontWeight="700" fill={s.color}>
                      {t(s.id, 'label', s.label)}
                    </text>
                  </g>
                ))}

                {/* 泳道色带 + 泳道名 */}
                {lanes.map((l) => (
                  <g key={l.id}>
                    <rect x={laneBand.x} y={l.y} width={laneBand.w} height={l.h} rx={laneBand.rx} fill={l.fill} stroke={l.stroke} />
                    <text x="82" y={l.labelY} textAnchor="middle" fontSize={l.size} fontWeight="700" fill={l.color}>
                      {t(l.id, 'name', l.name)}
                    </text>
                  </g>
                ))}

                {/* 箭头：实线主线 / 蓝虚线数据供给 / 红虚线评审退回 */}
                {arrows.map((a) => {
                  const st = arrowStyles[a.kind];
                  return (
                    <path key={a.id} d={a.d} stroke={st.stroke} strokeWidth={st.width} fill="none"
                      markerEnd={`url(#${st.marker})`}
                      {...(st.dash ? { strokeDasharray: st.dash } : {})} />
                  );
                })}

                {/* 线旁标注 */}
                {edgeNotes.map((n) => (
                  <text key={n.id} x={n.x} y={n.y} fontSize={n.size} fill={n.color}>{t(n.id, 'text', n.text)}</text>
                ))}

                {/* 卡片（矩形 / 评审菱形 + 徽标 + 卡内文字） */}
                {nodes.map((c) => (
                  <g key={c.id} filter="url(#af-shadow)">
                    {c.kind === 'decision' ? (
                      <polygon points={c.points} fill={c.fill} stroke={c.stroke} strokeWidth={c.strokeWidth} />
                    ) : (
                      <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={c.rx} fill={c.fill}
                        stroke={c.stroke} strokeWidth={c.strokeWidth} />
                    )}
                    {c.badge && (
                      <>
                        <rect x={c.badge.x} y={c.badge.y} width={c.badge.w} height={c.badge.h} rx={c.badge.rx}
                          fill={c.badge.fill} stroke={c.badge.stroke ?? undefined} />
                        <text x={c.badge.x + c.badge.w / 2} y={c.badge.y + c.badge.h / 2 + 4} textAnchor="middle"
                          fontSize={c.badge.size} fill={c.badge.color}>
                          {t(c.id, 'badge', c.badge.text)}
                        </text>
                      </>
                    )}
                    {c.lines.map((li, j) => (
                      <text key={j} x={li.x} y={li.y} textAnchor="middle" fontSize={li.size} fontWeight={li.weight} fill={li.color}>
                        {t(c.id, `line:${j}`, li.text)}
                      </text>
                    ))}
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            口径提示：合并抵销（BO.ELIM）只做五类抵销 —— ①内部购销对冲 ②内部往来对冲 ③内部现金流对冲 ④未实现利润—存货 ⑤未实现利润—长期资产；
            递延所得税等税层面影响由财务人工测算，系统不做、不列为抵销事项。
          </p>
        </div>
      </div>
    </div>
  );
}
