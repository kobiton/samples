import fs from 'fs'
import rimraf from 'rimraf'
import compareImages from 'resemblejs/compareImages'
import {prepareFolderSync} from '../../../framework/util'

const elements = {
  loadingHidden: '#app [data-state= "hidden"]',
  loadingRunning: '#app [data-state= "running"]'
}
const timeout = 60000

export default class Page {

  /**
   * Constructor for Page object
   * @param {[type]} specificBrowser browser that control this page object,
   * default is global browser
   */
  constructor(specificBrowser = browser) {
    this._cachedElemens = {}
    this._browser = specificBrowser
    this._elements = {}
    this._initElementsGetter(elements)
  }

  get elements() {
    return this._elements
  }

/**
 * Open a page
 * @param {path} path to the selected page. ex: /login or /register
 * @uses when open an identified page.by default, it will open the baseUrl
 * which have been defined in wdio.conf.js
 */
  open(path, {
    width,
    height,
    isPortrait
  } = {}) {
    if (width && height) {
      let _width = width
      let _height = height
      if (isPortrait === true) {
        let temp = _width
        _width = _height
        _height = temp
      }
      this._browser.setViewportSize({
        width: _width,
        height: _height
      })
    }
    this._browser.url('/' + path)
    this.waitForLoadingProgressDone()
  }

  /**
  * Maximize the specified window if not already maximized
  */
  windowHandleMaximize() {
    this._browser.windowHandleMaximize()
  }

  /**
  * Pause execution for a specific amount of time
  * @param {int} milliseconds - time in ms
  */
  pause(timeout) {
    this._browser.pause(timeout)
  }

  /**
  * Navigate backwards in the browser history, if possible
  */
  back() {
    this._browser.back()
    this.waitForLoadingProgressDone()
    this._browser.pause(timeout)
    return this
  }

  /**
   * Get url of the page
   */
  getUrlPage() {
    this.waitForLoadingProgressDone()
    return this._browser.getUrl()
  }

  /**
   * Reload page
   */
  refreshPage() {
    this._browser.refresh()
    this.waitForLoadingProgressRunning()
    this.waitForLoadingProgressDone()
  }

  /**
  * Date time Regex
  */
  dateTimeRegex() {
    // eslint-disable-next-line max-len
    const dateTimeRegex = /(1[0-2]|0[1-9])\/(3[01]|[12][0-9]|0[1-9])\/[0-9]{4} ([0]\d|[1][0-2]):([0-5]\d) \s?(?:AM|PM)/
    return dateTimeRegex
  }

  /**
  * Time Regex
  */
  timeRegex() {
    const timeRegrex = /[0-9][0-9]:([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/
    return timeRegrex
  }

  /**
  * Click on element
  */
  click(ele) {
    this._browser.click(elements[ele])
  }

  /**
  * Wait for an element (selected by css selector) for the provided amount of milliseconds
  * to be present within the DOM
  */
  waitForLoadingProgressRunning() {
    this._browser.waitForExist(elements.loadingRunning, timeout * 6)
  }

  /**
  * Wait for an element (selected by css selector) for the provided amount of milliseconds
  * to be present within the DOM
  */
  waitForLoadingProgressDone() {
    this._browser.waitForExist(elements.loadingHidden, timeout * 10)
  }

  /**
  * Take current viewport screenshot
  * @param page {string} name page of screenshot
  * @param nameScreenshot {string} name screenshot we took
  */
  takeScreenshotPage(page, nameScreenshot) {
    const screenshootFolder = `images/${page}`
    prepareFolderSync(screenshootFolder)
    this._browser.screenshot()
    this._browser.saveScreenshot(`${screenshootFolder}/${nameScreenshot}.png`)
  }

  /**
  * Compare two screenshots
  * @param page {string} name page of screenshot
  * @param nameScreenshot1 {string} name of the first screenshot
  * @param nameScreenshot2 {string} name of the second screenshot
  * @param resultName {string} name screenshot of result comparision
  */
  async compareImages(page, nameScreenshot1, nameScreenshot2, resultName) {
    const data = await compareImages(
      fs.readFileSync(`images/${page}/${nameScreenshot1}.png`),
      fs.readFileSync(`images/${page}/${nameScreenshot2}.png`)
    )
    fs.writeFileSync(`images/${page}/${resultName}.png`, data.getBuffer())
    return data
  }

  /**
  * Clean up folder image
  * @param folderName {string} name of folder we want to clean
  */
  cleanUpFolder(folderName) {
    if (fs.existsSync(folderName)) {
      const folderPath = fs.realpathSync(folderName)
      rimraf.sync(folderPath)
    }
  }

  /**
  * Returns true if at least one element is existing by given selector
  */
  _isExisting(selectorValue) {
    return this._browser.isExisting(selectorValue, timeout)
  }

  /**
   * Go through all of elements and create getter function for each of element
   * @param elements {object} elements [description]
   * @return {object} element   could throw exception
   *                             if element not found
   */
  _initElementsGetter(elements) {
    Object.keys(elements).forEach((key) => {
      Object.defineProperty(this._elements, key, {
        get: () => {
          return this._getElement(elements[key])
        }
      })
    })
  }

  /**
   * Wait for an element exist then return an web element. This method does not cache result
   * @param {selectorValue} is a string to identify an object
   * @return {element} return an web element object
   */
  _getElement(selectorValue) {
    let element = this._cachedElemens[selectorValue]
    if (!element) {
      this._browser.waitForExist(selectorValue)
      element = this._browser.element(selectorValue)
      this._cachedElemens[selectorValue] = element
    }

    return element
  }

  /**
   * Wait for elements exist then return an arrays of web elements. Cache result.
   * @param selectorValue {selector} is a string to identify objects
   * @return {element} return an array of web element objects
   */
  getElements(selectorValue) {
    let elements = []
    let response = this._browser.elements(selectorValue)

    if (response.value) {
      // From element id list, get real web json object to interact like single element
      for (let elementId of response.value) {
        let elem = this._browser.elementIdElement(elementId.ELEMENT, selectorValue)
        elements.push(elem)
      }
    }
    return elements
  }

  /**
   * Wait for elelemt(s) exist
   * @param selectorValue {string} CSS selector to query
   * Throw Error if element is not existed
   */
  _waitForExist(selectorValue, timeout = 5000, reverse = false) {
    try {
      this._browser.waitForExist(selectorValue, timeout, reverse)
    }
    catch (err) {
      throw new Error(`selector of ${selectorValue} is not existed. Please check ` + err)
    }
  }

  /**
   * Clear the current value on text field
   * @param element {object} the element
   */
  clearField(element, type = 'set') {
    try {
      this._browser.click(element)
      const getValue = this._browser.getValue(element)
    
      for (let i = 0; i < getValue.length; i++) {
        if (type.toLowerCase() === 'set') {
          this._browser.setValue(element, ['', '\uE003'])
        }
        else {
          this._browser.addValue(element, ['', '\uE003'])
        }
      }
    }
    catch (err) {
      throw new Error(`Can't clear value on element ${element} ${err}`)
    }
  }

}
