import BPromise from 'bluebird'
import {debug} from '@kobiton/core-util'
import DownloadProcess from './download-process'
import {getAccount} from '../../core/user-info'
import * as exec from '../../core/exec'
import {spawn} from 'child_process'

const appName = 'Kobiton.app'
const mountedPath = '/Volumes/Kobiton/'
const destPath = '/Applications'

export function downloadApp() {
  return new BPromise((resolve, reject) => {
    const download = new DownloadProcess()
    let downloadUrl = process.env.KOBITON_DESKTOP_APP_URL || ''
    if (downloadUrl == '') {
      const account = getAccount()
      downloadUrl = account.appOSXUrl
      debug.log('Download file:', downloadUrl)
    }
    download.download(downloadUrl)
      .on('progress', (state) => debug.log('Progress', JSON.stringify(state)))
      .on('finish', (file) => {
        debug.log('setup', `Finished download file ${file}`)
        resolve(file)
      })
      .on('error', (err) => {
        debug.error('Error', err)
        reject(err)
      })
  })
}

export function installApp(file) {
  return new BPromise(async (resolve, reject) => {
    try {
      executeAttachImage('hdiutil', ['attach', `${file}`])
      await exec.executeCommand('sleep 5')
      await exec.executeCommand(`cp -R ${mountedPath}${appName} ${destPath}`)
      executeDetachImage('hdiutil', ['detach', `${mountedPath}`])
      resolve()
    }
    catch (e) {
      reject(e)
    }
  })
}

export async function removeApp() {
  const filePath = `${destPath}/${appName}`
  await exec.executeCommand(`rm -rf ${filePath}`)
}

export async function cleanUpData() {
  let username = await exec.executeCommand('whoami')
  username = username.trim()
  const files = ['user.data', 'devices.data']
  const jobs = []
  for (const file of files) {
    const path = `/Users/${username}/Library/Application Support/Kobiton/${file}`
    jobs.push(exec.executeCommand(`rm -rf "${path}"`))
  }
  await BPromise.all(jobs)
}

function executeAttachImage(cmd, args) {
  executeSpawnCommand(cmd, args, 'Kobiton')
}

function executeDetachImage(cmd, args) {
  executeSpawnCommand(cmd, args, 'ejected')
}

function executeSpawnCommand(cmd, args, expectedStdoutLine) {
  debug.log('executeSpawnCommand', `cmd: ${cmd} , args: ${args}`)
  return new BPromise((resolve, reject) => {
    const cmdProcess = spawn(cmd, args)
    cmdProcess.stderr.on('data', (data) => {
      reject(data.toString())
    })
    cmdProcess.stdout.on('data', onData)

    function onData(data) {
      const line = data.toString()
      const found = line.includes(expectedStdoutLine)
      if (found) {
        cmdProcess.stdout.removeListener('data', onData)
        resolve(line)
      }
    }
  })
}
