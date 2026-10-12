/**
 * T3A/T3B/T4「表单文档页」共享数据源件
 * =============================================================================
 * 供三份文档源模块共用（formDocsMarkdown.ts = T3A 37 篇、formDocsMarkdownMulti.ts =
 * T3B 43 篇、formDocsMarkdownMaster.ts = T4 29 篇）：FormDoc 模型、分组顺序（组序参数，
 * 缺省 ['BA','BB','BF','BO'] 与 T3A/T3B 一致；T4 传入 ['AA','AB','AM']）、分组判定
 * （BJ → BF 归组）、一级标题解析、编码自然序排序、内嵌 <style> 块剥除，以及
 * 「glob 原始文本 → 文档数组」的装配函数（各文档源共用同一装配口径，防口径漂移）。
 */

export interface FormDoc {
  /** 稳定标识（文件名去扩展名，如 BB.1.1） */
  key: string;
  /** 表单编码（取自首个标题，如 BB.1.1 / BAA.8 / BO.PL） */
  code: string;
  /** 表单名（取自首个标题 `# 编码 名称` 的「名称」部分） */
  name: string;
  /** 分组（BA / BB / BF / BO；BJ.* 归编入 BF 组） */
  group: string;
  /** 文档正文（Markdown 原文，已剥除内嵌 <style> 块） */
  markdown: string;
}

/** 分组的展示顺序（页签左侧目录按此归组；T4 文档源传入 ['AA','AB','AM']，见 formDocsMarkdownMaster.ts） */
export const FORM_DOC_GROUPS = ['BA', 'BB', 'BF', 'BO'] as const;

/** 剥除文档内嵌 <style>…</style> 块（含多行内容）；避免样式块被当正文显示。 */
export function stripStyleBlocks(markdown: string): string {
  return markdown.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
}

/** 从首个 `# 编码 名称` 一级标题解析编码与表单名；解析不到时回退文件名。 */
export function parseTitle(markdown: string, fallbackCode: string): { code: string; name: string } {
  const m = /^#\s+(\S+)\s+(.+?)\s*$/m.exec(markdown);
  if (m) return { code: m[1], name: m[2].trim() };
  return { code: fallbackCode, name: fallbackCode };
}

/**
 * 编码自然序比较：逐段比较，数字段按数值、字母段按字典序，
 * 短前缀在前（BB.4.2.a → BB.4.2.a.1 → BB.4.3；BAA.2 → BAA.10 不是字典序）。
 */
export function compareCode(a: string, b: string): number {
  const ta = a.split('.');
  const tb = b.split('.');
  const n = Math.min(ta.length, tb.length);
  for (let i = 0; i < n; i += 1) {
    const x = ta[i];
    const y = tb[i];
    const xn = /^\d+$/.test(x);
    const yn = /^\d+$/.test(y);
    if (xn && yn) {
      const diff = Number(x) - Number(y);
      if (diff !== 0) return diff;
    } else {
      const diff = x.localeCompare(y, 'en', { numeric: true });
      if (diff !== 0) return diff;
    }
  }
  return ta.length - tb.length;
}

/**
 * 组序排名：按传入的分组顺序取位次；不在顺序内的分组排在最后（同级）。
 * T3A/T3B 缺省 ['BA','BB','BF','BO']；T4 传 ['AA','AB','AM']。
 */
export function groupRank(group: string, groups: readonly string[] = FORM_DOC_GROUPS): number {
  const idx = groups.indexOf(group);
  return idx >= 0 ? idx : groups.length;
}

/**
 * 编码 → 目录分组：BJ 组（关联交易与内部抵销）页面归编入 BF 组
 * （与页面 T3B 目录菜单一致，避免出现游离的「BJ」组）；其余取编码前两位字母。
 */
export function groupOf(code: string, fallback: string): string {
  const prefix = (code.match(/^[A-Za-z]{2}/)?.[0] ?? fallback.slice(0, 2)).toUpperCase();
  return prefix === 'BJ' ? 'BF' : prefix;
}

/**
 * glob 原始文本 → 文档数组（剥样式块；按传入分组顺序归组，组内按编码自然序）。
 * @param groups 分组展示顺序；缺省 = T3A/T3B 的 ['BA','BB','BF','BO']，T4 传 ['AA','AB','AM']。
 */
export function assembleFormDocs(
  rawDocs: Record<string, string>,
  groups: readonly string[] = FORM_DOC_GROUPS,
): FormDoc[] {
  return Object.entries(rawDocs)
    .map(([path, raw]) => {
      const file = path.split('/').pop()!.replace(/\.md$/, '');
      const { code, name } = parseTitle(raw, file);
      return {
        key: file,
        code,
        name,
        group: groupOf(code, file),
        markdown: stripStyleBlocks(raw),
      };
    })
    .sort((a, b) => {
      const byGroup = groupRank(a.group, groups) - groupRank(b.group, groups);
      if (byGroup !== 0) return byGroup;
      return compareCode(a.code, b.code);
    });
}
