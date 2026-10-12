// AB.17 融资类型字典
// 固定值域字典：供 BF.3.c 融资预算明细表「融资类型」字段下拉引用，不可在编制表内新增值。
// 编码体系为演示用虚构编码（XYZ- 前缀），与客户资金模块的真实编码体系无对应关系。
// XYZ-01～XYZ-15=外部/银行类；XYZ-16～XYZ-20=集团内部类。两级编码：一级 20 条、二级 18 条。
// 一级＝XYZ-＋两位序号（01～20）；二级＝XYZ-＋所属一级两位序号＋两位子序号（01～08），故二级上级＝其编码前 6 位。
// 备注列不编造业务说明：一级留空，二级仅标注所属一级。

export interface FinancingTypeDictItem {
  code: string;        // 融资类型编码
  name: string;        // 业务名称
  level: '一级' | '二级'; // 层级
  parentCode: string;  // 上级编码（一级留空；二级=所属一级编码）
  category: string;    // 类型归属（XYZ-01～XYZ-15=外部/银行类，XYZ-16～XYZ-20=集团内部类）
  status: string;      // 状态（启用/停用）
  remarks: string;     // 备注（不编造业务说明；二级仅标注所属一级）
}

export const FINANCING_TYPE_DICTS: FinancingTypeDictItem[] = [
  // ── 一级（20 条）：XYZ-01～XYZ-15=外部/银行类 ──
  { code: 'XYZ-01', name: '银行借款', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-02', name: '担保', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-03', name: '抵质押', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-04', name: '开票', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-05', name: '贴现', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-06', name: '国际信用证', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-07', name: '债券融资', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-08', name: '融资租赁', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-09', name: '保函', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-10', name: '信贷证明', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-11', name: '国内信用证', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-12', name: '贸易融资', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-13', name: '应收账款保理', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-14', name: '拆借管理', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  { code: 'XYZ-15', name: '外汇管理', level: '一级', parentCode: '', category: '外部/银行类', status: '启用', remarks: '' },
  // ── 一级（20 条）：XYZ-16～XYZ-20=集团内部类 ──
  { code: 'XYZ-16', name: '内部借款', level: '一级', parentCode: '', category: '集团内部类', status: '启用', remarks: '' },
  { code: 'XYZ-17', name: '担保', level: '一级', parentCode: '', category: '集团内部类', status: '启用', remarks: '' },
  { code: 'XYZ-18', name: '抵质押', level: '一级', parentCode: '', category: '集团内部类', status: '启用', remarks: '' },
  { code: 'XYZ-19', name: '开票', level: '一级', parentCode: '', category: '集团内部类', status: '启用', remarks: '' },
  { code: 'XYZ-20', name: '贴现', level: '一级', parentCode: '', category: '集团内部类', status: '启用', remarks: '' },
  // ── 二级（18 条）：上级为所属一级编码 ──
  { code: 'XYZ-0101', name: '银行长期贷款', level: '二级', parentCode: 'XYZ-01', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-01 银行借款' },
  { code: 'XYZ-0102', name: '项目贷款', level: '二级', parentCode: 'XYZ-01', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-01 银行借款' },
  { code: 'XYZ-0103', name: '流动贷款', level: '二级', parentCode: 'XYZ-01', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-01 银行借款' },
  { code: 'XYZ-0104', name: '委托贷款', level: '二级', parentCode: 'XYZ-01', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-01 银行借款' },
  { code: 'XYZ-0401', name: '票据开票', level: '二级', parentCode: 'XYZ-04', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-04 开票' },
  { code: 'XYZ-0901', name: '投标保函', level: '二级', parentCode: 'XYZ-09', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-09 保函' },
  { code: 'XYZ-0902', name: '履约保函', level: '二级', parentCode: 'XYZ-09', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-09 保函' },
  { code: 'XYZ-0903', name: '支付保函', level: '二级', parentCode: 'XYZ-09', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-09 保函' },
  { code: 'XYZ-0904', name: '预付款保函', level: '二级', parentCode: 'XYZ-09', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-09 保函' },
  { code: 'XYZ-0905', name: '关税/海关保函', level: '二级', parentCode: 'XYZ-09', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-09 保函' },
  { code: 'XYZ-0906', name: '分期付款保函', level: '二级', parentCode: 'XYZ-09', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-09 保函' },
  { code: 'XYZ-0907', name: '租赁保函', level: '二级', parentCode: 'XYZ-09', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-09 保函' },
  { code: 'XYZ-0908', name: '保留金保函', level: '二级', parentCode: 'XYZ-09', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-09 保函' },
  { code: 'XYZ-1401', name: '拆借管理借入', level: '二级', parentCode: 'XYZ-14', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-14 拆借管理' },
  { code: 'XYZ-1402', name: '拆借管理借出', level: '二级', parentCode: 'XYZ-14', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-14 拆借管理' },
  { code: 'XYZ-1501', name: '外汇即期', level: '二级', parentCode: 'XYZ-15', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-15 外汇管理' },
  { code: 'XYZ-1502', name: '外汇远期', level: '二级', parentCode: 'XYZ-15', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-15 外汇管理' },
  { code: 'XYZ-1503', name: '利率掉期', level: '二级', parentCode: 'XYZ-15', category: '外部/银行类', status: '启用', remarks: '上级一级：XYZ-15 外汇管理' },
];
