// ⚠ 本文件由 scripts/generateResearchMarkdownContent.ts 自动生成，请勿手工编辑。
// 生成规则：凡一张表单有多个 TAB 表样，即拆为「表单目录 + 各 TAB 条目」，供调研页左侧目录使用。
// 重新生成：npx tsx scripts/generateResearchMarkdownContent.ts

export interface ResearchSubEntry {
  /** 子条目编码（TAB 编码，如 BB.1.3.a；无独立编码时为 父编码-① 形式） */
  code: string;
  /** 子条目名称（TAB 名称） */
  name: string;
  /** 父表单编码 */
  parent: string;
  /** 对应 sheet 的 name（适配器返回值），用于定位到该 TAB */
  sheetName: string;
}

export const RESEARCH_SUB_ENTRIES: ResearchSubEntry[] = [
  {
    "code": "BAA.6.a",
    "name": "场所基本信息维护",
    "parent": "BAA.6",
    "sheetName": "BAA.6.a 场所基本信息维护"
  },
  {
    "code": "BAA.6.b",
    "name": "年度租赁面积维护",
    "parent": "BAA.6",
    "sheetName": "BAA.6.b 年度租赁面积维护"
  },
  {
    "code": "BAA.6.c",
    "name": "场所法人比例查看",
    "parent": "BAA.6",
    "sheetName": "BAA.6.c 场所法人比例查看"
  },
  {
    "code": "BAA.6.e",
    "name": "租赁折现率维护",
    "parent": "BAA.6",
    "sheetName": "BAA.6.e 租赁折现率维护"
  },
  {
    "code": "BAA.7-①",
    "name": "设备类采购付款比例表",
    "parent": "BAA.7",
    "sheetName": "BAA.7 设备类采购付款比例表"
  },
  {
    "code": "BAA.7-②",
    "name": "物料类采购付款比例表",
    "parent": "BAA.7",
    "sheetName": "BAA.7 物料类采购付款比例表"
  },
  {
    "code": "BAA.9.a",
    "name": "资产转换比例",
    "parent": "BAA.9",
    "sheetName": "BAA.9.a 资产转换比例"
  },
  {
    "code": "BAA.9.b",
    "name": "折旧费用拆分比例",
    "parent": "BAA.9",
    "sheetName": "BAA.9.b 折旧费用拆分比例"
  },
  {
    "code": "BB.1.2.a",
    "name": "软硬件销售填报",
    "parent": "BB.1.2",
    "sheetName": "BB.1.2.a 软硬件销售填报"
  },
  {
    "code": "BB.1.2.c",
    "name": "财务视角(存量+增量)",
    "parent": "BB.1.2",
    "sheetName": "BB.1.2.c 财务视角(存量+增量)"
  },
  {
    "code": "BB.1.2.d",
    "name": "产品内部调拨预算安排",
    "parent": "BB.1.2",
    "sheetName": "BB.1.2.d 产品内部调拨预算安排"
  },
  {
    "code": "BB.1.3.a",
    "name": "服务销售填报",
    "parent": "BB.1.3",
    "sheetName": "BB.1.3.a 服务销售填报"
  },
  {
    "code": "BB.1.3.c",
    "name": "财务视角(存量+增量)",
    "parent": "BB.1.3",
    "sheetName": "BB.1.3.c 财务视角(存量+增量)"
  },
  {
    "code": "BB.1.3.d",
    "name": "物料明细",
    "parent": "BB.1.3",
    "sheetName": "BB.1.3.d 物料明细"
  },
  {
    "code": "BB.1.3.f",
    "name": "物料明细_财务查询",
    "parent": "BB.1.3",
    "sheetName": "BB.1.3.f 物料明细_财务查询"
  },
  {
    "code": "BB.1.3.g",
    "name": "人工明细",
    "parent": "BB.1.3",
    "sheetName": "BB.1.3.g 人工明细"
  },
  {
    "code": "BB.1.3.i",
    "name": "人工明细_财务查询",
    "parent": "BB.1.3",
    "sheetName": "BB.1.3.i 人工明细_财务查询"
  },
  {
    "code": "BB.2.1.A",
    "name": "生产制造产量计划表",
    "parent": "BB.2.1",
    "sheetName": "BB.2.1.A 生产制造产量计划表"
  },
  {
    "code": "BB.2.1.B",
    "name": "财务视角（生产成本）",
    "parent": "BB.2.1",
    "sheetName": "BB.2.1.B 财务视角（生产成本）"
  },
  {
    "code": "BB.3.1.A",
    "name": "有PO-设备及无形资产采购预算",
    "parent": "BB.3.1",
    "sheetName": "BB.3.1.A 有PO-设备及无形资产采购预算"
  },
  {
    "code": "BB.3.1.B",
    "name": "无PO-设备及无形资产采购预算",
    "parent": "BB.3.1",
    "sheetName": "BB.3.1.B 无PO-设备及无形资产采购预算"
  },
  {
    "code": "BB.3.1.D",
    "name": "关联交易视角（设备及无形资产采购）",
    "parent": "BB.3.1",
    "sheetName": "BB.3.1.D 关联交易视角（设备及无形资产采购）"
  },
  {
    "code": "BB.3.1.C",
    "name": "财务视角",
    "parent": "BB.3.1",
    "sheetName": "BB.3.1.C 财务视角"
  },
  {
    "code": "BB.3.3.A",
    "name": "有PO-物料类采购预算",
    "parent": "BB.3.3",
    "sheetName": "BB.3.3.A 有PO-物料类采购预算"
  },
  {
    "code": "BB.3.3.B",
    "name": "无PO-物料类采购预算",
    "parent": "BB.3.3",
    "sheetName": "BB.3.3.B 无PO-物料类采购预算"
  },
  {
    "code": "BB.3.3.D",
    "name": "关联交易视角（物料类采购）",
    "parent": "BB.3.3",
    "sheetName": "BB.3.3.D 关联交易视角（物料类采购）"
  },
  {
    "code": "BB.3.3.C",
    "name": "财务视角",
    "parent": "BB.3.3",
    "sheetName": "BB.3.3.C 财务视角"
  },
  {
    "code": "BB.3.X-①",
    "name": "进销存预算",
    "parent": "BB.3.X",
    "sheetName": "BB.3.X 进销存预算"
  },
  {
    "code": "BB.3.X.b",
    "name": "转入转出逻辑明细表",
    "parent": "BB.3.X",
    "sheetName": "BB.3.X.b 转入转出逻辑明细表"
  },
  {
    "code": "BB.3.2-①",
    "name": "基建工程采购预算",
    "parent": "BB.3.2",
    "sheetName": "BB.3.2 基建工程采购预算"
  },
  {
    "code": "BB.3.2.b",
    "name": "基建转固明细表",
    "parent": "BB.3.2",
    "sheetName": "BB.3.2.b 基建转固明细表"
  },
  {
    "code": "BB.4.1.a",
    "name": "自制设备工程预算汇总表",
    "parent": "BB.4.1",
    "sheetName": "BB.4.1.a 自制设备工程预算汇总表"
  },
  {
    "code": "BB.4.1.b",
    "name": "人工投入明细表",
    "parent": "BB.4.1",
    "sheetName": "BB.4.1.b 人工投入明细表"
  },
  {
    "code": "BB.4.1.c",
    "name": "领料投入明细",
    "parent": "BB.4.1",
    "sheetName": "BB.4.1.c 领料投入明细"
  },
  {
    "code": "BB.4.1.d",
    "name": "自制设备转固明细表",
    "parent": "BB.4.1",
    "sheetName": "BB.4.1.d 自制设备转固明细表"
  },
  {
    "code": "BB.5.1-①",
    "name": "雇员费用编制/导入",
    "parent": "BB.5.1",
    "sheetName": "BB.5.1 雇员费用编制/导入"
  },
  {
    "code": "BB.5.1-②",
    "name": "财务视角",
    "parent": "BB.5.1",
    "sheetName": "BB.5.1 财务视角"
  },
  {
    "code": "BJ.C.a",
    "name": "代采购物料查询表",
    "parent": "BJ.C",
    "sheetName": "BJ.C.a 代采购物料查询表"
  },
  {
    "code": "BJ.C.e",
    "name": "代采购资产查询表",
    "parent": "BJ.C",
    "sheetName": "BJ.C.e 代采购资产查询表"
  },
  {
    "code": "BJ.C.d",
    "name": "资产转卖预算表",
    "parent": "BJ.C",
    "sheetName": "BJ.C.d 资产转卖预算表"
  },
  {
    "code": "BJ.C.f",
    "name": "内部借款预算表",
    "parent": "BJ.C",
    "sheetName": "BJ.C.f 内部借款预算表"
  },
  {
    "code": "BJ.C.g",
    "name": "内部销售预算",
    "parent": "BJ.C",
    "sheetName": "BJ.C.g 内部销售预算"
  },
  {
    "code": "BF.3.a",
    "name": "金融工具投融资-银行",
    "parent": "BF.3",
    "sheetName": "BF.3.a 金融工具投融资-银行"
  },
  {
    "code": "BF.3.b",
    "name": "金融工具投资预算-非银",
    "parent": "BF.3",
    "sheetName": "BF.3.b 金融工具投资预算-非银"
  },
  {
    "code": "BF.3.c",
    "name": "融资预算明细表",
    "parent": "BF.3",
    "sheetName": "BF.3.c 融资预算明细表"
  },
  {
    "code": "BF.3.d",
    "name": "融资预算汇总表",
    "parent": "BF.3",
    "sheetName": "BF.3.d 融资预算汇总表"
  },
  {
    "code": "BF.3.e",
    "name": "授信预算表",
    "parent": "BF.3",
    "sheetName": "BF.3.e 授信预算表"
  },
  {
    "code": "BF.4.a",
    "name": "税金及附加预算表",
    "parent": "BF.4",
    "sheetName": "BF.4.a 税金及附加预算表"
  },
  {
    "code": "BF.4.b",
    "name": "增值税计提预算表",
    "parent": "BF.4",
    "sheetName": "BF.4.b 增值税计提预算表"
  },
  {
    "code": "BO.PL-①",
    "name": "利润表",
    "parent": "BO.PL",
    "sheetName": "BO.PL 利润表"
  },
  {
    "code": "BO.PL.b",
    "name": "上游自动取数规则",
    "parent": "BO.PL",
    "sheetName": "BO.PL.b 上游自动取数规则"
  },
  {
    "code": "BO.BS-①",
    "name": "资产负债表",
    "parent": "BO.BS",
    "sheetName": "BO.BS 资产负债表"
  },
  {
    "code": "BO.BS.b",
    "name": "上游自动取数规则",
    "parent": "BO.BS",
    "sheetName": "BO.BS.b 上游自动取数规则"
  },
  {
    "code": "BO.CF-①",
    "name": "现金流量表",
    "parent": "BO.CF",
    "sheetName": "BO.CF 现金流量表"
  },
  {
    "code": "BO.CF.b",
    "name": "上游自动取数规则",
    "parent": "BO.CF",
    "sheetName": "BO.CF.b 上游自动取数规则"
  },
  {
    "code": "BO.CF.M",
    "name": "筹资试算表",
    "parent": "BO.CF",
    "sheetName": "BO.CF.M 筹资试算表"
  },
  {
    "code": "BB.1.X.a",
    "name": "透视基表（客户×项目×产品×部门）",
    "parent": "BB.1.X",
    "sheetName": "BB.1.X.a 透视基表（客户×项目×产品×部门）"
  },
  {
    "code": "BB.1.X.b",
    "name": "透视表（按客户/项目/产品/部门切换）",
    "parent": "BB.1.X",
    "sheetName": "BB.1.X.b 透视表（按客户/项目/产品/部门切换）"
  },
  {
    "code": "AA.1.a",
    "name": "预算年度主数据",
    "parent": "AA.1",
    "sheetName": "AA.1.a 预算年度主数据"
  },
  {
    "code": "AA.1.b",
    "name": "预算期间日历",
    "parent": "AA.1",
    "sheetName": "AA.1.b 预算期间日历"
  },
  {
    "code": "AA.2-①",
    "name": "法人组织架构主数据",
    "parent": "AA.2",
    "sheetName": "AA.2 法人组织架构主数据"
  },
  {
    "code": "AA.2.b",
    "name": "法人组织架构图",
    "parent": "AA.2",
    "sheetName": "AA.2.b 法人组织架构图"
  },
  {
    "code": "AA.3.a",
    "name": "统一科目总表(PL/BS/CF)",
    "parent": "AA.3",
    "sheetName": "AA.3.a 统一科目总表(PL/BS/CF)"
  },
  {
    "code": "AA.3.b",
    "name": "费用明细科目(FY)",
    "parent": "AA.3",
    "sheetName": "AA.3.b 费用明细科目(FY)"
  },
  {
    "code": "AA.3.c",
    "name": "科目编码规则表",
    "parent": "AA.3",
    "sheetName": "AA.3.c 科目编码规则表"
  },
  {
    "code": "A1.4.a",
    "name": "业务事件与财务三表转换规则库",
    "parent": "A1.4",
    "sheetName": "A1.4.a 业务事件与财务三表转换规则库"
  },
  {
    "code": "A1.4.b",
    "name": "财务三表取数与科目汇总规则库",
    "parent": "A1.4",
    "sheetName": "A1.4.b 财务三表取数与科目汇总规则库"
  }
];
