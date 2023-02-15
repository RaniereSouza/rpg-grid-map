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

import { testImagesDiff, imgBase64ToDataUrl } from './helpers/visualTesting'
import { setupVisualTestModal, hideAllVisualTestModals, showAllVisualTestModals } from './helpers/visualTesting/modal'

Cypress.Commands.add('visualTest', {prevSubject: 'optional'}, (_, {
  snapshotName, commandTimeout = 30_000, imageDiffOptions = {},
}) => {
  const previousCommandTimeout = Cypress.config('defaultCommandTimeout')
  Cypress.config('defaultCommandTimeout', commandTimeout)

  const snapshotSuffix = `--${
    Cypress.config('viewportWidth')}x${Cypress.config('viewportHeight')
  }`
  const snapshotCompleteName = `${snapshotName}${snapshotSuffix}`

  cy.task('maybeFileExists', {filePath: `/base/${snapshotCompleteName}.png`})
    .then(result => {
      if (result === false) {
        cy.log('Saving base screen image for Visual Testing...')
        cy.screenshot(`/base/${snapshotCompleteName}`)
        Cypress.config('defaultCommandTimeout', previousCommandTimeout)
        return
      }

      cy.log('Updating current screen image for Visual Testing comparison...')
      cy.screenshot(`/current/${snapshotCompleteName}`, {
        overwrite: true,
        onBeforeScreenshot: _=> hideAllVisualTestModals(),
        onAfterScreenshot: _=> showAllVisualTestModals(),
      })

      cy.readFile(`cypress/screenshots/base/${snapshotCompleteName}.png`, 'base64')
        .then(baseImgUrl => {
          cy.readFile(`cypress/screenshots/current/${snapshotCompleteName}.png`, 'base64')
            .then(async newImgUrl => {
              baseImgUrl = imgBase64ToDataUrl(baseImgUrl)
              newImgUrl = imgBase64ToDataUrl(newImgUrl)

              const forcedYield = Cypress.$.Deferred()
              function resolve() {
                Cypress.config('defaultCommandTimeout', previousCommandTimeout)
                forcedYield.resolve()
              }
              function reject(err) {
                Cypress.config('defaultCommandTimeout', previousCommandTimeout)
                forcedYield.reject(err)
              }

              const { appendResultsTo, thresholdReached, diffResultMessage } = await testImagesDiff({
                ...imageDiffOptions, baseImgUrl, newImgUrl,
              }).catch(reject)
              const differentImagesError = Error(
                'The current screen was evaluated as different from the expected in comparison to the base image.\n\n' +
                diffResultMessage
              )

              const modal = setupVisualTestModal(/*html*/`
                <style>
                  .canvas-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                  }

                  .canvas-wrapper canvas {
                    width: 80%;
                  }
                </style>
                <div class="canvas-wrapper" data-current-test="${Cypress.currentTest.title}"></div>
              `, _=> !thresholdReached ? resolve() : reject(differentImagesError))

              const modalCanvasWrapper = modal.querySelector('.canvas-wrapper')
              appendResultsTo(modalCanvasWrapper)

              modal.show()
              return forcedYield
            })
        })
    })
})
