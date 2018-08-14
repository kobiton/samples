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
{
"id" :  3894,
"userId" :  114,
"deviceId" :  153,
"endedAt" :  "2017-04-17T16:02:59.952Z",
"state" :  "COMPLETE",
"type" :  "MANUAL",
"name" :  "Manual testing on Samsung device",
"description" :  "Test user case #101",
"createdAt" :  "2017-04-17T16:02:55.182Z",
"username" :  "Test User",
"avatarUrl" :  "https://kobiton-us.s3.amazonaws.com/users/114/avatars/1492438501898.jpg",
"deviceImageUrl" :  "https://s3.amazonaws.com/kobiton/devices/256/samsung-galaxy-s6.png",
"deviceBooked" :  false,
"deviceOnline" :  true,
"isCloud" :  true,
"executionData" : { ... },
"log" : { ... },
"video" : { ... }
}
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
{
"currentPage" :  1,
"totalPages" :  3,
"data" : [ ... ]
}
```