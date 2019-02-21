using System;
namespace Appium.Utils
{
    public struct EnvironemntInfo
    {
        public Uri API_URL { get; set; }
        public string USER_NAME { get; set; }
        public string API_KEY { get; set; }
    }
    public class Environments
    {
        public EnvironemntInfo env;

        public Environments()
        {
            env = new EnvironemntInfo();
            env.API_URL = new Uri("https://api.kobiton.com/wd/hub");
            env.USER_NAME = "";
            env.API_KEY = "";
        }

        public EnvironemntInfo GetEnvironmentInfo()
        {
            return env;
        }

    }
}
