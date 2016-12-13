import {getUserInfo, getOnlineDevices, getAPIKeys} from './portal-api'
import {getConfig} from './config'

export default async () => {
  // init environment for e2e testing
  const account = getConfig()
  const userInfo = await getUserInfo()
  const onlineDevices = await getOnlineDevices(userInfo.token)
  const listApiKeys = (await getAPIKeys(userInfo.token)).map((item) => {
    return item.key
  })
  const kobitonServer = {
    host: account.hub.host,
    auth: `${userInfo.user.username}:${listApiKeys[0]}`,
    port: account.hub.port
  }
  const wdioKobitonServer = {
    host: account.hub.host,
    port: account.hub.port,
    user: userInfo.user.username,
    key: listApiKeys[0]
  }

  return {
    account,
    userInfo,
    onlineDevices,
    kobitonServer,
    wdioKobitonServer
  }
}
