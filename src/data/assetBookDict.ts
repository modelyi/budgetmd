// AB.10 资产账簿字典
// 资产账簿为独立账簿，不直接关联法人公司；法人归属通过 AA.8 管理单元间接映射得到

export interface AssetBookDictItem {
  code: string;       // 账簿编码
  name: string;       // 账簿名称
  isDefault: boolean; // 默认标记（全表只允许一个默认账簿）
  scope: string;      // 适用范围说明
}

export const ASSET_BOOK_DICTS: AssetBookDictItem[] = [
  {
    code: 'ABK-01',
    name: '甲资产账簿',
    isDefault: true,
    scope: '默认账簿，用于全系统新增资产折旧参数计算'
  },
  {
    code: 'ABK-02',
    name: '乙资产账簿',
    isDefault: false,
    scope: '用于对应管理单元资产的折旧计提'
  },
  {
    code: 'ABK-03',
    name: '丙资产账簿',
    isDefault: false,
    scope: '用于对应管理单元资产的折旧计提'
  },
  {
    code: 'ABK-04',
    name: '丁资产账簿',
    isDefault: false,
    scope: '用于对应管理单元资产的折旧计提'
  }
];
