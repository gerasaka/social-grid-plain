import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        posts: resolve(__dirname, 'posts/index.html'),
        report: resolve(__dirname, 'report/index.html'),
      },
    },
  },
});
