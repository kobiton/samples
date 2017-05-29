using System;
using System.Net.Http;
using MobileAutomation.Config;
using MobileAutomation.Service.Model;

namespace MobileAutomation.Service
{
    public class DeviceService : BaseService
    {
        public DeviceService()
        {
        }

        public Device GetOnlineDeviceSync(DeviceType deviceType)
        {
            Device device = null;
            var platformName = deviceType.ToString();

            var response = GetSync(string.Format("{0}/devices/bookable/{1}/1", Configs.Instance.TestSeverUrl, deviceType));
            if (response.IsSuccessStatusCode)
            {
                var readContentTask = response.Content.ReadAsAsync<Device[]>();
                readContentTask.Wait(Configs.Instance.RequestTimeout);
                device = readContentTask.Result[0];
            }

            return device;
        }
    }
}
