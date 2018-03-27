require 'rubygems'
require 'test/unit'
require 'appium_lib'
require 'selenium-webdriver'
require './configs.rb'
extend Test::Unit::Assertions

class IOSWebTest < Test::Unit::TestCase

  def setup
    desire_cap = DesiredCapabilities.new
    @driver = Appium::Driver.new(desire_cap.desired_caps_ios_web)
    @driver.start_driver.manage.timeouts.implicit_wait = 60
  end

  def teardown
    if !@driver.nil?
      begin
        @driver.driver_quit
      rescue Exception => e
        puts e.message
      ensure
        @driver.driver_quit
      end
    end
  end

  def test_iFixit_iOS_web
    verify_invalid_username
    verify_invalid_password
    verify_login_successfully
  end

  def verify_invalid_username
    wrong_username_msg = 'Your username is invalid!'
    puts 'Test case 1: it should return error when we input wrong username'
    login('foo', 'SuperSecretPassword!')
    assert_true(true, (get_message.include? wrong_username_msg))
  end

  def verify_invalid_password
    wrong_password_msg = 'Your password is invalid!'
    puts 'Test case 2: it should return error when we input wrong password'
    login('tomsmith', 'SuperSecretPassword')
    assert_true(true, (get_message.include? wrong_password_msg))
  end

  def verify_login_successfully
    success_msg = 'You logged into a secure area!'
    puts 'Test case 3: it should run test successfully with correct username and password'
    login('tomsmith', 'SuperSecretPassword!')
    assert_true(true, (get_message.include? success_msg))
  end

  def login(username, password)
    @driver.driver.navigate.to('http://the-internet.herokuapp.com/login')
    @driver.find_element(:id, 'username').send_keys(username)
    @driver.find_element(:id, 'password').send_keys(password)
    @driver.find_element(:xpath, "//form[@name='login']").submit
  end

  def get_message
    return @driver.find_element(:id, 'flash').text
  end
  
end
