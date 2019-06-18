import {assert} from 'chai'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import {convertToDesiredCapabilitiesApp} from '../../../../framework/appium/helper'
import BPromise from 'bluebird'
import {listOfSingleiOSDesiredCaps, listOfMultipleiOSDesiredCaps} from './data'
//eslint-disable-next-line
import {excuteiOSAppDesiredCapsScript, uiKitCatalogApp} from '../../../../framework/appium/app/ios-app-desired-caps-script'

const timestamps = moment().format('YYYYMMDDHHmmss')
let onlineiOSDevices = []
let onlineCaps = []
let desiredCap
let result
let newDesiredCap

setTimeout(async () => {
  await testSingleDesiredCap(listOfSingleiOSDesiredCaps)
  await testMultipleiOSDesiredCaps(listOfMultipleiOSDesiredCaps)
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

async function testSingleDesiredCap(listOfSingleiOSDesiredCaps) {
  await BPromise.mapSeries(listOfSingleiOSDesiredCaps, async(listdesiredCaps) => {
    // eslint-disable-next-line max-len
    it(`{"${listdesiredCaps.name}": ${listdesiredCaps.value} expected result ${listdesiredCaps.expectedResult}`, async () => {
      desiredCap = await getOnlineDesiredCap()
      newDesiredCap = `{"${listdesiredCaps.name}": ${listdesiredCaps.value}}`
      const cloneObj = {...desiredCap}
      desiredCap = Object.assign(cloneObj, JSON.parse(newDesiredCap))
      result = await excuteiOSAppDesiredCapsScript(desiredCap)
      const state = (result) ? 'failed' : 'passed'
      assert.equal(state, listdesiredCaps.expectedResult, result)
    })
  })
}

async function testMultipleiOSDesiredCaps(listOfMultipleiOSDesiredCaps) {
  await BPromise.mapSeries(listOfMultipleiOSDesiredCaps, async(listDesiredCap) => {
    // eslint-disable-next-line max-len
    it(`${listDesiredCap.description} expected result ${listDesiredCap.expectedResult}`, async () => {
      desiredCap = await getOnlineDesiredCap()
      const cloneObj = {...desiredCap}
      desiredCap = Object.assign(cloneObj, listDesiredCap.desiredCaps)
      result = await excuteiOSAppDesiredCapsScript(desiredCap)
      const state = (result) ? 'failed' : 'passed'
      assert.equal(state, listDesiredCap.expectedResult, result)
    })
  })
}
