<?php
// Setup: $ php composer.phar require facebook/webdriver

require_once('vendor/autoload.php');
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverBy;

class IOSWebTest extends PHPUnit_Framework_TestCase {
  protected $driver;
  public $wrong_username_msg = 'Your username is invalid!';
  public $wrong_password_msg = 'Your password is invalid!';
  public $success_msg = 'You logged into a secure area!';

  public function setUp() {
    include("configs.php");
    $this->driver = RemoteWebDriver::create(
      $kobiton_server_url,
      $desired_caps_ios_web,
      $connection_timeout_in_ms = 1200000,
      $request_timeout_in_ms = 1200000
    );
    $this->driver->manage()->timeouts()->implicitlyWait(60); // seconds
  }

  public function test_ios_web() {
    $this->verify_login_invalid_username();
    $this->verify_login_invalid_password();
    $this->verify_login_successfully();
  }

  public function verify_login_invalid_username() {
    print "\n";
    print 'should return error when we input wrong username';
    print "\n";
    $this->login('foo', 'SuperSecretPassword!');
    $this->assertContains($this->wrong_username_msg, $this->getMessage());
  }

  public function verify_login_invalid_password() {
    print 'should return error when we input wrong password';
    print "\n";
    $this->login('tomsmith', 'SuperSecretPassword');
    $this->assertContains($this->wrong_password_msg, $this->getMessage());
  }

  public function verify_login_successfully() {
    print 'should run test successfully with correct username and password';
    print "\n";
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
