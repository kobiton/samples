import Base from './_base'
import config from '../../framework/config/test'
import {filterJson} from '../../framework/util'

const {username1: username, password1: password} = {...config}

const subUrl = {
  members: 'organizations/own'
}

class OrganizationAPI extends Base {
  async getMembers() {
    const customHeaders = {
      'authorization': `Bearer ${await this.getBearerToken(username, password)}`,
      'content-type': 'application/json'
    }
    const [membersInfo] = await this.get({
      path: subUrl.members,
      headers: customHeaders
    })

    return membersInfo.members
  }

  async getAcceptedMembers() {
    const members = await this.getMembers()
    const result = filterJson(members, {invitationStatus: 'ACCEPTED'})
    return result
  }
}

export default new OrganizationAPI()
