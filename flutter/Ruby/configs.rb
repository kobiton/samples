USER_NAME = ""
API_KEY = ""

class DesiredCapabilities
 def desired_caps_android_app
  desired_caps = {
    :caps => {
      :sessionName =>        'Automation test session',
      :sessionDescription => '',
      :deviceOrientation =>  'portrait',
      :noReset =>            true,
      :fullReset =>          false,
      :captureScreenshots => true,
      :deviceGroup =>        'KOBITON',
      :deviceName =>         '*',
      :tagName =>            '',
      :platformName =>       'Android',
      :platformVersion =>    '*',
      :retry_backoff_time => 5000,
      :automationName => 'Flutter',
      :app => 'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/demo/app-debug-all.apk'
    },
    :appium_lib => {
      :server_url => "https://#{USER_NAME}:#{API_KEY}@api.kobiton.com/wd/hub",
      :wait_timeout => 20,
      :wait_interval => 1
    }.freeze
  }
   return desired_caps
 end

 def desired_caps_ios_app
   desired_caps = {
     :caps => {
       :sessionName =>        'iOS app',
       :sessionDescription => 'This is an example for iOS App testing', 
       :deviceOrientation =>  'portrait',  
       :captureScreenshots => true, 
       :deviceGroup =>        'KOBITON', 
       :deviceName =>         '*',
       :platformName =>       'iOS',
       :retry_backoff_time => 5000,
       :automationName => 'Flutter',
       :app => 'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/demo/Runner.zip'
     },
     :appium_lib => {
       :server_url => "https://#{USER_NAME}:#{API_KEY}@api-test.kobiton.com/wd/hub",
       :wait_timeout => 20,
       :wait_interval => 1
     }
   }.freeze
   return desired_caps
 end
end
