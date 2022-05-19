import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps'

import homePage from '../pageObjects/HomePage'

And('I choose the map creation action', () => {
  homePage.chooseMapCreation()
})

Given(
  'I choose the dimensions {int} for width and {int} for height for my grid map',
  (width, height) => {
    console.log('width:', width)
    console.log('height:', height)
    throw 'No implementation for this step yet.'
  }
)
