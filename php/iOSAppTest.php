<?php
require_once('PHPUnit/Extensions/AppiumTestCase.php');
include("configs.php");

class IOSAppTest extends PHPUnit_Extensions_AppiumTestCase {
  public $firstQuestion = 'Acura MDX';
  public $secondQuestion = 'Cruise Control';

  public static $browsers = desired_caps_ios_app;

  public function test_ios_app() {
    $this->search_questions_on_Acura_Support_Community();
    $this->search_IFixit_on_home_screen();
  }

  public function search_questions_on_Acura_Support_Community() {
    print 'should allow to navigate to some devices on Acura Support Community';
   
   /* Steps: 
    1. Click on "Car and Truck" Categories on Homepage
    2. Click on "Acura" Categories
    Expected: 
    1. General Information is "Acura".
    2.Verify three devices below displays. 
    + 1994-2001 Acura Integra 
    + 1996-1998 Acura TL 
    + 2004 - 2008 Acura TSX
    */
   
    $this->byXpath("//XCUIElementTypeButton[@name='START A REPAIR']")->click();
    sleep(5);
    $this->byXpath("//*[@name='Car and Truck']")->click();
    sleep(2);
    $this->byXpath("//*[@name='Acura']")->click();
    sleep(2);

    $acuraText = $this->byXpath("//XCUIElementTypeNavigationBar")->attribute('name');
    $has_AcuraIntegra= $this->byXpath("//XCUIElementTypeStaticText[@name='Acura Integra']")->displayed();
    $has_AcuraMDX = $this->byXpath("//XCUIElementTypeStaticText[@name='Acura MDX']")->displayed();
    $has_AcuraRL = $this->byXpath("//XCUIElementTypeStaticText[@name='Acura RL']")->displayed();
    $has_AcuraTL = $this->byXpath("//XCUIElementTypeStaticText[@name='Acura TL']")->displayed();
    $has_AcuraTSX = $this->byXpath("//XCUIElementTypeStaticText[@name='Acura TSX']")->displayed();
  
    $this->assertEquals('Acura', $acuraText);
    $this->assertTrue($has_AcuraIntegra);
    $this->assertTrue($has_AcuraMDX);
    $this->assertTrue($has_AcuraRL);
    $this->assertTrue($has_AcuraTL);
    $this->assertTrue($has_AcuraTSX);
  }

  public function search_IFixit_on_home_screen() {
    print 'should allow to search iFixit on Home screen';

   /*
    Steps:
    1. Reopen iFixit app
    2. Click Search menu on the left menu bar
    3. Search keyword 'Macbook Pro 2015'
    4. Press Enter button on keyboard
    Expected: It should show at least 33 results.
    5. Clear the current content
    6. Search keyword 'Acura' on Categories tab
    Expected: It should show at least 6 results.
    */

    $this->launchApp();
    sleep(5);
    $this->byXpath("//XCUIElementTypeButton[@name='START A REPAIR']")->click();
    sleep(2);
    $this->byXpath("//*[@name='Search']")->click();
    sleep(2);
    $this->byXpath("//XCUIElementTypeSearchField[@name='Search']")->click();
    $this->keys('Macbook Pro 2015');
    sleep(2);
    $first_list_result = $this->elements($this->using('xpath')->value("//XCUIElementTypeStaticText[contains(@label,'MacBook Pro')]"));

    $this->byXpath("//XCUIElementTypeButton[@name='Cancel']")->click();
    sleep(2);
    $this->byXpath("//*[@name='Search']")->click();
    sleep(2);
    $this->byXpath("//XCUIElementTypeSearchField[@name='Search']")->click();
    sleep(2);
    $this->keys('Acura');
    sleep(5);
    $this->byXpath("//XCUIElementTypeButton[@name='Categories']")->click();
    sleep(2);
    $second_list_result = $this->elements($this->using('xpath')->value("//XCUIElementTypeStaticText[contains(@label,'Acura')]"));

    $this->assertGreaterThanOrEqual(33, count($first_list_result), 'The expected results are greater or equal to 33 results.');
    $this->assertGreaterThanOrEqual(6, count($second_list_result), 'The expected results are greater or equal to 6 results.');
  }
}