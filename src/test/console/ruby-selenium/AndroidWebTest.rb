require 'rubygems'
require 'test/unit'
require 'selenium-webdriver'
require_relative './data/device'
require_relative './config/config'

class AndroidWebTest < Test::Unit::TestCase
  def test_should_search_Google
    device = getABookableDevice 'Android'
    options = {
      browserName: 'chrome'
    }
    serverUrl = getServerUrl
    desired_caps = getWebCapabilitiesFor device, options

    begin
      @driver = Selenium::WebDriver.for :remote,  url: serverUrl, desired_capabilities: desired_caps[:caps]
      @driver.navigate.to('https://www.google.com')
      @driver.find_element(:name, 'q').send_keys('Kobiton.com')
      @driver.find_element(:name, 'btnG').click
      sleep(3)
      assert_equal(true, (@driver.title.include? 'Kobiton.com'))
    ensure
      if !@driver.nil?
        @driver.quit
      end
    end
  end
end
