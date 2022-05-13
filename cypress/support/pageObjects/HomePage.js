import homeElements from '../elements/HomeElements'

class HomePage {
  accessPage() {
    cy.visit('/')
  }

  titleIsVisible() {
    homeElements.title().should('be.visible')
  }

  titleHasTextContent(text) {
    homeElements.title().should('contain.text', text)
  }
}

export default new HomePage()
