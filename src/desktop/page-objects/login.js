import Page from './page'
import DevicesPage from './devices'
import {debug} from '@kobiton/core-util'

const defaultElements = {
  usernameTxt: '#app form input[name="emailOrUsername"]',
  passwordTxt: '#app form input[name="password"]',
  loginBtn: '#app form button',
  profileBtn: '//*[@id="app"]/div/div[1]/div/div[2]/div[1]/div[2]/div/div[2]/button'
}

export default class LoginPage extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  /**
   * This function return true/fasle to let user know the current
   * page logged in or not
   */
  async checkLoginStatus() {
    try {
      await this.client.waitForExist(this.elements.spinner)
      await this.client.waitForExist(this.elements.profileBtn)
      return true
    }
    catch (err) {
      return false
    }
  }

  async login(username, password) {
    const check = await this.checkLoginStatus()
    debug.log('checkLoginStatus:', check)
    if (check === false) {
      await this.client
        .waitForExist(this.elements.usernameTxt)
        .clearElement(this.elements.usernameTxt)
        .setValue(this.elements.usernameTxt, username)
        .setValue(this.elements.passwordTxt, password)
        .click(this.elements.loginBtn)
        .click(this.elements.loginBtn)
    }
    return new DevicesPage()
  }
}
