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

  doesGridMapExist() {
    const canvas = mapCreationElements.gridMapCanvas
    throw 'No implementation yet for doesGridMapExist()'
  }

  assertGridMapSize(width, height) {
    if (this.doesGridMapExist()) {
      const canvas = mapCreationElements.gridMapCanvas
      throw 'No implementation yet for assertGridMapSize()'
    }
  }
}

export default new MapCreationPage()
