class MapCreationElements {
  get widthInput() {
    return cy.get('[data-testid="map-creation-width-input"]')
  }

  get heightInput() {
    return cy.get('[data-testid="map-creation-height-input"]')
  }

  get confirmCreationButton() {
    return cy.get('[data-testid="map-creation-confirm-button"]')
  }
}

export default new MapCreationElements()
