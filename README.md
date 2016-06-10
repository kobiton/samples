
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
#### 1.Api
 * Test response time

   ```bash
   npm run gulp test-response-time
   ```

#### 2. portal
 * Test portal web
 * Configure browser which want to test in /src/portal/core/wdio.conf.js
 * Currently, default browser is Chrome
 
   ```bash
   npm run gulp test-portal
   ```

#### 3. desktop
 * Download and manual install desktop app on which environment you want to test

   ```bash
   npm run gulp test-desktop
   ```

#### 4. e2e
 * Test all devices

   ```bash
   npm run gulp test-capabilities
   npm run gulp test-session-duration
   npm run gulp test-multiple-devices
   ```

* Test android devices

  ```bash
  npm run gulp test-capabilities -- -android
  npm run gulp test-session-duration -- -android
  npm run gulp test-multiple-devices -- -android
  ```

* Test ios devices

  ```bash
  npm run gulp test-capabilities -- -ios
  npm run gulp test-session-duration -- -ios
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
