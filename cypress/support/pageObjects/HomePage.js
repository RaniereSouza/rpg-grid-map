import homeElements from '../elements/HomeElements'

class HomePage {
  accessPage() {
    cy.visit('/')
  }

  titleIsVisible() {
    homeElements.title.should('be.visible')
  }

  titleHasTextContent(text) {
    homeElements.title.should('contain.text', text)
  }

  chooseMapCreation() {
    homeElements.mapCreationButton.click()
  }
}

export default new HomePage()
