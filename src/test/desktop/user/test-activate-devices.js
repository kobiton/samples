import {assert} from 'chai'
import config from '../../../framework/config/test'
import LoginPage from '../../../framework/page-objects/desktop/intro/login'
import DevicesPage from '../../../framework/page-objects/desktop/user/devices-page'
import DeviceAPI from '../../../framework/api/device'

const {username1: username, password1: password} = {...config}

describe('Users / Activate Devices', () => {
  let loginPage
  let devicesPage

  before(async () => {
    loginPage = new LoginPage()
    devicesPage = new DevicesPage()
    await loginPage.startApplication()
    if (!(await loginPage.isLoggedIn())) {
      await loginPage.login(username, password)
    }
    // Sleep time for devices to establish
    await devicesPage.pause(100)
  })

  after(async () => {
    await loginPage.stopApplication()
  })

  it('should activate ready-to-register devices', async function () {
    const notRegisteredDevices = await devicesPage.getDevicesInfo({status: 'ReadyToRegister'})
    const indexes = devicesPage.getDeviceIndexes(notRegisteredDevices)
    const udids = devicesPage.getDeviceUDIDs(notRegisteredDevices)
    if (indexes.length > 0) {
      await devicesPage.registerDevices(indexes)
    }
    else {
      this.skip()
    }
    //Verify status of above devices registered to cloud
    for (let i = 0; i < indexes.length; i++) {
      await devicesPage.pause(2)
      let deviceStatusInDesktop = await devicesPage.getDeviceStatus(indexes[i])
      let deviceStatusFromAPI = await isOnlineDevice(udids[i])
      assert.equal('Registered', deviceStatusInDesktop, 'The device status is not expected')
      assert.isTrue(deviceStatusFromAPI, 'The device status is not expected')
    }
  })

  it('should deactivate registered devices', async function () {
    const registeredDevices = await devicesPage.getDevicesInfo({status: 'Registered'})
    const indexes = devicesPage.getDeviceIndexes(registeredDevices)
    const udids = devicesPage.getDeviceUDIDs(registeredDevices)
    if (indexes.length > 0) {
      await devicesPage.unregisterDevices(indexes)
    }
    else {
      this.skip()
    }
    //Verify status of above devices unregistered above
    for (let i = 0; i < indexes.length; i++) {
      await devicesPage.pause(2)
      let deviceStatusInDesktop = await devicesPage.getDeviceStatus(indexes[i])
      let deviceStatusFromAPI = await isOnlineDevice(udids[i])
      assert.equal('ReadyToRegister', deviceStatusInDesktop, 'The device status is not expected')
      assert.isFalse(deviceStatusFromAPI, 'The device status is not expected')
    }
  })

})

/**
* Check a private device if it is online
*@param: udid - device's udid
*Return true if it is online, otherwise false
*/
async function isOnlineDevice(udid) {
  let result = false
  const onlineDevice = await DeviceAPI.getOnlineDevices({groupType: 'private', arrayUDID: udid}) // eslint-disable-line max-len
  if (onlineDevice.length > 0) {
    result = onlineDevice[0].isOnline
  }
  return result
}
