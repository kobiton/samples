# Development

## 1. Setup environment
### Install ack
- Make sure ack was installed at: [link](https://beyondgrep.com/install/)
## 2 Upload app to apps repo
- To run in local: `bash upload-app-s3.sh (environment variables )`
* Set environment variables:
    * user_name
    * apikey
    * file_name
    * app_path
- For example: `bash upload-app-s3.sh testuser 123ed­123fac­9137dca test-app ./Downloads/test-app.apk`
## 3 Upload version to apps repo
* Set environment variables:
    * user_name
    * apikey
    * file_name
    * app_path
    * app_id
- For example: `bash upload-app-s3.sh testuser 123ed­123fac­9137dca test-app.apk ~/Downloads/test-app.apk app_id`
