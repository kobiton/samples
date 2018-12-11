## Prerequisites

- Install yarn

  > `$ brew install yarn`

- Configure the environment variables from a file which contains <KOBITON_API_URL>, <KOBITON_USERNAME_1> and <KOBITON_API_KEY> environment data

  > `source <filePath>`

- OR execute following commands in console as below:

  > export KOBITON_API_URL='<api_url>'
  > export KOBITON_USERNAME_1='<username>'
  > export KOBITON_API_KEY='<api_key>'

## Run the web automation benchmark test

- Run both Android/iOS devices:

> `yarn run build && yarn run test -- --input /console/benchmark/web-benchmark.js`

- Run both Android/iOS devices with specific automation name:

> `yarn run build && yarn run test -- --input /console/benchmark/web-benchmark.js` --automationName UIAutomator2

- Run on Android devices:

> `yarn run build && yarn run test -- --input /console/benchmark/web-benchmark.js` --platformName Android --numbers 2

- Run on Android devices with specific automation name:

> `yarn run build && yarn run test -- --input /console/benchmark/web-benchmark.js` --platformName Android --automationName UIAutomator2 --numbers 2

- Run on iOS devices:

> `yarn run build && yarn run test -- --input /console/benchmark/web-benchmark.js` --platformName iOS --numbers 2

## Run the app automation benchmark test

- Run both Android/iOS devices:

> `yarn run build && yarn run test -- --input /console/benchmark/app-benchmark.js`

- Run both Android/iOS devices with automation name option:

>`yarn run build && yarn run test -- --input /console/benchmark/app-benchmark.js` --automationName UIAutomator2

- Run on Android devices:

> `yarn run build && yarn run test -- --input /console/benchmark/app-benchmark.js` --platformName Android --numbers 2

- Run on Android devices with specific automation name:

> `yarn run build && yarn run test -- --input /console/benchmark/web-benchmark.js` --platformName Android --automationName UIAutomator2 --numbers 2

**Note:**

- /console/benchmark/web_benchmark_result.csv file will be created in benchmark folder for web sessions

- /console/benchmark/app_benchmark_result.csv file will be created in benchmark folder for app sessions

- Known issue `502 Bad Gateway` if run more than 5 parallel auto sessions (should limit total session less than 5 by using '--number' option)

- The result file will be overwrited for each running test
