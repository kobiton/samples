# 1. Prerequisites
**Python**
- Python version >= 2.7.9 or >= 3.4
- You can go [here](https://www.python.org/downloads) to install the lastest Python
- Check if you have `python` installed, run this command in your terminal:

```bash
python --version
```

- Expected output:

![image](https://user-images.githubusercontent.com/46931196/71228886-3a255800-2316-11ea-8d83-7c330e3501cf.png)

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
bash check-device-status.sh <KOBITON_USERNAME> <KOBITON_API_KEY>
```

- Expected output:

![image](https://user-images.githubusercontent.com/46931196/71230951-444b5480-231e-11ea-9e7d-d938f12bd692.png)
