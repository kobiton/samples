# Sample code for fetching session data with Kobiton REST API
## Prerequisites
  - Node 
    >Please visit here to install https://nodejs.org/en/download/.

  - Kobiton Username and API key
    >Please visit our [blog](https://kobiton.com/blog/tutorial/parallel-testing-selenium-webdriver/) and navigate to `IV. Configure Test Scripts for Kobiton` for more details in getting Username and API key.

## Kobiton Rest API command
  This repository includes samples of simple NodeJS app for fetching test session data with Kobiton REST API.

  The sample contains scripts:
  - [get-session-data.js](https://github.com/kobiton/samples/rest-api/get-session-data.js): Fetch a session data
  - [get-session-commands.js](https://github.com/kobiton/samples/rest-api/get-session-commands.js): Fetch all commands of a session

> Note: Kobiton also provides other languages to fetch Kobiton REST API, visit [our docs](https://api.kobiton.com/docs) for more information.

## Setup
- Clone this repository with
    ```
      git clone git@github.com:kobiton/samples.git
    ```

- Open `rest-api` folder.

## Get sessions data

- Request command: 

    `GET /sessions/{sessionId}`

 Retrieve a session info belonging to the current user or organization.
> Note: Absolute urls in response body like *"screenshotDownloadUrl"*, *"previewUrl"*, etc. expire in 2 hours since the response is made.


- Execute: 
    ```bash
    $ USERNAME=<YOUR_KOBITON_USERNAME> \
    > API_KEY=<YOUR_KOBITON_API_KEY> \
    > SESSION_ID=<SESSION_ID> \
    > node get-session-data.js 
    ```
  **Example:**

  ``` bash
   $ USERNAME=kobitonTester \
    > API_KEY=90bc23f4-58s3-4ds3-223a-ds42d45c085cf \
    > SESSION_ID=3894 \
    > node get-session-data.js 
  ```
  **Example result:**
  ```bash
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

For more information, please visit https://api.kobiton.com/docs/#get-a-session.

## Get session commands

- Request command:

    `GET /sessions/{sessionId}/commands`

Retrieves commands of a session belonging to the current user or organization.

- Execute:

  ```bash
    $ USERNAME=<YOUR_KOBITON_USERNAME> \
    > API_KEY=<YOUR_KOBITON_API_KEY> \
    > SESSION_ID=<SESSION_ID> \
    > node get-session-commands.js 
  ```

  **Example:**

  ``` bash
   $ USERNAME=kobitonTester \
    > API_KEY=90bc23f4-58s3-4ds3-223a-ds42d45c085cf \
    > SESSION_ID=3894 \
    > node get-session-commands.js 
  ```
  **Example result:**
    ```bash
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
For more information, please visit https://api.kobiton.com/docs/#get-session-commands.