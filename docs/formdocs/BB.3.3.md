# BB.3.3 物料类采购预算

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

### BB.3.3.A 有PO-物料类采购预算

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th" rowspan="2">预算项目</th>
      <th class="t3a-th" rowspan="2">预算部门</th>
      <th class="t3a-th" rowspan="2">下单主体</th>
      <th class="t3a-th" rowspan="2">PO标记</th>
      <th class="t3a-th" rowspan="2">物料类别</th>
      <th class="t3a-th" rowspan="2">供应商</th>
      <th class="t3a-th t3a-th--time" colspan="5">【全年合计】</th>
      <th class="t3a-th" colspan="5">1月</th>
      <th class="t3a-th" colspan="5">2月</th>
      <th class="t3a-th" colspan="5">3月</th>
      <th class="t3a-th" colspan="5">4月</th>
      <th class="t3a-th" colspan="5">5月</th>
      <th class="t3a-th" colspan="5">6月</th>
      <th class="t3a-th" colspan="5">7月</th>
      <th class="t3a-th" colspan="5">8月</th>
      <th class="t3a-th" colspan="5">9月</th>
      <th class="t3a-th" colspan="5">10月</th>
      <th class="t3a-th" colspan="5">11月</th>
      <th class="t3a-th" colspan="5">12月</th>
      <th class="t3a-th" rowspan="2">备注说明</th>
    </tr>
    <tr>
      <th class="t3a-th t3a-th--time">到货额</th>
      <th class="t3a-th t3a-th--time">下单额</th>
      <th class="t3a-th t3a-th--time">预付款比例</th>
      <th class="t3a-th t3a-th--time">预付款</th>
      <th class="t3a-th t3a-th--time">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
    </tr>
    <tr>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>采购与供应链管理部</td>
      <td>草莓慕斯-泛烘焙装备制造单元</td>
      <td>有PO</td>
      <td>生产物料</td>
      <td>普雷茨特光学核心件供应商</td>
      <td class="t3a-num">484.0</td>
      <td class="t3a-num">514.0</td>
      <td></td>
      <td class="t3a-num">154.2</td>
      <td class="t3a-num">484.0</td>
      <td class="t3a-num">36.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">12.0</td>
      <td class="t3a-num">36.0</td>
      <td class="t3a-num">38.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">12.6</td>
      <td class="t3a-num">38.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">44.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">13.2</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">12.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">38.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">12.6</td>
      <td class="t3a-num">38.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">44.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">13.2</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">12.6</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">44.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">13.2</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">44.0</td>
      <td class="t3a-num">46.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">13.8</td>
      <td class="t3a-num">44.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">44.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">13.2</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">12.6</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">44.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">13.2</td>
      <td class="t3a-num">42.0</td>
      <td></td>
    </tr>
    <tr>
      <td>整机总装与联调产线扩建（一期）</td>
      <td>采购与供应链管理部</td>
      <td>草莓慕斯-泛烘焙装备制造单元</td>
      <td>有PO</td>
      <td>生产物料</td>
      <td>柏楚数控核心部件供应商</td>
      <td class="t3a-num">309.0</td>
      <td class="t3a-num">325.0</td>
      <td></td>
      <td class="t3a-num">97.5</td>
      <td class="t3a-num">309.0</td>
      <td class="t3a-num">22.0</td>
      <td class="t3a-num">24.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">7.2</td>
      <td class="t3a-num">22.0</td>
      <td class="t3a-num">25.0</td>
      <td class="t3a-num">26.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">25.0</td>
      <td class="t3a-num">26.0</td>
      <td class="t3a-num">28.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">8.4</td>
      <td class="t3a-num">26.0</td>
      <td class="t3a-num">24.0</td>
      <td class="t3a-num">25.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">7.5</td>
      <td class="t3a-num">24.0</td>
      <td class="t3a-num">26.0</td>
      <td class="t3a-num">27.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">8.1</td>
      <td class="t3a-num">26.0</td>
      <td class="t3a-num">28.0</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">9.0</td>
      <td class="t3a-num">28.0</td>
      <td class="t3a-num">25.0</td>
      <td class="t3a-num">26.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">25.0</td>
      <td class="t3a-num">27.0</td>
      <td class="t3a-num">28.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">8.4</td>
      <td class="t3a-num">27.0</td>
      <td class="t3a-num">28.0</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">9.0</td>
      <td class="t3a-num">28.0</td>
      <td class="t3a-num">26.0</td>
      <td class="t3a-num">27.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">8.1</td>
      <td class="t3a-num">26.0</td>
      <td class="t3a-num">25.0</td>
      <td class="t3a-num">26.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">25.0</td>
      <td class="t3a-num">27.0</td>
      <td class="t3a-num">28.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">8.4</td>
      <td class="t3a-num">27.0</td>
      <td></td>
    </tr>
  </tbody>
</table>
</div>

### BB.3.3.B 无PO-物料类采购预算

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th" rowspan="2">预算项目</th>
      <th class="t3a-th" rowspan="2">预算部门</th>
      <th class="t3a-th" rowspan="2">下单主体</th>
      <th class="t3a-th" rowspan="2">PO标记</th>
      <th class="t3a-th" rowspan="2">物料类别</th>
      <th class="t3a-th" rowspan="2">供应商</th>
      <th class="t3a-th t3a-th--time" colspan="5">【全年合计】</th>
      <th class="t3a-th" colspan="5">1月</th>
      <th class="t3a-th" colspan="5">2月</th>
      <th class="t3a-th" colspan="5">3月</th>
      <th class="t3a-th" colspan="5">4月</th>
      <th class="t3a-th" colspan="5">5月</th>
      <th class="t3a-th" colspan="5">6月</th>
      <th class="t3a-th" colspan="5">7月</th>
      <th class="t3a-th" colspan="5">8月</th>
      <th class="t3a-th" colspan="5">9月</th>
      <th class="t3a-th" colspan="5">10月</th>
      <th class="t3a-th" colspan="5">11月</th>
      <th class="t3a-th" colspan="5">12月</th>
      <th class="t3a-th" rowspan="2">备注说明</th>
    </tr>
    <tr>
      <th class="t3a-th t3a-th--time">到货额</th>
      <th class="t3a-th t3a-th--time">下单额</th>
      <th class="t3a-th t3a-th--time">预付款比例</th>
      <th class="t3a-th t3a-th--time">预付款</th>
      <th class="t3a-th t3a-th--time">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
      <th class="t3a-th">到货额</th>
      <th class="t3a-th">下单额</th>
      <th class="t3a-th">预付款比例</th>
      <th class="t3a-th">预付款</th>
      <th class="t3a-th">验收付款</th>
    </tr>
    <tr>
      <td>集团统筹</td>
      <td>制造工程部</td>
      <td></td>
      <td>无PO</td>
      <td>其他物料</td>
      <td></td>
      <td class="t3a-num">95.0</td>
      <td class="t3a-num">0.0</td>
      <td></td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">95.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">9.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">9.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">9.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">9.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td></td>
    </tr>
    <tr>
      <td>产品化项目</td>
      <td>研发中心</td>
      <td></td>
      <td>无PO</td>
      <td>研发物料</td>
      <td>新代伺服驱动系统供应商</td>
      <td class="t3a-num">180.0</td>
      <td class="t3a-num">198.0</td>
      <td></td>
      <td class="t3a-num">59.4</td>
      <td class="t3a-num">180.0</td>
      <td class="t3a-num">12.0</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">12.0</td>
      <td class="t3a-num">13.0</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">13.0</td>
      <td class="t3a-num">14.0</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">14.0</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">17.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">5.1</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">18.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">5.4</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">17.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">5.1</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">17.0</td>
      <td class="t3a-num">18.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">5.4</td>
      <td class="t3a-num">17.0</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">17.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">5.1</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">17.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">5.1</td>
      <td class="t3a-num">16.0</td>
      <td></td>
    </tr>
    <tr>
      <td>集团统筹</td>
      <td>智能制造与交付中心</td>
      <td></td>
      <td>无PO</td>
      <td>服务物料</td>
      <td>柏楚数控核心部件供应商</td>
      <td class="t3a-num">62.0</td>
      <td class="t3a-num">68.0</td>
      <td></td>
      <td class="t3a-num">20.4</td>
      <td class="t3a-num">62.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">5.0</td>
      <td></td>
    </tr>
    <tr>
      <td>集团统筹</td>
      <td>采购与供应链管理部</td>
      <td></td>
      <td>无PO</td>
      <td>专项储备</td>
      <td>战略备件合作厂商</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">20.0</td>
      <td></td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">30.00%</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td></td>
    </tr>
  </tbody>
</table>
</div>

### BB.3.3.C 财务视角

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th" rowspan="2">法人公司</th>
      <th class="t3a-th" rowspan="2">预算项目</th>
      <th class="t3a-th" rowspan="2">预算部门</th>
      <th class="t3a-th" rowspan="2">PO标记</th>
      <th class="t3a-th" rowspan="2">物料类别</th>
      <th class="t3a-th t3a-th--time" colspan="3">【全年合计】</th>
      <th class="t3a-th" colspan="3">1月</th>
      <th class="t3a-th" colspan="3">2月</th>
      <th class="t3a-th" colspan="3">3月</th>
      <th class="t3a-th" colspan="3">4月</th>
      <th class="t3a-th" colspan="3">5月</th>
      <th class="t3a-th" colspan="3">6月</th>
      <th class="t3a-th" colspan="3">7月</th>
      <th class="t3a-th" colspan="3">8月</th>
      <th class="t3a-th" colspan="3">9月</th>
      <th class="t3a-th" colspan="3">10月</th>
      <th class="t3a-th" colspan="3">11月</th>
      <th class="t3a-th" colspan="3">12月</th>
    </tr>
    <tr>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">预付款(万元)</th>
      <th class="t3a-th t3a-th--time">验收付款(万元)</th>
      <th class="t3a-th">到货额(万元)</th>
      <th class="t3a-th">预付款(万元)</th>
      <th class="t3a-th">验收付款(万元)</th>
      <th class="t3a-th">到货额(万元)</th>
      <th class="t3a-th">预付款(万元)</th>
      <th class="t3a-th">验收付款(万元)</th>
      <th class="t3a-th">到货额(万元)</th>
      <th class="t3a-th">预付款(万元)</th>
      <th class="t3a-th">验收付款(万元)</th>
      <th class="t3a-th">到货额(万元)</th>
      <th class="t3a-th">预付款(万元)</th>
      <th class="t3a-th">验收付款(万元)</th>
      <th class="t3a-th">到货额(万元)</th>
      <th class="t3a-th">预付款(万元)</th>
      <th class="t3a-th">验收付款(万元)</th>
      <th class="t3a-th">到货额(万元)</th>
      <th class="t3a-th">预付款(万元)</th>
      <th class="t3a-th">验收付款(万元)</th>
      <th class="t3a-th">到货额(万元)</th>
      <th class="t3a-th">预付款(万元)</th>
      <th class="t3a-th">验收付款(万元)</th>
      <th class="t3a-th">到货额(万元)</th>
      <th class="t3a-th">预付款(万元)</th>
      <th class="t3a-th">验收付款(万元)</th>
      <th class="t3a-th">到货额(万元)</th>
      <th class="t3a-th">预付款(万元)</th>
      <th class="t3a-th">验收付款(万元)</th>
      <th class="t3a-th">到货额(万元)</th>
      <th class="t3a-th">预付款(万元)</th>
      <th class="t3a-th">验收付款(万元)</th>
      <th class="t3a-th">到货额(万元)</th>
      <th class="t3a-th">预付款(万元)</th>
      <th class="t3a-th">验收付款(万元)</th>
      <th class="t3a-th">到货额(万元)</th>
      <th class="t3a-th">预付款(万元)</th>
      <th class="t3a-th">验收付款(万元)</th>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>采购与供应链管理部</td>
      <td>有PO</td>
      <td>生产物料</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">36.0</td>
      <td class="t3a-num">12.0</td>
      <td class="t3a-num">36.0</td>
      <td class="t3a-num">38.0</td>
      <td class="t3a-num">12.6</td>
      <td class="t3a-num">38.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">13.2</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">12.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">38.0</td>
      <td class="t3a-num">12.6</td>
      <td class="t3a-num">38.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">13.2</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">12.6</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">13.2</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">44.0</td>
      <td class="t3a-num">13.8</td>
      <td class="t3a-num">44.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">13.2</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">12.6</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">13.2</td>
      <td class="t3a-num">42.0</td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>产品化项目</td>
      <td>研发中心</td>
      <td>无PO</td>
      <td>研发物料</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">12.0</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">12.0</td>
      <td class="t3a-num">13.0</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">13.0</td>
      <td class="t3a-num">14.0</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">14.0</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">5.1</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">5.4</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">5.1</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">17.0</td>
      <td class="t3a-num">5.4</td>
      <td class="t3a-num">17.0</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">5.1</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">16.0</td>
      <td class="t3a-num">5.1</td>
      <td class="t3a-num">16.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>集团统筹</td>
      <td>制造工程部</td>
      <td>无PO</td>
      <td>其他物料</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">9.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">9.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">9.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">9.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.0</td>
    </tr>
    <tr>
      <td>蓝莓蛋挞公司</td>
      <td>集团统筹</td>
      <td>智能制造与交付中心</td>
      <td>无PO</td>
      <td>服务物料</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">5.0</td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>P3 超快激光与复合加工预研</td>
      <td>研发工程部</td>
      <td>无PO</td>
      <td>研发物料</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>P3 超快激光与复合加工预研</td>
      <td>研发工程部</td>
      <td>无PO</td>
      <td>研发物料</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

**BB.3.3.A 有PO-物料类采购预算**

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 预算项目 | AA.6 预算项目主数据 |  |
| 预算部门 | AA.5 行政部门主数据字典（一级部门-二级部门） | 预算部门原则上明细到二级部门 |
| 下单主体 | AA.8 管理单元主数据 | 选择管理单元；后续根据管理单元与法人的对应关系，得到所属法人公司的订单 |
| PO标记 | 本表录入 | 固定值列：本表恒为「有PO」，不可修改（原 PO标记 枚举「有PO/无PO」已按 PO 拆为 BB.3.3.A 有PO / BB.3.3.B 无PO 两张采购视角表样，本表为有PO表样） |
| 物料类别 | ERP 物料类别字典 | 来自 ERP 字典；结构与BB.3.1资产类别一致，仅字典来源不同 |
| 供应商 | AA.10 供应商主数据 |  |
| 月度到货额 | 本表录入 |  |
| 月度下单额 | 本表录入 |  |
| 预付款 | 本表录入 | 付款节奏以本表各月填报的预付款与验收付款为准（BAA.7 比例表本年度不启用，不参与测算），按月手工填报 |
| 预付款比例 | 本表录入 | 按月填报（每月子列，位于下单额之后、预付款之前）；各月预付款=当月下单额×当月预付款比例 |
| 验收付款 | 本表录入 | 付款节奏以本表各月填报的预付款与验收付款为准（BAA.7 比例表本年度不启用，不参与测算），按月手工填报 |
| 全年到货额合计 | 本表公式 | =SUM(12个月到货额) |
| 全年下单额合计 | 本表公式 | =SUM(12个月下单额) |
| 备注说明 | 本表录入 |  |

**BB.3.3.B 无PO-物料类采购预算**

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 预算项目 | AA.6 预算项目主数据 |  |
| 预算部门 | AA.5 行政部门主数据字典（一级部门-二级部门） | 预算部门原则上明细到二级部门 |
| 下单主体 | AA.8 管理单元主数据 | 选择管理单元；无PO行无法从下单主体指认法人的，按 BAA.10 进销存按法人兜底拆分比例拆分到法人（物料类采购法人拆分的唯一入口在 BB.3.3.C 财务视角；BAA.10 本年度不启用，兜底口径为后续年度预留） |
| PO标记 | 本表录入 | 固定值列：本表恒为「无PO」，不可修改（原 PO标记 枚举「有PO/无PO」已按 PO 拆为 BB.3.3.A 有PO / BB.3.3.B 无PO 两张采购视角表样，本表为无PO表样） |
| 物料类别 | ERP 物料类别字典 | 来自 ERP 字典；结构与BB.3.1资产类别一致，仅字典来源不同 |
| 供应商 | AA.10 供应商主数据 |  |
| 月度到货额 | 本表录入 |  |
| 月度下单额 | 本表录入 |  |
| 预付款 | 本表录入 | 付款节奏以本表各月填报的预付款与验收付款为准（BAA.7 比例表本年度不启用，不参与测算），按月手工填报 |
| 预付款比例 | 本表录入 | 按月填报（每月子列，位于下单额之后、预付款之前）；各月预付款=当月下单额×当月预付款比例 |
| 验收付款 | 本表录入 | 付款节奏以本表各月填报的预付款与验收付款为准（BAA.7 比例表本年度不启用，不参与测算），按月手工填报 |
| 全年到货额合计 | 本表公式 | =SUM(12个月到货额) |
| 全年下单额合计 | 本表公式 | =SUM(12个月下单额) |
| 备注说明 | 本表录入 |  |

**BB.3.3.C 财务视角**

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 法人公司 | 法人指认规则 | 有PO（BB.3.3.A 有PO表样）按下单主体（AA.8 管理单元）对应法人直接带出；无PO（BB.3.3.B 无PO表样）按 BAA.10 进销存按法人兜底拆分比例拆分到法人；物料类采购法人拆分的唯一入口在本表（BAA.10 本年度不启用，兜底口径为后续年度预留） |
| 预算项目 | AA.6 预算项目主数据 | 从两张采购视角表样（BB.3.3.A 有PO / BB.3.3.B 无PO）按法人×项目×部门×物料类别汇总 |
| 预算部门 | AA.5 行政部门主数据字典（一级部门-二级部门） | 从两张采购视角表样（BB.3.3.A 有PO / BB.3.3.B 无PO）按法人×项目×部门×物料类别汇总；默认明细到二级部门 |
| PO标记 | BB.3.3.A/BB.3.3.B 采购视角 PO标记 | 维度列（位于法人公司/预算项目/预算部门之后、物料类别之前）；下拉枚举：有PO/无PO，本列为非固定值列（与采购视角两张表样的固定值列不同）——区分本行金额是按下单主体（AA.8 管理单元）直接指认法人（有PO，同一法人行），还是按 BAA.10 进销存按法人兜底拆分比例拆分到法人（无PO，同一预算项目/预算部门可能落到多个法人行；BAA.10 本年度不启用） |
| 物料类别 | AB.9 存货物料类别字典 | 维度列（位于 PO标记 之后）；从两张采购视角表样（BB.3.3.A 有PO / BB.3.3.B 无PO）按法人×项目×部门×物料类别汇总 |
| 到货额(万元) | BB.3.3.A/BB.3.3.B 采购视角到货额 | 全年合计+1~12月；到货额入库（存货 1405 增加）为非现金事件，不形成现金流出 |
| 预付款(万元) | BB.3.3.A/BB.3.3.B 采购视角预付款 | 全年合计+1~12月；现金流出，进 CF-05（同时增加预付账款 1123） |
| 验收付款(万元) | BB.3.3.A/BB.3.3.B 采购视角验收付款 | 全年合计+1~12月；现金流出，进 CF-05（同时减少应付账款 2202） |

## ④ 适用业务情形

**适用于**

- 物料类采购预算（三个Tab：BB.3.3.A 有PO-物料类采购预算、BB.3.3.B 无PO-物料类采购预算两张采购视角表样（列结构相同、仅 PO标记 为固定值列）+ BB.3.3.C 财务视角）
- 按预算项目/部门跟踪到货/下单/预付款比例/预付款/验收付款，PO标记区分有/无PO；到货额按100%确认为验收付款、预付款按下单额×当月比例测算
- 有PO（BB.3.3.A）按下单主体（AA.8 管理单元）与法人一一对应、直接带出归属法人；无PO（BB.3.3.B）无法从下单主体指认法人的按 BAA.10 进销存按法人兜底拆分比例拆到法人（仅在财务视角 BB.3.3.C 拆分一次，是物料类采购法人拆分的唯一入口；BAA.10 本年度不启用；两张采购视角表样均不生成会计分录）
- BB.3.3.C 财务视角维度=法人公司×预算项目×预算部门×PO标记×物料类别（5 个维度列，度量=到货额/预付款/验收付款×〔【全年合计】+1~12月〕，共 44 列）：PO标记 为下拉维度（枚举：有PO/无PO）、非固定值列，用于区分本行金额的两类来源通道——有PO（BB.3.3.A）按下单主体直接指认归属法人（同一法人行）、无PO（BB.3.3.B）按 BAA.10 兜底比例拆分到法人（同一预算项目/预算部门可能落到多个法人行）
- BB.3.3.C 财务视角：按法人公司×预算项目×预算部门×PO标记×物料类别汇总到货额/预付款/验收付款（【全年合计】+1~12月），并按法人公司汇总生成本年度物料采购的会计分录；两张采购视角表样不生成会计分录

**不适用于**

- 设备及无形资产采购（属 BB.3.1）、基建（属 BB.3.2）

## ⑤ 预算编制视角：数据关系总结

**数据来源（上游）**

| 来源表 | 编码 | 取数字段 | 关系说明 |
| :--- | :--- | :--- | :--- |
| 存货物料类别字典 | AB.9 | 物料类别 | 按 AB.9 维护物料类别，到货额按类别对应转入 BB.3.X 各物料大类 |
| 进销存按法人拆分比例表 | BAA.10 | 各法人占比 | BB.3.3.C 财务视角「PO标记=无PO」行法人指认的兜底：无PO（BB.3.3.B 无PO表样）无法从下单主体（AA.8 管理单元）指认到法人的部分，按 BAA.10 各法人比例兜底拆分后落入多个法人行（同一预算项目/预算部门可能落到多个法人行）；「PO标记=有PO」行（BB.3.3.A 有PO表样）按下单主体直接指认归属法人、不经比例拆分（BAA.10 本年度不启用，兜底口径为后续年度预留） |

**输出影响（下游）**

| 目标报表 | 取数路径 |
| :--- | :--- |
| BB.3.X 进销存预算 | 到货额直接增加进销存表「本期采购入库」，按 AB.9 类别对应转入各物料大类，并落到 BB.3.X 同一法人行；法人指认=有PO（BB.3.3.A）按下单主体（AA.8 管理单元）直接指认到法人（同一法人行）、无PO（BB.3.3.B）按 BAA.10 兜底拆分到多个法人行（本年度不启用），拆分结果取财务视角 BB.3.3.C 各法人到货额 |
| BO.BS 资产负债表 | 到货增加存货；预付款增加预付款项；验收付款减少应付账款；以上分录均由 BB.3.3.C 财务视角按「法人公司×预算项目×预算部门×PO标记×物料类别」汇总生成 |
| BO.CF 现金流量表—购买商品、接受劳务支付的现金 | 预付款 + 验收付款 → 购买商品、接受劳务支付的现金（经营活动现金流出），按 BB.3.3.C 财务视角的法人公司汇总 |

## ⑥ 财务报表项转换规则

本表共用口径：物料采购只登记到货额、下单额、预付款比例、预付款、验收付款，全部法人分录由财务视角 BB.3.3.C 按「法人公司×预算项目×预算部门×PO标记×物料类别」汇总生成。法人归属分两类通道：PO标记=有PO 按下单主体（AA.8 管理单元）直接指认到法人（同一法人行）；PO标记=无PO 按 BAA.10 进销存按法人兜底拆分比例拆分到法人（同一预算项目/预算部门可能落到多个法人行，BAA.10 本年度不启用）。本表不处理增值税，到货额均为不含税口径。

**报表取数**

| 度量/报表项 | 取数字段 | 损益表 PL | 资产负债表 BS | 现金流量表 CF |
| :--- | :--- | :--- | :--- | :--- |
| 物料到货 | BB.3.3.C·到货额(万元) | — | 存货 (+) | —（到货不等于付款） |
| 预付款（物料） | BB.3.3.C·预付款(万元) | — | 预付款项 (+)（先付款后到货） | 经营活动现金流出：购买商品、接受劳务支付的现金 (+) |
| 验收付款（物料） | BB.3.3.C·验收付款(万元) | — | 应付账款 (−)（到货验收后付款） | 经营活动现金流出：购买商品、接受劳务支付的现金 (+) |

**科目（报表项）入账**

| 度量/报表项 | 借 | 贷 |
| :--- | :--- | :--- |
| 物料到货 | 存货 / 零部件 | 应付账款 |
| 预付款（物料） | 应付账款、预付款项 | 货币资金 |
| 验收付款（物料） | 应付账款 | 货币资金 |
