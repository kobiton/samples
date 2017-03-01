import jsonfile from 'jsonfile'
import moment from 'moment'
import BaseData from '../../_data'
import {prepareFolderSync} from '../../../framework/util'

const onlineDeviceFolder = `onlineDevices/${moment().format('YYYY-MM-DD-HH-mm')}`
const file = 'onlineDevices.json'
prepareFolderSync(onlineDeviceFolder)

class ManualData extends BaseData {

  /**
   * Get a device in the last from saved online devices, then save the remaining devices
   */
  getADevice() {
    const onlineDevices = jsonfile.readFileSync(file)
    const deviceName = onlineDevices.pop()
    this.saveOnlineDevices(onlineDevices)
    return deviceName
  }

  /**
   * Save online devices into a default file
   */
  saveOnlineDevices(onlineDevices) {
    jsonfile.writeFileSync(file, onlineDevices, {spaces: 2})
  }
}

export default new ManualData()
