# Getting device(s) information

## Table of contents
- [A. Overview](#a-overview)
- [B. Preparations](#b-preparations)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Getting Kobiton Username and API Key](#2-getting-kobiton-username-and-api-key)
  - [3. Getting Kobiton Group ID](#3-getting-kobiton-group-id)
- [C. Samples](#c-samples)

## A. Overview
This guideline will provide instructions and sample use cases for utilizing Kobiton REST API `/devices` endpoint.

## B. Preparations
### 1. Prerequisites
- cURL installed.
  - `Windows`: Visit https://curl.haxx.se/windows/ for instructions on how to download and install cURL on Windows.
  - `Linux`: cURL installed by default in most Linux distributions. If not, please refer to corresponding distro instructions on how to download and install cURL.
  - `macOS`: cURL installed by default.

### 2. Getting Kobiton Username and API Key
Kobiton Username and API key are required for authenticating with Kobiton API.

> If you don't have a Kobiton account, visit https://portal.kobiton.com/register to create one.

To get your Kobiton Username and API Key, follow instructions at `IV. Configure Test Script for Kobiton` section on [our blog](https://kobiton.com/blog/tutorial/parallel-testing-selenium-webdriver/).

### 3. Getting Kobiton Group ID
If your account is in an organization and assigned to one or more groups, you will need to get the group ID.

Follow instructions at https://docs.kobiton.com/organization-management/automation-for-groups/default-group-setting/ to get your group ID.

## C. Samples

In this section, we will provide sample use cases for `/devices` endpoint using bash commands with cURL.

- When execute the commands provided in this section, remember to replace these variables with your values:
  - `<YOUR_KOBITON_USERNAME>`: Your Kobiton Username.
  - `<YOUR_KOBITON_API_KEY>`: Your Kobiton API Key.
  - `<YOUR_GROUP_ID>`: Your group ID.

- Expected output for all samples in this section:
```javascript
{"privateDevices":[...],"favoriteDevices":[...],"cloudDevices":[...]}
```

For instance: 

Getting detailed information of all devices:

- Default:
```bash
curl -X GET 'https://api.kobiton.com/v1/devices' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

Example:
```bash
curl -X GET 'https://api.kobiton.com/v1/devices' \
  -H 'Accept: application/json' \
  -u kobitondemo:4bbaa732-d920-4de2-a93b-43f2369f478d
```

- User has organization and is in group(s):
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?groupID=<YOUR_GROUP_ID>' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

Example:
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?groupId=260' \
  -H 'Accept: application/json' \
  -u kobitondemo:4bbaa732-d920-4de2-a93b-43f2369f478d
```

> For more information about Kobiton REST APIs and their usages, visit [Kobiton REST API Documentation](https://api.kobiton.com/docs/).

#### 1. Getting online devices
- Default:
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?isOnline=true' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

- User has organization and is in group(s):
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?groupID=<YOUR_GROUP_ID>&isOnline=true' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

### 2. Getting online Android devices
- Default:
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?platformName=Android&isOnline=true' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

- User has organization and is in group(s):
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?groupID=<YOUR_GROUP_ID>&platformName=Android&isOnline=true' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

### 3. Getting information of online Galaxy S8 running Android 7.0
- Default:
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?deviceName=Galaxy%20S8&platformName=Android&isOnline=true' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

- User has organization and is in group(s):
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?groupID=<YOUR_GROUP_ID>&deviceName=Galaxy%20S8&platformName=Android&isOnline=true' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```


### 4. Getting information of online Galaxy S8 running Android 7.0 that can run automation test
- Default:
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?deviceName=Galaxy%20S8&platformName=Android&isOnline=true&appiumDisabled=false' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

- User has organization and is in group(s):
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?groupID=<YOUR_GROUP_ID>&deviceName=Galaxy%20S8&platformName=Android&isOnline=true&appiumDisabled=false' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```
