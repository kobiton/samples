import {assert} from 'chai'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import {convertToDesiredCapabilitiesApp} from '../../../../framework/appium/helper'
import BPromise from 'bluebird'
import {listOfSingleAndroidDesiredCaps, listOfMultipleAndroidDesiredCaps} from './data'
//eslint-disable-next-line
import {excuteAndroidAppDesiredCapsScript, apiDemoDebugApp} from '../../../../framework/appium/app/android-app-desired-caps-script'

const timestamps = moment().format('YYYYMMDDHHmmss')
let onlineAndroidDevices = []
let onlineCaps = []
let desiredCap
let result
let newDesiredCap

setTimeout(async () => {
  await testSingleDesiredCap(listOfSingleAndroidDesiredCaps)
  await testMultipleDesiredCap(listOfMultipleAndroidDesiredCaps)
  run()
}, 1000)

async function getOnlineDesiredCap() {
  onlineAndroidDevices = await Device.getDevices({
    onlineDeviceOnly: true,
    platformName: 'Android'
  })
  //eslint-disable-next-line max-len
  onlineCaps = await convertToDesiredCapabilitiesApp(timestamps, apiDemoDebugApp, onlineAndroidDevices)
  assert.isAtLeast(onlineCaps.length, 1, 'Expected at least 1 online device')
  return onlineCaps[0]
}

async function testSingleDesiredCap(listOfSingleAndroidDesiredCaps) {
  // eslint-disable-next-line max-len
  await BPromise.mapSeries(listOfSingleAndroidDesiredCaps, async(listOfSingleAndroidDesiredCaps) => {
    // eslint-disable-next-line max-len
    it(`{"${listOfSingleAndroidDesiredCaps.name}": ${listOfSingleAndroidDesiredCaps.value}} expected result ${listOfSingleAndroidDesiredCaps.expectedResult}`, async () => {
      desiredCap = await getOnlineDesiredCap()
      // eslint-disable-next-line max-len
      newDesiredCap = `{"${listOfSingleAndroidDesiredCaps.name}": ${listOfSingleAndroidDesiredCaps.value}}`
      const cloneObj = {...desiredCap}
      desiredCap = Object.assign(cloneObj, JSON.parse(newDesiredCap))
      result = await excuteAndroidAppDesiredCapsScript(desiredCap)
      const state = (result) ? 'failed' : 'passed'
      assert.equal(state, listOfSingleAndroidDesiredCaps.expectedResult, result)
    })
  })
}

async function testMultipleDesiredCap(listOfMultipleAndroidDesiredCaps) {
  await BPromise.mapSeries(listOfMultipleAndroidDesiredCaps, async(listDesiredCap) => {
    // eslint-disable-next-line max-len
    it(`${listDesiredCap.description} expected result ${listDesiredCap.expectedResult}`, async () => {
      desiredCap = await getOnlineDesiredCap()
      const cloneObj = {...desiredCap}
      desiredCap = Object.assign(cloneObj, listDesiredCap.desiredCaps)
      result = await excuteAndroidAppDesiredCapsScript(desiredCap)
      const state = (result) ? 'failed' : 'passed'
      assert.equal(state, listDesiredCap.expectedResult, result)
    })
  })
}
