# BB.5.1 雇员费用编制/导入

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

### BB.5.1 雇员费用编制/导入

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th" rowspan="2">法人公司</th>
      <th class="t3a-th" rowspan="2">预算项目</th>
      <th class="t3a-th" rowspan="2">预算部门</th>
      <th class="t3a-th" rowspan="2">预算科目</th>
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
    </tr>
    <tr>
      <th class="t3a-th t3a-th--time">销售费用</th>
      <th class="t3a-th t3a-th--time">研发费用</th>
      <th class="t3a-th t3a-th--time">管理费用</th>
      <th class="t3a-th t3a-th--time">制造费用</th>
      <th class="t3a-th t3a-th--time">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">实际发放</th>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>年度人工费用预算</td>
      <td>销售一部</td>
      <td>2211 应付职工薪酬</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">12.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">12.6</td>
      <td class="t3a-num">12.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">12.8</td>
      <td class="t3a-num">13.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">13.0</td>
      <td class="t3a-num">13.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">13.2</td>
      <td class="t3a-num">13.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">13.5</td>
      <td class="t3a-num">13.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">13.8</td>
      <td class="t3a-num">14.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">14.0</td>
      <td class="t3a-num">14.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">14.2</td>
      <td class="t3a-num">14.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">14.5</td>
      <td class="t3a-num">14.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">14.8</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">15.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>年度人工费用预算</td>
      <td>研发中心</td>
      <td>2211 应付职工薪酬</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">18.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">18.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">18.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">18.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">19.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">19.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">19.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">19.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">20.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">20.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">20.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">20.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">21.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">21.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">21.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">21.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">22.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">22.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">22.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">22.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">22.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">22.8</td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>年度人工费用预算</td>
      <td>生产制造部</td>
      <td>2211 应付职工薪酬</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">15.6</td>
      <td class="t3a-num">15.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">15.8</td>
      <td class="t3a-num">15.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">16.2</td>
      <td class="t3a-num">16.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">16.5</td>
      <td class="t3a-num">16.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">16.8</td>
      <td class="t3a-num">16.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">17.2</td>
      <td class="t3a-num">17.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">17.6</td>
      <td class="t3a-num">17.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">18.0</td>
      <td class="t3a-num">18.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">18.4</td>
      <td class="t3a-num">18.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">18.8</td>
      <td class="t3a-num">18.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">19.2</td>
      <td class="t3a-num">19.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">19.6</td>
      <td class="t3a-num">19.6</td>
    </tr>
  </tbody>
</table>
</div>

### BB.5.1 财务视角

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th" rowspan="2">法人公司</th>
      <th class="t3a-th" rowspan="2">预算项目</th>
      <th class="t3a-th" rowspan="2">预算部门</th>
      <th class="t3a-th" rowspan="2">预算科目</th>
      <th class="t3a-th t3a-th--time" colspan="7">【全年合计】</th>
      <th class="t3a-th" colspan="7">1月</th>
      <th class="t3a-th" colspan="7">2月</th>
      <th class="t3a-th" colspan="7">3月</th>
      <th class="t3a-th" colspan="7">4月</th>
      <th class="t3a-th" colspan="7">5月</th>
      <th class="t3a-th" colspan="7">6月</th>
      <th class="t3a-th" colspan="7">7月</th>
      <th class="t3a-th" colspan="7">8月</th>
      <th class="t3a-th" colspan="7">9月</th>
      <th class="t3a-th" colspan="7">10月</th>
      <th class="t3a-th" colspan="7">11月</th>
      <th class="t3a-th" colspan="7">12月</th>
    </tr>
    <tr>
      <th class="t3a-th t3a-th--time">销售费用</th>
      <th class="t3a-th t3a-th--time">研发费用</th>
      <th class="t3a-th t3a-th--time">管理费用</th>
      <th class="t3a-th t3a-th--time">制造费用</th>
      <th class="t3a-th t3a-th--time">服务人工成本</th>
      <th class="t3a-th t3a-th--time">自制在建工程</th>
      <th class="t3a-th t3a-th--time">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">服务人工成本</th>
      <th class="t3a-th">自制在建工程</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">服务人工成本</th>
      <th class="t3a-th">自制在建工程</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">服务人工成本</th>
      <th class="t3a-th">自制在建工程</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">服务人工成本</th>
      <th class="t3a-th">自制在建工程</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">服务人工成本</th>
      <th class="t3a-th">自制在建工程</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">服务人工成本</th>
      <th class="t3a-th">自制在建工程</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">服务人工成本</th>
      <th class="t3a-th">自制在建工程</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">服务人工成本</th>
      <th class="t3a-th">自制在建工程</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">服务人工成本</th>
      <th class="t3a-th">自制在建工程</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">服务人工成本</th>
      <th class="t3a-th">自制在建工程</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">服务人工成本</th>
      <th class="t3a-th">自制在建工程</th>
      <th class="t3a-th">实际发放</th>
      <th class="t3a-th">销售费用</th>
      <th class="t3a-th">研发费用</th>
      <th class="t3a-th">管理费用</th>
      <th class="t3a-th">制造费用</th>
      <th class="t3a-th">服务人工成本</th>
      <th class="t3a-th">自制在建工程</th>
      <th class="t3a-th">实际发放</th>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>年度人工费用预算</td>
      <td>销售一部</td>
      <td>2211 应付职工薪酬</td>
      <td class="t3a-num">148.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">15.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">163.9</td>
      <td class="t3a-num">11.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">11.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">12.6</td>
      <td class="t3a-num">11.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">12.8</td>
      <td class="t3a-num">11.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">13.0</td>
      <td class="t3a-num">12.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">13.2</td>
      <td class="t3a-num">12.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">13.5</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">13.8</td>
      <td class="t3a-num">12.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">14.0</td>
      <td class="t3a-num">12.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">14.2</td>
      <td class="t3a-num">13.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">14.5</td>
      <td class="t3a-num">13.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">14.8</td>
      <td class="t3a-num">13.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">15.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>年度人工费用预算</td>
      <td>研发中心</td>
      <td>2211 应付职工薪酬</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">228.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">18.8</td>
      <td class="t3a-num">247.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">17.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">18.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">17.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">18.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">17.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">19.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">18.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">19.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">18.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">18.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">20.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">19.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">20.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">19.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">21.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">21.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">20.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">22.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">20.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">22.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">21.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">22.8</td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>年度人工费用预算</td>
      <td>生产制造部</td>
      <td>2211 应付职工薪酬</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">192.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">16.8</td>
      <td class="t3a-num">209.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">14.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">15.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">14.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">15.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">14.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">16.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">15.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">16.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">15.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">16.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">15.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">17.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">16.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">17.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">16.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">18.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">17.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">18.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">17.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">18.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">17.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">19.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">18.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">19.6</td>
    </tr>
  </tbody>
</table>
</div>

## 表概述

薪酬预算表（HR）：按法人×部门×费用项目（销售/研发/管理/制造费用/实际发放）填报，含人事视角与财务视角两个 Tab；财务视角把因 BB.4.1 自制设备工程人工投入而减少的雇员费用体现到「自制在建工程」列（资本化人工，借1604贷2211），该资本化人工的科目转换唯一由本表触发。分录：期间费用薪酬 660101/660201/660301 对 2211，制造费用薪酬只进存货线（1405 对 2211）、不直接进损益，实际发放 2211 对 1001（代扣个税/社保走 2221/2211）、进 CF-06；计提非付现、不产生现金流。两个 Tab 均以法人公司为第一维度，按法人分别归集入账、集团合并时各法人间不互抵。

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 法人公司 | AA.2 法人组织架构 |  |
| 预算项目 | AA.6 预算项目主数据 | 雇员费用归属的预算项目 |
| 预算部门 | AA.5 行政部门主数据字典（一级部门-二级部门） | 预算部门默认明细到二级部门（如"生产一部"，而非仅"制造工程部"）；值域 AA.5 一级部门-二级部门 |
| 预算科目 | 统一预算科目 | 默认带出 2211 应付职工薪酬，计提与发放往来统一科目 |
| 销售费用 | 本表录入(HR填报) | 按月计提销售费用人工；直接计入BO.PL 6601销售费用 |
| 研发费用 | 本表录入(HR填报) | 按月计提研发费用人工；直接计入BO.PL 6603研发费用 |
| 管理费用 | 本表录入(HR填报) | 按月计提管理费用人工；直接计入BO.PL 6602管理费用 |
| 制造费用 | 本表录入(HR填报) | 按月计提车间生产相关人工；计入制造费用与生产成本 |
| 实际发放 | 本表录入(HR填报) | 按月填报实际发放金额（付现口径）；计入BO.CF CF-06职工薪酬支付现金并冲减BO.BS 2211应付职工薪酬 |
| 服务人工成本（财务视角） | BB.1.3.i 人工明细_财务查询（工时×BAA.3工时标准成本） | 人事口径雇员费用含全部人工费用；参与技术服务交付的人员人工不单独计提，按BB.1.3.i工时×费率自雇员费用冲减后单列本列（BB.1.3.i 汇总 .g 人工明细的存量+增量，.b 销售填报_增量不参与 BAA.3 费率关联）（财务视角），进 6401.1 主营业务成本（服务直接人工构成）营业成本—直接人工，与期间费用不重复计提 |

## ③ 关键规则要点

**BB.5.1 雇员费用编制/导入**

- 本表含两个Tab（同页切换）：人事视角 + 财务视角。
- 人事视角：主要字段=法人公司、预算项目、预算部门（预算部门默认明细到二级部门）、预算科目（默认带出 2211 应付职工薪酬，计提与发放往来统一科目）；度量=全年合计(5子列)+1~12月(每月5子列)，按列展开（两行制表头，共70列）。
- 人事视角5个数据项列：①销售费用（计提）、②研发费用（计提）、③管理费用（计提）、④制造费用（计提，车间生产人工，计入制造费用与生产成本）、⑤实际发放（付现）。人事部门编制的雇员费用为全口径人工费用——包括后续参与自制设备工程（资本化）与技术服务交付（服务人工）的人员，不在人事视角拆分。
- 财务视角：同一主要字段（法人公司、预算项目、预算部门、预算科目），度量=全年合计(7子列)+1~12月(每月7子列)，共95列；7个数据项列=销售费用/研发费用/管理费用/制造费用/服务人工成本/自制在建工程/实际发放。
- 财务视角数据处理：销售/研发/管理/制造四项费用计提数，均以人事视角全口径计提数为基础，扣除 BB.4.1 资本化人工和 BB.1.3 技术服务人工；扣除后的四项费用与两类人工分别列示，避免重复归集。
- 服务人工单独列示：工时×BAA.3 工时标准成本，按法人公司×预算部门×月份汇总，并等额冲减原费用计提；资本化人工单独列示：按人工投入明细汇总。人事视角只呈现全口径人工费用，不显示「服务人工成本」「自制在建工程」两列。
- 关键规则仅承载业务处理与数据处理口径；会计分录、BO.PL/BO.BS/BO.CF 取数及报表勾稽规则统一放在后续「报表规则/财务报表取数规则」区块。

## ④ 适用业务情形

**适用于**

- HR按法人×部门×费用项目（销售/研发/管理/制造费用/实际发放）填报薪酬预算；财务视角另含自制在建工程列，体现 BB.4.1 资本化人工导致的雇员费用减少

**不适用于**

- 非薪酬经营费用（属 BB.5.2）

## ⑤ 预算编制视角：数据关系总结

雇员费用编制/导入表（人事视角 + 财务视角两个 Tab），HR 按法人×部门×费用项目填报销售/研发/管理/制造费用薪酬计提与实际发放；财务视角将自制设备资本化人工与服务人工成本从费用计提中冲减并单列，实际发放进 CF-06。

**数据来源（上游）**

| 来源表 | 编码 | 取数字段 | 关系说明 |
| :--- | :--- | :--- | :--- |
| 自制设备工程预算—人工投入明细 | BB.4.1.b | 人工投入金额 | 自动汇总至 BB.5.1 财务视角「自制在建工程」列（资本化人工） |
| 技术服务收入与成本预算—人工明细_财务查询 | BB.1.3.i | 工时(小时)×BAA.3 费率 | 自动汇总至「服务人工成本」列，等额冲减该人员原归属费用计提项（BB.1.3.i 汇总 .g 人工明细的存量+增量） |
| 岗位工时费率设置 | BAA.3 | 工时标准成本 | 服务人工成本 = 工时数量 × BAA.3 工时费率 |

**输出影响（下游）**

| 目标报表 | 取数路径 |
| :--- | :--- |
| BO.PL 利润表—期间费用 | 销售/研发/管理费用计提 → 6601/6602/6603 |
| BO.PL 利润表—主营业务成本构成：服务直接人工（并入 6401.1） | 服务人工成本单列进 6401.1 主营业务成本，随技术服务收入配比结转 |
| BO.BS 资产负债表—应付职工薪酬(2211) | 计提贷方增加；实际发放冲减借方 |
| BO.BS 资产负债表—在建工程(1604) | 资本化人工借 1604，贷应付职工薪酬 |
| BB.3.X 进销存预算 | 制造费用计提项 → 在制品「工」转入数 |
| BB.4.1 自制设备工程预算 | 「自制在建工程」列 → BB.4.1.a 人工投入 |
| BO.CF 现金流量表—CF-06 | 实际发放 → 支付给职工以及为职工支付的现金 |

## ⑥ 财务报表项转换规则

**期间费用薪酬计提** `销售/研发/管理费用计提项`

- 取数说明：HR 按法人/部门/费用项目填报；直接计入对应损益科目
- 损益表 PL：销售费用→6601 (+)；研发费用→6603 (+)；管理费用→6602 (+)
- 资产负债表 BS：应付职工薪酬 (+)，2211 贷方增加
- 现金流量表 CF：—（计提非付现）
- 科目影响：销售费用—职工薪酬(660101) (+)、管理费用—职工薪酬(660201) (+)、研发费用—职工薪酬(660301) (+)；应付职工薪酬(2211) (+)
- 其他备注：直接计入对应损益科目。

**制造费用薪酬计提** `制造费用计提项`

- 取数说明：车间生产相关人工，计入制造费用与生产成本并随完工销售结转
- 损益表 PL：—（计入制造费用/生产成本，结转存货）
- 资产负债表 BS：存货 1405 (+) / 应付职工薪酬 2211 (+)
- 现金流量表 CF：—（计提非付现）
- 科目影响：存货(1405) (+)；应付职工薪酬(2211) (+)
- 其他备注：车间生产相关人工进入制造费用，随完工产品销售结转进入营业成本。

**自制设备人工投入资本化（财务视角）** `自制在建工程列（BB.4.1.b人工投入明细按法人×部门×月度汇总）`

- 取数说明：系统从 BB.4.1.b 人工投入明细自动汇总至 BB.5.1 财务视角「自制在建工程」列
- 损益表 PL：—（资本化，不进损益）
- 资产负债表 BS：在建工程 1604 (+)；应付职工薪酬 2211 (+)（与期间费用计提共用贷方）
- 现金流量表 CF：—（计提非付现；支付时归入 CF-06 实际发放）
- 科目影响：在建工程(1604) (+)；应付职工薪酬(2211) (+)
- 其他备注：财务视角下，销售/研发/管理/制造费用计提数=人事视角计提数−资本化人工，避免资本化人工重复计入期间费用；人事视角不含此列。

**服务人工成本冲减（财务视角）** `服务人工成本列（BB.1.3.i 人工明细_财务查询按法人×部门×月度汇总）`

- 取数说明：系统从 BB.1.3.i 人工明细_财务查询（工时×BAA.3工时标准成本，汇总 .g 人工明细的存量+增量，订单编号区分）自动汇总至 BB.5.1 财务视角「服务人工成本」列，同时等额冲减该人员原归属的费用计提项
- 损益表 PL：营业成本—直接人工 (+)，计入 6401.1 主营业务成本
- 资产负债表 BS：—（应付职工薪酬 2211 已在人事口径计提，本事件为费用重分类，不重复计提）
- 现金流量表 CF：—（付现已由实际发放 CF-06 统一归集）
- 科目影响：费用重分类（不新增应付职工薪酬）：主营业务成本(6401.1) (+)；原计提费用科目（按人员原归属冲减销售/研发/管理/制造费用）(−)
- 其他备注：人事部门编制的雇员费用包括全部人工费用，技术服务人工不单独计提：参与技术服务交付的人员人工按 BB.1.3.i 工时×费率从雇员费用冲减，单列为「服务人工成本」计入 6401.1 主营业务成本（服务直接人工构成），随技术服务收入配比结转；避免服务人工同时计入期间费用与营业成本的双重计提。

**实际薪酬发放** `实际发放项`

- 取数说明：HR 按月填报实际发放金额（付现口径）
- 损益表 PL：—
- 资产负债表 BS：应付职工薪酬 2211 (−)，冲减应付借方
- 现金流量表 CF：经营活动现金流出：支付给职工以及为职工支付的现金 CF-06 (+)
- 科目影响：应付职工薪酬(2211) (−)；货币资金(1001) (−)；应交税费(2221)/应付职工薪酬(2211) (+)
- 其他备注：包含工资、奖金、津贴及企业缴纳的社保公积金付现总额，按实际发放月份归集入 CF-06。
