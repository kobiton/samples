import request from 'request'
import config from '../framework/config/test'
import ApiKey from '../framework/api/key'
import Device from '../framework/api/device'
import UserRestApi from '../framework/api/user'
import SessionRestApi from '../framework/api/session'

// Kobiton's response didn't match wdio format
// https://github.com/webdriverio/webdriverio/blob/master/lib/utils/RequestHandler.js#L198
if (!request.Request.callbackOverrided) {
  request.Request.callbackOverrided = true

  const originInit = request.Request.prototype.init
  request.Request.prototype.init = function (options) {
    originInit.call(this, options)

    const self = this
    if (self.callback) {
      const _originCallback = self._callback

      self._callback = function (err, response, body) { // eslint-disable-line handle-callback-err
        if (body && body.message) {
          body.value = {
            message: body.message
          }
        }
        return _originCallback.apply(self, arguments)
      }
    }
  }
}

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
