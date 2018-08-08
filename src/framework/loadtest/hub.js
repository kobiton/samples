import Base from '../api/_base'

class Hub extends Base {
  /**
   * get Hub Info
   */
  async getHub(token) {
    return await this.get({
      headers: {
        'authorization': `Bearer ${token}`,
        'content-type': 'application/json'
      },
      path: 'hubs/which'
    })
  }
}

export default new Hub()
