import androidApp.TestRunner_android_app;
import androidWeb.TestRunner_android_web;
import iosApp.TestRunner_ios_app;
import iosWeb.TestRunner_ios_web;
import org.junit.Test;
import org.junit.experimental.ParallelComputer;
import org.junit.runner.JUnitCore;

public class RunCucumberTest {

    @Test
    public void parallelTest() {
        Class[] cls = {
                TestRunner_android_web.class,
                TestRunner_ios_web.class,
                TestRunner_android_app.class,
                TestRunner_ios_app.class};

        // Parallel among classes
        JUnitCore.runClasses(ParallelComputer.classes(), cls);

        // Parallel all methods in all classes
        JUnitCore.runClasses(new ParallelComputer(true, true), cls);
    }
}
