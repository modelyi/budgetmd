// AB.11 岗位字典
// 岗位用于 BAA.3 岗位工时费率设置、BB.1.3 技术服务人工明细的「岗位」字段引用

export interface PositionDictItem {
  code: string;   // 岗位编码
  name: string;   // 岗位名称
  status: string; // 状态（启用/停用）
  remarks: string;// 岗位说明
}

export const POSITION_DICTS: PositionDictItem[] = [
  { code: 'POS-01', name: '高级激光装调工程师', status: '启用', remarks: '整机激光光路装调与精度校准' },
  { code: 'POS-02', name: '数控算法开发专家', status: '启用', remarks: '数控系统算法开发与调试' },
  { code: 'POS-03', name: '电气控制维保技师', status: '启用', remarks: '电气控制系统安装与维保' },
  { code: 'POS-04', name: '机械装配专家', status: '启用', remarks: '整机机械结构装配' },
  { code: 'POS-05', name: '光学装调工程师', status: '启用', remarks: '光学器件装调与测试' },
  { code: 'POS-06', name: '激光工艺专家', status: '启用', remarks: '激光加工工艺开发' },
  { code: 'POS-07', name: 'MES实施架构师', status: '启用', remarks: '制造执行系统实施' },
  { code: 'POS-08', name: '现场应用培训讲师', status: '启用', remarks: '客户现场应用培训' }
];
