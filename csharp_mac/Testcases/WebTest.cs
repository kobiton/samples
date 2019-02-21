using System;
using Xunit;
using Appium.Models;
using Appium.Utils;

namespace Appium.Testcases
{
    public class WebTest
    {
        GooglePage testPage;
        private readonly string searchFor = "Kobiton";
        private Capabilities capabilities;
        private const int WAIT_TIME = 2;
        public WebTest(){ capabilities = new Capabilities();}

        [Fact]
        public void SearchForKobitonOnAndroid()
        {
            try
            {
                testPage = new GooglePage(capabilities.GetAndroidWebDesiredCapability());
                Console.WriteLine("#### should be able to search for 'Kobiton' using google on Android\n");
                testPage.Login();
                Helpers.Pause(2);
                Assert.Contains(searchFor, testPage.GetDriverTitle());
            }
            finally {
              if(testPage != null) {
                testPage.CleanUp();
              }
            }
        }

        [Fact]
        public void SearchForKobitonOniOS()
        {
            try
            {
                testPage = new GooglePage(capabilities.GetiOSWebDesiredCapability());
                Console.WriteLine("#### should be able to search for 'Kobiton' using google on iOS\n");
                testPage.Login();
                Helpers.Pause(2);
                Assert.Contains(searchFor, testPage.GetDriverTitle());
            }
            finally {
              if(testPage != null) {
                testPage.CleanUp();
              }
            }
        }
    }
}
