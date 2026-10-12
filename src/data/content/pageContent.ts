/**
 * 通用「页面文档」模型与内容源工厂
 * =============================================================================
 * 适用于以标题 / 段落 / 列表 / 嵌套条目为主的文档页（T2、T5…）。
 * 页面文本声明为 PageDoc（数据层，与展现分离），网页渲染与 Markdown 编辑
 * 都读它；人工改动进通用内容覆盖层（contentEditorStore）。
 */
import type { ContentSource } from './contentSource';
import {
  contentEditorStore, makeKey, countNamespace,
} from './contentEditor';
import type { MdField, MdKind } from '../logic/logicMarkdown';

export type PageBlockKind = 'h1' | 'badge' | 'h2' | 'p' | 'li' | 'sub' | 'note';

export interface PageBlock {
  id: string;
  kind: PageBlockKind;
  text: string;
  /** 粗体引导词（如「1. 以需求文档为核心目的：」「a. 不挂法人 · 纯经营视角：」） */
  lead?: string;
  /** h2 圆形序号装饰（仅网页显示，不入 Markdown） */
  badge?: string;
  /** h2 卡片配色（blue=原则蓝卡，plain=普通白卡） */
  variant?: 'blue' | 'plain';
}

export interface PageDoc {
  pageId: string;
  title: string;
  blocks: PageBlock[];
}

const kindToMd = (k: PageBlockKind): MdKind => {
  if (k === 'h1') return 'h1';
  if (k === 'badge') return 'label';
  if (k === 'h2') return 'caption';
  if (k === 'li' || k === 'sub') return 'line';
  if (k === 'note') return 'foot';
  return 'text';
};

export function buildPageContentSource(doc: PageDoc): ContentSource {
  const ns = `page:${doc.pageId}`;
  const kText = (id: string) => makeKey(ns, id, 'text');
  const kLead = (id: string) => makeKey(ns, id, 'lead');

  const collect = (): MdField[] => {
    const m = contentEditorStore.getMap();
    const out: MdField[] = [];
    doc.blocks.forEach((b) => {
      if (b.lead) {
        out.push({
          key: kLead(b.id), kind: 'label', original: b.lead,
          value: m[kLead(b.id)]?.value ?? b.lead,
        });
      }
      if (b.text) {
        out.push({
          key: kText(b.id), kind: kindToMd(b.kind), original: b.text,
          value: m[kText(b.id)]?.value ?? b.text,
        });
      }
    });
    return out;
  };

  return {
    id: ns,
    title: doc.title,
    collect,
    apply: (parsed) => {
      doc.blocks.forEach((b) => {
        const slots: Array<['text' | 'lead', string | undefined]> = [
          ['text', b.text || undefined], ['lead', b.lead],
        ];
        slots.forEach(([slot, orig]) => {
          if (orig == null) return;
          const k = makeKey(ns, b.id, slot);
          const next = parsed[k];
          if (next === undefined) return;
          contentEditorStore.setText(k, next, orig);
        });
      });
    },
    reset: () => contentEditorStore.resetNamespace(ns),
    count: () => countNamespace(contentEditorStore.getMap(), ns),
  };
}
