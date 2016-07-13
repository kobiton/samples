
### Prerequisites
 * Install local packages:  `npm install`

### Register an account on specific environment
 * Test: https://portal-test.kobiton.com
 * Staging: https://portal-staging.kobiton.com
 * Production: https://portal.kobiton.com
 * Open `src/core/user-info.js` and replace *username* and *password* into environment which want to test.
 * Currently, we configured a default account for each of environment

### Run test on specific environment
 * int environement: NODE_ENV = test/staging/production (default is test)
 * Examples:

  ```bash
  npm run gulp test-multiple-devices -- —ios
  NODE_ENV=staging npm run gulp test-multiple-devices -- —ios
  NODE_ENV=production npm run gulp test-multiple-devices -- —ios
  ```

### Connect android/ios devices to desktop app
 * Android: http://confluence-incubator.kms-technology.com/pages/viewpage.action?pageId=1376891
 * Ios: http://confluence-incubator.kms-technology.com/display/KRYP/How+to+configurate+environment+to+Kobiton+app+recognize++iOS+devices

### Run a specific test suites (api, portal, desktop, e2e)
#### 1. Download and install desktop app
 * Set download url to an environment variable KOBITON_DESKTOP_APP_URL. If the variable is not specified, the download url should be the default value from the user-info.js.

 ```bash
 export KOBITON_DESKTOP_APP_URL=<download-url>
 ```
 * Run the following command to download and install the Kobiton desktop app. The script will  return error code as -1 (code: call process.exit(-1)) if any problems.

 ```bash
 npm run gulp install-desktop-app
 ```

#### 2. Api
 * Test response time

   ```bash
   npm run gulp test-response-time
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
