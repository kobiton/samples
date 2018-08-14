# Call Kobiton REST API to get session information

This repository includes examples to demonstrate how to get Kobiton session information and session commands with NodeJS.
> Note: Kobiton also provides other languages to fetch Kobiton Rest Api, visit [here](https://api.kobiton.com/docs) for more information.
## Prerequisites
- Kobiton account
- Install node and npm
## Usage
+  Clone this repository
+  Replace your `KOBITON_USERNAME`, `KOBITON_API_KEY`, `SESSION_ID` to the sample script

```
const username='<YOUR_USERNAME>';
const apikey='<YOUR_APIKEY>';
const session = '<SESSION_ID>';
```

+ Run this command line: `npm install` to setup dependencies
> Note: you just only need to execute 'npm install' for the first running time.
## Get sessions information
- Run this command line `node get_session_info.js` to execute the app. 
- To make a request: 

```
GET https://api.kobiton.com/v1/sessions
```

You can visit https://api.kobiton.com/docs/#get-sessions for more information.

### Get session commands
- Run this command line `node get_session_commands.js` to execute the app.
- To make a request: 

```
GET /sessions/{sessionId}/commands
```

You can visit https://api.kobiton.com/docs/#get-session-commands  for more information.
