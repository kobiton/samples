import {assert} from 'chai'
import LoginPage from './page-objects/login'
import {testerAccount, getScript} from './data'
import diff from 'fast-diff'
import {debug} from '@kobiton/core-util'

describe('Verify Automation Settings Page', () => {
  const loginPage = new LoginPage()
  let automationSettingPage
  const titleHeader =   'Kobiton test scripts are based on Appium and can be written in Java, C#, JavaScript, Ruby, Python or PHP. Use the following information to configure your test scripts.'//eslint-disable-line
  const apiKeyHeader = 'API key'
  const serverHeader = 'Server configuration'
  const deviceHeader = 'Device configurations'
  const apiKeyParagraph = 'Use this API key to authenticate your test scripts with the Kobiton cloud'//eslint-disable-line
  const serverParagraph = 'Use the following URL as target endpoint for your test scripts'
  const languages = ['Java', '.NET (C#)', 'NodeJS', 'Ruby', 'Python', 'PHP']

  before(() => {
    loginPage.windowHandleMaximize()
    loginPage.open()
    const sessionsPage = loginPage.login(testerAccount)
    automationSettingPage = sessionsPage.clickAutomationSettingLink()
  })

  it('should display device configurations page ui', () => {
    automationSettingPage.open()
    automationSettingPage.loadingHidden.isExisting()
    // verify elements
    assert.isTrue(automationSettingPage.apiKeyCopyBtn.isVisible())
    assert.isTrue(automationSettingPage.regeneerateApiKeyBtn.isVisible())
    assert.isTrue(automationSettingPage.deviceConfigurationCopyBtn.isVisible())
    assert.isTrue(automationSettingPage.languageText.isVisible())
    assert.isTrue(automationSettingPage.platFormText.isVisible())
    assert.isTrue(automationSettingPage.deviceText.isVisible())
    assert.isTrue(automationSettingPage.platformVersionText.isVisible())
    assert.isTrue(automationSettingPage.orientationText.isVisible())
    assert.isTrue(automationSettingPage.browserText.isVisible())
    // verify texts
    assert.equal(titleHeader, automationSettingPage.titleHeader.getText())
    assert.equal(apiKeyHeader, automationSettingPage.apiKeyHeader.getText())
    assert.equal(serverHeader, automationSettingPage.serverHeader.getText())
    assert.equal(deviceHeader, automationSettingPage.deviceHeader.getText())
    assert.equal(apiKeyParagraph, automationSettingPage.apiKeyParagraph.getText())
    assert.equal(serverParagraph, automationSettingPage.serverParagraph.getText())
  })

  it('should display right device configuration when change language option', () => {
    let url = String(automationSettingPage.serverUrlText.getText())
    url = url.replace('http://', '').replace('/wd/hub', '')
    for (const lang of languages) {
      automationSettingPage.selectLanguageOption(lang)
      const language = String(automationSettingPage.languageText.getText())
      const scriptConfig = {
        serverUrl: url,
        username: testerAccount.username,
        apiKey: automationSettingPage.apiKeyText.getText(),
        device: automationSettingPage.deviceText.getText(),
        platformVersion: automationSettingPage.platformVersionText.getText(),
        orientation: automationSettingPage.orientationText.getText().toLowerCase(),
        browser: automationSettingPage.browserText.getText().toLowerCase(),
        platformName: automationSettingPage.platFormText.getText()
      }
      let actualScript = automationSettingPage.deviceConfigurationText.getText()
      let expectedScript = getScript(language, scriptConfig)
      expectedScript = expectedScript.replace(/\n\r\s/, ' ').trim()
      actualScript = actualScript.replace(/\n\r\s/, ' ').trim()
      // verify actual script and expected script
      const results = diff(actualScript, expectedScript)
      debug.log('Verify Automation Settings Page', 'actual: ' + actualScript)
      debug.log('Verify Automation Settings Page', 'expect: ' + expectedScript)
      assert.isTrue(_checkResult(results), 'should there is no difference' + results)
    }
  })

  function _checkResult(results) {
    for (const res of results) {
      if (res[0] === diff.DELETE || res[0] === diff.INSERT) {
        if ((/\S/).test(res[1])) return false
      }
    }
    return true
  }
})
