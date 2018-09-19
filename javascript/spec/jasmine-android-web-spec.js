import 'babel-polyfill'
import 'colors';
import wd from 'wd';

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY
const deviceName = process.env.KOBITON_DEVICE_NAME || '*'

let driver;
const kobitonServerConfig = {
  protocol: 'https',
  host: 'api.kobiton.com',
  auth: `${username}:${apiKey}`
};
const desiredCapabilities = {
  sessionName:        'Automation test session with jasmine',
  sessionDescription: 'This is an example for Android web using jasmine',
  deviceOrientation:  'portrait',
  captureScreenshots: true,
  browserName:        'chrome',
  deviceGroup:        'KOBITON',
  deviceName:         deviceName,
  platformName:       'Android'
};
jasmine.DEFAULT_TIMEOUT_INTERVAL = 4 * 60 * 1000;

describe("Android web sample", () => {
  beforeAll(async() => {
    driver = wd.promiseChainRemote(kobitonServerConfig);
    driver.on('status', (info) => {
      console.log(info.cyan);
    });
    driver.on('command', (meth, path, data) => {
      console.log(' > ' + meth.yellow, path.grey, data || '');
    });
    driver.on('http', (meth, path, data) => {
      console.log(' > ' + meth.magenta, path, (data || '').grey);
    });
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

  it('should return the title that contains Kobiton', async () => {
    await driver.get('https://www.google.com')
      .waitForElementByName('q')
      .sendKeys('Kobiton')
      .submit()

    let msg = await driver.title();
    expect(msg).toContain('Kobiton');
  });
});
