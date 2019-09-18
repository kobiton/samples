# Development

## 1. Prerequisites
### Install ack package
- Make sure nodejs version >= 8 was installed
- npm install

### Environment variables
- user_name: User name
- apikey: Access [Kobition](https://portal.kobiton.com/settings/keys) to get apikey
- file_name: your custom app filename. fileExtention: .apk, .ipa, .zip
- app_path: location of your app file (Sample: '~/Downloads/test-app.apk')
- app_id (optional): If you’re going to create a new version, specify an appId of your existing application here. Otherwise, skip this field

## 2 Upload a new app to apps repo

- For example: `user_name=testuser apikey=123ed­123fac­9137dca file_name=test-app.apk app_path=~/Downloads/test-app.apk node upload-app-s3.js`

## 3 Upload a new app version to apps repo

- For example: `user_name=testuser apikey=123ed­123fac­9137dca file_name=test-app.apk app_path=~/Downloads/test-app.apk app_id=1234 node upload-app-s3.js`
