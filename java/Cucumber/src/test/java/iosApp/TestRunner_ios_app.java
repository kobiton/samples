package iosApp;

import org.junit.runner.RunWith;
import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;

@RunWith(Cucumber.class)
@CucumberOptions(
		plugin = { "json:target/cucumber/ios_app.json", 
				   "html:target/cucumber/ios_app.html",
				   "pretty" },
		features = {"src/test/resources/features/Test_ios_app.feature"},
		glue = { "iosApp" })

public class TestRunner_ios_app {

}
