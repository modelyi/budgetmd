# AA.9 资产类别与折旧

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

### AA.9 资产类别及折旧参数

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">资产账簿</th>
      <th class="t3a-th">资产类别</th>
      <th class="t3a-th">折旧方法</th>
      <th class="t3a-th">折旧惯例</th>
      <th class="t3a-th">折旧年限(月)</th>
      <th class="t3a-th">残值率</th>
      <th class="t3a-th">备注</th>
    </tr>
    <tr>
      <td>甲资产账簿</td>
      <td>固定资产-生产机器设备</td>
      <td>年限平均法</td>
      <td>当月增加、次月计提</td>
      <td class="t3a-num">120</td>
      <td class="t3a-num">5%</td>
      <td>税法最低120个月(10年)；高端装备可享加速折旧</td>
    </tr>
    <tr>
      <td>甲资产账簿</td>
      <td>固定资产-研发实验仪器</td>
      <td>年限平均法</td>
      <td>当月增加、次月计提</td>
      <td class="t3a-num">60</td>
      <td class="t3a-num">5%</td>
      <td>会计估计60个月(5年)；研发用途可享加计扣除</td>
    </tr>
    <tr>
      <td>甲资产账簿</td>
      <td>固定资产-电子与办公设备</td>
      <td>年限平均法</td>
      <td>当月增加、次月计提</td>
      <td class="t3a-num">36</td>
      <td class="t3a-num">5%</td>
      <td>电子设备税法最低36个月(3年)</td>
    </tr>
    <tr>
      <td>甲资产账簿</td>
      <td>固定资产-运输工具</td>
      <td>年限平均法</td>
      <td>当月增加、次月计提</td>
      <td class="t3a-num">48</td>
      <td class="t3a-num">5%</td>
      <td>运输工具税法最低48个月(4年)</td>
    </tr>
    <tr>
      <td>甲资产账簿</td>
      <td>固定资产-房屋及建筑物</td>
      <td>年限平均法</td>
      <td>当月增加、次月计提</td>
      <td class="t3a-num">240</td>
      <td class="t3a-num">5%</td>
      <td>房屋建筑物税法最低240个月(20年)</td>
    </tr>
    <tr>
      <td>甲资产账簿</td>
      <td>固定资产-动力及辅助设施</td>
      <td>年限平均法</td>
      <td>当月增加、次月计提</td>
      <td class="t3a-num">120</td>
      <td class="t3a-num">5%</td>
      <td>动力站房等比照机器设备120个月(10年)</td>
    </tr>
    <tr>
      <td>甲资产账簿</td>
      <td>固定资产-工具器具及模具</td>
      <td>年限平均法</td>
      <td>当月增加、次月计提</td>
      <td class="t3a-num">60</td>
      <td class="t3a-num">5%</td>
      <td>器具工具税法最低60个月(5年)</td>
    </tr>
    <tr>
      <td>甲资产账簿</td>
      <td>无形资产-软件著作权/工业软件</td>
      <td>直线法</td>
      <td>当月增加、当月摊销</td>
      <td class="t3a-num">36</td>
      <td class="t3a-num">0%</td>
      <td>重点软件企业摊销最短24个月(2年)</td>
    </tr>
    <tr>
      <td>甲资产账簿</td>
      <td>无形资产-专利权</td>
      <td>直线法</td>
      <td>当月增加、当月摊销</td>
      <td class="t3a-num">120</td>
      <td class="t3a-num">0%</td>
      <td>外购专利不低于120个月(10年)摊销</td>
    </tr>
    <tr>
      <td>甲资产账簿</td>
      <td>无形资产-非专利技术</td>
      <td>直线法</td>
      <td>当月增加、当月摊销</td>
      <td class="t3a-num">120</td>
      <td class="t3a-num">0%</td>
      <td>按合同及受益年限，无约定不低于120个月(10年)</td>
    </tr>
    <tr>
      <td>甲资产账簿</td>
      <td>无形资产-土地使用权</td>
      <td>直线法</td>
      <td>当月增加、当月摊销</td>
      <td class="t3a-num">480</td>
      <td class="t3a-num">0%</td>
      <td>工业用地480个月(40年)；与地上建筑物分别核算</td>
    </tr>
    <tr>
      <td>甲资产账簿</td>
      <td>无形资产-商标权</td>
      <td>直线法</td>
      <td>当月增加、当月摊销</td>
      <td class="t3a-num">120</td>
      <td class="t3a-num">0%</td>
      <td>外购商标不低于120个月(10年)摊销</td>
    </tr>
  </tbody>
</table>
</div>

按资产类别（大类-小类）维护折旧方法、折旧惯例、折旧年限(月)、残值率；固定资产-使用权资产的折旧参数取本行默认账簿（方法=年限平均法、年限=租赁期、残值率取账簿）。

## ④ 适用业务情形

**适用于**

- 资产类别与折旧参数（方法/年限/净残值率）维护，供 BB.4.4（存量，取记录匹配的资产账簿参数）与 BB.4.5（本年新增，取默认资产账簿参数）折旧计提引用；BB.4.X 仅汇总展示、不自行计提

**不适用于**

- 具体资产卡片/原值登记（属 BB.4.4）
