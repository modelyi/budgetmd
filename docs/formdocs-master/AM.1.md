# AM.1 产品与收入方式映射

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

### AM.1 产品类别（财务口径）与收入映射

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">产品编码</th>
      <th class="t3a-th">产品类别（财务口径）名</th>
      <th class="t3a-th">默认收入确认方式</th>
      <th class="t3a-th">方式编码</th>
      <th class="t3a-th">准则分类</th>
      <th class="t3a-th">月度分摆逻辑</th>
      <th class="t3a-th">标准成本率(%)</th>
      <th class="t3a-th">毛利率(%)</th>
      <th class="t3a-th">映射说明</th>
    </tr>
    <tr>
      <td>PC-S01</td>
      <td>整机台+验收款</td>
      <td>验收一次性</td>
      <td>RM-01</td>
      <td>时点法</td>
      <td>一次性确认（验收当月全额确认）</td>
      <td class="t3a-num">44</td>
      <td class="t3a-num">56</td>
      <td>整机台设备验收合格当月一次性确认收入（时点法），毛利率56%</td>
    </tr>
    <tr>
      <td>PC-S02</td>
      <td>关键模组+验收款</td>
      <td>验收一次性</td>
      <td>RM-01</td>
      <td>时点法</td>
      <td>一次性确认（验收当月全额确认）</td>
      <td class="t3a-num">48</td>
      <td class="t3a-num">52</td>
      <td>核心子系统模组现场测试合格验收当月确认收入，毛利率52%</td>
    </tr>
    <tr>
      <td>PC-S03</td>
      <td>零部件耗材+交付款</td>
      <td>验收一次性</td>
      <td>RM-01</td>
      <td>时点法</td>
      <td>一次性确认（验收当月全额确认）</td>
      <td class="t3a-num">52</td>
      <td class="t3a-num">48</td>
      <td>标准零部件与耗材交付签收当月一次性确认收入，毛利率48%</td>
    </tr>
    <tr>
      <td>PC-S04</td>
      <td>软件授权+授权款</td>
      <td>验收一次性</td>
      <td>RM-01</td>
      <td>时点法</td>
      <td>一次性确认（验收当月全额确认）</td>
      <td class="t3a-num">18</td>
      <td class="t3a-num">82</td>
      <td>软件授权与 Key 下发，上线验收一次性确认收入，毛利率82%</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 产品编码 | AA.7 预算产品主数据 |  |
| 默认收入确认方式 | AB.4 收入确认方式字典 |  |
| 标准成本率(%) | 本表维护 |  |
| 毛利率(%) | 本表公式 | =1-标准成本率 |

## ③ 关键规则要点

**AM.1 产品与收入方式映射**

- 按产品自动带出收入确认方式与标准成本率，供BB.1.1/BB.1.2等销售表默认取值。

## ④ 适用业务情形

**适用于**

- 产品与收入确认方式的映射关系维护，供收入确认引用

**不适用于**

- 具体业务金额填报
