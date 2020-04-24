## Java sample

### Init

- Access [Kobition](https://portal.kobiton.com) to get *USERNAME* and *ACCESS_KEY*
- Replace *USERNAME* and *ACCESS_KEY* on kobiton.com.configs/Configs.java

### Prerequisites

 - Install [Maven](https://maven.apache.org/install.html)
 - Build project with [Maven](https://maven.apache.org/run-maven/) `mvn clean install`
 - Open Java project in Eclipse
 - Install [TestNG Plugin](http://beust.com/eclipse) if it doesn't exist.

### Run tests

#### Run test with TestNG - package kobiton.com.testng

#### 1. Run test suite by right-clicking on testng.xml and select **Run-as → TestNG Suite**

#### 2. Run separate files by right-click on each file and select **Run-as → TestNG Test**

 - Select `AndroidWebTest.java`  
 - Select `AndroidAppTest.java`  
 - Select `iOSWebTest.java`
 - Select `iOSAppTest.java`

#### Run test with JUnit - package kobiton.com.junit

#### 1. Run test suite by right-clicking on RunTestSuite.java and select **Run-as → JUnit Test**

#### 2. Run separate files by right-click on each file and select **Run-as → JUnit Test**

 - Select `AndroidWebTest.java`  
 - Select `AndroidAppTest.java`  
 - Select `iOSWebTest.java`
 - Select `iOSAppTest.java`
 
#### Run parallel tests with TestNG
### Modify `udid` on parallel_testng.xml to wait the device online
#### Run test suite by right-clicking on parallel_testng.xml and select **Run-as → TestNG Suite**