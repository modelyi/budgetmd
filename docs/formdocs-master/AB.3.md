# AB.3 产品类别（财务口径）字典

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

### AB.3 产品类别（财务口径）字典

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">编码</th>
      <th class="t3a-th">产品类别（财务口径）名</th>
      <th class="t3a-th">默认收入确认方式</th>
      <th class="t3a-th">成本率%</th>
      <th class="t3a-th">备注</th>
      <th class="t3a-th">引用说明</th>
    </tr>
    <tr>
      <td>PC-01</td>
      <td>整机台+验收款</td>
      <td>验收一次性</td>
      <td class="t3a-num">44</td>
      <td>整机台设备验收合格当月一次性确认收入（时点法）；毛利率56%</td>
      <td>BB.1.3 技术服务收入与成本预算；BB.2.1 生产计划；AM.1 产品类别与收入映射</td>
    </tr>
    <tr>
      <td>PC-02</td>
      <td>关键模组+验收款</td>
      <td>验收一次性</td>
      <td class="t3a-num">48</td>
      <td>核心子系统模组，现场测试合格验收当月确认；毛利率52%</td>
      <td>BB.1.3 技术服务收入与成本预算；BB.2.1 生产计划；AM.1 产品类别与收入映射</td>
    </tr>
    <tr>
      <td>PC-03</td>
      <td>零部件耗材+交付款</td>
      <td>验收一次性</td>
      <td class="t3a-num">52</td>
      <td>标准零部件与耗材，交付签收当月一次性确认；毛利率48%</td>
      <td>BB.1.3 技术服务收入与成本预算；BB.2.1 生产计划；AM.1 产品类别与收入映射</td>
    </tr>
    <tr>
      <td>PC-04</td>
      <td>软件授权+授权款</td>
      <td>验收一次性</td>
      <td class="t3a-num">18</td>
      <td>软件授权与Key下发，上线验收一次性确认；毛利率82%</td>
      <td>BB.1.3 技术服务收入与成本预算；BB.2.1 生产计划；AM.1 产品类别与收入映射</td>
    </tr>
    <tr>
      <td>PC-05</td>
      <td>技术服务维保+服务款</td>
      <td>直线法</td>
      <td class="t3a-num">35</td>
      <td>驻场服务与年度维保，服务期内按月均摊确认（时段法）；毛利率65%</td>
      <td>BB.1.3 技术服务收入与成本预算；BB.2.1 生产计划；AM.1 产品类别与收入映射</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 编码 | 本表维护 |  |
| 产品类别（财务口径）名 | 本表维护 |  |
| 默认收入确认方式 | AB.4 收入确认方式字典 |  |
| 成本率(%) | 本表维护 |  |

## ④ 适用业务情形

**适用于**

- 产品类别（财务口径）字典维护，供产品分类下拉引用

**不适用于**

- 具体业务金额填报
