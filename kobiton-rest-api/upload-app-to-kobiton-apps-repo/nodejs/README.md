# Development

## 1. Setup environment
### Nodejs
- Make sure nodejs version >= 8 was installed
- npm install
## 2 Upload app to apps repo
- To run in local: `(environment variables) node upload-app-s3.js`
* Set environment variables:
    * user_name
    * apikey
    * file_name
    * app_path
- For example: `USERNAME=testuser API_KEY=123ed­123fac­9137dca FILE_NAME=test-app.apk YOUR_APPLICATION_PATH=~/Downloads/test-app.apk node upload-app-s3.js`
## 3 Upload version to apps repo
- To run in local: `(environment variables) node upload-app-s3.js`
* Set environment variables:
    * user_name
    * apikey
    * file_name
    * app_path
    * app_id
- For example: `USERNAME=testuser API_KEY=123ed­123fac­9137dca FILE_NAME=test-app.apk YOUR_APPLICATION_PATH=~/Downloads/test-app.apk app_id=1234 node upload-app-s3.js`
