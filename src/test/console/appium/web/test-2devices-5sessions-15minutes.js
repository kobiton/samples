import {assert} from 'chai'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import {executeWebSession} from '../../../../framework/appium'

let onlineDevices
let targetDevices

describe('[appium-web] test 2 devices parallel 5 sections per device in 15 minutes', () => {

  beforeEach(async() => {
    onlineDevices = await Device.getOnlineDevices()
    assert.isAtLeast(onlineDevices.length, 2, 'Expected at least two online devices')

    targetDevices = onlineDevices.slice(0, 2)
  })

  const expectedDurationInMinutes = 15
  const sessionAmount = 5
  it(`Should run test in ${expectedDurationInMinutes} minutes`,
    async() => {
      const startedAt = moment()
      const results = await executeWebSession(
        targetDevices,
        {
          sessionDuration: expectedDurationInMinutes * 60,
          sessionAmount
        })
      const endedAt = moment()
      const durationInMinutes = endedAt.diff(startedAt, 'minutes')

      assert.isAtLeast(durationInMinutes, expectedDurationInMinutes,
        `Expected run in ${durationInMinutes} minutes`)
      assert.equal(results, targetDevices.length,
        `Expected ${targetDevices.length} devices were run successfully`)
    })
})
