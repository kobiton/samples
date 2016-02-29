import 'babel-polyfill'
import {assert} from 'chai'
import '../helpers/setup'
const data = require('./data')

export async function run_test_short_duration(driver) {
  for (let search of data.shortData) {
    let getMsg = await driver // eslint-disable-line babel/no-await-in-loop
      .get('https://www.google.com')
      .waitForElementByName('q').sendKeys(search)
      .waitForElementByName('btnG').click()
      .sleep(3000)
      .title()
    assert.include(getMsg, search)
  }
}

export async function run_test_long_duration(driver) {
  for (let search of data.longData) {
    let getMsg = await driver// eslint-disable-line babel/no-await-in-loop
      .get('https://www.google.com')
      .waitForElementByName('q').sendKeys(search)
      .waitForElementByName('btnG').click()
      .sleep(3000)
      .title()
    assert.include(getMsg, search)
  }
}
