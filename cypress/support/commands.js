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

// const document = Cypress.$(window.parent.window.document)[0]

// function setupVisualTestModal(content) {
//   const specName = Cypress.spec.name
//
//   const modalStyle = /*css*/`
//     .modal-overlay {
//       z-index: 9999;
//       background-color: #1b1e2e88;
//       width: 100vw;
//       height: 100vh;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       position: absolute;
//       top: 0;
//       left: 0;
//     }
//
//     .modal-overlay .modal-wrapper {
//       background-color: #e0e8ef;
//       position: relative;
//       width: 75vw;
//       height: 75vh;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//     }
//
//     .modal-overlay .modal-wrapper .modal-close {
//       position: absolute;
//       top: 0;
//       right: 0;
//       color: #e0e8ef;
//       background-color: firebrick;
//       padding: 8px 12px;
//     }
//   `
//
//   const modalTemplate = /*html*/`
//     <div class="modal-wrapper">
//       <button class="modal-close">Close</button>
//       <div class="modal-body">
//         ${content}
//       </div>
//     </div>
//   `
//
//   const modalOverlay = document.createElement('div')
//   modalOverlay.classList.add('modal-overlay')
//   modalOverlay.setAttribute('data-current-spec', specName)
//   modalOverlay.innerHTML = /*html*/`
//     <style>
//       ${modalStyle}
//     </style>
//     ${modalTemplate}
//   `
//   modalOverlay.querySelector('.modal-close')?.addEventListener('click', _ => {
//     modalOverlay.hide()
//   })
//
//   modalOverlay.show = function() {
//     document.body.appendChild(modalOverlay)
//   }
//
//   modalOverlay.hide = function() {
//     modalOverlay.remove()
//   }
//
//   return modalOverlay
// }

// function loadImageToCanvas(imageUrl, canvas2dContext) {
//   const image = new Image()
//   image.src = imageUrl
//   image.onload = () => canvas2dContext.drawImage(img)
// }

Cypress.Commands.add('visualTest', {prevSubject: true}, (_, snapshotName) => {
  const snapshotSuffix = `--${
    Cypress.config('viewportWidth')}x${Cypress.config('viewportHeight')
  }`
  const snapshotCompleteName = `${snapshotName}${snapshotSuffix}`

  cy.screenshot(snapshotCompleteName, {
    overwrite: true,
    onBeforeScreenshot: _=> {
      // document.querySelectorAll(`.modal-overlay[data-current-spec="${
      //   Cypress.spec.name
      // }"]`).forEach(el => (el.style.visibility = 'hidden'))
    },
    onAfterScreenshot: _=> {
      // document.querySelectorAll(`.modal-overlay[data-current-spec="${
      //   Cypress.spec.name
      // }"]`).forEach(el => (el.style.visibility = 'visible'))
    },
  }).then(screenshotResult => {
    // const modal = setupVisualTestModal(/*html*/`
    //   <canvas data-current-test="${Cypress.currentTest.title}"></canvas>
    //   <button class="unyield">Click me!</button>
    // `)

    // const modalCanvas = modal.querySelector('canvas')
    // const ctx = modalCanvas.getContext('2d')
    // loadImageToCanvas(`cypress/screenshots/${snapshotCompleteName}`, ctx)

    // const blocker = Cypress.$.Deferred()
    // const modalBtn = modal.querySelector('button.unyield')
    // modalBtn.addEventListener('click', event => {
    //   event.preventDefault()
    //   blocker.resolve()
    // })

    // modal.show()
    // return blocker
    // // console.log('screenshotResult:', screenshotResult);
  })

  throw Error('Not implemented yet.')
})
