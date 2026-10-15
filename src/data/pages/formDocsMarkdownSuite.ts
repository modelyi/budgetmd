/**
 * T2「预算编制套表」文档源（纯 Markdown 文本，单体全卷）
 * =============================================================================
 * 包含 72 篇完整编制套表文档（BA / BB / BF / BO / AA / AB / AM 统一汇聚单卷）。
 * 源文件：docs/T2-全面预算编制套表全卷.md
 */
import type { FormDoc } from './formDocsShared';
import combinedSuiteDocRaw from '../../../docs/T2-全面预算编制套表全卷.md?raw';

/** T2 全卷合订本单体文档（72 篇完整合卷） */
export const combinedSuiteDoc: FormDoc = {
  key: 'T2-ALL',
  code: 'T2 全卷',
  name: '全面预算编制规格套表说明书（全卷）',
  group: 'ALL',
  markdown: combinedSuiteDocRaw,
  sourceDir: 'docs',
};

/** T2 套表主文档集（仅保留全卷单体文档，移除分散的单篇） */
export const formDocsSuite: FormDoc[] = [combinedSuiteDoc];
