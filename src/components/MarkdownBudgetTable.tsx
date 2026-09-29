import { useState, useMemo } from 'react';
import { Layers, ExternalLink } from 'lucide-react';
import {
  calculateEliminationRows,
  type EliminationResult,
  type EliminationDifferenceNotes,
} from '../utils/eliminationCalculator';

export interface MarkdownTableCell {
  text: string;
  isHeader: boolean;
  rowSpan: number;
  colSpan: number;
  /** 表头底色（来自 adapters 的 SPREADSHEET_STYLES），用于区分只读列/可修改列 */
  bg?: string;
  /** 表单跳转链接（来源编制表列专用）：{ code: 表单编号, name: 表单名 } */
  links?: { code: string; name: string }[];
  /** 结构化来源：{ formCode, formName, field }，表编号+表名可点击跳转 */
  sources?: { formCode: string; formName: string; field?: string }[];
}

export interface MarkdownTableGrid {
  name: string;
  rows: MarkdownTableCell[][];
  rowCount: number;
  colCount: number;
  /** 文档式表样（如 A2A 方案文档）：开启单元格自动换行，列宽按 colWidths 放宽 */
  wrap?: boolean;
  colWidths?: string[];
}

export interface MarkdownFormContent {
  grids: MarkdownTableGrid[];
}

export interface MarkdownBudgetTableProps {
  grids: MarkdownTableGrid[];
  activeIdx?: number;
  onActiveIdxChange?: (idx: number) => void;
  onFormLinkClick?: (code: string) => void;
  formCode?: string;
  showElimination?: boolean;
  onToggleElimination?: () => void;
  eliminationToggleHidden?: boolean;
}

/**
 * 集团合并抵消与单体视角差异解析面板
 */
function EliminationDifferencePanel({
  formCode = '',
  summary,
  differenceNotes,
  onFormLinkClick,
}: {
  formCode?: string;
  summary: EliminationResult['summary'];
  differenceNotes: EliminationDifferenceNotes;
  onFormLinkClick?: (code: string) => void;
}) {
  return (
    <div className="mt-3 p-3.5 rounded-lg border border-purple-300 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 text-xs space-y-3 shadow-xs">
      {/* 顶部标题与主要指标 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-200/80 dark:border-purple-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-purple-600 text-white font-bold text-xs flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            集团合并抵消
          </span>
          <span className="font-bold text-slate-800 dark:text-slate-100 text-xs">
            单体公司视角 vs 集团合并视角差异解析
          </span>
          <span className="text-[11px] text-purple-700 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-900/50 px-2 py-0.5 rounded-full font-medium">
            表单：{formCode || '当前预算编制表'}
          </span>
        </div>

        {summary.hasNumericData && (
          <div className="flex items-center gap-3 text-[11px] flex-wrap">
            <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">单体填报汇总：</span>
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">{summary.totalSum.toLocaleString()} 万元</strong>
            </div>
            <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded border border-purple-200 dark:border-purple-800">
              <span className="text-purple-700 dark:text-purple-300">内部抵消额：</span>
              <strong className="text-rose-600 dark:text-rose-400 font-bold">-{summary.totalElim.toLocaleString()} 万元</strong>
              <span className="text-purple-500 text-[10px] ml-1">({summary.elimRateText})</span>
            </div>
            <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded border border-blue-200 dark:border-blue-800">
              <span className="text-blue-700 dark:text-blue-300">集团合并净额：</span>
              <strong className="text-blue-800 dark:text-blue-200 font-bold">{summary.totalNet.toLocaleString()} 万元</strong>
            </div>
          </div>
        )}
      </div>

      {/* 核心三栏对比 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {/* ① 单体公司视角 */}
        <div className="p-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-1.5 shadow-2xs">
          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0"></span>
            ① 单体公司视角（法人独立核算）
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            {differenceNotes.singleEntity}
          </p>
        </div>

        {/* ② 内部交易抵消项 */}
        <div className="p-3 rounded-md border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 space-y-1.5 shadow-2xs">
          <div className="font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1.5 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0"></span>
            ② 内部交易抵消额（合并底稿消除）
          </div>
          <p className="text-[11px] text-purple-950/80 dark:text-purple-200/90 leading-relaxed">
            {differenceNotes.elimination}
          </p>
        </div>

        {/* ③ 集团合并视角 */}
        <div className="p-3 rounded-md border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 space-y-1.5 shadow-2xs">
          <div className="font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1.5 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
            ③ 集团合并视角（对外并表三表）
          </div>
          <p className="text-[11px] text-blue-950/80 dark:text-blue-200/90 leading-relaxed">
            {differenceNotes.consolidated}
          </p>
        </div>
      </div>

      {/* 会计分录与业务落点规则 */}
      <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded border border-purple-200/60 dark:border-purple-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
            <span className="font-semibold text-purple-700 dark:text-purple-300">抵消分录落点：</span>
            <span className="font-mono">{differenceNotes.entryRule}</span>
          </div>
          <div className="text-slate-500 dark:text-slate-400">
            <span className="font-semibold">现金流与三表影响：</span>
            {differenceNotes.cashFlowImpact}
          </div>
        </div>

        {differenceNotes.relevantForms.length > 0 && (
          <div className="shrink-0 flex items-center gap-1.5 flex-wrap pt-1 sm:pt-0">
            <span className="text-slate-400 dark:text-slate-500 text-[10px]">关联抵消表单：</span>
            {differenceNotes.relevantForms.map((rf) => (
              <button
                key={rf.code}
                type="button"
                onClick={() => onFormLinkClick?.(rf.code)}
                title={`跳转至 ${rf.code} ${rf.name}`}
                className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors cursor-pointer text-[10px]"
              >
                <span>{rf.code}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 调研总结页专用：以朴素 HTML 表格只读展示预算表样。
 * 数据源为 src/data/sheets/{code}.json 分片，多张 grid 用顶部标签切换。
 * 开启「集团合并抵消」时，在表单底部追加【单体公司汇总】、【集团合并抵消】、【集团合并净额】行及差异分析面板。
 */
export function MarkdownBudgetTable({
  grids,
  activeIdx,
  onActiveIdxChange,
  onFormLinkClick,
  formCode = '',
  showElimination: externalShowElimination,
  onToggleElimination: externalToggleElimination,
  eliminationToggleHidden: externalEliminationToggleHidden,
}: MarkdownBudgetTableProps) {
  const [internalIdx, setInternalIdx] = useState(0);
  const currentIdx = activeIdx ?? internalIdx;
  const active: MarkdownTableGrid | undefined = grids[Math.min(currentIdx, grids.length - 1)];

  // 内部维护抵消开关备用状态
  const [internalShowElimination, setInternalShowElimination] = useState(false);
  const showElimination = externalShowElimination !== undefined ? externalShowElimination : internalShowElimination;
  const handleToggleElimination = externalToggleElimination ?? (() => setInternalShowElimination((prev) => !prev));

  // 文档式表样（wrap=true，如 A2A 方案文档）：单元格自动换行 + 按 colWidths 放宽列宽
  const docWrap = active?.wrap === true;
  const colWidths = docWrap ? active?.colWidths : undefined;

  // 动态测算集团抵消行
  const eliminationData = useMemo(() => {
    if (!active || docWrap) return null;
    return calculateEliminationRows(active, formCode);
  }, [active, docWrap, formCode]);

  if (grids.length === 0) {
    return (
      <p className="p-4 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
        该表单暂无预算表样，请查看字段说明与关键业务规则。
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {/* 顶部工具行：多 Tab 切换 与 集团合并抵消开关 */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        {grids.length > 1 ? (
          <div className="flex flex-wrap gap-1">
            {grids.map((g, idx) => (
              <button
                key={`${g.name}-${idx}`}
                type="button"
                onClick={() => {
                  setInternalIdx(idx);
                  onActiveIdxChange?.(idx);
                }}
                className={`px-2.5 py-1 text-[11px] rounded border transition-colors cursor-pointer ${
                  idx === currentIdx
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-2xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        ) : (
          <div></div>
        )}

        {/* 集团合并抵消开关 */}
        {!docWrap && !externalEliminationToggleHidden && (
          <button
            type="button"
            onClick={handleToggleElimination}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all cursor-pointer ${
              showElimination
                ? 'bg-purple-600 text-white border-purple-600 shadow-xs hover:bg-purple-700'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
            title="点击切换是否在该表单下方显示抵消额行（查看单体与集团视角的差异）"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>集团合并抵消</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                showElimination
                  ? 'bg-purple-800 text-purple-100'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {showElimination ? '已开启' : '已关闭'}
            </span>
          </button>
        )}
      </div>

      {/* 预算表格主体 */}
      <div className="overflow-x-auto custom-scrollbar rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        {active && (
          <table
            className={`border-collapse text-xs ${docWrap ? 'w-full table-fixed' : 'whitespace-nowrap'}`}
            style={{ minWidth: docWrap ? (active.colCount > 2 ? 850 : 600) : Math.max(active.colCount * 80, 600) }}
          >
            {colWidths && colWidths.length > 0 && (
              <colgroup>
                {colWidths.map((w, i) => (
                  <col key={i} style={{ width: w }} />
                ))}
              </colgroup>
            )}
            <tbody>
              {/* 原有数据行 */}
              {active.rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) =>
                    cell.isHeader ? (
                      <th
                        key={cIdx}
                        rowSpan={cell.rowSpan}
                        colSpan={cell.colSpan}
                        style={{ backgroundColor: cell.bg ?? '#002f6c' }}
                        className="border border-slate-300 dark:border-slate-700 text-white font-semibold px-2.5 py-1.5 text-center"
                      >
                        {cell.text}
                      </th>
                    ) : (
                      <td
                        key={cIdx}
                        rowSpan={cell.rowSpan}
                        colSpan={cell.colSpan}
                        className={`border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 align-top ${
                          docWrap ? 'whitespace-pre-wrap break-words' : ''
                        } ${
                          rIdx % 2 === 1 ? 'bg-slate-50 dark:bg-slate-800/40' : 'bg-white dark:bg-slate-900'
                        }`}
                      >
                        {cell.sources && cell.sources.length > 0 ? (
                          <div className="flex flex-col gap-0.5 min-w-0">
                            {cell.sources.map((s, i) => (
                              <div key={i} className="leading-snug whitespace-normal">
                                {s.formCode ? (
                                  <button
                                    type="button"
                                    onClick={() => onFormLinkClick?.(s.formCode)}
                                    title={`跳转到 ${s.formCode} ${s.formName}`}
                                    className="text-blue-700 dark:text-blue-300 font-medium hover:underline cursor-pointer text-left"
                                  >
                                    {s.formCode} {s.formName}
                                  </button>
                                ) : (
                                  <span>{s.formName}</span>
                                )}
                                {s.field ? <span className="text-slate-500 dark:text-slate-400"> ({s.field})</span> : null}
                              </div>
                            ))}
                          </div>
                        ) : cell.links && cell.links.length > 0 ? (
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="whitespace-pre-line leading-snug">{cell.text}</span>
                            <div className="flex flex-wrap gap-1">
                              {cell.links.map((l) => (
                                <button
                                  key={l.code}
                                  type="button"
                                  onClick={() => onFormLinkClick?.(l.code)}
                                  title={`跳转到 ${l.code} ${l.name}`}
                                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-medium leading-none hover:bg-blue-100 dark:hover:bg-blue-900/60 hover:border-blue-400 cursor-pointer whitespace-nowrap"
                                >
                                  ↗ {l.code}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          cell.text
                        )}
                      </td>
                    )
                  )}
                </tr>
              ))}

              {/* 集团合并抵消展开行（开关开启且有数值列时自动呈现） */}
              {showElimination && !docWrap && eliminationData && eliminationData.hasNumericData && (
                <>
                  {/* 1. 单体公司汇总行 */}
                  <tr className="bg-slate-100 dark:bg-slate-800/90 font-semibold border-t-2 border-slate-300 dark:border-slate-600">
                    {eliminationData.singleEntityRow.map((cell, cIdx) => (
                      <td
                        key={`single-${cIdx}`}
                        className="border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 align-middle text-slate-800 dark:text-slate-100 font-semibold whitespace-nowrap"
                      >
                        {cell.text}
                      </td>
                    ))}
                  </tr>

                  {/* 2. 集团合并抵消行 */}
                  <tr className="bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-semibold border-y border-purple-200 dark:border-purple-800">
                    {eliminationData.eliminationRow.map((cell, cIdx) => (
                      <td
                        key={`elim-${cIdx}`}
                        className={`border border-purple-200 dark:border-purple-800 px-2.5 py-1.5 align-middle whitespace-nowrap ${
                          cell.text.startsWith('-') ? 'text-rose-600 dark:text-rose-400 font-bold' : ''
                        }`}
                      >
                        {cell.text}
                      </td>
                    ))}
                  </tr>

                  {/* 3. 集团合并净额行 */}
                  <tr className="bg-blue-50/90 dark:bg-blue-950/50 text-blue-950 dark:text-blue-100 font-bold border-b-2 border-blue-400 dark:border-blue-600">
                    {eliminationData.consolidatedRow.map((cell, cIdx) => (
                      <td
                        key={`cons-${cIdx}`}
                        className="border border-blue-200 dark:border-blue-800 px-2.5 py-1.5 align-middle whitespace-nowrap"
                      >
                        {cell.text}
                      </td>
                    ))}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* 集团合并抵消与单体视角差异解析面板 */}
      {showElimination && !docWrap && eliminationData && (
        <EliminationDifferencePanel
          formCode={formCode}
          summary={eliminationData.summary}
          differenceNotes={eliminationData.differenceNotes}
          onFormLinkClick={onFormLinkClick}
        />
      )}
    </div>
  );
}
