# Java samples using UIAutomator/ Espresso framework

## I. Install the uiautomator-espresso samples

- Clone this script directly from our GitHub repo:

```
mkdir kobiton-samples
cd kobiton-samples
git clone https://github.com/kobiton/samples.git
cd samples/uiautomator-espresso/java/
```
- Install [Maven](https://maven.apache.org/install.html)
- Build project with [Maven](https://maven.apache.org/run-maven/) `mvn clean install`
- Open Java project in IntelliJ IDEA
  
## II. Getting started with Kobiton

- Go to [Kobiton Devices page](https://portal.kobiton.com/devices).
- Hover over the device you want to test, click on the More icon then select Automation Settings.

![automation-settings.png](/uiautomator-espresso/assets/automation-settings.png)

- Select Framework = UIAutomator/ Espresso.
- Select Language = Java.

![automation-settings-java.png](/uiautomator-espresso/assets/automation-settings-java.png)

- Input the value for `username` & `apiKey` & in the sample script.

```
String username = "";
String apiKey = "";
```
- Update the value for `configuration` to indicate your exptected testing device.

```
List<String> tests = new ArrayList<String>();
tests.add("com.example.android.testing.uiautomator.BasicSample.test");
tests.add("ChangeTextBehaviorTest");
tests.add("ChangeTextBehaviorTest#testChangeText_sameActivity");

JSONObject jsonObject = new JSONObject();
jsonObject.put("sessionName", "Automation test session");
jsonObject.put("sessionDescription", "This is an example for UIAutomator/ Espresso testing");
jsonObject.put("deviceName", "*");
jsonObject.put("deviceGroup", "KOBITON");
jsonObject.put("app", "<APP_URL>");
jsonObject.put("testRunner", "<TEST_RUNNER_URL>");
jsonObject.put("continueWhenFail", true);
jsonObject.put("tests", tests);
```

## III. Execute the Sample Tests

Run separate files by right-click on each file and select `Run UIAutomator.main()` or `Run Espresso.main()`.

## IV. Report on Test Results

- When you see your test has the response message that `Session is started.`, you can access [Session Page](https://portal.kobiton.com/sessions) to get your test status.

![response-body.png](/uiautomator-espresso/assets/response-body.png)

## V. Notes

If you want to run the test scripts with your application, please:
- Input the value for `app` with your application under test.
- At `Automation Settings`, scroll down to upload the test runner to Kobiton repository and get the downloadable link, then input the value for `testRunner` in the configuration..

![upload-test-runner.png](/uiautomator-espresso/assets/upload-test-runner.png)

- Put your tests you want to run at `tests.add()`
- Run your test scripts and enjoy the results.
