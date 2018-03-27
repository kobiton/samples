import {assert} from 'chai'
import config from '../../../framework/config/test'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import AppsRepoUI from '../../../framework/page-objects/portal/user/apps-repo-ui'
import AppsRepoAPI from '../../../framework/api/apps-repo'
import {getRealPath, downloadApp, fileExists} from '../../../framework/util'
import User from '../../../framework/api/user'

const {username1: username, password1: password} = {...config}
const androidApp = 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.apk' // eslint-disable-line max-len
const iOSApp = 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa' // eslint-disable-line max-len
const zipFile = 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.apk.zip'
let loginPage
let appsRepoPage
let uploadAppIds = {}
let androidAppPath
let iOSAppPath
let zipFilePath
let currentUser

describe('On apps repo page', () => {

  before(async () => {
    loginPage = new LoginPage()
    loginPage.open()
    loginPage.login(username, password)
    appsRepoPage = new AppsRepoUI()
    appsRepoPage._browser.pause(appsRepoPage.waitTime)
    await AppsRepoAPI.getModifiedAppsList()

    // download an copy of .apk, .ipa, .zip file from host server
    const androidAppName = androidApp.split('/').pop()
    const iOSAppName = iOSApp.split('/').pop()
    const zipFileName = zipFile.split('/').pop()
    const appTestFolder = 'apps-test'
    androidAppPath = getRealPath(appTestFolder, androidAppName)
    iOSAppPath = getRealPath(appTestFolder, iOSAppName)
    zipFilePath = getRealPath(appTestFolder, zipFileName)

    if (!fileExists(androidAppPath)) {
      await downloadApp(androidApp, androidAppPath)
    }
    if (!fileExists(iOSAppPath)) {
      await downloadApp(iOSApp, iOSAppPath)
    }
    if (!fileExists(zipFilePath)) {
      await downloadApp(zipFile, zipFilePath)
    }
    // end download

    currentUser = await User.getSubscription()
  })

  beforeEach(() => {
    appsRepoPage.open()
  })

  it('should have \'Click to add new app\' feature', () => {
    const findXPath = appsRepoPage.elements.addNewApp.selector
    assert.isTrue(appsRepoPage._browser.isExisting(findXPath), 'feature does not exist')
  })

  it('.ipa .apk files should be uploaded', async () => {
    const androidAppInfo = await AppsRepoAPI.uploadApp({filePath: androidAppPath})
    const iOSAppInfo = await AppsRepoAPI.uploadApp({filePath: iOSAppPath})
    const zipFileInfo = await AppsRepoAPI.uploadApp({filePath: zipFilePath})
    appsRepoPage._browser.pause(appsRepoPage.waitTime)
    uploadAppIds['androidId'] = androidAppInfo[0].appId
    uploadAppIds['iOSId'] = iOSAppInfo[0].appId
    uploadAppIds['zipFileId'] = zipFileInfo[0].appId
    await AppsRepoAPI.getModifiedAppsList()
    assert.isTrue(AppsRepoAPI.isTestAppsExisted(uploadAppIds), 'failed to find apps')
  })

  it('organization\'s admin should be able to see all private/public apps', () => {
    const privateAccessXpath = appsRepoPage.elements.privateAccessIcon.selector
    const publicAccessXpath = appsRepoPage.elements.publicAccessIcon.selector
    assert.isTrue(appsRepoPage._browser.isExisting(privateAccessXpath))
    assert.isTrue(appsRepoPage._browser.isExisting(publicAccessXpath))
  })

  it('should display a lock icon if an app has private access', () => {
    const privateAppId = AppsRepoAPI.getAppIdByAccessLevel('Private')
    const lockIconXpath = appsRepoPage.elements.privateAccessIcon.selector
    appsRepoPage.filterApp(privateAppId)
    assert.isTrue(appsRepoPage._browser.isExisting(lockIconXpath),
      'lock icon did not appear')
  })

  it('should change app to public in order for app accessed by whole organization', async function () { // eslint-disable-line max-len
    if (currentUser.planName.split('-').shift().trim() === 'Business') {
      const privateAppId = AppsRepoAPI.getAppIdByAccessLevel('Private')
      if (privateAppId) {
        const lockIconXpath = appsRepoPage.elements.privateAccessIcon.selector
        appsRepoPage.filterApp(privateAppId)
        assert.isTrue(appsRepoPage._browser.isExisting(lockIconXpath),
          'lock icon did not appear')
        appsRepoPage.changePublicAccess(privateAppId)
        assert.isTrue(appsRepoPage._browser.isExisting('publicAccessIcon'),
          'earth icon did not appear')
      }
    }
    else {
      this.skip()
    }
  })

  it('new uploaded apps should have pulbic access as default', function () {
    if (currentUser.planName.split('-').shift().trim() === 'Business') {
      for (let id in uploadAppIds) {
        appsRepoPage.filterApp(uploadAppIds[id])
        assert.isTrue(appsRepoPage.isAppAccessedPublic(uploadAppIds[id]),
          'should be accessed publicly')
      }
    }
    else {
      this.skip()
    }
  })

  it('filter should filter app by OS ', async () => {
    appsRepoPage.filterApp('ios')
    assert.isTrue(await appsRepoPage.isOnlyFilteredOSExisted('ios'),
      'filter is not working correctly')
  })

  it('when click on cancel delete button, app should not be deleted', () => {
    const appId = AppsRepoAPI.getAnAppId()
    appsRepoPage.filterApp(appId)
    appsRepoPage.removeApp(false)
    appsRepoPage.filterApp(appId)
    const appContextMenu = appsRepoPage.elements.appContextMenu.selector
    assert.isTrue(appsRepoPage._browser.isExisting(appContextMenu), 'app should exist')
  })

  it('should display confirmation message when deleting an application', () => {
    const appId = AppsRepoAPI.getAnAppId()
    appsRepoPage.filterApp(appId)
    appsRepoPage.showDeleteMessageNotification()
    const confirmDeleteMessageXPath = appsRepoPage.elements.confirmDeleteMessage.selector
    assert.isTrue(appsRepoPage._browser.isExisting(confirmDeleteMessageXPath),
      'confirm delete message not appear')
  })

  it('if app has many versions, should display the latest version', () => {
    const testAppId = AppsRepoAPI.getMultipleVersionsAppId()
    const latestDateOnUI = appsRepoPage.getUILatestDate(testAppId)
    const latestVersion = AppsRepoAPI.getLatestAppVersion(testAppId)
    assert.equal(new Date(latestDateOnUI).toLocaleDateString(),
    new Date(latestVersion.createdAt).toLocaleDateString(),
      'latest dates should be the same')
  })

  it('if the app is public, should display earth icon', () => {
    const appId = AppsRepoAPI.getAppIdByAccessLevel('public')
    appsRepoPage.filterApp(appId)
    const earthIconXPath = appsRepoPage.elements.publicAccessIcon.selector
    assert.isTrue(appsRepoPage._browser.isExisting(earthIconXPath), 'earth icon should exist')
  })

  it('successfully uploaded app should display app\'s name, platform, permission, version', () => {
    const appId = uploadAppIds.androidId
    appsRepoPage.filterApp(appId)
    const appInfoOnUI = appsRepoPage.getAnAppInfoOnUI()
    assert.isTrue(appInfoOnUI.name !== '', 'app\'s name should exist')
    assert.isTrue(appInfoOnUI.platform !== '', 'app\'s platform should exist')
    assert.isTrue(appInfoOnUI.permission !== '', 'app\'s permission should exist')
    assert.isTrue(appInfoOnUI.version !== '', 'app\'version should exist')
  })

  it('if the app has many versions should be able to click on app\'s name to see all versions', () => { // eslint-disable-line max-len
    const appId = AppsRepoAPI.getMultipleVersionsAppId()
    appsRepoPage.filterApp(appId)
    const appNameXpath = appsRepoPage.elements.appName.selector
    appsRepoPage._browser.click(appNameXpath)
    appsRepoPage._browser.pause(appsRepoPage.waitTime)
    const totalVersionsOnUI = appsRepoPage._browser.elements(appNameXpath).value.length
    const totalVersionsFromAPI = AppsRepoAPI.getAnAppInfo(appId).total_versions
    if (totalVersionsFromAPI) {
      assert.equal(totalVersionsOnUI, totalVersionsFromAPI,
        'all app\'s versions did not display correctly')
    }
  })

  it('should be able to see all private/public vesions of an app', () => {
    const appId = AppsRepoAPI.getMultipleVersionsAppId()
    const appNameXpath = appsRepoPage.elements.appName.selector
    appsRepoPage.filterApp(appId)
    appsRepoPage._browser.click(appsRepoPage.elements.appName.selector)
    const totalVersionsOnUI = appsRepoPage._browser.elements(appNameXpath).value.length
    const totalVersionsFromAPI = AppsRepoAPI.getAnAppInfo(appId).total_versions
    if (totalVersionsFromAPI) {
      assert.equal(totalVersionsOnUI, totalVersionsFromAPI, 'should see all app\'s version')
    }
  })

  it('versions should be grouped together', () => {
    const appId = AppsRepoAPI.getMultipleVersionsAppId()
    const appNameXpath = appsRepoPage.elements.appName.selector
    appsRepoPage.filterApp(appId)
    appsRepoPage._browser.pause(appsRepoPage.waitTime)
    appsRepoPage._browser.click(appNameXpath)
    appsRepoPage._browser.pause(appsRepoPage.waitTime)
    const totalVersionsOnUI = appsRepoPage._browser.elements(appNameXpath).value.length
    assert.isTrue(totalVersionsOnUI > 0, 'failed to group app\'s versions')
  })

  it('should display confirmation message when deleting an application', () => {
    const appId = AppsRepoAPI.getAnAppId()
    appsRepoPage.filterApp(appId)
    appsRepoPage.showDeleteMessageNotification()
    const confirmDeleteMessageXPath = appsRepoPage.elements.confirmDeleteMessage.selector
    assert.isTrue(appsRepoPage._browser.isExisting(confirmDeleteMessageXPath),
      'confirm delete message not appear')
  })

  it('should delete app/ app\'s version when click on remove menu', () => {
    for (let i = 0; i < uploadAppIds.length; i++) {
      appsRepoPage.filterApp(uploadAppIds[i])
      appsRepoPage.removeApp(true)
      appsRepoPage._browser.pause(8000)
      appsRepoPage.filterApp(uploadAppIds[i])
      assert.isFalse(appsRepoPage._browser.isExisting(
        appsRepoPage.elements.appContextMenu.selector),
        'failed to delete app\'s versions')
    }
  })

})
