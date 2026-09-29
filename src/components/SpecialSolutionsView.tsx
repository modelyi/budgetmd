/**
 * T5「专项方案说明」视图
 * =============================================================================
 * 左侧方案菜单，右侧渲染当前方案；正文（眉标/标题/小节/段落/卡片/提醒/目录）
 * 全部经通用覆盖层 resolve，可一键 Markdown 编辑；关系示意 SVG 整块固定。
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

/** 收集某一方案页的全部正文字段（original/value 先置源值，collect 时再叠加覆盖） */
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

// ── 视觉原子（金棕主题） ──
const GOLD = '#C9A66B';
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.25em] mb-2" style={{ color: GOLD }}>{children}</div>;
}
function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold mb-4" style={{ color: '#3E2F1C' }}>{children}</h2>;
}
function Divider() {
  return <div className="h-px w-full my-4" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />;
}
function Layer({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[12px] font-semibold mb-3 mt-2"
      style={{ background: '#F5EDE0', color: '#8A6D3B' }}>
      {children}
    </div>
  );
}
function Card({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className="flex-1 min-w-[200px] p-3 rounded text-[12px] leading-relaxed"
      style={{
        background: highlight ? '#FBF3E4' : '#FAF7F1',
        border: `0.5px solid ${highlight ? GOLD : '#E8E0D2'}`,
      }}>
      {children}
    </div>
  );
}
function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2 mb-2">{children}</div>;
}
function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-3 rounded text-[12px] leading-relaxed mt-3"
      style={{ background: '#FEF6E7', border: '0.5px solid #F0D9A8', color: '#7A5A20' }}>
      {children}
    </div>
  );
}

/** 单个方案页内容（全部 resolve） */
function PageContent({ page }: { page: SpecialPage }) {
  // 订阅覆盖层，改动时重渲染；resolveText 内部读取当前值
  useContentEditor();
  const rv = (id: string, field: string, o: string) => resolveText(makeKey(NS, id, field), o);

  return (
    <div>
      {page.items.map((it: SpecialItem, idx) => {
        switch (it.t) {
          case 'eyebrow':
            return <Eyebrow key={idx}>{rv(it.id, 'text', it.text)}</Eyebrow>;
          case 'h1':
            return <Title key={idx}>{rv(it.id, 'text', it.text)}</Title>;
          case 'layer':
            return <div key={idx}><Layer>{rv(it.id, 'text', it.text)}</Layer></div>;
          case 'p':
            return <p key={idx} className="text-[13px] leading-7 mb-3" style={{ color: '#4A3F30' }}>{rv(it.id, 'text', it.text)}</p>;
          case 'cards':
            return (
              <Row key={idx}>
                {it.cards.map((c, ci) => (
                  <Card key={ci} highlight={c.hl}>
                    {c.lead && <div className="font-bold mb-1" style={{ color: '#8A6D3B' }}>{rv(it.id, `c${ci}-lead`, c.lead)}</div>}
                    <div>{rv(it.id, `c${ci}-text`, c.text)}</div>
                  </Card>
                ))}
              </Row>
            );
          case 'warn':
            return (
              <Warn key={idx}>
                {it.lead && <div className="font-bold mb-1">{rv(it.id, 'lead', it.lead)}</div>}
                <div>{rv(it.id, 'text', it.text)}</div>
              </Warn>
            );
          case 'agenda':
            return (
              <div key={idx} className="grid grid-cols-2 gap-3 mt-2">
                {it.rows.map((r, ri) => (
                  <div key={ri} className="p-3 rounded flex items-center gap-3"
                    style={{ background: '#FAF7F1', border: '0.5px solid #E8E0D2' }}>
                    <span className="text-xl font-bold" style={{ color: GOLD }}>{rv(it.id, `r${ri}-no`, r.no)}</span>
                    <div>
                      <div className="font-bold text-[13px]" style={{ color: '#3E2F1C' }}>{rv(it.id, `r${ri}-title`, r.title)}</div>
                      <div className="text-[11px] mt-0.5" style={{ color: '#8A7A60' }}>{rv(it.id, `r${ri}-desc`, r.desc)}</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          case 'diagram':
            return (
              <div key={idx} className="mt-3">
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

  return (
    <div className="flex gap-4" style={{ minHeight: 'calc(100vh - 120px)' }}>
      {/* 左侧方案菜单 */}
      <aside className="w-60 shrink-0 p-3 rounded-lg self-start sticky top-4"
        style={{ background: '#fff', border: '0.5px solid #E8E0D2' }}>
        <div className="text-[11px] tracking-widest px-2 py-1 mb-2" style={{ color: GOLD }}>专项方案</div>
        {specialPages.map((p) => (
          <button key={p.key} onClick={() => setTopic(p.key)}
            className="w-full flex items-center gap-2 px-2 py-2 rounded text-left text-[12.5px] transition-colors"
            style={{
              background: topic === p.key ? '#F5EDE0' : 'transparent',
              color: topic === p.key ? '#8A6D3B' : '#5A4F3E',
              fontWeight: topic === p.key ? 700 : 400,
            }}>
            <span className="w-5 text-right" style={{ color: GOLD }}>{p.no || '≡'}</span>
            <span>{p.menuTitle}</span>
          </button>
        ))}
      </aside>

      {/* 右侧内容 */}
      <main className="flex-1 p-6 rounded-lg" style={{ background: '#fff', border: '0.5px solid #ECE4D6' }}>
        <PageContent page={page} />
        <Divider />
        <div className="text-[11px]" style={{ color: '#A89878' }}>
          提示：点右上角「✎ Markdown」可改写本页全部描述文字；关系示意图内标注如需调整可在对话中说明。
        </div>
      </main>
    </div>
  );
}
