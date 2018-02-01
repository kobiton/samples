import {assert} from 'chai'
import config from '../../../framework/config/test'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import OrganizationPage from '../../../framework/page-objects/portal/user/settings/organization'
import {generateRandomText, generateTestEmail} from '../../../framework/util'

const {username1: username, password1: password, emailUser1: email} = {...config}
let loginPage
let organizationPage
let notificationMessage
let organizationDescription
let organizationName
let randomText

describe('Organization', () => {

  before(async () => {
    loginPage = new LoginPage()
    loginPage.open()
    loginPage.login(username, password)
    organizationPage = new OrganizationPage()
  })

  beforeEach(async () => {
    organizationPage.open()
  })

  describe('name length should in range from 5 to 80 characters: ', async () => {

    it('should not allow organization name length smaller than 5', () => {
      randomText = generateRandomText(3)
      organizationPage.setOrgName(randomText)
      organizationName = organizationPage.getOrgName()
      assert.notEqual(randomText, organizationName, 'must greater than 5 characters')
    })

    it('should not allow organization name length greater than 80', () => {
      randomText = generateRandomText(81)
      organizationPage.setOrgName(randomText)
      organizationName = organizationPage.getOrgName()
      assert.notEqual(randomText, organizationName, 'must be less than 81 characters')
    })

    it('should allow organization name length from 5 to 80 characters', () => {
      randomText = generateRandomText(8)
      organizationPage.setOrgName(randomText)
      organizationName = organizationPage.getOrgName()
      assert.equal(randomText, organizationName, 'organization name should be changed')
    })

  })

  describe('description', async () => {

    it('should be optional', () => {
      organizationPage.setOrgDescription('')
      organizationDescription = organizationPage.getOrgDescription()
      assert.equal('Edit description', organizationDescription, 'failed to clear description')
    })

    it('should limit up to 500 characters', () => {
      randomText = generateRandomText(501)
      organizationPage.setOrgDescription(randomText)
      organizationDescription = organizationPage.getOrgDescription()
      assert.notEqual(randomText, organizationDescription, 'must be less than 501 characters')
    })

  })

  describe('invitation email ', async () => {

    it('should limit up to 254 characters', () => {
      randomText = generateRandomText(255) + '@abc.com'
      organizationPage.addInvitationEmail(randomText)
      notificationMessage = organizationPage.isAddEmailInvitationMessageExisting()
      assert.isFalse(notificationMessage, 'invitation email must be less than 255 characters')
    })

  })

  describe('search member ', async () => {

    it('should be able to search member by fullname', () => {
      const memberName = organizationPage.getMemberList()[0].name
      const memberFound = organizationPage.searchMember(memberName)
      assert.isTrue(memberFound, 'cannot search member by full name')
    })

    it('should be able to search member by email', () => {
      const memberEmail = organizationPage.getMemberEmail()
      const memberFound = organizationPage.searchMember(memberEmail)
      assert.isTrue(memberFound, 'cannot search member by email')
    })

  })

  describe('admin ', async () => {

    it('should have admin role', () => {
      const adminEmail = email
      const role = organizationPage.getRole(adminEmail)
      assert.equal('ADMIN', role, 'not admin user')
    })

    it('should be able to invite member to current organization', () => {
      const memberEmail = generateTestEmail()
      organizationPage.addMember(memberEmail)
      const exist = organizationPage.ifMemberExist(memberEmail)
      assert.isTrue(exist, 'failed to invite member to current organization')
    })

    it('newly added member shoud be member role by default', () => {
      const memberEmail = generateTestEmail()
      organizationPage.addMember(memberEmail)
      const role = organizationPage.getRole(memberEmail)
      assert.equal('MEMBER', role, 'not member role by default')
    })

    it('should be able change member role in Org', () => {
      const memberEmail = organizationPage.getMemberEmail()
      organizationPage.changeMemberRole(memberEmail, 'ADMIN')
      const newRole = organizationPage.getRole(memberEmail)
      assert.equal('ADMIN', newRole, 'member should have admin role')
    })

    it('should be able remove member in Org', () => {
      const memberEmail = organizationPage.getMemberEmail()
      organizationPage.removeMember(memberEmail, true)
      const memberExist = organizationPage.ifMemberExist(memberEmail)
      assert.isTrue(memberExist, 'member should be removed')
    })

    it('confirm dialog should appear when deleting member from Org', () => {
      const memberEmail = organizationPage.getMemberEmail()
      const ifExist = organizationPage.doesConfirmDialogExist(memberEmail)
      assert.isTrue(ifExist, 'confirm dialog should appear')
    })

    it('should be able to change itself to member', () => {
      organizationPage.changeMemberRole(email, 'MEMBER')
      const newRole = organizationPage.getRole(email)
      assert.equal('MEMBER', newRole, 'should be member role')
    })

  })
})
