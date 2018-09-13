*** Settings ***
Library           AppiumLibrary

*** Variables ***
${REMOTE_URL}           username:apiKey
${PLATFORM_NAME}        Android
${PLATFORM_VERSION}     6.*
${DEVICE_NAME}          Galaxy*
${DEVICE_GROUP}         KOBITON
${AUTOMATION_NAME}      Appium
${APP_LOCATION}         https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ApiDemos-debug.apk
${ANIMATION_XPATH}      //android.widget.TextView[@content-desc="Animation"]
${BOUNCING_BALL_XPATH}  //android.widget.TextView[@content-desc="Bouncing Balls"]

*** Keywords ***
Open App
    Open Application
    ...   remote_url=http://${REMOTE_URL}@api.kobiton.com/wd/hub
    ...   platformName=${PLATFORM_NAME}
    ...   platformVersion=${PLATFORM_VERSION}
    ...   deviceName=${DEVICE_NAME}
    ...   deviceGroup=${DEVICE_GROUP}
    ...   automationName=${AUTOMATION_NAME}
    ...   app=${APP_LOCATION}

Test App
    Wait Until Element Is Visible   xpath = //android.widget.TextView[@content-desc="Animation"]    5s
    Click Element   xpath=${ANIMATION_XPATH}
    Click Element   xpath=${BOUNCING_BALL_XPATH}
    Sleep   5s

Close All Apps
  Close All Applications

*** Test Cases ***
Android App Test Case
  Open App
  Test App
  Close All Apps
