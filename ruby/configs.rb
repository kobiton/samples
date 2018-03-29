 USER_NAME = ""
 API_KEY = ""

class DesiredCapabilities
  def desired_caps_android_web
    desired_caps = {
      :caps => {
        :sessionName =>        'Android Web',
        :sessionDescription => 'This is an example for Android Web testing',
        :deviceOrientation =>  'portrait',
        :browserName =>        'chrome',
        :captureScreenshots => true,
        :deviceGroup =>        'KOBITON',
        :deviceName =>         'Galaxy S5',
        :platformName =>       'Android'
      },
      :appium_lib => {
        :server_url => "https://#{USER_NAME}:#{API_KEY}@api.kobiton.com/wd/hub"
      }
    }
    return desired_caps
  end

  def desired_caps_ios_web
    desired_caps = {
      :caps => {
        :sessionName =>        'iOS Web',
        :sessionDescription => 'This is an example for iOS Web testing',
        :deviceOrientation =>  'portrait',
        :browserName =>        'safari',
        :captureScreenshots => true,
        :deviceGroup =>        'KOBITON',
        :deviceName =>         'iPhone 7',
        :platformName =>       'iOS'
      },
      :appium_lib => {
        :server_url => "https://#{USER_NAME}:#{API_KEY}@api.kobiton.com/wd/hub"
      }
    }
    return desired_caps
  end

  def desired_caps_android_app
    desired_caps = {
      :caps => {
        :sessionName =>        'Android app',
        :sessionDescription => 'This is an example for Android app testing', 
        :deviceOrientation =>  'portrait', 
        :app =>        'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.apk', 
        :captureScreenshots => true, 
        :deviceGroup =>        'KOBITON',
        :deviceName =>         'Galaxy S5',
        :platformName =>       'Android'
      },
      :appium_lib => {
        :server_url => "https://#{USER_NAME}:#{API_KEY}@api.kobiton.com/wd/hub"
      }
    }
    return desired_caps
  end

  def desired_caps_ios_app
    desired_caps = {
      :caps => {
        :sessionName =>        'iOS app',
        :sessionDescription => 'This is an example for iOS App testing', 
        :deviceOrientation =>  'portrait', 
        :app =>        'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa', 
        :captureScreenshots => true, 
        :deviceGroup =>        'KOBITON', 
        :deviceName =>         'iPhone 7',
        :platformName =>       'iOS'
      },
      :appium_lib => {
        :server_url => "https://#{USER_NAME}:#{API_KEY}@api.kobiton.com/wd/hub"
      }
    }
    return desired_caps
  end
  
end