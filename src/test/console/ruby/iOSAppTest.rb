require 'rubygems'
require 'test/unit'
require 'appium_lib'
require_relative './data/Device'
require_relative './config/config'

class IOSAppTest < Test::Unit::TestCase
  def test_should_compute_sum
    device = getABookableDevice 'iOS'

    options = {
      app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/UIKitCatalog-Test-Adhoc.ipa', # Need to re-sign app from External Developer
    }
    desired_caps = getAppCapabilitiesFor device, options
    puts desired_caps

    @driver = Appium::Driver.new desired_caps, false

    begin
      @driver.start_driver
      @driver.find_element(:xpath, '//*[@name="UIKitCatalog"]').click
    ensure
      @driver.driver.quit
    end
  end
end
