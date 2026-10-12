# T3A 页签替换：表单文档页（需求与边界）

> 需求来源：用户指令「直接把 T3A 原页面以 markdown 文档替代」
> 记录时间：2026-10-10

## 1. 目标

T3A 页签（原 `budget-proto`，现由 `src/components/ResearchSummaryView.tsx` 以 TSX + Luckysheet 方式渲染编制套表原型）
改为**直接显示 `docs/formdocs/*.md` 这批表单文档**，不再使用原 TSX 原型页面。

## 2. 参照实现（照搬，不新造轮子）

T5「专项方案说明」已有同型做法：`src/components/SpecialSolutionsView.tsx` + `src/data/pages/solutionsMarkdown.ts`
—— 左侧目录（读自文件名）+ 右侧 ByteMD Viewer 流式阅览（GFM）。
T3A 新页照此结构，数据源改为 `docs/formdocs/*.md`。

## 3. 页面构成

- **左侧目录**：按表单分组 BA / BB / BF / BO 归组，条目显示「表单编码 + 表单名」；
  编码与表单名从文档首个 `# 编码 名称` 标题解析，解析不到时回退文件名。
- **右侧正文**：ByteMD Viewer 渲染当前选中文档的 Markdown 全文。
- **默认文档**：进入页签默认打开第一篇；用 sessionStorage 记住当前文档（整页刷新后续显）。

## 4. 渲染与样式

- 文档内嵌的 `<style>…</style>` 块在**渲染前剥离**（样式统一由应用样式表提供，避免样式块被当正文显示）。
- `src/index.css` 增加**作用域内**样式（只作用于该页正文容器，例如 `.t3a-doc-view` 下的表格）：
  表头深蓝底白字、单元格边框、表样单元格不换行、数值右对齐、表格横向可滚动。
  **不得**给全局 `table`/`th`/`td` 加样式（会影响其他页签）。
- 不做「滚动条置顶」等翻转技巧（应用内渲染器会剥掉包裹元素，不稳；应用内用标准横向滚动即可）。

## 5. 明确不做（边界）

- 不提供「在线编辑 / 保存回盘」：这批 Markdown 由 `scripts/generateT3aFormDocs.ts` 生成，手改会被覆盖。
- 不改 T3B（`budget-multi`）页签，它继续使用原 `ResearchSummaryView`。
- 不改 T1 / T4 / T5 / T6~T9 任何页签与既有组件。
- 不动 `docs/formdocs/*.md` 的内容与生成脚本。
- 不删 `ResearchSummaryView.tsx`（T3B 仍在使用）。

## 6. 验收

1. `npx tsc --noEmit` 0 error（不跑 build）。
2. 开发服务（http://127.0.0.1:3000）打开 T3A 页签：
   - 左侧目录列出全部 37 篇，按 BA/BB/BF/BO 归组；
   - 点击任一篇，右侧正常渲染（标题、段落、表格）；
   - 表样表格样式正确（深蓝表头、边框、数值右对齐、可横向滚动）；
   - 页面顶部**不出现** CSS 代码文本。
3. 其他页签（T3B、T5）打开无异常。

## 7. 呈现约定（已定，后续同类问题不必再确认）

- **宽表必须常显、明显的横向滚动条**：应用内（`index.css` 的 `.t3a-doc-view` 作用域）与文档内嵌样式块（`T3A_SHEET_STYLE_BLOCK`）都要给 `.t3a-sheet-scroll` / `.t3a-html-sheet` 加 `::-webkit-scrollbar` 规则（高度 10px、滑块 `#94a3b8`、轨道 `#eef2f7`），保证读者一眼看得见"右边还有列"。
- 同类**纯呈现层**的可用性问题（滚动条、列宽、对齐、间距、字号），主 Agent 直接改，不必逐项征求确认；涉及**内容、口径、表样结构**的变更仍需用户拍板。
