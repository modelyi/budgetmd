/**
 * T5 专项方案 · 关系示意 SVG（固定图形，按 id 渲染）
 * =============================================================================
 * 这些是手工布局的关系示意图，图内文字固定；如需改图注可在对话中调整。
 */
import React from 'react';

export function SpecialDiagram({ id }: { id: string }) {
  switch (id) {
    case 'flow':
      return <FlowSvg />;
    case 'product-mono':
      return <ProductMonoSvg />;
    case 'product-ic':
      return <ProductIcSvg />;
    case 'service-mono':
      return <ServiceMonoSvg />;
    case 'service-ic':
      return <ServiceIcSvg />;
    case 'intercompany':
      return <IntercompanySvg />;
    case 'labor':
      return <LaborSvg />;
    case 'inventory':
      return <InventorySvg />;
    case 'vat':
      return <VatSvg />;
    case 'capex':
      return <CapexSvg />;
    default:
      return null;
  }
}

const box = { width: '100%', background: '#fff', border: '0.5px solid #E2E2E2', borderRadius: 8 } as const;

function FlowSvg() {
  return (
    <svg viewBox="0 0 960 520" style={box}>
      <defs>
        <marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#94A3B8" />
        </marker>
      </defs>
      <rect x="280" y="20" width="400" height="56" rx="8" fill="#1d4ed8" />
      <text x="480" y="45" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">预算三表输出</text>
      <text x="480" y="65" textAnchor="middle" fill="#dbeafe" fontSize="11">利润表 · 资产负债表 · 现金流量表</text>

      <rect x="200" y="120" width="560" height="56" rx="8" fill="#7c3aed" />
      <text x="480" y="145" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">BF 投融资·税金 ｜ BJ.C 关联交易 ｜ BO.ELIM 集团合并抵销底稿</text>
      <text x="480" y="165" textAnchor="middle" fill="#ede9fe" fontSize="11">单体独立记账 / 合并层五类抵销</text>

      <g fontSize="11" fill="#fff">
        <rect x="20" y="220" width="170" height="76" rx="6" fill="#ea580c" />
        <text x="105" y="248" textAnchor="middle" fontWeight="700">BB.1 销售与收入</text>
        <text x="105" y="268" textAnchor="middle" fontSize="10">签约→软硬件→技术服务</text>
        <text x="105" y="284" textAnchor="middle" fontSize="10">驱动生产 / 结转成本</text>

        <rect x="200" y="220" width="150" height="76" rx="6" fill="#ea580c" />
        <text x="275" y="248" textAnchor="middle" fontWeight="700">BB.2 生产制造</text>
        <text x="275" y="268" textAnchor="middle" fontSize="10">销售驱动排产</text>
        <text x="275" y="284" textAnchor="middle" fontSize="10">完工=产量×标准成本</text>

        <rect x="360" y="220" width="180" height="76" rx="6" fill="#ea580c" />
        <text x="450" y="248" textAnchor="middle" fontWeight="700">BB.3 采购与供应链</text>
        <text x="450" y="268" textAnchor="middle" fontSize="10">设备/基建/物料采购</text>
        <text x="450" y="284" textAnchor="middle" fontSize="10">+ 进销存滚动台账</text>

        <rect x="550" y="220" width="170" height="76" rx="6" fill="#ea580c" />
        <text x="635" y="248" textAnchor="middle" fontWeight="700">BB.4 资本化支出</text>
        <text x="635" y="268" textAnchor="middle" fontSize="10">采购→转固→折旧</text>
        <text x="635" y="284" textAnchor="middle" fontSize="10">折旧进四大费用</text>

        <rect x="730" y="220" width="170" height="76" rx="6" fill="#ea580c" />
        <text x="815" y="248" textAnchor="middle" fontWeight="700">BB.5 期间费用</text>
        <text x="815" y="268" textAnchor="middle" fontSize="10">雇员费用 + 经营费用</text>
        <text x="815" y="284" textAnchor="middle" fontSize="10">按部门归集四大费用</text>
      </g>

      <rect x="200" y="350" width="560" height="50" rx="8" fill="#059669" />
      <text x="480" y="372" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">BAA 假设参数</text>
      <text x="480" y="390" textAnchor="middle" fill="#d1fae5" fontSize="11">标准成本 · 费率 · 加成比例 · 拆分比例 · 付款节奏</text>

      <rect x="200" y="440" width="560" height="50" rx="8" fill="#475569" />
      <text x="480" y="462" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">AA / AB / AM 基础数据</text>
      <text x="480" y="480" textAnchor="middle" fill="#cbd5e1" fontSize="11">法人 · 组织 · 科目 · 产品 · 客户 · 物料 · 项目主数据</text>

      <g stroke="#94A3B8" strokeWidth="1.5" fill="none" markerEnd="url(#arr)">
        <line x1="480" y1="440" x2="480" y2="402" />
        <line x1="480" y1="350" x2="480" y2="300" />
        <line x1="480" y1="220" x2="480" y2="178" />
        <line x1="480" y1="120" x2="480" y2="78" />
      </g>

      <g fontSize="11" fill="#b45309">
        <rect x="20" y="120" width="160" height="80" rx="6" fill="#fef3c7" stroke="#fcd34d" />
        <text x="100" y="140" textAnchor="middle" fontWeight="700">三个贯穿机制</text>
        <text x="28" y="160">▸ 双视角</text>
        <text x="28" y="176">▸ 法人归属</text>
        <text x="28" y="192">▸ 关联交易</text>
      </g>
    </svg>
  );
}

function ProductMonoSvg() {
  return (
    <svg viewBox="0 0 900 460" style={box}>
      <defs><marker id="e1" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><polygon points="0 0, 9 3, 0 6" fill="#64748B" /></marker></defs>
      <rect x="20" y="20" width="180" height="140" rx="6" fill="#f0fdf4" stroke="#059669" /><rect x="20" y="20" width="180" height="22" rx="6" fill="#059669" /><text x="110" y="35" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.1.1 合同签约额预算表</text>
      <text x="28" y="56" fill="#166534" fontSize="9" fontWeight="600">PK: 合同编码 × 月</text>
      <text x="28" y="72" fill="#374151" fontSize="9">维度: 客户/产品/部门/法人</text>
      <text x="28" y="86" fill="#374151" fontSize="9">度量: 本年签约额(手填)</text>
      <text x="28" y="100" fill="#374151" fontSize="9">度量: 下年/后年签约额</text>
      <text x="28" y="118" fill="#6b7280" fontSize="8.5">来源: 主数据带出+手填</text>
      <text x="28" y="134" fill="#6b7280" fontSize="8.5">谁填: 销售岗</text>
      <rect x="250" y="20" width="190" height="170" rx="6" fill="#f0fdf4" stroke="#059669" /><rect x="250" y="20" width="190" height="22" rx="6" fill="#059669" /><text x="345" y="35" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.1.2.a 软硬件销售填报</text>
      <text x="258" y="56" fill="#166534" fontSize="9" fontWeight="600">PK: 订单/合同 × 产品 × 月</text>
      <text x="258" y="72" fill="#374151" fontSize="9">维度: 客户/产品/部门(带出)</text>
      <text x="258" y="86" fill="#374151" fontSize="9">度量: 销量(手填) / 单价(手填)</text>
      <text x="258" y="100" fill="#374151" fontSize="9">度量: 收入=销量×单价(公式)</text>
      <text x="258" y="114" fill="#374151" fontSize="9">度量: 预收/验收回款(手填)</text>
      <text x="258" y="132" fill="#6b7280" fontSize="8.5">来源: BB.1.1 签约驱动 + 手填</text>
      <text x="258" y="148" fill="#6b7280" fontSize="8.5">谁填: 销售岗</text>
      <rect x="500" y="20" width="190" height="180" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="500" y="20" width="190" height="22" rx="6" fill="#ea580c" /><text x="595" y="35" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.1.2.c 软硬件财务视角</text>
      <text x="508" y="56" fill="#9a3412" fontSize="9" fontWeight="600">PK: 法人 × 产品 × 月</text>
      <text x="508" y="72" fill="#374151" fontSize="9">维度: 法人(按签约主体带出)</text>
      <text x="508" y="86" fill="#374151" fontSize="9">度量: 收入/预收/回款(从.a带出)</text>
      <text x="508" y="100" fill="#374151" fontSize="9">度量: 销售成本(财务手填)</text>
      <text x="508" y="114" fill="#374151" fontSize="9">度量: 应收/合同负债(自动)</text>
      <text x="508" y="132" fill="#6b7280" fontSize="8.5">来源: .a 同维度 N:1 汇总</text>
      <text x="508" y="148" fill="#6b7280" fontSize="8.5">谁填: 财务岗(只补成本)</text>
      <rect x="500" y="230" width="190" height="110" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="500" y="230" width="190" height="22" rx="6" fill="#ea580c" /><text x="595" y="245" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.3.X 进销存预算</text>
      <text x="508" y="266" fill="#9a3412" fontSize="9" fontWeight="600">PK: 法人 × 存货类别 × 月</text>
      <text x="508" y="282" fill="#374151" fontSize="9">期初+转入−转出=期末</text>
      <text x="508" y="296" fill="#374151" fontSize="9">产成品转出 = .c 销售成本</text>
      <text x="508" y="314" fill="#6b7280" fontSize="8.5">来源: .c 按产品×法人匹配</text>
      <rect x="740" y="80" width="140" height="180" rx="6" fill="#eff6ff" stroke="#1d4ed8" /><rect x="740" y="80" width="140" height="22" rx="6" fill="#1d4ed8" /><text x="810" y="95" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">预算三表（单体：损益/资产负债/现金流）</text>
      <text x="748" y="118" fill="#1e40af" fontSize="9" fontWeight="600">PL 利润表:</text>
      <text x="748" y="132" fill="#374151" fontSize="9">  6001.1 主营业务收入</text>
      <text x="748" y="146" fill="#374151" fontSize="9">  6401.1 主营业务成本</text>
      <text x="748" y="166" fill="#1e40af" fontSize="9" fontWeight="600">BS 资产负债表:</text>
      <text x="748" y="180" fill="#374151" fontSize="9">  1122 应收 / 1405 存货</text>
      <text x="748" y="194" fill="#374151" fontSize="9">  2204 预收</text>
      <text x="748" y="214" fill="#1e40af" fontSize="9" fontWeight="600">CF 现金流量表:</text>
      <text x="748" y="228" fill="#374151" fontSize="9">  01 销售商品收现</text>
      <line x1="200" y1="90" x2="250" y2="90" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e1)" /><text x="225" y="82" textAnchor="middle" fill="#475569" fontSize="8.5">1:N 签约→订单</text>
      <line x1="440" y1="100" x2="500" y2="100" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e1)" /><text x="470" y="92" textAnchor="middle" fill="#475569" fontSize="8.5">N:1 按法人汇总</text><text x="470" y="112" textAnchor="middle" fill="#475569" fontSize="8">带出收入/销量</text>
      <line x1="595" y1="200" x2="595" y2="230" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e1)" /><text x="640" y="218" fill="#475569" fontSize="8.5">出库结转</text>
      <line x1="690" y1="115" x2="740" y2="140" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e1)" /><text x="715" y="125" textAnchor="middle" fill="#475569" fontSize="8.5">按报表项</text>
      <line x1="690" y1="270" x2="740" y2="200" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e1)" />
    </svg>
  );
}

function ProductIcSvg() {
  return (
    <svg viewBox="0 0 900 260" style={box}>
      <defs><marker id="e2" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><polygon points="0 0, 9 3, 0 6" fill="#64748B" /></marker></defs>
      <rect x="20" y="40" width="200" height="130" rx="6" fill="#fef3c7" stroke="#d97706" /><rect x="20" y="40" width="200" height="22" rx="6" fill="#d97706" /><text x="120" y="55" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.1.2.d 关联交易视角</text>
      <text x="28" y="78" fill="#92400e" fontSize="9" fontWeight="600">PK: 内部买方×卖方×月</text>
      <text x="28" y="94" fill="#374151" fontSize="9">· 标记哪些销售是关联销售</text>
      <text x="28" y="108" fill="#374151" fontSize="9">· 单体独立记账：确认收入/成本</text>
      <text x="28" y="126" fill="#6b7280" fontSize="8.5">谁填: 关联交易员补填</text>
      <rect x="290" y="40" width="200" height="130" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="290" y="40" width="200" height="22" rx="6" fill="#ea580c" /><text x="390" y="55" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BJ.C 关联交易与内部抵销</text>
      <text x="298" y="78" fill="#9a3412" fontSize="9" fontWeight="600">PK: 关联交易类型×月</text>
      <text x="298" y="94" fill="#374151" fontSize="9">· 汇总 .d 的关联销售</text>
      <text x="298" y="108" fill="#374151" fontSize="9">· 内部收入↔内部成本</text>
      <rect x="560" y="40" width="180" height="130" rx="6" fill="#7c3aed" /><rect x="560" y="40" width="180" height="22" rx="6" fill="#6d28d9" /><text x="650" y="55" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BO.ELIM 集团合并抵销底稿</text>
      <text x="568" y="78" fill="#ede9fe" fontSize="9">① 关联收入↔成本对冲</text>
      <text x="568" y="94" fill="#ede9fe" fontSize="9">② 关联往来对冲</text>
      <text x="568" y="110" fill="#ede9fe" fontSize="9">③ 关联现金流对冲</text>
      <text x="568" y="126" fill="#ede9fe" fontSize="9">④ 存货未实现利润抵销</text>
      <rect x="780" y="60" width="110" height="90" rx="6" fill="#eff6ff" stroke="#1d4ed8" /><rect x="780" y="60" width="110" height="22" rx="6" fill="#1d4ed8" /><text x="835" y="75" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">预算三表（合并：损益/资产负债/现金流）</text>
      <text x="788" y="100" fill="#374151" fontSize="9">Σ单体</text>
      <text x="788" y="116" fill="#374151" fontSize="9">+ BO.ELIM</text>
      <text x="788" y="132" fill="#374151" fontSize="9">= 对外口径</text>
      <line x1="220" y1="105" x2="290" y2="105" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e2)" /><text x="255" y="98" textAnchor="middle" fill="#475569" fontSize="8.5">汇总</text>
      <line x1="490" y1="105" x2="560" y2="105" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e2)" /><text x="525" y="98" textAnchor="middle" fill="#475569" fontSize="8.5">抵销</text>
      <line x1="740" y1="105" x2="780" y2="105" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e2)" />
    </svg>
  );
}

function ServiceMonoSvg() {
  return (
    <svg viewBox="0 0 900 360" style={box}>
      <defs><marker id="e2" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><polygon points="0 0, 9 3, 0 6" fill="#64748B" /></marker></defs>
      <rect x="20" y="30" width="190" height="140" rx="6" fill="#f0fdf4" stroke="#059669" /><rect x="20" y="30" width="190" height="22" rx="6" fill="#059669" /><text x="115" y="45" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.1.3.a 技术服务填报</text>
      <text x="28" y="68" fill="#166534" fontSize="9" fontWeight="600">PK: 客户×服务×月</text>
      <text x="28" y="84" fill="#374151" fontSize="9">销量(手填) / 单价(手填)</text>
      <text x="28" y="98" fill="#374151" fontSize="9">收入=销量×单价(公式)</text>
      <text x="28" y="112" fill="#374151" fontSize="9">预收/回款(手填)</text>
      <text x="28" y="130" fill="#6b7280" fontSize="8.5">谁填: 销售岗</text>
      <rect x="20" y="210" width="190" height="100" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="20" y="210" width="190" height="22" rx="6" fill="#ea580c" /><text x="115" y="225" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.3.X 进销存预算</text>
      <text x="28" y="248" fill="#9a3412" fontSize="9" fontWeight="600">PK: 法人×存货类别×月</text>
      <text x="28" y="264" fill="#374151" fontSize="9">期初+转入−转出=期末</text>
      <text x="28" y="280" fill="#374151" fontSize="9">费用化领用=服务物料消耗</text>
      <rect x="250" y="100" width="190" height="100" rx="6" fill="#f0fdf4" stroke="#059669" /><rect x="250" y="100" width="190" height="22" rx="6" fill="#059669" /><text x="345" y="115" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">.d 服务物料 / .g 服务人工</text>
      <text x="258" y="138" fill="#166534" fontSize="9" fontWeight="600">现场服务才拆明细</text>
      <text x="258" y="154" fill="#374151" fontSize="9">.d 物料: 从存货领用</text>
      <text x="258" y="170" fill="#374151" fontSize="9">.g 人工: 从雇员费用重分类</text>
      <rect x="250" y="240" width="190" height="90" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="250" y="240" width="190" height="22" rx="6" fill="#ea580c" /><text x="345" y="255" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.5.1 雇员费用编制/导入</text>
      <text x="258" y="278" fill="#9a3412" fontSize="9" fontWeight="600">PK: 部门×月</text>
      <text x="258" y="294" fill="#374151" fontSize="9">HR 统一计提，进期间费用</text>
      <text x="258" y="310" fill="#374151" fontSize="9">项目型人工冲减到 .g</text>
      <rect x="500" y="100" width="190" height="140" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="500" y="100" width="190" height="22" rx="6" fill="#ea580c" /><text x="595" y="115" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.1.3.c 技术服务财务视角</text>
      <text x="508" y="138" fill="#9a3412" fontSize="9" fontWeight="600">PK: 法人×服务×月</text>
      <text x="508" y="154" fill="#374151" fontSize="9">收入(从.a带出)</text>
      <text x="508" y="170" fill="#374151" fontSize="9">成本=.d物料+.g人工</text>
      <text x="508" y="186" fill="#374151" fontSize="9">借 6401.1 / 贷 1405 / 贷费用</text>
      <text x="508" y="204" fill="#6b7280" fontSize="8.5">谁填: 财务岗</text>
      <rect x="740" y="120" width="140" height="120" rx="6" fill="#eff6ff" stroke="#1d4ed8" /><rect x="740" y="120" width="140" height="22" rx="6" fill="#1d4ed8" /><text x="810" y="135" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">预算三表（单体：损益/资产负债/现金流）</text>
      <text x="748" y="158" fill="#374151" fontSize="9">PL: 6001.1 / 6401.1</text>
      <text x="748" y="174" fill="#374151" fontSize="9">BS: 1122 / 1405</text>
      <text x="748" y="190" fill="#374151" fontSize="9">CF: 01 服务收现</text>
      <line x1="210" y1="100" x2="250" y2="140" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e2)" /><text x="230" y="115" textAnchor="middle" fill="#475569" fontSize="8.5">收入</text>
      <line x1="210" y1="250" x2="250" y2="180" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e2)" /><text x="230" y="210" textAnchor="middle" fill="#475569" fontSize="8.5">①存货领用</text>
      <line x1="345" y1="240" x2="345" y2="200" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e2)" /><text x="400" y="225" fill="#475569" fontSize="8.5">②人工冲减</text>
      <line x1="440" y1="150" x2="500" y2="160" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e2)" /><text x="470" y="148" textAnchor="middle" fill="#475569" fontSize="8.5">③汇总成本</text>
      <line x1="690" y1="170" x2="740" y2="170" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e2)" /><text x="715" y="163" textAnchor="middle" fill="#475569" fontSize="8.5">按报表项</text>
    </svg>
  );
}

function ServiceIcSvg() {
  return (
    <svg viewBox="0 0 900 180" style={box}>
      <defs><marker id="e2b" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><polygon points="0 0, 9 3, 0 6" fill="#64748B" /></marker></defs>
      <rect x="20" y="40" width="200" height="100" rx="6" fill="#fef3c7" stroke="#d97706" /><rect x="20" y="40" width="200" height="22" rx="6" fill="#d97706" /><text x="120" y="55" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.1.3.d 关联服务视角</text>
      <text x="28" y="80" fill="#374151" fontSize="9">内部买方×卖方×月</text>
      <text x="28" y="96" fill="#374151" fontSize="9">单体独立记账：收入/成本</text>
      <text x="28" y="112" fill="#6b7280" fontSize="8.5">谁填: 关联交易员补填</text>
      <rect x="280" y="40" width="180" height="100" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="280" y="40" width="180" height="22" rx="6" fill="#ea580c" /><text x="370" y="55" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BJ.C 关联交易与内部抵销</text>
      <text x="288" y="80" fill="#374151" fontSize="9">汇总 .d 关联服务</text>
      <text x="288" y="96" fill="#374151" fontSize="9">收入↔成本对冲</text>
      <rect x="520" y="40" width="180" height="100" rx="6" fill="#7c3aed" /><rect x="520" y="40" width="180" height="22" rx="6" fill="#6d28d9" /><text x="610" y="55" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BO.ELIM 集团合并抵销底稿</text>
      <text x="528" y="80" fill="#ede9fe" fontSize="9">关联服务收入↔成本</text>
      <text x="528" y="96" fill="#ede9fe" fontSize="9">往来对冲 / 现金流对冲</text>
      <rect x="760" y="55" width="120" height="70" rx="6" fill="#eff6ff" stroke="#1d4ed8" /><rect x="760" y="55" width="120" height="22" rx="6" fill="#1d4ed8" /><text x="820" y="70" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">预算三表（合并：损益/资产负债/现金流）</text>
      <text x="768" y="95" fill="#374151" fontSize="9">Σ单体+抵销</text>
      <line x1="220" y1="90" x2="280" y2="90" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e2b)" />
      <line x1="460" y1="90" x2="520" y2="90" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e2b)" />
      <line x1="700" y1="90" x2="760" y2="90" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e2b)" />
    </svg>
  );
}

function IntercompanySvg() {
  return (
    <svg viewBox="0 0 900 240" style={box}>
      <defs><marker id="e3" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><polygon points="0 0, 9 3, 0 6" fill="#64748B" /></marker></defs>
      <rect x="20" y="30" width="180" height="80" rx="6" fill="#f0fdf4" stroke="#059669" /><rect x="20" y="30" width="180" height="22" rx="6" fill="#059669" /><text x="110" y="46" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.3.3.D 代采购物料</text>
      <text x="28" y="70" fill="#374151" fontSize="9">下单方→受益方</text>
      <text x="28" y="86" fill="#374151" fontSize="9">加成进存货成本</text>
      <rect x="20" y="130" width="180" height="80" rx="6" fill="#f0fdf4" stroke="#059669" /><rect x="20" y="130" width="180" height="22" rx="6" fill="#059669" /><text x="110" y="146" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.3.1.D 代采购资产</text>
      <text x="28" y="170" fill="#374151" fontSize="9">下单方→受益方</text>
      <text x="28" y="186" fill="#374151" fontSize="9">加成进固定资产原值</text>
      <rect x="270" y="80" width="200" height="100" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="270" y="80" width="200" height="22" rx="6" fill="#ea580c" /><text x="370" y="96" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BJ.C 关联交易与内部抵销</text>
      <text x="278" y="120" fill="#9a3412" fontSize="9">PK: 关联交易类型×月</text>
      <text x="278" y="136" fill="#374151" fontSize="9">a物料 / b资产 / c借款</text>
      <text x="278" y="152" fill="#374151" fontSize="9">d转卖 / e租赁</text>
      <rect x="530" y="80" width="180" height="100" rx="6" fill="#7c3aed" /><rect x="530" y="80" width="180" height="22" rx="6" fill="#6d28d9" /><text x="620" y="96" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BO.ELIM 集团合并抵销底稿</text>
      <text x="538" y="120" fill="#ede9fe" fontSize="9">①购销对冲 ②往来对冲</text>
      <text x="538" y="136" fill="#ede9fe" fontSize="9">③现金流对冲</text>
      <text x="538" y="152" fill="#ede9fe" fontSize="9">④存货未实现利润</text>
      <text x="538" y="168" fill="#ede9fe" fontSize="9">⑤长期资产未实现利润</text>
      <rect x="760" y="90" width="130" height="80" rx="6" fill="#eff6ff" stroke="#1d4ed8" /><rect x="760" y="90" width="130" height="22" rx="6" fill="#1d4ed8" /><text x="825" y="106" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">预算三表（合并：损益/资产负债/现金流）</text>
      <text x="768" y="130" fill="#374151" fontSize="9">单体汇总+抵销</text>
      <text x="768" y="146" fill="#374151" fontSize="9">= 集团对外口径</text>
      <line x1="200" y1="70" x2="270" y2="110" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e3)" />
      <line x1="200" y1="170" x2="270" y2="150" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e3)" />
      <line x1="470" y1="130" x2="530" y2="130" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e3)" />
      <line x1="710" y1="130" x2="760" y2="130" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e3)" />
    </svg>
  );
}

function LaborSvg() {
  return (
    <svg viewBox="0 0 900 200" style={box}>
      <defs><marker id="e4" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><polygon points="0 0, 9 3, 0 6" fill="#64748B" /></marker></defs>
      <rect x="20" y="50" width="200" height="110" rx="6" fill="#f0fdf4" stroke="#059669" /><rect x="20" y="50" width="200" height="22" rx="6" fill="#059669" /><text x="120" y="66" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.5.1 雇员费用编制/导入</text>
      <text x="28" y="90" fill="#166534" fontSize="9">PK: 部门×月</text>
      <text x="28" y="106" fill="#374151" fontSize="9">· 销售/管理/研发/制造四列</text>
      <text x="28" y="122" fill="#374151" fontSize="9">· HR 统一计提，不重复</text>
      <text x="28" y="140" fill="#6b7280" fontSize="8.5">HR 岗填</text>
      <rect x="290" y="30" width="200" height="70" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="290" y="30" width="200" height="22" rx="6" fill="#ea580c" /><text x="390" y="46" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.1.3.i 服务人工</text>
      <text x="298" y="70" fill="#374151" fontSize="9">借 6401.1 / 贷 费用（冲减）</text>
      <text x="298" y="86" fill="#374151" fontSize="9">项目型人工重分类</text>
      <rect x="290" y="120" width="200" height="70" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="290" y="120" width="200" height="22" rx="6" fill="#ea580c" /><text x="390" y="136" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.4.1.b 自制设备人工</text>
      <text x="298" y="160" fill="#374151" fontSize="9">借 1604 在建工程 / 贷 费用</text>
      <text x="298" y="176" fill="#374151" fontSize="9">资本化，不进当期损益</text>
      <rect x="560" y="70" width="180" height="80" rx="6" fill="#eff6ff" stroke="#1d4ed8" /><rect x="560" y="70" width="180" height="22" rx="6" fill="#1d4ed8" /><text x="650" y="86" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">预算三表</text>
      <text x="568" y="110" fill="#374151" fontSize="9">PL: 6601/6602/6603/5001</text>
      <text x="568" y="126" fill="#374151" fontSize="9">CF: 06 支付职工薪酬</text>
      <line x1="220" y1="80" x2="290" y2="65" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e4)" />
      <line x1="220" y1="130" x2="290" y2="150" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e4)" />
      <line x1="490" y1="65" x2="560" y2="95" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e4)" />
      <line x1="490" y1="155" x2="560" y2="125" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e4)" />
    </svg>
  );
}

function InventorySvg() {
  return (
    <svg viewBox="0 0 900 220" style={box}>
      <defs><marker id="e5" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><polygon points="0 0, 9 3, 0 6" fill="#64748B" /></marker></defs>
      <rect x="20" y="40" width="180" height="90" rx="6" fill="#f0fdf4" stroke="#059669" /><rect x="20" y="40" width="180" height="22" rx="6" fill="#059669" /><text x="110" y="56" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.3.3.C 物料采购</text>
      <text x="28" y="80" fill="#374151" fontSize="9">到货额（不含税）</text>
      <text x="28" y="96" fill="#374151" fontSize="9">→ 原材料入库</text>
      <rect x="250" y="40" width="180" height="90" rx="6" fill="#f0fdf4" stroke="#059669" /><rect x="250" y="40" width="180" height="22" rx="6" fill="#059669" /><text x="340" y="56" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.2.1 生产排产</text>
      <text x="258" y="80" fill="#374151" fontSize="9">产量×BAA.2 标准成本</text>
      <text x="258" y="96" fill="#374151" fontSize="9">→ 产成品完工入库</text>
      <rect x="480" y="80" width="200" height="110" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="480" y="80" width="200" height="22" rx="6" fill="#ea580c" /><text x="580" y="96" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.3.X 进销存预算</text>
      <text x="488" y="120" fill="#9a3412" fontSize="9">PK: 法人×存货类别×月</text>
      <text x="488" y="136" fill="#374151" fontSize="9">期初+转入−转出=期末</text>
      <text x="488" y="152" fill="#374151" fontSize="9">转入: 采购/完工/领料</text>
      <text x="488" y="168" fill="#374151" fontSize="9">转出: 销售/费用化领用</text>
      <rect x="730" y="100" width="160" height="80" rx="6" fill="#eff6ff" stroke="#1d4ed8" /><rect x="730" y="100" width="160" height="22" rx="6" fill="#1d4ed8" /><text x="810" y="116" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">预算三表</text>
      <text x="738" y="140" fill="#374151" fontSize="9">PL: 6401 营业成本</text>
      <text x="738" y="156" fill="#374151" fontSize="9">BS: 1405 存货</text>
      <line x1="200" y1="85" x2="480" y2="120" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e5)" />
      <line x1="430" y1="85" x2="480" y2="120" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e5)" />
      <line x1="680" y1="135" x2="730" y2="135" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e5)" />
    </svg>
  );
}

function VatSvg() {
  return (
    <svg viewBox="0 0 900 200" style={box}>
      <defs><marker id="e6" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><polygon points="0 0, 9 3, 0 6" fill="#64748B" /></marker></defs>
      <rect x="20" y="50" width="200" height="100" rx="6" fill="#f0fdf4" stroke="#059669" /><rect x="20" y="50" width="200" height="22" rx="6" fill="#059669" /><text x="120" y="66" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">上游业务表（不含税）</text>
      <text x="28" y="90" fill="#374151" fontSize="9">· BB.1.2.c 收入 / BB.1.3.c 服务收入</text>
      <text x="28" y="106" fill="#374151" fontSize="9">· BB.3.1.C 设备 / BB.3.3.C 物料采购</text>
      <text x="28" y="122" fill="#374151" fontSize="9">· 关联交易：BB.3.3.D / BJ.C</text>
      <rect x="280" y="50" width="200" height="100" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="280" y="50" width="200" height="22" rx="6" fill="#ea580c" /><text x="380" y="66" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BF.4.b 增值税附表</text>
      <text x="288" y="90" fill="#374151" fontSize="9">PK: 税率档（13%/6%/9%）</text>
      <text x="288" y="106" fill="#374151" fontSize="9">· 销项−进项±留抵=应纳</text>
      <text x="288" y="122" fill="#374151" fontSize="9">· 基数自动取，税额=基数×率</text>
      <rect x="540" y="50" width="180" height="100" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="540" y="50" width="180" height="22" rx="6" fill="#ea580c" /><text x="630" y="66" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BF.4.a 税金主表</text>
      <text x="548" y="90" fill="#374151" fontSize="9">· 增值税行从 .b 带出</text>
      <text x="548" y="106" fill="#374151" fontSize="9">· 附加税按实缴联动</text>
      <rect x="760" y="60" width="130" height="80" rx="6" fill="#eff6ff" stroke="#1d4ed8" /><rect x="760" y="60" width="130" height="22" rx="6" fill="#1d4ed8" /><text x="825" y="76" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">预算三表</text>
      <text x="768" y="100" fill="#374151" fontSize="9">PL: 税金及附加</text>
      <text x="768" y="116" fill="#374151" fontSize="9">BS: 应交税费</text>
      <line x1="220" y1="100" x2="280" y2="100" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e6)" />
      <line x1="480" y1="100" x2="540" y2="100" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e6)" />
      <line x1="720" y1="100" x2="760" y2="100" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e6)" />
    </svg>
  );
}

function CapexSvg() {
  return (
    <svg viewBox="0 0 900 260" style={box}>
      <defs><marker id="e7" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><polygon points="0 0, 9 3, 0 6" fill="#64748B" /></marker></defs>
      <rect x="20" y="40" width="180" height="110" rx="6" fill="#f0fdf4" stroke="#059669" /><rect x="20" y="40" width="180" height="22" rx="6" fill="#059669" /><text x="110" y="55" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.4.1 自制设备工程预算</text>
      <text x="28" y="78" fill="#166534" fontSize="9" fontWeight="600">PK: 项目×资产类别×月</text>
      <text x="28" y="94" fill="#374151" fontSize="9">· 外购 / 自制 / 租赁</text>
      <text x="28" y="108" fill="#374151" fontSize="9">· 原值 / 预付款 / 验收付款</text>
      <text x="28" y="126" fill="#6b7280" fontSize="8.5">业务岗填</text>
      <rect x="250" y="40" width="170" height="110" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="250" y="40" width="170" height="22" rx="6" fill="#ea580c" /><text x="335" y="55" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.4.3 转固台账</text>
      <text x="258" y="78" fill="#9a3412" fontSize="9">PK: 资产卡片×月</text>
      <text x="258" y="94" fill="#374151" fontSize="9">· 转固月份 / 原值 / 类别</text>
      <text x="258" y="108" fill="#374151" fontSize="9">· 次月起折旧</text>
      <rect x="460" y="40" width="170" height="110" rx="6" fill="#fff7ed" stroke="#ea580c" /><rect x="460" y="40" width="170" height="22" rx="6" fill="#ea580c" /><text x="545" y="55" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BB.4.5 增量资产折旧计算表</text>
      <text x="468" y="78" fill="#9a3412" fontSize="9">PK: 资产×部门×月</text>
      <text x="468" y="94" fill="#374151" fontSize="9">· 月折旧=原值×月折旧率</text>
      <text x="468" y="108" fill="#374151" fontSize="9">· 按部门进四大费用</text>
      <rect x="690" y="60" width="180" height="100" rx="6" fill="#eff6ff" stroke="#1d4ed8" /><rect x="690" y="60" width="180" height="22" rx="6" fill="#1d4ed8" /><text x="780" y="75" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">预算三表</text>
      <text x="698" y="98" fill="#374151" fontSize="9">PL: 5101/6601-6603</text>
      <text x="698" y="114" fill="#374151" fontSize="9">BS: 1601/1602/1604</text>
      <text x="698" y="130" fill="#374151" fontSize="9">CF: 投资活动购建</text>
      <line x1="200" y1="95" x2="250" y2="95" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e7)" /><text x="225" y="88" textAnchor="middle" fill="#475569" fontSize="8.5">转固</text>
      <line x1="420" y1="95" x2="460" y2="95" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e7)" /><text x="440" y="88" textAnchor="middle" fill="#475569" fontSize="8.5">折旧</text>
      <line x1="630" y1="95" x2="690" y2="105" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#e7)" />
    </svg>
  );
}
