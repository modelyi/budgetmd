import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { pptSlides } from '../data/pages/pptSlides';
import type { ContentSource } from '../data/content/contentSource';
import { setActiveContentSource } from '../data/content/contentSource';
import { contentEditorStore, makeKey } from '../data/content/contentEditor';
import type { MdField } from '../data/logic/logicMarkdown';

/**
 * T9 TO 方案总结 PPT —— 全屏 slide 风格，方向键 / 箭头翻页。
 * 当前幻灯片的标题与要点可经导航栏 Markdown 编辑（进覆盖层）。
 */

const NS = 'page:ppt';
const slideId = (i: number) => `slide:${i}`;
const kTitle = (i: number) => makeKey(NS, slideId(i), 'title');
const kBullet = (i: number, bi: number) => makeKey(NS, slideId(i), `bullet:${bi}`);

export function PptView() {
  const [idx, setIdx] = useState(0);
  const slide = pptSlides[idx];
  const ov = contentEditorStore.getMap();
  // 订阅覆盖变化以重渲染
  const [, force] = useState(0);
  useEffect(() => contentEditorStore.subscribe(() => force((n) => n + 1)), []);

  // 当前幻灯片内容源
  const source = useMemo<ContentSource>(() => ({
    id: `${NS}:${idx}`,
    title: `PPT · ${slide.title}`,
    collect: () => {
      const m = contentEditorStore.getMap();
      const out: MdField[] = [
        { key: kTitle(idx), kind: 'title', original: slide.title, value: m[kTitle(idx)]?.value ?? slide.title },
      ];
      (slide.bullets ?? []).forEach((b, bi) =>
        out.push({ key: kBullet(idx, bi), kind: 'line', original: b, value: m[kBullet(idx, bi)]?.value ?? b }));
      return out;
    },
    apply: (parsed) => {
      const entries: Array<[string, string]> = [
        [kTitle(idx), slide.title],
        ...(slide.bullets ?? []).map((b, bi) => [kBullet(idx, bi), b] as [string, string]),
      ];
      entries.forEach(([k, orig]) => {
        const next = parsed[k];
        if (next === undefined) return;
        contentEditorStore.setText(k, next, orig);
      });
    },
    reset: () => {
      const prefix = `${NS}::${slideId(idx)}::`;
      Object.keys(contentEditorStore.getMap())
        .filter((k) => k.startsWith(prefix))
        .forEach((k) => contentEditorStore.reset(k));
    },
    count: () => {
      const prefix = `${NS}::${slideId(idx)}::`;
      return Object.keys(contentEditorStore.getMap()).filter((k) => k.startsWith(prefix)).length;
    },
  }), [idx, slide]);

  useEffect(() => {
    setActiveContentSource(source);
    return () => setActiveContentSource(undefined);
  }, [source]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') setIdx((i) => Math.min(i + 1, pptSlides.length - 1));
      if (e.key === 'ArrowLeft') setIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const title = ov[kTitle(idx)]?.value ?? slide.title;

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 p-6 overflow-hidden">
      <div
        className="relative w-full max-w-5xl aspect-video rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center px-16"
        style={{ background: `linear-gradient(135deg, ${slide.accent ?? '#1e3a5f'} 0%, #0f172a 100%)` }}
      >
        <div className="text-white w-full">
          <div className="text-sm opacity-60 mb-3">{idx + 1} / {pptSlides.length}</div>
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          {slide.diagram === 'arch' ? (
            <ArchDiagram />
          ) : slide.diagram === 'tableflow' ? (
            <TableflowDiagram />
          ) : (
            <ul className="space-y-3">
              {(slide.bullets ?? []).map((b, i) => (
                <li key={i} className="text-base opacity-90 leading-relaxed flex gap-2">
                  <span className="text-blue-300">▸</span>
                  <span>{ov[kBullet(idx, i)]?.value ?? b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5">
          {pptSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${i === idx ? 'w-8 bg-white' : 'w-3 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <button onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0}
          className="p-2 rounded-full bg-white dark:bg-slate-800 shadow disabled:opacity-30 cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        <span className="text-xs text-slate-500">← → 方向键翻页</span>
        <button onClick={() => setIdx((i) => Math.min(pptSlides.length - 1, i + 1))} disabled={idx === pptSlides.length - 1}
          className="p-2 rounded-full bg-white dark:bg-slate-800 shadow disabled:opacity-30 cursor-pointer">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

/** 五层架构示意（固定图形） */
function ArchDiagram() {
  return (
    <svg viewBox="0 0 960 460" className="w-full">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="white" />
        </marker>
      </defs>
      <rect x="280" y="10" width="400" height="50" rx="8" fill="#1d4ed8" />
      <text x="480" y="40" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">预算输出：预算三表（PL / BS / CF）</text>

      <rect x="200" y="100" width="560" height="50" rx="8" fill="#7c3aed" />
      <text x="480" y="130" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">财务预算：BF 投融资·税金  |  BJ.C 关联交易与合并抵销（BO.ELIM）</text>

      <g fontSize="12" fill="white">
        <rect x="20" y="200" width="170" height="70" rx="6" fill="#ea580c" />
        <text x="105" y="228" textAnchor="middle" fontWeight="bold">BB.1 销售与收入</text>
        <text x="105" y="248" textAnchor="middle" fontSize="10">签约→软硬件→技术服务</text>

        <rect x="200" y="200" width="150" height="70" rx="6" fill="#ea580c" />
        <text x="275" y="228" textAnchor="middle" fontWeight="bold">BB.2 生产制造</text>
        <text x="275" y="248" textAnchor="middle" fontSize="10">产量×标准成本</text>

        <rect x="360" y="200" width="180" height="70" rx="6" fill="#ea580c" />
        <text x="450" y="228" textAnchor="middle" fontWeight="bold">BB.3 采购与供应链</text>
        <text x="450" y="248" textAnchor="middle" fontSize="10">设备/基建/物料 + 进销存</text>

        <rect x="550" y="200" width="170" height="70" rx="6" fill="#ea580c" />
        <text x="635" y="228" textAnchor="middle" fontWeight="bold">BB.4 资本化支出</text>
        <text x="635" y="248" textAnchor="middle" fontSize="10">资产→折旧→处置</text>

        <rect x="730" y="200" width="170" height="70" rx="6" fill="#ea580c" />
        <text x="815" y="228" textAnchor="middle" fontWeight="bold">BB.5 期间费用</text>
        <text x="815" y="248" textAnchor="middle" fontSize="10">雇员费用+经营费用</text>
      </g>

      <rect x="200" y="310" width="560" height="45" rx="8" fill="#059669" />
      <text x="480" y="338" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">编制假设：BAA 标准成本·费率·加成比例·拆分比例  |  BAP 资源计划</text>

      <rect x="200" y="395" width="560" height="45" rx="8" fill="#475569" />
      <text x="480" y="423" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">基础数据：AA 法人·组织·项目·产品  |  AB 字典  |  AM 主数据</text>

      <g stroke="white" strokeWidth="2" fill="white" opacity="0.7">
        <line x1="480" y1="395" x2="480" y2="360" markerEnd="url(#arrow)" />
        <line x1="480" y1="310" x2="480" y2="275" markerEnd="url(#arrow)" />
        <line x1="480" y1="200" x2="480" y2="155" markerEnd="url(#arrow)" />
        <line x1="480" y1="100" x2="480" y2="65" markerEnd="url(#arrow)" />
      </g>

      <g fontSize="11" fill="#fbbf24">
        <text x="30" y="125">▸ 双视角：业务填报 ↔ 财务落账</text>
        <text x="30" y="145">▸ 法人：管理单元指认 + 比例拆分</text>
        <text x="30" y="165">▸ 关联交易：单体独立 / 合并抵销</text>
      </g>
    </svg>
  );
}

/** 表间流程示意（固定图形） */
function TableflowDiagram() {
  return (
    <svg viewBox="0 0 960 460" className="w-full">
      <defs>
        <marker id="arrow2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="white" />
        </marker>
      </defs>
      <rect x="20" y="20" width="160" height="50" rx="6" fill="#059669" />
      <text x="100" y="50" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">BB.1.2 销售预测</text>

      <rect x="220" y="20" width="160" height="50" rx="6" fill="#ea580c" />
      <text x="300" y="50" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">BB.2.1 生产排产</text>

      <rect x="220" y="110" width="160" height="50" rx="6" fill="#ea580c" />
      <text x="300" y="140" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">BB.2.3 完工成本</text>

      <rect x="420" y="110" width="160" height="50" rx="6" fill="#ea580c" />
      <text x="500" y="140" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">BB.3.3 物料采购</text>

      <rect x="620" y="110" width="160" height="50" rx="6" fill="#ea580c" />
      <text x="700" y="140" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">BB.3.X 进销存预算</text>

      <rect x="420" y="200" width="160" height="50" rx="6" fill="#ea580c" />
      <text x="500" y="230" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">BB.4 资本化支出</text>

      <rect x="620" y="200" width="160" height="50" rx="6" fill="#ea580c" />
      <text x="700" y="230" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">BB.4.5 折旧</text>

      <rect x="420" y="290" width="160" height="50" rx="6" fill="#ea580c" />
      <text x="500" y="320" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">BB.5 期间费用</text>

      <rect x="220" y="200" width="160" height="50" rx="6" fill="#7c3aed" />
      <text x="300" y="230" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">BJ.C 关联交易</text>

      <rect x="220" y="290" width="160" height="50" rx="6" fill="#7c3aed" />
      <text x="300" y="320" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">BO.ELIM 集团合并抵销底稿</text>

      <rect x="780" y="180" width="160" height="120" rx="8" fill="#1d4ed8" />
      <text x="860" y="225" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">预算三表</text>
      <text x="860" y="250" textAnchor="middle" fill="white" fontSize="11">PL 利润表</text>
      <text x="860" y="270" textAnchor="middle" fill="white" fontSize="11">BS 资产负债表</text>
      <text x="860" y="290" textAnchor="middle" fill="white" fontSize="11">CF 现金流量表</text>

      <g stroke="white" strokeWidth="1.5" fill="white" opacity="0.8" markerEnd="url(#arrow2)">
        <line x1="180" y1="45" x2="220" y2="45" />
        <line x1="300" y1="70" x2="300" y2="110" />
        <line x1="380" y1="135" x2="420" y2="135" />
        <line x1="580" y1="135" x2="620" y2="135" />
        <line x1="500" y1="160" x2="500" y2="200" />
        <line x1="580" y1="225" x2="620" y2="225" />
        <line x1="500" y1="250" x2="500" y2="290" />
        <line x1="380" y1="225" x2="420" y2="225" />
        <line x1="300" y1="250" x2="300" y2="290" />
        <line x1="380" y1="315" x2="780" y2="260" />
        <line x1="780" y1="135" x2="830" y2="180" />
        <line x1="780" y1="225" x2="780" y2="240" />
        <line x1="580" y1="315" x2="780" y2="270" />
      </g>
    </svg>
  );
}
