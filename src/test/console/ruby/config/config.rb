require_relative '../api/user'

$config = {
  'username' => nil,
  'token' => nil,
  'apiKey' => nil,
  'serverUrl' => nil,
  'reportServerUrl' => ENV['KOBITON_REPORT_SERVER_URL'],
  'reportServerSecretKey' => ENV['KOBITON_REPORT_SECRET_KEY']
}


testAccountInfo = getTestAccountInfo
$config['username'] = testAccountInfo['username']
$config['apiKey'] = testAccountInfo['key']

$config['serverUrl'] = "https://#{$config['username']}:#{$config['apiKey']}@api.kobiton.com/wd/hub"

def getAppCapabilitiesFor(device, options)
  return {
    caps: {
      sessionName: '[Ruby] App',
      deviceName: device['deviceName'],
      deviceGroup: 'KOBITON',
      platformName: device['platformName'],
      platformVersion: device['platformVersion'],
      browserName: '',
      captureScreenshots: true,
      bundleId: options[:bundleId],
      app: options[:app],
      appPackage: options[:appPackage],
      appActivity: options[:appActivity]
    },
    appium_lib: {
      server_url: $config['serverUrl'],
      wait_timeout: 300
    }
  }
end

def getWebCapabilitiesFor(device, options)
  return {
      caps: {
        sessionName: '[Ruby] Web',
        deviceName: device['deviceName'],
        deviceGroup: 'KOBITON',
        platformName: device['platformName'],
        platformVersion: device['platformVersion'],
        browserName: options[:browserName],
        captureScreenshots: true,
        deviceOrientation: 'portrait'
      },
      appium_lib: {
        server_url: $config['serverUrl'],
        wait_timeout: 300
      }
    }
end
