import {assert} from 'chai'
import {debug} from '@kobiton/core-util'
import LoginPage from '../../core/portal-pages/login'
import SessionsPage from '../../core/portal-pages/sessions'
import {testerAccount} from '../core/data'
import viewports from '../core/viewport'
import {getUserInfo} from '../../core/portal-api'
import {normalize} from '../core/helpers/xpath'

describe('Verify Login Page Responsive', () => {
  const portstraitMode = true
  const landscapeMode = false
  const loginPage = new LoginPage()
  let fullNameElement

  before(async () => {
    const userInfo = await getUserInfo()
    let normalizedUsername = normalize(userInfo.user.name);
    fullNameElement = `//div[text()=${normalizedUsername}]`
  })

  Object.keys(viewports).forEach((viewport) => {
    const dimension = viewports[viewport]

    it(`should display login ui properly ${viewport}`, () => {
      testLoginUI(dimension, portstraitMode)
      testLoginUI(dimension, landscapeMode)
    })

    it(`should login successfully with view port ${viewport}`, () => {
      testViewPortsLogin(dimension, portstraitMode)
      testViewPortsLogin(dimension, landscapeMode)
    })
  })

  function testLoginUI(dimension, isPortrait) {
    loginPage.open({...dimension, isPortrait})
    assert.isTrue(loginPage.usernameLabel.isVisible())
    assert.isTrue(loginPage.usernameTextInput.isVisible())
    assert.isTrue(loginPage.passwordLabel.isVisible())
    assert.isTrue(loginPage.passwordTextInput.isVisible())
    assert.isTrue(loginPage.loginButton.isVisible())
    assert.isTrue(loginPage.rememberMeLabel.isVisible())
    assert.isTrue(loginPage.forgotPasswordLink.isVisible())
    assert.isTrue(loginPage.registerNowLink.isVisible())
    assert.isTrue(loginPage.rememberMeCheck.isExisting())
  }

  function testViewPortsLogin(dimension, isPortrait = true) {
    const viewPortMode = isPortrait ? 'Portstrait' : 'Landscape'
    const verifyHandler = isPortrait ? verifyPortraitMode : verifyLandscapeMode
    debug.log('test-login-page:responsive ', `Verify on viewport orientation - ${viewPortMode}`)

    let sessionsPage
    try {
      const options = {...dimension, isPortrait}
      loginPage.open(options)
      sessionsPage = loginPage.login(testerAccount)
      assert.instanceOf(sessionsPage, SessionsPage)
      verifyHandler(sessionsPage, dimension)
    }
    finally {
      if (sessionsPage && sessionsPage.logout) {
        sessionsPage.logout()
      }
    }
  }

  function verifyPortraitMode(page, {width, height}) {
    if (width > 600 && height > 600) {
      verifyMiddleViewports(page)
    }
    else {
      verifySmallViewports(page)
    }
  }

  function verifyLandscapeMode(page, {width, height}) {
    const _width = height
    const _heigh = width
    if (_width < 800) {
      verifySmallViewports(page)
    }
    else if (_width == 960 && _heigh == 600) {
      verifyMiddleViewports(page)
    }
      else {
      verifyLargeViewports(page)
    }
  }

  function verifySmallViewports(sessionsPage) {
    assert.isFalse(browser.isVisible(fullNameElement))
    assert.isFalse(sessionsPage.logoText.isVisible())
    assert.isFalse(sessionsPage.profileTesterLabel.isVisible())
    assert.isFalse(sessionsPage.sessionsLink.isVisible())
    assert.isFalse(sessionsPage.cloudDevicesLink.isVisible())
    assert.isFalse(sessionsPage.automationSettingLink.isVisible())
  }

  function verifyMiddleViewports(sessionsPage) {
    assert.isTrue(browser.isVisible(fullNameElement))
    assert.isTrue(sessionsPage.logoText.isVisible())
    assert.isTrue(sessionsPage.profileTesterLabel.isVisible())
    assert.isFalse(sessionsPage.sessionsLink.isVisible())
    assert.isFalse(sessionsPage.cloudDevicesLink.isVisible())
    assert.isFalse(sessionsPage.automationSettingLink.isVisible())
  }

  function verifyLargeViewports(sessionsPage) {
    assert.isTrue(browser.isVisible(fullNameElement))
    assert.isTrue(sessionsPage.logoText.isVisible())
    assert.isTrue(sessionsPage.profileTesterLabel.isVisible())
    assert.isTrue(sessionsPage.sessionsLink.isVisible())
    assert.isTrue(sessionsPage.cloudDevicesLink.isVisible())
    assert.isTrue(sessionsPage.automationSettingLink.isVisible())
  }
})
