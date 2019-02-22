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
    @driver = Appium::Driver.new(desired_caps, false)

    begin
      @driver.start_driver
      puts "https://portal.kobiton.com/sessions/#{@driver.driver.capabilities['kobitonSessionId']}"
      @element = @driver.find_element(:class_name, 'android.widget.TextView')
      assert_equal('API DEMOS', @element.text.upcase)
    ensure
      @driver.driver.quit
    end
  end
end
