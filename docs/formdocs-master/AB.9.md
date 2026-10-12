# AB.9 存货物料类别字典

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

### AB.9 存货物料类别字典

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">编码</th>
      <th class="t3a-th">物料类别</th>
      <th class="t3a-th">适用范围说明</th>
      <th class="t3a-th">默认出库去向与财务科目</th>
      <th class="t3a-th">状态</th>
    </tr>
    <tr>
      <td>IMC-01</td>
      <td>生产物料</td>
      <td>直接用于产成品制造装配的原材料、零部件及主辅料</td>
      <td>车间生产领料 → 转出进入在制品「料」小类，最终结转产成品成本</td>
      <td>启用</td>
    </tr>
    <tr>
      <td>IMC-02</td>
      <td>研发物料</td>
      <td>用于研发试制、测试验证、实验开发消耗的专属元器件与耗材</td>
      <td>研发项目领用 → 计入 6603 研发费用</td>
      <td>启用</td>
    </tr>
    <tr>
      <td>IMC-03</td>
      <td>服务物料</td>
      <td>用于售后维保、交付调试、客户现场技术支持消耗的配件与耗材</td>
      <td>售后技术服务消耗 → 对齐 BB.1.3 服务物料明细，计入 640103 主营业务成本—技术服务直接物料</td>
      <td>启用</td>
    </tr>
    <tr>
      <td>IMC-04</td>
      <td>专项储备</td>
      <td>为战略保供、长周期关键件储备、应急响应设立的安全库存备件</td>
      <td>日常不轻易出库，仅在应急调拨或定期报废时在 BB.3.X 进销存预算表「转出数」列直接调整</td>
      <td>启用</td>
    </tr>
    <tr>
      <td>IMC-05</td>
      <td>其他物料</td>
      <td>行政办公、仓储包装、厂务运行维护及零星杂项通用物料</td>
      <td>部门日常领用 → 按领用性质计入 6601 销售费用 或 6602 管理费用</td>
      <td>启用</td>
    </tr>
    <tr>
      <td>IMC-06</td>
      <td>自制设备用料</td>
      <td>用于自制设备/自制在建工程建造装配的专用物料</td>
      <td>自制设备工程领料 → 计入 1604 在建工程，转固后按 AA.9 参数计提折旧</td>
      <td>启用</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 编码 | 本表维护 |  |
| 物料类别名称 | 本表维护 | 可选值：生产物料/研发物料/服务物料/专项储备/其他物料 |
| 适用范围说明 | 本表维护 |  |
| 默认出库去向与财务科目 | 本表维护 |  |
| 状态 | 本表维护 |  |

## ③ 关键规则要点

**AB.9 存货物料类别**

- 存货物料类别(AB.9)为固定值域字典，供对应编制表下拉引用，不可在编制表内新增值。

## ④ 适用业务情形

**适用于**

- 存货物料类别字典维护（生产物料/研发物料/服务物料/专项储备/其他物料），供 BB.3.3 物料采购与 BB.3.X 进销存品类引用

**不适用于**

- 具体业务金额填报
