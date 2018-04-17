@iosWeb @web @demoCucumber
Feature: Login in heroku page

  Scenario: Open session
  Given User starts a session on iOS device

  Scenario Outline: Verify login with invalid username
  		Given User go to login page
    And User inputs username <username>
    And User inputs password <password>
    And User clicks login button
    Then User will see message <errorMessage>

    Examples: 
      | username | password             | errorMessage                   |
      | foo      | SuperSecretPassword! | Your username is invalid!      |
      | tomsmith | SuperSecretPassword  | Your password is invalid!      |
      | tomsmith | SuperSecretPassword! | You logged into a secure area! |
      
	Scenario: End session
  Given User ends session on Android device