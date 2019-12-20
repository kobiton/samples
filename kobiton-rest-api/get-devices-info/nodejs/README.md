# 1. Prerequisites
**Node**
- Node version = 11
- You can go [here](https://nodejs.org/en/download/) to install
- Check if you have `node` and `npm`installed, run this command in your terminal:

```bash
node -v
npm -v
```

- Expected output:

![image](https://user-images.githubusercontent.com/46931196/70688547-a1268980-1ce4-11ea-86f8-c250a418c5a9.png)

**Credentials**
- Kobiton Username and API key are required for authenticating with Kobiton API.

- If you don't have a Kobiton account, visit https://portal.kobiton.com/register to create one.

> To get your Kobiton Username and API Key, follow instructions at `IV. Configure Test Script for Kobiton` section on [our blog](https://kobiton.com/blog/tutorial/parallel-testing-selenium-webdriver/).

```bash
KOBITON_USERNAME
KOBITON_API_KEY
```

# 2. Getting started
__Note: This sample won't work in Windows__
- Open terminal from this [path](./)
- Commands

```bash
bash run.sh <KOBITON_USERNAME> <KOBITON_API_KEY>
```

- Expected output:

![image](https://user-images.githubusercontent.com/46931196/70690248-ddf47f80-1ce8-11ea-83af-16384f207194.png)

or no online device:

![image](https://user-images.githubusercontent.com/46931196/70690196-bf8e8400-1ce8-11ea-8145-d697dbfd18af.png)
