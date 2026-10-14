# AB.6 物料好坏件字典

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

### AB.6 物料好坏件字典

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">编码</th>
      <th class="t3a-th">好坏件</th>
      <th class="t3a-th">成本方向</th>
      <th class="t3a-th">业务含义说明</th>
      <th class="t3a-th">物料成本计算口径</th>
      <th class="t3a-th">引用表单</th>
    </tr>
    <tr>
      <td>MQ-01</td>
      <td>好件</td>
      <td>正向计入（+）</td>
      <td>正品物料，正常投入服务作业消耗，物料成本正向计入服务成本</td>
      <td>好件物料成本 = Σ(好件数量 × 物料标准成本)</td>
      <td>BB.1.3-③ 服务收入与成本预算附表_物料明细填报；BB.1.3-② 服务销售收入与成本预算_财务视角（物料成本列）</td>
    </tr>
    <tr>
      <td>MQ-02</td>
      <td>坏件</td>
      <td>反向抵减（-）</td>
      <td>更换下来的旧件/缺陷件，核销或退库后可抵减当期物料成本，物料成本反向抵减</td>
      <td>坏件抵减 = Σ(坏件数量 × 物料标准成本)；净物料成本 = 好件成本 - 坏件抵减</td>
      <td>BB.1.3-③ 服务收入与成本预算附表_物料明细填报；BB.1.3-② 服务销售收入与成本预算_财务视角（物料成本列）</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 | 填报要求 |
| :--- | :--- | :--- | :--- |
| 编码 | 本表维护 |  | 必输；手工填报；为固定值域字典，供对应编制表下拉引用，不可在编制表内新增值 |
| 好坏件 | 本表维护 | 好件/坏件 | 必输；下拉选择 |
| 成本方向 | 本表维护 |  | 必输；下拉选择 |

## ④ 适用业务情形

**适用于**

- 物料好坏件字典维护，供物料领料好坏件分类引用

**不适用于**

- 具体业务金额填报
