/// <reference types="vite/client" />

// 由 vite.config.ts 的 define 注入：单文件离线构建 (VITE_SINGLEFILE=true) 时为 true
declare const __SINGLEFILE__: boolean;

declare module '*.wasm?url' {
  const src: string;
  export default src;
}
