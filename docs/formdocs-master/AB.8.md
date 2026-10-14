# AB.8 客户类型业务字典

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

### AB.8 客户类型业务字典

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">编码</th>
      <th class="t3a-th">客户类型</th>
      <th class="t3a-th">备注</th>
    </tr>
    <tr>
      <td>CT-01</td>
      <td>一级销售</td>
      <td>一级销售预算客户分类</td>
    </tr>
    <tr>
      <td>CT-02</td>
      <td>战略客户</td>
      <td>重点战略合作客户</td>
    </tr>
    <tr>
      <td>CT-03</td>
      <td>普通客户</td>
      <td>常规销售客户</td>
    </tr>
    <tr>
      <td>CT-04</td>
      <td>集团内部关联方</td>
      <td>集团内部交易客户</td>
    </tr>
    <tr>
      <td>CT-99</td>
      <td>不分类型</td>
      <td>暂未完成客户分类时的统一兜底值</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 编码 | 本表维护 |  |
| 客户类型 | 本表维护 |  |

## ④ 适用业务情形

**适用于**

- 客户类型业务字典维护，供客户类型下拉引用

**不适用于**

- 具体业务金额填报
