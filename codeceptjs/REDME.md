# Codeceptjs samples

## I. Setup environment on Mac

### Install the codeceptjs samples

Clone this script directly from our GitHub repo and install dependencies:

```
mkdir kobiton-samples
cd kobiton-samples
git clone git@github.com:kobiton/samples.git
cd ./codeceptjs
npm install
```

### Install CodeceptJS

CodeceptJS should be installed with webdriverio support:

```
npm install -g codeceptjs webdriverio
```

### Getting started with Kobiton

Go to Kobiton Devices page.
Hover over the device you want to test and select Show automation settings.
Select Language = NodeJS.

Update the global variables `KOBITON_USERNAME` and `KOBITON_API_KEY` using bash shell (you can set in the user directories .bash_profile) by adding the following to new lines of the file:

```
export KOBITON_USERNAME=''
export KOBITON_API_KEY=''
```

Or replace `user` & `key` value in the sample script (./test/*.js).

Update `desiredCapabilities` and other configuration at .json file (android-web.json, android-app.json, ios-web.json, ios-app.json) follow up above information to indicate your expected testing device:

For an example:
```
{
  "tests": "./test/android-web-test.js",
  "timeout": 10000,
  "output": "./output",
  "helpers": {
    "Appium": {
      "browser": "chrome",
      "platform": "Android",
      "device": "*",
      "desiredCapabilities": {
        "sessionName":        "Automation test session",
        "sessionDescription": "This is an example for Android web",
        "deviceOrientation":  "portrait",
        "captureScreenshots": true,
        "browserName":        "chrome",
        "deviceGroup":        "KOBITON",
        "deviceName":         "*",
        "platformVersion":    "*",
        "platformName":       "Android"
      }
    }
  }
}
```

## II. Run tests

### Running android-web-test

```
npx codeceptjs run test/android-web-test.js --steps --config android-web.json
```

### Running android-app-test

```
npx codeceptjs run test/android-app-test.js --steps --config android-app.json
```

### Running ios-web-test

```
npx codeceptjs run test/ios-web-test.js --steps --config ios-web.json
```

### Running ios-app-test

```
npx codeceptjs run test/ios-app-test.js --steps --config ios-app.json
```
## III. Report on Test Results

When you see your test 'Complete' on Terminal, you can access https://portal.kobiton.com/sessions to get your test results.
