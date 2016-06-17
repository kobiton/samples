import BPromise from 'bluebird'
import {debug} from '@kobiton/core-util'
import DownloadProcess from './download-process'
import {getAccount} from '../../core/user-info'
import * as exec from '../../core/exec'
import {spawn} from 'child_process'
import fs from 'fs'

const appName = 'Kobiton.app'
const mountedPath = '/Volumes/Kobiton/'
const destPath = '/Applications'

export function downloadApp() {
  return new BPromise((resolve, reject) => {
    const download = new DownloadProcess()
    const account = getAccount()
    debug.log('Download file:', account.appOSXUrl)
    download.download(account.appOSXUrl)
    download
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
      await executeAttachImage('hdiutil', ['attach', `${file}`])
      await exec.executeCommand(`sleep 5`)
      await exec.executeCommand(`cp -R ${mountedPath}${appName} ${destPath}`)
      await exec.executeCommand(`hdiutil detach ${mountedPath}`)
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

export async function executeAttachImage(cmd, args) {
  debug.log('executeAttachImage', `cmd: ${cmd} , args: ${args}`)
  return await new BPromise((resolve, reject) => {
    const ls = spawn(cmd, args)
    ls.stdout.on('data', (data) => {
      const path = data.toString().includes('Kobiton')
      if (path) resolve(data.toString())
    })
    ls.stderr.on('data', (data) => {
      resolve(data.toString())
    })
  })
}
