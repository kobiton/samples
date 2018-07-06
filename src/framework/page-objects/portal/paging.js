import AuthenticatedPage from '../portal/user/base'

const elements = {
  firstButton: '//li[text()="First"]',
  previousButton: '//li[text()="Previous"]',
  nextButton: '//li[text()="Next"]',
  lastButton: '//li[text()="Last"]',
  pages: '//li'
}

export default class Paging extends AuthenticatedPage {
  constructor(specificBrowser = browser) {
    super(specificBrowser)
    this._initElementsGetter(elements)
  }

  /**
  * Check an element whether it is able to click or not
  * @param locator {string}
  */
  _isClickable(locator) {
    let result = false
    if (this._isExisting(locator)) {
      const property = this._browser.getAttribute(locator, 'style')
      result = (!property.includes('pointer-events: none'))
    }
    return result

  }

  /**
  * Check paging if has more than one page
  * Return a boolean
  */
  _hasMoreThanOnePage() {
    return this._isExisting(elements.nextButton)
  }

  /**
  * Get total pages
  * Return a number of pages
  */
  getTotalPages() {
    let total = 1
    if (this._hasMoreThanOnePage()) {
      this.pause(5000)
      this.moveToPage('LAST')
      this.waitForLoadingProgressDone()
      const lastPageNumber = this.getElements(elements.pages).length - 2
      total = this._browser.getText(`${elements.pages}[${lastPageNumber}]`)
      this.moveToPage('FIRST')
    }
    return total
  }

  /**
  * Move to a given page
  * @param page {string} - button name, either FIRST or PREVIOUS or NEXT or LAST
  */
  moveToPage(page) {
    switch (page.toUpperCase()) {
      case 'FIRST':
        this._browser.click(elements.firstButton)
        break
      case 'PREVIOUS':
        this._browser.click(elements.previousButton)
        break
      case 'NEXT':
        this._browser.click(elements.nextButton)
        break
      case 'LAST':
        this._browser.click(elements.lastButton)
        break
    }
    this.waitForLoadingProgressDone()
  }

  /**
  * Check a given button if it is clickable
  * @param buttonName {string} - button name, either FIRST or PREVIOUS or NEXT or LAST
  * Return a boolean
  */
  isClickableButton(buttonName) {
    let result = false
    switch (buttonName.toUpperCase()) {
      case 'FIRST':
        result = this._isClickable(elements.firstButton)
        break
      case 'PREVIOUS':
        result = this._isClickable(elements.previousButton)
        break
      case 'NEXT':
        result = this._isClickable(elements.nextButton)
        break
      case 'LAST':
        result = this._isClickable(elements.lastButton)
        break
    }
    return result

  }
}
