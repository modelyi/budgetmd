import { useState, useMemo, useEffect } from 'react';
import { raciData, type RaciRow } from '../data/raciData';
import type { ContentSource } from '../data/content/contentSource';
import { setActiveContentSource } from '../data/content/contentSource';
import { contentEditorStore, makeKey, useContentEditor, countNamespace } from '../data/content/contentEditor';
import type { MdField } from '../data/logic/logicMarkdown';

/**
 * T8 预算责任矩阵：阶段 / 编制表 / 业务大类 / R 填报岗位 / R 填报部门。
 * 单元格文字可经导航栏 Markdown 编辑（进覆盖层）。
 */

const NS = 'page:raci';
type Slot = 'step' | 'form' | 'cat' | 'rpos' | 'rdept';
const cellSlots: Array<[Slot, keyof RaciRow]> = [
  ['form', 'form'], ['cat', 'cat'], ['rpos', 'r_pos'], ['rdept', 'r_dept'],
];

const roleDefs = [
  { code: 'R', name: '填报人' },
  { code: 'A', name: '审批人' },
  { code: 'C', name: '协同部门' },
  { code: 'I', name: '知会部门' },
];

export function RaciView() {
  const [filter, setFilter] = useState<string>('全部');
  const ov = useContentEditor();

  // 每个阶段在完整数据中的首行索引（用于阶段标题 key）
  const stepFirstIdx = useMemo(() => {
    const m: Record<string, number> = {};
    raciData.forEach((r, i) => {
      if (r.step && m[r.step] === undefined) m[r.step] = i;
    });
    return m;
  }, []);

  const val = (i: number, slot: Slot, orig: string | null): string => {
    if (orig == null) return '-';
    const k = makeKey(NS, `row:${i}`, slot);
    return ov[k]?.value ?? orig;
  };

  const cats = useMemo(
    () => ['全部', ...Array.from(new Set(raciData.map((r) => r.cat).filter(Boolean) as string[]))],
    [],
  );

  const indexed = useMemo(() => raciData.map((r, i) => ({ r, i })), []);
  const filtered = filter === '全部' ? indexed : indexed.filter((x) => x.r.cat === filter);

  const grouped = useMemo(() => {
    const g: Record<string, { r: RaciRow; i: number }[]> = {};
    for (const x of filtered) {
      const k = x.r.step || '其他';
      (g[k] ||= []).push(x);
    }
    return g;
  }, [filtered]);

  // 整表内容源
  const source = useMemo<ContentSource>(() => ({
    id: NS,
    title: '预算责任矩阵',
    collect: () => {
      const m = contentEditorStore.getMap();
      const out: MdField[] = [];
      const seen = new Set<string>();
      raciData.forEach((r, i) => {
        if (r.step && !seen.has(r.step)) {
          seen.add(r.step);
          const k = makeKey(NS, `row:${i}`, 'step');
          out.push({ key: k, kind: 'caption', original: r.step, value: m[k]?.value ?? r.step });
        }
        cellSlots.forEach(([slot, key]) => {
          const orig = r[key];
          if (orig == null) return;
          const k = makeKey(NS, `row:${i}`, slot);
          out.push({
            key: k, kind: slot === 'form' ? 'label' : 'text', original: orig,
            value: m[k]?.value ?? orig,
          });
        });
      });
      return out;
    },
    apply: (parsed) => {
      raciData.forEach((r, i) => {
        const all: Array<[Slot, string | null]> = [
          ['step', r.step],
          ...cellSlots.map(([slot, key]) => [slot, r[key]] as [Slot, string | null]),
        ];
        all.forEach(([slot, orig]) => {
          if (orig == null) return;
          const k = makeKey(NS, `row:${i}`, slot);
          const next = parsed[k];
          if (next === undefined) return;
          contentEditorStore.setText(k, next, orig);
        });
      });
    },
    reset: () => contentEditorStore.resetNamespace(NS),
    count: () => countNamespace(contentEditorStore.getMap(), NS),
  }), []);

  useEffect(() => {
    setActiveContentSource(source);
    return () => setActiveContentSource(undefined);
  }, [source]);

  return (
    <div style={{ padding: 24, background: '#f1f5f9', minHeight: '100vh' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>T8 预算责任矩阵</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {roleDefs.map((r) => (
          <div key={r.code} style={{ background: '#fff', padding: '6px 12px', borderRadius: 6, fontSize: 12, border: '1px solid #e2e8f0' }}>
            <b>{r.code}</b> · {r.name}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            style={{
              padding: '4px 12px', borderRadius: 14, fontSize: 12, cursor: 'pointer',
              background: filter === c ? '#1e293b' : '#fff',
              color: filter === c ? '#fff' : '#334155',
              border: '1px solid #cbd5e1',
            }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 8, overflow: 'auto', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
              <th style={th}>阶段</th>
              <th style={th}>编制表</th>
              <th style={th}>业务大类</th>
              <th style={th}>R 填报岗位</th>
              <th style={th}>R 填报部门</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(grouped).map(([step, items]) =>
              items.map((x, i) => (
                <tr key={`${step}-${x.i}`} style={{ borderTop: '1px solid #e2e8f0' }}>
                  {i === 0 && (
                    <td rowSpan={items.length} style={{ ...td, verticalAlign: 'top', fontWeight: 600, background: '#f8fafc' }}>
                      {val(stepFirstIdx[step] ?? items[0].i, 'step', step)}
                    </td>
                  )}
                  <td style={{ ...td, fontWeight: 500 }}>{val(x.i, 'form', x.r.form)}</td>
                  <td style={td}>{val(x.i, 'cat', x.r.cat)}</td>
                  <td style={td}>{val(x.i, 'rpos', x.r.r_pos)}</td>
                  <td style={td}>{val(x.i, 'rdept', x.r.r_dept)}</td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: '10px 12px',
  fontWeight: 600,
  color: '#475569',
  borderBottom: '2px solid #e2e8f0',
  whiteSpace: 'nowrap',
};

const td: React.CSSProperties = {
  padding: '8px 12px',
  color: '#1e293b',
  verticalAlign: 'top',
};
