*** Settings ***
Library           AppiumLibrary

*** Variables ***
${REMOTE_URL}           username:apiKey
${PLATFORM_NAME}        Android
${DEVICE_NAME}          Galaxy*
${DEVICE_GROUP}         KOBITON
${AUTOMATION_NAME}      Appium
${APP_PATH}             https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ApiDemos-debug.apk
${ANIMATION_XPATH}      //android.widget.TextView[@content-desc="Animation"]
${BOUNCING_BALL_XPATH}  //android.widget.TextView[@content-desc="Bouncing Balls"]

*** Keywords ***
Open Application With Session Timeout
    [Arguments]    ${remote_url}    ${alias}=${EMPTY}   ${resolve_ip}=False    ${session_timeout}=300    &{kwargs}
    ${command_executor}=    Evaluate    selenium.webdriver.remote.remote_connection.RemoteConnection($remote_url, resolve_ip=${resolve_ip})    selenium
    Evaluate    $command_executor.set_timeout(${session_timeout})
    ${driver}=  Evaluate    appium.webdriver.Remote($command_executor, $kwargs)    appium
    ${al}=    Get Library Instance    AppiumLibrary
    Evaluate    $al._cache.register($driver, $alias)

Open App
    Open Application With Session Timeout
    ...   remote_url=http://${REMOTE_URL}@api.kobiton.com/wd/hub
    ...   platformName=${PLATFORM_NAME}
    ...   platformVersion=${PLATFORM_VERSION}
    ...   deviceName=${DEVICE_NAME}
    ...   deviceGroup=${DEVICE_GROUP}
    ...   automationName=${AUTOMATION_NAME}
    ...   app=${APP_PATH}

Test App
    Wait Until Element Is Visible   xpath=${ANIMATION_XPATH}   5s
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
