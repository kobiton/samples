### Python sample

### Portal Information credentials:

- Portal URL: https://portal.kobiton.com/

#### Just case you want to use another account & devices
* Access [Kobition](https://portal.kobiton.com) to get *username* and *api key*
* Open file configs.py file
* Replace *username* and *api key*
* Modify`desiredCaps` to match with your available devices


#### Prerequisites
* For Python 2.7:
	- Install python 2.7: `brew install python`

* For Python 3.6:
	- Install python 3.6: `brew install python3`

* General:
	- Install selenium client library:  `pip install selenium==3.0.2`
	- Install appium python client library:	`pip install Appium-Python-Client`
	- References: In order to see specific versions of selenium & appium client to install.
		+ Appium-client Repository: https://pypi.python.org/simple/appium-python-client
		+ Selenium Repository: https://pypi.python.org/simple/selenium


#### Run tests
* NOTE: Need to set relevant python version and move to right location and run below commands
```bash
python androidWebTest.py
python androidAppTest.py
python iOSWebTest.py
python iOSAppTest.py
```
