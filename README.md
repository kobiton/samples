
### Prerequisites
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

### Connect android/ios devices to desktop app
 * Android: http://confluence-incubator.kms-technology.com/pages/viewpage.action?pageId=1376891
 * Ios: http://confluence-incubator.kms-technology.com/display/KRYP/How+to+configurate+environment+to+Kobiton+app+recognize++iOS+devices

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

 * Test all devices

   ```bash
   npm run gulp test-e2e
   npm run gulp test-multiple-devices
   ```

* Test android devices

  ```bash
  npm run gulp test-e2e -- -android
  npm run gulp test-multiple-devices -- -android
  ```

* Test ios devices

  ```bash
  npm run gulp test-e2e -- -ios
  npm run gulp test-multiple-devices -- -ios
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
