import { defineConfig } from 'vite';
import { resolve } from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import { globSync } from 'glob';

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
        input: Object.fromEntries(
          globSync('src/*.html').map(file => [
            file.slice(file.lastIndexOf('/') + 1, file.lastIndexOf('.')),
            resolve(__dirname, file),
          ])
        ),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    plugins: [injectHTML(), FullReload('./**/**.html')],
  };
});