import 'babel-polyfill';
import 'colors';
import wd from 'wd';

let driver;
const kobitonServerConfig = {
  protocol: 'https',
  host: 'api.kobiton.com',
  auth: 'username:api_key' //<- change this info to match user's credentials
};
const desiredCapabilities = {
  sessionName:        'Automation test session with jasmine',
  sessionDescription: 'This is an example for Android web using jasmine',
  deviceOrientation:  'portrait',
  captureScreenshots: true,
  browserName:        'chrome',
  deviceGroup:        'KOBITON',
  deviceName:         '*', // <- user can choose specific device's name or leave '*' for randomly
  platformName:       'Android'
};
jasmine.DEFAULT_TIMEOUT_INTERVAL = 4 * 60 * 1000;

describe("kobiton web test with jasmine", () => {
  beforeAll(async() => {
    driver = wd.promiseChainRemote(kobitonServerConfig);
    driver.on('status', (info) => {
      console.log(info.cyan);
    })
    driver.on('command', (meth, path, data) => {
      console.log(' > ' + meth.yellow, path.grey, data || '');
    })
    driver.on('http', (meth, path, data) => {
      console.log(' > ' + meth.magenta, path, (data || '').grey);
    })
    try {
      await driver.init(desiredCapabilities);
    }
    catch (err) {
      console.error(`Failed to initilize driver: ${err}`);
    }
  });

  afterAll(async() => {
    if (driver) {
      try {
        await driver.quit();
      }
      catch (err) {
        console.error(`Failed to quit driver: ${err}`);
      }
    }
  });

  it('should be able to search for kobiton using google', async () => {
    await driver.get('https://www.google.com')
    .waitForElementByName('q')
    .sendKeys('Kobiton')
    .submit()

    let msg = await driver.title();
    expect(msg).toContain('Kobiton');
  });
});
