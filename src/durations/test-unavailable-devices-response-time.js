import 'babel-polyfill'
import {getUserInfo, getAccount} from '../helpers/portal-api'
import {assert} from 'chai'
import request from 'request'
import _ from 'lodash'
import BPromise from 'bluebird'

const apiHost = getAccount().apiUrl.replace(/^https/i, 'http').replace(/\/$/, '')
const API_URL = `${apiHost}/wd/hub/session`

describe.only('Response time for large number of tests on unavailable devices', () => {
  let send
  beforeEach(async () => {
    const resBody = await getUserInfo()
    const {username, apiKey} = resBody.user
    send = _send.bind(undefined, username, apiKey)
  })

  it('should be below 10s (each request) for several batches of 300 requests', async () => {
    const acceptableDuration = 10000
    const numOfRequest = 300
    const minimumBreakTime = 5000
    const batches = []

    batches.push(run(numOfRequest, acceptableDuration))

    // Give server a little break
    await BPromise.delay(minimumBreakTime)

    batches.push(run(numOfRequest, acceptableDuration))
    await BPromise.delay(minimumBreakTime)

    batches.push(run(numOfRequest, acceptableDuration))

    await BPromise.all(batches)
  })

  function run(times, maxWait) {
    const requests = _.times(times, send)
    return Promise.all(requests).then((responses) => {
      for (const res of responses) {
        assert.equal(res.status, 404, `Response body: ${res.resBody}`)
        assert.isTrue(res.resBody.error)
        assert.isBelow(res.duration, maxWait)
      }
    })
  }
})

function _send(username, apiKey) {
  return new BPromise((resolve, reject) => {
    const auth = new Buffer(`${username}:${apiKey}`).toString('base64')
    const start = Date.now()
    request.post(
      {
        url: API_URL,
        headers: {
          Authorization: `Basic ${auth}`
        },
        json: true,
        body: {
          desiredCapabilities: {
            deviceName: 'iphone', // unexisting device
            browserName: 'chrome',
            platformName: 'Android'
          }
        }
      },
      (err, res, jsonBody) => {
        if (err) return reject(err)

        const end = Date.now()
        resolve({status: res.statusCode, resBody: jsonBody, duration: end - start})
      })
  })
}
