import BPromise from 'bluebird'
import {debug} from '@kobiton/core-util'

const exectAsync = BPromise.promisify(require('child_process').exec, {multiArgs: true})
const options = {
  encoding: 'utf8',
  timeout: 0,
  maxBuffer: 200 * 1024,
  killSignal: 'SIGTERM',
  cwd: null,
  env: null
}

export async function killAdbProcess() {
  const cmd = (process.platform === 'win32') ? 'taskkill /f /im adb.exe' : 'killall adb'
  const [stdout, stderr] = await exectAsync(cmd, options)
  debug.log('exec', `stdout: ${stdout}`)
  debug.log('exec', `stderr: ${stderr}`)
}

export async function killKobitonApp() {
  const cmd = (process.platform === 'win32') ? 'taskkill /f /im Kobiton.exe' : 'killall Kobiton'
  const [stdout, stderr] = await exectAsync(cmd, options)
  debug.log('exec', `stdout: ${stdout}`)
  debug.log('exec', `stderr: ${stderr}`)
}
