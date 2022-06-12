import mapCreationElements from '../elements/MapCreationElements'

class MapCreationPage {
  chooseWidthByInput(width) {
    mapCreationElements.widthInput.type(String(width))
  }

  chooseHeightByInput(height) {
    mapCreationElements.heightInput.type(String(height))
  }

  confirmGridCreation() {
    mapCreationElements.confirmCreationButton.click()
  }

  hasNewBlankGridMap(width, height) {
    mapCreationElements.mapCreationForm.should('not.be.visible')
    mapCreationElements.gridMapCanvas.visualTest(
      `map-creation-blank-grid-${width}x${height}`,
    )
  }
}

export default new MapCreationPage()
