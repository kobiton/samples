# Getting device(s) information

**Table of contents**
- [Getting device(s) information](#getting-devices-information)
- [A. Overview](#a-overview)
- [B. Samples](#b-samples)
  - [1. Get all devices](#1-get-all-devices)
  - [2. Fetch available devices](#2-fetch-available-devices)
  - [3. Fetch available devices can run automation](#3-fetch-available-devices-can-run-automation)
  - [4. Fetch devices running Android 7.0](#4-fetch-devices-running-android-7.0)
  - [5. Fetch devices with custom information](#5-fetch-devices-with-custom-information)

## A. Overview
This guideline will provide instructions to utilize some of Kobiton REST API endpoints by executing `Nodejs` script.

## B. Samples
Before executing the script you have to replace `username` & `apiKey` & `groupId`(if any):
- To get your Kobiton Username and API Key, follow instructions at `IV. Configure Test Script for Kobiton` section on [our blog](https://kobiton.com/blog/tutorial/parallel-testing-selenium-webdriver/).
- To get your group ID, follow instruction at [Kobiton documentation](https://docs.kobiton.com/organization-management/automation-for-groups/default-group-setting/).
- Replace `username` & `apiKey` & `groupId` in the sample script

```javascript
const username = ''
const apiKey = ''
const groupId = ''
```
### 1. Get all devices
Open terminal in `get-all-devices` folder and run following command:

```bash
yarn run get-all-devices
```

### 2. Fetch available devices
Open terminal in `get-all-devices` folder and run following command:

```bash
yarn run fetch-available-devices
```

### 3. Fetch available devices can run automation
Open terminal in `get-all-devices` folder and run following command:

```bash
yarn run fetch-available-auto-devices
```

### 4. Fetch devices running Android 7.0
Open terminal in `get-all-devices` folder and run following command:

```bash
yarn run fetch-android-7.0-devices
```

### 5. Fetch devices with custom information
Open terminal in `get-all-devices` folder and run following command:

```bash
yarn run fetch-custom-devices
```



