<?php
require_once('PHPUnit/Extensions/AppiumTestCase.php');
include("configs.php");

class AndroidAppTest extends PHPUnit_Extensions_AppiumTestCase {

  public $firstQuestion = 'Acura MDX';
  public $secondQuestion = 'Cruise Control';

  public static $browsers = desired_caps_android_app;

  public function test_android_app() {
    $this->search_questions_on_Acura_Support_Community();
    $this->search_IFixit_on_home_screen();
  }

  public function search_questions_on_Acura_Support_Community() {
    print 'should allow to search some questions on Acura Support Community';
    $this->byId('android:id/home')->click();
    sleep(5);
    $this->byXpath("//*[@text='Car and Truck']")->click();
    sleep(3);
    $this->byXpath("//*[@text='Acura']")->click();
    sleep(2);

    $acuraText = $this->byXpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]")->text();
    $acuraIntegraText = $this->byXpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=3]")->text();
    $acuraMDXText = $this->byXpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=4]")->text();
    $acuraRLText = $this->byXpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=5]")->text();
    $acuraTLText = $this->byXpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=6]")->text();
    $acuraTSXText = $this->byXpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=7]")->text();
    $this->assertEquals('Acura', $acuraText);
    $this->assertEquals('Acura Integra', $acuraIntegraText);
    $this->assertEquals('Acura MDX', $acuraMDXText);
    $this->assertEquals('Acura RL', $acuraRLText);
    $this->assertEquals('Acura TL', $acuraTLText);
    $this->assertEquals('Acura TSX', $acuraTSXText);

    $get_attr_name1 = $this->search_question($this->firstQuestion);

    /*
    Steps: 
    1. Clear text on Search field
    2. Enter keyword 'Cruise Control' 
    3. Click on Search icon 
    4. Wait a few seconds to get returned result
    5. Close app

    Expected: It should show at least 1 result.
    */

    $this->back();
    sleep(2);
    $get_attr_name2 = $this->search_question($this->secondQuestion);

    $this->closeApp();

    $get_attr_name1 = preg_replace("/[^0-9]/", '', $get_attr_name1);
    $this->assertGreaterThanOrEqual((int)6, $get_attr_name1,
      'The expected results are greater or equal to 6 results.');

    $get_attr_name2 = preg_replace("/[^0-9]/", '', $get_attr_name2);
    $this->assertGreaterThanOrEqual((int)1, $get_attr_name2,
      'The expected results are greater or equal to 1 result.');
  }

  public function search_IFixit_on_home_screen() {
    print 'should allow to search iFixit on Home screen';
    $this->launchApp();
    sleep(5);
    $this->byXpath("//*[@resource-id='com.dozuki.ifixit:id/action_search']")->click();
    sleep(2);
    $this->byXpath("//*[@resource-id='com.dozuki.ifixit:id/abs__search_src_text']")->click();
    sleep(2);
    $this->keys('Macbook Pro 2015');
    sleep(2);
    $this->keyEvent(66);
    sleep(5);
    $first_result = $this->byId("com.dozuki.ifixit:id/search_result_count")->text();
    $this->byXpath("//*[@resource-id='android:id/text1' and @text='Guides']")->click();
    sleep(2);
    $this->byXpath("//*[@resource-id='android:id/text1' and @text='Devices']")->click();
    sleep(2);
    $second_result = $this->byId("com.dozuki.ifixit:id/search_result_count")->text();

    $first_result = preg_replace("/[^0-9]/", '', $first_result);
    $this->assertGreaterThanOrEqual((int)47, $first_result,
      'The expected results are greater or equal to 47 results.');

    $second_result = preg_replace("/[^0-9]/", '', $second_result);
    $this->assertGreaterThanOrEqual((int)5, $second_result,
      'The expected results are greater or equal to 5 result.');
  }

  public function search_question($question) {
    $this->byXpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]")->click();
    sleep(5);
    $element = $this->byXpath("//*[@resource-id='com.dozuki.ifixit:id/topic_info_image']");
    sleep(5);
    $this->swipe_on_element($element, 'RightLeft');
    sleep(5);
    $this->byXpath("//*[@resource-id='answersSearch']")->click();
    $this->keys($question);
    $this->byId('searchIcon')->click();
    sleep(5);
    return $this->byXpath("//android.view.View[contains(@content-desc,'questions') and @index=1]")->attribute('name');
  }

  public function swipe_on_element($element, $direction = 'RightLeft') {
    $size = $element->size();
    $startx = $size['width'] * 0.95;
    // Find endx point which is at left side of screen.
    $endx = $size['width'] * 0.10;
    // Find vertical point where you wants to swipe. It is in middle of screen height.
    $starty = ($size['height'] * 0.50) + 100;

    if ($direction == 'RightLeft') {
      $this->swipe($startx, $starty, $endx, $starty, 200);
    }

    if ($direction == 'LeftRight') {
      $this->swipe($endx, $starty, $startx, $starty, 200);
    }
    sleep(3);
  }
}