package kobiton.com.junit;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        AndroidWebTest.class,
        AndroidAppTest.class,
        iOSWebTest.class,
        iOSAppTest.class
})

public class RunTestSuite {
	//normally, this is an empty class
}
