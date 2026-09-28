/**
 * 可就地编辑的 SVG 文本
 * =============================================================================
 * - 平时：正常显示文字，鼠标悬停出现浅色热区（光标变 text）；
 * - 点击：原位切换为 foreignObject 内嵌 textarea，直接改；
 *   · 单行：回车保存；多行：Ctrl/⌘+回车保存；Esc 取消；失焦自动保存；
 * - 已人工修改：文字变琥珀色加下划线，右上角小橙点。
 *
 * 改动写入覆盖层（contentEditorStore），不污染源数据。
 */
import { useRef, useState } from 'react';
import { contentEditorStore } from '../../data/content/contentEditor';

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
  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const save = () => {
    const v = taRef.current?.value ?? '';
    contentEditorStore.setText(p.k, v, p.original);
    setEditing(false);
  };
  const cancel = () => setEditing(false);

  if (editing) {
    return (
      <foreignObject x={p.box.x} y={p.box.y} width={p.box.w} height={p.box.h}>
        <div style={{ height: '100%' }}>
          <textarea
            ref={taRef}
            defaultValue={p.value}
            autoFocus
            onFocus={(e) => e.target.select()}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault();
                cancel();
              } else if (!p.multiline && e.key === 'Enter') {
                e.preventDefault();
                save();
              } else if (p.multiline && e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                save();
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
              fontSize: Math.max(p.fs, 9.5),
              fontFamily: 'inherit',
              lineHeight: 1.3,
              border: '1px solid #2563eb',
              borderRadius: 5,
              padding: '2px 5px',
              resize: 'none',
              outline: 'none',
              background: '#ffffff',
            }}
          />
        </div>
      </foreignObject>
    );
  }

  return (
    <g>
      <text
        x={p.x}
        y={p.y}
        fontSize={p.fs}
        fontWeight={p.bold ? 700 : 400}
        fill={p.edited ? '#b45309' : p.fill}
        textAnchor={p.anchor ?? 'start'}
        textDecoration={p.edited ? 'underline' : undefined}
      >
        {p.value}
      </text>
      {p.edited && (
        <circle cx={p.box.x + p.box.w - 3} cy={p.box.y + 4} r={2.3} fill="#b45309" />
      )}
      <rect
        x={p.box.x}
        y={p.box.y}
        width={p.box.w}
        height={p.box.h}
        rx={3}
        fill={hover ? 'rgba(37,99,235,0.10)' : 'transparent'}
        style={{ cursor: 'text' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setEditing(true)}
      />
    </g>
  );
}
