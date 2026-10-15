/**
 * 表单文档阅览视图组件
 * =============================================================================
 * 纯 Markdown 规格书阅览（GFM 表格、公式、标题大纲与 Mermaid 图表）：
 * 1. T2 预算编制套表：呈现单体全卷 Markdown（docs/T2-全面预算编制套表全卷.md，
 *    涵盖 BA/BB/BF/BO/AA/AB/AM 全套 72 篇规格说明书），左侧直接呈现多级章节大纲与实时搜索定位；
 * 2. T1 总览：呈现 A1 系列文档（4 篇），支持侧栏单篇列表与本篇大纲自由切换；
 * 3. 悬浮目录大纲导航：实时提取正文标题生成浮动索引，滚动高亮可视区当前章节并支持平滑定位。
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import mermaid from 'mermaid';
import { ListTree, ChevronLeft, ArrowUp, Search, List, X } from 'lucide-react';
import { formDocsSuite } from '../data/pages/formDocsMarkdownSuite';
import { FORM_DOC_GROUPS, type FormDoc } from '../data/pages/formDocsShared';

/** Markdown 渲染插件（GFM：表格、任务列表等） */
const MD_PLUGINS = [gfm()];

/** 目录标题索引项 */
export interface TocHeading {
  id: string;
  level: number;
  text: string;
  cleanText: string;
}

/** 从 Markdown 文本中提取标题（# / ## / ###），排除代码块内容 */
export function parseHeadings(markdown: string): TocHeading[] {
  if (!markdown) return [];
  const headings: TocHeading[] = [];
  const lines = markdown.split(/\r?\n/);
  let inCodeBlock = false;
  let index = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const rawText = match[2].trim();
      const cleanText = rawText.replace(/<[^>]*>/g, '').trim();
      if (cleanText) {
        headings.push({
          id: `doc-heading-${index++}`,
          level,
          text: rawText,
          cleanText,
        });
      }
    }
  }
  return headings;
}

// mermaid 图渲染初始化
mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: 'base', flowchart: { useMaxWidth: false } });

/** 组件参数 */
export interface FormDocsViewProps {
  /** 文档集（缺省 = T2 全卷合订本） */
  docSet?: FormDoc[];
  /** 会话级键：当前查看的文档（整页刷新后原地续显） */
  storageKey?: string;
  /** 文档源目录（页眉文案用，如 docs） */
  sourceDir?: string;
}

/** 缺省会话级键 */
const DEFAULT_STORAGE_KEY = 'budgetdemo:t2-doc:v1';
/** 缺省文档源目录 */
const DEFAULT_SOURCE_DIR = 'docs';

/** 分组中文说明 */
const GROUP_NAMES: Record<string, string> = {
  BA: '编制前提与假设',
  BB: '业务预算编制表',
  BF: '财务预算与测算表',
  BO: '预算输出三表',
  AA: '基础主数据',
  AB: '业务字典与参数',
  AM: '勾稽与映射',
  A1: '总览说明',
};

function readStoredDoc(storageKey: string): string | null {
  try {
    return sessionStorage.getItem(storageKey);
  } catch {
    return null;
  }
}
function writeStoredDoc(storageKey: string, key: string): void {
  try {
    sessionStorage.setItem(storageKey, key);
  } catch {
    /* 忽略 */
  }
}

/** 左侧目录分组：按 FORM_DOC_GROUPS 顺序归组 */
function buildGroups(docSet: FormDoc[]) {
  const known = FORM_DOC_GROUPS as readonly string[];
  const extra = Array.from(new Set(docSet.map((d) => d.group))).filter((g) => !known.includes(g));
  return [...known, ...extra]
    .map((group) => ({ group, items: docSet.filter((d) => d.group === group) }))
    .filter((g) => g.items.length > 0);
}

export function FormDocsView({
  docSet = formDocsSuite,
  storageKey = DEFAULT_STORAGE_KEY,
  sourceDir = DEFAULT_SOURCE_DIR,
}: FormDocsViewProps = {}) {
  const isSingleDoc = docSet.length <= 1;
  const [current, setCurrent] = useState<string>(() => readStoredDoc(storageKey) ?? '');
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isTocOpen, setIsTocOpen] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem('budgetdemo:toc-open:v1');
      if (saved !== null) return saved === 'true';
    } catch {
      /* 忽略 */
    }
    return true;
  });
  const [sidebarTab, setSidebarTab] = useState<'forms' | 'outline'>(() => (isSingleDoc ? 'outline' : 'forms'));

  const mainRef = useRef<HTMLElement | null>(null);
  const articleRef = useRef<HTMLElement | null>(null);

  const index = Math.max(0, docSet.findIndex((d) => d.key === current));
  const doc = docSet[index] ?? docSet[0];
  const prevDoc = index > 0 ? docSet[index - 1] : null;
  const nextDoc = index < docSet.length - 1 ? docSet[index + 1] : null;

  // 根据当前 Markdown 内容自动解析标题大纲索引
  const headings = useMemo(() => parseHeadings(doc?.markdown ?? ''), [doc?.markdown]);

  // 大纲搜索过滤
  const filteredHeadings = useMemo(() => {
    if (!searchQuery.trim()) return headings;
    const q = searchQuery.toLowerCase().trim();
    return headings.filter((h) => h.cleanText.toLowerCase().includes(q));
  }, [headings, searchQuery]);

  // 记录浮动大纲展开/收起状态
  useEffect(() => {
    try {
      sessionStorage.setItem('budgetdemo:toc-open:v1', String(isTocOpen));
    } catch {
      /* 忽略 */
    }
  }, [isTocOpen]);

  // 切换文档时正文回顶
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
    if (headings.length > 0) setActiveHeadingId(headings[0].id);
  }, [doc?.key]);

  // 记住当前文档（整页刷新后仍停在同一篇）
  useEffect(() => {
    if (doc) writeStoredDoc(storageKey, doc.key);
  }, [doc, storageKey]);

  const isManualScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // 正文渲染后，按顺序为 h1, h2, h3 挂载唯一锚点 ID 与呼吸边距（支持微任务与微延时重试以确保 Viewer 渲染完毕）
  useEffect(() => {
    const article = articleRef.current;
    if (!article || !doc || headings.length === 0) return;

    const bindHeadingIds = () => {
      const elements = Array.from(article.querySelectorAll('h1, h2, h3')) as HTMLElement[];
      let hIdx = 0;
      for (const el of elements) {
        if (el.closest('pre') || el.closest('code')) continue;
        if (headings[hIdx]) {
          el.id = headings[hIdx].id;
          el.style.scrollMarginTop = '28px';
          hIdx++;
        }
      }
    };

    bindHeadingIds();
    const rafId = requestAnimationFrame(bindHeadingIds);
    const timer = window.setTimeout(bindHeadingIds, 120);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timer);
    };
  }, [doc?.key, doc?.markdown, headings]);

  // 滚动时高亮当前可视区对应的标题
  useEffect(() => {
    const container = mainRef.current;
    if (!container || headings.length === 0) return;

    let raf = 0;
    const updateActive = () => {
      raf = 0;
      if (isManualScrollingRef.current) return;

      const cTop = container.getBoundingClientRect().top;
      let curr = headings[0]?.id ?? '';
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        const dist = el.getBoundingClientRect().top - cTop;
        if (dist <= 140) {
          curr = h.id;
        } else {
          break;
        }
      }
      setActiveHeadingId(curr);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateActive);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    updateActive();

    return () => {
      container.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [headings, doc?.key]);

  // 当当前激活的标题变化时，确保大纲列表自动滚动至当前选中的标题（支持双侧目录列表）
  useEffect(() => {
    if (!activeHeadingId) return;
    const items = document.querySelectorAll(`[data-toc-item="${activeHeadingId}"]`);
    items.forEach((item) => {
      (item as HTMLElement).scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
    });
  }, [activeHeadingId]);

  // 平滑滚动定位到指定标题
  const scrollToHeading = (id: string) => {
    const container = mainRef.current;
    const article = articleRef.current;
    if (!container) return;

    let el = document.getElementById(id);
    if (!el && article) {
      // 容错匹配：若 DOM 尚未分配对应 id，按 cleanText 兜底匹配
      const target = headings.find((h) => h.id === id);
      if (target) {
        const elements = Array.from(article.querySelectorAll('h1, h2, h3')) as HTMLElement[];
        const found = elements.find((node) => {
          const txt = node.textContent?.trim() || '';
          return txt === target.cleanText || txt.startsWith(target.cleanText) || target.cleanText.startsWith(txt);
        });
        if (found) {
          found.id = id;
          found.style.scrollMarginTop = '28px';
          el = found;
        }
      }
    }

    // 立即激活高亮状态，并平滑滚动到对应标题
    setActiveHeadingId(id);
    isManualScrollingRef.current = true;

    if (el) {
      const cRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const targetTop = elRect.top - cRect.top + container.scrollTop - 24;
      container.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }

    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 700);
  };

  // 文档切换后，把正文里 ` ```mermaid ` 代码块渲染成 SVG
  useEffect(() => {
    const article = articleRef.current;
    if (!article || !doc) return;
    let cancelled = false;
    let seq = 0;
    const blocks = Array.from(article.querySelectorAll('pre > code.language-mermaid'));
    const render = async () => {
      for (const codeEl of blocks) {
        if (cancelled) return;
        const pre = codeEl.parentElement;
        if (!pre || pre.dataset.mermaidRendered === '1') continue;
        const source = codeEl.textContent ?? '';
        try {
          const { svg } = await mermaid.render(`a1mm-${Date.now()}-${seq++}`, source);
          const wrapper = document.createElement('div');
          wrapper.className = 'a1-mermaid-diagram';
          wrapper.innerHTML = svg;
          pre.dataset.mermaidRendered = '1';
          pre.replaceWith(wrapper);
        } catch (err) {
          console.error('[FormDocsView] mermaid 渲染失败，保留代码块原文：', err);
        }
      }
    };
    const raf = requestAnimationFrame(() => void render());
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [doc?.key]);

  if (!doc) {
    return (
      <div className="p-8 text-xs text-slate-500">
        未找到表单文档：{sourceDir}/ 下暂无 Markdown 文件。
      </div>
    );
  }

  const select = (key: string) => {
    setCurrent(key);
    writeStoredDoc(storageKey, key);
  };

  const groups = buildGroups(docSet);

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans">
      {/* 左侧表单目录或大纲菜单 */}
      <aside className="w-72 shrink-0 h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shadow-xs z-10">
        <div className="p-3 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-700" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 tracking-wide">
              {isSingleDoc ? '全卷目录大纲' : '表单文档'}
            </span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800 font-medium">
            {isSingleDoc ? '全卷单体' : 'Markdown 规格书'}
          </span>
        </div>

        {/* 仅在多篇模式下显示表单列表 / 大纲切换 */}
        {!isSingleDoc && (
          <div className="p-2 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-1 bg-slate-50/60 dark:bg-slate-900/60">
            <button
              onClick={() => setSidebarTab('forms')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                sidebarTab === 'forms'
                  ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 font-bold shadow-xs border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <List size={13} />
              <span>表单列表</span>
              <span className="text-[10px] opacity-75">({docSet.length})</span>
            </button>
            <button
              onClick={() => setSidebarTab('outline')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                sidebarTab === 'outline'
                  ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 font-bold shadow-xs border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <ListTree size={13} />
              <span>本篇大纲</span>
              <span className="text-[10px] opacity-75">({headings.length})</span>
            </button>
          </div>
        )}

        {/* 全卷单体模式或大纲标签下的搜索栏 */}
        {(isSingleDoc || sidebarTab === 'outline') && (
          <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40">
            <div className="relative flex items-center">
              <Search size={12} className="absolute left-2.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索章节或表单编码..."
                className="w-full pl-7 pr-7 py-1 text-xs bg-slate-100 dark:bg-slate-800/80 rounded-md border border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        )}

        {!isSingleDoc && sidebarTab === 'forms' ? (
          <nav className="flex-1 overflow-y-auto p-2.5 space-y-2 custom-scrollbar">
            {groups.map(({ group, items }) => (
              <div key={group} className="space-y-1">
                <div className="flex items-center justify-between px-2 pt-1 pb-0.5">
                  <span className="text-[11px] font-bold text-blue-800 dark:text-blue-400 tracking-wider">
                    {group} {GROUP_NAMES[group] ? `· ${GROUP_NAMES[group]}` : ''}
                  </span>
                  <span className="text-[10px] text-slate-400">{items.length} 篇</span>
                </div>
                {items.map((d) => {
                  const active = doc.key === d.key;
                  return (
                    <button
                      key={d.key}
                      onClick={() => select(d.key)}
                      title={`${d.code} ${d.name}`}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-xs transition-all cursor-pointer ${
                        active
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <span
                        className={`shrink-0 text-[10.5px] font-mono px-1.5 py-0.5 rounded ${
                          active ? 'bg-blue-700 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {d.code}
                      </span>
                      <span className="truncate">{d.name}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        ) : (
          <nav className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
            {isSingleDoc && (
              <div className="px-2 pt-1 pb-1.5 text-[10.5px] text-slate-400 flex items-center justify-between">
                <span>章节与表单索引</span>
                <span>{filteredHeadings.length} 节</span>
              </div>
            )}
            {filteredHeadings.length === 0 ? (
              <div className="p-4 text-[11px] text-slate-400 text-center">
                {searchQuery ? '无匹配章节' : '暂无标题章节'}
              </div>
            ) : (
              filteredHeadings.map((h) => {
                const isActive = activeHeadingId === h.id;
                return (
                  <button
                    key={h.id}
                    data-toc-item={h.id}
                    onClick={() => scrollToHeading(h.id)}
                    title={h.cleanText}
                    className={`group w-full text-left rounded-md transition-all cursor-pointer flex items-center gap-2 border-l-[3px] ${
                      h.level === 1
                        ? 'py-1.5 pr-2 pl-2 text-xs font-bold'
                        : h.level === 2
                        ? 'py-1 pr-2 pl-3 text-[11.5px] font-medium'
                        : 'py-0.5 pr-2 pl-4 text-[11px]'
                    } ${
                      isActive
                        ? 'bg-blue-50/95 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold border-blue-600 dark:border-blue-400 shadow-2xs'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                        isActive
                          ? 'bg-blue-600 dark:bg-blue-400 scale-100 opacity-100 shadow-2xs'
                          : 'bg-transparent group-hover:bg-slate-300 dark:group-hover:bg-slate-600 scale-75 opacity-0 group-hover:opacity-100'
                      }`}
                    />
                    <span className="truncate flex-1">{h.cleanText}</span>
                  </button>
                );
              })
            )}
          </nav>
        )}

        <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-[10.5px] text-slate-400 text-center leading-relaxed">
          源文件：{isSingleDoc ? 'docs/T2-全面预算编制套表全卷.md' : `${doc.sourceDir ?? sourceDir}/${doc.key}.md`}
        </div>
      </aside>

      {/* 右侧主内容区（带左侧浮动目录大纲导航栏） */}
      <div className="flex-1 min-h-0 min-w-0 h-full relative overflow-hidden flex flex-col">
        {/* 浮动的目录大纲导航栏 */}
        {headings.length > 0 && (
          <div className="absolute top-4 left-4 z-30 pointer-events-auto">
            {!isTocOpen ? (
              <button
                onClick={() => setIsTocOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-md hover:border-blue-400 dark:hover:border-blue-500 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all cursor-pointer group"
                title="展开文档大纲索引"
              >
                <ListTree size={14} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                <span>目录大纲</span>
                <span className="px-1.5 py-0.2 rounded-full bg-blue-50 dark:bg-blue-950 text-[10px] text-blue-700 dark:text-blue-300 font-bold border border-blue-100 dark:border-blue-800">
                  {headings.length}
                </span>
              </button>
            ) : (
              <div className="w-64 max-h-[calc(100vh-140px)] flex flex-col rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all text-xs">
                <div className="p-2.5 px-3 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/50">
                  <div className="flex items-center gap-2 min-w-0">
                    <ListTree size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="font-bold text-slate-800 dark:text-slate-100 truncate">目录大纲</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100/70 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium shrink-0">
                      {headings.length} 节
                    </span>
                  </div>
                  <button
                    onClick={() => setIsTocOpen(false)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                    title="收起大纲"
                  >
                    <ChevronLeft size={14} />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar max-h-[calc(100vh-210px)]">
                  {headings.map((h) => {
                    const isActive = activeHeadingId === h.id;
                    return (
                      <button
                        key={h.id}
                        data-toc-item={h.id}
                        onClick={() => scrollToHeading(h.id)}
                        title={h.cleanText}
                        className={`group w-full text-left rounded-md transition-all cursor-pointer flex items-center gap-2 border-l-[3px] ${
                          h.level === 1
                            ? 'py-1.5 pr-2 pl-2 text-xs font-bold'
                            : h.level === 2
                            ? 'py-1 pr-2 pl-3 text-[11.5px] font-medium'
                            : 'py-0.5 pr-2 pl-4 text-[11px]'
                        } ${
                          isActive
                            ? 'bg-blue-50/95 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold border-blue-600 dark:border-blue-400 shadow-2xs'
                            : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                            isActive
                              ? 'bg-blue-600 dark:bg-blue-400 scale-100 opacity-100 shadow-2xs'
                              : 'bg-transparent group-hover:bg-slate-300 dark:group-hover:bg-slate-600 scale-75 opacity-0 group-hover:opacity-100'
                          }`}
                        />
                        <span className="truncate flex-1">{h.cleanText}</span>
                      </button>
                    );
                  })}
                </nav>

                <div className="px-3 py-1.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between text-[10px] text-slate-400">
                  <span>点击快速定位</span>
                  <button
                    onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-0.5 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    <ArrowUp size={11} />
                    <span>回顶</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 流式 Markdown 阅览 */}
        <main
          ref={mainRef}
          className="flex-1 min-h-0 min-w-0 h-full overflow-y-auto custom-scrollbar p-6 lg:p-8 bg-slate-50/60 dark:bg-slate-950/60"
        >
          <div className="t3a-doc-view max-w-5xl mx-auto space-y-4 pb-12">
            {/* 当前文档工具条：源文件路径 */}
            <div className="flex items-center justify-between gap-3">
              <span
                className="min-w-0 truncate text-[11px] font-mono text-slate-400"
                title={isSingleDoc ? '磁盘源文件：docs/T2-全面预算编制套表全卷.md' : `磁盘源文件：${doc.sourceDir ?? sourceDir}/${doc.key}.md`}
              >
                源文件：{isSingleDoc ? 'docs/T2-全面预算编制套表全卷.md' : `${doc.sourceDir ?? sourceDir}/${doc.key}.md`}
              </span>
              <span className="shrink-0 text-[11px] text-slate-400 font-medium">
                {isSingleDoc ? '全卷规格书 · 72 篇合订本' : `${doc.group} 组 · 第 ${index + 1} / ${docSet.length} 篇`}
              </span>
            </div>

            <article
              ref={articleRef}
              className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-7 py-6 shadow-xs"
            >
              <Viewer value={doc.markdown} plugins={MD_PLUGINS} />
            </article>

            {/* 底部翻页栏：多文档模式显示上一篇/下一篇；单体全卷模式显示回顶 */}
            {!isSingleDoc ? (
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                {prevDoc ? (
                  <button
                    onClick={() => select(prevDoc.key)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    <span>← 上一篇：</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{prevDoc.code} {prevDoc.name}</span>
                  </button>
                ) : <div />}

                {nextDoc ? (
                  <button
                    onClick={() => select(nextDoc.key)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    <span>下一篇：</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{nextDoc.code} {nextDoc.name}</span>
                    <span>→</span>
                  </button>
                ) : <div />}
              </div>
            ) : (
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>— 全卷规格书完结（BA/BB/BF/BO/AA/AB/AM 72 篇） —</span>
                <button
                  onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <ArrowUp size={12} />
                  <span>返回顶部</span>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
