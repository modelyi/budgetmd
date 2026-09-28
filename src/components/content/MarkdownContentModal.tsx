/**
 * 通用 Markdown 编辑模态（ByteMD，左写右看）
 * =============================================================================
 * 自动对接「当前活动内容源」：打开时收集其全部文本 → Markdown（带锚点）；
 * 保存时解析并交内容源写回其覆盖层。全系统共用这一个编辑模态。
 */
import { useEffect, useState } from 'react';
import { Editor } from '@bytemd/react';
import {
  serializeFields, deserializeFields, type MdField,
} from '../../data/logic/logicMarkdown';
import {
  useActiveContentSource, useContentEditorOpen, closeContentEditor,
} from '../../data/content/contentSource';

export function MarkdownContentModal() {
  const source = useActiveContentSource();
  const open = useContentEditorOpen();
  const [fields, setFields] = useState<MdField[]>([]);
  const [md, setMd] = useState('');

  useEffect(() => {
    if (open && source) {
      const f = source.collect();
      setFields(f);
      setMd(serializeFields(f));
    }
  }, [open, source]);

  if (!open || !source) return null;

  const save = () => {
    source.apply(deserializeFields(md));
    closeContentEditor();
  };
  const reset = () => {
    source.reset();
    closeContentEditor();
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(15,23,42,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={closeContentEditor}
    >
      <div
        style={{
          width: 'min(1080px, 94vw)', height: '82vh',
          background: '#ffffff', borderRadius: 12,
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(15,23,42,0.35)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '12px 16px', borderBottom: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>
            Markdown 编辑 · {source.title}（左写右看；请勿删除「k:」锚点行）
          </div>
          <button
            onClick={closeContentEditor}
            style={{ border: 'none', background: 'transparent', fontSize: 20, cursor: 'pointer', color: '#64748b', lineHeight: 1 }}
            aria-label="关闭"
          >
            ×
          </button>
        </div>

        <div className="logic-md-body" style={{ flex: 1, minHeight: 0 }}>
          <Editor value={md} onChange={setMd} plugins={[]} />
        </div>

        <div
          style={{
            padding: '10px 16px', borderTop: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
          }}
        >
          <button
            onClick={reset}
            disabled={source.count() === 0}
            style={{
              background: '#fff', border: '1px solid #fca5a5', color: '#b91c1c',
              borderRadius: 6, padding: '7px 14px', fontSize: 13,
              opacity: source.count() === 0 ? 0.5 : 1,
              cursor: source.count() === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            重置本内容
          </button>
          <span style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={closeContentEditor}
              style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 6, padding: '7px 16px', cursor: 'pointer', fontSize: 13 }}
            >
              取消
            </button>
            <button
              onClick={save}
              style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
            >
              保存
            </button>
          </span>
        </div>
      </div>

      <style>{`
        .logic-md-body .bytemd { height: 100% !important; border: none; border-radius: 0; }
        .logic-md-body .markdown-body { font-size: 14px; }
      `}</style>
    </div>
  );
}
