import Base from './_base'

const subUrl = {
  path: 'cleanupPolicies'
}

class CleanupPolicyAPI extends Base {
  /**
   * Get all information of the cleanup policy
   * @param {String} token - Generated from username and password
   */
  async getCleanupPolicyInfo(token) {
    return await this.get({
      headers: this.customBearerHeaders(token),
      path: `${subUrl.path}`
    })
  }

  /**
   * Update new cleanup policy
   * @param {String} token
   * @param {integer} cleanupPolicyId
   * @param {JSON Object} policy
   */
  async updateCleanupPolicies(token, cleanupPolicyId, policy) {
    return await this.put({
      headers: this.customBearerHeaders(token),
      path: `${subUrl.path}/${cleanupPolicyId}`,
      body: policy
    })
  }
}
export default new CleanupPolicyAPI()

