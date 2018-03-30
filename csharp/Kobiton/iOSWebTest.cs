using OpenQA.Selenium.Remote;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Threading;

namespace Kobiton
{
  [TestClass()]
  public class iOSWebTest
  {
    string wrongUsernameMsg = "Your username is invalid!";
    string wrongPasswordMsg = "Your password is invalid!";
    string successMsg = "You logged into a secure area!";
    RemoteWebDriver driver;

    [TestInitialize]
    public void Initialize()
    {
      driver = new RemoteWebDriver(Configs.kobitonServerUrl(), Configs.desiredCapabilitiesiOSWeb(), TimeSpan.FromSeconds(Configs.SESSION_TIMEOUT));
      driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromSeconds(120));
    }

    [TestCleanup]
    public void Cleanup()
    {
      if (driver != null)
      {
        driver.Quit();
      }
    }

    [TestMethod]
    public void testIFixitiOSWeb()
    {
      // Keep the test cases in order
      testInvalidUsername();
      testInvalidPassword();
      testLoginSuccessfully();
    }

    public void testInvalidUsername()
    {
      Console.WriteLine("should return error when we input wrong username");
      login("foo", "SuperSecretPassword!");
      Assert.IsTrue(getMessage().Contains(wrongUsernameMsg));
    }

    public void testInvalidPassword()
    {
      Console.WriteLine("should return error when we input wrong password");
      login("tomsmith", "SuperSecretPassword");
      Assert.IsTrue(getMessage().Contains(wrongPasswordMsg));
    }

    public void testLoginSuccessfully()
    {
      Console.WriteLine("should run test successfully with correct username and password");
      login("tomsmith", "SuperSecretPassword!");
      Assert.IsTrue(getMessage().Contains(successMsg));
    }

    public void login(String userName, String password)
    {
      driver.Navigate().GoToUrl("http://the-internet.herokuapp.com/login");
      driver.FindElementById("username").SendKeys(userName);
      driver.FindElementById("password").SendKeys(password);
      driver.FindElementByXPath("//form[@name='login']").Submit();
    }

    public String getMessage()
    {
      return driver.FindElementById("flash").Text;
    }
  }
}