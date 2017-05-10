import {autoTestHostname, autoTestPort, username1} from '../../framework/config/test'

const server = {
  host: autoTestHostname,
  port: autoTestPort,
  user: username1,
  key: null // api key, will be fetched when execute test
}

export default server
