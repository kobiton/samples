# 1. Prerequisites
**OpenJDK**
- OpenJDK version >= 1.8.0_212
- You can go [here](https://openjdk.java.net/install) to install the lastest one
- Check if you have `openJDK` installed, run this command in your terminal:

```bash
java -version
```

**Dependencies**
- Download [org.json.*](https://jar-download.com/artifacts/org.json) and [org.apache.commons.codec.*](http://www.java2s.com/Code/Jar/o/Downloadorgapachecommonscodecjar.htm) jar files to [this place](./)

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
- Compile:
```bash
javac -cp "./*" CheckDeviceStatus.java
```

- Execute:

**Windows**
```bash
java -cp ".;*" CheckDeviceStatus
```
**Linux/Unix**
```bash
java -cp ".:*" CheckDeviceStatus
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
