import BaseService from './BaseService'
import configs from '../configs'

class DeviceService extends BaseService {

  async getOnlineDevice(platformName) {
    const devices = await this._get(`${configs.testServer.url}/devices/bookable/${platformName}/1`)
    return devices[0]
  }
}

export default new DeviceService()
