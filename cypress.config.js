const { defineConfig }     = require('cypress')
const { loadEnv }          = require('vite')
const { default:cucumber } = require('cypress-cucumber-preprocessor')

const envTestFile = loadEnv('test', process.cwd(), '')
const port        = envTestFile.PORT || '3000'
const baseUrl     = `http://localhost:${port}`

module.exports = defineConfig({
  viewportWidth:              1336,
  viewportHeight:             768,
  eyesIsDisabled:             false,
  eyesFailCypressOnDiff:      true,
  eyesDisableBrowserFetching: false,
  eyesTestConcurrency:        5,
  eyesIsGlobalHooksSupported: false,
  eyesPort:                   64361,
  appliConfFile: {
    batch: {
      id: '0d583209-12ad-4192-93a3-deb1df9b55f9',
    },
  },
  e2e: {
    baseUrl,
    specPattern: 'cypress/e2e/**/*.{feature,features}',
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())

      config.env = {...config.env, ...envTestFile}

      const mockModule = {
        exports: (on, config) => { }
      }
      require('@applitools/eyes-cypress')(mockModule)
      return mockModule.exports(on, config)
    },
  },
})
