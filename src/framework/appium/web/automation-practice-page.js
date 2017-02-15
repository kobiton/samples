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
  constructor(browser, timeOut) {
    this._browser = browser
    this._timeOut = timeOut
  }

  async executeTest(expectedDurationInMinutes) {
    let duration = 0
    const startedAt = moment.utc()
    try {
      await this._browser.init()
      do {
        await this._run() // eslint-disable-line babel/no-await-in-loop
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    catch (err) {
      throw new Error(JSON.stringify(err))
    }
    finally {
      await this._browser.end()
    }
  }

  async _run() {
    return await this._browser
      .url(elements.authenticationUrl)
      .getSource()
      .pause(1000)
      .addValue(elements.searchText, 't-shirt')
      .keys(' woman')
      .hold(elements.searchText)
      .hideDeviceKeyboard()
      .click(elements.searchButton)
      .timeoutsImplicitWait(this._timeOut)
      .back()
      .forward()
      .back()
      .setValue(elements.emailCreateText, faker.internet.email())
      .click(elements.createAnAccountButton)
      .timeouts('page load', this._timeOut)
      .getTitle()
      .cookie()
      .setCookie({name: 'test', value: '123'})

      // Property: get an attribute from a DOM-element based on the selector and attribute name
      .getAttribute(elements.customerLastNameText, 'type')
      .getCssProperty(elements.registerButton, 'color')
      .getElementSize(elements.customerLastNameText)
      .getHTML(elements.customerLastNameText)
      .getLocation(elements.customerLastNameText)
      .getLocationInView(elements.genderOptionMrs)
      .getTagName(elements.customerLastNameText)
      .getText(elements.pageHeading).then((text) => {
        debug.log('automation practice page:', text)
      })
      .getValue(elements.email).then((value) => {
        debug.log('automation practice page:', value)
      })
      .getUrl()

      // State: get status of a DOM-element based on the selector
      .isEnabled(elements.customerLastNameText)
      .isExisting(elements.customerLastNameText)
      .isSelected(elements.customerLastNameText)
      .isVisible(elements.customerLastNameText)
      .isVisibleWithinViewport(elements.email)

      // Mobile: do mobile actions
      .isLocked()
      .setOrientation('portrait')
      .setOrientation('landscape')
      .getOrientation()
      .buttonDown(0)
      .buttonPress(1)
      .buttonUp(2)

      // Actions: do action on an object found by given selector
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
        return `${divs.length}message`
      }, 'input on the page')
      .selectorExecuteAsync('//div', (divs, message, callback) => {
        callback(divs.length + message)
      }, 'divs on the page')
      .submitForm(elements.accountCreationForm)
      .waitForExist(elements.createAnAccountButton, this._timeOut)
      .setValue(elements.emailCreateText, faker.internet.email())
      .click(elements.createAnAccountButton)
      .waitForEnabled(elements.customerFirstNameText, this._timeOut)
      .click(elements.registerButton)
      .waitForVisible(elements.registerError, this._timeOut)
      .frame()
      .frameParent()
      .waitForValue(elements.email, this._timeOut)
      .screenshot()
      .pause(this._timeOut)
      .saveScreenshot('./reports/test/screenshot.png')
      .scroll(elements.address1, 85, 195)

      // Protocol
      .elements(elements.tagForm)
      .elementActive(elements.genderOptionMrs).then((elemActive) => {
        this._browser.elementIdClick(elemActive.value.ELEMENT)
      })
      .element(elements.email).then((element) => {
        this._browser
          .elementIdClear(element.value.ELEMENT)
          .elementIdDisplayed(element.value.ELEMENT)
          .elementIdCssProperty(element.value.ELEMENT, 'background-color')
          .elementIdElement(element.value.ELEMENT, elements.email)
          .elementIdName(element.value.ELEMENT)
          .elementIdValue(element.value.ELEMENT, 'test')
      })
      .refresh()
      .getCommandHistory()
      .getCookie()
      .url('http://webdriver.io')
      .getCurrentTabId()
      .getTabIds()
      .getGridNodeDetails()
      .reload()
      .deleteCookie()
  }
}
