const elements = {
  loadingHidden: '#app [data-state= "hidden"]',
  loadingRunning: '#app [data-state= "running"]'
}
const timeout = 5000

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
    return this._browser.getUrl()
  }

  /**
   * Reload page
   */
  refreshPage() {
    this._browser.refresh()
    this.waitForLoadingProgressDone()
  }

  /**
  * Wait for an element (selected by css selector) for the provided amount of milliseconds
  * to be present within the DOM
  */
  waitForLoadingProgressRunning() {
    this._browser.waitForExist(elements.loadingRunning, timeout * 2)
  }

  /**
  * Wait for an element (selected by css selector) for the provided amount of milliseconds
  * to be present within the DOM
  */
  waitForLoadingProgressDone() {
    this._browser.waitForExist(elements.loadingHidden, timeout * 4)
  }

  /**
  * Search for multiple elements on the page, starting from the document root.
  * The located elements will be returned as a WebElement JSON objects.
  * @param {string} selector to query the elements
  */
  _isElementExists(selectorValue) {
    let response = this._browser.elements(selectorValue)
    return response.value && response.value.length > 0
  }

  /**
  * Returns true if at least one element is existing by given selector
  */
  _isExisting(selectorValue) {
    return this._browser.isExisting(selectorValue)
  }

  /**
   * Go through all of elements and create getter function for each of element
   * @param  {object} elements [description]
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
 * @param {selector} is a string to identify objects
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
   * @param {string} CSS selector to query
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

}
