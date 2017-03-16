import {removeSlash} from '../util'
import request from 'request'
import BPromise from 'bluebird'

const requestAsync = BPromise.promisify(request, {multiArgs: true})

export default class Base {

  setBaseUrl(url) {
    this._baseUrl = removeSlash(url)
  }

  setLoginAccount(username, password) {
    this._username = username
    this._password = password
  }

  getUsername() {
    return this._username
  }

  getPassword() {
    return this._password
  }

  getToken() {
    return this._token
  }

  setToken(newToken) {
    this._token = newToken
  }

  _getAbsoluteUrl(path) {
    return `${this._baseUrl}/v1/${removeSlash(path)}`
  }

  async _send({method = 'GET', json = true, path, headers, body = {}} = {}) {
    const finalHeaders = headers || {
      'authorization': `Bearer ${this._token}`,
      'content-type': 'application/json'
    }
    const finalOptions = {
      method,
      json,
      url: this._getAbsoluteUrl(path),
      headers: finalHeaders,
      body
    }

    const [response, resBody] = await requestAsync(finalOptions)
    if (response.statusCode >= 400) {
      const bodyMsg = (resBody instanceof String) ? resBody : JSON.stringify(resBody)
      throw new Error(`statusCode: ${response.statusCode}, body message: ${bodyMsg}`)
    }

    return [resBody, response]
  }

  async get(options = {}) {
    return await this._send({
      ...options,
      method: 'GET'
    })
  }

  async post(options = {}) {
    return await this._send({
      ...options,
      method: 'POST'
    })
  }

  async put(options = {}) {
    return await this._send({
      method: 'PUT',
      ...options
    })
  }

  async delete(options = {}) {
    return await this._send({
      method: 'DELETE',
      ...options
    })
  }
}