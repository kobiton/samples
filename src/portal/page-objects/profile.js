import Page from './page'

const defaultElements = {
  emailTxt: 'input[name="email"]',
  fullNameTxt: 'input[name="name"]',
  currentPassTxt: 'input[name="password"]',
  newPassTxt: 'input[name="newPassword"]',
  confirmPassTxt: 'input[name="passwordConfirmation"]',
  updateBtn: '#app form button',
  notificationLbl: 'div:nth-child(2) > span > div > div > div:nth-child(2) > span',
  form: '#app form',
  fomrContent: 'form > div:nth-child(8)'
}

export default class MyDevicesPage extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open() {
    super.open('me/profile')
  }

  updateProfile({email, fullname, currentPassword, newPassword, confirmPassword}) {
    this.emailTxt.setValue(email)
    this.fullNameTxt.setValue(fullname)
    this.currentPassTxt.setValue(currentPassword)
    this.newPassTxt.setValue(newPassword)
    this.confirmPassTxt.setValue(confirmPassword)
    //This click to activate the login button because there is an exsiting issue
    //when fill in enough information for username and password then button login don't enable
    this.fomrContent.click()
    this.updateBtn.waitForEnabled()
    //phantom js can't click on the updateBtn so i use this way to submit form
    this.form.submitForm()
    this.loadingHidden.isExisting()
  }

  updateInvalidEmail({email}) {
    this.emailTxt.setValue(email)
    this.updateBtn.waitForEnabled()
    this.updateBtn.click()
    this.loadingHidden.isExisting()
  }

  updateInvalidPass({currentPass, newPass, confirmPass}) {
    this.currentPassTxt.setValue(currentPass)
    this.newPassTxt.setValue(newPass)
    this.confirmPassTxt.setValue(confirmPass)
    //This click to activate the login button because there is an exsiting issue
    //when fill in enough information for username and password then button login don't enable
    this.fomrContent.click()
    this.updateBtn.waitForEnabled()
    //phantom js can't click on the updateBtn so i use this way to submit form
    this.form.submitForm()
    this.loadingHidden.isExisting()
  }
}
