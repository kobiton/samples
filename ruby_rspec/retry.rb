require 'rspec/retry'
require "net/http"

RSpec.configure do |config|
	config.before(:each) do
	config.default_retry_count = 3
  # Only retry when Selenium raises Net::ReadTimeout
	config.exceptions_to_retry = [Net::ReadTimeout] 
	end
end