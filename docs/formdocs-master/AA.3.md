# AA.3 统一科目体系

<style>
table{border-collapse:collapse;font-size:12px;font-family:"Microsoft YaHei",Arial,sans-serif}
table th{background:#002f6c;color:#fff;font-weight:600;text-align:center;border:1px solid #cbd5e1;padding:6px 10px;white-space:nowrap}
table td{border:1px solid #cbd5e1;padding:6px 10px;vertical-align:top}
.t3a-html-sheet th,.t3a-html-sheet td{white-space:nowrap}
.t3a-html-sheet th.t3a-th--time{background:#001e4a}
.t3a-html-sheet td.t3a-num{text-align:right}
.t3a-html-sheet tbody tr:nth-child(2n){background:#f8fafc}
.t3a-sheet-scroll{max-width:100%;overflow-x:auto;transform:rotateX(180deg)}
.t3a-sheet-scroll > table.t3a-html-sheet{transform:rotateX(180deg)}
.t3a-html-sheet{display:block;width:max-content}
.t3a-sheet-scroll::-webkit-scrollbar{height:10px}
.t3a-sheet-scroll::-webkit-scrollbar-track{background:#eef2f7}
.t3a-sheet-scroll::-webkit-scrollbar-thumb{background:#94a3b8;border-radius:5px}
.t3a-html-sheet::-webkit-scrollbar{height:10px}
.t3a-html-sheet::-webkit-scrollbar-track{background:#eef2f7}
.t3a-html-sheet::-webkit-scrollbar-thumb{background:#94a3b8;border-radius:5px}
</style>

## ① 预算表样

### AA.3.a 统一科目总表(PL/BS/CF)

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">科目编码</th>
      <th class="t3a-th">科目名称</th>
      <th class="t3a-th">科目全称</th>
      <th class="t3a-th">科目家族</th>
      <th class="t3a-th">分类归属</th>
      <th class="t3a-th">层级</th>
      <th class="t3a-th">上级编码</th>
      <th class="t3a-th">借贷/流向</th>
      <th class="t3a-th">是否直接列报</th>
      <th class="t3a-th">关联编制源表</th>
    </tr>
    <tr>
      <td class="t3a-num">6001</td>
      <td>营业收入合计</td>
      <td>利润表-营业收入合计</td>
      <td>PL 体系</td>
      <td>利润表-营业收入</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td class="t3a-num">6401</td>
      <td>营业成本合计</td>
      <td>利润表-营业成本合计</td>
      <td>PL 体系</td>
      <td>利润表-营业成本</td>
      <td>1 级</td>
      <td>-</td>
      <td>借</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td class="t3a-num">6403</td>
      <td>税金及附加</td>
      <td>利润表-税金及附加</td>
      <td>PL 体系</td>
      <td>利润表-税金与附加</td>
      <td>1 级</td>
      <td>-</td>
      <td>借</td>
      <td>是</td>
      <td>BF.4.税费及附加合计(利润表口径)</td>
    </tr>
    <tr>
      <td class="t3a-num">6601</td>
      <td>销售费用</td>
      <td>利润表-销售费用</td>
      <td>PL 体系</td>
      <td>利润表-期间费用</td>
      <td>1 级</td>
      <td>-</td>
      <td>借</td>
      <td>是</td>
      <td>BB.5.2.法人公司金额 / BA.5.月度金额 / BAA.8.法人公司占比 / BB.4.X.A.销售费用折旧小计 / BB.5.1.财务视角销售费用（人工） / BAP.2.月度消耗金额（领料用途=销售类） / BB.4.2.a 外部职场租赁.费用化合同月租金（用途=销售，各月求和） / BB.4.5.本年新增折旧计提（经 BB.4.X.A 归集）</td>
    </tr>
    <tr>
      <td class="t3a-num">6602</td>
      <td>管理费用</td>
      <td>利润表-管理费用</td>
      <td>PL 体系</td>
      <td>利润表-期间费用</td>
      <td>1 级</td>
      <td>-</td>
      <td>借</td>
      <td>是</td>
      <td>BB.5.2.法人公司金额 / BA.5.月度金额 / BAA.8.法人公司占比 / BB.4.X.A.管理费用折旧小计 / BB.4.2.b 内部职场租赁.费用化合同内部租金+月度加成款（承租方内部租赁费用） / BB.4.2.a 外部职场租赁.费用化合同月租金（用途=管理） / BB.5.1.财务视角管理费用（人工） / BAP.2.月度消耗金额（领料用途=管理类及其他） / BB.4.5.本年新增折旧计提（经 BB.4.X.A 归集）</td>
    </tr>
    <tr>
      <td class="t3a-num">6602.1</td>
      <td>管理费用-内部往来</td>
      <td>利润表-管理费用-内部往来</td>
      <td>PL 体系</td>
      <td>利润表-期间费用</td>
      <td>2 级</td>
      <td class="t3a-num">6602</td>
      <td>借</td>
      <td>否</td>
      <td>BB.4.2.b 费用化内部租赁·承租方加成支出（合并层抵销）。注：代采购物料/资产加成（BB.3.3.D/BB.3.1.D）已含在 B 存货 1405 / 固定资产 1601 入账原值中、不经本行；销售线人工（BB.1.3.i）/物料（BB.1.3.f）加成款按真实服务/购销模型并入签约主体 6401.1 服务成本，亦不经本行；合并按第④/⑤类处理</td>
    </tr>
    <tr>
      <td class="t3a-num">6603</td>
      <td>研发费用</td>
      <td>利润表-研发费用</td>
      <td>PL 体系</td>
      <td>利润表-期间费用</td>
      <td>1 级</td>
      <td>-</td>
      <td>借</td>
      <td>是</td>
      <td>BB.5.2.法人公司金额 / BA.5.月度金额 / BAA.8.法人公司占比 / BB.4.X.A.研发费用折旧小计 / BB.5.1.财务视角研发费用（人工） / BAP.2.月度消耗金额（领料用途=研发类） / BB.4.2.a 外部职场租赁.费用化合同月租金（用途=研发，各月求和） / BB.4.5.本年新增折旧计提（经 BB.4.X.A 归集）</td>
    </tr>
    <tr>
      <td class="t3a-num">6604</td>
      <td>财务费用</td>
      <td>利润表-财务费用</td>
      <td>PL 体系</td>
      <td>利润表-期间费用</td>
      <td>1 级</td>
      <td>-</td>
      <td>借</td>
      <td>是</td>
      <td>BF.3.d.费用化融资费用 / BB.4.2.b.1 内部职场租赁·财务视角.利息费用（内部租赁） / BB.4.2.a.1 外部职场租赁·财务视角.月度利息（外部租赁、不参与合并抵销）</td>
    </tr>
    <tr>
      <td class="t3a-num">6001.1</td>
      <td>其中：主营业务收入</td>
      <td>利润表-其中：主营业务收入</td>
      <td>PL 体系</td>
      <td>利润表-营业收入</td>
      <td>2 级</td>
      <td class="t3a-num">6001</td>
      <td>贷</td>
      <td>是</td>
      <td>BB.1.2.预计销售收入(不含税) / BB.1.3.确认收入</td>
    </tr>
    <tr>
      <td class="t3a-num">6001.2</td>
      <td>其他业务收入</td>
      <td>利润表-其他业务收入</td>
      <td>PL 体系</td>
      <td>利润表-营业收入</td>
      <td>2 级</td>
      <td class="t3a-num">6001</td>
      <td>贷</td>
      <td>是</td>
      <td>BB.3.3.D·BB.3.1.D.月度加成款（各月求和，提供方内部往来） / BB.1.3.f 物料明细_财务查询.内部供应商出料（出库成本+加成款，各月求和，提供方内部往来·完整内部销售价） / BB.1.3.i 人工明细_财务查询.完整服务价=人工成本+加成款（各月求和，提供方内部往来） / BB.4.2.b 内部职场租赁.月度内部租金+月度加成款（各月求和，出租方内部往来） / BJ.C.f 内部借款预算表·借出方当月计提利息（收息，内部往来收入；集团合并层与借入方 6604.1 按本方法人+对手方法人配对互抵）</td>
    </tr>
    <tr>
      <td>6001.2.1</td>
      <td>其他业务收入-内部往来</td>
      <td>利润表-其他业务收入-内部往来</td>
      <td>PL 体系</td>
      <td>利润表-营业收入</td>
      <td>3 级</td>
      <td class="t3a-num">6001.2</td>
      <td>贷</td>
      <td>否</td>
      <td>BB.3.3.D/BB.3.1.D 代采购·加成款（提供方加成收入，合并层抵销） / BB.1.3.f 物料明细_财务查询·内部供应商出料（销售线物料，提供方完整内部销售价＝出库成本+加成款，合并层与签约主体 6401.1 抵销） / BB.1.3.i 人工明细_财务查询·完整服务价（销售线人工，提供方内部往来收入=人工成本+加成款，合并层与签约主体 6401.1 抵销）</td>
    </tr>
    <tr>
      <td class="t3a-num">6401.1</td>
      <td>其中：主营业务成本</td>
      <td>利润表-其中：主营业务成本</td>
      <td>PL 体系</td>
      <td>利润表-营业成本</td>
      <td>2 级</td>
      <td class="t3a-num">6401</td>
      <td>借</td>
      <td>是</td>
      <td>BB.1.2.预计销售成本 / BB.1.3.人工成本 / BB.1.3.物料成本 / BB.1.3.f 物料明细_财务查询·内部供应商出料（签约主体按采购价＝出库成本+加成款计入本行、加成进成本；采购入库 1405 后随服务消耗结转本行） / BB.1.3.i 人工明细_财务查询·内部供应商提供行（签约主体按采购价＝人工成本+加成款进本行服务成本-人工、加成进成本）；对外确认营业成本按实际生产产品成本结转；销售线物料/人工明细的内部加成按真实购销/服务模型进入签约主体成本 6401.1（采购价＝内部成本+加成款、加成进成本），集团合并层与提供方 6001.2 全额抵销、合并层营业成本最终只保留内部供应商真实成本</td>
    </tr>
    <tr>
      <td class="t3a-num">6401.2</td>
      <td>其他业务成本</td>
      <td>利润表-其他业务成本</td>
      <td>PL 体系</td>
      <td>利润表-营业成本</td>
      <td>2 级</td>
      <td class="t3a-num">6401</td>
      <td>借</td>
      <td>是</td>
      <td>手工 / BB.1.3.f 物料明细_财务查询·内部供应商出料·出库成本（提供方（内部供应商归属法人）结转其他业务成本，各月求和；集团合并层抵销后合并层只保留该真实出库成本）</td>
    </tr>
    <tr>
      <td class="t3a-num">6604.1</td>
      <td>其中：利息费用</td>
      <td>利润表-其中：利息费用</td>
      <td>PL 体系</td>
      <td>利润表-期间费用</td>
      <td>2 级</td>
      <td class="t3a-num">6604</td>
      <td>借</td>
      <td>是</td>
      <td>BF.3.d.费用化融资费用 / BB.4.2.b.1 内部职场租赁·财务视角.利息费用（内部租赁） / BB.4.2.a.1 外部职场租赁·财务视角.月度利息（外部租赁、不参与合并抵销） / BJ.C.f 内部借款预算表·借入方当月计提利息（内部借款利息费用；集团合并层与借出方 6001.2 配对互抵）</td>
    </tr>
    <tr>
      <td class="t3a-num">6604.2</td>
      <td>利息收入</td>
      <td>利润表-利息收入</td>
      <td>PL 体系</td>
      <td>利润表-期间费用</td>
      <td>2 级</td>
      <td class="t3a-num">6604</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">6101</td>
      <td>公允价值变动收益</td>
      <td>利润表-公允价值变动收益</td>
      <td>PL 体系</td>
      <td>利润表-其他收益与投资</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">6701</td>
      <td>资产减值损失</td>
      <td>利润表-资产减值损失</td>
      <td>PL 体系</td>
      <td>利润表-其他收益与投资</td>
      <td>1 级</td>
      <td>-</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">6702</td>
      <td>信用减值损失</td>
      <td>利润表-信用减值损失</td>
      <td>PL 体系</td>
      <td>利润表-其他收益与投资</td>
      <td>1 级</td>
      <td>-</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">6301.1</td>
      <td>其中：政府补助</td>
      <td>利润表-其中：政府补助</td>
      <td>PL 体系</td>
      <td>利润表-其他收益与投资</td>
      <td>2 级</td>
      <td class="t3a-num">6301</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">6904</td>
      <td>五、其他综合收益的税后净额</td>
      <td>利润表-五、其他综合收益的税后净额</td>
      <td>PL 体系</td>
      <td>利润表-利润汇总与所得税</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">6905</td>
      <td>六、综合收益总额</td>
      <td>利润表-六、综合收益总额</td>
      <td>PL 体系</td>
      <td>利润表-利润汇总与所得税</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>公式计算</td>
    </tr>
    <tr>
      <td class="t3a-num">6906</td>
      <td>每股收益：</td>
      <td>利润表-每股收益</td>
      <td>PL 体系</td>
      <td>利润表-利润汇总与所得税</td>
      <td>1 级</td>
      <td>-</td>
      <td>净额</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">6906.1</td>
      <td>七、每股收益：基本每股收益</td>
      <td>利润表-七、每股收益：基本每股收益</td>
      <td>PL 体系</td>
      <td>利润表-利润汇总与所得税</td>
      <td>2 级</td>
      <td class="t3a-num">6906</td>
      <td>净额</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">6906.2</td>
      <td>稀释每股收益</td>
      <td>利润表-稀释每股收益</td>
      <td>PL 体系</td>
      <td>利润表-利润汇总与所得税</td>
      <td>2 级</td>
      <td class="t3a-num">6906</td>
      <td>净额</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">6199</td>
      <td>营业利润</td>
      <td>利润表-营业利润</td>
      <td>PL 体系</td>
      <td>利润表-利润汇总与所得税</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>公式计算</td>
    </tr>
    <tr>
      <td class="t3a-num">6115</td>
      <td>资产处置收益</td>
      <td>利润表-资产处置收益</td>
      <td>PL 体系</td>
      <td>利润表-其他收益与投资</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>BB.4.6.处置损益 / BJ.C.d.加成收入(万元)（内部转卖加成收益，集团合并层抵销）</td>
    </tr>
    <tr>
      <td class="t3a-num">6117</td>
      <td>其他收益</td>
      <td>利润表-其他收益</td>
      <td>PL 体系</td>
      <td>利润表-其他收益与投资</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">6111</td>
      <td>投资收益</td>
      <td>利润表-投资收益</td>
      <td>PL 体系</td>
      <td>利润表-其他收益与投资</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>BF.1.分红/利息收现 / BF.3.a.投资收益 / BF.3.b.投资收益</td>
    </tr>
    <tr>
      <td class="t3a-num">6301</td>
      <td>营业外收入</td>
      <td>利润表-营业外收入</td>
      <td>PL 体系</td>
      <td>利润表-其他收益与投资</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">6302</td>
      <td>营业外支出</td>
      <td>利润表-营业外支出</td>
      <td>PL 体系</td>
      <td>利润表-其他收益与投资</td>
      <td>1 级</td>
      <td>-</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">6901</td>
      <td>利润总额</td>
      <td>利润表-利润总额</td>
      <td>PL 体系</td>
      <td>利润表-利润汇总与所得税</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>公式计算</td>
    </tr>
    <tr>
      <td class="t3a-num">6801</td>
      <td>所得税费用</td>
      <td>利润表-所得税费用</td>
      <td>PL 体系</td>
      <td>利润表-利润汇总与所得税</td>
      <td>1 级</td>
      <td>-</td>
      <td>借</td>
      <td>是</td>
      <td>BF.4.企业所得税</td>
    </tr>
    <tr>
      <td class="t3a-num">6903</td>
      <td>净利润</td>
      <td>利润表-净利润</td>
      <td>PL 体系</td>
      <td>利润表-利润汇总与所得税</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>公式计算</td>
    </tr>
    <tr>
      <td class="t3a-num">690301</td>
      <td>归属于母公司所有者的净利润</td>
      <td>利润表-归属于母公司所有者的净利润</td>
      <td>PL 体系</td>
      <td>利润表-利润汇总与所得税</td>
      <td>2 级</td>
      <td class="t3a-num">6903</td>
      <td>贷</td>
      <td>是</td>
      <td>AA.2.持股比例</td>
    </tr>
    <tr>
      <td class="t3a-num">690302</td>
      <td>少数股东损益</td>
      <td>利润表-少数股东损益</td>
      <td>PL 体系</td>
      <td>利润表-利润汇总与所得税</td>
      <td>2 级</td>
      <td class="t3a-num">6903</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1001</td>
      <td>货币资金</td>
      <td>资产负债表-货币资金</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1999</td>
      <td>借</td>
      <td>是</td>
      <td>BO.CF.本年累计</td>
    </tr>
    <tr>
      <td class="t3a-num">1101</td>
      <td>交易性金融资产</td>
      <td>资产负债表-交易性金融资产</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1999</td>
      <td>借</td>
      <td>是</td>
      <td>BF.3.a 金融工具投融资-银行.新增投资额、减少投资额 / BF.3.b 金融工具投资预算-非银.新增投资额、减少投资额</td>
    </tr>
    <tr>
      <td class="t3a-num">1121</td>
      <td>应收票据</td>
      <td>资产负债表-应收票据</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1999</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1122</td>
      <td>应收账款</td>
      <td>资产负债表-应收账款</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1999</td>
      <td>借</td>
      <td>是</td>
      <td>BB.1.2.预计销售收入(不含税) / BB.1.2.验收回款 / BB.1.3.确认收入 / BB.1.3.验收回款</td>
    </tr>
    <tr>
      <td class="t3a-num">1123</td>
      <td>预付款项</td>
      <td>资产负债表-预付款项</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1999</td>
      <td>借</td>
      <td>是</td>
      <td>BB.3.1.付款额 / BB.3.2.付款额</td>
    </tr>
    <tr>
      <td class="t3a-num">1405</td>
      <td>存货</td>
      <td>资产负债表-存货</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1999</td>
      <td>借</td>
      <td>是</td>
      <td>BB.3.3.到货额 / BB.2.1.完工生产成本 / BB.3.3.D.到货额（代采购物料平价转移：下单主体法人侧转出 − / 受益主体法人侧转入 +，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行；转移额与提供方 A 在 BB.3.3 的同月、同物料类别到货额勾稽、到货月全额转移下两者相等） / BB.1.3.f 物料明细_财务查询·内部供应商出料（销售线物料真实购销：提供方（内部供应商归属法人）侧按出库成本转出 − 并结转 6401.2，签约主体侧按采购价＝出库成本+加成款入库 +，加成进存货后随服务消耗结转 6401.1；增值税为价外税不进存货） / BB.1.2.预计销售成本 / BB.1.3.直接物料成本 / BB.3.X.调整转入、调整转出 / BB.4.1.c.领料金额合计 / BB.4.X.A.制造费用折旧小计 / BB.5.1.财务视角制造费用（在制品人工与制费） / BB.5.2.部门费用性质=制造费用</td>
    </tr>
    <tr>
      <td class="t3a-num">1407</td>
      <td>合同资产</td>
      <td>资产负债表-合同资产</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1999</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1102</td>
      <td>衍生金融资产</td>
      <td>资产负债表-衍生金融资产</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1999</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1124</td>
      <td>应收款项融资</td>
      <td>资产负债表-应收款项融资</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1999</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1221</td>
      <td>其他应收款</td>
      <td>资产负债表-其他应收款</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1999</td>
      <td>借</td>
      <td>是</td>
      <td>BB.3.3.D/BB.3.1.D 代采购·提供方应收（含税＝不含税（平价转移款+月度加成款）×(1+适用税率)，货物 13%、代购服务 6%，取 AB.15，内部往来；集团合并层与接受方互抵）− 结算冲减（接受方向提供方的含税内部结算付款额，按月归集；含税＝不含税额 ×(1+适用税率)） / 三表手工调整 / BJ.C.f 内部借款预算表·借出方当月新增 − 当月还本（内部往来·增加/冲减项；保持不含税本金口径，贷款服务利息借入方进项不得抵扣；本方案默认内部借款按应税处理，集团如有统借统还等免税安排，另行调整；集团合并层与借入方 2241.1 按本方法人+对手方法人配对互抵） / 销售线物料明细内部供应商出料（BB.1.3.f 出库成本+加成款：提供方按含税内部销售价＝不含税（出库成本+加成款）×(1+13%) 确认应收，按合同账期真实现金收款、期末保留真实未收余额） / BB.1.3.i 人工明细_财务查询·内部供应商提供行（提供方应收＝含税完整服务价（人工成本+加成款）×(1+6%)，内部往来·增加项，按合同账期真实现金收款、期末保留真实未收余额）</td>
    </tr>
    <tr>
      <td class="t3a-num">1221.1</td>
      <td>其他应收款-内部往来</td>
      <td>资产负债表-其他应收款-内部往来</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>3 级</td>
      <td class="t3a-num">1221</td>
      <td>借</td>
      <td>否</td>
      <td>BB.3.3.D/BB.3.1.D 代采购·提供方应收（转出价+加成，内部往来，增加项）− 结算冲减（内部结算付款额，按月归集） / BB.1.3.f 物料明细_财务查询·内部供应商出料（提供方应收＝含税内部销售价（出库成本+加成款）×(1+13%)，内部往来·增加项，按合同账期真实现金收款、期末保留真实未收余额） / BB.1.3.i 人工明细_财务查询·内部供应商提供行（提供方应收＝含税完整服务价（人工成本+加成款）×(1+6%)，内部往来·增加项，按合同账期真实现金收款、期末保留真实未收余额） / BJ.C.f 内部借款预算表·借出方当月新增 − 当月还本（内部往来 1221.1 增加/冲减项，不含税本金口径；贷款服务利息借入方进项不得抵扣；本方案默认内部借款按应税处理，集团如有统借统还等免税安排，另行调整）</td>
    </tr>
    <tr>
      <td class="t3a-num">1481</td>
      <td>持有待售资产</td>
      <td>资产负债表-持有待售资产</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1999</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1482</td>
      <td>一年内到期的非流动资产</td>
      <td>资产负债表-一年内到期的非流动资产</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1999</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1483</td>
      <td>其他流动资产</td>
      <td>资产负债表-其他流动资产</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1999</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1999</td>
      <td>流动资产合计</td>
      <td>资产负债表-流动资产合计</td>
      <td>BS 体系</td>
      <td>资产负债表-流动资产</td>
      <td>1 级</td>
      <td>-</td>
      <td>借</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td class="t3a-num">1601</td>
      <td>固定资产</td>
      <td>资产负债表-固定资产</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>BB.4.4.原值汇总 / BB.4.4.累计折旧汇总 / BB.3.1.到货额 / BB.3.2.b.验收转固 / BB.4.1.d.转固转出 / BB.4.3.月度资产原值 / BB.3.1.D.到货额（下单主体法人侧冲减 −、受益主体法人侧增加 +，按各自法人取数；转移额与提供方 A 在 BB.3.1（经 BB.3.1.C）的同月、同资产类别到货原值勾稽、到货月全额转移下两者相等） / BB.4.X.A.折旧合计 / BB.4.6.资产净值 / BB.3.1.A·BB.3.1.B 采购视角明细行（按资产类别前缀归类后经 BB.3.1.C 按法人汇总） / BB.4.5.本年新增折旧计提（经 BB.4.X.A 归集） / AA.9 折旧参数（方法/年限/残值率）</td>
    </tr>
    <tr>
      <td class="t3a-num">1604</td>
      <td>在建工程</td>
      <td>资产负债表-在建工程</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>BB.4.1.a.期初金额 / BB.3.2.期初金额 / BB.3.2.验收额 / BB.4.1.b.人工投入 / BB.4.1.c.领料金额合计 / BF.3.资本化利息 / BB.3.2.b.验收转固 / BB.4.1.d.转固转出 / BB.5.1.自制在建工程列（资本化人工；规则明确资本化人工只取 BB.5.1 该列、BB.4.1.b 仅展示不重复计入）</td>
    </tr>
    <tr>
      <td class="t3a-num">1503</td>
      <td>长期股权投资</td>
      <td>资产负债表-长期股权投资</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>BF.1.月度投资金额</td>
    </tr>
    <tr>
      <td class="t3a-num">1701</td>
      <td>无形资产</td>
      <td>资产负债表-无形资产</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>BB.3.1.C 财务视角·原值(万元)（资产类别=无形资产） / BB.4.X.A 折旧计算汇总表·研发/管理/销售费用折旧与摊销小计（摊销部分） / BB.3.1.D 关联交易视角（设备及无形资产采购）·到货额(万元)（下单主体法人侧冲减、受益主体法人侧增加、仅资产类别=无形资产部分；转移额与提供方 A 在 BB.3.1（经 BB.3.1.C）的同月、同资产类别到货原值勾稽、到货月全额转移下两者相等） / BB.3.1.A·BB.3.1.B 采购视角明细行（按「无形资产-」前缀归类后经 BB.3.1.C 按法人汇总） / AA.9 折旧参数（摊销年限按「月」维护、残值率 0%）</td>
    </tr>
    <tr>
      <td class="t3a-num">1501</td>
      <td>债权投资</td>
      <td>资产负债表-债权投资</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1502</td>
      <td>其他债权投资</td>
      <td>资产负债表-其他债权投资</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1531</td>
      <td>长期应收款</td>
      <td>资产负债表-长期应收款</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1504</td>
      <td>其他权益工具投资</td>
      <td>资产负债表-其他权益工具投资</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1505</td>
      <td>其他非流动金融资产</td>
      <td>资产负债表-其他非流动金融资产</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1521</td>
      <td>投资性房地产</td>
      <td>资产负债表-投资性房地产</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1623</td>
      <td>生产性生物资产</td>
      <td>资产负债表-生产性生物资产</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1624</td>
      <td>油气资产</td>
      <td>资产负债表-油气资产</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1625</td>
      <td>开发支出</td>
      <td>资产负债表-开发支出</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1711</td>
      <td>商誉</td>
      <td>资产负债表-商誉</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1801</td>
      <td>长期待摊费用</td>
      <td>资产负债表-长期待摊费用</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1811</td>
      <td>递延所得税资产</td>
      <td>资产负债表-递延所得税资产</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1902</td>
      <td>其他非流动资产</td>
      <td>资产负债表-其他非流动资产</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">1998</td>
      <td>非流动资产合计</td>
      <td>资产负债表-非流动资产合计</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>1 级</td>
      <td>-</td>
      <td>借</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td class="t3a-num">19999</td>
      <td>资产总计</td>
      <td>资产负债表-资产总计</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>1 级</td>
      <td>-</td>
      <td>借</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td class="t3a-num">2202</td>
      <td>应付账款</td>
      <td>资产负债表-应付账款</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>BB.3.3.到货额 / BB.3.1.到货额</td>
    </tr>
    <tr>
      <td class="t3a-num">2204</td>
      <td>合同负债</td>
      <td>资产负债表-合同负债</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">2211</td>
      <td>应付职工薪酬</td>
      <td>资产负债表-应付职工薪酬</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>BB.5.1 人事视角计提合计 / BB.5.1.实际发放</td>
    </tr>
    <tr>
      <td class="t3a-num">2221</td>
      <td>应交税费</td>
      <td>资产负债表-应交税费</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>BF.4.增值税（含内部交易增值税：各法人独立申报、内部交易销项与进项不对抵；集团合并层各法人加总后内部部分自然净 0）/ BF.4.企业所得税 / BF.4.城市维护建设税 / BF.4.教育费附加(含地方教育费附加) / BF.4.房产税 / BF.4.土地使用税 / BF.4.印花税 / BF.4.其他税费</td>
    </tr>
    <tr>
      <td class="t3a-num">2001</td>
      <td>短期借款</td>
      <td>资产负债表-短期借款</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>BF.3.d 融资预算汇总表·当期新增融资总额 / 当期减少融资总额 / BF.3.c 融资预算明细表·新增融资金额</td>
    </tr>
    <tr>
      <td class="t3a-num">2101</td>
      <td>交易性金融负债</td>
      <td>资产负债表-交易性金融负债</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">2102</td>
      <td>衍生金融负债</td>
      <td>资产负债表-衍生金融负债</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">2201</td>
      <td>应付票据</td>
      <td>资产负债表-应付票据</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">2203</td>
      <td>预收款项</td>
      <td>资产负债表-预收款项</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">2241</td>
      <td>其他应付款</td>
      <td>资产负债表-其他应付款</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>BB.3.3.D/BB.3.1.D 代采购·接受方应付（含税＝不含税（平价转移款+月度加成款）×(1+适用税率)，货物 13%、代购服务 6%，取 AB.15，内部往来；集团合并层与提供方互抵） / 三表手工调整 / BJ.C.f 内部借款预算表·借入方当月新增 − 当月还本（内部往来·增加/冲减项；保持不含税本金口径，贷款服务利息借入方进项不得抵扣；本方案默认内部借款按应税处理，集团如有统借统还等免税安排，另行调整；集团合并层与借出方 1221.1 按本方法人+对手方法人配对互抵） / 销售线物料明细内部供应商出料（BB.1.3.f 出库成本+加成款：签约主体按含税采购价＝不含税（出库成本+加成款）×(1+13%) 确认应付，按合同账期真实现金付款、期末保留真实未付余额） / BB.1.3.i 人工明细_财务查询·内部供应商提供行（接受方应付＝含税完整服务价（人工成本+加成款）×(1+6%)，内部往来·增加项，按合同账期真实现金付款、期末保留真实未付余额）</td>
    </tr>
    <tr>
      <td class="t3a-num">2241.1</td>
      <td>其他应付款-内部往来</td>
      <td>资产负债表-其他应付款-内部往来</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>3 级</td>
      <td class="t3a-num">2241</td>
      <td>贷</td>
      <td>否</td>
      <td>BB.3.3.D/BB.3.1.D 代采购·接受方应付（内部往来，增加项）− 结算冲减（内部结算付款额，按月归集） / BB.1.3.f 物料明细_财务查询·内部供应商出料（接受方应付＝含税采购价（出库成本+加成款）×(1+13%)，内部往来·增加项，按合同账期真实现金付款、期末保留真实未付余额） / BB.1.3.i 人工明细_财务查询·内部供应商提供行（接受方应付＝含税完整服务价（人工成本+加成款）×(1+6%)，内部往来·增加项，按合同账期真实现金付款、期末保留真实未付余额） / BJ.C.f 内部借款预算表·借入方当月新增 − 当月还本（内部往来 2241.1 增加/冲减项，不含税本金口径；贷款服务利息借入方进项不得抵扣；本方案默认内部借款按应税处理，集团如有统借统还等免税安排，另行调整）</td>
    </tr>
    <tr>
      <td class="t3a-num">2245</td>
      <td>持有待售负债</td>
      <td>资产负债表-持有待售负债</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">2504</td>
      <td>一年内到期的非流动负债</td>
      <td>资产负债表-一年内到期的非流动负债</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>BF.3.d 融资预算汇总表（当期流动性重分类金额，按到期日自动识别） / BF.3.c 融资预算明细表.期限、到期时间、已有期初净额（上年末余额）（按到期日自动识别重分类）</td>
    </tr>
    <tr>
      <td class="t3a-num">2246</td>
      <td>其他流动负债</td>
      <td>资产负债表-其他流动负债</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">29998</td>
      <td>流动负债合计</td>
      <td>资产负债表-流动负债合计</td>
      <td>BS 体系</td>
      <td>资产负债表-流动负债</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td class="t3a-num">2501</td>
      <td>长期借款</td>
      <td>资产负债表-长期借款</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>BF.3.d 融资预算汇总表·当期新增融资总额 / 当期减少融资总额 / 当期流动性重分类金额 / BF.3.c 融资预算明细表·期限、到期时间、已有期初净额</td>
    </tr>
    <tr>
      <td class="t3a-num">2502</td>
      <td>应付债券</td>
      <td>资产负债表-应付债券</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">2701</td>
      <td>长期应付款</td>
      <td>资产负债表-长期应付款</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">2801</td>
      <td>预计负债</td>
      <td>资产负债表-预计负债</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">2401</td>
      <td>递延收益</td>
      <td>资产负债表-递延收益</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">2901</td>
      <td>递延所得税负债</td>
      <td>资产负债表-递延所得税负债</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">2902</td>
      <td>其他非流动负债</td>
      <td>资产负债表-其他非流动负债</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">29997</td>
      <td>非流动负债合计</td>
      <td>资产负债表-非流动负债合计</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动负债</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td class="t3a-num">29999</td>
      <td>负债合计</td>
      <td>资产负债表-负债合计</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动负债</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td class="t3a-num">4001</td>
      <td>实收资本（或股本）</td>
      <td>资产负债表-实收资本（或股本）</td>
      <td>BS 体系</td>
      <td>资产负债表-所有者权益</td>
      <td>2 级</td>
      <td class="t3a-num">49999</td>
      <td>贷</td>
      <td>是</td>
      <td>上年末余额 / 手工</td>
    </tr>
    <tr>
      <td class="t3a-num">4002</td>
      <td>资本公积</td>
      <td>资产负债表-资本公积</td>
      <td>BS 体系</td>
      <td>资产负债表-所有者权益</td>
      <td>2 级</td>
      <td class="t3a-num">49999</td>
      <td>贷</td>
      <td>是</td>
      <td>上年末余额 / 手工</td>
    </tr>
    <tr>
      <td class="t3a-num">4101</td>
      <td>盈余公积</td>
      <td>资产负债表-盈余公积</td>
      <td>BS 体系</td>
      <td>资产负债表-所有者权益</td>
      <td>2 级</td>
      <td class="t3a-num">49999</td>
      <td>贷</td>
      <td>是</td>
      <td>BO.PL.净利润</td>
    </tr>
    <tr>
      <td class="t3a-num">4103</td>
      <td>未分配利润</td>
      <td>资产负债表-未分配利润</td>
      <td>BS 体系</td>
      <td>资产负债表-所有者权益</td>
      <td>2 级</td>
      <td class="t3a-num">49999</td>
      <td>贷</td>
      <td>是</td>
      <td>BO.PL.净利润</td>
    </tr>
    <tr>
      <td class="t3a-num">4003</td>
      <td>其他权益工具</td>
      <td>资产负债表-其他权益工具</td>
      <td>BS 体系</td>
      <td>资产负债表-所有者权益</td>
      <td>2 级</td>
      <td class="t3a-num">49999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">4201</td>
      <td>减：库存股</td>
      <td>资产负债表-减：库存股</td>
      <td>BS 体系</td>
      <td>资产负债表-所有者权益</td>
      <td>2 级</td>
      <td class="t3a-num">49999</td>
      <td>借</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">4104</td>
      <td>其他综合收益</td>
      <td>资产负债表-其他综合收益</td>
      <td>BS 体系</td>
      <td>资产负债表-所有者权益</td>
      <td>2 级</td>
      <td class="t3a-num">49999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">4105</td>
      <td>少数股东权益</td>
      <td>资产负债表-少数股东权益</td>
      <td>BS 体系</td>
      <td>资产负债表-所有者权益</td>
      <td>2 级</td>
      <td class="t3a-num">49999</td>
      <td>贷</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td class="t3a-num">49997</td>
      <td>归属于母公司所有者权益合计</td>
      <td>资产负债表-归属于母公司所有者权益合计</td>
      <td>BS 体系</td>
      <td>资产负债表-所有者权益</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td class="t3a-num">49998</td>
      <td>所有者权益合计</td>
      <td>资产负债表-所有者权益合计</td>
      <td>BS 体系</td>
      <td>资产负债表-所有者权益</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td class="t3a-num">49999</td>
      <td>负债和所有者权益总计</td>
      <td>资产负债表-负债和所有者权益总计</td>
      <td>BS 体系</td>
      <td>资产负债表-所有者权益</td>
      <td>1 级</td>
      <td>-</td>
      <td>贷</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td>CF-01</td>
      <td>销售商品、提供劳务收到的现金</td>
      <td>现金流量表-销售商品、提供劳务收到的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-经营活动</td>
      <td>2 级</td>
      <td>CF-04</td>
      <td>流入</td>
      <td>是</td>
      <td>BB.1.2.预收 / BB.1.2.验收回款 / BB.1.3.预收款 / BB.1.3.验收回款 / AB.15(ASS-TAX-07、ASS-TAX-09)</td>
    </tr>
    <tr>
      <td>CF-02</td>
      <td>收到的税费返还</td>
      <td>现金流量表-收到的税费返还</td>
      <td>CF 体系</td>
      <td>现金流量表-经营活动</td>
      <td>2 级</td>
      <td>CF-04</td>
      <td>流入</td>
      <td>是</td>
      <td>BF.4(其中: 增值税退税) / BF.4.b(增值税即征即退/专项返还)</td>
    </tr>
    <tr>
      <td>CF-03</td>
      <td>收到其他与经营活动有关的现金</td>
      <td>现金流量表-收到其他与经营活动有关的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-经营活动</td>
      <td>2 级</td>
      <td>CF-04</td>
      <td>流入</td>
      <td>是</td>
      <td>三表手工调整 / BB.4.2.b 内部职场租赁.出租方月度结算收款（含税内部结算收款＝内部租金×(1+9%)＋加成款×(1+6%)，取 AB.15；合并层互抵） / BB.3.3.D 关联交易视角（物料类采购）.月度到货额×(1+13%)+月度加成款×(1+6%)（各月求和，含税结算收款，内部结算、合并层互抵） / BB.3.1.D 关联交易视角（设备及无形资产采购）.月度加成款×(1+6%)（各月求和，加成部分/代购服务费，含税结算收款/付款，内部结算、合并层互抵）</td>
    </tr>
    <tr>
      <td>CF-04</td>
      <td>经营活动现金流入小计</td>
      <td>现金流量表-经营活动现金流入小计</td>
      <td>CF 体系</td>
      <td>现金流量表-经营活动</td>
      <td>1 级</td>
      <td>-</td>
      <td>流入</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td>CF-05</td>
      <td>购买商品、接受劳务支付的现金</td>
      <td>现金流量表-购买商品、接受劳务支付的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-经营活动</td>
      <td>2 级</td>
      <td>CF-09</td>
      <td>流出</td>
      <td>是</td>
      <td>BB.3.3.预付款 / BB.3.3.验收付款 / BB.3.3.预付款比例 / AB.15 税率及附加税比率字典.ASS-TAX-07（增值税法定标准税率，仅本行单点乘入一次；BAA.7 比例表本年度不启用）</td>
    </tr>
    <tr>
      <td>CF-06</td>
      <td>支付给职工以及为职工支付的现金</td>
      <td>现金流量表-支付给职工以及为职工支付的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-经营活动</td>
      <td>2 级</td>
      <td>CF-09</td>
      <td>流出</td>
      <td>是</td>
      <td>BB.5.1 实际发放</td>
    </tr>
    <tr>
      <td>CF-07</td>
      <td>支付的各项税费</td>
      <td>现金流量表-支付的各项税费</td>
      <td>CF 体系</td>
      <td>现金流量表-经营活动</td>
      <td>2 级</td>
      <td>CF-09</td>
      <td>流出</td>
      <td>是</td>
      <td>BF.4.各项税费合计(现金流口径)</td>
    </tr>
    <tr>
      <td>CF-08</td>
      <td>支付其他与经营活动有关的现金</td>
      <td>现金流量表-支付其他与经营活动有关的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-经营活动</td>
      <td>2 级</td>
      <td>CF-09</td>
      <td>流出</td>
      <td>是</td>
      <td>BB.5.2.月度费用金额 / BB.4.2.b 内部职场租赁.承租方月度结算付款（费用化租赁；含税＝内部租金×(1+9%)＋加成款×(1+6%)，取 AB.15；内部结算、合并层互抵） / BB.4.2.a 外部职场租赁.费用化合同租金付现（对外付款、不抵销） / BA.5 费用预算汇总表（月度金额的转换基数，经 BB.5.2 全额按月付现） / BB.3.3.D 关联交易视角（物料类采购）.月度到货额×(1+13%)+月度加成款×(1+6%)（各月求和，含税结算付款，内部结算、合并层互抵） / BB.3.1.D 关联交易视角（设备及无形资产采购）.月度加成款×(1+6%)（各月求和，加成部分/代购服务费，含税结算收款/付款，内部结算、合并层互抵）</td>
    </tr>
    <tr>
      <td>CF-09</td>
      <td>经营活动现金流出小计</td>
      <td>现金流量表-经营活动现金流出小计</td>
      <td>CF 体系</td>
      <td>现金流量表-经营活动</td>
      <td>1 级</td>
      <td>-</td>
      <td>流出</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td>CF-10</td>
      <td>经营活动产生的现金流量净额</td>
      <td>现金流量表-经营活动产生的现金流量净额</td>
      <td>CF 体系</td>
      <td>现金流量表-经营活动</td>
      <td>1 级</td>
      <td>-</td>
      <td>净额</td>
      <td>是</td>
      <td>公式计算</td>
    </tr>
    <tr>
      <td>CF-11</td>
      <td>收回投资收到的现金</td>
      <td>现金流量表-收回投资收到的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-投资活动</td>
      <td>2 级</td>
      <td>CF-13</td>
      <td>流入</td>
      <td>是</td>
      <td>BF.3.a.减少投资额 / BF.3.b.减少投资额</td>
    </tr>
    <tr>
      <td>CF-12</td>
      <td>取得投资收益收到的现金</td>
      <td>现金流量表-取得投资收益收到的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-投资活动</td>
      <td>2 级</td>
      <td>CF-13</td>
      <td>流入</td>
      <td>是</td>
      <td>BF.1.分红/利息收现 / BF.3.a.投资收益 / BF.3.b.本年计划分红/利息流入</td>
    </tr>
    <tr>
      <td>CF-13.1</td>
      <td>处置固定资产、无形资产和其他长期资产收回的现金净额</td>
      <td>现金流量表-处置固定资产、无形资产和其他长期资产收回的现金净额</td>
      <td>CF 体系</td>
      <td>现金流量表-投资活动</td>
      <td>2 级</td>
      <td>CF-13</td>
      <td>流入</td>
      <td>是</td>
      <td>BB.4.6.处置收款-含税(万元)（对外出售/报废变卖/内部转卖，处置方式区分）</td>
    </tr>
    <tr>
      <td>CF-13.2</td>
      <td>处置子公司及其他营业单位收到的现金净额</td>
      <td>现金流量表-处置子公司及其他营业单位收到的现金净额</td>
      <td>CF 体系</td>
      <td>现金流量表-投资活动</td>
      <td>2 级</td>
      <td>CF-13</td>
      <td>流入</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td>CF-13.3</td>
      <td>收到其他与投资活动有关的现金</td>
      <td>现金流量表-收到其他与投资活动有关的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-投资活动</td>
      <td>2 级</td>
      <td>CF-13</td>
      <td>流入</td>
      <td>是</td>
      <td>BB.3.1.D 关联交易视角（设备及无形资产采购）·月度到货额（平价部分，下单主体法人侧、各月求和）</td>
    </tr>
    <tr>
      <td>CF-13</td>
      <td>投资活动现金流入小计</td>
      <td>现金流量表-投资活动现金流入小计</td>
      <td>CF 体系</td>
      <td>现金流量表-投资活动</td>
      <td>1 级</td>
      <td>-</td>
      <td>流入</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td>CF-14</td>
      <td>购建固定资产、无形资产和其他长期资产支付的现金</td>
      <td>现金流量表-购建固定资产、无形资产和其他长期资产支付的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-投资活动</td>
      <td>2 级</td>
      <td>CF-16</td>
      <td>流出</td>
      <td>是</td>
      <td>BB.3.1.付款额 / BB.3.2.付款额 / BB.4.3.月度预付款额 / BB.4.3.月度付款额 / BB.4.3.月度付款额（含内部转卖买方受让付款，原值=转卖价） / AB.15 税率及附加税比率字典.ASS-TAX-07、ASS-TAX-10（设备/物料 13%、基建工程 9%，仅本行单点乘入一次）</td>
    </tr>
    <tr>
      <td>CF-16.1</td>
      <td>取得子公司及其他营业单位支付的现金净额</td>
      <td>现金流量表-取得子公司及其他营业单位支付的现金净额</td>
      <td>CF 体系</td>
      <td>现金流量表-投资活动</td>
      <td>2 级</td>
      <td>CF-16</td>
      <td>流出</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td>CF-15</td>
      <td>投资支付的现金</td>
      <td>现金流量表-投资支付的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-投资活动</td>
      <td>2 级</td>
      <td>CF-16</td>
      <td>流出</td>
      <td>是</td>
      <td>BF.1.月度投资金额 / BF.3.a.新增投资额 / BF.3.b.新增投资额（标注为新增投资支出的部分）</td>
    </tr>
    <tr>
      <td>CF-16.2</td>
      <td>支付其他与投资活动有关的现金</td>
      <td>现金流量表-支付其他与投资活动有关的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-投资活动</td>
      <td>2 级</td>
      <td>CF-16</td>
      <td>流出</td>
      <td>是</td>
      <td>BB.3.1.D 关联交易视角（设备及无形资产采购）·月度到货额（平价部分，受益主体法人侧、各月求和）</td>
    </tr>
    <tr>
      <td>CF-16</td>
      <td>投资活动现金流出小计</td>
      <td>现金流量表-投资活动现金流出小计</td>
      <td>CF 体系</td>
      <td>现金流量表-投资活动</td>
      <td>1 级</td>
      <td>-</td>
      <td>流出</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td>CF-17</td>
      <td>投资活动产生的现金流量净额</td>
      <td>现金流量表-投资活动产生的现金流量净额</td>
      <td>CF 体系</td>
      <td>现金流量表-投资活动</td>
      <td>1 级</td>
      <td>-</td>
      <td>净额</td>
      <td>是</td>
      <td>公式计算</td>
    </tr>
    <tr>
      <td>CF-18</td>
      <td>取得借款收到的现金</td>
      <td>现金流量表-取得借款收到的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-筹资活动</td>
      <td>2 级</td>
      <td>CF-19</td>
      <td>流入</td>
      <td>是</td>
      <td>BF.3.新增投资额 / BJ.C.f 内部借款预算表·借入方当月新增（内部借款，单体口径计入、集团合并层与借出方 CF-22.1 配对互抵）</td>
    </tr>
    <tr>
      <td>CF-19.1</td>
      <td>吸收投资收到的现金</td>
      <td>现金流量表-吸收投资收到的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-筹资活动</td>
      <td>2 级</td>
      <td>CF-19</td>
      <td>流入</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td>CF-19.2</td>
      <td>收到其他与筹资活动有关的现金</td>
      <td>现金流量表-收到其他与筹资活动有关的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-筹资活动</td>
      <td>2 级</td>
      <td>CF-19</td>
      <td>流入</td>
      <td>是</td>
      <td>BJ.C.f 内部借款预算表·借出方当月还本 + 当月实付利息（借出方口径＝当月实收利息）（单体口径计入；集团合并层与借入方 CF-20/CF-21 按本方法人+对手方法人配对互抵）</td>
    </tr>
    <tr>
      <td>CF-19</td>
      <td>筹资活动现金流入小计</td>
      <td>现金流量表-筹资活动现金流入小计</td>
      <td>CF 体系</td>
      <td>现金流量表-筹资活动</td>
      <td>1 级</td>
      <td>-</td>
      <td>流入</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td>CF-20</td>
      <td>偿还债务支付的现金</td>
      <td>现金流量表-偿还债务支付的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-筹资活动</td>
      <td>2 级</td>
      <td>CF-22</td>
      <td>流出</td>
      <td>是</td>
      <td>BF.3.减少投资额 / BJ.C.f 内部借款预算表·借入方当月还本（内部借款，单体口径计入、集团合并层与借出方 CF-19.2 配对互抵）</td>
    </tr>
    <tr>
      <td>CF-21</td>
      <td>分配股利、利润或偿付利息支付的现金</td>
      <td>现金流量表-分配股利、利润或偿付利息支付的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-筹资活动</td>
      <td>2 级</td>
      <td>CF-22</td>
      <td>流出</td>
      <td>是</td>
      <td>BF.3.c 融资预算明细表.实付利息合计（利息支出付现部分） / BB.4.2.b.1 内部职场租赁·财务视角.利息费用付现部分（内部租赁，合并层与出租方内部收入互抵） / BB.4.2.a.1 外部职场租赁·财务视角.月度利息付现部分（外部租赁、不抵销） / BJ.C.f 内部借款预算表·借入方当月实付利息（内部借款付息，单体口径计入、集团合并层与借出方 CF-19.2 配对互抵）</td>
    </tr>
    <tr>
      <td>CF-22.1</td>
      <td>支付其他与筹资活动有关的现金</td>
      <td>现金流量表-支付其他与筹资活动有关的现金</td>
      <td>CF 体系</td>
      <td>现金流量表-筹资活动</td>
      <td>2 级</td>
      <td>CF-22</td>
      <td>流出</td>
      <td>是</td>
      <td>BJ.C.f 内部借款预算表·借出方当月新增（放款流出，单体口径计入；集团合并层与借入方 CF-18 配对互抵） / BB.4.2.b.1 内部职场租赁·财务视角.本金偿付(各月求和)（内部租赁） / BB.4.2.a.1 外部职场租赁·财务视角.月度本金偿付(各月求和)（外部租赁、不抵销）</td>
    </tr>
    <tr>
      <td>CF-22</td>
      <td>筹资活动现金流出小计</td>
      <td>现金流量表-筹资活动现金流出小计</td>
      <td>CF 体系</td>
      <td>现金流量表-筹资活动</td>
      <td>1 级</td>
      <td>-</td>
      <td>流出</td>
      <td>是</td>
      <td>公式汇总</td>
    </tr>
    <tr>
      <td>CF-23</td>
      <td>筹资活动产生的现金流量净额</td>
      <td>现金流量表-筹资活动产生的现金流量净额</td>
      <td>CF 体系</td>
      <td>现金流量表-筹资活动</td>
      <td>1 级</td>
      <td>-</td>
      <td>净额</td>
      <td>是</td>
      <td>公式计算</td>
    </tr>
    <tr>
      <td>CF-23.1</td>
      <td>汇率变动对现金及现金等价物的影响</td>
      <td>现金流量表-汇率变动对现金及现金等价物的影响</td>
      <td>CF 体系</td>
      <td>现金流量表-现金及等价物</td>
      <td>1 级</td>
      <td>-</td>
      <td>净额</td>
      <td>是</td>
      <td>手工</td>
    </tr>
    <tr>
      <td>CF-24</td>
      <td>现金及现金等价物净增加额</td>
      <td>现金流量表-现金及现金等价物净增加额</td>
      <td>CF 体系</td>
      <td>现金流量表-现金及等价物</td>
      <td>1 级</td>
      <td>-</td>
      <td>净额</td>
      <td>是</td>
      <td>公式计算</td>
    </tr>
    <tr>
      <td>CF-25</td>
      <td>期初现金及现金等价物余额</td>
      <td>现金流量表-期初现金及现金等价物余额</td>
      <td>CF 体系</td>
      <td>现金流量表-现金及等价物</td>
      <td>1 级</td>
      <td>-</td>
      <td>净额</td>
      <td>是</td>
      <td>BO.BS.期末（货币资金1001）</td>
    </tr>
    <tr>
      <td>CF-26</td>
      <td>期末现金及现金等价物余额</td>
      <td>现金流量表-期末现金及现金等价物余额</td>
      <td>CF 体系</td>
      <td>现金流量表-现金及等价物</td>
      <td>1 级</td>
      <td>-</td>
      <td>净额</td>
      <td>是</td>
      <td>公式计算</td>
    </tr>
    <tr>
      <td class="t3a-num">2602</td>
      <td>租赁负债</td>
      <td>资产负债表-租赁负债</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动负债</td>
      <td>2 级</td>
      <td class="t3a-num">29999</td>
      <td>贷</td>
      <td>是</td>
      <td>BB.4.2.b.1 内部职场租赁·财务视角（承租方资本化） / BB.4.2.a.1 外部职场租赁·财务视角（承租方资本化） / AB.16 租赁期限（资本化判定：一年以上→资本化进本行、一年及以下→费用化不进本行）</td>
    </tr>
    <tr>
      <td class="t3a-num">1621</td>
      <td>使用权资产</td>
      <td>资产负债表-使用权资产</td>
      <td>BS 体系</td>
      <td>资产负债表-非流动资产</td>
      <td>2 级</td>
      <td class="t3a-num">1998</td>
      <td>借</td>
      <td>是</td>
      <td>BB.4.2.b.1 内部职场租赁·财务视角（承租方资本化） / BB.4.2.a.1 外部职场租赁·财务视角（承租方资本化） / AB.16 租赁期限（资本化判定：一年以上→资本化进本行、一年及以下→费用化不进本行） / BB.4.5 增量资产折旧计算表（使用权资产折旧计提入口） / BB.4.X.A 折旧计算汇总表（使用权资产折旧归集）</td>
    </tr>
  </tbody>
</table>
</div>

### AA.3.b 费用明细科目(FY)

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">费用科目编码</th>
      <th class="t3a-th">费用科目名称</th>
      <th class="t3a-th">科目全称</th>
      <th class="t3a-th">层级</th>
      <th class="t3a-th">上级编码</th>
      <th class="t3a-th">支出性质</th>
      <th class="t3a-th">默认映射财务报表项</th>
      <th class="t3a-th">业务核算范围与口径说明</th>
    </tr>
    <tr>
      <td>E0101</td>
      <td>人员费用</td>
      <td>人员费用</td>
      <td>1 级</td>
      <td>-</td>
      <td>经营性支出</td>
      <td>应付职工薪酬 / 职工薪酬费用</td>
      <td>全职员工及兼职人员的基本工资、绩效奖金、津贴补贴、五险一金等</td>
    </tr>
    <tr>
      <td>E0102</td>
      <td>差旅费用</td>
      <td>差旅费用</td>
      <td>1 级</td>
      <td>-</td>
      <td>经营性支出</td>
      <td>销售费用/管理费用-差旅费</td>
      <td>员工因公出差产生的交通费（飞机/高铁）、住宿费、出差伙食补贴等</td>
    </tr>
    <tr>
      <td>E0105</td>
      <td>市场推广费</td>
      <td>市场推广费</td>
      <td>1 级</td>
      <td>-</td>
      <td>经营性支出</td>
      <td>销售费用-市场推广与广告宣传费</td>
      <td>品牌宣传、媒体投放、展会搭建、行业峰会赞助与精准获客投放</td>
    </tr>
    <tr>
      <td>E0106</td>
      <td>中介服务费</td>
      <td>中介服务费</td>
      <td>1 级</td>
      <td>-</td>
      <td>经营性支出</td>
      <td>管理费用-中介机构专业服务费</td>
      <td>会计师事务所年报审计、律所法务合规咨询、资产评估及税务顾问</td>
    </tr>
    <tr>
      <td>E0107</td>
      <td>业务招待费</td>
      <td>业务招待费</td>
      <td>1 级</td>
      <td>-</td>
      <td>经营性支出</td>
      <td>销售费用/管理费用-业务招待费</td>
      <td>生产经营业务合理需要发生的商务宴请、客户接待与商务礼品</td>
    </tr>
    <tr>
      <td>E0110</td>
      <td>办公费</td>
      <td>办公费</td>
      <td>1 级</td>
      <td>-</td>
      <td>经营性支出</td>
      <td>管理费用-日常办公耗材与印刷</td>
      <td>办公文具、打印纸张、硒鼓墨盒、图书报刊、名片印制及办公日用品</td>
    </tr>
    <tr>
      <td>E0113</td>
      <td>折旧费-折旧摊销</td>
      <td>折旧费-折旧摊销</td>
      <td>1 级</td>
      <td>-</td>
      <td>经营性支出</td>
      <td>累计折旧 / 制造费用/管理费用-折旧摊销</td>
      <td>固定资产（房屋、机器、办公设备）及无形资产的月度计提折旧与摊销</td>
    </tr>
    <tr>
      <td>E0117</td>
      <td>房屋使用费</td>
      <td>房屋使用费</td>
      <td>1 级</td>
      <td>-</td>
      <td>经营性支出</td>
      <td>使用权资产折旧 / 租赁负债利息 / 管理费用-租金</td>
      <td>总部写字楼、研发中心、各地分公司办事处及库房的场地租赁费用</td>
    </tr>
    <tr>
      <td>E0127</td>
      <td>业务宣传费</td>
      <td>业务宣传费</td>
      <td>1 级</td>
      <td>-</td>
      <td>经营性支出</td>
      <td>销售费用-业务宣传制作费</td>
      <td>企业宣传片制作、宣传画册样本印制、易拉宝展架及商务礼品定制</td>
    </tr>
    <tr>
      <td>E0133</td>
      <td>其他</td>
      <td>其他</td>
      <td>1 级</td>
      <td>-</td>
      <td>经营性支出</td>
      <td>期间费用-其他未分类营业开支</td>
      <td>无法归入以上特定科目的其他零星经营性开支</td>
    </tr>
  </tbody>
</table>
</div>

### AA.3.c 科目编码规则表

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">家族前缀</th>
      <th class="t3a-th">科目家族名称</th>
      <th class="t3a-th">编码结构规范</th>
      <th class="t3a-th">示例编码</th>
      <th class="t3a-th">层级定义与长度</th>
      <th class="t3a-th">关联财务主表</th>
    </tr>
    <tr>
      <td>6001/6401/6601/6111…</td>
      <td>利润表科目（会计准则科目编码）</td>
      <td>新企业会计准则科目编码（6001 营业收入/6401 营业成本/6601 销售费用/6602 管理费用/6603 研发费用/6604 财务费用/6111 投资收益/6801 所得税费用等）+ 4 位明细（如 640101）</td>
      <td>6001 营业收入 / 6601 销售费用</td>
      <td>用于编制软硬件销售收入、技术服务收入、制造成本、期间费用(销管研财)、税金及利润总额等损益要素。</td>
      <td>利润表 (Income Statement) / 综合经营透视表</td>
    </tr>
    <tr>
      <td>1001/1101/1601/2001…</td>
      <td>资产负债表科目（会计准则科目编码）</td>
      <td>新企业会计准则科目编码（1001 货币资金/1122 应收账款/1405 存货/1601 固定资产/2202 应付账款/4001 实收资本等）</td>
      <td>1001 货币资金 / 1601 固定资产</td>
      <td>用于编制期末货币资金、应收款项、存货、固定资产、在建工程、借款负债、应付款项及权益未分配利润。</td>
      <td>资产负债表 (Balance Sheet) / 资金出入池与资产配置表</td>
    </tr>
    <tr>
      <td>CF-</td>
      <td>现金流量表科目（直接法报表项目编号）</td>
      <td>CF-01~CF-26（现金流量表直接法报表项目编号）</td>
      <td>CF-01 销售商品提供劳务收到的现金 / CF-05 购买商品接受劳务支付的现金</td>
      <td>用于编制三大活动（经营、投资、筹资）现金流入与流出预算，实现期初期末现金勾稽闭环。</td>
      <td>现金流量表 (Cash Flow) / 资金出入池预算表 / 月度资金头寸表</td>
    </tr>
    <tr>
      <td>E</td>
      <td>费用与支出预算科目 (Expense &amp; CapEx Items)</td>
      <td>E + 2位中类 (+2位子目)（费用科目主数据，明细见 AA.3.b）</td>
      <td>E01 费用科目合计 / E0101 人员费用 / E0102 差旅费用</td>
      <td>费用科目用于业务部门按人员、差旅、外包、折旧、资产采购等编制预算，并按科目默认映射汇集至利润表/资产负债表/现金流量表。明细科目以 AA.3.b「费用明细科目(FY)」为准，不在总表重复列示。</td>
      <td>BB.5 期间费用(OPEX) / BB.4 资本性支出(CAPEX) / 利润表/资产负债表</td>
    </tr>
  </tbody>
</table>
</div>

## ③ 关键规则要点

**AA.3 统一科目体系**

- 三表科目按 (PL/BS/CF) 分家族编码并逐行对应报表行，表样「其中：」类子行用点号子编码（如 6001.1 主营业务收入）；费用科目 (FY) 单列 AA.3.b。科目是报表勾稽与费用归集的唯一口径来源。

## ④ 适用业务情形

**适用于**

- 统一会计科目体系维护，供三表取数与科目归属引用

**不适用于**

- 具体业务金额填报
