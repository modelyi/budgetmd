/**
 * T3B「多主体编制套表」文档源（纯 Markdown 文本）
 * =============================================================================
 * 交付物正文一律以 docs/formdocs-multi/*.md 为唯一定稿源：一篇表单文档一个 `.md`
 * 文件，文件名即表单编码，共 43 篇（= T3A 37 篇 + BAA.11、BB.4.2.b、BB.4.2.b.1、
 * BJ.C、BJ.C.R、BO.ELIM 六个多主体专属表单）。
 * 装配逻辑与 T3A 版共用（formDocsShared.ts），差异仅一处：BJ.*（关联交易与内部抵销）
 * 页面归编入 BF 组，与 T3B 目录菜单一致，避免出现游离的「BJ」组。
 * 打包期按原始文本内联，导出 spa.html 自然带最新内容。
 */
import { assembleFormDocs } from './formDocsShared';

const rawDocs = import.meta.glob('../../../docs/formdocs-multi/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>;

/** 全部 T3B 表单文档（按 BA / BB / BF / BO 分组，组内按编码自然序；共 43 篇） */
export const formDocsMulti = assembleFormDocs(rawDocs);
