require 'rubygems'
require 'test/unit'
require 'appium_lib'

class AndroidTests < Test::Unit::TestCase
  USER_NAME = 'tester01'
  API_KEY = '13e36639-92e3-411b-a067-3457b5dea573'
  HOST_NAME = 'ec2-54-226-177-179.compute-1.amazonaws.com'
  PORT = '3001'
  GOOGLE_URL = 'https://mail.google.com'
  GOOGLE_URL_HOMEPAGE = 'https://mail.google.com/mail/mu/mp/4/#tl/priority/%5Esmartlabel_personal'
  TRASH_URL = 'https://mail.google.com/mail/mu/mp/4/#tl/Trash'
  SENT_EMAIL_URL='https://mail.google.com/mail/mu/mp/68/#tl/Sent%20Mail'
  PRIMARY_EMAIL_URL='https://mail.google.com/mail/mu/mp/68/#tl/priority/%5Esmartlabel_personal'
  EMAIL_ADDRESS1 = 'krypton.portal@gmail.com'
  EMAIL_ADDRESS2 = 'krypton.portal2@gmail.com'
  PASSWORD = 'Admin@123456'
  SUBJECT1 = 'It is a subject'
  BODY1 = 'It is a body'
  MSG_NOEMAIL = 'You have no mail here.'
  MSG_NOEMAIL_PRIMARY1 = 'You have no mail.'
  MSG_NOEMAIL_PRIMARY2 = 'Please enjoy your day!'
  SERVER_URL_LOCAL='http://127.0.0.1:4723/wd/hub'

  def define_url
    url = "http://" + USER_NAME + ":" + API_KEY + "@" + HOST_NAME + ":" + PORT + "/v1/tests"
    return url
  end

    def setup
      #puts(define_url)
        desired_caps = {
            caps:       {
            'browserName'=> 'Chrome',
            'platformVersion' => '5.1.1',
            'platformName' => 'Android',
            'deviceName' => 'Nexus 5'
            },
            appium_lib: {
                server_url: SERVER_URL_LOCAL
            }
        }
        @driver = Appium::Driver.new(desired_caps)
        @driver.start_driver.manage.timeouts.implicit_wait = 30
        @driver.driver.manage.timeouts.page_load = 30
        @driver.driver.manage.delete_all_cookies
    end

    def teardown
        unless @driver.driver.nil?
          @driver.driver.quit
          sleep(10)
        end
    end

  def test_should_not_accept_empty_or_invalid_email
      @driver.driver.navigate.to(GOOGLE_URL)
      sleep(3)
      @driver.find_element(:id, 'next').click
      sleep(3)
      getText = @driver.find_element(:id, 'errormsg_0_Email').text()
      assert_equal(getText, 'Please enter your email.')
      @driver.find_element(:id, 'Email').send_keys 'invalid_email@where.about'
      @driver.find_element(:id, 'next').click
      sleep(3)
      getText = @driver.find_element(:id, 'errormsg_0_Email').text()
      assert_equal(getText, "Sorry, Google doesn't recognize that email. Create an account using that address?")
  end

  def test_should_accept_valid_credentials
      @driver.driver.navigate.to(GOOGLE_URL)
      sleep(3)
      @driver.find_element(:id, 'Email').send_keys EMAIL_ADDRESS1
      @driver.find_element(:id, 'next').click
      sleep(1)
      @driver.find_element(:id, 'Passwd').send_keys PASSWORD
      @driver.find_element(:id, 'signIn').click
      sleep(10)
      getURL=@driver.driver.current_url
      assert_equal(true,(getURL.include? 'https://mail.google.com/mail'))
  end

  def test_should_compose_email_successfully_by_Gmail1
      login EMAIL_ADDRESS1, PASSWORD
      compose_email EMAIL_ADDRESS2, SUBJECT1, BODY1
      verify_sent_email SUBJECT1, BODY1, EMAIL_ADDRESS1, EMAIL_ADDRESS2
      delete_sent_email
      delete_trash_email
      logout
      login EMAIL_ADDRESS2, PASSWORD
      verify_primary_email SUBJECT1, BODY1, EMAIL_ADDRESS1, EMAIL_ADDRESS2
      delete_primary_email
      delete_trash_email
  end

  def login(username, password)
    @driver.driver.navigate.to(GOOGLE_URL)
    sleep(3)
    @driver.find_element(:id, 'Email').send_keys username
    @driver.find_element(:id, 'next').click
    sleep(1)
    @driver.find_element(:id, 'Passwd').send_keys password
    @driver.find_element(:id, 'signIn').click
    sleep(10)
  end

  def logout
    @driver.driver.navigate.to(PRIMARY_EMAIL_URL)
    sleep(3)
    @driver.find_element(:xpath, "//div[@aria-label='Menu']").click
    sleep(1)
    @driver.find_element(:xpath, "//div[contains(@class,'V Y Rx Kg')]").click
    sleep(1)
    @driver.find_element(:xpath, "//button[@id='signout']").click
    sleep(5)
    @driver.driver.navigate.to(GOOGLE_URL)
    @driver.driver.manage.delete_all_cookies
    @driver.driver.navigate.refresh
    sleep(5)
  end

  def compose_email(toEmail, subject, body)
    @driver.find_element(:xpath, "//div[@id='views']//div[@aria-label='Compose']").click
    sleep(1)
    @driver.find_element(:xpath, "//div[@id='cmcc_composeto']//input[@id='composeto']").send_keys toEmail
    @driver.find_element(:xpath, "//input[@id='cmcsubj']").send_keys subject
    @driver.find_element(:id, "cmcbody").send_keys body
    sleep(3)
    @driver.find_element(:xpath, "//div[@id='views']//div[text()='Send']").click
    sleep(1)
  end

  def verify_sent_email(subject, body, sendEmail, toEmail)
    @driver.find_element(:xpath, "//div[@aria-label='Menu']").click
    sleep(3)
    @driver.find_element(:xpath, "//span[text()='Sent Mail']").click
    sleep(3)
    getText = @driver.find_element(:xpath, "//div[@class='fm']").text()
    assert_equal(true,(getText.include? subject))
    assert_equal(true,(getText.include? body))
    @driver.find_element(:xpath, "//div[contains(@class,'m')]//div[@role='listitem'][1]").click
    sleep(1)
    @driver.find_element(:xpath, "//div[contains(@class,'V j hj') and text()='Details']").click
    getSubject = @driver.find_element(:xpath, "//span[@class='kj']/span").text()
    assert_equal(true,(getSubject.include? subject))
    getBody = @driver.find_element(:xpath, "//div[@class='Hi']").text()
    assert_equal(true,(getBody.include? body))
    getSendEmail = @driver.find_element(:xpath, "//div[@class='Kg']/span").text()
    assert_equal(true,(getSendEmail.include? sendEmail))
    getToEmail = @driver.find_element(:xpath, "//div[@class='Kh']//span[@class='Hh']//span[@class='Kg ph']").text()
    assert_equal(true,(getToEmail.include? toEmail))
  end

  def verify_primary_email(subject, body, sendEmail, toEmail)
    @driver.driver.navigate.to(GOOGLE_URL_HOMEPAGE)
    @driver.driver.navigate.refresh
    sleep(3)
    getText = @driver.find_element(:xpath, "//div[@class='fm']").text()
    assert_equal(true,(getText.include? subject))
    assert_equal(true,(getText.include? body))
    @driver.find_element(:xpath, "//div[contains(@class,'fm')]//div[@role='listitem'][1]").click
    sleep(5)
    @driver.find_element(:xpath, "//div[contains(@class,'V j hj') and text()='Details']").click
    getSubject = @driver.find_element(:xpath, "//span[@class='kj']/span").text()
    assert_equal(true,(getSubject.include? subject))
    getBody = @driver.find_element(:xpath, "//div[@class='Hi']").text()
    assert_equal(true,(getBody.include? body))
    getSendEmail = @driver.find_element(:xpath, "//div[@class='Kg']/span").text()
    assert_equal(true,(getSendEmail.include? sendEmail))
    getToEmail = @driver.find_element(:xpath, "//div[@class='Kh']//span[@class='Hh']//span[@class='Kg ph']").text()
    assert_equal(true,(getToEmail.include? toEmail))
  end

  def delete_sent_email
    @driver.driver.navigate.to(SENT_EMAIL_URL)
    sleep(2)
    @driver.find_element(:xpath, "//div[@class='V j cb Ol'][1]").click
    sleep(1)
    @driver.find_element(:xpath, "//div[@class='M j T b hc  Vm Im']//div[@class='V j Xd']").click
    sleep(1)
    noEmailSentEmail = @driver.find_element(:xpath, "//div[@class='Wl']").text()
    assert_equal(noEmailSentEmail, MSG_NOEMAIL)
  end

  def delete_trash_email
    @driver.driver.navigate.to(TRASH_URL)
    sleep(2)
    @driver.find_element(:xpath, "//div[@class='V j cb Ol'][1]").click
    sleep(1)
    @driver.find_element(:xpath, "//div[@class='M j T b hc q m']//div[text()='Delete forever']").click
    sleep(1)
    noEmailTrash = @driver.find_element(:xpath, "//div[@class='Wl']").text()
    assert_equal(noEmailTrash, MSG_NOEMAIL)
  end

  def delete_primary_email
    @driver.driver.navigate.to(PRIMARY_EMAIL_URL)
    sleep(2)
    @driver.find_element(:xpath, "//div[@class='V j cb Ol'][1]").click
    sleep(1)
    @driver.find_element(:xpath, "//div[@class='M j T b hc  Vm Im']//div[@class='V j Xd']").click
    sleep(1)
    noEmailPrimary = @driver.find_element(:xpath, "//div[@class='Wl']").text()
    assert_equal(true,(noEmailPrimary.include? MSG_NOEMAIL_PRIMARY1))
    assert_equal(true,(noEmailPrimary.include? MSG_NOEMAIL_PRIMARY2))
  end
end
