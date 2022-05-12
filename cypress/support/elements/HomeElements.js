class HomeElements {
  title() {
    return cy.get('*[data-testid="home-title"]')
  }
}

export default new HomeElements()
