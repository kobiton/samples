import Page from './page'
import SessionsPage from './sessions'
import {debug} from '@kobiton/core-util'

const defaultElements = {
  usernameLbl: 'form > div > div:nth-child(1) > div:nth-child(1) > div > label',
  usernameTxt: 'input[name="emailOrUsername"]',
  passwordLbl: 'form > div > div:nth-child(1) > div:nth-child(2) > div > label',
  passwordTxt: 'input[name="password"]',
  loginBtn: '#app form button',
  rememberMeLbl: 'form > div > div:nth-child(2) > div > span',
  rememberMeChk: 'input[name="remember"]',
  messageFailedLbl: '#app div:nth-child(1) > form > span',
  forgotPasswordLnk: 'div=Forgot password?',
  registerNowLnk: 'div=Register now',
  logoImgHeader: '#app > div > div > div > div > div > div > div:nth-child(1) > div > img',
  sessionsLnk: "//a[@href='/me/sessions']",
  form: '#app form'
}

export default class LoginPage extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  login({username, password}) {
    debug.log('login', `${username} and ${password}`)
    browser.waitForExist(this.elements.usernameTxt)
    browser.clearElement(this.elements.usernameTxt)
    browser.setValue(this.elements.usernameTxt, username)
    browser.clearElement(this.elements.passwordTxt)
    browser.setValue(this.elements.passwordTxt, password)
    //This click to activate the login button because there is an exsiting issue
    //when fill in enough information for username and password then button login don't enable
    browser.click(this.elements.usernameTxt)
    browser.waitForEnabled(this.elements.loginBtn)
    //phantom js can't click on the loginbtn so i use this way to submit form
    browser.submitForm(this.elements.form)

    browser.waitForExist(this.elements.loadingRunning)
    browser.waitForExist(this.elements.loadingHidden)
    
    const isSuccessful = browser.getUrl().indexOf('sessions') >= 0
    if (isSuccessful) {
      return new SessionsPage()
    }
    debug.log('The session link not exist')
    return this
  }

  open(option) {
    debug.log('viewports', `Simulate ${JSON.stringify(option)}`)
    super.open('login', option)
    browser.waitForExist(this.elements.loadingHidden)
  }

}
