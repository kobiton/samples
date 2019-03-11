using System;
using MobileAutomation.Tests.Scripts;

namespace MobileAutomation
{
  class MainClass
  {
    public static void Main(string[] args)
    {
      Console.WriteLine("------------------------Android Web Test------------------------");
      new AndroidWebTest().TestIFixitAndroidWeb();

      Console.WriteLine();
      Console.WriteLine("------------------------Android App Test------------------------");
      new AndroidAppTest().TestIFixitAndroidApp();

      Console.WriteLine();
      Console.WriteLine("------------------------iOS Web Test------------------------");
      new IOSWebTest().TestIFixitiOSWeb();

      Console.WriteLine();
      Console.WriteLine("------------------------iOS App Test------------------------");
      new IOSAppTest().TestIFixitIOSApp();
    }
  }
}