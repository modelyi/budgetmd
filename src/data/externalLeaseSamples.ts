/**
 * BB.4.2.a 外部职场租赁 / BB.4.2.a.1 外部职场租赁·财务视角 —— 示例数据
 *
 * 口径要点（与 BB.4.2.b 内部职场租赁分开、外部不抵销）：
 *  - 出租方为集团外第三方（手工填写名称），无加成款、无内部往来科目、不参与集团合并抵销；
 *  - 月租金(万元) = 单价(元/㎡·月) × 租赁面积(㎡) ÷ 10000 × 当月在租期内(1/0)，【全年合计】= SUM(1~12月)；
 *    租赁面积与合同单价均按对外租赁合同在本表直接录入（不引用 BAA.6.b 年度租赁面积维护——该表仅供内部职场租赁 BB.4.2.b）；
 *  - 租赁类型为派生展示列（系统带出、不可手工录入/选择）：由「租赁期限」派生——一年以内 = 费用化(一年以内)、
 *    一年以上 = 资本化(大于一年)；判定只看整体租期（> 12 个月资本化、≤ 12 个月费用化）、开始日判定后不重分类，
 *    资本化判定唯一来源＝租期；结果口径：一年以上→资本化（形成使用权资产 1621 与租赁负债 2602，由 BB.4.2.a.1
 *    按月测算折旧与利息）；一年以下（含 12 个月）→费用化（月租金直接进费用，不形成使用权资产、不确认租赁负债）；
 *    示例行只给租期起止与面积/单价，租赁类型由系统按租期带出（与「租赁期限」自洽）；
 *  - 费用化合同的月租金按用途归 6601/6602/6603；资本化合同进 BB.4.2.a.1 测算租赁负债与现金流（负债初始/使用权资产原值/利息/本金偿付），其折旧由 BB.4.5 计提。
 *  - 场所：示例一律取 BAA.6.a 场所基本信息维护中「出租方类型=外部租入」的场所（史塔克大厦）——
 *    外部职场租赁只用外部租入场所，内部持有场所（花果山园区）只走 BB.4.2.b 内部职场租赁，两表场所不交叉；
 *    本表「场所」列的取值域＝BAA.6.a 中出租方类型=外部租入的场所集合。
 */
import type { ExternalOfficeLeaseItem, ExternalLeaseCapitalizationItem } from '../utils/adapters/shared';

// -----------------------------------------------------------------------------
// BB.4.2.a 外部职场租赁 —— 传入 buildExternalOfficeLeaseSheet()
// 维度：序号 / 场所 / 出租方(外部第三方) / 承租方(法人) / 预算项目 / 预算部门 / 租赁期起始月 / 租赁期终止月 /
//      租赁面积(㎡) / 单价(元/㎡·月) / 租赁类型 / 折现率(%)
// 度量：月租金(万元)（【全年合计】+1~12月）
// 示例 3 行均取 BAA.6.a 中「出租方类型=外部租入」的场所（史塔克大厦），含 2 个资本化合同 + 1 个费用化合同。
// -----------------------------------------------------------------------------
export const externalOfficeLeaseSamples: ExternalOfficeLeaseItem[] = [
  {
    // 资本化合同：整体租期 36 个月（2027-01 ~ 2029-12）→ 资本化，进 BB.4.2.a.1；
    // 场所＝BAA.6.a 中出租方类型=外部租入的史塔克大厦（外部示例不用内部持有的花果山园区）；
    // 出租方仍为集团外第三方名称，与 BAA.6.a 该场所业主方登记不做校验（示例只讲逻辑）。
    location: '史塔克大厦',
    lessorName: '神盾局物业管理有限公司',
    lesseeEntity: '草莓慕斯公司',
    budgetProject: 'P1 高功率平板光纤激光切割机',
    budgetDepartment: '制造交付中心本部',
    leaseStartMonth: '2027-01',
    leaseEndMonth: '2029-12',
    leaseArea: 4000,
    unitPrice: 115,
    discountRatePct: 4.5,
  },
  {
    // 资本化合同：整体租期 16 个月（2027-03 ~ 2028-06）→ 资本化，进 BB.4.2.a.1
    location: '史塔克大厦',
    lessorName: '瓦坎达置业集团',
    lesseeEntity: '蓝莓蛋挞公司',
    budgetProject: 'P2 三维五轴激光切管机',
    budgetDepartment: '研发中心本部',
    leaseStartMonth: '2027-03',
    leaseEndMonth: '2028-06',
    leaseArea: 1200,
    unitPrice: 165,
    discountRatePct: 4.5,
  },
  {
    // 费用化合同：整体租期 6 个月（2027-07 ~ 2027-12）→ 费用化，不进 BB.4.2.a.1，月租金按用途直接进损益
    location: '史塔克大厦',
    lessorName: '瓦坎达置业集团',
    lesseeEntity: '芒果班戟公司',
    budgetProject: 'P3 超快激光与复合加工预研',
    budgetDepartment: '软件与云平台部',
    leaseStartMonth: '2027-07',
    leaseEndMonth: '2027-12',
    leaseArea: 300,
    unitPrice: 95,
    discountRatePct: 4.5,
  },
];

// -----------------------------------------------------------------------------
// BB.4.2.a.1 外部职场租赁·财务视角 —— 传入 buildExternalLeaseCapitalizationSheet()
// 维度：预算项目 / 法人公司(承租方) / 预算部门 / 场所 / 租赁期起始月 / 租赁期终止月 / 剩余租赁月数 / 折现率(%)
// 度量：3×13（【全年合计】+1~12月，每组 3 子列：租赁付款额(不含税) / 月度利息 / 月度本金偿付）——本表为租赁负债与现金流测算，不计提折旧
//      + 卡片列 3（年度租赁付款额(不含税) / 租赁负债初始 / 使用权资产原值（= 租赁负债初始，作 BB.4.5 增量折旧的输入））
// 示例行与 BB.4.2.a 的两张资本化合同一一对应（场所同为 BAA.6.a 中出租方类型=外部租入的史塔克大厦）；
//   年度租赁付款额 = BB.4.2.a 该合同月租金【全年合计】；本批只改示例场所、卡片数值不重算（示例不校验）。
// -----------------------------------------------------------------------------
export const externalLeaseCapitalizationSamples: ExternalLeaseCapitalizationItem[] = [
  {
    budgetProject: 'P1 高功率平板光纤激光切割机',
    lesseeEntity: '草莓慕斯公司',
    budgetDepartment: '制造交付中心本部',
    location: '史塔克大厦',
    leaseStartMonth: '2027-01',
    leaseEndMonth: '2029-12',
    remainingMonths: 36,
    annualLeasePayment: 552,
    discountRatePct: 4.5,
  },
  {
    budgetProject: 'P2 三维五轴激光切管机',
    lesseeEntity: '蓝莓蛋挞公司',
    budgetDepartment: '研发中心本部',
    location: '史塔克大厦',
    leaseStartMonth: '2027-03',
    leaseEndMonth: '2028-06',
    remainingMonths: 16,
    annualLeasePayment: 198,
    discountRatePct: 4.5,
  },
];
