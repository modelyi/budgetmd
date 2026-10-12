/**
 * T4「基础静态数据」文档源（纯 Markdown 文本）
 * =============================================================================
 * 交付物正文一律以 docs/formdocs-master/*.md 为唯一定稿源：一篇表单文档一个 `.md`
 * 文件，文件名即表单编码，共 29 篇（= AA 基础主数据 11 篇 + AB 业务字典 16 篇 +
 * AM 勾稽与映射 2 篇，与页面 T4 页签左侧目录一致）。
 * 装配逻辑与 T3A/T3B 版共用（formDocsShared.ts），差异仅一处：分组顺序传
 * ['AA', 'AB', 'AM']（T3A/T3B 缺省 ['BA','BB','BF','BO'] 不变，防口径漂移）。
 * 打包期按原始文本内联，导出 spa.html 自然带最新内容。
 */
import { assembleFormDocs } from './formDocsShared';

const rawDocs = import.meta.glob('../../../docs/formdocs-master/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>;

/** T4 分组展示顺序（与页面 T4 页签目录 AA → AB → AM 一致） */
const MASTER_FORM_DOC_GROUPS = ['AA', 'AB', 'AM'] as const;

/** 全部 T4 表单文档（按 AA / AB / AM 分组，组内按编码自然序；共 29 篇） */
export const formDocsMaster = assembleFormDocs(rawDocs, MASTER_FORM_DOC_GROUPS);
