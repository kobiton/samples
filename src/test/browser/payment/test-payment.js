import {assert} from 'chai'
import config from '../../../framework/config/test'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import PaymentUI from '../../../framework/page-objects/portal/user/payment-ui'

const {username1: username, password1: password} = {...config}

let loginPage
let paymentUIPage
const planMinutes = 10
const deviceSlots = 2

describe('On payment page, business annual user should', () => {

  before(async () => {
    loginPage = new LoginPage()
    loginPage.open()
    loginPage.login(username, password)
    paymentUIPage = new PaymentUI()
    paymentUIPage._browser.pause(paymentUIPage.waitTime)
  })

  beforeEach(() => {
    paymentUIPage.open()
  })

  it('be able to increase planed minutes', () => {
    const currentMonthlyMinutes = paymentUIPage.getCurrentMonthlyMinutes()
    let newMonthlyMinutes = parseInt(currentMonthlyMinutes) + planMinutes
    paymentUIPage.updateMonthlyMinutes(newMonthlyMinutes)
    let updateMsg = paymentUIPage.elements.updateSuccess.selector
    assert.isTrue(paymentUIPage.doesElementExist(updateMsg),
      'should show new charge warning')
  })

  it('be able to increase device slots', () => {
    let currentSlots = paymentUIPage.getCurrentSlots()
    let newSlots = parseInt(currentSlots) + deviceSlots
    paymentUIPage.updateSlots(newSlots)
    let updateMsg = paymentUIPage.elements.updateSuccess.selector
    assert.isTrue(paymentUIPage.doesElementExist(updateMsg),
      'should show new charge warning')
  })

  it('not be able to reduce planed minutes', () => {
    let currentMonthlyMinutes = paymentUIPage.getCurrentMonthlyMinutes()
    let newMonthlyMinutes = parseInt(currentMonthlyMinutes) - planMinutes
    paymentUIPage.updateMonthlyMinutes(newMonthlyMinutes)
    let updateMsg = paymentUIPage.elements.updateMinutesFailed.selector
    assert.isTrue(paymentUIPage.doesElementExist(updateMsg),
      'should show error message')
  })

  it('not be able to reduce device slots', () => {
    const currentSlots = paymentUIPage.getCurrentSlots()
    const newSlots = parseInt(currentSlots) - deviceSlots
    paymentUIPage.updateSlots(newSlots)
    const updateMsg = paymentUIPage.elements.updateSlotsFailed.selector
    assert.isTrue(paymentUIPage.doesElementExist(updateMsg),
      'should show error message')
  })

  // make sure order total is not affected by annual 20% discount
  it('no longer have auto manual discount offer', () => {
    const priceOnUI = paymentUIPage.getMonthlyCost()
    // calculate order total in a month then multiply by 12
    // to get order total for a year
    const orderTotalExpected = (parseInt(priceOnUI.monthlyMinutesTotal.split('$').pop()) +
      parseInt(priceOnUI.monthlySlotsTotal.split('$').pop())) * 12
    assert.equal(priceOnUI.orderTotal.replace(/\$|,/g, ''), orderTotalExpected,
      'expected order total does not match actual order total')
  })

  it('have discount option link next to total order on portal UI', () => {
    const annualDiscountString = paymentUIPage.elements.annualDiscountString.selector
    const contactUsURL = paymentUIPage.elements.contactUsURL.selector
    assert.isTrue(paymentUIPage.doesElementExist(annualDiscountString),
      'Annual discount string did not appear on UI')
    assert.isTrue(paymentUIPage.doesElementExist(contactUsURL),
      'Contact us url did not appear on UI')
  })

  it('be able to cancel its plan', () => {
    paymentUIPage.cancelSubscription()
    const reActivateOption = paymentUIPage.elements.reactivateButton.selector
    assert.isTrue(paymentUIPage.doesElementExist(reActivateOption),
      'reactivate button should appear on UI')
  })

  it('be able to reactivate a canceled plan successfully', () => {
    paymentUIPage.reactivateSubscription()
    assert.isTrue(paymentUIPage.doesElementExist(
      paymentUIPage.elements.updatePlanButton.selector),
      'update plan should appear on UI')
  })

})
