## 1. Prerequisites
### Install python
- Make sure python was installed at: [link](https://www.python.org/downloads/)

### Environment variables
- user_name: User name
- apikey: Access [Kobition](https://portal.kobiton.com/settings/keys) to get apikey
- file_name: your custom app filename. fileExtention: .apk, .ipa, .zip
- app_path: location of your app file (Sample: '~/Downloads/test-app.apk')
- app_id (optional): If you’re going to create a new version, specify an appId of your existing application here. Otherwise, skip this field

## 2 Upload a new app to apps repo

- `user_name=<user_name> apikey=<apikey> file_name=<file_name.fileExtention> app_path=<app_path> python upload-app-s3.py`

## 3 Upload a new app version to apps repo

- `user_name=<user_name> apikey=<apikey> file_name=<file_name.fileExtention> app_path=<app_path> app_id=<app_id> python upload-app-s3.py`
