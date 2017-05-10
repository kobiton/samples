import moment from 'moment'
import server from '../config/server'
import Key from '../../framework/api/key'

export default class BaseTest {
  async _getServerConfig() {
    server.key = await Key.getApiKey()
    return server
  }

  _getTimeStamp() {
    return moment().format('YYYYMMDDHHmmss')
  }
}
