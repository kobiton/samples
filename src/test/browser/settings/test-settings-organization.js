import {assert} from 'chai'
import config from '../../../framework/config/test'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import OrganizationPage from '../../../framework/page-objects/portal/user/settings/organization'
import {filterJson} from '../../../framework/util'
import OrganizationAPI from '../../../framework/api/organization'
import faker from 'faker'

const {username1: username, password1: password} = {...config}
let loginPage
let organizationPage
let hasOrg
const newOrgDescription = faker.random.words(10)
const newOrgName = faker.random.words(2)
const emails = [`${faker.internet.email()}`, `${faker.internet.email()}`]
const filterString = emails[0]
let acceptedMembers

describe('Settings / Organization', () => {
  before(async () => {
    loginPage = new LoginPage()
    loginPage.open()
    loginPage.login(username, password)
    organizationPage = new OrganizationPage()
    hasOrg = organizationPage.hasOrganization()
    acceptedMembers = await OrganizationAPI.getAcceptedMembers()
  })

  beforeEach(async function () {
    organizationPage.open()
  })

  it('should cancel during organization creation successfully', function () {
    if (!hasOrg) {
      organizationPage.createOrganization(newOrgName, newOrgDescription, false)
      const hasOrg = organizationPage.hasOrganization()
      assert.isFalse(hasOrg, 'Expected the user has no organization, but it has')
    }
    else {
      this.skip()
    }
  })

  it('should create an organization successfully', function () {
    if (!hasOrg) {
      organizationPage.createOrganization(newOrgName, newOrgDescription)
      hasOrg = organizationPage.hasOrganization()
      assert.isTrue(hasOrg,
        'Expected the user has created an organization, but it has not')
    }
    else {
      this.skip()
    }
  })

  it('should edit organization description successfully', () => {
    organizationPage.setOrgDescription(newOrgDescription)
    const notification = organizationPage.isNotificationMessageExisting()
    const description = organizationPage.getOrgDescription()
    assert.isTrue(notification, 'Notification is not displayed as expected')
    assert.equal(description, newOrgDescription, 'Org description is not set correctly')
  })

  it('should edit organization name successfully', () => {
    organizationPage.setOrgName(newOrgName)
    const notification = organizationPage.isNotificationMessageExisting()
    const orgName = organizationPage.getOrgName()
    assert.isTrue(notification, 'Notification is not displayed as expected')
    assert.equal(orgName, newOrgName, 'Org Namwe is not set correctly')
  })
  
  it('should add members into the organization successfully', () => {
    const members = organizationPage.getMemberList().length
    organizationPage.addMembers(emails)
    const currentMembers = organizationPage.getMemberList().length
    const expectedMembers = members + emails.length
    assert.equal(currentMembers, expectedMembers, 'Number of members do not match')
  })

  it('should list out members of the organization successfully', () => {
    const countFromLabel = organizationPage.getTotalMembersLabel()
                                           .replace(' member', '').replace('s', '')
    const countFromMemberList = organizationPage.getMemberList().length
    assert.equal(countFromLabel, countFromMemberList, 'Number of members do not match')
  })

  it('should display org members correctly after filtering members', async () => {
    organizationPage.filterMember(filterString)
    const membersFromUI = organizationPage.getMemberList()
    const membersFromAPI = await OrganizationAPI.getMembers()
    const resultByAPI = filterJson(membersFromAPI, {invitedEmail: filterString})
    const result = isEqual(membersFromUI, resultByAPI)
    assert.isTrue(result, 'Members are not displayed correctly')
  })

  it('should remove members from the organization successfully', () => {
    const members = organizationPage.getMemberList().length
    organizationPage.removeMembers(emails)
    const currentMembers = organizationPage.getMemberList().length
    const expectedMembers = members - emails.length
    assert.equal(currentMembers, expectedMembers, 'Number is not removed correctly')
  })

  it('should display org members correctly', async () => {
    const membersFromUI = organizationPage.getMemberList()
    const membersFromAPI = await OrganizationAPI.getMembers()
    const result = isEqual(membersFromUI, membersFromAPI)
    assert.isTrue(result, 'Members are not displayed as expected')
  })

  it('should change role for a member correctly', function () {
    const memberUsers = filterJson(acceptedMembers, {role: 'MEMBER'})
    if (memberUsers.length > 0) {
      const emailToChangeRole = memberUsers[0].email
      organizationPage.changeMemberRole(emailToChangeRole, 'Admin')
      const role = organizationPage.getRole(emailToChangeRole)
      assert.equal(role, 'Admin', 'Member role is not changed correctly')
    }
    else {
      this.skip()
    }
  })

})

/**
 * Check 2 member lists if they are equal
 * @param: memberList - List of member info
 * @param: memberListData: List of member info
 * Return true if they have the same length and emails, otherwise false
 */
function isEqual(memberList, memberListData) {
  if (memberList.length === memberListData.length) {
    return !memberList.find(({email}) => {
      let emailInFirstList = email
      let notInclude = !memberListData.find(({email, invitedEmail}) => (
        emailInFirstList === email || emailInFirstList === invitedEmail
      ))
      return notInclude
    })
  }
  else {
    return false
  }
}
