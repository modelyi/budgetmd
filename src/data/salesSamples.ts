// 销售预算调研页（BB.1.1 ~ BB.1.4）脱敏示例数据
//
// 用途：scripts/generateResearchMarkdownContent.ts 生成调研页表样时，为 4 张销售预算表
// 提供示例数据行（原脚本传空数组，仅渲染表头）。主会话接入时按下表传参即可：
//
//   buildSalesContractSheet(SALES_CONTRACT_SAMPLE)
//   buildStockOrderSheet(STOCK_ORDER_SAMPLE, '甜甜圈集团公司', '2027', 'stock'|'incremental'|'finance')
//   buildServiceRevenueSheet(SERVICE_REVENUE_SAMPLE, '甜甜圈集团公司', '2027', 'stock'|'incremental'|'finance')
//   buildServiceMaterialSheet(SERVICE_MATERIAL_SAMPLE, [], '甜甜圈集团公司', '2027', 'sales'|'finance')
//   buildServiceLaborSheet(SERVICE_LABOR_SAMPLE, '甜甜圈集团公司', '2027', 'sales'|'finance')
//     （物料/人工明细的存量与增量已合并为一张填报表、由「订单编号」区分，故填报口径只有 'sales' 一张）
//   buildSalesExpenseDetailSheet(SALES_EXPENSE_SAMPLE)
//
// 说明：
//   - 全部为脱敏虚构数据，金额单位为万元（不含税），数值不要求勾稽，仅用于示意与阅读理解。
//   - 12 个月数据做了简化：多数月填 0 或少量值；凡适配器对缺省月份按 `?? 0` 兜底的字段，
//     此处采用稀疏写法（仅写非零月份），未写出的月份渲染为 0。
//   - 类型统一用 `as any[]`：buildStockOrderSheet / buildSalesExpenseDetailSheet 内部按 `any`
//     读取若干未在严格 interface 中声明的字段（如 orderCode、monthlyQty、product、expenseSubject），
//     显式 interface 无法完整承载，故以宽类型承载示例行。

// ---------------------------------------------------------------------------
// BB.1.1 销售合同签约额预算表 → buildSalesContractSheet(SALES_CONTRACT_SAMPLE)
// 维度列：合同编码/合同名称/合同性质/客户/预算项目/预算产品/机台/区域/预算部门/法人公司/内部供应商/产品类别/收入方式
// ---------------------------------------------------------------------------
export const SALES_CONTRACT_SAMPLE = [
  {
    id: 'sc-001',
    seq: 1,
    contractNature: '新增商业机会',
    contractCode: 'HT2027-001',
    contractName: '华山派剑器工坊高功率激光切割机采购意向',
    contractType: '销售',
    department: '销售一部',
    region: '华东',
    productCategory: '整机台+验收款',
    budgetProduct: '高功率光纤激光切割机整机系统',
    machineCode: '机台-01',
    revenueMethod: '验收一次性',
    projectName: 'P1 高功率平板光纤激光切割机',
    signingEntity: '甜甜圈集团公司',
    legalEntity: '甜甜圈集团公司',
    internalSupplier: '甜甜圈集团公司',
    customer: '华山派剑器工坊',
    months: { m1: 150, m2: 0, m3: 0, m4: 120, m5: 0, m6: 90, m7: 0, m8: 0, m9: 60, m10: 0, m11: 0, m12: 0 },
    nextYearBudget: 180,
    yearAfterNextBudget: 90,
    notes: '脱敏示例：整机台验收一次性确认',
  },
  {
    id: 'sc-002',
    seq: 2,
    contractNature: '存量框架合同',
    contractCode: 'HT2027-002',
    contractName: '少林寺武备坊三维五轴切管机年度集采框架',
    contractType: '销售',
    department: '销售二部',
    region: '华北',
    productCategory: '整机台+验收款',
    budgetProduct: '三维五轴激光切管机',
    machineCode: '机台-02',
    revenueMethod: '验收一次性',
    projectName: 'P2 三维五轴激光切管机',
    signingEntity: '甜甜圈集团公司',
    legalEntity: '草莓慕斯公司',
    internalSupplier: '整机总装二厂',
    customer: '少林寺武备坊',
    months: { m1: 0, m2: 80, m3: 0, m4: 0, m5: 100, m6: 0, m7: 0, m8: 70, m9: 0, m10: 0, m11: 0, m12: 50 },
    nextYearBudget: 220,
    yearAfterNextBudget: 120,
    notes: '脱敏示例：切管机按验收确认',
  },
  {
    id: 'sc-003',
    seq: 3,
    contractNature: '新增商业机会',
    contractCode: 'HT2027-003',
    contractName: '武当山玄铁工坊光束整形准直模组供货合同',
    contractType: '部件销售',
    department: '销售一部',
    region: '华南',
    productCategory: '关键模组+验收款',
    budgetProduct: '高精度光学光束整形准直模组',
    machineCode: '机台-03',
    revenueMethod: '验收一次性',
    projectName: 'P1 高功率平板光纤激光切割机',
    signingEntity: '甜甜圈集团公司',
    legalEntity: '甜甜圈集团公司',
    internalSupplier: '智能切割头装配中心',
    customer: '武当山玄铁工坊',
    months: { m1: 0, m2: 0, m3: 40, m4: 0, m5: 0, m6: 35, m7: 0, m8: 0, m9: 0, m10: 25, m11: 0, m12: 0 },
    nextYearBudget: 80,
    yearAfterNextBudget: 40,
    notes: '脱敏示例：关键模组验收确认',
  },
] as any[];

// ---------------------------------------------------------------------------
// BB.1.2 存量在手订单执行表 → buildStockOrderSheet(STOCK_ORDER_SAMPLE, '甜甜圈集团公司', '2027', role)
// 维度列：订单编号/销售合同/销售项目/销售产品/机台/区域/预算部门/客户名称
// 度量列：销量×单价(不含税)=预计销售收入(不含税) / 预收 / 验收回款（财务视角另含预计销售成本）
// ---------------------------------------------------------------------------
export const STOCK_ORDER_SAMPLE = [
  {
    id: 'so-001',
    seq: 1,
    orderCode: 'SO2027-001',
    contractCode: 'HT2027-001',
    projectName: 'P1 高功率平板光纤激光切割机',
    budgetProduct: '高功率光纤激光切割机整机系统',
    machineCode: '机台-01',
    region: '华东',
    department: '销售一部',
    customer: '华山派剑器工坊',
    signingEntity: '甜甜圈集团公司',
    monthlyQty: { m1: 2, m4: 1, m7: 1 },
    monthlyPrice: { m1: 150, m4: 150, m7: 150 },
    monthlyPrepayment: { m1: 90, m4: 45, m7: 45 },
    monthlyAcceptCollection: { m4: 150, m7: 150 },
    monthlyCost: { m1: 66, m4: 33, m7: 33 },
  },
  {
    id: 'so-002',
    seq: 2,
    orderCode: 'SO2027-002',
    contractCode: 'HT2027-002',
    projectName: 'P2 三维五轴激光切管机',
    budgetProduct: '三维五轴激光切管机',
    machineCode: '机台-02',
    region: '华北',
    department: '销售二部',
    customer: '少林寺武备坊',
    signingEntity: '草莓慕斯公司',
    monthlyQty: { m2: 1, m5: 2, m8: 1, m12: 1 },
    monthlyPrice: { m2: 220, m5: 220, m8: 220, m12: 220 },
    monthlyPrepayment: { m2: 66, m5: 132, m8: 66, m12: 66 },
    monthlyAcceptCollection: { m5: 220, m8: 220, m12: 220 },
    monthlyCost: { m2: 55, m5: 110, m8: 55, m12: 55 },
  },
  {
    id: 'so-003',
    seq: 3,
    orderCode: 'SO2027-003',
    contractCode: 'HT2027-003',
    projectName: 'P1 高功率平板光纤激光切割机',
    budgetProduct: '高精度光学光束整形准直模组',
    machineCode: '机台-03',
    region: '华南',
    department: '销售一部',
    customer: '武当山玄铁工坊',
    signingEntity: '甜甜圈集团公司',
    monthlyQty: { m3: 4, m6: 3, m10: 2 },
    monthlyPrice: { m3: 35, m6: 35, m10: 35 },
    monthlyPrepayment: { m3: 42, m6: 31.5, m10: 21 },
    monthlyAcceptCollection: { m6: 105, m10: 70 },
    monthlyCost: { m3: 20, m6: 15, m10: 10 },
  },
] as any[];

// ---------------------------------------------------------------------------
// BB.1.3 技术服务收入与料工费预算表（主收入表）→ buildServiceRevenueSheet(SERVICE_REVENUE_SAMPLE, ..., role)
// 维度列：预算部门/项目/订单编号(销售合同)/区域/产品/机台/客户/客户类型/收入方式
// 月度指标：确认收入 / 预收款 / 验收回款（财务视角另含 人工成本/物料成本/其他费用）
// 注意：id 与 SERVICE_MATERIAL_SAMPLE / SERVICE_LABOR_SAMPLE 的 serviceRevenueId 保持一致，
//       便于主会话按附表口径回填物料/人工成本。
// ---------------------------------------------------------------------------
export const SERVICE_REVENUE_SAMPLE = [
  {
    id: 'srv-001',
    seq: 1,
    productName: '整机年度全包维保服务包',
    machineCode: '机台-01',
    projectName: '华山派剑器B17一期交付项目',
    department: '销售一部',
    contractCode: 'HT2027-004',
    contractName: '华山派剑器工坊年度维保服务合同',
    region: '华东',
    productCategory: '技术服务维保+服务款',
    customer: '华山派剑器工坊',
    signingEntity: '甜甜圈集团公司',
    customerType: '一级销售',
    revenueMethod: '直线法',
    months: {
      m1: { salesVolume: 1, unitPrice: 12, recognizedRevenue: 12, prepayment: 0, acceptCollection: 6, laborCost: 4, materialCost: 2, otherExpenses: 1 },
      m2: { salesVolume: 1, unitPrice: 12, recognizedRevenue: 12, prepayment: 0, acceptCollection: 6, laborCost: 4, materialCost: 2, otherExpenses: 1 },
      m3: { salesVolume: 1, unitPrice: 12, recognizedRevenue: 12, prepayment: 0, acceptCollection: 6, laborCost: 4, materialCost: 2, otherExpenses: 1 },
      m4: { salesVolume: 1, unitPrice: 12, recognizedRevenue: 12, prepayment: 0, acceptCollection: 6, laborCost: 4, materialCost: 2, otherExpenses: 1 },
    },
    notes: '脱敏示例：维保服务按月直线确认',
  },
  {
    id: 'srv-002',
    seq: 2,
    productName: '高精度光学光束整形准直模组',
    machineCode: '机台-02',
    projectName: '少林寺武备坊工坊12A装备交付项目',
    department: '销售二部',
    contractCode: 'HT2027-005',
    contractName: '少林寺武备坊光束整形准直模组供货合同',
    region: '华北',
    productCategory: '关键模组+验收款',
    customer: '少林寺武备坊',
    signingEntity: '草莓慕斯公司',
    customerType: '一级销售',
    revenueMethod: '验收一次性',
    months: {
      m6: { salesVolume: 2, unitPrice: 90, recognizedRevenue: 180, prepayment: 60, acceptCollection: 120, laborCost: 20, materialCost: 80, otherExpenses: 5 },
    },
    notes: '脱敏示例：关键模组验收一次性确认',
  },
  {
    id: 'srv-003',
    seq: 3,
    productName: '三维五轴激光切管机',
    machineCode: '机台-03',
    projectName: '武当山玄铁工坊T9产线调优技术服务项目',
    department: '销售二部',
    contractCode: 'HT2027-006',
    contractName: '武当山玄铁工坊切管机设备销售合同',
    region: '华南',
    productCategory: '整机台+验收款',
    customer: '武当山玄铁工坊',
    signingEntity: '甜甜圈集团公司',
    customerType: '一级销售',
    revenueMethod: '验收一次性',
    months: {
      m9: { salesVolume: 1, unitPrice: 260, recognizedRevenue: 260, prepayment: 100, acceptCollection: 160, laborCost: 30, materialCost: 120, otherExpenses: 8 },
    },
    notes: '脱敏示例：整机台验收一次性确认',
  },
] as any[];

// ---------------------------------------------------------------------------
// BB.1.3.d 物料明细 → buildServiceMaterialSheet(SERVICE_MATERIAL_SAMPLE, [], '甜甜圈集团公司', '2027', role)
// 存量订单行与增量行合并在同一张表，由「订单编号」区分（orderCode）：存量订单行 SO2026-xxx（由存量订单导入带出）、增量行 XN2027-xxx（虚拟订单号，可不填）。
// 维度列：项目/预算部门/订单编号/区域/产品类别/客户/客户类型/签约主体（法人公司）/内部供应商/好坏件/物料类型/物料名称/物料编码/计量单位
// 月度指标：数量(标准单位)（财务视角另含成本 = 数量 × 标准成本）
// 物料编码取自 AA.11 物料主数据，保证名称/类型/计量单位可自动带出。
// 内部供应商（AA.10 供应商主数据，供应商类型=内部，由交易路径管理岗维护）：留空或=签约主体（同法人）=自供（不构成内部交易、不触发）；填=其他法人提供（跨法人内部购销，按真实购销模型取数：出库成本=数量×标准成本、加成款=出库成本×BAA.11，提供方按完整内部销售价（出库成本+加成款）记 6001.2、签约主体按采购价（加成进成本）计入 6401.1，往来 1221.1/2241.1 真实现金结算、增值税在 BF.4.b 体现）。
// ---------------------------------------------------------------------------
export const SERVICE_MATERIAL_SAMPLE = [
  // ── 存量订单行（订单编号 SO2026-xxx，由存量订单导入带出）─────────────────────
  {
    id: 'smat-101',
    serviceRevenueId: 'srv-stock-001',
    seq: 1,
    productName: '整机年度全包维保服务包',
    projectName: '华山派剑器B17一期交付项目',
    department: '销售一部',
    orderCode: 'SO2026-013',
    contractCode: 'HT2026-004',
    region: '华东',
    productCategory: '技术服务维保+服务款',
    customer: '华山派剑器工坊',
    signingEntity: '甜甜圈集团公司',
    internalSupplier: '',
    customerType: '一级销售',
    partCategory: '好件',
    materialCode: 'MAT-OPT-002',
    materialName: '防护镜片',
    materialType: '耗材',
    unit: '片',
    monthlyQuantities: { m2: 2, m5: 2, m8: 2 },
    notes: '脱敏示例：存量订单行（订单编号 SO2026-013）维保好件消耗',
  },
  {
    id: 'smat-102',
    serviceRevenueId: 'srv-stock-002',
    seq: 2,
    productName: '三维五轴激光切管机',
    projectName: '武当山玄铁工坊T9产线调优技术服务项目',
    department: '销售二部',
    orderCode: 'SO2026-027',
    contractCode: 'HT2026-009',
    region: '华南',
    productCategory: '整机台+验收款',
    customer: '武当山玄铁工坊',
    signingEntity: '甜甜圈集团公司',
    internalSupplier: '整机总装二厂',
    customerType: '一级销售',
    partCategory: '坏件',
    materialCode: 'MAT-RTN-002',
    materialName: '返修驱动模块',
    materialType: '返修件',
    unit: '台',
    monthlyQuantities: { m4: 1, m10: 1 },
    notes: '脱敏示例：存量订单行（订单编号 SO2026-027）返修坏件',
  },
  // ── 增量行（订单编号用虚拟订单号）────────────────────────────────────────
  {
    id: 'smat-001',
    serviceRevenueId: 'srv-001',
    seq: 3,
    productName: '整机年度全包维保服务包',
    projectName: '华山派剑器B17一期交付项目',
    department: '销售一部',
    orderCode: 'XN2027-001',
    contractCode: 'HT2027-004',
    region: '华东',
    productCategory: '技术服务维保+服务款',
    customer: '华山派剑器工坊',
    signingEntity: '甜甜圈集团公司',
    internalSupplier: '',
    customerType: '一级销售',
    partCategory: '好件',
    materialCode: 'MAT-OPT-001',
    materialName: '聚焦镜组',
    materialType: '光学件',
    unit: '套',
    monthlyQuantities: { m1: 1, m3: 1 },
    notes: '脱敏示例：增量行（虚拟订单号 XN2027-001）维保更换好件',
  },
  {
    id: 'smat-002',
    serviceRevenueId: 'srv-002',
    seq: 4,
    productName: '高精度光学光束整形准直模组',
    projectName: '少林寺武备坊工坊12A装备交付项目',
    department: '销售二部',
    orderCode: 'XN2027-002',
    contractCode: 'HT2027-005',
    region: '华北',
    productCategory: '关键模组+验收款',
    customer: '少林寺武备坊',
    signingEntity: '草莓慕斯公司',
    internalSupplier: '智能切割头装配中心',
    customerType: '一级销售',
    partCategory: '好件',
    materialCode: 'MAT-MEC-003',
    materialName: '导流喷嘴',
    materialType: '机械件',
    unit: '只',
    monthlyQuantities: { m6: 6 },
    notes: '脱敏示例：增量行（虚拟订单号 XN2027-002）交付好件',
  },
  {
    id: 'smat-003',
    serviceRevenueId: 'srv-003',
    seq: 5,
    productName: '三维五轴激光切管机',
    projectName: '武当山玄铁工坊T9产线调优技术服务项目',
    department: '销售二部',
    orderCode: 'XN2027-003',
    contractCode: 'HT2027-006',
    region: '华南',
    productCategory: '整机台+验收款',
    customer: '武当山玄铁工坊',
    signingEntity: '甜甜圈集团公司',
    internalSupplier: '整机总装二厂',
    customerType: '一级销售',
    partCategory: '坏件',
    materialCode: 'MAT-RTN-001',
    materialName: '返修镜组',
    materialType: '返修件',
    unit: '套',
    monthlyQuantities: { m9: 2 },
    notes: '脱敏示例：增量行（虚拟订单号 XN2027-003）返修坏件',
  },
] as any[];

// ---------------------------------------------------------------------------
// BB.1.3.g 人工明细 → buildServiceLaborSheet(SERVICE_LABOR_SAMPLE, '甜甜圈集团公司', '2027', role)
// 存量订单行与增量行合并在同一张表，由「订单编号」区分（orderCode）：存量订单行 SO2026-xxx、增量行 XN2027-xxx（虚拟订单号，可不填）。
// 维度列：项目/预算部门/订单编号/区域/产品类别/客户/客户类型/签约主体（法人公司）/内部供应商/岗位/职级
// 月度指标：工时(小时)（财务视角另含人工成本 = 工时 × 工时标准成本）
// 内部供应商（AA.10 供应商主数据，供应商类型=内部）：留空=签约主体自己提供（自供，不构成内部交易）；填=其他法人提供（跨法人内部交易，取数规则后续按平移+加成处理）。
// ---------------------------------------------------------------------------
export const SERVICE_LABOR_SAMPLE = [
  // ── 存量订单行（订单编号 SO2026-xxx，由存量订单导入带出）─────────────────────
  {
    id: 'slbr-101',
    serviceRevenueId: 'srv-stock-001',
    seq: 1,
    productName: '整机年度全包维保服务包',
    projectName: '华山派剑器B17一期交付项目',
    department: '销售一部',
    orderCode: 'SO2026-013',
    contractCode: 'HT2026-004',
    region: '华东',
    productCategory: '技术服务维保+服务款',
    customer: '华山派剑器工坊',
    signingEntity: '甜甜圈集团公司',
    internalSupplier: '',
    customerType: '一级销售',
    position: '光学装调工程师',
    rank: 'T4',
    monthlyHours: { m2: 60, m5: 60, m8: 40 },
    hourlyStandardCost: 0.025,
    notes: '脱敏示例：存量订单行（订单编号 SO2026-013）维保装调工时',
  },
  {
    id: 'slbr-102',
    serviceRevenueId: 'srv-stock-002',
    seq: 2,
    productName: '三维五轴激光切管机',
    projectName: '武当山玄铁工坊T9产线调优技术服务项目',
    department: '销售二部',
    orderCode: 'SO2026-027',
    contractCode: 'HT2026-009',
    region: '华南',
    productCategory: '整机台+验收款',
    customer: '武当山玄铁工坊',
    signingEntity: '甜甜圈集团公司',
    internalSupplier: '整机总装二厂',
    customerType: '一级销售',
    position: '机械精调技师长',
    rank: 'T5',
    monthlyHours: { m4: 40, m10: 40 },
    hourlyStandardCost: 0.022,
    notes: '脱敏示例：存量订单行（订单编号 SO2026-027）现场精调工时',
  },
  // ── 增量行（订单编号用虚拟订单号）────────────────────────────────────────
  {
    id: 'slbr-001',
    serviceRevenueId: 'srv-001',
    seq: 3,
    productName: '整机年度全包维保服务包',
    projectName: '华山派剑器B17一期交付项目',
    department: '销售一部',
    orderCode: 'XN2027-001',
    contractCode: 'HT2027-004',
    region: '华东',
    productCategory: '技术服务维保+服务款',
    customer: '华山派剑器工坊',
    signingEntity: '甜甜圈集团公司',
    internalSupplier: '',
    customerType: '一级销售',
    position: '高级激光装调工程师',
    rank: 'T2',
    monthlyHours: { m1: 80, m3: 80 },
    hourlyStandardCost: 0.02,
    notes: '脱敏示例：增量行（虚拟订单号 XN2027-001）维保装调工时',
  },
  {
    id: 'slbr-002',
    serviceRevenueId: 'srv-002',
    seq: 4,
    productName: '高精度光学光束整形准直模组',
    projectName: '少林寺武备坊工坊12A装备交付项目',
    department: '销售二部',
    orderCode: 'XN2027-002',
    contractCode: 'HT2027-005',
    region: '华北',
    productCategory: '关键模组+验收款',
    customer: '少林寺武备坊',
    signingEntity: '草莓慕斯公司',
    internalSupplier: '数控系统研发与测试中心',
    customerType: '一级销售',
    position: '数控算法开发专家',
    rank: 'T3',
    monthlyHours: { m6: 160 },
    hourlyStandardCost: 0.03,
    notes: '脱敏示例：增量行（虚拟订单号 XN2027-002）算法调试工时',
  },
  {
    id: 'slbr-003',
    serviceRevenueId: 'srv-003',
    seq: 5,
    productName: '三维五轴激光切管机',
    projectName: '武当山玄铁工坊T9产线调优技术服务项目',
    department: '销售二部',
    orderCode: 'XN2027-003',
    contractCode: 'HT2027-006',
    region: '华南',
    productCategory: '整机台+验收款',
    customer: '武当山玄铁工坊',
    signingEntity: '甜甜圈集团公司',
    internalSupplier: '整机总装二厂',
    customerType: '一级销售',
    position: '电气控制维保技师',
    rank: 'T1',
    monthlyHours: { m9: 120 },
    hourlyStandardCost: 0.015,
    notes: '脱敏示例：增量行（虚拟订单号 XN2027-003）电气维保工时',
  },
] as any[];

// ---------------------------------------------------------------------------
// BB.1.4 销售费用预算明细表 → buildSalesExpenseDetailSheet(SALES_EXPENSE_SAMPLE)
// 维度列：产品/客户/区域/项目/预算部门/费用科目
// 时间列：全年合计 + 1月~12月（金额万元）
// ---------------------------------------------------------------------------
export const SALES_EXPENSE_SAMPLE = [
  {
    product: '高功率光纤激光切割机整机系统',
    customer: '华山派剑器工坊',
    region: '华东',
    project: 'P1 高功率平板光纤激光切割机',
    department: '销售一部',
    expenseSubject: '差旅费',
    months: { m1: 3, m2: 0, m3: 2, m4: 0, m5: 1.5, m6: 0, m7: 0, m8: 0, m9: 1, m10: 0, m11: 0, m12: 0 },
  },
  {
    product: '三维五轴激光切管机',
    customer: '少林寺武备坊',
    region: '华北',
    project: 'P2 三维五轴激光切管机',
    department: '销售二部',
    expenseSubject: '展会费',
    months: { m1: 0, m2: 0, m3: 4, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 6, m10: 0, m11: 0, m12: 0 },
  },
  {
    product: '高精度光学光束整形准直模组',
    customer: '武当山玄铁工坊',
    region: '华南',
    project: 'P1 高功率平板光纤激光切割机',
    department: '销售一部',
    expenseSubject: '业务招待费',
    months: { m1: 0, m2: 0, m3: 0, m4: 1, m5: 0, m6: 1.5, m7: 0, m8: 0, m9: 0, m10: 0.8, m11: 0, m12: 0 },
  },
] as any[];
