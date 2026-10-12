# BJ.C 关联交易与内部抵销

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

### BJ.C.a 代采购物料查询表

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th" rowspan="2">下单主体</th>
      <th class="t3a-th" rowspan="2">受益主体</th>
      <th class="t3a-th" rowspan="2">预算项目</th>
      <th class="t3a-th" rowspan="2">预算部门</th>
      <th class="t3a-th" rowspan="2">物料类别</th>
      <th class="t3a-th" rowspan="2">代采购对象</th>
      <th class="t3a-th" rowspan="2">加成比例%(BAA.11带出)</th>
      <th class="t3a-th t3a-th--time" colspan="2">【全年合计】</th>
      <th class="t3a-th t3a-th--time" colspan="2">1月</th>
      <th class="t3a-th t3a-th--time" colspan="2">2月</th>
      <th class="t3a-th t3a-th--time" colspan="2">3月</th>
      <th class="t3a-th t3a-th--time" colspan="2">4月</th>
      <th class="t3a-th t3a-th--time" colspan="2">5月</th>
      <th class="t3a-th t3a-th--time" colspan="2">6月</th>
      <th class="t3a-th t3a-th--time" colspan="2">7月</th>
      <th class="t3a-th t3a-th--time" colspan="2">8月</th>
      <th class="t3a-th t3a-th--time" colspan="2">9月</th>
      <th class="t3a-th t3a-th--time" colspan="2">10月</th>
      <th class="t3a-th t3a-th--time" colspan="2">11月</th>
      <th class="t3a-th t3a-th--time" colspan="2">12月</th>
    </tr>
    <tr>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
    </tr>
    <tr>
      <td>草莓慕斯-泛烘焙装备制造单元</td>
      <td>蓝莓蛋挞-核心制造单元</td>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>机械与电气采购部</td>
      <td>生产物料</td>
      <td>高功率光纤激光切割头组件</td>
      <td class="t3a-num">10.0%</td>
      <td class="t3a-num">1,000.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>草莓慕斯-泛烘焙装备制造单元</td>
      <td>P2 三维五轴激光切管机</td>
      <td>研发中心本部</td>
      <td>研发物料</td>
      <td>三维五轴激光切管机功能部件样件（研发试制）</td>
      <td class="t3a-num">8.0%</td>
      <td class="t3a-num">500.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">50.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">50.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">50.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">50.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">50.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">50.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">50.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">50.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">50.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">50.0</td>
      <td class="t3a-num">4.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>甜甜圈集团公司</td>
      <td>集团统筹</td>
      <td>信息技术部</td>
      <td>服务物料</td>
      <td>机房耗材与备品备件（自购自用，不触发代采购）</td>
      <td>—</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
  </tbody>
</table>
</div>

### BJ.C.e 代采购资产查询表

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th" rowspan="2">下单主体</th>
      <th class="t3a-th" rowspan="2">受益主体</th>
      <th class="t3a-th" rowspan="2">预算项目</th>
      <th class="t3a-th" rowspan="2">预算部门</th>
      <th class="t3a-th" rowspan="2">资产类别</th>
      <th class="t3a-th" rowspan="2">代采购对象</th>
      <th class="t3a-th" rowspan="2">加成比例%(BAA.11带出)</th>
      <th class="t3a-th t3a-th--time" colspan="2">【全年合计】</th>
      <th class="t3a-th t3a-th--time" colspan="2">1月</th>
      <th class="t3a-th t3a-th--time" colspan="2">2月</th>
      <th class="t3a-th t3a-th--time" colspan="2">3月</th>
      <th class="t3a-th t3a-th--time" colspan="2">4月</th>
      <th class="t3a-th t3a-th--time" colspan="2">5月</th>
      <th class="t3a-th t3a-th--time" colspan="2">6月</th>
      <th class="t3a-th t3a-th--time" colspan="2">7月</th>
      <th class="t3a-th t3a-th--time" colspan="2">8月</th>
      <th class="t3a-th t3a-th--time" colspan="2">9月</th>
      <th class="t3a-th t3a-th--time" colspan="2">10月</th>
      <th class="t3a-th t3a-th--time" colspan="2">11月</th>
      <th class="t3a-th t3a-th--time" colspan="2">12月</th>
    </tr>
    <tr>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
      <th class="t3a-th t3a-th--time">到货额(万元)</th>
      <th class="t3a-th t3a-th--time">加成款(万元)</th>
    </tr>
    <tr>
      <td>草莓慕斯-泛烘焙装备制造单元</td>
      <td>蓝莓蛋挞-核心制造单元</td>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>机械与电气采购部</td>
      <td>固定资产-生产机器设备</td>
      <td>生产机器设备（立式加工中心）</td>
      <td class="t3a-num">10.0%</td>
      <td class="t3a-num">1,000.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">200.0</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">200.0</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">200.0</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">200.0</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>草莓慕斯-泛烘焙装备制造单元</td>
      <td>P2 三维五轴激光切管机</td>
      <td>研发中心本部</td>
      <td>固定资产-研发实验仪器</td>
      <td>研发实验仪器（光谱分析仪）</td>
      <td class="t3a-num">8.0%</td>
      <td class="t3a-num">420.0</td>
      <td class="t3a-num">33.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>甜甜圈集团公司</td>
      <td>集团统筹</td>
      <td>信息技术部</td>
      <td>固定资产-电子与办公设备</td>
      <td>企业级服务器集群（机房核心设备）（自购自用，不触发代采购）</td>
      <td>—</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
  </tbody>
</table>
</div>

### BJ.C.d 资产转卖预算表

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th" rowspan="2">卖方(法人)</th>
      <th class="t3a-th" rowspan="2">买方(法人)</th>
      <th class="t3a-th" rowspan="2">资产描述</th>
      <th class="t3a-th" rowspan="2">资产类别</th>
      <th class="t3a-th" rowspan="2">加成比例%(BAA.11带出)</th>
      <th class="t3a-th" rowspan="2">剩余折旧期限(月)</th>
      <th class="t3a-th t3a-th--time" colspan="3">【全年合计】</th>
      <th class="t3a-th t3a-th--time" colspan="3">1月</th>
      <th class="t3a-th t3a-th--time" colspan="3">2月</th>
      <th class="t3a-th t3a-th--time" colspan="3">3月</th>
      <th class="t3a-th t3a-th--time" colspan="3">4月</th>
      <th class="t3a-th t3a-th--time" colspan="3">5月</th>
      <th class="t3a-th t3a-th--time" colspan="3">6月</th>
      <th class="t3a-th t3a-th--time" colspan="3">7月</th>
      <th class="t3a-th t3a-th--time" colspan="3">8月</th>
      <th class="t3a-th t3a-th--time" colspan="3">9月</th>
      <th class="t3a-th t3a-th--time" colspan="3">10月</th>
      <th class="t3a-th t3a-th--time" colspan="3">11月</th>
      <th class="t3a-th t3a-th--time" colspan="3">12月</th>
    </tr>
    <tr>
      <th class="t3a-th t3a-th--time">账面净值(万元)</th>
      <th class="t3a-th t3a-th--time">加成收入(万元)</th>
      <th class="t3a-th t3a-th--time">转卖价(不含税)(万元)</th>
      <th class="t3a-th t3a-th--time">账面净值(万元)</th>
      <th class="t3a-th t3a-th--time">加成收入(万元)</th>
      <th class="t3a-th t3a-th--time">转卖价(不含税)(万元)</th>
      <th class="t3a-th t3a-th--time">账面净值(万元)</th>
      <th class="t3a-th t3a-th--time">加成收入(万元)</th>
      <th class="t3a-th t3a-th--time">转卖价(不含税)(万元)</th>
      <th class="t3a-th t3a-th--time">账面净值(万元)</th>
      <th class="t3a-th t3a-th--time">加成收入(万元)</th>
      <th class="t3a-th t3a-th--time">转卖价(不含税)(万元)</th>
      <th class="t3a-th t3a-th--time">账面净值(万元)</th>
      <th class="t3a-th t3a-th--time">加成收入(万元)</th>
      <th class="t3a-th t3a-th--time">转卖价(不含税)(万元)</th>
      <th class="t3a-th t3a-th--time">账面净值(万元)</th>
      <th class="t3a-th t3a-th--time">加成收入(万元)</th>
      <th class="t3a-th t3a-th--time">转卖价(不含税)(万元)</th>
      <th class="t3a-th t3a-th--time">账面净值(万元)</th>
      <th class="t3a-th t3a-th--time">加成收入(万元)</th>
      <th class="t3a-th t3a-th--time">转卖价(不含税)(万元)</th>
      <th class="t3a-th t3a-th--time">账面净值(万元)</th>
      <th class="t3a-th t3a-th--time">加成收入(万元)</th>
      <th class="t3a-th t3a-th--time">转卖价(不含税)(万元)</th>
      <th class="t3a-th t3a-th--time">账面净值(万元)</th>
      <th class="t3a-th t3a-th--time">加成收入(万元)</th>
      <th class="t3a-th t3a-th--time">转卖价(不含税)(万元)</th>
      <th class="t3a-th t3a-th--time">账面净值(万元)</th>
      <th class="t3a-th t3a-th--time">加成收入(万元)</th>
      <th class="t3a-th t3a-th--time">转卖价(不含税)(万元)</th>
      <th class="t3a-th t3a-th--time">账面净值(万元)</th>
      <th class="t3a-th t3a-th--time">加成收入(万元)</th>
      <th class="t3a-th t3a-th--time">转卖价(不含税)(万元)</th>
      <th class="t3a-th t3a-th--time">账面净值(万元)</th>
      <th class="t3a-th t3a-th--time">加成收入(万元)</th>
      <th class="t3a-th t3a-th--time">转卖价(不含税)(万元)</th>
      <th class="t3a-th t3a-th--time">账面净值(万元)</th>
      <th class="t3a-th t3a-th--time">加成收入(万元)</th>
      <th class="t3a-th t3a-th--time">转卖价(不含税)(万元)</th>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>蓝莓蛋挞公司</td>
      <td>高功率光纤激光切割头组件（整机系统）</td>
      <td>固定资产-生产机器设备</td>
      <td class="t3a-num">10.0%</td>
      <td class="t3a-num">24.0</td>
      <td class="t3a-num">600.0</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">660.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">600.0</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">660.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>橙子蛋糕公司</td>
      <td>高精度光谱分析仪（研发检测仪器）</td>
      <td>固定资产-研发实验仪器</td>
      <td class="t3a-num">8.0%</td>
      <td class="t3a-num">36.0</td>
      <td class="t3a-num">420.0</td>
      <td class="t3a-num">33.6</td>
      <td class="t3a-num">453.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">420.0</td>
      <td class="t3a-num">33.6</td>
      <td class="t3a-num">453.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
  </tbody>
</table>
</div>

### BJ.C.f 内部借款预算表

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th" rowspan="2">借款方向</th>
      <th class="t3a-th" rowspan="2">本方法人</th>
      <th class="t3a-th" rowspan="2">对手方法人</th>
      <th class="t3a-th" rowspan="2">利率</th>
      <th class="t3a-th" rowspan="2">期限（月）</th>
      <th class="t3a-th" rowspan="2">到期时间</th>
      <th class="t3a-th" rowspan="2">期初净额</th>
      <th class="t3a-th t3a-th--time" colspan="5">【全年合计】</th>
      <th class="t3a-th t3a-th--time" colspan="5">1月</th>
      <th class="t3a-th t3a-th--time" colspan="5">2月</th>
      <th class="t3a-th t3a-th--time" colspan="5">3月</th>
      <th class="t3a-th t3a-th--time" colspan="5">4月</th>
      <th class="t3a-th t3a-th--time" colspan="5">5月</th>
      <th class="t3a-th t3a-th--time" colspan="5">6月</th>
      <th class="t3a-th t3a-th--time" colspan="5">7月</th>
      <th class="t3a-th t3a-th--time" colspan="5">8月</th>
      <th class="t3a-th t3a-th--time" colspan="5">9月</th>
      <th class="t3a-th t3a-th--time" colspan="5">10月</th>
      <th class="t3a-th t3a-th--time" colspan="5">11月</th>
      <th class="t3a-th t3a-th--time" colspan="5">12月</th>
    </tr>
    <tr>
      <th class="t3a-th t3a-th--time">当月新增</th>
      <th class="t3a-th t3a-th--time">当月还本</th>
      <th class="t3a-th t3a-th--time">当月计提利息</th>
      <th class="t3a-th t3a-th--time">当月实付利息</th>
      <th class="t3a-th t3a-th--time">融资费用</th>
      <th class="t3a-th t3a-th--time">当月新增</th>
      <th class="t3a-th t3a-th--time">当月还本</th>
      <th class="t3a-th t3a-th--time">当月计提利息</th>
      <th class="t3a-th t3a-th--time">当月实付利息</th>
      <th class="t3a-th t3a-th--time">融资费用</th>
      <th class="t3a-th t3a-th--time">当月新增</th>
      <th class="t3a-th t3a-th--time">当月还本</th>
      <th class="t3a-th t3a-th--time">当月计提利息</th>
      <th class="t3a-th t3a-th--time">当月实付利息</th>
      <th class="t3a-th t3a-th--time">融资费用</th>
      <th class="t3a-th t3a-th--time">当月新增</th>
      <th class="t3a-th t3a-th--time">当月还本</th>
      <th class="t3a-th t3a-th--time">当月计提利息</th>
      <th class="t3a-th t3a-th--time">当月实付利息</th>
      <th class="t3a-th t3a-th--time">融资费用</th>
      <th class="t3a-th t3a-th--time">当月新增</th>
      <th class="t3a-th t3a-th--time">当月还本</th>
      <th class="t3a-th t3a-th--time">当月计提利息</th>
      <th class="t3a-th t3a-th--time">当月实付利息</th>
      <th class="t3a-th t3a-th--time">融资费用</th>
      <th class="t3a-th t3a-th--time">当月新增</th>
      <th class="t3a-th t3a-th--time">当月还本</th>
      <th class="t3a-th t3a-th--time">当月计提利息</th>
      <th class="t3a-th t3a-th--time">当月实付利息</th>
      <th class="t3a-th t3a-th--time">融资费用</th>
      <th class="t3a-th t3a-th--time">当月新增</th>
      <th class="t3a-th t3a-th--time">当月还本</th>
      <th class="t3a-th t3a-th--time">当月计提利息</th>
      <th class="t3a-th t3a-th--time">当月实付利息</th>
      <th class="t3a-th t3a-th--time">融资费用</th>
      <th class="t3a-th t3a-th--time">当月新增</th>
      <th class="t3a-th t3a-th--time">当月还本</th>
      <th class="t3a-th t3a-th--time">当月计提利息</th>
      <th class="t3a-th t3a-th--time">当月实付利息</th>
      <th class="t3a-th t3a-th--time">融资费用</th>
      <th class="t3a-th t3a-th--time">当月新增</th>
      <th class="t3a-th t3a-th--time">当月还本</th>
      <th class="t3a-th t3a-th--time">当月计提利息</th>
      <th class="t3a-th t3a-th--time">当月实付利息</th>
      <th class="t3a-th t3a-th--time">融资费用</th>
      <th class="t3a-th t3a-th--time">当月新增</th>
      <th class="t3a-th t3a-th--time">当月还本</th>
      <th class="t3a-th t3a-th--time">当月计提利息</th>
      <th class="t3a-th t3a-th--time">当月实付利息</th>
      <th class="t3a-th t3a-th--time">融资费用</th>
      <th class="t3a-th t3a-th--time">当月新增</th>
      <th class="t3a-th t3a-th--time">当月还本</th>
      <th class="t3a-th t3a-th--time">当月计提利息</th>
      <th class="t3a-th t3a-th--time">当月实付利息</th>
      <th class="t3a-th t3a-th--time">融资费用</th>
      <th class="t3a-th t3a-th--time">当月新增</th>
      <th class="t3a-th t3a-th--time">当月还本</th>
      <th class="t3a-th t3a-th--time">当月计提利息</th>
      <th class="t3a-th t3a-th--time">当月实付利息</th>
      <th class="t3a-th t3a-th--time">融资费用</th>
      <th class="t3a-th t3a-th--time">当月新增</th>
      <th class="t3a-th t3a-th--time">当月还本</th>
      <th class="t3a-th t3a-th--time">当月计提利息</th>
      <th class="t3a-th t3a-th--time">当月实付利息</th>
      <th class="t3a-th t3a-th--time">融资费用</th>
    </tr>
    <tr>
      <td>借入</td>
      <td>草莓慕斯公司</td>
      <td>甜甜圈集团公司</td>
      <td class="t3a-num">3.50%</td>
      <td class="t3a-num">12.0</td>
      <td>2027-12-31</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3,000.0</td>
      <td class="t3a-num">1,000.0</td>
      <td class="t3a-num">79.2</td>
      <td class="t3a-num">78.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3,000.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">26.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1,000.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">52.5</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>借出</td>
      <td>甜甜圈集团公司</td>
      <td>草莓慕斯公司</td>
      <td class="t3a-num">3.50%</td>
      <td class="t3a-num">12.0</td>
      <td>2027-12-31</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3,000.0</td>
      <td class="t3a-num">1,000.0</td>
      <td class="t3a-num">79.2</td>
      <td class="t3a-num">78.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3,000.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">26.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1,000.0</td>
      <td class="t3a-num">8.8</td>
      <td class="t3a-num">52.5</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
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
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td rowspan="2" colspan="72">编制说明与业务要点：
1、融资类型固定为 XYZ-16 内部借款（集团内部类），本表不设「融资类型」列；外部/银行类借款请在 BF.3.c 融资预算明细表编制；
2、借款方向列决定分录路由：借入方对应提款增加 2241.1、还本减少 2241.1、利息计提进 6604.1、利息实付冲 2241.1 现金流归 CF-21；借出方对应放款增加 1221.1 现金流归 CF-22.1、还本冲 1221.1 现金流归 CF-19.2、利息计提（收息）进 6001.2、实收利息收现归 CF-19.2；
3、集团合并抵销：集团合并层按「本方法人 + 对手方法人」配对：1221.1 ↔ 2241.1 互抵归零，6001.2 ↔ 6604.1 互抵归零，CF-18 ↔ CF-22.1、CF-20/CF-21 ↔ CF-19.2 现金流全额对冲；
4、本表按本方法人编制，不并入 BF.3.d 外部融资汇总表。</td>
    </tr>
  </tbody>
</table>
</div>

### BJ.C.g 内部销售预算

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th" rowspan="2">内部供应商(卖出方)</th>
      <th class="t3a-th" rowspan="2">内部客户(买入方)</th>
      <th class="t3a-th" rowspan="2">交易类型</th>
      <th class="t3a-th" rowspan="2">入库类型(买入方)</th>
      <th class="t3a-th" rowspan="2">产品/物料</th>
      <th class="t3a-th" rowspan="2">预算部门</th>
      <th class="t3a-th t3a-th--time" colspan="7">【全年合计】</th>
      <th class="t3a-th t3a-th--time" colspan="7">1月</th>
      <th class="t3a-th t3a-th--time" colspan="7">2月</th>
      <th class="t3a-th t3a-th--time" colspan="7">3月</th>
      <th class="t3a-th t3a-th--time" colspan="7">4月</th>
      <th class="t3a-th t3a-th--time" colspan="7">5月</th>
      <th class="t3a-th t3a-th--time" colspan="7">6月</th>
      <th class="t3a-th t3a-th--time" colspan="7">7月</th>
      <th class="t3a-th t3a-th--time" colspan="7">8月</th>
      <th class="t3a-th t3a-th--time" colspan="7">9月</th>
      <th class="t3a-th t3a-th--time" colspan="7">10月</th>
      <th class="t3a-th t3a-th--time" colspan="7">11月</th>
      <th class="t3a-th t3a-th--time" colspan="7">12月</th>
    </tr>
    <tr>
      <th class="t3a-th t3a-th--time">数量</th>
      <th class="t3a-th t3a-th--time">卖出方单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部销售单价</th>
      <th class="t3a-th t3a-th--time">卖出方成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">数量</th>
      <th class="t3a-th t3a-th--time">卖出方单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部销售单价</th>
      <th class="t3a-th t3a-th--time">卖出方成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">数量</th>
      <th class="t3a-th t3a-th--time">卖出方单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部销售单价</th>
      <th class="t3a-th t3a-th--time">卖出方成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">数量</th>
      <th class="t3a-th t3a-th--time">卖出方单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部销售单价</th>
      <th class="t3a-th t3a-th--time">卖出方成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">数量</th>
      <th class="t3a-th t3a-th--time">卖出方单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部销售单价</th>
      <th class="t3a-th t3a-th--time">卖出方成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">数量</th>
      <th class="t3a-th t3a-th--time">卖出方单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部销售单价</th>
      <th class="t3a-th t3a-th--time">卖出方成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">数量</th>
      <th class="t3a-th t3a-th--time">卖出方单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部销售单价</th>
      <th class="t3a-th t3a-th--time">卖出方成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">数量</th>
      <th class="t3a-th t3a-th--time">卖出方单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部销售单价</th>
      <th class="t3a-th t3a-th--time">卖出方成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">数量</th>
      <th class="t3a-th t3a-th--time">卖出方单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部销售单价</th>
      <th class="t3a-th t3a-th--time">卖出方成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">数量</th>
      <th class="t3a-th t3a-th--time">卖出方单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部销售单价</th>
      <th class="t3a-th t3a-th--time">卖出方成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">数量</th>
      <th class="t3a-th t3a-th--time">卖出方单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部销售单价</th>
      <th class="t3a-th t3a-th--time">卖出方成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">数量</th>
      <th class="t3a-th t3a-th--time">卖出方单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部销售单价</th>
      <th class="t3a-th t3a-th--time">卖出方成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">数量</th>
      <th class="t3a-th t3a-th--time">卖出方单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部销售单价</th>
      <th class="t3a-th t3a-th--time">卖出方成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
    </tr>
    <tr>
      <td>甜甜圈(东莞)装备公司</td>
      <td>甜甜圈集团公司</td>
      <td>物料销售</td>
      <td>原材料</td>
      <td>钢板 SPHC</td>
      <td>生产一部</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">50.00</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">80.00</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">60.00</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">12.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>甜甜圈(苏州)软件公司</td>
      <td>甜甜圈集团公司</td>
      <td>产成品销售</td>
      <td>产成品</td>
      <td>MES 软件 V3</td>
      <td>销售二部</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.00</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.00</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">30.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
  </tbody>
</table>
</div>

## 表概述

【是什么】集团子公司之间内部业务往来的汇总组。涵盖代采购物料、代采购资产、存量资产内售、内部借款、内部职场租赁、内部物料销售、内部人工销售与内部产品销售八类业务。
【谁填】汇总查询表，由采购、资产、资金和销售各业务表自动带出明细，集团财务在此审核。
【怎么填】代采物料（BJ.C.a）和设备（BJ.C.e）自动同步采购表；存量资产内售（BJ.C.d）、内部借款（BJ.C.f）和内部产品销售（BJ.C.g）按笔录入交易双方和定价金额。
【系统怎么处理】单体公司按实际业务入账、开票并计算增值税；双方通过内部往来（1221.1 / 2241.1）按月结算。
【合并时】合并三表冲销内部购销收入与成本、内部往来余额和内部调拨现金流，期末未实现的内部利润按规则转出，合并报表只反映对外真实经营成果。

## ② 字段与值说明

**BJ.C.a 代采购物料查询表**

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 下单主体 | BB.3.3.D 关联交易视角（下单主体=对外下单签约付款方） | 对外下单并签约付款的管理单元所属法人（代采购提供方） |
| 受益主体 | BB.3.3.D 关联交易视角（受益主体=实际使用方） | 物料实际使用与领料的管理单元所属法人（委托方） |
| 预算项目 | BB.3.3.D 关联交易视角 | 物料代采购归属的预算项目 |
| 预算部门 | BB.3.3.D 关联交易视角 | 物料代采购归属的二级预算部门 |
| 物料类别 | BB.3.3.D 关联交易视角（AB.9 存货物料类别字典） | 存货类别（生产物料/研发物料/服务物料/专项储备/其他物料/自制设备用料），决定进销存转入转出分类 |
| 代采购对象 | BB.3.3.D 关联交易视角「代采购对象」 | 物料名称或规格描述，用于人眼识别与核对 |
| 加成比例%(BAA.11带出) | BAA.11 关联交易加成比例（内部交易类型=代采购物料 × 预算项目） | 跨法人代采购时系统自动带出；同法人自购自用时显示“—” |
| 到货额(万元) | BB.3.3.D 关联交易视角（到货额=对外采购到货额（平价）） | 月度代采购物料对外采购到货额（平价，不含税）；受益方法人存货入账原值=内部结算=到货额+加成款；全年合计自动求和 |
| 到货额(万元)全年合计 | 本表公式 | =SUM(1~12月到货额) |
| 加成款(万元) | 本表公式 | =当月到货额×加成比例（同法人不触发时为 0）；合并层全额抵销 |
| 加成款(万元)全年合计 | 本表公式 | =SUM(1~12月加成款) |

**BJ.C.e 代采购资产查询表**

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 下单主体 | BB.3.1.D 关联交易视角（下单主体=对外下单签约付款方） | 对外下单签约付款的管理单元所属法人（代采购提供方） |
| 受益主体 | BB.3.1.D 关联交易视角（受益主体=实际使用方） | 设备实际使用与折旧承担的管理单元所属法人（委托方） |
| 预算项目 | BB.3.1.D 关联交易视角 | 设备代采购归属的预算项目 |
| 预算部门 | BB.3.1.D 关联交易视角 | 设备代采购归属的二级预算部门 |
| 资产类别 | BB.3.1.D 关联交易视角（AA.9 资产类别与折旧） | 资产类别（大类-小类），决定受益方在 BB.4.5 建卡时的折旧年限与残值率 |
| 代采购对象 | BB.3.1.D 关联交易视角「代采购对象」 | 设备或无形资产名称及规格，用于人眼识别与资产卡片匹配 |
| 加成比例%(BAA.11带出) | BAA.11 关联交易加成比例（内部交易类型=代采购资产 × 预算项目） | 跨法人代采购时系统自动带出；同法人自购自用时显示“—” |
| 到货额(万元) | BB.3.1.D 关联交易视角（到货额=对外采购到货额（平价）） | 月度代采购设备对外采购到货额（平价，不含税）；受益方资产入账原值=内部结算=到货额+加成款；全年合计自动求和 |
| 到货额(万元)全年合计 | 本表公式 | =SUM(1~12月到货额) |
| 加成款(万元) | 本表公式 | =当月到货额×加成比例（同法人不触发时为 0）；合并层全额抵销 |
| 加成款(万元)全年合计 | 本表公式 | =SUM(1~12月加成款) |

**BJ.C.d 资产转卖预算表**

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 卖方(法人) | AA.2 法人组织架构 | 转卖资产的原持有法人（资产出让方） |
| 买方(法人) | AA.2 法人组织架构 | 受让该资产的集团内法人（资产接收方） |
| 资产描述 | 本表录入 | 转让资产的名称及规格型号，仅人眼识别，不参与测算 |
| 资产类别 | AA.9 资产类别与折旧字典 | 资产类别（大类-小类），与 BB.4.5 同口径 |
| 加成比例(%) | BAA.11 关联交易加成比例（内部交易类型=资产转卖） | 系统按内部交易类型=资产转卖自动带出 |
| 剩余折旧期限(月) | 本表录入 | 买方受让后尚可计提折旧的月数 |
| 账面净值(万元) | 本表录入 | 资产转让时的账面净值（原值−累计折旧），在交易发生月份填列；全年合计自动求和 |
| 加成收入(万元) | 本表公式 | = 账面净值 × 加成比例%，即卖方确认的资产处置收益 |
| 转卖价(不含税)(万元) | 本表公式 | = 账面净值 + 加成收入，买方受让该资产的入账金额 |

**BJ.C.f 内部借款预算表**

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 借款方向 | 本表录入（枚举：借入/借出） | 枚举：借入/借出；决定报表项路由——借入方进“其他应付款—内部往来”与“财务费用”，借出方进“其他应收款—内部往来”与“财务费用”（或营业收入—内部往来） |
| 本方法人 | AA.2 法人组织架构 | 发起借款或承接资金的本方法人公司；单体报表落点按此归集 |
| 对手方法人 | AA.2 法人组织架构 | 借款交易的对手方内部法人；合并层按“本方法人+对手方法人”两两配对抵销 |
| 利率 | 本表录入 | 内部借款协议约定的年化利率（%）；月度计提利息 = 借款本金 × 利率 ÷ 12 |
| 期限（月） | 本表录入 | 借款期限（月数）；用于人眼识别与到期资金排期 |
| 到期时间 | 本表录入 | 内部借款协议到期日期（如 2027-12-31） |
| 期初净额 | 本表录入 | 上年末未偿还的内部借款本金余额（不含应计利息） |
| 当月新增 | 本表录入 | 1~12月各月新增借款本金额；借入方为提款资金流入，借出方为放款资金流出 |
| 当月还本 | 本表录入 | 1~12月各月偿还借款本金额；借入方为还本流出，借出方为收本流入 |
| 当月计提利息 | 本表录入 | 按权责发生制当月应计提的利息发生额；借入方计入“财务费用”，借出方计入“财务费用”（冲减）或“营业收入—内部往来” |
| 当月实付利息 | 本表录入 | 按现金收付制当月实际收付的利息金额；借入方付现归 CF-21，借出方收现归 CF-19.2 |
| 融资费用 | 本表录入 | 内部资金调拨发生的手续费或服务费，直接费用化进 6604 |
| 备注 | 本表录入 | 借款用途、展期协议等说明性备注 |

**BJ.C.g 内部销售预算**

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 序号 | 本表 | 行次序号 |
| 内部供应商(卖出方) | AA.2 法人组织架构 | 供应产品或物料的集团内法人公司（销售方） |
| 内部客户(买入方) | AA.2 法人组织架构 | 采购该产品或物料的集团内法人公司（购买方） |
| 交易类型 | 本表枚举 | 交易类型（物料销售 / 产成品销售 / 配套件销售） |
| 入库类型(买入方) | 本表枚举 | 买入方接收后的存货管理类别（原材料 / 在制品 / 产成品） |
| 产品/物料 | AA.7 预算产品 / AA.11 物料主数据 | 内部购销的标的物料或产品名称 |
| 预算部门 | AA.5 行政部门主数据字典 | 业务归属的二级预算部门 |
| 数量 | 本表录入 | 1~12月各月计划内部销售数量；全年合计自动求和 |
| 卖出方单位成本 | BAA.2 / BAA.4 标准成本 | 卖出方的单位取得或制造标准成本（万元） |
| 加成比例 | BAA.11 关联交易加成比例 | 系统按内部交易类型=内部产品销售自动带出的加成比例 |
| 内部销售单价 | 本表公式 | =卖出方单位成本×(1+加成比例)，即买入方的入账单价 |
| 卖出方成本额 | 本表公式 | =数量×卖出方单位成本，即卖出方法人结转的“营业成本—内部往来” |
| 加成额 | 本表公式 | =卖出方成本额×加成比例，即内部交易加成溢价（未实现内部利润源头） |
| 内部销售额 | 本表公式 | =卖出方成本额+加成额=数量×内部销售单价，即卖出方确认的“营业收入—内部往来” |

## ③ 关键规则要点

**BJ.C 关联交易与内部抵销**

- 【八类内部关联交易】
① 代采购物料（BJ.C.a）：镜像展示 BB.3.3.D，记录统购原材料按含加成完整转移价转移与加成。
② 代采购资产（BJ.C.e）：镜像展示 BB.3.1.D，记录统购设备转入使用方资产卡片与加成。
③ 存量资产内售（BJ.C.d）：记录已有折旧的存量设备调拨，核算卖方加成收益（6115）。
④ 内部借款（BJ.C.f）：记录子公司之间的资金拆借本金、计提利息与实付利息。
⑤ 内部职场租赁（BB.4.2.b）：长租资本化转 .b.1，记录内部租金与使用权资产。
⑥ 内部物料销售（BB.1.3.d/.f）：A 卖物料给 B 对客项目，真实购销、加成进成本。
⑦ 内部人工销售（BB.1.3.g/.i）：A 卖人工服务给 B 对客项目，真实服务购销、加成进成本。
⑧ 内部产品销售（BJ.C.g）：A 卖自产产成品给 B、B 作半成品再加工后对外卖，A 按 6001.1 主营业务收入确认。
- 【单体独立核算】各子公司按独立纳税人和会计主体核算。内部交易按成本加成或协议价定价，开票并计算增值税（货物13%、服务6%、不动产租赁9%、有形动产租赁13%），各单体如实反映经营业绩。
- 【合并抵销】集团合并时冲销内部交易：
- 利润表：内部收入与内部成本/费用等额冲销，对合并净利润无净影响；
- 资产负债表：内部应收款（1221.1）与内部应付款（2241.1）两两对冲清零；
- 现金流量表：内部结算资金收付等额对冲，合并现金流只保留对外收支。

## ④ 适用业务情形

**适用于**

- 跨法人的物料代采、设备代采、资产转让、资金借贷及内部商品购销
- 集团编制合并预算三表时的内部交易抵销底稿核对与平衡校验

**不适用于**

- 同一法人内部车间、部门之间的物料领用与调拨
- 直接对外部客户的销售与对外部供应商的采购

## ⑤ 预算编制视角：数据关系总结

本组连接业务编制与财务三表合并：前端业务表驱动单体入账，BJ.C 汇总八类交易明细，向 BO.ELIM 传递抵销数据，最终消除合并三表中的内部交易金额。

**数据来源（上游）**

| 来源表 | 编码 | 取数字段 | 关系说明 |
| :--- | :--- | :--- | :--- |
| 物料采购关联交易视角 | BB.3.3.D | 到货额、加成款 | 驱动 BJ.C.a 代采购物料查询表 |
| 设备采购关联交易视角 | BB.3.1.D | 到货额、加成款 | 驱动 BJ.C.e 代采购资产查询表 |
| 关联交易加成比例 | BAA.11 | 加成比例(%) | 提供各类内部交易的定价加成参数 |

**输出影响（下游）**

| 目标报表 | 取数路径 |
| :--- | :--- |
| BO.ELIM 集团合并抵销工作底稿 | 按规则生成合并抵销分录 |
| BO.PL / BO.BS / BO.CF 合并三表 | 抵销内部购销、内部往来及内部资金调拨，输出对外报表 |

**关键编制规则**

- 同笔交易双方金额必须一致：卖方收入等于买方成本或资产，内部应收等于内部应付。

## ⑥ 财务报表项转换规则

**内部关联交易汇总抵销** `月度交易金额`

- 取数说明：BJ.C 关联交易与内部抵销套表（各子表汇总）
- 损益表 PL：内部收入与内部成本/费用等额对冲，合并净利润不受内部交易影响
- 资产负债表 BS：内部应收款（1221.1）与内部应付款（2241.1）配对抵销
- 现金流量表 CF：跨法人内部结算的现金流入与流出等额互抵，合并现金流只留外部真实收支
- 科目影响：借：营业收入（内部销售/加成）<br>  贷：营业成本 / 管理费用 / 存货 / 固定资产<br>借：其他应付款-内部往来（2241.1）<br>  贷：其他应收款-内部往来（1221.1)
- 其他备注：交易双方金额必须相等，抵销后对集团整体净利润无净影响。
