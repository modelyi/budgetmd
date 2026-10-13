/**
 * T5BB「关联交易专项方案说明」视图（只读）
 * =============================================================================
 * 单篇 Markdown 文档阅览：直接铺满视野渲染全文（ByteMD Viewer + GFM）。
 * 本页签只有一篇方案，不做左侧多篇目录、不做上/下一篇导航；正文铺满视野即可。
 * 纯 Markdown 文件（docs/solutions-t5bb/*.md）始终是唯一基准源；
 * 本站已全站移除在线编辑，本页签不提供编辑 / 导出。
 */
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import { intercompanyDoc } from '../data/pages/t5bbMarkdown';

/** Markdown 渲染插件（GFM：表格、任务列表等），与 T5 专项方案说明保持一致 */
const MD_PLUGINS = [gfm()];

export function IntercompanySolutionView() {
  if (!intercompanyDoc) {
    return (
      <div className="p-8 text-xs text-slate-500">未找到方案文档：docs/solutions-t5bb/ 下暂无 Markdown 文件。</div>
    );
  }

  const doc = intercompanyDoc;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans">
      {/* 顶部标题条 */}
      <div className="shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 px-4 h-9">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wide truncate">
            关联交易专项方案说明
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium shrink-0">
            Markdown 文档
          </span>
        </div>
        <span
          className="min-w-0 truncate text-[10.5px] font-mono text-slate-400 dark:text-slate-500"
          title={`磁盘源文件：docs/solutions-t5bb/${doc.key}.md`}
        >
          源文件：docs/solutions-t5bb/{doc.key}.md
        </span>
      </div>

      {/* 主内容区（铺满视野的流式 Markdown 阅览） */}
      <main className="flex-1 min-h-0 min-w-0 overflow-y-auto custom-scrollbar p-6 lg:p-8 bg-slate-50/60 dark:bg-slate-950">
        <div className="t5bb-doc max-w-4xl mx-auto pb-12">
          <article className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-7 py-6 shadow-xs">
            <Viewer value={doc.markdown} plugins={MD_PLUGINS} />
          </article>
        </div>

        <style>{`
          .t5bb-doc .markdown-body {
            background-color: transparent;
            font-size: 14px;
            line-height: 1.75;
          }
          .t5bb-doc .markdown-body > :first-child { margin-top: 0; }
          .t5bb-doc .markdown-body > :last-child { margin-bottom: 0; }
          .dark .t5bb-doc .markdown-body { color: #cbd5e1; }
          .dark .t5bb-doc .markdown-body h1,
          .dark .t5bb-doc .markdown-body h2,
          .dark .t5bb-doc .markdown-body h3,
          .dark .t5bb-doc .markdown-body h4,
          .dark .t5bb-doc .markdown-body h5,
          .dark .t5bb-doc .markdown-body h6 {
            color: #f1f5f9;
            border-bottom-color: #334155;
          }
          .dark .t5bb-doc .markdown-body table th,
          .dark .t5bb-doc .markdown-body table td { border-color: #334155; }
          .dark .t5bb-doc .markdown-body table tr {
            background-color: transparent;
            border-top-color: #334155;
          }
          .dark .t5bb-doc .markdown-body table tr:nth-child(2n) { background-color: #1e293b; }
          .dark .t5bb-doc .markdown-body blockquote { color: #94a3b8; border-left-color: #475569; }
          .dark .t5bb-doc .markdown-body code { background-color: #1e293b; color: #e2e8f0; }
          .dark .t5bb-doc .markdown-body a { color: #93c5fd; }
          .dark .t5bb-doc .markdown-body hr { background-color: #334155; }
          .dark .t5bb-doc .markdown-body li::marker { color: #64748b; }
        `}</style>
      </main>
    </div>
  );
}
