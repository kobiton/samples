import {assert} from 'chai'
import api from '../../../framework/api'
import config from '../../../framework/config/test'
import apiData from './_data'
import faker from 'faker'

//DATA PREPARATION
const {username1: username, password1: password, emailUser1: email} = {...config}
let token
let validEmail
let invalidEmails

let orgId
let ownerId

let listAcceptedMembers
let listPendingMembers
let listMembers
let listAdmins
let listDeactivateMembers

describe('API / Org Management', () => {

  before(async () => {
    token = await api.Organization.getBearerToken(username, password)
    validEmail = faker.internet.email(username)
    invalidEmails = apiData.generateInvalidEmails()
    
    const [accountInfo] = await api.Organization.getAccount(token)
    orgId = accountInfo['id']
    ownerId = accountInfo['createdBy']

    listAcceptedMembers = await api.Organization.filterMembers(
      accountInfo.members, {invitationStatus: 'ACCEPTED'})

    listPendingMembers = await api.Organization.filterMembers(
      accountInfo.members, {invitationStatus: 'PENDING'})

    listMembers = await api.Organization.filterMembers(
      accountInfo.members,
      {
        invitationStatus: 'ACCEPTED',
        role: 'MEMBER',
        isDeactivated: false
      })

    listAdmins = await api.Organization.filterMembers(
      accountInfo.members,
      {
        invitationStatus: 'ACCEPTED',
        role: 'ADMIN'
      })

    listDeactivateMembers = await api.Organization.filterMembers(
      accountInfo.members,
      {
        invitationStatus: 'ACCEPTED',
        role: 'MEMBER',
        isDeactivated: true
      })
  })

  it('should add members into organization successfully', async () => {
    const [resBody, response] = await api.Organization.addMemberIntoOrg(token, orgId, validEmail)
    
    assert.equal(response.statusCode, 200, 'Incorrect status code returned')
    assert.equal(resBody.successes, validEmail, 'Add member(s) unsuccessfully')
  })

  it('should not add current email into organization', async () => {
    const currentErrorMessage = 'You can\'t invite yourself'
    const [resBody, response] = await api.Organization.addMemberIntoOrg(token, orgId, email)
    
    assert.equal(response.statusCode, 200, 'Incorrect status code returned')
    assert.equal(resBody.errors[email], currentErrorMessage, 'Incorrect error message')
  })

  it('should not add existing email into organization', async () => {
    const existingEmail =
      listAcceptedMembers[Math.floor(Math.random() * (listAcceptedMembers.length - 1)) + 1].email
    
    const existingErrorMessage = 'Existing account can\'t join this organization'
    const [resBody, response] =
      await api.Organization.addMemberIntoOrg(token, orgId, existingEmail)
    
    assert.equal(response.statusCode, 200, 'Incorrect status code returned')
    assert.equal(resBody.errors[existingEmail], existingErrorMessage, 'Incorrect error message')
  })

  it('should not re-invite an email', async () => {
    const invitedEmail =
      listPendingMembers[Math.floor(Math.random() * listPendingMembers.length)].invitedEmail
    
    const invitedErrorMessage = 'This email has been invited to this organization'
    const [resBody, response] = await api.Organization.addMemberIntoOrg(token, orgId, invitedEmail)
    
    assert.equal(response.statusCode, 200, 'Incorrect status code returned')
    assert.equal(resBody.errors[invitedEmail], invitedErrorMessage, 'Incorrect error message')
  })

  it('should not invite invalid email', async () => {
    const [resBody, response] =
      await api.Organization.addMemberIntoOrg(token, orgId, invalidEmails)
    
    const invalidErrorMessage =
      'The inputs should be valid emails and separated by colon (,) and/or semicolon (;)'

    assert.equal(response.statusCode, 400, 'Incorrect status code returned')
    assert.equal(resBody, invalidErrorMessage, 'Incorrect error message')
  })

  it('should change role of members successfully', async () => {
    const userId = listMembers[Math.floor(Math.random() * listMembers.length)].id
    
    const [responseBody] = await api.Organization.changeRoleMember(token, orgId, userId, 'ADMIN')
    assert.equal(responseBody, 'OK', 'Change role of member unsuccessfully')

    const [responseBody2] = await api.Organization.changeRoleMember(token, orgId, userId, 'MEMBER')
    assert.equal(responseBody2, 'OK', 'Change role of member unsuccessfully')
  })

  it('should not change role of deactivated members', async () => {
    const userId =
      listDeactivateMembers[Math.floor(Math.random() * listDeactivateMembers.length)].id
    
    const [resBody, response] = await api.Organization.changeRoleMember(
      token, orgId, userId, 'ADMIN')

    assert.equal(response.statusCode, 400, 'Incorrect status code returned')
    assert.equal(resBody, 'User is deactivated, please contact admin!', 'Incorrect error message')
  })

  it('should not change role of owner', async () => {
    const [resBody, response] = await api.Organization.changeRoleMember(
      token, orgId, ownerId, 'MEMBER')
    
    assert.equal(response.statusCode, 400, 'Incorrect status code returned')
    assert.equal(resBody, 'You can\'t change organization owner role.', 'Incorrect error message')
  })

  it('should deactivate member from organization successfully', async () => {
    const userId = listMembers[Math.floor(Math.random() * listMembers.length)].id
    
    const [responseBody] = await api.Organization.deactivateMember(token, orgId, userId)
    assert.equal(responseBody, 'OK', 'Deactivate member from organization uncsessfully')

    const [responseBody2] = await api.Organization.activateMember(token, orgId, userId)
    assert.equal(responseBody2, 'OK', 'Activate member from organization uncsessfully')
  })

  it('should not deactivate ADMIN member', async () => {
    const userId = listAdmins[Math.floor(Math.random() * listAdmins.length)].id
    const [resBody, response] = await api.Organization.deactivateMember(token, orgId, userId)

    assert.equal(response.statusCode, 403, 'Incorrect status code returned')
    assert.equal(resBody, 'Forbidden', 'Incorrect error message')
  })
})
