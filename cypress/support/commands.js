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

function normalizeFilename(filename) {
  return filename.trim().replace(/\//g, '_')
}

Cypress.Commands.add('visualTest', {prevSubject: 'optional'}, (_, {
  snapshotName, commandTimeout = 30_000, imageDiffOptions = {},
}) => {
  const previousCommandTimeout = Cypress.config('defaultCommandTimeout')
  Cypress.config('defaultCommandTimeout', commandTimeout)

  const snapshotSuffix = `--${
    Cypress.config('viewportWidth')}x${Cypress.config('viewportHeight')
  }`
  const snapshotCompleteName = normalizeFilename(`${snapshotName}${snapshotSuffix}`)

  cy.task('maybeVisualTestExists', {imageName: snapshotCompleteName})
    .then(result => {
      if (result === false) {
        cy.log('Saving base screen image for Visual Testing...')
        cy.screenshot(snapshotCompleteName).then(_=> cy.task('mvToVisualTestFolder', {imageName: snapshotCompleteName}))
        Cypress.config('defaultCommandTimeout', previousCommandTimeout)
        return
      }

      cy.log('Updating current screen image for Visual Testing comparison...')
      cy.screenshot(snapshotCompleteName, {
        overwrite: true,
        onBeforeScreenshot: _=> hideAllVisualTestModals(),
        onAfterScreenshot: _=> showAllVisualTestModals(),
      })

      cy.readFile(`${Cypress.config('visualTestFolder')}/${snapshotCompleteName}.png`, 'base64')
        .then(baseImgUrl => {
          cy.readFile(`${Cypress.config('screenshotsFolder')}/${snapshotCompleteName}.png`, 'base64')
            .then(async newImgUrl => {
              await cy.task('rmCurrentVisualState', {imageName: snapshotCompleteName})

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
              `, _=> thresholdReached ? reject(differentImagesError) : resolve())

              const modalCanvasWrapper = modal.querySelector('.canvas-wrapper')
              appendResultsTo(modalCanvasWrapper)

              modal.show()
              return forcedYield
            })
        })
    })
})
