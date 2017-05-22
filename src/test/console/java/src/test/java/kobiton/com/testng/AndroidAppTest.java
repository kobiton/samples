package kobiton.com.testng;

import com.kobiton.service.DeviceService;
import com.kobiton.service.model.Device;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import io.appium.java_client.android.AndroidDriver;
import java.io.IOException;
import kobiton.com.utils.AutomationUtils;

public class AndroidAppTest {

    public static AndroidDriver<WebElement> driver = null;
    public final String firstQuestion = "Acura MDX";
    public final String secondQuestion = "Cruise Control";

    @BeforeTest
    public void Setup() {
        try {
            Device device = new DeviceService().getOnlineDevice("Android");
            System.out.println(String.format("Execute with: %s  udid: %s", device.getDeviceName(), device.getUdid()));
            driver = new AndroidDriver<>(AutomationUtils.kobitonServerUrl(), AutomationUtils.desiredCapabilitiesAndroidApp(device));
            driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
        } catch (IOException ex) {
            Assert.fail("set up failed", ex);
        }
    }

    @AfterTest
    public void Teardown() {
        try {
            if (driver != null) {
                driver.quit();
            }
        } catch (Exception e) {
            //Do-nothing
        }
    }

    @Test(priority = 1, description = "should allow to search some questions on Acura Support Community")
    public void testSearchQuestionsOnAcuraSupportCommunity() {

        /*
     * Steps: 1. Click on "Car and Truck" Categories on Homepage 2. Click on
     * "Acura" Categories
     * 
     * Expected: 1. General Information is "Acura". 2.Verify five devices below
     * displays. + Acura Integra + Acura MDX + Acura RL + Acura TL + Acura TSX
         */
        driver.findElementByXPath("//*[@resource-id='android:id/home']").click();
        sleep(2);
        driver.findElementByXPath("//*[@text='Car and Truck']").click();
        driver.findElementByXPath("//*[@text='Acura']").click();
        sleep(2);
        String acuraText = driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]")
                .getText();
        String acuraIntegraText = driver
                .findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=3]").getText();
        String acuraMDXText = driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=4]")
                .getText();
        String acuraRLText = driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=5]")
                .getText();
        String acuraTLText = driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=6]")
                .getText();
        String acuraTSXText = driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=7]")
                .getText();

        Assert.assertEquals(acuraText, "Acura");
        Assert.assertEquals(acuraIntegraText, "Acura Integra");
        Assert.assertEquals(acuraMDXText, "Acura MDX");
        Assert.assertEquals(acuraRLText, "Acura RL");
        Assert.assertEquals(acuraTLText, "Acura TL");
        Assert.assertEquals(acuraTSXText, "Acura TSX");

        /*
     * Steps: 
     * 1. Click on "Car and Truck" Categories on Homepage 
     * 2. Click on "Acura" Categories
     * 
     * Expected: 
     * 1. General Information is "Acura".
     * 2.Verify five devices below displays.
     * + Acura Integra
     * + Acura MDX
     * + Acura RL
     * + Acura TL
     * + Acura TSX
         */
        String getAttrName1 = searchQuestion(driver, firstQuestion);

        /*
     * Steps: 
     * 1. Clear text on Search field
     * 2. Enter keyword 'Cruise Control' 
     * 3. Click on Search icon 
     * 4. Wait a few seconds to get returned result
     * 5. Close app
     * 
     * Expected: It should show at least 1 result.
         */
        driver.navigate().back();
        String getAttrName2 = searchQuestion(driver, secondQuestion);

        driver.closeApp();

        getAttrName1 = getAttrName1.replaceAll("[^0-9]", "");
        Assert.assertTrue(Integer.parseInt(getAttrName1) >= 6, "The expected results are greater or equal to 6 results.");
        getAttrName2 = getAttrName2.replaceAll("[^0-9]", "");
        Assert.assertTrue(Integer.parseInt(getAttrName2) >= 1, "The expected results are greater or equal to 1 result.");
    }

    @Test(priority = 2, description = "should allow to search iFixit on Home screen")
    public void testSearchIFixitOnHomeScreen() {

        /*
     * Steps: 
     * 1. Reopen iFixit app 
     * 2. Click Search menu on the left menu bar
     * 3. Search keyword 'Macbook Pro 2015' 
     * 4. Press Enter button on keyboard
     * 
     * Expected: It should show at least 47 results.
     * 
     * 5. Select Devices item on the Guides/Devices dropdown
     * 
     * Expected: It should show at least 5 results.
         */
        driver.launchApp();
        sleep(2);
        driver.findElementByXPath("//*[@text='Search']").click();
        driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/abs__search_src_text']")
                .sendKeys("Macbook Pro 2015");
        driver.pressKeyCode(66);
        sleep(2);
        String firstResult = driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/search_result_count']")
                .getText();
        driver.findElementByXPath("//*[@resource-id='android:id/text1' and @text='Guides']").click();
        driver.findElementByXPath("//*[@resource-id='android:id/text1' and @text='Devices']").click();

        String secondResult = driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/search_result_count']")
                .getText();

        firstResult = firstResult.replaceAll("[^0-9]", "");
        Assert.assertTrue(Integer.parseInt(firstResult) >= 47, "The expected results are greater or equal to 47 results.");
        secondResult = secondResult.replaceAll("[^0-9]", "");
        Assert.assertTrue(Integer.parseInt(secondResult) >= 5, "The expected results are greater or equal to 5 results.");
    }

    public void swipe(String direction) {
        // Get the size of screen.
        Dimension size = driver.manage().window().getSize();

        int startx = (int) (size.width * 0.90);
        // Find endx point which is at left side of screen.
        int endx = (int) (size.width * 0.10);
        // Find vertical point where you wants to swipe. It is in middle of screen height.
        int starty = size.height / 2;

        if ("RightLeft".equals(direction)) {
            // Swipe from Right to Left.
            driver.swipe(startx, starty, endx, starty, 200);
        }

        if ("LeftRight".equals(direction)) {
            // Swipe from Left to Right.
            driver.swipe(endx, starty, startx, starty, 200);
        }
        sleep(2);
    }

    public void sleep(int seconds) {
        try {
            Thread.sleep(seconds * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public String searchQuestion(AndroidDriver<WebElement> driver, String question) {
        driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]").click();
        (new WebDriverWait(driver, 60)).until(
                ExpectedConditions.elementToBeClickable(By.xpath("//*[@resource-id='com.dozuki.ifixit:id/topic_info_image']")));
        swipe("RightLeft");
        (new WebDriverWait(driver, 60))
                .until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@resource-id='answersSearch']")));
        driver.findElementByXPath("//*[@resource-id='answersSearch']").sendKeys(question);
        driver.findElementByXPath("//*[@resource-id='searchIcon']").click();
        sleep(3);

        return driver.findElementByXPath("//android.view.View[contains(@content-desc,'questions') and @index=1]").getAttribute("name");
    }
}
