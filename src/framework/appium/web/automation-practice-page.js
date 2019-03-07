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
  constructor(browser, timeout, desiredCapabilities) {
    this._browser = browser
    this._timeout = timeout
    this._desiredCapabilities = desiredCapabilities
  }

  async executeTest(expectedDurationInMinutes) {
    let duration = 0
    const startedAt = moment.utc()
    try {
      await this._browser.init()
      const sessionInfo = await this._browser.session()
      debug.log(`${config.portalUrl}/sessions/${sessionInfo.value.kobitonSessionId}`)

      if (this._desiredCapabilities.platformName === 'iOS') {
        await this._browser.timeouts({'type': 'page load', 'ms': this._timeout})
        await this._browser.timeouts({'type': 'implicit', 'ms': this._timeout})
      }
      else {
        await this._browser.timeouts({
          'pageLoad': this._timeout,
          'implicit': this._timeout
        })
      }

      do {
        await this._run() // eslint-disable-line babel/no-await-in-loop
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      await this._browser.end()
    }
  }

  async _run() {
    await this._browser
      .url(elements.authenticationUrl)
      .title()
      .getSource()
      .status()
      .waitForVisible(elements.searchText, this._timeout)
      .click(elements.searchText)
      .rightClick(elements.searchText, 4, 4)

    const isAndroid = await this._browser.isAndroid
    if (isAndroid) {
      await this._browser.hideDeviceKeyboard('tapOutside')
    }

    await this._browser
      .addValue(elements.searchText, 't-shirt')
      .leftClick(elements.searchButton, 4, 4)
      .timeoutsImplicitWait(this._timeout)
      .back()
      .forward() // It is a protocol of w3c Webdriver
      .url(elements.authenticationUrl)
      .timeouts('page load', this._timeout)
      .waitForVisible(elements.emailCreateText, this._timeout)
      .setValue(elements.emailCreateText, faker.internet.email())
      .click(elements.createAnAccountButton)
      .timeouts('page load', this._timeout)
      .getTitle()
      .cookie()
      .setCookie({name: 'test', value: '123'})
      .getCookie('test')
      .deleteCookie('test')
      // Property: get an attribute from a DOM-element based on the selector and attribute name
      .getAttribute(elements.customerLastNameText, 'type')
      .getCssProperty(elements.registerButton, 'color')
      .getElementSize(elements.customerLastNameText)
      .timeoutsAsyncScript(5000)
      .getHTML(elements.customerLastNameText)
      .getLocation(elements.customerLastNameText)
      .getLocationInView(elements.genderOptionMrs)
      .getTagName(elements.customerLastNameText)
      .waitForText(elements.pageHeading, this._timeout)
      .getText(elements.pageHeading).then((text) => {
        debug.log('Current text:', text)
      })
      .getUrl()
      .isEnabled(elements.customerLastNameText)
      .isExisting(elements.customerLastNameText)
      .isSelected(elements.genderOptionMr)
      .isVisible(elements.customerLastNameText)
      .isVisibleWithinViewport(elements.email)
      .waitForValue(elements.email, this._timeout)
      .getValue(elements.email)
      .screenshot()
      .saveScreenshot('./reports/screenshot.png')
      .setOrientation('portrait')
      .setOrientation('landscape')
      .setOrientation('portrait')
      .getOrientation()
      .click(elements.genderOptionMrs)
      .waitForSelected(elements.genderOptionMrs, this._timeout)
      .clearElement(elements.email)
      .selectByAttribute(elements.dateOfBirthSelect, 'value', '2')
      .selectByIndex(elements.monthOfBirthSelect, 4)
      .selectByValue(elements.yearOfBirthSelect, '1991')
      .waitForExist(elements.customerFirstNameText, this._timeout)
      .setValue(elements.customerFirstNameText, faker.name.firstName())
      .setValue(elements.customerLastNameText, faker.name.lastName())
      .setValue(elements.passwordText, faker.internet.password())
      .selectByIndex(elements.dateOfBirthSelect, 3)
      .selectByValue(elements.monthOfBirthSelect, '3')
      .selectByValue(elements.yearOfBirthSelect, '1980')
      .touch(elements.newsLetterCheckbox, false)
      .click(elements.specialOfferCheckbox)
      .setValue(elements.firstAddressText, faker.address.streetAddress())
      .setValue(elements.cityText, faker.address.city())
      .selectByVisibleText(elements.stateSelect, faker.address.state())
      .setValue(elements.zipCodeText, faker.address.zipCode())
      .selectorExecute('//input', (divs, message) => {
        return `${divs.length} message`
      }, 'input on the page')
      .submitForm(elements.accountCreationForm)
      .waitForExist(elements.createAnAccountButton, this._timeout)
      .setValue(elements.emailCreateText, faker.internet.email())
      .click(elements.createAnAccountButton)
      .waitForEnabled(elements.customerFirstNameText, this._timeout)
      .click(elements.registerButton)
      .waitForVisible(elements.registerError, this._timeout)
      .refresh()
      .getCommandHistory()
      .frame()
      .waitForExist(elements.searchText, this._timeout)
      .middleClick(elements.searchText, 2, 2)
      .getGridNodeDetails()
      .leftClick(elements.searchText, 2, 2)
      .rightClick(elements.searchText, 2, 2)

    if (isAndroid) {
      await this._browser
        .touchDown(10, 30)
        .touchUp(10, 30)
        .scroll(0, 150)
        .moveToObject(elements.searchText)
        .swipe(elements.searchText, 0, 10, 10)
        .swipeDown(elements.searchText, 10, 10)
        .swipeUp(elements.searchText, -10, 10)
        .swipeLeft(elements.searchText, 10, 10)
        .swipeRight(elements.searchText, -10, 10)
        .click(elements.searchText)
        .hasFocus(elements.searchText)
        .pressKeycode(3)
        .longPressKeycode(3)
        .setGeoLocation({latitude: 5, longitude: 6, altitude: 7})
        .getGeoLocation()
        .applicationCacheStatus()
        .windowHandles()
        .windowHandle()
        .keys('Home')
        .localStorageSize()
        .localStorage()
        .windowHandlePosition()
        .execute((a, b) => {
          return a + b
        }, 1, 2)
        .selectorExecuteAsync('//div', function (divs, message, callback) {
          callback(divs.length + message)
        }, 'divs on the page')
        .settings({ignoreUnimportantViews: false})
        .settings({ignoreUnimportantViews: true})
        .toggleData()
    }

    const contextId = (await this._browser.contexts()).value[0]
    const currentContextId = await this._browser.context()
    const logType = (await this._browser.logTypes()).value[0]
    await this._browser
      .pause(1000)
      .log(logType)
      .getCurrentTabId()
      .getTabIds()
      .getViewportSize()
      .context(contextId)
      .context()
      .context(currentContextId)
      .getDeviceTime()
      .isLocked()
      .settings({shouldUseCompactResponses: true})
      .settings({shouldUseCompactResponses: false})
      .settings({elementResponseAttributes: 'text'})
      .settings({elementResponseAttributes: 'name'})
      .settings({elementResponseAttributes: 'rect'})
      .settings({elementResponseAttributes: 'attribute/name'})
      .settings({elementResponseAttributes: 'attribute/value'})
      .settings({enableNotificationListener: true})
      .settings()
      .unlock()

    const isIOS = await this._browser.isIOS
    if (isIOS) {
      await this._browser.touchPerform([{
        action: 'press',
        options: {
          x: 50,
          y: 50
        }
      }])
    }

    await this._browser
      .session() // It is a protocol of w3c Webdriver
      .source()  // It is a protocol of w3c Webdriver
      .launch()
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
