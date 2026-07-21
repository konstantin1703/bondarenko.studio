import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    assetsDir: 'assets/home-v2',
    emptyOutDir: true,
    outDir: 'dist',
    rollupOptions: {
      input: resolve(process.cwd(), 'home-v2.html'),
    },
  },
});
