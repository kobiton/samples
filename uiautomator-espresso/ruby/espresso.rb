require 'uri'
require 'net/http'
require 'json'
require 'base64'

username = ''
apiKey = ''
encodeAuth   = 'Basic ' + Base64.encode64(username + ':' + apiKey)

url = URI('https://api.kobiton.com/hub/session')

https = Net::HTTP.new(url.host, url.port);
https.use_ssl = true

request = Net::HTTP::Post.new(url)
request['Content-Type'] = 'application/json'
request['Authorization'] = encodeAuth
request['Accept'] = 'application/json'

configuration = {
    'configuration': {
        'sessionName': 'Automation test session',
        'sessionDescription': 'This is an example for Espresso testing',
        'noReset': true,
        'fullReset': false,
        'deviceName': '*',
        'deviceGroup': 'KOBITON',
        'app': 'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/uiautomator-espresso/espresso-app.apk',
        'testRunner': 'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/uiautomator-espresso/espresso-test-runner.apk',
        'sessionTimeout': 30,
        'testTimeout': 10,
        'retryTimes': 3,
        'continueOnFailure': true,
        'tests': [
          'HintMatchersTest#hint_endsWith_Passed',
          'com.example.android.testing.espresso.CustomMatcherSample.test'
        ]
    }
}

configuration_json = configuration.to_json
request.body = configuration_json
response = https.request(request)
puts response.read_body
