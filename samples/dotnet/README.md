1. Download DotNet project
2. Download nuget https://www.nuget.org/nuget.exe
3. Open command line and navigate to <path>\DotNet\packages folder
	+ Run command: <path>\nuget.exe install <path>\DotNet\DotNet\packages.config
	+ Run command: <path>\nuget.exe install <path>\DotNet\.nuget\packages.config
4. Open DotNet project by Visual Studio
5. Modify DesiredCapabilities in GoogleTests.cs file and Build Project
6. Run command: <path>\DotNet\packages\NUnit.Console.3.0.1\tools\nunit3-console.exe "<path>\DotNet\DotNet\bin\Debug\DotNet.dll
