<?php
class SampleTest extends PHPUnit_Framework_TestCase {

  protected $driver;
  protected $SERVER_URL_LOCAL = 'http://127.0.0.1:4723/wd/hub';
  protected $USER_NAME = 'tester01';
  protected $API_KEY = '13e36639-92e3-411b-a067-3457b5dea573';
  protected $HOST_NAME = 'test.kobiton.com';
  protected $PORT = '3001';
  protected $GOOGLE_URL = 'https://mail.google.com';
  protected $GOOGLE_URL_HOMEPAGE = 'https://mail.google.com/mail/mu/mp/4/#tl/priority/%5Esmartlabel_personal';
  protected $TRASH_URL = 'https://mail.google.com/mail/mu/mp/4/#tl/Trash';
  protected $SENT_EMAIL_URL='https://mail.google.com/mail/mu/mp/68/#tl/Sent%20Mail';
  protected $PRIMARY_EMAIL_URL='https://mail.google.com/mail/mu/mp/68/#tl/priority/%5Esmartlabel_personal';
  protected $EMAIL_ADDRESS1 = 'krypton.portal@gmail.com';
  protected $EMAIL_ADDRESS2 = 'krypton.portal2@gmail.com';
  protected $PASSWORD = 'Admin@123456';
  protected $SUBJECT1 = 'It is a subject';
  protected $BODY1 = 'It is a body';
  protected $MSG_NOEMAIL = 'You have no mail here.';
  protected $MSG_NOEMAIL_PRIMARY1 = 'You have no mail.';
  protected $MSG_NOEMAIL_PRIMARY2 = 'Please enjoy your day!';

  public function setUp() {
    $capabilities=array(
    'browserName' => 'Chrome',
    'platformVersion' => '5.1.1',
    'platformName' => 'Android',
    'deviceName' => 'Nexus 5'
    );
    print_r($capabilities);
    $SERVER_URL = $this->USER_NAME . ':' . $this->API_KEY . '@' . $this->HOST_NAME .':' . $this->PORT . '/wd/hub';
    print_r($SERVER_URL);
    $this->driver = RemoteWebDriver::create($SERVER_URL, $capabilities);
    $this->driver->manage()->timeouts()->implicitlyWait(3000);
    $this->driver->manage()->deleteAllCookies();
  }

  public function test_should_not_accept_empty_or_invalid_email() {
    print_r("should not accept empty or invalid email");
    $this->driver->get($this->GOOGLE_URL);
    $this->driver->findElement(WebDriverBy::id("next"))->click();
    sleep(1);
    $getText = $this->driver->findElement(WebDriverBy::id("errormsg_0_Email"))->getText();
    $this->assertEquals($getText, 'Please enter your email.');
    $this->driver->findElement(WebDriverBy::id("Email"))->sendKeys('invalid_email@where.about');
    $this->driver->findElement(WebDriverBy::id("next"))->click();
    sleep(1);
    $getText = $this->driver->findElement(WebDriverBy::id("errormsg_0_Email"))->getText();
    $this->assertEquals($getText, "Sorry, Google doesn't recognize that email. Create an account using that address?");
  }

  public function test_should_accept_valid_credentials() {
    print_r("should accept valid credentials");
    $this->login($this->EMAIL_ADDRESS1, $this->PASSWORD);
    $this->assertContains('https://mail.google.com/mail',$this->driver->getCurrentURL());
  }

  public function test_should_compose_email_successfully()
  {
    print_r("should accept compose email successfully");
      $this->login($this->EMAIL_ADDRESS1, $this->PASSWORD);
      $this->compose_email($this->EMAIL_ADDRESS2, $this->SUBJECT1, $this->BODY1);
      $this->verify_sent_email($this->SUBJECT1, $this->BODY1, $this->EMAIL_ADDRESS1, $this->EMAIL_ADDRESS2);
      $this->delete_sent_email();
      $this->delete_trash_email();
      $this->logout();
      $this->login($this->EMAIL_ADDRESS2, $this->PASSWORD);
      $this->verify_primary_email($this->SUBJECT1, $this->BODY1, $this->EMAIL_ADDRESS1, $this->EMAIL_ADDRESS2);
      $this->delete_primary_email();
      $this->delete_trash_email();
  }

  protected function login($username, $password)
  {
    $this->driver->get($this->GOOGLE_URL);
    $this->driver->findElement(WebDriverBy::id("Email"))->sendKeys($username);
    $this->driver->findElement(WebDriverBy::id("next"))->click();
    sleep(1);
    $this->driver->findElement(WebDriverBy::id("Passwd"))->sendKeys($password);
    $this->driver->findElement(WebDriverBy::id("signIn"))->click();
    sleep(10);
  }

  protected function logout()
  {
    $this->driver->get($this->PRIMARY_EMAIL_URL);
    $this->driver->findElement(WebDriverBy::xpath("//div[@aria-label='Menu']"))->click();
    sleep(1);
    $this->driver->findElement(WebDriverBy::xpath("//div[contains(@class,'V Y Rx Kg')]"))->click();
    sleep(1);
    $this->driver->findElement(WebDriverBy::xpath("//button[@id='signout']"))->click();
    sleep(5);
    $this->driver->get($this->GOOGLE_URL);
    $this->driver->manage()->deleteAllCookies();
    $this->driver->navigate()->refresh();
  }

  protected function compose_email($toEmail, $subject, $body)
  {
    $this->driver->findElement(WebDriverBy::xpath("//div[@id='views']//div[@aria-label='Compose']"))->click();
    sleep(1);
    $this->driver->findElement(WebDriverBy::xpath("//div[@id='cmcc_composeto']//input[@id='composeto']"))->sendKeys($toEmail);
    $this->driver->findElement(WebDriverBy::xpath("//input[@id='cmcsubj']"))->sendKeys($subject);
    $this->driver->findElement(WebDriverBy::id("cmcbody"))->sendKeys($body);
    sleep(2);
    $this->driver->findElement(WebDriverBy::xpath("//div[@id='views']//div[text()='Send']"))->click();
    sleep(1);
  }

  protected function verify_sent_email($subject, $body, $sendEmail, $toEmail)
  {
    $this->driver->findElement(WebDriverBy::xpath("//div[@aria-label='Menu']"))->click();
    sleep(2);
    $this->driver->findElement(WebDriverBy::xpath("//span[text()='Sent Mail']"))->click();
    sleep(2);
    $getText = $this->driver->findElement(WebDriverBy::xpath("//div[@class='fm']"))->getText();

    $this->assertContains($subject,$getText);
    $this->assertContains($body,$getText);

    $this->driver->findElement(WebDriverBy::xpath("//div[contains(@class,'m')]//div[@role='listitem'][1]"))->click();
    sleep(1);
    $this->driver->findElement(WebDriverBy::xpath("//div[contains(@class,'V j hj') and text()='Details']"))->click();
    $getSubject = $this->driver->findElement(WebDriverBy::xpath("//span[@class='kj']/span"))->getText();
    $getBody = $this->driver->findElement(WebDriverBy::xpath("//div[@class='Hi']"))->getText();
    $getSendEmail = $this->driver->findElement(WebDriverBy::xpath("//div[@class='Kg']/span"))->getText();
    $getToEmail = $this->driver->findElement(WebDriverBy::xpath("//div[@class='Kh']//span[@class='Hh']//span[@class='Kg ph']"))->getText();

    $this->assertContains($subject,$getSubject);
    $this->assertContains($body,$getBody);
    $this->assertContains($sendEmail,$getSendEmail);
    $this->assertContains($toEmail,$getToEmail);
  }

  protected function verify_primary_email($subject, $body, $sendEmail, $toEmail)
  {
    $this->driver->get($this->GOOGLE_URL_HOMEPAGE);
    sleep(2);
    $getText = $this->driver->findElement(WebDriverBy::xpath("//div[@class='fm']"))->getText();

    $this->assertContains($subject,$getText);
    $this->assertContains($body,$getText);

    $this->driver->findElement(WebDriverBy::xpath("//div[contains(@class,'fm')]//div[@role='listitem'][1]"))->click();
    sleep(1);
    $this->driver->findElement(WebDriverBy::xpath("//div[contains(@class,'V j hj') and text()='Details']"))->click();
    $getSubject = $this->driver->findElement(WebDriverBy::xpath("//span[@class='kj']/span"))->getText();
    $getBody = $this->driver->findElement(WebDriverBy::xpath("//div[@class='Hi']"))->getText();
    $getSendEmail = $this->driver->findElement(WebDriverBy::xpath("//div[@class='Kg']/span"))->getText();
    $getToEmail = $this->driver->findElement(WebDriverBy::xpath("//div[@class='Kh']//span[@class='Hh']//span[@class='Kg ph']"))->getText();

    $this->assertContains($subject,$getSubject);
    $this->assertContains($body,$getBody);
    $this->assertContains($sendEmail,$getSendEmail);
    $this->assertContains($toEmail,$getToEmail);
  }

  protected function delete_sent_email()
  {
    $this->driver->get($this->SENT_EMAIL_URL);
    sleep(2);
    $this->driver->findElement(WebDriverBy::xpath("//div[@class='V j cb Ol'][1]"))->click();
    sleep(1);
    $this->driver->findElement(WebDriverBy::xpath("//div[@class='M j T b hc  Vm Im']//div[@class='V j Xd']"))->click();
    sleep(1);
    $noEmailSentEmail = $this->driver->findElement(WebDriverBy::xpath("//div[@class='Wl']"))->getText();

    $this->assertEquals($this->MSG_NOEMAIL,$noEmailSentEmail);
  }

  protected function delete_trash_email()
  {
    $this->driver->get($this->TRASH_URL);
    sleep(2);
    $this->driver->findElement(WebDriverBy::xpath("//div[@class='V j cb Ol'][1]"))->click();
    sleep(1);
    $this->driver->findElement(WebDriverBy::xpath("//div[@class='M j T b hc q m']//div[text()='Delete forever']"))->click();
    sleep(1);
    $noEmailTrash = $this->driver->findElement(WebDriverBy::xpath("//div[@class='Wl']"))->getText();

    $this->assertEquals($this->MSG_NOEMAIL,$noEmailTrash);
  }

  protected function delete_primary_email()
  {
    $this->driver->get($this->PRIMARY_EMAIL_URL);
    sleep(2);
    $this->driver->findElement(WebDriverBy::xpath("//div[@class='V j cb Ol'][1]"))->click();
    sleep(1);
    $this->driver->findElement(WebDriverBy::xpath("//div[@class='M j T b hc  Vm Im']//div[@class='V j Xd']"))->click();
    sleep(1);
    $noEmailPrimary = $this->driver->findElement(WebDriverBy::xpath("//div[@class='Wl']"))->getText();

    $this->assertContains($this->MSG_NOEMAIL_PRIMARY1,$noEmailPrimary);
    $this->assertContains($this->MSG_NOEMAIL_PRIMARY2,$noEmailPrimary);
  }

  public function tearDown() {
    if ($this->driver) {
      $this->driver->quit();
      sleep(10);
    }
    parent::tearDown();
  }
}
