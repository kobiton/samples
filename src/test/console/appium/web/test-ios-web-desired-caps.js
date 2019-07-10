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

setTimeout(async () => {
  debug.log('Test iOS web desired capability')
  await testSingleDesiredCap(data.listOfiOSDesiredCaps)
  await testMultipleIOSDesiredCaps(data.listOfMultipleIOSDesiredCaps)
  run()
}, 1000)

async function getOnlineDesiredCap() {
  onlineDevices = await Device.getDevices({platformName: 'iOS', onlineDeviceOnly: true})
  onlineCaps = await convertToDesiredCapabilities(timestamps, onlineDevices)
  assert.isAtLeast(onlineCaps.length, 1, 'Expected at least 1 online device')
  return onlineCaps[0]
}

async function testSingleDesiredCap(listOfiOSDesiredCaps) {
  await BPromise.mapSeries(listOfiOSDesiredCaps, async(listDesiredCap) => {
    // eslint-disable-next-line max-len
    it(`{"${listDesiredCap.name}": ${listDesiredCap.value}} expected result ${listDesiredCap.expectedResult}`, async () => {
      let desiredCap = await getOnlineDesiredCap()
      // eslint-disable-next-line max-len
      const newDesiredCap = `{"${listDesiredCap.name}": ${listDesiredCap.value}}`
      const cloneObj = {...desiredCap}
      desiredCap = Object.assign(cloneObj, JSON.parse(newDesiredCap))
      const result = await executeDesiredCapsTestPage({desiredCapabilities: desiredCap, timeout})
      const state = (result) ? 'failed' : 'passed'
      assert.equal(state, listDesiredCap.expectedResult, result)
    })
  })
}

async function testMultipleIOSDesiredCaps(listOfMultipleIOSDesiredCaps) {
  await BPromise.mapSeries(listOfMultipleIOSDesiredCaps, async(listDesiredCap) => {
    // eslint-disable-next-line max-len
    it(`${listDesiredCap.description} expected result ${listDesiredCap.expectedResult}`, async () => {
      let desiredCap = await getOnlineDesiredCap()
      const cloneObj = {...desiredCap}
      desiredCap = Object.assign(cloneObj, listDesiredCap.desiredCaps)
      const result = await executeDesiredCapsTestPage({desiredCapabilities: desiredCap, timeout})
      const state = (result) ? 'failed' : 'passed'
      assert.equal(state, listDesiredCap.expectedResult, result)
    })
  })
}
