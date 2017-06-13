import BaseAPI from './base'
import config from '../../../config/test'
import {removeSlash} from '../../../util'

class DeviceAPI extends BaseAPI {
  async getOnlineDevice(platformName) {
    const [allDevices] = await this._get({
      url: `${removeSlash(config.report.serverUrl)}/devices/bookable/${platformName}/1`
    })

    return allDevices[0]
  }
}

export default new DeviceAPI()
