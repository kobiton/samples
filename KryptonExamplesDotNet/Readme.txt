1. Appium for Window is installed and started.
2. Install Visual Studio (I have worked on Visual Studio 2010 & 2012)
3. Create a new solution with name KryptonExamplesDotNet
	1. Launch Visual Studio and navigate to File > New > Project.
	2. Select Visual C# > Class Library > Name your project > Click on OK button
	3. Delete Class1.cs file because it is no use.
	4. Download and add GoogleTests.cs file to the current project
4. Install some packages by Package Manager Console (Select TOOLS->Library Package Manager -> Package Manager Console
	1. Install-Package Appium.WebDriver
	2. Install-Package Selenium.WebDriver
	3. Install-Package NUnit
	4. Install-Package NUnit.Runners
5. Modify DesiredCapabilities in GoogleTests.cs file
6. Build Project at Debug mode
7. Open command line and navigate to project "<path>KryptonExamplesDotNet\packages\NUnit.Console.3.0.1\tools\
8. Command line arguments: nunit-agent.exe "<path>\KryptonExamplesDotNet\KryptonExamplesDotNet\bin\Debug\KryptonExamplesDotNet.dll

Note: the scripts are automated for these view-ports as Samsung Galaxy S5, Google Nexus 5