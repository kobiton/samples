import * as webdriverio from 'webdriverio'
import faker from 'faker'
import {debug} from '@kobiton/core-util'
import moment from 'moment'
import BPromise from 'bluebird'

const createAccountPage = {
  // Authntication screen
  authenticationUrl: 'http://automationpractice.com/index.php?controller=authentication&back=my-account',
  emailCreateText: '//*[@id="email_create"]',
  createAnAccountButton: '//*[@id="SubmitCreate"]',
  authenticationError: '//*[@id="create_account_error"]',
  // Create an account screen
  creatAccountHeader: '//*[@id="noSlide"]/h1',
  mrOption: '//*[@id="id_gender1"]',
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
  mobilePhoneText: '//*[@id="phone_mobile"]',
  accountCreationForm: '#account-creation_form',
  registerButton: '//*[@id="submitAccount"]'
}

const timeOut = 30000
export async function run(server, onlineDevices, expectedDurationInHours) {

  const jobs = onlineDevices
    .map((cap) => _launchWdio(server, cap, expectedDurationInHours))
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

async function _launchWdio(server, desiredCapabilities, expectedDurationInHours) {
  let startedAt, endedAt
  let duration = 0
  const expectedDuration = expectedDurationInHours * 60 // Convert hours to seconds
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  try {
    await browser.on('error', (e) => {
      debug.error(`wdio-test:${desiredCapabilities.deviceName}`, e.body.value.class)
      debug.error(`wdio-test:${desiredCapabilities.deviceName}`, e.body.value.message)
    })
    startedAt = moment.utc()
    await browser
      .init()
      .url(createAccountPage.authenticationUrl)
      .setValue(createAccountPage.emailCreateText, faker.internet.email())
      .click(createAccountPage.createAnAccountButton)
      .waitForExist(createAccountPage.creatAccountHeader, timeOut)
      .click(createAccountPage.mrOption)
    do {

      await browser // eslint-disable-line babel/no-await-in-loop
      // Property: get an attribute from a DOM-element based on the selector and attribute name
        .getAttribute(createAccountPage.customerLastNameText, 'type')
        .getElementSize(createAccountPage.customerLastNameText)
        .getHTML(createAccountPage.customerLastNameText)
        .getLocation(createAccountPage.customerLastNameText)
        .getTagName(createAccountPage.customerLastNameText)
        .getUrl()
        .getTitle()
        .getSource()
      // State: get status of a DOM-element based on the selector
        .isEnabled(createAccountPage.customerLastNameText)
        .isExisting(createAccountPage.customerLastNameText)
        .isSelected(createAccountPage.customerLastNameText)
        .hasFocus(createAccountPage.customerLastNameTextCss)
        .isVisible(createAccountPage.customerLastNameText)
        .isVisibleWithinViewport(createAccountPage.customerLastNameText)
      // Actions: do action on an object found by given selector
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
        .click(createAccountPage.registerButton)
        .selectorExecute('//input', (divs, message) => {
          return divs.length + message
        }, 'input on the page')
      // Mobile: do mobile actions
        .swipeUp(createAccountPage.passwordText)
        .swipeUp(createAccountPage.lastNameText)
        .swipeUp(createAccountPage.cityText)
        .swipeUp(createAccountPage.mobilePhoneText)
        .swipeLeft(createAccountPage.passwordText, 2)
        .swipeRight(createAccountPage.passwordText, 2)
        .swipeDown(createAccountPage.mobilePhoneText)
      const orientation = await browser.getOrientation() // eslint-disable-line babel/no-await-in-loop max-len
      const isLocked = await browser.isLocked() // eslint-disable-line babel/no-await-in-loop

      if (!isLocked && orientation === 'portrait') {
        await browser.setOrientation('landscape') // eslint-disable-line babel/no-await-in-loop
      }
      else if (!isLocked && orientation === 'landscape') {
        await browser.setOrientation('portrait') // eslint-disable-line babel/no-await-in-loop
      }
      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'minutes')
    } while (duration < expectedDuration)
  }
  catch (err) {
    debug.error(`${new Date().toISOString()} wdio-test:${desiredCapabilities.deviceName}`, err)
  }
  finally {
    if (browser) {
      await browser.end()
    }
  }
}
