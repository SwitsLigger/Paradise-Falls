import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import viteCompression from 'vite-plugin-compression2';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    viteCompression({
      algorithms: ['brotliCompress'],
      threshold: 10240,
    }),
    // use for debug build size
    // visualizer({ open: true }),
  ],
  base: './',
  server: {
    port: 3005,
  },
  build: {
    outDir: 'build',
    target: 'esnext',
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});
