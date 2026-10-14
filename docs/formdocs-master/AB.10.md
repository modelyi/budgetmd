# AB.10 资产账簿字典

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

### AB.10 资产账簿字典

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">账簿编码</th>
      <th class="t3a-th">账簿名称</th>
      <th class="t3a-th">默认标记</th>
      <th class="t3a-th">适用范围说明</th>
    </tr>
    <tr>
      <td>ABK-01</td>
      <td>甲资产账簿</td>
      <td>是</td>
      <td>默认账簿，用于全系统新增资产折旧参数计算</td>
    </tr>
    <tr>
      <td>ABK-02</td>
      <td>乙资产账簿</td>
      <td>否</td>
      <td>用于对应管理单元资产的折旧计提</td>
    </tr>
    <tr>
      <td>ABK-03</td>
      <td>丙资产账簿</td>
      <td>否</td>
      <td>用于对应管理单元资产的折旧计提</td>
    </tr>
    <tr>
      <td>ABK-04</td>
      <td>丁资产账簿</td>
      <td>否</td>
      <td>用于对应管理单元资产的折旧计提</td>
    </tr>
  </tbody>
</table>
</div>

资产账簿按法人公司设立（不考虑税账簿）；该默认资产账簿对应的折旧参数用于全系统新增资产折旧计算，存量资产直接按每条记录匹配的资产账簿折旧参数计算。

## ② 字段与值说明

| 字段 | 来源 | 说明 | 填报要求 |
| :--- | :--- | :--- | :--- |
| 账簿编码 | 本表维护 |  | 必输；手工填报 |
| 账簿名称 | 本表维护 |  | 必输；手工填报 |
| 默认标记 | 本表维护 | 全表只允许一个值是默认（是/否），默认账簿对应的折旧参数用于新增资产折旧计算 | 必输；下拉选择；全表仅一条为默认（是/否），默认账簿对应的折旧参数用于新增资产折旧计算 |
| 适用范围说明 | 本表维护 |  | 选填；手工填报 |

## ④ 适用业务情形

**适用于**

- 资产账簿字典维护（财务账簿/税账簿），供 BB.4.4 存量资产折旧计算表与 AA.9 资产类别与折旧按账簿区分折旧口径引用

**不适用于**

- 具体业务金额填报
