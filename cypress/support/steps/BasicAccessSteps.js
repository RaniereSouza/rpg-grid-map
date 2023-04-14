import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import homePage from '../pageObjects/HomePage'

Given('I access the application', () => {
  homePage.accessPage()
})

When('The main message is available', () => {
  homePage.titleIsVisible()
})

Then('I should be greeted with {string}', greeting => {
  homePage.titleHasTextContent(greeting)
})
