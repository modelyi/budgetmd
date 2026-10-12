/**
 * T5「专项方案说明」视图（只读）
 * =============================================================================
 * 纯 Markdown 文档阅览：
 * 1. 左侧为方案目录（序号与名称读自 docs/solutions/*.md 的文件名，一方案一文档）；
 * 2. 右侧为 Markdown 流式阅览（ByteMD Viewer + GFM，标准标题、表格、段落）；
 * 3. 页面为只读阅览，不提供在线编辑 / 保存回盘——纯 Markdown 文件始终是唯一基准源；
 * 4. 「当前看的是哪篇文档」只放会话级缓存（sessionStorage）里跨整页刷新续显。
 */
import { useEffect, useRef, useState } from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import { solutionDocs } from '../data/pages/solutionsMarkdown';

/** Markdown 渲染插件（GFM：表格、任务列表等） */
const MD_PLUGINS = [gfm()];

/** 会话级键：当前查看的方案（整页刷新后原地续显） */
const TOPIC_STORAGE_KEY = 'budgetdemo:t5-topic:v1';

function readStoredTopic(): string | null {
  try {
    return sessionStorage.getItem(TOPIC_STORAGE_KEY);
  } catch {
    return null;
  }
}
function writeStoredTopic(key: string): void {
  try {
    sessionStorage.setItem(TOPIC_STORAGE_KEY, key);
  } catch {
    /* 忽略 */
  }
}

export function SpecialSolutionsView() {
  const [topic, setTopic] = useState<string>(() => readStoredTopic() ?? '');
  const mainRef = useRef<HTMLElement | null>(null);

  const index = Math.max(0, solutionDocs.findIndex((d) => d.key === topic));
  const doc = solutionDocs[index];
  const prevDoc = index > 0 ? solutionDocs[index - 1] : null;
  const nextDoc = index < solutionDocs.length - 1 ? solutionDocs[index + 1] : null;
  const currentMarkdown = doc ? doc.markdown : '';

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [doc?.key]);

  // 记住当前方案（整页刷新后仍停在同一篇）
  useEffect(() => {
    if (doc) writeStoredTopic(doc.key);
  }, [doc]);

  if (!doc) {
    return (
      <div className="p-8 text-xs text-slate-500">未找到方案文档：docs/solutions/ 下暂无 Markdown 文件。</div>
    );
  }

  const selectTopic = (key: string) => {
    setTopic(key);
    writeStoredTopic(key);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans">
      {/* 左侧方案目录菜单 */}
      <aside className="w-64 shrink-0 h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shadow-xs z-10">
        <div className="p-3.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wide">
              专项方案说明
            </span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
            Markdown 文档
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto p-2.5 space-y-1 custom-scrollbar">
          {solutionDocs.map((d) => {
            const active = doc.key === d.key;
            return (
              <button
                key={d.key}
                onClick={() => selectTopic(d.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-all cursor-pointer ${
                  active
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200/80 dark:border-indigo-800/80 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span
                  className={`w-6 text-center text-[10.5px] font-mono shrink-0 py-0.5 rounded ${
                    active
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {d.no || '·'}
                </span>
                <span className="truncate">{d.menuTitle}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-[10.5px] text-slate-400 dark:text-slate-500 text-center leading-relaxed">
          文档源：docs/solutions/ 下的 Markdown 文件
        </div>
      </aside>

      {/* 右侧主内容区（流式 Markdown 阅览） */}
      <main
        ref={mainRef}
        className="flex-1 min-h-0 min-w-0 h-full overflow-y-auto custom-scrollbar p-6 lg:p-8 bg-slate-50/60 dark:bg-slate-950"
      >
        <div className="t5-doc max-w-4xl mx-auto space-y-4 pb-12">
          {/* 当前方案工具条：源文件路径 */}
          <div className="flex items-center justify-between gap-3">
            <span
              className="min-w-0 truncate text-[11px] font-mono text-slate-400 dark:text-slate-500"
              title={`磁盘源文件：docs/solutions/${doc.key}.md`}
            >
              源文件：docs/solutions/{doc.key}.md
            </span>
          </div>

          <article className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-7 py-6 shadow-xs">
            <Viewer value={currentMarkdown} plugins={MD_PLUGINS} />
          </article>

          {/* 底部翻页切换栏 */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            {prevDoc ? (
              <button
                onClick={() => selectTopic(prevDoc.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <span>← 上一方案：</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {prevDoc.menuTitle}
                </span>
              </button>
            ) : <div />}

            {nextDoc ? (
              <button
                onClick={() => selectTopic(nextDoc.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <span>下一方案：</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {nextDoc.menuTitle}
                </span>
                <span>→</span>
              </button>
            ) : <div />}
          </div>
        </div>

        <style>{`
          .t5-doc .markdown-body {
            background-color: transparent;
            font-size: 14px;
            line-height: 1.75;
          }
          .t5-doc .markdown-body > :first-child { margin-top: 0; }
          .t5-doc .markdown-body > :last-child { margin-bottom: 0; }
          .dark .t5-doc .markdown-body { color: #cbd5e1; }
          .dark .t5-doc .markdown-body h1,
          .dark .t5-doc .markdown-body h2,
          .dark .t5-doc .markdown-body h3,
          .dark .t5-doc .markdown-body h4,
          .dark .t5-doc .markdown-body h5,
          .dark .t5-doc .markdown-body h6 {
            color: #f1f5f9;
            border-bottom-color: #334155;
          }
          .dark .t5-doc .markdown-body table th,
          .dark .t5-doc .markdown-body table td { border-color: #334155; }
          .dark .t5-doc .markdown-body table tr {
            background-color: transparent;
            border-top-color: #334155;
          }
          .dark .t5-doc .markdown-body table tr:nth-child(2n) { background-color: #1e293b; }
          .dark .t5-doc .markdown-body blockquote { color: #94a3b8; border-left-color: #475569; }
          .dark .t5-doc .markdown-body code { background-color: #1e293b; color: #e2e8f0; }
          .dark .t5-doc .markdown-body a { color: #93c5fd; }
          .dark .t5-doc .markdown-body hr { background-color: #334155; }
          .dark .t5-doc .markdown-body li::marker { color: #64748b; }
        `}</style>
      </main>
    </div>
  );
}
