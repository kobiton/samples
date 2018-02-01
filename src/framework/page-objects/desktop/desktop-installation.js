import BPromise from 'bluebird'
import {debug} from '@kobiton/core-util'
import config from '../../../framework/config/test'
import * as exec from '../../util/exec'
import {downloadApp} from '../../util'
import {spawn} from 'child_process'
import {once} from 'lodash'

const appName = 'Kobiton.app'
const mountedPath = '/Volumes/Kobiton/'
const destPath = '/Applications'

export async function downloadKobitonApp() {
  return await downloadApp(config.appOSXUrl)
}

export function installApp(file) {
  return new BPromise(async (resolve, reject) => {
    try {
      await executeAttachImage('hdiutil', ['attach', `${file}`])
      await BPromise.delay(5000)
      await exec.executeCommand(`cp -R ${mountedPath}${appName} ${destPath}`)
      await executeDetachImage('hdiutil', ['detach', `${mountedPath}`])
      resolve()
    }
    catch (e) {
      reject(e)
    }
  })
}

export function removeApp() {
  const filePath = `${destPath}/${appName}`
  return new BPromise(async (resolve, reject) => {
    try {
      await exec.executeCommand(`rm -rf ${filePath}`)
      resolve()
    }
    catch (e) {
      reject(e)
    }
  })
}

function executeAttachImage(cmd, args) {
  return executeCommandWithVerification(cmd, args, 'Kobiton')
}

function executeDetachImage(cmd, args) {
  return executeCommandWithVerification(cmd, args, 'ejected')
}

function _executeSpawnCommand(cmd, args) {
  debug.log('_executeSpawnCommand', `cmd: ${cmd} , args: ${args}`)
  return new BPromise((resolve, reject) => {
    let stderr = ''
    let stdout = ''
    const rejectOnce = once(reject)
    const cmdProcess = spawn(cmd, args)
    cmdProcess.stderr.on('data', (data) => {
      stderr += data.toString()
    })
    
    cmdProcess.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    cmdProcess.on('error', (err) => {
      debug.error('_executeSpawnCommand', err)
      rejectOnce(err)
    })

    cmdProcess.on('exit', () => {
      if (stderr) return rejectOnce(new Error(stderr))
      resolve(stdout)
    })
  })
}

async function executeCommandWithVerification(cmd, args, expectedStdoutLine) {
  const stdoutLines = await _executeSpawnCommand(cmd, args)
  const found = stdoutLines.includes(expectedStdoutLine)
  if (!found) throw new Error(`Expect ${expectedStdoutLine} on ${stdoutLines}`)
}
