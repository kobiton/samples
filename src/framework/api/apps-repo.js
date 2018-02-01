import Base from './_base'
import BPromise from 'bluebird'

const fs = BPromise.promisifyAll(require('fs'))

class AppsRepo extends Base {

  /**
   * Get list of applications which were added to the Apps Repo.
   */
  async getApps() {
    const [allApps] = await this.get({
      path: 'apps'
    })
    return allApps
  }

  /**
   * Get information about an application
   * @param appId {integer} - Application ID
   */
  async getAnApp(appId) {
    return await this.get({
      path: `apps/${appId}`
    })
  }

  /**
   * Get information about an application version.
   * @param versionId {integer} - Application Version ID
   */
  async getAnAppVersion(versionId) {
    return await this.get({
      path: `app/versions/${versionId}`
    })
  }

  /**
   * Delete an application
   * @param appId {integer} - The application ID
   */
  async deleteApp(appId) {
    return await this.delete({
      path: `apps/${appId}`
    })
  }

  /**
   * Delete all applications
   */
  async deleteAllApps() {
    const listApps = await this.getApps()
    listApps.apps.forEach(async(app) => {
      await this.deleteApp(app.id)
    })
    await BPromise.delay(10000)
  }

  /**
   * Delete an application version
   * @param versionId {integer} - The application version ID
   */
  async deleteAppVersion(versionId) {
    return await this.delete({
      path: `app/versions/${versionId}`
    })
  }

  /**
   * Create a new application or a new application version
   * @param filename {string} - The name of application
   * @param appPath {string} - The path of application
   */
  async createAppOrVersion(filename, appPath) {
    return await this.post({
      path: 'apps',
      body: {
        filename,
        appPath
      }
    })
  }

  /**
   * Generate a pre-signed S3 upload URL
   * @param filename {string} - The name of application
   * @param appId {integer} - The application ID
   */
  async generateUploadUrl(filename, appId) {
    const response = await this.post({
      path: 'apps/uploadUrl',
      body: {
        filename,
        appId
      }
    })
    return {appPath: response[0].appPath, url: response[0].url}
  }

  /**
   * Pre-signed S3 URL helps us upload an application in secure
   * @param preSignedUrl {string} - The URL with security credentials
   * @param filePath {string} - The path of application
   */
  async uploadFileToS3(preSignedUrl, filePath) {

    const stats = await fs.statAsync(filePath)
    
    return await this.put({
      url: preSignedUrl,
      json: false, // Required by createReadStream
      headers: {
        'x-amz-tagging': 'unsaved=true',
        'content-length': stats.size, // Required by AWS S3
        'content-type': 'application/octet-stream'
      },
      body: fs.createReadStream(filePath)
    })
  }

  /**
   * Upload an app or app version into Apps Repo
   * @param filePath {string} - The path of application
   * @param fileName {string} - The name of application
   * @param appId {integer} - The application ID
   */
  async uploadApp({filePath, fileName = 'appName', appId}) {
    const uploadUrlResponse = await this.generateUploadUrl(filePath, appId)
    await this.uploadFileToS3(uploadUrlResponse.url, filePath)
    return await this.createAppOrVersion(fileName, uploadUrlResponse.appPath)
  }

  /**
   * Make an application private so it’s only accessible by creator.
   * @param appId {integer} - The application ID
   */
  async makeAnAppPrivate(appId) {
    return await this.put({
      path: `apps/${appId}/private`
    })
  }

  /**
   * Make an application public so it’s only accessible by creator.
   * @param appId {integer} - The application ID
   */
  async makeAnAppPublic(appId) {
    return await this.put({
      path: `apps/${appId}/public`
    })
  }

}

export default new AppsRepo()
