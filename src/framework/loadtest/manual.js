import BPromise from 'bluebird'
import WebSocketClient from './websocket'
import {debug, enums} from '@kobiton/core-util'
import api from '../../framework/api'

export default class Manual {
  constructor(token, deviceId) {
    this._ns = 'Manual_Session'
    this._ws = null
    this._deviceId = deviceId
    this._token = token
  }

  /**
   * Launch manual session
   */
  async launch() {
    const response = await api.Device.bookDevice(this._token, this._deviceId)
    this._ws = await this._establishWebSocketConnection(this._token, response[0])
  }

  /**
   * Perform actions after starting manual test session
   */
  async _onStartManualDone() {
    debug.log(this._ns, 'NOOP')
    this._ws.sendMessage({
      type: 'NOOP'
    })

    await BPromise.delay(1000)
    debug.log(this._ns, 'Press Home')
    this._ws.sendMessage({
      type: 'PRESS_BUTTON',
      value: 'HOME'
    })

    await BPromise.delay(5000)
    debug.log(this._ns, 'Press Home 2nd')
    this._ws.sendMessage({
      type: 'PRESS_BUTTON',
      value: 'HOME'
    })

    await BPromise.delay(5000)
    debug.log(this._ns, 'Press Home 3rd')
    this._ws.sendMessage({
      type: 'PRESS_BUTTON',
      value: 'HOME'
    })

    await BPromise.delay(5000)
    debug.log(this._ns, 'Press Home 3rd')
    this._ws.sendMessage({
      type: 'PRESS_BUTTON',
      value: 'POWER'
    })

    await BPromise.delay(5000)
    debug.log(this._ns, 'TIME_ZONE_SETTING')
    this._ws.sendMessage({
      type: 'TIME_ZONE_SETTING',
      action: 'SET',
      timezone: 'America/Anchorage'
    })

    await BPromise.delay(5000)
    debug.log(this._ns, 'SIMULATE_GEO_LOCATION')
    this._ws.sendMessage({
      type: 'SIMULATE_GEO_LOCATION',
      lat: 11,
      long: 12
    })

    await BPromise.delay(5000)
    debug.log(this._ns, 'Stop manual')
    this._ws.sendMessage({
      type: 'STOP_MANUAL'
    })

    this._closeWebSocketConnection()
  }

  /**
   * Establish WebSocket Connection
   * @param token {string}
   * @param session {int} session Id
   */
  async _establishWebSocketConnection(token, session) {
    const webSocket = new WebSocketClient(
      'manual',
      session.hub,
      {
        token,
        type: enums.CONNECTION_TYPES.MANUAL,
        projection: enums.SCREEN_QUALITIES.MEDIUM,
        params: session.params
      },
      {onlyJsonMessage: false}
    )

    await webSocket.open()

    webSocket.on('json', (msg) => {
      this._handleHubMessage(msg)
    })

    return webSocket
  }

  /**
   * Handle Hub message
   * @param msg {string}
   */
  _handleHubMessage(msg) {
    let type = msg.type
    if (type === 'START_MANUAL') {
      this._onStartManualDone()
    }
  }

  /**
   * Close WebSocket Connection
   */
  _closeWebSocketConnection() {
    this._ws.on('disconnected', () => {
      this._ws._cancelReconnecting()
    })
    this._ws.close()
  }
}

