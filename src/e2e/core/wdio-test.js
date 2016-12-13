import * as webdriverio from 'webdriverio'
import faker from 'faker'
import {debug} from '@kobiton/core-util'
import moment from 'moment'
import BPromise from 'bluebird'

const createAccountPage = {
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

const timeOut = 60000
export async function run(server, onlineDevices, expectedDurationInMinutes) {

  const jobs = onlineDevices
    .map((cap) => _launchWdio(server, cap, expectedDurationInMinutes))
    .map((promise) => promise.then(onSuccess, onError).catch((err) => {
      debug.error('run: promise error', err)
    }))

  const finishedJobs = await BPromise.all(jobs)
  const successCount = finishedJobs.reduce((sum, ok) => {
    return (sum + ok)
  }, 0)

  function onSuccess(value) {
    return 1
  }

  function onError(err) {
    debug.error('run: error', err)
    return 0
  }

  return successCount
}

async function _launchWdio(server, desiredCapabilities, expectedDurationInMinutes) {
  let startedAt, endedAt
  let duration = 0
  const expectedDuration = expectedDurationInMinutes
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  try {
    await browser.on('error', (e) => {
      debug.error(`wdio-test:${desiredCapabilities.deviceName}`, e.body.value.class)
      debug.error(`wdio-test:${desiredCapabilities.deviceName}`, e.body.value.message)
    })
    startedAt = moment.utc()
    do {

      await browser // eslint-disable-line babel/no-await-in-loop
        .init()
        .url(createAccountPage.authenticationUrl)
        .getSource()
        .pause(1000)
        .addValue(createAccountPage.searchText, 't-shirt')
        .keys(' woman')
        .hold(createAccountPage.searchText)
        .hideDeviceKeyboard()
        .click(createAccountPage.searchButton)
        .timeoutsImplicitWait(timeOut)
        .back()
        .forward()
        .back()
        .setValue(createAccountPage.emailCreateText, faker.internet.email())
        .click(createAccountPage.createAnAccountButton)
        .timeouts('page load', timeOut)
        .getTitle()
        .cookie()
        .setCookie({name: 'test', value: '123'})

        // Property: get an attribute from a DOM-element based on the selector and attribute name
        .getAttribute(createAccountPage.customerLastNameText, 'type')
        .getCssProperty(createAccountPage.registerButton, 'color')
        .getElementSize(createAccountPage.customerLastNameText)
        .getHTML(createAccountPage.customerLastNameText)
        .getLocation(createAccountPage.customerLastNameText)
        .getLocationInView(createAccountPage.genderOptionMrs)
        .getTagName(createAccountPage.customerLastNameText)
        .getText(createAccountPage.pageHeading).then((text) => {
          debug.log(text)
        })
        .getValue(createAccountPage.email).then((value) => {
          debug.log(value)
        })
        .getUrl()

        // State: get status of a DOM-element based on the selector
        .isEnabled(createAccountPage.customerLastNameText)
        .isExisting(createAccountPage.customerLastNameText)
        .isSelected(createAccountPage.customerLastNameText)
        .isVisible(createAccountPage.customerLastNameText)
        .isVisibleWithinViewport(createAccountPage.email)

        // Mobile: do mobile actions
        .isLocked()
        .setOrientation('portrait')
        .setOrientation('landscape')
        .getOrientation()
        .buttonDown(0)
        .buttonPress(1)
        .buttonUp(2)

        // Actions: do action on an object found by given selector
        .click(createAccountPage.genderOptionMrs)
        .waitForSelected(createAccountPage.genderOptionMrs, timeOut)
        .clearElement(createAccountPage.email)
        .selectByAttribute(createAccountPage.dateOfBirthSelect, 'value', '2')
        .selectByIndex(createAccountPage.monthOfBirthSelect, 4)
        .selectByValue(createAccountPage.yearOfBirthSelect, '1991')
        .waitForExist(createAccountPage.customerFirstNameText, timeOut)
        .setValue(createAccountPage.customerFirstNameText, faker.name.firstName())
        .setValue(createAccountPage.customerLastNameText, faker.name.lastName())
        .setValue(createAccountPage.passwordText, faker.internet.password())
        .selectByIndex(createAccountPage.dateOfBirthSelect, 3)
        .selectByValue(createAccountPage.monthOfBirthSelect, '3')
        .selectByValue(createAccountPage.yearOfBirthSelect, '1980')
        .click(createAccountPage.newsLetterCheckbox)
        .click(createAccountPage.specialOfferCheckbox)
        .setValue(createAccountPage.firstAddressText, faker.address.streetAddress())
        .setValue(createAccountPage.cityText, faker.address.city())
        .selectByVisibleText(createAccountPage.stateSelect, faker.address.state())
        .setValue(createAccountPage.zipCodeText, faker.address.zipCode())
        .selectorExecute('//input', (divs, message) => {
          return `${divs.length}message`
        }, 'input on the page')
        .selectorExecuteAsync('//div', (divs, message, callback) => {
          callback(divs.length + message)
        }, 'divs on the page')
        .submitForm(createAccountPage.accountCreationForm)
        .waitForExist(createAccountPage.createAnAccountButton, timeOut)
        .setValue(createAccountPage.emailCreateText, faker.internet.email())
        .click(createAccountPage.createAnAccountButton)
        .waitForEnabled(createAccountPage.customerFirstNameText, timeOut)
        .click(createAccountPage.registerButton)
        .waitForVisible(createAccountPage.registerError, timeOut)
        .frame()
        .frameParent()
        .waitForValue(createAccountPage.email, timeOut)
        .screenshot()
        .pause(timeOut)
        .saveScreenshot('./reports/test/screenshot.png')
        .scroll(createAccountPage.address1, 85, 195)

        // Protocol
        .elements(createAccountPage.tagForm)
        .elementActive(createAccountPage.genderOptionMrs).then((elemActive) => {
          browser.elementIdClick(elemActive.value.ELEMENT)
        })
        .element(createAccountPage.email).then((element) => {
          browser
            .elementIdClear(element.value.ELEMENT)
            .elementIdDisplayed(element.value.ELEMENT)
            .elementIdCssProperty(element.value.ELEMENT, 'background-color')
            .elementIdElement(element.value.ELEMENT, createAccountPage.email)
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
        .end()

        // JSONWire protocol commands have not yet supportted
        // .dragAndDrop()
        // .moveToObject()
        // .gridProxyDetails()
        // .gridTestSession()
        // .getAppString()
        // .getDeviceTime() // only support iOS
        // .performTouchAction()
        // .pressKeyCode()
        // .rotate()
        // .strings()
        // .swipe()
        // .swipeDown()
        // .swipeLeft()
        // .swipeRight()
        // .swipeUp()
        // .touch()
        // .touchAction()
        // .touchId()
        // .touchPerform()
        // .alertAccept()
        // .alertDismiss()
        // .alertText()
        // .applicationCacheStatus()
        // .doDoubleClick()
        // .elementIdLocation()
        // .elementIdLocationInView()
        // .elementIdRect()
        // .execute()
        // .executeAsync()
        // .file()
        // .imeActivate()
        // .imeActivated()
        // .imeActiveEngine()
        // .imeAvailableEngines()
        // .imeDeactivated()
        // .keys()
        // .localStorage()
        // .localStorageSize()
        // .location()
        // .log()
        // .logTypes()
        // .moveTo()
        // .session()
        // .sessionStorage()
        // .sessionStorageSize()
        // .sessions()
        // .timeoutsAsyncScript()
        // .touchClick()
        // .touchDown()
        // .touchFlick()
        // .touchLongClick()
        // .touchMove()
        // .touchScroll()
        // .touchUp()
        // .$()
        // .$$()
        // .addCommand()
        // .call()
        // .chooseFile()
        // .debug()
        // .endAll()
        // .uploadFile()
        // .close()
        // .switchTab()

      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'minutes')
    } while (duration < expectedDuration)
  }
  catch (err) {
    debug.error(`${new Date().toISOString()} wdio-test:${desiredCapabilities.deviceName}`, err)
    throw err
  }
  finally {
    if (browser) {
      debug.log('end test')
      await browser.end()
    }
  }
}
