# Nodejs Sample for REST API

**Table of contents**
- [A. Overview](#a-overview)
- [B. Preparations](#b-preparations)
    - [1. Prerequisites](#1-prerequisites)
    - [2. Getting Kobiton Username and API Key](#2-getting-kobiton-username-and-api-key)
    - [3. Getting Kobiton Group ID](#3-getting-kobiton-group-id)
  - [C. Samples](#c-samples)
    - [Device](./Device)
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
- Check if you have Node.js and npm installed, run this command in your terminal:
```bash
node -v
npm -v
```
**Yarn**
```bash
npm install yarn
```

**Dependencies**
- This will install any dependencies included in package.json, run this command in your terminal:
```bash
yarn install
```

#### 1.2 Mac
**Homebrew**
- Homebrew is a package manager for the Mac.
- To install Homebrew, open terminal and type the following command:
```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
- This will install Homebrew on your Mac. To check the version type the following command:
```bash
brew -v
```

**Yarn & Node**
```bash
brew install yarn
```

- Check if you have Node.js and npm installed, run this command in your terminal:

```bash
node -v
yarn -v
```

**Dependencies**
- This will install any dependencies included in package.json, run this command in your terminal:
```bash
yarn install
```

### 2. Getting Kobiton Username and API Key
Kobiton Username and API key are required for authenticating with Kobiton API.

> If you don't have a Kobiton account, visit https://portal.kobiton.com/register to create one.

To get your Kobiton Username and API Key, follow instructions at `IV. Configure Test Script for Kobiton` section on [our blog](https://kobiton.com/blog/tutorial/parallel-testing-selenium-webdriver/).

### 3. Getting Kobiton Group ID
If your account is in an organization and assigned to one or more groups, you will need to get the group ID.

Follow instructions at [Kobiton documentation](https://docs.kobiton.com/organization-management/automation-for-groups/default-group-setting/) to get your group ID.
