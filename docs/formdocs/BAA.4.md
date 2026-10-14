# BAA.4 服务物料定额标准

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

### BAA.4 服务物料定额标准

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">部件类别 (好件/坏件)</th>
      <th class="t3a-th">物料编码</th>
      <th class="t3a-th">物料名称</th>
      <th class="t3a-th">物料类型</th>
      <th class="t3a-th">计量单位</th>
      <th class="t3a-th">标准成本 (万元/标准单位)</th>
      <th class="t3a-th">核算说明</th>
    </tr>
    <tr>
      <td>好件</td>
      <td>MAT-OPT-001</td>
      <td>聚焦镜组</td>
      <td>光学件</td>
      <td>套</td>
      <td class="t3a-num">0.80</td>
      <td>整机光学系统耗用</td>
    </tr>
    <tr>
      <td>好件</td>
      <td>MAT-DRV-005</td>
      <td>伺服驱动组件</td>
      <td>核心部件</td>
      <td>台</td>
      <td class="t3a-num">2.50</td>
      <td>伺服进给系统耗用</td>
    </tr>
    <tr>
      <td>坏件</td>
      <td>MAT-RTN-001</td>
      <td>返修镜组</td>
      <td>返修件</td>
      <td>套</td>
      <td class="t3a-num">0.45</td>
      <td>售后返修置换</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 部件类别 | AB.6 物料好坏件字典 | 好件/坏件；同一物料可分别维护 |
| 物料编码 | AA.11 物料主数据 | 物料身份唯一来源，不区分法人 |
| 物料名称 | AA.11 物料主数据 | 按物料编码自动带出 |
| 物料类型 | AA.11 物料主数据 | 按物料编码自动带出 |
| 计量单位 | AA.11 物料主数据 | 按物料编码自动带出 |
| 标准成本 | 本表录入 | 万元/标准单位；不区分法人 |
| 核算说明 | 本表录入 | 物料耗用去向说明（如「整机光学系统耗用」），文本、非必输 |

## ③ 关键规则要点

**BAA.2/BAA.3/BAA.4 标准成本设置**

- 产品、工时、物料的标准成本口径均不区分法人，供各业务编制表统一引用计算毛利/成本。
- BAA.2产品标准成本设置：字段=产品、标准成本、备注；标准成本供完工生产成本计算（BB.2.1产量×BAA.2标准成本）、BB.1.2销售成本等按产品引用。

## ④ 适用业务情形

**适用于**

- 物料定额标准维护，供物料消耗测算引用

**不适用于**

- 具体领料金额填报（属 BAP.2/BB.4.1.c）
