# Javascript samples using Applitools

## I. Setup environment on Mac

### Install the Applitool samples

Clone this script directly from our GitHub repo and install dependencies:

```
mkdir kobiton-samples
cd kobiton-samples
git clone https://github.com/kobiton/samples.git
cd samples/applitools
npm install
```

### Getting started with Kobiton

- Go to [Kobiton Devices page](https://portal.kobiton.com/devices)

- Hover over the device you want to test and select `Automation settings`

- Select Language = `NodeJS`

- Update the global variables `KOBITON_USERNAME` and `KOBITON_API_KEY` using bash shell (you can set in the user directories .bash_profile) by adding the following to new lines of this file or replace `user` & `key` value in the config file (./config/wdio.conf.js):

```
export KOBITON_USERNAME=''
export KOBITON_API_KEY=''
```

- Update `capabilities` at the config file (.wdio.conf.js) follow up above information to indicate your expected testing device

- Replace `APPLITOOLS_API_KEY` at the test file (android-web-test.js) by the key from your Applitools dashboard 

## II. Run tests

Once you have everything set up, you can run the example test simply by running one of the following command:

```
npm run test (The first time)
npm run test (The second time)
At the first run, Applitools will get this result as the baseline
At the second run, Applitools will get this result as the checkpoint to compare with the baseline

Note: To have the above comparision, should use the same deviceName and platformVersion. 
```
## III. Report on the test results

When you see your test 'Complete' on the Terminal, you can access https://portal.kobiton.com/sessions and https://eyes.applitools.com/app/results to get your test results.
