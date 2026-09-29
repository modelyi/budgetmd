import React, { useState, useMemo } from 'react';
import { Download, Search, CheckCircle2, FileSpreadsheet, Check, ShieldCheck, ChevronRight, UserCheck } from 'lucide-react';
import { BUDGET_RACI_ITEMS, RACI_DEPARTMENTS, DEPARTMENT_MATRIX_ROWS, BUDGET_PROCESS_STEPS, buildRaciDeptFilterOptions, ProcessStepCode, ProcessStepDef } from '../data/budgetRaciData';
import { exportBudgetRaciToExcel } from '../utils/exportBudgetRaciExcel';

// 任务与步骤 → 任务简述 索引（任务级口径：同一任务的各行重复同一简述）
const STEP_TASK_BRIEF: Record<string, string> = Object.fromEntries(
  BUDGET_PROCESS_STEPS.map((s) => [s.stepCode, s.taskBrief])
);

// 部门筛选选项 = 矩阵列（12 大权责主体）∪ 清单行级责任字段中出现过的实际部门（去重、矩阵列在前）
const DEPT_FILTER_OPTIONS = buildRaciDeptFilterOptions();

type ActiveViewTab = 'list' | 'process_guide' | 'matrix';

interface BudgetRaciViewProps {
  /** 点击表单编码跳转到对应表单页（由 ResearchSummaryView 注入） */
  onFormLinkClick?: (code: string) => void;
  /** 表编码 → 现行登记表单编码解析；返回 null 表示该编码无对应现行表单、不可跳转 */
  resolveFormCode?: (code: string) => string | null;
}

export const BudgetRaciView: React.FC<BudgetRaciViewProps> = ({ onFormLinkClick, resolveFormCode }) => {
  const [activeTab, setActiveTab] = useState<ActiveViewTab>('list');
  const [selectedStep, setSelectedStep] = useState<ProcessStepCode | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('ALL');
  const [exportSuccess, setExportSuccess] = useState(false);

  // 所有分类
  const categories = useMemo(() => {
    const set = new Set(BUDGET_RACI_ITEMS.map((item) => item.category));
    return ['ALL', ...Array.from(set)];
  }, []);

  // 当前选中的步骤对象（若选中）
  const currentStepDef: ProcessStepDef | undefined = useMemo(() => {
    if (selectedStep === 'ALL') return undefined;
    return BUDGET_PROCESS_STEPS.find((s) => s.stepCode === selectedStep);
  }, [selectedStep]);

  // 过滤后的 RACI 清单
  const filteredItems = useMemo(() => {
    return BUDGET_RACI_ITEMS.filter((item) => {
      // 任务与步骤筛选
      if (selectedStep !== 'ALL' && item.processStep !== selectedStep) {
        return false;
      }
      // 业务类别筛选
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }
      // 部门筛选（矩阵 12 大权责主体按组织族关键词命中；清单实际部门按部门文本命中）
      if (selectedDeptFilter !== 'ALL') {
        const deptOption = DEPT_FILTER_OPTIONS.find((opt) => opt.value === selectedDeptFilter);
        const deptText = `${item.responsibleDept} ${item.responsible} ${item.accountable} ${item.consulted} ${item.informed}`;
        const deptMatched = deptOption
          ? deptOption.keywords.some((keyword) => deptText.includes(keyword))
          : deptText.includes(selectedDeptFilter);
        if (!deptMatched) {
          return false;
        }
      }
      // 关键字搜索
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        // 搜索索引与表格实际展示列保持一致（已移除「核心交付成果」「落地执行与规则」列）
        const str = `${item.stepTitle} ${STEP_TASK_BRIEF[item.processStep] ?? ''} ${item.formCode} ${item.formName} ${item.responsiblePost} ${item.responsibleDept} ${item.responsible} ${item.accountable} ${item.consulted} ${item.informed}`.toLowerCase();
        return str.includes(q);
      }
      return true;
    });
  }, [selectedStep, searchQuery, selectedCategory, selectedDeptFilter]);

  // 处理导出
  const handleExport = () => {
    try {
      exportBudgetRaciToExcel();
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to export RACI excel', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* 顶部标题与导出栏 */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center p-1.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                <FileSpreadsheet className="w-4 h-4" />
              </span>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                全面预算编制责任 RACI 总览 (关联总体流程)
              </h2>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-medium">
                总体流程 10 步闭环 · 12 大权责主体 · 主责 R 穿透落实到岗位
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              严格遵循预算总体十步流向（1.1 维护/导入基础数据 → 1.2 预算启动 → 2.1 预算假设项维护 → 2.2 前置信息收集 → 3.1 业务编制 → 3.2 财务编制 → 3.3 税费填报 → 3.4 内部往来处理 → 3.5 手工填调整 → 3.6 出表与调整），明确谁主责执行 (R 落实到具体责任岗位)、谁终审决策 (A)、谁专业协同 (C)、谁知情报送 (I)，支持一键导出完整工作簿。
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExport}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              title="导出包含总体流程清单、落地规范、交叉矩阵、RACI角色定义4张Sheet的Excel文件"
            >
              {exportSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white animate-bounce" />
                  <span>已导出 Excel 表</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>导出 Excel 表 (RACI与总体流程)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 导出成功提示 */}
        {exportSuccess && (
          <div className="mt-2.5 px-3 py-1.5 rounded bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                <strong>导出成功！</strong> 已下载《全面预算编制责任RACI与总体流程总览_设备制造行业.xlsx》，包含10步总体流程表单责任清单、执行规范、权责矩阵与RACI角色定义。
              </span>
            </div>
            <button
              onClick={() => setExportSuccess(false)}
              className="text-emerald-600 hover:text-emerald-800 text-xs ml-2 cursor-pointer font-medium"
            >
              关闭
            </button>
          </div>
        )}

        {/* RACI 图例 */}
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="rounded border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">R</span>
              <span>主责执行 (Responsible) · 经办/填报人</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
              负责该事项的数据测算、底稿收集与表格实际录入填报，权责严格锁定至具体执行岗位。
            </p>
          </div>

          <div className="rounded border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-2">
            <div className="flex items-center gap-1.5 font-bold text-blue-800 dark:text-blue-300">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">A</span>
              <span>终审把关 (Accountable) · 实际责任人/审批人</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
              对该模块预算结果合理性负最终签批责任（严格单一责任主体）。
            </p>
          </div>

          <div className="rounded border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">C</span>
              <span>协助咨询 (Consulted)</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
              编制过程中提供标准定额、基准参数、价格/费率审核或前置输入。
            </p>
          </div>

          <div className="rounded border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 p-2">
            <div className="flex items-center gap-1.5 font-bold text-purple-800 dark:text-purple-300">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">I</span>
              <span>知情报送 (Informed)</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
              预算审定下达后作为工作依据必须知情掌握的相关单位及审计部门。
            </p>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 核心业务：总体流程 10 步落地交互栏 (清晰且落地，不要炫) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              总体预算业务流程导航 (点击步骤筛选落地表单及权责)：
            </span>
            <span className="text-[11px] text-slate-400">
              三阶段十步骤 · 环环相扣
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedStep('ALL')}
            className={`text-xs px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
              selectedStep === 'ALL'
                ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
            }`}
          >
            全部流程 ({BUDGET_RACI_ITEMS.length}项)
          </button>
        </div>

        {/* 10 步骤按钮条（按3个阶段清晰排布） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* 阶段一：准备与启动 (1.1, 1.2) */}
          <div className="rounded border border-blue-200/70 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/10 p-2">
            <div className="text-[11px] font-bold text-blue-800 dark:text-blue-300 mb-1.5 flex items-center justify-between">
              <span>阶段一：准备与启动</span>
              <span className="text-[10px] text-blue-500 font-normal">底座初始化</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {BUDGET_PROCESS_STEPS.filter((s) => s.stageNum === 1).map((step) => {
                const isActive = selectedStep === step.stepCode;
                return (
                  <button
                    key={step.stepCode}
                    type="button"
                    onClick={() => setSelectedStep(isActive ? 'ALL' : step.stepCode)}
                    className={`px-2 py-1.5 rounded text-left text-xs transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-700 shadow-xs font-bold'
                        : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-mono text-[10px] opacity-80">{step.stepNum}</div>
                    <div className="truncate font-medium">{step.stepName}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 阶段二：前提与假设 (2.1, 2.2) */}
          <div className="rounded border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-950/10 p-2">
            <div className="text-[11px] font-bold text-amber-800 dark:text-amber-300 mb-1.5 flex items-center justify-between">
              <span>阶段二：前提与假设</span>
              <span className="text-[10px] text-amber-500 font-normal">定额与前置</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {BUDGET_PROCESS_STEPS.filter((s) => s.stageNum === 2).map((step) => {
                const isActive = selectedStep === step.stepCode;
                return (
                  <button
                    key={step.stepCode}
                    type="button"
                    onClick={() => setSelectedStep(isActive ? 'ALL' : step.stepCode)}
                    className={`px-2 py-1.5 rounded text-left text-xs transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-amber-600 text-white border-amber-700 shadow-xs font-bold'
                        : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                    }`}
                  >
                    <div className="font-mono text-[10px] opacity-80">{step.stepNum}</div>
                    <div className="truncate font-medium">{step.stepName}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 阶段三：编审与出表 (3.1 ~ 3.6) */}
          <div className="rounded border border-emerald-200/70 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/10 p-2">
            <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-1.5 flex items-center justify-between">
              <span>阶段三：编审与出表</span>
              <span className="text-[10px] text-emerald-600 font-normal">业务与出表</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {BUDGET_PROCESS_STEPS.filter((s) => s.stageNum === 3).map((step) => {
                const isActive = selectedStep === step.stepCode;
                return (
                  <button
                    key={step.stepCode}
                    type="button"
                    onClick={() => setSelectedStep(isActive ? 'ALL' : step.stepCode)}
                    className={`px-1.5 py-1.5 rounded text-left text-xs transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs font-bold'
                        : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    <div className="font-mono text-[10px] opacity-80">{step.stepNum}</div>
                    <div className="truncate font-medium">{step.stepName}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 选中具体步骤后的落地信息执行指引卡 */}
        {currentStepDef && (
          <div className="mt-3 p-3 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-blue-600 text-white text-xs">
                  {currentStepDef.stepNum}
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {currentStepDef.stepName}
                </span>
                <span className="text-[11px] text-slate-500">
                  ({currentStepDef.stageName})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStep('ALL')}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                清除步骤筛选 (查看全部)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <span className="text-slate-400 block text-[11px]">主责执行 (Responsible) · 经办/填报人:</span>
                <div className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {currentStepDef.leadPost}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {currentStepDef.leadDept}
                </div>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">终审把关 (Accountable) · 实际责任人/审批人:</span>
                <span className="font-semibold text-blue-700 dark:text-blue-400">
                  {currentStepDef.approver}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">协助咨询 (C):</span>
                <span className="text-slate-700 dark:text-slate-300">
                  {currentStepDef.consulted}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">知情报送 (I):</span>
                <span className="text-slate-700 dark:text-slate-300">
                  {currentStepDef.informed}
                </span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">前置输入源：</span>
                <span className="text-slate-600 dark:text-slate-400">{currentStepDef.inputs}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">核心产出交付物：</span>
                <span className="text-slate-600 dark:text-slate-400">{currentStepDef.outputs}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">落地执行红线：</span>
                <span className="text-slate-600 dark:text-slate-400">{currentStepDef.executionRules}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 视图切换按钮 */}
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
              activeTab === 'list'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            ① 表单逐项责任清单 (当前显示 {filteredItems.length} 项)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('process_guide')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
              activeTab === 'process_guide'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            ② 总体流程十步落地全景 (1.1 ~ 3.6 规则与交付)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            ③ 部门 × 任务与步骤 权责矩阵 (12部门 × 10步骤)
          </button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 视图 1: 表单逐项责任清单 (绑定 1.1 ~ 3.6 任务与步骤) */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'list' && (
        <div className="space-y-3">
          {/* 筛选与搜索工具条 */}
          <div className="flex flex-wrap items-center gap-2 text-xs bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-md border border-slate-200 dark:border-slate-700">
            {/* 搜索框 */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索任务与步骤、任务简述、表单编码、表名、主责岗位、部门..."
                className="w-full pl-8 pr-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>

            {/* 任务与步骤下拉 */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 shrink-0">任务与步骤:</span>
              <select
                value={selectedStep}
                onChange={(e) => setSelectedStep(e.target.value as any)}
                className="px-2 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="ALL">全部步骤 (1.1 ~ 3.6)</option>
                {BUDGET_PROCESS_STEPS.map((s) => (
                  <option key={s.stepCode} value={s.stepCode}>
                    {s.stepNum} {s.stepName}
                  </option>
                ))}
              </select>
            </div>

            {/* 业务分类筛选 */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 shrink-0">业务域:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="ALL">全部业务域 ({BUDGET_RACI_ITEMS.length})</option>
                {categories
                  .filter((c) => c !== 'ALL')
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            {/* 责任部门筛选 */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 shrink-0">涉及部门:</span>
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="px-2 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="ALL">全部责任部门</option>
                <optgroup label="矩阵 12 大权责主体">
                  {DEPT_FILTER_OPTIONS.filter((opt) => opt.source === 'matrix').map((opt) => (
                    <option key={`matrix-${opt.value}`} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="清单实际责任部门/单位">
                  {DEPT_FILTER_OPTIONS.filter((opt) => opt.source === 'list').map((opt) => (
                    <option key={`list-${opt.value}`} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {(searchQuery || selectedCategory !== 'ALL' || selectedDeptFilter !== 'ALL' || selectedStep !== 'ALL') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                  setSelectedDeptFilter('ALL');
                  setSelectedStep('ALL');
                }}
                className="text-xs text-blue-600 hover:text-blue-800 underline ml-auto cursor-pointer"
              >
                重置所有条件
              </button>
            )}
          </div>

          {/* 跳转提示 */}
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            「表编码」为蓝色虚线下划线时可直接点击，跳转到该事项对应的编制表页面（子表编码按上级表单跳转；灰色编码为无对应编制表的事项，如 APPROVAL，暂不可跳转）。
          </p>

          {/* 表单表格 */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700 shadow-xs">
                  <tr>
                    <th className="py-2.5 px-3 w-12 text-center">序号</th>
                    <th className="py-2.5 px-3 w-36">任务与步骤</th>
                    <th className="py-2.5 px-3 min-w-[240px] text-left">任务简述</th>
                    <th className="py-2.5 px-3 w-24">编码</th>
                    <th className="py-2.5 px-3 min-w-[160px]">表单与事项名称</th>
                    <th className="py-2.5 px-3 min-w-[140px]">
                      <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">R</span>
                        主责部门
                      </span>
                    </th>
                    <th className="py-2.5 px-3 min-w-[130px]">
                      <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                        主责岗位
                      </span>
                    </th>
                    <th className="py-2.5 px-3 min-w-[150px]">
                      <span className="inline-flex items-center gap-1 text-blue-700 dark:text-blue-400 font-bold">
                        <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">A</span>
                        终审把关责任人
                      </span>
                    </th>
                    <th className="py-2.5 px-3 min-w-[160px]">
                      <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-bold">
                        <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">C</span>
                        协助咨询部门
                      </span>
                    </th>
                    <th className="py-2.5 px-3 min-w-[150px]">
                      <span className="inline-flex items-center gap-1 text-purple-700 dark:text-purple-400 font-bold">
                        <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">I</span>
                        知情报送对象
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-400 text-xs">
                        未找到符合条件的预算编制责任项
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => {
                      // 阶段颜色标识
                      const isStage1 = item.processStep.startsWith('1.');
                      const isStage2 = item.processStep.startsWith('2.');
                      return (
                        <tr
                          key={`${item.formCode}-${item.seq}`}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="py-2.5 px-3 text-center text-slate-400 font-mono">
                            {item.seq}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span
                              onClick={() => setSelectedStep(item.processStep)}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium cursor-pointer transition-colors ${
                                isStage1
                                  ? 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 hover:bg-blue-100'
                                  : isStage2
                                  ? 'bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
                                  : 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100'
                              }`}
                              title="点击筛选该步骤"
                            >
                              <span className="font-mono font-bold">{item.processStep}</span>
                              <span>{item.stepTitle.replace(/^[0-9.]+\s*/, '')}</span>
                            </span>
                          </td>
                          <td className="py-2.5 px-3 align-top text-left text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed whitespace-normal break-words">
                            {STEP_TASK_BRIEF[item.processStep]}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-semibold whitespace-nowrap">
                            {resolveFormCode?.(item.formCode) && onFormLinkClick ? (
                              <button
                                type="button"
                                onClick={() => onFormLinkClick(resolveFormCode(item.formCode) as string)}
                                title={`跳转到 ${resolveFormCode(item.formCode)} ${item.formName}`}
                                className="text-blue-600 dark:text-blue-400 underline decoration-dotted underline-offset-2 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer"
                              >
                                {item.formCode}
                              </button>
                            ) : (
                              <span className="text-slate-400 dark:text-slate-500" title="该编码无对应现行表单登记，暂不可跳转">
                                {item.formCode}
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="font-medium text-slate-900 dark:text-slate-100">
                              {item.formName}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {item.category}
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                              {item.responsibleDept}
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/80 text-emerald-900 dark:text-emerald-200 font-bold text-[11px]">
                              <UserCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              {item.responsiblePost}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-800 dark:text-blue-300 font-medium text-[11px]">
                              {item.accountable}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                            {item.consulted}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                            {item.informed}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 视图 2: 总体流程十步落地全景 (1.1 ~ 3.6 规则与交付) */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'process_guide' && (
        <div className="space-y-4">
          <div className="rounded-md bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-3 text-xs text-blue-900 dark:text-blue-200 leading-relaxed flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>总体流程落地规范：</strong>
                全面预算编审严密遵循 10 步作业次序，从前置主数据冻结与假设发布，到各业务条线编制、财务统筹计算与出表。点击右侧可在表单清单中查看对应表单。
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {BUDGET_PROCESS_STEPS.map((step) => {
              const isStage1 = step.stageNum === 1;
              const isStage2 = step.stageNum === 2;

              return (
                <div
                  key={step.stepCode}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex items-center justify-center px-2.5 py-1 rounded font-mono font-bold text-xs text-white ${
                          isStage1 ? 'bg-blue-600' : isStage2 ? 'bg-amber-600' : 'bg-emerald-600'
                        }`}
                      >
                        {step.stepNum}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {step.stepName}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                        {step.stageName}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedStep(step.stepCode);
                        setActiveTab('list');
                      }}
                      className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 font-medium cursor-pointer"
                    >
                      <span>查看该步骤涉及的表单责任</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded border border-slate-100 dark:border-slate-800">
                    <strong>核心定位与目标：</strong> {step.summary}
                  </p>

                  {/* 4 维 RACI 权责 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 text-xs">
                    <div className="p-2.5 rounded border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/10">
                      <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-0.5">
                        主责执行 (Responsible) · 经办/填报人
                      </div>
                      <div className="text-emerald-900 dark:text-emerald-200 font-bold text-xs">
                        {step.leadPost}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                        {step.leadDept}
                      </div>
                    </div>

                    <div className="p-2 rounded border border-blue-100 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-950/10">
                      <div className="text-[11px] font-bold text-blue-800 dark:text-blue-300 mb-0.5">
                        终审把关 (Accountable) · 实际责任人/审批人
                      </div>
                      <div className="text-slate-800 dark:text-slate-200 font-medium">
                        {step.approver}
                      </div>
                    </div>

                    <div className="p-2 rounded border border-amber-100 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/10">
                      <div className="text-[11px] font-bold text-amber-800 dark:text-amber-300 mb-0.5">
                        协助咨询部门 (C)
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 text-[11px]">
                        {step.consulted}
                      </div>
                    </div>

                    <div className="p-2 rounded border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-purple-950/10">
                      <div className="text-[11px] font-bold text-purple-800 dark:text-purple-300 mb-0.5">
                        知情报送对象 (I)
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 text-[11px]">
                        {step.informed}
                      </div>
                    </div>
                  </div>

                  {/* 输入输出与规则 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">前置输入源：</span>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed text-[11px]">
                        {step.inputs}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">核心产出交付物：</span>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed text-[11px]">
                        {step.outputs}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">落地执行红线：</span>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed text-[11px]">
                        {step.executionRules}
                      </p>
                    </div>
                  </div>

                  {/* 关联主要表单：已登记表单可点击跳转 */}
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-slate-400">覆盖表单/事项：</span>
                    {step.formCodes.map((code) =>
                      resolveFormCode?.(code) && onFormLinkClick ? (
                        <button
                          key={code}
                          type="button"
                          onClick={() => onFormLinkClick(resolveFormCode(code) as string)}
                          title={`跳转到 ${resolveFormCode(code)}`}
                          className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono font-medium border border-blue-200 dark:border-blue-800/80 hover:bg-blue-100 dark:hover:bg-blue-900/60 cursor-pointer"
                        >
                          {code}
                        </button>
                      ) : (
                        <span
                          key={code}
                          className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-medium border border-slate-200 dark:border-slate-700"
                        >
                          {code}
                        </span>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 视图 3: 部门 × 任务与步骤 交叉矩阵 (12部门 × 10步骤) */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'matrix' && (
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-3 w-44 font-bold sticky left-0 bg-slate-100 dark:bg-slate-800 z-10 border-r border-slate-200 dark:border-slate-700">
                      任务与步骤 (1.1 ~ 3.6)
                    </th>
                    <th className="py-3 px-2 w-32 font-mono text-[11px] text-slate-500 border-r border-slate-200 dark:border-slate-700">
                      表单编码范围
                    </th>
                    {RACI_DEPARTMENTS.map((dept) => (
                      <th
                        key={dept.id}
                        className="py-2 px-2 text-center min-w-[76px] border-r border-slate-200 dark:border-slate-700 last:border-r-0"
                      >
                        <div className="font-bold text-slate-800 dark:text-slate-200">{dept.shortName}</div>
                        <div className="text-[10px] text-slate-400 font-normal scale-90 origin-center whitespace-nowrap">
                          {dept.deptType === 'business'
                            ? '业务'
                            : dept.deptType === 'finance'
                            ? '财务'
                            : dept.deptType === 'governance'
                            ? '决策'
                            : '职能'}
                        </div>
                      </th>
                    ))}
                    <th className="py-3 px-3 min-w-[220px] font-semibold">跨部门协同要点与执行机制</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {DEPARTMENT_MATRIX_ROWS.map((row) => (
                    <tr
                      key={row.domainId}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100 sticky left-0 bg-white dark:bg-slate-900 z-10 border-r border-slate-200 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedStep(row.stepCode);
                            setActiveTab('list');
                          }}
                          className="text-left hover:text-blue-600 font-medium cursor-pointer"
                          title="点击查看此步骤表单清单"
                        >
                          {row.domainName}
                        </button>
                      </td>
                      <td className="py-3 px-2 font-mono text-[11px] text-slate-500 border-r border-slate-200 dark:border-slate-700">
                        {row.codeRange}
                      </td>
                      {RACI_DEPARTMENTS.map((dept) => {
                        const val = row.mapping[dept.id];
                        return (
                          <td
                            key={dept.id}
                            className="py-2 px-1 text-center border-r border-slate-100 dark:border-slate-800 last:border-r-0"
                          >
                            {val === 'R' ? (
                              <span
                                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-xs"
                                title={`${dept.name}: R 负责执行`}
                              >
                                R
                              </span>
                            ) : val === 'A' ? (
                              <span
                                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs shadow-xs"
                                title={`${dept.name}: A 终审把关`}
                              >
                                A
                              </span>
                            ) : val === 'C' ? (
                              <span
                                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-xs shadow-xs"
                                title={`${dept.name}: C 协助咨询`}
                              >
                                C
                              </span>
                            ) : val === 'I' ? (
                              <span
                                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white font-bold text-xs shadow-xs"
                                title={`${dept.name}: I 知情报送`}
                              >
                                I
                              </span>
                            ) : (
                              <span className="text-slate-300 dark:text-slate-600">-</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 矩阵说明 */}
          <div className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 p-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-800 dark:text-slate-200">单一终审人原则 (Single Accountable)：</span>
            10 个任务与步骤中，每一个步骤均明确唯一的终审责任人 (A)，避免决策责任推诿；主责部门 (R) 必须在规定时限内完成编制，协同部门 (C) 提供定额支持，最终汇总出表并报送全体知情方 (I)。
          </div>
        </div>
      )}
    </div>
  );
};
