## Prerequisites

- Install yarn

  `$ brew install yarn`

- configure the environment variables (KOBITON_API_URL, KOBITON_USERNAME_1 and KOBITON_API_KEY)

  `source <filePath>`

  ####Tips: You can create a file that contains all environment setter commands as below:
    * export KOBITON_API_URL='<api_url>'
    * export KOBITON_USERNAME_1='<username>'
    * export KOBITON_API_KEY='<api_key>'

## Run the benchmark test

`yarn run build && yarn run test -- --input /console/benchmark/web-benchmark.js --platformName <name> --platformVersion <number>`

## benchmark_result.csv file will be created in benchmark folder
