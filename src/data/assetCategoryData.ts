// AA.9 资产类别及折旧参数主数据
export interface AssetCategoryMasterItem {
  seq: number;
  categoryCode: string;               // 资产类别编码 (如 AC01, AC02)
  categoryName: string;               // 资产类别名称 (如 生产机器设备, 研发实验仪器)
  parentCategory: string;             // 资产类别的上级类别（固定资产 / 无形资产 / 动力辅助）
  depreciationMethod: string;         // 默认折旧方法 (年限平均法 / 双倍余额递减法 / 年数总和法)
  defaultDepreciationMonths: number | null;  // 默认折旧年限 (月) 如 120(10年), 60(5年), 240(20年)；全局统一按「剩余年限(月数)」表达；使用权资产=租赁期月数（按合同租期带出、动态不设固定月数），置 null
  minDepreciationMonths: number | null;      // 税法允许最低年限 (月)；使用权资产按租赁期计提、不设税法最低年限，置 null
  maxDepreciationMonths: number | null;      // 最大允许年限 (月)；使用权资产按租赁期计提、不设最大年限，置 null
  defaultResidualRate: number;        // 默认预计净残值率 (如 0.05 代表 5%)
  expenseSubject: string;             // 默认折旧/摊销费用科目 (如 660204 制造费用-折旧费)
  taxPolicy: string;                  // 税务与加速折旧政策
  status: string;                     // 启用状态 (启用 / 停用)
  notes?: string;                     // 备注说明
}

export const ASSET_CATEGORY_LIST: AssetCategoryMasterItem[] = [
  {
    seq: 1,
    categoryCode: 'AC01',
    categoryName: '生产机器设备',
    parentCategory: '固定资产',
    depreciationMethod: '年限平均法',
    defaultDepreciationMonths: 120,
    minDepreciationMonths: 120,
    maxDepreciationMonths: 180,
    defaultResidualRate: 0.05,
    expenseSubject: '660204 制造费用-折旧费',
    taxPolicy: '允许按税法最低120个月(10年)直线折旧；符合高端装备加速折旧政策',
    status: '启用'
  },
  {
    seq: 2,
    categoryCode: 'AC02',
    categoryName: '研发实验仪器',
    parentCategory: '固定资产',
    depreciationMethod: '年限平均法',
    defaultDepreciationMonths: 60,
    minDepreciationMonths: 120,
    maxDepreciationMonths: 180,
    defaultResidualRate: 0.05,
    expenseSubject: '660304 研发费用-折旧与摊销',
    taxPolicy: '税法机器设备最低120个月(10年)（会计估计60个月(5年)存在税会差异）；研发用途可享加计扣除与加速折旧政策',
    status: '启用'
  },
  {
    seq: 3,
    categoryCode: 'AC04',
    categoryName: '电子与办公设备',
    parentCategory: '固定资产',
    depreciationMethod: '年限平均法',
    defaultDepreciationMonths: 36,
    minDepreciationMonths: 36,
    maxDepreciationMonths: 60,
    defaultResidualRate: 0.05,
    expenseSubject: '660205 管理费用-办公折旧',
    taxPolicy: '电子设备税法最低36个月(3年)；单位价值不超过500万元者可选择一次性税前扣除',
    status: '启用'
  },
  {
    seq: 4,
    categoryCode: 'AC05',
    categoryName: '运输工具',
    parentCategory: '固定资产',
    depreciationMethod: '年限平均法',
    defaultDepreciationMonths: 48,
    minDepreciationMonths: 48,
    maxDepreciationMonths: 72,
    defaultResidualRate: 0.05,
    expenseSubject: '660206 管理费用-车辆折旧',
    taxPolicy: '税法规定除飞机、火车、轮船以外的运输工具最低年限为48个月(4年)',
    status: '启用'
  },
  {
    seq: 5,
    categoryCode: 'AC06',
    categoryName: '房屋及建筑物',
    parentCategory: '固定资产',
    depreciationMethod: '年限平均法',
    defaultDepreciationMonths: 240,
    minDepreciationMonths: 240,
    maxDepreciationMonths: 360,
    defaultResidualRate: 0.05,
    expenseSubject: '按使用部门费用性质路由（生产厂房进制造费用/办公楼进管理费用）',
    taxPolicy: '房屋、建筑物税法规定最低折旧年限为240个月(20年)',
    status: '启用'
  },
  {
    seq: 6,
    categoryCode: 'AC07',
    categoryName: '动力及辅助设施',
    parentCategory: '固定资产',
    depreciationMethod: '年限平均法',
    defaultDepreciationMonths: 120,
    minDepreciationMonths: 120,
    maxDepreciationMonths: 180,
    defaultResidualRate: 0.05,
    expenseSubject: '660208 制造费用-动力折旧',
    taxPolicy: '动力站房、空压机组等比照机器设备按税法最低120个月(10年)执行',
    status: '启用'
  },
  {
    seq: 7,
    categoryCode: 'AC09',
    categoryName: '工具器具及模具',
    parentCategory: '固定资产',
    depreciationMethod: '年限平均法',
    defaultDepreciationMonths: 60,
    minDepreciationMonths: 60,
    maxDepreciationMonths: 120,
    defaultResidualRate: 0.05,
    expenseSubject: '660204 制造费用-折旧费',
    taxPolicy: '与生产经营活动有关的器具工具税法最低60个月(5年)；专用模具视同工具器具',
    status: '启用'
  },
  {
    seq: 8,
    categoryCode: 'AC03',
    categoryName: '软件著作权/工业软件',
    parentCategory: '无形资产',
    depreciationMethod: '直线法',
    defaultDepreciationMonths: 36,
    minDepreciationMonths: 24,
    maxDepreciationMonths: 120,
    defaultResidualRate: 0.00,
    expenseSubject: '660305 研发费用-无形资产摊销',
    taxPolicy: '重点软件与集成电路企业软件摊销期限最短为24个月(2年)',
    status: '启用'
  },
  {
    seq: 9,
    categoryCode: 'AC11',
    categoryName: '专利权',
    parentCategory: '无形资产',
    depreciationMethod: '直线法',
    defaultDepreciationMonths: 120,
    minDepreciationMonths: 120,
    maxDepreciationMonths: 120,
    defaultResidualRate: 0.00,
    expenseSubject: '660305 研发费用-无形资产摊销',
    taxPolicy: '外购专利按不低于120个月(10年)摊销；法律保护期短于120个月(10年)的按保护期摊销',
    status: '启用'
  },
  {
    seq: 10,
    categoryCode: 'AC12',
    categoryName: '非专利技术',
    parentCategory: '无形资产',
    depreciationMethod: '直线法',
    defaultDepreciationMonths: 120,
    minDepreciationMonths: 60,
    maxDepreciationMonths: 120,
    defaultResidualRate: 0.00,
    expenseSubject: '660305 研发费用-无形资产摊销',
    taxPolicy: '非专利技术按合同及预计受益年限摊销，无约定不低于120个月(10年)',
    status: '启用'
  },
  {
    seq: 11,
    categoryCode: 'AC13',
    categoryName: '土地使用权',
    parentCategory: '无形资产',
    depreciationMethod: '直线法',
    defaultDepreciationMonths: 480,
    minDepreciationMonths: 480,
    maxDepreciationMonths: 600,
    defaultResidualRate: 0.00,
    expenseSubject: '660205 管理费用-无形资产摊销',
    taxPolicy: '按国家规定的土地使用权出让年限摊销（工业用地480个月(40年)）；与地上建筑物分别核算',
    status: '启用'
  },
  {
    seq: 12,
    categoryCode: 'AC14',
    categoryName: '商标权',
    parentCategory: '无形资产',
    depreciationMethod: '直线法',
    defaultDepreciationMonths: 120,
    minDepreciationMonths: 120,
    maxDepreciationMonths: 120,
    defaultResidualRate: 0.00,
    expenseSubject: '660105 销售费用-无形资产摊销',
    taxPolicy: '外购商标按不低于120个月(10年)或有效期限分期摊销',
    status: '启用'
  },
  {
    seq: 13,
    categoryCode: 'AC15',
    categoryName: '使用权资产',
    parentCategory: '固定资产',
    depreciationMethod: '年限平均法',
    defaultDepreciationMonths: null,
    minDepreciationMonths: null,
    maxDepreciationMonths: null,
    defaultResidualRate: 0.00,
    expenseSubject: '660205 管理费用-折旧费（使用权资产折旧，管理/销售/研发用途分别归 6602/6601/6603）；制造费用（制造用途，经 BB.3.X 在制品「费」腿结转）；折旧在 BB.4.5 增量资产折旧计算表计提（与其它资产同链路）、经 BB.4.X.A 归集',
    taxPolicy: '折旧参数取本行（默认账簿）：方法=年限平均法、残值率=默认账簿值（当前 0%）、折旧年限=租赁期月数（按月表达、按合同租期带出、动态不设固定月数）（CAS 21）',
    notes: '折旧参数取本行默认账簿：方法=年限平均法、残值率=默认账簿值（当前 0%）、折旧年限=租赁期月数（按月表达、按合同租期带出、动态不设固定月数）；折旧在 BB.4.5 增量资产折旧计算表计提（与其它资产同链路，剩余年限(月数)=租赁期月数）、经 BB.4.X.A 归集；折旧来源不再由内部 BB.4.2.b.1 / 外部 BB.4.2.a.1 直接计提',
    status: '启用'
  }
];

export const ASSET_CATEGORY_MAP: Record<string, AssetCategoryMasterItem> = ASSET_CATEGORY_LIST.reduce((acc, curr) => {
  acc[curr.categoryCode] = curr;
  acc[curr.categoryName] = curr;
  return acc;
}, {} as Record<string, AssetCategoryMasterItem>);
