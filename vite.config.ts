import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { saveTextPlugin } from './scripts/saveTextPlugin';
import { sheetDataPlugin } from './scripts/sheetDataPlugin';

export default defineConfig(() => {
  const singlefile = process.env.VITE_SINGLEFILE === 'true';
  return {
    plugins: [
      react(),
      tailwindcss(),
      // 开发期「文字写回」中间件：POST /api/save-text 把页面编辑写回磁盘
      // src/data/texts/*.xml（AI 与人工同一文字源），只挂在 dev server 上。
      saveTextPlugin(),
      sheetDataPlugin(),
      ...(singlefile ? [viteSingleFile()] : []),
    ],
    build: singlefile ? { outDir: 'dist-spa' } : undefined,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      allowedHosts: true as const,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  };
});
