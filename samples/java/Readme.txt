I. Create folders
	1. Create folder KryptonExamplesJavaTestNG
	2. Create sub-folder KryptonExamplesJavaTestNG/classes
	3. Create sub-folder KryptonExamplesJavaTestNG/libs

II. Copies files to KryptonExamplesJavaTestNG folder
	1. GoogleTests.java
	2. testng.xml

III. Download libraries and copy to sub-folder KryptonExamplesJavaTestNG/libs
	1. java-client-3.3.0.jar at https://search.maven.org/#artifactdetails%7Cio.appium%7Cjava-client%7C3.3.0%7Cjar
	2. selenium-server-standalone-2.48.2.jar at http://www.seleniumhq.org/download/
	3. testng-6.8.5.jar at http://www.java2s.com/Code/Jar/t/Downloadtestng685jar.htm
	4. jcommander-1.48.jar at http://central.maven.org/maven2/com/beust/jcommander/1.48/jcommander-1.48.jar

IV. Modify testng.xml file
Update these params below to match with your android device
	<parameter name="deviceName" value="Galaxy S4"/>
	<parameter name="platformVersion" value="5.0.1"/>
	<parameter name="emailSend" value="krypton.portal@gmail.com"/> // You can create a new Gmail to compose email.
	<parameter name="emailTo" value="krypton.portal2@gmail.com"/> // You can create a new Gmail to receive email.
	<parameter name="password" value="Admin@123456"/> // We expect emailSend & emailTo use the same password.
	
V. Start appium server at local

VI. Compile & Execute the scripts
	1. Open terminal
	2. Navigate to KryptonExamplesJavaTestNG folder
	3. Run command to compile: javac -d classes -cp "libs/*" GoogleTests.java
	4. Run command to execute tests:   java -cp "classes:libs/*" org.testng.TestNG testng.xml