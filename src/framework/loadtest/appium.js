import {EventEmitter} from 'events'
import BPromise from 'bluebird'
import net from 'net'
import {debug} from '@kobiton/core-util'
import http from 'http'
import {noop} from 'lodash'

export default class AppiumSession extends EventEmitter {
  constructor(hubConnection, {appium, timeoutKey, deviceInfo, token}) {
    super()
    this._ns = `appium-session-d:${deviceInfo.udid}-ts:${Date.now()}`
    this._appium = appium
    this._deviceInfo = deviceInfo
    this._notifySessionStarted = noop
    this._timeoutKey = timeoutKey
    this._hubConnection = hubConnection
    this._token = token
    this._detachAppiumEvents = noop
    this._detachAppiumStdData = noop

    this._waitForSessionStarted = new BPromise((done) => (this._notifySessionStarted = done))
    hubConnection.once('close', () => this.emit('disconnect'))
  }

  async start() {
    debug.log(this._ns, 'Start a new session')

    try {
      this._hubConnection.once('pipe', () => this._hubConnection.pipeSocket(this._appiumSocket))
      this._appiumProxy = await this._createAppiumProxy()
      this._appiumSocket = await this._createAppiumSocket(this._appiumProxy)
    }
    catch (error) {
      debug.log(error)
    }
    finally {
      this._notifySessionStarted()
    }
  }

  end() {
    if (this._appiumSocket) {
      this._appiumSocket
        .removeAllListeners()
        .destroy()
      this._appiumSocket = null
      this._hubConnection.once('close', () => this.emit('disconnect'))
    }

    if (this._appiumProxy) {
      this._appiumProxy.close()
      this._appiumProxy = null
    }
  }

  async _createAppiumProxy() {
    return new Promise((resolve) => {
      const server = http.createServer((req, res) => {
        const sessionId = req.headers['session-id']
        const method = req.method
        debug.log(this._ns, `${method} ${req.url}`)
        let body = ''

        req.on('data', (chunk) => {
          body += chunk.toString('ascii')
        })
        .on('end', () => {
          switch (method) {
            case 'POST':
              debug.log(this._ns, `REQUEST: ${body}`)
              const bodyJson = JSON.parse(body)
              const response = {
                status: 0,
                value: null,
                sessionId
              }
              if (bodyJson.desiredCapabilities) {
                response.value = {
                  desired: this._deviceInfo,
                  version: {
                    nodeVersion: 'v7.4.0',
                    appiumVersion: '1.8.0'
                  },
                  viewportRect: {
                    top: 75,
                    left: 0,
                    width: 1080,
                    height: 1701
                  },
                  ...this._deviceInfo,
                  deviceUDID: this._deviceInfo.udid
                }
              }
              else if (bodyJson.using && bodyJson.value) {
                response.value = [{ELEMENT: '5000'}]
              }

              res.end(JSON.stringify(response))
              break
            case 'DELETE':
              res.end()
              break
            default:
              res.writeHead(400)
              res.end()
          }
        })
      })

        // Disables timeout mechanism since this is an internal server
        // Ref: https://nodejs.org/api/http.html#http_server_timeout
      server.timeout = 0
      server.listen(0, '127.0.0.1', () => resolve(server))
    })
  }

  _createAppiumSocket(proxy) {
    const {port, address} = proxy.address()

    return new Promise((resolve, reject) => {
      const socket = new net.Socket()
      socket
          // We'd like to know if the other end dies ASAP.
          // See http://stackoverflow.com/a/30365314/17815
          .setKeepAlive(true, 10000)
          // This is only for creation purpose
          // If we want to handle more errors, consider to use returned socket object.
          .once('error', reject)
          .on('connect', () => {
            socket.removeListener('error', reject)
              // In the internal network
              // Closing appium connection should be considered as a critical issue.
              .on('close', () => this.emit('interrupt'))
              .on('error', (err) => debug.error(this._ns, err))
            resolve(socket)
          })
          .connect(port, address)
    })
  }

}
