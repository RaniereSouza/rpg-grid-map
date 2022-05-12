Feature: Basic application access

  As an user on the Internet, I want to access the application and be greeted

  Scenario: Being greeted when accessing the home page
    Given I access the home page
    When The title is visible
    Then I should be greeted
