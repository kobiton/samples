import {assert} from 'chai'
import {debug} from '@kobiton/core-util'
import LoginPage from '../../core/portal-pages/login'
import SessionsPage from '../../core/portal-pages/sessions'
import {testerAccount} from '../core/data'
import viewports from '../core/viewport'
import {getUserInfo} from '../../core/portal-api'
import {normalize} from '../core/helpers/xpath'

describe('Login Page', () => {
  const portstraitMode = true
  const landscapeMode = false
  const loginPage = new LoginPage()
  let fullNameElement
  
  before(async () => {
    const userInfo = await getUserInfo()
    let normalizedUsername = normalize(userInfo.user.name);
    fullNameElement = `//div[text()=${normalizedUsername}]`
  })
  
  it('should display login ui properly', () => {
    testLoginUI(portstraitMode)
    testLoginUI(landscapeMode)
  })

  it('should login successfully with view port', () => {
    testViewPortsLogin(portstraitMode)
    testViewPortsLogin(landscapeMode)
  })

  function testLoginUI(isPortrait) {
    Object.keys(viewports).forEach((viewport) => {
      const dimension = viewports[viewport]
      loginPage.open({...dimension, isPortrait})
      assert.isTrue(loginPage.usernameLbl.isVisible())
      assert.isTrue(loginPage.usernameTxt.isVisible())
      assert.isTrue(loginPage.passwordLbl.isVisible())
      assert.isTrue(loginPage.passwordTxt.isVisible())
      assert.isTrue(loginPage.loginBtn.isVisible())
      assert.isTrue(loginPage.rememberMeLbl.isVisible())
      assert.isTrue(loginPage.forgotPasswordLnk.isVisible())
      assert.isTrue(loginPage.registerNowLnk.isVisible())
      assert.isTrue(loginPage.rememberMeChk.isExisting())
    })
  }
  
  function testViewPortsLogin(isPortrait = true) {
    const viewPortMode = isPortrait ? 'Portstrait' : 'Landscape'
    const verifyHandler = isPortrait ? verifyPortraitMode : verifyLandscapeMode
    debug.log('test', `Verify on viewport orientation - ${viewPortMode}`)

    Object.keys(viewports).forEach((viewport) => {
      let sessionsPage
      try {
        const dimension = viewports[viewport]
        debug.log('viewports', `Simulate '${viewport}' ${JSON.stringify(dimension)}`)
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
    })
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
    assert.isFalse(sessionsPage.profileTesterLbl.isVisible())
    assert.isFalse(sessionsPage.sessionsLink.isVisible())
    assert.isFalse(sessionsPage.cloudDevicesLink.isVisible())
    assert.isFalse(sessionsPage.automationSettingLnk.isVisible())
  }

  function verifyMiddleViewports(sessionsPage) {
    assert.isTrue(browser.isVisible(fullNameElement))
    assert.isTrue(sessionsPage.logoText.isVisible())
    assert.isTrue(sessionsPage.profileTesterLbl.isVisible())
    assert.isFalse(sessionsPage.sessionsLink.isVisible())
    assert.isFalse(sessionsPage.cloudDevicesLink.isVisible())
    assert.isFalse(sessionsPage.automationSettingLnk.isVisible())
  }

  function verifyLargeViewports(sessionsPage) {
    assert.isTrue(browser.isVisible(fullNameElement))
    assert.isTrue(sessionsPage.logoText.isVisible())
    assert.isTrue(sessionsPage.profileTesterLbl.isVisible())
    assert.isTrue(sessionsPage.sessionsLink.isVisible())
    assert.isTrue(sessionsPage.cloudDevicesLink.isVisible())
    assert.isTrue(sessionsPage.automationSettingLnk.isVisible())
  }
  
})
