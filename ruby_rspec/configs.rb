class DesiredCapabilities
  USER_NAME = ''
  API_KEY = ''
  
  def desired_caps_android_web
    desired_caps = {
      :caps => {
        :sessionName        => '[Rspec] Android Web',
        :sessionDescription => 'This is an example for Android Web testing',
        :deviceOrientation  => 'portrait',
        :browserName        => 'chrome',
        :captureScreenshots => true,
        :deviceGroup        => 'KOBITON',
        :deviceName         => 'Galaxy*',
        :platformName       => 'Android',
        :newCommandTimeout  => 300
      },
      :url => 'https://#{USER_NAME}:#{API_KEY}@api.kobiton.com/wd/hub'
    }
    return desired_caps
  end    

  def desired_caps_android_app
    desired_caps = {
      :caps => {
        :sessionName        => '[Rspec] Android App',
        :sessionDescription => 'This is an example for Android app testing', 
        :deviceOrientation  => 'portrait', 
        :app                => 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.apk', 
        :captureScreenshots => true, 
        :deviceGroup        => 'KOBITON',
        :deviceName         => 'Galaxy*',
        :platformName       => 'Android'
      },
      :url => 'https://#{USER_NAME}:#{API_KEY}@api.kobiton.com/wd/hub'
    }
    return desired_caps
  end

  def desired_caps_ios_web
    desired_caps = {
      :caps => {
        :sessionName        => '[Rspec] iOS Web',
        :sessionDescription => 'This is an example for iOS Web testing',
        :deviceOrientation  => 'portrait',
        :browserName        => 'safari',
        :captureScreenshots => true,
        :deviceGroup        => 'KOBITON',
        :deviceName         => 'iPhone*',
        :platformName       => 'iOS'
      },
      :url => 'https://#{USER_NAME}:#{API_KEY}@api.kobiton.com/wd/hub'
    }
    return desired_caps
  end

  def desired_caps_ios_app
    desired_caps = {
      :caps => {
        :sessionName        => '[Rspec] iOS App',
        :sessionDescription => 'This is an example for iOS app testing', 
        :deviceOrientation  => 'portrait', 
        :app                => 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa', 
        :captureScreenshots => true, 
        :deviceGroup        => 'KOBITON',
        :deviceName         => 'iPhone*',
        :platformName       => 'iOS'
      },
      :url => 'https://#{USER_NAME}:#{API_KEY}@api.kobiton.com/wd/hub'
    }
    return desired_caps
  end
end
