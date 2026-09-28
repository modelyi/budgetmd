# UEADEMO 全面预算编制系统 需求规格说明书

> 本文档由需求分析师依据现有代码（`src/components/LeftTreeSidebar.tsx`、`src/types.ts`、各工作台组件）反向梳理产出，仅记录系统**已实现**的功能与数据模型，不含未来规划。演示企业为虚构的"甜甜圈集团"（烘焙装备行业），预算年度 2027，基准年 2026。

---

## 0. 必要业务需求总结

必要业务需求的集中总结见 [`BUSINESS_REQUIREMENTS_SUMMARY.md`](./BUSINESS_REQUIREMENTS_SUMMARY.md)。本节明确本演示系统的业务范围与边界：以预算编制为核心，覆盖合同、存量订单、销售收入、技术服务、生产制造、资本化、期间费用、资金税金、内部交易和财务三表；客户与 FAB 主数据归入 AA 主数据目录并分开维护，FAB 只归属客户；产品字段统一称为“产品类别(财)”；合同类型仅保留销售、技术服务、部件销售、软件授权、研发定制五类；不建立独立客商主数据库，不增加设备租赁及非必要复杂字段。

## 1. 系统定位与范围

- **形态**：单机演示 SPA（React 19 + Vite），无后端服务；数据全部内置 mock 或存于浏览器本地（Dexie/IndexedDB、DuckDB-WASM）。
- **表格引擎**：Luckysheet 驱动的类 Excel 编制工作台，支持公式联动、下拉和 Excel 导出（SheetJS/xlsx）；统一不展示序号列和底部合计/平均/汇总行。
- **双模式**：侧边栏顶部可切换「需求说明」（spec）与「需求演示」（demo）两种工作模式。
- **组织范围**：12 个法人主体（JT 集团公司、A/B/C/D 一级子公司、BA/BB/BC/BD/DA/DB/DC 二级孙公司），支持单体口径与"集团合并"口径切换。
- **版本管理**：预算版本（`BudgetVersion`）含编制中/已提交/审核通过/已锁定基准四种状态。
- **分析能力**：内置 DuckDB-WASM OLAP 工作台与多维宽表透视分析。

---

## 2. 目录总览

导航树定义于 `LeftTreeSidebar.tsx`，页面路由由 `NavTabType` 枚举（27 个 tab 值）驱动，经 `App.tsx` 分发。完整导航树如下：

| 编号 | 名称 | 类型 | activeTab (subTab) | 一句话职责 |
|------|------|------|--------------------|-----------|
| A | 系统设置类 | 目录 | — (folder: settings) | 主数据、字典与映射规则统一入口 |
| AA | 主数据类 | 目录 | — (folder: settingsAA) | 预算编制基础主数据（含预算产品） |
| AA.1 | 预算年度与期间主数据 | 页面 | masterData (periods) | 维护预算年度、期间日历与期间控制 |
| AA.2 | 组织与法人架构主数据 | 页面 | masterData (entities) | 维护 12 法人三级架构与合并范围 |
| AA.3 | 预算科目主数据 | 页面 | masterData (expenses) | PL/BS/CF/FY/IC 五套预算科目体系 |
| AA.4 | 客户与客户FAB主数据 | 页面 | masterData (customers) | 客户与客户产线主数据 |
| AA.5 | 行政部门 | 页面 | masterData (hrOrgs) | 一级行政部门主数据 |
| AA.6 | 预算项目主数据 | 页面 | masterData (budgetProjects) | 销售项目与预算项目主数据 |
| AA.7 | 预算产品主数据 | 页面 | masterData (budgetProductMaster) | 产品编码、名称、类型与单位 |
| AA.11 | 物料主数据 | 页面 | materialMaster | 物料编码、名称、类型、计量单位 |
| AB | 字典类 | 目录 | — (folder: settingsAB) | 11 项业务字典 |
| AB.1 | （无独立页面） | — | BB.1.1 | 合同主数据以内嵌参考表维护 |
| AB.2 | （无独立页面） | — | AA.4 | 客户与客户产线由 AA.4 维护 |
| AB.1 | 项目与研发标的字典 | 页面 | masterData (projects) | 项目/研发/投资标的字典 |
| AB.3 | 产品类别(财)字典 | 页面 | masterData (productCategoryDict) | 产品大类→默认收入方式/成本率字典；已字典化，下拉从此表读取 |
| AB.4 | 收入确认方式字典 | 页面 | masterData (revenueMethodDict) | 时点法/时段法→月度分摆逻辑；已字典化，吸收原联合类型 |
| AB.11 | 岗位字典 | 静态数据字典 | — | 岗位编码、岗位名称及启用状态；供 BAA.3、BB.1.3 技术服务人工明细引用 |
| AB.12 | 职级字典 | 静态数据字典 | — | 职级编码、职级名称及启用状态；供 BAA.3、BB.1.3 技术服务人工明细引用 |
| AM | 映射类 | 目录 | — (folder: settingsAM) | 3 项规则映射 |
| AM.1 | 报表项与科目规则映射 | 页面 | masterData (subjectMapping) | 报表项与预算科目取数规则映射 |
| AM.1 | 存量转收入成本测算映射 | 页面 | revenueCostGen | 存量订单→预算年度收入/成本的测算模型 |
| AM.2 | 关联交易合并抵销映射 | 页面 | intercompanyBudget | 关联交易抵销分录规则映射（与 BF.3 同页） |
| BA | 编制前提与假设 | 目录 | — (folder: folderBA) | 编制前提、标准成本与比例参数 |
| BA.1.1 | 关联交易加成比例 | 页面 | intercompanyBudget (markupRates) | 内部交易加成定价字典（自 AB.2 迁移） |
| AB.15 | 税率及附加税比率字典 | 静态数据字典 | budgetAssumptions | BF.4 税金及附加预算表统一引用的税率与附加税比率参数 |
| BAA.2 | 产品标准成本编制表 | 页面 | standardCost (product) | 产品 BOM 定额标准成本与指导定价 |
| BAA.3 | 服务人工标准成本设置 | 页面 | standardCost (hourly) | 岗位×职级工时费率库 |
| BAA.4 | 服务物料定额标准 | 页面 | standardCostMaterial | 按物料编码与部件类别维护好件/坏件标准成本 |
| BA.5 | 年度预算编制前提 | 页面 | budgetPremises | 战略原则、KPI 红线与管控授权 |
| BAA.6 | 费用预算汇总表 | 页面 | expenseBudgetSummary | 期间费用与人工成本全景汇总视图 |
| BAA.6 | 雇员费用编制导入 | 页面 | employeeExpenseImport | 定编定岗、薪酬、五险一金测算与批量导入 |
| BB | 业务预算编制 | 目录 | — (folder: folderBB) | 8 大业务模块 |
| BB.1 | 销售与收入预算 | 目录 | — (folder: bbSales) | 5 张收入类编制表 |
| BB.1.1 | 销售合同签约额预算 | 页面 | table | 单合同行的签约额月度拆分预算 |
| BB.1.2 | 存量在手订单执行表 | 页面 | stockOrders | 存量订单履约、收入确认与成本转结 |
| BB.1.3 | 软硬件销售收入预算 | 页面 | hardSoftRevenue | 软硬件产品销售收入、成本与回款预算 |
| BB.1.3 | 技术服务与料工费预算 | 页面 | serviceRevenue | 服务收入主表 + 工时附表1 + 物料附表2 |
| BB.1.4 | 其他业务收支预算 | 页面 | otherRevenue | 租赁、废旧物资、特许权等其他业务收入 |
| BB.2 | 生产类预算 | 目录 | — (folder: bbProduction) | 2 张表（生产综合 + 物料设备采购） |
| BB.2.1 | 生产制造综合预算表 | 页面 | manufacturing | 排产、直接材料耗用、制造费用预算 |
| BB.2.2 | 物料与设备采购预算表 | 页面 | materialEquipmentProcurement | 每月下单额/入库额/付款额三维采购预算 |
| BB.3 | 资本化类预算 | 目录 | — (folder: bbCapitalization) | 2 张资本化表 |
| BB.3.1 | 固定资产采购与资本化 | 页面 | capex (设备类采购/物料类采购/基建类采购) | 下单/验收/付款三指标与转固折旧 |
| BB.3.1 | 股权投资与产投出资表 | 页面 | equityInvestment | 股权投资出资与分红预算（与 BJ.C 同页） |
| BB.4 | 期间费用类预算 | 目录 | — (folder: bbOpex) | 1 张 OPEX 表 |
| BB.4.1 | 期间费用 OPEX 预算表 | 页面 | opex | 销售/管理/研发(费用化)/财务四类费用 |
| BB.5 | 资金与税金预算 | 目录 | — (folder: bbTreasury) | 2 张资金税金表 |
| BB.5.1 | 财务预算与资金出入池 | 页面 | financialBudget | 资金流入流出与税金预算（与 BF.1 同页） |
| BB.5.2 | 关联交易与内部抵销 | 页面 | intercompanyBudget | 关联交易预算（与 BF.3 同页） |
| BF | 财务预算编制 | 目录 | — (folder: folderBF) | 6 张财务类编制表 |
| BF.1 | 财务预算与资金出入池 | 页面 | financialBudget | 资金筹措、头寸平衡、税金及附加 |
| BJ.C | 股权投资与产投出资分红 | 页面 | equityInvestment | 国资委口径股权投资出资/分红填报 |
| BF.3 | 关联交易与内部抵销 | 页面 | intercompanyBudget | 加成比例/代采购/内部销售/职场租赁/资产转卖 |
| BF.4 | 预算综合调整表 | 页面 | adjustmentWorkbench | 管理层调增调减与宏观驱动杠杆调控 |
| BF.5 | 金融工具投融资-银行 | 页面 | financialInstrument | 银行存款/理财投资额、收益与回报率预算 |
| BF.4 | 营业外收支预算表 | 页面 | nonOperating | 其他业务收支 + 营业外收支四类编制 |
| BO | 编制汇总与检查表 | 目录 | — (folder: folderBO) | 汇总、三表与稽核 |
| BO.1 | 预算单体三表 | 页面 | financialStatements (currentOrg≠集团合并) | 单体资产负债表/利润表/现金流量表 |
| BO.2 | 预算合并三表 | 页面 | financialStatements (currentOrg=集团合并) | 合并口径三表与抵销穿透 |
| BO.3 | 勾稽平衡与稽核检查 | 页面 | financialStatements | 三表勾稽平衡自动诊断 |
| BO.4 | 销售预算汇总表 | 页面 | salesSummary | 销售预算按 6 维度汇总透视 |
| BO.5 | 业务预算全景汇总报表 | 页面 | businessSummary | 收入/采购/薪酬/费用业财全景汇总 |
| BO.6 | 预算多维交叉透视分析表 | 页面 | multiDimPivot | 预算宽表 OLAP 多维切片 |
| BO.7 | 多维透视分析计算工作台 | 页面 | duckdbStudio | DuckDB-WASM SQL 透视计算控制台 |
| BO.8 | 编制与核算规则指引 | 页面 | otherRules | 会计准则、测算公式与管控机制指引 |

注：`NavTabType` 中另有 `luckysheetWorkbench`（Luckysheet 通用电子表格工作台）供演示使用；`intercompanyBudget`、`financialBudget`、`equityInvestment` 等 tab 在 AM/BB/BF 多个目录节点下复用同一页面。

---

## 3. 分模块需求规格

约定：月度字段 `months` 均为 `MonthlyBudget` 结构（m1~m12 十二个数值月份列，万元或明细单位）。「录入方式」取值：手工 / 下拉 / 公式（自动计算）/ 自动带出（联动主数据）。

### 3.0 预算编制表统一表样与表规则

**表样**

- 编制表统一采用 Luckysheet；表头位于第 0 行，数据从第 1 行开始，工作表页签承载表名，不在表内增加合并大标题。
- **展示约束**：所有 Luckysheet 表（主数据、字典、标准成本、BB/BF/BO 预算结果及需求示例）均不展示“序号”列，也不展示底部“合计/小计/平均/汇总”行；内部 `seq` 仅作兼容字段，不得作为用户输入。
- 明细表采用“业务维度列 + 预算属性列 + 1—12 月列 + 年度合计/远期预算列”的结构；一条合同、订单、产品、服务、采购或费用事项占一行。
- 技术服务采用“服务收入主表 + 工时明细附表 + 物料明细附表”三层结构；财务三表采用利润表、资产负债表、现金流量表三个工作表展示。

**表规则**

- **填报粒度**：业务明细按行填报；同一合同原则上只保留一行，月度拆分放在同一行的 m1—m12 字段中。
- **期间规则**：预算年度使用 1—12 月；年度合计等于月度金额合计；超出预算年度的金额进入下年/后年或以后期间字段。
- **维度规则**：组织、科目、客户、FAB、项目、产品类别(财)、合同等字段优先使用下拉或自动带出；FAB 只能从所选客户的可用产线中选择。
- **计算规则**：数量 × 单价形成金额；签约金额 − 已确认收入形成订未收；签约金额 − 已回款形成未回款；收入 − 成本形成毛利；月度和年度合计使用公式。
- **时间列规则**：全年合计列与 1—12 月列必须保留；全年合计和月度计算继续使用 Luckysheet 公式，不因隐藏内部序号或移除底部汇总行而改变计算口径。
- **联动规则**：产品类别(财)推荐收入确认方式和成本率；合同主数据带出客户、FAB、组织等默认值；来源主数据变更后，相关预算表按映射规则重算。
- **校验规则**：必填维度完整、金额字段为数值、月度合计与年度合计一致、关联交易具备交易双方及抵销口径、财务三表满足资产负债平衡和现金勾稽。


系统级约定（适用于所有 Luckysheet 编制表，新增表须遵循）：
- **表内不设合并大标题行**：表格从列头行（第 0 行）开始，数据自第 1 行起；"这是哪张表"的信息由 worksheet 页签名（适配器返回对象的 `name` 字段，中文表名 ≤20 字）承载。公式行号按此基线编写（Luckysheet 公式为 1-based，A1=第 0 行；合计行 SUM 起始行号为 2）。
- **页面顶部横幅标题用简洁业务名**：`LuckysheetGrid` 的 `title` 取简洁业务名（如「销售签约额预算」），**去掉年度、事业部/组织等后缀**（不写「2025年度…编制表 (烘焙装备与部件事业部)」这类长串）。年度、组织信息已在系统头部与筛选区体现，无需重复进标题。
- **UI 设计规范**：所有工作台组件必须遵循 `src/styles/designTokens.ts` 中定义的 Color / Typography / Spacing / Layout / Component Token，禁止散乱硬编码颜色/字号/间距。规范要点：浅色主题白底；顶部标题栏 `COLOR.primary=#002060`；Luckysheet 列头用 `LUCKYSHEET_STYLES.deepBlueHeader`（一级）/ `deepBlueSubHeader`（二级）；数字一律 `font-mono`；KPI 数字用 `COMPONENT.kpiValue`。
- **客户等演示主体使用可爱动物系虚构名**：不出现真实企业名。既有映射见 `CHANGELOG.md`（如 华山派剑器工坊、少林寺武备坊、武当山玄铁工坊 等）；新增演示数据沿用同一动物命名风格。
- **供应商使用植物系虚构名（甜品印花机产业链风格）**：不出现真实厂商名。植物名前缀 + 贴合甜品印花机/烘焙设备产业链环节的行业词（如 松脂甜品印花胶、银杏糖艺镜组、香樟真空系统、榆光高精度检测计量），映射见 `CHANGELOG.md`。

### 3.1 静态数据：AB.15 税率及附加税比率字典（`BudgetAssumptionItem`）

**(a) 业务目标**：作为静态数据字典直接维护 BF.4 税金及附加预算表所需的税率、附加税比率及税收优惠参数；BA.1《年度预算编制假设》已删除，不再作为独立表单或 BF.4 数据来源。AB.15 不作为预算假设或预算编制表展示，仅作为 BF.4 的基础参数字典。

**(b) 关键字段说明**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| category | 枚举 | 选择（下拉） | 是 | 财税与优惠政策 |
| paramCode | string | 手填 | 是 | ASS-TAX-01~10 |
| paramName | string | 手填 | 是 | 税率/附加税比率/优惠参数名称 |
| paramUnit | string | 手填 | 是 | % |
| baseValueCurrentYear | number | 手填 | 是 | 本年度基准值 |
| budgetYearValue | number | 手填 | 是 | 预算年度取数值，BF.4 按此值计算 |
| forecastYearPlus1 / forecastYearPlus2 | number | 手填 | 是 | 后续年度预测值 |
| applicableEntity | string | 手填 | 是 | 适用法人组织/纳税主体 |
| sourceBasis | string | 手填 | 是 | 法规、政策或审定依据 |
| sensitivityLevel | 枚举 | 选择（下拉） | 是 | 高 / 中 / 低 |
| status | 枚举 | 选择（下拉） | 是 | 审定状态 |
| remarks | string | 手填 | 否 | 应用说明/被引用关系 |

**(c) BF.4 联动规则**：ASS-TAX-03（城建税7%）按 BF.4.b「本期实际缴纳增值税」计提城建税；ASS-TAX-04（教育费附加3%）与 ASS-TAX-05（地方教育附加2%）合计5%，按同一基数计提附加税；ASS-TAX-07（产品与整机装备销售/物料及设备采购13%）、ASS-TAX-09（技术服务及费用类可抵扣6%）、ASS-TAX-10（基建工程采购9%）供 BF.4.b 适用税率取数；ASS-TAX-01/02/08分别服务企业所得税优惠、研发加计扣除及软件产品即征即退口径。
**(d) 数据关系**：AB.15 是 BF.4 的直接基础字典；BF.4.a 读取附加税比率，BF.4.b 读取增值税税率及退税参数，不在 BF.4 内写死上述比例。

### 3.2 BAA.2 产品标准成本编制表（`ProductStandardCostItem`）

**(a) 业务目标**：按产品建立"人工+材料+制费"三段式单位标准成本与目标毛利率下的指导销售价，供软硬件销售与生产预算取数。

**(b) 关键字段说明**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| productCode / productName / specModel | string | 手填 | 是 | 产品编码（如 PRD-激光工艺-3000）、名称、规格型号 |
| productCategory | string | 选择（下拉） | 是 | 整机设备 / 核心模块 / 光机组件 / 服务备件 |
| applicableEntity | string | 选择（下拉） | 是 | 适用法人 |
| unit | string | 手填 | 是 | 计量单位（台/套/件） |
| stdLaborHours | number | 手填 | 是 | 标准工时（小时/台） |
| stdLaborRate | number | 手填 | 是 | 标准工时费率（万元/标准工时） |
| stdLaborCost | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 标准直接人工成本 = stdLaborHours × stdLaborRate |
| stdDirectMaterialCost | number | 手填 | 是 | 标准直接材料成本（BOM 定额） |
| stdManufacturingOverhead | number | 手填 | 是 | 标准制造费用分摊（元/台） |
| stdProductUnitCost | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 单位综合标准成本 = 人工 + 材料 + 制费 |
| targetGrossMarginRate | number | 手填 | 是 | 目标毛利率 (%) |
| guideSellingPrice | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 指导销售预算单价 = 单位标准成本 ÷ (1 − 目标毛利率) |

**(c) 计算与联动规则**：本表当前实现的表样与字段登记为 **3 列**——产品 \| 标准成本(元) \| 备注；「标准成本(元)」为单位产品标准成本（元/台，手工维护，不区分法人）。成本数据向 BB.1.3（单台标准成本）与 BB.2.1（BB.2.1.B 财务视角·生产成本 的「单位标准成本(元/台)」，完工生产成本 = 完工产量 × 单位标准成本）提供基准；上表 `stdLaborHours`/`stdLaborRate`/`stdProductUnitCost`/`guideSellingPrice` 等条目为早期需求登记，是否保留待确认，字段级以表单字段登记为准。
**(d) 报表流向**：经销售/生产预算间接进入利润表"营业成本"。

### 3.3 AB.11 岗位字典与 AB.12 职级字典

**(a) 业务目标**：在 AB 静态数据下维护岗位、职级两个独立业务字典，为 BAA.3《岗位工时费率设置》及 BB.1.3 技术服务人工明细提供统一下拉值域和稳定编码。两个字典的岗位/职级**均以现行示例值为准**（不再等业务方提供正式清单），**系统不做表与表之间的值域严格校验**；费率匹配按示例值演示。

**(b) 关键字段说明**

| 字典 | 字段名 | 字段类型 | 数据来源 | 是否必输 | 备注 |
|---|---|---|---|---|---|
| AB.11 岗位字典 | positionCode | string | 手填 | 是 | 岗位编码；按现行示例编码规则（示例值） |
| AB.11 岗位字典 | positionName | string | 手填 | 是 | 岗位名称（示例值） |
| AB.11 岗位字典 | status | enum | 选择 | 是 | 启用/停用；按现行示例值 |
| AB.11 岗位字典 | remarks | string | 手填 | 否 | 岗位说明 |
| AB.12 职级字典 | rankCode | string | 手填 | 是 | 职级编码；按现行示例编码规则（示例值） |
| AB.12 职级字典 | rankName | string | 手填 | 是 | 职级名称（示例值） |
| AB.12 职级字典 | status | enum | 选择 | 是 | 启用/停用；按现行示例值 |
| AB.12 职级字典 | remarks | string | 手填 | 否 | 职级说明 |

**(c) 引用关系**：BAA.3 的 `position` 引用 AB.11、`rank` 引用 AB.12；BB.1.3 技术服务人工明细的 `position`、`rank` 同样引用 AB.11/AB.12。字典停用值不得用于新增编制数据，历史数据按现行示例值展示。岗位与职级均为示例值，系统不做表与表之间的值域严格校验；费率匹配按示例值演示，不在本次需求中擅自增加组织/专业等附加维度。

### 3.4 BAA.3 服务人工标准成本设置（`HourlyStandardCostItem`）

**(a) 业务目标**：维护"岗位 × 职级"二键工时标准成本库，供 BB.1.3 附表1 自动取费率。

**(b) 关键字段说明**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|

| position | string | 选择（下拉） | 是 | 岗位；引用 AB.11 岗位字典（示例值口径，不做表间严格校验） |
| rank | string | 选择（下拉） | 是 | 职级；引用 AB.12 职级字典（示例值口径，不做表间严格校验） |
| hourlyCost | number | 手填 | 是 | 工时标准成本（万元/标准工时）；由本表维护，按岗位+职级提供匹配值 |
| remarks | string | 手填 | 否 | 费率适用说明；具体来源依据未在现有需求中明确 |


**(c/d) 引用关系**：`position` 引用 AB.11、`rank` 引用 AB.12，`hourlyCost`、`remarks` 由本表维护。下游为 BB.1.3 技术服务人工明细：按人工明细的 `position + rank` 匹配 BAA.3 的 `hourlyCost`，与人工明细 `monthlyHours` 相乘形成技术服务人工成本；该费率匹配关系及计算口径已确认。该成本按法人×部门×月份汇总进入 BB.5.1 财务视角“服务人工成本”，等额冲减原费用计提，并重分类进入 BO.PL.PL0202 营业成本—直接人工；不重复增加 BO.BS.2211 应付职工薪酬。岗位与职级均为示例值，系统不做表与表之间的值域严格校验；费率匹配按示例值演示。其他下游表单关系待确认。

### 3.4 AA.11 物料主数据与 BAA.4 服务物料定额标准

**业务目的**：AA.11 维护物料身份，BAA.4 在物料身份之上维护服务物料按部件类别的定额成本。BAA.4 是成本参数表，不是采购价表、库存余额表，也不承担物料数量/金额的月度预算。

AA.11 仅登记四个字段：物料编码、物料名称、物料类型、计量单位，是物料身份的唯一来源，不含状态、规格型号或法人字段；物料编码不区分法人。BAA.4 的一条有效定额以 **物料编码 + 部件类别（好件/坏件）** 为匹配键，同一物料可有两条定额；标准成本不区分法人，统一为万元/标准单位。

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| partCategory（部件类别） | 枚举 | AB.6 物料好坏件字典/下拉 | 是 | 好件 / 坏件；与物料编码共同构成定额匹配键；同一编码可分别维护 |
| materialCode（物料编码） | string | AA.11 选择 | 是 | 物料身份唯一来源；不区分法人 |
| materialName（物料名称） | string | AA.11 自动带出 | 是（系统自动生成，无需手工） | 按物料编码带出，只读；不得在 BAA.4 另行维护 |
| materialType（物料类型） | string | AA.11 自动带出 | 是（系统自动生成，无需手工） | 按物料编码带出，只读；不得在 BAA.4 另行维护 |
| unit（计量单位） | string | AA.11 自动带出 | 是（系统自动生成，无需手工） | 按物料编码带出；标准成本的“标准单位”以此为基础 |
| standardCost（标准成本） | number | 本表手工维护 | 是 | 万元/标准单位；不含税；不区分法人；不得用采购到货金额替代 |
| remarks（核算说明） | string | 本表手工维护 | 否 | 记录定额适用、好坏件核算或特殊扣减说明；不参与成本计算 |

BB.1.3 物料明细从 AA.11 选择物料，并以 **物料编码 + 部件类别** 从 BAA.4 取得对应标准成本；AA.11 负责名称、类型、单位展示，BAA.4 负责部件类别、标准成本和核算说明。销售视角只填写月度数量，财务视角显示单位成本、数量和成本。明细成本 = 月度数量 × BAA.4 标准成本；明细层好件、坏件均按正数展示，服务主表汇总时按“好件成本 − 坏件成本”形成直接物料成本。缺少对应 BAA.4 定额时不得用其他价格兜底，应标识为待维护。

### 3.5 BA.5 年度预算编制前提（`BudgetPremiseItem`）

**(a) 业务目标**：固化编制期的战略原则、KPI 底线与管控授权（刚性红线），全员编制遵照执行。

**(b) 关键字段说明**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| category | 枚举 | 选择（下拉） | 是 | 核心经营目标与财务KPI底线 / 组织与核算主体边界 / 预算周期与关键节点 / 刚性预算管控与授权 / 资本性支出审批底线 / 关联交易与税收筹划 |
| premiseCode | string | 手填 | 是 | 前提编号（如 PRE-FIN-01） |
| premiseTitle | string | 手填 | 是 | 前提条款/原则名称 |
| coreMetric | string | 手填 | 是 | 核心指标要求（如 ≥12.8亿元、≤58%） |
| applicableScope | string | 手填 | 是 | 适用范围（全集团/各子公司/研发中心） |
| responsibleDept | string | 手填 | 是 | 主责部门 |
| controlPrinciple | 枚举 | 选择（下拉） | 是 | 刚性红线 / 指导性原则 / 弹性控制 / 前置审批 |
| detailedGuidelines | string | 手填 | 是 | 细化指引与执行要求 |
| accountingReference | string | 手填 | 是 | 会计准则/法规依据（CAS 14、CAS 21、国资委考核办法） |

### 3.6 BAA.6 费用预算汇总表（视图）

**(a) 业务目标**：对 BB.4.1 期间费用与 BAA.6 雇员费用做销/管/研/财与人工全景的只读汇总展示（`ExpenseBudgetSummaryView`），无独立数据模型，取数自 `OpexBudgetItem` 与 `EmployeeExpenseBudgetItem`。
**(d) 报表流向**：与来源表一致（利润表期间费用各科目）。

### 3.7 BAA.6 雇员费用编制导入（`EmployeeExpenseBudgetItem`）

**(a) 业务目标**：按"法人×部门×岗位"编制人数定编、薪酬构成与五险一金测算，支持批量导入，产出全年综合人工成本与月度支出节奏。

**(b) 关键字段说明**（单位：万元）

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| legalEntity / department / costCenterCode | string | 选择（下拉） 或 手填 | 是 | 归属法人、部门、成本中心编码 |
| positionName / jobGrade | string | 手填 | 是 | 岗位名称、职级（P3~P6、M1/M2） |
| employeeType | 枚举 | 选择（下拉） | 是 | 正式员工 / 关键研发专家 / 实习生 / 顾问外包 |
| expenseAccountType | 枚举 | 选择（下拉） | 是 | 直接人工(生产成本) / 研发费用(人员人工) / 销售费用(人员薪酬) / 管理费用(管理人员薪酬) |
| existingHeadcount / budgetNewHeadcount / planResignCount | number | 手填 | 是 | 期初在册、预算新增、预计离职人数 |
| onboardMonth | number | 手填 | 是 | 预计到岗月份（1~12） |
| yearEndHeadcount | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 年末定编 = 期初 + 新增 − 离职 |
| monthlyBaseSalary / monthlyPerformanceBonus | number | 手填 | 是 | 人均基本月薪、月度绩效奖金（万元/月/人） |
| annualBonusMonths | number | 手填 | 是 | 年终奖发放月数（如 2.5 个月） |
| allowanceMonthly | number | 手填 | 是 | 每月津贴/餐补/交通补 |
| socialInsuranceRatePct | number | 手填 | 是 | 五险综合企业费率%（默认约 26.2%） |
| housingFundRatePct | number | 手填 | 是 | 公积金企业费率%（默认 12%） |
| annualSocialInsurancePerCapita / annualHousingFundPerCapita | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 人均年社保/公积金公司缴费额 |
| trainingExpensePerCapita / recruitingExpensePerCapita / welfareAndHealthPerCapita | number | 手填 | 是 | 人均培训费 / 招聘猎头分摊 / 体检与节日福利 |
| annualTotalDirectSalary | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 全年直接工资总额（基本+绩效+年终奖） |
| annualTotalSocialAndBenefits | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 全年五险一金及间接福利总额 |
| annualTotalLaborCost | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 全年综合人工成本 = 直接工资 + 五险一金 + 间接福利 |
| months | MonthlyBudget | 系统计算（公式） 或 手填 | 是（系统自动生成，无需手工） | 1~12 月支出节奏 |

**(d) 报表流向**：按 expenseAccountType 分流至利润表生产成本/研发费用/销售费用/管理费用；现金流量表"支付给职工以及为职工支付的现金"。

### 3.8 BB.1.1 销售合同签约额预算（`BudgetItem`）

**(a) 业务目标**：以"1 个合同 = 1 行记录"为最小颗粒度，编制新增/存量合同的签约额预算并按月拆分，附下年/后年展望。

**(b) 关键字段说明**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| contractNature | 枚举 | 选择（下拉） | 是 | 存量 / 新增 |
| contractCode | string | 选择（下拉） 或 手填 | 是 | 合同编码；新增合同先建主数据再下拉，亦可手填虚拟编号（如 HT2027-V01） |
| contractType | 枚举 | 选择（下拉） 或 自动带出（联动主数据） | 是（系统自动生成，无需手工） | 销售 / 技术服务 / 部件销售 / 软件授权 / 研发定制；按合同主数据带出可微调 |
| department | string | 自动带出（联动主数据） 或 手填 | 是（系统自动生成，无需手工） | 部门名称，按合同信息带出，支持手工调整 |
| region | 枚举 | 选择（下拉） | 是 | 北京/广州/上海/深圳/武汉/成都/西安/合肥/无锡/海外 |
| productCategory | 枚举 | 选择（下拉） | 是 | 整机台+验收款、关键模组+验收款、零部件耗材+交付款、软件授权+授权款、技术服务维保+服务款 |
| machineCode | string | 手填 | 是 | 机台名称或标识，文本，用户必输 |
| revenueMethod | 枚举 | 自动带出（联动主数据） 或 选择（下拉） | 是（系统自动生成，无需手工） | 验收一次性（时点法）/ 直线法（时段法-按月均摊）；按产品类别(财)收入方式映射自动推荐（前4类=验收一次性，技术服务维保+服务款=直线法） |
| projectName | string | 手填 | 是 | 项目名称 |
| signingEntity | string | 自动带出（联动主数据） 或 选择（下拉） | 是（系统自动生成，无需手工） | 签约主体，默认"甜甜圈集团公司"，可按合同带出 |
| internalSupplier | string | 选择（下拉） | 是 | 内部供应商 |
| customer / fabName | string | 选择（下拉） 或 自动带出（联动主数据） | 是（系统自动生成，无需手工） | 客户与 FAB 厂线（如 B17、T9、工坊12A） |
| internalPath | string | 手填（可选） | 否 | 内部交易路径（待定项，可通过开关显示/隐藏该列） |
| months | MonthlyBudget | 手填 | 是 | 1~12 月签约额拆分 |
| nextYearBudget / yearAfterNextBudget | number | 手填 | 是 | 下年 / 后年预算 |

**(c) 计算与联动规则**：合同主数据（`MasterContract`：code/name/type/defaultDepartment/defaultCustomer/defaultFab/defaultSigningEntity/defaultRegion/isFramework）带出默认值；产品收入规则（`ProductRevenueRule`）按产品类别(财)推荐收入方式；一个合同禁止重复拆行。
**(d) 报表流向**：签约额为经营口径指标，经收入确认规则转化后进入利润表"营业收入"体系。

### 3.9 BB.1.2 存量在手订单执行表（`StockOrderItem`）

**(a) 业务目标**：登记期初存量在手订单的签约、已确认收入、已回款情况，计算"订未收"敞口，作为 AM.1 存量转收入测算的输入。

**(b) 关键字段说明**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| projectCode | string | 手填 | 是 | 项目编码（待业务确定具体内容） |
| projectName | string | 自动带出（联动主数据） | 是（系统自动生成，无需手工） | 根据项目编号带出 |
| department | string | 手填 | 是 | 部门名称 |
| contractCode / contractName | string | 选择（下拉） | 是 | 销售合同及名称 |
| region | 枚举 | 选择（下拉） | 是 | 区域 |
| productCategory | 枚举 | 选择（下拉） | 是 | 产品类别(财) |
| machineCode | string | 手填 | 是 | 机台名称或标识，文本，用户必输 |
| customer | string | 选择（下拉） | 是 | 客户 |
| customerType | string | 自动带出（联动主数据） | 是（系统自动生成，无需手工） | 根据客户自动带出 |
| revenueMethod | 枚举 | 自动带出（联动主数据） | 是（系统自动生成，无需手工） | 按产品类别(财)收入方式映射带出 |
| collectedAmount / contractAmount / recognizedAmount | number | 手填 | 是 | 已回款金额、签约金额、已确认收入金额 |
| backlogRevenue | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 订未收 = 签约金额 − 已确认收入金额 |
| uncollectedAmount | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 未回款金额 = 签约金额 − 已回款金额 |
| deliverySchedule | 枚举 | 选择（下拉） | 是 | 2027-Q1~Q4 / 2027-全年均衡 / 2028及以后 |
| conversionRate | number | 手填 | 是 | 2027 年度结转比例%（默认 100%） |
| costRate | number | 手填 | 是 | 预估成本率%（如 45%） |

**(c) 计算与联动规则**：两个公式列如上；行数据经 AM.1 测算模型生成 `GeneratedRevenueCostItem`。
**(d) 报表流向**：经 AM.1 转化后进入利润表"营业收入/营业成本"。

### 3.10 AM.1 存量转收入成本测算映射（`GeneratedRevenueCostItem`、`RevenueCostGenerationConfig`）

**(a) 业务目标**：按收入确认方式的季度分布规则与产品分类默认成本率，把存量订单"订未收"基数自动测算为 2027 年度月度收入/成本/毛利。

**(b) 关键字段说明（测算配置 `RevenueCostGenerationConfig`）**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| defaultCostRates | Record<ProductCategory, number> | 手填 | 是 | 各产品分类默认成本率 (%) |
| quarterlyWeights | {q1..q4} | 手填 | 是 | 季度权重 |
| revenueRecognitionRules | Record<RevenueMethod, {q1Ratio..q4Ratio, description}> | 手填 | 是 | 各收入方式的季度确认比例与规则说明 |

**测算结果 `GeneratedRevenueCostItem`**：继承订单维度字段（projectCode/department/customer/contractCode/region/productCategory/revenueMethod），并输出：backlogAmount（期初订未收基数）、budgetYearRevenue、monthlyRevenue（m1~m12 收入节奏）、costRate、budgetYearCost、monthlyCost、budgetYearGrossProfit（公式：收入−成本）、grossMargin (%)、futureYearRevenue（2028 及以后待结转）、generationMethod（测算生成规则说明），全部为公式生成，不可手工改。

**(d) 报表流向**：利润表"营业收入 / 营业成本"（利润表取数规则示例："取<销售收入预算>+<存量转收入>"）。

### 3.11 BB.1.3 软硬件销售收入预算（`HardSoftSalesRevenueItem`）

**(a) 业务目标**：按客户、产品分类编制软硬件销售的数量×单价、收入确认、成本毛利与回款联动预算。recognitionMethod 与主表统一为 RevenueMethod（验收一次性/直线法），产品分类使用 5 复合名 ProductCategory，不再设独立 salesType 字段。

**(b) 关键字段说明**（单位：万元）

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| legalEntity / department / region / customer | string/枚举 | 选择（下拉） | 是 | 签约法人、销售部门、区域、客户 |
| customerIndustry | string | 选择（下拉） | 是 | 烘焙制造 / 先进封装 / 光伏 / 新能源 / 科研高校 |
| contractCode | string | 选择（下拉） | 是 | 关联销售合同/机会点 |
| productCategory / productModel | 枚举/string | 选择（下拉） 或 手填 | 是 | 产品分类（5 复合名：整机台+验收款/关键模组+验收款/零部件耗材+交付款/软件授权+授权款/技术服务维保+服务款）、规格型号 |
| salesQty | number | 手填 | 是 | 计划销售数量（台/套/份） |
| unitPriceTaxExcluded | number | 手填 | 是 | 不含税销售单价（万元/台） |
| taxRatePct | number | 手填 | 是 | 适用增值税率%（默认 13%） |
| contractTotalTaxIncluded | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 含税销售合同总额 |
| salesRevenueTotal | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 不含税销售总额 = salesQty × unitPriceTaxExcluded |
| deliveryQuarter | 枚举 | 选择（下拉） | 是 | Q1~Q4 |
| recognitionMethod | RevenueMethod | 选择（下拉） | 是 | 验收一次性 / 直线法（与主表口径统一；验收一次性=交付季度末月一次性确认，直线法=交付起至年末按月均摊） |
| months | MonthlyBudget | 手填 或 系统计算（公式） | 是（系统自动生成，无需手工） | 月度不含税确认收入节奏 |
| budgetYearRevenueTotal | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 2027 年预算确认收入合计 |
| futureYearRevenue | number | 系统计算（公式） 或 手填 | 是（系统自动生成，无需手工） | 递延至 2028 及以后确认金额 |
| unitStandardCost | number | 自动带出（联动主数据） 或 手填 | 是（系统自动生成，无需手工） | 单台标准成本（源自 BAA.2） |
| totalStandardCost | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 预算总营业成本 = salesQty × unitStandardCost |
| grossProfitAmount | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 毛利额 = budgetYearRevenueTotal − totalStandardCost |
| paymentTerms | string | 手填 | 是 | 付款条款（3-3-3-1、5-4-1、100%预付） |
| budgetYearCashCollection | number | 系统计算（公式） 或 手填 | 是（系统自动生成，无需手工） | 2027 预算回款额（含税） |

**(d) 报表流向**：利润表"营业收入/营业成本/毛利"；现金流量表"销售商品、提供劳务收到的现金"（回款测算联动）。

### 3.12 BB.1.3 技术服务收入与料工费预算（`ServiceRevenueItem` + 附表）

**(a) 业务目标**：以"主表（服务收入）+ 附表1（工时明细）+ 附表2（物料明细）"三层结构编制技术服务收入、料工费成本与毛利。

**(b) 关键字段说明 — 主表 `ServiceRevenueItem`**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| productName / projectName / department | string | 手填 | 是 | 产品、项目、部门（手工填写） |
| machineCode | string | 手填 | 是 | 机台名称或标识，文本，用户必输 |
| contractCode / region / productCategory / customer | string/枚举 | 选择（下拉） | 是 | 销售合同、区域、产品类别(财)、客户 |
| customerType | string | 自动带出（联动主数据） | 是（系统自动生成，无需手工） | 根据客户带出 |
| revenueMethod | 枚举 | 选择（下拉） | 是 | 验收一次性 / 直线法 |
| estimatedAcceptanceTime | string | 自动带出（联动主数据） 或 手填 | 是（系统自动生成，无需手工） | 预计结验收时间（如 "2027-06" 或 "Q2 15%"） |
| annualSalesVolume / annualUnitPrice | number | 手填 | 是 | 全年销量、单价（不含税） |
| annualBacklog / annualUncollected | number | 手填 | 是 | 订未收、未回款金额 |
| annualRevenue | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 预计销售收入（不含税）= 全年销量 × 单价 |
| revenueNature | 枚举 | 选择（下拉） | 是 | 开票当月收 / 开票后1月收 / 按验收进度收 / 开票后收 / 里程碑分期收 |
| annualCashRecovery | number | 手填 或 系统计算（公式） | 是（系统自动生成，无需手工） | 预计资金回笼 |
| cashRecoveryNature | 枚举 | 选择（下拉） | 是 | 预付款 / 进度款 / 验收款 / 质保金 |
| annualMaterialCost | number | 公式（标黄） | 是（系统自动生成，无需手工） | 物料成本，自动来源于附表2汇总 |
| annualLaborCost | number | 公式（标黄） | 是（系统自动生成，无需手工） | 人工成本，自动来源于附表1汇总 |
| annualOtherExpenses | number | 手填 | 是 | 其他费用 |
| annualGrossProfit | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 毛利额 = 收入 − 物料 − 人工 − 其他费用 |

**BB.1.3 TAB 分工**：`.b 销售填报_增量` 是软硬件/服务收入、预收款、验收回款的增量销售填报表，字段为预算部门、项目、订单编号、区域、产品、客户、客户类型、收入方式及月度确认收入/预收款/验收回款；它不是人工明细表，不引用 BAA.3。`.d 物料明细` 是技术服务物料消耗填报（好件/坏件分列），存量订单与增量合并为同一张表、由 `订单编号` 区分：存量订单行由系统带出（含订单编号），增量行可用虚拟订单号实现或可不填。`.g 人工明细` 是技术服务人工投入填报（岗位、全年/月度工时），同样把存量订单与增量合并为一张表、由 `订单编号` 区分。`.f 物料明细_财务查询`、`.i 人工明细_财务查询` 是对应填报明细的财务查询/成本结果（财务口径另含标准成本/工时标准成本列，与填报口径不同）：`.i` 额外登记职级，并展示全年及月度工时、人工成本，属于实际承载“岗位+职级+工时+人工成本”匹配结果的 TAB。填报口径（`.d`/`.g`）与财务查询口径（`.f`/`.i`）的名称、内容、字段和用途不同，不是同一张表的编码冲突，也不得要求统一编码或合并。（历史口径已废止：物料/人工明细曾按 `.d/.e`、`.g/.h` 分存量订单/增量两张填报表，现已按需求合并为 `.d`、`.g` 各一张、由订单编号区分存量与增量。）

**附表1 工时明细 `ServiceLaborDetailItem`（对应实际费率关联 TAB：BB.1.3.i）**：`.g 人工明细` 提供人力投入与工时来源（存量订单与增量合并为一张表、由 `订单编号` 区分），本表仅登记业务来源和工时，不直接引用 BAA.3。`.i` 汇总 `.g` 后，`position` 引用 AB.11、`rank` 引用 AB.12，按“岗位+职级”匹配 BAA.3 的 `hourlyCost`；`monthlyHours` 与 BAA.3 费率相乘形成 `monthlyCosts`，`totalHours / totalLaborCost` 为公式小计并自动汇总回写主表人工成本。岗位与职级均为示例值，系统不做表与表之间的值域严格校验；费率匹配按示例值演示。

**附表2 物料明细 `ServiceMaterialDetailItem`**：物件类别（AB.6 下拉）；销售项目使用 AA.6 `projectName` 下拉；物料选择唯一来自 AA.11，选中后自动带出物料编码、物料名称、物料类型、计量单位，并从 BAA.4 取得标准成本（万元/标准单位）；销售视角仅可维护物料选择、既有维度和月度物料数量，隐藏成本字段；财务视角显示物料名称、物料编码、单位、单位成本、月度数量和月度成本。月度物料成本 = 月度数量 × 单位成本，全年数量/全年成本为月度汇总公式。好件/坏件净额仅在 BB.1.3 主表汇总，明细成本始终按数量 × 单位成本正向展示；客户类型从 AA.4 客户主数据关系派生。编辑通过 Luckysheet `onCellUpdated` 回写 ServiceMaterialDetailItem，并由 Dexie service-materials 持久化，`onSave` 读回确认。

**(d) 报表流向**：利润表"营业收入（服务）/营业成本（料工费）"；现金流量表"销售商品、提供劳务收到的现金"（按资金回笼性质拆分）。

### 3.13 BB.1.4 其他业务收支预算（`OtherRevenueBudgetItem`）

**(a) 业务目标**：编制资产租赁、废旧物资、特许权、检测咨询等其他经营性收入的月度预算。

**(b) 关键字段说明**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| category | 枚举 | 选择（下拉） | 是 | 资产租赁与场地出租 / 原材料与废旧物资销售 / 特许权与技术转让使用费 / 检测咨询与技术支持 / 综合服务与代理代销 / 其他经营性收入 |
| businessName | string | 手填 | 是 | 业务/项目事项 |
| legalEntity / counterparty | string | 选择（下拉） 或 手填 | 是 | 归属法人、交易对手/承租方 |
| taxRatePct | number | 手填 | 是 | 适用增值税率 (%) |
| revenueMethod | string | 选择（下拉） | 是 | 租赁直线分摊 / 交货交付确认 / 技术验收 / 进度分摊 |
| contractNo | string | 手填 | 是 | 协议/合同编号 |
| months / annualTotal | MonthlyBudget/number | 手填 或 系统计算（公式） | 是（系统自动生成，无需手工） | 1~12 月预算额与全年合计 |
| nextYearBudget / yearAfterNextBudget | number | 手填 | 是 | 下年 / 后年预算 |

**(d) 报表流向**：利润表"其他业务收入"；现金流量表经营活动相关收现项。

### 3.14 BB.2.1 生产制造综合预算表（`ProductionScheduleItem` 等）

**(a) 业务目标**：按法人×产品编制 12 个月排产计划（含子系统层级），联动单台标准成本得出全年生产产值预算；配套直接材料耗用与制造费用预算。

**(b) 关键字段说明 — 排产主表 `ProductionScheduleItem`**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| legalEntity | string | 选择（下拉） | 是 | 预算组织/法人 |
| productCode / productName / productCategory | string | 自动带出（联动主数据） | 是（系统自动生成，无需手工） | 按产品主数据带出 |
| subSystem / subItems | string/`ProductionSubItem[]` | 手填 | 是 | 子系统标识及挂载子系统列表（子系统名称、描述、生产周期、上年实际量、月度排产、全年计划量） |
| lastYearActualVolume | number | 自动取数（联动主数据） | 是（系统自动生成，无需手工） | 上年实际发生产量 |
| annualPlannedVolume | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 本年预算合计（1~12 月求和） |
| productionCycleMonths | string | 手填 | 是 | 生产周期（如 "6个月"） |
| monthlyPlannedVolume | MonthlyBudget | 手填 | 是 | 1~12 月排产计划产量 |
| productModel / unit | string | 手填 | 是 | 产品型号、计量单位 |
| bomStandardCostPerUnit / directLaborStandardCostPerUnit / overheadStandardCostPerUnit | number | 自动带出（联动主数据） 或 手填 | 是（系统自动生成，无需手工） | BOM 单台标准成本、单台直接人工、单台制造费用（万元） |
| totalUnitStandardCost | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 单台合计标准成本 |
| annualProductionBudgetTotal | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 全年总生产产值预算（万元） |

**直接材料 `DirectMaterialBudgetItem`**：materialCode/materialName/specModel/unit/unitPrice 手工；monthlyUsageQty（月耗用量）手工；annualUsageQty/annualUsageAmount 公式；safetyStockQty（期末安全库存）手工；monthlyPurchaseAmount（月采购付款节奏）/annualPurchaseAmount。

**制造费用 `ManufacturingOverheadItem`**：department（车间/产线）、overheadCategory（折旧与摊销/动力能源/产线耗材工装/机台维修保养/车间管理人员薪酬/安全与环保）下拉；months 手工；annualTotal 公式；allocationBase（工时比例/产值比例/机时比例/直接归集）下拉。

**(d) 报表流向**：生产成本经产成品销售转入利润表"营业成本"；材料采购付款进现金流量表"购买商品、接受劳务支付的现金"；存货变动影响资产负债表"存货"。

### 3.14a BB.2.2 物料与设备采购预算表（`MaterialEquipmentProcurementItem`）

**(a) 业务目标**：按法人×采购项目编制 12 个月「下单额 / 入库额 / 付款额」三维采购预算；下单额反映采购承诺与在途敞口，入库额驱动存货与资产入账，付款额进入资金支出计划。基础表单，不含转固折旧测算（与 BB.3.1 固定资产采购区分）。

**(b) 关键字段说明 `MaterialEquipmentProcurementItem`**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| legalEntity | string | 选择（下拉） | 是 | 采购主体（法人单位） |
| department | string | 手填 | 是 | 申购部门 |
| category | 枚举 | 选择（下拉） | 是 | 采购类别：物料采购 / 设备采购 |
| itemCode / itemName | string | 手填 | 是 | 物料/设备编码与名称 |
| specModel | string | 手填 | 否 | 规格型号（可选） |
| supplier | string | 手填 或 选择（下拉） | 否 | 供应商（可选） |
| unit | string | 手填 | 是 | 计量单位（件/套/台/批） |
| taxRatePct | number | 手填 | 是 | 适用税率%（如 13%） |
| months (m1~m12) | `MonthlyOrderInboundPayment` | 手填 | 是 | 每月三项：orderAmount 下单额 / inboundAmount 入库额 / paymentAmount 付款额（万元） |
| totalOrderAmount / totalInboundAmount / totalPaymentAmount | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 全年下单/入库/付款额合计 |
| notes | string | 手填 | 是 | 备注（如分期付款约定） |

**(c) 计算与联动规则**：Luckysheet 表格 51 列（属性列 + 全年三合计高亮 + 12月×3列），冻结前置属性列，合计行 `=SUM()` 公式自动汇总；支持物料/设备类别过滤与 Excel 导出。

**(d) 报表流向**：付款额进现金流量表"购买商品、接受劳务支付的现金"（物料）/"购建固定资产、无形资产支付的现金"（设备）；入库额进资产负债表"存货"（物料）/"固定资产/在建工程"（设备）；物料随耗用结转利润表"营业成本"。

### 3.15 BB.3.1 固定资产采购与资本化预算（`FixedAssetProcurementItem`、`CapexBudgetItem`）

**(a) 业务目标**：按设备类/物料类/基建类三大类编制固定资产采购的"下单、验收、付款"三指标 12 个月明细，联动生成月度出款现金流与转固折旧（CAS 4）；另有全口径 CapEx 综合投资表覆盖无形资产/在建工程。页面含 5 个视图页签：①资产类采购预算编制表（12 个月下单/验收/付款）②1~12 月采购资金付款出款计划 ③固定资产转固入账与折旧测算（CAS 4）④全口径 CapEx 综合投资表 ⑤Luckysheet 表格。

**(b) 关键字段说明 — 采购主表 `FixedAssetProcurementItem`**（单位：万元）

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| legalEntity / department | string | 选择（下拉） | 是 | 法人主体、申购/使用部门 |
| assetCategory | 枚举 | 选择（下拉） | 是 | 设备类采购 / 物料类采购 / 基建类采购 |
| assetCode / assetName / specModel / supplier | string | 手填 | 是 | 资产编码、名称、规格型号、供应商 |
| quantity / unit / unitPriceTaxExcluded | number/string | 手填 | 是 | 采购数量、单位、单价 |
| totalOrderAmount / totalAcceptanceAmount / totalPaymentAmount | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 全年下单/验收/付款金额合计（三大核心指标） |
| months (m1~m12) | `MonthlyProcurementDetail` | 手填 | 是 | 每月各含：orderAmount 下单金额、acceptanceAmount 验收金额、paymentAmount 付款金额 |
| orderMonth / orderAmount | number | 手填 | 是 | 下单月份与采购合同签约总额（辅助字段） |
| advancePaymentRatio / advancePaymentTiming / advancePaymentAmount / advancePaymentMonth | number/枚举 | 手填 或 系统计算（公式） | 是（系统自动生成，无需手工） | 预付款比例%、支付时点（下单当月/下单次月）、测算预付款金额=下单金额×比例、实际支付月份 |
| acceptanceMonth / acceptanceAmount | number | 手填 | 是 | 验收月份（到货/安装调试/终验转固）、验收金额（资产入账与转固原值） |
| acceptancePaymentTiming | 枚举 | 选择（下拉） | 是 | 当月付款 / 次月付款 / 第三月付款 |
| acceptancePaymentRatio / acceptancePaymentAmount / acceptancePaymentMonth | number | 手填 或 系统计算（公式） | 是（系统自动生成，无需手工） | 验收款比例%、验收付款金额=验收金额×比例、实际支付月份（当月/＋1/＋2） |
| warrantyRatio / warrantyAmount / warrantyPaymentMonth | number | 手填 或 系统计算（公式） | 是（系统自动生成，无需手工） | 质保金比例%、质保金=下单金额×比例、预计支付月份（通常跨年） |
| monthlyPaymentSchedule / annualPaymentTotal / futureYearPayment | MonthlyBudget/number | 系统计算（公式） | 是（系统自动生成，无需手工） | 月度现金付款计划（预付款+验收付款+尾款）、年度付款总额、递延至 2028 及以后付款 |
| usefulLifeYears / residualRatePct | number | 手填 | 是 | 折旧年限、预计净残值率%（默认 5%） |
| monthlyDepreciation / budgetYearDepreciation | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 转固次月起每月折旧额、2027 年预算内累计折旧 |


**(d) 报表流向**：资产负债表"固定资产/在建工程/无形资产"（验收转固）；现金流量表"购建固定资产、无形资产和其他长期资产支付的现金"（付款计划）；利润表按费用性质列示折旧（销售/管理/研发费用 6601/6602/6603；制造费用折旧经存货线随产成品销售出库结转营业成本—制造费用），转固后按月计提（当月转固、下月起提）。

### 3.16 BB.3.1 / BJ.C 股权投资与产投出资分红预算（`EquityInvestmentItem`）

**(a) 业务目标**：依据国资委与企业全面预算填报规范，编制对外股权投资的出资计划与分红回流。

**(b) 关键字段说明**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| legalEntity | string | 选择（下拉） | 是 | 填报/出资法人主体 |
| industry | string | 选择（下拉） | 是 | 被投企业行业（国资委行业分类体系） |
| targetCompany | string | 手填 | 是 | 投资对象（企业/项目名称） |
| region | 枚举 | 选择（下拉） | 是 | 市内 / 境内市外 / 海外 |
| startDate / endDate | string | 手填 | 是 | 项目启动/预计结束时间（年月，如 202701） |
| totalProjectInvestment | number | 手填 | 是 | 项目投资总额 |
| ourShareholdingRatio / ourCapitalContribution | number | 手填 | 是 | 己方投资比例%、己方出资额 |
| priorYearCumulatedInvestment / priorYearCumulatedDividend | number | 手填 | 是 | 至上年末累计投入 / 累计分红·利息 |
| yearEndCumulatedInvestment | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 累计投资 = 上年末累计投入 + 全年 1~12 月投资金额 |
| yearEndCumulatedDividend | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 累计分红 = 上年末累计分红 + 全年分红合计 |
| yearEndEquityRatio | number | 手填 | 是 | 年末持股比例-股权投 (%) |
| investmentMonths | MonthlyBudget | 手填 | 是 | 1~12 月投资金额（现金流出） |
| dividendMonths | MonthlyBudget | 手填 | 是 | 1~12 月计划现金分红/利息（现金流入） |

**(d) 报表流向**：资产负债表"长期股权投资"；现金流量表投资活动"投资支付的现金 / 取得投资收益收到的现金"；利润表"投资收益"（分红口径）。

### 3.17 BB.4.1 期间费用 OPEX 预算表（`OpexBudgetItem`）

**(a) 业务目标**：按"法人×部门×科目"编制销售/管理/研发(费用化)/财务四类期间费用的月度预算，附上年对比与管控机制标签。

**(b) 关键字段说明**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| legalEntity / department | string | 选择（下拉） | 是 | 法人公司、归属部门 |
| category | 枚举 | 选择（下拉） | 是 | 销售费用 / 管理费用 / 研发费用(费用化) / 财务费用 |
| subjectCode / subjectName | string | 选择（下拉） | 是 | 会计科目代码（660101 等）与二/三级科目名称 |
| costNature | 枚举 | 选择（下拉） | 是 | 刚性费用 / 弹性费用 / 战略性投入 / 法定支出 |
| controlMethod | 枚举 | 选择（下拉） | 是 | 总额包干 / 定额控制 / 按收入比例管控 / 项目制报销 |
| months / annualTotal | MonthlyBudget/number | 手填 或 系统计算（公式） | 是（系统自动生成，无需手工） | 月度费用与全年合计 |
| lastYearActual | number | 手填 或 取数 | 是 | 上年实际发生数 |
| growthRatePct | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 同比增减率 (%) |

**(d) 报表流向**：利润表对应期间费用科目；现金流量表"支付的其他与经营活动有关的现金"等经营流出项。

### 3.18 BB.5.1 / BF.1 财务预算与资金出入池（`TreasuryCashBudgetItem`、`TaxBudgetItem`）

**(a) 业务目标**：汇集各业务预算产生的资金流入/流出形成资金池头寸计划，并编制增值税、附加税、企业所得税等税金预算；财务视角接收 BB.1.3 按岗位+职级匹配 BAA.3 费率计算的服务人工成本。

**(b) 关键字段说明 — 资金 `TreasuryCashBudgetItem`**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| legalEntity | string | 选择（下拉） | 是 | 法人主体 |
| flowType | 枚举 | 选择（下拉） | 是 | 现金流入 / 现金流出 |
| category | 枚举 | 选择（下拉） | 是 | 经营性现金 / 投资性现金 / 筹资与融资 / 税费支付 |
| itemCode / itemName | string | 手填 | 是 | 项目编码与名称（销售回款、采购付款、薪酬社保支付、设备投资付款、银行借款注入、偿还本息） |
| months / annualTotal | MonthlyBudget/number | 手填（联动校验） 或 系统计算（公式） | 是（系统自动生成，无需手工） | 月度金额与全年合计 |
| responsibleDept | string | 手填 | 是 | 责任部门 |

**服务人工成本关系**：BB.5.1 财务视角“服务人工成本”按法人×部门×月份汇总接收 BB.1.3.i 人工明细_财务查询的 `monthlyHours × BAA.3.hourlyCost` 结果（该 TAB 汇总 .g 人工明细的存量+增量来源）；该金额等额冲减原费用计提并进入 BO.PL.PL0202 营业成本—直接人工，不重复增加 BO.BS.2211 应付职工薪酬。

**税金 `TaxBudgetItem`**：taxType（增值税销项/增值税进项抵扣/应交增值税/城市维护建设税及附加/企业所得税/研发加计扣除减免）下拉；calculationBasis（测算基数与适用税率）手工；months/annualTotal；taxRatePct。

**(d) 报表流向**：现金流量表三大活动分类；利润表"税金及附加/所得税费用"；资产负债表"应交税费/货币资金"。

### 3.19 BF.3 关联交易与内部抵销预算（5 张子表）

**(a) 业务目标**：涵盖代采购（委托/受托协同）、内部销售、内部职场租赁（使用权资产与租金分摊）与资产转卖四大场景，支持公式联动与合并抵销核算；基础加成比例表（BA.1.1）统一定价。


**② 代采购预算表 `IntercompanyProcurementBudgetItem`**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| legalEntity / subCategory | string | 选择（下拉） | 是 | 填报组织、场景小类（8 种） |
| providerEntity / beneficiaryEntity | string | 选择（下拉） | 是 | 代采/垫付提供方、实际受益方 |
| amountTaxExcluded / taxRatePct | number | 手填 | 是 | 不含税金额、税率% |
| amountTaxIncluded | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 含税 = 不含税 × (1 + 税率) |
| markupRatePct | number | 自动联动（联动主数据） | 是（系统自动生成，无需手工） | 联动基础加成比例表 |
| markupAmountTaxExcluded / markupAmountTaxIncluded | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 加成金额 = 金额 × 加成比例% |
| transactionPeriod / months | string/MonthlyBudget | 手填 | 是 | 交易期间与月度分布 |
| settlementMethod | 枚举 | 选择（下拉） | 是 | 月度集中结算 / 季度清算 / 实时垫付划转 / 年底并账 |
| plFlowDescription / bsFlowDescription / cfFlowDescription / eliminationRule | string | 系统生成 | 是 | 报表流向与集团合并抵销分录说明 |

报表流向：代采方收取管理费收入（利润表），受益方列管理费用/研发费用；代采方其他应收款、受益方其他应付款（资产负债表）；支付代采现金/收到内部结算现金（现金流量表）；集团合并时内部往来及加成毛利自动抵销。

**③ 内部销售预算表 `IntercompanySalesBudgetItem`**：projectName（软硬件销售、技术服务分包、委托研发服务、仓储物流等）；budgetSubjectCode/Name 自动带出（PL0101 主营业务收入 / PL0201 营业成本 / PL05 研发费用）；providerEntity/receiverEntity 12 法人下拉；金额/税率/含税/加成四列同上（含税与加成为公式，加成率自动取数）；providerPLStatement（提供方进利润表"主营业务收入"）、providerCFStatement（进"销售商品、提供劳务收到的现金"）、receiverPLStatement（接受方进"研发费用/管理费用/营业成本"）、receiverCFStatement（进"购买商品、接受劳务支付的现金"）、eliminationEntry（合并抵销分录：借营业收入，贷营业成本/研发费用，贷存货/资产未实现内部销售利润）。

**④ 内部职场租赁预算表 `IntercompanyLeasingBudgetItem`**：businessScenario（租赁第三方房产/自有房产租赁）下拉；leasePeriodType（费用化<1年 / 资本化使用权资产租赁>1年）、leaseAccountingType（使用权资产租赁/经营租赁费用化）下拉，符合 CAS 21 新租赁准则；年租金含税/不含税、税率；出租方口径：providerRentalRevenue（本期租赁收入不含税）、providerDepreciationCost（本期折旧成本）、providerReceivableEndingBalance（期末应收租金）；承租方口径：使用权资产原值/累计折旧、租赁负债余额、本期折旧费用、本期利息费用、本期租赁费（费用化）、期末应付租金；交易结算与加成明细同②；eliminationExplanation（出租方进利润表其他业务收入/主营业务收入，承租方进折旧/利息/管理费用，集团层面抵销）。

**⑤ 资产转卖预算表 `IntercompanyAssetTransferBudgetItem`**：assetDesc/assetOriginalValue；assetCategory（生产设备/研发仪器/运输工具/电子设备/不动产及厂房）下拉；depreciationMethod（直线折旧无残值/直线法5%残值/双倍余额递减法/年数总和法）下拉；usefulLifeYears、capitalizationDate；sellerEntity/buyerEntity 下拉；transferAmountTaxExcluded/Included 手工；taxRatePct、transferDate、remainingDeprMonths；assetNetValue = 原值 − 累计折旧（公式）；assetDisposalGainLoss = 转卖金额(不含税) − 资产净值（公式）；monthlyDepreciation（1~12月折旧摊销）与 annualDepreciationTotal。报表流向字段：买方固定资产原值增加（BS）、买方"购建固定资产…支付的现金"（CF）、卖方"处置固定资产…收回的现金净额"（CF）、卖方减固定资产（BS）、卖方"资产处置收益"（PL），上述在集团层面自动抵销；eliminationRule：进利润表"折旧与摊销"，同时核销资产负债表"固定资产-折旧差"（买方按转卖金额计算的折旧差，集团层面自动抵销）。

### 3.20 BF.4 预算综合调整表（`BudgetAdjustmentRow`、`MacroAdjustmentLevers`）

**(a) 业务目标**：供预算管理员在底层编制数汇聚后进行管理调控——按科目直接调增调减，或用宏观驱动杠杆整体调整。

**(b) 关键字段说明 — 调整行 `BudgetAdjustmentRow`**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| targetStatement | 枚举 | 选择（下拉） | 是 | 利润表 / 资产负债表 / 现金流量表 / 综合经营指标 |
| subjectCategory / subjectCode / subjectName | string | 选择（下拉） | 是 | 科目分类、代码、名称 |
| baselineBudget | number | 自动汇聚（系统计算） | 是（系统自动生成，无需手工） | 基础预算数（从底层销售/存量等表自动汇聚） |
| adjustType | 枚举 | 选择（下拉） | 是 | amount 直接金额 / percentage 比例微调 |
| adjustValue | number | 手填 | 是 | 调整值 (+/−) |
| effectiveAdjustAmount | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 计算后的调整金额 |
| adjustedBudget | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 调整后最终预算数 |
| adjustmentReason | string | 手填（必填） | 是 | 调整说明与依据 |
| driverFactor | string | 选择（下拉） 或 手填 | 是 | 驱动因子（销售目标上浮、采购控本降本、DSO 账期优化、CapEx 推迟） |
| lastUpdated | string | 系统生成 | 是（系统自动生成，无需手工） | 最后调整时间 |

**宏观杠杆 `MacroAdjustmentLevers`**（均手工）：revenueGrowthTargetPct 营业收入宏观调控系数%、targetCostReductionPct 采购与制造降本率%、salesExpenseRatioCap 销售费用率上限%、rdIntensityPct 研发投入强度%、dsoDaysReduction 应收账款周转天数压缩、capexAdjustmentPct CapEx 调整%、debtFinancingAdjustment 债务融资调整（万元）、dividendPayoutRatio 分红比例%。

**(d) 报表流向**：调整数直接叠加至 BO.1/BO.2 三表科目的"调整数"列，形成"调整后合计"。

### 3.21 BF.5 金融工具投融资预算表-银行（`FinancialInstrumentInvestmentItem`）

**(a) 业务目标**：编制各法人银行存款与银行理财的新增/减少投资额、投资收益与回报率预算；投资类型为一级下拉，投资产品为二级级联下拉，合计行公式自动汇总。

**(b) 关键字段说明**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| legalEntity | string | 选择（下拉） | 是 | 投资主体（法人单位） |
| category | 枚举 | 选择（一级下拉） | 是 | 银行存款 / 银行理财 |
| productType | string | 选择（二级下拉，级联） | 是 | 活期存款 / 定期存款 / 通知存款 / 结构性存款 / 其他银行理财产品 |
| bankName | string | 手填 | 是 | 银行名称 |
| interestRatePct | number | 手填 | 是 | 利率%（仅存款） |
| months (m1~m12) | 对象 | 手填 | 是 | 每月：newInvestment 新增投资额、redemption 减少投资额、investmentIncome 投资收益、returnRatePct 回报率 |
| annualNewInvestment / annualRedemption / annualInvestmentIncome / avgReturnRatePct | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 全年合计与平均回报率 |

**(d) 报表流向**（组件内嵌编制说明）：
- 现金流量表：新增投资额→「投资支付的现金」；减少投资额→「收回投资收到的现金」；投资收益→「取得投资收益收到的现金」。
- 资产负债表：活期/通知存款期末余额→「货币资金」；定期存款→「定期存款/其他流动资产」；结构性存款与净值型理财→「交易性金融资产」。
- 利润表：存款利息收益→「财务费用-利息收入（负数冲减）」；银行理财投资收益→「投资收益」并同步累计分红口径。

### 3.22 BF.4 营业外收支预算表（`NonOperatingBudgetItem`）

**(a) 业务目标**：编制「其他业务收入 / 其他业务支出 / 营业外收入 / 营业外支出」四类非主营收支的月度预算（四类各一个 Sheet 页签），按月填报发生额并自动汇总，分别流向利润表对应科目及现金流量表经营活动收支项。

**(b) 关键字段说明**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|--------|------|------|------|------|
| budgetType | 枚举 | 选择（下拉） 或 页签 | 是 | 其他业务收入 / 其他业务支出 / 营业外收入 / 营业外支出 |
| legalEntity | string | 选择（下拉） | 是 | 归属法人主体 |
| itemName | string | 手填 | 是 | 收支项目名称（政府补助、违约金收入、捐赠支出、资产盘亏） |
| category | string | 选择（下拉） | 是 | 政府补助 / 罚没收支 / 捐赠 / 非流动资产处置 / 其他 |
| counterparty | string | 手填 | 是 | 交易对方/来源单位 |
| taxRatePct | number | 手填 | 是 | 适用税率%（含免税 0%） |
| months / annualTotal | MonthlyBudget/number | 手填 或 系统计算（公式） | 是（系统自动生成，无需手工） | 月度发生额与全年合计 |
| plImpact / cfImpact | string | 系统生成 | 是 | 利润表流向（四科目之一）、现金流量表流向（收到其他与经营活动有关的现金 等） |
| accountingBasis | string | 手填 | 是 | 会计准则依据（如 CAS 16 政府补助） |

### 3.22a BB.4.4 存量资产折旧计算表（`ExistingAssetDepreciationItem`）

**(a) 业务目标**：以存量资产卡片为基础，按资产归属部门及费用归属组织存量资产原值、累计折旧和本年折旧计提结果，支撑各部门折旧信息的准确计算、归集和汇总。

**(b) 业务规则**

- **管理单元是部门归属信息**，用于表达资产归属的部门；管理单元不是资产账簿。资产账簿由 **AA.8 管理单元主数据**的「资产账簿」列直接带出（不手工另行确定），不能将资产账簿作为管理单元的替代字段或手工臆定来源。AB.10 资产账簿字典按法人设立，不考虑税账簿。
- **默认资产账簿折旧规则**：AB.10 中设有一列“默认标记”（全表只允许一个值为默认/是）。该默认账簿对应的折旧参数用于全系统“新增资产”（增量CAPEX转固等）的折旧计算；对于 BB.4.4 等存量资产折旧，直接用该条记录所对应的资产账簿其关联的折旧参数进行折旧值计算。
- 同一项原资产如果分配给多个部门，应按各部门现有的分配比例拆分该项资产的**原值和累计折旧**，分别形成各部门对应的折旧基础，确保部门折旧信息能够准确计算、归集和汇总。各部门分配比例沿用现有业务分配信息；本需求不新增比例数值、计算周期或分摊依据。
- 拆分后的各部门原值、累计折旧仍应保持与原资产整体口径一致，资产卡片及资产账簿关系可追溯；费用归属按资产领用部门属性自动带出（AM.2 部门属性映射），不允许手工修改；折旧结果按费用归属进入对应费用汇总，并被 BB.4.X.A 折旧费用汇总表（资本性支出汇总表下的页签，原 BB.4.2 已并入）按部门/费用归属归集。具体折旧方法及参数沿用现有 AA.9 口径。
- **折旧入表口径（原则）**：利润表按费用性质列示折旧（营业成本—制造费用、销售费用、管理费用、研发费用），存量资产与本年新增资产**仅是同一费用行内折旧的来源构成，不单列为报表行次**；利润表不设按资产新旧区分的行次。销售/管理/研发费用折旧统一从 BB.4.X.A 折旧费用汇总表取对应费用小计（已含存量+本年新增，单一取数源）；制造费用性质的折旧只进存货线（在制品「费」腿），随完工转产成品、随产成品销售出库结转营业成本—制造费用，不在利润表直接取数。
- **在制品「费」腿防重复口径**：在制品「费」腿的制造费用来源 = BB.5.2 经营费用转换结果表「制造费用」项 + BB.4.X.A 折旧费用汇总表「制造费用折旧」小计（存量+本年新增），两处不得重叠取数；制造费用性质的折旧只进「费」腿，不得再在利润表直接取数。
- **差异留存口径**：完工交库按 BAA.2 单位标准成本（含材料/人工/制费三段）转出，实际归集（含实际折旧）与标准制造费用的差额留在在制品/产成品余额，属预算近似口径，不代表存货与损益只承担标准数。
- **固定资产期初口径**：固定资产/无形资产期初按净值，年初 = 存量资产原值汇总 − 累计折旧汇总（期初净值 = 原值 − 累计折旧），不直接取原值。

**(c) 关键字段说明**

| 字段名 | 字段类型 | 数据来源（选择/手填） | 是否必输 | 备注 |
|---|---|---|---|---|
| source | string/枚举 | 自动带出或选择 | 是 | 数据来源，如接口导入/手工补录；具体值沿用现有表样 |
| assetDesc | string | 自动带出或手填 | 否 | 资产描述；文本字段，仅用于人眼识别资产（如设备名称/规格/用途），不参与任何测算与分录 |
| assetCategory | string/枚举 | 自动带出或选择 | 是 | 资产类别 |
| managementUnit | string | 选择（下拉） | 是 | 部门归属信息；来源 AA.8 管理单元主数据 |
| assetLedger | string | 系统带出（AA.8 管理单元主数据） | 是 | 由 AA.8 管理单元主数据的「资产账簿」列直接带出，不手工另行确定 |
| assetUseDepartment | string | 自动带出或手填 | 是 | 资产领用/使用部门；多部门分配时按现有分配关系归集 |
| originalValue | number | 自动带出或手填 | 是 | 原值；同一项原资产分配给多个部门时按各部门分配比例拆分 |
| accumulatedDepreciation | number | 自动带出或手填 | 是 | 累计折旧；与原值按同一部门分配比例拆分 |
| activationDate | date | 自动带出或手填 | 是 | 启用日期 |
| expenseAttribution | string/枚举 | 系统带出（AM.2 部门属性映射，按资产领用部门属性自动带出） | 是 | 费用归属：销售/管理/研发/制造等现有值域；不允许手工选择或修改 |
| annualDepreciation | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 本年计提额(万元)：BB.4.4.b 年度合计列，=SUM(1~12月月折旧额)；按部门和费用归属归集 |
| monthlyDepreciation | number | 系统计算（公式） | 是（系统自动生成，无需手工） | 月折旧额：BB.4.4.b 1~12月各列，按资产账簿对应折旧参数结合原值与启用日期（当月新增下月起提）测算；按部门和费用归属归集 |

**(d) 引用关系与报表流向**：上游引用 AA.8 管理单元主数据（含管理单元与资产账簿）及存量资产卡片数据；资产账簿由 AA.8 管理单元主数据的「资产账簿」列直接带出（不手工另行确定）。BB.4.4 输出部门拆分后的原值、累计折旧和月度折旧，供 BB.4.X.A 折旧费用汇总表（资本性支出汇总表下的页签）按部门/费用归属归集，并进入 BO.PL 对应费用科目（销售/管理/研发费用 6601/6602/6603，及经存货线结转的营业成本—制造费用）及 BO.BS 固定资产净值取数（年初净值 = 原值汇总 − 累计折旧汇总）；除上述已明确关系外，不扩展其他字段级引用。

### 3.23 BA/BB/BF 编制表上游引用与下游用途登记

> 本节按现有需求说明、表单登记及已明确的业务规则盘点。只记录已有明确口径；没有明确依据的关系统一标记为“待确认”，不将可能的技术联动当作业务关系。每张表均按“上游引用”和“本表输出”说明；同一页面承载多个业务表时，按表单编码分别登记。

### 3.23.1 BA 编制前提与参数表

| 表单 | 表概述、上游引用（来源表/字段或信息、在本表单中的用途） | 本表输出（本表字段/数据、被哪些下游表单或报表引用、业务用途） |
|---|---|---|
| BA.1.1 关联交易加成比例 | 上游：关联交易场景、交易双方及适用加成规则由本表维护；原 AB.2 关联交易基础加成比例字典已迁移至此，其他来源字段未明确。 | 输出：内部交易基础加成比例；明确被 BF.3 关联交易与内部抵销用于代采购、内部销售、内部租赁、资产转卖定价；具体字段级引用及其他下游用途待确认。 |
| AB.15 税率及附加税比率字典 | 来源：法规、政策或审定依据（由 `sourceBasis` 登记）；本表维护税率、附加税比率、优惠参数及适用法人，作为税金测算参数。 | 输出：`budgetYearValue`、适用税率及附加税参数；明确下游为 BF.4 税金及附加预算表，BF.4.a 取附加税比率、BF.4.b 取增值税税率及退税参数；用途为按统一参数测算税金，不在 BF.4 内写死比例。 |
| BAA.10 进销存按法人拆分比例表 | 上游：现有资料明确为维护各法人主体占比，其他来源信息无明确口径，暂未定义。本表编码 2026-09-16 调整为 BAA.10 并归入「BAA 编制假设」目录（原 BAA.10 税率及附加税比率字典已改号 AB.15 归入「静态数据 > 字典」）；比例维护维度=预算项目 × 预算部门（预算部门默认明细到二级部门）。 | 输出：按「预算项目×预算部门」逐行维护的各法人主体比例及合计（每行加和须=100%，仅文字提示不强制校验）；本年度不启用：BB.3.X 进销存预算已改为法人级单表（法人公司×存货类别，一表到底），各品类转入/转出逐来源按法人取数、不乘比例，不再引用本表；本表仅作「无来源品类」的兜底比例予以保留（参照 BAA.7 采购付款额测算比例附表「本年度不启用、后续年度启用」的处理方式），后续年度启用该规则时再由本表统一提供兜底比例口径。分法人 BO.BS 存货直接由 BB.3.X 法人级单表按法人列示（各法人加总=集团列报）；分法人损益表引用关系待确认。注：变更记录曾使用 BA.12 编码（历史重排），2026-09-16 起编码统一登记为 BAA.10，以表单登记为准。 |
| BAA.2 产品标准成本设置 | 上游：产品编码、名称、规格型号、产品类别、法人、单位及 BOM 定额等由本表选择/手填；产品身份与产品下拉来源的具体维护表为 AA.7，现有说明明确其作为产品身份来源。表样列序（共 3 列）= 产品 \| 标准成本(元) \| 备注；「标准成本(元)」为单位产品标准成本（元/台，手工维护，口径不区分法人）。 | 输出：`标准成本(元)`（单位产品标准成本）与 `备注`；明确被 BB.1.3 用于单台标准成本、被 BB.2.1（BB.2.1.B 财务视角·生产成本 的「单位标准成本(元/台)」）用于完工生产成本计算（完工生产成本 = 完工产量 × 单位标准成本）；再经销售/生产预算间接进入 BO 利润表营业成本。 |
|| BAA.3 岗位工时费率设置 | 上游：`position`、`rank` 可手填或下拉选择，`hourlyCost` 与 `remarks` 由本表维护；岗位/职级均按现行示例值处理、系统不做表与表之间的值域严格校验（费率匹配按示例值演示）；费率政策/审批依据未在现有需求中明确，不能补写为某一主数据表或政策表。用途是形成岗位+职级的工时标准成本匹配库。 | 输出：`position`、`rank`、`hourlyCost`（及可选 `remarks`）。仅关联实际承载技术服务人工明细及成本结果的 **BB.1.3.i 人工明细_财务查询**：该 TAB 汇总 `.g` 存量订单与 `.h` 增量人工来源后，按 `position + rank` 匹配 `hourlyCost`，与 `monthlyHours` 相乘形成技术服务人工成本；`.b 销售填报_增量`、`.g`、`.h` 不作为 BAA.3 费率承载/关联 TAB。该成本再按法人×部门×月份汇总至 BB.5.1 财务视角“服务人工成本”，等额冲减原费用计提并进入 BO.PL.PL0202 营业成本—直接人工，不重复增加 BO.BS.2211。除 BB.1.3.i、BB.5.1 和 BO.PL.PL0202 外，其他下游字段级引用未在现有资料中确认，待确认。 |
| BAA.4 服务物料定额标准 | 上游：AA.11《物料主数据》的 `materialCode`；按编码带出 `materialName`、`materialType`、`unit`。AB.6 只提供 `partCategory` 的好件/坏件值域。BAA.4 自行维护 `standardCost`（万元/标准单位）和 `remarks`（核算说明）；有效匹配键为 `materialCode + partCategory`，不按法人拆分，不从采购到货金额或库存金额反算。 | 已确认下游：① BB.1.3 技术服务物料明细以 `materialCode + partCategory` 取 `standardCost`，按 `monthlyQuantity × standardCost` 形成月度成本；主表 `monthlyMaterialCost` 按好件成本减坏件成本汇总，进入 BO.PL `PL0203` 直接物料成本，并对应服务物料耗用/存货减少。② BB.1.3 财务查询明细展示 BAA.4 的部件类别、单位成本及 AA.11 的物料身份字段。未确认下游：BAP.2 物料消耗需求汇总表_常规当前表样只有预算项目、部门、物料名称、领料用途及月度数量，没有物料编码、部件类别或成本字段，因此不能确认引用 BAA.4；BB.2.1 不直接引用 BAA.4，也不直接构成对其他表的引用；BB.3.3 物料采购、BB.3.X 进销存现有资料也未形成 BAA.4 字段级引用，不能泛化为“标准成本被使用”。 |
| BA.5 费用预算汇总表 | 上游：BB.4.1 期间费用与 BB.5.1 雇员费用编制/导入；本表为只读汇总视图，不维护独立数据模型。 | 输出：销、管、研、财及人工的全景汇总；明确供管理查看，报表流向与来源表一致，进入 BO 利润表期间费用；其他下游表单引用暂未定义。 |
| BAA.6 办公场所租赁维护 | 上游：年度、场所、公司、租赁期间(起止)（租赁合同的起止日期区间，自由文本；仅人眼识别，不参与判定与测算）、租赁面积、单价、租赁折现率等由本表维护；场所基本信息与法人比例为本表内部 Tab/信息，外部来源未明确（折现率默认取 BF.3 综合融资成本，可在本表按年度覆盖）。本表含四个子表：.a 场所基本信息维护 / .b 年度租赁面积维护（含「单价(元/㎡·月)」列）/ .c 场所法人比例查看 / .e 租赁折现率维护。 | 输出：租赁场所、年度租赁面积与单价及法人比例、租赁折现率；下游已明确——.b 仅供 BB.4.2.b 内部职场租赁按「年度×场所×公司」带出租赁面积与单价（单价：内部持有场所=市场单价；内部租金 = 单价 × 租赁面积 ÷ 10000 × 当月在租期内），BB.4.2.a 外部职场租赁的租赁面积与合同单价按对外租赁合同在本表手工录入、不引用 BAA.6.b；.c 带出面积占比、.e 按年度带出到 BB.4.2.b.1 内部职场租赁·财务视角（租赁付款额折现 → 租赁负债初始与各月利息）；本表为参数表、不生成会计分录。 |
| BAA.7 采购付款额测算比例附表 | 上游：一级部门及设备类/物料类付款比例由本表手填；比例政策来源未明确。 | 输出：设备类、物料类采购付款测算比例；被哪些采购表单按字段引用未在现有口径中明确，待确认。 |
| BAA.8 经营费用转换比例表 | 上游：BA.5 费用预算汇总表的预算项目金额；费用性质默认由 AM.2 部门属性映射表按二级部门带出，可人工修改。 | 输出：按费用性质转换至销售/管理/研发/制造费用并按法人拆分的比例/结果；明确下游为 BB.5.2 经营费用转换结果表，具体字段级引用待确认。 |
| BAA.9 资本性支出拆分比例表 | 上游：各法人主体占比由本表维护；比例依据未明确。 | 输出：法人主体资本性支出拆分比例；被 BB.4.X 资本性支出汇总及分法人结果引用的关系在现有说明中未完整明确，待确认。 |
| BAP.2 物料消耗需求汇总表_常规 | 上游：物料消耗采集/公共平台数据来源，字段级来源未明确。 | 输出：物料消耗汇总；现有记录明确被 BB.3.3 物料类采购预算及 BB.3.X 一般物料出库口径使用（非生产类消耗）；具体字段映射及与专项领用的互斥规则待确认。 |
| BAP.3 物料消耗需求汇总表_研发长期 | 上游：研发长期物料消耗需求，来源表及字段未明确。 | 输出：研发长期物料需求汇总；明确作为 BB.3.3 物料类采购预算的无 PO 来源之一；具体字段映射待确认。 |

### 3.23.2 BB 业务预算编制表

| 表单 | 表概述、上游引用（来源表/字段或信息、在本表单中的用途） | 本表输出（本表字段/数据、被哪些下游表单或报表引用、业务用途） |
|---|---|---|
| BB.1.1 合同签约额预算表 | 上游：AB.1 合同字典带出合同类型、部门、客户、FAB、签约主体、区域等默认信息；AA.4 客户/FAB、AA.7 产品及产品类别等下拉信息用于填报。 | 输出：按合同、月度拆分的签约额、合同属性和回款/内部路径信息；明确经收入确认规则进入 BO 利润表营业收入体系；具体被哪一张中间表直接引用待确认。 |
| BB.1.2 软硬件收入与成本预算（存量订单收入与成本） | 上游：期初存量订单、合同、客户、产品类别、已确认收入、已回款、收入方式、结转比例及成本率；收入方式受产品类别映射带出，AM.1 为测算模型。 | 输出：订未收、未回款、年度/月度收入与成本测算输入；明确输出至 AM.1，AM.1 结果进入 BO 利润表营业收入/营业成本。 |
|| BB.1.3 技术服务收入与成本预算 | 上游：各 TAB 按自身业务用途分别登记：`.b 销售填报_增量`登记增量销售收入、预收款、验收回款；`.d 物料明细`登记技术服务物料消耗（存量订单与增量合并为一张表、由 `订单编号` 区分）；`.g 人工明细`登记技术服务人工来源与工时（存量订单与增量合并为一张表、由 `订单编号` 区分）；`.f 物料明细_财务查询`汇总 `.d` 的物料成本，`.i 人工明细_财务查询`汇总 `.g`，登记职级并展示工时与人工成本。BAA.3 费率只关联 `.i`，按 `position + rank` 匹配 `hourlyCost`；`.b`、`.d`、`.g` 不作为 BAA.3 费率关联 TAB。物料明细另按自身表样取 AA.11/BAA.4。 | 输出：各 TAB 按各自用途提供销售、人工、物料、毛利及回款信息；`.i` 的人工成本按法人×部门×月份汇总至 BB.5.1 财务视角“服务人工成本”，等额冲减原费用计提并进入 BO.PL.PL0202 营业成本—直接人工；不重复增加 BO.BS.2211。 |
| BB.1.4 销售费用预算明细表 | 上游：当前表单登记与旧版需求说明名称/编码存在差异；费用事项、法人、期间等输入来源未形成一致明确口径，待确认。 | 输出：销售费用明细及月度金额；下游是否进入 BB.5.2、BO 利润表或其他汇总表，现有资料未形成一致口径，待确认。 |
| BB.2.1 生产制造产量计划表 | 上游：AA.7 产品主数据、AA.2 法人组织、AA.5 行政部门（主表维度=法人公司/部门/产品，财务视角维度=法人公司/预算部门/产品）；BAA.2 产品标准成本设置的「标准成本(元)」为单位标准成本，用于完工生产成本计算。销售预算对排产的驱动关系已明确。生产类领料或材料明细是否按物料编码+部件类别再引用 BAA.4，现有表样与字段说明未确认。 | 输出：本表含两个Tab（同页切换）——①BB.2.1.A 生产制造产量计划表（主表，手工填报、共 16 列=3 维度列 + 产量×〔【全年合计】+1~12月〕）；②BB.2.1.B 财务视角（生产成本，只读、全部系统带出/公式、共 42 列=3 维度列 + 完工产量(台)/单位标准成本(元/台)/完工生产成本(万元) 3 度量×〔【全年合计】+1~12月〕，完工生产成本 = 完工产量 × 单位标准成本 ÷ 10000）。其中本表“产量”字段被 BB.3.X《进销存预算表》引用，用于形成生产相关存货/产成品数量或收发存预算的基础输入；已明确完工生产成本按产量×BAA.2 单位标准成本用于 BB.3.X 在制品结转/产成品转入，并按法人公司汇总生成完工入库分录（BO.BS 存货—库存商品 1405 增加 / 生产成本—完工转出 500199 减少）。BB.2.1 对 BAA.4 的直接字段级输出关系暂不登记；材料采购付款和存货、营业成本报表用途按现有口径保留，具体字段映射待确认。 |
| BB.3.1 设备及无形资产采购预算 | 上游：法人、预算部门（默认明细到二级部门）、资产类别、供应商、采购节点及付款条款等由本表填报；BAA.7 采购付款比例可作为比例参数，但字段级引用待确认；无PO采购的法人拆分取 BAA.9.a 资产转换比例。 | 输出：三个 Tab（同页切换）——BB.3.1.A 有PO-设备及无形资产采购预算（采购视角）+ BB.3.1.B 无PO-设备及无形资产采购预算（采购视角）+ BB.3.1.C 财务视角（按法人汇总、生成分录）。两张采购视角表样列结构完全相同：维度=预算项目/预算部门/下单主体/受益主体/PO标记（固定值列：A 表恒为有PO、B 表恒为无PO，不可修改）/资产类别/资产名称或备注/供应商，度量=到货额/下单额/预付款比例/预付款/验收付款（各按【全年合计】+1~12月）；有PO按下单主体（AA.8 管理单元）与法人一一对应直接带出归属法人，无PO无法指认法人的按 BAA.9.a 资产转换比例拆到法人（资本性支出法人拆分的唯一入口在 BB.3.1.C）。财务视角 BB.3.1.C 共 43 列：维度=法人公司/预算项目/预算部门/PO标记（4 个维度列，PO标记 为下拉枚举有PO/无PO、非固定值列，用于区分「按下单主体直接指认法人」与「按 BAA.9.a 比例拆分到法人」两类来源通道），度量=原值(万元)/预付款(万元)/验收付款(万元)（各按【全年合计】+1~12月展开）；有PO 行同一笔采购只落一个法人行，无PO 行按比例拆分后同一预算项目/预算部门可能落到多个法人行。下单、验收、付款、转固和折旧数据明确进入 BO 资产负债表固定资产/在建工程、现金流量表购建长期资产支出及利润表折旧摊销。 |
| BB.3.2 基建工程采购预算 | 上游：预算项目、部门、验收额、付款额及基建转固明细由本表及其附表填报；AA.9 资产类别参数用于转固后折旧，具体字段映射待确认。 | 输出：基建采购、验收付款及转固原值；明确转固资产进入 BB.4.X/折旧汇总并进入 BO 三表；下游直接引用字段待确认。 |
| BB.3.3 物料类采购预算 | 上游：采购订单/ERP订单或合同（有 PO，进入 BB.3.3.A 有PO表样）、BAP.2 物料消耗汇总、BAP.3 研发长期物料需求、其他手工增加（无 PO，进入 BB.3.3.B 无PO表样）四类来源，须互斥防重复；现有字段为预算部门（默认明细到二级部门）、物料类别、供应商、到货/下单/付款及付款比例，未确认引用 BAA.4 标准成本；BAA.7 付款比例口径待确认。 | 输出：三个 Tab（同页切换）——BB.3.3.A 有PO-物料类采购预算（采购视角）+ BB.3.3.B 无PO-物料类采购预算（采购视角）+ BB.3.3.C 财务视角（按法人汇总、生成分录）。两张采购视角表样列结构完全相同（共 73 列）：维度=预算项目/预算部门/下单主体/受益主体/PO标记（固定值列：A 表恒为有PO、B 表恒为无PO，不可修改）/物料类别/供应商，度量=到货额/下单额/预付款比例/预付款/验收付款（各按【全年合计】+1~12月）；财务视角 BB.3.3.C 共 44 列：维度=法人公司/预算项目/预算部门/PO标记/物料类别（5 个维度列，PO标记 为下拉枚举有PO/无PO、非固定值列，用于区分「按下单主体直接指认法人」与「按 BAA.10 兜底比例拆分到法人」两类来源通道），度量=到货额(万元)/预付款(万元)/验收付款(万元)（各按【全年合计】+1~12月展开）。有PO（BB.3.3.A）按下单主体（AA.8 管理单元）与法人一一对应直接指认归属法人（同一法人行）、无需比例拆分；无PO（BB.3.3.B）无法从下单主体指认法人的按 BAA.10 进销存按法人兜底拆分比例拆到法人（同一预算项目/预算部门可能落到多个法人行；BAA.10 本年度不启用，兜底口径为后续年度预留），法人拆分仅在财务视角 BB.3.3.C 做一次；两张采购视角表样均不生成会计分录。到货/下单/预付款/验收付款；到货额进入 BB.3.X 一般物料转入，付款进入 BO 现金流量表采购支出。采购金额不能直接等同 BAA.4 标准成本，是否需要 BAA.4 作为采购数量×标准成本的计划金额基准，待确认。 |
| BB.3.X 进销存预算 | 上游：BB.3.3 到货额、本表手工出入库调整额（盘点盘盈盘亏、报废、跨期补记等手工调整直接在本表「转入数」/「转出数」列按「法人公司×存货类别」录入，不再单独设存货类出入库明细调整额预算表）、BB.2.1《生产制造产量计划表》的“产量”字段（用于形成生产相关存货/产成品数量或收发存预算的基础输入），以及 BB.2.1 完工生产成本；BAP.2 非生产类消耗、BB.1.3 服务物料成本、BB.4.1 领料、BB.5.1 制造费用、BB.5.2 经营费用转换结果表「制造费用」项、BB.4.X.A「制造费用折旧」小计均有明确口径（各来源表均含法人公司维度，逐来源按法人取数）；BAA.10（原变更记录 BA.12）法人比例已不再参与本表拆分、本年度不启用（仅作无来源品类兜底）。BB.1.3 的物料成本明确使用 BAA.4；但 BB.3.X 是否按 BAA.4 标准成本计价、按采购金额计价或仅做数量/金额收发存汇总，现有字段说明未明确。 | 输出：按「法人公司×大类/小类」的月度转入、转出、期初期末存货（法人级单表：法人公司×存货类别一表到底，平表无分组行、无自动合计行；年度余额=年初余额手工一次性 + 月度期初/转入/转出/期末滚动 + 年末余额公式）；期末存货按法人列示、各法人加总支撑 BO 资产负债表存货列报；产成品出库经业务规则进入 BO 利润表营业成本。硬约束：在制品→产成品的形态转换必须在同一法人公司内部结转（法人甲的在制品只能转为法人甲的产成品，14xx 存货总额不变），跨法人代工/调拨属内部交易、走 BJ.C 关联交易与内部抵销，不在本表内直接结转。产成品转出的法人归属按订单/合同所属法人（BB.1.2 财务视角）；BB.1.2 当前无分法人维度时为过渡口径「按各法人产成品结存比例结转」，BB.1.2 分法人销售成本为后续对齐项。BB.2.1“产量”字段作为生产相关存货/产成品数量或收发存预算的基础输入；BAA.4 与 BB.3.X 的计价字段和关系待确认，不将其写成已建立的直接引用。在制品「费」腿口径：制造费用来源 = BB.5.2 经营费用转换结果表「制造费用」项 + BB.4.X.A 折旧费用汇总表「制造费用折旧」小计，两处不得重叠取数，制造费用性质的折旧只进「费」腿、不得再在利润表直接取数；完工交库按 BAA.2 单位标准成本（含材料/人工/制费三段）转出，实际归集（含实际折旧）与标准制造费用的差额留在在制品/产成品余额，属预算近似口径。 |
| BB.4.1 自制设备工程预算 | 上游：预算部门维度下的人工投入、领料投入、转固明细三个附表；AA.9 资产类别参数；BB.5.1 财务视角的人工作为资本化/费用分流参考。 | 输出：自制在建工程投入、转固金额、人工/领料及项目维度数据；明确转固进入 BB.4.X/折旧计算及 BO 资产负债表，资本化人工影响 BB.5.1 财务视角；字段级引用待确认。 |
| BB.4.X.A 折旧计算汇总表（BB.4.X 资本性支出汇总表下的页签；原独立表编码 BB.4.2 已删除合并） | 上游：存量资产折旧计算表（BB.4.4）与增量资产折旧计算表（BB.4.5）。 | 输出：仅作为管理分析与统计核对的汇总表，**明确标记为不产生会计分录、不直接影响财务报表，只是纯汇总表**。制造、研发、管理、销售四大费用折旧实际分录与报表影响由底层源头表（BB.4.4 与 BB.4.5）分别驱动；本表负责将存量与增量折旧合并展示与勾稽校验。 |
| BB.4.3 其他固定资产新增表 | 上游：其他固定资产/无形资产新增事项由业务填报；具体来源表未定义。 | 输出：新增资产原值及月度信息；原值按资产类别、法人公司归集后汇入 BB.4.5 增量资产折旧计算表（来源=手工新增），由 BB.4.5 按 AA.9 参数计提折旧（下月折）后再汇入 BB.4.X.A 折旧费用汇总表；BB.4.3 本身不计提折旧，并形成 BO.BS 固定资产/无形资产原值增加（1601/1701）；原值增加与货币资金减少同步发生，现金流出归入 BO.CF 的 CF-14（购建固定资产、无形资产和其他长期资产支付的现金），CF-14 以本表月度预付款额 + 月度付款额取数。本表统一按「资产原值 + 预付款 + 付款」三个度量处理（预付款=先付部分、付款=验收付款等实际付款，二者均属现金流出、合计形成 CF-14）、不做取得方式分路，适用范围为非设备及无形资产采购类的其他固定资产、无形资产新增（由企业自主判断后填报）。 |
| BB.4.4 存量资产折旧计算表 | 上游：AA.8 管理单元主数据提供部门归属信息与资产账簿（管理单元主数据的「资产账簿」列直接带出）；另接收存量资产卡片、原值、累计折旧、启用日期、费用归属及现有部门分配信息。同一项原资产分配给多个部门时，按各部门分配比例拆分原值和累计折旧；不新增比例数值、计算周期或分摊依据。 | 输出：管理单元（部门归属信息）列置于资产账簿之前；资产账簿由 AA.8 管理单元主数据的「资产账簿」列直接带出（不手工另行确定）；输出按部门拆分后的原值、累计折旧、月度折旧及费用归属，供 BB.4.X.A 折旧费用汇总表按部门归集汇总，并进入 BO.PL 对应费用科目（销售/管理/研发费用 6601/6602/6603 及经存货线结转的营业成本—制造费用）及 BO.BS 固定资产净值取数（年初净值 = 原值汇总 − 累计折旧汇总）。 |
| BB.4.5 增量资产折旧计算表 | 上游：BB.3.1/BB.3.2/BB.4.1/BB.4.3 等增量资产来源在现有变更记录中有列举，AA.9 剩余年限(月数)（折旧年限已按「月」维护）及净残值率用于测算。 | 输出：新增资产原值、全年及月度折旧；明确供 BB.4.X 资本性支出/折旧汇总取数与追溯，并进入 BO 利润表；具体字段映射待确认。 |
| BB.4.X 资本性支出汇总表 | 上游：设备、基建、自制工程、其他资产新增及存量/增量折旧明细；来源字段未完全登记。 | 输出：资本性支出、转固、折旧及法人拆分汇总；明确供 BO 资产负债表、利润表、现金流量表取数；各子表到报表字段映射待确认。 |
|| BB.5.1 雇员费用编制/导入 | 上游：HR/人事雇员费用模板或手工填报；法人、部门、岗位、职级、费用归属和薪酬福利信息在本表录入；另接收 BB.1.3.i 人工明细_财务查询的 `monthlyHours × BAA.3.hourlyCost` 结果（该 TAB 汇总 .g 人工明细的存量+增量来源）。 | 输出：人事视角和财务视角的人工费用、制造费用、服务人工成本等；已确认财务视角“服务人工成本”按法人×部门×月份接收 BB.1.3 技术服务人工成本，等额冲减原费用计提并供 BO.PL.PL0202 取数；其他 BB.5.1 字段被下游表单直接引用的关系待确认。 |
| BB.5.2 经营费用转换结果表 | 上游：BA.5 费用预算汇总、BAA.8 经营费用转换比例、AM.2 部门属性映射表；按费用性质归集法人及四类费用。 | 输出：销售/管理/研发/制造费用转换结果；明确制造费用用于 BB.3.X 在制品“费”，并进入 BO 利润表；其他下游引用待确认。 |

### 3.23.3 BF 财务预算编制表

| 表单 | 表概述、上游引用（来源表/字段或信息、在本表单中的用途） | 本表输出（本表字段/数据、被哪些下游表单或报表引用、业务用途） |
|---|---|---|
| BF.1 股权投资预算 | 上游：股权投资项目、法人、行业、投资期间、持股比例、出资及分红计划由本表填报；上游来源表未明确。 | 输出：投资金额、累计投资、分红/利息及月度现金流；明确被 BO 资产负债表长期股权投资、现金流量表投资活动及利润表投资收益引用。 |
| BJ.C 关联交易与内部抵销 | 上游：BA.1.1/现登记关联交易加成比例、AM.2 抵销映射，以及代采购、内部销售、内部租赁、资产转卖事项；交易双方及税率在本表填报。 | 输出：内部交易金额、加成、报表流向及抵销分录；明确被 BO.2 合并三表用于内部收入/成本、往来、未实现利润及资产抵销；具体字段映射待确认。 |
| BF.3 金融工具投融资与授信预算 | 上游：法人、银行、投资类别/产品、利率及月度新增投资/赎回/收益由本表填报；资金期初余额来源未明确。各子表上游：BF.3.a/b 由各法人填报银行存款与理财投资明细；BF.3.c 由各法人逐笔填报借款融资；BF.3.d 按产品汇总筹资；BF.3.e 授信预算由各法人公司按授信类型与金融机构逐笔填报。 | 输出：新增投资、赎回、收益及回报率；明确被 BO 现金流量表投资活动、资产负债表货币资金/金融资产、利润表财务费用或投资收益引用。BF.3.e 输出集团及各法人分授信类型额度小计与总额，作为集团融资借款控制上限，强校验约束 BF.3.c、BF.3.d 及 BO.CF.M 筹资试算表。 |
| BF.4 税金及附加预算表 | 上游：AB.15 `budgetYearValue` 税率/附加税/优惠参数；业务预算形成的销项、进项、实际缴纳增值税等测算基数，具体字段映射部分待确认。 | 输出：增值税、附加税、所得税等月度税金及全年合计；明确进入 BO 利润表税金及附加/所得税费用、资产负债表应交税费/货币资金及现金流量表税费支付。 |
| ~~BJ.A 法人预算报表通用调整与补录~~ | 已删除。所有调整需求直接由财务三表（BO.PL/BO.BS/BO.CF）的手工调整列承载。 | — |

### 3.23.4 登记口径

- “无/暂未定义”表示现有材料没有明确的业务引用，不等于禁止未来补充；“待确认”表示存在方向性描述但尚缺来源、字段或下游对象的明确口径。
- BA/BB/BF 表单的表概述、数据来源、业务关系和下游用途以本节与前文已有明确规则共同构成需求梳理登记；本次不扩展到演示数据、计算逻辑或系统实现。

### 3.24 BO.1 / BO.2 / BO.3 预算三表与勾稽检查

**(a) 业务目标**：自动汇聚底层编制数生成单体三表（BO.1）与集团合并三表（BO.2，含抵销穿透），叠加 BF.4 调整数；BO.3 对三表执行勾稽平衡诊断。

**(b) 关键字段说明**

`IncomeStatementItem` 利润表行：code/name；ruleDescription 取数规则（如"取<销售收入预算>+<存量转收入>"）；isTotal/isSubItem 标记；y2026Actual、budget2027、adjustedAmount（来自 BF.4）、adjustedTotal（公式）、growthRate 增减率%、ratioToRevenue 占营业收入比重%（公式）。

`BalanceSheetItem` 资产负债表行：category（流动资产/非流动资产/流动负债/非流动负债/所有者权益）；ruleDescription 取数规则（如"取<现金流量表>-期末现金及现金等价物余额"）；isSubItem/isTotal/isFormula；y2026Actual、budget2027、adjustedAmount、adjustedTotal、adjustmentNote。

`CashFlowStatementItem` 现金流量表行：section（经营活动/投资活动/筹资活动/汇率变动/现金净增加/期末现金）；ruleDescription；isTotal；y2026Budget、budget2027、adjustedAmount、adjustedTotal、growthRate。

`FinancialStatementsCheckResult` 勾稽诊断（全部公式生成）：

| 字段名 | 说明 |
|--------|------|
| isBalanceSheetBalanced / balanceSheetDiff | 资产 = 负债 + 所有者权益 及差额 |
| isCashFlowAligned / cashFlowDiff | 现金流量表期末余额 = 资产负债表货币资金 及差额 |
| isNetIncomeAligned / netIncomeDiff | 利润表净利润与资产负债表未分配利润变动勾稽 及差额 |

**(c) 计算与联动规则**：各行按 ruleDescription 从底层编制表取数；BF.4 调整数进"调整数"列；合并口径叠加 BF.3 各抵销规则（内部收入/成本、内部往来、未实现利润、折旧差、处置收益抵销）。

### 3.24 BO.4 销售预算汇总表（`SalesBudgetSummaryRow`）

**(a) 业务目标**：将销售类预算按 6 个维度（按客户/区域/项目/产品类别(财)/法人主体/业务线汇总）透视汇总，支持多级钻取。


### 3.25 BO.5 业务预算全景汇总报表（视图）

对收入、采购、薪酬、费用等业务预算做业财衔接的全景只读汇总（`BusinessSummaryReportView`），无独立录入模型。

### 3.26 BO.6 / BO.7 多维透视分析（`BudgetWideRecord`）

**(a) 业务目标**：把全部预算明细拉平为多维宽表，支撑 OLAP 交叉透视（BO.6）与 DuckDB-WASM SQL 计算工作台（BO.7）。

**(b) 宽表字段**：legalEntityCode/Name；budgetMainType（收入类预算/资本化支出/费用类支出/生产制造类/财务与资金）；subCategory（合同签约、服务收入、销售费用、直接材料、资金流出等）；department/region/productCategory/projectCode/projectName/subjectCode/subjectName；m1~m12 与 annualTotal；costNature。全部由系统从各编制表转换生成，只读分析。

### 3.27 A 类主数据（摘要）

- **AA.2 法人架构 `LegalEntity`**：code（JT, A, B, C, D, BA, BB, BC, BD, DA, DB, DC）、name、parentId（顶级为空）、level（1 集团 / 2 一级子公司 / 3 二级孙公司）、isConsolidated 是否纳入合并、category（制造基地/研发中心/销售主体/海外中心/综合管理）。
- **AA.7 预算产品主数据 `BudgetProductMasterItem`**：SKU 级产品登记册（与 AA.4 客商同级）。产品大类取自 AB.3；**不含**单位成本/指导售价（成本只在 BAA.2 手工录入）。联动：BB.1.3「产品名称」下拉、BAA.2「产品编码/产品/子系统」下拉；选产品后 BB.1.3 自动带出产品大类，再按 AB.3 带出收入确认方式。关键字段说明如下：

  | 字段 | 类型 | 说明 |
  |------|------|------|
  | id | string | 主键 |
  | code | string | 产品编码（PRD-xxx） |
  | name | string | 产品名称 |
  | specModel | string | 规格型号 |
  | unit | string | 计量单位（台/套/件/年） |
  | notes | string? | 备注 |

- **AA.4 客商主数据 `CustomerVendorMasterItem`**：统一的客户与供应商主数据登记册（独立主数据，不联动各编制表下拉）。关键字段说明如下：

  | 字段 | 类型 | 说明 |
  |------|------|------|
  | id | string | 主键 |
  | code | string | 客商代码（CV-C-### 客户 / CV-S-### 供应商 / CV-I-### 内部） |
  | name | string | 客商全名 |
  | shortName | string? | 简称 |
  | isCustomer | boolean | **客户标记**：该客商是否为购买方 |
  | isVendor | boolean | **供应商标记**：该客商是否为供应方 |
  | isRelatedParty | boolean | **关联方标记**：是否属集团内法人或受同一控制方 |
  | internalExternal | '内部'\|'外部' | **内外部标记**：集团内部法人为"内部"，外部第三方为"外部" |
  | category | string? | 细类描述（如 面板显示龙头 / 甜品印花胶供应商 / 集团内工厂） |
  | region | string? | 所在区域 |
  | taxId | string? | 统一社会信用代码（演示可留脱敏占位） |
  | notes | string? | 备注（如厂区列表、业务说明） |

  **四种标记位业务规则说明**：
  1. **纯外部客户**（isCustomer=true, isVendor=false, isRelatedParty=false, 外部）：采购本公司产品/服务的第三方，如华山派剑器工坊、少林寺武备坊等 9 家客户。
  2. **纯外部供应商**（isCustomer=false, isVendor=true, isRelatedParty=false, 外部）：向本公司供货的第三方，如银杏糖艺镜组、松脂甜品印花胶等 10 家供应商。
  3. **内部关联方**（isVendor=true, isRelatedParty=true, 内部）：集团内部工厂/职能中心，内部交易受 AM.2 关联交易抵销映射规则管控，如糖光制造一厂、精制甜品中心等 4 家。
  4. **既客户又供应商**（isCustomer=true, isVendor=true, isRelatedParty=true, 内部）：集团内部法人互为客商（既购买也销售），如 BA公司；此类关联交易在合并报表中需双向抵销。
- **AB.1 合同字典 `MasterContract`**：code/name/type 及 defaultDepartment/defaultCustomer/defaultFab/defaultSigningEntity/defaultRegion、isFramework 框架合同标记；为 BB.1.1/BB.1.2 提供自动带出。

---

## 4. 待定事项台账

从代码注释与页面内嵌【待定事项】提示收集：

| 序号 | 待定事项 | 出处 | 现状处理 |
|------|----------|------|----------|
| 1 | 内部交易路径要不要体现、怎么处理尚未确定 | `FormInstructionsCard.tsx`（BB.1.1 填报说明卡）、`BudgetRowModal.tsx`"内部交易路径 (待定项)" | 系统提供右上角开关，可随时开启/隐藏 `internalPath` 列，导出时可自由勾选 |
| 2 | 存量订单"项目编码"具体内容待业务确定 | `types.ts` `StockOrderItem.projectCode` 注释"待业务确定具体内容" | 暂按手工填写处理，项目名称按编号带出 |
| 4 | AB.2 关联交易基础加成比例字典已迁移 | `LeftTreeSidebar.tsx` 注释"AB.2 —— 已迁移至 BA 编制前提与假设 (BA.1.1)" | 目录保留迁移备注，功能入口在 BA.1.1 |
