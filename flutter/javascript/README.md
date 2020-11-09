# Javascript samples using Flutter Automation name:

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

## Install the flutter samples

Clone this script directly from our GitHub repo and install dependencies:

```
mkdir kobiton-samples
cd kobiton-samples
git clone https://github.com/kobiton/samples.git
cd samples/javascript-flutter/
npm install
```

## Getting started with Kobiton

- Go to [Kobiton Devices page](https://portal.kobiton.com/devices).
- Hover over the device you want to test, click on the More icon then select Automation Settings.
- Select Language = NodeJS.
- Input the value for `username` & `apiKey` & in the sample script.

```javascript
hostname: 'username:apiKey@api.kobiton.com'
```
- Update the value for `deviceName` (you also can use `platformVersion` or `udid`) to indicate your exptected testing device.

## II. Execute the Sample Tests

Once you have everything set up, you can run the example test simply by running one of the following command:

```bash
either run `APPIUM_OS=android npm start` or `APPIUM_OS=ios npm start`
```
## III. Report on Test Results

- When you see your test runs completely, you can access [Session Page](https://portal.kobiton.com/sessions) to get your test status.
