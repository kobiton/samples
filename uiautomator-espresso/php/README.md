## I. Getting started to run UiAutomator/ Espresso automation samples with Kobiton

- Go to [Kobiton Devices page](https://portal.kobiton.com/devices).
- Hover over the device you want to test, click on the More icon then select Automation Settings.
- Select Framework = UiAutomator/ Espresso.
- Select Language = PHP.
- Input the value for `username` & `apiKey` & in the sample script.

```php
$username = '';
$apiKey = '';
```
- Replace the `configuration` to indicate your exptected testing device.

```php
$configuration  = array(
    'configuration' => array(
        'sessionName'         => 'Automation test session',
        'sessionDescription'  => 'This is an example for Android app testing',
        'noReset'             => true,
        'fullReset'           => false,
        'deviceName'          => 'Galaxy S7 Edge',
        'platformVersion'     => '7.0',
        'deviceGroup'         => 'KOBITON',
        'app'                 => '<APP_URL>',
        'testRunner'          => '<TEST_RUNNER_URL>',
        'continueOnFailure'   => true,
        'sessionTimeout'      => 2,
        'testTimeout'         => 3,
        'retryTimes'          => 2,
        'tests'        => []
    ))
```
If you want to run the sample with your application, please:
- Input the value for `app` with your application under test.
- Use the guideline at [here](https://api.kobiton.com/docs/) to upload your testRunner to Kobiton runner repository, then input the value for `testRunner` in the configuration.
- Input your tests you want to run at `tests: []`

## II. Execute the Sample Tests

Once you have everything set up, you can run the example test simply by running one of the following command:

```bash
php uiautomator.php
node espresso.php
```
## III. Report on Test Results

- When you see your test has the response message that `Session is started.`, you can access https://portal.kobiton.com/sessions](https://portal.kobiton.com/sessions) to get your test status.
