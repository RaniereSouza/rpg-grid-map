import { Given, When, Then, defineParameterType } from '@badeball/cypress-cucumber-preprocessor'

import { randomIntFrom1to100, randomlyChooseBetween } from './helpers/randomize'

import homePage        from '../pageObjects/HomePage'
import mapCreationPage from '../pageObjects/MapCreationPage'

/** @And */
Given('I choose the map creation action', () => {
  homePage.chooseMapCreation()
})

Given(
  'I choose the dimensions {int} for width and {int} for height for my grid map',
  (width, height) => {
    mapCreationPage.chooseWidthByInput(width)
    mapCreationPage.chooseHeightByInput(height)
  }
)

When('I confirm the grid map creation', () => {
  mapCreationPage.confirmGridCreation()
})

Then('I should see a {int} by {int} blank grid map', (width, height) => {
  mapCreationPage.hasNewBlankGridMap(width, height)
})

Given('I didn\'t choose any dimensions for width and height for my grid map',
  () => {
    mapCreationPage.widthInputHasNoValue()
    mapCreationPage.heightInputHasNoValue()
  }
)

Then('The grid map creation confirmation should be disabled', () => {
  mapCreationPage.gridCreationConfirmIsDisabled()
})

Given('I choose any dimension for width for my grid map', () => {
  const value = randomIntFrom1to100()
  mapCreationPage.chooseWidthByInput(value)
})

/** @And */
Given('I didn\'t choose any dimension for height for my grid map', () => {
  mapCreationPage.heightInputHasNoValue()
})

Given('I choose any dimension for height for my grid map', () => {
  const value = randomIntFrom1to100()
  mapCreationPage.chooseHeightByInput(value)
})

/** @And */
Given('I didn\'t choose any dimension for width for my grid map', () => {
  mapCreationPage.widthInputHasNoValue()
})

function randomlyChooseDimensionInput() {
  return randomlyChooseBetween(['width', 'height'])
}

Given('I choose a valid dimension for one of the dimension inputs for my grid map',
  function() {
    const input = randomlyChooseDimensionInput()
    const value = randomIntFrom1to100()

    this.validInput = {}; this.otherInput = {}

    if (input === 'width') {
      this.validInput.chooseValue = mapCreationPage.chooseWidthByInput
      this.otherInput.chooseValue = mapCreationPage.chooseHeightByInput
    }
    else if (input === 'height') {
      this.validInput.chooseValue = mapCreationPage.chooseHeightByInput
      this.otherInput.chooseValue = mapCreationPage.chooseWidthByInput
    }

    this.validInput.chooseValue(value)
  }
)

defineParameterType({
  name:        'invalidType',
  regexp:      /(zero|negative|non\-integer|non\-numeric) value/,
  transformer: s => s,
})

Given('I choose a(n) {invalidType} for the other dimension input for my grid map',
  function(invalidType) {
    if (invalidType === 'zero') {
      this.otherInput.chooseValue(0)
    }
    else if (invalidType === 'negative') {
      this.otherInput.chooseValue(randomIntFrom1to100() * -1)
    }
    else if (invalidType === 'non-integer') {
      this.otherInput.chooseValue(randomIntFrom1to100() - 0.5)
    }
    else if (invalidType === 'non-numeric') {
      this.otherInput.chooseValue('.')
    }
  }
)
