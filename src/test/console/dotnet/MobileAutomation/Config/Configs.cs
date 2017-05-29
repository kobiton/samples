using OpenQA.Selenium.Remote;
using System;
using System.Collections.Generic;
using System.Text;

namespace MobileAutomation.Config
{
    public class Configs
    {
        private static readonly Configs instance = new Configs();

        public static Configs Instance
        {
            get
            {
                return instance;
            }
        }

        public string ApiUrl { get; internal set; }
        public string TestSeverUrl { get; internal set; }
        public string TestSeverSecretKey { get; internal set; }
        public int RequestTimeout { get; internal set; }

        public const int SESSION_TIMEOUT = 20 * 60;

        private Configs()
        {
            ApiUrl = Environment.GetEnvironmentVariable("KOBITON_API_URL");
            TestSeverUrl = Environment.GetEnvironmentVariable("KOBITON_REPORT_SERVER_URL");
            TestSeverSecretKey = Environment.GetEnvironmentVariable("KOBITON_REPORT_SECRET_KEY");

            RequestTimeout = 30 * 1000;
        }
    }
}
