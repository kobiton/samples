import {assert} from 'chai'
import LoginPage from '../../framework/page-objects/portal/login'
import DevicePage from '../../framework/page-objects/portal/my-devices'
import config from '../../framework/core/config'

describe('Devices / Manual', () => {
  beforeEach(() => {
    browser.reload()

    let loginPage = new LoginPage()
    loginPage.open()
        .login({
          username: config.username1,
          password: config.password1
        })
  })

  it('Should able to launch a device and take a screenShot', () => {
    let devicePage = new DevicePage()

    let deviceLaunchedPage = devicePage.open()
      .launchFirstKobitonCloudDevice()
      .waitForSessionCreated()

    const screenShotCount = deviceLaunchedPage.takeScreenShot()
      .waitForScreenShotUploaded()
      .getScreenShotUrls()
    assert.equal(1, screenShotCount.length, 'ScreenShot count was incorrect!')
  })
})
