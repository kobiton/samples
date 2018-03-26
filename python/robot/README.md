# Robot Framework Automated WebDriver Testing

With [Selenium2Library](https://github.com/rtomac/robotframework-selenium2library) you can run WebDriver tests with [Robot Framework](http://code.google.com/p/robotframework/). 
Robot Framework is a test automation framework to run acceptance tests.


With robot framework you can build easy to read test cases. It allows using keyword driven, behavior driven approaches. 
The framework provides reports in HTML format.

## Setting up robot framework

Make sure you've installed [pip](http://pip-installer.org/), then to install the necessary libs:

```
pip install robotframework-selenium2library requests
```

## Running your first test
Below is an example on how to run a simple test on Firefox. When the test has finished, the test name and success state is sent to TestingBot so you can see the test success/failures in our dashboard.

Save the example below in a `test_kobiton.robot` file:

```
*** Settings ***

Library  Selenium2Library

Test Setup  Open test browser
Test Teardown  Close test browser

*** Variables ***

# ${CREDENTIALS}  key:secret
${BROWSER_NAME}  chrome
${DEVICE_NAME}  Galaxy S5
${DEVICE_GROUP}  KOBITON
${PLATFORM_NAME}  Android

*** Test Cases ***

Simple Test
  Go to  https://www.google.com
  Page should contain  Google

*** Keywords ***

Open test browser
  Open browser  about:  chrome
  ...  remote_url=http://${CREDENTIALS}@api.kobiton.com/wd/hub
  ...  desired_capabilities=browserName:${BROWSER_NAME},deviceName:${DEVICE_NAME},deviceGroup:${DEVICE_GROUP},platformName:${PLATFORM_NAME}

Close test browser
  Close all browsers
```


To run the test run this command:

```
 pybot test_kobiton.robot
```

## Specifying the Kobiton devices
To another Kobiton Cloud devices like iPhoneX or Samsung S8+, you can go to [Kobiton Cloud](https://portal.kobiton.com/devices) to get more your favorite devices here.
