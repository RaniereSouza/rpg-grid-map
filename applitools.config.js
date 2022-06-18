const { loadEnv } = require('vite')

const env = loadEnv('', process.cwd(), 'APPLITOOLS')

module.exports = {
  apiKey: env.APPLITOOLS_API_KEY || ''
}
