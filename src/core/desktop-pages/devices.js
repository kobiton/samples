import AuthenticatedPage from './authenticated'

const defaultElements = {
  nameLbl: '//*[@id="app"]/div/div[1]/div/div[2]/div[1]/div[2]/div/div[1]',
  activateBtn: '//span[text()="ACTIVATE"]/../../../../button',
  deActivateBtn: '//span[text()="DEACTIVATE"]/../../../../button'
}

export default class DevicesPage extends AuthenticatedPage {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  async waitForNameExist() {
    this.client.waitForExist(this.elements.nameLbl)
  }

  async activateDevice() {
    if (await this.client.waitForExist(this.elements.activateBtn)) {
      await this.client.click(this.elements.activateBtn)
      await this.client.waitForExist(this.elements.deActivateBtn)
    }
  }

  async deactivateDevice() {
    if (await this.client.waitForExist(this.elements.deActivateBtn)) {
      await this.client.click(this.elements.deActivateBtn)
      await this.client.waitForExist(this.elements.activateBtn)
    }
  }
}
