import * as exec from './exec'
import {getConfig} from './config'
import BPromise from 'bluebird'

export async function cleanUpDesktopResourceData() {
  const resouceFiles = await getDesktopResourceFilePaths()

  await BPromise.all([
    exec.executeCommand(`rm -rf "${resouceFiles.userDataFilePath}"`),
    exec.executeCommand(`rm -rf "${resouceFiles.devicesDataFilePath}"`)
  ])
}

async function getDesktopResourceFilePaths() {
  let username = await exec.executeCommand('whoami')
  username = username.trim()
  const {emailOrUsername: desktopUser} = getConfig()
  return {
    userDataFilePath: `/Users/${username}/Library/Application\ Support/Kobiton/user.data`,
    devicesDataFilePath: `/Users/${username}/Library/Application\ Support/Kobiton/data/${desktopUser}/devices.data` // eslint-disable-line max-len
  }
}
