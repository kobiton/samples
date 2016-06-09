import Page from './page'

const defaultElements = {
  emailOrUsernameTxt: 'form input[name="emailOrUsername"]',
  resetPasswordBtnDisabled: '#app form button[disabled]',
  resetPasswordBtn: '#app form button',
  loginLnk: 'div=Login',
  registerLnk: 'div=Register',
  messageFailedLbl: 'form div > span',
  messageSuccessLbl: 'form > div:nth-child(2) > div > div',
  form: '#app form',
  formContent: 'form > div:nth-child(2)'
}

export default class ForgotPasswordPage extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open() {
    super.open('forgot')
  }

  forgotPassword(emailOrUsername) {
    this.emailOrUsernameTxt.clearElement()
    this.emailOrUsernameTxt.setValue(emailOrUsername)
    //This click to activate the login button because there is an exsiting issue
    //when fill in enough information for username and password then button login don't enable
    this.formContent.click()
    this.resetPasswordBtn.waitForEnabled()
    //phantom js can't click on the forgotpasswordBtn so i use this way to submit form
    this.form.submitForm()
    this.loadingHidden.isExisting()
  }
}
