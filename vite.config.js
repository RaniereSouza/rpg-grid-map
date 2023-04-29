import path from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    preview: {
      port: parseInt(env.PORT || '3000'),
    },
    server: {
      watch: {
        ignored: [path.resolve(__dirname, './drafts')],
      },
    },
    build: {
      sourcemap: (mode !== 'production'),
      rollupOptions: {
        input: path.resolve(__dirname, './index.html'),
      },
    },
    optimizeDeps: {
      exclude: [path.resolve(__dirname, './drafts')],
    },
  }
})
