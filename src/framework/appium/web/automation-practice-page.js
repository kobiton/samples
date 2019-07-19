import faker from 'faker'
import {debug} from '@kobiton/core-util'
import moment from 'moment'
import config from '../../config/test'

const elements = {
  // Authntication screen
  authenticationUrl: 'http://automationpractice.com/index.php?controller=authentication&back=my-account',
  emailCreateText: '#email_create',
  createAnAccountButton: '#SubmitCreate',
  authenticationError: '#create_account_error',
  searchText: '#search_query_top',
  searchButton: '#searchbox > button',

  // Create an account screen
  pageHeading: '.page-heading',
  tagForm: 'form',
  creatAccountHeader: '//*[@id="noSlide"]/h1',
  genderOptionMr: '//*[@id="id_gender1"]',
  genderOptionMrs: '#id_gender2',
  customerFirstNameText: '//*[@id="customer_firstname"]',
  customerLastNameText: '//*[@id="customer_lastname"]',
  passwordText: '//*[@id="passwd"]',
  email: '//*[@id="email"]',
  dateOfBirthDiv: '//*[@id="uniform-days"]',
  dateOfBirthSelect: '//*[@id="days"]',
  monthOfBirthSelect: '//*[@id="months"]',
  yearOfBirthSelect: '//*[@id="years"]',
  newsLetterCheckbox: '//*[@id="newsletter"]',
  specialOfferCheckbox: '//*[@id="optin"]',
  lastNameText: '//*[@id="lastname"]',
  additionalInformationText: '//*[@id="other"]',
  companyText: '//*[@id="company"]',
  firstAddressText: '//*[@id="address1"]',
  secondAddressText: '//*[@id="address2"]',
  cityText: '//*[@id="city"]',
  stateSelect: '//*[@id="id_state"]',
  zipCodeText: '//*[@id="postcode"]',
  mobilePhoneText: '#phone_mobile',
  accountCreationForm: '//*[@id="account-creation_form"]',
  registerButton: '//*[@id="submitAccount"]',
  registerError: '//*[@id="center_column"]/div'
}

export default class AutomationPracticePage {
  constructor(browser, timeout) {
    this._browser = browser
    this._timeout = timeout
  }

  async executeTest(expectedDurationInMinutes) {
    let duration = 0
    const startedAt = moment.utc()
    try {
      let sessionInfo
      let kobitonSessionId
      
      sessionInfo = await this._browser.getSession()
      kobitonSessionId = sessionInfo.kobitonSessionId

      debug.log(`${config.portalUrl}/sessions/${kobitonSessionId}`)

      // https://w3c.github.io/webdriver/#dfn-set-timeouts
      // https://webdriver.io/docs/api/webdriver.html#settimeouts
      await this._browser.setTimeouts(this._timeout * 2)

      do {
        await this._run() // eslint-disable-line babel/no-await-in-loop
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      this._driver && await this._browser.end()
    }
  }

  async _run() {
    await this._browser.url(elements.authenticationUrl)
    await this._browser.getTitle()
    await this._browser.getPageSource()
    await this._browser.status()
    const searchText = await this._browser.$(elements.searchText)
    await searchText.waitForVisible(this._timeout)
    await searchText.click()
    await searchText.rightClick(4, 4) // replaced by performActions https://github.com/jlipps/simple-wd-spec#perform-actions

    const sessionInfo = await this._browser.getSession()
    if (sessionInfo.platform && sessionInfo.platform === 'ANDROID') {
      await this._browser.hideDeviceKeyboard('tapOutside')
    }

    await searchText.addValue('t-shirt')
    const searchButton = await this._browser.$(searchButton)
    await searchButton.leftClick(4, 4)
    await this._browser.timeoutsImplicitWait(this._timeout)
    await this._browser.back()
    await this._browser.forward() // It is a protocol of w3c Webdriver
    await this._browser.url(elements.authenticationUrl)
    await this._browser.timeouts('page load', this._timeout)
    await this._browser.waitForVisible(elements.emailCreateText, this._timeout)
    await this._browser.setValue(elements.emailCreateText, faker.internet.email())
    await this._browser.click(elements.createAnAccountButton)
    await this._browser.timeouts('page load', this._timeout)
    await this._browser.getTitle()
    await this._browser.cookie()
    await this._browser.setCookie({name: 'test', value: '123'})
    await this._browser.getCookie('test')
    await this._browser.deleteCookie('test')
    // Property: get an attribute from a DOM-element based on the selector and attribute name
    await this._browser.getAttribute(elements.customerLastNameText, 'type')
    await this._browser.getCssProperty(elements.registerButton, 'color')
    await this._browser.getElementSize(elements.customerLastNameText)
    await this._browser.timeoutsAsyncScript(5000)
    await this._browser.getHTML(elements.customerLastNameText)
    await this._browser.getLocation(elements.customerLastNameText)
    await this._browser.getLocationInView(elements.genderOptionMrs)
    await this._browser.getTagName(elements.customerLastNameText)
    await this._browser.waitForText(elements.pageHeading, this._timeout)
    await this._browser.getText(elements.pageHeading).then((text) => {
      debug.log('Current text:', text)
    })
    await this._browser.getUrl()
    await this._browser.isEnabled(elements.customerLastNameText)
    await this._browser.isExisting(elements.customerLastNameText)
    await this._browser.isSelected(elements.genderOptionMr)
    await this._browser.isVisible(elements.customerLastNameText)
    await this._browser.isVisibleWithinViewport(elements.email)
    await this._browser.waitForValue(elements.email, this._timeout)
    await this._browser.getValue(elements.email)
    await this._browser.screenshot()
    await this._browser.saveScreenshot('./reports/screenshot.png')
    await this._browser.setOrientation('portrait')
    await this._browser.setOrientation('landscape')
    await this._browser.setOrientation('portrait')
    await this._browser.getOrientation()
    await this._browser.click(elements.genderOptionMrs)
    await this._browser.waitForSelected(elements.genderOptionMrs, this._timeout)
    await this._browser.clearElement(elements.email)
    await this._browser.selectByAttribute(elements.dateOfBirthSelect, 'value', '2')
    await this._browser.selectByIndex(elements.monthOfBirthSelect, 4)
    await this._browser.selectByValue(elements.yearOfBirthSelect, '1991')
    await this._browser.waitForExist(elements.customerFirstNameText, this._timeout)
    await this._browser.setValue(elements.customerFirstNameText, faker.name.firstName())
    await this._browser.setValue(elements.customerLastNameText, faker.name.lastName())
    await this._browser.setValue(elements.passwordText, faker.internet.password())
    await this._browser.selectByIndex(elements.dateOfBirthSelect, 3)
    await this._browser.selectByValue(elements.monthOfBirthSelect, '3')
    await this._browser.selectByValue(elements.yearOfBirthSelect, '1980')
    await this._browser.touch(elements.newsLetterCheckbox, false)
    await this._browser.click(elements.specialOfferCheckbox)
    await this._browser.setValue(elements.firstAddressText, faker.address.streetAddress())
    await this._browser.setValue(elements.cityText, faker.address.city())
    await this._browser.selectByVisibleText(elements.stateSelect, faker.address.state())
    await this._browser.setValue(elements.zipCodeText, faker.address.zipCode())
    await this._browser.selectorExecute('//input', (divs, message) => {
      return `${divs.length} message`
    }, 'input on the page')
    await this._browser.submitForm(elements.accountCreationForm)
    await this._browser.waitForExist(elements.createAnAccountButton, this._timeout)
    await this._browser.setValue(elements.emailCreateText, faker.internet.email())
    await this._browser.click(elements.createAnAccountButton)
    await this._browser.waitForEnabled(elements.customerFirstNameText, this._timeout)
    await this._browser.click(elements.registerButton)
    await this._browser.waitForVisible(elements.registerError, this._timeout)
    await this._browser.refresh()
    await this._browser.getCommandHistory()
    await this._browser.frame()
    await this._browser.waitForExist(elements.searchText, this._timeout)
    await this._browser.middleClick(elements.searchText, 2, 2)
    await this._browser.getGridNodeDetails()
    await this._browser.leftClick(elements.searchText, 2, 2)
    await this._browser.rightClick(elements.searchText, 2, 2)

    if (sessionInfo.platform && sessionInfo.platform === 'ANDROID') {
      await this._browser.touchDown(10, 30)
      await this._browser.touchUp(10, 30)
      await this._browser.scroll(0, 150)
      await this._browser.moveToObject(elements.searchText)
      await this._browser.swipe(elements.searchText, 0, 10, 10)
      await this._browser.swipeDown(elements.searchText, 10, 10)
      await this._browser.swipeUp(elements.searchText, -10, 10)
      await this._browser.swipeLeft(elements.searchText, 10, 10)
      await this._browser.swipeRight(elements.searchText, -10, 10)
      await this._browser.click(elements.searchText)
      await this._browser.hasFocus(elements.searchText)
      await this._browser.pressKeycode(3)
      await this._browser.longPressKeycode(3)
      await this._browser.setGeoLocation({latitude: 5, longitude: 6, altitude: 7})
      await this._browser.getGeoLocation()
      await this._browser.applicationCacheStatus()
      await this._browser.windowHandles()
      await this._browser.windowHandle()
      await this._browser.keys('Home')
      await this._browser.localStorageSize()
      await this._browser.localStorage()
      await this._browser.windowHandlePosition()
      await this._browser.execute((a, b) => {
        return a + b
      }, 1, 2)
      await this._browser.selectorExecuteAsync('//div', function (divs, message, callback) {
        callback(divs.length + message)
      }, 'divs on the page')
      await this._browser.settings({ignoreUnimportantViews: false})
      await this._browser.settings({ignoreUnimportantViews: true})
      await this._browser.toggleData()
    }

    const contextId = (await this._browser.contexts()).value[0]
    const currentContextId = await this._browser.context()
    const logType = (await this._browser.logTypes()).value[0]
    await this._browser.pause(1000)
    await this._browser.log(logType)
    await this._browser.getCurrentTabId()
    await this._browser.getTabIds()
    await this._browser.getViewportSize()
    await this._browser.context(contextId)
    await this._browser.context()
    await this._browser.context(currentContextId)
    await this._browser.getDeviceTime()
    await this._browser.isLocked()
    await this._browser.settings({shouldUseCompactResponses: true})
    await this._browser.settings({shouldUseCompactResponses: false})
    await this._browser.settings({elementResponseAttributes: 'text'})
    await this._browser.settings({elementResponseAttributes: 'name'})
    await this._browser.settings({elementResponseAttributes: 'rect'})
    await this._browser.settings({elementResponseAttributes: 'attribute/name'})
    await this._browser.settings({elementResponseAttributes: 'attribute/value'})
    await this._browser.settings({enableNotificationListener: true})
    await this._browser.settings()
    await this._browser.unlock()

   if (sessionInfo.platformName && sessionInfo.platformName === 'iOS') {
      await this._browser.touchPerform([{
        action: 'press',
        options: {
          x: 50,
          y: 50
        }
      }])
    }

    await this._browser.session() // It is a protocol of w3c Webdriver
    await this._browser.source()  // It is a protocol of w3c Webdriver
    await this._browser.launch()
  }
}

    /** List unsupported APIs on iOS
      .executeAsync
      .doubleClick
      .moveToObject
      .frameParent
      .deviceKeyEvent
      .getNetworkConnection
      .release
      .touchAction
      .rotate
      .touchFlick
      .toggleTouchIdEnrollment //Touch ID simulation not supported on real devices
      .buttonPress
      .doDoubleClick
      .imeActivated //Unhandled endpoint
      .imeActiveEngine
      .imeAvailableEngines
      .imeDeactivated
      .imeActivate
      .localStorageSize
      .localStorage
      .location
      .windowHandleFullscreen
      .windowHandlePosition
      .scroll
      .newWindow
      .close
      .touchDown
      .setViewportSize
      .setImmediateValue
      .hold
    **/

    /** List unimplemented APIs
      .addCommand
      .call
      .doubleClick
      .setViewportSize
    **/

    /** List error APIs
      .release
      .newWindow
    **/

    /** List APIs are not used in the script
      .endAll
      .close
    **/
