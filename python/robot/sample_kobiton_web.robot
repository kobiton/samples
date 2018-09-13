*** Settings ***

Library  Selenium2Library

Test Setup  Open test browser
Test Teardown  Close test browser

*** Variables ***

${CREDENTIALS}  username:apiKey
${BROWSER_NAME}  chrome
${DEVICE_NAME}  Galaxy
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
