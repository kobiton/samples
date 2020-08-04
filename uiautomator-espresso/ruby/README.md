# Ruby samples using UIAutomator/ Espresso framework

## I. Setup environment on Mac

#### rvm

- [rvm](https://rvm.io/) is a Ruby Version Manager for the Mac.
-  To install rvm, open terminal and type the following command:

```bash
curl -L https://get.rvm.io | bash -s stable
```
- Once this command has finished running you may need to restart your terminal for rvm to be recognised.

- To check the version, type the following command:

```bash
ruby -v
```

#### Install Ruby version 2.4.1

- To install ruby via rvm, type the following command:

```bash
rvm install ruby-2.4.1
```

- If you want to set this version of Ruby as the default version, in terminal type:

```bash
rvm --default use 2.4.1
```

## Get the uiautomator-espresso samples

Clone this script directly from our GitHub repo:

```
mkdir kobiton-samples
cd kobiton-samples
git clone https://github.com/kobiton/samples.git
cd samples/uiautomator-espresso/ruby/
```

## Getting started with Kobiton

- Go to [Kobiton Devices page](https://portal.kobiton.com/devices).
- Hover over the device you want to test, click on the More icon then select Automation Settings.

![automation-settings.png](/uiautomator-espresso/assets/automation-settings.png)

- Select Framework = UIAutomator/ Espresso.
- Select Language = Ruby.

![automation-settings-ruby.png](/uiautomator-espresso/assets/automation-settings-ruby.png)

- Input the value for `username` & `apiKey` & in the sample script.

```ruby
username = ''
apiKey = ''
```
- Update the value for `configuration` to indicate your exptected testing device.

```ruby
{
  'configuration': {
        'sessionName': 'Automation test session',
        'sessionDescription': 'This is an example for UIAutomator/ Espresso testing',
        'deviceName': '*',
        'deviceGroup': 'KOBITON',
        'app': '<APP_URL>',
        'testRunner': '<TEST_RUNNER_URL>',
        'continueOnFailure': true,
        'tests': []
    }
}
```

## II. Execute the Sample Tests

Once you have everything set up, you can run the example test simply by running one of the following command:

```bash
ruby uiautomator.rb
ruby espresso.rb
```
## III. Report on Test Results

- When you see your test has the response message that `Session is started.`, you can access [Session Page](https://portal.kobiton.com/sessions) to get your test status.

![response-body.png](/uiautomator-espresso/assets/response-body.png)

## IV. Notes

If you want to run the test scripts with your application, please:
- Input the value for `app` with your application under test.
- At `Automation Settings`, scroll down to upload the test runner to Kobiton repository and get the downloadable link, then input the value for `testRunner` in the configuration..

![upload-test-runner.png](/uiautomator-espresso/assets/upload-test-runner.png)

- Input your tests you want to run at `tests: []`
- Run your test scripts and enjoy the results.
