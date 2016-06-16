import BPromise from 'bluebird'
import {debug} from '@kobiton/core-util'
import {exec, spawn} from 'child_process'

export async function killAdbProcess() {
  const cmd = (process.platform === 'win32') ? 'taskkill /f /im adb.exe' : 'killall adb'
  await _execCommandAsync(cmd)
}

export async function killKobitonApp() {
  const cmd = (process.platform === 'win32') ? 'taskkill /f /im Kobiton.exe' : 'killall Kobiton'
  await _execCommandAsync(cmd)
}

export async function executeCommand(cmd) {
  return await _execCommandAsync(cmd)
}

async function _execCommandAsync(cmd, cb) {
  debug.log('execCommandAsync', `cmd: ${cmd}`)
  return await new BPromise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) reject(error.toString())
      resolve(stdout.toString())
    })
  })
}

export async function executeCommandSpawn(cmd, args) {
  debug.log('executeCommandSpawn', `cmd: ${cmd} , args: ${args}`)
  return await new BPromise((resolve, reject) => {
    const ls = spawn(cmd, args)
    ls.stdout.on('data', (data) => {
      if (data) resolve(data.toString())
    })
    ls.stderr.on('data', (data) => {
      if (data) reject(data.toString())
    })
  })
}
