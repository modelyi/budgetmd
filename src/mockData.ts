import { MasterContract, ProductRevenueRule, ProductCategory, LegalEntity, HROrganizationItem, FinancingSummaryProductRow } from './types';
export { MANAGEMENT_UNITS, MANAGEMENT_UNIT_MAP, getLegalEntityByManagementUnit } from './data/managementUnitData';
export type { ManagementUnit } from './data/managementUnitData';

export const LEGAL_ENTITIES: LegalEntity[] = [
  { code: 'JT', name: '甜甜圈集团公司', parentId: undefined, level: 1, isConsolidated: true, category: '综合管理', description: '集团总部/母公司本部' },
  { code: 'A', name: '草莓慕斯公司', parentId: 'JT', level: 2, isConsolidated: true, category: '制造基地', description: '一级全资子公司 (智能装备整机制造基地)' },
  { code: 'B', name: '蓝莓蛋挞公司', parentId: 'JT', level: 2, isConsolidated: true, category: '制造基地', description: '一级全资子公司 (核心高精度装备制造)' },
  { code: 'C', name: '芒果班戟公司', parentId: 'JT', level: 2, isConsolidated: true, category: '研发中心', description: '一级全资子公司 (前沿软件与算法研发中心)' },
  { code: 'D', name: '西瓜泡芙公司', parentId: 'JT', level: 2, isConsolidated: true, category: '销售主体', description: '一级全资子公司 (国内综合销售与客户服务)' },
  { code: 'BA', name: '抹茶曲奇公司', parentId: 'B', level: 3, isConsolidated: true, category: '制造基地', description: '蓝莓蛋挞公司旗下二级子公司 (精致糖艺零部件)' },
  { code: 'BB', name: '樱桃华夫公司', parentId: 'B', level: 3, isConsolidated: true, category: '制造基地', description: '蓝莓蛋挞公司旗下二级子公司 (高精度结构组件加工)' },
  { code: 'BC', name: '椰香可露丽公司', parentId: 'B', level: 3, isConsolidated: true, category: '销售主体', description: '蓝莓蛋挞公司旗下二级子公司 (华南区域交付中心)' },
  { code: 'BD', name: '海盐芝士公司', parentId: 'B', level: 3, isConsolidated: true, category: '海外中心', description: '蓝莓蛋挞公司旗下二级子公司 (海外及进出口业务)' },
  { code: 'DA', name: '蜜桃千层公司', parentId: 'D', level: 3, isConsolidated: true, category: '销售主体', description: '西瓜泡芙公司旗下二级子公司 (华北及华东工程服务)' },
  { code: 'DB', name: '香橙舒芙蕾公司', parentId: 'D', level: 3, isConsolidated: true, category: '销售主体', description: '西瓜泡芙公司旗下二级子公司 (中西部客户服务)' },
  { code: 'DC', name: '青提马卡龙公司', parentId: 'D', level: 3, isConsolidated: true, category: '研发中心', description: '西瓜泡芙公司旗下二级子公司 (现场应用工程AE定制)' },
];

// 法人编码快速索引映射字典
export const HR_ORGANIZATION_DATA: HROrganizationItem[] = [
  { code: 'DET001', name: '集团管理层', fullName: '激光切割装备集团-集团管理层', type: '管理', status: '存储备用(暂未启用)', memo: '集团顶层管理组织' },
  { code: 'DET002', name: '董事会办公室', fullName: '集团管理层-董事会办公室', type: '普通', status: '存储备用(暂未启用)', memo: '最高决策机构' },
  { code: 'DET003', name: '总经理办公室', fullName: '集团管理层-总经理办公室', type: '普通', status: '存储备用(暂未启用)', memo: '集团行政管理中枢' },
  { code: 'DET004', name: '战略发展部', fullName: '集团管理层-战略发展部', type: '普通', status: '存储备用(暂未启用)', memo: '战略规划与投资并购' },
  { code: 'DET005', name: '法务合规部', fullName: '集团管理层-法务合规部', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET006', name: '内部审计部', fullName: '集团管理层-内部审计部', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET007', name: '品牌与市场部', fullName: '集团管理层-品牌与市场部', type: '普通', status: '存储备用(暂未启用)', memo: '品牌形象与展会推广' },
  { code: 'DET008', name: '安全环保部', fullName: '集团管理层-安全环保部', type: '普通', status: '存储备用(暂未启用)', memo: '激光安全与生产环保' },
  { code: 'DET009', name: '研发中心', fullName: '激光切割装备集团-研发中心', type: '管理', status: '存储备用(暂未启用)', memo: '核心技术研发组织' },
  { code: 'DET010', name: '研发中心本部', fullName: '研发中心-研发中心本部', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET011', name: '激光源研发部', fullName: '研发中心-激光源研发部', type: '普通', status: '存储备用(暂未启用)', memo: '激光器/光束传输系统研发' },
  { code: 'DET012', name: '切割头与工艺部', fullName: '研发中心-切割头与工艺部', type: '普通', status: '存储备用(暂未启用)', memo: '切割头设计及切割工艺参数研究' },
  { code: 'DET013', name: '机械结构设计部', fullName: '研发中心-机械结构设计部', type: '普通', status: '存储备用(暂未启用)', memo: '机床床身/横梁/交换工作台结构设计' },
  { code: 'DET014', name: '智能系统开发部', fullName: '研发中心-智能系统开发部', type: '普通', status: '存储备用(暂未启用)', memo: '智能控制系统及动态控制算法开发' },
  { code: 'DET015', name: '软件与云平台部', fullName: '研发中心-软件与云平台部', type: '普通', status: '存储备用(暂未启用)', memo: '套料软件/HMI/远程运维云平台开发' },
  { code: 'DET016', name: '激光系统集成部', fullName: '研发中心-激光系统集成部', type: '普通', status: '存储备用(暂未启用)', memo: '光路设计与激光束传输系统集成' },
  { code: 'DET017', name: '前沿技术预研部', fullName: '研发中心-前沿技术预研部', type: '普通', status: '存储备用(暂未启用)', memo: '超快激光/复合加工等前沿方向' },
  { code: 'DET018', name: '测试与验证实验室', fullName: '研发中心-测试与验证实验室', type: '普通', status: '存储备用(暂未启用)', memo: '整机性能测试/可靠性验证/材料打样' },
  { code: 'DET019', name: '平板激光切割事业部', fullName: '激光切割装备集团-平板激光切割事业部', type: '管理', status: '存储备用(暂未启用)', memo: '主营平板激光切割机产品线' },
  { code: 'DET020', name: '平板切割事业部本部', fullName: '平板激光切割事业部-平板切割事业部本部', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET021', name: '中功率切割产品线', fullName: '平板激光切割事业部-中功率切割产品线', type: '普通', status: '存储备用(暂未启用)', memo: '1kW-6kW光纤激光切割机(6000×2500mm幅面)' },
  { code: 'DET022', name: '高功率切割产品线', fullName: '平板激光切割事业部-高功率切割产品线', type: '普通', status: '存储备用(暂未启用)', memo: '12kW-60kW高功率激光切割机(12000×2500mm幅面)' },
  { code: 'DET023', name: '超大幅面切割产品线', fullName: '平板激光切割事业部-超大幅面切割产品线', type: '普通', status: '存储备用(暂未启用)', memo: '船舶/桥梁/钢结构用超大幅面切割装备' },
  { code: 'DET024', name: '切割工艺应用组', fullName: '平板激光切割事业部-切割工艺应用组', type: '普通', status: '存储备用(暂未启用)', memo: '碳钢/不锈钢/铝合金等材料切割工艺' },
  { code: 'DET025', name: '管材激光切割事业部', fullName: '激光切割装备集团-管材激光切割事业部', type: '管理', status: '存储备用(暂未启用)', memo: '管材/型材激光切割产品线' },
  { code: 'DET026', name: '管材切割事业部本部', fullName: '管材激光切割事业部-管材切割事业部本部', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET027', name: '圆管切割产品线', fullName: '管材激光切割事业部-圆管切割产品线', type: '普通', status: '存储备用(暂未启用)', memo: '全自动圆管激光切割装备' },
  { code: 'DET028', name: '异型管切割产品线', fullName: '管材激光切割事业部-异型管切割产品线', type: '普通', status: '存储备用(暂未启用)', memo: '方管/矩形管/异型管材切割' },
  { code: 'DET029', name: '管板一体切割产品线', fullName: '管材激光切割事业部-管板一体切割产品线', type: '普通', status: '存储备用(暂未启用)', memo: '管板两用复合切割装备' },
  { code: 'DET030', name: '多轴及自动化事业部', fullName: '激光切割装备集团-多轴及自动化事业部', type: '管理', status: '存储备用(暂未启用)', memo: '多轴高精度及自动化产线' },
  { code: 'DET031', name: '多轴自动化事业部本部', fullName: '多轴及自动化事业部-多轴自动化事业部本部', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET032', name: '多轴高精度切割产品线', fullName: '多轴及自动化事业部-多轴高精度切割产品线', type: '普通', status: '存储备用(暂未启用)', memo: '汽车白车身/航空零部件多轴切割' },
  { code: 'DET033', name: '自动化产线集成部', fullName: '多轴及自动化事业部-自动化产线集成部', type: '普通', status: '存储备用(暂未启用)', memo: '自动上下料/仓储物流/产线集成方案' },
  { code: 'DET034', name: '机器人激光应用部', fullName: '多轴及自动化事业部-机器人激光应用部', type: '普通', status: '存储备用(暂未启用)', memo: '机器人焊接/清洗/熔覆等扩展应用' },
  { code: 'DET035', name: '智能制造与交付中心', fullName: '激光切割装备集团-智能制造与交付中心', type: '管理', status: '存储备用(暂未启用)', memo: '整机组装制造与交付' },
  { code: 'DET036', name: '制造交付中心本部', fullName: '智能制造与交付中心-制造交付中心本部', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET037', name: '高精度机械加工作业车间', fullName: '智能制造与交付中心-高精度机械加工作业车间', type: '普通', status: '存储备用(暂未启用)', memo: '床身/横梁/滑台等高精度零部件加工' },
  { code: 'DET038', name: '激光核心部件装配车间', fullName: '智能制造与交付中心-激光核心部件装配车间', type: '普通', status: '存储备用(暂未启用)', memo: '激光器/切割头/光路系统洁净装配' },
  { code: 'DET039', name: '整机总装与调试车间', fullName: '智能制造与交付中心-整机总装与调试车间', type: '普通', status: '存储备用(暂未启用)', memo: '整机总装/光机电联调/出厂检验' },
  { code: 'DET040', name: '生产计划与调度部', fullName: '智能制造与交付中心-生产计划与调度部', type: '普通', status: '存储备用(暂未启用)', memo: '排产计划/订单交期管理' },
  { code: 'DET041', name: '制造工艺工程部', fullName: '智能制造与交付中心-制造工艺工程部', type: '普通', status: '存储备用(暂未启用)', memo: '装配工艺/SOP/工装夹具设计' },
  { code: 'DET042', name: '质量管理部', fullName: '激光切割装备集团-质量管理部', type: '管理', status: '存储备用(暂未启用)', memo: '全链路质量管控' },
  { code: 'DET043', name: '来料检验部(IQC)', fullName: '质量管理部-来料检验部(IQC)', type: '普通', status: '存储备用(暂未启用)', memo: '激光器件/机械件/电气件来料检验' },
  { code: 'DET044', name: '过程检验部(IPQC)', fullName: '质量管理部-过程检验部(IPQC)', type: '普通', status: '存储备用(暂未启用)', memo: '加工/装配过程质量巡检' },
  { code: 'DET045', name: '成品检验部(OQC)', fullName: '质量管理部-成品检验部(OQC)', type: '普通', status: '存储备用(暂未启用)', memo: '整机出厂检验/切割精度验收' },
  { code: 'DET046', name: '质量体系与认证部', fullName: '质量管理部-质量体系与认证部', type: '普通', status: '存储备用(暂未启用)', memo: 'ISO9001/CE/FDA等体系认证维护' },
  { code: 'DET047', name: '营销与服务中心', fullName: '激光切割装备集团-营销与服务中心', type: '管理', status: '存储备用(暂未启用)', memo: '全球销售与客户服务' },
  { code: 'DET048', name: '营销服务中心本部', fullName: '营销与服务中心-营销服务中心本部', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET049', name: '华东销售大区', fullName: '营销与服务中心-华东销售大区', type: '普通', status: '存储备用(暂未启用)', memo: '上海/江苏/浙江/安徽区域销售' },
  { code: 'DET050', name: '华南销售大区', fullName: '营销与服务中心-华南销售大区', type: '普通', status: '存储备用(暂未启用)', memo: '广东/福建/广西区域销售' },
  { code: 'DET051', name: '华北销售大区', fullName: '营销与服务中心-华北销售大区', type: '普通', status: '存储备用(暂未启用)', memo: '北京/天津/河北/山东区域销售' },
  { code: 'DET052', name: '中西部销售大区', fullName: '营销与服务中心-中西部销售大区', type: '普通', status: '存储备用(暂未启用)', memo: '湖北/湖南/四川/重庆/陕西区域销售' },
  { code: 'DET053', name: '海外事业部', fullName: '营销与服务中心-海外事业部', type: '普通', status: '存储备用(暂未启用)', memo: '东南亚/欧洲/北美等海外市场拓展' },
  { code: 'DET054', name: '售后服务与技术支援部', fullName: '营销与服务中心-售后服务与技术支援部', type: '普通', status: '存储备用(暂未启用)', memo: '设备安装/维修/备件/客户培训' },
  { code: 'DET055', name: '客户方案与投标部', fullName: '营销与服务中心-客户方案与投标部', type: '普通', status: '存储备用(暂未启用)', memo: '定制化切割方案设计与招投标' },
  { code: 'DET056', name: '采购与供应链管理部', fullName: '激光切割装备集团-采购与供应链管理部', type: '管理', status: '存储备用(暂未启用)', memo: '核心器件采购与供应链管控' },
  { code: 'DET057', name: '采购供应链本部', fullName: '采购与供应链管理部-采购供应链本部', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET058', name: '激光器件采购部', fullName: '采购与供应链管理部-激光器件采购部', type: '普通', status: '存储备用(暂未启用)', memo: '激光晶体/光纤/透镜等激光器件采购' },
  { code: 'DET059', name: '机械与电气采购部', fullName: '采购与供应链管理部-机械与电气采购部', type: '普通', status: '存储备用(暂未启用)', memo: '床身铸件/导轨/伺服电机/减速机等采购' },
  { code: 'DET060', name: '智能系统与控件采购部', fullName: '采购与供应链管理部-智能系统与控件采购部', type: '普通', status: '存储备用(暂未启用)', memo: '数控系统/PLC/触摸屏等电控器件采购' },
  { code: 'DET061', name: '仓储物流部', fullName: '采购与供应链管理部-仓储物流部', type: '普通', status: '存储备用(暂未启用)', memo: '原材料/在制品/成品仓储与发货物流' },
  { code: 'DET062', name: '供应商质量工程部(SQE)', fullName: '采购与供应链管理部-供应商质量工程部(SQE)', type: '普通', status: '存储备用(暂未启用)', memo: '供应商准入审核/质量辅导/绩效管理' },
  { code: 'DET063', name: '职能支撑部门', fullName: '激光切割装备集团-职能支撑部门', type: '管理', status: '存储备用(暂未启用)', memo: '集团职能支撑组织' },
  { code: 'DET064', name: '财务管理部', fullName: '激光切割装备集团-财务管理部', type: '管理', status: '存储备用(暂未启用)', memo: '集团财务核算与资金管理' },
  { code: 'DET065', name: '会计核算组', fullName: '财务管理部-会计核算组', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET066', name: '资金与税务组', fullName: '财务管理部-资金与税务组', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET067', name: '成本与预算组', fullName: '财务管理部-成本与预算组', type: '普通', status: '存储备用(暂未启用)', memo: '产品成本核算/全面预算管理' },
  { code: 'DET068', name: '人力资源部', fullName: '激光切割装备集团-人力资源部', type: '管理', status: '存储备用(暂未启用)', memo: '人力资源规划与组织发展' },
  { code: 'DET069', name: '招聘与配置组', fullName: '人力资源部-招聘与配置组', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET070', name: '薪酬绩效组', fullName: '人力资源部-薪酬绩效组', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET071', name: '培训与发展组', fullName: '人力资源部-培训与发展组', type: '普通', status: '存储备用(暂未启用)', memo: '激光技术/装配技能等专项培训' },
  { code: 'DET072', name: '研发中心HRBP', fullName: '人力资源部-研发中心HRBP', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET073', name: '制造与营销HRBP', fullName: '人力资源部-制造与营销HRBP', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET074', name: 'IT与数字化部', fullName: '激光切割装备集团-IT与数字化部', type: '管理', status: '存储备用(暂未启用)', memo: '信息化建设与智能制造数字化' },
  { code: 'DET075', name: 'IT基础设施组', fullName: 'IT与数字化部-IT基础设施组', type: '普通', status: '存储备用(暂未启用)' },
  { code: 'DET076', name: '业务系统开发组', fullName: 'IT与数字化部-业务系统开发组', type: '普通', status: '存储备用(暂未启用)', memo: 'ERP/MES/PLM等系统开发与运维' },
  { code: 'DET077', name: '工业物联网组', fullName: 'IT与数字化部-工业物联网组', type: '普通', status: '存储备用(暂未启用)', memo: '设备联网/数据采集/远程运维平台' },
  { code: 'DET078', name: '其他组织', fullName: '激光切割装备集团-其他组织', type: '普通', status: '存储备用(暂未启用)' },
];

// 自动生成内部交易流转路径
export const SIGNING_ENTITIES = LEGAL_ENTITIES.map(e => e.name);

// 项目编码与项目名称字典 (根据项目编号带出项目名称)
export const PROJECT_CATALOG: Array<{ code: string; name: string; defaultCustomer: string; defaultDept: string }> = [
  { code: 'PRJ2025-018', name: '华山派剑器B17高精度糖光一期交付项目', defaultCustomer: '华山派剑器工坊', defaultDept: '智能装备装备事业部' },
  { code: 'PRJ2025-042', name: '少林寺武备坊工坊12A装备交付项目', defaultCustomer: '少林寺武备坊', defaultDept: '智能装备装备事业部' },
  { code: 'PRJ2026-009', name: '武当山玄铁工坊T9产线调优技术服务项目', defaultCustomer: '武当山玄铁工坊', defaultDept: '糖光销售与服务部' },
  { code: 'PRJ2025-081', name: '松鼠存储高精度核心子模块备件包', defaultCustomer: '松鼠仓储食品科技', defaultDept: '售后与服务事业部' },
  { code: 'PRJ2026-033', name: '上海先进计算智能装备仿真引擎部署', defaultCustomer: '海豚先进烘焙', defaultDept: '软件与算法研发部' },
  { code: 'PRJ2025-095', name: '树懒显示合肥V3柔性产线糖光扩充项目', defaultCustomer: '树懒显示科技', defaultDept: '智能装备装备事业部' },
  { code: 'PRJ2026-112', name: '北极狐烘焙工坊7工艺机台维保项目', defaultCustomer: '北极狐烘焙', defaultDept: '售后与服务事业部' },
  { code: 'PRJ2027-NEW01', name: '高通量计算智能装备软件套件定制项目', defaultCustomer: '少林寺武备坊', defaultDept: '软件与算法研发部' },
];

// 产品分类标准成本率默认配置
export const DEFAULT_PRODUCT_COST_RATES: Record<ProductCategory, number> = {
  '整机台+验收款': 44,       // 毛利率 56% (沿用原整机成本率)
  '关键模组+验收款': 48,     // 毛利率 52% (原高精度核心子模块部件)
  '零部件耗材+交付款': 52,   // 毛利率 48% (原标准配件/备件)
  '软件授权+授权款': 18,     // 毛利率 82% (原软件授权)
  '技术服务维保+服务款': 35, // 毛利率 65% (原服务类)
};

export const MASTER_CONTRACTS: MasterContract[] = [
  { code: 'HT001', name: '少林总舵20kW激光切割机直供合同', type: '销售', defaultDepartment: '平板切割事业部', defaultCustomer: '少林寺武备坊', defaultFab: '少林总舵 (登封)', defaultSigningEntity: '甜甜圈集团公司', defaultRegion: '西安', isFramework: false },
  { code: 'HT002', name: '峨眉金顶坊年度维保与技术支持框架', type: '技术服务', defaultDepartment: '管材切割事业部', defaultCustomer: '峨眉派轻功器械', defaultFab: '峨眉金顶坊 (乐山)', defaultSigningEntity: '草莓慕斯公司', defaultRegion: '广州', isFramework: true },
  { code: 'HT003', name: '武当紫霄坊厚板坡口切割机采购协议', type: '销售', defaultDepartment: '平板切割事业部', defaultCustomer: '武当山玄铁工坊', defaultFab: '武当紫霄坊 (十堰)', defaultSigningEntity: '甜甜圈集团公司', defaultRegion: '合肥', isFramework: false },
  { code: 'HT004', name: '桃花积翠坊核心光学模组年度集采', type: '部件销售', defaultDepartment: '激光核心器件事业部', defaultCustomer: '桃花岛奇门工坊', defaultFab: '桃花积翠坊 (舟山)', defaultSigningEntity: '蓝莓蛋挞公司', defaultRegion: '上海', isFramework: true },
  { code: 'HT005', name: '华山玉女坊三维五轴切管机成套合同', type: '销售', defaultDepartment: '管材切割事业部', defaultCustomer: '华山派剑器工坊', defaultFab: '华山玉女坊 (渭南)', defaultSigningEntity: '甜甜圈集团公司', defaultRegion: '北京', isFramework: false },
  { code: 'HT006', name: '明教光明顶总线数控软件授权协议', type: '软件授权', defaultDepartment: '智能装备研发部', defaultCustomer: '明教光明工坊', defaultFab: '光明顶总坛 (和田)', defaultSigningEntity: '草莓慕斯公司', defaultRegion: '西安', isFramework: true },
  { code: 'HT007', name: '丐帮总舵易损耗材及喷嘴常年供应合同', type: '部件销售', defaultDepartment: '激光核心器件事业部', defaultCustomer: '丐帮江湖器械铺', defaultFab: '丐帮总舵 (开封)', defaultSigningEntity: '甜甜圈集团公司', defaultRegion: '广州', isFramework: true },
  { code: 'HT008', name: '逍遥派缥缈坊飞秒激光技术开发协议', type: '研发定制', defaultDepartment: '自动化装备事业部', defaultCustomer: '逍遥派琅嬛机房', defaultFab: '天山缥缈坊 (吐鲁番)', defaultSigningEntity: '草莓慕斯公司', defaultRegion: '上海', isFramework: false },
  { code: 'HT009', name: '昆仑三圣宫双工位激光切割机采购单', type: '销售', defaultDepartment: '平板切割事业部', defaultCustomer: '昆仑派寒玉工场', defaultFab: '昆仑三圣宫 (格尔木)', defaultSigningEntity: '甜甜圈集团公司', defaultRegion: '北京', isFramework: false },
  { code: 'HT010', name: '衡山祝融坊现场光路校准与驻场保障', type: '技术服务', defaultDepartment: '管材切割事业部', defaultCustomer: '衡山派回雁器坊', defaultFab: '衡山祝融坊 (衡阳)', defaultSigningEntity: '蓝莓蛋挞公司', defaultRegion: '合肥', isFramework: true }
];

// Product Category to Revenue Method Rule Mapping
export const PRODUCT_REVENUE_RULES: ProductRevenueRule[] = [
  { productCategory: '整机台+验收款', defaultRevenueMethod: '验收一次性', description: '整机台设备验收合格当月一次性确认收入（时点法）' },
  { productCategory: '关键模组+验收款', defaultRevenueMethod: '验收一次性', description: '高精度核心子系统模组，现场测试合格验收当月确认' },
  { productCategory: '零部件耗材+交付款', defaultRevenueMethod: '验收一次性', description: '标准零部件与耗材，交付签收当月一次性确认' },
  { productCategory: '软件授权+授权款', defaultRevenueMethod: '验收一次性', description: '软件授权与 Key 下发，上线验收一次性确认' },
  { productCategory: '技术服务维保+服务款', defaultRevenueMethod: '直线法', description: '驻场服务与年度维保，服务期内按月均摊确认（时段法，产生合同资产/负债）' },
];

export const CUSTOMERS: string[] = [
  '少林寺武备坊',
  '武当山玄铁工坊',
  '峨眉派轻功器械',
  '华山派剑器工坊',
  '桃花岛奇门工坊',
  '明教光明工坊',
  '丐帮江湖器械铺',
  '昆仑派寒玉工场',
  '逍遥派琅嬛机房',
  '衡山派回雁器坊',
  '泰山派东岳造物',
  '青城派松风工坊',
  '华山器械工坊',
  '武当工艺工坊',
  '少林装备工坊',
  '松鼠仓储食品科技'
];

// 客户主数据中的客户类型关系：值必须来自 CUSTOMER_TYPE_DICT 的启用项。
export const CUSTOMER_TYPE_MAPPING: Record<string, string> = Object.fromEntries(
  CUSTOMERS.map((customer) => [customer, '一级销售'])
);

export interface SupplierMasterItem {
  code: string;
  name: string;
  supplierType: '内部' | '外部';
  owningEntity: string;
  scope: string;
  status: '启用' | '停用';
  notes: string;
}

export const SUPPLIER_MASTER_DATA: SupplierMasterItem[] = [
  {
    code: 'SUP-IN-001',
    name: '整机总装一厂',
    supplierType: '内部',
    owningEntity: '甜甜圈集团公司',
    scope: '高功率大幅面激光切割成套装备总装与总调',
    status: '启用',
    notes: '集团核心装备总装交付基地'
  },
  {
    code: 'SUP-IN-002',
    name: '整机总装二厂',
    supplierType: '内部',
    owningEntity: '草莓慕斯公司',
    scope: '管材激光切割机与三维五轴切管机集成',
    status: '启用',
    notes: '华东切管专业制造中心'
  },
  {
    code: 'SUP-IN-003',
    name: '智能切割头装配中心',
    supplierType: '内部',
    owningEntity: '蓝莓蛋挞公司',
    scope: '万瓦级智能激光切割头与微纳聚焦模组',
    status: '启用',
    notes: '核心光学部件自制总成'
  },
  {
    code: 'SUP-IN-004',
    name: '数控系统研发与测试中心',
    supplierType: '内部',
    owningEntity: '甜甜圈集团公司',
    scope: '总线数控切割系统软硬件与工艺套料算法',
    status: '启用',
    notes: '自研数控控制中枢'
  },
  {
    code: 'SUP-IN-005',
    name: '高功率激光加工工艺实验厂',
    supplierType: '内部',
    owningEntity: '草莓慕斯公司',
    scope: '激光厚板切割、坡口切削及焊接打样工艺开发',
    status: '启用',
    notes: '工艺包开发与客户试切打样'
  },
  {
    code: 'SUP-IN-006',
    name: '高精度机加与结构件中心',
    supplierType: '内部',
    owningEntity: '甜甜圈集团公司',
    scope: '重型机床床身、高强度横梁与高精度运动滑台',
    status: '启用',
    notes: '高刚性基础机械件配套'
  },
  {
    code: 'SUP-EX-001',
    name: '锐科光纤激光技术供应商',
    supplierType: '外部',
    owningEntity: '锐科激光股份有限公司',
    scope: '6kW-30kW高功率连续多模/单模光纤激光器',
    status: '启用',
    notes: '战略外部光源供应商'
  },
  {
    code: 'SUP-EX-002',
    name: '创鑫光子核心光源供应商',
    supplierType: '外部',
    owningEntity: '创鑫激光股份有限公司',
    scope: '万瓦高抗反射光纤激光光源及配件',
    status: '启用',
    notes: '主要激光光源供货渠道'
  },
  {
    code: 'SUP-EX-003',
    name: '柏楚数控核心部件供应商',
    supplierType: '外部',
    owningEntity: '柏楚电子科技股份有限公司',
    scope: '激光切割控制板卡、电容高度传感器与总线驱动器',
    status: '启用',
    notes: '工业控制软硬件供应商'
  },
  {
    code: 'SUP-EX-004',
    name: '普雷茨特光学核心件供应商',
    supplierType: '外部',
    owningEntity: '德国普雷茨特 (Precitec)',
    scope: '智能全自动调焦切割头总成与保护镜组',
    status: '启用',
    notes: '进口高阶激光头供应商'
  },
  {
    code: 'SUP-EX-005',
    name: '同飞工业制冷设备供应商',
    supplierType: '外部',
    owningEntity: '同飞制冷股份有限公司',
    scope: '双温双控大制冷量激光专用冷水机组',
    status: '启用',
    notes: '激光冷却系统配套'
  },
  {
    code: 'SUP-EX-006',
    name: '新代伺服驱动系统供应商',
    supplierType: '外部',
    owningEntity: '新代科技股份有限公司',
    scope: '高精度大扭矩总线伺服电机及驱动放大器',
    status: '启用',
    notes: '多轴运动控制执行机构'
  }
];

export const FINANCING_SUMMARY_PRODUCTS: FinancingSummaryProductRow[] = [
  // 银行借款
  { seq: 1, category: '银行借款', productName: '流动资金贷款', categoryRowSpan: 4, isCategoryFirst: true, notes: '银行短期流动资金贷款' },
  { seq: 2, category: '银行借款', productName: '并购贷款', isCategoryFirst: false, notes: '产业并购专项银团贷款' },
  { seq: 3, category: '银行借款', productName: '固定资产贷款', isCategoryFirst: false, notes: '固定资产投资与厂房设备专项贷款' },
  { seq: 4, category: '银行借款', productName: '其他银行借款', isCategoryFirst: false, notes: '其他银行类授信借款' },
  // 非银行金融机构借款
  { seq: 5, category: '非银行金融机构借款', productName: '非银行金融机构借款', categoryRowSpan: 1, isCategoryFirst: true, notes: '信托/财务公司等非银机构借款' },
  // 关联企业借款
  { seq: 6, category: '关联企业借款', productName: '股东借款', categoryRowSpan: 2, isCategoryFirst: true, notes: '母公司或主要控股股东借款' },
  { seq: 7, category: '关联企业借款', productName: '其他关联企业借款', isCategoryFirst: false, notes: '兄弟关联公司间资金融通借款' },
  // 融资租赁
  { seq: 8, category: '融资租赁', productName: '融资租赁', categoryRowSpan: 1, isCategoryFirst: true, notes: '高端产线设备售后回租/直租' },
  // 应付债券
  { seq: 9, category: '应付债券', productName: '应付债券-短期债券', categoryRowSpan: 5, isCategoryFirst: true, notes: '银行间市场超短期融资券(SCP)' },
  { seq: 10, category: '应付债券', productName: '应付债券-中期票据', isCategoryFirst: false, notes: '中期票据(MTN)' },
  { seq: 11, category: '应付债券', productName: '应付债券-企业债券', isCategoryFirst: false, notes: '发改委审批企业债' },
  { seq: 12, category: '应付债券', productName: '应付债券-公司债券', isCategoryFirst: false, notes: '证监会公开发行公司债' },
  { seq: 13, category: '应付债券', productName: '应付债券-私募债券', isCategoryFirst: false, notes: '非公开定向债务融资工具(PPN)' },
  // 供应链融资
  { seq: 14, category: '供应链融资', productName: '应收账款融资', categoryRowSpan: 5, isCategoryFirst: true, notes: '无追索权/有追索权保理融资' },
  { seq: 15, category: '供应链融资', productName: '存货融资', isCategoryFirst: false, notes: '动产质押与存货融资' },
  { seq: 16, category: '供应链融资', productName: '预付款融资', isCategoryFirst: false, notes: '上游预付款保兑仓业务' },
  { seq: 17, category: '供应链融资', productName: '订单融资', isCategoryFirst: false, notes: '大客户订单质押授信' },
  { seq: 18, category: '供应链融资', productName: '其他供应链融资', isCategoryFirst: false, notes: '其他供应链金融衍生方案' },
  // 贸易融资
  { seq: 19, category: '贸易融资', productName: '保函', categoryRowSpan: 3, isCategoryFirst: true, notes: '履约保函/预付款保函/投标保函' },
  { seq: 20, category: '贸易融资', productName: '信用证', isCategoryFirst: false, notes: '国内证/国际远期信用证及押汇' },
  { seq: 21, category: '贸易融资', productName: '其他贸易融资产品', isCategoryFirst: false, notes: '福费廷/出口押汇等' },
  // 其他
  { seq: 22, category: '其他', productName: '其他', categoryRowSpan: 1, isCategoryFirst: true, notes: '其他创新型资金融通工具' }
];


