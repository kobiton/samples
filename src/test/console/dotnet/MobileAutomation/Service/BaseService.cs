using System;
using System.Net.Http;
using MobileAutomation.Config;

namespace MobileAutomation.Service
{
    public class BaseService
    {
        public BaseService()
        {
        }

        private HttpClient GetHttpClient()
        {
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("token", Configs.Instance.TestSeverSecretKey);
            return httpClient;
        }

        protected HttpResponseMessage GetSync(string url)
        {
            var task = GetHttpClient().GetAsync(url);
            task.Wait(Configs.Instance.RequestTimeout);
            return task.Result;
        }
    }
}
