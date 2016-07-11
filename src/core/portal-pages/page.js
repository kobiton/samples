const defaultElements = {
  loadingHidden: '#app [data-state= "hidden"]',
  loadingRunning: '#app [data-state= "running"]'
}

export default class Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements,
            ...elements
    }
    this._elements = totalElements
    this.initElements(totalElements)
  }
  get elements() {
    return this._elements
  }

/**
 *Open a page
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
      browser.setViewportSize({
        width: _width,
        height: _height
      })
    }
    browser.url('/' + path)
  }

  windowHandleMaximize() {
    browser.windowHandleMaximize()
  }

/**
 * Go through all of elements and create getter function for each of element
 * @param   {Object literal} elements of an page
 * @uses when construct a new page we need to initialze elements for each page
 *
 */
  initElements(elements) {
    Object.keys(elements).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => {
          return this._getElement(key, elements[key])
        }
      })
    })
  }

/**
 * Wait for an element exist then return an web element
 * @param   {selector} is a string to identify an object
 * @returns {element} return an web element object
 */
  _getElement(selectorName, selectorValue) {
    try {
      browser.waitForExist(selectorValue)
    }
    catch (err) {
      throw new Error(`selector of ${selectorName} is not exist. Please check` + err)
    }
    return browser.element(selectorValue)
  }
}
