# Prerequisites
- Install Java JDK 1.8 [here](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- Install IntelliJ IDEA (Community Edition) [here](https://www.jetbrains.com/idea/download/)
- Open project as Maven project

# Steps

- Update your username & apiKey on Common class

```
static String username = "";
static String apiKey = "";
```

- Run Main class

- The default script will download an app from URL and then upload it into your Kobiton Apps Repo

```
 Common.downloadFile("https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/com.dozuki.ifixit.apk", "com.dozuki.ifixit.apk");
```

- If you want to upload your app from local, please update filePath & fileName on Main class

```
static  String filePath ="com.dozuki.ifixit.apk";
static  String fileName ="iFixit";
```
