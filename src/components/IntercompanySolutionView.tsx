/**
 * T5BB「关联交易专项方案说明」视图（只读）
 * =============================================================================
 * 左侧目录 + 右侧正文两栏阅览（与 T5 专项方案说明的目录/正文布局风格一致）：
 * 1. 左侧目录由 Markdown 标题自动解析，分两组：第二部分 8 个场景 + 附录 5 节；
 *    只取 ## 下挂的 ### 两级，场景内的 #### 子节不进目录（避免目录过长）；
 * 2. 点击目录项平滑滚动到对应标题（按主内容区容器计算偏移，避开顶部固定栏）；
 * 3. 滚动时高亮当前所在章节（按标题相对容器顶部的偏移判定）；
 * 4. 标题锚点 id 由渲染后的正文 heading 在前端补挂，不改 Markdown 正文、不引第三方依赖；
 * 5. 纯 Markdown 文件（docs/solutions-t5bb/*.md）始终是唯一基准源；本页签只读，不提供编辑 / 导出。
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import { intercompanyDoc } from '../data/pages/t5bbMarkdown';

/** Markdown 渲染插件（GFM：表格、任务列表等），与 T5 专项方案说明保持一致 */
const MD_PLUGINS = [gfm()];

/** 目录分组标题（与正文 ## 一致） */
const GROUP_SCENES = '第二部分 · 具体场景说明';
const GROUP_APPENDIX = '附录 · 速查页';

/** 目录项 */
interface TocItem {
  /** 锚点 id（渲染后挂到正文 heading 上） */
  id: string;
  /** 序号（`01` / `A.`），无序号时为 `·` */
  no: string;
  /** 章节名称 */
  title: string;
}

interface TocGroup {
  label: string;
  items: TocItem[];
}

/**
 * 从 Markdown 标题自动解析目录。
 * 只收集 `## 第二部分` 与 `## 附录` 下挂的 `###`；`####` 及其以下不进目录。
 */
function parseToc(markdown: string): TocGroup[] {
  const scenes: TocItem[] = [];
  const appendix: TocItem[] = [];
  let section: 'none' | 'scenes' | 'appendix' = 'none';
  let seq = 0;

  for (const line of markdown.split(/\r?\n/)) {
    if (/^##\s+/.test(line)) {
      const text = line.replace(/^##\s+/, '').trim();
      section = text.includes('第二部分') ? 'scenes' : text.includes('附录') ? 'appendix' : 'none';
      continue;
    }
    if (section !== 'none' && /^###\s+/.test(line)) {
      const raw = line.replace(/^###\s+/, '').trim();
      const m = raw.match(/^(\d{1,2}|[A-Z]\.)\s*(.+)$/);
      const item: TocItem = {
        // id 按文档中 ### 的出现顺序编号，渲染后与正文 h3 一一对应
        id: `t5bb-sec-${seq++}`,
        no: m ? m[1] : '·',
        title: m ? m[2] : raw,
      };
      (section === 'scenes' ? scenes : appendix).push(item);
    }
  }

  const groups: TocGroup[] = [];
  if (scenes.length) groups.push({ label: GROUP_SCENES, items: scenes });
  if (appendix.length) groups.push({ label: GROUP_APPENDIX, items: appendix });
  return groups;
}

export function IntercompanySolutionView() {
  const doc = intercompanyDoc;
  const mainRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const [activeId, setActiveId] = useState<string>('');

  const groups = useMemo(() => (doc ? parseToc(doc.markdown) : []), [doc]);
  const allItems = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  // ① 正文渲染完成后，按文档顺序给 h3 挂锚点 id（与目录项一一对应）
  useEffect(() => {
    if (!doc) return;
    const root = mainRef.current?.querySelector('.t5bb-doc .markdown-body');
    if (!root) return;
    root.querySelectorAll('h3').forEach((el, i) => {
      const item = allItems[i];
      if (item) (el as HTMLElement).id = item.id;
    });
  }, [doc, allItems]);

  // ② 滚动时高亮当前所在章节
  useEffect(() => {
    const container = mainRef.current;
    if (!container || allItems.length === 0) return;
    let raf = 0;

    const compute = () => {
      raf = 0;
      const cTop = container.getBoundingClientRect().top;
      let current = allItems[0].id;
      for (const item of allItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - cTop <= 96) current = item.id;
        else break; // 标题按文档顺序排列，后续均在下方
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    compute();
    return () => {
      container.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [allItems, doc]);

  // ③ 高亮项在左侧目录内保持可见（就地滚动，不抖动页面）
  useEffect(() => {
    if (!activeId) return;
    navRef.current
      ?.querySelector(`[data-item-id="${activeId}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeId]);

  if (!doc) {
    return (
      <div className="p-8 text-xs text-slate-500">未找到方案文档：docs/solutions-t5bb/ 下暂无 Markdown 文件。</div>
    );
  }

  /** 平滑滚动到指定章节（按主内容区容器算位置，避开顶部标题条） */
  const jumpTo = (id: string) => {
    const container = mainRef.current;
    const el = document.getElementById(id);
    if (!container || !el) return;
    const offset = el.getBoundingClientRect().top - container.getBoundingClientRect().top;
    container.scrollTo({ top: Math.max(0, container.scrollTop + offset - 12), behavior: 'smooth' });
    setActiveId(id);
  };

  const total = allItems.length;

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans">
      {/* 左侧场景快速链接（窄屏 <1280px 隐藏，不挡正文） */}
      <aside className="hidden xl:flex w-60 shrink-0 h-full flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs z-10">
        <div className="p-3.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wide truncate">
              场景快速链接
            </span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium shrink-0">
            {total} 节
          </span>
        </div>

        <nav ref={navRef} className="flex-1 overflow-y-auto p-2.5 space-y-3 custom-scrollbar">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="px-2 pb-1.5 text-[10.5px] font-bold text-slate-400 dark:text-slate-500 tracking-wide">
                {group.label}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      data-item-id={item.id}
                      onClick={() => jumpTo(item.id)}
                      title={`${item.no} ${item.title}`}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-xs transition-all cursor-pointer border ${
                        active
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold border-indigo-200/80 dark:border-indigo-800/80 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 border-transparent'
                      }`}
                    >
                      <span
                        className={`w-7 text-center text-[10.5px] font-mono shrink-0 py-0.5 rounded ${
                          active
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {item.no}
                      </span>
                      <span className="truncate">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-[10.5px] text-slate-400 dark:text-slate-500 text-center leading-relaxed">
          目录由文档标题自动生成
        </div>
      </aside>

      {/* 右栏：顶部标题条 + 正文 */}
      <div className="flex flex-1 min-h-0 min-w-0 flex-col overflow-hidden">
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

        {/* 主内容区（流式 Markdown 阅览） */}
        <main
          ref={mainRef}
          className="flex-1 min-h-0 min-w-0 overflow-y-auto custom-scrollbar p-6 lg:p-8 bg-slate-50/60 dark:bg-slate-950"
        >
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
            .t5bb-doc .markdown-body h3 { scroll-margin-top: 12px; }
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
    </div>
  );
}
