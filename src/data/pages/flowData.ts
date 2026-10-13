/**
 * T6「整体编制流程图」数据层 —— 年度预算编制流程图（全流程版）
 * =============================================================================
 * 7 个阶段 × 10 条泳道：阶段头 / 泳道 / 卡片（含徽标与卡内文字）/ 箭头 / 线旁标注 / 图例。
 * 坐标与配色为绘图数据，FlowView 按数据画图；文字经 makeKey 走人工覆盖层（只读展示）。
 *
 * 口径说明（与项目现行口径一致，勿回退）：
 *   · 合并抵销 BO.ELIM 只做五类抵销（内部购销 / 内部往来 / 内部现金流 / 未实现利润—存货 / 未实现利润—长期资产）；
 *     递延所得税等税层面影响由财务人工测算，系统不做、不列为抵销事项——卡面已按此口径书写。
 *   · 资本性支出汇总表编码为 BB.4.X。
 *   · 最下泳道为前置「费用预算模块」（外部系统收集费用与需求，本模块据此分法人出预算三表）：
 *     费用预算 BA.5、物料需求 BAP.2（常规）、研发长期物料需求 BAP.3、设备采购需求 BB.3.1
 *     （四张带「费用预算模块」徽标，同落在「② 假设与准备」阶段列内，三行错行排布）、
 *     自制设备预算 BB.4.1（无徽标，落 ③ 业务预算列）。
 *   · 线旁标注只保留流程语言（流程动作 / 状态 / 去向），不标取数口径、表号与数据来源细节 —— T6-17 已据此清理。
 *   · 阶段分列口径以 docs/年度预算编制流程图.md 为准：④ 财务汇总 = 业务初审 + 财务视角补充 + 资金与税金；
 *     ⑤ 合并与三表 = 关联交易识别 + 合并抵销 + 三表生成与勾稽（三卡纵向排列）。
 */

export interface DiagramViewBox { width: number; height: number }
export interface DiagramStage { id: string; label: string; x: number; w: number; y: number; h: number; rx: number; fill: string; stroke: string; color: string }
export interface DiagramLaneBand { x: number; w: number; rx: number }
export interface DiagramLane { id: string; name: string; y: number; h: number; labelY: number; fill: string; stroke: string; color: string; size: number }
export interface DiagramText { text: string; x: number; y: number; size: number; weight: number; color: string }
export interface DiagramBadge { text: string; x: number; y: number; w: number; h: number; rx: number; fill: string; stroke?: string | null; color: string; size: number }
export interface DiagramNode { id: string; kind: 'box' | 'decision'; x: number; y: number; w: number; h: number; rx: number; fill: string; stroke: string; strokeWidth: number; points: string; badge: DiagramBadge | null; lines: DiagramText[] }
export interface DiagramArrow { id: string; d: string; kind: 'solid' | 'supply' | 'return' }
export interface DiagramNote { id: string; text: string; x: number; y: number; color: string; size: number }
export interface DiagramLegend { id: string; label: string; kind: 'swatch' | 'dash'; color: string; borderColor?: string | null }

export const diagramTitle = '年度预算编制流程图'
export const diagramSubtitle = '装备制造集团全面预算 · 主线：启动 → 假设准备 → 业务预算 → 财务预算 → 合并三表 → 评审平衡 → 定稿执行'
export const diagramViewBox: DiagramViewBox = { width: 1580, height: 1382 }

/** 阶段头（7 个）：① 编制启动 … ⑦ 定稿与执行 */
export const stageHeaders: DiagramStage[] = [
  { id: 'st1', label: '① 编制启动', x: 90, w: 204, y: 66, h: 42, rx: 10, fill: '#dbeafe', stroke: '#60a5fa', color: '#1e3a8a' },
  { id: 'st2', label: '② 假设与准备', x: 294, w: 204, y: 66, h: 42, rx: 10, fill: '#fef3c7', stroke: '#f59e0b', color: '#92400e' },
  { id: 'st3', label: '③ 业务预算', x: 498, w: 204, y: 66, h: 42, rx: 10, fill: '#dcfce7', stroke: '#16a34a', color: '#166534' },
  { id: 'st4', label: '④ 财务预算', x: 702, w: 204, y: 66, h: 42, rx: 10, fill: '#e0f2fe', stroke: '#0284c7', color: '#0c4a6e' },
  { id: 'st5', label: '⑤ 合并与三表', x: 906, w: 204, y: 66, h: 42, rx: 10, fill: '#ede9fe', stroke: '#7c3aed', color: '#5b21b6' },
  { id: 'st6', label: '⑥ 评审与平衡', x: 1110, w: 204, y: 66, h: 42, rx: 10, fill: '#fee2e2', stroke: '#dc2626', color: '#991b1b' },
  { id: 'st7', label: '⑦ 定稿与执行', x: 1314, w: 186, y: 66, h: 42, rx: 10, fill: '#dbeafe', stroke: '#60a5fa', color: '#1e3a8a' },
];

/** 泳道背景：10 条横向色带（同宽同列，只有 y / 高 / 底色不同） */
export const laneBand: DiagramLaneBand = { x: 30, w: 1530, rx: 10 };
export const stageDividerY = { top: 112, bottom: 1360 };

/** 泳道（10 条，自上而下） */
export const lanes: DiagramLane[] = [
  { id: 'ln1', name: '预算办公室', y: 118, h: 108, labelY: 172, fill: '#fbfdff', stroke: '#e2e8f0', color: '#1f3b73', size: 15 },
  { id: 'ln2', name: '销售部门', y: 226, h: 120, labelY: 286, fill: '#ffffff', stroke: '#e2e8f0', color: '#1f3b73', size: 14 },
  { id: 'ln3', name: '采购与供应链', y: 346, h: 120, labelY: 406, fill: '#ffffff', stroke: '#e2e8f0', color: '#1f3b73', size: 14 },
  { id: 'ln4', name: '生产部门', y: 466, h: 120, labelY: 526, fill: '#ffffff', stroke: '#e2e8f0', color: '#1f3b73', size: 14 },
  { id: 'ln5', name: '后勤部门', y: 586, h: 80, labelY: 632, fill: '#f0f9ff', stroke: '#bae6fd', color: '#0c4a6e', size: 14 },
  { id: 'ln6', name: '成本管理部', y: 666, h: 80, labelY: 712, fill: '#fffbeb', stroke: '#fde68a', color: '#92400e', size: 14 },
  { id: 'ln7', name: '财经组', y: 746, h: 256, labelY: 874, fill: '#fbfdff', stroke: '#e2e8f0', color: '#1f3b73', size: 15 },
  { id: 'ln8', name: '人事部门', y: 1002, h: 88, labelY: 1050, fill: '#fff7ed', stroke: '#fed7aa', color: '#9a3412', size: 14 },
  { id: 'ln9', name: '系统维护组', y: 1090, h: 88, labelY: 1138, fill: '#f0fdf4', stroke: '#bbf7d0', color: '#166534', size: 14 },
  { id: 'ln10', name: '各项目/部门', y: 1178, h: 182, labelY: 1269, fill: '#ffffff', stroke: '#e2e8f0', color: '#1f3b73', size: 14 },
];

/** 箭头：solid=实线主线，supply=蓝虚线（数据供给），return=红虚线（评审退回） */
export const arrowStyles = {
  solid: { stroke: '#475569', width: 2.2, dash: '', marker: 'solid-marker' },
  supply: { stroke: '#2563eb', width: 1.6, dash: '6 4', marker: 'supply-marker' },
  return: { stroke: '#dc2626', width: 1.8, dash: '7 4', marker: 'return-marker' },
} as const;
export const arrows: DiagramArrow[] = [
  // T6-16：原 ar1（年度预算启动 cd1 下缘 → 编制前提与假设确认 cd4 左缘）与 ar2（cd4 右缘 → 销售预算 BB.1 cd5 左缘）
  //   之间的中转卡 cd4 已删除，按业务含义「启动下达后直接进入业务预算编制」合并为一条 cd1 → cd5 主线：
  //   自 cd1 下缘 (192,204) 下行至 y283，再右行直入 cd5 左缘 (502,283)。横段 y283 在 cd4 删除后
  //   经过 ② 列空档，不穿任何卡面；入口与 ar19（假设参数 → 销售预算）同为 cd5 左缘 y283，为原图既有状态。
  { id: 'ar1', d: 'M 192 204 L 192 283 L 502 283', kind: 'solid' },
  // T6-8：「业务初审」自 ⑤ 合并与三表列归位 ④ 财务预算列（x 702–906）后，四条入线（销售/采购/生产/基建）
  //   端点改贴卡片新左缘 x=706；ar29（评审退回）改指新左上角。
  // T6-9：cd12 归位 ④ 财务预算列后占该列首行（x706–886, y749–819），会挡在 cd6 → cd13 的直落线上，
  //   故 ar7 改走卡片右缘外的竖向空档（x=892，卡缘外 6px），自上而下直入 cd13 新上缘；
  //   ar8（资本性支出预算 → 财务视角补充）改为同列两卡之间的短链（cd12 下缘 y819 → cd13 上缘 y831）。
  { id: 'ar3', d: 'M 682 283 L 706 283', kind: 'solid' },
  // T6-14：ar4（采购预算 → 业务初审）原自 cd7 右缘 (682,403) 出线；拆卡后改贴 cd7b（物料类采购 BB.3.3）右缘
  //   y397，与 ar32（进项税出线 y415）错开 18px，不再与任何卡面相交。
  { id: 'ar4', d: 'M 682 397 C 698 397 706 360 706 296', kind: 'solid' },
  { id: 'ar5', d: 'M 682 523 C 698 523 706 420 706 308', kind: 'solid' },
  { id: 'ar6', d: 'M 682 626 C 698 626 706 480 706 318', kind: 'solid' },
  { id: 'ar7', d: 'M 892 316 L 892 831', kind: 'solid' },
  { id: 'ar8', d: 'M 802 819 L 802 831', kind: 'solid' },
  // ar10：财经资金组「股权投资/金融工具投融资」→「关联交易识别 BJ.C 关联交易与内部抵销」（实线）。
  //   口径修正：BJ.C 的八类内部交易为 代采物料/代采资产/资产转卖/内部借款/内部职场租赁/内部物料销售/内部人工销售/内部产品销售，
  //   其中不含股权投资，故「投融资（BF.1/BF.3 投资与外部融资类）→ 关联交易」在八类内部交易口径下不成立。
  //   真正会与关联交易识别/内部抵销发生关系的是内部借款 —— BJ.C.f 内部借款预算表（融资类型固定为 AB.17 字典 XYZ-16 内部借款，
  //   属财经资金组的融资事项）：借出方/借入方按方向互抵（内部往来 1221.1 ↔ 2241.1）、内部往来收入 6001.2 ↔ 财务费用 6604.1、
  //   集团合并层现金收付对冲。本图无独立的「内部借款」卡片，故沿用本线承载该口径，线旁不再加注（口径见 BJ.C.f 文档），
  //   不新增卡片；T6-8 后 cd17 上移，本线改走 ④/⑤ 列间空档（x=904）上行再右折入 cd17 新左缘，不穿卡面。
  { id: 'ar10', d: 'M 898 934 L 904 934 L 904 790 L 910 790', kind: 'solid' },
  { id: 'ar11', d: 'M 1006 825 L 1006 837', kind: 'solid' },
  { id: 'ar12', d: 'M 1006 911 L 1006 923', kind: 'solid' },
  { id: 'ar13', d: 'M 1102 950 L 1114 950', kind: 'solid' },
  { id: 'ar14', d: 'M 1306 939 L 1318 939 L 1318 172 L 1296 172', kind: 'solid' },
  { id: 'ar15', d: 'M 1292 172 L 1326 172', kind: 'solid' },
  // ar16：cd23「基础静态数据设置」（上缘 x396）→ cd11「假设与前置信息」（左缘）。原为竖直直线 (x=396)，
  //   自下而上会穿过 cd21「岗位工时费率设置」与 cd11 两张卡面，末端箭头被卡面盖住看不见；
  //   现自 cd23 上缘 (396,1102) 左行至 ② 列左侧竖向空档（x=290：空档夹在 cd1 右缘 x280 与
  //   cd10/cd11/cd21/cd23 左缘 x304 之间），沿空档上行至 y786，再右折入 cd11 左缘（卡中点），不穿卡面。
  { id: 'ar16', d: 'M 396 1102 L 290 1102 L 290 786 L 304 786', kind: 'supply' },
  // ar17：cd22「雇员费用编制/导入 BB.5.1」（左缘）→ cd11「假设与前置信息」（右缘），人工费率等参数供给。
  //   原为带贝塞尔控制点的曲线，先右凸再收回，凸出段压在原合并卡「折旧与费用归集」卡面内（该卡已拆为 cd14a/cd14b）；
  //   现改为直角折线：自 cd22 左缘 (502,1048) 左行 14px 入 488–502 竖向空档（x=488：空档为
  //   cd10/cd11/cd21/cd23 右缘与 cd5/cd7a/cd7b/cd7c/cd8/cd9/cd14a/cd14b 左缘 x502 之间的空白带），
  //   沿空档边缘直上至 y786，从右侧入 cd11；全程走空档，不穿卡面。
  { id: 'ar17', d: 'M 502 1048 L 488 1048 L 488 786', kind: 'supply' },
  // ar18：人事部门「雇员费用编制/导入 BB.5.1」→ 财经组「经营费用转换结果表 BB.5.2」（cd14b，数据供给）。
  //   BB.5.1 的下游是期间费用（进利润表）、在制品「工」（进存货成本）、自制在建工程 BB.4.1、薪酬付现 CF-06，
  //   与销售预算 BB.1 无取数关系，故接线至费用转换卡片，不越财经组泳道。
  //   T6-15：cd14 拆卡后本线为 x592 竖向短链（cd22 上缘 y1014 → cd14b 下缘 y962），端点贴 cd14b 卡边。
  { id: 'ar18', d: 'M 592 1014 L 592 962', kind: 'supply' },
  // T6-12：ar19 已合并原 ar20 / ar21 —— cd11「假设与前置信息」（右缘 x488）把假设参数同时下发到
  //   销售预算 BB.1（cd5）、采购侧三卡（cd7a/cd7b/cd7c：BB.3.1/3.3/3.X）与生产预算（cd8），各路同源，
  //   故合并为一条主线带三个分支终点（一个 M 起点 + 三段贴卡短支，起点同为 cd11 右缘 (488,786)），
  //   不再画三条各自带贝塞尔控制点、彼此重叠且终点悬在卡内的独立虚线。
  //   走线：自 (488,786) 右行 11px 进入 488–502 竖向空档（cd10/cd11/cd21/cd23 右缘 x488 与
  //   cd5/cd7a/cd7b/cd7c/cd8/cd9/cd14a/cd14b 左缘 x502 之间的空白带），沿空档中线 x=499 上行至 y283 再右折入 cd5 左缘；
  //   途中于 y367、y510 各右折一段 3px 短支，分别从左侧入 cd7a（设备及无形资产采购）与 cd8（生产预算）。
  //   全程走空档中线，不穿卡面，且三条入卡口分别落在 cd5/cd7a/cd8 左缘的不同高度（y283 / y367 / y510）。
  { id: 'ar19', d: 'M 488 786 L 499 786 L 499 283 L 502 283 M 499 367 L 502 367 M 499 510 L 502 510', kind: 'supply' },
  // ar22：cd11「假设与前置信息」→ cd13「财务视角补充」（数据供给，与前两张费用/折旧卡无取数关系）。
  //   T6-15：cd14 拆卡后本线原斜穿 ③ 列的一段（x502–682 间 y790→859）会压在 cd14a「折旧计算与汇总」卡面上，
  //   现改为直角折线：自 cd11 右缘 (488,776) 右行 9px 入 488–502 竖向空档（取 x=497，与 ar17 的 x=488、
  //   ar28 的 x=490、ar24 的 x=494、ar19 的 x=499 错开），沿空档下行至 y890（cd14a 下缘 y882 与
  //   cd14b 上缘 y902 之间的卡间空白带），再右行穿 ③ 列入 cd13 左缘 (706,890)；全程不穿卡面。
  { id: 'ar22', d: 'M 488 776 L 497 776 L 497 890 L 706 890', kind: 'supply' },
  // ar24：前置「费用预算模块」物料需求 BAP.2 → 采购与供应链「物料类采购 BB.3.3」（cd7b，数据供给）。
  //   T6-14：物料消耗需求的实际去路是进销存 BB.3.X（非生产类领料在「一般物料」大类转出）；本图现有独立进销存卡
  //   cd7c（BB.3.X）；线旁不再加注明细去向，不再通往「假设与前置信息」参数卡。
  //   走线：自 cd28 上缘 (447,1181) 上行至空行 y1175（cd23 下缘 y1172 与 cd24/cd28 上缘 y1181 之间），
  //   右行至 ②/③ 列之间的竖向空档 x=494（空档夹在 cd23/cd28/cd29 右缘 x≤492 与
  //   cd5/cd7a/cd7b/cd7c/cd8/cd9/cd14a/cd14b 左缘 x≥502 之间，与 ar28 走同一条空档但取 x=494 与 ar28 的 x=490 分开），
  //   沿空档上行至 y406 再右折入 cd7b 左缘，不穿卡面。
  { id: 'ar24', d: 'M 447 1181 L 447 1175 L 494 1175 L 494 406 L 502 406', kind: 'supply' },
  // ar34：前置「费用预算模块」费用预算 BA.5 → 财经组「经营费用转换结果表 BB.5.2」（cd14b，数据供给）。
  //   BA.5 费用预算结果经 BB.5.2 经营费用转换后方能出表，同样不流向「假设与前置信息」参数卡。
  //   路径先向左出卡列，沿左侧空档（x=296：空档夹在 cd1 右缘 x280 与 cd10/cd11/cd21/cd23/cd24 左缘 x304 之间）
  //   上行，再经空行 y940（cd14b 卡面左侧的空白带）右行入卡，不穿卡面。
  //   T6-15：cd14 拆卡后本线走线与端点一字未动——端点 (502,940) 正落在 cd14b 左缘上，仅卡名/卡 id 更新。
  { id: 'ar34', d: 'M 349 1181 L 349 1175 L 296 1175 L 296 940 L 502 940', kind: 'supply' },
  // ar25：cd10「标准成本维护」（右缘）→ cd8「生产预算」（右缘），标准成本参数供给。
  //   原为向右凸出的曲线，凸出段横穿 cd9「基建工程预算」与 cd8 卡面；现改为绕行 cd9 下方：
  //   自 (488,706) 沿 cd10 右缘直上至空行 y670（cd9 下缘 y652 与 cd8/cd14a/cd14b 之间的空白带），
  //   右行至 ③/④ 列之间的竖向空档 x=698（空档夹在 cd9/cd14a/cd14b 右缘 x682 与 cd12/cd13/cd15/cd16 左缘 x706 之间），
  //   再沿空档下行至 y523，从右侧入 cd8 右缘；全程走空行与空档，不穿卡面。
  { id: 'ar25', d: 'M 488 706 L 488 670 L 698 670 L 698 523 L 682 523', kind: 'supply' },
  // ar26：cd7a「设备及无形资产采购 BB.3.1」（右缘，设备到货即转原值）→ ④ 财经组「资本性支出预算 BB.4.X」
  //   （cd12 上缘 x830）。T6-14 走线：自 cd7a 右缘 (682,376) 右行至 ③/④ 列间竖向空档 x=695
  //   （cd9/cd14a/cd14b 右缘 x682 与 cd12/cd13 左缘 x706 之间，与 ar31 的 x=689、ar32 的 x=700 错开），
  //   沿空档下行至空行 y736（cd12 上缘 y749 之上、cd14a/cd14b/cd13 行之间的空白带），再右行至 x830 落入 cd12 上缘；
  //   全程走空行与空档，不穿卡面，与 ar28 入 cd12 左缘的走线不交叉。
  { id: 'ar26', d: 'M 682 376 L 695 376 L 695 736 L 830 736 L 830 749', kind: 'supply' },
  // T6-11：cd12 归位 ④ 财务预算列后，ar27（基建工程预算 cd9 → 资本性支出预算 BB.4.X）原终点 (592,816)
  //   悬在空白处；改自 cd9 下缘沿空行 y726 右行，再下行入 cd12 新上缘（x=790，与 ar26 的 x=830 错开），不穿卡面。
  { id: 'ar27', d: 'M 592 652 L 592 726 L 790 726 L 790 749', kind: 'supply' },
  // ar28：前置「费用预算模块」自制设备预算 BB.4.1（cd25）→ 资本性支出预算 BB.4.X（cd12，数据供给）。
  //   T6-9：cd12 归位 ④ 财务预算列（x706–886, y749–819）后，改自 cd25 上缘上行至空行 y1160，
  //   左行至 ②/③ 阶段列之间的竖向空档（x=490；空档夹在 cd23/cd28/cd29 右缘 x≤492 与
  //   cd5/cd7a/cd7b/cd7c/cd8/cd9/cd14a/cd14b 左缘 x502 之间，与 ar24 共用该空档但取 x=490 与 ar24 的 x=494 分开），
  //   上行至财经组泳道上方的空行 y784，再右行入 cd12 新左缘（卡中点）；全程不穿卡面，
  //   且与 ar26 的走线不交叉（ar26 走 y736 入 cd12 上缘）。
  { id: 'ar28', d: 'M 614 1190 L 614 1160 L 490 1160 L 490 784 L 706 784', kind: 'supply' },
  // ar29：预算评审会「退回调整」→「业务初审」。T6-8 后 cd6 左移至 ④ 财务预算列，退线横段随之左延至 x706 入卡。
  { id: 'ar29', d: 'M 1212 212 L 1212 240 L 706 240 L 706 250', kind: 'return' },
  // ar30：各项目/部门「设备采购需求」（cd26；T6-9 归位 ② 假设与准备列）→ 采购与供应链「设备及无形资产采购 BB.3.1」
  //   （cd7a，数据供给）。T6-14：自 cd26 新右缘（x492）沿泳道底部空行 y1320 右行至 ④/⑤ 列间空档（x904），
  //   再上行入 cd7a 右缘 (y358)；横段落在 cd25 下缘（y1270）与泳道下缘之间，全程不穿卡面。
  { id: 'ar30', d: 'M 492 1320 L 904 1320 L 904 358 L 682 358', kind: 'supply' },
  // ar31/ar32：销售预算 BB.1 与采购侧 → 财经组「增值税及附加测算 BF.4」（数据供给）。
  //   税金按「销项 − 进项 ± 留抵」测算，故销售侧 BB.1 供销项、采购侧供进项
  //   （T6-14：进项取自物料类采购卡 cd7b，BB.3.3），两条线并行下行进入税金卡片。
  { id: 'ar31', d: 'M 682 298 C 690 300 689 312 689 330 L 689 968 C 689 977 692 981 706 981', kind: 'supply' },
  { id: 'ar32', d: 'M 682 415 C 694 419 700 438 700 462 L 700 958 C 700 967 702 972 706 972', kind: 'supply' },
  // ar33：「股权投资/金融工具投融资」→「三表生成与勾稽」（数据供给）。
  //   BF.1/BF.3 结果形成长期股权投资/金融资产（进资产负债表）与投融资现金流（进现金流量表）。
  //   T6-8 后 cd19 归位 ⑤ 合并与三表列，与 cd15 同处 ④/⑤ 相邻列同一横排，故直连 cd15 右缘 → cd19 左缘，不穿卡面。
  { id: 'ar33', d: 'M 898 928 L 910 928', kind: 'supply' },
];

/** 线旁标注 */
export const edgeNotes: DiagramNote[] = [
  { id: 'nt1', text: '退回调整', x: 1120, y: 233, color: '#dc2626', size: 11.5 },
  { id: 'nt3', text: '复审通过', x: 1330, y: 930, color: '#64748b', size: 11 },
  { id: 'nt4', text: '主数据供给', x: 340, y: 960, color: '#2563eb', size: 11 },
  // T6-17：线旁标注按「整体流程图」口径重新取舍 —— 只保留描述流程动作 / 状态 / 去向的标注
  //   （退回调整 / 复审通过 / 主数据供给 / 假设参数，共 4 条）；
  //   标注取数口径、表号与数据来源细节的 9 条（人工费率 / 雇员费用 / 物料需求 → BB.3.X 进销存 /
  //   标准成本 / 资本性支出汇入 BB.4.X / → 经营费用转换 / 内部借款（BJ.C.f）/
  //   业务数据报齐后补财务视角 / 来源：设备采购需求 ＋ ERP 有 PO 订单导入）已删除。
  //   被删标注所描述的连线保持原样、不再补新标注：整体流程图能读懂即可，不为「每条线都有标注」增注。
  { id: 'nt7', text: '假设参数', x: 512, y: 740, color: '#2563eb', size: 11 },
];

/** 卡片（含评审菱形） */
export const nodes: DiagramNode[] = [
  { id: 'cd1', kind: 'box', x: 104, y: 140, w: 176, h: 64, rx: 12, fill: '#dbeafe', stroke: '#2563eb', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '年度预算启动', x: 192, y: 170, size: 13.5, weight: 700, color: '#0f172a' },
    { text: '下达编制指引与时间表', x: 192, y: 190, size: 11, weight: 400, color: '#334155' },
  ] },
  { id: 'cd2', kind: 'decision', x: 1132.0, y: 132.0, w: 160.0, h: 80.0, rx: 0, fill: '#fee2e2', stroke: '#dc2626', strokeWidth: 1.6, points: '1212,132 1292,172 1212,212 1132,172', badge: null, lines: [
    { text: '预算评审会', x: 1212, y: 163, size: 13, weight: 700, color: '#7f1d1d' },
    { text: '预算管理委员会办公室', x: 1212, y: 181, size: 9.5, weight: 400, color: '#991b1b' },
    { text: '通过 / 退回', x: 1212, y: 196, size: 9.5, weight: 400, color: '#991b1b' },
  ] },
  { id: 'cd3', kind: 'box', x: 1326, y: 140, w: 162, h: 64, rx: 12, fill: '#dbeafe', stroke: '#2563eb', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '终审定稿', x: 1407, y: 164, size: 13.5, weight: 700, color: '#0f172a' },
    { text: '预算批准下达 · 执行控制', x: 1407, y: 184, size: 11, weight: 400, color: '#334155' },
    { text: '董事会审定 · 财务总监办下达', x: 1407, y: 199, size: 10.5, weight: 400, color: '#475569' },
  ] },
  // T6-16：删除「编制前提与假设确认」卡（原 cd4，x304–488 × y250–316，② 假设与准备列 × 销售部门泳道）。
  //   业务含义上启动下达后直接进入业务预算编制，该卡不再作为中转环节；② 列该位置留白，
  //   不补新卡、不挪动其他卡片。原经该卡的两段线（ar1 / ar2）已合并为一条 cd1 → 销售预算 BB.1 主线，见 arrows。
  { id: 'cd5', kind: 'box', x: 502, y: 250, w: 180, h: 66, rx: 12, fill: '#dcfce7', stroke: '#16a34a', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '销售预算 BB.1', x: 592, y: 274, size: 12.5, weight: 700, color: '#0f172a' },
    { text: '签约 1.1 · 软硬件 1.2 · 服务 1.3', x: 592, y: 294, size: 10.5, weight: 400, color: '#1f2937' },
    { text: '销售费用 1.4 · 多维汇总 1.X', x: 592, y: 310, size: 10.5, weight: 400, color: '#1f2937' },
  ] },
  // T6-8：「业务初审」（B4）自 ⑤ 合并与三表列归位 ④ 财务预算列（④ 列 x 702–906，卡片 x 706–902 居中），
  //   在销售部门泳道（y 226–346）内横向平移，不跨泳道；卡内文字随卡左移 202。
  { id: 'cd6', kind: 'box', x: 706, y: 250, w: 196, h: 66, rx: 12, fill: '#fee2e2', stroke: '#dc2626', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '业务初审', x: 804, y: 287, size: 13, weight: 700, color: '#0f172a' },
  ] },
  // T6-14：原「采购预算 BB.3」一卡把三张子表（3.1/3.3/3.X）挤在一行，按「一表一卡」拆为三张卡，
  //   仍落在采购与供应链泳道 × ③ 业务预算列（x502 w180），在该泳道（y346–466）内紧凑竖排：
  //   cd7a 设备及无形资产采购 BB.3.1（采购计划岗·设备采购科）／ cd7b 物料类采购 BB.3.3（采购计划岗·物料采购部）／
  //   cd7c 进销存预算 BB.3.X（转入/转出由系统结转、非人工填）；卡高 34、卡间距 5、上下留白各 4，不与任何卡片重叠。
  //   卡名与编制岗据 docs/formdocs-multi/BB.3.1.md｜BB.3.3.md｜BB.3.X.md 与 src/data/raciData.json 核实。
  { id: 'cd7a', kind: 'box', x: 502, y: 350, w: 180, h: 34, rx: 10, fill: '#dcfce7', stroke: '#16a34a', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '设备及无形资产采购', x: 592, y: 363, size: 10.5, weight: 700, color: '#0f172a' },
    { text: 'BB.3.1 · 采购计划岗（设备采购科）', x: 592, y: 376, size: 8, weight: 400, color: '#334155' },
  ] },
  { id: 'cd7b', kind: 'box', x: 502, y: 389, w: 180, h: 34, rx: 10, fill: '#dcfce7', stroke: '#16a34a', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '物料类采购', x: 592, y: 402, size: 10.5, weight: 700, color: '#0f172a' },
    { text: 'BB.3.3 · 采购计划岗（物料采购部）', x: 592, y: 415, size: 8, weight: 400, color: '#334155' },
  ] },
  { id: 'cd7c', kind: 'box', x: 502, y: 428, w: 180, h: 34, rx: 10, fill: '#dcfce7', stroke: '#16a34a', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '进销存预算', x: 592, y: 441, size: 10.5, weight: 700, color: '#0f172a' },
    { text: 'BB.3.X · 系统结转（转入/转出）', x: 592, y: 454, size: 8, weight: 400, color: '#334155' },
  ] },
  { id: 'cd8', kind: 'box', x: 502, y: 490, w: 180, h: 66, rx: 12, fill: '#dcfce7', stroke: '#16a34a', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '生产预算', x: 592, y: 518, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.2.1 生产制造产量计划与完工成本', x: 592, y: 538, size: 10, weight: 400, color: '#1f2937' },
  ] },
  { id: 'cd9', kind: 'box', x: 502, y: 600, w: 180, h: 52, rx: 12, fill: '#dcfce7', stroke: '#16a34a', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '基建工程预算', x: 592, y: 622, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.3.2 基建工程', x: 592, y: 640, size: 10.5, weight: 400, color: '#1f2937' },
  ] },
  { id: 'cd10', kind: 'box', x: 304, y: 685, w: 184, h: 42, rx: 10, fill: '#ffffff', stroke: '#d97706', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '标准成本维护', x: 396, y: 701, size: 11.5, weight: 700, color: '#0f172a' },
    { text: 'BAA.2 产品标准成本设置', x: 396, y: 713, size: 8.5, weight: 400, color: '#334155' },
    { text: 'BAA.4 服务物料定额标准', x: 396, y: 724, size: 8.5, weight: 400, color: '#334155' },
  ] },
  { id: 'cd11', kind: 'box', x: 304, y: 766, w: 184, h: 42, rx: 10, fill: '#ffffff', stroke: '#d97706', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '假设与前置信息', x: 396, y: 780, size: 11.5, weight: 700, color: '#0f172a' },
    { text: 'BAA.8 经营费用转换 · BAA.9 资本性支出拆分', x: 396, y: 792, size: 8, weight: 400, color: '#334155' },
    { text: 'BAA.10 进销存法人拆分 · BAA.11 关联交易加成', x: 396, y: 804, size: 8, weight: 400, color: '#334155' },
  ] },
  // T6-9：cd12「资本性支出预算」为系统汇总卡，自 ③ 业务预算列（x502）归位 ④ 财务预算列（x706–886）。
  //   ④ 列四卡（cd12 / cd13 / cd15 / cd16）在财经组泳道（y746–1002）内重排为 y = 749 / 831 / 917 / 964，
  //   卡间留白 12、上下各 3；卡内文字与徽标随卡平移。
  { id: 'cd12', kind: 'box', x: 706, y: 749, w: 180, h: 70, rx: 12, fill: '#e2e8f0', stroke: '#64748b', strokeWidth: 1, points: '', badge: { text: '系统计算', x: 826, y: 751, w: 58, h: 18, rx: 9, fill: '#64748b', color: '#ffffff', size: 10 }, lines: [
    { text: '资本性支出预算', x: 796, y: 782, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.4.X 资本性支出汇总', x: 796, y: 799, size: 10.5, weight: 400, color: '#334155' },
    { text: '设备采购·自制设备·基建', x: 796, y: 813, size: 10, weight: 400, color: '#475569' },
  ] },
  // T6-9：cd13 随 ④ 列四卡重排下移 15（y816→831），卡内文字与徽标同步下移。
  { id: 'cd13', kind: 'box', x: 706, y: 831, w: 192, h: 74, rx: 12, fill: '#e2e8f0', stroke: '#64748b', strokeWidth: 1, points: '', badge: { text: '系统计算', x: 838, y: 833, w: 58, h: 18, rx: 9, fill: '#64748b', color: '#ffffff', size: 10 }, lines: [
    { text: '财务视角补充', x: 802, y: 865, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.1.2.c / BB.1.3.c 软硬件·服务财务视角', x: 802, y: 884, size: 10, weight: 400, color: '#334155' },
    { text: '代采按净额法（只确认服务费收入）', x: 802, y: 899, size: 10, weight: 400, color: '#475569' },
  ] },
  // T6-15：cd14「折旧与费用归集」原把两件事挤在一张卡（折旧类三张表 + 费用转换表），按业务性质拆为两张，
  //   仍落 财经组泳道 × ③ 业务预算列（x502 w180），各自保留徽标「财经经营组」；表名与性质按 T3B 文档核实：
  //   折旧类=docs/formdocs-multi/BB.4.4.md（存量资产折旧计算表）/ BB.4.5.md（增量资产折旧计算表）/
  //   BB.4.X.md 附表 BB.4.X.A（折旧计算汇总表）——三表同属一条折旧链（4.4/4.5 计提、4.X.A 汇总）；
  //   费用类=docs/formdocs-multi/BB.5.2.md（经营费用转换结果表：BA.5×BAA.8 各法人经营费用，纯展示、非折旧），
  //   与折旧两回事，故单列一卡。
  //   该列财经组泳道（y746–1002）内两卡竖排：cd14a y790–882（卡名 + 三张表名）、cd14b y902–962；
  //   上方 y746–790 留给 ar28 横段（y784），卡间 y882–902 留给 ar22 横穿段（y890），
  //   下方 y962–1002 留给 ar18 竖向短链；两卡与同列其他卡片、泳道边界均不重叠。
  { id: 'cd14a', kind: 'box', x: 502, y: 790, w: 180, h: 92, rx: 12, fill: '#e2e8f0', stroke: '#64748b', strokeWidth: 1, points: '', badge: { text: '财经经营组', x: 624, y: 792, w: 58, h: 18, rx: 9, fill: '#0f766e', color: '#ffffff', size: 10 }, lines: [
    { text: '折旧计算与汇总', x: 592, y: 826, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.4.4 存量资产折旧计算表', x: 592, y: 844, size: 8.5, weight: 400, color: '#334155' },
    { text: 'BB.4.5 增量资产折旧计算表', x: 592, y: 856, size: 8.5, weight: 400, color: '#334155' },
    { text: 'BB.4.X.A 折旧计算汇总表', x: 592, y: 868, size: 8.5, weight: 400, color: '#334155' },
  ] },
  { id: 'cd14b', kind: 'box', x: 502, y: 902, w: 180, h: 60, rx: 12, fill: '#e2e8f0', stroke: '#64748b', strokeWidth: 1, points: '', badge: { text: '财经经营组', x: 624, y: 904, w: 58, h: 18, rx: 9, fill: '#0f766e', color: '#ffffff', size: 10 }, lines: [
    { text: '经营费用转换结果表', x: 592, y: 938, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.5.2 经营费用转换结果表', x: 592, y: 952, size: 9, weight: 400, color: '#334155' },
  ] },
  // T6-9：cd15 随 ④ 列四卡重排下移 15（y902→917），卡内文字与徽标同步下移。
  { id: 'cd15', kind: 'box', x: 706, y: 917, w: 192, h: 35, rx: 10, fill: '#e2e8f0', stroke: '#64748b', strokeWidth: 1, points: '', badge: { text: '财经资金组', x: 828, y: 919, w: 64, h: 14, rx: 7, fill: '#1d4ed8', color: '#ffffff', size: 9 }, lines: [
    { text: '股权投资/金融工具投融资', x: 767, y: 939, size: 9.5, weight: 700, color: '#0f172a' },
  ] },
  // T6-9：cd16 随 ④ 列四卡重排下移 21（y943→964），卡内文字与徽标同步下移。
  { id: 'cd16', kind: 'box', x: 706, y: 964, w: 192, h: 35, rx: 10, fill: '#e2e8f0', stroke: '#64748b', strokeWidth: 1, points: '', badge: { text: '财经税金组', x: 828, y: 966, w: 64, h: 14, rx: 7, fill: '#dc2626', color: '#ffffff', size: 9 }, lines: [
    { text: '增值税及附加测算 BF.4', x: 770, y: 986, size: 10, weight: 700, color: '#0f172a' },
  ] },
  // T6-8：⑤ 合并与三表列内三卡纵向重排 —— 关联交易识别 → 合并抵销 → 三表生成与勾稽（与 docs/年度预算编制流程图.md
  //   的 ⑤ 列内容一致）。原 ⑤ 列仅两卡（y816 / y902），容纳不下第三张，故三卡等高 h74、间距 12，整体居中于
  //   财经组泳道（y 746–1002）：y = 751 / 837 / 923（上下留白各 5、卡间留白各 12）；卡内文字与徽标随卡平移。
  { id: 'cd17', kind: 'box', x: 910, y: 751, w: 192, h: 74, rx: 12, fill: '#e2e8f0', stroke: '#dc2626', strokeWidth: 1.5, points: '', badge: { text: '财经税金组', x: 1030, y: 753, w: 64, h: 16, rx: 8, fill: '#dc2626', color: '#ffffff', size: 9.5 }, lines: [
    { text: '关联交易识别', x: 1006, y: 785, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BJ.C 关联交易与内部抵销', x: 1006, y: 804, size: 10.5, weight: 400, color: '#334155' },
    { text: '代采物料·代采资产·资产转卖·内部借款·内部销售', x: 1006, y: 820, size: 8.5, weight: 400, color: '#475569' },
  ] },
  { id: 'cd18', kind: 'box', x: 910, y: 837, w: 192, h: 74, rx: 12, fill: '#e2e8f0', stroke: '#dc2626', strokeWidth: 1.5, points: '', badge: { text: '财经税金组', x: 1030, y: 839, w: 64, h: 16, rx: 8, fill: '#dc2626', color: '#ffffff', size: 9.5 }, lines: [
    { text: '合并抵销', x: 1006, y: 871, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BO.ELIM 五类抵销底稿', x: 1006, y: 890, size: 10.5, weight: 400, color: '#334155' },
    { text: '五类抵销 · 递延所得税由人工测算', x: 1006, y: 906, size: 10, weight: 400, color: '#475569' },
  ] },
  // T6-8：「三表生成与勾稽」自 ⑥ 评审与平衡列（x 1114）归位 ⑤ 合并与三表列（x 910–1102，与同列两卡对齐），
  //   在财经组泳道内平移；因 ⑤ 列原有两卡已占满该列两行，故随三卡重排落在列内第三行（y 923）。卡内文字与徽标随卡平移。
  { id: 'cd19', kind: 'box', x: 910, y: 923, w: 192, h: 74, rx: 12, fill: '#e2e8f0', stroke: '#64748b', strokeWidth: 1, points: '', badge: { text: '财经经营组', x: 1042, y: 925, w: 58, h: 18, rx: 9, fill: '#0f766e', color: '#ffffff', size: 10 }, lines: [
    { text: '三表生成与勾稽', x: 1006, y: 957, size: 12.5, weight: 700, color: '#0f172a' },
    { text: '利润表 / 资产负债表 / 现金流量表', x: 1006, y: 976, size: 10.5, weight: 400, color: '#334155' },
    { text: '勾稽：资产负债平衡 · 现金一致', x: 1006, y: 991, size: 10, weight: 400, color: '#475569' },
  ] },
  { id: 'cd20', kind: 'box', x: 1114, y: 902, w: 192, h: 74, rx: 12, fill: '#ffffff', stroke: '#dc2626', strokeWidth: 1, points: '', badge: { text: '财经经营组', x: 1246, y: 904, w: 58, h: 18, rx: 9, fill: '#0f766e', color: '#ffffff', size: 10 }, lines: [
    { text: '财务复审', x: 1210, y: 943, size: 12.5, weight: 700, color: '#0f172a' },
  ] },
  { id: 'cd21', kind: 'box', x: 304, y: 1014, w: 184, h: 68, rx: 12, fill: '#fff7ed', stroke: '#f97316', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '岗位工时费率设置', x: 396, y: 1044, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BAA.3 岗位工时费率表', x: 396, y: 1066, size: 10.5, weight: 400, color: '#334155' },
  ] },
  // T6-11：cd22「雇员费用编制/导入 BB.5.1」原 x560–780 横跨 ③/④ 列分隔线（x702）。T3B（docs/formdocs-multi/BB.5.1.md）
  //   显示 BB.5.1 是单表两 Tab（人事视角 + 财务视角），属费用侧一张卡、无两个独立阶段，故按「不拆」处理；
  //   列归属按 docs/年度预算编制流程图.md（人工 BB.5 归 ③ 业务编制）并与同列的折旧/费用两卡（cd14a/cd14b）对齐：
  //   左缘/宽度改为 x502 w180（与 cd14 同列同宽），卡内文字随卡平移，ar18 改为 x592 的竖向短链。
  { id: 'cd22', kind: 'box', x: 502, y: 1014, w: 180, h: 68, rx: 12, fill: '#fff7ed', stroke: '#f97316', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '雇员费用编制/导入', x: 592, y: 1044, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.5.1 雇员费用编制/导入', x: 592, y: 1066, size: 10.5, weight: 400, color: '#334155' },
  ] },
  { id: 'cd23', kind: 'box', x: 304, y: 1102, w: 184, h: 70, rx: 12, fill: '#f0fdf4', stroke: '#16a34a', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '基础静态数据设置', x: 396, y: 1132, size: 12, weight: 700, color: '#0f172a' },
    { text: '主数据·字典·映射表 · 系统初始化', x: 396, y: 1154, size: 10.5, weight: 400, color: '#334155' },
  ] },
  // 前置「费用预算模块」泳道 · ② 假设与准备阶段列内四张卡（列宽 204 容不下并列宽卡，故三行错行）：
  //   上排两张窄卡（费用预算 BA.5 / 物料需求 BAP.2）+ 中排宽卡（研发长期物料需求 BAP.3）+ 下排宽卡（设备采购需求 BB.3.1）。
  //   T6-9 为容下第四张卡，本泳道由 h100 抬高至 h182（视图高度同步 1300→1382、阶段分隔线底端 1278→1360）。
  { id: 'cd24', kind: 'box', x: 304, y: 1181, w: 90, h: 47, rx: 10, fill: '#ffffff', stroke: '#16a34a', strokeWidth: 1, points: '', badge: { text: '费用预算模块', x: 320, y: 1183, w: 72, h: 18, rx: 9, fill: '#dcfce7', stroke: '#16a34a', color: '#166534', size: 10 }, lines: [
    { text: '费用预算 BA.5', x: 349, y: 1216, size: 10.5, weight: 700, color: '#0f172a' },
  ] },
  { id: 'cd28', kind: 'box', x: 402, y: 1181, w: 90, h: 47, rx: 10, fill: '#ffffff', stroke: '#16a34a', strokeWidth: 1, points: '', badge: { text: '费用预算模块', x: 418, y: 1183, w: 72, h: 18, rx: 9, fill: '#dcfce7', stroke: '#16a34a', color: '#166534', size: 10 }, lines: [
    { text: '物料需求 BAP.2', x: 447, y: 1216, size: 10.5, weight: 700, color: '#0f172a' },
  ] },
  { id: 'cd25', kind: 'box', x: 502, y: 1190, w: 180, h: 80, rx: 12, fill: '#ffffff', stroke: '#16a34a', strokeWidth: 1, points: '', badge: null, lines: [
    { text: '自制设备预算', x: 592, y: 1226, size: 12.5, weight: 700, color: '#0f172a' },
    { text: 'BB.4.1 人工·领料·转固', x: 592, y: 1246, size: 10.5, weight: 400, color: '#334155' },
    { text: '各项目/部门编制', x: 592, y: 1262, size: 10, weight: 400, color: '#475569' },
  ] },
  { id: 'cd29', kind: 'box', x: 304, y: 1232, w: 188, h: 44, rx: 10, fill: '#ffffff', stroke: '#16a34a', strokeWidth: 1, points: '', badge: { text: '费用预算模块', x: 418, y: 1234, w: 72, h: 18, rx: 9, fill: '#dcfce7', stroke: '#16a34a', color: '#166534', size: 10 }, lines: [
    { text: '研发长期物料需求 BAP.3', x: 398, y: 1266, size: 11, weight: 700, color: '#0f172a' },
  ] },
  // T6-9：「设备采购需求」自 ④ 财务预算列（x706）归位 ② 假设与准备列（与本泳道另三张前置需求卡同列），
  //   落在新增的第三行（y1284），卡宽 188 与 cd29 对齐、左缘 x304 与本列其余卡对齐；卡内文字与徽标随卡平移。
  // T6-13：第二行原为「各项目/部门在费用预算模块填报」，与徽标「费用预算模块」语义重复；
  //   改为「各项目/部门填报 · 前置需求采集」（说明需求在前置环节归集），第三行区分需求与预算的文字保留。
  { id: 'cd26', kind: 'box', x: 304, y: 1284, w: 188, h: 72, rx: 12, fill: '#ffffff', stroke: '#16a34a', strokeWidth: 1, points: '', badge: { text: '费用预算模块', x: 418, y: 1286, w: 72, h: 18, rx: 9, fill: '#dcfce7', stroke: '#16a34a', color: '#166534', size: 10 }, lines: [
    { text: '设备采购需求', x: 398, y: 1320, size: 12.5, weight: 700, color: '#0f172a' },
    { text: '各项目/部门填报 · 前置需求采集', x: 398, y: 1338, size: 10, weight: 400, color: '#334155' },
    { text: '需求由采购部编制为设备采购预算 BB.3.1', x: 398, y: 1351, size: 9.5, weight: 400, color: '#475569' },
  ] },
];

/**
 * 图例（13 项）：卡片底色 + 阶段色 + 连线，与 nodes 的实际 fill 双向一致。
 * 卡片底色逐色核对：白底手工填报（cd10/cd11/cd20）、蓝底启动与定稿（cd1/cd3）、
 * 黄底假设与参数（原 cd4 卡已删除，现仅作 ② 假设与准备阶段色标识，与 lg5/lg6 同理）、绿底业务预算（cd5/cd7a/cd7b/cd7c/cd8/cd9）、灰底系统计算（cd12–cd19）、
 * 红底评审与初审（cd2/cd6，含评审菱形）、橙底岗位与人工参数（cd21/cd22）、
 * 浅绿底基础静态数据（cd23）、白底绿边前置模块需求采集（cd24/cd25/cd26/cd28/cd29）。
 * 其中 ① 启动/② 假设/③ 业务/⑥ 评审 四色与阶段头同色，图例项与阶段色共用一个色项；
 * ④ 财务预算、⑤ 合并与三表 两色仅用于阶段头色带（本阶段卡片为灰底系统计算），图例保留作阶段色标识。
 * id 为内容覆盖层 key，沿用原图例项的 id→色值对应关系（新增项用 lg9–lg13）。
 */
export const legendItems: DiagramLegend[] = [
  { id: 'lg1', label: '手工填报', kind: 'swatch', color: '#ffffff', borderColor: '#94a3b8' },
  { id: 'lg2', label: '系统计算', kind: 'swatch', color: '#e2e8f0', borderColor: '#64748b' },
  { id: 'lg9', label: '启动与定稿', kind: 'swatch', color: '#dbeafe', borderColor: '#2563eb' },
  { id: 'lg3', label: '假设与参数', kind: 'swatch', color: '#fef3c7', borderColor: '#d97706' },
  { id: 'lg4', label: '业务预算', kind: 'swatch', color: '#dcfce7', borderColor: '#16a34a' },
  { id: 'lg5', label: '财务预算', kind: 'swatch', color: '#e0f2fe', borderColor: '#0284c7' },
  { id: 'lg6', label: '合并与三表', kind: 'swatch', color: '#ede9fe', borderColor: '#7c3aed' },
  { id: 'lg10', label: '评审与初审', kind: 'swatch', color: '#fee2e2', borderColor: '#dc2626' },
  { id: 'lg11', label: '岗位与人工参数', kind: 'swatch', color: '#fff7ed', borderColor: '#f97316' },
  { id: 'lg12', label: '基础静态数据', kind: 'swatch', color: '#f0fdf4', borderColor: '#16a34a' },
  { id: 'lg13', label: '前置模块（需求采集）', kind: 'swatch', color: '#ffffff', borderColor: '#16a34a' },
  { id: 'lg7', label: '数据供给', kind: 'dash', color: '#2563eb' },
  { id: 'lg8', label: '评审退回', kind: 'dash', color: '#dc2626' },
];

