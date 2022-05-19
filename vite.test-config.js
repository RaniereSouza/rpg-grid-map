import { defineConfig, loadEnv } from 'vite'

export default defineConfig(() => {
  const env = loadEnv('test', process.cwd(), '')

  return {
    preview: {
      port: parseInt(env.PORT || '3000'),
    },
  }
})
