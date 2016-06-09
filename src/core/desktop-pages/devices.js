import AuthenticatedPage from './authenticated'
import BPromise from 'bluebird'

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

  async getDeviceInfor(rowSelector) {
    const deviceInfor = {}
    const deviceNameLbl = rowSelector + '/div/div/div/div/div/div[1]/div[2]/div[1]'
    const deviceStatusBtn = rowSelector + '/descendant::button'
    const deviceStatusLbl = rowSelector + '/descendant::button/div/div/span'

    if (await this.client.isExisting(rowSelector)) {
      const text = String(await this.client.getText(deviceNameLbl))//eslint-disable-line
      deviceInfor.name = text
    }
    if (await this.client.isExisting(deviceStatusBtn)) {
      deviceInfor.status = this.client.getText(deviceStatusLbl)
    }
    return deviceInfor
  }

  async getListDevices() {
    const tasks = []
    for (let i = 1; i < 10; i++) {
      const selector = `//*[@id="app"]/descendant::div/div[2]/div[2]/div/div[2]/div[${i}]`
      tasks.push(this.getDeviceInfor(selector))
    }
    const results = await BPromise.all(tasks)
    return results
  }
}
