import 'babel-polyfill'
import {assert} from 'chai'
import '../helpers/setup'
import wd from 'wd'
const data = require('./data')

const asserters = wd.asserters

export async function run_test_short_duration(driver) {
  for (let search of data.shortData) {
    let getMsg = await driver// eslint-disable-line babel/no-await-in-loop
      .get('https://www.google.com')
      .waitForElementByName('q', asserters.isDisplayed, 15000)
      .sendKeys(search)
      .waitForElementByName('btnG', asserters.isDisplayed, 15000)
      .click()
      .sleep(3000)
      .title()
    assert.include(getMsg, search)
  }
}

export async function run_test_long_duration(driver) {
  for (let search of data.longData) {
    let getMsg = await driver// eslint-disable-line babel/no-await-in-loop
      .get('https://www.google.com')
      .waitForElementByName('q', asserters.isDisplayed, 5000).sendKeys(search)
      .waitForElementByName('btnG', asserters.isDisplayed, 5000).click()
      .sleep(3000)
      .title()
    assert.include(getMsg, search)
  }
}
