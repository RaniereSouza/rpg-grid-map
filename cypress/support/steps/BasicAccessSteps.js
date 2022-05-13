import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import homePage from '../pageObjects/HomePage'

Given('I access the application', () => {
  homePage.accessPage()
})

When('The main message is available', () => {
  homePage.titleIsVisible()
})

Then('I should be greeted', () => {
  homePage.titleHasTextContent('Hello, adventurer!')
})
