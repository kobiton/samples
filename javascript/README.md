# Automated Testing using Appium on Kobiton

## I. Setup Environment on Mac

### Prerequisites

#### Homebrew
- [Homebrew](https://brew.sh/) is a package manager for the Mac.
-  To install Homebrew, open terminal and type the following command:

```bash
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- This will install Homebrew on your Mac. To check the version type the following command:

```bash
  brew -v
```

#### Node and npm

- To install Node via Homebrew, type the following command to install Node.

```bash
  brew install node
```

- To check if you have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed, run this command in your terminal:

```bash
  node -v
  npm -v
```

- To update your npm, type this into your terminal:

```bash
  npm install npm@latest -g
```


## III. Installation

- Clone [this script directly from our GitHub repo](https://github.com/kobiton/samples) and run this command in your terminal:
  
  ```bash
    cd javascript
    npm install
  ```

## IV. Getting started with Kobiton
- Go to [Kobiton Devices page](https://portal.kobiton.com/devices) https://portal.kobiton.com/devices.
- Hover over the device you want to test and select Show automation settings.
  
  ![automation-settings.png](/javascript/assets/automation-settings.png)

- Select Language = NodeJS.
- Replace `username` & `apiKey` in the sample script

```javascript
const username = ''
const apiKey = ''
```

![auth.gif](/javascript/assets/auth.gif)

- Replace the `desiredCaps` to indicate your exptected testing device.

```javascript

const desiredCaps = {
  sessionName:        'Automation test session',
  sessionDescription: 'This is an example for Android web', 
  deviceOrientation:  'portrait',  
  captureScreenshots: true, 
  browserName:        'chrome', 
  deviceGroup:        'KOBITON', 
  deviceName:         'Galaxy',
  platformName:       'Android'
}

```

## V. Executing the Sample Tests

### Once you have everything set up, you can run the example test simply by running one of the following command:

```bash
npm test
npm run android-web-test
npm run android-app-test
npm run ios-web-test
npm run ios-app-test
npm run multiple-devices-test
```

## VI. Reporting on Test Results
- When you see your test 'Complete' on Terminal, you can access [https://portal.kobiton.com/sessions](https://portal.kobiton.com/sessions) to get your test results.

  ![terminal_results.png](/javascript/assets/terminal_results.png)

  ![session-dashboard.png](/javascript/assets/session-dashboard.png)

- We can see the session overview for the latest test session.

  ![session-details.png](/javascript/assets/session-details.png)

- The HTTP Commands details are also included the test result.

  ![session-details-http-commands.png](/javascript/assets/session-details-http-commands.png)

- The log report includes device log and Appium log as well.

  ![session-details-http-logs.png](/javascript/assets/session-details-logs.png)
