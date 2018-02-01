import {assert} from 'chai'
import api from '../../../framework/api'
import {getRealPath, downloadApp, fileExists} from '../../../framework/util'

describe('API / Repository', () => {

  const androidApp = 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.apk' // eslint-disable-line max-len
  const iOSApp = 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa' // eslint-disable-line max-len
  const androidAppName = 'iFixit.apk'
  const iOSAppName = 'iFixit.ipa'
  const appTestFolder = 'apps-test'
  
  let androidAppPath
  let iOSAppPath
  let androidAppId, androidAppVersionId
  let iOSAppId, iOSAppVersionId

  before(async () => {

    androidAppPath = getRealPath(appTestFolder, androidAppName)
    iOSAppPath = getRealPath(appTestFolder, iOSAppName)
   
    if (!fileExists(androidAppPath)) {
      await downloadApp(androidApp, androidAppPath)
    }

    if (!fileExists(iOSAppPath)) {
      await downloadApp(iOSApp, iOSAppPath)
    }

  })

  it('should clean up all apps successfully', async () => {
    await api.AppsRepo.deleteAllApps()
    const appsList = await api.AppsRepo.getApps()
    assert.lengthOf(appsList.apps, 0, 'The array is empty.')
  })

  it('should upload Android & iOS app successfully', async () => {
    const androidAppInfo = await api.AppsRepo.uploadApp({filePath: androidAppPath})
    const iOSAppInfo = await api.AppsRepo.uploadApp({filePath: iOSAppPath})

    androidAppId = androidAppInfo[0].appId
    iOSAppId = iOSAppInfo[0].appId

    const appsList = await api.AppsRepo.getApps()

    assert.lengthOf(appsList.apps, 2, 'There are two uploaded apps on Apps Repo.')
  })

  it('should upload Android & iOS app version successfully', async () => {
    const androidAppVersionInfo = await api.AppsRepo.uploadApp({
      filePath: androidAppPath,
      appId: androidAppId
    })

    const iOSAppVersionInfo = await api.AppsRepo.uploadApp({
      filePath: iOSAppPath,
      appId: iOSAppId
    })

    androidAppVersionId = androidAppVersionInfo[0].versionId
    iOSAppVersionId = iOSAppVersionInfo[0].versionId

    assert.isNumber(androidAppVersionId, 'versionId must be a number.')
    assert.isNumber(iOSAppVersionId, 'versionId must be a number.')
  })

  it('should make Android & iOS app to private successfully', async () => {
    await api.AppsRepo.makeAnAppPrivate(androidAppId)
    await api.AppsRepo.makeAnAppPrivate(iOSAppId)
    
    assert.isTrue((await getAppInfo(androidAppId))[0].privateAccess, 'Make the application private')
    assert.isTrue((await getAppInfo(iOSAppId))[0].privateAccess, 'Make the application private')
  })

  it('should make Android & iOS app to public successfully', async () => {
    await api.AppsRepo.makeAnAppPublic(androidAppId)
    await api.AppsRepo.makeAnAppPublic(iOSAppId)

    assert.isFalse((await getAppInfo(androidAppId))[0].privateAccess, 'Make the application public')
    assert.isFalse((await getAppInfo(iOSAppId))[0].privateAccess, 'Make the application public')
  })

  it('should delete Android & iOS app version successfully', async () => {
    await api.AppsRepo.deleteAppVersion(androidAppVersionId)
    await api.AppsRepo.deleteAppVersion(iOSAppVersionId)

    assert.equal((await getAppInfo(androidAppId))[0].versions.length, 1,
      'Total Android app versions are 1.')
    assert.equal((await getAppInfo(iOSAppId))[0].versions.length, 1,
      'Total iOS app versions are 1.')
  })

  it('should delete Android & iOS app successfully', async () => {
    await api.AppsRepo.deleteApp(androidAppId)
    await api.AppsRepo.deleteApp(iOSAppId)

    const appsList = await api.AppsRepo.getApps()
    assert.lengthOf(appsList.apps, 0, 'The array is empty.')
  })

  async function getAppInfo(appId) {
    const appsList = await api.AppsRepo.getApps()
    return appsList.apps.filter((app) => app.id === appId)
  }

})
