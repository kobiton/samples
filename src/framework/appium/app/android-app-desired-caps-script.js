import {createServerConfig} from '../../appium/helper'
import {assert} from 'chai'
import wd from 'wd'

const waitingTime = 60000
export const apiDemoDebugApp = {
  app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ApiDemos-debug.apk',
  appPackage: 'io.appium.android.apis'
}

export async function excuteAndroidAppDesiredCapsScript(desiredCap) {
  let driver
  try {
    const server = await createServerConfig()
    driver = await wd.promiseChainRemote(server)
    await driver.init(desiredCap)
    await driver.elementByClassName('android.widget.TextView', waitingTime)
      .text().then(function (text) {
        assert.equal(text.toLocaleLowerCase(), 'api demos')
      })
  }
  catch (err) {
    return err.message
  }
  finally {
    if (driver !== null) {
      await driver.quit()
    }
  }
  return null
}
