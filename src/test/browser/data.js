import BaseData from '../_data'
import _ from 'lodash/util'

class BrowserData extends BaseData {
  generateRandomUsers(number = 1) {
    return _.times(number, this.generateUser)
  }
}

export default new BrowserData()
