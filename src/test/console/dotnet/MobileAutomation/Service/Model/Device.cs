using System;
namespace MobileAutomation.Service.Model
{
    public class Device
    {
        public string Id { get; set; }
        public string Udid { get; set; }
        public bool IsBooked { get; set; }
        public bool IsOnline { get; set; }
        public string ModelName { get; set; }
        public string DeviceName { get; set; }
        public string PlatformName { get; set; }
        public string PlatformVersion { get; set; }
        public bool IsFavorite { get; set; }
        public bool IsCloud { get; set; }
        public bool IsMyOrg { get; set; }
        public bool IsMyOwn { get; set; }

        public Device()
        {
        }
    }
}
