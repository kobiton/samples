require 'rubygems'
require 'test/unit'
require 'appium_lib'
require 'selenium-webdriver'
require './configs.rb'
extend Test::Unit::Assertions

class AndroidAppTest < Test::Unit::TestCase

  def setup
    desire_cap = DesiredCapabilities.new
    @driver = Appium::Driver.new(desire_cap.desired_caps_android_app)
    @driver.start_driver.manage.timeouts.implicit_wait = 120
    @wait = Selenium::WebDriver::Wait.new(:timeout => 120)
  end

  def teardown
    if !@driver.nil?
      begin
        @driver.driver_quit
      rescue Exception => e
        puts e.message
      ensure
        @driver.driver_quit
      end
    end
  end

  def test_android_app
    verify_search_questions_on_acura_support_community
    verify_search_iFixit_on_home_screen
  end

  def verify_search_questions_on_acura_support_community
    first_question = 'Acura MDX'
    second_question = 'Cruise Control'
    puts 'Test case 1: it should allow to search some questions on Acura Support Community'

=begin
    Steps:
     1. Click on "Car and Truck" Categories on Homepage
     2. Click on "Acura" Categories
    Expected:
     1. General Information is "Acura".
     2.Verify five devices below displays.
     + Acura Integra
     + Acura MDX
     + Acura RL
     + Acura TL
     + Acura TSX
=end

    @driver.find_element(:xpath, "//*[@resource-id='android:id/home']").click
    sleep 5
    @driver.find_element(:xpath, "//*[@text='Car and Truck']").click
    @driver.find_element(:xpath, "//*[@text='Acura']").click
    sleep 5

    acura_text = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]").text
    acura_integra_text = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=3]").text
    acura_mdx_text = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=4]").text
    acura_rl_text = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=5]").text
    acura_tl_text = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=6]").text
    acura_tsx_text = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=7]").text

    assert_equal(acura_text, 'Acura')
    assert_equal(acura_integra_text, 'Acura Integra')
    assert_equal(acura_mdx_text, 'Acura MDX')
    assert_equal(acura_rl_text, 'Acura RL')
    assert_equal(acura_tl_text, 'Acura TL')
    assert_equal(acura_tsx_text, 'Acura TSX')

=begin
    Steps:
     1. Click on "Acura" General Information
     2. Swipe from left to right, it will move to Answers tab
     3. Enter keyword 'Acura MDX'
     4. Click Search icon
    Expected: It should show at least 6 results.
=end

    get_attr_name1 = search_question(first_question)
    sleep 2

=begin
    Steps:
     1. Clear text on Search field
     2. Enter keyword 'Cruise Control'
     3. Click on Search icon
     4. Wait a few seconds to get returned result
     5. Close app
    Expected: It should show at least 1 result.
=end

    @driver.driver.navigate.back
    get_attr_name2 = search_question(second_question)
    sleep 2
    @driver.close_app
    get_attr_name1 = get_attr_name1.gsub(/[^0-9]/, '')
    assert_true(get_attr_name1.to_i >= 6, "The expected results are greater or equal to 6 results but the actual results are #{get_attr_name1}.")
    get_attr_name2 = get_attr_name2.gsub(/[^0-9]/, '')
    assert_true(get_attr_name2.to_i >= 1, "The expected results are greater or equal to 1 results but the actual results are #{get_attr_name2}.")
  end

  def verify_search_iFixit_on_home_screen
    puts 'Test case 2: it should allow to search iFixit on Home screen'
    
=begin
     Steps:
     1. Reopen iFixit app
     2. Click Search menu on the left menu bar
     3. Search keyword 'Macbook Pro 2015'
     4. Press Enter button on keyboard
    Expected: It should show at least 48 results.
     5. Select Devices item on the Guides/Devices dropdown
    Expected: It should show at least 5 results.
=end
   
    @driver.launch_app
    sleep 2
    @driver.find_element(:xpath, "//*[@text='Search']").click
    @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/abs__search_src_text']")
    .send_keys('Macbook Pro 2015')
    @driver.press_keycode(66);
    sleep 2
    first_result = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/search_result_count']").text
    @driver.find_element(:xpath, "//*[@resource-id='android:id/text1' and @text='Guides']").click
    @driver.find_element(:xpath, "//*[@resource-id='android:id/text1' and @text='Devices']").click

    second_result = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/search_result_count']").text

    first_result = first_result.gsub(/[^0-9]/, '')
    assert_true(first_result.to_i >= 47, "The expected results are greater or equal to 47 results but the actual results are #{first_result}.")
    second_result = second_result.gsub(/[^0-9]/, '')
    assert_true(second_result.to_i >= 5 , "The returned results are greater or equal to 5 results but the actual results are #{second_result}.")
  end

  def swipe(direction)
    # Get the size of screen.
    size = @driver.window_size
    startx = (size.width * 0.90).to_i
    # Find endx point which is at left side of screen.
    endx = (size.width * 0.09).to_i
    # Find vertical point where you wants to swipe. It is in middle of screen height.
    starty = (size.height / 2).to_i
    if direction == 'RightLeft'
      # Swipe from Right to Left.
      @driver.swipe({
          :start_x => startx,
          :start_y => starty,
          :end_x => endx,
          :end_y => starty,
          :duration => 200
      })
    end
    if direction == 'LeftRight'
      # Swipe from Left to Right.
      @driver.swipe({
          :start_x => endx,
          :start_y => starty,
          :end_x => startx,
          :end_y => starty,
          :duration => 200
      })
    end
    sleep 5
  end

  def search_question(question)
    @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]").click
    sleep 2
    has_image = @driver.find_element(:id, "com.dozuki.ifixit:id/topic_info_image").displayed?
    assert_equal(has_image, true)
    swipe('RightLeft')
    @wait.until {@driver.find_element(:id, 'answersSearch')}.displayed?
    @driver.find_element(:id, 'answersSearch').send_keys(question)
    @driver.find_element(:id, 'searchIcon').click
    @wait.until {@driver.find_element(:xpath, "//android.view.View[contains(@content-desc,'Acura questions')]")}.displayed?
    results = @driver.find_element(:xpath, "//android.view.View[contains(@content-desc,'questions') and @index=1]").attribute('name')
    sleep 2
    return results
  end

end
