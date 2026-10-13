/**
 * T5「专项方案说明」文档源（纯 Markdown 文本）
 * =============================================================================
 * 方案正文一律以 docs/solutions/*.md 为唯一定稿源：一篇方案一个 `.md` 文件，
 * 文件名前缀为排序序号（00 目录总览置顶，01~07 按数字顺序）。
 * 页面读取链路：本模块 import.meta.glob 打包期内联；页面「✎ 编辑 Markdown」保存时
 * 经 dev server 中间件（POST /api/save-solution，见 scripts/saveTextPlugin.ts）
 * 把全文写回磁盘 .md 文件；也可以直接编辑对应 `.md` 文件。打包期按原始文本内联，
 * 导出 spa.html 自然带最新内容。
 */

export interface SolutionDoc {
  /** 排序序号（文件名前缀，如 00 / 01 / AA） */
  no: string;
  /** 稳定标识（文件名去扩展名） */
  key: string;
  /** 左侧目录显示名（文件名去掉序号前缀） */
  menuTitle: string;
  /** 文档正文（Markdown 原文） */
  markdown: string;
}

const rawDocs = import.meta.glob('../../../docs/solutions/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>;

function parseDoc(path: string, markdown: string): SolutionDoc {
  const file = path.split('/').pop()!.replace(/\.md$/, '');
  const m = /^([0-9]+|[A-Za-z]+)[-_](.+)$/.exec(file);
  return {
    no: m ? m[1] : '',
    key: file,
    menuTitle: m ? m[2] : file,
    markdown,
  };
}

/** 全部方案文档（00 置顶、01~07 数字序、AA 最末） */
export const solutionDocs: SolutionDoc[] = Object.entries(rawDocs)
  .map(([path, markdown]) => parseDoc(path, markdown))
  .sort((a, b) => {
    const aNum = /^\d+$/.test(a.no);
    const bNum = /^\d+$/.test(b.no);
    if (aNum && !bNum) return -1; // 数字在前
    if (!aNum && bNum) return 1; // 字母（如 AA）排在数字之后
    return a.no.localeCompare(b.no, undefined, { numeric: true });
  });
