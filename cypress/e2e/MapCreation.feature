Feature: Map creation interface

  As an user on the Internet, I want to create grid maps to use on my tabletop RPG games

  Background:
    Given I access the application
    And I choose the map creation action

  Scenario Outline: Creating a blank grid map with the chosen dimensions
    Given I choose the dimensions <width> for width and <height> for height for my grid map
    When I confirm the grid map creation
    Then I should see a <width> by <height> blank grid map

    Examples:
      | width | height |
      |    30 |     40 |
      |    15 |     15 |
      |    50 |     20 |

  Rule: It should not create a blank grid map with missing input

    Example: Trying to create a blank grid without inputting dimensions
      Given I didn't choose any dimensions for width and height for my grid map
      Then The grid map creation confirmation should be disabled
