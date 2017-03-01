### Prerequisites
 * Install local packages:  `npm install`

### Change arguments information
#### Run help
  ```bash
  npm run help
  ```

### Run a specific test suites
#### 1. Api
 * Test api functionality

   ```bash
   npm test -- --input /console/api
   ```

#### 2. E2e

##### Test manual:

  ```bash
    npm run test -- --task test-manual --platform Android
    npm run test -- --task test-manual --platform iOS
  ```

#### Test json wired protocol:

  ```bash
    npm run test -- --input /console/appium/web/test-jsonwired-api.js --platform Android
    npm run test -- --input /console/appium/web/test-jsonwired-api.js --platform iOS
  ```

#### Test web with multiple devices parallel

  ```bash
    npm run test -- --input /console/appium/web/test-multiple-devices-parallel --platform Android
    npm run test -- --input /console/appium/web/test-multiple-devices-parallel --platform iOS
  ```

#### Test native app:

  ```bash
    npm run test -- --input /console/appium/app/test-device-android-native-app.js
    npm run test -- --input /console/appium/app/test-device-ios-native-app.js
  ```

#### Test hybrid app:

  ```bash
    npm run test -- --input /console/appium/app/test-device-android-hybrid-app.js
    npm run test -- --input /console/appium/app/test-device-ios-hybrid-app.js
  ```
