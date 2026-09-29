import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';
import { PENDING_CONFIRMATION_ITEMS } from '../data/pendingConfirmationData';

/**
 * A1.5 待与业务确认事项清单（调研页 ① 区块）
 *
 * 汇总需求梳理过程中尚未与业务方确认口径/落地方式的开放事项。
 * 只读展示，条目与状态维护在 src/data/pendingConfirmationData.ts。
 */
export const PendingConfirmationView: React.FC = () => {
  const items = PENDING_CONFIRMATION_ITEMS;
  const pendingCount = items.filter((i) => i.status === '待确认').length;
  const schemeCount = items.filter((i) => i.status === '待定方案').length;

  const statusStyle = (status: string) =>
    status === '待定方案'
      ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700/80 text-amber-900 dark:text-amber-200'
      : status === '已确认'
        ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700/80 text-emerald-900 dark:text-emerald-200'
        : 'bg-rose-100 dark:bg-rose-950/80 border-rose-300 dark:border-rose-700/80 text-rose-900 dark:text-rose-200';

  const categoryStyle = (category: string) =>
    category === '落地待确认'
      ? 'bg-violet-100 dark:bg-violet-950/80 border-violet-300 dark:border-violet-700/80 text-violet-900 dark:text-violet-200'
      : 'bg-sky-100 dark:bg-sky-950/80 border-sky-300 dark:border-sky-700/80 text-sky-900 dark:text-sky-200';

  return (
    <div className="space-y-3">
      {/* 说明与统计 */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-xs">
        <div className="flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              汇总需求梳理过程中尚未与业务方确认口径或落地方式的开放事项，逐条列示涉及表单、待确认内容、影响范围与建议处理方向，供与业务方逐项确认。
              只登记真实存在的开放事项（出处为需求文档「待确认」标注或需求讨论中悬置的问题），不在此处推断或预填未确认口径；业务确认后更新状态并同步对应表单口径。
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] pt-0.5">
              <span className="text-slate-500 dark:text-slate-400">
                合计 <span className="font-bold text-slate-800 dark:text-slate-100">{items.length}</span> 项
              </span>
              <span className="text-rose-700 dark:text-rose-400">
                待确认 <span className="font-bold">{pendingCount}</span> 项
              </span>
              <span className="text-amber-700 dark:text-amber-400">
                待定方案 <span className="font-bold">{schemeCount}</span> 项
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 事项条目 */}
      {items.map((item) => (
        <div
          key={item.seq}
          className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 space-y-2"
          style={{ borderLeft: '4px solid #f43f5e' }}
        >
          {/* 标题行 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px] font-bold">
              {item.seq}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-800 dark:text-blue-300 font-mono text-[11px] font-semibold">
              {item.formCode}
            </span>
            <span className="text-[13px] font-bold text-slate-900 dark:text-slate-100">
              {item.title}
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[11px] font-medium ${categoryStyle(item.category)}`}>
              {item.category}
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-bold ml-auto ${statusStyle(item.status)}`}>
              {item.status}
            </span>
          </div>

          {/* 内容明细 */}
          <div className="space-y-1.5">
            <div className="flex gap-2 items-start">
              <span className="shrink-0 w-[92px] pt-px text-[11px] font-semibold text-slate-500 dark:text-slate-400">待确认内容</span>
              <span className="flex-1 min-w-0 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{item.detail}</span>
            </div>
            <div className="flex gap-2 items-start">
              <span className="shrink-0 w-[92px] pt-px text-[11px] font-semibold text-amber-700 dark:text-amber-400">影响范围</span>
              <span className="flex-1 min-w-0 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{item.impact}</span>
            </div>
            <div className="flex gap-2 items-start rounded bg-slate-50 dark:bg-slate-800/60 py-1.5 px-2">
              <span className="shrink-0 w-[92px] pt-px text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">建议处理方向</span>
              <span className="flex-1 min-w-0 text-[11px] text-slate-700 dark:text-slate-200 leading-relaxed">{item.suggestion}</span>
            </div>
            <div className="flex gap-2 items-start">
              <span className="shrink-0 w-[92px] pt-px text-[11px] font-semibold text-slate-400 dark:text-slate-500">出处</span>
              <span className="flex-1 min-w-0 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">{item.source}</span>
            </div>
          </div>
        </div>
      ))}

      {/* 使用提示 */}
      <div className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 p-3 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed flex gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <span>
          确认方式：与业务方逐项过稿——确认口径者将「状态」改为「已确认」，并把结论同步到对应表单的表样/字段说明/规则要点与三表转换规则；
          确认本年度不处理者标注为「不适用」。清单本身不承载业务金额，不生成会计分录。
        </span>
      </div>
    </div>
  );
};
