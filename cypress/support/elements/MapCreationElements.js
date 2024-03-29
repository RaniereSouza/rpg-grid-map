class MapCreationElements {
  get mapCreationForm() {
    return cy.get('[data-testid="map-creation-form"]')
  }

  get widthInput() {
    return cy.get('[data-testid="map-creation-width-input"]')
  }

  get heightInput() {
    return cy.get('[data-testid="map-creation-height-input"]')
  }

  get confirmCreationButton() {
    return cy.get('[data-testid="map-creation-confirm-button"]')
  }

  get gridMapCanvas() {
    return cy.get('[data-testid="map-creation-canvas"]')
  }
}

export default new MapCreationElements()
