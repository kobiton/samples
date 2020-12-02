package example.appium;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.io.File;

import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import io.appium.java_client.MobileElement;
import pro.truongsinh.appium_flutter.FlutterFinder;

public class FlutterDemo extends BaseDriver {
  protected FlutterFinder find;
  @Before
  public void setUp() throws Exception {
    super.setUp();
    find = new FlutterFinder(driver);
  }
  @Test
  public void basicTest () throws InterruptedException {
    MobileElement counterTextFinder = find.byValueKey("counter");
    MobileElement buttonFinder = find.byValueKey("increment");

    // Doc: https://api.flutter.dev/flutter/flutter_driver/FlutterDriver/tap.html

    assertEquals(driver.executeScript("flutter:checkHealth"), "ok");
    driver.executeScript("flutter:clearTimeline");
    driver.executeScript("flutter:forceGC");



    driver.context("NATIVE_APP");
    File f1 = driver.getScreenshotAs(OutputType.FILE);
    f1.renameTo(new File("./native-screenshot.png"));



    driver.context("FLUTTER");

    buttonFinder.click();
    System.out.println(counterTextFinder.getText());
    assertEquals(counterTextFinder.getText(), "1");

    File f2 = driver.getScreenshotAs(OutputType.FILE);
    f2.renameTo(new File("./flutter-screenshot.png"));

    buttonFinder.click();
    System.out.println(counterTextFinder.getText());
    assertEquals(counterTextFinder.getText(), "2");

    File f3 = driver.getScreenshotAs(OutputType.FILE);
    f3.renameTo(new File("./flutter-tab.png"));



  }

}
