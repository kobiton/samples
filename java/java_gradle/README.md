# 1. Getting Started

These samples demonstrate how to execute Automation testing on Kobiton, the detail sample code is at `src/test/java/com/kobiton/usecases/`

# 2. Pre-requisites

* [Java 1.8+](https://java.com/en/download/) installed.

# 3. Prepare environment variables

Below environment variables are required to execute tests

* `KOBITON_USERNAME`
* `KOBITON_API_KEY`

Steps to set these variables

1. To get key for `KOBITON_API_KEY`, visit [https://portal.kobiton.com/settings/keys](https://portal.kobiton.com/settings/keys) with your account
1. Set the environment variables on shell before running the tests, or add to `~/.profile` to keep them persistence

* On Mac

```bash
export KOBITON_USERNAME='<username>'
export KOBITON_API_KEY='<apiKey>'
```

* On Windows

```bash
SET KOBITON_USERNAME="<username>"
SET KOBITON_API_KEY="<apiKey>"
```

# 4. Execute tests

1. Open Terminal and go to this folder (having this README.md file)
2. Tests can be run by one of following commands

* On Mac

```bash
sh gradlew exeTest -Psuite="<suiteName>"
```

Example: `sh gradlew exeTest -Psuite="web_test_android"`

* On Windows

```bash
gradlew.bat exeTest -Psuite="<suiteName>"
```

Example:`gradlew.bat exeTest -Psuite="web_test_android"`

**`<suiteName>` is one of below**

* `web_test_android`
* `web_test_ios`
* `app_test_android`
* `app_test_ios`
* `app_test`: run app test on both iOS and Android device
* `web_test`: run web test on both iOS and Android device
* `single_test_multiple_devices`: run single test on 2 devices in parrallel

# 5. Kobiton Practices
Include some kobiton specific practices that we think it would be useful when scripting and executing automation test.

You can find these practices at `src/test/java/com/kobiton/usecases/practices`.