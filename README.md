### Prerequisites
  ##### Install yarn
  `$ brew install yarn`

  ##### Path Setup
   * You will need to set up the PATH environment variable in your terminal to have access to Yarn’s binaries globally.
   * Add export PATH="$PATH:`yarn global bin`" to your profile (this may be in your .profile, .bashrc, .zshrc, etc.)

  ##### Check yarn version
  `$ yarn --version`

  ##### Install local packages:
  `$ yarn install`

    * KOBITON_API_URL
    * KOBITON_PORTAL_URL
    * KOBITON_DESKTOP_APP_URL
    * KOBITON_USERNAME_1
    * KOBITON_API_KEY
    * KOBITON_EMAIL_RETAINING_TOKEN
    * KOBITON_REPORT_SERVER_URL
    * KOBITON_REPORT_SECRET_KEY
    * KOBITON_CONCURRENT_LOADTEST

  ##### Tips: You can create a file that contains all environment setter commands as below:
    * export KOBITON_API_URL='<api_url>'
    * export KOBITON_PORTAL_URL='<portal_url>'
    * export KOBITON_USERNAME_1='<username>'
    * export KOBITON_PASSWORD_1='<password>'
    * export KOBITON_API_KEY='<api_key>'
    * export KOBITON_DESKTOP_APP_URL='<Kobiton App S3 link>'
    * export KOBITON_CONCURRENT_LOADTEST='<number of devices>'

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
Append argument: --deviceName <device's name>

#### 7. Run test with loop n times
Append argument: --longTestSuiteIterationAmount <number_of_loop>

#### 8. Run test with long duration
Append argument: --mobileTestDuration <run_in_mintues>

#### 9. Get devices by platform name
Append argument: --platformName <platformName>

#### 10. Get devices by platform version
Append argument: --platformVersion <version>

### Run a specific test suites
#### API

   ```bash
   yarn run test -- --input /console/api
   ```

#### UIs

  ```bash
  yarn run test -- --task test-ui --type <file_test>
  Ex1: yarn run test -- --task test-ui --type test-manual
  Ex2: yarn run test -- --task test-ui --type test-devices-page
  ```

#### AUT

  ```bash
  yarn run test -- --task test-aut --type <file_test>
  ```

#### E2e

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
    yarn run test -- --input /console/appium/app/test-app.js --type android_native_app
    yarn run test -- --input /console/appium/app/test-app.js --type ios_native_app
  ```

##### Test hybrid app:

  ```bash
    yarn run test -- --input /console/appium/app/test-app.js --type android_hybrid_app
    yarn run test -- --input /console/appium/app/test-app.js --type ios_hybrid_app
  ```

##### Test desired cap:

  ```bash
    yarn run test -- --input /console/appium/web/test-desired-caps.js
  ```

##### Test web:

  ```bash
    yarn run test -- --input /console/appium/web/test-web-session-daily.js
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

#### PHP
#### Prerequisites
* PHP installed
* php composer installed at '/usr/local/bin/composer.phar'
##### Run test
  ```bash
  yarn test -- --task multi-version-check --input php
  ```
#####

### LoadTest
##### Run test
```bash
yarn test -- --input /console/api/test-manual-loadtest.js --reporter spec
```
