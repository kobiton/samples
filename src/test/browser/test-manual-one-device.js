import {assert} from 'chai'
import LoginPage from '../../framework/page-objects/portal/intro/login'
import DevicePage from '../../framework/page-objects/portal/user/my-devices'
import config from '../../framework/config/test'

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
