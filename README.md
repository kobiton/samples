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

#### 3. Java: Jsonwired protocol

#### Install maven

  ```bash
  brew install maven
  ```
#### Configuration
* To configure test environment: deviceName, platformName, kobitonServerUrl. Need to edit file `src/test/console/java/testng.xml`
* To change Selenium version: edit file `src/test/java/pom.xml` (2.53.1 or 3.1.0)
#### Run test

  ```bash
  cd /src/test/console/java
  mvn test
  ```
TODO: make a gulp task to run jsonwired for java

TODO: add manual for C#
