import { useState, useMemo } from 'react';
import { LogicDiagramCanvas } from './diagram/LogicDiagramCanvas';
import { collectionDiagram } from '../data/logic/collectionDiagram';
import { overallDiagram } from '../data/logic/overallDiagram';

/**
 * T7 逻辑关系说明
 * 面向业务评审 + 技术实施，讲清每张表的数据从哪来、到哪去、怎么算。
 * 三段式：
 * - 整体大图：四段式全景（编制基础 → 业务编制 → 财务测算与费用归集 → 三表）
 * - 数据流总账：全量跨表取数规则，带法人视角标签（a/b/c）
 * - 分域明细：11 个业务域，输入 → 本域表单 → 输出 三列卡片
 */

type Mode = 'overall' | 'ledger' | 'detail';

interface DomainForm {
  code: string;
  name: string;
}

interface Rel {
  ref: string;       // 来源/目标表编码或名称
  detail: string;    // 带来什么 / 输出什么
}

interface Domain {
  key: string;
  title: string;
  subtitle: string;
  perspective: string;   // 本域法人视角说明
  forms: DomainForm[];
  inputs: Rel[];
  outputs: Rel[];
  keyRules: string[];
}

interface LedgerRow {
  no: string;
  stage: string;
  from: string;
  fromName: string;
  data: string;
  to: string;
  toName: string;
  basis: string;
  persp: string;    // a / b / c / a/b / b-c
  reportLine: string;
}

/* ───────────────────────── 法人视角标签 ─────────────────────────
   a = 不挂法人纯经营视角（不进三表）
   b = 挂法人、多法人同表平铺（集团=各法人加总）
   c = 集团内关联交易视角（→ BJ.C 抵销）                        */

const perspColor: Record<string, string> = {
  a: '#16a34a',
  b: '#2563eb',
  c: '#dc2626',
};

function PerspTag({ v }: { v: string }) {
  const parts = v.split(/[/\-]/);
  return (
    <span style={{ display: 'inline-flex', gap: 2, flexWrap: 'wrap' }}>
      {parts.map((p) => (
        <span key={p} style={{
          fontSize: 10, fontWeight: 700, color: '#fff',
          background: perspColor[p] || '#64748b',
          borderRadius: 4, padding: '1px 5px', lineHeight: 1.4,
        }}>{p}</span>
      ))}
    </span>
  );
}

/* ═══════════════════ 数据流总账（36 条） ═══════════════════ */
const ledger: LedgerRow[] = [
  // ── A. 销售与收入 ──
  { no: 'A1', stage: '签约→收入', from: 'BB.1.1', fromName: '合同签约额', data: '签约额仅作收入预算的合同背景与预测备查，不作收入确认依据（收入在 BB.1.2/1.3 按销量×单价确认）', to: 'BB.1.2/1.3', toName: '软硬件/服务收入成本', basis: '签约额预测备查（签约≠收入确认）', persp: 'b', reportLine: '—（不进三表）' },
  { no: 'A2', stage: '销售→税金', from: 'BB.1.2/1.3', fromName: '不含税收入', data: '销项税额 = 不含税收入 × 税率', to: 'BF.4.b', toName: '增值税计提预算表', basis: 'AB.15 税率及附加税比率字典', persp: 'b-c', reportLine: 'BF.4 销项税额' },
  { no: 'A3', stage: '销售→成本', from: 'BB.1.2', fromName: '销量×标准成本', data: '软硬件按综合产品成本结转，销售端不拆料工', to: 'BB.3.X', toName: '进销存（出库）', basis: 'BAA.2 产品标准成本', persp: 'b', reportLine: 'BO.PL 营业成本' },
  { no: 'A4', stage: '经营备查', from: 'BB.1.4', fromName: '销售费用明细', data: '按产品/客户/区域/部门汇总进多维分析，不进三表', to: 'BB.1.X', toName: '销售多维汇总分析', basis: '纯经营视角，不设法人列', persp: 'a', reportLine: '—（不进三表）' },
  { no: 'A5', stage: '销售→现金', from: 'BB.1.2/1.3', fromName: '预收＋验收回款', data: '销售收现 = 预收款 + 验收回款（含税单点乘入，软硬件 13%、技术服务 6%）', to: 'BO.CF', toName: '现金流量表', basis: 'BB.1.2.c / BB.1.3.c 收现口径', persp: 'b', reportLine: 'BO.CF CF-01 销售商品、提供劳务收到的现金' },

  // ── B. 生产与采购 ──
  { no: 'B1', stage: '需求→进销存', from: 'BAP.2', fromName: '物料消耗需求（常规/研发长期）', data: '一般物料转出（非生产类领料：研发/销售/管理及其他）按月转入进销存；生产类领料（在制品「料」）无前置收集表，直接在 BB.3.X「料」行手工填报；研发长期物料需求已并入本表（需求类型=研发长期）、不另设表', to: 'BB.3.X', toName: '进销存（一般物料转出）', basis: '领料用途 / AB.9 存货物料类别字典', persp: 'a/b', reportLine: '—' },
  { no: 'B2', stage: '采购→入库', from: 'BB.3.3', fromName: '物料采购额', data: '原材料及零部件采购到货入库', to: 'BB.3.X', toName: '进销存（入库）', basis: '不含税采购额', persp: 'b', reportLine: 'BO.BS 存货' },
  { no: 'B3', stage: '生产→入库', from: 'BB.2.1', fromName: '产量×标准成本', data: '产成品生产入库（仅产成品；同一法人内结转）', to: 'BB.3.X', toName: '进销存（入库）', basis: 'BAA.2 标准成本', persp: 'b', reportLine: 'BO.BS 存货' },
  { no: 'B4', stage: '采购→税金', from: 'BB.3.1/3.2/3.3', fromName: '不含税采购额/验收额', data: '进项税额 = 不含税基数 × 税率（设备/物料 13%、基建工程 9%）', to: 'BF.4.b', toName: '增值税计提预算表', basis: 'AB.15 税率及附加税比率字典', persp: 'b-c', reportLine: 'BF.4 进项税额' },
  { no: 'B5', stage: '采购→现金', from: 'BB.3.3', fromName: '物料采购额', data: '采购付现 = 各月预付款 + 验收付款（本表填报）', to: 'BO.CF', toName: '现金流量表', basis: 'BB.3.3 采购付款计划', persp: 'b', reportLine: 'BO.CF 购买商品付现' },
  { no: 'B6', stage: '设备采购→转固', from: 'BB.3.1', fromName: '设备采购', data: '到货验收后转固定资产/无形资产，进入折旧', to: 'BB.4.5', toName: '增量资产折旧', basis: 'AA.9 资产类别', persp: 'b', reportLine: 'BO.BS 固定资产' },

  // ── C. CAPEX 与折旧 ──
  { no: 'C1', stage: '新增→折旧', from: 'BB.3.1 / BB.3.1.D / BB.3.2 / BB.4.1 / BB.4.3', fromName: '外购/代采购转入/基建转固/自制转固/其他新增', data: '本期新增资产按月计提折旧（代采购资产卡片只在受益方 B 建、A 侧不建卡）', to: 'BB.4.5', toName: '增量资产折旧', basis: 'AA.9 折旧年限/方法', persp: 'b', reportLine: 'BO.BS 累计折旧' },
  { no: 'C2', stage: '存量→折旧', from: 'BB.4.4', fromName: '期初存量资产', data: '期初存量按原折旧政策继续计提', to: 'BB.4.X.A', toName: '折旧费用汇总', basis: 'AA.9 折旧政策', persp: 'b', reportLine: 'BO.PL 期间费用' },
  { no: 'C3', stage: '处置→三表', from: 'BB.4.6', fromName: '资产处置', data: '对外出售/报废变卖：减少固定资产原值/累计折旧、确认处置损益（不计提折旧、不汇入折旧汇总表）；内部转卖：卖方本表减少、买方 BB.4.3 增加，加成经 BJ.C.d 登记、集团合并层走 BO.ELIM 第⑤类（长期资产未实现利润）抵销', to: 'BO.PL/BS/CF', toName: '利润表/资产负债表/现金流量表', basis: '处置净损益；内部转卖加成抵销（BJ.C.d → BO.ELIM 第⑤类）', persp: 'b-c', reportLine: 'BO.PL 处置收益 / BO.BS 固定资产 / BO.CF 处置收现（CF-13.1）' },
  { no: 'C4', stage: '折旧→费用/成本', from: 'BB.4.X.A', fromName: '折旧费用汇总', data: '按资产用途拆：制造→在制品「费」；销售/管理/研发→期间费用', to: 'BO.PL / BB.3.X', toName: '利润表 / 进销存（在制品费）', basis: '资产用途 + 部门费用属性', persp: 'b', reportLine: 'BO.PL 各项费用 / BO.BS 存货' },
  { no: 'C5', stage: 'CAPEX→现金', from: 'BB.3.1 / BB.3.2 / BB.4.3', fromName: '设备/基建/其他新增投入', data: '购建固定资产付现（分月预付款/验收付款）；BB.4.1 自制人工/领料为内部非付现投入，不进本行', to: 'BO.CF', toName: '现金流量表（CF-14）', basis: 'BB.3.1.C / BB.3.2 / BB.4.3 付款计划', persp: 'b', reportLine: 'BO.CF CF-14 购建固定资产付现' },
  { no: 'C6', stage: '内部租赁→抵销', from: 'BB.4.2.b', fromName: '内部职场租赁', data: '内部使用权资产/租赁负债 + 租金加成需抵销', to: 'BJ.C', toName: '关联交易与抵销', basis: 'BAA.11 加成率', persp: 'c', reportLine: 'BO.ELIM 内部租赁抵销' },
  { no: 'C7', stage: '外部租赁→费用', from: 'BB.4.2.a', fromName: '外部职场租赁', data: '一年以上→使用权资产/租赁负债；一年以内→费用化', to: 'BO.PL/BS', toName: '利润表/资产负债表', basis: '新租赁准则（不参与抵销）', persp: 'b', reportLine: 'BO.PL 租赁费用 / BO.BS 使用权资产' },

  // ── D. 人工与费用 ──
  { no: 'D1', stage: '人工→费用/成本', from: 'BB.5.1', fromName: '雇员费用（工资社保公积金）', data: '按部门费用属性拆：销售/管理/研发进 PL 期间费用、制造进在制品「工」、资本化人工进自制工程', to: 'BO.PL / BB.3.X / BB.4.1', toName: '利润表 / 存货 / 自制工程', basis: 'AM.2 部门属性映射表（部门→费用属性）', persp: 'b', reportLine: 'BO.PL 期间费用 / BO.BS 存货' },
  { no: 'D2', stage: '制造费用→存货', from: 'BB.5.1 / BB.5.2 / BB.4.X.A', fromName: '人工制造费用 / 非人工经营费用 / 制造费用折旧', data: '在制品「工」=BB.5.1 人工；「费」=BB.5.2 非人工经营费用 + BB.4.X.A 制造费用折旧；按法人归集、随产成品入库', to: 'BB.3.X', toName: '进销存（在制品工/费）', basis: '同法人归集硬约束', persp: 'b', reportLine: 'BO.BS 存货' },
  { no: 'D3', stage: '服务人工→重分类', from: 'BB.1.3.i', fromName: '服务工时×费率', data: '从雇员费用冲减原计提，重分类进服务成本，不重复计提', to: 'BB.5.1', toName: '雇员费用', basis: 'BAA.3 工时费率', persp: 'b-c', reportLine: 'BO.PL 营业成本' },
  { no: 'D4', stage: '人工→现金', from: 'BB.5.1', fromName: '实际发放（付现口径）', data: '实际发放 = 工资/奖金/社保公积金付现总额，按实际发放月份归集；计提非付现、不产生现金流', to: 'BO.CF', toName: '现金流量表', basis: 'BB.5.1 实际发放口径', persp: 'b', reportLine: 'BO.CF CF-06 支付给职工以及为职工支付的现金' },

  // ── E. 资金、税金与投融资 ──
  { no: 'E1', stage: '增值税→主表', from: 'BF.4.b', fromName: '增值税计提预算表', data: '销项−进项±留抵=净应纳；城建税/教育费附加联动', to: 'BF.4.a', toName: '税金及附加主表', basis: 'AB.15 税率及附加税比率字典', persp: 'b', reportLine: 'BO.PL 税金及附加' },
  { no: 'E2', stage: '利润→所得税', from: 'BO.PL', fromName: '利润总额', data: '所得税 = 利润总额 × 税率', to: 'BF.4', toName: '税金及附加', basis: 'AB.15 所得税率', persp: 'b', reportLine: 'BO.PL 所得税费用' },
  { no: 'E3', stage: '股权投资', from: 'BF.1', fromName: '股权投资预算', data: '新增/减少长期股权投资', to: 'BO.BS/CF', toName: '资产负债表/现金流', basis: '预算投资计划', persp: 'b', reportLine: 'BO.BS 长投 / BO.CF 投资现金流' },
  { no: 'E4', stage: '金融工具', from: 'BF.3', fromName: '金融工具投融资', data: '借款/还款/理财/授信余额变动', to: 'BO.BS/CF', toName: '资产负债表/现金流', basis: '融资计划', persp: 'b', reportLine: 'BO.BS 金融资产负债 / BO.CF 筹资现金流' },
  { no: 'E5', stage: '上年→年初', from: '上年决算', fromName: '上年期末三表', data: '资产负债表年初数 = 上年期末数（三表期初起点）', to: 'BO.BS', toName: '资产负债表', basis: '上年决算结转', persp: 'b', reportLine: 'BO.BS 年初余额' },
  { no: 'E6', stage: '税金→现金', from: 'BF.4', fromName: '各项税费实缴（现金流口径）', data: '实缴增值税净额＋税金及附加＋企业所得税；对外真实纳税支出，合并层不抵销', to: 'BO.CF', toName: '现金流量表', basis: 'BF.4 各项税费合计（现金流口径）', persp: 'b', reportLine: 'BO.CF CF-07 支付的各项税费' },

  // ── F. 关联交易与合并抵销 ──
  { no: 'F1', stage: '内部交易识别', from: 'BB.1.2/1.3 · BB.3.1.D · BB.3.3 · BB.4.2.b · BJ.C.d · BJ.C.f', fromName: '对内销售/代采购资产/对内采购/内部租赁/资产转卖/内部借款', data: '按法人对识别八类跨法人内部交易，登记至 BJ.C；代采购按净额法（代理人判定）——提供方到货额平价转移、仅按加成款确认其他业务收入—内部往来（6001.2），不买断、不虚增购销流水', to: 'BJ.C', toName: '关联交易与内部抵销', basis: 'AA.2 法人架构 + BAA.11 加成率', persp: 'c', reportLine: 'BO.ELIM 抵销底稿' },
  { no: 'F1b', stage: '内部借款利息对冲', from: 'BJ.C.f', fromName: '内部借款预算表', data: '借出方收息计入其他业务收入—内部往来（6001.2）、借入方付息计入财务费用—利息费用（6604.1）；集团合并层 6001.2 ↔ 6604.1 等额互抵归零（内部借款利息进项税不得抵扣、作为集团真实税费沉淀）', to: 'BO.ELIM', toName: '合并抵销底稿', basis: '净额法/等额对冲', persp: 'c', reportLine: 'BO.PL 财务费用—内部往来' },
  { no: 'F2', stage: '五类抵销', from: 'BJ.C', fromName: '关联交易数据（八类）', data: '①内部购销对冲 ②内部往来对冲 ③内部现金流对冲 ④未实现利润—存货 ⑤未实现利润—长期资产；代采购仅加成款确认「其他业务收入—内部往来」，到货额平价转移、不买断虚增购销；递延所得税等税层面影响由财务人工测算、系统不做、不计入五类抵销', to: 'BO.ELIM', toName: '集团合并抵销工作底稿', basis: '合并抵销规则 + 净额法', persp: 'c', reportLine: 'BO.PL/BS/CF 抵销数' },
  { no: 'F3', stage: '单体→合并', from: 'BO.ELIM', fromName: '抵销事项', data: '单体报表 ± 抵销数 = 合并数', to: 'BO.PL/BS/CF', toName: '预算三表', basis: '—', persp: 'c', reportLine: 'BO 三表合并列' },

  // ── G. 三表勾稽 ──
  { no: 'G1', stage: '存货→BS', from: 'BB.3.X', fromName: '进销存平衡', data: '期末存货余额', to: 'BO.BS', toName: '资产负债表', basis: '收发存汇总', persp: 'b', reportLine: 'BO.BS 存货' },
  { no: 'G2', stage: '固定资产→BS', from: 'BB.4.4 / BB.4.5', fromName: '存量/增量资产折旧', data: '原值 − 累计折旧 = 净值', to: 'BO.BS', toName: '资产负债表', basis: 'AA.9 折旧政策', persp: 'b', reportLine: 'BO.BS 固定资产/使用权资产' },
  { no: 'G3', stage: '净利润→权益', from: 'BO.PL', fromName: '本年净利润', data: '净利润结转未分配利润', to: 'BO.BS', toName: '资产负债表', basis: '净利润 = 收入−成本−费用−税金', persp: 'b', reportLine: 'BO.BS 未分配利润' },
  { no: 'G4', stage: '现金流→货币资金', from: 'BO.CF', fromName: '现金净增加额', data: '年初货币资金 + 现金净增加 = 期末货币资金', to: 'BO.BS', toName: '资产负债表', basis: 'CF 与 BS 货币资金勾稽', persp: 'b', reportLine: 'BO.BS 货币资金' },
];

/* ═══════════════════ 11 个业务域 ═══════════════════ */
const domains: Domain[] = [
  {
    key: 'master',
    title: '一、主数据与字典',
    subtitle: 'AA / AB / AM —— 全系统统一口径底座，不产生业务金额，被所有编制表引用',
    perspective: '全库基础，所有视角共用',
    forms: [
      { code: 'AA.1', name: '预算年度与期间' },
      { code: 'AA.2', name: '法人组织架构' },
      { code: 'AA.3', name: '统一科目体系' },
      { code: 'AA.4', name: '客户主数据' },
      { code: 'AA.5', name: '行政部门' },
      { code: 'AA.6', name: '预算项目主数据' },
      { code: 'AA.7', name: '预算产品主数据' },
      { code: 'AA.8', name: '管理单元主数据' },
      { code: 'AA.9', name: '资产类别与折旧' },
      { code: 'AA.10', name: '供应商主数据' },
      { code: 'AA.11', name: '物料主数据' },
      { code: 'AB.*', name: '业务字典（税率/岗位/职级/费用属性等）' },
      { code: 'AM.1/2', name: '收入方式映射 / 部门属性映射' },
    ],
    inputs: [
      { ref: '调研阶段', detail: '一次性维护，后续年度滚动沿用' },
    ],
    outputs: [
      { ref: '全部 BB / BF / BO', detail: '维度下拉、默认值带出与归集口径' },
    ],
    keyRules: [
      '组织维度关系：法人公司是合并主体；管理单元归属于某一个法人（多对一），是采购下单与成本归集主体；部门（预算/行政部门）是独立维度，不必然归属某个法人或管理单元，业务表中部门列与法人列、管理单元列各自独立选择、不做级联。',
      '资产类别全库只有一个字段（如「固定资产-生产机器设备」），大类小类合并在 AA.9 层级里，不拆「资产大类/小类」两列。',
      'AB.15 税率及附加税比率字典是 BF.4 税金测算的唯一税率来源；AM.2 部门属性映射表决定费用最终进 PL 哪个期间费用行。',
    ],
  },
  {
    key: 'assumption',
    title: '二、编制假设与标准成本',
    subtitle: 'BA / BAA / BAP —— 业务量价之外的参数层，驱动下游自动测算',
    perspective: '全库参数层，所有视角共用',
    forms: [
      { code: 'BAA.2', name: '产品标准成本设置' },
      { code: 'BAA.3', name: '岗位工时费率设置' },
      { code: 'BAA.4', name: '服务物料定额标准' },
      { code: 'BAP.2', name: '物料消耗需求汇总_常规（含研发长期）' },
      { code: 'BAA.7', name: '采购付款额测算比例' },
      { code: 'BAA.8', name: '经营费用转换比例' },
      { code: 'BAA.6', name: '办公场所租赁维护' },
      { code: 'BAA.9', name: '资本性支出拆分比例' },
      { code: 'BAA.11', name: '关联交易加成比例' },
      { code: 'BA.5', name: '费用预算汇总表' },
    ],
    inputs: [
      { ref: 'AA 主数据', detail: '产品 / 物料 / 岗位 / 部门' },
      { ref: '业务部门', detail: '给出假设比例与费率' },
    ],
    outputs: [
      { ref: 'BB.1.2/1.3', detail: '成本结转（BAA.2 标准成本）' },
      { ref: 'BB.2.1.B', detail: '单位标准成本（完工入库金额）' },
      { ref: 'BB.3.X', detail: '进销存（领料转出）' },
      { ref: 'BB.3.1.C', detail: 'BAA.9.a 无PO 拆分到法人' },
      { ref: 'BB.4.5', detail: 'BAA.9.b 折旧拆四大费用' },
      { ref: 'BB.4.2.b / BB.4.2.b.1', detail: 'BAA.6 场所面积/单价/折现率带出' },
      { ref: 'BB.5.2', detail: '费用拆分' },
      { ref: 'BJ.C', detail: '关联交易加成' },
      { ref: 'BO 三表', detail: '现金流 / 存货' },
    ],
    keyRules: [
      '产品标准成本只认综合「产品成本」，销售端不拆料工费；只有现场技术服务才拆「人工+物料」（BAA.3 工时费率 × BAA.4 物料定额）。',
      '所有比例表都是「默认值可覆盖」：系统首次带出，编制人可改，改后固化，下游按单元格当前值取数。',
      'BAA.8 费用转换比例驱动 BB.5.2 拆分进制造费用/期间费用；BAA.11 加成率驱动内部交易定价；采购付现按 BB.3.1/BB.3.3 各月填报的预付款与验收付款计算（BAA.7 采购付款额测算比例本年度不启用、后续年度启用）。',
    ],
  },
  {
    key: 'sales',
    title: '三、销售与收入',
    subtitle: 'BB.1 —— 合同签约 → 存量在手 → 本期收入/成本 → 销售费用与多维分析',
    perspective: 'BB.1.4 / BB.1.X = 视角 a（纯经营）；BB.1.1/1.2/1.3 = 视角 b（挂法人）',
    forms: [
      { code: 'BB.1.1', name: '合同签约额预算表' },
      { code: 'BB.1.2', name: '软硬件收入与成本预算' },
      { code: 'BB.1.3', name: '技术服务收入与成本预算' },
      { code: 'BB.1.4', name: '销售费用预算明细表' },
      { code: 'BB.1.X', name: '销售预算多维汇总分析' },
    ],
    inputs: [
      { ref: 'AA.4 / AA.7', detail: '客户 / 产品' },
      { ref: '存量订单台账', detail: '期初自动导入' },
      { ref: 'BAA.2', detail: '产品标准成本' },
    ],
    outputs: [
      { ref: 'BO.PL', detail: '营业收入 / 营业成本' },
      { ref: 'BO.CF', detail: 'CF-01 销售商品、提供劳务收到的现金（预收＋验收回款）' },
      { ref: 'BB.3.X', detail: '销售出库结转' },
      { ref: 'BF.4.b', detail: '销项税基数' },
    ],
    keyRules: [
      'BB.1.1 合同签约额维度：合同编码/名称 + 机台 + 区域 + 预算部门（真实 department），无「预算虚拟编码」列；签约额仅作预测备查，不进三表。',
      '软硬件销售按综合产品成本结转，不在销售端拆料工；技术服务按 BAA.3 人工 + BAA.4 物料定额分开算。',
      'BB.1.4 表内不设法人列，仅供 BB.1.X 多维分析取数，不参与三表；BB.1.2/1.3 含「签约主体（法人公司）」列，按签约主体归集。',
      '全部不含税口径；销项税不进本表，统一由 BF.4 按不含税收入 × AB.15 税率测算。',
    ],
  },
  {
    key: 'production',
    title: '四、生产排产',
    subtitle: 'BB.2.1 —— 产量计划 → 产成品入库',
    perspective: '视角 b（挂法人，按法人产量）',
    forms: [
      { code: 'BB.2.1', name: '生产制造产量计划表' },
    ],
    inputs: [
      { ref: 'AA.2 / AA.5 / AA.7', detail: '法人公司 / 部门 / 产品主数据' },
      { ref: 'BAA.2', detail: '产品标准成本（财务视角单位标准成本）' },
    ],
    outputs: [
      { ref: 'BB.3.X', detail: '产成品入库' },
    ],
    keyRules: [
      '产量按「法人公司 / 部门 / 产品」逐月手工填报（仅产成品、不含在制品）；与销售不做关联。',
      '生产计划只到「产量×标准成本」层，不做工单级 BOM 展开、不做进销存台账（预算系统抓大放小）。',
    ],
  },
  {
    key: 'procurement',
    title: '五、采购',
    subtitle: 'BB.3.1 / BB.3.2 / BB.3.3 —— 设备、基建、物料三条线，下单主体=管理单元',
    perspective: '视角 b；.D 关联交易子表 = 视角 c',
    forms: [
      { code: 'BB.3.1', name: '设备及无形资产采购预算' },
      { code: 'BB.3.2', name: '基建工程采购预算' },
      { code: 'BB.3.3', name: '物料类采购预算' },
    ],
    inputs: [
      { ref: 'AA.10 / AA.11', detail: '供应商 / 物料主数据' },
    ],
    outputs: [
      { ref: 'BB.3.X', detail: '采购入库' },
      { ref: 'BB.4.5', detail: '增量折旧基数' },
      { ref: 'BF.4.b', detail: '进项税基数' },
      { ref: 'BO.CF', detail: '采购付现' },
    ],
    keyRules: [
      '下单主体是管理单元（如「草莓慕斯-泛烘焙装备制造单元」），不是法人；管理单元归属某一法人，财务视角按其归属法人归集。',
      '代采购 / 内部交易的「代采购方 A」「提供方」均指下单主体（管理单元）关联的法人公司。',
      'BB.3.1 资产类别取自 AA.9 层级；无形资产来自外购设备采购表 + BB.4.3 其他新增（研发支出是否资本化，T3B 表单文档未给出口径，待确认）。',
      '代采购按净额法（代理人判定）核算：提供方到货额平价转移、仅按加成款确认「其他业务收入—内部往来」(6001.2)，不买断、不虚增进销流水。',
      '采购本身不推增值税分录，进项税统一进 BF.4。',
    ],
  },
  {
    key: 'inventory',
    title: '六、进销存平衡',
    subtitle: 'BB.3.X —— 存货预算平衡表，预算层面只做收发存汇总，不做台账',
    perspective: '视角 b（法人公司×存货类别，法人级单表）',
    forms: [
      { code: 'BB.3.X', name: '进销存预算（存货平衡）' },
    ],
    inputs: [
      { ref: 'BAP.2', detail: '一般物料转出（非生产类领料：研发/销售/管理及其他）' },
      { ref: 'BB.4.1.c', detail: '自制设备领料投入（自制设备用料）' },
      { ref: 'BB.1.3', detail: '服务物料领料（技术服务物料明细）' },
      { ref: 'BB.3.3', detail: '物料采购入库' },
      { ref: 'BB.2.1', detail: '产成品入库' },
      { ref: 'BB.1.2/1.3', detail: '销售出库结转成本' },
      { ref: 'BB.5.1 / BB.5.2＋BB.4.X.A', detail: '在制品「工」人工 / 「费」制造费用与折旧' },
    ],
    outputs: [
      { ref: 'BO.BS', detail: '存货期末数' },
      { ref: 'BO.PL', detail: '营业成本' },
      { ref: 'BO.CF', detail: '存货变动' },
    ],
    keyRules: [
      '期末存货 = 期初 + 本期入库（采购/生产）− 本期出库（销售成本）；本表为法人级单表（法人×存货类别一表到底），不乘拆分比例。',
      '在制品→产成品必须在同一法人内部结转；跨法人代工/调拨属内部交易，走 BJ.C，不在本表直接结转。',
      '物料消耗需求：BAP.2 按 需求类型 承载常规与研发长期两类（研发长期物料类别固定「研发物料」，为原独立研发长期表整表并入）；非生产类领料（研发/销售/管理及其他）的「一般物料」转出是「料」大类的出库来源；生产类领料（在制品「料」腿）无前置收集表，直接在 BB.3.X「料」行手工填报；自制设备用料由 BB.4.1.c 承载、服务物料由 BB.1.3 承载，三者不在 BAP.2 填报。',
      '预算系统不做实时进销存台账，只做年度+月度收发存汇总平衡；料工费不做工单级结转。',
    ],
  },
  {
    key: 'capex',
    title: '七、资本性支出与折旧',
    subtitle: 'BB.4 —— 自制设备 / 租赁 / 其他新增 / 存量与增量折旧 / 处置 / 汇总',
    perspective: '视角 b；BB.4.2.b 内部租赁 = 视角 c',
    forms: [
      { code: 'BB.4.1', name: '自制设备工程预算（CIP）' },
      { code: 'BB.4.2.a', name: '外部职场租赁' },
      { code: 'BB.4.2.a.1', name: '外部职场租赁·财务视角（租赁负债与现金流）' },
      { code: 'BB.4.2.b', name: '内部职场租赁' },
      { code: 'BB.4.2.b.1', name: '内部职场租赁·财务视角（租赁负债与现金流）' },
      { code: 'BB.4.3', name: '其他固定资产新增' },
      { code: 'BB.4.4', name: '存量资产折旧计算表' },
      { code: 'BB.4.5', name: '增量资产折旧计算表' },
      { code: 'BB.4.6', name: '资产处置预算表' },
      { code: 'BB.4.X', name: '资本性支出汇总表' },
    ],
    inputs: [
      { ref: 'AA.9', detail: '资产类别与折旧年限' },
      { ref: 'BB.3.1/3.2', detail: '采购转固' },
      { ref: 'BB.4.2', detail: '租赁使用权资产' },
    ],
    outputs: [
      { ref: 'BO.BS', detail: '固定资产原值/累计折旧/使用权资产' },
      { ref: 'BO.PL', detail: '各项期间费用（折旧）' },
      { ref: 'BO.CF', detail: '购建固定资产付现' },
      { ref: 'BJ.C', detail: '内部租赁抵销' },
    ],
    keyRules: [
      'BB.4.2.a 外部租赁不参与集团抵销；BB.4.2.b 内部租赁在 BJ.C 做内部往来 + 加成抵销。',
      '折旧 = 存量折旧（BB.4.4）+ 增量折旧（BB.4.5），经 BB.4.X.A 汇总四大费用，按 AA.9 折旧方法/年限自动算；资产处置（BB.4.6）不计提折旧、不汇入折旧汇总，直接减少固定资产净值并进三表。',
      '租赁期限 >12 个月→资本化（使用权资产 / 租赁负债）；≤12 个月→费用化。',
      '使用权资产折旧不在租赁表计提：BB.4.2.a/.b（登记与租金测算）与其财务视角 BB.4.2.a.1 / BB.4.2.b.1（只测租赁付款额、负债初始、利息与本金偿付）均不计提折旧，统一由 BB.4.5 按「下月折」计提、经 BB.4.X.A 按用途归集（全链只取一次）。',
      '研发支出是否资本化：T3B 表单文档未给出资本化口径（待确认）。',
    ],
  },
  {
    key: 'labor',
    title: '八、人工与经营费用',
    subtitle: 'BB.5 —— 雇员费用导入 → 按部门/属性拆分进成本与期间费用',
    perspective: '视角 b（按法人归集）',
    forms: [
      { code: 'BB.5.1', name: '雇员费用编制/导入' },
      { code: 'BB.5.2', name: '经营费用转换结果表' },
    ],
    inputs: [
      { ref: 'AB.11/12', detail: '岗位 / 职级字典' },
      { ref: 'AA.5', detail: '行政部门' },
      { ref: 'AM.2', detail: '部门属性映射表（部门→费用属性）' },
    ],
    outputs: [
      { ref: 'BO.PL', detail: '销售/管理/研发费用' },
      { ref: 'BB.3.X', detail: '人工入存货成本' },
      { ref: 'BB.4.1', detail: '自制在建工程·资本化人工（BB.5.1 财务视角「自制在建工程」列直通）' },
      { ref: 'BO.BS', detail: '2211 应付职工薪酬（年初＋计提−实际发放＝期末滚动）' },
      { ref: 'BO.CF', detail: 'CF-06 支付给职工以及为职工支付的现金（实际发放）' },
    ],
    keyRules: [
      '费用属性由二级与三级部门共同维护，一级部门不维护；预算编到二级部门。',
      'BB.5.2 只把非人工经营费用（来源 BA.5×BAA.8×AM.2）按部门费用性质转换：销售/管理/研发进 PL 期间费用、制造费用进在制品「费」；人工由 BB.5.1、折旧由 BB.4.X.A 分别承载，三者不重叠取数。',
      '技术服务人工（BB.1.3.i）从雇员费用冲减、重分类进服务成本，不重复计提应付职工薪酬。',
    ],
  },
  {
    key: 'treasury',
    title: '九、资金与税金',
    subtitle: 'BF.1 / BF.3 / BF.4 —— 投融资、金融工具、税金集中测算',
    perspective: '视角 b（按法人计税/归集）',
    forms: [
      { code: 'BF.1', name: '股权投资预算' },
      { code: 'BF.3', name: '金融工具投融资与授信预算' },
      { code: 'BF.4', name: '税金及附加预算（主表+增值税附表）' },
    ],
    inputs: [
      { ref: 'BB.1.2/1.3', detail: '收入（销项基数）' },
      { ref: 'BB.3.1/3.3', detail: '设备·物料采购（进项基数，13%）' },
      { ref: 'BB.3.2', detail: '基建工程采购（进项基数，建筑服务 9%）' },
      { ref: 'BB.5.2', detail: '经营费用（费用类可抵扣进项基数）' },
      { ref: 'AB.15', detail: '税率及附加税比率字典' },
    ],
    outputs: [
      { ref: 'BO.PL', detail: '税金及附加 / 所得税费用' },
      { ref: 'BO.CF', detail: 'CF-07 支付的各项税费 / 投融资现金流' },
      { ref: 'BO.BS', detail: '应交税费 / 金融资产负债' },
    ],
    keyRules: [
      '业务表一律不含税、不推增值税分录；增值税统一在 BF.4.b 按「销项−进项±留抵」测算，BF.4.a 主表取附表净额。',
      '城建税/教育费附加按增值税实缴基数联动；企业所得税按 BO.PL 利润总额 × 税率测算。',
      'BF.1 股权投资、BF.3 金融工具直接影响 BO.BS 长投/金融资产负债 与 BO.CF 投融资现金流。',
    ],
  },
  {
    key: 'intercompany',
    title: '十、关联交易与合并抵销',
    subtitle: 'BJ.C / BJ.C.R / BO.ELIM —— BJ.C 登记八类内部交易，BO.ELIM 汇总五类抵销底稿并调整三表',
    perspective: '视角 c（集团合并专用）',
    forms: [
      { code: 'BJ.C', name: '关联交易与内部抵销（八类内部交易登记）' },
      { code: 'BJ.C.R', name: '集团合并抵销规则（口径总纲）' },
      { code: 'BO.ELIM', name: '集团合并抵销工作底稿（五类抵销）' },
    ],
    inputs: [
      { ref: 'BB.1.2/1.3', detail: '对内销售' },
      { ref: 'BB.3.1/3.3', detail: '对内采购与代采购' },
      { ref: 'BB.4.2.b', detail: '内部租赁' },
      { ref: 'BAA.11', detail: '关联交易加成率' },
    ],
    outputs: [
      { ref: 'BO.PL/BS/CF', detail: '合并数（抵销后）' },
    ],
    keyRules: [
      'BJ.C 登记八类跨法人内部交易（代采购物料/代采购资产/存量资产内售/内部借款/内部职场租赁/内部物料销售/内部人工销售/内部产品销售）；BO.ELIM 按五类抵销类型汇总生成抵销底稿：①内部购销对冲；②内部往来对冲；③内部现金流对冲；④未实现利润—存货；⑤未实现利润—长期资产。',
      '代采购方/提供方按法人公司口径抵销；代采购按净额法（代理人判定）：提供方到货额平价转移、仅按加成款确认其他业务收入—内部往来（6001.2），不买断、不虚增购销流水；BB.3.1.D / BB.3.3.D 是关联交易视角的子表。',
      '外部第三方交易（BB.4.2.a）不进抵销。',
      '递延所得税等税层面影响由财务人工测算、系统不做、不计入五类抵销（BO.ELIM 底稿不列示）。',
    ],
  },
  {
    key: 'report',
    title: '十一、预算三表输出',
    subtitle: 'BO.PL / BO.BS / BO.CF —— 所有编制表按报表项目行归集，自动出三表',
    perspective: '单体 = 视角 b；合并 = 视角 c',
    forms: [
      { code: 'BO.PL', name: '利润表（全年+1~12月）' },
      { code: 'BO.BS', name: '资产负债表（年初/发生/调整/期末 4列）' },
      { code: 'BO.CF', name: '现金流量表（本年累计 1列）' },
      { code: 'BO.ELIM', name: '集团合并抵销工作底稿' },
    ],
    inputs: [
      { ref: '全部 BA/BB/BF', detail: '按报表项目行归集' },
      { ref: 'BO.ELIM', detail: '抵销事项' },
    ],
    outputs: [
      { ref: '管理用预算三表', detail: '单体 → 合并' },
    ],
    keyRules: [
      '报表颗粒度 = 报表项目行：取数规则只写报表项目名，不写明细科目码、不做复杂核算（不做权益法追溯、金融资产四分类）。',
      'PL = 全年合计 + 1~12 月；BS = 年初/本期发生/本期调整/期末 4 列年度；CF = 本年累计 1 列。',
      '现金与大盘损益简单直出三表，不做凭证、不做复杂合并；抵销只做上述五类。',
      '递延所得税等税层面影响由财务人工测算、系统不做、不计入五类抵销。',
    ],
  },
];

/* ═══════════════════ 视图二：数据流总账 ═══════════════════ */
const thStyle: React.CSSProperties = {
  padding: '8px 9px', textAlign: 'left', fontWeight: 600, fontSize: 11,
  border: '1px solid #334155', whiteSpace: 'nowrap',
};
const tdStyle: React.CSSProperties = {
  padding: '7px 9px', border: '1px solid #e2e8f0', verticalAlign: 'top', lineHeight: 1.5,
};

function LedgerTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPersp, setSelectedPersp] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');

  const filtered = useMemo(() => {
    return ledger.filter((r) => {
      const matchSearch =
        !searchTerm ||
        r.no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.stage.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.fromName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.toName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.data.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.basis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.reportLine.toLowerCase().includes(searchTerm.toLowerCase());

      const matchPersp =
        selectedPersp === 'all' ||
        (selectedPersp === 'a' && r.persp.includes('a')) ||
        (selectedPersp === 'b' && r.persp.includes('b')) ||
        (selectedPersp === 'c' && r.persp.includes('c'));

      const matchStage = selectedStage === 'all' || r.stage.startsWith(selectedStage) || r.no.startsWith(selectedStage);

      return matchSearch && matchPersp && matchStage;
    });
  }, [searchTerm, selectedPersp, selectedStage]);

  let rowIndex = 0;
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
        <div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>全量跨表取数规则总账（{ledger.length} 条标准规则）</span>
            <span className="text-[11px] font-normal px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              符合需求验收口径标准
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            <b>业务评审</b>重点核对「传递的数据」「法人视角」「落到报表项目」；
            <b>技术实施</b>按「来源表→目标表」「口径依据」直接配置取数公式。
          </div>
        </div>

        {/* 统计指标卡 */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="px-2.5 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-[10px] text-slate-400">总规则数</div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{ledger.length}</div>
          </div>
          <div className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
            <div className="text-[10px] text-blue-500">挂法人单体(b)</div>
            <div className="text-xs font-bold text-blue-700 dark:text-blue-300">
              {ledger.filter(r => r.persp.includes('b')).length}
            </div>
          </div>
          <div className="px-2.5 py-1 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center">
            <div className="text-[10px] text-rose-500">关联抵销(c)</div>
            <div className="text-xs font-bold text-rose-700 dark:text-rose-300">
              {ledger.filter(r => r.persp.includes('c')).length}
            </div>
          </div>
          <div className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
            <div className="text-[10px] text-emerald-600">纯经营(a)</div>
            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
              {ledger.filter(r => r.persp.includes('a')).length}
            </div>
          </div>
        </div>
      </div>

      {/* 筛选与检索栏 */}
      <div className="flex flex-wrap items-center gap-2 mb-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded border border-slate-200 dark:border-slate-700/80">
        <input
          type="text"
          placeholder="搜索表单编码/名称/数据/报表项目..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-2.5 py-1 text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 w-64"
        />

        <div className="flex items-center gap-1 ml-auto flex-wrap">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">环节分类：</span>
          {[
            { key: 'all', label: '全部' },
            { key: 'A', label: 'A.销售' },
            { key: 'B', label: 'B.生产采购' },
            { key: 'C', label: 'C.CAPEX折旧' },
            { key: 'D', label: 'D.人工费用' },
            { key: 'E', label: 'E.资金税金' },
            { key: 'F', label: 'F.关联抵销' },
            { key: 'G', label: 'G.三表勾稽' },
          ].map((st) => (
            <button
              key={st.key}
              type="button"
              onClick={() => setSelectedStage(st.key)}
              className={`px-2 py-0.5 text-[11px] rounded transition-colors cursor-pointer ${
                selectedStage === st.key
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {st.label}
            </button>
          ))}

          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium ml-2">视角：</span>
          {[
            { key: 'all', label: '全部' },
            { key: 'b', label: 'b 挂法人' },
            { key: 'c', label: 'c 关联抵销' },
            { key: 'a', label: 'a 纯经营' },
          ].map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setSelectedPersp(p.key)}
              className={`px-2 py-0.5 text-[11px] rounded transition-colors cursor-pointer ${
                selectedPersp === p.key
                  ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-medium'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs min-w-[1080px]">
          <thead>
            <tr className="bg-slate-800 dark:bg-slate-950 text-white">
              <th style={thStyle}>编号</th>
              <th style={thStyle}>业务环节</th>
              <th style={thStyle}>来源表</th>
              <th style={thStyle}>传递的数据</th>
              <th style={thStyle}>目标表</th>
              <th style={thStyle}>口径/比例依据</th>
              <th style={thStyle}>视角</th>
              <th style={thStyle}>落到报表项目</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800">
                  没有匹配的跨表取数规则
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const prevStage = rowIndex > 0 ? filtered[rowIndex - 1].stage : null;
                const isNewStage = r.stage !== prevStage;
                rowIndex++;
                return (
                  <tr
                    key={r.no}
                    className={`border-b border-slate-200 dark:border-slate-800 transition-colors hover:bg-blue-50/40 dark:hover:bg-blue-950/20 ${
                      isNewStage ? 'bg-slate-50 dark:bg-slate-800/40' : 'bg-white dark:bg-slate-900'
                    }`}
                  >
                    <td style={tdStyle} className="font-semibold text-slate-900 dark:text-slate-100">
                      {r.no}
                    </td>
                    <td style={{ ...tdStyle, color: '#1d4ed8', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {r.stage}
                    </td>
                    <td style={tdStyle}>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{r.from}</span>
                      <br />
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">{r.fromName}</span>
                    </td>
                    <td style={{ ...tdStyle }} className="text-slate-700 dark:text-slate-300">
                      {r.data}
                    </td>
                    <td style={tdStyle}>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{r.to}</span>
                      <br />
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">{r.toName}</span>
                    </td>
                    <td style={{ ...tdStyle }} className="text-slate-600 dark:text-slate-400">
                      {r.basis}
                    </td>
                    <td style={tdStyle}>
                      <PerspTag v={r.persp} />
                    </td>
                    <td style={{ ...tdStyle, color: '#b45309', fontWeight: 600 }}>
                      {r.reportLine}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 pt-2.5">
        <div>
          当前筛选显示 <b>{filtered.length}</b> / {ledger.length} 条跨表勾稽规则。
        </div>
        <div className="flex items-center gap-3">
          <span>视角规范：</span>
          <span><b className="text-emerald-600">a</b> 纯经营(不进三表)</span>
          <span><b className="text-blue-600">b</b> 挂法人单体汇总</span>
          <span><b className="text-rose-600">c</b> 关联交易与集团抵销</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ 视图三：分域明细（三列卡片） ═══════════════════ */
const colHead: React.CSSProperties = { fontSize: 11, fontWeight: 700, marginBottom: 6 };

function RelCard({ rel, kind }: { rel: Rel; kind: 'in' | 'out' }) {
  const isIn = kind === 'in';
  return (
    <div style={{
      background: isIn ? '#f0fdf4' : '#eff6ff',
      border: `1px solid ${isIn ? '#86efac' : '#93c5fd'}`,
      borderRadius: 6, padding: '6px 9px', marginBottom: 6,
    }}>
      <div style={{ fontSize: 11.5, fontWeight: 700, color: isIn ? '#15803d' : '#1d4ed8' }}>{rel.ref}</div>
      <div style={{ fontSize: 10.5, color: '#475569', lineHeight: 1.5, marginTop: 1 }}>{rel.detail}</div>
    </div>
  );
}

function DetailDomain({ domain }: { domain: Domain }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 16, marginBottom: 14, border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{domain.title}</div>
          <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 2 }}>{domain.subtitle}</div>
        </div>
        <span style={{
          fontSize: 10.5, fontWeight: 600, color: '#334155', background: '#f1f5f9',
          border: '1px solid #cbd5e1', borderRadius: 5, padding: '3px 8px', whiteSpace: 'nowrap',
        }}>{domain.perspective}</span>
      </div>

      {/* 三列：输入 → 本域表单 → 输出 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 28px 1.2fr 28px 1fr', gap: 4, alignItems: 'stretch', marginTop: 12 }}>
        <div>
          <div style={{ ...colHead, color: '#15803d' }}>上游输入（从哪取数）</div>
          {domain.inputs.map((r, i) => <RelCard key={i} rel={r} kind="in" />)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 18 }}>→</div>
        <div style={{ background: '#1e293b', borderRadius: 7, padding: 10 }}>
          <div style={{ ...colHead, color: '#93c5fd' }}>本域表单</div>
          {domain.forms.map((f) => (
            <div key={f.code} style={{ background: '#334155', borderRadius: 5, padding: '5px 9px', marginBottom: 5 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#bfdbfe' }}>{f.code}</span>
              <span style={{ fontSize: 10.5, color: '#e2e8f0', marginLeft: 6 }}>{f.name}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 18 }}>→</div>
        <div>
          <div style={{ ...colHead, color: '#1d4ed8' }}>下游输出（到哪去）</div>
          {domain.outputs.map((r, i) => <RelCard key={i} rel={r} kind="out" />)}
        </div>
      </div>

      {/* 关键勾稽 */}
      <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 7, padding: '9px 12px', marginTop: 12 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: '#b45309', marginBottom: 4 }}>关键勾稽与口径</div>
        <ul style={{ margin: 0, paddingLeft: 17, color: '#334155', fontSize: 11.5, lineHeight: 1.75 }}>
          {domain.keyRules.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
    </div>
  );
}

/* ═══════════════════ 底部：全文档统一口径约定 ═══════════════════ */
function ConventionFooter() {
  const items = [
    '金额一律不含税，单位万元，精度 0.1；不做含税折算、不推增值税分录。',
    '组织维度：管理单元归属某一法人（多对一）；部门独立于法人/管理单元，不做级联下拉；财务视角按法人归集。',
    '法人视角三种用法：①不挂法人纯经营视角（BB.1.4 / BB.1.X，不进三表）；②挂法人多法人同表平铺（BB.1.2/1.3/3.x/2.1/3.X/4.x/5.x，集团=各法人加总）；③集团内关联交易视角（BB.1.3.d/g 内部供应商列、BB.3.x.D 代采购、BB.4.2.b 内部租赁 → BJ.C 抵销）。',
    '报表颗粒度 = 报表项目行：只写报表项目名，不写明细科目码；不做凭证、不做权益法追溯、不做金融资产四分类。',
    '三表以自动归集为主，财务可在报表项目行直接调整或补录（含目标平衡调整）；调整值固化后随表输出、可追溯。',
    'PL = 全年+1~12月；BS = 年初/发生/调整/期末 4 列；CF = 本年累计 1 列。',
    '抵销只做五类：内部购销对冲、内部往来对冲、内部现金流对冲、未实现利润—存货、未实现利润—长期资产。',
  ];
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 16, border: '1px solid #cbd5e1' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>全文档统一口径约定</div>
      <ul style={{ margin: 0, paddingLeft: 20, color: '#334155', fontSize: 12, lineHeight: 1.9 }}>
        {items.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
}

/* ═══════════════════ 页面主体 ═══════════════════ */
export function LogicView() {
  const [mode, setMode] = useState<Mode>('overall');

  const tabs: { key: Mode; label: string; hint: string }[] = [
    { key: 'overall', label: '整体大图', hint: '四段式全景看全局' },
    { key: 'ledger', label: '数据流总账', hint: '评审口径 / 配取数规则' },
    { key: 'detail', label: '分域明细', hint: '逐域看输入输出与勾稽' },
  ];

  return (
    <div style={{ padding: 24, background: '#f1f5f9', minHeight: '100vh', flex: 1, overflowY: 'auto' }}>
      <div style={{ marginBottom: 16 }} className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>T7 逻辑关系说明</div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 4, lineHeight: 1.7 }}>
            讲清预算数据<b>从哪来、到哪去、怎么算</b>。
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setMode(t.key)}
            style={{ padding: '6px 16px', borderRadius: 6, border: '1px solid #cbd5e1', cursor: 'pointer',
              background: mode === t.key ? '#1e293b' : '#fff', color: mode === t.key ? '#fff' : '#334155', fontSize: 13 }}>
            {t.label}
            <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>{t.hint}</span>
          </button>
        ))}
      </div>

      {mode === 'overall' && (
        <>
          <div style={{ background: '#fff', borderRadius: 8, padding: '11px 14px', marginBottom: 10, fontSize: 14, fontWeight: 700, color: '#0f172a', borderLeft: '4px solid #2563eb' }}>
            整体逻辑图（一）· 预算模块全景与费用归集
          </div>
          <LogicDiagramCanvas data={overallDiagram} />
          <div style={{ height: 18 }} />
          <div style={{ background: '#fff', borderRadius: 8, padding: '11px 14px', marginBottom: 10, fontSize: 14, fontWeight: 700, color: '#0f172a', borderLeft: '4px solid #2563eb' }}>
            整体逻辑图（二）· 数据归集与责任流转：基层采集 → 职能归口 → 总部汇总
          </div>
          <LogicDiagramCanvas data={collectionDiagram} />
        </>
      )}
      {mode === 'ledger' && (
        <>
          <LedgerTable />
          <div style={{ marginTop: 16 }}><ConventionFooter /></div>
        </>
      )}
      {mode === 'detail' && (
        <>
          {domains.map((d) => <DetailDomain key={d.key} domain={d} />)}
          <ConventionFooter />
        </>
      )}
    </div>
  );
}
