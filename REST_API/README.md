# Call Kobiton REST API to get session information

This repository includes examples to demonstrate how to execute the script to get Kobiton session information and get session commands using NodeJS.
## 1. Get session information
Copy your username, API key, session ID and replace them in the sample script.
```
const username='YOUR_USERNAME';
const apikey='YOUR_API_KEY';

const session = [SESSIONID];
```
Once you have everything set up, you can run the script by running the following command.
```
npm install
node get_session_info 
```
> Note: You just use "npm install" for the first time
### The result: 
The output should look something like below:
```
{ id: 376883,
  userId: 31670,
  deviceId: 83730,
  executionData:
   { log:
      { previewPath:
         'sessions/376883/logs/device-94143ba0-9ec5-11e8-9eae-190b42455f83.log',
        downloadPath:
         'sessions/376883/logs/376883-94168590-9ec5-11e8-8e97-d3fc1305f1fa.zip' },
     video:
      { path:
         'sessions/376883/videos/Video_376883-adfe9a10-9ec5-11e8-bc91-b7eadb370964.mp4',
        size: 6655426 },
     actual:
      { sdk: '25',
        udid: '5B19000400',
        state: 'device',
        support: [Object],
        codeName: 'dragon',
        isHidden: false,
        brandName: 'google',
        modelName: 'Pixel C',
        deviceName: 'Pixel C',
        isEmulator: false,
        resolution: [Object],
        orientation: 0,
        totalMemory: '2853908',
        platformName: 'Android',
        serialNumber: '5B19000400',
        desktopVersion: '2.3.0',
        cpuArchitecture: 'arm64-v8a',
        platformVersion: '7.1.1',
        installedChromes: [Array],
        installedBrowsers: [Array],
        installedWebViews: [Array] },
     desired:
      { sdk: '25',
        state: 'device',
        support: [Object],
        codeName: 'dragon',
        isHidden: false,
        brandName: 'google',
        modelName: 'Pixel C',
        deviceName: 'Pixel C',
        isEmulator: false,
        resolution: [Object],
        orientation: 0,
        totalMemory: '2853908',
        platformName: 'Android',
        serialNumber: '5B19000400',
        desktopVersion: '2.3.0',
        cpuArchitecture: 'arm64-v8a',
        platformVersion: '7.1.1',
        installedChromes: [Array],
        installedBrowsers: [Array],
        installedWebViews: [Array] },
     appsInstalled: [ [Object] ] },
  endedAt: '2018-08-13T06:53:23.662Z',
  state: 'COMPLETE',
  type: 'MANUAL',
  name: 'Session created at 08/13/2018 07:47 AM',
  description: null,
  createdAt: '2018-08-13T06:47:59.218Z',
  updatedAt: '2018-08-13T06:54:12.883Z',
  deletedAt: null,
  currentTimeInMilliseconds: 1534158361061,
  deviceBooked: false,
  deviceOnline: true,
  isCloud: true,
  username: 'thanhnguyen1',
  avatarUrl: null,
  deviceImageUrl:
   'https://s3.amazonaws.com/kobiton-us-east/devices/256/pixel-c.png',
  log:
   { previewUrl:
      'https://kobiton-us-east.s3.amazonaws.com/sessions/376883/logs/device-94143ba0-9ec5-11e8-9eae-190b42455f83.log?AWSAccessKeyId=AKIAJ7BONOZUJZMWR4WQ&Expires=1534201561&Signature=Q6EMRwXxFRBVXRDbfwNw5yevvF8%3D&response-cache-control=max-age%3D86400',
     downloadUrl:
      'https://kobiton-us-east.s3.amazonaws.com/sessions/376883/logs/376883-94168590-9ec5-11e8-8e97-d3fc1305f1fa.zip?AWSAccessKeyId=AKIAJ7BONOZUJZMWR4WQ&Expires=1534201561&Signature=UJnADBg4PWwOmrHJVBFy0BcwUsw%3D&response-cache-control=max-age%3D86400',
     previewSize: 384612 },
  video:
   { path:
      'https://kobiton-us-east.s3.amazonaws.com/sessions/376883/videos/Video_376883-adfe9a10-9ec5-11e8-bc91-b7eadb370964.mp4?AWSAccessKeyId=AKIAJ7BONOZUJZMWR4WQ&Expires=1534201561&Signature=cauXn83LZApBBioV4efnuTtXsCg%3D',
     size: 6655426 },
  networkLogs: [],
  bypassOrg: 'APPROVED',
  isForTrial: false }
```
## 2. Get session commands
Copy your username, API key, session ID and replace them in the sample script.
```
const username='YOUR_USERNAME';
const apikey='YOUR_API_KEY';

const session = SESSIONID;
```
Once you have everything set up, you can run the script by running the following command.
```
npm install
node get_session_commands 
```
> Note: You just use "npm install" for the first time
### The result: 
```
{ data:
   [ { id: 29975319,
       sessionId: 377136,
       data: [Object],
       screenshot: null,
       endedAt: null,
       createdAt: '2018-08-13T10:41:38.780Z',
       updatedAt: '2018-08-13T10:41:38.780Z',
       deletedAt: null },
     { id: 29975342,
       sessionId: 377136,
       data: [Object],
       screenshot: 'sessions/377136/screenshots/29975342.jpg',
       endedAt: null,
       createdAt: '2018-08-13T10:41:41.767Z',
       updatedAt: '2018-08-13T10:47:57.801Z',
       deletedAt: null,
       screenshotDownloadUrl:
        'https://kobiton-us-east.s3.amazonaws.com/sessions/377136/screenshots/29975342.jpg?AWSAccessKeyId=AKIAJ7BONOZUJZMWR4WQ&Expires=1534223000&Signature=tRz5g1HwVsCkA4hVsz9UCSDcpZQ%3D' },
     { id: 29975348,
       sessionId: 377136,
       data: [Object],
       screenshot: 'sessions/377136/screenshots/29975348.jpg',
       endedAt: null,
       createdAt: '2018-08-13T10:41:42.847Z',
       updatedAt: '2018-08-13T10:47:57.870Z',
       deletedAt: null,
       screenshotDownloadUrl:
        'https://kobiton-us-east.s3.amazonaws.com/sessions/377136/screenshots/29975348.jpg?AWSAccessKeyId=AKIAJ7BONOZUJZMWR4WQ&Expires=1534223000&Signature=BIpujZbGvPsD%2B4B5w2JxwQ4oIo8%3D' },
```