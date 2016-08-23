import {assert} from 'chai'
import LoginPage from '../../core/portal-pages/login'
import CloudDevicesPage from '../../core/portal-pages/cloud-devices'
import {testerAccount} from '../core/data'
import {compareImages} from '../../core/helpers/image'
import {debug} from '@kobiton/core-util'

describe('Verify Manual Page', () => {
  const waitingTime = 5000
  const tolerance = 0.1
  // Custom test scenarios
  const scenarios = [
    {
      //'deviceName': 'Galaxy S5'
      'steps': [
        verifyUI,
        testBackFeature,
        testStopSession
      ]
    }
  ]

  scenarios.forEach((scenario) => {
    if (!launchManualFeature(scenario.deviceName)) {
      return
    }
    
    for (let stepHandler of scenario.steps) {
      let isSuccess = stepHandler()
      if (!isSuccess) {
        break
      }
    }
  })

  let manualPage
  function verifyUI() {
    it('should display the elements properly', () => {
      assert.isTrue(manualPage.powerButton.isEnabled())
      assert.isTrue(manualPage.stopSessionButton.isEnabled())
      assert.isTrue(manualPage.apkUrlTextbox.isEnabled())
      assert.isTrue(manualPage.apkFileInput.isEnabled())
      assert.isFalse(manualPage.sendToDeviceAndInstallButton.isEnabled())
      assert.isFalse(manualPage.uploadToDeviceAndInstallButton.isEnabled())
      assert.isTrue(manualPage.backButton.isEnabled())
      assert.isTrue(manualPage.homeButton.isEnabled())
      assert.isTrue(manualPage.menuButton.isEnabled())
    })
  }

  function launchManualFeature(deviceName) {
    try {
      it(`should launch device ${deviceName || 'randomly'}  successfully`, () => {
        const loginPage = new LoginPage()
        loginPage.windowHandleMaximize()
        loginPage.open()
        const sessionsPage = loginPage.login(testerAccount)
        const cloudDevicesPage = sessionsPage.gotoCloudDevicesPage()
        manualPage = cloudDevicesPage.launch(deviceName)
        manualPage.waitForPageLoaded()
      })
      return true
    }
    catch (err) {
      debug.error(err)
      return false
    }
  }

  function testStopSession() {
    it('should stop session properly', () => {
      manualPage.stopSessionButton.click()
      const isDeviceReadyToLaunchAgain = new CloudDevicesPage()
            .isDeviceReadyToLaunch(manualPage.DeviceName, waitingTime)
      assert.isTrue(isDeviceReadyToLaunchAgain)
    })
  }

  function testBackFeature() {

    const beforeActionImage = './beforeActionImage.png'
    const afterBackImage = './afterBackImage.png'

    it('should come back to the previous screen', () => {
      browser.pause(waitingTime)
      manualPage.captureCanvas(beforeActionImage)
      manualPage.menuButton.click()
      browser.pause(waitingTime)
      manualPage.backButton.click()
      manualPage.captureCanvas(afterBackImage)
      browser.pause(waitingTime)
    })

    it('verify if the screens are identical', async function async() {
      const isIdentical = await compareImages(beforeActionImage, afterBackImage, tolerance)
      assert.isTrue(isIdentical)
    })
  }

})
