import Page from './page'
import SelectProfilePage from './select-profile'

const defaultElements = {
  fullNameTxt: 'input[name="name"]',
  userNameTxt: 'input[name="username"]',
  emailTxt: 'input[name="email"]',
  passwordTxt: 'input[name="password"]',
  agreeWithTermsCheck: '#app form input[type="checkbox"]',
  registerBtnDisabled: '#app form button[disabled]',
  registerBtn: '#app form button',
  agreewithTermsLbl: '#app a > span',
  alreadyHaveAccountLnk: '#app > div > div > div > div > div > div > div:nth-child(2) > div',
  failedMsgLbl: 'form > span',
  form: '#app form',
  formContent: 'form > div > div:nth-child(2) > div:nth-child(2)'
}

export default class RegisterPage extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open() {
    super.open('register')
  }

  registerAccount({fullname, username, email, password}) {
    this.fullNameTxt.setValue(fullname)
    this.userNameTxt.setValue(username)
    this.emailTxt.setValue(email)
    this.passwordTxt.setValue(password)
    //This click to activate the login button because there is an exsiting issue
    //when fill in enough information for username and password then button login don't enable
    this.formContent.click()
    this.registerBtn.waitForEnabled()
    //phantom js can't click on the register button so i use this way to submit form
    this.form.submitForm()
    this.loadingHidden.isExisting()
    return new SelectProfilePage()
  }
}
