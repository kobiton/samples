# Javascript samples using webdriverio tool

## I. Setup environment on Mac

### Install the javascript-wdio samples

Clone this script directly from our GitHub repo and install dependencies:

```
mkdir kobiton-samples
cd kobiton-samples
git clone https://github.com/kobiton/samples.git
cd samples/javascript-wdio/
npm install
```

### Getting started with Kobiton

- Go to [Kobiton Devices page](https://portal-test.kobiton.com/devices)

- Hover over the device you want to test and select `Automation settings`

- Select Language = `NodeJS`

- Update the global variables `KOBITON_USERNAME` and `KOBITON_API_KEY` using bash shell (you can set in the user directories .bash_profile) by adding the following to new lines of this file or replace `user` & `key` value in the config file (./config/wdio.conf.js):

```
export KOBITON_USERNAME=''
export KOBITON_API_KEY=''
```

- Update `capabilities` at the config files (./config/**.conf.js) follow up above information to indicate your expected testing device

## II. Run tests

Once you have everything set up, you can run the example test simply by running one of the following command:

```
npm run android-web-test
npm run android-app-test
npm run ios-web-test
npm run ios-app-test
```
## III. Report on the test results

When you see your test 'Complete' on the Terminal, you can access https://portal.kobiton.com/sessions to get your test results.