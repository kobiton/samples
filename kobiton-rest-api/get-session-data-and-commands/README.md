# Getting session data and commands

Kobiton has provided sample script for utilizing Kobiton REST API `/sessions` endpoint. The provided script demonstrates :
- [get-session-data.js](./get-session-data.js): Getting data of a session.
- [get-session-commands.js](./get-session-commands.js): Getting commands of a session.

> Note : 
> - The provided scripts are written in NodeJS. You can take a look at the provided script to view the flow, concepts and idea.
> - The flow, concepts and idea in the provided script can also be applied into other programming languages.

> More information about Kobiton REST API `/sessions` endpoint can be found at https://api.kobiton.com/docs/#sessions

## A. Preparations
### 1. Prerequisites
- NodeJS installed.
> Refer to https://nodejs.org/en/download/ for instructions on how to download and install NodeJS.

### 2. Getting Kobiton Username and API Key: 
Kobiton Username and API key are required for authenticating with Kobiton API.

> If you don't have a Kobiton account, visit https://portal.kobiton.com/register to create one.

To get your Kobiton Username and API Key, follow instructions at `IV. Configure Test Script for Kobiton` section on [our blog](https://kobiton.com/blog/tutorial/parallel-testing-selenium-webdriver/).

## B. Setup
1. Download the sample code at `https://github.com/kobiton/samples/archive/master.zip`
2. Extract the .zip file, open Terminal or Powershell and `cd` into `kobiton-rest-api` folder.
3. You're ready for running sample code (next section).

## C. Execute sample code to consume Kobiton REST API

Below are our sample code and how to run them. You can see our source code to see how the APIs are consumed is a specific programming language (nodejs) and then you can do the same on your own language.

### C.1 Get sessions data

Copy below text, replace your own value and paste them into your Terminal console

```bash
$ KOBITON_USERNAME=<YOUR_KOBITON_USERNAME> \
KOBITON_API_KEY=<YOUR_KOBITON_API_KEY> \
KOBITON_SESSION_ID=<YOUR_SESSION_ID> \
node get-session-data.js
```

Below is an example

```bash
$ KOBITON_USERNAME=kobitonTester \
KOBITON_API_KEY=90bc23f4-58s3-4ds3-223a-ds42d45c085cf \
KOBITON_SESSION_ID=3894 \
node get-session-data.js

{
  "id" :  3894,
  "userId" :  113,
  "deviceId" :  153,
  "endedAt" :  "2017-04-17T16:02:59.952Z",
  "state" :  "COMPLETE",
  "type" :  "MANUAL",
  "name" :  "Manual testing on Samsung device",
  "description" :  "Test user case #101",
  "createdAt" :  "2017-04-17T16:02:55.182Z",
  "username" :  "kobitonTester",
  "avatarUrl" :  "https://kobiton-us.s3.amazonaws.com/users/114/avatars/149434523123.jpg",
  "deviceImageUrl" :  "https://s3.amazonaws.com/kobiton/devices/256/samsung-galaxy-s6.png",
  "deviceBooked" :  false,
  "deviceOnline" :  true,
  "isCloud" :  true,
  "executionData" : { ... },
  "log" : { ... },
  "video" : { ... }
}
```

### C.2 Get commands in a session

Copy below text, replace your own value and paste them into your Terminal console

```bash
$ KOBITON_USERNAME=<YOUR_KOBITON_USERNAME> \
KOBITON_API_KEY=<YOUR_KOBITON_API_KEY> \
KOBITON_SESSION_ID=<YOUR_SESSION_ID> \
node get-session-commands.js
```

Below is an example

```bash
$ KOBITON_USERNAME=kobitonTester \
KOBITON_API_KEY=90bc23f4-58s3-4ds3-223a-ds42d45c085cf \
KOBITON_SESSION_ID=3894 \
node get-session-commands.js

{
  "currentPage" :  1,
  "totalPages" :  3,
  "data" : [
    {
      "id" :  3894,
      "sessionId" :  3894,
      "data" : { ... },
      "screenshot" :  "sessions/3894/screenshots/12034174.jpg",
      "screenshotDownloadUrl" :  "https://kobiton-us.s3.amazonaws.com/sessions/3894/screenshots/12034174.jpg?AWSAccessKeyId=AKIAINNNJIBOGNOGWBJQ&amp;Expires=1500285830&amp;Signature=4BMnjDB%2BPbw6sypKPl5DBOAeaUU%3D&amp;response-cache-control=max-age%3D86400",
      "endedAt" :  "2017-04-17T16:02:59.952Z",
      "createdAt" :  "2017-04-17T16:02:59.952Z"
    }
  ]
}
```