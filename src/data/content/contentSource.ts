/**
 * 全系统「内容源」统一注册与编辑入口状态
 * =============================================================================
 * 每个页签/模块按当前正在看的粒度（T7=当前那张图、T3/T4=当前那张表、
 * 其余页=整页）提供一个 ContentSource，声明：
 *   collect  导出本内容全部可编辑文本（按阅读顺序，含当前人工值）；
 *   apply    把编辑结果写回对应覆盖层；
 *   reset    清除本内容全部人工改动；
 *   count    本内容已改条数。
 *
 * 各 View 把「当前内容源」登记到 active；App 导航栏的「Markdown 编辑」按钮
 * 与模态宿主据此工作，保证任何页都能一键改当前看到的文字。
 */
import { useSyncExternalStore } from 'react';
import type { MdField } from '../logic/logicMarkdown';

export interface ContentSource {
  id: string;
  title: string; // 模态标题（人话）
  collect: () => MdField[];
  apply: (parsed: Record<string, string>) => void;
  reset: () => void;
  count: () => number;
}

// ── 当前活动内容源 ──
let active: ContentSource | undefined;
const srcListeners = new Set<() => void>();
function emitSrc() {
  srcListeners.forEach((l) => l());
}
export function setActiveContentSource(s: ContentSource | undefined) {
  if (s === active) return;
  active = s;
  emitSrc();
}
export function useActiveContentSource(): ContentSource | undefined {
  return useSyncExternalStore(
    (l) => {
      srcListeners.add(l);
      return () => {
        srcListeners.delete(l);
      };
    },
    () => active,
    () => undefined,
  );
}

// ── Markdown 编辑模态开关（任意按钮都可调用 openContentEditor） ──
let isOpen = false;
const openListeners = new Set<() => void>();
function emitOpen() {
  openListeners.forEach((l) => l());
}
export function openContentEditor() {
  if (isOpen) return;
  isOpen = true;
  emitOpen();
}
export function closeContentEditor() {
  if (!isOpen) return;
  isOpen = false;
  emitOpen();
}
export function useContentEditorOpen(): boolean {
  return useSyncExternalStore(
    (l) => {
      openListeners.add(l);
      return () => {
        openListeners.delete(l);
      };
    },
    () => isOpen,
    () => false,
  );
}
