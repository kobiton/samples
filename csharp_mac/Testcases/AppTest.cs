using System;
using Xunit;
using Appium.Models;
using Appium.Utils;

namespace Appium.Testcases
{
    public class AppTest
    {
        iFixit_Android testAppAndroid_;
        UIKitCatalog_IOS testAppIOS_;
        Capabilities capabilites;
        private String categoryTitle;
        public AppTest(){ capabilites = new Capabilities();}

        [Fact]
        public void SearchForCatagoryNameOnAndroidApp()
        {
          try {
            testAppAndroid_ = new iFixit_Android(capabilites.GetAndroidAppDesiredCapability());
            Console.WriteLine("#### should be able to search for 'Acura' on iFixit Android app\n");
            categoryTitle = "Acura";
            Assert.Contains(categoryTitle, testAppAndroid_.GetCategoryTitle());
          }
          finally{
            if(testAppAndroid_ != null) {
              testAppAndroid_.CleanUp();
            }
          }
        }

        [Fact]
        public void SearchForCategoryNameOnIOSApp()
        {
          try {
            testAppIOS_ = new UIKitCatalog_IOS(capabilites.GetIOSAppDesiredCapability());
            Console.WriteLine("#### should be able to get title 'Activity Indicators' on iFixit iOS app\n");
            categoryTitle = "Activity Indicators";
            Assert.Contains(categoryTitle, testAppIOS_.GetCategoryTitle());
          }
          finally {
            if(testAppIOS_ != null) {
              testAppIOS_.CleanUp();
            }
          }
        }
    }
}
