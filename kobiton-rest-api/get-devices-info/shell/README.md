# 1. Environment
- Kobiton Username and API key are required for authenticating with Kobiton API.

- If you don't have a Kobiton account, visit https://portal.kobiton.com/register to create one.

> To get your Kobiton Username and API Key, follow instructions at `IV. Configure Test Script for Kobiton` section on [our blog](https://kobiton.com/blog/tutorial/parallel-testing-selenium-webdriver/).


```bash
KOBITON_USERNAME = 'YOUR_USERNAME'
KOBITON_APIKEY = 'YOUR_APIKEY'
KOBITON_DEVICE_ID = 'YOUR_DEVICE_ID' 
```

# 2. Getting started
Open terminal from this [path](./).
- Commands
```bash
bash check-device-status.sh
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
