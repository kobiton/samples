import {removeSlash} from '../util'
import request from 'request'
import BPromise from 'bluebird'
import config from '../config/test'

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
    const encode = new Buffer.from(`${config.username1}:${config.apiKey}`).toString('base64')
    this._token = this._token ? this._token : encode
    return this._token
  }

  setToken(newToken) {
    this._token = newToken
  }

  /**
   * Return a custom Bearer header with prepared token.
   * @param {String} token - Generated from username and password
   */
  customBearerHeaders(token) {
    return {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }
  }

  _getAbsoluteUrl(path) {
    const pageUrl = this._baseUrl ? this._baseUrl : config.apiUrl
    return `${pageUrl}/v1/${removeSlash(path)}`
  }

  async _send({method = 'GET', json = true, url, path, headers, body = {}} = {}) {
    const finalHeaders = headers || {
      'authorization': `Basic ${this.getToken()}`,
      'content-type': 'application/json'
    }

    const requestURL = url || this._getAbsoluteUrl(path)

    const finalOptions = {
      method,
      json,
      url: requestURL,
      headers: finalHeaders,
      body
    }

    const [response, resBody] = await requestAsync(finalOptions)
    return [resBody, response]
  }

  async login(username, password) {
    const [userInfo] = await this.post({
      path: 'users/login',
      body: {
        emailOrUsername: username,
        password
      }
    })
    return userInfo
  }

  async getBearerToken(username, password) {
    const res = await this.login(username, password)
    return res.token
    
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
