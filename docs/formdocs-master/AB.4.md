# AB.4 收入确认方式字典

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

### AB.4 收入确认方式字典

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">编码</th>
      <th class="t3a-th">方式名</th>
      <th class="t3a-th">准则分类(时点/时段)</th>
      <th class="t3a-th">月度分摆逻辑</th>
      <th class="t3a-th">备注</th>
      <th class="t3a-th">引用说明</th>
    </tr>
    <tr>
      <td>RM-01</td>
      <td>验收一次性</td>
      <td>时点法</td>
      <td>一次性确认（验收当月全额确认）</td>
      <td>客户验收合格时点全额确认收入，不产生合同资产/负债，按合同签收当月集中确认</td>
      <td>BB.1.2 存量订单执行；BB.1.3 技术服务收入与成本预算；AM.1 产品类别与收入映射；BO.A.2/BO.A.3 利润表</td>
    </tr>
    <tr>
      <td>RM-02</td>
      <td>直线法</td>
      <td>时段法</td>
      <td>按月均摊（合同服务期内等额分摊）</td>
      <td>服务/维保合同按服务期均摊收入，产生合同资产（已履约未收款）或合同负债（已收款未履约）</td>
      <td>BB.1.2 存量订单执行；BB.1.3 技术服务收入与成本预算；AM.1 产品类别与收入映射；BO.A.2/BO.A.3 利润表</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 | 填报要求 |
| :--- | :--- | :--- | :--- |
| 编码 | 本表维护 |  | 必输；手工填报；为固定值域字典，供对应编制表下拉引用，不可在编制表内新增值 |
| 方式名 | 本表维护 |  | 必输；手工填报 |
| 准则分类(时点/时段) | 本表维护 |  | 必输；下拉选择 |
| 月度分摆逻辑 | 本表维护 |  | 选填；手工填报 |

## ④ 适用业务情形

**适用于**

- 收入确认方式字典维护，供收入确认方式下拉引用

**不适用于**

- 具体业务金额填报
