USER_NAME = "kobitonadmin"
API_KEY = "c6d29894-9633-41ec-8346-dd77029998ab"

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
      
      # The given group is used for finding devices and the created session will be visible for all members within the group.
      :groupId =>            583, # Group: Im Group
      :deviceGroup =>        'ORGANIZATION',
      
      :deviceName =>         'Moto X Play',
    
      :tagName =>            '',
      :platformName =>       'Android',
      :platformVersion =>    '7.1.1',
      :retry_backoff_time => 5000,
      :automationName => 'Flutter',
      :app => 'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/demo/app-debug-all.apk'

    },
    :appium_lib => {
      :server_url => "https://#{USER_NAME}:#{API_KEY}@api-test.kobiton.com/wd/hub",
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
       :groupId =>            583,
       :deviceGroup =>        'ORGANIZATION', 
       :deviceName =>         'iPhone 7',
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