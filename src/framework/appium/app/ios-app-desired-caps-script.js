import moment from 'moment'
import {createServerConfig} from '../../appium/helper'
import wd from 'wd'

const waitingTime = 60000
export const uiKitCatalogApp = {
  app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/UIKitCatalog-Test-Adhoc.ipa',
  bundleId: 'com.example.apple-samplecode.UIKitCatalog'
}

export async function excuteiOSAppDesiredCapsScript(desiredCap, expectedDuration) {
  let duration = 0
  let startedAt, endedAt
  let driver
  try {
    startedAt = moment.utc()
    const server = await createServerConfig()
    driver = await wd.promiseChainRemote(server)
    await driver.init(desiredCap)
    do {
      await driver // eslint-disable-line babel/no-await-in-loop
        .waitForElementByXPath('//*[@name="UIKitCatalog"]', waitingTime)
        .click()

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
