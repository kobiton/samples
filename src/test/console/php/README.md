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
 1. --numberOfVersion _(default is 2)_
 1. --versions 

# Available lib
 * appium/php-client
 * facebook/webdriver