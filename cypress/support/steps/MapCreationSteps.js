import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

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

When('I (try to )confirm the grid map creation', () => {
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
  const value = parseInt((Math.random() * 99) + 1)
  mapCreationPage.chooseWidthByInput(value)
})

/** @And */
Given('I didn\'t choose any dimension for height for my grid map', () => {
  mapCreationPage.heightInputHasNoValue()
})

Given('I choose any dimension for height for my grid map', () => {
  const value = parseInt((Math.random() * 99) + 1)
  mapCreationPage.chooseHeightByInput(value)
})

/** @And */
Given('I didn\'t choose any dimension for width for my grid map', () => {
  mapCreationPage.widthInputHasNoValue()
})
