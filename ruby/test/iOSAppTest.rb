require 'rubygems'
require 'test/unit'
require 'appium_lib'
require 'selenium-webdriver'
require './configs.rb'
extend Test::Unit::Assertions

class IOSAppTest < Test::Unit::TestCase

  def setup
    desire_cap = DesiredCapabilities.new
    @driver = Appium::Driver.new(desire_cap.desired_caps_ios_app)
    @driver.start_driver.manage.timeouts.implicit_wait = 120
    @wait = Selenium::WebDriver::Wait.new(:timeout => 120)
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
  
  def test_iFixit_iOS_app
    verify_navigation_on_acura_support_community
    verify_search_iFixit_on_home_screen
  end

  def verify_navigation_on_acura_support_community
    puts 'Test case 1: it should allow to navigate to some devices on Acura Support Community'

=begin
     Steps:
      1. Click on "Car and Truck" Categories on Homepage
      2. Click on "Acura" Categories
     Expected:
      1. General Information is "Acura".
      2.Verify five devices below displays.
      + Acura Integra
      + Acura MDX
      + Acura RL
      + Acura TL
      + Acura TSX
=end

    @driver.find_element(:xpath, "//XCUIElementTypeButton[@name='START A REPAIR']").click
    sleep 2
    @driver.find_element(:xpath, "//*[@name='Car and Truck']").click
    @driver.find_element(:xpath, "//*[@name='Acura']").click
    sleep 2
    @wait.until {@driver.find_element(:xpath, "//XCUIElementTypeNavigationBar").displayed?}
    acura_text = @driver.find_element(:xpath, "//XCUIElementTypeNavigationBar").attribute("name")
    has_acura_integra = @driver.find_element(:xpath, "//XCUIElementTypeStaticText[@name='Acura Integra']").displayed?
    has_acura_mdx = @driver.find_element(:xpath, "//XCUIElementTypeStaticText[@name='Acura MDX']").displayed?
    has_acura_rl = @driver.find_element(:xpath, "//XCUIElementTypeStaticText[@name='Acura RL']").displayed?
    has_acura_tl = @driver.find_element(:xpath, "//XCUIElementTypeStaticText[@name='Acura TL']").displayed?
    has_acura_tsx = @driver.find_element(:xpath, "//XCUIElementTypeStaticText[@name='Acura TSX']").displayed?
    @driver.close_app
    assert_equal(acura_text, 'Acura')
    assert_equal(has_acura_integra, true)
    assert_equal(has_acura_mdx, true)
    assert_equal(has_acura_rl, true)
    assert_equal(has_acura_tl, true)
    assert_equal(has_acura_tsx, true)
  end

  def verify_search_iFixit_on_home_screen
    puts 'Test case 2: it should allow to search iFixit on Home screen'
    @driver.launch_app
    sleep 2
    @driver.find_element(:xpath, "//XCUIElementTypeButton[@name='START A REPAIR']").click
    sleep 2
    @wait.until {@driver.find_element(:xpath, "//XCUIElementTypeSearchField[@name='Search']").displayed?}
    @driver.find_element(:xpath, "//XCUIElementTypeSearchField[@name='Search']").send_keys('Macbook Pro 2015')
    sleep 2
    first_result = @driver
        .find_elements(:xpath, "//XCUIElementTypeStaticText[contains(@label,'MacBook Pro')]")
    @driver.find_element(:xpath, "//XCUIElementTypeButton[@name='Cancel']").click
    @driver.find_element(:xpath, "//*[@name='Search']").click
    @driver.find_element(:xpath, "//XCUIElementTypeSearchField[@name='Search']").send_keys('Acura')
    @driver.find_element(:xpath, "//XCUIElementTypeButton[@name='Categories']").click
    sleep 2
    second_result = @driver
        .find_elements(:xpath, "//XCUIElementTypeStaticText[contains(@label,'Acura')]")
    assert_true(first_result.size >= 33, "The expected results are greater or equal to 33 results but the actual results are #{first_result}.")
    assert_true(second_result.size >= 6, "The expected results are greater or equal to 6 results but the actual results are #{second_result}.")
  end
  
end
