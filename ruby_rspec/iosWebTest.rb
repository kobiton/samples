require "selenium-webdriver"
require_relative "configs" 

describe "iOS Web Test" do

  before(:all) do
    caps = DesiredCapabilities.new
    @driver = Selenium::WebDriver.for(:remote,
      :url => caps.desired_caps_ios_web[:url],
      :desired_capabilities => caps.desired_caps_ios_web[:caps])
  end
    
  after(:all) do
    @driver.quit
  end 

  it "wrong username" do
    wrong_username_msg = 'Your username is invalid!'
    puts 'Test case 1: it should return error when we input wrong username'
    login('foo', 'SuperSecretPassword!')
    expect(get_message).to include(wrong_username_msg)
  end

  it "wrong password" do
    wrong_password_msg = 'Your password is invalid!'
    puts 'Test case 2: it should return error when we input wrong password'
    login('tomsmith', 'SuperSecretPassword')
    expect(get_message).to include(wrong_password_msg)
  end

  it "login successfully" do
    success_msg = 'You logged into a secure area!'
    puts 'Test case 3: it should run test successfully with correct username and password'
    login('tomsmith', 'SuperSecretPassword!')
    expect(get_message).to include(success_msg)
  end
end

def login(username, password)
  sleep(5)
  @driver.navigate.to('http://the-internet.herokuapp.com/login')
  @driver.find_element(:id, 'username').send_keys(username)
  @driver.find_element(:id, 'password').send_keys(password)
  @driver.find_element(:xpath, "//form[@name='login']").submit
end

def get_message
  return @driver.find_element(:id, 'flash').text
end


