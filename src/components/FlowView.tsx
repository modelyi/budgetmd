import { useState, useMemo, useEffect } from 'react';
import type { ContentSource } from '../data/content/contentSource';
import { setActiveContentSource } from '../data/content/contentSource';
import { contentEditorStore, makeKey, useContentEditor } from '../data/content/contentEditor';
import type { MdField, MdKind } from '../data/logic/logicMarkdown';
import {
  overviewSteps, overviewTitle, overviewIntro, overviewFoot,
  swimLanes, swimPhases, swimBlocks, swimTitle, swimIntro,
  calRows, calBlocks, calMilestones, calTitle, calIntro, calNotes,
} from '../data/pages/flowData';

/**
 * T6 整体流程图（业务编制工作流）：概览时间线 / 详细泳道 / 编制日历。
 * 不讲表间数据取数关系（那是 T7）。当前模式的全部文字可 Markdown 编辑。
 */

const NS = 'page:flow';
type Mode = 'overview' | 'swimlane' | 'calendar';
const modePrefixes: Record<Mode, string[]> = {
  overview: ['ov'],
  swimlane: ['sl', 'sp', 'sb', 'sw-'],
  calendar: ['cr', 'cb', 'cm', 'cn', 'cal-'],
};

type TFn = (id: string, field: string, orig: string) => string;

export function FlowView() {
  const [mode, setMode] = useState<Mode>('overview');
  const ov = useContentEditor();
  const t: TFn = (id, field, orig) => ov[makeKey(NS, id, field)]?.value ?? orig;

  const add = (out: MdField[], id: string, field: string, kind: MdKind, orig: string) => {
    const k = makeKey(NS, id, field);
    out.push({ key: k, kind, original: orig, value: contentEditorStore.getMap()[k]?.value ?? orig });
  };

  const collect = (): MdField[] => {
    const out: MdField[] = [];
    if (mode === 'overview') {
      add(out, 'ov-title', 'text', 'caption', overviewTitle);
      add(out, 'ov-intro', 'text', 'text', overviewIntro);
      overviewSteps.forEach((s) => {
        add(out, s.id, 'label', 'label', s.label);
        add(out, s.id, 'sub', 'text', s.sub);
      });
      overviewFoot.forEach((x) => add(out, x.id, 'text', 'line', x.text));
    } else if (mode === 'swimlane') {
      add(out, 'sw-title', 'text', 'caption', swimTitle);
      add(out, 'sw-intro', 'text', 'text', swimIntro);
      swimPhases.forEach((p) => add(out, p.id, 'label', 'label', p.label));
      swimLanes.forEach((l) => add(out, l.id, 'name', 'label', l.name));
      swimBlocks.forEach((b) =>
        b.lines.forEach((ln, j) => add(out, b.id, `line:${j}`, 'line', ln)));
    } else {
      add(out, 'cal-title', 'text', 'caption', calTitle);
      add(out, 'cal-intro', 'text', 'text', calIntro);
      calRows.forEach((r) => add(out, r.id, 'who', 'label', r.who));
      calBlocks.forEach((b) =>
        b.lines.forEach((ln, j) => add(out, b.id, `line:${j}`, 'line', ln)));
      calMilestones.forEach((m) => add(out, m.id, 'label', 'label', m.label));
      calNotes.forEach((n) => {
        add(out, n.id, 'title', 'title', n.title);
        n.items.forEach((it, j) => add(out, n.id, `item:${j}`, 'line', it));
      });
    }
    return out;
  };

  const source = useMemo<ContentSource>(() => ({
    id: `${NS}:${mode}`,
    title: `整体流程图 · ${mode === 'overview' ? '概览' : mode === 'swimlane' ? '泳道' : '日历'}`,
    collect,
    apply: (parsed) => {
      const orig: Record<string, string> = {};
      collect().forEach((f) => { orig[f.key] = f.original; });
      Object.entries(parsed).forEach(([k, v]) => {
        if (k in orig) contentEditorStore.setText(k, v, orig[k]);
      });
    },
    reset: () => {
      const pfx = modePrefixes[mode].map((p) => `${NS}::${p}`);
      Object.keys(contentEditorStore.getMap())
        .filter((k) => pfx.some((p) => k.startsWith(p)))
        .forEach((k) => contentEditorStore.reset(k));
    },
    count: () => {
      const pfx = modePrefixes[mode].map((p) => `${NS}::${p}`);
      return Object.keys(contentEditorStore.getMap())
        .filter((k) => pfx.some((p) => k.startsWith(p))).length;
    },
  }), [mode]);

  useEffect(() => {
    setActiveContentSource(source);
    return () => setActiveContentSource(undefined);
  }, [source]);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900 overflow-auto">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">T6 整体流程图（业务编制工作流）</h2>
        <div className="ml-4 flex gap-2">
          {([['overview', '概览版'], ['swimlane', '详细版（泳道）'], ['calendar', '编制日历']] as Array<[Mode, string]>).map(
            ([m, label]) => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-4 py-1.5 rounded-lg text-sm cursor-pointer ${mode === m ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600'}`}>
                {label}
              </button>
            ),
          )}
        </div>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        {mode === 'overview' ? <Overview t={t} /> : mode === 'swimlane' ? <Swimlane t={t} /> : <Calendar t={t} />}
      </div>
    </div>
  );
}

function Overview({ t }: { t: TFn }) {
  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow p-8">
      <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">{t('ov-title', 'text', overviewTitle)}</h3>
      <p className="text-sm text-slate-500 mb-6">{t('ov-intro', 'text', overviewIntro)}</p>
      <svg viewBox="0 0 1080 300" className="w-full">
        <defs><marker id="fa" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#94a3b8" /></marker></defs>
        <line x1="40" y1="120" x2="1040" y2="120" stroke="#cbd5e1" strokeWidth="2" />
        {overviewSteps.map((s, i) => (
          <g key={s.id}>
            <circle cx={s.x} cy="120" r="18" fill={s.color} />
            <text x={s.x} y="125" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">{i + 1}</text>
            <text x={s.x} y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b">{t(s.id, 'label', s.label)}</text>
            <text x={s.x} y="160" textAnchor="middle" fontSize="11" fill="#64748b">{t(s.id, 'sub', s.sub)}</text>
            {i < overviewSteps.length - 1 && (
              <line x1={s.x + 20} y1="120" x2={overviewSteps[i + 1].x - 20} y2="120" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#fa)" />
            )}
          </g>
        ))}
        <rect x="40" y="210" width="960" height="60" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
        {overviewFoot.map((x, i) => (
          <text key={x.id} x="60" y={235 + i * 20} fontSize="11" fill="#475569">{t(x.id, 'text', x.text)}</text>
        ))}
      </svg>
    </div>
  );
}

function Swimlane({ t }: { t: TFn }) {
  const h = 80;
  return (
    <div className="max-w-7xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">{t('sw-title', 'text', swimTitle)}</h3>
      <p className="text-sm text-slate-500 mb-4">{t('sw-intro', 'text', swimIntro)}</p>
      <svg viewBox="0 0 960 560" className="w-full">
        <defs><marker id="sa" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><polygon points="0 0, 9 3, 0 6" fill="#64748b" /></marker></defs>
        {swimPhases.map((p, i) => (
          <g key={p.id}>
            <rect x={p.x} y="60" width={p.w} height="460" fill={i % 2 === 0 ? '#f8fafc' : '#f1f5f9'} />
            <text x={p.x + p.w / 2} y="50" textAnchor="middle" fontSize="12" fontWeight="700" fill="#475569">{t(p.id, 'label', p.label)}</text>
          </g>
        ))}
        {swimLanes.map((l) => (
          <g key={l.id}>
            <rect x="10" y={l.y} width="110" height={h} fill={l.color} rx="4" />
            <text x="65" y={l.y + h / 2 + 5} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">{t(l.id, 'name', l.name)}</text>
            <line x1="120" y1={l.y + h} x2="950" y2={l.y + h} stroke="#e2e8f0" />
          </g>
        ))}
        {swimBlocks.map((b) => {
          const lane = swimLanes[b.lane];
          const y = lane.y + 15;
          return (
            <g key={b.id}>
              <rect x={b.x} y={y} width={b.w} height="50" rx="6" fill={lane.color} opacity="0.9" />
              {b.lines.map((line, j) => (
                <text key={j} x={b.x + b.w / 2} y={y + 20 + j * 16} textAnchor="middle" fill="#fff" fontSize="10" fontWeight={j === 0 ? 700 : 400}>
                  {t(b.id, `line:${j}`, line)}
                </text>
              ))}
            </g>
          );
        })}
        <g stroke="#64748b" strokeWidth="1.5" fill="none" markerEnd="url(#sa)">
          <line x1="450" y1="130" x2="400" y2="185" />
          <line x1="480" y1="255" x2="460" y2="275" />
          <line x1="440" y1="395" x2="405" y2="455" />
          <line x1="450" y1="130" x2="380" y2="455" />
        </g>
      </svg>
    </div>
  );
}

function Calendar({ t }: { t: TFn }) {
  const months = ['10月', '11月', '12月', '1月'];
  const colW = 90;
  const monthStartX = 160;
  const rowH = 44;
  const headerH = 60;

  const width = monthStartX + 12 * colW + 20;
  const height = headerH + calRows.length * rowH + 120;

  return (
    <div className="max-w-7xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">{t('cal-title', 'text', calTitle)}</h3>
      <p className="text-sm text-slate-500 mb-4">{t('cal-intro', 'text', calIntro)}</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {months.map((m, i) => (
          <g key={m}>
            <rect x={monthStartX + i * 3 * colW} y="10" width={3 * colW} height="24" fill="#1e293b" rx="3" />
            <text x={monthStartX + i * 3 * colW + 1.5 * colW} y="27" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">{m}</text>
            {[0, 1, 2].map((j) => (
              <g key={j}>
                <line x1={monthStartX + (i * 3 + j) * colW} y1="34" x2={monthStartX + (i * 3 + j) * colW} y2={height - 80} stroke="#e2e8f0" strokeDasharray="3,3" />
                <text x={monthStartX + (i * 3 + j) * colW + colW / 2} y="48" textAnchor="middle" fontSize="10" fill="#94a3b8">
                  {j === 0 ? '上' : j === 1 ? '中' : '下'}
                </text>
              </g>
            ))}
          </g>
        ))}

        {calRows.map((r, i) => (
          <g key={r.id}>
            <rect x="10" y={headerH + i * rowH} width="140" height={rowH - 6} fill={r.color} rx="4" />
            <text x="80" y={headerH + i * rowH + (rowH - 6) / 2 + 5} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">
              {t(r.id, 'who', r.who)}
            </text>
            <line x1="150" y1={headerH + i * rowH + rowH - 6} x2={width - 10} y2={headerH + i * rowH + rowH - 6} stroke="#e2e8f0" />
          </g>
        ))}

        {calBlocks.map((b) => {
          const r = calRows[b.row];
          const x = monthStartX + b.start * colW + 4;
          const w = b.span * colW - 8;
          const y = headerH + b.row * rowH + 6;
          return (
            <g key={b.id}>
              <rect x={x} y={y} width={w} height={rowH - 18} rx="4" fill={r.color} opacity="0.88" />
              {b.lines.map((line, j) => (
                <text key={j} x={x + w / 2} y={y + 16 + j * 13} textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight={j === 0 ? 700 : 400}>
                  {t(b.id, `line:${j}`, line)}
                </text>
              ))}
            </g>
          );
        })}

        {calMilestones.map((m) => {
          const x = monthStartX + m.col * colW + colW / 2;
          return (
            <g key={m.id}>
              <polygon points={`${x},${height - 60} ${x - 6},${height - 72} ${x + 6},${height - 72}`} fill="#dc2626" />
              <line x1={x} y1={height - 72} x2={x} y2={headerH} stroke="#dc2626" strokeDasharray="4,3" strokeWidth="1" />
              <text x={x} y={height - 44} textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">◆ {t(m.id, 'label', m.label)}</text>
            </g>
          );
        })}
      </svg>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
        {calNotes.map((n) => (
          <div
            key={n.id}
            className={`p-3 rounded border-l-3 ${n.variant === 'blue' ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500' : 'bg-amber-50 dark:bg-amber-950/30 border-amber-500'}`}
          >
            <b>{t(n.id, 'title', n.title)}</b>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              {n.items.map((it, j) => (
                <li key={j}>{t(n.id, `item:${j}`, it)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
