package testng;

import com.google.common.collect.Lists;
import configs.Configs;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.WebElement;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class AndroidMobileShellTest {
	public static AndroidDriver<WebElement> driver = null;

	@BeforeTest
	public void Setup() throws MalformedURLException {
		driver = new AndroidDriver<WebElement>(Configs.kobitonServerUrl(), Configs.desiredCapabilitiesAndroidApp());
		driver.manage().timeouts().implicitlyWait(120, TimeUnit.SECONDS);
	}

	@AfterTest
	public void Teardown() {
		try {
			if (driver != null)
				driver.quit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test(priority = 1, description = "should allow to send command mobile shell")
	public void testMobileShell() {
		Map<String, Object> args = new HashMap<>();
		args.put("command", "echo");
		args.put("args", Lists.newArrayList("hello", "world"));

		Object output = driver.executeScript("mobile: shell", args);
		assert output.equals("hello world");
	}
}
