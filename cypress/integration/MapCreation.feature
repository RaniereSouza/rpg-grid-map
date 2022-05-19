Feature: Map creation interface

  As an user on the Internet, I want to create grid maps to use on my tabletop RPG games

  Background:
    Given I access the application
    And I choose the map creation action

  Scenario: Creating a blank grid map with the right dimensions
    Given I choose the dimensions 30 for width and 40 for height for my grid map
    When I confirm the grid map creation
    Then I should see a 30 by 40 blank grid map
