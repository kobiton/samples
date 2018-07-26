import api from '../../../framework/api'
import {getRealPath, getChildFiles} from '../../../framework/util'
import {debug} from '@kobiton/core-util'

describe('API / Repository', () => {

  const appTestFolder = 'apps-test'
  let listAppPath
  
  before(async () => {
    listAppPath = getChildFiles(appTestFolder)
  })
  it('upload all apps into Kobiton Store', async () => {
    let appsList = await api.AppsRepo.getApps()
    debug.log('Total apps before uploading', `${appsList.apps.length} apps`)
    for (let appPath of listAppPath) {
      // eslint-disable-next-line
      const appInfo = await api.AppsRepo.uploadApp({filePath: getRealPath(appTestFolder, appPath)}) // eslint-disable-line babel/no-await-in-loop
      debug.log('appInfo', `app Name: ${appPath} - appId: ${appInfo[0].appId}`)
    }
    appsList = await api.AppsRepo.getApps()
    debug.log('Total apps after uploading', `${appsList.apps.length} apps`)
  })

})
