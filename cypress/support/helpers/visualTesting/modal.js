const cyDocument = Cypress.$(window.parent.window.document)[0]

export function setupVisualTestModal(content, onCloseCallback) {
  const specName = Cypress.spec.name

  const modalStyle = /*css*/`
    .modal-overlay {
      z-index: 9999;
      background-color: #1b1e2e88;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
    }

    .modal-overlay .modal-wrapper {
      background-color: #e0e8ef;
      position: relative;
      width: 75vw;
      height: 75vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
    }

    .modal-overlay .modal-wrapper {
      overflow: hidden;
    }
    
    .modal-overlay .modal-wrapper .modal-body {
      overflow: auto;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .modal-overlay .modal-wrapper .modal-body::-webkit-scrollbar {
      display: none;
    }

    .modal-overlay .modal-wrapper .modal-close {
      position: absolute;
      top: 0;
      right: 0;
      color: #e0e8ef;
      background-color: firebrick;
      padding: 8px 12px;
    }
  `

  const modalTemplate = /*html*/`
    <div class="modal-wrapper">
      <button class="modal-close">Close</button>
      <div class="modal-body">
        ${content}
      </div>
    </div>
  `

  const modalOverlay = cyDocument.createElement('div')
  modalOverlay.classList.add('modal-overlay')
  modalOverlay.setAttribute('data-current-spec', specName)
  modalOverlay.innerHTML = /*html*/`
    <style>
      ${modalStyle}
    </style>
    ${modalTemplate}
  `
  modalOverlay.querySelector('.modal-close').addEventListener('click', _=> {
    modalOverlay.hide()
    onCloseCallback?.()
  })

  modalOverlay.show = function() {
    cyDocument.body.appendChild(modalOverlay)
  }

  modalOverlay.hide = function() {
    modalOverlay.remove()
  }

  return modalOverlay
}

export function hideAllVisualTestModals() {
  cyDocument.querySelectorAll(`.modal-overlay[data-current-spec="${
    Cypress.spec.name
  }"]`).forEach(el => (el.style.visibility = 'hidden'))
}

export function showAllVisualTestModals() {
  cyDocument.querySelectorAll(`.modal-overlay[data-current-spec="${
    Cypress.spec.name
  }"]`).forEach(el => (el.style.visibility = 'visible'))
}
