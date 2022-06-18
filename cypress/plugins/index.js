// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
/* module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
} */

const { loadEnv }          = require('vite')
const { default:cucumber } = require('cypress-cucumber-preprocessor')
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())

  config.env = {...config.env, ...loadEnv('test', process.cwd(), '')}
  if (!config.env.BASE_URL)
    config.env.BASE_URL = `http://localhost:${config.env.PORT || 3000}`

  return config
}

require('@applitools/eyes-cypress')(module)
