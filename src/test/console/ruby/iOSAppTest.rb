require 'rubygems'
require 'test/unit'
require 'appium_lib'
require_relative './data/Device'
require_relative './config/config'

class IOSAppTest < Test::Unit::TestCase
  def test_should_compute_sum
    device = getABookableDevice 'iOS'

    options = {
      bundleId: 'io.appium.TestApp',
      app: 'http://appium.github.io/appium/assets/TestApp7.1.app.zip', # Need to re-sign app from External Developer
    }
    desired_caps = getAppCapabilitiesFor device, options
    puts desired_caps

    @x = rand(1..10)
    @y = rand(1..10)
    @sum = @x + @y

    @driver = Appium::Driver.new(desired_caps)
    @driver.start_driver
    @driver.find_element(:name, 'IntegerA').send_keys(@x)
    @driver.find_element(:name, 'IntegerB').send_keys(@y)
    @driver.find_element(:name, 'Done').click
    @driver.find_element(:name, 'ComputeSumButton').click
    sleep(1)
    @element = @driver.find_element(:name, 'Answer')
    assert_equal(@sum.to_s, @element.text)
    @driver.driver.quit
  end
end
