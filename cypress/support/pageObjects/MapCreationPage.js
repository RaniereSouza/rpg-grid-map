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
    mapCreationElements.gridMapCanvas.visualTest({
      snapshotName: `map-creation-blank-grid-${width}x${height}`,
      imageDiffOptions: {qtdDiffThreshold: 0.01},
    })
  }

  widthInputHasValue(value) {
    if (value === undefined || value === null || value === false) {
      mapCreationElements.widthInput.invoke('val').should('be.empty')
    }
    else if (value === true) {
      mapCreationElements.widthInput.invoke('val').should('not.be.empty')
    }
    else if (!isNaN(Number(value))) {
      mapCreationElements.widthInput.should('have.value', Number(value))
    }
    else throw Error('The width input should not expect this value:', value)
  }

  widthInputHasNoValue() {
    this.widthInputHasValue(null)
  }

  heightInputHasValue(value) {
    if (value === undefined || value === null || value === false) {
      mapCreationElements.heightInput.invoke('val').should('be.empty')
    }
    else if (value === true) {
      mapCreationElements.heightInput.invoke('val').should('not.be.empty')
    }
    else if (!isNaN(Number(value))) {
      mapCreationElements.heightInput.should('have.value', Number(value))
    }
    else throw Error('The height input should not expect this value:', value)
  }

  heightInputHasNoValue() {
    this.heightInputHasValue(null)
  }

  gridCreationConfirmIsDisabled() {
    mapCreationElements.confirmCreationButton.should('be.disabled')
  }
}

export default new MapCreationPage()
