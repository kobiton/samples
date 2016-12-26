
### Prerequisites
 * Login to npmjs.com in your Terminal with account from [accounts.md](https://github.com/kobiton/docs/blob/master/team/accounts.md)
 * Install local packages:  `npm install`

### Change environment information
 * There are 2 ways to adjust the enviroment infomration:
  1. Adjust the default values in the `src/core/config.js`.file.
  2. Specify values accordingly the following environment variables:
  * KOBITON_HUB_HOSTNAME
  * KOBITON_HUB_PORT
  * KOBITON_DESKTOP_APP_URL
  * KOBITON_API_URL
  * KOBITON_PORTAL_URL
  * KOBITON_USERNAME_1
  * KOBITON_USERNAME_2
  * KOBITON_PASSWORD_1
  * KOBITON_PASSWORD_2
  * RUN_LONG_DURATION_LOOP
  * RUN_SHORT_DURATION_LOOP
  * EXPECTED_DURATION_IN_MINUTES
  * KOBITON_CAP_DEVICE_NAME
  * KOBITON_DEVICE_ORIENTATION
  * KOBITON_DEVICE_UDID
  * KOBITON_DEVICE_GROUP (accept two groups private & cloud)
  * KOBITON_DEVICES_NUMBER (number of manual devices will be tested)
  * KOBITON_MAX_BROWSER_INSTANCES (max of browser instances for each manual test run)
  3. Specify values by using a .json configuration file
  * KOBITON_CONFIG_FILE="config.json"
  ex: config.json file

  ```bash
  {
    "portalUrl": "https://portal-test.kobiton.com",
    "apiUrl": "https://api-test.kobiton.com/",
    "appOSXUrl": "https://s3.amazonaws.com/kobiton/nightly/kobiton-osx-test.dmg",
    "hub": {
      "host": "api-test.kobiton.com",
      "port": 80
    },
    "emailOrUsername": "accountemail",
    "password": "accountpassword",
    "emailOrUsername2": "tester",
    "password2": "123456",
    "runDurationLoop": 20,
    "shortRunLoop": 1000,
    "expectedDurationInMinutes": 1,
    "deviceOrientation": "portrait",
    "deviceGroup": "cloud",
    "numOfManualDevices": 4,
    "maxBrowserInstances": 2
  }
  ```

### Run a specific test suites (api, portal, desktop, e2e)
#### 1. Download and install desktop app
 * Set download url to an environment variable KOBITON_DESKTOP_APP_URL. If the variable is not specified, the download url should be the default value from the config.js.

 ```bash
 export KOBITON_DESKTOP_APP_URL=<download-url>
 ```
 * Run the following command to download and install the Kobiton desktop app. The script will  return error code as -1 (code: call process.exit(-1)) if any problems.

 ```bash
 npm run gulp install-kobiton-app
 ```

#### 2. Api
 * Test response time

   ```bash
   npm run gulp test-response-time
   ```
 * Test api functionality

   ```bash
   npm run gulp test-api
   ```

#### 3. Portal
 * Test portal web
 * Configure browser which want to test in /src/portal/core/wdio.conf.js
 * Currently, default browser is Chrome

   ```bash
   npm run gulp test-portal
   ```

#### 4. Desktop
 * Download and manual install desktop app on which environment you want to test

   ```bash
   npm run gulp test-desktop
   ```

#### 5. E2e
 * Download and install desktop app on which environment you want to test
 * Run your test with a specific environment configuration. Default is test ex:

   ```bash
   NODE_ENV=staging npm run gulp test-e2e
   ```
 * Junit report result file will be generated as default: './reports/e2e-test-result.xml'.
 * To generate a new report file:

  ```bash
  REPORT_FILE='../report.xml' npm run gulp test-e2e
  ```
 * Test mobile web by using wd

 ```bash
 npm run gulp test-manual-one-device
 npm run gulp test-multiple-devices
 ```
 * Test Android native app by using wd

 ```bash
 npm run gulp test-one-device-android-native-app
 npm run gulp test-multiple-devices-android-native-app
 ```
 * Test automation feature on mobile web by using wdio

   ```bash
   npm run gulp test-one-device-wdio
   npm run gulp test-multiple-devices-wdio
   ```

* Test manual feature on a device

   ```bash
   npm run gulp test-manual-one-device
   ```

* Test android devices

  ```bash
  npm run gulp test-e2e -- --android
  npm run gulp test-multiple-devices -- --android
  ```

* Test ios devices

  ```bash
  npm run gulp test-e2e -- --ios
  npm run gulp test-multiple-devices -- --ios
  ```

  * Test one device with expected duration and loop times

    ```bash
  KOBITON_CAP_DEVICE_NAME="Device Name"  EXPECTED_DURATION_IN_HOURS=5 RUN_LONG_DURATION_LOOP=10 npm run gulp test-one-device
    ```

### Review test report result
#### 1. Default port is 3000

  ```bash
  $ npm run gulp report-viewer
  See reports at http://localhost:3000/
  ```

#### 2. Use custom port

  ```bash
  $ KOBITON_PORT=8080 npm run gulp report-viewer
  See reports at http://localhost:8080/
  ```
