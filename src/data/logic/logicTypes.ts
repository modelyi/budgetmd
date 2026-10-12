/**
 * 逻辑图「声明式数据模型 v2」类型定义
 * =============================================================================
 * 一套模型同时承载：
 * - 图（一）预算模块全景与费用归集（主流向自上而下：编制基础→业务→财务→三表）；
 * - 图（二）数据归集与责任流转（归集自下而上：采集→归口→总部）。
 *
 * 数据 / 视图分离约定：
 * - 数据【不写绝对像素 x/y】。布局用「容器 flow(row/column) + 叶子节点 + 尺寸提示(w/h、
 *   trackW/trackH、gap、padding)」描述，渲染引擎递归自动排版。
 * - 颜色直接给：逻辑图里颜色编码「谁产生数据 / 哪个职能归口」，属于语义内容。
 * - 节点间连接用 edges（按元素 id 引用 + 锚点），引擎自动走直线/正交折线。
 * - 长文说明用独立 Markdown 承载，不在本文件。
 */

/* ── 叶子：节点（块） ── */
export interface LogicNode {
  kind?: 'node';
  id: string;
  title: string;
  /** 标题下说明行（短文本） */
  lines?: string[];
  /** 各说明行颜色，与 lines 一一对应 */
  lineFills?: string[];
  fill: string;
  stroke: string;
  /** 尺寸提示：row 容器中可由 trackW 覆盖；缺省按容器规则均分 */
  w?: number;
  h?: number;
  /** 边框虚线（外部来源等） */
  dashed?: boolean;
  /** 右上角视角标签（如 a+b / b·D=c） */
  badge?: string;
  titleFs?: number;
  lineFs?: number;
  /** 底部脚注（单行，如归口层「审核 · 调整 · 归口」） */
  foot?: string;
  footFill?: string;
  /** 同一槽位内上下叠放序号（图二第 6 槽两个小条） */
  stack?: number;
  /** 在 row 容器中的列序标注（与 children 顺序对应，便于人工核对；引擎按顺序布局） */
  col?: number;
}

/* ── 横贯条：归集/分发中枢，或红抵销总线 ── */
export interface LogicHub {
  kind: 'hub';
  id: string;
  label?: string;
  labelColor?: string;
  fill: string;
  stroke: string;
  h?: number;
  dashed?: boolean;
  /** 总线模式：只画一条水平线（用于红抵销汇流总线），无填充背景 */
  bus?: boolean;
}

/* ── 容器：段 section / 组 group（可递归嵌套） ── */
export interface LogicGroup {
  kind: 'group';
  id: string;
  /** 子项排列方向 */
  flow: 'row' | 'column';
  /** 段/组标题（caption=true 时作为顶部段标题） */
  label?: string;
  labelColor?: string;
  /** 背景框（缺省无背景，用于纯布局容器） */
  fill?: string;
  stroke?: string;
  /** 子项间距（默认） */
  gap?: number;
  /** 逐子项间距（长度 = children.length - 1），覆盖 gap */
  spacing?: number[];
  padX?: number | [number, number];
  padY?: number | [number, number];
  /** row：显式各子项宽（覆盖子项 w） */
  trackW?: number[];
  /** column：显式各子项高（覆盖子项 h） */
  trackH?: number[];
  children: LogicItem[];
  /** 在 row 容器中的列序标注（便于人工核对；引擎按顺序布局） */
  col?: number;
  /** label 作为段标题（顶部标题行） */
  caption?: boolean;
  rx?: number;
}

export type LogicItem = LogicNode | LogicHub | LogicGroup;

/* ── 边：连接任意元素 ── */
export interface LogicRef {
  /** 目标元素 id（node/group/hub） */
  ref: string;
  /** 锚点：从该元素哪条边引出 */
  anchor?: 'top' | 'bottom' | 'left' | 'right';
  /** 取 row 容器内某槽中心（与 anchor 配合定位 x） */
  slot?: number;
}

export interface LogicEdge {
  id: string;
  /** 起点（可直接给 id 字符串） */
  from: LogicRef | string;
  /** 终点 */
  to: LogicRef | string;
  /** flow=主流带箭头；link=细连线；elim=红虚线抵销 */
  kind?: 'flow' | 'link' | 'elim';
  label?: string;
  /** 标签相对线的偏移 */
  labelDx?: number;
  labelDy?: number;
  /** 是否带箭头（默认 flow=true / link=false / elim=true） */
  arrow?: boolean;
  arrowAt?: 'start' | 'end';
  /** 颜色覆盖（默认按 kind） */
  color?: string;
  width?: number;
  dashed?: boolean;
  dashArray?: string;
  /** 正交折线时，拐弯位置 0~1（默认 0.5） */
  bend?: number;
}

/* ── 图例 ── */
export interface LegendEntry {
  type: 'box' | 'line';
  fill: string;
  text: string;
  dashed?: boolean;
  /** box 边框（默认同 fill；主数据用浅色边框） */
  stroke?: string;
}

/* ── 一张完整逻辑图 ── */
export interface LogicDiagramData {
  id: string;
  width: number;
  /** 顶层容器（通常为 column，承载整张图） */
  root: LogicGroup;
  edges?: LogicEdge[];
  /** 是否渲染图例 */
  legend?: boolean;
  legendEntries?: LegendEntry[];
  /** 是否绘制左侧「目标下达 / 评审退回」侧边红线（自上而下） */
  targetDown?: boolean;
  targetDownLabel?: string;
}
