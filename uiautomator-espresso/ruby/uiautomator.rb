require "uri"
require "net/http"
require 'json'

url = URI("https://ngantlnguyentest:2ce59299-5c01-4f0d-80c2-eb8b0fbf8a3a@api-test.kobiton.com/hub/session")
# url = URI("https://api-test.kobiton.com/hub/session")

https = Net::HTTP.new(url.host, url.port);
https.use_ssl = true

request = Net::HTTP::Post.new(url)
# request["Authorization"] = "Basic bmdhbnRsbmd1eWVudGVzdDoyY2U1OTI5OS01YzAxLTRmMGQtODBjMi1lYjhiMGZiZjhhM2E="
request["Content-Type"] = "application/json"

temp = {
    "configuration": {
        "sessionName": "Automation test session",
        "sessionDescription": "",
        "noReset": true,
        "fullReset": false,
        "deviceName": "*",
        "deviceGroup": "KOBITON",
        "testRunner": "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/nguyenha/androidTestFail.aab",
        "app": "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/nguyenha/androidApp.apk",
        "sessionTimeout": 60,
        "testTimeout": 3,
        "retryTimes": 2,
        "testPackage": "com.example.android.testing.uiautomator.BasicSample.test",
        "runnerClass": "androidx.test.runner.AndroidJUnitRunner",
        "tests": [
            "ChangeTextBehaviorTest#testChangeText_sameActivity -e perf",
            "ChangeTextBehaviorTest",
            "ChangeTextBehaviorTest#testChangeText_sameActivity"
        ]
    }
}

configuration = temp.to_json


request.body = configuration

response = https.request(request)
puts response.read_body
