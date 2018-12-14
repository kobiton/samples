import faker from 'faker'
import {debug} from '@kobiton/core-util'
import moment from 'moment'

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
  constructor(browser, timeOut, desiredCapabilities) {
    this._browser = browser
    this._timeOut = timeOut
    this._desiredCapabilities = desiredCapabilities
  }

  async executeTest(expectedDurationInMinutes) {
    let duration = 0
    const startedAt = moment.utc()
    try {
      await this._browser.init()
      
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
      .waitForVisible(elements.searchText, this._timeOut)
      .click(elements.searchText)
      .hideDeviceKeyboard('tapOutside')
      .addValue(elements.searchText, 't-shirt')
      .click(elements.searchButton)
      .timeoutsImplicitWait(this._timeOut)
      .back()
      .forward()
      .url(elements.authenticationUrl)
      .waitForVisible(elements.emailCreateText, this._timeOut)
      .setValue(elements.emailCreateText, faker.internet.email())
      .click(elements.createAnAccountButton)
      .timeouts('page load', this._timeOut)
      .getTitle()
      .cookie()
      .setCookie({name: 'test', value: '123'})
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
      .getText(elements.pageHeading).then((text) => {
        debug.log('Current text:', text)
      })
      .getUrl()
      .isEnabled(elements.customerLastNameText)
      .isExisting(elements.customerLastNameText)
      .isSelected(elements.genderOptionMr)
      .isVisible(elements.customerLastNameText)
      .isVisibleWithinViewport(elements.email)
      .screenshot()
      .saveScreenshot('./reports/screenshot.png')
      .setOrientation('portrait')
      .setOrientation('landscape')
      .setOrientation('portrait')
      .getOrientation()
      .click(elements.genderOptionMrs)
      .waitForSelected(elements.genderOptionMrs, this._timeOut)
      .clearElement(elements.email)
      .selectByAttribute(elements.dateOfBirthSelect, 'value', '2')
      .selectByIndex(elements.monthOfBirthSelect, 4)
      .selectByValue(elements.yearOfBirthSelect, '1991')
      .waitForExist(elements.customerFirstNameText, this._timeOut)
      .setValue(elements.customerFirstNameText, faker.name.firstName())
      .setValue(elements.customerLastNameText, faker.name.lastName())
      .setValue(elements.passwordText, faker.internet.password())
      .selectByIndex(elements.dateOfBirthSelect, 3)
      .selectByValue(elements.monthOfBirthSelect, '3')
      .selectByValue(elements.yearOfBirthSelect, '1980')
      .click(elements.newsLetterCheckbox)
      .click(elements.specialOfferCheckbox)
      .setValue(elements.firstAddressText, faker.address.streetAddress())
      .setValue(elements.cityText, faker.address.city())
      .selectByVisibleText(elements.stateSelect, faker.address.state())
      .setValue(elements.zipCodeText, faker.address.zipCode())
      .selectorExecute('//input', (divs, message) => {
        return `${divs.length} message`
      }, 'input on the page')
      .submitForm(elements.accountCreationForm)
      .waitForExist(elements.createAnAccountButton, this._timeOut)
      .setValue(elements.emailCreateText, faker.internet.email())
      .click(elements.createAnAccountButton)
      .waitForEnabled(elements.customerFirstNameText, this._timeOut)
      .click(elements.registerButton)
      .waitForVisible(elements.registerError, this._timeOut)
      .refresh()
      .getCommandHistory()
      .getCookie()
      .frame()
      .middleClick(elements.searchText)
      .getGridNodeDetails()
      .contexts()
      .getDeviceTime()
      .isLocked()
      .settings({ignoreUnimportantViews: true})
      .settings()
      .unlock()
      .applicationCacheStatus()
      .execute((a, b) => {
        return a + b
      }, 1, 2)
      .keys('Home')
    const logType = (await this._browser.logTypes()).value[0]
    await this._browser
      .log(logType)
      .windowHandles()
      .touch(elements.searchText, false)
      .pause(1000)
      .getCurrentTabId()
      .getTabIds()
      .getViewportSize()
    if (await this._browser.isIOS) {
      await this._browser.touchPerform([{
        action: 'press',
        options: {
          x: 50,
          y: 50
        }
      }])
    }
    await this._browser
      .session()
      .source()
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
