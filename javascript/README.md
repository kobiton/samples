# Running Appium script on Kobiton device

## I. Setup to run the script on macOS

There are many ways to install NodeJS, in this guideline, the NodeJS will be installed from [nvm](https://github.com/nvm-sh/nvm) which is lightweight and doesn't change your macOS

- Install **nvm** with below command

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

- Open new Terminal window, and install node v14

```bash
nvm install 14
```

- Clone [kobiton/samples](https://github.com/kobiton/samples) in any folder, let's assume it will be cloned at `~/kobiton-samples`

```bash
$ mkdir kobiton-samples
$ cd kobiton-samples
$ git clone git@github.com:kobiton/samples.git .
```

- Install dependencies

```bash
$ cd ~/kobiton-samples/javascript
$ nvm use 14
$ npm install
```

- Now you've completed the setup for executing the Appium script

## II. Getting started Appium with Kobiton devices

- Go to [Kobiton Devices page](https://portal.kobiton.com/devices).
- Hover over the device you want to test and select Show automation settings.

![automation-settings.png](/javascript/assets/automation-settings.png)

- Select Language = NodeJS.
- Replace `username` & `apiKey` in the sample script
- Replace `tcmServerAddress`, `tcmUsername` & `tcmApiKey` in sample script if [integrating with TestRail](./integrate-with-testrail-test.js#L10-L12)

```javascript
const username = '<YOUR_KOBITON_USERNAME>'
const apiKey = '<YOUR_KOBITON_API_KEY>'

const tcmServerAddress = '<YOUR_TCM_SERVER_ADDRESS>'
const tcmUsername = '<YOUR_TCM_USERNAME>'
const tcmApiKey = '<YOUR_TCM_API_KEY>'
```

![auth.gif](/javascript/assets/auth.gif)

- Replace the `desiredCaps` to indicate your exptected testing device.

```javascript
const desiredCaps = {
  sessionName:        'Automation test session',
  sessionDescription: 'This is an example for Android web',
  deviceOrientation:  'portrait',
  captureScreenshots: true,
  browserName:        'chrome',
  deviceGroup:        'KOBITON',
  deviceName:         'Galaxy',
  platformName:       'Android'

  "kobiton:tcmServerAddress": '<YOUR_TCM_SERVER_ADDRESS>',
  "kobiton:tcmUsername":      '<YOUR_TCM_USERNAME>',
  "kobiton:tcmApiKey":        '<YOUR_TCM_API_KEY>',
  "kobiton:externalRunId":    '<YOUR_TCM_TEST_RUN_ID>',
  "kobiton:externalCaseId":   '<YOUR_TCM_TEST_CASE_ID>'
}
```

## III. Execute the sample script

Once you have everything set up, you can run the example test simply by running one of the following command:

```bash
# Make sure to stay in this folder first and use node 14
$ cd ~/kobiton-samples/javascript
$ nvm use 14

# Run desire script
$ npm run android-web-test
$ npm run android-app-test
$ npm run ios-web-test
$ npm run ios-app-test
$ npm run multiple-devices-test
$ npm run jasmine-android-web-test
$ npm run jasmine-android-app-test
$ npm run integrate-with-testrail-test

$ KOBITON_USERNAME="your username" KOBITON_API_KEY="your api key" \
    KOBITON_DEVICE_UDID="device udid" npm run android-web-test-ip
$ KOBITON_USERNAME="your username" KOBITON_API_KEY="your api key" \
    KOBITON_DEVICE_UDID="device udid" npm run ios-web-test-ip
```

## IV. Report on Test Results

- When you see your test 'Complete' on Terminal, you can access [https://portal.kobiton.com/sessions](https://portal.kobiton.com/sessions) to get your test results.

  ![terminal_results.png](/javascript/assets/terminal_results.png)

  ![session-dashboard.png](/javascript/assets/session-dashboard.png)

- We can see the session overview for the latest test session.

  ![session-details.png](/javascript/assets/session-details.png)

- The HTTP Commands details are also included the test result.

  ![session-details-http-commands.png](/javascript/assets/session-details-http-commands.png)

- The log report includes device log and Appium log as well.

  ![session-details-http-logs.png](/javascript/assets/session-details-logs.png)
