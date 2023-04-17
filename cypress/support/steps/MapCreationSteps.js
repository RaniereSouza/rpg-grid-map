import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import homePage        from '../pageObjects/HomePage'
import mapCreationPage from '../pageObjects/MapCreationPage'

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
