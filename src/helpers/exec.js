import BPromise from 'bluebird'
import {debug} from '@kobiton/core-util'

const exectAsync = BPromise.promisify(require('child_process').exec, {multiArgs: true})
const cmdWin = 'taskkill /f /im adb.exe'
const cmdMac = 'killall adb'

exports.killAdbProcess = async () => {
  let cmd
  if (process.platform === 'win32') {
    cmd = cmdWin
  }
  else {
    cmd = cmdMac
  }

  const options = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    cwd: null,
    env: null
  }
  const [stdout, stderr] = await exectAsync(cmd, options)
  debug.log('exec', `stdout: ${stdout}`)
  debug.log('exec', `stderr: ${stderr}`)
}
