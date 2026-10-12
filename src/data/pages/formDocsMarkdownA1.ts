/**
 * T1「总览」文档源（纯 Markdown 文本）
 * =============================================================================
 * 交付物正文一律以 docs/formdocs-a1/*.md 为唯一定稿源：一篇表单文档一个 `.md`
 * 文件，文件名即表单编码，共 4 篇（A1 组：A1.1 / A1.2 / A1.3 / A1.4，顺序与
 * 页面 MENU_GROUP_DEFS group A1 codes 一致）。
 * 装配复用 formDocsShared.ts（与 T3A/T3B/T4 同一装配口径）；差异两点：
 *   ① 分组顺序传 ['A1']；② 目录顺序显式按 A1_ORDER 排（锁定页面目录序，
 *      不依赖 glob 自然序）。
 * 打包期按原始文本内联，导出 spa.html 自然带最新内容。
 */
import { assembleFormDocs, type FormDoc } from './formDocsShared';

const rawDocs = import.meta.glob('../../../docs/formdocs-a1/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>;

/** A1 分组展示顺序（仅 A1 一组） */
const A1_FORM_DOC_GROUPS = ['A1'] as const;

/** 页面 T1 总览目录顺序（MENU_GROUP_DEFS group A1 codes） */
const A1_ORDER = ['A1.1', 'A1.2', 'A1.3', 'A1.4'];

const assembled = assembleFormDocs(rawDocs, A1_FORM_DOC_GROUPS);

/** 全部 T1 总览表单文档（按 A1 组目录顺序，共 4 篇） */
export const formDocsA1: FormDoc[] = A1_ORDER.map((code) => assembled.find((d) => d.code === code)).filter(
  (d): d is FormDoc => Boolean(d),
);
