<?php
require_once('vendor/autoload.php');
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverBy;
include("utils/AutomationUtils.php");
include("services/DeviceService.php");

class AndroidWebTest extends PHPUnit_Framework_TestCase {
  protected $driver;
  public $wrong_username_msg = 'Your username is invalid!';
  public $success_msg = 'You logged into a secure area!';

  public function setUp() {
    include("configs.php");

    $device = getOnlineDevice('Android');
    $caps = desiredCapabilitiesAndroidWeb($device);

    $this->driver = RemoteWebDriver::create(
      kobitonServerUrl(),
      $caps,
      $connection_timeout_in_ms = 1200000,
      $request_timeout_in_ms = 1200000
    );
    $this->driver->manage()->timeouts()->implicitlyWait(60); // seconds
  }
   /*
    Steps:
    1. Login invalid user
    2. Login successfully with correct username and passoword
    */

  public function test_android_web() {
    $this->verify_login_invalid_username();
    $this->verify_login_successfully();
  }

  public function verify_login_invalid_username() {
    print 'should return error when we input wrong username';
    $this->login('foo', 'SuperSecretPassword!');
    $this->assertContains($this->wrong_username_msg, $this->getMessage());
  }

  public function verify_login_successfully() {
    print 'should run test successfully with correct username and password';
    $this->login('tomsmith', 'SuperSecretPassword!');
    $this->assertContains($this->success_msg, $this->getMessage());
  }

  function login($username, $password) {
    $this->driver->get("https://the-internet.herokuapp.com/login");
    $this->driver->findElement(WebDriverBy::id('username'))->sendKeys($username);
    $this->driver->findElement(WebDriverBy::id('password'))->sendKeys($password);
    $this->driver->findElement(WebDriverBy::xpath("//form[@name='login']"))->submit();
  }

  public function getMessage() {
    return $this->driver->findElement(WebDriverBy::id('flash'))->getText();
  }

  public function tearDown() {
    if ($this->driver) {
      $this->driver->quit();
    }
    parent::tearDown();
  }
}
