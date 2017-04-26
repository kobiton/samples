require 'rubygems'
require 'test/unit'
require 'appium_lib'
require_relative './data/Device'
require_relative './config/config'

class IOSWebTest < Test::Unit::TestCase
  def test_should_search_Google
    device = getABookableDevice 'iOS'
    options = {
      browserName: 'Safari'
    }
    desired_caps = getWebCapabilitiesFor device, options

    @driver = Appium::Driver.new(desired_caps)
    @driver.start_driver
    @driver.driver.navigate.to('https://www.google.com')
    @driver.find_element(:name, 'q').send_keys('Kobiton.com')
    @driver.find_element(:name, 'btnG').click
    sleep(3)
    assert_equal(true, (@driver.driver.title.include? 'Kobiton.com'))
    @driver.driver.quit
  end
end
