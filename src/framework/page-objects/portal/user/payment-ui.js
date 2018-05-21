import SettingsPage from './settings/settings'

const elements = {
  monthlyMinutes: '//input[@name="monthlyMinutes"]',
  deviceSlots: '//input[@name="deviceSlots"]',
  updateSuccess: '//p[contains(text(),"Your updated plan has higher benefits and cost.")]',
  updateMinutesFailed: '//span[contains(.,"New minutes must be greater")]/div/div[3]',
  updateSlotsFailed: '//span[contains(.,"New device slots must be greater")]/div/div[3]',
  monthlyMinutesCost: '//div/span[contains(text(),"Total")]/following::*[1]/span[4]',
  monthlySlotsCost: '//div/div[2]/div/div[3]/span[4]',
  totalCost: '//div[2]/div/div[4]/span[2]/div[2]/span[2]',
  annualDiscountString: '//div/span/span[contains(.,"Annual discount")]',
  contactUsURL: '//div/span/a[contains(.,"Contact Us")]',
  cancelSubscriptionButton: '//div/span[contains(.,"Cancel Subscription")]',
  CancelSubscriptionConfirmButton: '//div/span[contains(.,"Yes, cancel my subscription")]',
  reactivateButton: '//button/div/div/span[contains(.,"Reactivate")]',
  updatePlanButton: '//button/div/div[contains(.,"Update Plan")]'
}

const waitTime = 1000

export default class PaymentPage extends SettingsPage {

  constructor(specificBrowser = browser) {
    super(specificBrowser)
    this._initElementsGetter(elements)
  }

  open() {
    super.open('subscription/update')
  }

/**
* get the current monthly minutes on UI
*/
  getCurrentMonthlyMinutes() {
    this._browser.click(elements.monthlyMinutes)
    this.waitForLoadingProgressDone()
    return this._browser.getValue(elements.monthlyMinutes)
  }

  /**
  * update new monthly minutes on UI
  * @param minutes {integer} - new minutes to update
  */
  updateMonthlyMinutes(minutes) {
    this._browser.click(elements.monthlyMinutes)
      .setValue(elements.monthlyMinutes, minutes)
    this.waitForLoadingProgressDone()
  }

  /**
  * get the current device slots on UI
  */
  getCurrentSlots() {
    this._browser.click(elements.deviceSlots)
    this.waitForLoadingProgressDone()
    return this._browser.getValue(elements.deviceSlots)
  }

  /**
  * update new monthly minutes on UI
  * @param slotNum {integer} - new slot number to update
  */
  updateSlots(slotNum) {
    this._browser.click(elements.deviceSlots)
      .setValue(elements.deviceSlots, slotNum)
    this.waitForLoadingProgressDone()
  }

  /**
  * return the total minutes for a month on UI
  */
  getMonthlyCost() {
    this._browser.pause(waitTime)
    return {
      monthlyMinutesTotal: this._browser.getText(elements.monthlyMinutesCost),
      monthlySlotsTotal: this._browser.getText(elements.monthlySlotsCost),
      orderTotal: this._browser.getText(elements.totalCost)
    }
  }

  /**
  * cancel current user subscription
  */
  cancelSubscription() {
    this._browser.click(elements.cancelSubscriptionButton)
    this.waitForLoadingProgressDone()
    this._browser.click(elements.CancelSubscriptionConfirmButton)
    this.waitForLoadingProgressDone()
  }

  /**
  * re-activate user's canceled subscription
  */
  reactivateSubscription() {
    this._browser.click(elements.reactivateButton)
    this.waitForLoadingProgressDone()
  }

  /**
  * check if element exist on UI
  * @param selector {string} - element's xpath on UI
  */
  doesElementExist(selector) {
    return this._browser.isExisting(selector)
  }
}
