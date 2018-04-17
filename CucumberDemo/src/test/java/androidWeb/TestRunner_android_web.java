package androidWeb;

import org.junit.runner.RunWith;
import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;

@RunWith(Cucumber.class)
@CucumberOptions(
		plugin = { "json:target/cucumber/android_web.json", 
				   "html:target/cucumber/android_web.html",
				   "pretty" },
		features = {"src/test/resources/features/Test_android_web.feature"},
		glue = { "androidWeb" })

public class TestRunner_android_web {

}