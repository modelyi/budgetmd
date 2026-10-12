export interface ManagementUnit {
  seq?: number;           // 序号
  code?: string;          // 管理单元编码 (如: MU-01)
  name: string;           // 管理单元
  legalEntityName: string;// 关联法人公司
  assetBook?: string;     // 资产账簿（关联 AB.10 资产账簿字典）
  notes?: string;         // 备注
}

export const MANAGEMENT_UNITS: ManagementUnit[] = [
  // 1. 甜甜圈集团公司
  { seq: 1, code: 'MU-01', name: '管理单元01', legalEntityName: '甜甜圈集团公司', assetBook: '甲资产账簿', notes: '' },
  { seq: 2, code: 'MU-02', name: '管理单元02', legalEntityName: '甜甜圈集团公司', assetBook: '甲资产账簿', notes: '' },
  { seq: 3, code: 'MU-03', name: '管理单元03', legalEntityName: '甜甜圈集团公司', assetBook: '甲资产账簿', notes: '' },
  { seq: 4, code: 'MU-04', name: '管理单元04', legalEntityName: '甜甜圈集团公司', assetBook: '甲资产账簿', notes: '' },
  { seq: 5, code: 'MU-05', name: '管理单元05', legalEntityName: '甜甜圈集团公司', assetBook: '甲资产账簿', notes: '' },

  // 2. 草莓慕斯公司 (A)
  { seq: 6, code: 'MU-06', name: '管理单元06', legalEntityName: '草莓慕斯公司', assetBook: '乙资产账簿', notes: '' },
  { seq: 7, code: 'MU-07', name: '管理单元07', legalEntityName: '草莓慕斯公司', assetBook: '乙资产账簿', notes: '' },
  { seq: 8, code: 'MU-08', name: '管理单元08', legalEntityName: '草莓慕斯公司', assetBook: '乙资产账簿', notes: '' },

  // 3. 蓝莓蛋挞公司 (B)
  { seq: 9, code: 'MU-09', name: '管理单元09', legalEntityName: '蓝莓蛋挞公司', assetBook: '丙资产账簿', notes: '' },
  { seq: 10, code: 'MU-10', name: '管理单元10', legalEntityName: '蓝莓蛋挞公司', assetBook: '丙资产账簿', notes: '' },
  { seq: 11, code: 'MU-11', name: '管理单元11', legalEntityName: '蓝莓蛋挞公司', assetBook: '丙资产账簿', notes: '' },

  // 4. 芒果班戟公司 (C)
  { seq: 12, code: 'MU-12', name: '管理单元12', legalEntityName: '芒果班戟公司', assetBook: '丁资产账簿', notes: '' },
  { seq: 13, code: 'MU-13', name: '管理单元13', legalEntityName: '芒果班戟公司', assetBook: '丁资产账簿', notes: '' },

  // 5. 西瓜泡芙公司 (D)
  { seq: 14, code: 'MU-14', name: '管理单元14', legalEntityName: '西瓜泡芙公司', assetBook: '甲资产账簿', notes: '' },
  { seq: 15, code: 'MU-15', name: '管理单元15', legalEntityName: '西瓜泡芙公司', assetBook: '甲资产账簿', notes: '' },

  // 6. 抹茶曲奇公司 (BA)
  { seq: 16, code: 'MU-16', name: '管理单元16', legalEntityName: '抹茶曲奇公司', assetBook: '乙资产账簿', notes: '' },
  { seq: 17, code: 'MU-17', name: '管理单元17', legalEntityName: '抹茶曲奇公司', assetBook: '乙资产账簿', notes: '' },

  // 7. 樱桃华夫公司 (BB)
  { seq: 18, code: 'MU-18', name: '管理单元18', legalEntityName: '樱桃华夫公司', assetBook: '丙资产账簿', notes: '' },

  // 8. 椰香可露丽公司 (BC)
  { seq: 19, code: 'MU-19', name: '管理单元19', legalEntityName: '椰香可露丽公司', assetBook: '丁资产账簿', notes: '' },

  // 9. 海盐芝士公司 (BD)
  { seq: 20, code: 'MU-20', name: '管理单元20', legalEntityName: '海盐芝士公司', assetBook: '甲资产账簿', notes: '' },

  // 10. 蜜桃千层公司 (DA)
  { seq: 21, code: 'MU-21', name: '管理单元21', legalEntityName: '蜜桃千层公司', assetBook: '乙资产账簿', notes: '' },

  // 11. 香橙舒芙蕾公司 (DB)
  { seq: 22, code: 'MU-22', name: '管理单元22', legalEntityName: '香橙舒芙蕾公司', assetBook: '丙资产账簿', notes: '' },

  // 12. 青提马卡龙公司 (DC)
  { seq: 23, code: 'MU-23', name: '管理单元23', legalEntityName: '青提马卡龙公司', assetBook: '丁资产账簿', notes: '' }
];

export const MANAGEMENT_UNIT_MAP: Record<string, ManagementUnit> = MANAGEMENT_UNITS.reduce((acc, curr) => {
  if (curr.code) acc[curr.code] = curr;
  acc[curr.name] = curr;
  return acc;
}, {} as Record<string, ManagementUnit>);

/**
 * 根据管理单元名称或编码查询关联法人公司名称
 */
export function getLegalEntityByManagementUnit(unitNameOrCode: string): string {
  const mu = MANAGEMENT_UNIT_MAP[unitNameOrCode];
  if (mu) {
    return mu.legalEntityName;
  }
  return '甜甜圈集团公司';
}

