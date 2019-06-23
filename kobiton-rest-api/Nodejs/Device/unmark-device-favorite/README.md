# Unmark device favorite

**Table of contents**
- [Unmark device favorite](#unmark-device-favorite)
- [A. Overview](#a-overview)
- [B. Samples](#b-samples)
  - [1. Unmark device favorite](#1-unmark-device-favorite)

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
### 1. Unmark device favorite
Open terminal in `unmark-device-favorite` folder and run following command:

```bash
yarn start
```