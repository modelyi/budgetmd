# AB.13 授信类型字典

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

### AB.13 授信类型字典

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">授信类型编码</th>
      <th class="t3a-th">授信类型名称</th>
      <th class="t3a-th">状态</th>
      <th class="t3a-th">适用范围说明</th>
    </tr>
    <tr>
      <td>CT-01</td>
      <td>流动资金贷款</td>
      <td>启用</td>
      <td>企业日常经营周转所需流动资金借款授信</td>
    </tr>
    <tr>
      <td>CT-02</td>
      <td>并购贷款</td>
      <td>启用</td>
      <td>并购交易融资授信</td>
    </tr>
    <tr>
      <td>CT-03</td>
      <td>固定资产贷款</td>
      <td>启用</td>
      <td>固定资产（设备、厂房等）购建项目贷款授信</td>
    </tr>
    <tr>
      <td>CT-04</td>
      <td>债券</td>
      <td>启用</td>
      <td>债券承销 / 发行授信</td>
    </tr>
    <tr>
      <td>CT-05</td>
      <td>供应链融资</td>
      <td>启用</td>
      <td>供应链金融（应付账款融资、保理等）授信</td>
    </tr>
    <tr>
      <td>CT-06</td>
      <td>贸易融资</td>
      <td>启用</td>
      <td>贸易融资（信用证、押汇等）授信</td>
    </tr>
    <tr>
      <td>CT-07</td>
      <td>其他授信</td>
      <td>启用</td>
      <td>其他综合授信品种</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 | 填报要求 |
| :--- | :--- | :--- | :--- |
| 授信类型编码 | 本表维护 | 固定值域字典；供 BF.3.e 授信预算表「授信类型」字段下拉引用，不可在编制表内新增值 | 必输；手工填报；固定值域字典（流动资金贷款/并购贷款/固定资产贷款/债券/供应链融资/贸易融资/其他授信），供 BF.3.e 授信预算表「授信类型」字段下拉引用，不可在编制表内新增值 |
| 授信类型名称 | 本表维护 | 可选值：流动资金贷款/并购贷款/固定资产贷款/债券/供应链融资/贸易融资/其他授信 | 必输；手工填报 |
| 状态 | 本表维护 | 启用/停用 | 必输；下拉选择 |
| 适用范围说明 | 本表维护 | 说明该授信类型的适用业务场景 | 选填；手工填报 |

## ④ 适用业务情形

**适用于**

- 授信类型字典维护（流动资金贷款/并购贷款/固定资产贷款/债券/供应链融资/贸易融资/其他授信），供 BF.3.e 授信预算表「授信类型」字段下拉引用

**不适用于**

- 具体业务金额填报
