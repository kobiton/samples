- download and install .NET Core for Mac (https://www.microsoft.com/net/download)
- check to make .NET Core installed successfully
    `dotnet --version`
- change following environment variables in Utils/Environments.cs
    `USERNAME`, `API_KEY`, `API_URL`
- build project
    `dotnet build`
- run test
    + run all test
        `dotnet test`
    + run specific test
        `dotnet test --filter "Namespace.Class.TestCase"`
        ex: dotnet test --filter "appium.Testcases.WebTest.SearchForKobitonOniOS"
