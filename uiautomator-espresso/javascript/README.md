## I. Getting started to run UiAutomator/ Espresso automation samples with Kobiton

- Go to [Kobiton Devices page](https://portal.kobiton.com/devices).
- Hover over the device you want to test, click on the More icon then select Automation Settings.
- Select Framework = UiAutomator/ Espresso.
- Select Language = NodeJS.
- Input the value for `username` & `apiKey` & in the sample script.

```javascript
const username = ''
const apiKey = ''
```
- Replace the `configuration` to indicate your exptected testing device.

```javascript
const configuration = { 
  sessionName:        'Automation test session',
  sessionDescription: 'This is an example for UiAutomator testing',      
  deviceName:         'Galaxy S7 edge',
  platformVersion:    '7.0',
  deviceGroup:        'KOBITON',
  app:                '<APP_URL>',
  testRunner:         '<TEST_RUNNER_URL>', 
  continueOnFailure:   true,
  tests:              []
}
```
If you want to run the sample with your application, please:
- Replace the `<APP_URL>` by your application under test.
- Use the guideline at [here](https://api.kobiton.com/docs/) to upload your testRunner to Kobiton runner repository, then input the value for `testRunner` in the configuration.
- Input your tests you want to run at `tests: []`

## II. Execute the Sample Tests

Once you have everything set up, you can run the example test simply by running one of the following command:

```bash
node uiautomator.js
node espresso.js
```
## III. Report on Test Results

- When you see your test has the response message that `Session is started.`, you can access https://portal.kobiton.com/sessions](https://portal.kobiton.com/sessions) to get your test status.
