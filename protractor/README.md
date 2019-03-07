AngularJS End to End Testing with Protractor samples
==============

These are simple samples of how to use Protractor to run tests with kobiton. 
About Protractor: https://www.protractortest.org


### Prerequisites

- Node.js was installed (Due to Protractor is a Node.js program)

### Install libraries:

```shell
npm install -g protractor
```


### Kobiton Credentials
  * Access https://portal.kobiton.com/ with your account
  * Get your username & API
  * In the terminal export your Kobiton Credentials as environmental variables:

  ```shell
  $ export KOBITON_USERNAME=<your Kobiton username>
  $ export KOBITON_API_KEY=<your Kobiton api key>
  ```


#### Usage:

`protractor config.js --suite=iOSWeb`
`protractor config.js --suite=androidWeb`


### Resources

- [Protractor Documentation](https://www.protractortest.org)


#### Notes:
* We cannot use Protractor to run Android app/iOs app testting with Kobiton due to ScriptTimeout.
