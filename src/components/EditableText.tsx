/**
 * 可编辑文字（只读展示）
 * =============================================================================
 * 原为「hover 出『✎ 编辑』→ 就地变输入框 → 保存/取消」的可编辑文本。整站已去掉
 * Web 端内容编辑功能，本组件退化为纯展示：按外层标签与排版 class 直接渲染文字，
 * 不再提供编辑按钮、编辑态与保存/取消交互。
 *
 * 组件属性保持与原签名一致，调用方无需改动；id/onSave/onReset/overridden 等
 * 编辑相关属性现已不再使用。
 */
import React from 'react';

export interface EditableTextProps {
  /** 覆盖键（见 utils/textOverrides 的 textKey）；缺省时该文字只读 */
  id?: string;
  /** 当前生效文字（已含覆盖值），编辑框以它为初值 */
  value: string;
  /** 保存回调（传回编辑后的文字）；缺省时该文字只读 */
  onSave?: (next: string) => void;
  /** 恢复原文（清除该键的覆盖） */
  onReset?: () => void;
  /** 该键当前是否已有覆盖（决定是否显示「恢复原文」与「已改」标记） */
  overridden?: boolean;
  /** 多行编辑：长文/要点用 true（默认），单行标签用 false（回车即保存） */
  multiline?: boolean;
  /** 编辑按钮位置：inline 紧跟文字（默认）| corner 区块右上角 */
  buttonPlacement?: 'inline' | 'corner';
  /** 外层标签：区块用 div，段落/单元格用 span（默认） */
  as?: 'span' | 'div';
  /** 展示态 class（沿用原文字节点的排版 class；编辑态一并复用避免布局跳变） */
  className?: string;
  /** textarea 初始行数 */
  editorRows?: number;
  /** 悬停提示 */
  title?: string;
  /** 展示节点；省略时直接渲染 value */
  children?: React.ReactNode;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  as = 'span',
  className,
  children,
}) => {
  const Wrapper = as;
  return <Wrapper className={className}>{children ?? value}</Wrapper>;
};

export default EditableText;
