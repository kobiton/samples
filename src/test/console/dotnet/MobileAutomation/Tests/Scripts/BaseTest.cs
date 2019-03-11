using System;
using Microsoft.Win32.SafeHandles;
using OpenQA.Selenium.Remote;

namespace MobileAutomation.Tests
{
  public abstract class BaseTest : IDisposable
  {
    protected RemoteWebDriver driver;
    bool disposed = false;
    System.Runtime.InteropServices.SafeHandle handle = new SafeFileHandle(IntPtr.Zero, true);

    public void Dispose()
    {
      Dispose(true);
      GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
      if (disposed) return;

      if (disposing)
      {
        handle.Dispose();
        if (driver != null)
        {
          driver.Quit();
        }
      }
      disposed = true;
    }
  }
}