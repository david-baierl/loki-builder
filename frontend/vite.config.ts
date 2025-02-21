import path from 'path'
import {
  defineConfig,
  UserConfig,
} from 'vite'
import solid from 'vite-plugin-solid'

import linaria from '@wyw-in-js/vite'

const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    linaria({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/typescript'],
      },
    }),
    solid(),
  ],

  resolve: {
    alias: {
      '~debug': path.resolve(__dirname, './src/debug'),
      '~utils': path.resolve(__dirname, './src/utils'),
      '~tauri': path.resolve(__dirname, './gen/tauri.ts'),
      '~': path.resolve(__dirname, './src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,

  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `rust files`
      ignored: ['backend/**/*'],
    },
  },
} satisfies UserConfig))
