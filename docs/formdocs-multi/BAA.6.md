# BAA.6 办公场所租赁维护

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

### BAA.6.a 场所基本信息维护

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">场所编码</th>
      <th class="t3a-th">场所名称</th>
      <th class="t3a-th">地址</th>
      <th class="t3a-th">业主方(出租方)</th>
      <th class="t3a-th">总面积 (㎡)</th>
      <th class="t3a-th">启用状态</th>
      <th class="t3a-th">出租方类型</th>
      <th class="t3a-th">出租方名称</th>
    </tr>
    <tr>
      <td>SITE-001</td>
      <td>花果山园区</td>
      <td>上海市浦东新区花果山路 1888 号</td>
      <td>神盾局物业管理有限公司</td>
      <td class="t3a-num">12000</td>
      <td>启用</td>
      <td>内部持有</td>
      <td>甜甜圈集团公司</td>
    </tr>
    <tr>
      <td>SITE-002</td>
      <td>史塔克大厦</td>
      <td>上海市浦东新区史塔克工业园博云路 2 号</td>
      <td>瓦坎达置业集团</td>
      <td class="t3a-num">6800</td>
      <td>启用</td>
      <td>外部租入</td>
      <td>瓦坎达置业集团</td>
    </tr>
    <tr>
      <td>SITE-003</td>
      <td>瓦坎达科技园</td>
      <td>上海市瓦坎达科技园大道 1550 号</td>
      <td>瓦坎达产业区开发有限公司</td>
      <td class="t3a-num">24000</td>
      <td>停用</td>
      <td>外部租入</td>
      <td>瓦坎达产业区开发有限公司</td>
    </tr>
  </tbody>
</table>
</div>

### BAA.6.b 年度租赁面积维护

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">年度</th>
      <th class="t3a-th">场所选择</th>
      <th class="t3a-th">承租公司</th>
      <th class="t3a-th">租赁期间(起止)</th>
      <th class="t3a-th t3a-th--time">租赁面积 (㎡)</th>
      <th class="t3a-th t3a-th--time">单价(元/㎡·月)</th>
      <th class="t3a-th">备注说明</th>
    </tr>
    <tr>
      <td class="t3a-num">2027</td>
      <td>花果山园区</td>
      <td>甜甜圈集团公司</td>
      <td>2027/01/01-2029/12/31</td>
      <td class="t3a-num">8,000</td>
      <td class="t3a-num">120</td>
      <td>集团总部办公与研发；场所出租方类型=内部持有，单价取市场单价</td>
    </tr>
    <tr>
      <td class="t3a-num">2027</td>
      <td>花果山园区</td>
      <td>草莓慕斯公司</td>
      <td>2027/01/01-2029/12/31</td>
      <td class="t3a-num">4,000</td>
      <td class="t3a-num">120</td>
      <td>整机装配车间；场所出租方类型=内部持有，单价取市场单价</td>
    </tr>
  </tbody>
</table>
</div>

### BAA.6.c 场所法人比例查看

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">年度</th>
      <th class="t3a-th">场所</th>
      <th class="t3a-th">甜甜圈集团公司</th>
      <th class="t3a-th">草莓慕斯公司</th>
      <th class="t3a-th">蓝莓蛋挞公司</th>
      <th class="t3a-th">芒果班戟公司</th>
      <th class="t3a-th">西瓜泡芙公司</th>
      <th class="t3a-th">抹茶曲奇公司</th>
      <th class="t3a-th">樱桃华夫公司</th>
      <th class="t3a-th">椰香可露丽公司</th>
      <th class="t3a-th">海盐芝士公司</th>
      <th class="t3a-th">蜜桃千层公司</th>
      <th class="t3a-th">香橙舒芙蕾公司</th>
      <th class="t3a-th">青提马卡龙公司</th>
      <th class="t3a-th">合计</th>
    </tr>
    <tr>
      <td class="t3a-num">2027</td>
      <td>花果山园区</td>
      <td class="t3a-num">1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1</td>
    </tr>
    <tr>
      <td class="t3a-num">2027</td>
      <td>史塔克大厦</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1</td>
    </tr>
    <tr>
      <td class="t3a-num">2027</td>
      <td>瓦坎达科技园</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td class="t3a-num">1</td>
    </tr>
  </tbody>
</table>
</div>

### BAA.6.e 租赁折现率维护

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">年度</th>
      <th class="t3a-th">折现率 (%)</th>
      <th class="t3a-th">备注说明</th>
    </tr>
    <tr>
      <td class="t3a-num">2027</td>
      <td class="t3a-num">4.50%</td>
      <td>默认取 BF.3 综合融资成本（2027 年度 4.50%）；本表可按年度覆盖</td>
    </tr>
    <tr>
      <td class="t3a-num">2028</td>
      <td class="t3a-num">4.75%</td>
      <td>2028 年度预测折现率（示例行，仅示意按年度维护、逐年覆盖的口径）</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

**BAA.6.a 场所基本信息维护**

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 场所编码 | 本表录入 | 场所唯一编码（如 SITE-001），后勤人员维护 |
| 场所名称 | 本表录入 | 场所名称，供 BB.4.2.b 内部职场租赁按「场所」取面积与单价引用、供 BB.4.2.a 外部职场租赁取「场所」列取值域（BB.4.2.a 的租赁面积与合同单价按对外合同本表录入，不引用 BAA.6.b） |
| 地址 | 本表录入 | 场所详细地址 |
| 业主方(出租方) | 本表录入 | 场所产权方/业主信息（场所属性），仅人眼识别与核对 |
| 总面积 (㎡) | 本表录入 | 场所总建筑面积（㎡）；与 BAA.6.c 本公司面积/场所总面积 的占比计算基数 |
| 启用状态 | 本表录入 | 可选值：启用/停用；停用场所不再参与当年度租赁测算 |
| 出租方类型 | 本表录入 | 可选值：内部持有/外部租入；内部持有=集团内物业持有法人出租给内部法人（租金走 BB.4.2.b 内部职场租赁、参与集团合并抵销）；外部租入=向集团外第三方租入（租金走 BB.4.2.a 外部职场租赁、不参与合并抵销）。两套租赁口径分开，不得混用 |
| 出租方名称 | 本表录入 | 外部租入时填写外部第三方出租方名称（与 BB.4.2.a 外部职场租赁「出租方(外部第三方)」一致）；内部持有时填集团内物业持有法人；本列为「出租方类型=外部租入」时的必填项 |

**BAA.6.b 年度租赁面积维护**

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 年度 | 预算年度参数 | 按预算年度登记（本年度=2027）；与「场所×公司」共同构成面积与单价主键 |
| 场所选择 | BAA.6.a 场所基本信息维护 | 取自 BAA.6.a 已登记的场所（场所名称） |
| 承租公司 | AA.2 法人组织架构 | 本列登记该场所在本年度承租/使用的法人公司（与 BB.4.2.b 内部职场租赁「承租方(法人)」同口径）；本表仅登记出租方类型=内部持有的场所 |
| 租赁期间(起止) | 本表录入 | 租赁合同的起止日期区间（自由文本，如 2027/01/01-2029/12/31）；仅人眼识别，不参与判定与测算（与 AB.16 租赁期限字典口径无关） |
| 租赁面积 (㎡) | 本表录入 | 仅登记出租方类型=内部持有的场所面积与单价（内部租赁按法人分摊）：该公司在本场所的租赁面积（㎡），仅供 BB.4.2.b 内部职场租赁按「年度×场所×公司」带出；外部租入场所不在此维护、面积与单价由 BB.4.2.a 按对外合同直接录入 |
| 单价(元/㎡·月) | 本表录入 | 仅登记出租方类型=内部持有的场所面积与单价（内部租赁按法人分摊）：按「年度×场所×公司」维护内部场所单价（市场单价=内部定价基准），单位 元/㎡·月、精度 2 位小数；仅供 BB.4.2.b 内部职场租赁带出（内部租金 = 单价 × 租赁面积 ÷ 10000 × 当月在租期内）；外部租入场所不在此维护、合同单价由 BB.4.2.a 按对外合同直接录入 |
| 备注说明 | 本表录入 | 面积与单价口径说明（是否含物业费、合同约定期间等），仅人眼识别 |

**BAA.6.e 租赁折现率维护**

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 年度 | 预算年度参数 | 按预算年度登记；折现率随年度维护，可逐年覆盖 |
| 折现率(%) | 本表录入 | 默认取 BF.3 综合融资成本、可按年度覆盖；比例保留 2 位小数；供 BB.4.2.b.1 内部职场租赁·财务视角将租赁付款额折现（月折现率 = 年折现率 ÷ 12）计算租赁负债初始与各月利息费用 |
| 备注说明 | 本表录入 | 取值来源与覆盖说明（如「默认取 BF.3 综合融资成本」） |

## ③ 关键规则要点

**BAA.6 办公场所租赁维护**

- 本表由「办公场所租赁面积维护」更名为「办公场所租赁维护」，含四个子Tab（同页切换）：BAA.6.a 场所基本信息维护 / BAA.6.b 年度租赁面积维护 / BAA.6.c 场所法人比例查看 / BAA.6.e 租赁折现率维护（单价并入 BAA.6.b 维护，不再单独维护子表）。
- 维度与度量：①. a 维度=场所编码/场所名称/地址/业主方(出租方)/总面积(㎡)/启用状态；②. b 维度=年度/场所/承租公司/租赁期间(起止)/租赁面积(㎡)/单价(元/㎡·月)/备注说明（「租赁期间(起止)」= 租赁合同的起止日期区间，自由文本；仅人眼识别，不参与判定与测算，与 AB.16 租赁期限字典口径无关；「单价(元/㎡·月)」= 按「年度×场所×公司」维护的单价（精度 2 位小数），内部持有场所=市场单价（内部定价基准）；外部租入场所不在此维护）；③. c 维度=年度/场所×各法人公司，度量=面积占比(%)（合计恒为 100%）；④. e 维度=年度，度量=折现率(%)（精度 2 位小数）。
- 关键口径：场所法人比例仅供查看与核对、不由本表反算；单价在 BAA.6.b 按「年度×场所×公司」维护（单位 元/㎡·月），仅供 BB.4.2.b 内部职场租赁取面积与单价（内部租金 = 单价 × 租赁面积 ÷ 10000 × 当月在租期内；内部持有场所=市场单价）；BB.4.2.a 外部职场租赁的租赁面积与合同单价按对外租赁合同在本表直接录入、不引用 BAA.6.b；折现率默认取 BF.3 综合融资成本、可按年度覆盖，供 BB.4.2.b.1 内部职场租赁·财务视角折现计算租赁负债初始与各月利息。

## ④ 适用业务情形

**适用于**

- 办公场所租赁维护：场所基本信息、年度租赁面积与单价（单价并入年度租赁面积维护、仅登记出租方类型=内部持有的场所）、场所法人比例、租赁折现率四类参数维护，供内部职场租赁（BB.4.2.b/BB.4.2.b.1）与租赁费用测算引用（BB.4.2.a/BB.4.2.a.1 外部职场租赁只取「场所」与折现率，其租赁面积与合同单价按对外合同本表录入）

**不适用于**

- 内部租金、加成款的具体分摊与测算（属 BB.4.2.b / BB.4.2.b.1）
- 经营费用口径的租赁费用填报（属 BB.5.2）

## ⑤ 预算编制视角：数据关系总结

办公场所租赁维护：按年度维护场所（含业主方与总面积）、各法人公司在各场所（仅出租方类型=内部持有）的租赁面积、单价与面积占比、租赁折现率四组参数（单价并入年度租赁面积维护）；全部为职场租赁测算的参数入口（面积/单价/占比仅供内部租赁 BB.4.2.b；外部职场的租赁面积与合同单价不在此、由 BB.4.2.a 按对外合同录入），本表不生成会计分录。

**数据来源（上游）**

| 来源表 | 编码 | 取数字段 | 关系说明 |
| :--- | :--- | :--- | :--- |
| 综合融资成本 | BF.3 | 综合融资成本 | BAA.6.e 折现率默认取 BF.3 综合融资成本，可按年度在本表覆盖 |

**输出影响（下游）**

| 目标报表 | 取数路径 |
| :--- | :--- |
| BB.4.2.b 内部职场租赁 | 租赁面积与单价取自 BAA.6.b、面积占比取自 BAA.6.c（均按「年度×场所×公司」带出、仅内部持有场所；外部职场的租赁面积与合同单价不在此、由 BB.4.2.a 按对外合同本表录入），用于测算内部租金与加成款 |
| BB.4.2.b.1 内部职场租赁·财务视角 | 折现率取 BAA.6.e（按年度带出），用于将租赁付款额折现计算租赁负债初始与各月利息费用 |

**关键编制规则**

- 场所与租赁面积参数表本身不按法人编制；面积占比（BAA.6.c）仅供查看与核对，不由本表反算。
