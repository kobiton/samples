# 1. Getting Started

This sample demonstrates how to execute Automation testing on Kobiton using Cucumber and JUnit Test Framework

# 2. Pre-requisites

* [Java 1.8+](https://java.com/en/download/) installed.

* [Maven](https://maven.apache.org/install.html) installed.

# 3. Prepare environment

Below variables are required to execute tests

* `KOBITON_USERNAME`
* `KOBITON_API_KEY`
* `DesiredCapabilities`

Steps to set these variables

1. KOBITON_USERNAME: is your username on Kobiton
2. KOBITON_API_KEY: to get it, visit [https://portal.kobiton.com/settings/keys](https://portal.kobiton.com/settings/keys) with your account
3. DesiredCapabilities: specific desired capaibilities to execute test
4. Set those variables in the puporsed script at step "start a session"
![Set up environment](https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/images/Set_up_environment.png)

# 4. Execute tests

### 1. By using Editor (Eclipse, Intellij...)

Eclipse editor:
* [Download Eclipse] (http://www.eclipse.org/downloads/)
* [Plugin Maven into Eclipse] (http://www.eclipse.org/m2e/)
* ![Run TestRunner file as JUnit test](https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/images/Run_junit_test_on_eclipse_editor.png)

### 2. By using command line
Open Terminal and go to this folder, tests can be run by one of following commands

* Android web
`mvn test -Dcucumber.options="--tags @androidWeb"`

* Android app
`mvn test -Dcucumber.options="--tags @androidApp"`

* IOS web
`mvn test -Dcucumber.options="--tags @iosWeb"`

* IOS app
`mvn test -Dcucumber.options="--tags @iosApp"`

* All web tests
`mvn test -Dcucumber.options="--tags @web"`

* All app tests
`mvn test -Dcucumber.options="--tags @app"`

* All tests
`mvn test -Dcucumber.options="--tags @demoCucumber"`
