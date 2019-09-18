# Development

## 1. Prerequisites
### Install ack package
- Make sure ack was installed at: [link](https://beyondgrep.com/install/)

### Environment variables
- user_name: User name
- apikey: Access [Kobition](https://portal.kobiton.com/settings/keys) to get apikey
- file_name: your custom app filename. fileExtention: .apk, .ipa, .zip
- app_path: location of your app file (Sample: '~/Downloads/test-app.apk')
- app_id (optional): If you’re going to create a new version, specify an appId of your existing application here. Otherwise, skip this field

## 2 Upload a new app to apps repo

- For example `bash upload-app-s3.sh <user_name> <apikey> <file_name.fileExtention> <app_path>`

## 3 Upload a new app version to apps repo

- For example `bash upload-app-s3.sh <user_name> <apikey> <file_name.fileExtention> <app_path> <app_id>`
