import {debug} from '@kobiton/core-util'
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
    const self = this
    originInit.call(self, options)

    if (self.callback) {
      const _originCallback = self._callback

      self._callback = function (err, response, body) { // eslint-disable-line handle-callback-err
        if (body && body.message) {
          body.value = body.value || {}
          body.value.message = body.message
        }
        return _originCallback.apply(self, arguments)
      }
    }
  }
}

export default async function init() {
  const token = new Buffer.from(`${config.username1}:${config.apiKey}`).toString('base64')
  UserRestApi.setBaseUrl(config.apiUrl)
  UserRestApi.setToken(token)

  SessionRestApi.setBaseUrl(config.apiUrl)
  SessionRestApi.setToken(token)

  ApiKey.setBaseUrl(config.apiUrl)
  ApiKey.setToken(token)

  Device.setBaseUrl(config.apiUrl)
  Device.setToken(token)

  if (config.log.pushLog) {
    debug.enable('*', {
      logstash: `${config.log.serverUrl}`,
      environment: 'staging-as-test',
      component: 'regression'
    })
  }
}
