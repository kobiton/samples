# Javascript samples using UIAutomator/ Espresso framework

## I. Setup environment on Mac

#### Homebrew

- [Homebrew](https://brew.sh/) is a package manager for the Mac.
-  To install Homebrew, open terminal and type the following command:

```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- This will install Homebrew on your Mac. To check the version, type the following command:

```bash
brew -v
```

#### Node and npm

- To install Node via Homebrew, type the following command:

```bash
brew install node
```

- To check if you have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed, run this command in your terminal:

```bash
node -v
npm -v
```

- To update your npm to latest, type this into in your terminal:

```bash
npm install npm@latest -g
```

## Install the uiautomator-espresso samples

Clone this script directly from our GitHub repo and install dependencies:

```
mkdir kobiton-samples
cd kobiton-samples
git clone https://github.com/kobiton/samples.git
cd samples/uiautomator-espresso/javascript/
npm install
```

## Getting started with Kobiton

- Go to [Kobiton Devices page](https://portal.kobiton.com/devices).
- Hover over the device you want to test, click on the More icon then select Automation Settings.

![automation-settings.png](/uiautomator-espresso/assets/automation-settings.png)

- Select Framework = UIAutomator/ Espresso.
- Select Language = NodeJS.

![automation-settings-javascript.png](/uiautomator-espresso/assets/automation-settings-javascript.png)

- Input the value for `username` & `apiKey` & in the sample script.

```javascript
const username = ''
const apiKey = ''
```
- Update the value for `configuration` to indicate your exptected testing device.

```javascript
const configuration = { 
  sessionName:        'Automation test session',
  sessionDescription: 'This is an example for UIAutomator/ Espresso testing',      
  deviceName:         'Galaxy S7 edge',
  platformVersion:    '7.0',
  deviceGroup:        'KOBITON',
  app:                '<APP_URL>',
  testRunner:         '<TEST_RUNNER_URL>', 
  continueOnFailure:   true,
  tests:              []
}
```

## II. Execute the Sample Tests

Once you have everything set up, you can run the example test simply by running one of the following command:

```bash
node uiautomator.js
node espresso.js
```
## III. Report on Test Results

- When you see your test has the response message that `Session is started.`, you can access [Session Page](https://portal.kobiton.com/sessions) to get your test status.

![response-body.png](/uiautomator-espresso/assets/response-body.png)

## IV. Notes

If you want to run the test scripts with your application, please:
- Input the value for `app` with your application under test.
- At `Automation Settings`, scroll down to upload the test runner to Kobiton repository and get the downloadable link, then input the value for `testRunner` in the configuration..

![upload-test-runner.png](/uiautomator-espresso/assets/upload-test-runner.png)

- Input your tests you want to run at `tests: []`
- Run your test scripts and enjoy the results.

