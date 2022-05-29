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

  doesGridMapExist(width, height) {
    mapCreationElements.gridMapCanvas.toMatchImageSnapshot({
      name: `map-creation-new-grid-${width}x${height}`
    })
  }
}

export default new MapCreationPage()
