/**
 * 可编辑文字（hover 出「✎ 编辑」→ 就地变输入框 → 保存/取消）
 * =============================================================================
 * 用法：把原来直接渲染的文字节点包一层 <EditableText>：
 *   <EditableText
 *     id={textKey.overview(code)}            // 覆盖键（缺省则只读，不显示编辑按钮）
 *     value={shown}                          // 当前生效文字（已含 localStorage 覆盖）
 *     onSave={(v) => saveTextOverride(id, original, v)}   // 保存：写 localStorage 覆盖
 *     onReset={() => clearOverride(id)}      // 恢复原文（仅在已有覆盖时显示）
 *     overridden={overridden}
 *     buttonPlacement="corner"               // 大区块用右上角，表格/段落内用 inline
 *     as="div"                               // 外层标签（区块用 div，段落/单元格用 span）
 *     className="…"                           // 沿用原文字节点的排版 class
 *   >
 *     {已渲染的展示节点（可省，省略时直接显示 value）}
 *   </EditableText>
 *
 * 约束：外层标签在编辑态会换成 textarea；为避免 HTML 非法嵌套（如 <p> 里塞 <div>），
 * 块级区块请显式传 as="div"，段落与表格单元格保持默认的 span（textarea 属 phrasing content）。
 */
import React from 'react';
import { Check, Pencil, RotateCcw, X } from 'lucide-react';

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
  id,
  value,
  onSave,
  onReset,
  overridden = false,
  multiline = true,
  buttonPlacement = 'inline',
  as = 'span',
  className,
  editorRows,
  title,
  children,
}) => {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const canEdit = Boolean(id && onSave && value);

  // 外部文字变了（切换表单 / 另一处改动覆盖了同一键）→ 同步草稿并退出编辑，
  // 避免「在 A 表编辑中点 B 表 → 把 A 的文字存到 B 的键上」。
  const prevValue = React.useRef(value);
  React.useEffect(() => {
    if (prevValue.current === value) return;
    prevValue.current = value;
    setDraft(value);
    setEditing(false);
  }, [value]);

  const startEdit = () => {
    setDraft(value);
    setEditing(true);
  };

  const commit = () => {
    const next = draft.trim();
    setEditing(false);
    onSave?.(next);
  };

  const cancel = () => setEditing(false);

  const Wrapper = as;

  if (editing) {
    const rows = editorRows ?? (multiline ? Math.min(14, Math.max(4, Math.ceil(draft.length / 60))) : 1);
    return (
      <span className={`block w-full ${className ?? ''}`}>
        <textarea
          autoFocus
          rows={rows}
          value={draft}
          onChange={(ev) => setDraft(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === 'Escape') {
              ev.preventDefault();
              cancel();
            } else if (ev.key === 'Enter' && (!multiline || ev.ctrlKey || ev.metaKey)) {
              ev.preventDefault();
              commit();
            }
          }}
          className="w-full text-[12px] leading-relaxed rounded border border-blue-400 dark:border-blue-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-y font-normal"
        />
        <span className="mt-1 inline-flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={commit}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            <Check className="w-3 h-3" />
            保存
          </button>
          <button
            type="button"
            onClick={cancel}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-3 h-3" />
            取消
          </button>
          {overridden && onReset ? (
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                onReset();
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              恢复原文
            </button>
          ) : null}
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            {multiline ? 'Ctrl/⌘+Enter 保存，Esc 取消' : '回车保存，Esc 取消'}
          </span>
        </span>
      </span>
    );
  }

  return (
    <Wrapper
      className={`group/edit ${buttonPlacement === 'corner' ? 'relative' : ''} ${className ?? ''}`}
      title={title}
    >
      {children ?? value}
      {canEdit ? (
        <button
          type="button"
          onClick={startEdit}
          title="编辑文字"
          aria-label="编辑文字"
          className={
            (buttonPlacement === 'corner' ? 'absolute top-1 right-1 ' : 'ml-1 align-middle ') +
            'inline-flex items-center justify-center w-4 h-4 rounded border border-slate-200 dark:border-slate-600 ' +
            'bg-white/95 dark:bg-slate-800/95 text-slate-400 dark:text-slate-500 opacity-50 ' +
            'group-hover/edit:opacity-100 focus-visible:opacity-100 ' +
            'hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 transition-opacity cursor-pointer'
          }
        >
          <Pencil className="w-2.5 h-2.5" />
        </button>
      ) : null}
      {overridden ? (
        <span className="ml-1 align-middle inline-block px-1 rounded text-[9px] leading-4 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-medium">
          已改
        </span>
      ) : null}
    </Wrapper>
  );
};

export default EditableText;
