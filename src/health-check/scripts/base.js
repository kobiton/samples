import moment from 'moment'

export default class BaseTest {
  _getTimeStamp() {
    return moment().format('YYYYMMDDHHmmss')
  }
}
