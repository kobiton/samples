require 'uri'
require 'net/http'
require 'json'
require 'base64'

username = ''
apiKey = ''
encodeAuth = 'Basic ' + Base64.encode64(username + ':' + apiKey).gsub("\n", '')

url = URI('https://api.kobiton.com/hub/session')

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::Post.new(url)
request['Content-Type'] = 'application/json'
request['Authorization'] = encodeAuth
request['Accept'] = 'application/json'

configuration = {
  'configuration': {
    :sessionName =>        'Automation test session',
    :sessionDescription => 'This is an example for XCUITest testing',      
    :deviceName =>         '*',
    :platformVersion =>    '*',  
    :deviceGroup =>        'KOBITON',
    :app =>                'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/XCUITestSample.ipa',
    :testRunner =>         'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/XCUITestSampleUITestRunner.ipa', 
    :testFramework =>      'XCUITEST',
    :sessionTimeout =>     30,

    # The user can specifically test running via testPlan or tests
    # If the testPlan and tests are set, the test framework will auto-select the testPlan first
    :tests =>               [],
    :testPlan =>           'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/sample.xctestplan'
  }
}

configuration_json = configuration.to_json
request.body = configuration_json
response = https.request(request)
puts response.read_body
