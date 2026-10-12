# BAP.3 物料消耗需求汇总表_研发长期

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

### BAP.3 物料消耗需求汇总表_研发长期

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th" rowspan="2">预算部门</th>
      <th class="t3a-th" rowspan="2">物料编码</th>
      <th class="t3a-th" rowspan="2">物料名称</th>
      <th class="t3a-th" rowspan="2">物料类别</th>
      <th class="t3a-th t3a-th--time" rowspan="2">【全年合计】</th>
      <th class="t3a-th" rowspan="2">1月</th>
      <th class="t3a-th" rowspan="2">2月</th>
      <th class="t3a-th" rowspan="2">3月</th>
      <th class="t3a-th" rowspan="2">4月</th>
      <th class="t3a-th" rowspan="2">5月</th>
      <th class="t3a-th" rowspan="2">6月</th>
      <th class="t3a-th" rowspan="2">7月</th>
      <th class="t3a-th" rowspan="2">8月</th>
      <th class="t3a-th" rowspan="2">9月</th>
      <th class="t3a-th" rowspan="2">10月</th>
      <th class="t3a-th" rowspan="2">11月</th>
      <th class="t3a-th" rowspan="2">12月</th>
      <th class="t3a-th" rowspan="2">备注说明</th>
    </tr>
    <tr>
    </tr>
    <tr>
      <td>研发中心</td>
      <td>MAT-OPT-001</td>
      <td>聚焦镜组</td>
      <td>研发物料</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.4</td>
      <td>光学系统样机验证消耗</td>
    </tr>
    <tr>
      <td>研发中心</td>
      <td>MAT-DRV-005</td>
      <td>伺服驱动组件</td>
      <td>研发物料</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.5</td>
      <td>运动控制台架测试</td>
    </tr>
    <tr>
      <td>制造工程部</td>
      <td>MAT-COL-006</td>
      <td>循环机组组件</td>
      <td>研发物料</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.6</td>
      <td>热管理验证平台</td>
    </tr>
  </tbody>
</table>
</div>

## 表概述

物料消耗需求汇总表_研发长期，表样逻辑与BAP.2一致，维度=预算部门/物料编码/物料名称/物料类别（固定「研发物料」，关联AB.9存货物料类别字典）。定位是先在需求采集模块做「研发长期物料消耗需求采集」再抽取汇总；配套的前置模块尚未开发，本表当前暂无实际数据来源，暂不参与BB.3.X进销存表与BB.3.3物料采购预算取数。不生成分录，不设「法人公司」维度、不做拆分。

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 预算部门 | AA.5 行政部门主数据字典（一级部门-二级部门） | 研发长期物料消耗需求归属的预算部门，默认明细到二级部门 |
| 物料编码 | AA.11 物料主数据 | 研发长期消耗物料编码，从物料主数据选择 |
| 物料名称 | AA.11 物料主数据 | 按物料编码自动带出 |
| 物料类别 | AB.9 存货物料类别字典 | 固定值「研发物料」：本表仅承载研发长期物料消耗需求，物料类别恒为研发物料，不可修改 |
| 月度消耗金额 | 本表录入 | 按月手工填报；全年合计=SUM(1~12月)；金额不含税、单位万元、精度 0.1 |
| 全年合计 | 本表公式 | =SUM(1~12月消耗金额) |
| 备注说明 | 本表录入 | 补充研发长期物料消耗的业务假设或特殊事项 |

## ③ 关键规则要点

**BAP.3 物料消耗需求汇总表_研发长期**

- 归属编制前提(BAP)；表样逻辑与BAP.2一致（维度=预算部门、物料编码、物料名称、物料类别（固定「研发物料」，关联 AB.9 存货物料类别字典）；度量=全年合计+1~12月分月金额）。
- 核心定位：需要在需求采集模块专门做「研发长期物料消耗需求采集」功能，待研发长期物料消耗需求数据采集后，再抽取汇总生成此表。
- 物料类别固定为「研发物料」（关联 AB.9 存货物料类别字典），本表仅承载研发长期物料消耗需求、不承载其他物料类别消耗，无需逐行判断。

## ④ 适用业务情形

**适用于**

- 研发长期物料消耗需求汇总（表样占位；前置模块未开发，暂无数据来源）

**不适用于**

- 生产/销售/管理类物料消耗（属 BAP.2）
