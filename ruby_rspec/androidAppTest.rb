require "appium_lib"
require_relative "configs" 
require "selenium-webdriver"


describe "Android App Test" do

  before(:all) do
      caps = DesiredCapabilities.new
      @driver = Appium::Driver.new({:caps => caps.desired_caps_android_app[:caps], :appium_lib =>{ :server_url => caps.desired_caps_android_app[:url]}},true).start_driver()
      @driver.manage.timeouts.implicit_wait = 300
  end

  after(:all) do
        @driver.quit
  end   

	first_question = 'Acura MDX'
  second_question = 'Cruise Control'

	it "Search questions on Acura Support Community" do
      puts "Test case 1: it should allow to search some questions on Acura Support Community"
		  @driver.find_element(:xpath, "//*[@resource-id='android:id/home']").click
      sleep 5
	    @driver.find_element(:xpath, "//*[@text='Car and Truck']").click
      sleep 5
	    @driver.find_element(:xpath, "//*[@text='Acura']").click


	    acura_text = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]").text
	    acura_integra_text = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=3]").text
	    acura_mdx_text = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=4]").text
	    acura_rl_text = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=5]").text
	    acura_tl_text = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=6]").text
	    acura_tsx_text = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=7]").text


      expect(acura_text).to eq('Acura')
      expect(acura_integra_text).to eq('Acura Integra')
      expect(acura_mdx_text).to eq('Acura MDX')
      expect(acura_rl_text).to eq('Acura RL')
      expect(acura_tl_text).to eq('Acura TL')
      expect(acura_tsx_text).to eq('Acura TSX')

      @driver.close_app

	end

  it "verify_search_iFixit_on_home_screen" do
      puts 'Test case 2: it should allow to search iFixit on Home screen'
      @driver.launch_app
      sleep 5
      @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/action_search']").click
      @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/abs__search_src_text']").send_keys('Macbook Pro 2015')
      @driver.press_keycode(66);
      sleep 5
      first_result = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/search_result_count']").text
      @driver.find_element(:xpath, "//*[@resource-id='android:id/text1' and @text='Guides']").click
      @driver.find_element(:xpath, "//*[@resource-id='android:id/text1' and @text='Devices']").click

      second_result = @driver.find_element(:xpath, "//*[@resource-id='com.dozuki.ifixit:id/search_result_count']").text
      
      first_result = first_result.gsub(/[^0-9]/, '')
      second_result = second_result.gsub(/[^0-9]/, '')
  
      expect(first_result.to_i).to be >= 72
      expect(second_result.to_i).to be >= 5
  end
end
    
    