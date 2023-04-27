import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    preview: {
      port: parseInt(env.PORT || '3000'),
    },
  }
})
