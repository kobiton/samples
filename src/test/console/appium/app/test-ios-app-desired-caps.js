import {assert} from 'chai'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import {convertToDesiredCapabilitiesApp} from '../../../../framework/appium/helper'
import BPromise from 'bluebird'
import {listOfDesiredCaps} from './data'
//eslint-disable-next-line
import {excuteiOSAppDesiredCapsScript, uiKitCatalogApp} from '../../../../framework/appium/app/ios-app-desired-caps-script'

const duration = 60 // seconds
const timestamps = moment().format('YYYYMMDDHHmmss')
let onlineiOSDevices = []
let onlineCaps = []
let desiredCap
let result
let newDesiredCap

setTimeout(async () => {
  await testSingleDesiredCap(listOfDesiredCaps)
  run()
}, 1000)

async function getOnlineDesiredCap() {
  onlineiOSDevices = await Device.getDevices({
    onlineDeviceOnly: true,
    platformName: 'iOS'
  })
  //eslint-disable-next-line
  onlineCaps = await convertToDesiredCapabilitiesApp(timestamps, uiKitCatalogApp, onlineiOSDevices)
  assert.isAtLeast(onlineCaps.length, 1, 'Expected at least 1 iOS online device')
  return onlineCaps[0]
}

async function testSingleDesiredCap(listOfDesiredCaps) {
  await BPromise.mapSeries(listOfDesiredCaps, async(listOfDesiredCaps) => {
    // eslint-disable-next-line max-len
    it(`{"${listOfDesiredCaps.name}": ${listOfDesiredCaps.value} expected result ${listOfDesiredCaps.expectedResult}`, async () => {
      desiredCap = await getOnlineDesiredCap()
      newDesiredCap = `{"${listOfDesiredCaps.name}": ${listOfDesiredCaps.value}}`
      const cloneObj = {...desiredCap}
      desiredCap = Object.assign(cloneObj, JSON.parse(newDesiredCap))
      result = await excuteiOSAppDesiredCapsScript(desiredCap, duration)
      const state = (result) ? 'failed' : 'passed'
      assert.equal(state, listOfDesiredCaps.expectedResult, result)
    })
  })
}
