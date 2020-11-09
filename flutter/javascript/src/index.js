const wdio = require('webdriverio');
const assert = require('assert');
const find = require('appium-flutter-finder');

const osSpecificOps =
  process.env.APPIUM_OS === 'android'
    ? {
        platformName: 'Android',
        platformVersion: '*',
        deviceName: '*',
        udid: '',
        app: 'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/demo/app-debug-all.apk',
        fullReset: true,
        noReset: false,
        newCommandTimeout: 360
      }
    : process.env.APPIUM_OS === 'ios'
    ? {
        platformName: 'iOS',
        platformVersion: '*',
        deviceName: '*',
        udid: '',
        noReset: true,
        app: 'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/demo/Runner.zip',
        newCommandTimeout: 360,
        waitForQuiescence: false,
        autoAcceptAlerts: true
      }
    : {};

const opts = {
  protocol: 'https',
  hostname: 'username:apiKey@api.kobiton.com',
  port: 443,
  capabilities: {
    ...osSpecificOps,
    sessionName:        'Flutter Automation testing session',
    deviceGroup:        'KOBITON',
    automationName:     'Flutter'
  }
};

(async () => {
  const counterTextFinder = find.byValueKey('counter');
  const buttonFinder = find.byValueKey('increment');

  const driver = await wdio.remote(opts);

  await driver.switchContext('NATIVE_APP');
  await driver.saveScreenshot('./native-screenshot.png');
  await driver.switchContext('FLUTTER');
  await driver.saveScreenshot('./flutter-screenshot.png');

  await driver.elementClick(buttonFinder);
  await driver.touchAction({
    action: 'tap',
    element: { elementId: buttonFinder }
  });
  await driver.saveScreenshot('./flutter-tab.png');

  assert.strictEqual(await driver.getElementText(counterTextFinder), '2');

  driver.deleteSession();
})();