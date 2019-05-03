import moment from 'moment'
import {createServerConfig} from '../../appium/helper'
import {assert} from 'chai'
import wd from 'wd'

const waitingTime = 60000
export const apiDemoDebugApp = {
  app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ApiDemos-debug.apk',
  appPackage: 'io.appium.android.apis'
}

export async function excuteAndroidAppDesiredCapsScript(desiredCap, expectedDuration) {
  let duration = 0
  let startedAt, endedAt
  let driver
  try {
    startedAt = moment.utc()
    const server = await createServerConfig()
    driver = await wd.promiseChainRemote(server)
    await driver.init(desiredCap)
    do {
      // eslint-disable-next-line babel/no-await-in-loop
      await driver.elementByClassName('android.widget.TextView', waitingTime)
      .text().then(function (text) {
        assert.equal(text.toLocaleLowerCase(), 'api demos')
      })

      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'seconds')
    } while (duration < expectedDuration)
  }
  catch (err) {
    return err.message
  }
  finally {
    await driver.quit()
  }
  return null
}
