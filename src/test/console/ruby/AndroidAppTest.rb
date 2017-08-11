require 'rubygems'
require 'test/unit'
require 'appium_lib'
require_relative './data/Device'
require_relative './config/config'

class AndroidAppTest < Test::Unit::TestCase
  def test_should_navigate_on_APIDemos_app
    device = getABookableDevice 'Android'

    options = {
      app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ApiDemos-debug.apk',
      appPackage: 'io.appium.android.apis',
      appActivity: '.ApiDemos'
    }
    desired_caps = getAppCapabilitiesFor device, options

    @driver = Appium::Driver.new(desired_caps)
    @driver.start_driver
    @element = @driver.find_element(:class_name, 'android.widget.TextView')
    assert_equal('API Demos', @element.text)
    @driver.find_element(:name, 'App').click
    @element = @driver.find_element(:name, 'Action Bar')
    assert_equal('Action Bar', @element.text)
    @element.click
    @element = @driver.find_element(:name, 'Action Bar Tabs')
    assert_equal('Action Bar Tabs', @element.text)
    @driver.driver.quit
  end
end
