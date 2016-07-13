import Page from './page'
import DevicesPage from './devices'
import {debug} from '@kobiton/core-util'

const defaultElements = {
  logoImage: '//img[contains(@src,"svg")]',
  usernameTextInput: '#app form input[name="emailOrUsername"]',
  passwordTextInput: '#app form input[name="password"]',
  loginButton: '#app form button',
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
    const loggedIn = !(await this.client.isExisting(this.elements.usernameTextInput))
    debug.log('login:isLoggedIn ', loggedIn)
    return loggedIn
  }

  async login({username, password}) {
    const isAtLoginPage = await this._isAtLoginPage()
    debug.log('login:isAtLoginPage ', isAtLoginPage)
    // We're in either Login or Device screen
    if (isAtLoginPage) {
      await this.client
      .clearElement(this.elements.usernameTextInput)
      .setValue(this.elements.usernameTextInput, username)
      .setValue(this.elements.passwordTextInput, password)
      // click login button twice because of the known issue:
      // https://trello.com/c/ZeL2ilpT/816-portal-chrome-firefox-login-could-not-click-on-login-button-after-input-username-and-password
      // TODO: remove below line when the trello card above is fixed
      .click(this.elements.loginButton)
      .click(this.elements.loginButton)
    }
    return new DevicesPage()
  }

  async _isAtLoginPage() {
    let isLoginPage = true
    try {
      await this.client.waitForExist(this.elements.usernameTextInput)
    }
    catch (err) {
      isLoginPage = false
    }
    return isLoginPage
  }
}
