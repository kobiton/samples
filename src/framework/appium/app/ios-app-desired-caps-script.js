import {createServerConfig} from '../../appium/helper'
import wd from 'wd'

const waitingTime = 60000
export const uiKitCatalogApp = {
  app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/UIKitCatalog-Test-Adhoc.ipa',
  bundleId: 'com.example.apple-samplecode.UIKitCatalog'
}

export async function excuteiOSAppDesiredCapsScript(desiredCap) {
  let driver
  try {
    const server = await createServerConfig()
    driver = await wd.promiseChainRemote(server)
    await driver.init(desiredCap)
    await driver
      .waitForElementByXPath('//*[@name="UIKitCatalog"]', waitingTime)
      .click()
  }
  catch (err) {
    return err.message
  }
  finally {
    await driver.quit()
  }
  return null
}
