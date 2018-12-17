# Getting device(s) information

**Table of contents**
<!-- TOC -->

- [Getting device(s) information](#getting-devices-information)
  - [A. Overview](#a-overview)
  - [B. Preparations](#b-preparations)
    - [1. Prerequisites](#1-prerequisites)
    - [2. Getting Kobiton Username and API Key](#2-getting-kobiton-username-and-api-key)
    - [3. Getting Kobiton Group ID](#3-getting-kobiton-group-id)
  - [C. Samples](#c-samples)
    - [1. Get all devices](#1-get-all-devices)
    - [2. Getting online devices](#2-getting-online-devices)
    - [3. Getting online Android/iOS devices](#3-getting-online-android-ios-devices)
    - [4. Getting online Galaxy S8 and running Android 7.0](#4-getting-online-galaxy-s8-and-running-android-70)

<!-- /TOC -->

## A. Overview
This guideline will provide instructions and sample cases to demonstrate the consuming of `/devices` endpoint in Kobiton REST API.

> More information about Kobiton REST API `/devices` endpoint can be found at [Api documentation](https://api.kobiton.com/docs/#devices)

## B. Preparations
### 1. Prerequisites
- cURL installed.
  - `Windows`: Visit https://curl.haxx.se/windows/ for instructions on how to download and install cURL on Windows.
  - `macOS`: Installed by default

### 2. Getting Kobiton Username and API Key
Kobiton Username and API key are required for authenticating with Kobiton API.

> If you don't have a Kobiton account, visit https://portal.kobiton.com/register to create one.

To get your Kobiton Username and API Key, follow instructions at `IV. Configure Test Script for Kobiton` section on [our blog](https://kobiton.com/blog/tutorial/parallel-testing-selenium-webdriver/).

### 3. Getting Kobiton Group ID
If your account is in an organization and assigned to one or more groups, you will need to get the group ID.

Follow instructions at [Kobiton documentation](https://docs.kobiton.com/organization-management/automation-for-groups/default-group-setting/) to get your group ID.

## C. Samples

In this section, we will provide sample use cases for `/devices` endpoint using bash commands with cURL.

- When execute the commands provided in this section, remember to replace these variables with your values:
  - `<YOUR_KOBITON_USERNAME>`: Your Kobiton Username.
  - `<YOUR_KOBITON_API_KEY>`: Your Kobiton API Key.
  - `<YOUR_GROUP_ID>`: Your group Id

- Expected output for all samples in this section:
```javascript
{"privateDevices":[...],"favoriteDevices":[...],"cloudDevices":[...]}
```

### 1. Get all devices
Basic command to get devices data from Kobiton REST API. This will get all devices and devices info that the current user can access. 

**Smaple:**
```bash
curl -X GET 'https://api.kobiton.com/v1/devices' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

**For user in org and group**
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?groupId=<YOUR_GROUP_ID>' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

### 2. Getting online devices
Filter and get only online devices from all devices that current user can access. Adding param:
- `isOnline`: Check if the device is online **(True/False)**

**Sample:**
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?isOnline=true' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

**For user in org and group**
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?isOnline=true&groupId=<YOUR_GROUP_ID>' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

### 3. Getting online Android/iOS devices
Filter and get only online Android devices from all devices that current user can access. Adding Params:
- `isOnline`: Check if the device is online **(True/False)**
- `platformName`: The device platform **(Android/iOS)**

**Smaple:**
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?platformName=Android&isOnline=true' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

**For user in org and group**
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?platformName=Android&isOnline=true&groupId=<YOUR_GROUP_ID>' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

### 4. Getting online Galaxy S8 and running Android 7.0
Filter and get specific devices, for this sample we will show to get all **Galaxy S8** devices with OS version **7.0**
- `deviceName`: The device name, can use exact name or name, name, name.
- `platformVersion`: The platform device version, can use exact version or version, version, version.
- `appiumDisabled`: Check if devices can run automation test **(True/False)**

> Note: 
> - The devices name **'Galaxy S8'** should convert to **'Galaxy%20S8'** in the curl command. Since `%20` stand for blank space in curl command.
> - This commands can do the same for any iOS devices, you just need to replace the value in `deviceName` param

**Smaple:**
- Get all online Galaxy S8 with OS Android 7.0 
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?deviceName=Galaxy%20S8&platformName=Android&platformVersion=7.0' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

- Get all online Galaxy S8 with OS Android 7.0 and can run automation 
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?deviceName=Galaxy%20S8&platformName=Android&platformVersion=7.0&appiumDisabled=false' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

**For user in org and group**
- Get all online Galaxy S8 with OS Android 7.0 
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?deviceName=Galaxy%20S8&platformName=Android&platformVersion=7.0&groupId=<YOUR_GROUP_ID>' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```

- Get all online Galaxy S8 with OS Android 7.0 and can run automation 
```bash
curl -X GET 'https://api.kobiton.com/v1/devices?deviceName=Galaxy%20S8&platformName=Android&platformVersion=7.0&appiumDisabled=false&groupId=<YOUR_GROUP_ID>' \
  -H 'Accept: application/json' \
  -u <YOUR_KOBITON_USERNAME>:<YOUR_KOBITON_API_KEY>
```
