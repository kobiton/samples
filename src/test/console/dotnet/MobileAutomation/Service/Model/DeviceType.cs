using System;
namespace MobileAutomation.Service.Model
{
    public class DeviceType
    {
        public static readonly DeviceType Android = new DeviceType("Android");
        public static readonly DeviceType IOS = new DeviceType("IOS");

        private string Value;

        public DeviceType(string value)
        {
            this.Value = value;
        }

        public override string ToString()
        {
            return Value;
        }
    }
}
