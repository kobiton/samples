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
    @driver = Appium::Driver.new(desired_caps, false)

    begin
      @driver.start_driver
      puts "https://portal.kobiton.com/sessions/#{@driver.driver.capabilities['kobitonSessionId']}"
      @driver.find_element(:xpath, '//*[@name="UIKitCatalog"]').click
    ensure
      @driver.driver.quit
    end
  end
end
