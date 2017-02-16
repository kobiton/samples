const elements = {
  loadingHidden: '#app [data-state= "hidden"]',
  loadingRunning: '#app [data-state= "running"]'
}

export default class Page {

  /**
   * Constructor for Page object
   * @param  {[type]} specificBrowser browser that control this page object,
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
 * @param   {path} path to the selected page. ex: /login or /register
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

  windowHandleMaximize() {
    this._browser.windowHandleMaximize()
  }

  pause(timeout) {
    this._browser.pause(timeout)
  }

  waitForLoadingProgressRunning() {
    this._browser.waitForExist(elements.loadingRunning)
  }

  waitForLoadingProgressDone() {
    this._browser.waitForExist(elements.loadingHidden)
  }

  _isElementExists(selectorValue) {
    let response = this._browser.elements(selectorValue)
    return response.value && response.value.length > 0
  }

  _isPluralSelectorName(selectorName) {
    return selectorName.endsWith('s')
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
 * @param   {selectorValue} is a string to identify an object
 * @returns {element} return an web element object
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
 * @param   {selector} is a string to identify objects
 * @returns {element} return an array of web element objects
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
   * @param  {string} selectorValue xpath or css selector
   * Throw Error if element not existed
   */
  _waitForExist(selectorValue) {
    try {
      this._browser.waitForExist(selectorValue)
    }
    catch (err) {
      throw new Error(`selector of ${selectorValue} is not exist. Please check ` + err)
    }
  }
}
