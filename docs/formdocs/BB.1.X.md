# BB.1.X 销售预算多维汇总分析 (经营)

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

### BB.1.X.a 透视基表（客户×项目×产品×部门）

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">客户</th>
      <th class="t3a-th">项目</th>
      <th class="t3a-th">产品</th>
      <th class="t3a-th">部门</th>
      <th class="t3a-th">收入</th>
      <th class="t3a-th">成本</th>
      <th class="t3a-th">毛利润</th>
      <th class="t3a-th">销售直接费用</th>
      <th class="t3a-th">贡献利润</th>
    </tr>
    <tr>
      <td>华山派剑器工坊</td>
      <td>华山派剑器B17一期交付项目</td>
      <td>高功率光纤激光切割机整机系统</td>
      <td>销售一部</td>
      <td class="t3a-num">830.0</td>
      <td class="t3a-num">515.0</td>
      <td class="t3a-num">315.0</td>
      <td class="t3a-num">108.0</td>
      <td class="t3a-num">207.0</td>
    </tr>
    <tr>
      <td>华山派剑器工坊</td>
      <td>华山派剑器M9产线升级项目</td>
      <td>三维五轴激光切管机</td>
      <td>销售一部</td>
      <td class="t3a-num">700.0</td>
      <td class="t3a-num">434.0</td>
      <td class="t3a-num">266.0</td>
      <td class="t3a-num">91.0</td>
      <td class="t3a-num">175.0</td>
    </tr>
    <tr>
      <td>少林寺武备坊</td>
      <td>少林寺武备坊工坊12A装备交付项目</td>
      <td>高功率光纤激光切割机整机系统</td>
      <td>销售二部</td>
      <td class="t3a-num">1,125.0</td>
      <td class="t3a-num">698.0</td>
      <td class="t3a-num">427.0</td>
      <td class="t3a-num">146.0</td>
      <td class="t3a-num">281.0</td>
    </tr>
    <tr>
      <td>武当山玄铁工坊</td>
      <td>武当山玄铁工坊T9产线调优项目</td>
      <td>三维五轴激光切管机</td>
      <td>销售二部</td>
      <td class="t3a-num">885.0</td>
      <td class="t3a-num">549.0</td>
      <td class="t3a-num">336.0</td>
      <td class="t3a-num">115.0</td>
      <td class="t3a-num">221.0</td>
    </tr>
    <tr>
      <td>松鼠仓储食品科技</td>
      <td>松鼠存储高精度核心子模块备件包</td>
      <td>高精度光学光束整形准直模组</td>
      <td>销售一部</td>
      <td class="t3a-num">622.0</td>
      <td class="t3a-num">386.0</td>
      <td class="t3a-num">236.0</td>
      <td class="t3a-num">81.0</td>
      <td class="t3a-num">155.0</td>
    </tr>
    <tr>
      <td>少林寺武备坊</td>
      <td>少林寺武备坊仓储机器人产线项目</td>
      <td>高精度光学光束整形准直模组</td>
      <td>销售二部</td>
      <td class="t3a-num">540.0</td>
      <td class="t3a-num">335.0</td>
      <td class="t3a-num">205.0</td>
      <td class="t3a-num">70.0</td>
      <td class="t3a-num">135.0</td>
    </tr>
  </tbody>
</table>
</div>

## ③ 关键规则要点

## ④ 适用业务情形

**适用于**

- 销售预算按客户/项目/产品/部门多维透视基表（BB.1.X.a），以及 Excel 式交互透视表（BB.1.X.b，可切换客户/项目/产品/部门行维度汇总收入/成本/毛利/销售费用/贡献利润），经营分析用、不区分法人

**不适用于**

- 财务三表（属 BO.PL/BS/CF）

## ⑤ 预算编制视角：数据关系总结

经营分析用报表，不区分法人、不涉及预算三表的引用与计算；以透视基表与 Excel 式交互透视表按客户/项目/产品/部门维度汇总销售成果（收入、成本、毛利润、销售直接费用、贡献利润），其中「销售直接费用」列明确取自 BB.1.4。

**数据来源（上游）**

| 来源表 | 编码 | 取数字段 | 关系说明 |
| :--- | :--- | :--- | :--- |
| 销售费用预算明细表 | BB.1.4 | 销售直接费用（差旅/招待/广告/佣金等费用科目） | 按产品/客户/区域/项目/预算部门/费用科目汇总（跨费用科目合计）→ BB.1.X「销售直接费用」列 |
