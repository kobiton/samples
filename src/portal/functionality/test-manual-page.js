import {assert} from 'chai'
import LoginPage from '../../core/portal-pages/login'
import CloudDevicesPage from '../../core/portal-pages/cloud-devices'
import {testerAccount} from '../core/data'
import {compareImages} from '../../core/helpers/image'

describe('Verify Manual Page', () => {

  const waitingTime = 5000
  // Acceptable different rate on comparing two images
  const tolerance = 0.1
  const beforeActionImage = './beforeActionImage.png'
  const afterBackImage = './afterBackImage.png'

  let manualPage

  before('should launch manual testing session successfully', () => {

    const loginPage = new LoginPage()
    loginPage.windowHandleMaximize()
    loginPage.open()
    const sessionsPage = loginPage.login(testerAccount)
    const cloudDevicesPage = sessionsPage.gotoCloudDevicesPage()
    manualPage = cloudDevicesPage.launch()
    manualPage.waitForPageLoaded()
  })

  it('should display the elements properly after launching manual session', () => {

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

  it('should navigate back to the previous screen when clicking on the [BACK] button', () => {

    browser.pause(waitingTime)
    manualPage.captureCanvas(beforeActionImage)
    manualPage.menuButton.click()
    browser.pause(waitingTime)
    manualPage.backButton.click()
    manualPage.captureCanvas(afterBackImage)
    browser.pause(waitingTime)
  })

  it('should display same screens before action and after navigating back', async function async() {

    const isIdentical = await compareImages(beforeActionImage, afterBackImage, tolerance)
    assert.isTrue(isIdentical)
  })

  it('should stop session properly when clicking on the [STOP] button', () => {

    manualPage.stopSessionButton.click()
    const isDeviceReadyToLaunchAgain = new CloudDevicesPage()
            .isDeviceReadyToLaunch(manualPage.DeviceName, waitingTime)
    assert.isTrue(isDeviceReadyToLaunchAgain)
  })

})
