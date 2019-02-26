require "appium_lib"
require_relative "configs" 
require "selenium-webdriver"

describe "iOS App Test" do

    before(:all) do
        caps = DesiredCapabilities.new
        @driver = Appium::Driver.new({:caps => caps.desired_caps_ios_app[:caps],
        :appium_lib =>{ :server_url => caps.desired_caps_ios_app[:url]}},true).start_driver()
        @driver.manage.timeouts.implicit_wait = 300
    end

    after(:all) do
        @driver.quit
    end 

    it 'Navigate to some devices on Acura Support Community' do
        puts "Test case 1: it should allow to search some questions on Acura Support Community"
        @driver.find_element(:xpath, "//XCUIElementTypeButton[@name='START A REPAIR']").click
        sleep 10
        @driver.find_element(:xpath, "//*[@name='Car and Truck']").click
        sleep 10
        @driver.find_element(:xpath, "//*[@name='Acura']").click

        acura_text = @driver.find_element(:xpath, "//XCUIElementTypeNavigationBar").attribute("name")

        has_acura_integra = @driver.find_element(:xpath, "//XCUIElementTypeStaticText[@name='Acura Integra']").displayed?
        has_acura_mdx = @driver.find_element(:xpath, "//XCUIElementTypeStaticText[@name='Acura MDX']").displayed?
        has_acura_rl = @driver.find_element(:xpath, "//XCUIElementTypeStaticText[@name='Acura RL']").displayed?
        has_acura_tl = @driver.find_element(:xpath, "//XCUIElementTypeStaticText[@name='Acura TL']").displayed?
        has_acura_tsx = @driver.find_element(:xpath, "//XCUIElementTypeStaticText[@name='Acura TSX']").displayed?

        expect(acura_text).to eq('Acura')
        expect(has_acura_integra).to eq(true)
        expect(has_acura_mdx).to eq(true)
        expect(has_acura_rl).to eq(true)
        expect(has_acura_tl).to eq(true)
        expect(has_acura_tsx).to eq(true)
        @driver.close_app
    end

    it 'Search iFixit on Home screen' do
        puts "Test case 2: it should allow to search iFixit on Home screen"
        @driver.launch_app
        sleep 10
        @driver.find_element(:xpath, "//XCUIElementTypeButton[@name='START A REPAIR']").click
        sleep 10

        @driver.find_element(:xpath, "//XCUIElementTypeSearchField[@name='Search']").send_keys('Macbook Pro 2015')
        first_result = @driver.find_elements(:xpath, "//XCUIElementTypeStaticText[contains(@label,'MacBook Pro')]")
        @driver.find_element(:xpath, "//XCUIElementTypeButton[@name='Cancel']").click

        @driver.find_element(:xpath, "//*[@name='Search']").click
        @driver.find_element(:xpath, "//XCUIElementTypeSearchField[@name='Search']").send_keys('Acura')
        @driver.find_element(:xpath, "//XCUIElementTypeButton[@name='Categories']").click

        second_result = @driver.find_elements(:xpath, "//XCUIElementTypeStaticText[contains(@label,'Acura')]")

        expect(first_result.size).to be >= 39
        expect(second_result.size).to be >= 20
    end
end

