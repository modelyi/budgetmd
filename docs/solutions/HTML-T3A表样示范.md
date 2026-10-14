# T3A 表样示范：Markdown + 内嵌 HTML 表头

> 本篇示范「Markdown + 表头 HTML 嵌入」的表样表达模式：两行表头、【全年合计】+【1~12月】时间组、
> 度量子列这类 Markdown 表格表达不了的复杂表头，用内嵌 HTML `<table>`（rowspan/colspan）表达；
> 概述、规则、适用情形等普通内容保持纯 Markdown。

## 一、这个模式解决什么问题

| 内容 | 表达方式 | 原因 |
| :--- | :--- | :--- |
| 概述、关键规则、适用情形 | 纯 Markdown（标题/列表） | 普通文字，Markdown 足够 |
| 单行表头的简单表格 | 纯 Markdown 表格 | Markdown 原生支持 |
| 两行表头/时间组/度量子列 | 内嵌 HTML `<table>` | Markdown 表格无法跨行跨列合并表头 |

示范范围（T3A 编制套表原型 · 单体视角，其余 45 张表按此模式逐步推广）：

| 表单 | 表样结构 | 示范要点 |
| :--- | :--- | :--- |
| BB.1.1 合同签约额预算表 | 维度列双行表头 + 【全年合计】时间组 + 下年/后年 | rowspan=2 维度列、colspan=13 时间组 |
| BB.1.2 软硬件收入与成本预算 | 【全年合计】+【1~12月】时间组 × 度量子列（销量/单价/收入/预收/回款） | rowspan×colspan 组合表达 |

## 二、表样怎么维护

表样部分是**生成产物、不手写**：由 `npx tsx scripts/generateT3aHtmlSheetDemo.ts` 从
`src/data/sheets/*.json` 表样分片（含合并单元格信息）自动转换，表头内容与现有表样逐格一致；
生成时内置列覆盖校验（跨行/跨列并集 = 总列数），杜绝增删列。表样结构变化后重跑脚本即可。

---

## BB.1.1 合同签约额预算表

### 表样：BB.1.1.a 销售合同签约额预算

<table class="t3a-html-sheet">
  <thead>
    <tr>
      <th class="t3a-th" rowspan="2">合同编码</th>
      <th class="t3a-th" rowspan="2">合同名称</th>
      <th class="t3a-th" rowspan="2">合同性质</th>
      <th class="t3a-th" rowspan="2">客户</th>
      <th class="t3a-th" rowspan="2">预算项目</th>
      <th class="t3a-th" rowspan="2">预算产品</th>
      <th class="t3a-th" rowspan="2">机台</th>
      <th class="t3a-th" rowspan="2">区域</th>
      <th class="t3a-th" rowspan="2">预算部门</th>
      <th class="t3a-th" rowspan="2">法人公司</th>
      <th class="t3a-th" rowspan="2">产品类别</th>
      <th class="t3a-th" rowspan="2">收入方式</th>
      <th class="t3a-th t3a-th--time" colspan="13">【全年合计】</th>
      <th class="t3a-th t3a-th--time" rowspan="2">下年</th>
      <th class="t3a-th t3a-th--time" rowspan="2">后年</th>
      <th class="t3a-th" rowspan="2">编制说明</th>
    </tr>
    <tr>
      <th class="t3a-th t3a-th--time">2027年签约额</th>
      <th class="t3a-th">1月签约额</th>
      <th class="t3a-th">2月签约额</th>
      <th class="t3a-th">3月签约额</th>
      <th class="t3a-th">4月签约额</th>
      <th class="t3a-th">5月签约额</th>
      <th class="t3a-th">6月签约额</th>
      <th class="t3a-th">7月签约额</th>
      <th class="t3a-th">8月签约额</th>
      <th class="t3a-th">9月签约额</th>
      <th class="t3a-th">10月签约额</th>
      <th class="t3a-th">11月签约额</th>
      <th class="t3a-th">12月签约额</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HT2027-001</td>
      <td>华山派剑器工坊高功率激光切割机采购意向</td>
      <td>新增商业机会</td>
      <td>华山派剑器工坊</td>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>高功率光纤激光切割机整机系统</td>
      <td>机台-01</td>
      <td>华东</td>
      <td>销售一部</td>
      <td>甜甜圈集团公司</td>
      <td>整机台+验收款</td>
      <td>验收一次性</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">120.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">90.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">60.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">180.0</td>
      <td class="t3a-num">90.0</td>
      <td>脱敏示例：整机台验收一次性确认</td>
    </tr>
    <tr>
      <td>HT2027-002</td>
      <td>少林寺武备坊三维五轴切管机年度集采框架</td>
      <td>存量框架合同</td>
      <td>少林寺武备坊</td>
      <td>P2 三维五轴激光切管机</td>
      <td>三维五轴激光切管机</td>
      <td>机台-02</td>
      <td>华北</td>
      <td>销售二部</td>
      <td>草莓慕斯公司</td>
      <td>整机台+验收款</td>
      <td>验收一次性</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">80.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">100.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">70.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">50.0</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">120.0</td>
      <td>脱敏示例：切管机按验收确认</td>
    </tr>
    <tr>
      <td>HT2027-003</td>
      <td>武当山玄铁工坊光束整形准直模组供货合同</td>
      <td>新增商业机会</td>
      <td>武当山玄铁工坊</td>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>高精度光学光束整形准直模组</td>
      <td>机台-03</td>
      <td>华南</td>
      <td>销售一部</td>
      <td>甜甜圈集团公司</td>
      <td>关键模组+验收款</td>
      <td>验收一次性</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">40.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">35.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">25.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">80.0</td>
      <td class="t3a-num">40.0</td>
      <td>脱敏示例：关键模组验收确认</td>
    </tr>
  </tbody>
</table>

### ③ 关键规则要点

- 字段及表样按列序填写：A列合同编码、B列合同名称、C列合同性质、D列客户、E列预算项目、F列预算产品、G列机台（文本，用户必输）、H列区域、I列预算部门、J列法人公司、K列产品类别、L列收入方式，后接本年签约额（全年合计+1~12月）、下年签约额、后年签约额和编制说明；「内部供应商」为备查字段，不在表样中占列。
- 合同编码、合同名称、客户、预算项目、预算产品、机台、区域、预算部门、法人公司等维度按表样列序填写；合同性质仅允许「存量框架合同 / 新增商业机会」两值。
- 预算产品选择后自动带出产品类别与收入方式，允许按业务需要修改；机台字段为文本，由用户输入，说明里强调用户必输；I列为「预算部门」口径，默认明细到二级部门。
- 金额（本年 1~12 月、下年、后年）均不含税，不允许负数或留空，未发生填 0。
- 本年签约额合计由 1~12 月签约额自动汇总，不可直接编辑；三年签约额均为 0 时给出确认提示。

### ④ 适用业务情形

- 本年度新签订、新增的销售合同（含新增商业机会），按合同录入本年1~12月及下年、后年签约额
- 不适用：上年结转的存量在手订单执行跟踪（属 BB.1.2）
- 不适用：合同已确认的收入/成本核算（属 BB.1.2/BB.1.3）

## BB.1.2 软硬件收入与成本预算

### 表样：BB.1.2.a 软硬件销售填报

<table class="t3a-html-sheet">
  <thead>
    <tr>
      <th class="t3a-th" rowspan="2">订单编号</th>
      <th class="t3a-th" rowspan="2">销售合同</th>
      <th class="t3a-th" rowspan="2">销售项目</th>
      <th class="t3a-th" rowspan="2">销售产品</th>
      <th class="t3a-th" rowspan="2">机台</th>
      <th class="t3a-th" rowspan="2">区域</th>
      <th class="t3a-th" rowspan="2">预算部门</th>
      <th class="t3a-th" rowspan="2">客户名称</th>
      <th class="t3a-th" rowspan="2">签约主体（法人公司）</th>
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
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>SO2027-001</td>
      <td>HT2027-001</td>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>高功率光纤激光切割机整机系统</td>
      <td>机台-01</td>
      <td>华东</td>
      <td>销售一部</td>
      <td>华山派剑器工坊</td>
      <td>甜甜圈集团公司</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.00</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">300.0</td>
      <td class="t3a-num">90.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.00</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">45.0</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.00</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">45.0</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>SO2027-002</td>
      <td>HT2027-002</td>
      <td>P2 三维五轴激光切管机</td>
      <td>三维五轴激光切管机</td>
      <td>机台-02</td>
      <td>华北</td>
      <td>销售二部</td>
      <td>少林寺武备坊</td>
      <td>草莓慕斯公司</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.00</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">66.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.00</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">440.0</td>
      <td class="t3a-num">132.0</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.00</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">66.0</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.00</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">66.0</td>
      <td class="t3a-num">220.0</td>
    </tr>
    <tr>
      <td>SO2027-003</td>
      <td>HT2027-003</td>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>高精度光学光束整形准直模组</td>
      <td>机台-03</td>
      <td>华南</td>
      <td>销售一部</td>
      <td>武当山玄铁工坊</td>
      <td>甜甜圈集团公司</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.00</td>
      <td class="t3a-num">35.0</td>
      <td class="t3a-num">140.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.00</td>
      <td class="t3a-num">35.0</td>
      <td class="t3a-num">105.0</td>
      <td class="t3a-num">31.5</td>
      <td class="t3a-num">105.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.00</td>
      <td class="t3a-num">35.0</td>
      <td class="t3a-num">70.0</td>
      <td class="t3a-num">21.0</td>
      <td class="t3a-num">70.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
  </tbody>
</table>

### 表样：BB.1.2.c 财务视角(存量+增量)

<table class="t3a-html-sheet">
  <thead>
    <tr>
      <th class="t3a-th" rowspan="2">订单编号</th>
      <th class="t3a-th" rowspan="2">销售合同</th>
      <th class="t3a-th" rowspan="2">销售项目</th>
      <th class="t3a-th" rowspan="2">销售产品</th>
      <th class="t3a-th" rowspan="2">机台</th>
      <th class="t3a-th" rowspan="2">区域</th>
      <th class="t3a-th" rowspan="2">预算部门</th>
      <th class="t3a-th" rowspan="2">客户名称</th>
      <th class="t3a-th" rowspan="2">签约主体（法人公司）</th>
      <th class="t3a-th t3a-th--time" colspan="6">【全年合计】</th>
      <th class="t3a-th t3a-th--time" colspan="6">1月</th>
      <th class="t3a-th t3a-th--time" colspan="6">2月</th>
      <th class="t3a-th t3a-th--time" colspan="6">3月</th>
      <th class="t3a-th t3a-th--time" colspan="6">4月</th>
      <th class="t3a-th t3a-th--time" colspan="6">5月</th>
      <th class="t3a-th t3a-th--time" colspan="6">6月</th>
      <th class="t3a-th t3a-th--time" colspan="6">7月</th>
      <th class="t3a-th t3a-th--time" colspan="6">8月</th>
      <th class="t3a-th t3a-th--time" colspan="6">9月</th>
      <th class="t3a-th t3a-th--time" colspan="6">10月</th>
      <th class="t3a-th t3a-th--time" colspan="6">11月</th>
      <th class="t3a-th t3a-th--time" colspan="6">12月</th>
    </tr>
    <tr>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售成本</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售成本</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售成本</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售成本</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售成本</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售成本</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售成本</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售成本</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售成本</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售成本</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售成本</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售成本</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
      <th class="t3a-th t3a-th--time">销量</th>
      <th class="t3a-th t3a-th--time">单价(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售收入(不含税)</th>
      <th class="t3a-th t3a-th--time">预计销售成本</th>
      <th class="t3a-th t3a-th--time">预收</th>
      <th class="t3a-th t3a-th--time">验收回款</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>SO2027-001</td>
      <td>HT2027-001</td>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>高功率光纤激光切割机整机系统</td>
      <td>机台-01</td>
      <td>华东</td>
      <td>销售一部</td>
      <td>华山派剑器工坊</td>
      <td>甜甜圈集团公司</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.00</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">300.0</td>
      <td class="t3a-num">66.0</td>
      <td class="t3a-num">90.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.00</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">33.0</td>
      <td class="t3a-num">45.0</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.00</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">33.0</td>
      <td class="t3a-num">45.0</td>
      <td class="t3a-num">150.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>SO2027-002</td>
      <td>HT2027-002</td>
      <td>P2 三维五轴激光切管机</td>
      <td>三维五轴激光切管机</td>
      <td>机台-02</td>
      <td>华北</td>
      <td>销售二部</td>
      <td>少林寺武备坊</td>
      <td>草莓慕斯公司</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.00</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">55.0</td>
      <td class="t3a-num">66.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.00</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">440.0</td>
      <td class="t3a-num">110.0</td>
      <td class="t3a-num">132.0</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.00</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">55.0</td>
      <td class="t3a-num">66.0</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.00</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">220.0</td>
      <td class="t3a-num">55.0</td>
      <td class="t3a-num">66.0</td>
      <td class="t3a-num">220.0</td>
    </tr>
    <tr>
      <td>SO2027-003</td>
      <td>HT2027-003</td>
      <td>P1 高功率平板光纤激光切割机</td>
      <td>高精度光学光束整形准直模组</td>
      <td>机台-03</td>
      <td>华南</td>
      <td>销售一部</td>
      <td>武当山玄铁工坊</td>
      <td>甜甜圈集团公司</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.00</td>
      <td class="t3a-num">35.0</td>
      <td class="t3a-num">140.0</td>
      <td class="t3a-num">20.0</td>
      <td class="t3a-num">42.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.00</td>
      <td class="t3a-num">35.0</td>
      <td class="t3a-num">105.0</td>
      <td class="t3a-num">15.0</td>
      <td class="t3a-num">31.5</td>
      <td class="t3a-num">105.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.00</td>
      <td class="t3a-num">35.0</td>
      <td class="t3a-num">70.0</td>
      <td class="t3a-num">10.0</td>
      <td class="t3a-num">21.0</td>
      <td class="t3a-num">70.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
  </tbody>
</table>

### 表样：BB.1.2.d 产品内部调拨预算安排

<table class="t3a-html-sheet">
  <thead>
    <tr>
      <th class="t3a-th" rowspan="2">内部供应商(调出方)</th>
      <th class="t3a-th" rowspan="2">调入方法人(签约主体)</th>
      <th class="t3a-th" rowspan="2">销售产品</th>
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
      <th class="t3a-th t3a-th--time">调拨数量</th>
      <th class="t3a-th t3a-th--time">调出单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部调拨单价</th>
      <th class="t3a-th t3a-th--time">调出成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">调拨数量</th>
      <th class="t3a-th t3a-th--time">调出单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部调拨单价</th>
      <th class="t3a-th t3a-th--time">调出成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">调拨数量</th>
      <th class="t3a-th t3a-th--time">调出单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部调拨单价</th>
      <th class="t3a-th t3a-th--time">调出成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">调拨数量</th>
      <th class="t3a-th t3a-th--time">调出单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部调拨单价</th>
      <th class="t3a-th t3a-th--time">调出成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">调拨数量</th>
      <th class="t3a-th t3a-th--time">调出单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部调拨单价</th>
      <th class="t3a-th t3a-th--time">调出成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">调拨数量</th>
      <th class="t3a-th t3a-th--time">调出单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部调拨单价</th>
      <th class="t3a-th t3a-th--time">调出成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">调拨数量</th>
      <th class="t3a-th t3a-th--time">调出单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部调拨单价</th>
      <th class="t3a-th t3a-th--time">调出成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">调拨数量</th>
      <th class="t3a-th t3a-th--time">调出单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部调拨单价</th>
      <th class="t3a-th t3a-th--time">调出成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">调拨数量</th>
      <th class="t3a-th t3a-th--time">调出单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部调拨单价</th>
      <th class="t3a-th t3a-th--time">调出成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">调拨数量</th>
      <th class="t3a-th t3a-th--time">调出单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部调拨单价</th>
      <th class="t3a-th t3a-th--time">调出成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">调拨数量</th>
      <th class="t3a-th t3a-th--time">调出单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部调拨单价</th>
      <th class="t3a-th t3a-th--time">调出成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">调拨数量</th>
      <th class="t3a-th t3a-th--time">调出单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部调拨单价</th>
      <th class="t3a-th t3a-th--time">调出成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
      <th class="t3a-th t3a-th--time">调拨数量</th>
      <th class="t3a-th t3a-th--time">调出单位成本</th>
      <th class="t3a-th t3a-th--time">加成比例</th>
      <th class="t3a-th t3a-th--time">内部调拨单价</th>
      <th class="t3a-th t3a-th--time">调出成本额</th>
      <th class="t3a-th t3a-th--time">加成额</th>
      <th class="t3a-th t3a-th--time">内部销售额</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>甜甜圈(东莞)装备公司</td>
      <td>甜甜圈集团公司</td>
      <td>YYZ-200 整机</td>
      <td>销售一部</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.00</td>
      <td class="t3a-num">85.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">85.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.00</td>
      <td class="t3a-num">85.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">85.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">85.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.00</td>
      <td class="t3a-num">85.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">85.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">85.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">85.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">85.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">85.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.00</td>
      <td class="t3a-num">85.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
  </tbody>
</table>

### ③ 关键规则要点

- 拆分为两个Tab（同页切换）：软硬件销售填报（Tab a，存量订单导入+增量手工新增合并单表）、财务视角（Tab c，存量+增量合并只读）。
- 【视角分离口径】① 销售视角（Tab a）：面向前端销售人员，存量订单期初导入+本年新增手工填在同一张表，按客户与销售额填报；② 财务视角（Tab c）：作为全景汇总视图，由财务填报预计销售成本并核算毛利。
- 录入方式：Tab a 软硬件销售填报——存量订单行由系统期初导入带出、增量手工新增行由业务人员手工填报，机台文本必输，销量/单价(不含税)/预收/验收回款按月维护；Tab c 财务视角——存量与增量自动合并只读，仅预计销售成本由财务按月填报。
- 度量：销量、单价(不含税)、预计销售收入(不含税)（=销量×单价，公式）、预收、验收回款；财务视角多一列预计销售成本。

### ④ 适用业务情形

- 软硬件收入与成本预算：销售填报（.a，存量+增量合并单表）、存量+增量财务视角（.c），登记销量/单价/预收/验收回款及预计销售成本
- 不适用：本年度新签合同的签约额预算（属 BB.1.1）
- 不适用：生产制造排产计划（属 BB.2.1，销售与生产不做关联）
---

## 三、口径核查说明

- 本篇为表达形式改造：表头结构、列名、列序均由表样分片自动转换，未增删列、未改任何财务口径；
- 金额、单价等数值口径（不含税、万元、0.1 精度）沿用现有表样原文，本篇不做任何取数加工；
- T3A 为单体视角，内部交易相关子表（如 BB.1.2.d 产品内部调拨）不在本篇展开口径说明，仅作表样结构示范来源。
