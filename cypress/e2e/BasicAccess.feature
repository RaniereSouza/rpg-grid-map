@welcome_page
Feature: Basic application access

  As an user on the Internet, I want to access the application and be greeted

  @happy_path
  Scenario: Being greeted when accessing the application
    Given I access the application
    When The main message is available
    Then I should be greeted with "Hello, adventurer!"
