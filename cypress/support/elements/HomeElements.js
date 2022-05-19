class HomeElements {
  get title() {
    return cy.get('*[data-testid="home-title"]')
  }

  get mapCreationButton() {
    return cy.get('*[data-testid="home-map-creaction-button"]')
  }
}

export default new HomeElements()
