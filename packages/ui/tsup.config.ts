import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  outExtension({ format }) {
    return format === 'esm' ? { js: '.mjs' } : { js: '.js' }
  },
  dts: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'react-aria-components',
  ],
  injectStyle: false,
})
