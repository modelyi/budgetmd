# BAA.8 经营费用转换比例表

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

### BAA.8 经营费用转换比例表

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">预算项目</th>
      <th class="t3a-th">部门</th>
      <th class="t3a-th">费用科目</th>
      <th class="t3a-th">费用性质</th>
      <th class="t3a-th">甜甜圈集团公司</th>
      <th class="t3a-th">草莓慕斯公司</th>
      <th class="t3a-th">蓝莓蛋挞公司</th>
      <th class="t3a-th">芒果班戟公司</th>
      <th class="t3a-th">西瓜泡芙公司</th>
      <th class="t3a-th">抹茶曲奇公司</th>
      <th class="t3a-th">樱桃华夫公司</th>
      <th class="t3a-th">椰香可露丽公司</th>
      <th class="t3a-th">海盐芝士公司</th>
      <th class="t3a-th">蜜桃千层公司</th>
      <th class="t3a-th">香橙舒芙蕾公司</th>
      <th class="t3a-th">青提马卡龙公司</th>
      <th class="t3a-th">合计</th>
    </tr>
    <tr>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>销售一部</td>
      <td>差旅费</td>
      <td>销售费用</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1</td>
    </tr>
    <tr>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>研发中心</td>
      <td>广告费</td>
      <td>销售费用</td>
      <td class="t3a-num">1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1</td>
    </tr>
    <tr>
      <td>集团统筹</td>
      <td>制造工程部</td>
      <td>佣金</td>
      <td>销售费用</td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 预算项目 | AA.6 预算项目主数据字典 | 部分项目（如产能项目、产品化项目）不归属到具体部门 |
| 部门 | AA.5 行政部门主数据字典（一级部门-二级部门） | 编到二级部门；不归属具体部门的项目可为空 |
| 费用科目 | BA.5 费用预算汇总表 | 与费用预算汇总表科目口径一致；支持用户选择 ALL（全部科目统一适用当前转换比例，无需按明细科目逐行维护） |
| 费用性质 | AM.2 部门属性映射表（按部门自动带出，可人工修改） | 可选值：销售费用/管理费用/研发费用/直接制造费用/间接制造费用；二级/三级部门维护费用属性映射，一级部门不维护；部门为空的项目需人工选择 |
| 法人公司占比 | 本表录入 | 按法人公司逐列填写占比，各法人占比加和必须等于100% |

## ④ 适用业务情形

**适用于**

- 预算项目金额按费用性质转换到销售/管理/研发/制造四类费用及法人拆分的比例维护，供 BB.5.2 计算引用

**不适用于**

- 费用金额填报（属 BA.5）
