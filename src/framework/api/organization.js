import Base from './_base'
import {filterJson} from '../../framework/util'

const subUrl = {
  members: 'organizations/own'
}

class OrganizationAPI extends Base {
  /**
   *
   * @param {Array} listMembers
   * Ex: [{
          isDeactivated: false,
          role: 'MEMBER',
          invitationStatus: 'PENDING',
          invitedEmail: 'rp6EN@gmail.com'
        }]
   * @param {Array} criteria
   * Ex: {role: 'MEMBER', invitedEmail: 'rp6EN@gmail.com'}
   * Return a filtered result like below:
   * Ex: [{
          role: 'MEMBER',
          invitationStatus: 'PENDING',
          invitedEmail: 'rp6EN@gmail.com'
        }]
   */
  filterMembers(listMembers, criteria) {
    return filterJson(listMembers, criteria)
  }
  
  /**
   * Return all information of this account, include organization info.
   * @param {String} token - Generated from username and password
   */
  async getAccount(token) {
    return await this.get({
      headers: this.customBearerHeaders(token),
      path: subUrl.members
    })
  }

  /**
   * Get list members id from all information of a group.
   * @param {Array} groupInfo
   */
  getUserIdsOfGroup(groupInfo = []) {
    const userIds = []
    groupInfo.users.map((users) => userIds.push(users.id))
    return userIds
  }

  /**
   * Get list devices id from all information of a group.
   * @param {Array} groupInfo
   */
  getDeviceIdsOfGroup(groupInfo = []) {
    const deviceIds = []
    groupInfo.devices.map((devices) => deviceIds.push(devices.id))
    return deviceIds
  }

  /**
   * Get all group information of this organization.
   * @param {String} token
   * @param {integer} orgId
   */
  async getAllGroups(token, orgId) {
    return await this.get({
      headers: this.customBearerHeaders(token),
      path: `organizations/${orgId}/groups`
    })
  }

  /**
   * Get information about a group.
   * @param {String} token
   * @param {integer} orgId
   * @param {integer} groupId
   */
  async getGroupInfo(token, orgId, groupId) {
    return await this.get({
      headers: this.customBearerHeaders(token),
      path: `organizations/${orgId}/groups/${groupId}`
    })
  }

  /**
   * Adding email(s) to the organization.
   * @param {String} token - Generated from username and password
   * @param {integer} orgId
   * @param {Array} emails
   */
  async addMemberIntoOrg(token, orgId, emails = []) {
    return await this.post({
      headers: this.customBearerHeaders(token),
      path: `organizations/${orgId}/members`,
      body: {emails: [emails]}
    })
  }

  /**
   * Change role of user to ADMIN or MEMBER
   * @param {String} token - Generated from username and password
   * @param {integer} orgId
   * @param {integer} userId
   * @param {String} role
   */
  async changeRoleMember(token, orgId, userId, role) {
    return await this.put({
      headers: this.customBearerHeaders(token),
      path: `organizations/${orgId}/role/${userId}`,
      body: {role}
    })
  }

  /**
   * Deactivate member, also unassign from all groups
   * @param {String} token - Generated from username and password
   * @param {integer} orgId
   * @param {integer} userId
   */
  async deactivateMember(token, orgId, userId) {
    return await this.put({
      headers: this.customBearerHeaders(token),
      path: `organizations/${orgId}/deactivate/${userId}`
    })
  }

  /**
   * Activate member. The user will be treated as a new invitee to the organization.
   * @param {String} token - Generated from username and password
   * @param {integer} orgId
   * @param {integer} userId
   */
  async activateMember(token, orgId, userId) {
    return await this.put({
      headers: this.customBearerHeaders(token),
      path: `organizations/${orgId}/activate/${userId}`
    })
  }

  /**
   * Create a new group.
   * @param {String} token
   * @param {integer} orgId
   * @param {String} groupName
   * @param {String} description
   */
  async createGroup(token, orgId, groupName, description) {
    return await this.post({
      headers: this.customBearerHeaders(token),
      path: `organizations/${orgId}/groups`,
      body: {
        name: groupName,
        description
      }
    })
  }

  /**
   * Edit group name and/ or group description.
   * @param {String} token
   * @param {integer} orgId
   * @param {integer} groupId
   * @param {String} newGroupName
   * @param {String} description - Optional field
   */
  async editGroup(token, orgId, groupId, newGroupName, description) {
    return await this.put({
      headers: this.customBearerHeaders(token),
      path: `organizations/${orgId}/groups/${groupId}`,
      body: {
        name: newGroupName,
        description
      }
    })
  }

  /**
   * Update member(s) of a group.
   * When assigning member(s), list userIds is updated by current Ids concatenate new Ids.
   * When removing member(s), list userId is updated by Ids wanted to keep.
   * @param {String} token
   * @param {integer} orgId
   * @param {integer} groupId
   * @param {Array} userIds
   */
  async updateGroupMembers(token, orgId, groupId, userIds = []) {
    return await this.put({
      headers: this.customBearerHeaders(token),
      path: `organizations/${orgId}/groups/${groupId}/members`,
      body: {userIds}
    })
  }

  /**
   * Update device(s) of a group.
   * When assigning device(s), list deviceIds is updated by current Ids concatenate new Ids.
   * When removing device(s), list deviceIds is updated by Ids wanted to keep.
   * @param {String} token
   * @param {integer} orgId
   * @param {integer} groupId
   * @param {Array} deviceIds
   */
  async updateGroupDevices(token, orgId, groupId, deviceIds = []) {
    return await this.put({
      headers: this.customBearerHeaders(token),
      path: `organizations/${orgId}/groups/${groupId}/devices`,
      body: {deviceIds}
    })
  }
}
export default new OrganizationAPI()
