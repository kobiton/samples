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
}
export default new OrganizationAPI()
