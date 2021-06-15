## Java sample

### Init

- Access [Kobition](https://portal.kobiton.com) to get `USERNAME` and `ACCESS_KEY`
- Replace `USERNAME` and `ACCESS_KEY` on `configs/Configs.java`
- Access TestRail to get `tcmServerAddress`, `tcmUsername`, `tcmApiKey`, `externalRunId` and `externalCaseId`
- Replace `tcmServerAddress`, `tcmUsername`, `tcmApiKey` and `externalRunId` on `configs/Configs.java`
- Replace `externalCaseId` on `configs/testmg.xml`

### Prerequisites

 - Install [Maven](https://maven.apache.org/install.html)
 - Build project with [Maven](https://maven.apache.org/run-maven/) `mvn clean install`
 - Open Java project in Eclipse/InteliJ
 - Install [TestNG Plugin](http://beust.com/eclipse) if it doesn't exist.

### Run tests

#### Run test with TestNG - package testng

#### 1. Run test suite by right-clicking on `testng.xml` and select **Run-as → TestNG Suite**

#### 2. Run separate files by right-click on each file and select **Run-as → TestNG Test**

 - Select `AndroidTests` 
 - Select `iOSTests` 