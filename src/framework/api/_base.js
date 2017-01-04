import {removeSlash} from '../util'
import request from 'request'
import BPromise from 'bluebird'

export default class Base {

  constructor() {
    this._requestAsync = BPromise.promisify(request, {multiArgs: true})
  }

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

  _getAuthenticationHeader() {
    return {
      'authorization': `Bearer ${this._token}`,
      'content-type': 'application/json'
    }
  }

  async _send({method = 'GET', json = true, path, headers, body = {}} = {}) {
    headers = headers || {
      'authorization': `Bearer ${this._token}`,
      'content-type': 'application/json'
    }
    const finalOptions = {
      method,
      json,
      url: this._getAbsoluteUrl(path),
      headers,
      body
    }

    const [response, resBody] = await this._requestAsync(finalOptions)
    if (response.statusCode >= 400) {
      const bodyMsg = (response.statusCode === 404) ? resBody : resBody.message
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
