## Python-Pytest-Selenium

### Environment Setup

1. Global Dependencies
    * [Install Python](https://www.python.org/downloads/)
    * Or Install Python with [Homebrew](http://brew.sh/)
    ```
    $ brew install python
    ```
    * Install [pip](https://pip.pypa.io/en/stable/installing/) for package installation

2. Kobiton Credentials
    * In the terminal export your Kobiton Credentials as environmental variables:
    ```
    $ export KOBITON_USERNAME=<your Kobiton username>
    $ export KOBITON_ACCESS_KEY=<your Kobiton access key>
    ```
3. Project
	* The recommended way to run your tests would be in [virtualenv](https://virtualenv.readthedocs.org/en/latest/). It will isolate the build from other setups you may have running and ensure that the tests run with the specified versions of the modules specified in the requirements.txt file.
	```$ pip install virtualenv```
	* Create a virtual environment in your project folder the environment name is arbitrary.
	```$ virtualenv venv```
	* Activate the environment:
	```$ source venv/bin/activate```
	* Install the required packages:
	```$ pip install -r requirements.txt```

### Running Tests:  -n option designates number of parallel tests and -s to disable output capture.

*  Tests:
    ```$ py.test tests```

### Resources

##### [Selenium Documentation](http://www.seleniumhq.org/docs/)

##### [Python Documentation](https://docs.python.org/2.7/)

##### [Pytest Documentation](http://pytest.org/latest/contents.html)

### Known Issues:
* Test output will be captured in .testlog files as the pytest-xdist plugin has issues with not capturing stdout and stderr. You can use the following commands to output session id's for CI integration and clean up.
```
$ cat *.testlog
$ rm -rf *.testlog
```
