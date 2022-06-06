// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-plugin-snapshots/commands'

Cypress.Commands.overwrite('visit', (originalFn, urlSuffix, options) => {
  const url = `${Cypress.env('BASE_URL')}${urlSuffix}`
  return originalFn({url, ...options})
})

Cypress.Commands.add('visualTest', {prevSubject: true}, (subject, snapshotName) => {
  const snapshotSuffix = `--${
    Cypress.browser.displayName
  }-${
    Cypress.config('viewportWidth')}x${Cypress.config('viewportHeight')
  }`

  return cy.wrap(subject).toMatchImageSnapshot({
    name: `${snapshotName}${snapshotSuffix}`,
  })
})
