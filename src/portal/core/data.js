import {getAccount} from '../../core/user-info'
import faker from 'Faker'

const account = getAccount()

export const testerAccount = {
  username: account.emailOrUsername,
  password: account.password
}

export function getScript(language, config) {
  return template(language, config)
}

export function generateUser() {
  const username = `${faker.Internet.userName()}${String(faker.random.number(10000))}`
  const password = 'mario8x@123'
  return {
    fullname: faker.Name.findName(),
    username,
    password,
    email: faker.Internet.email(username)
  }
}

const template = (language, config) => {
  switch (language) {
    case 'NodeJS':
      return `var webdriverKobitonServerConfig = {
       host:  '${config.serverUrl}',
       auth:  '${config.username}:${config.apiKey}',
       port: 80
     }

     var desiredCaps = {
       deviceName:          '${config.device}',
       platformVersion:     '${config.platformVersion}',
       deviceOrientation:   '${config.orientation}',
       browserName:         '${config.browser}',
       platformName:        '${config.platformName}',
       captureScreenshots: true
     }`

    case 'Java':
      return `String kobitonServerUrl = "http://${config.username}:${config.apiKey}@${config.serverUrl}/wd/hub";

     DesiredCapabilities capabilities = new DesiredCapabilities();
     capabilities.setCapability("deviceName", "${config.device}");
     capabilities.setCapability("platformVersion", "${config.platformVersion}");
     capabilities.setCapability("deviceOrientation", "${config.orientation}");
     capabilities.setCapability("browserName", "${config.browser}");
     capabilities.setCapability("platformName", "${config.platformName}");
     capabilities.setCapability("captureScreenshots", true);`

    case '.NET (C#)':
      return `string kobitonServerUrl = "http://${config.serverUrl}/wd/hub";

   DesiredCapabilities capabilities = new DesiredCapabilities();
   capabilities.SetCapability("username", "${config.username}");
   capabilities.SetCapability("accessKey", "${config.apiKey}");
   capabilities.SetCapability("deviceName", "${config.device}");
   capabilities.SetCapability("platformVersion", "${config.platformVersion}");
   capabilities.SetCapability("deviceOrientation", "${config.orientation}");
   capabilities.SetCapability("browserName", "${config.browser}");
   capabilities.SetCapability("platformName", "${config.platformName}");
   capabilities.SetCapability("captureScreenshots", true);`

    case 'Ruby':
      return `desired_caps = {
     caps: {
       \'deviceName\':         \'${config.device}\',
       \'platformVersion\':    \'${config.platformVersion}\',
       \'deviceOrientation\':  \'${config.orientation}\',
       \'browserName\':        \'${config.browser}\',
       \'platformName\':       \'${config.platformName}\',
       \'captureScreenshots\': True
     },
     \'appium_lib\': {
     \'server_url\': \'http://${config.username}:${config.apiKey}@${config.serverUrl}/wd/hub\'
     }
   }`

    case 'Python':
      return `kobitonServerUrl = "http://${config.username}:${config.apiKey}@${config.serverUrl}:80/wd/hub"

   desired_caps = {
     \'deviceName\':         \'${config.device}\',
     \'platformVersion\':    \'${config.platformVersion}\',
     \'deviceOrientation\':  \'${config.orientation}\',
     \'browserName\':        \'${config.browser}\',
     \'platformName\':       \'${config.platformName}\',
     \'captureScreenshots\': True
   }`

    case 'PHP':
      return `$kobiton_server_url = "http://${config.username}:${config.apiKey}@${config.serverUrl}/wd/hub";

   $capabilities = array(
     \'deviceName\' =>         \'${config.device}\',
     \'platformVersion\' =>    \'${config.platformVersion}\',
     \'deviceOrientation\' =>  \'${config.orientation}\',
     \'browserName\' =>        \'${config.browser}\',
     \'platformName\' =>       \'${config.platformName}\',
     \'captureScreenshots\' => True
   );`
  }

}
