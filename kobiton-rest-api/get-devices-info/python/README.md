# 1. Prerequisites
**Python**
- Python version >= 2.7.9 or >= 3.4
- You can go [here](https://www.python.org/downloads) to install the lastest one
- Check if you have `python` and `pip` installed, run this command in your terminal:

```bash
python --version
pip --version
```
**requests**
- Requests is not a built in module (does not come with the default python installation), so you will have to install it

```bash
pip install requests
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
python check-device-status.py
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
