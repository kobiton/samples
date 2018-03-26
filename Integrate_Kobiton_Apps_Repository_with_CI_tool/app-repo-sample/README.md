# GETTING STARTED

`Node` and `yarn` are required.

Install node dependencies:

```bash
yarn install
```

These below samples will need API key which you can get at: https://portal.kobiton.com/settings/keys

# RUN SAMPLES

## Upload app to Kobiton app repo

This sample will upload `apps/ContactManager.apk` file to app repo and show the app ID of this app.

```bash
KOBITON_USERNAME=<YOUR_USERNAME> KOBITON_API_KEY=<YOUR_KOBITON_API_KEY> node upload-app.js apps/ContactManager.apk ContactManager.apk
```

Sample output:

```bash
7441
```

In this sample output, the App ID is 7441.

## Run app test for uploaded app

This sample will open the app to prove that this app was uploaded and testable.

```bash
KOBITON_USERNAME=<YOUR_USERNAME> KOBITON_API_KEY=<YOUR_KOBITON_API_KEY> KOBITON_APP_ID=<YOUR_APP_ID> yarn test
```

Sample output:

```bash
yarn run v1.5.1
$ mocha --no-timeouts app-auto-test


  Android App sample
 > CALL init({"sessionName":"App Repo Demo","sessionDescription":"This is an example to demostrate Android app repo","platformName":"android","deviceName":"Galaxy","app":"kobiton-store:7310"})
 > POST /session {"desiredCapabilities":{"sessionName":"App Repo Demo","sessionDescription":"This is an example to demostrate Android app repo","platformName":"android","deviceName":"Galaxy","app":"kobiton-store:7310"}}

Driving the web on session: aaf7e721-fa47-4206-ae55-0647c94231b6

 > RESPONSE init({"sessionName":"App Repo Demo","sessionDescription":"This is an example to demostrate Android app repo","platformName":"android","deviceName":"Galaxy","app":"kobiton-store:7310"}) "aaf7e721-fa47-4206-ae55-0647c94231b6",{"platform":"LINUX","webStorageEnabled":false,"takesScreenshot":true,"javascriptEnabled":true,"databaseEnabled":false,"networkConnectionEnabled":true,"locationContextEnabled":false,"warnings":{},"desired":{"sessionName":"App Repo Demo","sessionDescription":"This is an example to demostrate Android app repo","platformName":"android","deviceName":"Galaxy","app":"/Users/kobiton/Library/Application Support/Kobiton/kobies/d-3300177a4a777369-1521019728829/auto/bd00beed-6a41-462e-a940-6562846ef15e/ContactManager-ed688ea0-25de-11e8-8cd2-3dfd49384998.apk","appVersionId":7533,"appUrl":"https://kobiton-us-east.s3.amazonaws.com/users/5174/apps/ContactManager-ed688ea0-25de-11e8-8cd2-3dfd49384998.apk?AWSAccessKeyId=AKIAJ7BONOZUJZMWR4WQ&Expires=1521066626&Signature=cUZBq7KoGmUZ7sifYjhhMeHKSYs%3D","noReset":false,"fullReset":true,"udid":"3300177a4a777369"},"sessionName":"App Repo Demo","sessionDescription":"This is an example to demostrate Android app repo","platformName":"android","deviceName":"3300177a4a777369","app":"/Users/kobiton/Library/Application Support/Kobiton/kobies/d-3300177a4a777369-1521019728829/auto/bd00beed-6a41-462e-a940-6562846ef15e/ContactManager-ed688ea0-25de-11e8-8cd2-3dfd49384998.apk","appVersionId":7533,"appUrl":"https://kobiton-us-east.s3.amazonaws.com/users/5174/apps/ContactManager-ed688ea0-25de-11e8-8cd2-3dfd49384998.apk?AWSAccessKeyId=AKIAJ7BONOZUJZMWR4WQ&Expires=1521066626&Signature=cUZBq7KoGmUZ7sifYjhhMeHKSYs%3D","noReset":false,"fullReset":true,"udid":"3300177a4a777369","deviceUDID":"3300177a4a777369","platformVersion":"5.1.1","deviceScreenSize":"720x1280","deviceModel":"SM-J700M","deviceManufacturer":"samsung","appPackage":"com.example.android.contactmanager","appWaitPackage":"com.example.android.contactmanager","appActivity":"com.example.android.contactmanager.ContactManager","appWaitActivity":"com.example.android.contactmanager.ContactManager","versions":{"appiumVersion":"1.7.1","nodeVersion":"v7.4.0"},"kobitonSessionId":230421}
    ✓ should open the app
 > CALL quit()
 > DELETE /session/:sessionID

Ending your web drivage..

 > RESPONSE quit()

Complete session 230421
```

In this sample output, the session ID is 230421.

## Get session logs and video download link

This sample we will get the session info of a completed session.

```bash
KOBITON_USERNAME=<YOUR_USERNAME> KOBITON_API_KEY=<YOUR_KOBITON_API_KEY> KOBITON_SESSION_ID=<YOUR_SESSION_ID> node get-session-info.js
```

Sample output:

```bash
https://kobiton-us-east.s3.amazonaws.com/sessions/230421/logs/230421-e6028540-2-11e8-9c42-db8f2a6e0840.zip?AWSAccessKeyId=AKIAJ7BONOZUJZMWR4WQ&Expires=1521066840&Signature=h4WCg6mdoB1Un%2F2%2BcmZ2nAkJtS8%3D&response-cache-control=max-age%3D86400
https://kobiton-us-east.s3.amazonaws.com/sessions/230421/videos/Video_230421-e7626360-2-11e8-a432-df734f4134ff.mp4?AWSAccessKeyId=AKIAJ7BONOZUJZMWR4WQ&Expires=1521066840&Signature=U0SPwOs%2FTkYjuEVk7sb%2F4agpBtY%3D
```

It will return 2 links for logs and video
