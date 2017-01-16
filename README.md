Enter `npm test -- -h` for more options

### Prerequisites
 * Login to npmjs.com in your Terminal with account from [accounts.md](https://github.com/kobiton/docs/blob/master/team/accounts.md)
 * Install local packages:  `npm install`

### Change environment information
 * There are 2 ways to adjust the enviroment infomration:
  1. Adjust the default values in the `src/core/config.js`.file.
  2. Specify values accordingly the following environment variables:
  * KOBITON_DESKTOP_APP_URL
  * KOBITON_API_URL
  * KOBITON_PORTAL_URL
  * KOBITON_USERNAME_1
  * KOBITON_USERNAME_2
  * KOBITON_PASSWORD_1
  * KOBITON_PASSWORD_2

### Run a specific test suites (api, portal, desktop, e2e)
#### 1. Download and install desktop app
 * Set download url to an environment variable KOBITON_DESKTOP_APP_URL. If the variable is not specified, the download url should be the default value from the config.js.

 ```bash
 export KOBITON_DESKTOP_APP_URL=<download-url>
 ```
 * Run the following command to download and install the Kobiton desktop app. The script will  return error code as -1 (code: call process.exit(-1)) if any problems.

#### 2. Api
 * Test api functionality

   ```bash
   npm test -- --input /console/api
   ```

#### 3. Portal
 * Test portal web
 * Configure browser which want to test in /src/test/browser/wdio.conf.js
 * Currently, default browser is Chrome

   ```bash
   npm test -- --input /browser
   ```

#### 4. Desktop
 * Download and manual install desktop app on which environment you want to test

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
 npm test -- --input /console/appium/web
 ```
 * Test Android native app by using wd

 * Test automation feature on mobile web by using wdio

   ```bash
   npm test -- --input /console/appium/native/android
   ```

