require 'rubygems'
require 'test/unit'
require 'selenium-webdriver'
require_relative '../../data/Device'
require_relative '../../config/config'

class IOSWebTest < Test::Unit::TestCase
  def test_should_navigate_to_heroku
    device = getABookableDevice 'iOS'
    options = {
      browserName: 'Safari'
    }
    serverUrl = getServerUrl
    desired_caps = getWebCapabilitiesFor device, options

    begin
      @driver = Selenium::WebDriver.for :remote,  url: serverUrl, desired_capabilities: desired_caps[:caps]
      @driver.manage().timeouts().implicit_wait = 100; #Seconds
      puts "https://portal.kobiton.com/sessions/#{@driver.capabilities['kobitonSessionId']}"
      @driver.navigate.to('http://the-internet.herokuapp.com/login')
      @driver.find_element(:id, 'username').send_keys('tomsmith')
      @driver.find_element(:id, 'password').send_keys('SuperSecretPassword!')
      @driver.find_element(:xpath, "//form[@name='login']").submit
    ensure
      if !@driver.nil?
        @driver.quit
      end
    end
  end
end
