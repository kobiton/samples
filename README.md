### Prerequisites
  ##### Install yarn
  `$ brew install yarn`

  ##### Path Setup
   * You will need to set up the PATH environment variable in your terminal to have access to Yarn’s binaries globally.
   * Add export PATH="$PATH:`yarn global bin`" to your profile (this may be in your .profile, .bashrc, .zshrc, etc.)

  ##### Check yarn version
  `$ yarn --version`

  ##### Login private registry with username/password/email in [Document] (https://github.com/kobiton/docs/blob/master/team/accounts.md#npm)
    `$ npm login`

  ##### Install local packages:
  `$ yarn install`

    * KOBITON_API_URL
    * KOBITON_PORTAL_URL
    * KOBITON_DESKTOP_APP_URL
    * KOBITON_USERNAME_1
    * KOBITON_PASSWORD_1
    * KOBITON_USERNAME_2
    * KOBITON_PASSWORD_2
    * KOBITON_EMAIL_RETAINING_TOKEN
    * KOBITON_REPORT_SERVER_URL
    * KOBITON_REPORT_SECRET_KEY

  ##### Tips: You can create a file that contains all environment setter commands as below:
    * export KOBITON_API_URL='<api_url>'
    * export KOBITON_PORTAL_URL='<portal_url>'
    * export KOBITON_USERNAME_1='<username>'
    * export KOBITON_PASSWORD_1='<password>'

  Run command to set variable environment
    ```bash
      source <path_to_file>
    ```

  If you're using iTerm, set all environment in .bash_profile file.

### Build script
  ```bash
  yarn run build
  ```

### Change arguments information
#### 1. Run help
  ```bash
  yarn run help
  ```

#### 2. If you want mocha/wdio to use specific reporter instead of default reporter, please use argument --reporter
e.g: yarn test -- --input /console/api/test-register.js --reporter spec

#### 3. Get online devices belong to private group, default is devices on cloud group
Append argument: --deviceGroup private

#### 4. Get online devices with specific UDID
Append argument: --arrayUDID <udid1,udid2,udid3,...>

#### 5. Get specific amount of online devices
Append argument: --deviceNumbers <number_of_devices>

#### 6. Get online devices with specific name
Append argument: --deviceName <"device's name">

#### 7. Get devices from index x to index y in private group, default is from 0 to end
Append argument: --indexBegin <index_begin> --indexFinish <index_finish>

#### 8. Run test with loop n times
Append argument: --longTestSuiteIterationAmount <number_of_loop>

#### 9. Run test with long duration
Append argument: --mobileTestDuration <minutes>

### Run a specific test suites
#### Api

   ```bash
   yarn test -- --input /console/api
   ```

#### E2e

##### Test manual:

  ```bash
    yarn run test -- --task test-manual --platform Android
    yarn run test -- --task test-manual --platform iOS
  ```

##### Test json wired protocol:

  ```bash
    yarn run test -- --input /console/appium/web/test-jsonwired-api.js --platform Android
    yarn run test -- --input /console/appium/web/test-jsonwired-api.js --platform iOS
  ```

##### Test web with devices parallel

  ```bash
    yarn run test -- --input /console/appium/web/test-multiple-devices-parallel.js --platform Android
    yarn run test -- --input /console/appium/web/test-multiple-devices-parallel.js --platform iOS
  ```

##### Test native app:

  ```bash
    yarn run test -- --input /console/appium/app/test-device-android-native-app.js
    yarn run test -- --input /console/appium/app/test-device-ios-native-app.js
  ```

##### Test hybrid app:

  ```bash
    yarn run test -- --input /console/appium/app/test-device-android-hybrid-app.js
    yarn run test -- --input /console/appium/app/test-device-ios-hybrid-app.js
  ```

##### Test desired cap:

  ```bash
    yarn run test -- --input /console/appium/web/test-desirecap.js --platform Android
    yarn run test -- --input /console/appium/web/test-desirecap.js --platform iOS
  ```

##### Test web:

  ```bash
    yarn run test -- --input /console/appium/web/test-web-session-daily.js --platform Android
    yarn run test -- --input /console/appium/web/test-web-session-daily.js --platform iOS
  ```

### Device health-check
#### Android web:
  ```bash
    yarn run test -- --task health-check --input daily-web  --platform Android
  ```

#### iOS web:
  ```bash
    yarn run test -- --task health-check --input daily-web  --platform iOS
  ```

#### Android app:
  ```bash
    yarn run test -- --task health-check --input android-app  --platform Android
  ```

#### iOS app:
  ```bash
    yarn run test -- --task health-check --input ios-app  --platform iOS
  ```

### Automation test on multiple language
#### Ruby
#### Prerequisites
* Install Ruby via RVM
##### Run test
  ```bash
  yarn test -- --task multi-version-check --input ruby
  ```
#####

#### Java
#### Prerequisites
* JDK 1.8+ installed
* gradle installed
##### Run test
  ```bash
  yarn test -- --task multi-version-check --input java
  ```
#####

#### .Net
#### Prerequisites
##### 1. Window
* .Net framework 4.5+ installed
* MSBuild included in PATH
##### 2. Linux, Mac
* Mono Framework installed
##### Run test
  ```bash
  yarn test -- --task multi-version-check --input dotnet
  ```
#####

#### NodeJS
#### Prerequisites
* Node installed
* yarn installed
##### Run test
  ```bash
  yarn test -- --task multi-version-check --input nodejs
  ```
#####

#### Python
#### Prerequisites
* Python3 install
* yarn installed
##### Run test
  ```bash
  yarn test -- --task multi-version-check --input python
  ```
#####
