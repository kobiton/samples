import net from 'net'
import BPromise from 'bluebird'
import EventEmitter from 'events'
import HttpStatusCodes from 'http-status-codes'
import noop from 'lodash/noop'
import once from 'lodash/once'
import {JSocket} from '@kobiton/core-node'
import {debug, retry} from '@kobiton/core-util'

const RECONNECT_INTERVAL = 3000

/**
 * TCP connection encapsulates the connection to a hub. It handles everything from
 * connection to reconnection and event notifications. It never exposes the raw socket
 * to the outside world.
 */
export default class TcpConnection extends EventEmitter {
  constructor(type, hub, connectionInfo, options = {json: true, reconnect: true}) {
    super()
    this._hub = hub
    this._udid = connectionInfo.udid
    this._type = type
    this._ns = `TCPconnection-${this._udid}-${type}`
    this._signature = {type, ...connectionInfo, ...hub}
    this._json = options.json
    this._reconnect = options.reconnect
    this._dropped = false
    this._detachEvents = noop
    this._cancelReconnecting = noop
    this._sendDataPaused = false
    this._lastSendData = null
  }

  /**
   * Connects to Hub, retries until successful.
   * @return {Promise}
   */
  async establish() {
    debug.log(this._ns, 'Connecting to Hub...')

    try {
      const socket = this._rawSocket = await retry(::this._openSocket, -1, 5000)
      await this._authenticate(socket)

      this._detachEvents()
      this._detachEvents = this._attachEvents(socket)

      if (this._json) {
        this._jSocket = new JSocket(socket)
        this._jSocket.on('message', this.emit.bind(this, 'message'))
      }

      this.emit('connected')

      if (this._cancelReconnecting !== noop) {
        this.emit('reconnected')
      }

      debug.log(this._ns, 'Connected to Hub')
    }
    catch (err) {
      debug.error(this._ns, 'Error on establishing connection to Hub', err)

      this._close()

      throw err
    }
  }

  drop() {
    debug.log(this._ns, 'Permanently disconnecting from Hub')
    this._dropped = true
    this.removeAllListeners()
    this._close()
    this.emit('close')
  }

  /**
   * Sends a JSON message to connected TCP server.
   * @param {Object} msg message which will be converted to JSON.
   */
  async sendJson(msg) {
    this._jSocket && await this._jSocket.send(msg)
  }

  /**
   * Sends data to connected TCP server.
   * @param  {String} data a message string.
   */
  sendData(data) {
    if (this._sendDataPaused) {
      this._lastSendData = data
      return
    }

    this._rawSocket && this._rawSocket.write(data)
  }

  pauseSendingData() {
    debug.log(this._ns, 'Pause sending data')
    this._sendDataPaused = true
  }

  resumeSendingData() {
    debug.log(this._ns, 'Resume sending data')

    this._sendDataPaused = false
    if (this._lastSendData) {
      const data = this._lastSendData
      this._lastSendData = null
      this.sendData(data)
    }
  }

  /**
   * Allows external socket to pipe to our internal one
   * @param  {Node TCP socket} externalSocket A socket is created by another party
   */
  pipeSocket(externalSocket) {
    this._rawSocket.pipe(externalSocket)
    externalSocket.pipe(this._rawSocket)
  }

  _attachEvents(socket) {
    const boundClose = ::this._onCorrupted
    const boundError = this.emit.bind(this, 'error')

    socket
      .on('close', boundClose)
      .on('error', boundError)

    return once(() => {
      socket
        .removeListener('close', boundClose)
        .removeListener('error', boundError)
    })
  }

  _onCorrupted() {
    this._close()

    if (!this._dropped && this._reconnect) {
      const timeoutId = setTimeout(::this.establish, RECONNECT_INTERVAL)
      this._cancelReconnecting()
      this._cancelReconnecting = once(clearTimeout.bind(null, timeoutId))
    }

    this.emit('close')
  }

  _close() {
    this._cancelReconnecting()
    this._detachEvents()

    try {
      this._jSocket && this._jSocket.unwrap()
      this._jSocket = null
    }
    catch (err) {
      debug.log(this._ns, `Error during unwrapping JSocket: ${err}`)
    }

    try {
      this._rawSocket && this._rawSocket.destroy()
      this._rawSocket = null
    }
    catch (err) {
      debug.log(this._ns, `Error during closing tcp socket: ${err}`)
    }
  }

  _authenticate(socket) {
    return new BPromise((resolve, reject) => {
      const jSocket = new JSocket(socket)
      jSocket.once('message', ({code, error}) => {
        switch (code) {
          case HttpStatusCodes.OK:
            // After the ack ({ok: true}) is sent, server begins sending data.
            // Emitting 'pipe' before sending ack ensures the caller is able to pipe
            // (use pipeSocket() method) to their socket if necessary
            this.emit('pipe')

            jSocket
              .send({ok: true})
              .then(resolve, reject)
              .finally(() => jSocket.unwrap()) // leave socket as origin
            break
          case HttpStatusCodes.PRECONDITION_FAILED:
            return reject(new Error(error))
          default:
            // TODO: Needs more handling for various errors
            return reject(new Error('not-authorized'))
        }
      })
      jSocket.send(this._signature)
    })
  }

  _openSocket() {
    return new BPromise((resolve, reject) => {
      try {
        const socket = net.connect(this._hub.tcpPort, this._hub.publicHostname)
        socket
          // Ref: https://nodejs.org/api/net.html#net_socket_setkeepalive_enable_initialdelay
          // Default value (apprxm 2 hrs) will be set unless initialDelay is greater than 1000.
          .setKeepAlive(true, 10000)
          .on('error', reject)
          .once('connect', () => {
            socket.removeListener('error', reject) // leave socket as origin
            resolve(socket)
          })
      }
      catch (err) {
        reject(err)
      }
    })
  }
}
