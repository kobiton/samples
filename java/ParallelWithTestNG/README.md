# Parallel tests with Kobiton
This sample code demonstrates how to execute parallel tests with [TestNG](http://testng.org/doc/documentation-main.html) on Kobiton system

## Setup

* Clone the repo
* Install [Maven](https://maven.apache.org)
* Require Java[Java 1.8+](https://java.com/en/download/) installed
* Update `conf/parallel.xml` file with your [Kobiton Username and Api key](https://portal.kobiton.com/settings/keys)

## Run the tests

run `mvn test -P parallel`

## View the test results

You can view your test results on the [Kobiton test sessions](https://portal.kobiton.com/sessions)
