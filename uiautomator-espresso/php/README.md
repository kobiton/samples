# PHP samples using UIAutomator/ Espresso framework

## I. Install php

To install php on your Mac, please follow the [oficial documentation](https://www.php.net/manual/en/install.macosx.php).

## Get the uiautomator-espresso samples

Clone this script directly from our GitHub repo:

```
mkdir kobiton-samples
cd kobiton-samples
git clone https://github.com/kobiton/samples.git
cd samples/uiautomator-espresso/php/
```

## Getting started with Kobiton

- Go to [Kobiton Devices page](https://portal.kobiton.com/devices).
- Hover over the device you want to test, click on the More icon then select Automation Settings.

![automation-settings.png](/uiautomator-espresso/assets/automation-settings.png)

- Select Framework = UIAutomator/ Espresso.
- Select Language = PHP.

![automation-settings-php.png](/uiautomator-espresso/assets/automation-settings-php.png)

- Input the value for `username` & `apiKey` & in the sample script.

```php
$username = ''
$apiKey = ''
```
- Update the value for `configuration` to indicate your exptected testing device.

```php
$configuration  = array(
    'configuration' => array(
        'sessionName'         => 'Automation test session',
        'sessionDescription'  => 'This is an example for UiAutomator testing',
        'deviceName'          => 'Galaxy S7 Edge',
        'platformVersion'     => '7.0',
        'deviceGroup'         => 'KOBITON',
        'app'                 => '<APP_URL>',
        'testRunner'          => '<TEST_RUNNER_URL>',
        'continueOnFailure'   => true,
        'tests'               => array()
    ))
```
## II. Execute the Sample Tests

Once you have everything set up, you can run the example test simply by running one of the following command:

```bash
php uiautomator.php
php espresso.php
```
## III. Report on Test Results

- When you see your test has the response message that `Session is started.`, you can access [Session Page](https://portal.kobiton.com/sessions) to get your test status.

![response-body.png](/uiautomator-espresso/assets/response-body.png)

## IV. Notes

If you want to run the test scripts with your application, please:
- Input the value for `app` with your application under test.
- At `Automation Settings`, scroll down to upload the test runner to Kobiton repository and get the downloadable link, then input the value for `testRunner` in the configuration..

![upload-test-runner.png](/uiautomator-espresso/assets/upload-test-runner.png)

- Input your tests you want to run at `'tests' => array()`
- Run your test scripts and enjoy the results.
