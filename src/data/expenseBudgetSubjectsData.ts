// =========================================================================
// 甜甜圈集团公司全面预算管理系统 - 确定性费用预算科目主数据 (10项)
// (Deterministic Expense Budget Chart of Accounts Master Data)
// 注：该科目体系为集团财务预算主数据法定核心标准，具备确定性，受系统基准锁定保护。
//     本表仅保留后续预算编制表实际会引用的费用科目（10 项），均为顶层科目
//     （parentCode 空、level 1）；科目全称 = 科目名称（不再带「费用科目合计-」前缀）。
// =========================================================================

export interface ExpenseBudgetSubjectItem {
  subjectCode: string;       // 科目编码 (如 E0101, E0133)
  subjectName: string;       // 科目名称 (如 人员费用, 差旅费用)
  fullName: string;          // 科目全称 (与科目名称一致)
  subjectType: '支出';        // 科目类型 (支出)
  expenseType: '经营性支出' | '资本性支出' | ''; // 支出类型
  level: 1 | 2 | 3 | 4;      // 级别
  parentCode?: string;       // 上级编码
  isImmutable: boolean;      // 是否系统确定基准 (固定不可篡改)
  budgetWorkbenchRef?: string; // 关联预算编制工作台 (如 B.5 期间费用 OPEX / B.4 固定资产与资本化)
  mappedReportRef?: string;  // 默认映射财务报表项
  description?: string;      // 业务核算范围与口径说明
}

export const FIXED_EXPENSE_BUDGET_SUBJECTS: ExpenseBudgetSubjectItem[] = [
  {
    subjectCode: 'E0101',
    subjectName: '人员费用',
    fullName: '人员费用',
    subjectType: '支出',
    expenseType: '经营性支出',
    level: 1,
    parentCode: undefined,
    isImmutable: true,
    budgetWorkbenchRef: 'B.5 期间费用 OPEX (销售/管理/研发)',
    mappedReportRef: '应付职工薪酬 / 职工薪酬费用',
    description: '全职员工及兼职人员的基本工资、绩效奖金、津贴补贴、五险一金等'
  },
  {
    subjectCode: 'E0102',
    subjectName: '差旅费用',
    fullName: '差旅费用',
    subjectType: '支出',
    expenseType: '经营性支出',
    level: 1,
    parentCode: undefined,
    isImmutable: true,
    budgetWorkbenchRef: 'B.5 期间费用 OPEX',
    mappedReportRef: '销售费用/管理费用-差旅费',
    description: '员工因公出差产生的交通费（飞机/高铁）、住宿费、出差伙食补贴等'
  },
  {
    subjectCode: 'E0105',
    subjectName: '市场推广费',
    fullName: '市场推广费',
    subjectType: '支出',
    expenseType: '经营性支出',
    level: 1,
    parentCode: undefined,
    isImmutable: true,
    budgetWorkbenchRef: 'B.5 销售费用 OPEX',
    mappedReportRef: '销售费用-市场推广与广告宣传费',
    description: '品牌宣传、媒体投放、展会搭建、行业峰会赞助与精准获客投放'
  },
  {
    subjectCode: 'E0106',
    subjectName: '中介服务费',
    fullName: '中介服务费',
    subjectType: '支出',
    expenseType: '经营性支出',
    level: 1,
    parentCode: undefined,
    isImmutable: true,
    budgetWorkbenchRef: 'B.5 管理费用 OPEX',
    mappedReportRef: '管理费用-中介机构专业服务费',
    description: '会计师事务所年报审计、律所法务合规咨询、资产评估及税务顾问'
  },
  {
    subjectCode: 'E0107',
    subjectName: '业务招待费',
    fullName: '业务招待费',
    subjectType: '支出',
    expenseType: '经营性支出',
    level: 1,
    parentCode: undefined,
    isImmutable: true,
    budgetWorkbenchRef: 'B.5 期间费用 OPEX (销售/管理)',
    mappedReportRef: '销售费用/管理费用-业务招待费',
    description: '生产经营业务合理需要发生的商务宴请、客户接待与商务礼品'
  },
  {
    subjectCode: 'E0110',
    subjectName: '办公费',
    fullName: '办公费',
    subjectType: '支出',
    expenseType: '经营性支出',
    level: 1,
    parentCode: undefined,
    isImmutable: true,
    budgetWorkbenchRef: 'B.5 管理费用 OPEX',
    mappedReportRef: '管理费用-日常办公耗材与印刷',
    description: '办公文具、打印纸张、硒鼓墨盒、图书报刊、名片印制及办公日用品'
  },
  {
    subjectCode: 'E0113',
    subjectName: '折旧费-折旧摊销',
    fullName: '折旧费-折旧摊销',
    subjectType: '支出',
    expenseType: '经营性支出',
    level: 1,
    parentCode: undefined,
    isImmutable: true,
    budgetWorkbenchRef: 'B.4 固定资产折旧联动 / B.5 OPEX',
    mappedReportRef: '累计折旧 / 制造费用/管理费用-折旧摊销',
    description: '固定资产（房屋、机器、办公设备）及无形资产的月度计提折旧与摊销'
  },
  {
    subjectCode: 'E0117',
    subjectName: '房屋使用费',
    fullName: '房屋使用费',
    subjectType: '支出',
    expenseType: '经营性支出',
    level: 1,
    parentCode: undefined,
    isImmutable: true,
    budgetWorkbenchRef: 'B.5 期间费用 OPEX',
    mappedReportRef: '使用权资产折旧 / 租赁负债利息 / 管理费用-租金',
    description: '总部写字楼、研发中心、各地分公司办事处及库房的场地租赁费用'
  },
  {
    subjectCode: 'E0127',
    subjectName: '业务宣传费',
    fullName: '业务宣传费',
    subjectType: '支出',
    expenseType: '经营性支出',
    level: 1,
    parentCode: undefined,
    isImmutable: true,
    budgetWorkbenchRef: 'B.5 销售费用 OPEX',
    mappedReportRef: '销售费用-业务宣传制作费',
    description: '企业宣传片制作、宣传画册样本印制、易拉宝展架及商务礼品定制'
  },
  {
    subjectCode: 'E0133',
    subjectName: '其他',
    fullName: '其他',
    subjectType: '支出',
    expenseType: '经营性支出',
    level: 1,
    parentCode: undefined,
    isImmutable: true,
    budgetWorkbenchRef: 'B.5 期间费用 OPEX',
    mappedReportRef: '期间费用-其他未分类营业开支',
    description: '无法归入以上特定科目的其他零星经营性开支'
  }
];
