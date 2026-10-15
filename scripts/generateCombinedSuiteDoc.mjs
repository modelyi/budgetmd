import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '..');

const FORM_DOC_GROUPS = ['BA', 'BB', 'BF', 'BO', 'AA', 'AB', 'AM'];

const GROUP_META = {
  BA: { title: '第一篇 · 年度编制假设与前提（BA 组）', desc: '宏观参数、标准成本、费率假定与物料消耗等基础编制前提。' },
  BB: { title: '第二篇 · 业务预算编制表（BB 组）', desc: '销售、生产、采购、资产、费用、投融资等业务线预算编制表样与口径。' },
  BF: { title: '第三篇 · 资金与财务测算表（BF/BJ 组）', desc: '税金测算、利息测算、关联交易抵销及内部结转测算表。' },
  BO: { title: '第四篇 · 预算输出三表（BO 组）', desc: '预计资产负债表、预计利润表、预计现金流量表及抵销汇总表。' },
  AA: { title: '第五篇 · 基础主数据规范（AA 组）', desc: '法人公司、管理单元、行政部门、科目体系、项目、产品等主数据模型。' },
  AB: { title: '第六篇 · 业务字典与参数（AB 组）', desc: '合同性质、存货类别、业务属性、税率等统一字典定义。' },
  AM: { title: '第七篇 · 勾稽与映射规则（AM 组）', desc: '产品收入确认映射、部门属性映射等系统级规则矩阵。' },
};

function stripStyleBlocks(md) {
  return md.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
}

function parseTitle(md, fallback) {
  const m = /^#\s+(\S+)\s+(.+?)\s*$/m.exec(md);
  if (m) return { code: m[1], name: m[2].trim() };
  return { code: fallback, name: fallback };
}

function groupOf(code, fallback) {
  const prefix = (code.match(/^[A-Za-z]{2}/)?.[0] ?? fallback.slice(0, 2)).toUpperCase();
  return prefix === 'BJ' ? 'BF' : prefix;
}

function compareCode(a, b) {
  const ta = a.split('.');
  const tb = b.split('.');
  const n = Math.min(ta.length, tb.length);
  for (let i = 0; i < n; i++) {
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

function loadDir(dirPath, sourceName) {
  if (!existsSync(dirPath)) return [];
  const files = readdirSync(dirPath).filter((f) => f.endsWith('.md')).sort();
  return files.map((file) => {
    const full = resolve(dirPath, file);
    const raw = readFileSync(full, 'utf-8');
    const key = file.replace(/\.md$/, '');
    const { code, name } = parseTitle(raw, key);
    return {
      key,
      code,
      name,
      group: groupOf(code, key),
      sourceDir: sourceName,
      markdown: stripStyleBlocks(raw),
    };
  });
}

const multiDocs = loadDir(resolve(root, 'docs/formdocs-multi'), 'docs/formdocs-multi');
const masterDocs = loadDir(resolve(root, 'docs/formdocs-master'), 'docs/formdocs-master');
const allDocs = [...multiDocs, ...masterDocs];

// 组装并排序
const sortedDocs = allDocs.sort((a, b) => {
  const gA = FORM_DOC_GROUPS.indexOf(a.group);
  const gB = FORM_DOC_GROUPS.indexOf(b.group);
  const diffG = (gA >= 0 ? gA : 999) - (gB >= 0 ? gB : 999);
  if (diffG !== 0) return diffG;
  return compareCode(a.code, b.code);
});

// 构建单一合并 Markdown 文档
const lines = [];

lines.push('# 全面预算编制规格套表说明书（全卷）');
lines.push('');
lines.push('> **版本说明**：本文件为装备制造行业全面预算管理系统（T2 预算编制套表）全量单体交付物，包含 72 篇完整表单的表样、字段定义、口径规则及跨表勾稽说明。按业务编制逻辑汇聚，支持离线评审、归档及全局搜索。');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 全书目录索引');
lines.push('');

// 生成全卷目录索引
for (const group of FORM_DOC_GROUPS) {
  const groupItems = sortedDocs.filter((d) => d.group === group);
  if (groupItems.length === 0) continue;
  const meta = GROUP_META[group] ?? { title: `${group} 组`, desc: '' };
  lines.push(`- **[${meta.title}](#${encodeURIComponent(meta.title)})**（共 ${groupItems.length} 篇）`);
  for (const d of groupItems) {
    const anchor = `${d.code.toLowerCase().replace(/[^a-z0-9_-]/g, '')}-${encodeURIComponent(d.name)}`;
    lines.push(`  - [${d.code} ${d.name}](#${anchor})`);
  }
}
lines.push('');
lines.push('---');
lines.push('');

// 依次输出各篇章与表单内容
for (const group of FORM_DOC_GROUPS) {
  const groupItems = sortedDocs.filter((d) => d.group === group);
  if (groupItems.length === 0) continue;
  const meta = GROUP_META[group] ?? { title: `${group} 组`, desc: '' };

  lines.push(`## ${meta.title}`);
  lines.push('');
  if (meta.desc) {
    lines.push(`*${meta.desc}*`);
    lines.push('');
  }

  for (const doc of groupItems) {
    // 处理文档正文层级：
    // 首行 # 编码 名称 转换为 ### 编码 名称 (并添加锚点)
    // 其余 ## 转换为 ####，### 转换为 #####，#### 转换为 ######
    const rawLines = doc.markdown.split(/\r?\n/);
    let titleProcessed = false;

    lines.push('');
    lines.push('---');
    lines.push('');

    for (const rawLine of rawLines) {
      if (!titleProcessed && /^#\s+/.test(rawLine)) {
        // 表单标题
        lines.push(`### ${doc.code} ${doc.name}`);
        lines.push('');
        titleProcessed = true;
        continue;
      }

      // 调整标题层级
      if (/^##\s+/.test(rawLine)) {
        lines.push(rawLine.replace(/^##\s+/, '#### '));
      } else if (/^###\s+/.test(rawLine)) {
        lines.push(rawLine.replace(/^###\s+/, '##### '));
      } else if (/^####\s+/.test(rawLine)) {
        lines.push(rawLine.replace(/^####\s+/, '###### '));
      } else {
        lines.push(rawLine);
      }
    }
  }
  lines.push('');
}

const outputContent = lines.join('\n');
const targetFile = resolve(root, 'docs/T2-全面预算编制套表全卷.md');
writeFileSync(targetFile, outputContent, 'utf-8');

console.log(`[generate] 成功合并 72 篇套表至：docs/T2-全面预算编制套表全卷.md (${(outputContent.length / 1024).toFixed(1)} KB)`);
