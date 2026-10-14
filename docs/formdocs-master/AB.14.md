# AB.14 费用属性字典

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

### AB.14 费用属性字典

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">费用属性编码</th>
      <th class="t3a-th">费用属性名称</th>
      <th class="t3a-th">适用范围与财务科目映射</th>
    </tr>
    <tr>
      <td>FEE-01</td>
      <td>销售费用</td>
      <td>销售活动相关费用，计入 6601 销售费用</td>
    </tr>
    <tr>
      <td>FEE-02</td>
      <td>管理费用</td>
      <td>行政管理部门费用，计入 6602 管理费用</td>
    </tr>
    <tr>
      <td>FEE-03</td>
      <td>研发费用</td>
      <td>研发活动费用，计入 6603 研发费用</td>
    </tr>
    <tr>
      <td>FEE-04</td>
      <td>直接制造费用</td>
      <td>直接计入产品制造成本的制造费用（如车间直接耗用的辅料、动力等）</td>
    </tr>
    <tr>
      <td>FEE-05</td>
      <td>间接制造费用</td>
      <td>需分摊计入产品制造成本的制造费用（如车间管理人员、折旧、水电等）</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 | 填报要求 |
| :--- | :--- | :--- | :--- |
| 费用属性编码 | 本表维护 | 固定值域字典；供各编制表「费用属性 / 费用归属」字段下拉引用 | 必输；手工填报；固定值域字典（销售费用/管理费用/研发费用/直接制造费用/间接制造费用），供各编制表「费用属性/费用归属」字段下拉引用，不可在编制表内新增值 |
| 费用属性名称 | 本表维护 | 可选值：销售费用 / 管理费用 / 研发费用 / 直接制造费用 / 间接制造费用 | 必输；手工填报 |
| 适用范围与财务科目映射 | 本表维护 | 说明该费用属性的业务含义及对应财务科目（销售费用→6601、管理费用→6602、研发费用→6603、直接制造费用/间接制造费用→制造费用） | 选填；手工填报 |

## ④ 适用业务情形

**适用于**

- 费用属性字典维护（销售费用/管理费用/研发费用/直接制造费用/间接制造费用），供各编制表「费用属性 / 费用归属」字段下拉引用，并映射对应财务科目（6601/6602/6603/制造费用）

**不适用于**

- 具体业务金额填报
