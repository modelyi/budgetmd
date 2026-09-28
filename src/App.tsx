import React, { useState, useEffect } from 'react';
import { ResearchSummaryView } from './components/ResearchSummaryView';
import { ConventionsView } from './components/ConventionsView';
import { SpecialSolutionsView } from './components/SpecialSolutionsView';
import { PptView } from './components/PptView';
import { FlowView } from './components/FlowView';
import { LogicView } from './components/LogicView';
import { RaciView } from './components/RaciView';
import { MarkdownContentModal } from './components/content/MarkdownContentModal';
import { useActiveContentSource, openContentEditor } from './data/content/contentSource';
import { Moon, Sun, Pencil } from 'lucide-react';

const TABS = [
  { key: 'overview', label: 'T1 总览', groups: ['A1'] },
  { key: 'convention', label: 'T2 需求设计假设及原则', groups: [] },
  { key: 'budget', label: 'T3 预算编制套表', groups: ['BA', 'BB', 'BF', 'BO'] },
  { key: 'master', label: 'T4 基础静态数据', groups: ['AA', 'AB', 'AM'] },
  { key: 'solution', label: 'T5 专项方案说明', groups: [] },
  { key: 'flow', label: 'T6 整体编制流程图', groups: [] },
  { key: 'logic', label: 'T7 逻辑关系说明', groups: [] },
  { key: 'raci', label: 'T8 责任矩阵', groups: [] },
  { key: 'ppt', label: 'T9 TO 方案总结PPT', groups: [] },
] as const;

export type TabKey = (typeof TABS)[number]['key'];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [activeTab, setActiveTab] = useState<TabKey>('logic');
  const [targetFormCode, setTargetFormCode] = useState<string | null>('A1.1');
  const contentSource = useActiveContentSource();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const activeGroups = TABS.find((t) => t.key === activeTab)!.groups;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs font-sans transition-colors">
      <nav className="h-9 shrink-0 flex items-center gap-0 px-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40 transition-colors" aria-label="顶部导航">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              if (tab.key === 'budget') {
                setTargetFormCode('A1.1');
              }
            }}
            className={`h-full flex items-center px-3 text-xs font-medium transition-colors cursor-pointer ${
              activeTab === tab.key
                ? 'text-blue-700 dark:text-blue-400 border-b-2 border-blue-600 font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <div className="flex-1"></div>
        <div className="flex items-center gap-2 mr-2">
          <span className="hidden sm:inline-flex text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
            需求文档系统 · 轻验证松耦合 · 财务逻辑专业优先
          </span>
        </div>
        <button
          onClick={() => contentSource && openContentEditor()}
          disabled={!contentSource}
          className={`px-2 py-1 mr-1 inline-flex items-center gap-1 rounded text-[11px] font-medium border transition-colors ${
            contentSource
              ? 'border-blue-300 text-blue-700 hover:bg-blue-50 cursor-pointer'
              : 'border-slate-200 text-slate-300 cursor-not-allowed'
          }`}
          title={contentSource ? `Markdown 编辑：${contentSource.title}` : '当前内容暂不支持 Markdown 编辑'}
        >
          <Pencil size={12} />Markdown 编辑
        </button>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
          title={isDarkMode ? '切换浅色模式' : '切换深色模式'}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </nav>
      <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden">
        {activeTab === 'flow' ? (<FlowView />) : activeTab === 'logic' ? (<LogicView />) : activeTab === 'raci' ? (<RaciView />) : activeTab === 'ppt' ? (<PptView />) : activeTab === 'convention' ? (
          <ConventionsView />
        ) : activeTab === 'solution' ? (
          <SpecialSolutionsView />
        ) : (
          <ResearchSummaryView
            activeGroups={activeGroups as readonly string[]}
            targetFormCode={targetFormCode}
            onClearTargetFormCode={() => setTargetFormCode(null)}
            onRequestGroup={(menuGroup) => {
              const target = TABS.find((t) => (t.groups as readonly string[]).includes(menuGroup));
              if (target) setActiveTab(target.key);
            }}
          />
        )}
      </div>

      <MarkdownContentModal />
    </div>
  );
}
