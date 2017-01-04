import config from '../framework/core/config'
import ApiKey from '../framework/api/key'
import Device from '../framework/api/device'
import UserRestApi from '../framework/api/user'
import SessionRestApi from '../framework/api/session'

export default async function init() {
  UserRestApi.setBaseUrl(config.apiUrl)
  UserRestApi.setLoginAccount(config.username1, config.password1)
  const {token} = await UserRestApi.login()
  UserRestApi.setToken(token)

  SessionRestApi.setBaseUrl(config.apiUrl)
  SessionRestApi.setLoginAccount(config.username1, config.password1)
  SessionRestApi.setToken(token)

  ApiKey.setBaseUrl(config.apiUrl)
  ApiKey.setLoginAccount(config.username1, config.password1)
  ApiKey.setToken(token)

  Device.setBaseUrl(config.apiUrl)
  Device.setLoginAccount(config.username1, config.password1)
  Device.setToken(token)
}
