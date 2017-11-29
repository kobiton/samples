import Page from '../base'
import BPromise from 'bluebird'

const defaultElements = {
  logoImage: '//img[contains(@src,"svg")]',
  usernameTextInput: '//input[@name="emailOrUsername"]',
  passwordTextInput: '//input[@name="password"]',
  loginButton: '//button',
  forgotPasswordLink: '//*[contains(text(),"Forgot password?")]',
  profileButton: '(//button)[3]',
  invaliInfoLabel: '//*[contains(text(),"Invalid")]',
  invalidFormatLabel: '//*[contains(text(),"invalid")]'
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
  async isLoggedIn() {
    return !(await this.client.isExisting(this.elements.usernameTextInput))
  }

  async login(username, password) {
    await BPromise.delay(10000)
    await this.client
      .setValue(this.elements.usernameTextInput, username)
      .setValue(this.elements.passwordTextInput, password)
      .click(this.elements.loginButton)
  }

}
