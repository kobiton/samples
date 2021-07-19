# Javascript samples using xcuitest framework

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

## Install the xcuitest samples

Clone this script directly from our GitHub repo and install dependencies:

```
mkdir kobiton-samples
cd kobiton-samples
git clone https://github.com/kobiton/samples.git
cd samples/xcuitest/javascript/
npm install
```

## Getting started with Kobiton

- Go to [Kobiton Devices page](https://portal.kobiton.com/devices).
- Hover over the device you want to test, click on the More icon then select Automation Settings.

![automation-settings.png](/xcuitest/assets/automation-settings.png)

- Select Framework = xcuitest
- Select Language = NodeJS.

![automation-settings-javascript.png](/xcuitest/assets/automation-settings-nodejs.png)

- Input the value for `username` & `apiKey` & in the sample script.

```javascript
const username = ''
const apiKey = ''
```
- Update the value for `deviceName` (you also can use `platformVersion` or `udid`) to indicate your exptected testing device.

## II. Execute the Sample Tests

Once you have everything set up, you can run the example test simply by running one of the following command:

```bash
node xcuitest.js
```
## III. Report on Test Results

- When you see your test has the response message that `Session is started.`, you can access [Session Page](https://portal.kobiton.com/sessions) to get your test status.

```
Response body: { kobitonSessionId: 98363, message: 'Session is started.' }
```

## IV. Notes

If you want to run the test scripts with your application, please:
- Input the value for `app` with your application under test. The `app` value can be a direct link or you can upload your app to the Kobiton Stores and get the appId.

![kobiton-store.png](/xcuitest/assets/kobiton-store.png)

- At `Automation Settings`, scroll down to upload the test runner to Kobiton repository and get the downloadable link, then input the value for `testRunner`.

![upload-test-runner.png](/xcuitest/assets/upload-test-runner.png)

- Put your tests you want to run at `tests: []`
- Run your test scripts and enjoy the results.
