Python samples
==============

These are simple samples of how to use Python to run Appium tests. It is suggested that you use a test runner such as pytest or nose.

### Kobiton Credentials
  * Access https://portal.kobiton.com/ with your account
  * Get your username & API Key
  * In the terminal export your Kobiton Credentials as environmental variables:

  ```shell
    export KOBITON_USERNAME=<your Kobiton username>
    export KOBITON_ACCESS_KEY=<your Kobiton access key>
  ```


### 1. Pytest

#### Setup

  ```shell
    pip install virtualenv
    virtualenv venv
    source venv/bin/activate
    pip install pytest
    pip install -r requirements.txt
  ```

#### Usage:

##### Run all tests

```shell
  py.test tests
```

##### Run an arbitrary file

```shell
  py.test tests/test_android_web.py
  py.test tests/test_android_app.py
  py.test tests/test_ios_web.py
  py.test tests/test_ios_app.py
```

### 2. Robot framework

- Modify `username`, `apiKey` in `sample_kobiton_web.robot`, `sample_kobiton_app.robot` file

- Install appium libraries:

```shell
  pip install robotframework-appiumlibrary
  pip install robotframework-selenium2library requests
```

#### Usage:

```shell
  robot sample_kobiton_app.robot
  robot sample_kobiton_web.robot
```


### 3. Selenium

#### Install libraries

```shell
  pip install Appium-Python-Client
  pip install selenium
```


- Modify `username`, `apiKey` and `desiredCaps` in  in `configs.py` file


#### Usage:

```shell
  cd python/selenium/python2.7
  python2 androidWebTest.py
  python2 androidAppTest.py
  python2 iOSWebTest.py
  python2 iOSAppTest.py
```

```shell
  cd python/selenium/python3.7
  python3 androidWebTest.py
  python3 androidAppTest.py
  python3 iOSWebTest.py
  python3 iOSAppTest.py
```

### Resources

- [Selenium Documentation](http://www.seleniumhq.org/docs/)

- [pip](http://pip-installer.org/)

- [Python 2.7 Documentation](https://docs.python.org/2.7/)

- [Python 3.6 Documentation](https://docs.python.org/3.6/)

- [Pytest Documentation](http://pytest.org/latest/contents.html)

- [virtualenv](https://virtualenv.readthedocs.org/en/latest/)

- [Selenium2Library](https://github.com/rtomac/robotframework-selenium2library)

- [Robot Framework](http://code.google.com/p/robotframework/)

- [Appium-client Repository](https://pypi.python.org/simple/appium-python-client)

- [Selenium Repository](https://pypi.python.org/simple/selenium)
