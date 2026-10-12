import { BudgetProjectMasterItem } from '../types';

type ProjectSeed = {
  code: string;
  name: string;
  nature: BudgetProjectMasterItem['nature'];
  projectType?: BudgetProjectMasterItem['projectType'];
  parentName?: string;
};

const PROJECT_TYPE_CODES: Partial<Record<NonNullable<ProjectSeed['projectType']>, NonNullable<BudgetProjectMasterItem['projectTypeCode']>>> = {
  产品化: 'PRODUCT',
  产能: 'CAPACITY',
  销售: 'SALE',
  业务交付: 'DELIVERY',
  基建: 'CAPEX',
  职能: 'FUNCTION',
  公共平台: 'PLATFORM',
  研发: 'R&D',
};

function buildProject(
  seed: ProjectSeed
): BudgetProjectMasterItem {
  const fullName = seed.parentName ? `${seed.parentName}-${seed.name}` : seed.name;
  return {
    code: seed.code,
    name: seed.name,
    namingStrategy: '上级名称-本级名称',
    fullName,
    shortName: seed.name,
    nature: seed.nature,
    projectType: seed.projectType,
    projectTypeCode: seed.projectType ? PROJECT_TYPE_CODES[seed.projectType] : undefined,
  };
}

/** AA.6 的销售项目判定只依赖稳定编码，不依赖可变的中文展示名称。 */
export function isSalesProject(project: Pick<BudgetProjectMasterItem, 'projectTypeCode'>): boolean {
  return project.projectTypeCode === 'SALE';
}

// 预算项目主数据：高端激光切割机公司演示树
// 编码规则：PRJ + 4位流水号，编码本身不携带层级/类型语义
const RAW_BUDGET_PROJECT_MASTER_DATA: BudgetProjectMasterItem[] = [
  buildProject({ code: 'PRJ0001', name: '激光切割装备集团项目', nature: '汇总' }),
  buildProject({ code: 'PRJ0002', name: '集团统筹', nature: '汇总', parentName: '激光切割装备集团项目' }),

  buildProject({ code: 'PRJ0003', name: '产品化项目', nature: '汇总', projectType: '产品化', parentName: '激光切割装备集团项目' }),

  // P1 高功率平板光纤激光切割机
  buildProject({ code: 'PRJ0004', name: 'P1 高功率平板光纤激光切割机', nature: '汇总', projectType: '产品化', parentName: '产品化项目' }),
  buildProject({ code: 'PRJ0005', name: 'P1-机床与龙门', nature: '汇总', projectType: '产品化', parentName: 'P1 高功率平板光纤激光切割机' }),
  buildProject({ code: 'PRJ0006', name: 'P1-床身横梁与交换工作台', nature: '汇总', projectType: '产品化', parentName: 'P1-机床与龙门' }),
  buildProject({ code: 'PRJ0007', name: 'P1-焊接床身与退火去应力', nature: '普通', projectType: '产品化', parentName: 'P1-床身横梁与交换工作台' }),
  buildProject({ code: 'PRJ0008', name: 'P1-双交换工作台与同步传动', nature: '普通', projectType: '产品化', parentName: 'P1-床身横梁与交换工作台' }),
  buildProject({ code: 'PRJ0009', name: 'P1-激光源与光路', nature: '汇总', projectType: '产品化', parentName: 'P1 高功率平板光纤激光切割机' }),
  buildProject({ code: 'PRJ0010', name: 'P1-光纤激光器集成', nature: '汇总', projectType: '产品化', parentName: 'P1-激光源与光路' }),
  buildProject({ code: 'PRJ0011', name: 'P1-20kW~40kW 光纤激光器选型集成', nature: '普通', projectType: '产品化', parentName: 'P1-光纤激光器集成' }),
  buildProject({ code: 'PRJ0012', name: 'P1-光束传输与准直光路', nature: '普通', projectType: '产品化', parentName: 'P1-光纤激光器集成' }),
  buildProject({ code: 'PRJ0013', name: 'P1-切割头与工艺气', nature: '汇总', projectType: '产品化', parentName: 'P1-激光源与光路' }),
  buildProject({ code: 'PRJ0014', name: 'P1-自动调焦切割头', nature: '普通', projectType: '产品化', parentName: 'P1-切割头与工艺气' }),
  buildProject({ code: 'PRJ0015', name: 'P1-氮气/氧气工艺气路与喷嘴库', nature: '普通', projectType: '产品化', parentName: 'P1-切割头与工艺气' }),
  buildProject({ code: 'PRJ0016', name: 'P1-数控与伺服', nature: '汇总', projectType: '产品化', parentName: 'P1 高功率平板光纤激光切割机' }),
  buildProject({ code: 'PRJ0017', name: 'P1-运动控制', nature: '汇总', projectType: '产品化', parentName: 'P1-数控与伺服' }),
  buildProject({ code: 'PRJ0018', name: 'P1-总线数控与多轴伺服', nature: '普通', projectType: '产品化', parentName: 'P1-运动控制' }),
  buildProject({ code: 'PRJ0019', name: 'P1-随动高度传感与防撞', nature: '普通', projectType: '产品化', parentName: 'P1-运动控制' }),
  buildProject({ code: 'PRJ0020', name: 'P1-软件与套料', nature: '汇总', projectType: '产品化', parentName: 'P1 高功率平板光纤激光切割机' }),
  buildProject({ code: 'PRJ0021', name: 'P1-CAM 与排样', nature: '汇总', projectType: '产品化', parentName: 'P1-软件与套料' }),
  buildProject({ code: 'PRJ0022', name: 'P1-智能排样套料软件', nature: '普通', projectType: '产品化', parentName: 'P1-CAM 与排样' }),
  buildProject({ code: 'PRJ0023', name: 'P1-共边切割与飞切工艺包', nature: '普通', projectType: '产品化', parentName: 'P1-CAM 与排样' }),
  buildProject({ code: 'PRJ0024', name: 'P1-整机', nature: '汇总', projectType: '产品化', parentName: 'P1 高功率平板光纤激光切割机' }),
  buildProject({ code: 'PRJ0025', name: 'P1-整机集成与工艺验证', nature: '汇总', projectType: '产品化', parentName: 'P1-整机' }),
  buildProject({ code: 'PRJ0026', name: 'P1-大幅面光纤激光切割机整机', nature: '普通', projectType: '产品化', parentName: 'P1-整机集成与工艺验证' }),
  buildProject({ code: 'PRJ0027', name: 'P1-厚板碳钢/不锈钢工艺认证', nature: '普通', projectType: '产品化', parentName: 'P1-整机集成与工艺验证' }),

  // P2 三维五轴激光切管/切型机
  buildProject({ code: 'PRJ0028', name: 'P2 三维五轴激光切管机', nature: '汇总', projectType: '产品化', parentName: '产品化项目' }),
  buildProject({ code: 'PRJ0029', name: 'P2-卡盘与管材输送', nature: '汇总', projectType: '产品化', parentName: 'P2 三维五轴激光切管机' }),
  buildProject({ code: 'PRJ0030', name: 'P2-气动卡盘与送料', nature: '汇总', projectType: '产品化', parentName: 'P2-卡盘与管材输送' }),
  buildProject({ code: 'PRJ0031', name: 'P2-前卡盘/后卡盘同步夹持', nature: '普通', projectType: '产品化', parentName: 'P2-气动卡盘与送料' }),
  buildProject({ code: 'PRJ0032', name: 'P2-超长管材自动上料', nature: '普通', projectType: '产品化', parentName: 'P2-气动卡盘与送料' }),
  buildProject({ code: 'PRJ0033', name: 'P2-五轴切割头', nature: '汇总', projectType: '产品化', parentName: 'P2 三维五轴激光切管机' }),
  buildProject({ code: 'PRJ0034', name: 'P2-三维摆动头', nature: '汇总', projectType: '产品化', parentName: 'P2-五轴切割头' }),
  buildProject({ code: 'PRJ0035', name: 'P2-A/B 轴摆动切割头', nature: '普通', projectType: '产品化', parentName: 'P2-三维摆动头' }),
  buildProject({ code: 'PRJ0036', name: 'P2-坡口切割与相贯线工艺', nature: '普通', projectType: '产品化', parentName: 'P2-三维摆动头' }),
  buildProject({ code: 'PRJ0037', name: 'P2-数控与安全', nature: '汇总', projectType: '产品化', parentName: 'P2 三维五轴激光切管机' }),
  buildProject({ code: 'PRJ0038', name: 'P2-五轴插补控制', nature: '汇总', projectType: '产品化', parentName: 'P2-数控与安全' }),
  buildProject({ code: 'PRJ0039', name: 'P2-五轴实时插补与防碰撞', nature: '普通', projectType: '产品化', parentName: 'P2-五轴插补控制' }),
  buildProject({ code: 'PRJ0040', name: 'P2-管材重心补偿与尾料优化', nature: '普通', projectType: '产品化', parentName: 'P2-五轴插补控制' }),
  buildProject({ code: 'PRJ0041', name: 'P2-整机', nature: '汇总', projectType: '产品化', parentName: 'P2 三维五轴激光切管机' }),
  buildProject({ code: 'PRJ0042', name: 'P2-整机集成与交付验证', nature: '汇总', projectType: '产品化', parentName: 'P2-整机' }),
  buildProject({ code: 'PRJ0043', name: 'P2-三维五轴切管机整机', nature: '普通', projectType: '产品化', parentName: 'P2-整机集成与交付验证' }),

  // P3 超快/复合加工预研
  buildProject({ code: 'PRJ0044', name: 'P3 超快激光与复合加工预研', nature: '汇总', projectType: '研发', parentName: '产品化项目' }),
  buildProject({ code: 'PRJ0045', name: 'P3-皮秒/飞秒微孔与激光切割预研', nature: '普通', projectType: '研发', parentName: 'P3 超快激光与复合加工预研' }),
  buildProject({ code: 'PRJ0046', name: 'P3-激光熔覆与清洗复合工艺平台', nature: '普通', projectType: '研发', parentName: 'P3 超快激光与复合加工预研' }),

  // 产能
  buildProject({ code: 'PRJ0047', name: '产能项目', nature: '汇总', projectType: '产能', parentName: '激光切割装备集团项目' }),
  buildProject({ code: 'PRJ0048', name: '整机总装与联调产线扩建（一期）', nature: '普通', projectType: '产能', parentName: '产能项目' }),
  buildProject({ code: 'PRJ0049', name: '床身/横梁加工作业产能扩建（一期）', nature: '普通', projectType: '产能', parentName: '产能项目' }),
  buildProject({ code: 'PRJ0050', name: '切割头与光路装配线（一期）', nature: '普通', projectType: '产能', parentName: '产能项目' }),

  // 业务交付
  buildProject({ code: 'PRJ0051', name: '业务交付项目', nature: '汇总', projectType: '业务交付', parentName: '激光切割装备集团项目' }),
  buildProject({ code: 'PRJ0052', name: '汽车白车身激光切割线交付项目', nature: '普通', projectType: '业务交付', parentName: '业务交付项目' }),
  buildProject({ code: 'PRJ0053', name: '工程机械厚板切割产线交付项目', nature: '普通', projectType: '业务交付', parentName: '业务交付项目' }),
  buildProject({ code: 'PRJ0054', name: '船舶钢结构超大幅面切割交付项目', nature: '普通', projectType: '业务交付', parentName: '业务交付项目' }),
  buildProject({ code: 'PRJ0055', name: '管材家具/健身器材切管交付项目', nature: '普通', projectType: '业务交付', parentName: '业务交付项目' }),
  buildProject({ code: 'PRJ0056', name: '海外渠道整机与工艺包交付项目', nature: '普通', projectType: '业务交付', parentName: '业务交付项目' }),

  // 销售项目
  buildProject({ code: 'PRJ0057', name: '销售项目', nature: '汇总', projectType: '销售', parentName: '激光切割装备集团项目' }),

  // S1 平板激光切割机销售
  buildProject({ code: 'PRJ0058', name: 'S1 平板激光切割机', nature: '汇总', projectType: '销售', parentName: '销售项目' }),
  buildProject({ code: 'PRJ0059', name: 'S1-P1 高功率平板机-华东区销售', nature: '普通', projectType: '销售', parentName: 'S1 平板激光切割机' }),
  buildProject({ code: 'PRJ0060', name: 'S1-P1 高功率平板机-华南区销售', nature: '普通', projectType: '销售', parentName: 'S1 平板激光切割机' }),
  buildProject({ code: 'PRJ0061', name: 'S1-P1 高功率平板机-华北区销售', nature: '普通', projectType: '销售', parentName: 'S1 平板激光切割机' }),
  buildProject({ code: 'PRJ0062', name: 'S1-P1 高功率平板机-海外区销售', nature: '普通', projectType: '销售', parentName: 'S1 平板激光切割机' }),

  // S2 三维切管机销售
  buildProject({ code: 'PRJ0063', name: 'S2 三维五轴切管机', nature: '汇总', projectType: '销售', parentName: '销售项目' }),
  buildProject({ code: 'PRJ0064', name: 'S2-P2 切管机-汽车白车身行业', nature: '普通', projectType: '销售', parentName: 'S2 三维五轴切管机' }),
  buildProject({ code: 'PRJ0065', name: 'S2-P2 切管机-家具管材行业', nature: '普通', projectType: '销售', parentName: 'S2 三维五轴切管机' }),
  buildProject({ code: 'PRJ0066', name: 'S2-P2 切管机-工程机械行业', nature: '普通', projectType: '销售', parentName: 'S2 三维五轴切管机' }),

  // S3 软件授权与升级
  buildProject({ code: 'PRJ0067', name: 'S3 软件授权与升级', nature: '汇总', projectType: '销售', parentName: '销售项目' }),
  buildProject({ code: 'PRJ0068', name: 'S3-智能排样套料软件授权', nature: '普通', projectType: '销售', parentName: 'S3 软件授权与升级' }),
  buildProject({ code: 'PRJ0069', name: 'S3-云运维平台年度订阅', nature: '普通', projectType: '销售', parentName: 'S3 软件授权与升级' }),

  // S4 备件与耗材销售
  buildProject({ code: 'PRJ0070', name: 'S4 备件与耗材', nature: '汇总', projectType: '销售', parentName: '销售项目' }),
  buildProject({ code: 'PRJ0071', name: 'S4-切割头保护镜片与喷嘴备件', nature: '普通', projectType: '销售', parentName: 'S4 备件与耗材' }),
  buildProject({ code: 'PRJ0072', name: 'S4-激光器易损件与光路耗材', nature: '普通', projectType: '销售', parentName: 'S4 备件与耗材' }),

  // 公共平台 / 职能 / 基建
  buildProject({ code: 'PRJ0073', name: '公共平台', nature: '汇总', projectType: '公共平台', parentName: '激光切割装备集团项目' }),
  buildProject({ code: 'PRJ0074', name: '切割工艺数据库与云运维平台', nature: '普通', projectType: '公共平台', parentName: '公共平台' }),
  buildProject({ code: 'PRJ0075', name: '远程诊断与备件预测平台', nature: '普通', projectType: '公共平台', parentName: '公共平台' }),
  buildProject({ code: 'PRJ0076', name: '职能部门', nature: '汇总', projectType: '职能', parentName: '激光切割装备集团项目' }),
  buildProject({ code: 'PRJ0077', name: '华东激光装备产业园一期厂房', nature: '普通', projectType: '基建', parentName: '职能部门' }),
  buildProject({ code: 'PRJ0078', name: '整机出厂检测与样件实验室改造', nature: '普通', projectType: '基建', parentName: '职能部门' }),
  buildProject({ code: 'PRJ0079', name: '切割头装配车间基建', nature: '普通', projectType: '基建', parentName: '职能部门' }),
  buildProject({ code: 'PRJ0080', name: '华北交付与培训中心基建', nature: '普通', projectType: '基建', parentName: '职能部门' }),
];

export const BUDGET_PROJECT_MASTER_DATA: BudgetProjectMasterItem[] = RAW_BUDGET_PROJECT_MASTER_DATA;
