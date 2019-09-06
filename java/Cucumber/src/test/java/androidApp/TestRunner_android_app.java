package androidApp;

import org.junit.runner.RunWith;
import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;

@RunWith(Cucumber.class)
@CucumberOptions(
		plugin = { "json:target/cucumber/android_app.json", 
				   "html:target/cucumber/android_app.html",
				   "pretty" },
		features = {"src/test/resources/features/Test_android_app.feature"},
		glue = { "androidApp" })

public class TestRunner_android_app {

}
