# UEADEMO - 预算编制系统演示与需求说明 SPA

> **单机全面预算管理演示与需求说明单页应用 (Single Page Application)**

---

## 📌 项目定位

本项目是一个**纯前端、可离线分发的预算编制系统演示与需求说明 SPA**，用于：
1. **系统功能讲解**：展示全面预算 7 阶段（S/A/B/BB/C/D/R）、32 个核心页面的全流程编制。
2. **数据关系讲解**：演示从业务源编制（B.1~B.5）、BB 结果汇总（BB.01~BB.10）到财务三表（资产负债表、利润表、现金流量表）的动态勾稽与自动抵销。
3. **实现要点与需求说明**：内嵌业务规则指引与需求规格说明书，直观展示 Luckysheet 电子表格引擎的适配方案。
4. **轻量纯粹**：无需后端数据库，无 AI 功能堆砌，开箱即用。

---

## 🛠️ 技术栈与特性

- **前端架构**：React 19 + TypeScript + Ant Design 6 + Tailwind CSS
- **表格引擎**：Luckysheet 电子表格（核心编制表硬约束）
- **本地存储**：Dexie (IndexedDB) 纯前端本地持久化
- **多维分析**：DuckDB-WASM 浏览器内存端毫秒级透视
- **交付形态**：
  - 开发/演示服务：`npm run dev`（访问 `http://127.0.0.1:3000`）
  - 单文件离线包：`npm run build:spa`（生成独立 `dist-spa/spa.html`，可直接双击运行）

---

## 🚀 快速启动

### 1. 本地开发与演示模式
```bash
npm install
npm run dev
# 浏览器访问 http://127.0.0.1:3000
```

### 2. 编译输出单文件离线 SPA (`spa.html`)
```bash
npm run build:spa
# 产物路径：dist-spa/spa.html （可离线分发并直接双击打开）
```

### 3. 测试与静态检查
```bash
npx tsx src/config/compilationNavigation.test.ts  # 导航 manifest 单测
npx tsx src/utils/compilationResultSummary.test.ts # 结果契约与聚合单测
```

### 4. Headless browser smoke verification
```bash
bunx playwright install chromium # first machine setup
bun run dev -- --host 127.0.0.1 --port 3000 # terminal 1
bun run qa:headless                    # terminal 2
```

The verifier checks the SPA entry in headless Chromium, including HTTP status, rendered `#root`, console errors, and uncaught page errors. Set `QA_URL` (or pass `--url`) for another dev/preview server. See [`docs/QA_HEADLESS.md`](docs/QA_HEADLESS.md) for Hermes/AQ-UAT integration guidance.
