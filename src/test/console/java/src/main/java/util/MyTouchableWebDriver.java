package util;

import org.openqa.selenium.interactions.HasTouchScreen;
import org.openqa.selenium.interactions.TouchScreen;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteTouchScreen;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.HttpCommandExecutor;

import java.net.URL;

public class MyTouchableWebDriver extends RemoteWebDriver
implements HasTouchScreen {
  private TouchScreen touch;
  public MyTouchableWebDriver(URL remoteAddress, DesiredCapabilities desiredCapabilities) {
    super(remoteAddress, desiredCapabilities );
    touch = new RemoteTouchScreen(getExecuteMethod());
  }

  public MyTouchableWebDriver(HttpCommandExecutor executor, DesiredCapabilities desiredCapabilities) {
    super(executor, desiredCapabilities);
    touch = new RemoteTouchScreen(getExecuteMethod());
  }

  public TouchScreen getTouch() {
    return touch;
  }
}
