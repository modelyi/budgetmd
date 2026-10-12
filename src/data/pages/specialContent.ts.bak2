/**
 * T5「专项方案说明」内容数据（数据层）
 * =============================================================================
 * 每个方案页的标题 / 小节 / 段落 / 卡片 / 条目 / 口径提醒（warn）均可 Markdown
 * 编辑；关系示意 SVG 以 diagram 占位、整块固定（图内标注若需改可对话调整）。
 */

export interface CardC { lead?: string; text: string; hl?: boolean }
export type SpecialItem =
  | { t: 'eyebrow'; id: string; text: string }
  | { t: 'h1'; id: string; text: string }
  | { t: 'layer'; id: string; text: string }
  | { t: 'p'; id: string; text: string }
  | { t: 'cards'; id: string; cards: CardC[] }
  | { t: 'warn'; id: string; lead?: string; text: string }
  | { t: 'agenda'; id: string; rows: { no: string; title: string; desc: string }[] }
  | { t: 'diagram'; id: string };

export interface SpecialPage {
  key: string;
  no: string;
  menuTitle: string;
  items: SpecialItem[];
}

export const specialPages: SpecialPage[] = [
  // ── 目录 ──
  {
    key: 'agenda', no: '', menuTitle: '七大方案速览',
    items: [
      { t: 'eyebrow', id: 'ag-eb', text: '目录 · CONTENTS' },
      { t: 'h1', id: 'ag-h1', text: '七大业务方案速览' },
      {
        t: 'agenda', id: 'ag-grid',
        rows: [
          { no: '01', title: '对外软硬件销售', desc: 'BB.1.2 · 卖产品的收入成本账' },
          { no: '02', title: '对外服务销售', desc: 'BB.1.3 · 卖服务的收入成本账' },
          { no: '03', title: '集团内部关联交易', desc: 'BJ.C · 单体计损益、合并全额抵销' },
          { no: '04', title: '雇员费用与人工成本', desc: 'BB.5.1 · 不重复计提、按部门冲减' },
          { no: '05', title: '存货流转与成本结转', desc: 'BB.3.X · 料工费→产成品→销售' },
          { no: '06', title: '增值税集中测算', desc: 'BF.4.b · 业务不含税、税金表统一算' },
          { no: '07', title: '资本化支出与折旧', desc: 'BB.4.X · 资本支出形成资产、折旧进成本' },
        ],
      },
    ],
  },

  // ── 00 表间逻辑流转 ──
  {
    key: 'flow', no: '00', menuTitle: '表间逻辑流转',
    items: [
      { t: 'eyebrow', id: 'fl-eb', text: '00 · OVERVIEW' },
      { t: 'h1', id: 'fl-h1', text: '表间逻辑流转关系图' },
      { t: 'p', id: 'fl-p', text: '自底向上五层：基础数据 → 假设 → 业务预算 → 财务预算 → 三表。箭头表示数据流向。' },
      { t: 'diagram', id: 'flow' },
    ],
  },

  // ── 01 软硬件 ──
  {
    key: 'product', no: '01', menuTitle: '软硬件收入与成本',
    items: [
      { t: 'eyebrow', id: 'pr-eb', text: '01 · BB.1.2' },
      { t: 'h1', id: 'pr-h1', text: '对外软硬件销售' },
      { t: 'layer', id: 'pr-l1', text: '这是什么生意' },
      {
        t: 'p', id: 'pr-p',
        text: '把自研产品（硬件设备 + 配套软件）卖给集团外客户。一笔合同走完：签约 → 发货/部署 → 客户验收 → 回款。收入在客户验收当月一次性确认，不分期；成本和收入同期匹配。',
      },
      { t: 'layer', id: 'pr-l2', text: '业务部门报什么' },
      {
        t: 'cards', id: 'pr-c1', cards: [
          { lead: '销售部', text: '报：每笔合同的销量、单价、预计验收月份、预收和回款节奏。收入自动算。', hl: true },
          { lead: '集团财经', text: '只补一件事：每类产品的销售成本（按年初发布的标准成本目录 × 销量）。其余全自动。' },
        ],
      },
      { t: 'layer', id: 'pr-l3', text: 'CFO 要拍板的假设' },
      {
        t: 'cards', id: 'pr-c2', cards: [
          { lead: '标准成本', text: '年初由财务定每类硬件/软件的单位成本目录，全年不变；年末差异另算。' },
          { lead: '验收节奏', text: '从签约到验收平均几个月——决定收入落在哪几个月。' },
          { lead: '回款账期', text: '预收/到货款/验收款/质保金比例——决定现金流分布。' },
        ],
      },
      { t: 'layer', id: 'pr-l4', text: '两种成本路径' },
      {
        t: 'cards', id: 'pr-c3', cards: [
          { lead: '硬件', text: '先入存货，销售时从存货出库结转成本（跟着实物走）。' },
          { lead: '软件', text: '不占库存，成本按标准成本直接结转（主要是分摊的研发人工）。' },
        ],
      },
      { t: 'layer', id: 'pr-l5', text: '相关编制表逻辑关系 — 单体' },
      { t: 'diagram', id: 'product-mono' },
      { t: 'layer', id: 'pr-l6', text: '相关编制表逻辑关系 — 关联交易' },
      { t: 'diagram', id: 'product-ic' },
    ],
  },

  // ── 02 技术服务 ──
  {
    key: 'service', no: '02', menuTitle: '技术服务收入与成本',
    items: [
      { t: 'eyebrow', id: 'sv-eb', text: '02 · BB.1.3' },
      { t: 'h1', id: 'sv-h1', text: '对外服务销售：现场服务才拆人工+物料' },
      { t: 'layer', id: 'sv-l1', text: '① 填报层（业务岗）' },
      {
        t: 'cards', id: 'sv-c1', cards: [
          { lead: '.a 服务销售〔销售岗〕', text: '存量+增量同表；销量×单价=收入' },
          { lead: '.d 物料明细〔交易路径岗〕', text: '好件/坏件分行；关联供应商列' },
          { lead: '.g 人工明细〔交易路径岗〕', text: '岗位×月度工时；关联供应商列' },
        ],
      },
      { t: 'layer', id: 'sv-l2', text: '② 分录 → 三表落点' },
      {
        t: 'cards', id: 'sv-c2', cards: [
          { lead: '收入', text: '借 1122 ／ 贷 6001.1 → PL 6001.1' },
          { lead: '物料成本', text: '借 6401.1 ／ 贷 1405' },
          { lead: '人工成本', text: '借 6401.1 ／ 贷 6601/6602/6603/5001（按部门冲减，不重复计提）' },
          { lead: '回款', text: '→ CF-01（服务×1.06）' },
        ],
      },
      {
        t: 'warn', id: 'sv-w', lead: '跨法人关联供货',
        text: '提供方借 1221.1／贷 6001.2（成本+加成）、借 6401.2／贷 1405/费用；签约主体借 6401.1（加成进成本）／贷 2241.1。增值税物料13%/人工6%。合并层 6001.2↔6401.1 对冲，6401.2 保留。',
      },
      { t: 'layer', id: 'sv-l3', text: '④ 相关编制表逻辑关系 — 单体' },
      { t: 'diagram', id: 'service-mono' },
      { t: 'layer', id: 'sv-l4', text: '⑤ 相关编制表逻辑关系 — 关联交易' },
      { t: 'diagram', id: 'service-ic' },
    ],
  },

  // ── 03 关联交易 ──
  {
    key: 'intercompany', no: '03', menuTitle: '集团内部关联交易',
    items: [
      { t: 'eyebrow', id: 'ic-eb', text: '03 · BJ.C' },
      { t: 'h1', id: 'ic-h1', text: '集团内部关联交易：单体计损益、合并全额抵销' },
      { t: 'layer', id: 'ic-l1', text: '① 五类关联交易' },
      {
        t: 'cards', id: 'ic-c1', cards: [
          { lead: '代采购物料', text: 'BB.3.3.D 驱动；平价转移+加成(BAA.11)' },
          { lead: '代采购资产', text: '原值平移 B 侧；按 B 侧剩余年限折旧' },
          { lead: '资产转卖', text: '净值平移+加成进 6115；买方续提折旧' },
          { lead: '关联借款', text: '本金 1221.1/2241.1；利息 6001.2↔6604.1' },
          { lead: '内部职场租赁', text: '>1年资本化(1621/2602)；≤1年费用化' },
        ],
      },
      {
        t: 'warn', id: 'ic-w', lead: '合并抵销（CAS 33）',
        text: '提供方收入 ↔ 接受方成本/费用全额对冲；1221.1↔2241.1 往来对冲；关联现金流对冲。合并对三表 0 影响。税率：货物13%、服务6%、租赁9%，合并层销项进项自然对冲。例外：关联借款利息进项不得抵扣。',
      },
      { t: 'layer', id: 'ic-l2', text: '相关编制表 ER 关系' },
      { t: 'diagram', id: 'intercompany' },
    ],
  },

  // ── 04 雇员费用 ──
  {
    key: 'labor', no: '04', menuTitle: '雇员费用编制/导入',
    items: [
      { t: 'eyebrow', id: 'lb-eb', text: '04 · BB.5.1' },
      { t: 'h1', id: 'lb-h1', text: '雇员费用编制/导入（BB.5.1）' },
      { t: 'layer', id: 'lb-l1', text: '① HR 统一计提（四列）' },
      {
        t: 'cards', id: 'lb-c1', cards: [
          { text: '销售费用 → 6601' },
          { text: '管理费用 → 6602' },
          { text: '研发费用 → 6603' },
          { text: '制造费用 → 5001' },
        ],
      },
      { t: 'layer', id: 'lb-l2', text: '② 项目型人工按部门属性冲减（AM.2→AB.14）' },
      {
        t: 'cards', id: 'lb-c2', cards: [
          { lead: '技术服务人工 BB.1.3.i', text: '借 6401.1 ／ 贷 6601/6602/6603/5001', hl: true },
          { lead: '自制设备人工 BB.4.1.b', text: '借 1604 在建工程 ／ 贷 费用科目（资本化）', hl: true },
        ],
      },
      {
        t: 'warn', id: 'lb-w', lead: '三条铁律',
        text: '① 不重复计提 2211：只是费用重分类。② 付现只走一次：发薪在 BB.5.1 CF-06。③ 跨法人人工同物料模型：提供方 6001.2/6401.2、接受方 6401.1 含加成。',
      },
      { t: 'layer', id: 'lb-l3', text: '相关编制表 ER 关系' },
      { t: 'diagram', id: 'labor' },
    ],
  },

  // ── 05 进销存 ──
  {
    key: 'inventory', no: '05', menuTitle: '进销存预算',
    items: [
      { t: 'eyebrow', id: 'in-eb', text: '05 · BB.3.X' },
      { t: 'h1', id: 'in-h1', text: '存货流转：料工费 → 产成品 → 销售领用' },
      {
        t: 'cards', id: 'in-c1', cards: [
          { lead: '原材料入库', text: 'BB.3.3.C 到货额+代采购平价转入' },
          { text: '→' },
          { lead: '在制品', text: '料←领料；工←制造人工；费←BB.5.2+折旧' },
          { text: '→' },
          { lead: '产成品', text: '= 产量×BAA.2 标准成本' },
          { text: '→' },
          { lead: '出库', text: 'BB.1.2 销售 / BB.1.3 服务物料', hl: true },
        ],
      },
      {
        t: 'warn', id: 'in-w', lead: '关键口径',
        text: '出入库按法人逐来源取数、不按比例拆分；代采购平价转移不含加成（加成走 6001.2↔6602/6401.1，不进存货）；各法人加总=集团存货列报。整机销售只认综合产品成本不拆料工。',
      },
      { t: 'layer', id: 'in-l1', text: '相关编制表 ER 关系' },
      { t: 'diagram', id: 'inventory' },
    ],
  },

  // ── 06 税金 ──
  {
    key: 'vat', no: '06', menuTitle: '税金及附加预算',
    items: [
      { t: 'eyebrow', id: 'va-eb', text: '06 · BF.4.b' },
      { t: 'h1', id: 'va-h1', text: '增值税集中测算：业务不含税、税金表统一算' },
      {
        t: 'cards', id: 'va-c1', cards: [
          { lead: 'BF.4.a 税金主表', text: '增值税行不手填，从 .b 带出；附加税按实缴联动' },
          { lead: 'BF.4.b 增值税附表', text: '销项−进项±留抵=净应纳；货物13%/服务6%/租赁9%', hl: true },
        ],
      },
      {
        t: 'warn', id: 'va-w', lead: '关联交易增值税',
        text: '提供方计销项、接受方计进项（同额同率），价外税不影响损益。合并层销项进项自然对冲（净0）。例外：关联借款利息进项不得抵扣。',
      },
      { t: 'layer', id: 'va-l1', text: '相关编制表 ER 关系' },
      { t: 'diagram', id: 'vat' },
    ],
  },

  // ── 07 资本化 ──
  {
    key: 'capex', no: '07', menuTitle: '资本化支出',
    items: [
      { t: 'eyebrow', id: 'cp-eb', text: '07 · BB.4.X' },
      { t: 'h1', id: 'cp-h1', text: '资本化支出（BB.4）' },
      { t: 'layer', id: 'cp-l1', text: '① 哪些支出资本化' },
      {
        t: 'cards', id: 'cp-c1', cards: [
          { lead: '外购固定资产', text: '借 1601 / 1604（需安装）' },
          { lead: '自制设备', text: '料工费归集 1604；人工从 BB.5.1 冲减' },
          { lead: '>1年职场租赁', text: '1621/2602；≤1年费用化' },
          { lead: '代采购资产', text: '原值平移 B 侧；按 B 侧剩余年限折旧' },
        ],
      },
      { t: 'layer', id: 'cp-l2', text: '② 资产路径' },
      {
        t: 'cards', id: 'cp-c2', cards: [
          { lead: '转固', text: '借 1601 ／ 贷 1604；次月起折旧', hl: true },
          { lead: '月度折旧', text: '借 5101/6601/6602/6603 ／ 贷 1602', hl: true },
        ],
      },
      {
        t: 'warn', id: 'cp-w', lead: '资本化条件',
        text: '使用周期 >1 年、达 AA.9 门槛、形成长期资源。日常维修、低值易耗品、≤1年租赁直接 BB.5.2 费用化。资产类别全库唯一字段（取 AA.9 层级），不拆大类小类。',
      },
      { t: 'layer', id: 'cp-l3', text: '相关编制表 ER 关系' },
      { t: 'diagram', id: 'capex' },
    ],
  },
];
