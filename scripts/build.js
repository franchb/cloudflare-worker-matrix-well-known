import {build} from 'esbuild'
import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill'

await build({
  bundle: true,
  conditions: ['worker', 'browser'],
  entryPoints: ['./src/index.ts'],
  external: [],
  format: "esm",
  minify: true,
  outbase: './src',
  outdir: './dist',
  platform: 'browser',
  plugins: [NodeModulesPolyfillPlugin()],
  preserveSymlinks: false,
  sourcemap: true,
  target: 'esnext',
  treeShaking: true,
  outExtension: {
    '.js': '.mjs'
  },
  define: {
    IS_CLOUDFLARE_WORKER: 'true'
  }
})
