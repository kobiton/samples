require 'rubygems'
require 'test/unit'
require 'appium_lib'
require_relative '../../data/Device'
require_relative '../../config/config'

class AndroidWebTest < Test::Unit::TestCase
  def test_should_navigate_to_heroku
    device = getABookableDevice 'Android'
    options = {
      browserName: 'chrome'
    }
    desired_caps = getWebCapabilitiesFor device, options
    @driver = Appium::Driver.new(desired_caps, false)
    
    begin
      @driver.start_driver
      puts "https://portal.kobiton.com/sessions/#{@driver.driver.capabilities['kobitonSessionId']}"
      @driver.driver.navigate.to('http://the-internet.herokuapp.com/login')
      @driver.find_element(:id, 'username').send_keys('tomsmith')
      @driver.find_element(:id, 'password').send_keys('SuperSecretPassword!')
      @driver.find_element(:xpath, "//form[@name='login']").submit
    ensure
      @driver.driver.quit
    end
  end
end
