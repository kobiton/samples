import {assert} from 'chai'
import api from '../../../framework/api'

describe('API / Devices', () => {

  let devices
  let devicesList
  let deviceId
  const privateGroup = {onlineDeviceOnly: false, groupType: 'private'}
  const cloudGroup = {onlineDeviceOnly: false, groupType: 'cloud'}

  it('should mark/unmark favorite a private device', async () => {
    devicesList = await api.Device.getDevices(privateGroup)
    deviceId = devicesList[0].id

    await api.Device.markDeviceFavorite(deviceId)
    devices = await api.Device.getDevices(privateGroup)

    assert.isTrue(devices[0].isFavorite, 'Successfully marked device favorite')

    await api.Device.unmarkFavoriteDevice(deviceId)
    devices = await api.Device.getDevices(privateGroup)

    assert.isFalse(devices[0].isFavorite, 'Successfully unmarked device favorite')
  })

  it('should mark/unmark favorite a cloud device', async () => {
    devicesList = await api.Device.getDevices(cloudGroup)
    deviceId = devicesList[0].id

    await api.Device.markDeviceFavorite(deviceId)
    devices = await api.Device.getDevices(cloudGroup)

    assert.isTrue(devices[0].isFavorite, 'Successfully marked device favorite')

    await api.Device.unmarkFavoriteDevice(deviceId)
    devices = await api.Device.getDevices(cloudGroup)

    assert.isFalse(devices[0].isFavorite, 'Successfully unmarked device favorite')
  })

})
