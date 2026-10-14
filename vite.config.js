import { defineConfig } from 'vite';
import { resolve } from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    base: '/goit-js-hw-09/',
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
          gallery: resolve(__dirname, 'src/1-gallery.html'),
          form: resolve(__dirname, 'src/2-form.html'),
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return 'assets/[name]-[hash].js';
          },
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    plugins: [injectHTML(), FullReload('./src/**/**.html')],
  };
});