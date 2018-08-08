import BPromise from 'bluebird'
import EventEmitter from 'events'
import omit from 'lodash/omit'
import request from 'request'
import * as enums from '@kobiton/core-util/enum'
import {debug} from '@kobiton/core-util'
import TcpConnection from './tcp'
import hub from './hub'
import AppiumSession from './appium'
import api from '../../framework/api'
import config from '../config/test'

const API_URL = config.apiUrl

const requestAsync = BPromise.promisify(request, {multiArgs: true})

const TOUCH_ACTIONS = [
  enums.TEST_ACTIONS.TOUCH_MOVE,
  enums.TEST_ACTIONS.TOUCH_DOWN,
  enums.TEST_ACTIONS.TOUCH_UP,
  enums.TEST_ACTIONS.ZOOM
]

const PRE_SCREENSHOT_ACTIONS = [
  enums.TEST_ACTIONS.DOUBLE_PRESS_BUTTON,
  enums.TEST_ACTIONS.LONG_PRESS_BUTTON,
  enums.TEST_ACTIONS.SIMULATE_GEO_LOCATION,
  enums.DEVICE_SERVICES.TIME_ZONE_SETTING
]

export default class Koby extends EventEmitter {
  constructor({deviceInfo, token}) {
    super()
    this._ns = `Koby_${deviceInfo.udid}`
    this._deviceInfo = deviceInfo
    this._token = token
    this._deviceInfo.udid = deviceInfo.udid
    this._authInfo = {token, udid: deviceInfo.udid}
    this._sessionConnection = null
  }

  /**
   * Activate device
   */
  async activate() {
    await api.Device.updateDeviceStatus(
      this._token,
      this._deviceInfo.udid,
      enums.DEVICE_STATES.ACTIVATING,
      this._deviceInfo.message
    )

    const getHub = await hub.getHub(this._token)
    this._hub = await getHub[0]
    await this._establishControlConnection()
    await api.Device.updateDeviceStatus(
      this._token,
      this._deviceInfo.udid,
      enums.DEVICE_STATES.ACTIVATED,
      this._deviceInfo.message
    )
  }

  /**
   * Update status message
   */
  _updateStatusMessage(message) {
    if (this._destroyed) return
    debug.log(this._ns, 'Detail status message: ' + message)
    this.emit('update-device', {...this._deviceInfo, status: this._status, message})
  }

  /**
   * Establish Control Connection
   */
  async _establishControlConnection() {
    const connectionInfo = {runningSession: !!this._session, ...this._authInfo}
    await this.disconnectControlConnection()
    this._controlConnection = new TcpConnection(
      enums.CONNECTION_TYPES.CONTROL, this._hub, connectionInfo)
    this._controlConnection
      .on('error', ({message}) => {
        debug.error(this._ns, `Control connection error: ${message}`)
        if (message === 'not-authorized') {
          this.emit('not-authorized')
        }
      })
      .on('message', ::this._handleMessage)
    await this._controlConnection.establish()
  }

  /**
   * Disconnect Control Connection
   */
  async disconnectControlConnection() {
    if (this._controlConnection) {
      await this._controlConnection
        .removeAllListeners()
        .drop()
      this._controlConnection = null
    }
  }

  /**
   * Handle message
   * @param message {string}
   */
  async _handleMessage(message) {
    debug.log(this._ns, `Receive message from hub: ${JSON.stringify(message)}`)
    const {START_MANUAL, STOP_MANUAL, START_AUTO} = enums.TEST_ACTIONS
    const {type, timeoutKey, quality, fps} = message

    switch (type) {
      case START_MANUAL:
        try {
          await this._startSession(
            enums.CONNECTION_TYPES.MANUAL,
            {
              ...this._authInfo,
              hubInfo: this._hub,
              userInfo: this._userInfo,
              deviceInfo: this._deviceInfo,
              quality,
              fps,
              tmpDir: this._tmpDir,
              portForwarder: this._portForwarder
            }
          )
        }
        catch (ignored) {
          // Writes log for supporting investigating
          debug.error(this._ns, `Unhandled error while processing message ${START_MANUAL}`)
          debug.error(this._ns, ignored)
        }
        break
      case STOP_MANUAL:
        try {
          await this._endSession()
        }
        catch (err) {
          debug.error(this._ns, `Error while ending session on ${type} message`, err)
        }
        break
      case START_AUTO:
        try {
          await this._startSession(
            enums.CONNECTION_TYPES.AUTO,
            {
              ...this._authInfo, appium: this._appium, deviceInfo: this._deviceInfo,
              timeoutKey
            },
            {json: false, reconnect: false}
          )
        }
        catch (ignored) {
          // Writes log for supporting investigating
          debug.error(this._ns, `Unhandled error while processing message ${START_AUTO}`)
          debug.error(this._ns, ignored)
        }
        break
    }
  }

  /**
   * Start Session
   * @param type {enum} auto or manual
   * @param options {object}
   * @param connectionOptions {object}
   */
  async _startSession(type, options, connectionOptions) {
    try {
      this._sessionConnection = new TcpConnection(
        type,
        this._hub,
        this._authInfo,
        connectionOptions
      )
      this._sessionConnection.on('message', ::this._onHubMessage)

      if (type === 'MANUAL') {
        await this._sessionConnection.establish()

        await api.Device.updateDeviceStatus(
          this._token,
          this._deviceInfo.udid,
          enums.DEVICE_STATES.UTILIZING,
          this._deviceInfo.message
        )
      }
      else {
        this._session = new AppiumSession(this._sessionConnection, options)
        this._session
          .on('send-control', :: this._controlConnection.sendJson)
          .on('disconnect', async () => {
            debug.log(this._ns, `Session ${type} for ${this._deviceInfo.udid} is disconnected`)
            try {
              await this._endSession()
            }
            catch (ignored) {
              debug.error(this._ns, "Can't end session on session 'disconnect' event", ignored)
            }
          })

        this._updateStatusMessage('Starting session.')
        this._session.start()
        await this._sessionConnection.establish()
        await api.Device.updateDeviceStatus(
          this._token,
          this._deviceInfo.udid,
          enums.DEVICE_STATES.UTILIZING,
          this._deviceInfo.message
        )
      }
      
    }
    catch (error) {
      debug.log(error)
    }
    
  }

  /**
   * Handle Hub message
   * @param message {string}
   */
  async _onHubMessage(message) {
    debug.log(this._ns, '_onHubMessage:', message)

    await this._preprocessAction(message)

    const {type} = message
    switch (type) {
      case enums.TEST_STATES.MANUAL_BEGAN:
        this._sessionId = message.sessionId
        await this._startLogService()
        break
    }
  }

  /**
   * Start Log service
   */
  async _startLogService() {
    this._baseUrl = `${API_URL}/v1/sessions/${this._sessionId}`
  }

  /**
   * Preprocess Action
   * @param message {string}
   */
  async _preprocessAction(message) {
    let {type, value, touch} = message
    let recordAction = false
    let recordValue = value

    if (TOUCH_ACTIONS.includes(type)) {
      const {x, y, duration} = message

      if (type === enums.TEST_ACTIONS.TOUCH_DOWN) {
        this._lastTouchDownPoint = {x, y}
      }
      else if (type === enums.TEST_ACTIONS.TOUCH_UP) {
        recordAction = true

        if (x === this._lastTouchDownPoint.x && y === this._lastTouchDownPoint.y) {
          recordValue = this._lastTouchDownPoint
          type = enums.TOUCH_ACTIONS.TOUCH
        }
        else if (duration > 500) {
          recordValue = {
            x1: this._lastTouchDownPoint.x,
            y1: this._lastTouchDownPoint.y,
            x2: x,
            y2: y
          }
          type = enums.TOUCH_ACTIONS.DRAG
        }
        else {
          recordValue = {
            x1: this._lastTouchDownPoint.x,
            y1: this._lastTouchDownPoint.y,
            x2: x,
            y2: y
          }
          type = enums.TOUCH_ACTIONS.SWIPE
        }
      }
    }

    if (type === enums.TEST_ACTIONS.ZOOM) {
      if (touch === enums.TEST_ACTIONS.TOUCH_UP) {
        recordAction = true
        recordValue = omit(message, 'type', 'from1', 'from2')
        recordValue = {...recordValue, ...this._zoomInfo}
      }
      else if (touch === enums.TEST_ACTIONS.TOUCH_DOWN) {
      }
    }
    else if (type === enums.TEST_ACTIONS.PRESS_BUTTON &&
      value !== enums.DEVICE_KEYBOARDS.DELETE && value !== enums.DEVICE_KEYBOARDS.ENTER) {
      recordAction = true
    }
    else if (PRE_SCREENSHOT_ACTIONS.includes(type)) {
      recordAction = true
    }

    if (recordAction) {
      if (type === enums.TEST_ACTIONS.SIMULATE_GEO_LOCATION) {
        const {lat, long} = message
        recordValue = {lat, long}
      }
      else if (type === enums.DEVICE_SERVICES.TIME_ZONE_SETTING) {
        const {timezone} = message
        recordValue = {timezone}
      }

      await this._recordAction(type, recordValue)
    }
  }

  /**
   * Record Action
   * @param action {string}
   * @param value {string}
   */
  async _recordAction(action, value) {
    await this._getCommandId(action, value)
  }

  /**
   * Get Command ID
   * @param action {string}
   * @param value {string}
   */
  async _getCommandId(action, value) {
    if (!this._baseUrl) return

    const [{statusCode}, {id}] = await requestAsync({
      url: `${this._baseUrl}/commands`,
      method: 'POST',
      json: true,
      body: {action, value},
      headers: {
        Authorization: `Bearer ${this._token}`
      }
    })

    if (statusCode >= 300) {
      throw new Error(`Non-success response from saving action to API: ${statusCode}`)
    }

    return id
  }

  /**
   * End Session
   */
  async _endSession() {
    if (this._session) {
      try {
        this._cleaningSession = true
        this._updateStatusMessage('Stopping running session.')
        await this._session.end()
      }
      catch (ignored) {
        debug.error(this._ns, "Can't end session", ignored)
      }
      finally {
        this._cleaningSession = false

        // Indicates session finished immediately after it clears up 100%
        this._session = null
      }

      if (this._controlConnection) {
        debug.log(this._ns, 'Notify Hub that device is ready')
        this._controlConnection.sendJson({type: enums.TEST_STATES.DEVICE_READY})

        await api.Device.updateDeviceStatus(
          this._token,
          this._deviceInfo.udid,
          enums.DEVICE_STATES.ACTIVATED,
          this._deviceInfo.message
        )
      }
    }

    // Handle end Session for Manual test
    await this.disconnectControlConnection()
    await this._sessionConnection
      .removeAllListeners()
      .drop()
    this.emit('session-ended')
  }
  
}
