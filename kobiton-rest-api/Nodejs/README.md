# Nodejs Sample for REST API

**Table of contents**
- [A. Overview](#a-overview)
- [B. Preparations](#b-preparations)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Getting Kobiton Username and API Key](#2-getting-kobiton-username-and-api-key)
  - [3. Getting Kobiton Group ID](#3-getting-kobiton-group-id)
- [C. Samples](#c-samples)
  - [Device](./Device)
    - [1. Get all devices](#1-get-all-devices)
    - [2. Fetch available devices](#2-fetch-available-devices)
    - [3. Fetch available devices can run automation](#3-fetch-available-devices-can-run-automation)
    - [4. Fetch devices running Android 7.0](#4-fetch-devices-running-android-7.0)
    - [5. Fetch devices with custom information](#5-fetch-devices-with-custom-information)
    - [6. Fetch status of device](#6-fetch-status-of-device)
    - [7. Mark device favorite](#7-mark-device-favorite)
    - [8. Unmark device favorite](#8-unmark-device-favorite)
  - [Session](./Session)
  - [User](./User)
  - [Apps Repository](./App-Repository)

## A. Overview
This guideline will provide instructions and sample cases to ultilize some of Kobiton REST API endpoints by `Nodejs` script.

## B. Preparations
### 1. Prerequisites
#### 1.1 Windows
**Node & npm**
- npm is distributed with Node.js, which means that when you download Node.js, you automatically get npm installed on your computer.
- You can go [here](https://nodejs.org/en/download/) to install the latest one.
- Check if you have `node` and `npm`installed, run this command in your terminal:

```bash
node -v
npm -v
```

**Yarn**
- `Yarn` is a package manager for your code.
- To install `yarn`, open terminal and type the following command:

```bash
npm install yarn
```

- Check if you have `yarn` installed, run this command in your terminal:

```bash
yarn -v
```

**Dependencies**
- Open terminal in `Nodejs` folder.
- This will install any dependencies included in [package.json](./package.json), run this command in your terminal:

```bash
yarn install
```

#### 1.2 Mac
**Homebrew**
- `Homebrew` is a package manager for the Mac.
- To install `Homebrew`, open terminal and type the following command:

```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
- This will install `Homebrew` on your Mac. To check the version type the following command:

```bash
brew -v
```

**Node & npm & yarn**
- To install `yarn`, open terminal and type the following command:

```bash
brew install yarn
```

- This will also install `node` & `npm` if it is not already installed. To check if you have `node`, `npm` & `yarn` installed, run this command in your terminal:

```bash
node -v
npm -v
yarn -v
```

**Dependencies**
- Open terminal in `Nodejs` folder.
- This will install any dependencies included in [package.json](./package.json), run this command in your terminal:

```bash
yarn install
```

### 2. Getting Kobiton Username and API Key
Kobiton Username and API key are required for authenticating with Kobiton API.

> If you don't have a Kobiton account, visit https://portal.kobiton.com/register to create one.

To get your Kobiton Username and API Key, follow instructions at `IV. Configure Test Script for Kobiton` section on [our blog](https://kobiton.com/blog/tutorial/parallel-testing-selenium-webdriver/).

### 3. Getting Kobiton Group ID
If your account is in an organization and assigned to one or more groups, you will need to get the group ID.

Follow instructions at [Kobiton documentation](https://docs.kobiton.com/organization-management/automation-for-groups/default-group-setting/) to get your group ID

## C. Samples
Before executing the script you have to replace your `username` & `apiKey` & `groupId`(if any) in file [config.js](./config.js):

```javascript
const username = 'YOUR_USERNAME'
const apiKey = 'YOUR_APIKEY'
const groupId = 'YOUR_GROUPID'
```

Open terminal in `Nodejs` folder and run one of these following commands:

### Device
#### 1. Get all devices
```bash
yarn run get-all-devices
```
#### 2. Fetch available devices
```bash
yarn run fetch-available-devices
```
#### 3. Fetch available devices can run automation
```bash
yarn run fetch-available-auto-devices
```
#### 4. Fetch devices running Android 7.0
```bash
yarn run fetch-android-7.0-devices
```
#### 5. Fetch devices with custom information
```bash
yarn run fetch-custom-devices
```
#### 6. Fetch status of device
```bash
yarn run fetch-status-of-device
```
#### 7. Mark device favorite
```bash
yarn run mark-device-favorite
```
#### 8. Unmark device favorite
```bash
yarn run unmark-device-favorite
```



