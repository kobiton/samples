import {assert} from 'chai'
import config from '../../../framework/config/test'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import OrganizationPage from '../../../framework/page-objects/portal/user/settings/organization'

const {username1: username, password1: password, emailUser1: email} = {...config}
let loginPage
let organizationPage
let memberEmail

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

  describe('creator can change role for members', () => {

    it('change member to admin role', () => {
      memberEmail = organizationPage.getMemberEmail()
      organizationPage.changeMemberRole(memberEmail, 'ADMIN')
      const newRole = organizationPage.getRole(memberEmail)
      assert.equal('ADMIN', newRole, 'should have admin role')
    })

    it('change admin to member role', () => {
      organizationPage.changeMemberRole(memberEmail, 'MEMBER')
      const newRole = organizationPage.getRole(memberEmail)
      assert.equal('MEMBER', newRole, 'should have member role')
    })

    it('cannot remove/change role itself', () => {
      assert.isFalse(organizationPage.doesContextMenuExist(email), 'context menu should not appear')
    })

  })
})
