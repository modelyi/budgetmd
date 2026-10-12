# AA.11 物料主数据

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

### AA.11 物料主数据

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">物料编码</th>
      <th class="t3a-th">物料名称</th>
      <th class="t3a-th">物料类型</th>
      <th class="t3a-th">计量单位</th>
    </tr>
    <tr>
      <td>MAT-OPT-001</td>
      <td>聚焦镜组</td>
      <td>光学件</td>
      <td>套</td>
    </tr>
    <tr>
      <td>MAT-OPT-002</td>
      <td>防护镜片</td>
      <td>耗材</td>
      <td>片</td>
    </tr>
    <tr>
      <td>MAT-MEC-003</td>
      <td>导流喷嘴</td>
      <td>机械件</td>
      <td>只</td>
    </tr>
    <tr>
      <td>MAT-ELE-004</td>
      <td>绝缘转接环</td>
      <td>电气件</td>
      <td>件</td>
    </tr>
    <tr>
      <td>MAT-DRV-005</td>
      <td>伺服驱动组件</td>
      <td>核心部件</td>
      <td>台</td>
    </tr>
    <tr>
      <td>MAT-COL-006</td>
      <td>循环机组组件</td>
      <td>核心部件</td>
      <td>台</td>
    </tr>
    <tr>
      <td>MAT-SNS-007</td>
      <td>高度传感板</td>
      <td>电气件</td>
      <td>块</td>
    </tr>
    <tr>
      <td>MAT-GAS-008</td>
      <td>比例阀组</td>
      <td>气路件</td>
      <td>套</td>
    </tr>
    <tr>
      <td>MAT-RTN-001</td>
      <td>返修镜组</td>
      <td>返修件</td>
      <td>套</td>
    </tr>
    <tr>
      <td>MAT-RTN-002</td>
      <td>返修驱动模块</td>
      <td>返修件</td>
      <td>台</td>
    </tr>
    <tr>
      <td>MAT-CAB-011</td>
      <td>动力总线电缆</td>
      <td>电气件</td>
      <td>米</td>
    </tr>
    <tr>
      <td>MAT-LNS-012</td>
      <td>对准指示模组</td>
      <td>光学件</td>
      <td>只</td>
    </tr>
  </tbody>
</table>
</div>

## ③ 关键规则要点

**AA.11 物料主数据**

- 物料编码为唯一身份来源，不区分法人；供BAA.4标准成本引用。

## ④ 适用业务情形

**适用于**

- 物料主数据维护，供物料采购/领料等表引用

**不适用于**

- 具体业务金额填报
