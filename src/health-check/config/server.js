import {autoTestHostname, autoTestPort, username1, apiKey} from '../../framework/config/test'

const server = {
  protocol: 'https',
  hostname: autoTestHostname,
  port: autoTestPort,
  user: username1,
  key: apiKey
}

export default server
