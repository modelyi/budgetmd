# Univer 迁移基线（Phase 2 收尾状态）

日期：2026-09-05

## 范围与边界

- `@univerjs/presets`、Sheets Core、Sheets Data Validation 固定为 `0.25.1`。
- 当前业务表入口已统一使用 `UniverGrid`、`UniverBusinessWorkbench` 或 `UniverBudgetSheets`；Luckysheet 业务 wrapper、adapter 和直接引用已从 `src` 移除。
- 当前工作区包含大量未提交业务与迁移改动；收尾工作不 reset、checkout、提交或推送。
- 发布压缩包和旧版 Luckysheet 静态发布目录已清理，后续构建产物由 `.gitignore` 管理。

## Gate 1 fixture

`src/components/UniverGrid.tsx` 创建真实 Univer workbook，并提供隔离验证入口 `UniverSpikeWorkbench`。入口通过 `pre[data-testid="univer-phase1-report"]` 和 `window.__univerPhase1Report` 暴露机器可读报告。

已覆盖的运行时能力：

- `Overview` + `Monthly` 双 sheet。
- Monthly `B4` 使用 `=SUM(B2:B3)`，通过真实 `getValue()` 验证为 `300`。
- `activate()` sheet 切换。
- 真实 Data Validation 创建、应用和读回。
- 合并、冻结、边框、列宽、行高和只读权限读回。
- 生命周期 mount/dispose、StrictMode 保护、旧 runtime 清理。
- 失败项写入 `failures`，报告包含 `status`、`cleanupEmpty` 和 `strictModeSafe`。

Gate 1 仍缺最新真实浏览器证据：需要实际访问 E.Univer 隔离验证入口，确认没有白屏、locale 初始化错误、卸载后状态更新警告，并读取完整 report。

## Gate 2 转换契约

`src/utils/univerAdapters.ts` 已覆盖：

- 显式 `sourceColumn → univerColumn → fieldCode` 映射。
- 重复列和越界检查。
- 公式 A1 引用重写，包括 `$` 绝对列标记。
- merge、columnlen/customWidth、colhidden、borderInfo、freeze 和 DataValidation 坐标映射。
- 不复制 Luckysheet `calcChain`，由 Univer 重算公式。
- 独立 `permissionContract`，不把 custom 元数据当权限。

`src/utils/univerAdapters.test.ts` 已覆盖未映射列冲突、映射后坐标、公式语义、字体/背景/边框、DataValidation、权限 facade 读回及 calcChain 不复制。

**Gate 2 结论：通过（转换契约项）。** 当前真实业务入口已统一使用 Univer wrapper；本结论不替代真实浏览器运行时验收。

## Batch A / Batch B 迁移记录

已将主数据、编制表、汇总表和财务展示入口接入 `UniverBusinessWorkbench` / `UniverBudgetSheets`。代表性入口包括：

- AA.1、AA.4–AA.11
- AB.3–AB.8
- BA.1–BA.4
- BB.1.1–BB.4.3、BB.9
- BF.3–BF.4、BF.E、BF.F
- AM.1、AM.1
- BO.A、BO.B.1、BO.B.4、BO.B.5、BO.3.1
- B.0.3

入口复用现有 sheet builder 的业务数据、公式、下拉和格式，并通过 `convertSpreadsheetToUniver` 的显式或稳定字段映射转换。

`UniverGrid` 负责 workbook 初始化、locale、生命周期、事件订阅、Data Validation、权限和清理；`UniverBusinessWorkbench` 负责业务工作台壳层、字段契约、编辑事件和 workbook snapshot 保存。

## 当前已知限制

- 部分可编辑入口目前只保存通用 Univer workbook snapshot，尚需逐表确认业务实体 Dexie API 的双向保存。
- `BA.4` 物料主数据联动已有旧业务处理逻辑，但仍需确认所有联动都由新 Univer 编辑事件触发。
- 部分入口仍依赖表头推导 fieldCode；可编辑表应全部改为显式 `fieldCodesByColumn`。
- 导入/导出、公式、合并、冻结、下拉、样式和多 sheet 往返尚需逐路由回归。
- 全量 `bunx tsc --noEmit` 仍有迁移期间的历史类型错误，需独立清理。
- 单文件离线构建会内联 Univer 依赖，体积代价需要发布评审明确接受，或改为多文件离线发布。

## 验证记录

- `bunx tsx src/utils/univerAdapters.test.ts`：通过。
- `bun run build`：通过，标准 dist 和 dist zip 生成成功。
- 全量 `bunx tsc --noEmit`：未通过，存在历史/迁移期间类型错误；不以 Vite 构建替代类型检查。

## 当前收尾待办（按优先级）

1. **P0 真实浏览器 Gate 1**：读取 `data-testid="univer-phase1-report"`，确认 `status`、`cleanupEmpty`、`strictModeSafe`，并记录 console 无白屏和生命周期警告。
2. **P0 业务持久化**：确认每个可编辑入口不仅保存 Univer snapshot，也调用对应 Dexie entity API；刷新页面后数据必须保留。
3. **P1 字段契约**：可编辑表全部使用显式 `fieldCodesByColumn`，禁止依赖中文表头自动推导业务字段。
4. **P1 业务联动**：完成 BA.4 物料主数据联动及产品、客户、收入方式等跨表联动回归。
5. **P1 导入导出**：验证公式、合并、冻结、下拉、样式和多 sheet Excel 往返。
6. **P1 类型门禁**：清理 Univer 迁移相关 TypeScript 错误，再恢复全量 `tsc --noEmit` 门禁。
7. **P2 治理清理**：同步需求文档、演示文档、发布脚本和离线包体积说明。
