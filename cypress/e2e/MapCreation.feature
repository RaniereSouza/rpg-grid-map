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

    Example: Trying to create a blank grid with only width dimension
      Given I choose any dimension for width for my grid map
      And I didn't choose any dimension for height for my grid map
      Then The grid map creation confirmation should be disabled

    Example: Trying to create a blank grid with only height dimension
      Given I choose any dimension for height for my grid map
      And I didn't choose any dimension for width for my grid map
      Then The grid map creation confirmation should be disabled

  Rule: It should not create a blank grid map with invalid input values

    Background:
      Given I choose a valid dimension for one of the dimension inputs for my grid map

    Example: Trying to create a blank grid with any dimension with a zero value
      Given I choose a zero value for the other dimension input for my grid map
      Then The grid map creation confirmation should be disabled

    Example: Trying to create a blank grid with any dimension with a negative value
      Given I choose a negative value for the other dimension input for my grid map
      Then The grid map creation confirmation should be disabled

    Example: Trying to create a blank grid with any dimension with a non-integer value
      Given I choose a non-integer value for the other dimension input for my grid map
      Then The grid map creation confirmation should be disabled

    Example: Trying to create a blank grid with any dimension with a non-numeric value
      Given I choose a non-numeric value for the other dimension input for my grid map
      Then The grid map creation confirmation should be disabled
