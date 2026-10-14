# BB.4.5 增量资产折旧计算表

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

### BB.4.5 增量资产折旧计算表

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th" rowspan="2">预算项目</th>
      <th class="t3a-th" rowspan="2">法人公司</th>
      <th class="t3a-th" rowspan="2">预算部门</th>
      <th class="t3a-th" rowspan="2">来源</th>
      <th class="t3a-th" rowspan="2">资产类别</th>
      <th class="t3a-th" rowspan="2">资产描述</th>
      <th class="t3a-th" rowspan="2">启用月份</th>
      <th class="t3a-th" rowspan="2">折旧惯例</th>
      <th class="t3a-th" rowspan="2">剩余年限(月数)</th>
      <th class="t3a-th" rowspan="2">预计净残值率</th>
      <th class="t3a-th" rowspan="2">本年新增原值</th>
      <th class="t3a-th" rowspan="2">每月折旧额</th>
      <th class="t3a-th" rowspan="2">本年折旧月数</th>
      <th class="t3a-th t3a-th--time" colspan="4">【全年折旧】</th>
      <th class="t3a-th" colspan="4">1月</th>
      <th class="t3a-th" colspan="4">2月</th>
      <th class="t3a-th" colspan="4">3月</th>
      <th class="t3a-th" colspan="4">4月</th>
      <th class="t3a-th" colspan="4">5月</th>
      <th class="t3a-th" colspan="4">6月</th>
      <th class="t3a-th" colspan="4">7月</th>
      <th class="t3a-th" colspan="4">8月</th>
      <th class="t3a-th" colspan="4">9月</th>
      <th class="t3a-th" colspan="4">10月</th>
      <th class="t3a-th" colspan="4">11月</th>
      <th class="t3a-th" colspan="4">12月</th>
    </tr>
    <tr>
      <th class="t3a-th t3a-th--time">制造费用折旧</th>
      <th class="t3a-th t3a-th--time">研发费用折旧与摊销</th>
      <th class="t3a-th t3a-th--time">管理费用折旧与摊销</th>
      <th class="t3a-th t3a-th--time">销售费用折旧与摊销</th>
      <th class="t3a-th">制造费用折旧</th>
      <th class="t3a-th">研发费用折旧与摊销</th>
      <th class="t3a-th">管理费用折旧与摊销</th>
      <th class="t3a-th">销售费用折旧与摊销</th>
      <th class="t3a-th">制造费用折旧</th>
      <th class="t3a-th">研发费用折旧与摊销</th>
      <th class="t3a-th">管理费用折旧与摊销</th>
      <th class="t3a-th">销售费用折旧与摊销</th>
      <th class="t3a-th">制造费用折旧</th>
      <th class="t3a-th">研发费用折旧与摊销</th>
      <th class="t3a-th">管理费用折旧与摊销</th>
      <th class="t3a-th">销售费用折旧与摊销</th>
      <th class="t3a-th">制造费用折旧</th>
      <th class="t3a-th">研发费用折旧与摊销</th>
      <th class="t3a-th">管理费用折旧与摊销</th>
      <th class="t3a-th">销售费用折旧与摊销</th>
      <th class="t3a-th">制造费用折旧</th>
      <th class="t3a-th">研发费用折旧与摊销</th>
      <th class="t3a-th">管理费用折旧与摊销</th>
      <th class="t3a-th">销售费用折旧与摊销</th>
      <th class="t3a-th">制造费用折旧</th>
      <th class="t3a-th">研发费用折旧与摊销</th>
      <th class="t3a-th">管理费用折旧与摊销</th>
      <th class="t3a-th">销售费用折旧与摊销</th>
      <th class="t3a-th">制造费用折旧</th>
      <th class="t3a-th">研发费用折旧与摊销</th>
      <th class="t3a-th">管理费用折旧与摊销</th>
      <th class="t3a-th">销售费用折旧与摊销</th>
      <th class="t3a-th">制造费用折旧</th>
      <th class="t3a-th">研发费用折旧与摊销</th>
      <th class="t3a-th">管理费用折旧与摊销</th>
      <th class="t3a-th">销售费用折旧与摊销</th>
      <th class="t3a-th">制造费用折旧</th>
      <th class="t3a-th">研发费用折旧与摊销</th>
      <th class="t3a-th">管理费用折旧与摊销</th>
      <th class="t3a-th">销售费用折旧与摊销</th>
      <th class="t3a-th">制造费用折旧</th>
      <th class="t3a-th">研发费用折旧与摊销</th>
      <th class="t3a-th">管理费用折旧与摊销</th>
      <th class="t3a-th">销售费用折旧与摊销</th>
      <th class="t3a-th">制造费用折旧</th>
      <th class="t3a-th">研发费用折旧与摊销</th>
      <th class="t3a-th">管理费用折旧与摊销</th>
      <th class="t3a-th">销售费用折旧与摊销</th>
      <th class="t3a-th">制造费用折旧</th>
      <th class="t3a-th">研发费用折旧与摊销</th>
      <th class="t3a-th">管理费用折旧与摊销</th>
      <th class="t3a-th">销售费用折旧与摊销</th>
    </tr>
    <tr>
      <td>烘焙产线扩能项目</td>
      <td>草莓慕斯公司</td>
      <td>制造工程部</td>
      <td>采购类有PO</td>
      <td>固定资产-生产机器设备</td>
      <td>高速烘焙成型机（产线核心成型设备）</td>
      <td class="t3a-num">1.0</td>
      <td>下月折</td>
      <td class="t3a-num">120.0</td>
      <td class="t3a-num">5.00%</td>
      <td class="t3a-num">120.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">11.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>烘焙产线扩能项目</td>
      <td>草莓慕斯公司</td>
      <td>制造工程部</td>
      <td>采购类有PO</td>
      <td>固定资产-生产机器设备</td>
      <td>隧道式烘烤炉（连续烘烤设备）</td>
      <td class="t3a-num">6.0</td>
      <td>下月折</td>
      <td class="t3a-num">120.0</td>
      <td class="t3a-num">5.00%</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>食品研发检测能力项目</td>
      <td>芒果班戟公司</td>
      <td>研发中心</td>
      <td>采购类有PO</td>
      <td>固定资产-研发实验仪器</td>
      <td>食品成分分析仪（研发检测仪器）</td>
      <td class="t3a-num">3.0</td>
      <td>下月折</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">5.00%</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">9.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>食品研发检测能力项目</td>
      <td>芒果班戟公司</td>
      <td>研发中心</td>
      <td>采购类有PO</td>
      <td>固定资产-研发实验仪器</td>
      <td>质构分析仪（研发检测仪器）</td>
      <td class="t3a-num">9.0</td>
      <td>下月折</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">5.00%</td>
      <td class="t3a-num">80.0</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>办公环境改善项目</td>
      <td>甜甜圈集团公司</td>
      <td>综合管理部</td>
      <td>采购类无PO</td>
      <td>固定资产-电子与办公设备</td>
      <td>研发工作站（研发用计算机终端）</td>
      <td class="t3a-num">2.0</td>
      <td>下月折</td>
      <td class="t3a-num">36.0</td>
      <td class="t3a-num">5.00%</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.2</td>
    </tr>
    <tr>
      <td>办公环境改善项目</td>
      <td>甜甜圈集团公司</td>
      <td>综合管理部</td>
      <td>采购类无PO</td>
      <td>固定资产-电子与办公设备</td>
      <td>会议室显示系统（含拼接屏与音响）</td>
      <td class="t3a-num">8.0</td>
      <td>下月折</td>
      <td class="t3a-num">36.0</td>
      <td class="t3a-num">5.00%</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
    </tr>
    <tr>
      <td>冷链物流能力项目</td>
      <td>草莓慕斯公司</td>
      <td>销售部</td>
      <td>采购类有PO</td>
      <td>固定资产-运输工具</td>
      <td>冷链配送车（冷藏厢式货车）</td>
      <td class="t3a-num">4.0</td>
      <td>下月折</td>
      <td class="t3a-num">48.0</td>
      <td class="t3a-num">5.00%</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.2</td>
    </tr>
    <tr>
      <td>智能制造信息化项目</td>
      <td>芒果班戟公司</td>
      <td>研发中心</td>
      <td>采购类无PO</td>
      <td>无形资产-软件著作权/工业软件</td>
      <td>生产执行系统(MES)软件</td>
      <td class="t3a-num">1.0</td>
      <td>下月折</td>
      <td class="t3a-num">36.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">50.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">11.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
    </tr>
    <tr>
      <td>智能制造信息化项目</td>
      <td>芒果班戟公司</td>
      <td>研发中心</td>
      <td>采购类无PO</td>
      <td>无形资产-软件著作权/工业软件</td>
      <td>数据采集与监控(SCADA)软件</td>
      <td class="t3a-num">8.0</td>
      <td>下月折</td>
      <td class="t3a-num">36.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
    </tr>
    <tr>
      <td>研发成果转化项目</td>
      <td>芒果班戟公司</td>
      <td>研发中心</td>
      <td>采购类无PO</td>
      <td>无形资产-专利权</td>
      <td>烘焙工艺专利（发明专利权）</td>
      <td class="t3a-num">7.0</td>
      <td>下月折</td>
      <td class="t3a-num">120.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>研发成果转化项目</td>
      <td>芒果班戟公司</td>
      <td>研发中心</td>
      <td>采购类无PO</td>
      <td>无形资产-非专利技术</td>
      <td>配方保密技术（非专利技术）</td>
      <td class="t3a-num">8.0</td>
      <td>下月折</td>
      <td class="t3a-num">120.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">80.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>烘焙中心基建项目</td>
      <td>草莓慕斯公司</td>
      <td>制造工程部</td>
      <td>基建转固</td>
      <td>固定资产-房屋及建筑物</td>
      <td>烘焙中心厂房（生产用房屋建筑物）</td>
      <td class="t3a-num">6.0</td>
      <td>下月折</td>
      <td class="t3a-num">240.0</td>
      <td class="t3a-num">5.00%</td>
      <td class="t3a-num">500.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
    </tr>
    <tr>
      <td>烘焙中心基建项目</td>
      <td>草莓慕斯公司</td>
      <td>制造工程部</td>
      <td>基建转固</td>
      <td>固定资产-动力及辅助设施</td>
      <td>中央空调系统（厂房动力及辅助设施）</td>
      <td class="t3a-num">5.0</td>
      <td>下月折</td>
      <td class="t3a-num">120.0</td>
      <td class="t3a-num">5.00%</td>
      <td class="t3a-num">80.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>自制设备工程项目</td>
      <td>草莓慕斯公司</td>
      <td>制造工程部</td>
      <td>自制转固</td>
      <td>固定资产-生产机器设备</td>
      <td>自制打包流水线（自制整线设备）</td>
      <td class="t3a-num">2.0</td>
      <td>下月折</td>
      <td class="t3a-num">120.0</td>
      <td class="t3a-num">5.00%</td>
      <td class="t3a-num">25.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>自制设备工程项目</td>
      <td>草莓慕斯公司</td>
      <td>制造工程部</td>
      <td>自制转固</td>
      <td>固定资产-生产机器设备</td>
      <td>自制分拣装置（自制成套装置）</td>
      <td class="t3a-num">7.0</td>
      <td>下月折</td>
      <td class="t3a-num">120.0</td>
      <td class="t3a-num">5.00%</td>
      <td class="t3a-num">35.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>花果山园区用地项目</td>
      <td>甜甜圈集团公司</td>
      <td>综合管理部</td>
      <td>手工新增</td>
      <td>无形资产-土地使用权</td>
      <td>花果山园区地块（土地使用权）</td>
      <td class="t3a-num">1.0</td>
      <td>下月折</td>
      <td class="t3a-num">480.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">300.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">11.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>品牌建设项目</td>
      <td>甜甜圈集团公司</td>
      <td>市场部</td>
      <td>手工新增</td>
      <td>无形资产-商标权</td>
      <td>品牌商标注册（商标权）</td>
      <td class="t3a-num">9.0</td>
      <td>下月折</td>
      <td class="t3a-num">120.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.2</td>
    </tr>
    <tr>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>草莓慕斯公司</td>
      <td>制造交付中心本部</td>
      <td>代采购转入</td>
      <td>固定资产-生产机器设备</td>
      <td>生产机器设备（立式加工中心）</td>
      <td class="t3a-num">1.0</td>
      <td>下月折</td>
      <td class="t3a-num">120.0</td>
      <td class="t3a-num">5.00%</td>
      <td class="t3a-num">8,000.0</td>
      <td class="t3a-num">63.3</td>
      <td class="t3a-num">11.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">57.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">57.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">57.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">57.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">57.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">57.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">57.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">57.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">57.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">57.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">57.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>P2 三维五轴激光切管机</td>
      <td>蓝莓蛋挞公司</td>
      <td>研发中心本部</td>
      <td>代采购转入</td>
      <td>固定资产-研发实验仪器</td>
      <td>研发实验仪器（光谱分析仪）</td>
      <td class="t3a-num">5.0</td>
      <td>下月折</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">5.00%</td>
      <td class="t3a-num">420.0</td>
      <td class="t3a-num">6.7</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>草莓慕斯公司</td>
      <td>制造交付中心本部</td>
      <td>内部职场租赁</td>
      <td>固定资产-使用权资产</td>
      <td>天宫A座装备总装工坊（内部职场租赁资本化，原值=租赁负债初始）</td>
      <td class="t3a-num">1.0</td>
      <td>下月折</td>
      <td class="t3a-num">36.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">1,613.6</td>
      <td class="t3a-num">44.8</td>
      <td class="t3a-num">11.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">44.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">44.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">44.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">44.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">44.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">44.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">44.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">44.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">44.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">44.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">44.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>办公环境改善项目</td>
      <td>蓝莓蛋挞公司</td>
      <td>研发中心</td>
      <td>外部职场租赁</td>
      <td>固定资产-使用权资产</td>
      <td>史塔克大厦（外部职场租赁资本化，原值=租赁负债初始）</td>
      <td class="t3a-num">1.0</td>
      <td>下月折</td>
      <td class="t3a-num">36.0</td>
      <td class="t3a-num">0.00%</td>
      <td class="t3a-num">1,546.4</td>
      <td class="t3a-num">43.0</td>
      <td class="t3a-num">11.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">43.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">43.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">43.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">43.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">43.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">43.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">43.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">43.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">43.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">43.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">43.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 预算项目 | AA.6 预算项目主数据 / 来源表 | 按来源表带出：采购类=BB.3.1 预算项目、基建转固=BB.3.2 预算项目、自制转固=BB.4.1 预算项目、手工新增=BB.4.3 预算项目、代采购转入=BJ.C.e 预算项目、内部/外部职场租赁（使用权资产）=BB.4.2.b.1 / BB.4.2.a.1 对应租赁合同的预算项目（经 BB.4.3 带出） |
| 法人公司 | 法人指认规则 | 采购类直接取 BB.3.1.C 财务视角拆分后的法人（有PO=BB.3.1.A 有PO 表样按下单主体（管理单元）对应法人；无PO=BB.3.1.B 无PO 表样已在 BB.3.1.C 按 BAA.9.a 资产转换比例拆分完成，本表不再拆分法人）；自制设备/基建转固/其他固定资产=对应法人直接归属；代采购转入=受益主体(法人)（代采购资产由提供方 A 代买、资产卡片只在接受方 B 建，故法人取 BJ.C.e 的受益主体(法人)） |
| 预算部门 | AA.5 行政部门主数据字典（一级部门-二级部门） | 按来源表带出，默认明细到二级部门；部门独立于法人 |
| 来源 | BB.3.1/BB.3.2/BB.4.1/BB.4.3/BJ.C.e/BB.4.2.b.1/BB.4.2.a.1 | 可选值：采购类有PO（BB.3.1有PO到货）/采购类无PO（BB.3.1无PO到货）/基建转固（BB.3.2验收转固）/自制转固（BB.4.1.a转固转出）/手工新增（BB.4.3月度资产原值）/代采购转入（BJ.C.e 代采购资产查询表到货额，按明细行一行一卡）/内部职场租赁（BB.4.2.b.1 内部职场租赁·财务视角的资本化合同，使用权资产经 BB.4.3 自动带出）/外部职场租赁（BB.4.2.a.1 外部职场租赁·财务视角的资本化合同，使用权资产经 BB.4.3 自动带出）；两类职场租赁来源的资产类别恒为使用权资产、原值=租赁负债初始；代采购转入来源的卡片只在接受方 B 建（A 侧不建折旧卡） |
| 资产类别 | AA.9 资产类别与折旧 | 资产类别（取值域 AA.9 的层级写法「大类-小类」，全库只有一个字段「资产类别」、不设资产大类/小类）；采购类卡片取 BB.3.1.A / BB.3.1.B 采购视角明细行「一行一卡」的该行资产类别（无PO 的比例拆分只改变法人、不改变资产类别归属）；代采购转入卡片取 BB.3.1.D 关联交易视角「一行一卡」的该行资产类别（资产类别与原值经 BB.3.1.D 一并传给接受方 B）；资产类别=使用权资产（由内部 BB.4.2.b / 外部 BB.4.2.a 资本化租赁自动生成，原值=租赁负债初始）的卡片与其它新增资产一样在本表计提折旧：剩余年限(月数)=租赁期月数（由 BB.4.2.b.1/BB.4.2.a.1 带出）、残值率取 AA.9 默认（0%）、启用月=租赁期起始月 |
| 资产描述 | 本表生成 | 文本字段，仅用于人眼识别资产（如设备名称/规格/用途），不参与任何测算与分录；一行一卡，卡片描述随卡片一并带出——采购类取 BB.3.1.A / BB.3.1.B 采购视角明细行该行的「资产名称或备注」（一行一卡）、基建/自制转固=单项工程、手工新增=BB.4.3单条原值、代采购转入=BB.3.1.D 该行「代采购对象(资产名称/类别)」 |
| 启用月份 | 来源表 | 资产达到可使用状态并启用的月份（1~12月）；代采购转入=到货月份（到货月即转移月，A 侧不持有、零折旧） |
| 折旧惯例 | AA.9 资产类别与折旧（默认资产账簿） | 可选值：下月折/本月折；全系统默认下月折（当月新增下月起提） |
| 剩余年限(月数) | AA.9 资产类别与折旧（默认资产账簿）/ BB.4.2.b.1 / BB.4.2.a.1 | 普通资产 = AA.9 默认资产账簿的折旧年限(月)（AA.9 已按「月」维护，如 生产机器设备 120 个月）；使用权资产 = 租赁期月数（= 剩余租赁月数，由内部 BB.4.2.b.1 / 外部 BB.4.2.a.1 带出）；全局统一按「剩余年限(月数)」表达 |
| 预计净残值率 | AA.9 资产类别与折旧（默认资产账簿） | 基于默认资产账簿对应的资产类别；固定资产5.00%、无形资产0.00% |
| 本年新增原值 | BB.3.1到货额/BB.3.2验收额/BB.4.1.a转固转出/BB.4.3月度资产原值/BB.3.1.D到货额 | 单卡原值，取对应来源表单卡原值：采购类=BB.3.1.A / BB.3.1.B 采购视角明细行该行到货额（一行一卡），法人公司取 BB.3.1.C 财务视角的拆分结果（有PO 按下单主体直接指认法人、无PO 按 BAA.9.a 比例拆分到法人）；代采购转入=BB.3.1.D 明细行（一行一卡；原值=内部结算=到货额+加成款（含加成），到货月即转移月、启用月=到货月份） |
| 每月折旧额 | 本表公式 | =本年新增原值×(1−预计净残值率)÷剩余年限(月数)：年限平均法 |
| 本年折旧月数 | 本表公式 | =12−启用月份（下月折惯例）；本月折为13−启用月份 |
| 制造费用折旧 | BAA.9.b 折旧费用拆分比例 | 全年合计+1~12月逐月展开，单卡各月折旧按BAA.9.b比例拆分 |
| 研发费用折旧与摊销 | BAA.9.b 折旧费用拆分比例 | 全年合计+1~12月逐月展开，单卡各月折旧按BAA.9.b比例拆分 |
| 管理费用折旧与摊销 | BAA.9.b 折旧费用拆分比例 | 全年合计+1~12月逐月展开，单卡各月折旧按BAA.9.b比例拆分 |
| 销售费用折旧与摊销 | BAA.9.b 折旧费用拆分比例 | 全年合计+1~12月逐月展开，单卡各月折旧按BAA.9.b比例拆分 |
| 1~12月各月折旧额 | 本表公式 | 当月实际计提额（启用月次月起=每月折旧额，启用月及之前为0），每月按BAA.9.b比例拆入四大费用（每月4子列） |

## ④ 适用业务情形

**适用于**

- 本年新增资产（采购类有PO/采购类无PO、基建转固、自制转固、手工新增、使用权资产）的折旧与摊销测算：一行一卡，按 AA.9 参数（剩余年限(月数)、下月折）逐卡计提各月折旧，是本年增量折旧的唯一计提表与唯一追溯依据；资产类别=使用权资产的行由内部 BB.4.2.b / 外部 BB.4.2.a 资本化租赁自动生成（剩余年限(月数)=租赁期月数、残值率取 AA.9 默认 0%、启用月=租赁期起始月、原值=租赁负债初始）
- 折旧按 BAA.9.b 拆分四大费用后直接按法人公司维度生成折旧会计分录，并汇入 BB.4.X.A 存量+增量折旧汇总

**不适用于**

- 存量资产折旧（属 BB.4.4）
- 折旧的汇总展示与取数核对（属 BB.4.X.A）
- 资产原值/预付款/付款的填报（属 BB.3.1/BB.3.2/BB.4.1/BB.4.3）

## ⑤ 预算编制视角：数据关系总结

增量资产折旧计算表（独立表单，卡片段明细化，13维度列+4×13=65列）：归集本年五类新增资产（采购类有PO/采购类无PO/基建转固/自制转固/手工新增）与资本化职场租赁形成的使用权资产（来源=内部职场租赁 / 外部职场租赁，经 BB.4.3 由 BB.4.2.b.1 / BB.4.2.a.1 自动带出，原值=租赁负债初始）一行一卡，采购类卡片按 BB.3.1.A / BB.3.1.B 采购视角明细行「一行一卡」建卡（资产类别、资产描述取该明细行）、法人直接取 BB.3.1.C 财务视角拆分结果（有PO按下单主体对应法人、无PO已在 BB.3.1.C 按 BAA.9.a 拆分完成且比例拆分不改变资产类别，本表不再拆分），按 AA.9 参数测算单卡各月折旧，全年折旧按 BAA.9.b 拆分四大费用，并按法人公司维度直接生成折旧会计分录；是本年增量折旧的唯一计提表与唯一追溯依据。

**数据来源（上游）**

| 来源表 | 编码 | 取数字段 | 关系说明 |
| :--- | :--- | :--- | :--- |
| 设备及无形资产采购预算（财务视角） | BB.3.1.C | 拆分后法人×预算项目×预算部门的原值（到货额） | 采购类增量资产原值及法人归属来源；设备无PO的法人拆分仅在本年度的 BB.3.1.C 按 BAA.9.a 做一次，BB.4.5 直接取拆分后法人 |
| 基建工程采购预算 | BB.3.2 | 验收转固金额（按转固月份、法人公司）；附表 BB.3.2.b 末列资产描述（转固资产的描述（建筑物/工程名称、用途），仅人眼识别、不参与任何测算与分录） | 基建转固增量资产来源 |
| 自制设备工程预算 | BB.4.1 | BB.4.1.a 转固转出（按法人公司、转固月份、资产类别） | 自制转固增量资产来源 |
| 其他固定资产新增表 | BB.4.3 | 月度资产原值（按法人公司、资产类别） | 手工新增增量资产来源；资产类别=使用权资产的行同样进入本表（由内部 BB.4.2.b / 外部 BB.4.2.a 资本化租赁自动生成：原值=租赁负债初始、剩余年限(月数)=租赁期月数、残值率取 AA.9 默认 0%、启用月=租赁期起始月），与其它新增资产一样计提折旧 |
| 资产类别及折旧参数 | AA.9 | 折旧惯例/剩余年限(月数)/预计净残值率（取默认资产账簿对应参数） | 每月折旧额 = 本年新增原值 × (1 − 预计净残值率) ÷剩余年限(月数)，年限平均法 |
| 折旧费用拆分比例 | BAA.9.b | 制造/研发/管理/销售费用比例 | 全年折旧与各月折旧按 BAA.9.b 拆入四大费用 |

**输出影响（下游）**

| 目标报表 | 取数路径 |
| :--- | :--- |
| BB.4.X.A 折旧费用汇总表 | 增量折旧按资产类别×四大费用逐月归集入四大费用小计（本表是 BB.4.X.A 增量折旧部分的唯一追溯依据） |
| BO.PL 利润表—销售/管理/研发费用折旧与摊销 | 按 BAA.9.b 拆分后经 BB.4.X.A 取小计进 销售费用/管理费用/研发费用；制造费用折旧只进存货线，不在利润表直接取数也不与 BB.5.2「制造费用」项重叠取数 |
| BO.BS 资产负债表—固定资产 / 无形资产（净值） | 折旧分录按法人公司维度直接生成：存货/研发费用/管理费用/销售费用 (+)；固定资产 / 无形资产（净值）(−)；各法人单体入账、集团合并各法人间不互抵 |
| BB.3.X 进销存预算—在制品「费」腿 | 制造费用折旧经 BB.4.X.A「制造费用折旧」小计归集进在制品「费」转入数，与 BB.5.2「制造费用」项并列、两处不得重叠取数 |

**关键编制规则**

- 来源五类：采购类有PO / 采购类无PO / 基建转固 / 自制转固 / 手工新增；另含由资本化职场租赁自动带出的 内部职场租赁 / 外部职场租赁（使用权资产经 BB.4.3 由 BB.4.2.b.1 / BB.4.2.a.1 自动带出，原值=租赁负债初始）；启用月份=资产达到可使用状态并启用的月份。
- 采购类资产的法人直接取 BB.3.1.C 财务视角拆分结果——设备无PO拆分仅在本年度的 BB.3.1.C 做一次（按 BAA.9.a），BB.4.5 不再拆分。
- 折旧惯例=下月折（当月新增下月起提），本年折旧月数=12−启用月份；每月折旧额=本年新增原值×(1−预计净残值率)÷剩余年限(月数)。
- 折旧参数统一取默认资产账簿对应的 AA.9 参数；无形资产残值率 0%，摊销与折旧同口径按法人公司归集。

## ⑥ 财务报表项转换规则

本表共用口径：折旧分录按法人公司维度直接生成，各法人公司单体报表分别入账，集团合并时各法人间不互抵；折旧惯例=「下月折」（当月新增下月起提）、本年折旧月数=12−启用月份，折旧参数取默认资产账簿对应的 AA.9、无形资产残值率 0%；制造费用折旧只进存货线，不在利润表直接取数、也不与 BB.5.2「制造费用」项重叠取数。固定资产按净值列示（固定资产＝原值−累计折旧），分录统一以「固定资产（净值）」表述，累计折旧/原值仅作括号明细说明。

**报表取数**

| 度量/报表项 | 取数字段 | 损益表 PL | 资产负债表 BS | 现金流量表 CF |
| :--- | :--- | :--- | :--- | :--- |
| 增量资产折旧计提（按法人生成会计分录） | BB.4.5·每月折旧额 | 制造费用折旧→存货线；研发 / 管理 / 销售费用折旧与摊销→研发费用 / 管理费用(+) | 固定资产 / 无形资产（净值）(−) | —（折旧为非付现成本） |

**科目（报表项）入账**

| 度量/报表项 | 借 | 贷 |
| :--- | :--- | :--- |
| 增量资产折旧计提（按法人生成会计分录） | 存货、研发费用、管理费用、销售费用 | 固定资产（净值）、无形资产（净值） |
