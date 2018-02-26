import Base from './_base'
import config from '../../framework/config/test'

const {autoTestHostname, username1: username, apiKey} = {...config}

const searchTypeEnum = {
  STATE: 'state',
  TYPE: 'type',
  PLATFORM: 'platform',
  USERID: 'userId',
  KEYWORD: 'keyword',
  PAGE: 'page',
  STARTDATE: 'startDate',
  ENDDATE: 'endDate'
}

class Session extends Base {

  /**
   * Retrieve all sessions belong to the current organization or user.
   * @param searchTypes {array}
   * searchTypes = {
   *  state, // Running, Complete, Passed, Failed, Timeout, Error, Terminated
   *  type, // All, Auto, Manual
   *  platform, // All, Android, iOS
   *  userId,
   *  keyword,
   *  page,
   *  startDate,
   *  endDate
   * }
   */
  async getSessions(params) {
    let realPath = (params) ? 'sessions?' : 'sessions'

    if (params) {
      let subPath = ''
      Object.keys(params).forEach((type) => {
        let value = params[type]
        if (searchTypeEnum.hasOwnProperty(type.toUpperCase())) {
          subPath = `${type}=${value.toString().toUpperCase()}&`
          realPath = realPath.concat(subPath)
        }
      })
      realPath = realPath.substring(0, realPath.length - 1)
    }

    return await this.get({
      path: realPath
    })
  }

  /**
   * Retrieve a session info belonging to the current user or organization.
   * @param sessionId {integer} - Session ID
   * @param pageNumber {integer} - Page number, default is 1
   */
  async getASession(sessionId, pageNumber = 1) {
    return await this.get({
      path: `sessions/${sessionId}?page=${pageNumber}`
    })
  }

  /**
   * Delete a session
   * @param sessionId {integer} - Session ID
   */
  async deleteASession(sessionId) {
    return await this.delete({
      path: `sessions/${sessionId}`
    })
  }

  /**
   * Terminate a session
   * @param sessionId {integer} - Session ID
   */
  async terminateASession(sessionId) {
    return await this.delete({
      path: `sessions/${sessionId}/terminate`
    })
  }

  /**
   * Terminate a Session
   * @param body {object}
   * >> name: The test session name
   * >> description: The test session description
   * >> state: The state of test session "PASSED | FAILED | COMPLETE"
   */
  async updateSessionInfo(sessionId, {name, description, state}) {
    return await this.put({
      path: `sessions/${sessionId}`,
      body: {
        name,
        description,
        state
      }
    })
  }

  /**
  * Create a new session
  * @param body {object} Enter desiredCapabilities. Example:
  * 'desiredCapabilities': {
  *  'deviceOrientation': 'portrait',
  *  'captureScreenshots': true,
  *  'deviceGroup': 'KOBITON',
  *  'deviceName': 'iPhone',
  *  'platformName': 'iOS',
  *  'browserName': 'safari'
  }
  */
  async initSession(body) {
    return await this.post({
      url: `https://${username}:${apiKey}@${autoTestHostname}/wd/hub/session`,
      body
    })
  }

  /**
  * Delete the session
  * @param sessionId {string} Session Id
  */
  async deleteSession(sessionId) {
    return await this.delete({
      url: `https://${autoTestHostname}/wd/hub/session/${sessionId}`
    })
  }

  /**
  * Navigate to a new URL
  * @param sessionId {string} Session Id
  * @param url {string} Get a new url
  */
  async getUrl(sessionId, {url}) {
    return await this.post({
      url: `https://${autoTestHostname}/wd/hub/session/${sessionId}/url`,
      body: {
        url
      }
    })
  }

}

export default new Session()
