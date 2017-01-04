import {assert} from 'chai'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import {executeWebSession} from '../../../../framework/appium'

let onlineDevices
let targetDevices

describe('[appium-web] test 1 device 5 sessions in 15 minutes', () => {
  before(async() => {
    onlineDevices = await Device.getOnlineDevices()
    assert.isAtLeast(onlineDevices.length, 1, 'Expected at least 1 online device')

    targetDevices = onlineDevices.slice(0, 1)
  })

  const expectedDurationInMinutes = 15
  const sessionAmount = 5
  it(`Should run test in ${expectedDurationInMinutes} minutes`,
    async() => {
      const startedAt = moment.utc()
      const results = await executeWebSession(
        targetDevices,
        {
          sessionDuration: expectedDurationInMinutes * 60,
          sessionAmount
        })
      const endedAt = moment.utc()
      const durationInMinutes = endedAt.diff(startedAt, 'minutes')

      assert.isAtLeast(durationInMinutes, expectedDurationInMinutes,
        `Expected run in ${durationInMinutes} minutes`)
      assert.equal(results, onlineDevices.length, 'Expected one device is run successfully')
    })
})
