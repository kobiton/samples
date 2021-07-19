require 'appium_lib_core'
require 'appium_flutter_finder'
require 'rubygems'
require 'test/unit'
require 'appium_lib'
require 'minitest/autorun'
require './configs.rb'
require 'appium_lib_core/common/device/context.rb'

class ExampleTests < Minitest::Test
  include ::Appium::Flutter::Finder
  
  def test_run_example_ios_scenario
    desire_cap = DesiredCapabilities.new
    @core = ::Appium::Core.for(desire_cap.desired_caps_android_app)
    @driver = @core.start_driver
    @wait = Selenium::WebDriver::Wait.new(:timeout => 120)
  
    counterTextFinder = Appium::Flutter::Element.new(
      @driver,
      finder: by_value_key('counter')
    )
    buttonFinder = Appium::Flutter::Element.new(
      @driver,
      finder: by_value_key('increment')
    )

    @wait.until { @driver.set_context 'NATIVE_APP' }
   
    @wait.until { @driver.save_screenshot('./native-screenshot.png') }

    @wait.until { @driver.set_context 'FLUTTER'}
   
    @wait.until { buttonFinder.click()}

    @wait.until { @driver.save_screenshot('./flutter-screenshot.png') }

    @wait.until {buttonFinder.click() }
    
    @wait.until {@driver.save_screenshot('./flutter-tab.png') }

    puts counterTextFinder.text()
    assert_equal '2', counterTextFinder.text()

    puts 'BYE'

   @driver.quit
  end
end
