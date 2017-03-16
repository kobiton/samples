using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;

namespace util {
	public class MyTouchableWebDriver : RemoteWebDriver, IHasTouchScreen {
		public ITouchScreen TouchScreen { get; }

		public MyTouchableWebDriver(Uri remoteAddress, DesiredCapabilities desiredCapabilities) : 
		base(remoteAddress, desiredCapabilities, TimeSpan.FromSeconds(240)) {
			TouchScreen = new RemoteTouchScreen(this);
		}
  }
}