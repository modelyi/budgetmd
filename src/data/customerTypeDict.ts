// AB.8 客户类型业务字典
export interface CustomerTypeDictItem {
  code: string;
  name: string;
  notes: string;
}

export const CUSTOMER_TYPE_DICT: CustomerTypeDictItem[] = [
  { code: 'CT-01', name: '一级销售', notes: '一级销售预算客户分类' },
  { code: 'CT-02', name: '战略客户', notes: '重点战略合作客户' },
  { code: 'CT-03', name: '普通客户', notes: '常规销售客户' },
  { code: 'CT-04', name: '集团内部关联方', notes: '集团内部交易客户' },
  { code: 'CT-99', name: '不分类型', notes: '暂未完成客户分类时的统一兜底值' }
];

export const ENABLED_CUSTOMER_TYPES = CUSTOMER_TYPE_DICT.map((item) => item.name);
