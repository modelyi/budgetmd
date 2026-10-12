# AB.12 职级字典

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

### AB.12 职级字典

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">职级编码</th>
      <th class="t3a-th">职级名称</th>
      <th class="t3a-th">状态</th>
      <th class="t3a-th">职级说明</th>
    </tr>
    <tr>
      <td>RANK-01</td>
      <td>职级1</td>
      <td>启用</td>
      <td>初级职级</td>
    </tr>
    <tr>
      <td>RANK-02</td>
      <td>职级2</td>
      <td>启用</td>
      <td>中级职级</td>
    </tr>
    <tr>
      <td>RANK-03</td>
      <td>T1</td>
      <td>启用</td>
      <td>技术序列一级</td>
    </tr>
    <tr>
      <td>RANK-04</td>
      <td>T2</td>
      <td>启用</td>
      <td>技术序列二级</td>
    </tr>
    <tr>
      <td>RANK-05</td>
      <td>T3</td>
      <td>启用</td>
      <td>技术序列三级</td>
    </tr>
    <tr>
      <td>RANK-06</td>
      <td>T4</td>
      <td>启用</td>
      <td>技术序列四级</td>
    </tr>
    <tr>
      <td>RANK-07</td>
      <td>T5</td>
      <td>启用</td>
      <td>技术序列五级</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 职级编码 | 本表维护 | 示例编码规则 RANK-01 起；具体职级值见本字典 |
| 职级名称 | 本表维护 | 可选值：职级1/职级2/T1/T2/T3/T4/T5 |
| 状态 | 本表维护 | 启用/停用 |
| 职级说明 | 本表维护 |  |

## ③ 关键规则要点

**AB.12 职级**

- 职级(AB.12)为新增业务字典，供 BAA.3 费率设置及 BB.1.3 技术服务人工明细统一引用；职级为示例值，系统不做表与表之间的值域严格校验；费率匹配按示例值演示。

## ④ 适用业务情形

**适用于**

- 职级字典维护，供 BAA.3 岗位工时费率设置及 BB.1.3 技术服务人工明细职级字段引用；岗位与职级均为示例值，系统不做表与表之间的值域严格校验；费率匹配按示例值演示

**不适用于**

- 具体业务金额填报
