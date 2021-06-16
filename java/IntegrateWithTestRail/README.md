## Java sample

### Init

- Access [Kobition](https://portal.kobiton.com) to get `USERNAME` and `API_KEY`
- Update value for `USERNAME` and `API_KEY` on [Configs.java](./src/main/java/configs/Configs.java#L10-L11)
- Access TestRail to get `tcmServerAddress`, `tcmUsername`, `tcmApiKey`, `externalRunId` and `externalCaseId`
- Update value for `tcmServerAddress`, `tcmUsername`, `tcmApiKey` and `externalRunId` on [Configs.java](./src/main/java/configs/Configs.java#L34-L38)
- Update value for `externalCaseId` on [testng.xml](./src/main/java/configs/testng.xml)

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
