/**
 * 通用「页面文档」渲染器
 * =============================================================================
 * 渲染 PageDoc：大标题 / 徽章 / 引言 / 分区卡片（h2）/ 段落（可带粗引导词）
 * / 有序列表 / 嵌套子条目。文本走内容覆盖层（resolve），并自动把本页登记为
 * 活动内容源（导航栏 Markdown 编辑即可改本页）。
 */
import React, { useEffect, useMemo } from 'react';
import type { PageBlock, PageDoc } from '../../data/content/pageContent';
import { buildPageContentSource } from '../../data/content/pageContent';
import { setActiveContentSource } from '../../data/content/contentSource';
import { useContentEditor, makeKey } from '../../data/content/contentEditor';

interface Section {
  h: PageBlock;
  items: PageBlock[];
}

export const PageDocView: React.FC<{ doc: PageDoc }> = ({ doc }) => {
  const ov = useContentEditor();
  const source = useMemo(() => buildPageContentSource(doc), [doc]);
  useEffect(() => {
    setActiveContentSource(source);
    return () => setActiveContentSource(undefined);
  }, [source]);

  const ns = `page:${doc.pageId}`;
  const val = (b: PageBlock, slot: 'text' | 'lead'): string => {
    const k = makeKey(ns, b.id, slot);
    return ov[k]?.value ?? (slot === 'text' ? b.text : (b.lead ?? ''));
  };

  // 拆分：header（首个 h2 之前）与各分区
  const header: PageBlock[] = [];
  const sections: Section[] = [];
  doc.blocks.forEach((b) => {
    if (b.kind === 'h2') sections.push({ h: b, items: [] });
    else if (sections.length === 0) header.push(b);
    else sections[sections.length - 1].items.push(b);
  });

  const h1 = header.find((b) => b.kind === 'h1');
  const badge = header.find((b) => b.kind === 'badge');
  const intro = header.find((b) => b.kind === 'p');

  // 段落（粗引导词 + 正文）
  const renderPara = (b: PageBlock, blue: boolean) => (
    <div className="flex gap-2 items-start" key={b.id}>
      {b.lead && (
        <span className={`font-semibold shrink-0 ${blue ? 'text-blue-800 dark:text-blue-300' : 'text-slate-800 dark:text-slate-200'}`}>
          {val(b, 'lead')}
        </span>
      )}
      <span>{val(b, 'text')}</span>
    </div>
  );

  // 嵌套子条目（a/b/c）
  const renderSub = (b: PageBlock) => (
    <div key={b.id}>
      {b.lead && <span className="font-semibold text-slate-800 dark:text-slate-200">{val(b, 'lead')}</span>}
      <span>{val(b, 'text')}</span>
    </div>
  );

  const renderLi = (b: PageBlock) => (
    <li key={b.id}>
      {b.lead && <b>{val(b, 'lead')}</b>}
      {val(b, 'text')}
    </li>
  );

  // 分区内容：连续 li 包进 <ol>，其余直接渲染
  const renderItems = (items: PageBlock[], blue: boolean) => {
    const nodes: React.ReactNode[] = [];
    let buf: PageBlock[] = [];
    let n = 0;
    const flush = () => {
      if (buf.length) {
        nodes.push(
          <ol
            key={`ol-${n++}`}
            className="list-decimal list-inside leading-relaxed space-y-1.5 marker:font-semibold marker:text-slate-400"
          >
            {buf.map(renderLi)}
          </ol>,
        );
        buf = [];
      }
    };
    items.forEach((b) => {
      if (b.kind === 'li') buf.push(b);
      else {
        flush();
        if (b.kind === 'p') nodes.push(renderPara(b, blue));
        else if (b.kind === 'sub') nodes.push(renderSub(b));
      }
    });
    flush();
    return nodes;
  };

  return (
    <main className="flex-1 min-h-0 min-w-0 overflow-y-auto custom-scrollbar">
      <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">
        <header className="space-y-1.5">
          <div className="flex items-center gap-2">
            {h1 && (
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{val(h1, 'text')}</h1>
            )}
            {badge && (
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-medium">
                {val(badge, 'text')}
              </span>
            )}
          </div>
          {intro && (
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{val(intro, 'text')}</p>
          )}
        </header>

        {sections.map((s) => {
          const blue = s.h.variant === 'blue';
          return (
            <section
              key={s.h.id}
              className={
                blue
                  ? 'rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/20 p-5'
                  : 'rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5'
              }
            >
              <h2
                className={`text-sm font-bold mb-3 flex items-center gap-2 ${blue ? 'text-blue-900 dark:text-blue-300' : 'text-slate-900 dark:text-slate-100'}`}
              >
                {s.h.badge && (
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded text-white text-xs font-semibold ${blue ? 'bg-blue-700 dark:bg-blue-600' : 'bg-slate-800 dark:bg-slate-700'}`}
                  >
                    {s.h.badge}
                  </span>
                )}
                {val(s.h, 'text')}
              </h2>
              <div
                className={
                  blue
                    ? 'space-y-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed'
                    : 'text-xs text-slate-600 dark:text-slate-300 leading-relaxed'
                }
              >
                {renderItems(s.items, blue)}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
};
