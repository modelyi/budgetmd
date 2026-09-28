// AB.13 授信类型字典
// 供 BF.3.e 授信预算表「授信类型」字段下拉引用；固定值域，不可在编制表内新增值。

export interface CreditTypeDictItem {
  code: string;   // 授信类型编码
  name: string;   // 授信类型名称
  status: string; // 状态（启用/停用）
  remarks: string;// 适用范围说明
}

export const CREDIT_TYPE_DICTS: CreditTypeDictItem[] = [
  { code: 'CT-01', name: '流动资金贷款', status: '启用', remarks: '企业日常经营周转所需流动资金借款授信' },
  { code: 'CT-02', name: '并购贷款', status: '启用', remarks: '并购交易融资授信' },
  { code: 'CT-03', name: '固定资产贷款', status: '启用', remarks: '固定资产（设备、厂房等）购建项目贷款授信' },
  { code: 'CT-04', name: '债券', status: '启用', remarks: '债券承销 / 发行授信' },
  { code: 'CT-05', name: '供应链融资', status: '启用', remarks: '供应链金融（应付账款融资、保理等）授信' },
  { code: 'CT-06', name: '贸易融资', status: '启用', remarks: '贸易融资（信用证、押汇等）授信' },
  { code: 'CT-07', name: '其他授信', status: '启用', remarks: '其他综合授信品种' },
];
