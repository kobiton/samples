## 1. Prerequisites
### Install ack package
- Make sure ack was installed at: [link](https://beyondgrep.com/install/)

### Environment variables
- user_name: Kobiton Username
- apikey: Access [Kobition](https://portal.kobiton.com/settings/keys) to get apikey
- test_runner_name: your test runner filename. fileExtention: .ipa, .zip
- test_runner_path: location of your app file (Sample: '~/Downloads/test-app.ipa')
- file_name: your custom app filename. fileExtention: .ipa, .zip
- app_path: location of your app file (Sample: '~/Downloads/test-app.ipa')
- app_id (optional): If you’re going to create a new version, specify an appId of your existing application here. Otherwise, skip this field
## 2 Run full-flow xcuitest (Upload Test Runner -> Upload App -> Run session)
- Make sure to update the `deviceName, udid` of object `configuration JSON` in `execute_test` function to available device and udid.
- `bash xcuitest.sh <user_name> <apikey> <test_runner_name.fileExtention> <test_runner_path> <file_name.fileExtention> <app_path>`
