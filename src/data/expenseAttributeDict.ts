// AB.14 费用属性字典
// 定义费用属性固定值域，供各编制表「费用属性 / 费用归属」字段下拉引用，并映射对应财务科目

export interface ExpenseAttributeDictItem {
  code: string;  // 费用属性编码
  name: string;  // 费用属性名称
  scope: string; // 适用范围与财务科目映射说明
}

export const EXPENSE_ATTRIBUTE_DICTS: ExpenseAttributeDictItem[] = [
  {
    code: 'FEE-01',
    name: '销售费用',
    scope: '销售活动相关费用，计入 6601 销售费用'
  },
  {
    code: 'FEE-02',
    name: '管理费用',
    scope: '行政管理部门费用，计入 6602 管理费用'
  },
  {
    code: 'FEE-03',
    name: '研发费用',
    scope: '研发活动费用，计入 6603 研发费用'
  },
  {
    code: 'FEE-04',
    name: '直接制造费用',
    scope: '直接计入产品制造成本的制造费用（如车间直接耗用的辅料、动力等）'
  },
  {
    code: 'FEE-05',
    name: '间接制造费用',
    scope: '需分摊计入产品制造成本的制造费用（如车间管理人员、折旧、水电等）'
  }
];
