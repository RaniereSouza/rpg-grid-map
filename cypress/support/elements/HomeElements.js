class HomeElements {
  get title() {
    return cy.get('*[data-testid="home-title"]')
  }
}

export default new HomeElements()
