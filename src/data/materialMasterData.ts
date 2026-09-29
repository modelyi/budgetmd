// AA.11 物料主数据：物料身份的唯一权威来源。
// 物料编码、名称、类型、计量单位不按法人拆分。
export interface MaterialMasterItem {
  materialCode: string;
  materialName: string;
  materialType: '光学件' | '核心部件' | '机械件' | '电气件' | '气路件' | '耗材' | '返修件';
  unit: string;
}

export const MATERIAL_MASTER_DATA: MaterialMasterItem[] = [
  { materialCode: 'MAT-OPT-001', materialName: '聚焦镜组', materialType: '光学件', unit: '套' },
  { materialCode: 'MAT-OPT-002', materialName: '防护镜片', materialType: '耗材', unit: '片' },
  { materialCode: 'MAT-MEC-003', materialName: '导流喷嘴', materialType: '机械件', unit: '只' },
  { materialCode: 'MAT-ELE-004', materialName: '绝缘转接环', materialType: '电气件', unit: '件' },
  { materialCode: 'MAT-DRV-005', materialName: '伺服驱动组件', materialType: '核心部件', unit: '台' },
  { materialCode: 'MAT-COL-006', materialName: '循环机组组件', materialType: '核心部件', unit: '台' },
  { materialCode: 'MAT-SNS-007', materialName: '高度传感板', materialType: '电气件', unit: '块' },
  { materialCode: 'MAT-GAS-008', materialName: '比例阀组', materialType: '气路件', unit: '套' },
  { materialCode: 'MAT-RTN-001', materialName: '返修镜组', materialType: '返修件', unit: '套' },
  { materialCode: 'MAT-RTN-002', materialName: '返修驱动模块', materialType: '返修件', unit: '台' },
  { materialCode: 'MAT-CAB-011', materialName: '动力总线电缆', materialType: '电气件', unit: '米' },
  { materialCode: 'MAT-LNS-012', materialName: '对准指示模组', materialType: '光学件', unit: '只' },
];

export const MATERIAL_MASTER_MAP = Object.fromEntries(
  MATERIAL_MASTER_DATA.map(item => [item.materialCode, item])
) as Record<string, MaterialMasterItem>;
