/**
 * T5「专项方案说明」视图
 * =============================================================================
 * 现代化企业级呈现：
 * 1. 采用 Slate/Indigo 现代清爽设计规范，彻底告别昏暗泥土色；
 * 2. 左右分栏独立滚动（左侧固定导航菜单、右侧宽屏内容流式阅读）；
 * 3. PPT 培训风格卡片网格系统（自适应网格、清晰视阶、高对比度排版）；
 * 4. 目录方案支持一键跳转，底部提供「上一方案 / 下一方案」无缝切页；
 * 5. 保持与 Markdown 内容覆盖层的完整兼容。
 */
import React, { useEffect, useMemo, useState } from 'react';
import { specialPages, type SpecialPage, type SpecialItem } from '../data/pages/specialContent';
import { SpecialDiagram } from './SpecialDiagrams';
import {
  makeKey, resolveText, contentEditorStore, useContentEditor, countNamespace,
} from '../data/content/contentEditor';
import { type ContentSource, setActiveContentSource } from '../data/content/contentSource';
import { type MdField, type MdKind } from '../data/logic/logicMarkdown';

const NS = 'page:special';

/** 收集某一方案页的全部正文字段 */
function collectPage(page: SpecialPage): MdField[] {
  const f: MdField[] = [];
  const push = (id: string, field: string, kind: MdKind, original: string, section?: string) => {
    f.push({ key: makeKey(NS, id, field), kind, original, value: original, section });
  };
  for (const it of page.items) {
    switch (it.t) {
      case 'eyebrow':
        push(it.id, 'text', 'text', it.text);
        break;
      case 'h1':
        push(it.id, 'text', 'h1', it.text);
        break;
      case 'layer':
        push(it.id, 'text', 'caption', it.text);
        break;
      case 'p':
        push(it.id, 'text', 'line', it.text);
        break;
      case 'cards':
        it.cards.forEach((c, i) => {
          if (c.lead) push(it.id, `c${i}-lead`, 'label', c.lead);
          push(it.id, `c${i}-text`, 'line', c.text);
        });
        break;
      case 'table':
        it.headers.forEach((h, hi) => {
          push(it.id, `h${hi}`, 'label', h);
        });
        it.rows.forEach((r, ri) => {
          r.forEach((cell, ci) => {
            push(it.id, `r${ri}-c${ci}`, 'line', cell);
          });
        });
        break;
      case 'warn':
        if (it.lead) push(it.id, 'lead', 'label', it.lead);
        push(it.id, 'text', 'foot', it.text);
        break;
      case 'agenda':
        it.rows.forEach((r, i) => {
          push(it.id, `r${i}-no`, 'label', r.no);
          push(it.id, `r${i}-title`, 'line', r.title);
          push(it.id, `r${i}-desc`, 'line', r.desc);
        });
        break;
      case 'diagram':
        break;
    }
  }
  return f;
}

function buildSpecialSource(page: SpecialPage): ContentSource {
  const fields = collectPage(page);
  const orig = new Map(fields.map((x) => [x.key, x.original]));
  return {
    id: `special-${page.key}`,
    title: `专项方案 · ${page.menuTitle}`,
    collect: () => fields.map((x) => ({ ...x, value: resolveText(x.key, x.original) })),
    apply: (parsed) => {
      Object.entries(parsed).forEach(([key, value]) => {
        if (orig.has(key)) contentEditorStore.setText(key, value, orig.get(key));
      });
    },
    reset: () => fields.forEach((x) => contentEditorStore.reset(x.key)),
    count: () => countNamespace(contentEditorStore.getMap(), NS),
  };
}

// ── 现代化 UI 视觉原子 ──

function EyebrowBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 mb-2">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
      <span>{children}</span>
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
      {children}
    </h2>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 pt-6 pb-2.5 border-b border-slate-200 dark:border-slate-800">
      <span className="w-1.5 h-4.5 rounded-full bg-indigo-600 dark:bg-indigo-500" />
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wide">
        {children}
      </h3>
    </div>
  );
}

function PresentationCard({
  lead,
  text,
  highlight,
}: {
  lead?: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 flex flex-col justify-between transition-all border text-xs leading-relaxed ${
        highlight
          ? 'bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-white dark:from-indigo-950/30 dark:via-blue-950/20 dark:to-slate-900 border-indigo-200 dark:border-indigo-800/80 shadow-xs'
          : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs'
      }`}
    >
      <div>
        {lead && (
          <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-100 dark:border-slate-800">
            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0" />
            <span className="font-bold text-slate-900 dark:text-slate-100 text-xs tracking-tight">
              {lead}
            </span>
          </div>
        )}
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[12.5px]">
          {text}
        </p>
      </div>
    </div>
  );
}

function AlertBanner({ lead, text }: { lead?: string; text: string }) {
  return (
    <div className="rounded-xl border border-amber-200/90 dark:border-amber-900/60 bg-gradient-to-r from-amber-50/90 via-amber-50/50 to-orange-50/30 dark:from-amber-950/25 dark:via-amber-950/15 dark:to-slate-900 p-4 mt-4 shadow-xs">
      {lead && (
        <div className="flex items-center gap-2 font-bold text-xs text-amber-900 dark:text-amber-200 mb-1.5">
          <svg className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{lead}</span>
        </div>
      )}
      <div className="text-amber-900/90 dark:text-amber-200/90 leading-relaxed text-[12px]">
        {text}
      </div>
    </div>
  );
}

/** 单个方案页内容（全部 resolve） */
function PageContent({
  page,
  onNavigate,
}: {
  page: SpecialPage;
  onNavigate: (key: string) => void;
}) {
  useContentEditor();
  const rv = (id: string, field: string, o: string) => resolveText(makeKey(NS, id, field), o);

  return (
    <div className="space-y-4">
      {page.items.map((it: SpecialItem, idx) => {
        switch (it.t) {
          case 'eyebrow':
            return <EyebrowBadge key={idx}>{rv(it.id, 'text', it.text)}</EyebrowBadge>;
          case 'h1':
            return <Title key={idx}>{rv(it.id, 'text', it.text)}</Title>;
          case 'layer':
            return <SectionHeading key={idx}>{rv(it.id, 'text', it.text)}</SectionHeading>;
          case 'p':
            return (
              <p
                key={idx}
                className="text-xs sm:text-[13px] leading-relaxed text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs"
              >
                {rv(it.id, 'text', it.text)}
              </p>
            );
          case 'cards':
            return (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {it.cards.map((c, ci) => (
                  <PresentationCard
                    key={ci}
                    highlight={c.hl}
                    lead={c.lead ? rv(it.id, `c${ci}-lead`, c.lead) : undefined}
                    text={rv(it.id, `c${ci}-text`, c.text)}
                  />
                ))}
              </div>
            );
          case 'table':
            return (
              <div key={idx} className="mt-3 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <table className="w-full text-left text-xs border-collapse min-w-[760px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11.5px]">
                      {it.headers.map((h, hi) => (
                        <th key={hi} className="px-3.5 py-2.5 whitespace-nowrap">
                          {rv(it.id, `h${hi}`, h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-600 dark:text-slate-300">
                    {it.rows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`px-3.5 py-3 align-top leading-relaxed text-[12px] ${
                              ci === 0 ? 'font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap' : ''
                            }`}
                          >
                            {rv(it.id, `r${ri}-c${ci}`, cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'warn':
            return (
              <AlertBanner
                key={idx}
                lead={it.lead ? rv(it.id, 'lead', it.lead) : undefined}
                text={rv(it.id, 'text', it.text)}
              />
            );
          case 'agenda':
            return (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3">
                {it.rows.map((r, ri) => {
                  const targetPage = specialPages.find((p) => p.no === r.no);
                  return (
                    <div
                      key={ri}
                      onClick={() => targetPage && onNavigate(targetPage.key)}
                      className="group p-4 rounded-xl flex items-center gap-3.5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/80 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                        {rv(it.id, `r${ri}-no`, r.no)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                          <span className="truncate">{rv(it.id, `r${ri}-title`, r.title)}</span>
                          <span className="text-[11px] text-slate-400 group-hover:translate-x-0.5 transition-transform">→</span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                          {rv(it.id, `r${ri}-desc`, r.desc)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          case 'diagram':
            return (
              <div key={idx} className="mt-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
                <SpecialDiagram id={it.id} />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export function SpecialSolutionsView() {
  const [topic, setTopic] = useState('agenda');
  const page = specialPages.find((p) => p.key === topic) ?? specialPages[0];

  const source = useMemo(() => buildSpecialSource(page), [page]);
  useEffect(() => {
    setActiveContentSource(source);
    return () => setActiveContentSource(null);
  }, [source]);

  // 前后翻页计算
  const currentIndex = specialPages.findIndex((p) => p.key === page.key);
  const prevPage = currentIndex > 0 ? specialPages[currentIndex - 1] : null;
  const nextPage = currentIndex < specialPages.length - 1 ? specialPages[currentIndex + 1] : null;

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
            T5 架构
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto p-2.5 space-y-1 custom-scrollbar">
          {specialPages.map((p) => {
            const active = topic === p.key;
            return (
              <button
                key={p.key}
                onClick={() => setTopic(p.key)}
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
                  {p.no || '≡'}
                </span>
                <span className="truncate">{p.menuTitle}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 text-center">
          点击右上角「✎ Markdown」可编辑
        </div>
      </aside>

      {/* 右侧主内容区（平滑独立滚动） */}
      <main className="flex-1 min-h-0 min-w-0 h-full overflow-y-auto custom-scrollbar p-6 lg:p-8 bg-slate-50/60 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto space-y-6 pb-12">
          {/* 正文卡片与模块 */}
          <PageContent page={page} onNavigate={(k) => setTopic(k)} />

          {/* 底部翻页切换栏（PPT 讲义式平滑切换） */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            {prevPage ? (
              <button
                onClick={() => setTopic(prevPage.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <span>← 上一方案：</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{prevPage.menuTitle}</span>
              </button>
            ) : <div />}

            {nextPage ? (
              <button
                onClick={() => setTopic(nextPage.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <span>下一方案：</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{nextPage.menuTitle}</span>
                <span>→</span>
              </button>
            ) : <div />}
          </div>
        </div>
      </main>
    </div>
  );
}
