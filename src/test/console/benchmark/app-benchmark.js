import Device from '../../../framework/api/device'
import {_appBenchmark, _logResult} from './helper'
import {assert} from 'chai'

const apiDemoDebugApp = {
  app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ApiDemos-debug.apk',
  appPackage: 'io.appium.android.apis',
  appActivity: '.ApiDemos'
}

const uiKitCatalogApp = {
  app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/UIKitCatalog-Test-Adhoc.ipa',
  bundleId: 'com.example.apple-samplecode.UIKitCatalog'
}

describe('app benchmark testing', () => {
  it('should show benchmark result', async () => {
    const onlineDevices = await Device.getOnlineDevices()
    assert.isAtLeast(onlineDevices.length, 1, 'Expected at least one online device')
    const result = await _appBenchmark(onlineDevices, {apiDemoDebugApp, uiKitCatalogApp})
    _logResult(result, 'app_benchmark_result.csv')
  })
})
