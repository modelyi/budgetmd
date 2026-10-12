/**
 * SVG 文本（只读展示）
 * =============================================================================
 * 原为「可就地编辑的 SVG 文本」（点击变 textarea、写入覆盖层）。整站已去掉 Web 端
 * 内容编辑功能，本组件退化为纯展示文本：仅按给定坐标 / 字号 / 颜色渲染 <text>，
 * 不再提供悬停热区与点击进入编辑态。
 *
 * 组件属性保持与原签名一致，调用方无需改动；k/original/edited/box 等编辑相关属性
 * 现已不再使用。
 */
export interface EditableTextProps {
  k: string;
  x: number;
  y: number; // baseline
  fs: number;
  fill: string;
  bold?: boolean;
  anchor?: 'start' | 'middle' | 'end';
  value: string;
  original: string;
  edited: boolean;
  box: { x: number; y: number; w: number; h: number };
  multiline?: boolean;
}

export function EditableText(p: EditableTextProps) {
  return (
    <text
      x={p.x}
      y={p.y}
      fontSize={p.fs}
      fontWeight={p.bold ? 700 : 400}
      fill={p.fill}
      textAnchor={p.anchor ?? 'start'}
    >
      {p.value}
    </text>
  );
}
