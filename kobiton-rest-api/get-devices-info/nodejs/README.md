# 1. Prerequisites
**Node**
- Node version >= 8
- You can go [here](https://nodejs.org/en/download/) to install the latest one
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
- Open terminal from this [path](./).
- This will install any dependencies included in [package.json](./package.json), run this command in your terminal:

```bash
yarn install
```
# 2. Environment
- Kobiton Username and API key are required for authenticating with Kobiton API.

- If you don't have a Kobiton account, visit https://portal.kobiton.com/register to create one.

> To get your Kobiton Username and API Key, follow instructions at `IV. Configure Test Script for Kobiton` section on [our blog](https://kobiton.com/blog/tutorial/parallel-testing-selenium-webdriver/).


```bash
KOBITON_USERNAME = 'YOUR_USERNAME'
KOBITON_APIKEY = 'YOUR_APIKEY'
KOBITON_DEVICE_ID = 'YOUR_DEVICE_ID' 
```
# 3. Getting started
- Commands
```bash
yarn start
```
- There are three expected outputs for this sample:
```bash
The device is ready to use
```
or
```bash
The device is busy
```
or
```bash
The device is offline
```