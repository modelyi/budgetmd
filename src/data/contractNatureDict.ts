// AB.5 合同性质字典数据
export interface ContractNatureDictItem {
  code: string;                  // 编码
  name: '存量框架合同' | '新增商业机会' | string; // 性质名称
  natureType: '存量' | '新增';    // 业务分类
  notes: string;                 // 备注说明
}

export const CONTRACT_NATURE_DICT: ContractNatureDictItem[] = [
  {
    code: 'CN-01',
    name: '存量框架合同',
    natureType: '存量',
    notes: '前期已签署框架合同或在手存量订单，本年进行排产履约与滚动执行'
  },
  {
    code: 'CN-02',
    name: '新增商业机会',
    natureType: '新增',
    notes: '本年新拓展商机管线或拟新签合同，作为增量业务度量'
  }
];
