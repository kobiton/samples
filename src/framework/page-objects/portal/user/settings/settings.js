import AuthenticatedPage from '../base'

const elements = {
  apiKeysLink: '//a[@href="/settings/keys"]',
  organizationLink: '//a[@href="/settings/organization"]',
  devicesLink: '//a[@href="/settings/devices"]'
}

const pagesEnum = {
  KEYS: 'KEYS',
  ORGANIZATION: 'ORGANIZATION',
  DEVICES: 'DEVICES'
}

export default class SettingsPage extends AuthenticatedPage {

  constructor(specificBrowser = browser) {
    super(specificBrowser)
    this._initElementsGetter(elements)
  }

  _goToSpecificPage(pageName) {
    switch (pageName.toUpperCase()) {
      case pagesEnum.KEYS:
        this._browser.click(elements.apiKeysLink)
        break
      case pagesEnum.ORGANIZATION:
        this._browser.click(elements.organizationLink)
        break
      case pagesEnum.DEVICES:
        this._browser.click(elements.devicesLink)
        break
    }
  }

  goToKeysPage() {
    this._goToSpecificPage('KEYS')
    this.waitForLoadingProgressDone()
  }

  goToOrganizationPage() {
    this._goToSpecificPage('ORGANIZATION')
    this.waitForLoadingProgressDone()
  }

  goToDevicesPage() {
    this._goToSpecificPage('DEVICES')
    this.waitForLoadingProgressDone()
  }
	
}
