package web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class CheckboxesPage extends Base {
  // Page elements
  @FindBy (xpath = "//*[@id=\"checkboxes\"]/input[1]")
  public WebElement checkbox1;
  @FindBy (xpath = "//*[@id=\"checkboxes\"]/input[2]")
  public WebElement checkbox2;
  @FindBy (xpath = "//*[@id=\"content\"]")
  public WebElement content;

  public CheckboxesPage(WebDriver driver, long timeoutInSeconds){
    super(driver, timeoutInSeconds, "http://the-internet.herokuapp.com/checkboxes");
  }

  public void open() throws Exception{
    super.open();
    this.waitForElementVisible(checkbox1);
  }

  public Boolean isCheckbox1Selected() {
    return checkbox1.isSelected();
  }

  public String getInputType() {
    return checkbox1.getAttribute("type");
  }

  public void clickCheckbox1() {
    checkbox1.click();
  }
}
