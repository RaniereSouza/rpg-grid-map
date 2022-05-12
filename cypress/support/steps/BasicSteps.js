import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import homePage from '../pageObjects/HomePage'

Given('I access the home page', () => {
  homePage.accessPage()
})

When('The title is visible', () => {
  homePage.titleIsVisible()
})

Then('I should be greeted', () => {
  homePage.titleHasTextContent('Hello, adventurer!')
})
