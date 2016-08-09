import {getUserInfo, getOnlineDevices} from './portal-api'
import {getAccount} from './config'

export default async () => {
  // init environment for e2e testing
  const account = getAccount()
  const userInfo = await getUserInfo()
  const onlineDevices = await getOnlineDevices(userInfo.token)
  const kobitonServer = {
    host: `${account.hubHostName}`,
    auth: `${userInfo.user.username}:${userInfo.user.apiKey}`,
    port: 80
  }
  return {
    account,
    userInfo,
    onlineDevices,
    kobitonServer
  }
}
