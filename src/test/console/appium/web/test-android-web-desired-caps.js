import {assert} from 'chai'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import {executeDesiredCapsTestPage} from '../../../../framework/appium/web/index'
import {convertToDesiredCapabilities} from '../../../../framework/appium/helper'
import BPromise from 'bluebird'
import {debug} from '@kobiton/core-util'
import * as data from './data'

const timeout = 60000 // milliseconds
const timestamps = moment().format('YYYYMMDDHHmmss')
let onlineDevices = []
let onlineCaps = []
let desiredCap
let newDesiredCap
let result

setTimeout(async () => {
  debug.log('Test android web desired capability')
  await testSingleDesiredCap(data.listOfSingleDesiredCaps)
  await testMultipleDesiredCap(data.listOfMultipleDesiredCaps)
  run()
}, 1000)

async function getOnlineDesiredCap() {
  onlineDevices = await Device.getDevices({platformName: 'Android'})
  onlineCaps = await convertToDesiredCapabilities(timestamps, onlineDevices)
  assert.isAtLeast(onlineCaps.length, 1, 'Expected at least 1 online device')
  return onlineCaps[0]
}

async function testSingleDesiredCap(listOfSingleDesiredCaps) {
  await BPromise.mapSeries(listOfSingleDesiredCaps, async(listDesiredCap) => {
    // eslint-disable-next-line max-len
    it(`{"${listDesiredCap.name}": ${listDesiredCap.value}} expected result ${listDesiredCap.expectedResult}`, async () => {
      desiredCap = await getOnlineDesiredCap()
      newDesiredCap = `{"${listDesiredCap.name}": ${listDesiredCap.value}}`
      desiredCap = Object.assign(desiredCap, JSON.parse(newDesiredCap))
      result = await executeDesiredCapsTestPage({desiredCapabilities: desiredCap, timeout})
      const state = (result) ? 'failed' : 'passed'
      assert.equal(state, listDesiredCap.expectedResult, result)
    })
  })
}

async function testMultipleDesiredCap(listOfMultipleDesiredCaps) {
  await BPromise.mapSeries(listOfMultipleDesiredCaps, async(listDesiredCap) => {
    // eslint-disable-next-line max-len
    it(`${listDesiredCap.description} expected result ${listDesiredCap.expectedResult}`, async () => {
      desiredCap = await getOnlineDesiredCap()
      desiredCap = Object.assign(desiredCap, listDesiredCap.desiredCaps)
      result = await executeDesiredCapsTestPage({desiredCapabilities: desiredCap, timeout})
      const state = (result) ? 'failed' : 'passed'
      assert.equal(state, listDesiredCap.expectedResult, result)
    })
  })
}
