# 1. Prerequisites
**JDK**
- JDK version >= 1.8.0_212 [Link](https://www.java.com/en/download/help/index_installing.xml)
- Check if you have `JDK` installed, run this command in your terminal:

```bash
java -version
```

- Expected output:

![image](https://user-images.githubusercontent.com/46931196/71164631-10baec80-2282-11ea-91bd-7ea07715fc77.png)

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

![image](https://user-images.githubusercontent.com/46931196/71165819-19142700-2284-11ea-89e8-86db9b6ef1d5.png)

or no online device:

![image](https://user-images.githubusercontent.com/46931196/70690196-bf8e8400-1ce8-11ea-8145-d697dbfd18af.png)
