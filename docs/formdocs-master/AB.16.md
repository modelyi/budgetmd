# AB.16 租赁期限字典

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

### AB.16 租赁期限字典

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">租赁期限编码</th>
      <th class="t3a-th">租赁期限名称</th>
      <th class="t3a-th">适用范围与资本化判定说明</th>
    </tr>
    <tr>
      <td>LSE-01</td>
      <td>一年以内</td>
      <td>租赁期限 ≤ 12 个月（含 12 个月）→ 费用化：不确认使用权资产与租赁负债，租金按用途直接进损益（外部租赁进 BB.4.2.a 月租金、内部租赁进 BB.4.2.b 内部租金），不进资本化测算表。</td>
    </tr>
    <tr>
      <td>LSE-02</td>
      <td>一年以上</td>
      <td>租赁期限 &gt; 12 个月 → 资本化：确认使用权资产 1621 与租赁负债 2602，进资本化测算表（外部 BB.4.2.a.1 / 内部 BB.4.2.b.1）。</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 租赁期限编码 | 本表维护 | 固定值域字典；供 BB.4.2.a 外部职场租赁与 BB.4.2.b 内部职场租赁「租赁期限」列共同引用，不可在编制表内新增值 |
| 租赁期限名称 | 本表维护 | 可选值：一年以内 / 一年以上（边界＝租赁期限月数：≤12 个月→一年以内＝费用化；>12 个月→一年以上＝资本化） |
| 适用范围与资本化判定说明 | 本表维护 | 取值边界：租赁期限月数 ≤12 个月→一年以内（费用化）；>12 个月→一年以上（资本化）；与③资本化判据一一对应。判定结果口径：一年以上→资本化（形成使用权资产 1621 与租赁负债 2602，由 BB.4.2.b.1 / BB.4.2.a.1 按月测算折旧与利息）；一年以下（含 12 个月）→费用化（月租金直接进费用，不形成使用权资产、不确认租赁负债） |

## ④ 适用业务情形

**适用于**

- 租赁期限字典维护（一年以内/一年以上），供 BB.4.2.a 外部职场租赁与 BB.4.2.b 内部职场租赁「租赁期限」列共同引用；系统按「租赁期终止月 − 租赁期起始月 + 1」的月数自动落档、不可手工选，并作为资本化判定依据（≤12 个月→一年以内＝费用化、>12 个月→一年以上＝资本化）——结果口径：一年以上→资本化（形成使用权资产 1621 与租赁负债 2602，由 BB.4.2.b.1 / BB.4.2.a.1 按月测算利息与负债（折旧由 BB.4.5 计提））；一年以下（含 12 个月）→费用化（月租金直接进费用，不形成使用权资产、不确认租赁负债）；两张登记表的「租赁类型」列由本档位派生、系统带出、不可手工改

**不适用于**

- 具体合同与金额填报（属 BB.4.2.a 外部职场租赁 / BB.4.2.b 内部职场租赁）
- 租赁类型（资本化/费用化）字段本身的取值（属两张登记表）
