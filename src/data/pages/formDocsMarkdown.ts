/**
 * T3A「表单文档页」文档源（纯 Markdown 文本）
 * =============================================================================
 * 交付物正文一律以 docs/formdocs/*.md 为唯一定稿源：一篇表单文档一个 `.md` 文件，
 * 文件名即表单编码（如 BB.1.1 / BAA.8 / BB.4.2.a.1 / BO.PL），共 37 篇，
 * 分 BA / BB / BF / BO 四组。
 * 装配逻辑见 formDocsShared.ts（与 T3B 版 formDocsMarkdownMulti.ts 共用同一口径，
 * 防两处漂移；本文件导出 API 保持不变）。
 * 页面读取链路：本模块 import.meta.glob 打包期内联原始文本 → 解析分组 / 编码 / 表单名
 * → 剥除文档内嵌的 <style>…</style> 样式块（样式统一由应用样式表 src/index.css 提供，
 * 避免样式块被当正文显示）→ 供 FormDocsView 以 ByteMD Viewer 流式阅览。
 * 打包期按原始文本内联，导出 spa.html 自然带最新内容。
 */
import { assembleFormDocs } from './formDocsShared';

const rawDocs = import.meta.glob('../../../docs/formdocs/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>;

/** 全部 T3A 表单文档（按 BA / BB / BF / BO 分组，组内按编码自然序） */
export const formDocs = assembleFormDocs(rawDocs);

export { FORM_DOC_GROUPS } from './formDocsShared';
export type { FormDoc } from './formDocsShared';
