/**
 * 逻辑图「数据驱动渲染引擎 v2」
 * =============================================================================
 * 读 LogicDiagramData（声明式：group/node/hub 树 + edges），自动完成：
 * - 递归布局：column 纵向堆叠、row 横向槽布局（trackW/trackH、gap、padding、同槽 stack）；
 * - 边路由：按元素 id + 锚点取端点，垂直/水平直线或正交折线，箭头自动旋转；
 * - bus 汇流总线（水平，起止由连接它的边决定）；
 * - 左侧 targetDown 红线；底部自动图例。
 *
 * z-order：容器背景 → 边/总线/红线 → 节点 → 横贯 hub（hub 不透明，遮盖穿过它的边）。
 * 本组件不含业务文字，内容全部来自数据层。
 */
import { useEffect, useMemo } from 'react';
import type {
  LogicDiagramData, LogicItem, LogicNode, LogicHub, LogicGroup,
  LogicEdge, LogicRef, LegendEntry,
} from '../../data/logic/logicTypes';
import { EditableText } from './EditableText';
import {
  useContentEditor, makeKey, contentEditorStore, countNamespace,
  type ContentOverrideMap,
} from '../../data/content/contentEditor';
import {
  setActiveContentSource, openContentEditor,
} from '../../data/content/contentSource';
import type { MdField, MdKind } from '../../data/logic/logicMarkdown';

// ── 布局常量 ──
const STACK_GAP = 5;
const CAPTION_H = 19;
const CAPTION_FS = 12.5;

type Pad = [number, number];
function parsePad(v: number | [number, number] | undefined, d: number): Pad {
  if (v == null) return [d, d];
  return Array.isArray(v) ? [v[0], v[1]] : [v, v];
}

interface Laid {
  item: LogicItem;
  bbox: { x: number; y: number; w: number; h: number };
  children?: Laid[];
  slotCx?: number[];
}

/** 递归布局：在 (x, top) 开始，给定可用宽 availW，返回 Laid（高度自适应） */
function layout(item: LogicItem, x: number, top: number, availW: number): Laid {
  if (item.kind === 'hub') return layoutHub(item, x, top, availW);
  if (item.kind === 'group') return layoutGroup(item, x, top, availW);
  return layoutNode(item, x, top, availW);
}

function layoutNode(n: LogicNode, x: number, top: number, availW: number): Laid {
  const w = n.w ?? availW;
  const h = n.h ?? 40;
  return { item: n, bbox: { x, y: top, w, h } };
}

function layoutHub(hub: LogicHub, x: number, top: number, availW: number): Laid {
  const h = hub.h ?? 24;
  return { item: hub, bbox: { x, y: top, w: availW, h } };
}

/** 递归整体平移 laid 子树（含容器内部所有后代） */
function offsetLaid(l: Laid, dx: number, dy: number): void {
  l.bbox.x += dx;
  l.bbox.y += dy;
  l.children?.forEach((c) => offsetLaid(c, dx, dy));
}

function layoutGroup(g: LogicGroup, x: number, top: number, availW: number): Laid {
  const [pl, pr] = parsePad(g.padX, 0);
  const [pt, pb] = parsePad(g.padY, 0);
  const cw = availW - pl - pr;

  // caption 预留
  const captionH = g.caption && g.label ? CAPTION_H : 0;
  let cursor = top + pt + captionH;

  if (g.flow === 'row') {
    // 按 col 分组（缺省按顺序）
    const groups = new Map<number, LogicItem[]>();
    g.children.forEach((c, i) => {
      const key = (c as LogicNode | LogicGroup).col ?? i;
      const arr = groups.get(key) ?? [];
      arr.push(c);
      groups.set(key, arr);
    });
    const cols = [...groups.keys()].sort((a, b) => a - b);
    const nSlots = cols.length;
    const gap = g.gap ?? 0;
    const totalGap = gap * (nSlots - 1);
    const autoW = nSlots > 0 ? (cw - totalGap) / nSlots : cw;

    const laidChildren: Laid[] = [];
    const slotCx: number[] = [];
    const slotPlans: { childLaids: Laid[]; slotH: number }[] = [];
    let maxH = 0;
    let slotLeft = x + pl;

    cols.forEach((colKey, si) => {
      const slotW = g.trackW?.[si] ?? autoW;
      slotCx.push(slotLeft + slotW / 2);
      const items = (groups.get(colKey) ?? []).sort((a, b) =>
        ((a as LogicNode).stack ?? 0) - ((b as LogicNode).stack ?? 0));

      // 先在 y=0 布局（仅取尺寸），稍后整体平移到目标 y
      const childLaids: Laid[] = items.map((c) => {
        const cwChild = (c as LogicNode).w ?? slotW;
        const childX = slotLeft + slotW / 2 - cwChild / 2;
        return layout(c, childX, 0, cwChild);
      });
      const slotH = items.length > 1
        ? childLaids.reduce((s, l) => s + l.bbox.h, 0) + STACK_GAP * (items.length - 1)
        : childLaids[0].bbox.h;
      maxH = Math.max(maxH, slotH);
      slotPlans.push({ childLaids, slotH });
      laidChildren.push(...childLaids);
      slotLeft += slotW + gap;
    });

    // 行高 = maxH；单 child 顶部对齐 cursor；stack 整体垂直居中
    slotPlans.forEach((p) => {
      if (p.childLaids.length === 1) {
        offsetLaid(p.childLaids[0], 0, cursor);
      } else {
        let yy = cursor + (maxH - p.slotH) / 2;
        p.childLaids.forEach((l) => {
          offsetLaid(l, 0, yy);
          yy += l.bbox.h + STACK_GAP;
        });
      }
    });

    const bbox = { x, y: top, w: availW, h: maxH + pt + pb + captionH };
    return { item: g, bbox, children: laidChildren, slotCx };
  }

  // column
  const laidChildren: Laid[] = [];
  g.children.forEach((c, i) => {
    const childW = (c as LogicNode).w ?? cw;
    const childX = (c as LogicNode).w != null ? x + pl + (cw - childW) / 2 : x + pl;
    const l = layout(c, childX, cursor, childW);
    laidChildren.push(l);
    const ch = l.bbox.h;
    const sp = g.spacing?.[i] ?? g.gap ?? 0;
    cursor += ch + sp;
  });
  const h = cursor - top + pb;
  const bbox = { x, y: top, w: availW, h };
  return { item: g, bbox, children: laidChildren };
}

// ── 元素索引 ──
function indexLaid(root: Laid) {
  const byId = new Map<string, Laid>();
  const walk = (l: Laid) => {
    byId.set((l.item as { id: string }).id, l);
    l.children?.forEach(walk);
  };
  walk(root);
  return byId;
}

function isNode(l: Laid): l is Laid & { item: LogicNode } {
  return l.item.kind !== 'group' && l.item.kind !== 'hub';
}

// ── 边端点 ──
function rawPoint(byId: Map<string, Laid>, r: LogicRef, anchor: 'top'|'bottom'|'left'|'right') {
  const l = byId.get(r.ref)!;
  const b = l.bbox;
  let px = b.x + b.w / 2;
  let py = b.y + b.h / 2;
  if (r.slot != null && l.slotCx) px = l.slotCx[Math.min(r.slot, l.slotCx.length - 1)];
  if (anchor === 'top') py = b.y;
  if (anchor === 'bottom') py = b.y + b.h;
  if (anchor === 'left') { px = b.x; py = b.y + b.h / 2; }
  if (anchor === 'right') { px = b.x + b.w; py = b.y + b.h / 2; }
  return { px, py };
}

interface Geom { d: string; color: string; width: number; arrow: boolean; arrowAt: 'start'|'end'; label?: string; lx: number; ly: number; }

function buildEdge(byId: Map<string, Laid>, e: LogicEdge): Geom {
  const fr: LogicRef = typeof e.from === 'string' ? { ref: e.from } : e.from;
  const tr: LogicRef = typeof e.to === 'string' ? { ref: e.to } : e.to;
  const fa = fr.anchor ?? 'bottom';
  const ta = tr.anchor ?? 'top';
  const p1 = rawPoint(byId, fr, fa);
  const p2 = rawPoint(byId, tr, ta);

  const kind = e.kind ?? 'flow';
  const color = e.color ?? (kind === 'elim' ? '#dc2626' : kind === 'link' ? '#94a3b8' : '#334155');
  const width = e.width ?? 1.3;
  const arrow = e.arrow ?? (kind !== 'link');
  const arrowAt = e.arrowAt ?? 'end';

  const vertical = (fa === 'top' || fa === 'bottom') && (ta === 'top' || ta === 'bottom');
  const horizontal = (fa === 'left' || fa === 'right') && (ta === 'left' || ta === 'right');

  let d = '';
  if (vertical) {
    const l1 = byId.get(fr.ref)!;
    const l2 = byId.get(tr.ref)!;
    let x: number;
    if (isNode(l1) && isNode(l2) && Math.abs(p1.px - p2.px) > 1) {
      // node→node 不同 x：正交折线
      const bend = e.bend ?? 0.5;
      const yMid = p1.py + (p2.py - p1.py) * bend;
      d = `M${p1.px},${p1.py} L${p1.px},${yMid} L${p2.px},${yMid} L${p2.px},${p2.py}`;
    } else {
      x = isNode(l1) ? p1.px : isNode(l2) ? p2.px : (p1.px + p2.px) / 2;
      d = `M${x},${p1.py} L${x},${p2.py}`;
    }
  } else if (horizontal) {
    const l1 = byId.get(fr.ref)!;
    const l2 = byId.get(tr.ref)!;
    let y: number;
    if (isNode(l1) && isNode(l2) && Math.abs(p1.py - p2.py) > 1) {
      const bend = e.bend ?? 0.5;
      const xMid = p1.px + (p2.px - p1.px) * bend;
      d = `M${p1.px},${p1.py} L${xMid},${p1.py} L${xMid},${p2.py} L${p2.px},${p2.py}`;
    } else {
      y = isNode(l1) ? p1.py : isNode(l2) ? p2.py : (p1.py + p2.py) / 2;
      d = `M${p1.px},${y} L${p2.px},${y}`;
    }
  } else {
    d = `M${p1.px},${p1.py} L${p2.px},${p2.py}`;
  }

  return {
    d, color, width, arrow, arrowAt,
    label: e.label,
    lx: (p1.px + p2.px) / 2 + (e.labelDx ?? 0),
    ly: (p1.py + p2.py) / 2 + (e.labelDy ?? 0),
  };
}

// ── 节点内部文字 ──
function padTopOf(h: number): number {
  if (h >= 120) return 13;
  if (h >= 80) return 13;
  if (h >= 66) return 20;
  if (h >= 48) return 8;
  if (h >= 42) return 11;
  if (h >= 38) return 11;
  if (h >= 34) return 10;
  return 5;
}

/** 节点标题与各行：渲染为可就地编辑文本 */
function NodeRows({ diagramId, n, b, ov }: {
  diagramId: string;
  n: LogicNode;
  b: { x: number; y: number; w: number; h: number };
  ov: ContentOverrideMap;
}) {
  const titleFs = n.titleFs ?? 10;
  const lineFs = n.lineFs ?? 8.8;
  let s = b.y + padTopOf(b.h);
  const items: {
    key: string; text: string; original: string; fs: number;
    fill: string; bold: boolean; y: number; box: { x:number;y:number;w:number;h:number };
  }[] = [];

  if (n.title) {
    const key = makeKey(diagramId, n.id, 'title');
    const original = n.title;
    const y = s + titleFs * 0.8;
    items.push({
      key, text: ov[key]?.value ?? original, original, fs: titleFs,
      fill: '#1e293b', bold: true, y,
      box: { x: b.x + 5, y: y - titleFs - 2, w: b.w - 10, h: titleFs * 1.9 },
    });
    s += titleFs * (titleFs >= 9.5 ? 2.45 : 1.9);
  }
  (n.lines ?? []).forEach((t, i) => {
    const key = makeKey(diagramId, n.id, `line:${i}`);
    const y = s + lineFs * 0.8;
    items.push({
      key, text: ov[key]?.value ?? t, original: t, fs: lineFs,
      fill: n.lineFills?.[i] ?? '#334155', bold: false, y,
      box: { x: b.x + 5, y: y - lineFs - 2, w: b.w - 10, h: lineFs * 1.9 },
    });
    s += lineFs * 1.75;
  });

  return (
    <>
      {items.map((it) => (
        <EditableText
          key={it.key} k={it.key}
          x={b.x + (b.w >= 200 ? 12 : 9)} y={it.y}
          fs={it.fs} fill={it.fill} bold={it.bold}
          value={it.text} original={it.original}
          edited={!!ov[it.key]} box={it.box}
        />
      ))}
    </>
  );
}

// ── 图例横排布局 ──
function Legend({ entries, x, y, width }: { entries: LegendEntry[]; x: number; y: number; width: number }) {
  const gap = 26;
  const widths = entries.map((e) => e.text.length * 9.4 + 30);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (entries.length - 1);
  let cursor = x + Math.max(0, (width - total) / 2);
  return (
    <g>
      {entries.map((e, i) => {
        const ex = cursor;
        cursor += widths[i] + gap;
        return (
          <g key={i}>
            {e.type === 'box' ? (
              <rect x={ex} y={y - 11} width="18" height="13" rx="2" fill={e.fill}
                stroke={e.stroke ?? e.fill} />
            ) : (
              <line x1={ex} y1={y - 5} x2={ex + 24} y2={y - 5} stroke={e.fill} strokeWidth="1.7"
                strokeDasharray={e.dashed ? '5,4' : undefined} />
            )}
            <text x={ex + 28} y={y} fontSize="9.2" fill="#334155">{e.text}</text>
          </g>
        );
      })}
    </g>
  );
}

export function computeLayout(data: LogicDiagramData) {
  const rootLaid = layout(data.root, 0, 0, data.width);
  return { rootLaid, byId: indexLaid(rootLaid) };
}

/** 收集一张图全部可编辑文本（按布局/阅读顺序，含当前人工值），供 Markdown 编辑 */
function collectDiagramFields(data: LogicDiagramData): MdField[] {
  const { rootLaid } = computeLayout(data);
  const curMap = contentEditorStore.getMap();
  const out: MdField[] = [];
  const push = (id: string, field: string, kind: MdKind, original: string) => {
    const key = makeKey(data.id, id, field);
    out.push({ key, kind, original, value: curMap[key]?.value ?? original });
  };
  const walk = (l: Laid) => {
    const it = l.item as {
      id: string; kind?: string; label?: unknown; caption?: unknown;
      title?: unknown; lines?: unknown; foot?: unknown; bus?: unknown;
    };
    if (it.kind === 'group') {
      if (it.caption && typeof it.label === 'string') push(it.id, 'caption', 'caption', it.label);
      l.children?.forEach(walk);
    } else if (it.kind === 'hub') {
      if (!it.bus && typeof it.label === 'string') push(it.id, 'label', 'label', it.label);
    } else {
      if (typeof it.title === 'string' && it.title) push(it.id, 'title', 'title', it.title);
      const lines = (it.lines as string[] | undefined) ?? [];
      lines.forEach((t, i) => push(it.id, `line:${i}`, 'line', t));
      if (typeof it.foot === 'string') push(it.id, 'foot', 'foot', it.foot);
    }
  };
  walk(rootLaid);
  return out;
}

export function LogicDiagramCanvas({ data }: { data: LogicDiagramData }) {
  const ov = useContentEditor();
  const { rootLaid, byId } = computeLayout(data);

  // 注册当前图为活动内容源（供导航栏全局 Markdown 编辑）
  const source = useMemo(
    () => ({
      id: `logic:${data.id}`,
      title: `逻辑关系图 · ${data.id === 'overall' ? '预算模块全景' : '数据归集与责任流转'}`,
      collect: () => collectDiagramFields(data),
      apply: (parsed: Record<string, string>) => {
        collectDiagramFields(data).forEach((f) => {
          const next = parsed[f.key];
          if (next !== undefined) contentEditorStore.setText(f.key, next, f.original);
        });
      },
      reset: () => contentEditorStore.resetNamespace(data.id),
      count: () => countNamespace(contentEditorStore.getMap(), data.id),
    }),
    [data],
  );
  useEffect(() => {
    setActiveContentSource(source);
    return () => setActiveContentSource(undefined);
  }, [source]);

  // 收集容器背景（含 caption）
  const groupBgs: { l: Laid }[] = [];
  const nodes: Laid[] = [];
  const hubs: Laid[] = [];
  const collect = (l: Laid) => {
    if (l.item.kind === 'group') {
      groupBgs.push({ l });
      l.children?.forEach(collect);
    } else if (l.item.kind === 'hub') {
      hubs.push(l);
    } else {
      nodes.push(l);
    }
  };
  collect(rootLaid);

  const edges = (data.edges ?? []).map((e) => buildEdge(byId, e));

  // 箭头颜色去重 → marker
  const arrowColors = [...new Set(edges.filter((g) => g.arrow).map((g) => g.color))];
  if (data.targetDown) arrowColors.push('#dc2626');

  // bus 总线几何
  const busHubs = hubs.filter((l) => (l.item as LogicHub).bus);
  const busLines: { id:string; x1:number; x2:number; y:number; color:string }[] = [];
  busHubs.forEach((l) => {
    const hub = l.item as LogicHub;
    const xs: number[] = [];
    edges.forEach((g, gi) => {
      const e = data.edges![gi];
      const refs = [typeof e.from === 'string' ? e.from : e.from.ref, typeof e.to === 'string' ? e.to : e.to.ref];
      if (refs.includes(hub.id)) {
        // 取该 edge 竖直 x：解析 d 的 M x
        const m = g.d.match(/M(-?[\d.]+)/);
        if (m) xs.push(parseFloat(m[1]));
      }
    });
    if (xs.length) {
      busLines.push({
        id: hub.id,
        x1: Math.min(...xs), x2: Math.max(...xs),
        y: l.bbox.y + l.bbox.h / 2,
        color: hub.stroke,
      });
    }
  });

  // 画布高度
  const contentBottom = rootLaid.bbox.y + rootLaid.bbox.h;
  const legendY = contentBottom + 24;
  const svgH = legendY + (data.legend ? 26 : 12);

  // targetDown 红线
  const hq = byId.get('hq');
  const collectLb = byId.get('collect');
  const rootGroup = data.root;
  const [rpl] = parsePad(rootGroup.padX, 0);
  const sideX = rpl - 24;
  let red: { points:string; label:string; lx:number; ly:number } | null = null;
  if (data.targetDown && hq && collectLb) {
    const x0 = hq.bbox.x + hq.bbox.w / 2;
    const y0 = hq.bbox.y + hq.bbox.h / 2;
    const y1 = collectLb.bbox.y + collectLb.bbox.h / 2;
    red = {
      points: `${x0},${y0} ${sideX},${y0} ${sideX},${y1}`,
      label: data.targetDownLabel ?? '',
      lx: sideX - 12, ly: (y0 + y1) / 2,
    };
  }

  const markerFor = (color: string) => `${data.id}-${color.replace('#', '')}`;

  const changed = countNamespace(ov, data.id);

  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 16, overflow: 'auto' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 10, flexWrap: 'wrap', marginBottom: 10,
      }}>
        <span style={{ fontSize: 12, color: '#64748b' }}>
          提示：直接点击图中文字即可就地修改（改动保存在本浏览器，不覆盖源数据）
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: changed ? '#b45309' : '#94a3b8', fontWeight: changed ? 700 : 400 }}>
            已人工修改 {changed} 处
          </span>
          <button onClick={() => openContentEditor()} style={BTN_GHOST}>Markdown 编辑</button>
          <button
            onClick={() => contentEditorStore.resetNamespace(data.id)}
            disabled={!changed}
            style={{ ...BTN_GHOST, opacity: changed ? 1 : 0.5, cursor: changed ? 'pointer' : 'not-allowed' }}
          >
            全部重置
          </button>
        </span>
      </div>
      <svg id={`logic-svg-${data.id}`} width={data.width} height={svgH} viewBox={`0 0 ${data.width} ${svgH}`}>
        <defs>
          {arrowColors.map((c) => (
            <marker key={c} id={markerFor(c)} viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6.5" markerHeight="6.5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill={c} />
            </marker>
          ))}
        </defs>

        {/* 1) 容器背景 + caption */}
        {groupBgs.map(({ l }) => {
          const g = l.item as LogicGroup;
          const b = l.bbox;
          const [pt] = parsePad(g.padY, 0);
          const [pl, pr] = parsePad(g.padX, 0);
          const capKey = makeKey(data.id, g.id, 'caption');
          const capOriginal = g.label ?? '';
          const capY = b.y + pt + CAPTION_FS * 0.8;
          return (
            <g key={g.id}>
              {g.fill && (
                <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={g.rx ?? 10}
                  fill={g.fill} stroke={g.stroke ?? 'none'} />
              )}
              {g.caption && g.label && (
                <EditableText
                  k={capKey}
                  x={b.x + pl + 4} y={capY}
                  fs={CAPTION_FS} fill={g.labelColor ?? '#0f172a'} bold
                  value={ov[capKey]?.value ?? capOriginal} original={capOriginal}
                  edited={!!ov[capKey]} multiline
                  box={{ x: b.x + pl, y: capY - CAPTION_FS - 2, w: b.w - pl - pr - 6, h: CAPTION_FS * 2.0 }}
                />
              )}
            </g>
          );
        })}

        {/* 2) 边 */}
        {edges.map((g, i) => {
          const e0 = data.edges![i];
          const isMid = verticalLabel(e0);
          const lk = makeKey(data.id, e0.id, 'label');
          return (
            <g key={e0.id}>
              <path d={g.d} fill="none" stroke={g.color} strokeWidth={g.width}
                strokeDasharray={e0.dashed ? (e0.dashArray ?? '5,4') : undefined}
                markerEnd={g.arrow && g.arrowAt === 'end' ? `url(#${markerFor(g.color)})` : undefined}
                markerStart={g.arrow && g.arrowAt === 'start' ? `url(#${markerFor(g.color)})` : undefined}
              />
              {g.label && (
                <EditableText
                  k={lk}
                  x={g.lx} y={g.ly}
                  fs={8.6} fill={g.color} bold
                  anchor={isMid ? 'middle' : 'start'}
                  value={ov[lk]?.value ?? g.label} original={g.label}
                  edited={!!ov[lk]}
                  box={isMid
                    ? { x: g.lx - 42, y: g.ly - 11, w: 84, h: 17 }
                    : { x: g.lx - 2, y: g.ly - 11, w: Math.max(72, g.label.length * 9 + 12), h: 17 }}
                />
              )}
            </g>
          );
        })}

        {/* bus 总线 */}
        {busLines.map((bl) => (
          <line key={bl.id} x1={bl.x1} y1={bl.y} x2={bl.x2} y2={bl.y}
            stroke={bl.color} strokeWidth="1.3" strokeDasharray="5,4" />
        ))}

        {/* targetDown 红线 */}
        {red && (
          <g>
            <polyline points={red.points} fill="none" stroke="#dc2626" strokeWidth="1.4"
              strokeDasharray="5,4" markerEnd={`url(#${markerFor('#dc2626')})`} />
            <text transform={`rotate(-90 ${red.lx} ${red.ly})`} x={red.lx} y={red.ly}
              fontSize="9.5" fontWeight="700" fill="#dc2626" textAnchor="middle">
              {red.label}
            </text>
          </g>
        )}

        {/* 3) 节点 */}
        {nodes.map((l) => {
          const n = l.item as LogicNode;
          const fk = makeKey(data.id, n.id, 'foot');
          const footY = l.bbox.y + l.bbox.h - 7;
          return (
            <g key={n.id}>
              <rect x={l.bbox.x} y={l.bbox.y} width={l.bbox.w} height={l.bbox.h} rx="7"
                fill={n.fill} stroke={n.stroke}
                strokeDasharray={n.dashed ? '5,3' : undefined} />
              <NodeRows diagramId={data.id} n={n} b={l.bbox} ov={ov} />
              {n.badge && <Badge n={n} b={l.bbox} />}
              {n.foot && (
                <EditableText
                  k={fk}
                  x={l.bbox.x + (l.bbox.w >= 200 ? 12 : 9)} y={footY}
                  fs={8.4} fill={n.footFill ?? '#1d4ed8'} bold
                  value={ov[fk]?.value ?? n.foot} original={n.foot}
                  edited={!!ov[fk]}
                  box={{ x: l.bbox.x + 5, y: footY - 10, w: l.bbox.w - 10, h: 14 }}
                />
              )}
            </g>
          );
        })}

        {/* 4) hub（非 bus） */}
        {hubs.filter((l) => !(l.item as LogicHub).bus).map((l) => {
          const h = l.item as LogicHub;
          const hk = makeKey(data.id, h.id, 'label');
          const hy = l.bbox.y + l.bbox.h / 2 + 3.5;
          return (
            <g key={h.id}>
              <rect x={l.bbox.x} y={l.bbox.y} width={l.bbox.w} height={l.bbox.h} rx="7"
                fill={h.fill} stroke={h.stroke}
                strokeDasharray={h.dashed ? '5,4' : undefined} />
              {h.label && (
                <EditableText
                  k={hk}
                  x={l.bbox.x + l.bbox.w / 2} y={hy}
                  fs={9.5} fill={h.labelColor ?? '#475569'} bold anchor="middle"
                  value={ov[hk]?.value ?? h.label} original={h.label}
                  edited={!!ov[hk]} multiline
                  box={{ x: l.bbox.x + 8, y: l.bbox.y + 2, w: l.bbox.w - 16, h: l.bbox.h - 4 }}
                />
              )}
            </g>
          );
        })}

        {/* 图例 */}
        {data.legend && data.legendEntries && (
          <Legend entries={data.legendEntries} x={0} y={legendY} width={data.width} />
        )}
      </svg>
    </div>
  );
}

const BTN_GHOST = {
  background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 6,
  padding: '5px 12px', fontSize: 12, color: '#334155',
} as const;

/** 视角标签（节点右上角） */
function Badge({ n, b }: { n: LogicNode; b: { x:number;y:number;w:number;h:number } }) {
  const text = n.badge!;
  const w = text.length > 7 ? 66 : text.length > 4 ? 54 : 46;
  const bx = b.x + b.w - 8 - w;
  return (
    <g>
      <rect x={bx} y={b.y + 7} width={w} height="13" rx="3" fill="#0f172a" opacity="0.72" />
      <text x={bx + w / 2} y={b.y + 17} fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">
        {text}
      </text>
    </g>
  );
}

function verticalLabel(e: LogicEdge): boolean {
  // 水平主干边的标签居中；垂直边标签 start
  const fa = (typeof e.from === 'string' ? undefined : e.from.anchor) ?? 'bottom';
  return fa === 'left' || fa === 'right';
}
