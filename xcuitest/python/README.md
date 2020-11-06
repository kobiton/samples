# Python samples using xcuitest framework

## I. Setup environment on Mac

#### Homebrew

- [Homebrew](https://brew.sh/) is a package manager for the Mac.
-  To install Homebrew, open terminal and type the following command:

```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- This will install Homebrew on your Mac. To check the version, type the following command:

```bash
brew -v
```

#### Python

- To install Python via Homebrew, type the following command:

```bash
brew install python
```

- To check if you have [Python](https://www.python.org/) installed, run this command in your terminal:

```bash
python --version
```

### Pip

- Homebrew installs pip pointing to the Homebrew’d Python for you.

## Install the xcuitest samples

Clone this script directly from our GitHub repo and install dependencies:

```
mkdir kobiton-samples
cd kobiton-samples
git clone https://github.com/kobiton/samples.git
cd samples/xcuitest/python/
pip install requests
```

## Getting started with Kobiton

- Go to [Kobiton Devices page](https://portal.kobiton.com/devices).
- Hover over the device you want to test, click on the More icon then select Automation Settings.

![automation-settings.png](/xcuitest/assets/automation-settings.png)

- Select Framework = xcuitest
- Select Language = Python.

![automation-settings-python.png](/xcuitest/assets/automation-settings-python.png)

- Input the value for `username` & `apiKey` & in the sample script.

```python
const username = ''
const apiKey = ''
```
- Update the value for `deviceName` (you also can use `platformVersion` or `udid`) to indicate your exptected testing device.


## II. Execute the Sample Tests

Once you have everything set up, you can run the example test simply by running one of the following command:

```bash
python xcuitest.py
```
## III. Report on Test Results

- When you see your test has the response message that `Session is started.`, you can access [Session Page](https://portal.kobiton.com/sessions) to get your test status.

```
Response body: { kobitonSessionId: 98363, message: 'Session is started.' }
```

## IV. Notes

If you want to run the test scripts with your application, please:
- Input the value for `app` with your application under test. The `app` value can be a direct link or you can upload your app to the Kobiton Stores and get the appId.

![kobiton-store.png](/xcuitest/assets/kobiton-store.png)

- At `Automation Settings`, scroll down to upload the test runner to Kobiton repository and get the downloadable link, then input the value for `testRunner`.

![upload-test-runner.png](/xcuitest/assets/upload-test-runner.png)

- Put your tests you want to run at `tests: []`
- Run your test scripts and enjoy the results.
