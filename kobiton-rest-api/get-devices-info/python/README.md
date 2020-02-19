# 1. Prerequisites
**Python**
- Python version >= 2.7.9 or >= 3.4
- You can go [here](https://www.python.org/downloads) to install the lastest Python
- Pip is already installed if you are using Python 2 >=2.7.9 or Python 3 >=3.4 downloaded from python.org
- Check if you have `python` and `pip` installed, run this command in your terminal:

```bash
python --version && pip --version
```

- Expected output:

![image](https://user-images.githubusercontent.com/46931196/71167765-e10ee300-2287-11ea-8c50-dbb22110266f.png)

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

![image](https://user-images.githubusercontent.com/46931196/71227910-3b08ba80-2313-11ea-99ea-074160bc61cf.png)


or no online device:

![image](https://user-images.githubusercontent.com/46931196/70690196-bf8e8400-1ce8-11ea-8145-d697dbfd18af.png)