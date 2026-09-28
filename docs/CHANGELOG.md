# UEADEMO 变更记录 (CHANGELOG)

> 本文档记录对 UEADEMO 预算编制演示系统的关键需求变更与实现留痕，供规格文档 (REQUIREMENTS.md) 与代码之间对齐核对。
> 记录格式：日期 / 需求来源 / 变更范围 / 实现要点 / 验证结果。

---

## 2026-09-14 BA.4 下游关系口径修正 — ✅ 已完成

### 需求来源
用户最新纠正：BB.2.1 不直接构成对其他表的引用。

### 变更范围
仅修改 `docs/REQUIREMENTS.md` 的 BA.4 服务物料定额标准关系登记，并同步本变更记录；不扩展其他表，不修改演示系统。

### 实现要点
将 BA.4 下游关系中关于 BB.2.1 的错误/待确认表述修正为：**BB.2.1 不直接引用 BA.4，也不直接构成对其他表的引用**。BA.4 已确认的 BB.1.3 关系及其他表关系不变。

### 验证结果
已核对需求文档仅在 BA.4 关系登记处完成该项修正，未修改演示系统代码。

---

## 2026-09-14 BB.4.4 存量资产多部门分配折旧口径 — ✅ 已完成

### 需求来源
用户明确：同一项原资产如果分配给多个部门，需要按各部门分配比例拆分原值和累计折旧；管理单元是部门归属信息，资产账簿仍通过管理单元映射获得。

### 变更范围
仅修改需求文档及其引用/被引用关系和变更记录：`docs/REQUIREMENTS.md`、`docs/FINANCIAL_RULES_MANUAL.md`、`docs/RESEARCH_MODULE_CHANGELOG.md`、本变更记录；未修改演示系统、代码或生成产物，未提交推送。

### 实现要点
补充 BB.4.4《存量资产折旧计提》的业务规则、字段说明和上下游关系：管理单元来源 AA.8，资产账簿仍由 AM.3 按管理单元映射获得；多部门分配时，原值和累计折旧均按各部门现有分配比例拆分，供部门折旧计算、归集和汇总。未新增比例数值、计算周期或分摊依据。

### 验证结果
已核对文档引用关系和变更记录已同步；本次仅修改 Markdown 需求文档，未修改演示系统代码。

---

## 2026-09-14 BB.1.3 TAB 关系纠正 — ✅ 已完成

### 需求来源
用户明确 BB.1.3 的 `.b` 与 `.g/.h/.i` 名称、内容、字段和用途不同，不是同一表的编码冲突。

### 变更范围
仅修改需求文档、引用关系说明和变更记录：`docs/REQUIREMENTS.md`、`docs/FINANCIAL_RULES_MANUAL.md`、本变更记录；未修改代码、演示系统，未提交推送。

### 实现要点
分别登记 `.b 销售填报_增量`、`.g 人工明细_存量订单`、`.h 人工明细_增量`、`.i 人工明细_财务查询` 的表名、字段和用途；删除“编码不一致/需统一确认”的表述。明确 BA.3 费率只关联实际承载技术服务人工明细及成本结果的 **BB.1.3.i**，`.i` 汇总 `.g` 与 `.h` 后按岗位+职级匹配费率；`.b`、`.g`、`.h` 不作为 BA.3 费率关联 TAB。

### 验证结果
已核对现有 `src/data/sheets/BB.1.3.json` 的九个真实 TAB 名称及表头，并按现有表样分别登记；仅文档文件发生修改。

---

## 2026-09-14 AB.11/AB.12 岗位与职级字典及服务人工关系登记 — ✅ 已完成

### 需求来源
用户要求在 AB 静态数据下新增“岗位字典”和“职级字典”，并同步 BA.3、BB.1.3、BB.5.1 的需求关系说明；不新增具体字典值，不修改演示数据或计算逻辑。

### 变更范围
1. `docs/REQUIREMENTS.md`：登记 AB.11 岗位字典、AB.12 职级字典及字段说明；更新 BA.3 的岗位/职级上游引用；明确 BB.1.3 按岗位+职级匹配 BA.3 费率并按工时计算；明确 BB.5.1 按法人×部门×月份汇总服务人工成本。
2. `src/data/budgetFormRegistry.ts`：登记 AB.11/AB.12 字段与表单；BB.1.3 财务视角岗位/职级字段引用新字典。
3. `src/components/ResearchSummaryView.tsx`：同步 AB 导航、业务关系说明及 AB.11/AB.12 适用范围。

### 口径待确认
岗位/职级具体值、编码规则、启停状态及停用值对历史数据的展示规则待确认；本次不擅自编造字典值。

---

## 2026-08-31 整体 AntD 化改造 + Tailwind 保留决策 — ✅ 已完成

### 需求来源
用户："整体用 ant design 的标准风格；编制表格部分用 luckysheet，如果有冲突给出建议解决方案" → 采用"组件层 AntD + 编制表 Luckysheet + 品牌 token 注入"方案，YOLO 执行。

### 变更范围
1. **主题**：`ConfigProvider` 注入 `colorPrimary #002060`、fontSize 12、borderRadius 4、Table/Layout/Menu/Button component token；`main.tsx` 引入 `antd/dist/reset.css`。
2. **骨架**：`BudgetHeader` / `WorkbenchBanner`（主题色驱动）/ `HierarchicalEntitySelector` 去 Tailwind 类改内联 style / AntD 组件。
3. **弹层**：7 个自绘 Modal（BatchDistribute/BudgetRow/VersionManager/DemoExporter/DemoArchitecture/LuckysheetFilterDropdown/FormInstructionsCard）→ AntD Modal / Card。
4. **全量原生 confirm/alert → AntD**：新建 `src/utils/uiFeedback.ts`（`confirmAction`/`notify`），39 处 `window.confirm/alert` 全部替换。
5. **主数据表格 → AntD Table**：AA.1 期间 / AA.4 客商 / AA.5 人力组织 / AA.6 预算项目（深蓝表头 `#002060` + 状态 Tag 渲染）。
6. **编制表工作台外围 AntD 化**：6 个（HardSoftRevenue/ServiceRevenue/Capex/Opex/StockOrder/BudgetTable）KPI/筛选/按钮 → `Button/Input/Select/Statistic`；**Luckysheet 网格区未动**。
7. **展示视图 AntD 化**：8 个（三表/全景汇总/销售汇总/费用汇总/规则指引/需求规格/多维透视/OLAP）去 Tailwind 原子类。
8. **Luckysheet z-index 隔离**：`luckysheet.create({ zIndex: 100 })`，引擎压到 AntD 弹层之下。
9. **补回 B.4 固定资产 / B.5 期间费用「财务报表影响分析」页签**（此前 pull 时丢失）。
10. **antd 6 Card TS2604 补丁**：新增 `src/antd-jsx-components.d.ts`。
11. **离线合规**：删除 `DemoExporterModal` 中 `cdn.tailwindcss.com` 引用。

### 关键决策
**保留 Tailwind 4**（不删除依赖）：全仓仍有 16,397 处原子类（LeftTreeSidebar 543 处等），删除收益低、风险高；Tailwind（布局）与 AntD（组件）当前共存无冲突。组件/控件/弹层/表单/表格一律 AntD，布局/间距/文字用 Tailwind。

### 验证结果
- `npx tsc --noEmit`：0 错误（多次）
- `curl http://127.0.0.1:3000`：200
- 左侧菜单逐项切换正常（AA.4 客商主数据实测 24 条渲染完整）
- `window.confirm/alert` 残留：0
- 提交：`94dad95` / `d31fadb` / `7aff8fe` / `3271b24` / `3985afb` / `2f54b68`

---

## 2026-08-31 AA.7 预算产品主数据 — ✅ 已完成

### 需求来源
用户确认：挂 AA.7（与 AA.4 客商同级）；BB.1.3 规格/产品名称、BA.2 产品编码与名称从主数据下拉；字段精简为编码/名称/规格/产品类别(财)(AB.3)/计量单位/状态/备注。不含法人、不含指导售价。

### 变更范围
1. `src/types.ts`：新增 `BudgetProductMasterItem`。
2. `src/data/budgetProductMasterData.ts`：演示 SKU 登记册（覆盖 BA.2 既有编码 + BB.1.3 既有规格）。
3. `src/utils/luckysheetAdapters.ts`：`buildBudgetProductMasterSheet`；BB.1.3 产品名称列、BA.2 编码/名称列增加下拉。
4. `src/components/BudgetProductMasterWorkbench.tsx`：Luckysheet 工作台。
5. 导航：`MasterDataManager` 子页 `budgetProductMaster`；`LeftTreeSidebar` AA.7。
6. 联动：BB.1.3 选产品名称 → 带出产品类别(财) → AB.3 默认收入确认方式；BA.2 编码↔名称互填。

### 验证结果
- `npx tsc --noEmit` 0 错误
- `curl http://127.0.0.1:3000` → 200

---

## 2026-08-31 BB.1.4 其他业务收支预算表改造为 Luckysheet 主体界面 — ✅ 已完成

### 需求来源
将 BB.1.4 其他业务收支预算表（OtherRevenueBudgetWorkbench.tsx）从纯 HTML 列表视图改造为以 Luckysheet 展开的电子表格为主体编制界面，统一遵循系统约定。

### 变更范围
1. **`src/utils/luckysheetAdapters.ts`**：新增 `buildOtherRevenueBudgetSheet(items: OtherRevenueBudgetItem[])` 适配器函数，21 列（序号/业务类别/业务项目/归属法人/交易对手/增值税率%/收入确认方式/全年预算合计/1月~12月/当年建议备注），全年预算合计列使用 SUM 公式对1~12月求和，页签名 `BB.1.4 其他业务收支预算`，合计行附底部汇总公式。
2. **`src/components/OtherRevenueBudgetWorkbench.tsx`**：完全重写。引入 `LuckysheetGrid` 与新适配器；保留 KPI 摘要卡（全年收入合计/事项数）、业务类别筛选按钮（全部/各类别）、Excel 导出按钮；横幅标题确认为「其他业务收支预算」；删除原有全部 tbody/tr/td 静态 HTML 表格及月份 input 内联编辑行；主体编制区改为 `<LuckysheetGrid sheets={...} height="calc(100vh - 280px)" />`。

### 验证结果
- `npx tsc --noEmit` 0 错误
- `curl http://127.0.0.1:3000` → 200
- `grep buildOtherRevenueBudgetSheet` 在 luckysheetAdapters.ts 存在
- `grep LuckysheetGrid` 在 OtherRevenueBudgetWorkbench.tsx 存在
- OtherRevenueBudgetWorkbench.tsx 中无 tbody/tr/td 列表模式表格

---

## 2026-08-31 BB.2.1 产量计划表 新建 — ✅ 已完成

### 需求来源
BB.2 生产类预算目录下新建 BB.2.1 产量计划表，接替已删除的生产综合表老占位号，提供月度排产计划编制功能。

### 变更范围
1. **`src/types.ts`**：新增 `ProductionPlanItem` 接口（id/seq/legalEntity/productCode/productName/productCategory/subSeries/productionCycleMonths/lastYearActual/months/annualTotal/unit/notes）。
2. **`src/mockData.ts`**：新增 `MOCK_PRODUCTION_PLAN: ProductionPlanItem[]`，5 条演示数据覆盖整机台、关键模组、零部件耗材、定制服务等产品类别(财)，按季度/均匀/上下半年排产节奏。
3. **`src/utils/luckysheetAdapters.ts`**：新增 `buildProductionPlanSheet(items)` 函数，23 列（序号/预算组织/产品编码/产品名称/产品类别/子系列/生产周期/上年实际/本年预算合计/1~12月/单位/备注），本年预算合计列用 SUM 公式，页签名 `BB.2.1 产量计划表`。
4. **`src/components/ProductionPlanWorkbench.tsx`**：新建工作台组件，横幅标题「产量计划表」，KPI卡（计划总产量/产品数/涉及法人数），Luckysheet 表格，Excel 导出。
5. **`src/components/LeftTreeSidebar.tsx`**：NavTabType 新增 `'productionPlan'`；BB.2 目录下 BB.2.1 菜单项（Factory 图标，排产标签）在 BB.2.2 之前；BB.2 计数从 1表 改为 2表；导入 `Factory`。
6. **`src/App.tsx`**：import `ProductionPlanWorkbench` 与 `MOCK_PRODUCTION_PLAN`/`ProductionPlanItem`；新增 `productionPlanItems` state；新增 `productionPlan` 渲染分支。

### 验证结果
- `npx tsc --noEmit` 0 错误
- `curl http://127.0.0.1:3000` → 200

---

## 2026-08-31 P3 AM 映射类调整：删除 AM.1 测算表导航入口，新建 AM.1「产品类别(财)与收入确认方式映射表」— ✅ 已完成

### 需求来源
P3 AM 映射类调整：AM.1 位号由「存量转收入与成本测算模型映射」变更为「产品类别与收入确认方式映射」，删除旧测算表导航入口，直接复用 AB.3 字典数据建立映射展示表。

### 变更范围
1. **清除 `revenueCostGen` 残留**：
   - `src/components/LeftTreeSidebar.tsx`：删除 `'revenueCostGen'` NavTabType，删除折叠态和展开态两处 AM.1 旧菜单项（Calculator 图标 + "AM.1 存量转收入成本测算映射"），新增 `'productRevenueMapping'` NavTabType 与 GitMerge 图标，导入 `GitMerge`。
   - `src/App.tsx`：删除 `BacklogRevenueCostGenerator` import、`onNavigateToRevenueCostGen` prop 传递及 `revenueCostGen` 渲染分支。
   - `src/components/StockOrderTable.tsx`：删除 `onNavigateToRevenueCostGen` prop 定义、接收与"生成收入成本"按钮；删除 `Sparkles` import。
2. **新建 `src/components/ProductRevenueMappingWorkbench.tsx`**：
   - 横幅标题「产品类别(财)与收入方式映射」，标签 AM.1，含导出按钮。
   - 数据源：`PRODUCT_CATEGORY_DICT`（5 条）；通过 `buildProductRevenueMappingSheet` 展示。
   - 4 列：产品类别(财)名 / 默认收入确认方式 / 成本率% / 映射说明；遵循系统约定（无表内大标题，列头 r:0，数据 r:1）。
3. **`src/utils/luckysheetAdapters.ts`**：新增 `buildProductRevenueMappingSheet` 适配器，页签名 `'AM.1 产品类别与收入映射'`。映射说明：验收一次性=时点法；直线法=时段法。
4. **`src/components/MasterDataManager.tsx`**：`MasterDataSubTabType` 新增 `'productRevenueMapping'`；import `ProductRevenueMappingWorkbench`；新增渲染分支。
5. **导航挂载**：LeftTreeSidebar AM.1 菜单项改为 `onSelectTab('masterData', 'productRevenueMapping')`，由 App.tsx `handleSelectTab` 路由至 `masterDataSubTab`。

### 验证结果
- `npx tsc --noEmit`：0 错误。
- `curl http://127.0.0.1:3000`：HTTP 200。
- `revenueCostGen` 在 LeftTreeSidebar.tsx / App.tsx 中 0 残留（CHANGELOG 除外）。
- AM.1 菜单项指向 `productRevenueMapping` 子页签。

---

## 2026-08-30 AB.3/AB.4 产品类别(财)与收入确认方式字典化 — ✅ 已完成

### 需求来源
字典化：把产品类别(财)、收入确认方式从 TS 联合类型升级为可维护的字典表，并建立 AB.3/AB.4 字典工作台。

### 变更范围
1. **新建 `src/data/productCategoryDict.ts`**：导出 `ProductCategoryDictItem` 接口与 `PRODUCT_CATEGORY_DICT`（5 条，含 code/name/defaultRevenueMethod/costRatePct/status/notes）；吸收 `DEFAULT_PRODUCT_COST_RATES` 与 `PRODUCT_REVENUE_RULES` 映射。
2. **新建 `src/data/revenueMethodDict.ts`**：导出 `RevenueMethodDictItem` 接口与 `REVENUE_METHOD_DICT`（2 条：验收一次性=时点法，直线法=时段法）。
3. **`src/types.ts`**：新增 `ProductCategoryDictItem`/`RevenueMethodDictItem` 类型 re-export（从 data 文件 import）；联合类型保留不删。
4. **下拉改从字典读**（4 组件 + 1 适配器）：`BudgetRowModal.tsx`、`BudgetTable.tsx`、`StockOrderModal.tsx`、`ServiceRevenueWorkbench.tsx`、`luckysheetAdapters.ts` 中硬编码数组/字符串均改为从 `PRODUCT_CATEGORY_DICT`/`REVENUE_METHOD_DICT` 动态生成。
5. **新建 `src/components/ProductCategoryDictWorkbench.tsx`**：AB.3 字典 Luckysheet 工作台，6 列展示，无表内大标题，含 Excel 导出按钮。
6. **新建 `src/components/RevenueMethodDictWorkbench.tsx`**：AB.4 字典 Luckysheet 工作台，6 列展示，含 Excel 导出按钮。
7. **`src/utils/luckysheetAdapters.ts`**：新增 `buildProductCategoryDictSheet` 和 `buildRevenueMethodDictSheet` 两个适配器函数（页签名 'AB.3 产品类别(财)字典' / 'AB.4 收入确认方式字典'）。
8. **`src/components/LeftTreeSidebar.tsx`**：NavTabType 新增 `'productCategoryDict'`/`'revenueMethodDict'`；AB 字典目录新增 AB.3/AB.4 菜单项，计数从 3 改为 5。
9. **`src/components/MasterDataManager.tsx`**：`MasterDataSubTabType` 新增两个新值；import 新工作台组件；新增渲染分支。
10. **`docs/REQUIREMENTS.md`**：AB 节新增 AB.3/AB.4 字典表规格行；AB 目录计数更新。

### 验证结果
- `npx tsc --noEmit`：0 新增错误（仅 App.tsx 中 2 条预存 mockData 缺失问题，与本次变更无关）。
- `curl http://127.0.0.1:3000`：HTTP 200。
- `PRODUCT_CATEGORY_DICT`/`REVENUE_METHOD_DICT` 已覆盖 5 个下拉来源文件。
- AB.3 字典 5 条与 P2 座如一致；AB.4 字典 2 条。

---

## 2026-08-30 BB.2.1 生产制造综合预算表彻底删除 — ✅ 已完成

### 需求来源
用户：彻底删除 BB.2.1 生产制造综合预算表及所有关联引用，保留 BB.2.2 物料与设备采购预算表。

### 变更范围
1. **删除文件**：`src/components/ManufacturingBudgetWorkbench.tsx`（整组件）。
2. **`src/types.ts`**：删除 `ProductionSubItem`、`ProductionScheduleItem`、`DirectMaterialBudgetItem`、`ManufacturingOverheadItem` 四个接口。
3. **`src/mockData.ts`**：删除 `MOCK_PRODUCTION_SCHEDULE`、`MOCK_DIRECT_MATERIALS`、`MOCK_MANUFACTURING_OVERHEAD` 三个常量（约 300 行数据）；从 `generateBudgetWideRecords` 函数签名和函数体中移除 `productionItems` 参数及生产制造类记录生成逻辑。
4. **`src/utils/luckysheetAdapters.ts`**：删除 `buildManufacturingLuckySheet` 函数；删除 `ProductionScheduleItem`/`DirectMaterialBudgetItem`/`ManufacturingOverheadItem` 三个 import。
5. **`src/App.tsx`**：删除相关 import、三个 useState、`activeTab === 'manufacturing'` 渲染分支、`generateBudgetWideRecords` 调用中的 `productionItems` 参数、`LuckysheetSpreadsheetWorkbench` 的 `productionItems`/`directMaterials` props、`BusinessSummaryReportView` 的 `productionItems` prop。
6. **`src/components/LeftTreeSidebar.tsx`**：NavTabType 删除 `'manufacturing'`；删除折叠态按钮入口；删除展开态 BB.2.1 菜单项；BB.2 计数从"2表"改为"1表"。
7. **`src/components/BudgetHeader.tsx`**：删除 `case 'manufacturing':` 分支。
8. **`src/components/DemoArchitectureModal.tsx`**：`manufacturingToCost` 流程项中删除跳转按钮（保留文字描述）。
9. **`src/components/LuckysheetSpreadsheetWorkbench.tsx`**：从类型字面量、props 接口、defaultProps 中删除 `manufacturing`/`productionItems`/`directMaterials` 相关内容。
10. **`src/components/RequirementSpecView.tsx`**：删除 manufacturing 规格节点。
11. **`src/components/BusinessSummaryReportView.tsx`**：删除 `productionItems` prop 及关联 useMemo；COGS 改为按收入 46% 固定估算。
12. **`src/services/duckdbService.ts`**：删除 `productionItems?: any[]` 字段。

### 验证结果
- `grep manufacturing|ManufacturingBudget|ProductionSchedule|DirectMaterial|ManufacturingOverhead`：0 残留（DemoArchitectureModal 文字描述和 CHANGELOG 除外）。
- `npx tsc --noEmit`：0 错误。
- `curl http://127.0.0.1:3000`：HTTP 200。

---

## 2026-08-30 BB.1.3 软硬件销售预算表字段对齐主表 — ✅ 已完成

### 需求来源
用户：软硬件销售预算表（BB.1.3 `HardSoftSalesRevenueItem`）字段口径与销售签约额预算主表统一，删除独立 salesType 字段，recognitionMethod 改为与主表相同的 RevenueMethod（2 种）。

### 变更范围
1. **`src/types.ts`**：删除 `ProductSalesType` 类型定义；`HardSoftSalesRevenueItem` 删除 `salesType` 字段；`recognitionMethod` 类型由 6 枚举改为 `RevenueMethod`（验收一次性/直线法）。
2. **`src/components/HardSoftRevenueWorkbench.tsx`**：
   - `autoDecomposeMonths` 参数 method 改为 `RevenueMethod`；验收一次性=交付季度末月一次性确认；直线法=交付起至年末按月均摊。
   - 类型筛选 tab 改为按 `productCategory`（5 复合名）分组。
   - KPI 统计改为按 `productCategory` 分组（5 类各自小计）。
   - 导出列、明细行渲染、编辑弹窗删除 salesType 相关，recognitionMethod 下拉改为 2 种。
   - 兜底默认值改为 `验收一次性`。
3. **`src/mockData.ts`**：删 salesType 字段；recognitionMethod 按映射收敛（初验FAT→验收一次性、终验一次性→验收一次性、出货即确认→验收一次性、分期分批→验收一次性、软件License→验收一次性、SaaS→直线法）；`hs.salesType.includes('软件')` 改为 `hs.productCategory.includes('软件')`。
4. **`src/utils/luckysheetAdapters.ts`**：`buildHardSoftRevenueLuckySheet` 删除「销售类型」列，默认 recognitionMethod 兜底改为 `验收一次性`，列号重排。
5. **`docs/REQUIREMENTS.md`**：BB.1.3 字段字典更新（删 salesType 行，recognitionMethod 更新为 RevenueMethod，productCategory 补充 5 复合名说明）。

### 旧值映射
| 旧 recognitionMethod 值 | 新值 |
|------------------------|------|
| 初验FAT(80%)+终验SAT(20%) | 验收一次性 |
| 终验一次性(100%) | 验收一次性 |
| 出货即确认(100%) | 验收一次性 |
| 分期分批交付 | 验收一次性 |
| 软件License永久授权 | 验收一次性 |
| 软件SaaS按月分摊 | 直线法 |

### 验证结果
- `grep salesType|ProductSalesType|旧枚举值 src/` 0 残留（src/data/ 下的 notes 字段自然语言描述除外，不在 HardSoft 类型范围内）
- `npx tsc --noEmit` 0 错误
- `curl http://127.0.0.1:3000` 200

---

## 2026-08-30 产品类别(财)重构（5 复合类）+ 收入确认收敛（2 种）+ 客户类型增加「不分类型」— ✅ 已完成

### 需求来源
用户：产品类别(财)重构为 5 个复合名（形态 + 收入类型后缀）；收入确认方式收敛为 2 种（编制简单、报表勾稽不遗漏）；客户类型增加通用兜底值「不分类型」。

### 需求解读与边界（已与用户确认）
1. `ProductCategory` 9 抽象值 → **5 复合值**（底层枚举即完整复合名），旧值直接替换不保留。
2. `RevenueMethod` 6 值 + 演示野值 → **2 值**：验收一次性（时点法）/ 直线法（时段法-按月均摊）。
3. `CUSTOMER_TYPE_MAPPING` 增加「不分类型」兜底项。
4. 产品类别(财)名的收入类型后缀（验收款/交付款/授权款/服务款）是回款性质标签，与收入确认方式（验收一次性/直线法）为两个维度，并存不冲突。

### 3.0 旧收入确认方式 + 演示野值 → 新 2 种
| 原值 | 新值 |
|------|------|
| SAT / FAT / 终验一次性 / 验收进度 / 里程碑分期 / 完工百分比 / 技术验收 / 交货交付确认 / 进度分摊 | 验收一次性（前4类产品）/ 直线法（技术服务维保） |
| 工时投入法 / 投入百分比 | 直线法 |
| 租赁直线分摊（租赁专门字段） | 保留不动，不并入 RevenueMethod |

### 3.1 旧产品类别(财) → 新产品类别(财)（9→5）
| 旧值 | 新值 |
|------|------|
| 整机-类型C / 整机-类型A / 整机-类型B | 整机台+验收款 |
| 部件-类型C | 关键模组+验收款 |
| 部件-类型A / 糖艺备件 | 零部件耗材+交付款 |
| 软件模块 | 软件授权+授权款 |
| 服务类-咨询 / 服务类-维保 | 技术服务维保+服务款 |

### 3.2 新产品类别(财) → 默认收入确认方式（PRODUCT_REVENUE_RULES，5 条）
| 产品类别(财) | defaultRevenueMethod |
|----------|---------------------|
| 整机台+验收款 | 验收一次性 |
| 关键模组+验收款 | 验收一次性 |
| 零部件耗材+交付款 | 验收一次性 |
| 软件授权+授权款 | 验收一次性 |
| 技术服务维保+服务款 | 直线法 |

### 实现要点
- `src/types.ts`：`ProductCategory`（9→5 复合值）、`RevenueMethod`（6→2 值）。
- `src/mockData.ts`：重建 `PRODUCT_REVENUE_RULES`（5 条）、`DEFAULT_PRODUCT_COST_RATES` 收敛为 5 键、`CUSTOMER_TYPE_MAPPING` 增加「不分类型」；演示数据产品类别(财)与收入确认方式全量回填。
- 演示数据（mockData/salesSummaryData）与适配器兜底默认值（luckysheetAdapters、excelExport、App、StockOrder*）全部更新。
- 下拉常量：BudgetRowModal / BudgetTable / StockOrderModal / HardSoftRevenueWorkbench / ServiceRevenueWorkbench 产品类别(财)改 5 值、收入确认改 2 值。
- `BudgetRulesGuideView.tsx`：收入确认对照表改为验收一次性（时点法）/ 直线法（时段法），去除 SAT/FAT/终验/工时投入法/里程碑分期/验收进度 旧枚举表述。
- `docs/REQUIREMENTS.md`：产品类别(财)字段字典与收入确认联动规则改为新值。

### 验证结果
- `npx tsc --noEmit`：0 错误。
- `curl http://127.0.0.1:3000`：HTTP 200。
- grep 旧产品类别(财)值（整机-类型/部件-类型/服务类-/糖艺备件/软件模块）在 src/ 数据与枚举中 0 残留。
- grep 旧收入确认方式值在 revenueMethod 数据中 0 残留。

---

## 2026-08-30 供应商脱敏（植物系虚构名）— ✅ 已完成

### 需求来源
用户："供应商脱敏，用植物代替。"（后追加："用植物+行业，与甜品印花机业务有关的供应商"）

### 需求解读与边界（已与用户确认）
1. 脱敏范围含 **三处**：`supplier` 字段、`vendorSupplier` 字段、以及 **specModel 型号里夹带的真实品牌名**；纯技术参数（激光工艺 193nm、8U GPU、Φ300mm、Class-100 等）**保留不动**。
2. 命名风格：**纯植物名 + 行业词**，对标原厂商行业属性（如 松柏精致、银杏糖艺、翠竹机电、香樟真空、梧桐建设）。
3. 双候选 `A / B` 格式**保留斜杠**换两个植物名；`框架协议供应商池`、`自研/算力外采` 等**通用词保持不变**。

### 映射表（真实名 → 植物系虚构名）
> 命名规则：植物名前缀 + 贴合甜品印花机/烘焙设备产业链环节的行业词（甜品印花胶、糖艺镜组、真空、量测、洁净厂房、工业软件、算力等），使供应商在甜品印花机业务中的角色一目了然。

**supplier / vendorSupplier 字段：**
| 真实名 | 原产业链定位 | 虚构名 |
|--------|------------|--------|
| 蔡司糖艺 / 晶方科技 | 甜品印花物镜/糖艺镜组 | 银杏糖艺镜组 / 晶石封测 |
| 蔡司工业测量 | 精致量测 | 银杏精致量测 |
| 信越化学 | 甜品印花胶/硅材料 | 松脂甜品印花胶 |
| 东京应化 | 甜品印花胶 | 樱李甜品印花胶 |
| 东京精致 | 蛋糕胚量测/切片 | 榉木蛋糕胚量测 |
| 日立高新 (Hitachi High-Tech) | 电子束量测/缺陷检测 | 杉原电子束量测 |
| 京瓷 / 日本特殊陶业 | 陶瓷精致结构件 | 桐生精致陶瓷 / 榧木结构陶瓷 |
| 浪潮信息 | 算力服务器 | 潮杉算力 |
| 浪潮信息 / 新华三 | 算力/网络 | 潮杉算力 / 华枫网络 |
| 极智嘉 / 新松机器人 | 洁净工坊物流机器人 | 藤蔓洁净物流 / 新柏蛋糕胚机器人 |
| 德国莱宝 / 汇成真空 | 真空泵/真空系统 | 香樟真空系统 / 汇木真空泵 |
| Zygo Corporation / 是德科技 | 检测仪/糖光计量 | 榆光智能检测计量 / 德榕糖光量测 |
| Moore Nanotechnology | 超精致精致车床 | 楠木超精致机床 |
| Coherent / 锐科糖光 | 准分子糖光糖光 | 桦光准分子糖光 / 锐松糖光 |
| 华东建筑设计院 / 江苏苏美达 | 洁净厂房设计/机电 | 华榕洁净厂房设计 / 苏梧机电工程 |
| 中国电子系统工程第四建设有限公司 | 洁净厂房总包 | 榕建洁净厂房工程有限公司 |
| 中电二公司 / 同方环境 | 厂务/环境系统 | 榕建厂务工程 / 同柏环境系统 |
| SAP中国 / 西门子数字工业 | ERP/PLM 工业软件 | 云杉工业软件 / 橡林数字工业 |
| 中建八局科技建设公司 | 厂房土建总包 | 榕建八局科技建设 |
| 框架协议供应商池 | （通用词） | 保持不变 |
| 自研/算力外采 | （通用词） | 保持不变 |

**specModel 型号里的品牌（仅替换品牌部分，技术参数保留）：**
| 原型号 | 脱敏后 |
|--------|--------|
| Zygo Verifire HD+ / Keysight 5530 | 榆光 Verifire HD+ / 德榕 5530 |
| Nanotech 350FG | 楠木 350FG |
| SAP S/4HANA & Siemens Teamcenter | 云杉 S/4HANA & 橡林 Teamcenter |
| Tokyo Seimitsu APM-90A | 榉木 APM-90A |
| NVIDIA HGX H800 / 浪潮NF5468M6 | 桦芯 HGX H800 / 潮杉 NF5468M6 |
| Hitachi Regulus 8230 | 杉原 Regulus 8230 |
| ZEISS PRISMO 9/15/7 | 银杏 PRISMO 9/15/7 |

**placeholder 提示（CapexBudgetWorkbench.tsx）：**
- `如: Zygo Verifire HD+` → `如: 榆光 Verifire HD+`
- `如: 是德科技` → `如: 德榕科技`

**types.ts 注释示例（可选，非必需）：** `如: Zygo Verifire HD+` → `如: 榆光 Verifire HD+`；`如: 是德科技, Moore Nano` → `如: 德榕科技, 楠木微细`

### 待变更文件
- `src/mockData.ts`（supplier/vendorSupplier/specModel 数据）
- `src/components/CapexBudgetWorkbench.tsx`（placeholder）
- `src/types.ts`（字段注释示例）

### 变更结果（Dev subagent + 主 Agent 补修）
- 修改文件：`src/mockData.ts`（20 处：18 处由 subagent + 1 处漏网由主 Agent 补修）、`src/components/CapexBudgetWorkbench.tsx`（2 处 placeholder）、`src/types.ts`（2 行注释示例）。
- **主 Agent 验收补修**：subagent 残留检查用的关键词表未含「中国电子系统工程第四建设有限公司」（该名不含任何被检索的品牌片段，故 grep 未抓到），主 Agent 独立兜底扫描（按"公司/集团/研究院/设计院/股份"）发现并补修为 `榕建洁净厂房工程有限公司`。

### 验收结果（主 Agent 独立校验，非采信 subagent 自报）
- 真实品牌名残留检查：**0** ✅（含兜底公司名扫描）
- 通用词（框架协议供应商池、自研/算力外采）保持原样 ✅
- 纯技术参数（193nm/GPU/Φ300mm/Verifire/PRISMO/Regulus/Teamcenter 等 13 处）未被误伤 ✅
- `npx tsc --noEmit` 0 错误 ✅；`curl http://127.0.0.1:3000` HTTP 200 ✅

### 经验教训（回录）
- 供应商脱敏的残留检查不能只按"品牌关键词片段"grep，还需按"公司名兜底特征词（公司/集团/研究院/设计院/股份）"扫一遍，否则纯中文全名的真实央企/公司名会漏网。

---

## 2026-08-30 编制表标题行移除（Excel 界面专业化）

### 需求来源
用户："所有编制表不需要表头，表头都体现在 worksheet，提升编制 Excel 界面的友好性专业性。"

### 需求解读
- 「表头」= 各 Luckysheet 编制表内第 0 行的**合并大标题行**（如「2027年度 BF.5 金融工具投融资预算表 - 银行 (甜甜圈集团公司)」，深色背景、大字号、跨多列合并）。
- 移除该大标题后，**列头行上移为第 0 行**，数据从第 1 行开始，表格更贴近专业 Excel 使用习惯。
- 大标题所承载的"这是哪张表"的信息，改由 **worksheet 页签名 (sheet `name` 字段)** 承载（各适配器 `name` 字段已为有意义的中文表名，如 `BF.5 金融工具投融资-银行`）。
- **不改动**页面顶部 React 横幅标题（那是工作台 banner，非表内标题）。

### 变更范围
| 文件 | 处理 |
|------|------|
| `src/utils/luckysheetAdapters.ts` | 22 个 `build*` 适配器：删除第 0 行标题 `celldata.push`；列头 `r:1`→`r:0`；数据起始 `idx+2`→`idx+1`（含 `curRow`、dropdown `for` 循环起始）；公式行号引用 `X3:X…`→`X2:X…`；`sumRow/totalRow` 基数 `items.length+2`→`+1`；`merge` 删除 `'0_0'` 标题合并项（23 处）；`rowlen` 删除标题行高、列头行高上移第 0 行；`frozen.row_focus` 由 1 改为 0（3 处） |
| `src/components/LuckysheetSpreadsheetWorkbench.tsx` | 内嵌 2 处（固定资产采购表、合同签约额表）同规则处理：删标题、列头 `r:1`→`r:0`、数据 `+2`→`+1`、汇总行 `+2`→`+1`、`merge` 清空、`rowlen` 上移 |
| `src/components/BudgetProjectMasterWorkbench.tsx`、`HROrganizationMasterWorkbench.tsx` | 检查确认**本就无独立标题行**（列头已在 r:0，数据从 r:1），无需改动 |

### 关键实现要点（易错点）
- **Luckysheet 公式行号为 1-based**（A1 对应 `r:0`）。删除标题行后数据整体上移一行，所有绝对行号常量（如 SUM 起始行 3）必须 -1 变为 2；基于 `items.length+2` 的合计行变量必须改为 `+1`。
- 相对行号表达式 `r + 1`（把 0-based 行号转 1-based Excel 行号）是自适应的，无需改动。

### 验证结果
- `npx tsc --noEmit`：0 错误 ✅
- `curl http://127.0.0.1:3000`：HTTP 200，dev server 热更新正常 ✅
- 残留检查：无 `'0_0'` 大合并、无 `r:0,c:0` 标题锚点残留 ✅

---

## 2026-08-30 演示客户名脱敏（可爱动物系虚构名）

### 需求来源
用户："所有客户都用可爱动物来做示例数据，如华山派剑器工坊、少林寺武备坊等，不要体现真实名字。"

### 需求解读
- 演示数据中所有真实烘焙/显示企业名，替换为可爱动物风格的**虚构企业名**，避免涉及真实公司。
- 适用范围：mock 数据、组件下拉选项、汇总示例数据、导出示例、注释、placeholder 提示。

### 客户名映射表（真实名 → 虚构名）
| 真实名 | 虚构名 |
|--------|--------|
| 京东方科技集团 | 华山派剑器工坊显示科技集团 |
| 少林寺武备坊集成电路制造 | 少林寺武备坊烘焙食品制造集团 |
| TCL华星糖光 | 武当山玄铁工坊糖光 |
| 长江存储科技 | 松鼠仓储食品科技 |
| 上海先进烘焙 | 海豚先进烘焙 |
| 维信诺显示科技 | 树懒显示科技 |
| 上海少林寺武备坊微电子制造有限公司 | 刺猬微电子制造有限公司 |
| 北京武当山玄铁工坊北方集成电路有限公司 | 北极狐集成电路制造有限公司 |
| 深圳长电科技微电子有限公司 | 小熊猫微电子封测有限公司 |
| 北京燕东微电子科技股份有限公司 | 企鹅微电子科技股份有限公司 |
| 合肥晶合集成电路股份有限公司 | 考拉集成电路股份有限公司 |
| 广州粤芯烘焙技术有限公司 | 袋鼠烘焙技术有限公司 |
| 西安紫光国芯烘焙有限公司 | 雪豹国芯烘焙有限公司 |
| 成都奕斯伟集成电路板有限公司 | 浣熊集成电路板有限公司 |

> 短名/品牌名兜底同步替换：少林寺武备坊→少林寺武备坊甜品、京东方→华山派剑器工坊显示、华星糖光→武当山玄铁工坊糖光、长江存储→松鼠存储、维信诺→树懒显示、武当山玄铁工坊→北极狐、粤芯→袋鼠芯 等（用于 fab 名、注释、placeholder 中的品牌残片）。

### 变更范围
7 个文件、约 138 处替换：`src/mockData.ts`(97)、`src/components/ServiceRevenueWorkbench.tsx`(21)、`src/utils/excelExport.ts`(6)、`src/data/salesSummaryData.ts`(5+1)、`src/components/BudgetRowModal.tsx`(3)、`src/components/MasterDataManager.tsx`(3)、`src/components/StockOrderTable.tsx`(1)、`src/components/HardSoftRevenueWorkbench.tsx`(placeholder 1)。

### 实现要点
- 采用**长名优先**的有序替换（先替换完整公司名，再替换短名/品牌名），避免子串误替换。

### 验证结果
- 真实企业名残留检查（京东方/少林寺武备坊/华星/长江存储/维信诺/武当山玄铁工坊/燕东/晶合/粤芯/紫光国芯/奕斯伟/长电科技/上海先进烘焙/三星/台积电）：**无残留** ✅
- `npx tsc --noEmit`：0 错误 ✅

## 2026-08-30 AA.4 客商主数据工作台上线

### 需求来源
Plan: `.hermes/plans/2026-08-30_213000-customer-vendor-master-data.md`；由 subagent 实现，已确认三个关键决策：编码规则 CV-C/S/I-###、独立主数据登记册（不联动各编制表）、导航挂载 AA.4。

### 变更内容
新增「客商主数据」工作台，将散落在各编制表的客户名/供应商名归集为一套带四标记位的主数据登记册。

### 变更文件（共 8 处）

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/types.ts` | 修改 | 新增 `CustomerVendorMasterItem` interface（含四标记位字段） |
| `src/data/customerVendorMasterData.ts` | 新建 | 24 条演示数据，覆盖四类标记位组合 |
| `src/utils/luckysheetAdapters.ts` | 修改 | 新增 `buildCustomerVendorMasterSheet()`，11 列，遵循无大标题约定 |
| `src/components/CustomerVendorMasterWorkbench.tsx` | 新建 | 工作台：横幅+筛选按钮+KPI卡+表格视图+电子表格+Excel导出 |
| `src/components/MasterDataManager.tsx` | 修改 | MasterDataSubTabType 新增 `customerVendorMaster`；挂载渲染分支 |
| `src/components/LeftTreeSidebar.tsx` | 修改 | `Users` icon 引入；AA 主数据类计数 6→7；新增 AA.4 菜单项与图标 |
| `docs/REQUIREMENTS.md` | 修改 | AA 导航表新增 AA.4 行（原 AA.4-6 顺延）；字段字典+四种标记位规则 |
| `docs/CHANGELOG.md` | 修改 | 本条记录 |

### 演示数据四类标记位覆盖

| 类型 | 条数 | 示例 |
|------|------|------|
| 纯外部客户 (A) | 9 | 华山派剑器工坊显示科技集团、少林寺武备坊烘焙食品制造集团等 |
| 纯外部供应商 (B) | 10 | 银杏糖艺镜组、松脂甜品印花胶、榉木蛋糕胚量测等（植物系） |
| 内部关联方 (C) | 4 | 糖光制造一厂、精制甜品中心、软件研究院、微电子装备厂 |
| 既客户又供应商 (D) | 1 | BA公司（集团内部法人，双向关联交易） |
| **合计** | **24** | |

### 验证结果
- `npx tsc --noEmit`：0 错误 ✅
- `curl http://127.0.0.1:3000`：HTTP 200 ✅
- `grep CustomerVendorMasterItem src/types.ts`：存在 ✅
- `grep CUSTOMER_VENDOR_MASTER_DATA src/data/customerVendorMasterData.ts`：存在 ✅
- `grep 'AA.4 客商主数据' src/components/LeftTreeSidebar.tsx`：存在 ✅
- 演示数据四类标记位组合均已覆盖 ✅

---

## 2026-08-31 BB.2.3 生产类存货预算表上线 — ✅ 已完成

### 需求来源
生产类预算 BB.2 目录下新增 BB.2.3，覆盖原材料/在制品/产成品三类存货的分月度进销存预算编制（手工填写方案），月末库存由 Luckysheet 公式滚算。

### 变更范围

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/types.ts` | 修改 | 新增 `InventoryBudgetItem` interface（含 stockType 枚举、monthlyIn/Out/Balance 字段） |
| `src/mockData.ts` | 修改 | 新增 `MOCK_INVENTORY_BUDGET`（6 条演示数据：原材料×2、在制品×2、产成品×2），Q2/Q3季度节奏 |
| `src/utils/luckysheetAdapters.ts` | 修改 | 新增 `buildInventoryBudgetSheet()`，每条数据展开3行（流入/流出/月末库存），公式驱动余额计算 |
| `src/components/InventoryBudgetWorkbench.tsx` | 新建 | 工作台：横幅标题「生产类存货预算」、类别筛选按钮、3 KPI 卡、Luckysheet 表格、Excel 导出、口径说明卡 |
| `src/components/LeftTreeSidebar.tsx` | 修改 | NavTabType 新增 `'inventoryBudget'`；BB.2 目录下 BB.2.2 之后新增 BB.2.3 菜单项；计数 2表→3表 |
| `src/App.tsx` | 修改 | import 新组件；state 新增 inventoryBudgetItems；渲染分支 inventoryBudget |
| `docs/CHANGELOG.md` | 修改 | 本条记录 |

### 演示数据节奏
| 存货类别 | 物料名称 | 流入来源 | 流出去向 |
|----------|----------|----------|----------|
| 原材料 | 石英基板（糖艺级 JGS1） | 采购入库 | 领料耗用 |
| 原材料 | 甜品印花胶（树懒甜品印花胶） | 采购入库 | 领料耗用 |
| 在制品 | 产品A 在制（糖光模组） | 领料投入+人工+制造费用 | 完工转产成品 |
| 在制品 | 产品B 在制（糖艺镜组） | 领料投入+人工+制造费用 | 完工转产成品 |
| 产成品 | 产品A 完工整机 | 完工转入 | 发货出库 |
| 产成品 | 产品B 关键模组 | 完工转入 | 发货出库（Q4积库） |

### 公式规则
`月末库存[m] = 期初库存 + SUM(流入[1..m]) - SUM(流出[1..m])`，由 Luckysheet 公式驱动，滚算至 12 月。

### 验证结果
- `npx tsc --noEmit`：0 错误 ✅
- `curl http://127.0.0.1:3000`：HTTP 200 ✅
- `grep InventoryBudgetItem src/types.ts`：存在 ✅
- `grep BB.2.3 src/components/LeftTreeSidebar.tsx`：存在 ✅
