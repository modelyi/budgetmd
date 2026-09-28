/**
 * 内容文本 ⇄ Markdown 可往返转换（全系统通用）
 * =============================================================================
 * 把任意内容模块的可编辑文本序列化成 Markdown，每个字段前有唯一锚点
 * `<!-- k: key -->`，编辑后能精确还原，不依赖脆弱的标题层级推断。
 *
 * 排版装饰（#/##/###、-、**、_）仅为阅读，解析时自动剥离；
 * kind='text' 为纯段落（不加装饰）；field.section 会在区块开头输出 # 区块名。
 */
import { contentEditorStore } from '../content/contentEditor';

export type MdKind = 'h1' | 'caption' | 'title' | 'label' | 'line' | 'foot' | 'text';

export interface MdField {
  key: string;
  kind: MdKind;
  original: string; // 源数据值（不含人工覆盖）
  value: string; // 当前生效值（含人工覆盖）
  section?: string; // 所属区块名（无锚点，仅组织阅读，不回读）
}

function renderField(f: MdField): string {
  switch (f.kind) {
    case 'h1':
      return `# ${f.value}`;
    case 'caption':
      return `## ${f.value}`;
    case 'title':
      return `### ${f.value}`;
    case 'label':
      return `**${f.value}**`;
    case 'foot':
      return `_${f.value}_`;
    case 'text':
      return f.value;
    case 'line':
    default:
      return `- ${f.value}`;
  }
}

export function serializeFields(fields: MdField[]): string {
  const lines: string[] = [
    '<!-- 内容文本：可直接改字；请勿删除「k:」锚点行。# 为区块、##/### 为标题、- 为条目、** 为强调，保存时自动还原。 -->',
    '',
  ];
  let lastSection = '';
  fields.forEach((f) => {
    if (f.section && f.section !== lastSection) {
      lines.push(`# ${f.section}`);
      lines.push('');
      lastSection = f.section;
    }
    lines.push(`<!-- k: ${f.key} -->`);
    lines.push(renderField(f));
    lines.push('');
  });
  return lines.join('\n');
}

/** 剥离 Markdown 排版前缀，还原原始文本 */
function unMd(line: string): string {
  let s = line.trim();
  s = s.replace(/^#{1,6}\s+/, '');
  s = s.replace(/^[-*]\s+/, '');
  const bold = s.match(/^\*\*([\s\S]*)\*\*$/);
  if (bold) s = bold[1];
  const ital = s.match(/^_([\s\S]*)_$/);
  if (ital) s = ital[1];
  return s;
}

/** 解析编辑后的 Markdown：锚点行的下一行为该字段值 */
export function deserializeFields(md: string): Record<string, string> {
  const rows = md.split(/\r?\n/);
  const out: Record<string, string> = {};
  for (let i = 0; i < rows.length; i++) {
    const m = rows[i].match(/<!--\s*k:\s*([^\s>]+)\s*-->/);
    if (m) out[m[1]] = unMd(rows[i + 1] ?? '');
  }
  return out;
}

/** （T7 逻辑图用）把解析结果写回逻辑覆盖层；与原文相同的自动清除 */
export function applyFields(fields: MdField[], parsed: Record<string, string>): void {
  fields.forEach((f) => {
    const next = parsed[f.key];
    if (next === undefined) return; // 锚点被误删 → 保持该字段不动
    contentEditorStore.setText(f.key, next, f.original);
  });
}
