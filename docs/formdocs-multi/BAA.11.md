# BAA.11 关联交易加成比例

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

### BAA.11 关联交易加成比例

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">内部交易类型</th>
      <th class="t3a-th">预算项目</th>
      <th class="t3a-th">加成比例</th>
    </tr>
    <tr>
      <td>代采购物料</td>
      <td>P1 高功率平板光纤激光切割机</td>
      <td class="t3a-num">10.00%</td>
    </tr>
    <tr>
      <td>代采购资产</td>
      <td>P2 三维五轴激光切管机</td>
      <td class="t3a-num">8.00%</td>
    </tr>
    <tr>
      <td>内部销售</td>
      <td>集团统筹</td>
      <td class="t3a-num">5.00%</td>
    </tr>
    <tr>
      <td>内部职场租赁</td>
      <td>集团统筹</td>
      <td class="t3a-num">5.00%</td>
    </tr>
    <tr>
      <td>资产转卖</td>
      <td>整机出厂检测与样件实验室改造</td>
      <td class="t3a-num">5.00%</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 内部交易类型 | 本表枚举 | 五大内部关联交易类型：代采购物料 / 代采购资产 / 内部职场租赁 / 资产转卖 / 内部销售 |
| 预算项目 | AA.6 预算项目主数据 | 关联交易加成比例适用的预算项目，支持不同项目制定差异化公允加成率 |
| 加成比例(%) | 本表录入 | 内部交易定价加成比例（百分比，保留2位小数），供下游各关联交易表自动带出 |

## ④ 适用业务情形

**适用于**

- 集团制定与维护跨法人关联交易转移定价政策与加成比例参数
- 下游各业务表（采购、资产、租赁、转卖）跨法人交易时的加成自动带出与金额测算

**不适用于**

- 同一法人内部部门之间、车间之间的物料与资产调拨（平价流转，不计加成）
- 对外部独立第三方的商品销售与采购定价（随市场商业合同执行）

## ⑤ 预算编制视角：数据关系总结

本表作为集团内部交易定价的顶层参数表，向上引用预算项目主数据，向下为五张关联交易表提供加成比例，驱动各表测算内部加成款与合并抵销金额。

**数据来源（上游）**

| 来源表 | 编码 | 取数字段 | 关系说明 |
| :--- | :--- | :--- | :--- |
| 预算项目主数据 | AA.6 | 预算项目编码、项目名称 | 提供预算项目下拉值域，支持分项目维护加成比例 |

**输出影响（下游）**

| 目标报表 | 取数路径 |
| :--- | :--- |
| BB.3.3.D / BJ.C.a 代采购物料 | 带出物料代采购加成比例，计算代采加成款 |
| BB.3.1.D / BJ.C.e 代采购资产 | 带出设备代采购加成比例，计算设备加成原值 |
| BJ.C.d 资产转卖预算表 | 带出二手设备转卖加成比例，计算卖方加成收益 |
| BB.4.2.b 内部职场租赁 | 带出职场租赁加成比例，计算内部租金加成款 |
| BJ.C.g / BB.1.2.d 内部产品销售 | 带出内部产品购销加成比例，确定内部销售定价 |

## ⑥ 财务报表项转换规则

本表共用口径：加成参数是连接单体公允核算与集团合并抵销的计算基准；本表为纯参数表，不直接生成凭证，分录在下游业务交易表生成。

**报表取数**

| 度量/报表项 | 取数字段 | 损益表 PL | 资产负债表 BS | 现金流量表 CF |
| :--- | :--- | :--- | :--- | :--- |
| 加成比例参数应用与驱动 | BAA.11·加成比例(%) | 本表本身不生成分录；下游交易表引用本参数后，卖方确认 其他业务收入 / 内部销售收入，合并层全额抵销 | 下游买方将加成计入存货或固定资产原值，合并层由 BO.ELIM 调减未实现加成 | 加成款随月度内部结算统一收付，合并层现金流收付等额对冲 |

**科目（报表项）入账**

| 度量/报表项 | 借 | 贷 |
| :--- | :--- | :--- |
| 加成比例参数应用与驱动 | — | — |
