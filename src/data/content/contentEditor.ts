/**
 * 全系统「人工内容覆盖层」
 * =============================================================================
 * 任何可编辑文本用全局唯一 key（建议 `namespace::id::field`，
 * namespace 如 overall / collection / page:convention）。
 *
 * 人工改动存 localStorage 覆盖层：
 * - 不污染源数据；覆盖优先，AI 改源不会覆盖你已确认的文字；
 * - 人工值改回与原文一致时自动清除该条覆盖。
 *
 * 逻辑图、各文档页统一走本覆盖层；表单（XML 文字）走 textOverrides。
 */
import { useSyncExternalStore } from 'react';

export interface ContentOverride {
  value: string;
  at: string;
  status: '已改' | '已确认';
}
export type ContentOverrideMap = Record<string, ContentOverride>;

const STORE_KEY = 'uea-content-overrides-v1';

/** 构造文本 key：field 可含 'line:0' 等 */
export function makeKey(namespace: string, id: string, field: string): string {
  return `${namespace}::${id}::${field}`;
}

function load(): ContentOverrideMap {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as ContentOverrideMap) : {};
  } catch {
    return {};
  }
}
function persist(next: ContentOverrideMap) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(next));
  } catch {
    /* 配额满等，忽略 */
  }
}

let map: ContentOverrideMap = typeof localStorage !== 'undefined' ? load() : {};
const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}
function subscribe(l: () => void): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
function nowIso(): string {
  return new Date().toISOString();
}

export const contentEditorStore = {
  getMap: (): ContentOverrideMap => map,
  subscribe,

  /** 写入人工值；与原始值相同则清除覆盖（恢复原文） */
  setText(key: string, value: string, original?: string) {
    if (original != null && value === original) {
      if (map[key]) {
        const next = { ...map };
        delete next[key];
        map = next;
        persist(map);
        emit();
      }
      return;
    }
    const prev = map[key];
    map = {
      ...map,
      [key]: { value, at: nowIso(), status: prev?.status === '已确认' ? '已确认' : '已改' },
    };
    persist(map);
    emit();
  },

  confirm(key: string) {
    if (map[key]) {
      map = { ...map, [key]: { ...map[key], status: '已确认' } };
      persist(map);
      emit();
    }
  },

  reset(key: string) {
    if (map[key]) {
      const next = { ...map };
      delete next[key];
      map = next;
      persist(map);
      emit();
    }
  },

  /** 清除某命名空间（如图 id / 页面 id）下全部人工值 */
  resetNamespace(ns: string) {
    const prefix = `${ns}::`;
    const next: ContentOverrideMap = {};
    let changed = false;
    Object.entries(map).forEach(([k, v]) => {
      if (k.startsWith(prefix)) changed = true;
      else next[k] = v;
    });
    if (changed) {
      map = next;
      persist(map);
      emit();
    }
  },
};

/** 取生效文本（覆盖优先） */
export function resolveText(key: string, original: string): string {
  return map[key]?.value ?? original;
}

const EMPTY: ContentOverrideMap = {};
export function useContentEditor(): ContentOverrideMap {
  return useSyncExternalStore(contentEditorStore.subscribe, contentEditorStore.getMap, () => EMPTY);
}

/** 统计某命名空间下人工修改条数 */
export function countNamespace(ov: ContentOverrideMap, ns: string): number {
  const prefix = `${ns}::`;
  return Object.keys(ov).filter((k) => k.startsWith(prefix)).length;
}
