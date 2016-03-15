import {assert} from 'chai'
import '../helpers/setup'
import {asserters} from 'wd'
import data from './data'

exports.runTestShortDuration = async (driver) => {
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

exports.runTestLongDuration = async (driver) => {
  for (let search of data.longData) {
    let getMsg = await driver// eslint-disable-line babel/no-await-in-loop
      .get('https://www.google.com')
      .waitForElementByName('q', asserters.isDisplayed, 15000)
      .sendKeys(search)
      .waitForElementByName('btnG', asserters.isDisplayed, 15000).click()
      .sleep(3000)
      .title()
    assert.include(getMsg, search)
  }
}
