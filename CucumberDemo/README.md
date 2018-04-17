# 1. Getting Started

This sample demonstrate how to execute Automation testing on Kobiton using Cucumber and junit framework

# 2. Pre-requisites

* [Java 1.8+](https://java.com/en/download/) installed.

* [Maven](https://maven.apache.org/install.html) installed.

# 3. Prepare environment variables

Below environment variables are required to execute tests

* `KOBITON_USERNAME`
* `KOBITON_API_KEY`

Steps to set these variables

1. To get key for `KOBITON_API_KEY`, visit [https://portal.kobiton.com/settings/keys](https://portal.kobiton.com/settings/keys) with your account
2. Set the environment variables the specific script in step "start a session"

# 4. Execute tests

1. Open editor(Eclipse, IntelliJ...) then choose a TestRunner to run with junit test
2. Open Terminal and go to this folder, tests can be run by one of following commands

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
