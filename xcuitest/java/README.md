# Java samples using XCUITest framework

## I. Clone the XCUITest samples

- Clone this script directly from our GitHub repo:

```
mkdir kobiton-samples
cd kobiton-samples
git clone https://github.com/kobiton/samples.git
cd samples/XCUITest/java/
```
- Open Java project in IntelliJ IDEA.
  
## II. Getting started with Kobiton

- Go to [Kobiton Devices page](https://portal.kobiton.com/devices).
- Hover over the device you want to test, click on the More icon then select Automation Settings.

![automation-settings.png](/XCUITest/assets/automation-settings.png)

- Select Framework = XCUITest
- Select Language = Java.

![automation-settings-java.png](/XCUITest/assets/automation-settings-java.png)

- Input the value for `username` & `apiKey` & in the sample script.

```
String username = "";
String apiKey = "";
```
- Update the value for `deviceName` (you also can use `platformVersion` or `udid`) to indicate your exptected testing device.

## III. Execute the Sample Tests

Run separate files by right-click on each file and select `Run XCUITest.main()`.

## IV. Report on Test Results

- When you see your test has the response message that `Session is started.`, you can access [Session Page](https://portal.kobiton.com/sessions) to get your test status.

```
Response body: { kobitonSessionId: 98363, message: 'Session is started.' }
```

## V. Notes

If you want to run the test scripts with your application, please:
- Input the value for `app` with your application under test. The `app` value can be a direct link or you can upload your app to the Kobiton Stores and get the appId.

![kobiton-store.png](/XCUITest/assets/kobiton-store.png)

- At `Automation Settings`, scroll down to upload the test runner to Kobiton repository and get the downloadable link, then input the value for `testRunner`.

![upload-test-runner.png](/XCUITest/assets/upload-test-runner.png)

- Put your tests you want to run at `tests.add()`
- Run your test scripts and enjoy the results.
