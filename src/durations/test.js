import {assert} from 'chai'
import '../helpers/setup'
import {asserters} from 'wd'
import data from './data'
import setup from '../helpers/setup'

exports.runTestShortDuration = async (cap) => {
  let driver
  try {
    driver = await setup.createDriver(cap)
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
  catch (err) {
    throw err
  }
  finally {
    setup.quitDriver(driver)
  }

}
exports.runTestLongDuration = async (cap) => {
  let driver
  try {
    driver = await setup.createDriver(cap)
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
  catch (err) {
    throw err
  }
  finally {
    setup.quitDriver(driver)
  }

}
