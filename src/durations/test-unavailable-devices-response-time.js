import 'babel-polyfill'
import {getUserInfo, getAccount} from '../helpers/portal-api'
import {assert} from 'chai'
import request from 'request'
import _ from 'lodash'
import BPromise from 'bluebird'

describe.only('Response time for large number of tests on unavailable devices', () => {
  let send
  beforeEach(async () => {
    const resBody = await getUserInfo()
    const {username, apiKey} = resBody.user
    send = _send.bind(undefined, username, apiKey)
  })

  it('should be below 10s for 500 test requests', () => {
    return run(500, 10000)
  })

  it('should be below 15s for 1000 test requests (in batches)', async () => {
    const acceptableDuration = 10000
    const batches = []

    batches.push(run(300, acceptableDuration))

    // Give server a little break
    await BPromise.delay(2000)

    batches.push(run(300, acceptableDuration))
    await BPromise.delay(2000)

    batches.push(run(400, acceptableDuration))
    await BPromise.delay(2000)

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
  return new Promise((resolve, reject) => {
    const auth = new Buffer(`${username}:${apiKey}`).toString('base64')
    const start = Date.now()
    request.post(
      {
        url: `${getAccount().apiUrl.replace(/\/$/, '')}/wd/hub/session`,
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
