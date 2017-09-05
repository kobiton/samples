import AuthenticatedPage from '../base'

const timeout = 2000
const elements = {
  apiKeySectionHeader: '//div[contains(., "API Keys")]',
  apiKeyValueDivs: '//input/parent::div/parent::div/parent::div/div[2]/div[1]/div[1]/div[1]/div[2]', // eslint-disable-line max-len
  copyAPIKeysDivs: '//input/parent::div/parent::div/parent::div/div[2]/div[1]/div[1]/div[1]/div[3]', // eslint-disable-line max-len
  deleteAPIKeysDivs: '//input/parent::div/parent::div/parent::div/div[3]',
  addKeybutton: '//span[text()="Add key"]',
  deletePopupTitle: '//h3[text()="Delete API Key"]',
  deletePopupMessage: '//div[text()="Are you sure you want to delete this API key?"]',
  deletePopupCancelButton: '//button/div/span[text()="Cancel"]',
  deletePopupDeleteButton: '//button/div/div/span[text()="Delete"]'
}

const POPUP_ACTIONS = {
  SKIP: 0,
  DELETE: 1,
  ADD: 2,
  CANCEL: 3
}

export default class APIKeysPage extends AuthenticatedPage {

  constructor(specificBrowser = browser) {
    super(specificBrowser)
    this._initElementsGetter(elements)
  }

  /**
  * Navigate to Settings API Key page
  */
  open() {
    super.open('settings/keys')
    this._browser.waitForExist(elements.apiKeySectionHeader)
    return this
  }

  /**
  * Get all API Keys
  * Return {string array} the list API Key
  */
  getAPIKeys() {
    let apiKeyValueDivs = this.getElements(elements.apiKeyValueDivs)
    return apiKeyValueDivs.map((keyDiv) => keyDiv.getText())
  }

  /**
  * Create API Key by clicking Add Key button
  */
  addAPIKey() {
    this._browser.waitForExist(elements.addKeybutton, timeout)
    const keysLength = this.getAPIKeys().length
    this._browser.click(elements.addKeybutton)
    this._waitUntilCountChanges(keysLength, POPUP_ACTIONS.ADD)
    this.waitForLoadingProgressDone()
    return this
  }

  /**
  * Delete API Key
  * @param {int} the position of API Key
  * @param {int} the options to perform actions
  *   Option 0: Do nothing
  *   Option 1: Click Cancel button
  *   Option 2: Click Delete button
  *   Option Default: Click Delete button
  */
  deleteAPIKey(index, options = POPUP_ACTIONS.DELETE) {
    const size = this.getAPIKeys().length
    if (size > 0 && index <= size) {
      this._browser.waitForExist(`${elements.deleteAPIKeysDivs}`, timeout * 2)
      this._browser.waitForVisible(`${elements.deleteAPIKeysDivs}`, timeout * 2)
      this.getElements(elements.deleteAPIKeysDivs)[index].click()
      this._browser.waitForVisible(elements.deletePopupTitle, timeout)
      this._browser.click(elements.deletePopupTitle)
      
      const keysLength = this.getAPIKeys().length

      switch (options) {
        case POPUP_ACTIONS.SKIP:
          // Do nothing
          break
        case POPUP_ACTIONS.CANCEL:
          this._browser.click(elements.deletePopupCancelButton)
          this.waitForLoadingProgressDone()
          break
        case POPUP_ACTIONS.DELETE:
          this.elements.deletePopupDeleteButton.waitForExist(timeout)
          this._browser.click(elements.deletePopupDeleteButton)
          this.waitForLoadingProgressDone()
          this._waitUntilCountChanges(keysLength)
          break
        default:
          this.elements.deletePopupDeleteButton.waitForExist(timeout)
          this._browser.click(elements.deletePopupDeleteButton)
          this.waitForLoadingProgressDone()
          this._waitUntilCountChanges(keysLength)
          break
      }
    }

    return this
  }

  /**
  * Delete all API Keys
  */
  deleteAllAPIKeys() {
    let index = 0
    const size = this.getAPIKeys().length
    while (index < size) {
      this.deleteAPIKey(0)
      index++
    }
    return this
  }

  /**
  * Wait until new API Key is created
  * @param {int} the size of API Keys list
  * @param {int} the options to compare
  *   Option 1: Expected new API Key is created
  *   Option 2: Expected an API Key is deleted
  */
  _waitUntilCountChanges(size, options = POPUP_ACTIONS.DELETE) {
    const deleteMessage = `Expected an API Key is deleted after ${timeout} milliseconds`
    const createMessage = `Expected new API Key is created after ${timeout} milliseconds`
    
    switch (options) {
      case POPUP_ACTIONS.DELETE:
        this._browser.waitUntil(() => {
          return this.getAPIKeys().length < size
        }, timeout, deleteMessage)
        break
      case POPUP_ACTIONS.ADD:
        this._browser.waitUntil(() => {
          return this.getAPIKeys().length > size
        }, timeout, createMessage)
        break
      default:
        break
    }
  }

}
