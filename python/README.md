Python samples
==============

These are simple samples of how to use Python to run Appium tests. It is suggested that you use a test runner such as pytest or nose.

### Install libraries:

```shell
pip install Appium-Python-Client==0.26
pip install pytest
pip install selenium==3.12.0
pip install virtualenv
pip install robotframework-selenium2library requests
```


### Kobiton Credentials
  * Access https://portal.kobiton.com/ with your account
  * Get your username & API
  * In the terminal export your Kobiton Credentials as environmental variables:

  ```shell
  $ export KOBITON_USERNAME=<your Kobiton username>
  $ export KOBITON_ACCESS_KEY=<your Kobiton access key>
  ```


### 1. Pytest-Selenium

- Create a virtual environment in your project folder the environment name is arbitrary.

  ```shell
  $ virtualenv venv
  ```

- Activate the environment:
  ```shell
  $ source venv/bin/activate
  ```

- Install the required packages:
  ```shell
  $ pip install -r pytest-selenium/requirements.txt
  ```

#### Usage:
  ```shell
  $ py.test pytest-selenium/tests
  ```
#### Known Issues:
* Test output will be captured in .testlog files as the pytest-xdist plugin has issues with not capturing stdout and stderr. You can use the following commands to output session id's for CI integration and clean up.

```shell
$ cat *.testlog
$ rm -rf *.testlog
```

### 2. Robot framework

- Modify `username`, `apiKey` in `sample_kobiton_web.robot`, `sample_kobiton_app.robot` file

- install appium library:

`pip install robotframework-appiumlibrary`

#### Usage:

`robot sample_kobiton_app.robot`
`robot sample_kobiton_web.robot`


### 3. Selenium

- Modify `username`, `apiKey` and `desiredCaps` in  in `configs.py` file


#### Usage:

```shell
python selenium/androidWebTest.py
python selenium/androidAppTest.py
python selenium/iOSWebTest.py
python selenium/iOSAppTest.py
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
