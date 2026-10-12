# Univer 迁移矩阵

更新时间：2026-09-05

状态定义：

- `入口已迁移`：页面已经通过 `UniverGrid` / `UniverBusinessWorkbench` / `UniverBudgetSheets` 渲染。
- `业务回调已接入`：编辑事件有明确的业务 state/API 回写逻辑。
- `快照持久化`：通用 Univer workbook snapshot 写入 Dexie `univerWorkbooks`。
- `待逐表验收`：仍需真实页面编辑、刷新、联动和权限回归。

| 表单/入口 | 组件 | Univer 入口 | 业务回调 | 只读/编辑 | 当前状态 | 主要收尾项 |
|---|---|---|---|---|---|---|
| AA.1 | `BudgetPeriodMasterWorkbench.tsx` | `UniverBudgetSheets` | 否 | 编辑态需确认 | 入口已迁移 + 快照持久化 | 接入期间主数据 API |
| AA.4 | `MasterDataManager.tsx` | `UniverBusinessWorkbench` | 否 | 编辑态需确认 | 入口已迁移 + 快照持久化 | 客商 API 回写 |
| AA.5 | `HROrganizationMasterWorkbench.tsx` | `UniverBusinessWorkbench` | 否 | 编辑态需确认 | 入口已迁移 + 快照持久化 | 组织主数据 API 回写 |
| AA.6 | `BudgetProjectMasterWorkbench.tsx` | `UniverBusinessWorkbench` | 否 | 编辑态需确认 | 入口已迁移 + 快照持久化 | 项目主数据 API 回写 |
| AA.7 | `BudgetProductMasterWorkbench.tsx` | `UniverBusinessWorkbench` | 否 | 编辑态需确认 | 入口已迁移 + 快照持久化 | 产品主数据 API 回写 |
| AA.11 | `MaterialMasterWorkbench.tsx` | `UniverBusinessWorkbench` | 是 | 编辑 | 入口已迁移 + 业务回调 | 刷新和主数据联动回归 |
| AB.3–AB.8 | 各字典 Workbench | `UniverBusinessWorkbench` | 多数否 | 编辑态需确认 | 入口已迁移 + 快照持久化 | 字典 API 和下拉联动 |
| BA.1 | `BudgetAssumptionsWorkbench.tsx` | `UniverBudgetSheets` | 是 | 编辑 | 入口已迁移 + 业务回调 | 刷新和参数联动回归 |
| BA.2 | `StandardCostTable.tsx` | `UniverBusinessWorkbench` | 否 | 编辑态需确认 | 入口已迁移 + 快照持久化 | 产品标准成本 API |
| BA.3 | `StandardCostTable.tsx` | `UniverBusinessWorkbench` | 否 | 编辑态需确认 | 入口已迁移 + 快照持久化 | 人工标准成本 API |
| BA.4 | `StandardCostTable.tsx` | `UniverBusinessWorkbench` | 是 | 编辑 | 入口已迁移 + 业务回调 | 完成物料联动回归 |
| BB.1.1 | `BudgetTable.tsx` | `UniverBusinessWorkbench` | 是 | 编辑 | 入口已迁移 + 业务回调 | 刷新和公式回归 |
| BB.1.2 | `StockOrderTable.tsx` | `UniverBusinessWorkbench` | 否 | 只读 | 入口已迁移 | 明确只读/期初导入契约 |
| BB.1.3 | `HardSoftRevenueWorkbench.tsx` | `UniverBusinessWorkbench` | 是 | 按角色编辑 | 入口已迁移 + 业务回调 | 产品类别/收入方式联动 |
| BB.1.3 | `ServiceRevenueWorkbench.tsx` | `UniverBusinessWorkbench` | 是 | 按角色编辑 | 入口已迁移 + 业务回调 | 人工/材料标准成本联动 |
| BB.2.1 | `ProductionPlanWorkbench.tsx` | `UniverBudgetSheets` | 是 | 编辑 | 入口已迁移 + 业务回调 | 月度嵌套字段回归 |
| BB.2.2 | `MaterialEquipmentProcurementWorkbench.tsx` | `UniverBudgetSheets` | 是 | 编辑 | 入口已迁移 + 业务回调 | 月度采购字段回归 |
| BB.3 | `CapexBudgetWorkbench.tsx` | `UniverBudgetSheets` | 是 | 编辑 | 入口已迁移 + 业务回调 | 多 sheet 和权限回归 |
| BB.3.1 | `EquityInvestmentView.tsx` | `UniverBudgetSheets` | 是 | 编辑 | 入口已迁移 + 业务回调 | 股权投资 API 回归 |
| BB.4.1 | `OpexBudgetWorkbench.tsx` | `UniverBudgetSheets` | 是 | 编辑 | 入口已迁移 + 业务回调 | 月度费用 API 回归 |
| BB.4.2 | `EmployeeExpenseImportWorkbench.tsx` | `UniverBudgetSheets` | 否 | 导入/编辑需确认 | 入口已迁移 + 快照持久化 | 导入写入员工费用 API |
| BB.4.3 | `OfficeLeaseWorkbench.tsx` | `UniverBudgetSheets` | 否 | 编辑态需确认 | 入口已迁移 + 快照持久化 | 租赁 API 回写 |
| BB.9 | `IntercompanyBudgetWorkbench.tsx` | `UniverBudgetSheets` | 否 | 编辑态需确认 | 入口已迁移 + 快照持久化 | 三类内部交易 API 回写 |
| BF.3 | `FinancialInstrumentWorkbench.tsx` | `UniverBudgetSheets` | 是 | 编辑 | 入口已迁移 + 业务回调 | 多 sheet 回归 |
| BF.4 | `OtherRevenueBudgetWorkbench.tsx` | `UniverBudgetSheets` | 否 | 编辑态需确认 | 入口已迁移 + 快照持久化 | 其他业务 API 回写 |
| BF.5 | `NonOperatingBudgetWorkbench.tsx` | `UniverBudgetSheets` | 否 | 编辑态需确认 | 入口已迁移 + 快照持久化 | 营业外 API 回写 |
| BF.4 | `TaxBudgetWorkbench.tsx` | `UniverBudgetSheets` | 是 | 编辑 | 入口已迁移 + 业务回调 | 明确税费字段映射 |
| BF.E | `SubjectAdjustmentWorkbench.tsx` | `UniverBudgetSheets` | 是 | 编辑 | 入口已迁移 + 业务回调 | 调整 API 回归 |
| BF.F | `BudgetAdjustmentWorkbench.tsx` | `UniverBudgetSheets` | 是 | 编辑 | 入口已迁移 + 业务回调 | 调整 API 回归 |
| AM.1/AM.1 | 映射 Workbench | `UniverBudgetSheets` | 多数否 | 只读/编辑需确认 | 入口已迁移 | 映射 API 与权限 |
| BO.A | `FinancialStatementsView.tsx` | `UniverBudgetSheets` | 否 | 只读 | 入口已迁移 | 公式和汇总回归 |
| BO.B.1/BO.B.4/BO.B.5 | 汇总视图 | `UniverBudgetSheets` | 否 | 只读 | 入口已迁移 | 汇总公式和跨表回归 |
| BO.3.1 | `SubjectLedgerWorkbench.tsx` | `UniverBudgetSheets` | 否 | 只读 | 入口已迁移 | 业务总计公式回归 |
| B.0.3 | `MultiDimPivotWorkbench.tsx` | `UniverBudgetSheets` | 否 | 只读 | 入口已迁移 | 多维导出回归 |

## 统一收尾规则

1. “编辑态需确认”的入口必须二选一：接入对应 Dexie entity API，或明确改为只读。
2. 所有可编辑列必须使用显式 `fieldCodesByColumn`，不可依赖中文表头自动推导。
3. 每个编辑入口至少完成一次：编辑 → API 保存 → 刷新 → 值仍存在。
4. 多 sheet 入口必须验证 `sheetIndex` 不会错误写入第一张 sheet。
5. 只读入口必须验证 Univer workbook permission 和单元格编辑拦截同时生效。

## 本次 SPA 持久化边界（2026-09-05）

已闭环的代表性入口：`BB.1.1` 合同预算、`BB.4.1` OPEX、`BB.1.3` 服务收入主表/销售人工/销售物料、`BA.1` 假设参数、`AA.11` 物料主数据。编辑事件先更新业务 state，再通过对应 Dexie entity API (`upsert`/`batchSave`) 保存；进入页面由 App 或 workbench 从业务 Dexie 读取。`univerWorkbooks` 仍保存 snapshot 作为辅助审计/恢复 artifact，但业务 workbench 不再用 snapshot 覆盖业务实体或新建的业务 workbook。

仍仅 snapshot 持久化、尚未接通业务 API 的可编辑入口包括：`AA.1`、`AA.4`、`AA.5`、`AA.6`、`AA.7`、`AB.3–AB.8`（除已明确接通的入口）、`BA.2`、`BA.3`、`BB.4.2`、`BB.4.3`、`BB.9`、`BF.4`、`BF.5`、`AM.1/AM.1` 等。它们不应被描述为刷新后业务数据已闭环；后续应接入对应 Dexie 表或明确改为只读。
