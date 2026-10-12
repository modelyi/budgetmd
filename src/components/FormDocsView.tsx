/**
 * T3A/T3B「表单文档页」视图（同一组件参数化承载两个页签）
 * =============================================================================
 * 直接以 Markdown 呈现表单文档（T3A = docs/formdocs/*.md 37 篇；T3B =
 * docs/formdocs-multi/*.md 43 篇），替代原 TSX 编制套表原型页面：
 * 1. 左侧为表单目录，按分组 BA / BB / BF / BO 归组，条目显示「表单编码 + 表单名」；
 * 2. 右侧为 Markdown 流式阅览（ByteMD Viewer + GFM，标准标题、表格、段落）；
 * 3. 进入页签默认打开第一篇；「当前看的是哪篇」只放会话级缓存（sessionStorage）跨整页刷新续显，
 *    T3A / T3B 各用独立键（storageKey，缺省 budgetdemo:t3a-doc:v1；T3B 传 budgetdemo:t3b-doc:v1），互不串扰；
 * 4. 文档内嵌 <style> 块已在数据源层（formDocsShared.ts 装配）剥除，表样样式统一由 src/index.css
 *    的 .t3a-doc-view 作用域规则提供；
 * 5. 参数均带默认值：budget-proto 分支不传参即 T3A 现状，budget-multi 分支传入 T3B 文档集与键。
 * 说明：本页为只读阅览，不提供在线编辑 / 保存回盘——文档由 scripts/generateT3aFormDocs.ts
 * 生成，手改会被覆盖。
 */
import { useEffect, useRef, useState } from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import mermaid from 'mermaid';
import { formDocs, FORM_DOC_GROUPS } from '../data/pages/formDocsMarkdown';
import type { FormDoc } from '../data/pages/formDocsShared';

/** Markdown 渲染插件（GFM：表格、任务列表等） */
const MD_PLUGINS = [gfm()];

// mermaid 图渲染（A1.3 文档内嵌 ```mermaid 代码块）。全项目仅此处 + MermaidView 初始化；
// startOnLoad:false 禁止自动扫描，改由下方 useEffect 对渲染后的 `code.language-mermaid` 逐块渲染。
mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: 'base', flowchart: { useMaxWidth: false } });

/** 组件参数（均带默认值；缺省 = T3A 页签现状，budget-proto 分支不传参） */
export interface FormDocsViewProps {
  /** 文档集（缺省 = T3A 37 篇 docs/formdocs） */
  docSet?: FormDoc[];
  /** 会话级键：当前查看的文档（整页刷新后原地续显；T3A / T3B 独立，互不串扰） */
  storageKey?: string;
  /** 文档源目录（页脚与工具条文案用，如 docs/formdocs） */
  sourceDir?: string;
}

/** 缺省会话级键：T3A 当前查看的表单文档（整页刷新后原地续显） */
const DEFAULT_STORAGE_KEY = 'budgetdemo:t3a-doc:v1';
/** 缺省文档源目录：T3A 文档 */
const DEFAULT_SOURCE_DIR = 'docs/formdocs';

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

/** 左侧目录分组：按 FORM_DOC_GROUPS 顺序归组，未知分组追加在后；空组不显示。 */
function buildGroups(docSet: FormDoc[]) {
  const known = FORM_DOC_GROUPS as readonly string[];
  const extra = Array.from(new Set(docSet.map((d) => d.group))).filter((g) => !known.includes(g));
  return [...known, ...extra]
    .map((group) => ({ group, items: docSet.filter((d) => d.group === group) }))
    .filter((g) => g.items.length > 0);
}

export function FormDocsView({
  docSet = formDocs,
  storageKey = DEFAULT_STORAGE_KEY,
  sourceDir = DEFAULT_SOURCE_DIR,
}: FormDocsViewProps = {}) {
  const [current, setCurrent] = useState<string>(() => readStoredDoc(storageKey) ?? '');
  const mainRef = useRef<HTMLElement | null>(null);
  const articleRef = useRef<HTMLElement | null>(null);

  const index = Math.max(0, docSet.findIndex((d) => d.key === current));
  const doc = docSet[index];
  const prevDoc = index > 0 ? docSet[index - 1] : null;
  const nextDoc = index < docSet.length - 1 ? docSet[index + 1] : null;

  // 切换文档时正文回顶
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [doc?.key]);

  // 记住当前文档（整页刷新后仍停在同一篇）
  useEffect(() => {
    if (doc) writeStoredDoc(storageKey, doc.key);
  }, [doc, storageKey]);

  // 文档切换后，把正文里 ` ```mermaid ` 代码块渲染成 SVG（A1.3 五张图）。
  // ByteMD 通过 dangerouslySetInnerHTML 同步产出 DOM，effect 运行时正文已就绪；逐块 mermaid.render
  // 后把 <pre> 原位替换为图容器。渲染失败保留代码块原样（不吞错，便于排查）。
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
    // requestAnimationFrame 双保险：确保 ByteMD 的 viewerEffect（插件）已跑完再替换
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
    <div className="flex h-full w-full overflow-hidden bg-slate-50 text-slate-800 font-sans">
      {/* 左侧表单目录菜单 */}
      <aside className="w-72 shrink-0 h-full border-r border-slate-200 bg-white flex flex-col shadow-xs z-10">
        <div className="p-3.5 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-700" />
            <span className="text-xs font-bold text-slate-800 tracking-wide">表单文档</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
            Markdown 文档
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto p-2.5 space-y-2 custom-scrollbar">
          {groups.map(({ group, items }) => (
            <div key={group} className="space-y-1">
              <div className="flex items-center justify-between px-2 pt-1 pb-0.5">
                <span className="text-[11px] font-bold text-blue-800 tracking-widest">{group}</span>
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
                        ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200 shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span
                      className={`shrink-0 text-[10.5px] font-mono px-1.5 py-0.5 rounded ${
                        active ? 'bg-blue-700 text-white font-bold' : 'bg-slate-100 text-slate-500'
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

        <div className="p-3 border-t border-slate-100 text-[10.5px] text-slate-400 text-center leading-relaxed">
          文档源：{sourceDir}/ 下的 Markdown 文件
        </div>
      </aside>

      {/* 右侧主内容区（流式 Markdown 阅览） */}
      <main
        ref={mainRef}
        className="flex-1 min-h-0 min-w-0 h-full overflow-y-auto custom-scrollbar p-6 lg:p-8 bg-slate-50/60"
      >
        <div className="t3a-doc-view max-w-5xl mx-auto space-y-4 pb-12">
          {/* 当前文档工具条：源文件路径 */}
          <div className="flex items-center justify-between gap-3">
            <span
              className="min-w-0 truncate text-[11px] font-mono text-slate-400"
              title={`磁盘源文件：${sourceDir}/${doc.key}.md`}
            >
              源文件：{sourceDir}/{doc.key}.md
            </span>
            <span className="shrink-0 text-[11px] text-slate-400">
              {doc.group} 组 · 第 {index + 1} / {docSet.length} 篇
            </span>
          </div>

          <article
            ref={articleRef}
            className="rounded-xl border border-slate-200/80 bg-white px-7 py-6 shadow-xs"
          >
            <Viewer value={doc.markdown} plugins={MD_PLUGINS} />
          </article>

          {/* 底部翻页切换栏 */}
          <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-xs">
            {prevDoc ? (
              <button
                onClick={() => select(prevDoc.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <span>← 上一篇：</span>
                <span className="font-semibold text-slate-800">{prevDoc.code} {prevDoc.name}</span>
              </button>
            ) : <div />}

            {nextDoc ? (
              <button
                onClick={() => select(nextDoc.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <span>下一篇：</span>
                <span className="font-semibold text-slate-800">{nextDoc.code} {nextDoc.name}</span>
                <span>→</span>
              </button>
            ) : <div />}
          </div>
        </div>
      </main>
    </div>
  );
}
