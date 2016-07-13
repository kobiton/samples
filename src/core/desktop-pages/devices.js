import AuthenticatedPage from './authenticated'
import SettingPage from './setting'
import {debug} from '@kobiton/core-util'
import BPromise from 'bluebird'

const defaultElements = {
  nameLabel: '#app > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(1)', //eslint-disable-line max-len
  deviceButton: '(//button)[1]',
  settingButton: '(//button)[2]',
  profileButton: '(//button)[3]',
  logoutButton: '//span[contains(.,"Logout")]',
  emailText: '/html/body/div[2]/div/div/div/div/div/div[1]/span',
  topActivateButton: '(//span[text()="ACTIVATE"]/../../../../button)[1]',
  topDeactivateButton: '(//span[text()="DEACTIVATE"]/../../../../button)[1]',
  todayLabel: '(//div[contains(.,"Today")])[13]',
  thisWeekLabel: '(//div[contains(.,"This Week")])[13]',
  initializingStatusLabel: '(//div[contains(.,"Initializing")])[last()]'
}

export default class DevicesPage extends AuthenticatedPage {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  async openSetting() {
    await this.client.waitForExist(this.elements.settingButton)
    await this.client.click(this.elements.settingButton)
    return new SettingPage()
  }

  async activateFirstFoundDevice() {
    try {
      const buttonFound = await this.hasTopActivateButton()
      if (buttonFound) {
        await this.client.click(this.elements.topActivateButton)
        await this.client.waitForExist(this.elements.topDeactivateButton)
      }
      return buttonFound
    }
    catch (err) {
      debug.error('devices:activateFirstFoundDevice ', err)
      return false
    }
  }

  async activateAllDevices() {
    let result = true
    do {
      result = await this.activateFirstFoundDevice() // eslint-disable-line babel/no-await-in-loop
    }
    while (result)
    // wait for this device already available on api
    await BPromise.delay(10000)
  }

  async deactivateFirstFoundDevice() {
    try {
      const buttonFound = await this.hasTopDeactivateButton()
      if (buttonFound) {
        await this.client.click(this.elements.topDeactivateButton)
        await this.client.waitForExist(this.elements.topActivateButton)
      }
      return buttonFound
    }
    catch (err) {
      debug.error('devices:deactivateFirstFoundDevice ', err)
      return false
    }
  }

  async deactivateAllDevices() {
    let result = true
    do {
      result = await this.deactivateFirstFoundDevice() // eslint-disable-line babel/no-await-in-loop
    }
    while (result)
  }

  async hasTopDeactivateButton() {
    const foundDeactivateButton = await this.client.isVisible(this.elements.topDeactivateButton)
    return foundDeactivateButton
  }

  async hasTopActivateButton() {
    const foundActivateButton = await this.client.isVisible(this.elements.topActivateButton)
    return foundActivateButton
  }

  /**
   * After login successfully. the desktop app will initilize all connected devices.
   * This function is to wait for the intialize process done
   */
  async waitForAllDevicesInitializingDone() {
    try {
      debug.log('devices:waitForAllDevicesInitializingDone', 'start')
      await this.client.waitForExist(this.elements.initializingStatusLabel)
      await this.client.waitForExist(this.elements.topActivateButton)
    }
    catch (err) {
      debug.error('devices:waitForAllDevicesInitializingDone ', err)
    }
  }

  async getListActivatedDevices() {
    const activatedDevices = []
    let foundNextActivatedDevice = true
    let i = 1
    do {
      const activatedSelector = `(//span[text()="DEACTIVATE"])[${i}]/../../../../../../../../..`
      const deviceNameSelector = `${activatedSelector}/div[1]/div/div[1]/div[2]/div[1]`
      const platformVersionselector = `${activatedSelector}/div[1]/div/div[1]/div[2]/div[2]`
      foundNextActivatedDevice =
        await this.client.isVisible(activatedSelector) // eslint-disable-line babel/no-await-in-loop
      if (foundNextActivatedDevice) {
        const deviceName = await this.client.getText(deviceNameSelector) // eslint-disable-line babel/no-await-in-loop, max-len
        const platformVersion = await this.client.getText(platformVersionselector) // eslint-disable-line babel/no-await-in-loop, max-len
        activatedDevices.push({
          deviceName,
          platformVersion
        })
      }
      i++
    } while (foundNextActivatedDevice)
    return activatedDevices
  }
}
