import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// mermaid 全项目唯一初始化入口（startOnLoad:false，禁止自动扫描 .mermaid 节点）。
// securityLevel 用 loose 以支持节点文本中的 <br/> 换行；本组件仅接收内部固定源码常量，
// 不接收用户任意输入，故无脚本注入风险。
mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' });

// 每次 render 使用唯一 id，避免 mermaid.render 复用同一临时节点产生冲突
let renderSeq = 0;

export interface MermaidViewProps {
  /** mermaid 流程图源码 */
  code: string;
  /** 配色主题：base=浅色 / dark=深色（随 isDarkMode 传入） */
  theme?: 'base' | 'dark';
  className?: string;
}

/**
 * Mermaid 渲染组件：接收 mermaid 源码字符串，渲染为 SVG 注入页面；
 * 渲染失败时回退显示原始源码，不抛运行时错误。
 */
export function MermaidView({ code, theme = 'base', className }: MermaidViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    // 主题变化时重新初始化（initialize 可重复调用，仅更新全局配置）
    mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme });
    const id = `mmd-${Date.now().toString(36)}-${renderSeq++}`;
    mermaid
      .render(id, code)
      .then(({ svg: rendered, bindFunctions }) => {
        if (cancelled) return;
        setSvg(rendered);
        setError(null);
        // bindFunctions 需在 SVG 挂载到 DOM 后再调用（绑定交互事件）
        requestAnimationFrame(() => {
          if (!cancelled && containerRef.current && bindFunctions) {
            bindFunctions(containerRef.current);
          }
        });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setSvg(null);
        setError(err instanceof Error ? err.message : String(err));
      });
    return () => {
      cancelled = true;
    };
  }, [code, theme]);

  if (error) {
    return (
      <div className={`rounded-md border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 p-3 ${className ?? ''}`}>
        <p className="text-xs font-semibold text-rose-700 dark:text-rose-300 mb-2">流程图渲染失败，已回退显示原始源码：</p>
        <pre className="text-[11px] leading-relaxed whitespace-pre-wrap text-slate-600 dark:text-slate-300 font-mono">{code}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-auto [&_svg]:max-w-full [&_svg]:h-auto ${className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: svg ?? '' }}
    />
  );
}
