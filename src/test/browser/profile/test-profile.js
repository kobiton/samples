import {assert} from 'chai'
import config from '../../../framework/config/test'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import AccountPage from '../../../framework/page-objects/portal/user/profile/account'
import faker from 'faker'
import SessionsPage from '../../../framework/page-objects/portal/user/sessions'

const {username1: username, password1: password, emailUser1: email} = {...config}
let loginPage
let accountPage
let passwordInput
let sessionsPage
let newPassword
const startDate = new Date(`1/1/${new Date().getFullYear()}`)
const endDate = new Date()

describe('settings/ account', () => {
  before(() => {
    loginPage = new LoginPage()
    loginPage.open()
    loginPage.login(username, password)
    accountPage = new AccountPage()
    sessionsPage = new SessionsPage()
    accountPage.open()
  })

  describe('Verifying updating password', () => {
    describe('Validating input fields', () => {
      it('password should not be < 5 characters', () => {
        passwordInput = faker.internet.password(2)
        accountPage.setTextIntoChangePasswordForm(passwordInput, passwordInput)
        assert.isTrue(accountPage.isExistingErrorMsgCurrentPassword(),
         'The expected currentpassword field can\'t be < 5 characters.')
        assert.isTrue(accountPage.isExistingErrorMsgNewPassword(),
         'The expected newPassword field can\'t be < 5 characters.')
      })

      it('password should not be > 32 characters', () => {
        passwordInput = faker.internet.password(33)
        accountPage.setTextIntoChangePasswordForm(passwordInput, passwordInput)
        assert.isTrue(accountPage.isExistingErrorMsgCurrentPassword(),
          'The expected currentPassword field can\'t be > 32 characters.')
        assert.isTrue(accountPage.isExistingErrorMsgNewPassword(),
          'The expected newPassword field can\'t be > 32 characters.')
      })

      it('password can be = 5 characters', () => {
        passwordInput = faker.internet.password(5)
        accountPage.setTextIntoChangePasswordForm(passwordInput, passwordInput)
        assert.isFalse(accountPage.isExistingErrorMsgCurrentPassword(),
          'The expected newPassword field can be = 5 characters.')
        assert.isFalse(accountPage.isExistingErrorMsgNewPassword(),
          'The expected newPassword field can be = 5 characters.')
      })

      it('password can be = 32 characters', () => {
        passwordInput = faker.internet.password(32)
        accountPage.setTextIntoChangePasswordForm(passwordInput, passwordInput)
        assert.isFalse(accountPage.isExistingErrorMsgCurrentPassword(),
          'The expected currentPassword field can be = 32 characters.')
        assert.isFalse(accountPage.isExistingErrorMsgNewPassword(),
          'The expected newPassword field can be = 32 characters.')
      })

      it('password must be between 5 and 32 characters', () => {
        passwordInput = faker.internet.password(6)
        accountPage.setTextIntoChangePasswordForm(passwordInput, passwordInput)
        assert.isFalse(accountPage.isExistingErrorMsgCurrentPassword(),
          'The expected currentPassword field must be between 5 and 32 characters.')
        // Verify new password must contain at least:
        // 1 lowercase letter (a-z), 1 uppercase letter (A-Z) and 1 digit (0-9)
        assert.isTrue(accountPage.isExistingErrorMsgNewPassword(),
          'The expected newPassword field must be between 5 and 32 characters.')
      })

      it('newPasswordInput and confNewPasswordInput must be the same', () => {
        passwordInput = faker.internet.password(10)
        accountPage.setTextIntoNewPasswordField(passwordInput)
        passwordInput = faker.internet.password(15)
        accountPage.setTextIntoConfirmPasswordField(passwordInput)
        assert.isTrue(accountPage.isExistingErrorMsgConfirmPassword(),
          'The expected newPassword field and confNewPassword field must be the same.')
      })
    })

    describe('Verifying after clicking "Update Password" button', () => {
      it('should be updated successfully with valid info', () => {
        // Update password
        newPassword = faker.internet.password(6)
        accountPage.updatePassword(password, newPassword, newPassword)
        // Verify notification after updating password successfully
        assert.isTrue(accountPage.isExistingSuccessfulPasswordUpdateMessage(),
          'Account page shows notification after user updates successfully password')
        // Login with new password
        accountPage.logoutAccount()
        loginPage.open()
        loginPage.login(username, newPassword)
        const urlPage = loginPage.getUrlPage()
        assert.equal(urlPage, config.portalUrl.concat('/devices'),
          'The expected url is devices page.')
        // Update password to original state
        accountPage.open()
        accountPage.pause(4000)
        accountPage.updatePassword(newPassword, password, password)
      })

      it(`should show error message when user updates password
        with incorrect current password`, () => {
        const wrongCurrentPassword = `${faker.internet.password(2)}${password}`
        passwordInput = `${faker.internet.password(7)}`
        accountPage.updatePassword(wrongCurrentPassword, passwordInput, passwordInput)
        assert.isTrue(accountPage.isExistingErrorMsgWrongCurrentPassword(),
        `Account page shows error message when
          user updates password with incorrect current password.`
        )
      })
    })
  })

  describe('Verifying updating profile', () => {
    it('account page must be disable "Update profile" button as default', () => {
      assert.isFalse(accountPage.isEnabledUpdateProfileButton(),
        'Account page must be disabled "Update profile" button as default.')
    })

    it('account page must be enable "Update profile" button if any changes', () => {
      accountPage.setTextIntoLastNameField(faker.internet.userName(6))
      assert.isTrue(accountPage.isEnabledUpdateProfileButton(),
        'Account page must be enabled "Update profile" button if any changes.')
    })

    it('shouldn\'t be empty for fullname', () => {
      accountPage.clearDataOnFirstNameField()
      assert.isFalse(accountPage.isEnabledUpdateProfileButton(),
        'The expected "Update profile" button is disabled.')
      accountPage.clearDataOnLastNameField()
      assert.isFalse(accountPage.isEnabledUpdateProfileButton(),
        'The expected "Update profile" button is disabled.')
    })

    it('should not allow to update username', () => {
      assert.isFalse(accountPage.isVisibleUserNameField(),
        'The username field can\'t allow to update.')
    })

    it('should display profile correctly', () => {
      assert.equal(accountPage.getProfile().Email, email, 'The expected email displays correctly.')
      assert.equal(accountPage.getProfile().UserName, username, `The expected
        username displays correctly.`)
    })

    it('should show notification after updating successfully username', () => {
      accountPage.updateFirstNameLastName(faker.name.firstName(), faker.name.lastName())
      assert.isTrue(accountPage.isExistingSuccessfulProfileUpdateMessage(),
        'Account page shows notify after updating profile successfully')
    })
  })

  describe('Verifying setting timeZone', () => {
    it('should show Timezone dropdown', () => {
      assert.isTrue(accountPage.isExistingTimeZoneDropbox(),
        'The expected selectTimeZoneDropbox is existting')
      accountPage.clickTimezoneDropbox()
      accountPage.pause(1000)
      assert.isTrue(accountPage.isExistingDefaultValueTimezone())
    })

    it('should allow users to select Timezone on Profile Settings', () => {
      const index = Math.floor(Math.random() * (249 - 2)) + 2
      accountPage.clickTimezoneDropbox()
      accountPage.pause(1000)
      accountPage.clickOptionTimezone(index)
      accountPage.pause(1000)
      const elementOptionTimezoneChecked = accountPage.getElementOptionTimezone(index)
      const valueTimezoneChecked = accountPage._browser.getValue(elementOptionTimezoneChecked)
      const valueTimezone = accountPage.getValueTimezone()
      assert.equal(valueTimezone, valueTimezoneChecked,
        'The displayed option is the same with the chosen option.')
    })

    it('should save timezone settings successfully', () => {
      const index = Math.floor(Math.random() * (249 - 2)) + 2
      accountPage.updateTimezone(index)
      accountPage.pause(1000)
      assert.isTrue(accountPage.isExistingSuccessfulTimezoneSetMessage(),
        'The expected accountPage shows notification when user updates settings successfully')
    })

    it(`should update datetime of list sessions in session page
      after updating Timezone in account page`, async () => {
      // Getting datetime on Session page before updating Timezone
      sessionsPage.open()
      sessionsPage.selectStartAndEndDates(startDate, endDate)
      accountPage.pause(3000)
      const getTimeBefore = sessionsPage.getTimeOfFirstSession()
      // Updating timezone on account page
      accountPage.open()
      const index = Math.floor(Math.random() * (249 - 2)) + 2
      accountPage.updateTimezone(index)
      // Getting datetime on Session page after updating Timezone
      sessionsPage.open()
      sessionsPage.selectStartAndEndDates(startDate, endDate)
      accountPage.pause(3000)
      const getTimeAfter = sessionsPage.getTimeOfFirstSession()
      assert.notEqual(getTimeBefore, getTimeAfter,
        `Datetime of session before updating timezone is not equal
        datetime of session after updating timezone.`)
    })

    it(`should update datetime of session detail in session detail page
      after updating Timezone in account page`, async () => {
      // Getting start/end time on Session page before updating timezone
      sessionsPage.open()
      sessionsPage.selectStartAndEndDates(startDate, endDate)
      accountPage.pause(3000)
      let sessionDetail = sessionsPage.getFirstSessionDetail()
      const endTimeBefore = sessionDetail.EndTime
      const startTimeBefore = sessionDetail.StartTime
      // Updating timezone on Account page
      accountPage.open()
      const index = Math.floor(Math.random() * (249 - 2)) + 2
      accountPage.updateTimezone(index)
      // Getting start/end time on Session page after updating timezone
      sessionsPage.open()
      sessionsPage.selectStartAndEndDates(startDate, endDate)
      accountPage.pause(3000)
      sessionDetail = sessionsPage.getFirstSessionDetail()
      const startTimeAfter = sessionDetail.StartTime
      const endTimeAfter = sessionDetail.EndTime

      assert.notEqual(startTimeBefore, startTimeAfter,
        'startTimeBefore field and startTimeAfter field are not the same.')
      assert.notEqual(endTimeBefore, endTimeAfter,
        'endTimeBefore field and endTimeAfter field are not the same.'
      )
    })
  })
})
