import BPromise from 'bluebird'
import EventEmitter from 'events'
import WebSocket from 'ws'
import {debug, retry} from '@kobiton/core-util'
import * as enums from '@kobiton/core-util/enum'
import config from '../config/test'

const API_URL = config.apiUrl

const RETRY_DELAY_SECONDS = 10000
const RETRY_ATTEMPTS = 30

// The interval duration needs to be lower than the nginx setting `proxy_read_timeout`
// which is 60s by default so that nginx doesn't kill our websocket due to idle timeout
// See http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_read_timeout
const NOOP_MESSAGE_INTERVAL = 30000

export default class WebSocketClient extends EventEmitter {
  constructor(name, host, handshakeSignature, _opts = {}) {
    super()

    const opts = {onlyJsonMessage: true, ..._opts}

    this._host = host
    this._onlyJsonMessage = opts.onlyJsonMessage
    this._ns = `websocket-${name}`
    this._handshakeSignature = JSON.stringify(handshakeSignature)
    this._handshaked = false
    this._socket = null
    this._reconnecting = false
    this._ignoreSocketError = false
    this._cancelReconnecting = () => {}
  }

  get name() {
    return this._ns
  }

  async open() {
    try {
      const socket = await retry(this._connect, RETRY_ATTEMPTS, RETRY_DELAY_SECONDS)

      if (!socket) throw new Error('Server refused our connection')
      this._socket = socket

      // In Production, the Hub stays behind a load balancer (e.g. nginx) and it
      // will kill our websocket connection if it's idle (no data) too long
      // (60s for nginx, see http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_read_timeout)
      // Therefore, when end-user is doing nothing in the session, we prevents
      // load balancer from killing the ws connection by sending dummy data in interval
      this._ping()
    }
    catch (err) {
      debug.error(this._ns, err)

      this.close() // we maybe in re-connecting loop so let's close everything
      this.emit('close')
    }
  }

  close() {
    this._cancelReconnecting()
    this._cleanUpSocket()
  }

  sendMessage(msg) {
    if (!this._socket) {
      return debug.log(this._ns, 'Native websocket is unvailable, ignore sending')
    }

    this._socket.send(JSON.stringify(msg))
  }

  _cleanUpSocket() {
    if (this._socket) {
      try {
        this._socket.onerror = null
        this._socket.onmessage = null
        this._socket.onclose = null
        this._socket.close()
        this._socket = null

        debug.log(this._ns, 'Closed')
      }
      catch (err) {
        debug.error(this._ns, 'Closing has error', err)
      }
    }
  }

  _connect = () => {
    return new BPromise((resolve, reject) => {
      this._ignoreSocketError = false

      const host = this._host.replace(/\/$/, '')
      const protocol = API_URL.startsWith('https') ? 'wss' : 'ws'
      let socket

      try {
        debug.log(this._ns, 'Connecting ...')
        socket = new WebSocket(`${protocol}://${host}/ws`)
      }
      catch (err) {
        return reject(err)
      }

      socket.on('open', () => socket.send(this._handshakeSignature))
      socket.on('error', () => {
        !this._ignoreSocketError && reject()
      })

      socket.on('message', (msg) => {
        if (this._handshaked) {
          this._onWebSocketMessage(msg)
        }
        else {
          // No need to capture error from socket anymore
          this._ignoreSocketError = true

          const {code} = JSON.parse(msg)
          if (code === 200) {
            debug.log(this._ns, 'Connected')

            this._handshaked = true

            socket.onclose = () => {
              debug.log(this._ns, 'Disconnected')

              this._cleanUpSocket()
              this._reconnecting = true

              const timeoutId = setTimeout(() => {
                this._handshaked = false
                this.open()
              }, RETRY_DELAY_SECONDS)
              this._cancelReconnecting()
              this._cancelReconnecting = clearTimeout.bind(null, timeoutId)

              // The event needs to be triggered after schedule of reconnecting is
              // created so that the caller is able to cancel it if necessary
              this.emit('disconnected')
            }

            // re-attach events
            this._ignoreSocketError = false
            socket.on('error', (err) => {
              debug.error(this._ns, err)
              this.emit('error', err)
            })

            // On 'message' event, enforce MessageEvent.data to be an instance of ArrayBuffer
            // so that we can read the header byte
            socket.binaryType = 'arraybuffer'

            if (this._reconnecting) {
              this.emit('reconnected')
            }

            resolve(socket)
          }
          else {
            const err = new Error(`Handshaking fails with error code ${code}`)
            debug.error(this._ns, err.message)

            // Failing on handshaking is serious and it's pointless to
            // re-trying, so we will close the connection by returning `undefined`
            resolve()
          }
        }
      })
    })
  }

  _onWebSocketMessage(msg) {
    let jsonText

    if (this._onlyJsonMessage) {
      jsonText = msg

      try {
        this.emit('json', JSON.parse(jsonText))
      }
      catch (err) {
        debug.error(this._ns, 'Error on parsing json message', jsonText, err)
      }

      return
    }

    const rawViewWithFormatByte = new Uint8Array(msg)
    const format = rawViewWithFormatByte[0]
    const rawView = rawViewWithFormatByte.slice(1) // skip format byte

    switch (format) {
      case enums.MESSAGE_FORMATS.JPEG_IMAGE:
        // @HACK: Chrome Console shows error "Uncaught TypeError: Cannot freeze
        // array buffer views with elements" if frame data is passed to child component
        // through redux mechanism (i.e. call action creator here, and child component gets
        // frame through `this.props.something`). Because the root cause of the error hasn't
        // been figured out, EventEmitter is used temporarily here to transfer frame data
        // to child component
        this.emit('frame', rawView)
        break

      case enums.MESSAGE_FORMATS.JSON:
        try {
          // Hub converted the json string with 'ascii' encoding (no
          // Unicode support). See comment in Hub for any question
          jsonText = String.fromCharCode.apply(String, rawView)
          this.emit('json', JSON.parse(jsonText))
        }
        catch (err) {
          debug.error(this._ns, 'Error on parsing json message', jsonText, err)
        }

        break

      default:
        debug.log(this._ns, `Ignore websocket message, invalid format byte: ${format}`)
    }
  }

  /**
   * Sends dummy data in the websocket connection to make it not idle
   * Note: this function schedules itself to run again
   */
  _ping = () => {
    // Stops the running loop if we disconnected
    if (!this._socket) return

    this.sendMessage({type: enums.TEST_ACTIONS.NOOP})
    setTimeout(this._ping, NOOP_MESSAGE_INTERVAL)
  }
}

