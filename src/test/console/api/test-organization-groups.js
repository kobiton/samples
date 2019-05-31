import {assert} from 'chai'
import api from '../../../framework/api'
import config from '../../../framework/config/test'
import * as util from '../../../framework/util/index'

const {username1: username, password1: password} = {...config}
let token
let orgId

let listMembers
let listGroups
let listDevices = []

let listGroupsHavingMembers
let listGroupHavingDevices

describe('API / Group Management', () => {
  before(async () => {
    token = await api.Organization.getBearerToken(username, password)
    
    const [accountInfo] = await api.Organization.getAccount(token)
    orgId = accountInfo['id']

    listDevices = await api.Device.getDevices({onlineDeviceOnly: false})

    const [allGroupInfo] = await api.Organization.getAllGroups(token, orgId)
    listGroups = allGroupInfo.groups

    listMembers = await api.Organization.filterMembers(
      accountInfo.members, {invitationStatus: 'ACCEPTED'})

    listGroupsHavingMembers = listGroups.filter((groups) => groups.membersCount !== 0)
    listGroupHavingDevices = listGroups.filter((groups) => groups.devicesCount !== 0)
  })

  it('should create a group successfully', async () => {
    const groupName = util.generateUsername()
    const [resBody, response] = await api.Organization.createGroup(token, orgId, groupName)
    
    assert.equal(response.statusCode, 200, 'Incorrect status code returned')
    assert.equal(resBody.name, groupName, 'Create group unsuccessfully')
  })

  it('should not create an existing group', async () => {
    const errorMsg = 'Group name must be unique in your organization, ' +
      'between 5 and 80 characters, contains alphabet, alphanumeric, space, . + - _'

    const groupName = util.getRandomItems(listGroups).name
    const [resBody, response] = await api.Organization.createGroup(token, orgId, groupName)
    
    assert.equal(response.statusCode, 400, 'Incorrect status code returned')
    assert.equal(resBody, errorMsg, 'Incorrect error message')
  })

  it('should not create a group with empty name', async () => {
    const errorMsg = 'Group name must be unique in your organization, ' +
      'between 5 and 80 characters, contains alphabet, alphanumeric, space, . + - _'
    
    const [resBody, response] = await api.Organization.createGroup(token, orgId)
    
    assert.equal(response.statusCode, 400, 'Incorrect status code returned')
    assert.equal(resBody, errorMsg, 'Incorrect error message')
  })

  it('should edit group information successfully', async () => {
    const groupId = util.getRandomItems(listGroups).id
    const newGroupName = util.generateUsername()

    const [resBody] = await api.Organization.editGroup(token, orgId, groupId, newGroupName)
    assert.equal(resBody, 'OK', 'Incorrect status code returned')
  })

  it('should assign member(s) to group successfully', async () => {
    const groupId = util.getRandomItems(listGroups).id
    const userId = util.getRandomItems(listMembers).id

    const [groupInfo] = await api.Organization.getGroupInfo(token, orgId, groupId)
    const listUserIds = api.Organization.getUserIdsOfGroup(groupInfo)

    const newListUserIds = listUserIds.concat(userId)

    const [resBody] =
      await api.Organization.updateGroupMembers(token, orgId, groupId, newListUserIds)
    assert.equal(resBody, 'OK', 'Incorrect status code returned')
  })

  it('should remove member(s) from group successfully', async () => {
    const groupId = util.getRandomItems(listGroupsHavingMembers).id
    const [groupInfo] = await api.Organization.getGroupInfo(token, orgId, groupId)

    const listUserIds = api.Organization.getUserIdsOfGroup(groupInfo)
    const userId = util.getRandomItems(listUserIds).id

    const newListUserIds = (listUserIds.filter((listIds) => listIds !== userId))

    const [resBody] =
      await api.Organization.updateGroupMembers(token, orgId, groupId, newListUserIds)
    assert.equal(resBody, 'OK', 'Incorrect status code returned')

    const [groupInfo2] = await api.Organization.getGroupInfo(token, orgId, groupId)
    const listUserIds2 = await api.Organization.getUserIdsOfGroup(groupInfo2)

    assert.notInclude(listUserIds2, userId, 'Remove member unsuccessfully')
  })

  it('should assign device(s) to group successfully', async () => {
    const groupId = util.getRandomItems(listGroups).id
    const [groupInfo] = await api.Organization.getGroupInfo(token, orgId, groupId)

    const listDeviceIds = api.Organization.getDeviceIdsOfGroup(groupInfo)
    const deviceId = util.getRandomItems(listDevices).id

    const newListDeviceIds = listDeviceIds.concat(deviceId)
  
    const [resBody] =
      await api.Organization.updateGroupDevices(token, orgId, groupId, newListDeviceIds)
    assert.equal(resBody, 'OK', 'Incorrect status code returned')
  })

  it('should remove device(s) from group successfully', async () => {
    const groupId = util.getRandomItems(listGroupHavingDevices).id
    const [groupInfo] = await api.Organization.getGroupInfo(token, orgId, groupId)
    
    const listDeviceIds = api.Organization.getDeviceIdsOfGroup(groupInfo)
    const deviceId = util.getRandomItems(groupInfo.devices).id

    const newListDeviceIds = (listDeviceIds.filter((listIds) => listIds !== deviceId))

    const [resBody] =
      await api.Organization.updateGroupDevices(token, orgId, groupId, newListDeviceIds)
    assert.equal(resBody, 'OK', 'Incorrect status code returned')

    const [groupInfo2] = await api.Organization.getGroupInfo(token, orgId, groupId)
    const listDeviceIds2 = await api.Organization.getUserIdsOfGroup(groupInfo2)

    assert.notInclude(listDeviceIds2, deviceId, 'Remove device unsuccessfully')
  })
})
