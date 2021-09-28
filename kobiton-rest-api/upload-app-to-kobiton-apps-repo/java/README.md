# Prerequisites
- Install Java JDK 1.8 [here](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- Install Maven [here](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html#installation)

# Steps

- Update your username & apiKey on Common class

```
static String username = "";
static String apiKey = "";
```

- Please update variables filePath & fileName on Main class to upload your app from local

```
static  String filePath ="";
static  String fileName ="";
```

- Run the following commands

```
mvn clean
mvn package
java -cp ./target/com.kobiton.inc-1.0-SNAPSHOT-jar-with-dependencies.jar Main
```
