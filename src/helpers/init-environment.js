import portal from './portal-api'

export default async () => {
  const account = portal.getAccount()
  const userInfo = await portal.getUserInfo()
  const onlineDevices = await portal.getOnlineDevices(userInfo.token)
  const kobitonServer = {
    host: `${account.hubUrl}`,
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
