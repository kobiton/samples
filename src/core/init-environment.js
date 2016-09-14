import {getUserInfo, getOnlineDevices} from './portal-api'
import {getConfig} from './config'

export default async () => {
  // init environment for e2e testing
  const account = getConfig()
  const userInfo = await getUserInfo()
  const onlineDevices = await getOnlineDevices(userInfo.token)
  const kobitonServer = {
    host: `${account.hubHostName}`,
    auth: `${userInfo.user.username}:${userInfo.user.apiKey}`,
    port: account.hubPort
  }
  return {
    account,
    userInfo,
    onlineDevices,
    kobitonServer
  }
}
