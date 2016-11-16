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
    host: `${account.hubHostName}`,
    auth: `${userInfo.user.username}:${listApiKeys[0]}`,
    port: account.hubPort
  }
  const wdioKobitonServer = {
    host: `${account.hubHostName}`,
    port: account.hubPort,
    user: `${userInfo.user.username}`,
    key: `${listApiKeys[0]}`
  }

  return {
    account,
    userInfo,
    onlineDevices,
    kobitonServer,
    wdioKobitonServer
  }
}
