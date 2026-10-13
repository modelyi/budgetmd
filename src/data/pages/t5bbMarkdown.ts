/**
 * T5BB「关联交易专项方案说明」文档源（纯 Markdown 文本）
 * =============================================================================
 * 本页签只有一篇方案（原 T5 的「内部关联交易方案」），正文一律以
 * `docs/solutions-t5bb/*.md` 为唯一定稿源：一篇方案一个 `.md` 文件。
 * 页面读取链路：本模块 import.meta.glob 打包期内联；正文按原始文本内联，
 * 导出 spa.html 自然带最新内容。要改内容，直接编辑对应 `.md` 文件。
 * 注意：本站已全站移除在线编辑，本页签为纯只读阅览。
 */

export interface IntercompanyDoc {
  /** 稳定标识（文件名去扩展名） */
  key: string;
  /** 文档正文（Markdown 原文） */
  markdown: string;
}

const rawDocs = import.meta.glob('../../../docs/solutions-t5bb/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/** 单篇方案文档（目录下第一篇；本页签按单文档设计，只取首篇） */
export const intercompanyDoc: IntercompanyDoc | null = (() => {
  const entry = Object.entries(rawDocs).sort(([a], [b]) => a.localeCompare(b))[0];
  if (!entry) return null;
  const [path, markdown] = entry;
  return { key: path.split('/').pop()!.replace(/\.md$/, ''), markdown };
})();
