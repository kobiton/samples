package iosWeb;

import org.junit.runner.RunWith;
import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;

@RunWith(Cucumber.class)
@CucumberOptions(
		plugin = { "json:target/cucumber/ios_web.json", 
				   "html:target/cucumber/ios_web.html",
				   "pretty" },
		features = {"src/test/resources/features/Test_ios_web.feature"},
		glue = { "iosWeb" })

public class TestRunner_ios_web {

}
