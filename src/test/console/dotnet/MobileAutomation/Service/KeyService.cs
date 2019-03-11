using System;
using System.Net.Http;
using MobileAutomation.Config;
using MobileAutomation.Service.Model;

namespace MobileAutomation.Service
{
    public class KeyService : BaseService
    {
        public KeyService(){}

        public APIKey GetAPIKey()
        {
          APIKey key = null;
          var response = GetSync(string.Format("{0}/api-keys", Configs.Instance.TestSeverUrl));
          if (response.IsSuccessStatusCode)
          {
              var readContentTask = response.Content.ReadAsAsync<APIKey[]>();
              readContentTask.Wait(Configs.Instance.RequestTimeout);
              key = readContentTask.Result[0];
          }
          return key;
        }
    }
}
