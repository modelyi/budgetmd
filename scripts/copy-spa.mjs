// 单文件 SPA 导出后处理：把 dist-spa/index.html 复制为可下载/可直接打开的 spa.html
// 输出：
//   <repo>/spa.html                            —— 仓库根目录，Vite dev/preview 下可直接访问 /spa.html
//   <repo>/public/download/spa.html            —— 随 public 目录发布，下载路径 /download/spa.html
import { copyFileSync, existsSync, mkdirSync, statSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'dist-spa/index.html');

if (!existsSync(src)) {
  console.error(`[spa] 未找到单文件产物 ${src}，请先执行 VITE_SINGLEFILE=true vite build`);
  process.exit(1);
}

const targets = [
  resolve(root, 'spa.html'),
  resolve(root, 'public/download/spa.html')
];

for (const target of targets) {
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(src, target);
  const kb = (statSync(target).size / 1024).toFixed(0);
  console.log(`[spa] ✅ ${target} (${kb} KB)`);
}
