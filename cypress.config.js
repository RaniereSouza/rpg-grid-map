const { defineConfig }     = require('cypress')
const { loadEnv }          = require('vite')
const { default:cucumber } = require('cypress-cucumber-preprocessor')

const envTestFile = loadEnv('test', process.cwd(), '')
const port        = envTestFile.PORT || '3000'
const baseUrl     = `http://localhost:${port}`

module.exports = defineConfig({
  viewportWidth:  1336,
  viewportHeight: 768,
  e2e: {
    baseUrl,
    specPattern: 'cypress/e2e/**/*.{feature,features}',
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
      config.env = {...config.env, ...envTestFile}
    },
  },
})
