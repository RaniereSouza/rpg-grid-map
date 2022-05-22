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
}

export default new MapCreationPage()
