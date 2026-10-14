/**
 * T3A 单主体裁剪规则（原型口径）
 * =============================================================================
 * 背景：T3A（docs/formdocs/ 37 篇）是「单主体原型文档」，只讲单一法人/单主体编制口径；
 * 其文字与表样分片与 T3B（docs/formdocs-multi/ 43 篇，含多法人关联交易）**同源共享**
 * （src/data/texts/*.xml + src/data/sheets/*.json 两份源两侧都读）。因此裁剪只能在
 * T3A scope 的生成期做：multi scope 一字不动，T3A 走本模块的裁剪规则。
 *
 * 裁剪范围（多法人关联交易内容，原型越界）：
 *   · 多主体专属表单的引用与整条内容：BJ.C / BJ.C.* / BO.ELIM / BAA.11 /
 *     BB.4.2.b / BB.4.2.b.1 / BB.1.2.d / BB.3.1.D / BB.3.3.D；
 *   · 关联交易用语与口径：「内部供应商 / 跨法人 / 代采购 / 加成款 / 加成比例 /
 *     合并抵销 / 内部往来结算 / 内部租赁（内部职场租赁）/ 两岗接力 / 结算收款付款」等；
 *   · 表样中多主体专属的整列（BB.1.3 的「内部供应商」列、BB.3.X 的「其中:内部加成-*」列）
 *     与整行（BF.4.b 的「内部交易销/进项税额」行、BB.4.5 的「代采购转入/内部职场租赁」行）。
 *
 * 保留（单主体下合理）：法人公司/管理单元作为编制维度、不含内部交易的常规编制口径、
 * 对外租赁（BB.4.2.a / BB.4.2.a.1）等。
 *
 * 裁剪动作优先级：整条（字段行/规则点/适用情形/数据来源/表样整行整列）命中即整条剔除；
 * 否则按字面片段删除/收敛为单主体表述；删除会把整条语义删除干净的，标「待确认」不硬删。
 * 每次 T3A 生成后由 assertNoMultiEntityResidue() 兜底断言无残留（命中即报错退出）。
 */

/** 多法人关联交易用语/多主体专属编码的残留哨兵（T3A 生成后兜底断言用） */
export const T3A_MULTI_ENTITY_PATTERN =
  /内部供应商|内部加成|内部往来|内部租赁|内部场地租赁|内部职场租赁|内部结算|内部购销|内部供货|内部抵销|内部交易|内部转卖|内部销售|内部租金|内部借款|内部代采|内部应收|内部应付|内部转移|内部调拨|跨法人|代采购|加成款|加成比例|合并抵销|关联交易|关联方|两岗接力|抵销|抵消|BJ\.C|BO\.ELIM|BAA\.11|BB\.1\.2\.d|BB\.3\.1\.D|BB\.3\.3\.D|BB\.4\.2\.b/;

/**
 * 整行剔除：BO 三表「上游自动取数规则」的「来源」列里，每一项来源各占一行；
 * 以多主体专属表单编码起始的整行（如「BB.1.3.f 物料明细_财务查询(...)」）整行去掉。
 * 只锚行首，避免误删句中出现这些编码、但整句属单主体口径的文案。
 */
const MULTI_LINE_START =
  /^(BB\.3\.3\.D|BB\.3\.1\.D|BB\.4\.2\.b\.1|BB\.4\.2\.b|BJ\.C(\.[a-z])?|BO\.ELIM)\b/;
/** 单主体的服务物料/人工财务查询子表（BB.1.3.f/.i）：仅当该行内容本身是多主体口径时才整行剔除 */
const MULTI_SUBTAB_LINE_START = /^BB\.1\.3\.[fi]\b/;

/** 按行剔除来源项（单行单元格同样按整行判定）；若整格命中去掉后为空，返回空串（不新造内容） */
function dropMultiEntityLines(s: string): string {
  return s
    .split('\n')
    .filter((l) => {
      const t = l.trim();
      if (MULTI_LINE_START.test(t)) return false;
      return !(MULTI_SUBTAB_LINE_START.test(t) && T3A_MULTI_ENTITY_PATTERN.test(t));
    })
    .join('\n')
    .trim();
}

/** 删除 marker 及其后紧邻的成对括号块（支持嵌套括号）；括号未闭合时删到末尾 */
function cutBalancedBlock(s: string, marker: string): string {
  let from = s.indexOf(marker);
  while (from >= 0) {
    const open = s.indexOf('（', from + marker.length);
    if (open < 0 || open > from + marker.length + 2) break;
    let depth = 0;
    let end = -1;
    for (let i = open; i < s.length; i++) {
      if (s[i] === '（') depth++;
      else if (s[i] === '）') {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    // 源文里存在括号未配平的子句（如「+ 代采购物料平价转入（…（…）」），此时删除到末尾
    s = end < 0 ? s.slice(0, from) : s.slice(0, from) + s.slice(end + 1);
    from = s.indexOf(marker);
  }
  return s;
}

/** 删除 [start, end) —— 保留 end 起始内容（用于「句中夹层子句」删除） */
function cutBetween(s: string, start: string, end: string): string {
  const i = s.indexOf(start);
  if (i < 0) return s;
  const j = s.indexOf(end, i + start.length);
  if (j < 0) return s;
  return s.slice(0, i) + s.slice(j);
}

/** 删除从 marker 起到字符串末尾的全部内容（用于「……；多主体尾巴」型句尾） */
function cutToEnd(s: string, marker: string): string {
  const i = s.indexOf(marker);
  return i < 0 ? s : s.slice(0, i);
}

/** 删除 [start, end] 区间（含两端），用于句中夹层子句 */
function cutSpan(s: string, start: string, end: string): string {
  const i = s.indexOf(start);
  if (i < 0) return s;
  const j = s.indexOf(end, i + start.length);
  if (j < 0) return s;
  return s.slice(0, i) + s.slice(j + end.length);
}

type TextOp = { note: string; run: (s: string) => string };

/** 字面删除（全部出现处） */
const del = (frag: string): TextOp => ({ note: `删除「${frag}」`, run: (s) => s.split(frag).join('') });
/** 字面替换 */
const rep = (a: string, b: string): TextOp => ({ note: `「${a}」→「${b}」`, run: (s) => s.split(a).join(b) });
/** 正则删除 */
const reDel = (re: RegExp): TextOp => ({ note: `正则删除 ${re}`, run: (s) => s.replace(re, '') });
/** 正则替换 */
const reRep = (re: RegExp, to: string): TextOp => ({ note: `正则替换 ${re}`, run: (s) => s.replace(re, to) });
/** 删到末尾 */
const toEnd = (marker: string): TextOp => ({
  note: `删除「${marker}」起至末尾`,
  run: (s) => (s.includes(marker) ? s.split(marker).map((p, i) => (i === 0 ? p : '')).join('').replace(/[，；、]$/, '') : s),
});
/** 删除 marker 及其后成对括号块 */
const cutBal = (marker: string): TextOp => ({
  note: `删除「${marker}（…）」块`,
  run: (s) => cutBalancedBlock(s, marker),
});
const span = (a: string, b: string): TextOp => ({ note: `删除跨度「${a}…${b}」`, run: (s) => cutSpan(s, a, b) });
/** 删除「a」到「b」之间（保留 b） */
const between = (a: string, b: string): TextOp => ({ note: `删除「${a}」至「${b}」之间（保留后者）`, run: (s) => cutBetween(s, a, b) });

/**
 * 文本裁剪规则（顺序敏感、幂等）。同时作用于 XML 文字源与表样分片单元格文本。
 * 每条规则都对应一处多法人关联交易内容；「待确认」用于删除会把整条语义掏空的场合。
 */
export const T3A_TEXT_OPS: TextOp[] = [
  // ══ A. 销售侧「内部供应商」（BB.1.1 / BB.1.2 / BB.1.3）══
  del('；销售订单不再区分内部供应商（内部供货关系不进入销售订单登记）'),
  del('；销售订单不登记内部供应商（内部供货关系不进入销售订单）'),
  del('，销售订单不再区分内部供应商'),
  toEnd('；内部供货关系改在'),
  toEnd('，内部供货关系改在'),
  del('；「内部供应商」为备查字段，不在表样中占列。'),
  del('（原内部交易视角 Tab j 已删除）'),

  // ══ B. 内部往来结算 / 销售线内部供应商（BB.1.3 / BB.3.X / BO 三表 / BF.4）══
  { note: '删除「销售线物料明细内部供应商…」分句及其后续多主体口径', run: (s) => cutToEnd(s, ' + 销售线物料明细内部供应商') },
  { note: '删除「；± 销售线物料明细内部供应商…」至末尾', run: (s) => cutToEnd(s, '；± 销售线物料明细内部供应商') },
  { note: '删除「± 销售线物料明细内部供应商…」至末尾', run: (s) => cutToEnd(s, '± 销售线物料明细内部供应商') },
  { note: '删除服务物料行的销售线内部供应商转入分句', run: (s) => cutToEnd(s, ' + 销售线物料明细内部供应商真实购销转入') },
  { note: '删除物料明细内部供应商出库转出分句', run: (s) => cutToEnd(s, ' + 销售线物料明细内部供应商出库转出') },
  span('；± BJ.C.g 内部销售预算', ''),
  { note: '删除 BJ.C.g 内部销售相关分句至末尾', run: (s) => cutToEnd(s, '；BJ.C.g 内部销售预算') },
  { note: '删除「± BJ.C.g 内部销售预算…」分句', run: (s) => cutToEnd(s, '± BJ.C.g 内部销售预算') },

  // ══ C. 代采购物料平价转入/转出（BB.3.X 主表与 .b 明细表、BO.BS）══
  cutBal('+ 代采购物料平价转入'),
  cutBal('+ 代采购物料平价转出'),
  cutBal('± 代采购物料平价转移'),
  cutBal('± 代采购资产转移'),
  del('；代采购物料平价转入为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'),
  del('；代采购物料平价转出为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'),
  del('；内部交易在集团合并层抵销、不改变集团合并层存货净额'),
  reDel(/；?单体公司层面按业务本质处理，集团合并层抵销内部购销与加成利润，只保留提供方真实出库成本/g),
  reDel(/；勾稽约束：代采购转移额[\s\S]*?（提供方单体不得因转移出现负存货余额）/g),
  reDel(/；勾稽约束：代采购资产转移额[\s\S]*?（提供方单体不得因转移出现负固定资产余额）/g),
  reDel(/；勾稽约束：代采购资产转移额[\s\S]*?（提供方单体不得因转移出现负无形资产余额）/g),

  // ══ D. 跨法人代工/调拨与关联交易视角（BB.3.X / BB.3.1 / BB.3.3 / BO.BS / BO.PL）══
  { note: '删除跨法人代工/调拨口径至末尾', run: (s) => cutToEnd(s, '；跨法人代工/调拨属内部交易') },
  { note: '删除跨法人代工/调拨口径至末尾（；若存在…）', run: (s) => cutToEnd(s, '；若存在跨法人代工/调拨') },
  del('一并按两岗接力代采购模型移除；'),
  del('该列已按两岗接力代采购模型移除、改在 .D 关联交易视角补填'),
  del('（受益主体列已按两岗接力代采购模型移除，改在 .D 关联交易视角补填）'),
  { note: '删除「+ BB.3.x.D 关联交易视角（…）」Tab', run: (s) => cutBalancedBlock(s, ' + BB.3.1.D 关联交易视角') },
  { note: '删除「+ BB.3.x.D 关联交易视角（…）」Tab', run: (s) => cutBalancedBlock(s, ' + BB.3.3.D 关联交易视角') },
  del('，PO标记为下拉列，共43列）四'),
  reDel(/，不设受益主体列/g),
  reDel(/，均不含「受益主体」列/g),

  // ══ E. 内部租赁（BAA.6 / BB.4.2.a / BB.5.2 / BB.4.3 / BB.4.X）══
  { note: 'BAA.6：删除供 BB.4.2.b 的带出口径', run: (s) => cutSpan(s, 'BAA.6.b/.c 按「年度×场所×公司」带出到 BB.4.2.b 内部职场租赁（面积/占比/单价），', '；测算租金') },
  toEnd('；BAA.6.e 带出到 BB.4.2.b.1 折现得租赁负债初始并算各月利息。'),
  del('供 BB.4.2.b 内部职场租赁按「场所」取面积与单价引用、'),
  del('（与 BB.4.2.b 内部职场租赁「承租方(法人)」同口径）；本表仅登记出租方类型=内部持有的场所'),
  del('（内部租赁按法人分摊）'),
  del('仅供 BB.4.2.b 内部职场租赁按「年度×场所×公司」带出；'),
  del('供 BB.4.2.b.1 内部职场租赁·财务视角折现计算租赁负债初始与各月利息'),
  del('；内部持有场所=市场单价'),
  del('（单价并入年度租赁面积维护、仅登记出租方类型=内部持有的场所）'),
  del('（单价并入年度租赁面积维护）'),
  del('，仅供内部租赁 BB.4.2.b；外部职场的租赁面积与合同单价不在此、由 BB.4.2.a 按对外合同录入'),
  del('（均按「年度×场所×公司」带出、仅内部持有场所；外部职场的租赁面积与合同单价不在此、由 BB.4.2.a 按对外合同本表录入），用于测算内部租金与加成款'),
  del('（面积/单价/占比仅供内部租赁 BB.4.2.b；外部职场的租赁面积与合同单价不在此、由 BB.4.2.a 按对外合同录入）'),
  del('、参与集团合并抵销'),
  del('，不参与合并抵销'),
  del('，单体与合并口径同额保留'),
  del('，不参与集团合并抵销（1621/2602 单体与合并同额保留）'),
  del('；本表不计提折旧、不重复列示每月折旧额/累计折旧，与 BB.4.2.b.1 合计只取一次'),
  del('，与 BB.4.2.b.1 合计只取一次'),
  del('（内部租赁那条由 BB.4.2.b.1 承担并全额抵销）'),
  rep('与 BB.4.2.b 内部职场租赁共用同一字典、同名同说明', '与外部职场租赁同名同说明'),
  rep('两类职场租赁来源', '外部职场租赁来源'),
  rep('内部/外部职场租赁（使用权资产）=BB.4.2.b.1 / BB.4.2.a.1 对应租赁合同的预算项目', '外部职场租赁（使用权资产）=BB.4.2.a.1 对应租赁合同的预算项目'),
  rep('内部职场租赁 / 外部职场租赁（使用权资产经 BB.4.3 由 BB.4.2.b.1 / BB.4.2.a.1 自动带出，原值=租赁负债初始）', '外部职场租赁（使用权资产经 BB.4.3 由 BB.4.2.a.1 自动带出，原值=租赁负债初始）'),
  rep('由内部 BB.4.2.b / 外部 BB.4.2.a 资本化租赁自动生成', '由外部 BB.4.2.a 资本化租赁自动生成'),
  rep('由内部 BB.4.2.b / 外部 BB.4.2.a 资本化租赁自动生成', '由外部 BB.4.2.a 资本化租赁自动生成'),
  rep('内部 BB.4.2.b.1 / 外部 BB.4.2.a.1', '外部 BB.4.2.a.1'),
  rep('BB.4.2.b.1 / BB.4.2.a.1', 'BB.4.2.a.1'),
  rep('内部 BB.4.2.b.1 / 外部 BB.4.2.a.1', '外部 BB.4.2.a.1'),
  rep('内部 BB.4.2.b / 外部 BB.4.2.a', '外部 BB.4.2.a'),
  del('——外部职场租赁租金/物业由 BB.4.2.a/BB.4.2.a.1 带出、内部场地租赁由 BB.4.2.b 带出（若包含房租付现且符合新租赁准则，路由至 BB.4.2.a.1 外部职场租赁·财务视角或 BB.4.2.b.1 内部职场租赁·财务视角做使用权资产与租赁负债折算）'),
  del('——外部职场租赁租金/物业由 BB.4.2.a/BB.4.2.a.1 带出、内部场地租赁由 BB.4.2.b 带出'),
  rep('——两类租赁不在本表按面积公摊', '——租赁类费用不在本表按面积公摊'),
  del('；内部场地租赁由 BB.4.2.b 内部职场租赁带出'),
  del('与内部场地租赁（由 BB.4.2.b 带出）'),
  del('、内部场地租赁由 BB.4.2.b 带出'),
  del('，内部场地租赁由 BB.4.2.b 带出'),

  // ══ F. 内部往来/合并抵销通用尾巴（BO 三表、BB.4.X、BB.5.2、BAA.6）══
  del('，不参与合并抵销'),
  del('，集团合并层不抵销'),
  del('、集团合并层不抵销'),
  del('、不抵销'),
  del('，不抵销'),
  del('、参与集团合并抵销'),
  del('、参与合并抵销'),

  // ══ G. BAA.6 办公场所租赁维护：内部职场租赁相关口径（保留单主体租赁参数）══
  del('；内部持有=集团内物业持有法人出租给内部法人（租金走 BB.4.2.b 内部职场租赁、参与集团合并抵销）'),
  del('仅登记出租方类型=内部持有的场所面积与单价（内部租赁按法人分摊）：'),
  rep('维护内部场所单价（市场单价=内部定价基准）', '维护场所单价'),
  del('；仅供 BB.4.2.b 内部职场租赁带出（内部租金 = 单价 × 租赁面积 ÷ 10000 × 当月在租期内）'),
  del('，仅供 BB.4.2.b 内部职场租赁取面积与单价（内部租金 = 单价 × 租赁面积 ÷ 10000 × 当月在租期内；内部持有场所=市场单价）'),
  del('；供 BB.4.2.b.1 内部职场租赁·财务视角将租赁付款额折现（月折现率 = 年折现率 ÷ 12）计算租赁负债初始与各月利息费用'),
  del('，供 BB.4.2.b.1 内部职场租赁·财务视角折现计算租赁负债初始与各月利息'),
  rep('供内部职场租赁（BB.4.2.b/BB.4.2.b.1）与租赁费用测算引用', '供租赁费用测算引用'),
  del('，仅登记出租方类型=内部持有的场所'),
  del('（仅出租方类型=内部持有）'),
  del('供 BB.4.2.b 内部职场租赁按「场所」取面积与单价引用、'),
  del('（与 BB.4.2.b 内部职场租赁「承租方(法人)」同口径）；本表仅登记出租方类型=内部持有的场所'),
  del('，仅供 BB.4.2.b 内部职场租赁按「年度×场所×公司」带出'),
  del('；内部持有场所=市场单价'),
  rep('仅登记出租方类型=内部持有的场所面积与单价：', '仅登记出租方类型=内部持有的场所；'),
  rep('；外部租入场所不在此维护、合同单价', '；合同单价'),
  rep('（单价并入年度租赁面积维护、仅登记出租方类型=内部持有的场所）', '（单价并入年度租赁面积维护）'),
  del('，仅供内部租赁 BB.4.2.b；外部职场的租赁面积与合同单价不在此、由 BB.4.2.a 按对外合同录入'),
  reDel(/（均按「年度×场所×公司」带出、仅内部持有场所；[^）]*用于测算内部租金与加成款）/g),
  reDel(/（面积\/单价\/占比仅供内部租赁 BB\.4\.2\.b；[^）]*）/g),
  del('BAA.6.b/.c 按「年度×场所×公司」带出到 BB.4.2.b 内部职场租赁（面积/占比/单价），'),
  del('；BAA.6.e 带出到 BB.4.2.b.1 折现得租赁负债初始并算各月利息'),
  del('、不参与合并抵销'),

  // ══ H. BB.1.3 / BB.3.X：销售线内部供应商与代采购加成（整段）══
  del('；销售订单不再区分内部供应商（内部供货关系不进入销售订单登记）'),
  del('；销售订单不登记内部供应商（内部供货关系不进入销售订单）'),
  del('，销售订单不再区分内部供应商'),
  toEnd('；内部供货关系改在'),
  toEnd('，内部供货关系改在'),
  del('；「内部供应商」为备查字段，不在表样中占列。'),
  del('（原内部交易视角 Tab j 已删除）'),
  // BB.3.X：进销存「内部加成」表尾与代采购入库
  rep('【是什么】全集团存货进销存汇总表。', '【是什么】存货进销存汇总表。'),
  del('，表尾单独跟踪内部加成变动'),
  del('；原材料代采购加成由 BB.3.3.D 自动滚入表尾加成列'),
  reDel(/【系统怎么处理】[^\n]*跨法人代采购[^\n]*[\r\n]*/g),
  reDel(/【合并时】[^\n]*内部加成[^\n]*[\r\n]*/g),
  del('；代采购物料平价转入为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'),
  del('；代采购物料平价转出为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额'),
  del('；内部交易在集团合并层抵销、不改变集团合并层存货净额'),
  reDel(/；?单体公司层面按业务本质处理，集团合并层抵销内部购销与加成利润，只保留提供方真实出库成本/g),
  reDel(/；勾稽约束：代采购转移额[\s\S]*?（提供方单体不得因转移出现负存货余额）/g),
  reDel(/；勾稽约束：代采购资产转移额[\s\S]*?（提供方单体不得因转移出现负固定资产余额）/g),
  reDel(/；勾稽约束：代采购资产转移额[\s\S]*?（提供方单体不得因转移出现负无形资产余额）/g),
  reDel(/；接受方 B 承接后的后续折旧由 BB\.4\.5（[^）]*）计提并汇入 BB\.4\.X\.A 增量部分/g),
  del('；含内部交易增值税：各法人独立申报、内部交易销项与进项不对抵；集团合并层各法人加总后内部部分自然净 0（内部交易同为应税交易，卖方/提供方计销项、买方/接受方计进项，同额同率，税率取 AB.15）'),

  // ══ I. BB.3.1 / BB.3.3：两岗接力代采购与 .D 关联交易视角 ══
  del('，不设受益主体列；该列已按两岗接力代采购模型移除、改在 .D 关联交易视角补填'),
  del('（受益主体列已按两岗接力代采购模型移除，改在 .D 关联交易视角补填）'),
  reDel(/，均不含「受益主体」列/g),
  cutBal('+ BB.3.1.D 关联交易视角'),
  cutBal('+ BB.3.3.D 关联交易视角'),
  // 仅 BB.3.1 / BB.3.3：移除「.D 关联交易视角」Tab 后，Tab 数由四变三
  rep('四个 Tab：BB.3.1.A 有PO', '三个 Tab：BB.3.1.A 有PO'),
  rep('本表含四个Tab（同页切换）：BB.3.1', '本表含三个Tab（同页切换）：BB.3.1'),
  rep('设备及无形资产类采购（四个Tab：BB.3.1', '设备及无形资产类采购（三个Tab：BB.3.1'),
  rep('四个 Tab：BB.3.3.A 有PO', '三个 Tab：BB.3.3.A 有PO'),
  rep('本表含四个Tab（同页切换）：BB.3.3', '本表含三个Tab（同页切换）：BB.3.3'),
  rep('物料类采购预算（四个Tab：BB.3.3', '物料类采购预算（三个Tab：BB.3.3'),

  // ══ J. BB.4.2.a / BB.4.2.a.1 外部职场租赁：与内部租赁的分界口径 ══
  rep('一行一笔集团法人向集团外第三方租入职场', '一行一笔本公司向集团外第三方租入职场'),
  rep('登记集团各法人向集团外第三方租入职场', '登记本公司向集团外第三方租入职场'),
  rep('集团各法人向集团外第三方租入职场', '本公司向集团外第三方租入职场'),
  reDel(/；与 BB\.4\.2\.b 内部职场租赁算法同源[^。]*。/g),
  reRep(/。与 BB\.4\.2\.b 内部职场租赁算法同源（[^）]*），但/g, '。'),
  reDel(/外部租赁(也)?不做场所面积按法人分摊[，；]?/g),
  reDel(/[，；]不引用 BAA\.6\.b 年度租赁面积维护（该表仅供内部职场租赁 BB\.4\.2\.b）/g),
  reDel(/外部租赁不引用 BAA\.6\.b 年度租赁面积维护[，；]?/g),
  del('（该表仅供内部职场租赁 BB.4.2.b）'),
  del('（内部持有场所走 BB.4.2.b 内部职场租赁）'),
  del('，不得填集团内法人（内部租赁走 BB.4.2.b）'),
  del('；与 BB.4.2.b 内部职场租赁共用同一字典、同名同说明'),
  del('（非内部结算、不进内部往来）'),
  del('（外部供应商往来，不进 1221/2241 内部往来）'),
  del('，不进 1221/2241 内部往来'),
  del('；无加成款、无内部往来（1221/2241）、不参与集团合并抵销——加成比例（BAA.11）与 1221/2241 均不在本表出现'),
  del('——与 BB.4.2.b 内部租赁不同源：不取 BAA.6.b（该表仅供内部职场租赁 BB.4.2.b）'),
  del('、无加成款、无内部往来 1221/2241、不参与集团合并抵销'),
  rep('（外部出租方往来，非内部往来）', '（外部出租方往来）'),
  del('；与 BB.4.2.b 承租方内部结算付款（走 CF-08 但合并层互抵）分开列示'),
  del('；差异只在出租方为集团外第三方、不产生内部结算、不参与合并抵销'),
  rep('初始确认口径同 BB.4.2.b.1：', '初始确认口径：'),
  del('（同额初始确认，外部租赁不参与合并抵销）'),
  rep('（租金走 BB.4.2.a 外部职场租赁）', '（租金走 BB.4.2.a 外部职场租赁）'),
  del('（内部租赁在集团合并层与出租方全额抵销，外部租赁为对外交易、不参与合并抵销）'),
  del('；内部租赁在集团合并层与出租方全额抵销，'),
  del('；内部租赁在集团合并层整体消除，'),
  del('、不参与合并抵销、单体与合并同额保留'),

  // ══ K. 资本性支出：代采购转入资产 / 内部职场租赁资产（BB.4.3/BB.4.5/BB.4.X）══
  reDel(/与代采购转入资产折旧（[^）]*）/g),
  reDel(/；折旧只在本处取一次；代采购资产折旧的承担方为接受方 B（[^）]*）/g),
  del('/代采购转入（BJ.C.e 代采购资产查询表到货额，按明细行一行一卡）'),
  del('/内部职场租赁（BB.4.2.b.1 内部职场租赁·财务视角的资本化合同，使用权资产经 BB.4.3 自动带出）'),
  reDel(/，代采购转入=(?:BJ\.C\.e 预算项目|受益主体\(法人\)（代采购资产由提供方 A 代买、资产卡片只在接受方 B 建，故法人取 BJ\.C\.e 的受益主体\(法人\)）)/g),
  reDel(/、代采购转入=BJ\.C\.e 预算项目/g),
  reDel(/、代采购转入=BB\.3\.1\.D 该行「代采购对象\(资产名称\/类别\)」/g),
  del('；代采购转入=到货月份（到货月即转移月，A 侧不持有、零折旧）'),
  del('、代采购转入（由 BB.3.1.D 到货额按月一行一卡转入，仅在接受方 B 建卡，提供方 A 不建折旧卡）'),
  reDel(/；代采购转入卡片取 BB\.3\.1\.D 关联交易视角「一行一卡」的该行资产类别（[^）]*）/g),
  del('；代采购转入来源的卡片只在接受方 B 建（A 侧不建折旧卡）'),
  reDel(/；代采购转入取 BB\.3\.1\.D 的受益主体关联法人（[^）]*）/g),
  rep('资产类别=使用权资产（由内部 BB.4.2.b / 外部 BB.4.2.a 资本化租赁自动生成，原值=租赁负债初始）的卡片', '资产类别=使用权资产（由外部 BB.4.2.a 资本化租赁自动生成，原值=租赁负债初始）的卡片'),
  rep('（由内部 BB.4.2.b / 外部 BB.4.2.a 资本化租赁自动生成）', '（由外部 BB.4.2.a 资本化租赁自动生成）'),
  rep('（内部 BB.4.2.b / 外部 BB.4.2.a 资本化租赁自动生成，原值=租赁负债初始）', '（外部 BB.4.2.a 资本化租赁自动生成，原值=租赁负债初始）'),
  rep('内部 BB.4.2.b / 外部 BB.4.2.a 资本化租赁', '外部 BB.4.2.a 资本化租赁'),
  rep('内部 BB.4.2.b.1 / 外部 BB.4.2.a.1', '外部 BB.4.2.a.1'),
  rep('内部 BB.4.2.b / 外部 BB.4.2.a', '外部 BB.4.2.a'),
  rep('BB.4.2.b.1 / BB.4.2.a.1', 'BB.4.2.a.1'),
  rep('（来源=内部职场租赁 / 外部职场租赁，经 BB.4.3 由 BB.4.2.a.1 自动带出，原值=租赁负债初始）', '（来源=外部职场租赁，经 BB.4.3 由 BB.4.2.a.1 自动带出，原值=租赁负债初始）'),
  rep('另含由资本化职场租赁自动带出的 内部职场租赁 / 外部职场租赁（使用权资产经 BB.4.3 由 BB.4.2.b.1 / BB.4.2.a.1 自动带出，原值=租赁负债初始）', '另含由资本化职场租赁自动带出的 外部职场租赁（使用权资产经 BB.4.3 由 BB.4.2.a.1 自动带出，原值=租赁负债初始）'),
  del('与来源=代采购转入的代采购转入资产折旧'),
  del('、代采购转入资产折旧（来源=代采购转入，经 BB.4.5 汇入增量折旧）'),
  del('，含由 BB.3.1.D 转入、在 BB.4.5 按来源「代采购转入」计提的代采购转入资产折旧'),

  // ══ L. BF.4 增值税：内部交易销项/进项 ══
  del(' ＋ 内部交易销项税额（与内部交易进项同额、集团合并层自然对冲）'),
  del(' ＋ 内部交易进项税额（与内部交易销项同额、集团合并层自然对冲）'),
  between('内部交易销项与进项同额', '（按进项当期全额抵扣的简化测算'),
  del('；对外交易、非内部结算、不进内部往来、集团合并层不抵销'),
  // BF.4.a「应交税费（资负口径）」余额行的法人独立申报口径（单主体原型：只留年初+计提−实缴的滚动公式）
  del('；各法人独立申报，内部交易销项与进项不对抵，集团合并层各法人加总后内部部分自然净 0'),

  // ══ M. BO.PL.b / BO.BS.b / BO.CF.b 取数规则单元格 ══
  between('代采购加成款（BB.3.3.D/BB.3.1.D', '；与日常活动相关的政府补助不取本行'),
  toEnd('；BJ.C.g 内部销售预算'),
  toEnd('；物料/人工由内部供应商提供时'),
  toEnd('+ 销售线物料明细内部供应商'),
  toEnd('；± 销售线物料明细内部供应商'),
  cutBal('± 代采购物料平价转移'),
  cutBal('± 代采购资产转移'),
  cutBal('；代采购内部转移'),
  cutBal('（销售线内部供应商提供的人工/物料行加成款'),
  reDel(/ \+ SUM\(BB\.4\.2\.b\.[^）]*）[^）]*）/g),
  reDel(/ \+ SUM\(BJ\.C\.f 内部借款预算表·借入方当月计提利息\)（[^）]*）/g),
  reDel(/ \+ SUM\(BB\.4\.2\.b\.1\.利息费用\)（[^）]*）/g),
  reDel(/ \+ BJ\.C\.f 内部借款预算表·借入方当月实付利息（[^）]*）/g),
  reDel(/ \+ BB\.4\.2\.b\.1 利息费用付现部分（[^）]*）/g),
  reDel(/BJ\.C\.f 内部借款预算表·借出方当月新增（[^）]*） \+ /g),
  reDel(/BB\.4\.2\.b\.1 内部职场租赁·财务视角·本金偿付按月合计（[^）]*） \+ /g),
  reDel(/，含由 BB\.3\.1\.D 转入[^；]*；/g),
  del(' + BJ.C.f 内部借款借入当月新增（合并层互抵）'),
  del(' + BJ.C.f 内部借款借入方当月还本（合并层互抵）'),
  del('；单体口径计入本行，集团合并层与出租方 CF-03 收款互抵'),
  del('；对外交易、集团合并层不抵销'),
  del('；内部转卖：SUM(BB.4.6.处置收款-含税)（处置方式=内部转卖，卖方收款）'),
  del('内部转卖部分集团合并层与买方 CF-14 互抵（抵销细则已落地）'),
  del('；内部转卖买方付款由 BB.4.3 付款承载（原值=转卖价）、集团合并层与卖方 CF-13.1 互抵'),
  del('；内部转卖：SUM(BJ.C.d.加成收入(万元))（内部转卖加成收益，集团合并层全额抵销）'),
  toEnd('BB.3.1.D 代采购方结算收款·平价部分'),
  toEnd('BB.3.1.D 委托方结算付款·平价部分'),
  toEnd('BB.4.2.b 出租方月度结算收款'),
  toEnd('= SUM(BB.3.3.D.月度到货额'),
  del('；内部结算款含税＝不含税结算额 ×(1+适用税率)（货物 13%、服务 6%、不动产租赁 9%、有形动产租赁 13%，取 AB.15）；集团合并层与对方互抵'),
  between(' + BB.4.2.b 承租方费用化租赁', ' + BB.4.2.a 外部职场租赁·费用化合同租金付现'),
  reDel(/；内部结算款含税＝[^；]*；集团合并层与对方互抵/g),

  // ══ N. BF.3 / BF.3.c 内部借款（XYZ-16）══
  del('，集团合并层仅内部借款 XYZ-16 的往来互抵'),
  del('资本化利息按融资主体（法人公司）归属计入在建工程 1604；\r\n内部借款 XYZ-16 的其他应收款-内部往来 1221.1 与其他应付款-内部往来 2241.1 在集团合并层互抵'),
  del('外部融资的提款/还本/付息按融资主体分别列报、集团合并层不抵销；\r\n内部借款 XYZ-16 的收付在集团合并层与对方互抵'),
  del('内部借款 XYZ-16 按 BJ.C 关联交易与内部抵销口径处理'),
  del('内部借款 XYZ-16 在集团合并层按 BJ.C 口径与对方往来互抵'),
  del('；走 1221.1/2241.1 内部往来、集团合并层互抵（口径见 BJ.C）'),
  reDel(/内部借款 XYZ-16（融资主体为用款\/收现一方）：货币资金 1001 \(\+\) \/ 其他应付款-内部往来 2241\.1 \(\+\)；\r?\n?融出方（资金流出\/放款一方）：货币资金 1001 \(−\) \/ 其他应收款-内部往来 1221\.1 \(\+\)/g),

  // ══ O. BO 三表本体：T3B 多主体架构说明与合并抵销口径 ══
  rep('【是什么】预算利润表，汇总展示集团整体的经营损益。', '【是什么】预算利润表，汇总展示本公司的经营损益。'),
  rep('【是什么】预算资产负债表，反映集团期末财务状况与资产负债结构。', '【是什么】预算资产负债表，反映本公司期末财务状况与资产负债结构。'),
  rep('【是什么】预算现金流量表，反映经营、投资和筹资三大活动的资金收支。', '【是什么】预算现金流量表，反映本公司经营、投资和筹资三大活动的资金收支。'),

  // ══ P. BB.4.6 资产处置：内部转卖（多法人）══
  rep('处置方式分对外出售、报废变卖、内部转卖三类：', '处置方式分对外出售、报废变卖两类：'),
  del('；存量资产内部买卖由卖方通过本表手工填报减少，买方通过 BB.4.3 其他固定资产新增表手工填报增加（原值汇入 BB.4.5 续提折旧），BJ.C.d 资产转卖预算表负责登记双方定价与集团合并抵销'),
  rep('处置方式三类（枚举）：对外出售、报废变卖、内部转卖（存量资产内部买卖由卖方通过本表手工填报减少；买方通过 BB.4.3 手工填报增加；双方在 BJ.C.d 登记定价并执行合并抵销）', '处置方式两类（枚举）：对外出售、报废变卖'),
  rep('处置方式三类（枚举）：对外出售、报废变卖、内部转卖。', '处置方式两类（枚举）：对外出售、报废变卖。'),
  del('（对外出售/报废变卖/内部转卖，处置方式区分：内部转卖由卖方在 BB.4.6 手工填报减少，账面净值与 BJ.C.d 登记勾稽）'),
  del('；内部转卖在集团合并层按账面净值口径调回原始原值'),
  del('；存量资产内部买卖由卖方通过本表手工填报减少（资产原值、累计折旧与净值），买方通过 BB.4.3 其他固定资产新增表手工填报增加（原值自动汇入 BB.4.5 续提折旧）；双方在 BJ.C.d 登记定价并由系统在集团合并层全额抵销加成与现金流'),

  // ══ Q. BB.5.2 经营费用：内部场地租赁 ══
  del('，内部场地租赁由 BB.4.2.b 带出'),
  del('；内部场地租赁由 BB.4.2.b 内部职场租赁带出'),
  del('与内部场地租赁（由 BB.4.2.b 带出）'),
  del('、内部场地租赁由 BB.4.2.b 带出'),
  rep('不与两类租赁重复取数', '不与外部职场租赁重复取数'),

  // ══ S. 复核补齐（第二轮残留）══
  // BB.3.X 进销存：代采购物料内部转入/转出与内部加成台账
  cutBal('+ 物料类存货另含代采购物料内部转入'),
  cutBal('；物料类存货转出另含代采购物料内部转出'),
  del('；加成部分单独在本表 internalTransferIn 列跟踪，未对外销售/领用前挂账为合并层未实现利润，由 BO.ELIM 第④类抵销'),
  del('BB.3.3.D代采购物料内部转入（含加成）/ '),
  del('BB.3.3.D代采购物料内部转出 / '),
  del('（含已实现加成）'),
  del('——与受益主体法人侧内部转入（按含加成完整价）配对，单体层面加成随销售成本/领料实现，合并层由 BO.ELIM 抵销'),
  del('，跨法人代工/调拨走 BJ.C 关联交易与内部抵销'),
  between('，跨法人代工/调拨属内部交易：', '；产成品转出='),

  // BB.4.5 增量资产折旧：代采购转入卡与内部职场租赁来源
  cutBal('；代采购转入资产在本表按来源「代采购转入」一行一卡建卡'),
  reDel(/[，；]代采购转入=(?:BJ\.C\.e 预算项目|受益主体\(法人\)（[^）]*）)/g),
  del('BJ.C.e/'),
  del('BB.4.2.b.1/'),
  del('/BB.3.1.D到货额'),
  reDel(/；代采购转入卡片取数：[^。]*。/g),
  rep('BB.4.2.b.1/BB.4.2.a.1', 'BB.4.2.a.1'),

  // BAA.6 办公场所租赁维护
  reDel(/；内部持有=集团内物业持有法人出租给内部法人（[^）]*）/g),
  reDel(/，仅供 BB\.4\.2\.b 内部职场租赁取面积与单价（[^）]*）/g),

  // BB.4.2.a / BB.4.2.a.1 外部职场租赁：与内部租赁/合并抵销的分界
  del('（不取 BAA.6.b——该表仅供内部职场租赁 BB.4.2.b）'),
  del('，不取 BAA.6.b——该表仅供内部职场租赁）'),
  del('——该表仅供内部职场租赁）'),
  del('（BAA.6.b 仅供内部租赁）'),
  del('BAA.6.b 仅供 BB.4.2.b 内部职场租赁按「年度×场所×公司(=承租方)」带出面积与单价；'),
  del('——与 BB.4.2.b 内部租赁不同源：不取 BAA.6.b'),
  del('；外部租赁为对外交易、不参与集团合并抵销'),
  del('，外部租赁不参与合并抵销'),
  del('；差异只在出租方为集团外第三方、不产生内部结算'),
  del('：不产生内部结算、不参与集团合并抵销（1621/2602 单体与合并同额保留）'),
  del('；外部租赁不参与合并抵销、单体与合并口径同额保留'),
  del('；对外付款不参与合并抵销'),
  del('；外部租赁不参与合并抵销'),
  del('，与内部 BB.4.2.b.1 合计只取一次'),
  del('；外部租赁利息不与任何内部租金收入抵销（内部租赁那条由 BB.4.2.b.1 与 6001.2 互抵，两者分开）'),
  del('；外部付款集团合并层不抵销'),
  del('；外部租赁为对外交易、不参与集团合并抵销，单体与合并同额保留'),
  del('（内部租赁在集团合并层与出租方全额抵销，外部租赁为对外交易）'),
  del('，差异只在「外部出租方、无内部往来、不参与集团合并抵销」'),
  rep('与 BB.4.2.b.1 体例同源，', ''),
  rep('口径与 BB.4.2.b.1 完全同源：', '口径：'),
  rep('（对外付款，不进内部结算）', '（对外付款）'),

  // BB.4.6 处置方式枚举（去掉内部转卖）
  rep('本表枚举：对外出售 / 报废变卖 / 内部转卖', '本表枚举：对外出售 / 报废变卖'),

  // BF.3 内部借款（XYZ-16）
  del('（内部借款 XYZ-16 不在本表编制，见 BF.3.f）'),
  del('/XYZ-16 内部借款'),
  del('；XYZ-01～XYZ-15=外部/银行类、XYZ-16～XYZ-20=集团内部类'),

  // BF.4 内部交易增值税
  del('、内部交易销项税额（代采购转移/资产转卖/内部职场租赁，货物13%/不动产租赁9%/服务6%，取 AB.15）'),
  del('、内部交易进项税额（与内部交易销项同额对应）'),
  toEnd('；内部交易销项/进项行基数取内部结算额'),
  del('；内部交易按业务性质取率（税率取 AB.15）：货物 13%（代采购转移、资产转卖）、现代服务 6%（代销/代购服务费＝加成款）、不动产租赁 9%（内部职场租赁）'),
  del('；内部借款（BJ.C.f）利息属贷款服务——借入方取得的贷款服务进项税额不得抵扣，如单独列示计入「减：不可抵扣进项税额及进项税额转出」行；本方案默认内部借款按应税处理，集团如有统借统还等免税安排，另行调整'),
  del('；内部交易（关联交易）为应税交易：卖方/提供方计销项、买方/接受方计进项，同额同率（货物 13%、服务 6%、不动产租赁 9%、有形动产租赁 13%，取 AB.15）'),
  del('；增值税为价外税，不影响损益、不影响存货/资产成本（1405/1601/1701 保持不含税），只影响含税现金流与内部往来（1221/2241）含税额'),
  del('；集团合并层销项与进项自然对冲（净 0）（按进项当期全额抵扣的简化测算，不考虑时间差与留抵）、内部结算现金流互抵（净 0）'),

  // BO 三表：合并口径说明行与取数规则
  reDel(/【系统怎么处理】[^\n]*(内部抵销|内部交易|内部往来)[^\n]*[\r\n]*/g),
  reDel(/【合并时】[^\n]*(内部|抵销|抵消|跨法人|关联)[^\n]*[\r\n]*/g),
  del('、不含任何内部加成'),
  toEnd('+ SUM(BB.1.3.f'),
  del('；对外交易、非内部结算、不进内部往来'),
  reDel(/ \+ SUM\(BB\.4\.2\.b\.费用化合同内部租金 \+ BB\.4\.2\.b\.月度加成款\(各月求和\)\)（[^）]*）/g),
  del('由上项「± 代采购资产转移」取数、不改变集团合并层固定资产净额；'),
  del('BB.4.2.b.1 内部 + '),
  toEnd('BJ.C.f 内部借款预算表·借出方当月还本'),
  // ══ T. 复核补齐（第三轮残留）══
  del('，不参与集团合并抵销'),
  reRep(/与 BB\.4\.2\.b\.1 体例同源[，；]/g, ''),
  cutBal('；代采购转入=BB.3.1.D 明细行'),
  toEnd('存量资产内部买卖由卖方通过本表手工填报减少'),
  reDel(/（销售线内部供应商提供的人工\/物料行加成款[^）]*）/g),
  reDel(/由上项「± 代采购资产转移」取数、不改变集团合并层固定资产净额[；]?/g),
  rep('不在本行重复外部租赁（BB.4.2.a.1）是对外交易、单体与合并同额保留', '不在本行重复'),
  rep('期末=年初+发生+调整外部租赁（BB.4.2.a.1）是对外交易、单体与合并同额保留', '期末=年初+发生+调整'),

  // ══ U. ⑥ 节首共用口径（common）里的多主体口径句子 ══
  del('，租金、使用权资产与租赁负债均不参与集团合并抵销'),
  del('外部租赁为对外交易、不参与集团合并抵销。'),
  del('外部租赁为对外交易、不参与集团合并抵销'),
  del('均不参与集团合并抵销'),
];

/** 整条剔除（字段行 / 规则点 / 适用情形 / 数据来源行 / 输出行 / 事件行） */
export const T3A_DROP_ITEM_RES: RegExp[] = [
  /^内部供应商$/, // BB.1.3 物料/人工明细「内部供应商」列字段行
  /^代采购\/加成（净额法）$/, // BB.3.1/BB.3.3 ⑥ 代采购加成事件行（t3a 单主体无代采购、无加成款）
  /^其中:内部加成/, // BB.3.X 内部加成列字段行
  /^物料明细与人工明细均设「内部供应商」列/, // BB.1.3 规则点（整条多主体）
  /^【两岗分工/, // BB.3.1/BB.3.3 规则点与适用情形（两岗接力代采购）
  /^【关联交易视角 BB\.3\.[13]\.D】/, // BB.3.1/BB.3.3 关联交易视角规则点
  /^BB\.3\.[13]\.D 关联交易视角/, // BB.3.1/BB.3.3 关联交易视角适用情形
  /^集团内法人之间的场地租赁/, // BB.4.2.a 不适用于（内部租赁）
  /^内部租金、加成款的具体分摊与测算/, // BAA.6 不适用于（内部租赁）
  /^内部租赁的资本化测算/, // BB.4.2.a.1 不适用于（内部租赁）
  /^关联方之间的内部交易/, // BF.1 不适用于
  /^【合并时】/, // BO.PL/BO.BS/BO.CF 合并抵销说明规则点
  /^【T3B 多主体/, // BO 三表 T3B 多主体架构规则点
  /^【系统怎么处理】[^【]*内部(抵销|往来|交易)/, // BO 三表 合并口径说明规则点
  /^【口径边界】与 BB\.4\.2\.b/, // BB.4.2.a 与内部职场租赁的分界（整条多主体）
  /^【口径边界】本表为外部租入：/, // BB.4.2.a.1 与内部租赁的分界（整条多主体）
  /^集团合并层$/, // BB.4.2.a 输出影响（下游）= 集团合并层行
];

/** 数据来源行整条剔除：来源表名或取数字段本身即多主体口径（如 AA.10 供应商主数据的「内部供应商」） */
export function isDroppedT3aDataSource(name: string, fields: string): boolean {
  return T3A_MULTI_ENTITY_PATTERN.test(name ?? '') || T3A_MULTI_ENTITY_PATTERN.test(fields ?? '');
}

/** 单篇文字源裁剪：整条剔除 + 逐段文本裁剪（仅 T3A scope 调用） */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function clipFormText(t: any): any {
  const out = { ...t };
  out.fields = (t.fields ?? [])
    .filter((f: any) => !isDroppedT3aField(f.display || f.name, f.name))
    .map((f: any) => ({
      ...f,
      source: clipT3aText(f.source ?? ''),
      remark: clipT3aText(f.remark ?? ''),
    }));
  out.applies = (t.applies ?? []).filter((p: string) => !isDroppedT3aItem(p)).map(clipT3aText).filter(Boolean);
  out.notApplies = (t.notApplies ?? []).filter((p: string) => !isDroppedT3aItem(p)).map(clipT3aText).filter(Boolean);
  if (t.relation) {
    out.relation = {
      ...t.relation,
      summary: clipT3aText(t.relation.summary ?? ''),
      dataSources: t.relation.dataSources
        .filter((s: any) => !isDroppedT3aDataSource(s.name, s.fields) && !isDroppedT3aItem(s.name))
        .map((s: any) => ({ ...s, fields: clipT3aText(s.fields ?? ''), relation: clipT3aText(s.relation ?? '') })),
      outputs: t.relation.outputs
        .filter((o: any) => !isDroppedT3aItem(o.target) && !T3A_MULTI_ENTITY_PATTERN.test(o.target ?? ''))
        .map((o: any) => ({ ...o, path: clipT3aText(o.path ?? '') })),
    };
  }
  out.events = (t.events ?? [])
    .filter((e: any) => !isDroppedT3aItem(e.event))
    .map((e: any) => ({
      ...e,
      pl: clipT3aText(e.pl ?? ''),
      bs: clipT3aText(e.bs ?? ''),
      cf: clipT3aText(e.cf ?? ''),
      source: clipT3aText(e.source ?? ''),
      entry: clipT3aText(e.entry ?? ''),
      note: clipT3aText(e.note ?? ''),
    }));
  // ⑥ 节首共用口径：与其余文字同走裁剪（多主体口径的句子在此被逐段删除）
  out.common = typeof t.common === 'string' ? clipT3aText(t.common) : '';
  return out;
}


/** 文本是否整条属于多法人关联交易内容（按裁剪前的原文判定） */
export function isDroppedT3aItem(s: string): boolean {
  const t = (s ?? '').trim();
  return T3A_DROP_ITEM_RES.some((re) => re.test(t));
}

/** 字段行整条剔除：登记名/渲染名命中整条剔除规则 */
export function isDroppedT3aField(name: string, display: string): boolean {
  const n = (name ?? '').trim();
  const d = (display ?? '').trim();
  return T3A_DROP_ITEM_RES.some((re) => re.test(n) || re.test(d));
}

/** 单段文本裁剪 */
export function clipT3aText(input: string): string {
  if (!input) return input;
  let s = dropMultiEntityLines(input);
  for (const op of T3A_TEXT_OPS) s = op.run(s);
  // 清理删除后遗留的空悬标点/空白（空格收敛只在单行文本上做，避免破坏表样单元格内的多行缩进）
  s = s
    .replace(/[，；、]{2,}/g, (m) => m[0])
    .replace(/^[，；、]+/, '')
    .replace(/，。/g, '。')
    .replace(/；）/g, '）')
    .replace(/：）/g, '）')
    .replace(/[，；、]$/, (m) => (m === '；' || m === '，' || m === '、' ? '' : m))
    .replace(/（\s*）/g, '')
    .replace(/ ([，；。、）])/g, '$1')
    .trim();
  if (!s.includes('\n') && !s.includes('\r')) s = s.replace(/[ \t]{2,}/g, ' ');
  return s;
}

/** 单段文本是否还有多主体残留（裁剪后自检） */
export function hasMultiEntityResidue(s: string): boolean {
  return T3A_MULTI_ENTITY_PATTERN.test(s ?? '');
}

// ── 表样分片裁剪（整列 / 整行） ───────────────────────────────────────────────

export interface ClipGridCell {
  text: string;
  isHeader?: boolean;
  rowSpan?: number;
  colSpan?: number;
  bg?: string;
  [k: string]: unknown;
}
export interface ClipGrid {
  name: string;
  rowCount: number;
  colCount: number;
  rows: ClipGridCell[][];
  [k: string]: unknown;
}

/** 整列剔除：按表头文本命中（列头为 rowspan 单元格，逐行删除同列单元格） */
export const T3A_GRID_COLUMN_DROPS: { code: string; grid?: string; header: RegExp }[] = [
  { code: 'BB.1.3', header: /^内部供应商$/ }, // 物料明细(.d/.f) / 人工明细(.g/.i) 的「内部供应商」列
  { code: 'BB.3.X', grid: 'BB.3.X 进销存预算', header: /^其中:内部加成/ }, // 内部加成 4 列
];

/** 整行剔除：按指定列单元格文本命中（表样示例数据行） */
export const T3A_GRID_ROW_DROPS: { code: string; grid?: string; col: number; cell: RegExp }[] = [
  { code: 'BF.4', grid: 'BF.4.b 增值税计提预算表', col: 0, cell: /^内部交易(销项税额|进项税额)/ },
  { code: 'BB.4.5', col: 3, cell: /^(代采购转入|内部职场租赁)$/ },
];

/** 占用网格：把分片行内单元格按 rowspan/colspan 展开到 [行][列] */
function buildOccupancy(grid: ClipGrid): (ClipGridCell | undefined)[][] {
  const occ: (ClipGridCell | undefined)[][] = Array.from({ length: grid.rows.length }, () =>
    new Array<ClipGridCell | undefined>(grid.colCount).fill(undefined),
  );
  grid.rows.forEach((row, r) => {
    let c = 0;
    row.forEach((cell) => {
      while (occ[r][c] !== undefined) c++;
      const rs = cell.rowSpan ?? 1;
      const cs = cell.colSpan ?? 1;
      for (let dr = 0; dr < rs; dr++) for (let dc = 0; dc < cs; dc++) occ[r + dr][c + dc] = cell;
      c += cs;
    });
  });
  return occ;
}

/** 逐列剔除：删除起始格落在该列的全部单元格，并同步 colCount */
function dropGridColumns(grid: ClipGrid, cols: number[]): ClipGrid {
  const sorted = [...new Set(cols)].sort((a, b) => b - a);
  for (const k of sorted) {
    const occ = buildOccupancy(grid);
    grid.rows.forEach((row, r) => {
      const owner = occ[r][k];
      if (!owner) return;
      // 只在「该单元格起始列 == k」时删除（rowspan 派生格由其起始行统一删除）
      let startCol = -1;
      for (let c = 0; c < grid.colCount; c++) if (occ[r][c] === owner) startCol = Math.min(startCol < 0 ? c : startCol, c);
      const idx = row.indexOf(owner);
      if (idx >= 0 && startCol === k && (owner.colSpan ?? 1) === 1) row.splice(idx, 1);
    });
    grid.colCount -= 1;
  }
  return grid;
}

/** 表样裁剪入口：先按列命中整列剔除，再按行命中整行剔除，最后逐格文本裁剪 */
export function clipT3aGrid(code: string, grid: ClipGrid): ClipGrid {
  const colRules = T3A_GRID_COLUMN_DROPS.filter((r) => r.code === code && (!r.grid || r.grid === grid.name));
  if (colRules.length > 0) {
    const occ = buildOccupancy(grid);
    const cols = new Set<number>();
    // 表头行首个占用该列的单元格文本命中即整列剔除
    for (let k = 0; k < grid.colCount; k++) {
      const h = occ[0][k];
      if (h && colRules.some((r) => r.header.test((h.text ?? '').trim()))) cols.add(k);
    }
    if (cols.size > 0) dropGridColumns(grid, [...cols]);
  }
  const rowRules = T3A_GRID_ROW_DROPS.filter((r) => r.code === code && (!r.grid || r.grid === grid.name));
  if (rowRules.length > 0) {
    const occ = buildOccupancy(grid);
    grid.rows = grid.rows.filter((row, r) =>
      !rowRules.some((rule) => {
        const cell = occ[r][rule.col];
        return !!cell && rule.cell.test((cell.text ?? '').trim());
      }),
    );
    grid.rowCount = grid.rows.length;
  }
  grid.rows.forEach((row) => row.forEach((cell) => (cell.text = clipT3aText(cell.text ?? ''))));
  return grid;
}

/** 残留逐行扫描：返回命中行描述（T3A 生成后兜底断言用） */
export function collectMultiEntityResidue(doc: string): string[] {
  const hits: string[] = [];
  doc.split('\n').forEach((line, i) => {
    const m = line.match(new RegExp(T3A_MULTI_ENTITY_PATTERN.source, 'g'));
    if (m) hits.push(`L${i + 1} [${[...new Set(m)].join(',')}] ${line.trim().slice(0, 90)}`);
  });
  return hits;
}

/** 残留兜底断言：T3A 每篇生成后调用；命中即抛错（不得带残留交卷） */
export function assertNoMultiEntityResidue(code: string, doc: string): void {
  const hits = collectMultiEntityResidue(doc);
  if (hits.length > 0) {
    throw new Error(`[${code}] T3A 仍有多法人关联交易内容残留 ${hits.length} 处：\n  ${hits.slice(0, 12).join('\n  ')}`);
  }
}
