import { useState, useEffect } from 'react';
import { SpecialSolutionsView } from './components/SpecialSolutionsView';
import { FormDocsView } from './components/FormDocsView';
import { formDocsA1 } from './data/pages/formDocsMarkdownA1';
import { formDocsMulti } from './data/pages/formDocsMarkdownMulti';
import { formDocsMaster } from './data/pages/formDocsMarkdownMaster';
import { PptView } from './components/PptView';
import { FlowView } from './components/FlowView';
import { LogicView } from './components/LogicView';
import { Moon, Sun } from 'lucide-react';

const TABS = [
  { key: 'overview', label: 'T1 总览', groups: ['A1'] },
  { key: 'budget-proto', label: 'T3A 编制套表原型', groups: ['BA', 'BB', 'BF', 'BO'], mode: 'prototype' as const },
  { key: 'budget-multi', label: 'T3B 多主体编制套表', groups: ['BA', 'BB', 'BF', 'BO'], mode: 'multi' as const },
  { key: 'master', label: 'T4 基础静态数据', groups: ['AA', 'AB', 'AM'] },
  { key: 'solution', label: 'T5 专项方案说明', groups: [] },
  { key: 'flow', label: 'T6 整体编制流程图', groups: [] },
  { key: 'logic', label: 'T7 逻辑关系说明', groups: [] },
  { key: 'ppt', label: 'T9 TO 方案总结PPT', groups: [] },
] as const;

export type TabKey = (typeof TABS)[number]['key'];

/** 会话级记住当前页签：整页刷新后仍停在原页签 */
const ACTIVE_TAB_STORAGE_KEY = 'budgetdemo:activeTab:v1';

function readStoredTab(): TabKey {
  try {
    const raw = sessionStorage.getItem(ACTIVE_TAB_STORAGE_KEY);
    if (raw && TABS.some((t) => t.key === raw)) return raw as TabKey;
  } catch {
    /* 忽略 */
  }
  return 'logic';
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [activeTab, setActiveTab] = useState<TabKey>(() => readStoredTab());

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    try {
      sessionStorage.setItem(ACTIVE_TAB_STORAGE_KEY, activeTab);
    } catch {
      /* 忽略 */
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs font-sans transition-colors">
      <nav className="h-9 shrink-0 flex items-center gap-0 px-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40 transition-colors" aria-label="顶部导航">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
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
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
          title={isDarkMode ? '切换浅色模式' : '切换深色模式'}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </nav>
      <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden">
        {activeTab === 'flow' ? (<FlowView />) : activeTab === 'logic' ? (<LogicView />) : activeTab === 'ppt' ? (<PptView />) : activeTab === 'solution' ? (
          <SpecialSolutionsView />
        ) : activeTab === 'overview' ? (
          // T1 总览：Markdown 文档阅览（docs/formdocs-a1/*.md 4 篇），独立实例 key=docs-a1
          <FormDocsView
            key="docs-a1"
            docSet={formDocsA1}
            storageKey="budgetdemo:a1-doc:v1"
            sourceDir="docs/formdocs-a1"
          />
        ) : activeTab === 'budget-proto' ? (
          <FormDocsView key="docs-t3a" /> // 三套表单文档页各用独立 key（docs-t3a/docs-t3b/docs-t4）隔离实例：防止切换页签时 React 复用同一实例、把阅读位置跨页签携带（P1 修复）
        ) : activeTab === 'budget-multi' ? (
          <FormDocsView
            key="docs-t3b"
            docSet={formDocsMulti}
            storageKey="budgetdemo:t3b-doc:v1"
            sourceDir="docs/formdocs-multi"
          />
        ) : activeTab === 'master' ? (
          <FormDocsView
            key="docs-t4"
            docSet={formDocsMaster}
            storageKey="budgetdemo:t4-doc:v1"
            sourceDir="docs/formdocs-master"
          />
        ) : (
          <FlowView />
        )}
      </div>
    </div>
  );
}
