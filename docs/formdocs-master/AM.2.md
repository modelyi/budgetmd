# AM.2 部门属性映射表

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

### AM.2 部门属性映射表

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">部门</th>
      <th class="t3a-th">费用属性</th>
      <th class="t3a-th">备注说明</th>
    </tr>
    <tr>
      <td>销售一部</td>
      <td>销售费用</td>
      <td>面向华东区整机台销售，费用属性带出为销售费用</td>
    </tr>
    <tr>
      <td>研发中心</td>
      <td>研发费用</td>
      <td>产品研发与工艺预研，费用属性带出为研发费用</td>
    </tr>
    <tr>
      <td>制造工程部</td>
      <td>直接制造费用</td>
      <td>整机总装与工艺制造直接耗用，费用属性带出为直接制造费用</td>
    </tr>
    <tr>
      <td>设备动力部</td>
      <td>间接制造费用</td>
      <td>设备维护与动力等需分摊的制造费用，费用属性带出为间接制造费用</td>
    </tr>
    <tr>
      <td>采购与供应链管理部</td>
      <td>管理费用</td>
      <td>职能管理单元，费用属性带出为管理费用</td>
    </tr>
  </tbody>
</table>
</div>

按二级/三级部门维护费用属性（基于 AB.14 费用属性字典），供 BAA.8 按部门自动带出费用性质，可人工修改；二级/三级部门维护费用属性映射，一级部门不维护。

## ② 字段与值说明

| 字段 | 来源 | 说明 | 填报要求 |
| :--- | :--- | :--- | :--- |
| 部门 | AA.5 行政部门主数据字典 | 二级/三级部门维护费用属性映射，一级部门不维护 | 必输；下拉选择；二级/三级部门维护费用属性映射，一级部门不维护 |
| 费用属性 | AB.14 费用属性字典 | 可选值：销售费用/管理费用/研发费用/直接制造费用/间接制造费用；供BAA.8按部门自动带出 | 必输；下拉选择；可由人工修改；供 BAA.8 按部门自动带出费用性质 |

## ④ 适用业务情形

**适用于**

- 二级/三级部门与费用性质（销售/管理/研发/制造）的映射维护，供 BAA.8 费用性质按部门带出引用

**不适用于**

- 具体业务金额填报
