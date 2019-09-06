@androidApp @app @demoCucumber
Feature: Test iFixit application on Android device

  Scenario: Open session
  Given User starts a session on android device

  Scenario: Verify items on Acura Support Community
    Given User goes to Home page
    And User clicks on Car and Truck category
    And User clicks on Acura category
    And User waits for General Information
    Then User see items display: Acura Integra, Acura MDX, Acura RL, Acura TL, Acura TSX

  Scenario: End session
  Given User ends session on Android device
