import Page from '../base'

const defaultElements = {
  devicesButton: '(//button)[1]',
  androidButton: '(//button)[2]',
  iOSButton: '(//button)[3]',
  userFullNameLabel: '(//button)[4]/ancestor::div[2]/div[1]',
  orgNameLabel: '(//button)[4]/ancestor::div[2]/div[1]/div',
  dropDownButton: '(//button)[4]',
  userEmail: '(//body/div[2]//span/parent::div)[1]',
  LogoutButton: '(//body/div[2]//span/parent::div)[2]'
}

export default class MenuBar extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  async openDevicesPage() {
    await this.client.click(this.elements.devicesButton)
  }

  async openAndroidConfiguration() {
    await this.client.click(this.elements.androidButton)
  }

  async openIOSConfiguration() {
    await this.client.click(this.elements.iOSButton)
  }

}
