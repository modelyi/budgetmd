# AB.11 岗位字典

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

### AB.11 岗位字典

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">岗位编码</th>
      <th class="t3a-th">岗位名称</th>
      <th class="t3a-th">状态</th>
      <th class="t3a-th">岗位说明</th>
    </tr>
    <tr>
      <td>POS-01</td>
      <td>高级激光装调工程师</td>
      <td>启用</td>
      <td>整机激光光路装调与精度校准</td>
    </tr>
    <tr>
      <td>POS-02</td>
      <td>数控算法开发专家</td>
      <td>启用</td>
      <td>数控系统算法开发与调试</td>
    </tr>
    <tr>
      <td>POS-03</td>
      <td>电气控制维保技师</td>
      <td>启用</td>
      <td>电气控制系统安装与维保</td>
    </tr>
    <tr>
      <td>POS-04</td>
      <td>机械装配专家</td>
      <td>启用</td>
      <td>整机机械结构装配</td>
    </tr>
    <tr>
      <td>POS-05</td>
      <td>光学装调工程师</td>
      <td>启用</td>
      <td>光学器件装调与测试</td>
    </tr>
    <tr>
      <td>POS-06</td>
      <td>激光工艺专家</td>
      <td>启用</td>
      <td>激光加工工艺开发</td>
    </tr>
    <tr>
      <td>POS-07</td>
      <td>MES实施架构师</td>
      <td>启用</td>
      <td>制造执行系统实施</td>
    </tr>
    <tr>
      <td>POS-08</td>
      <td>现场应用培训讲师</td>
      <td>启用</td>
      <td>客户现场应用培训</td>
    </tr>
  </tbody>
</table>
</div>

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 岗位编码 | 本表维护 | 示例编码规则 POS-01 起；具体岗位值见本字典 |
| 岗位名称 | 本表维护 | 可选值：高级激光装调工程师/数控算法开发专家/电气控制维保技师/机械装配专家/光学装调工程师/激光工艺专家/MES实施架构师/现场应用培训讲师 |
| 状态 | 本表维护 | 启用/停用 |
| 岗位说明 | 本表维护 |  |

## ④ 适用业务情形

**适用于**

- 岗位字典维护，供 BAA.3 岗位工时费率设置及 BB.1.3 技术服务人工明细岗位字段引用；岗位与职级均为示例值，系统不做表与表之间的值域严格校验；费率匹配按示例值演示

**不适用于**

- 具体业务金额填报
