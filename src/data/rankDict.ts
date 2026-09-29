// AB.12 职级字典
// 职级用于 BAA.3 岗位工时费率设置、BB.1.3 技术服务人工明细的「职级」字段引用

export interface RankDictItem {
  code: string;   // 职级编码
  name: string;   // 职级名称
  status: string; // 状态（启用/停用）
  remarks: string;// 职级说明
}

export const RANK_DICTS: RankDictItem[] = [
  { code: 'RANK-01', name: '职级1', status: '启用', remarks: '初级职级' },
  { code: 'RANK-02', name: '职级2', status: '启用', remarks: '中级职级' },
  { code: 'RANK-03', name: 'T1', status: '启用', remarks: '技术序列一级' },
  { code: 'RANK-04', name: 'T2', status: '启用', remarks: '技术序列二级' },
  { code: 'RANK-05', name: 'T3', status: '启用', remarks: '技术序列三级' },
  { code: 'RANK-06', name: 'T4', status: '启用', remarks: '技术序列四级' },
  { code: 'RANK-07', name: 'T5', status: '启用', remarks: '技术序列五级' }
];
