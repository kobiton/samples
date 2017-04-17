import {debug} from '@kobiton/core-util'
import Device from '../../../../framework/api/device'

export async function executeAppTest(testMethod, {
  timestamps, devices, runLoop
} = {}) { // Use function instead of arrow function to call skip()

  for (const device of devices) {
    const id = (device.udid) ? `with udid ${device.udid}` : ''
    describe(`Test ${device.deviceName}: ${device.platformVersion} ${id}`,
    async () => {
      const metadata = {...device} // Clones the object
      for (let i = 0; i < runLoop; i++) {
        it(`${timestamps} - Loop ${i + 1}/${runLoop} ${JSON.stringify(metadata)}`,
        async function() { // Use function instead of arrow function to call skip()
          // await executeAppTest(executeAndroidNativeApp, {timestamps, device})
          const deviceIsOnline = await Device.isOnlineDevice(device)
          if (deviceIsOnline) {
            const result = await testMethod(timestamps, [device])
            if (result.errors && result.errors.length) {
              throw result.errors[0]
            }
          }
          else {
            debug.log(`Device ${device.deviceName} is not online to run`)
            this.skip()
          }
        })
      }
    })
  }
}
