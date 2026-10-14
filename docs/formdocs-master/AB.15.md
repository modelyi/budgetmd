# AB.15 税率及附加税比率字典

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

### AB.15 税率及附加税比率字典

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">参数编码</th>
      <th class="t3a-th">参数指标名称</th>
      <th class="t3a-th">比率</th>
    </tr>
    <tr>
      <td>ASS-TAX-01</td>
      <td>高新技术企业所得税优惠税率</td>
      <td class="t3a-num">15.00%</td>
    </tr>
    <tr>
      <td>ASS-TAX-02</td>
      <td>研发费用企业所得税税前加计扣除比例</td>
      <td class="t3a-num">100.00%</td>
    </tr>
    <tr>
      <td>ASS-TAX-03</td>
      <td>城市维护建设税税率 (市区主体)</td>
      <td class="t3a-num">7.00%</td>
    </tr>
    <tr>
      <td>ASS-TAX-04</td>
      <td>教育费附加征收比率</td>
      <td class="t3a-num">3.00%</td>
    </tr>
    <tr>
      <td>ASS-TAX-05</td>
      <td>地方教育附加征收比率</td>
      <td class="t3a-num">2.00%</td>
    </tr>
    <tr>
      <td>ASS-TAX-07</td>
      <td>增值税法定标准税率 (整机装备制造与备件销售)</td>
      <td class="t3a-num">13.00%</td>
    </tr>
    <tr>
      <td>ASS-TAX-08</td>
      <td>软件产品增值税超税负即征即退政策比率</td>
      <td class="t3a-num">3.00%</td>
    </tr>
    <tr>
      <td>ASS-TAX-09</td>
      <td>现代服务/技术服务增值税率</td>
      <td class="t3a-num">6.00%</td>
    </tr>
    <tr>
      <td>ASS-TAX-10</td>
      <td>建筑服务增值税率</td>
      <td class="t3a-num">9.00%</td>
    </tr>
  </tbody>
</table>
</div>

## ④ 适用业务情形

**适用于**

- 静态数据字典：维护城建税/教育费附加、增值税率及税收优惠等参数，供 BF.4 税费测算引用

**不适用于**

- 预算假设编制、税费金额填报（属 BF.4）
