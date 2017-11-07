# PHP Multi-version check

# Required Environment Variables
 * KOBITON_API_URL
 * KOBITON_REPORT_SERVER_URL
 * KOBITON_REPORT_SECRET_KEY

# Command
 ```
 yarn execute-check --lib="<libName>"
 ```
Example:
```
yarn execute-check --lib="appium/php-client"
```

# Options
 1. --lib _(default is appium/php-client)_
 2. --numberOfVersion _(default is 2)_
 3. --versions _(e.g: --versions="1.1.0,1.1.2")_
 4. --testScripts _(--testScripts="iOSAppTest,iOSWebTest")_

# Available lib
 * appium/php-client
 * facebook/webdriver
