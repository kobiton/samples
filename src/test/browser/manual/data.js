import jsonfile from 'jsonfile'
import BaseData from '../../_data'

const file = 'reports/onlineDevices.json'

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
