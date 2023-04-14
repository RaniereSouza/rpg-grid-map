const path             = require('path')
const { defineConfig } = require('cypress')
const { loadEnv }      = require('vite')

const createBundler                     = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const { createEsbuildPlugin }           = require('@badeball/cypress-cucumber-preprocessor/esbuild')

const visualTestingTasks = require('heimdall-visual-test/src/cypress/taskHandlers')

const envTestFile = loadEnv('test', process.cwd(), '')
const port        = envTestFile.PORT || '3000'
const baseUrl     = `http://localhost:${port}`

module.exports = defineConfig({
  viewportWidth:  1336,
  viewportHeight: 768,
  e2e: {
    baseUrl,
    specPattern: 'cypress/e2e/**/*.{feature,features}',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)

      on('file:preprocessor', createBundler({plugins: [createEsbuildPlugin(config)]}))
      on('task', {...visualTestingTasks(config)})
      config.env = {...config.env, ...envTestFile}

      return config
    },
    visualTestFolder: path.join(__dirname, 'cypress/visual-test-screenshots'),
  },
})
