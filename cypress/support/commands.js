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

import '@applitools/eyes-cypress/commands'

Cypress.Commands.add('visualTest', {prevSubject: true}, (_, snapshotName) => {
  const snapshotSuffix = `--${
    Cypress.config('viewportWidth')}x${Cypress.config('viewportHeight')
  }`
  const snapshotCompleteName = `${snapshotName}${snapshotSuffix}`

  cy.eyesOpen({
    appName:   'rpg-grid-map',
    batchName: Cypress.currentTest.title.replace(/\s\(example #[0-9]+\)$/, ''), 
  })
  cy.eyesCheckWindow(snapshotCompleteName)
  cy.eyesClose()
})
