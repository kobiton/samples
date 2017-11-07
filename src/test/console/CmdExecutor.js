import BPromise from 'bluebird'
import {spawn, spawnSync} from 'child_process'
import moment from 'moment'
import {debug} from '@kobiton/core-util'

export function executeTestCmdSync(cmd) {
  const ls = executeCmdSync(cmd)
  return {
    language: '',
    libName: '',
    libVersion: '',
    testCaseName: '',
    checkedDate: moment().toDate(),
    state: ls.status === 0 ? 'passed' : 'failed',
    stdout: ls.stdout,
    stderr: ls.stderr,
    error: ls.error
  }
}

export function executeCmdSync(cmd, options = {}) {
  debug.log(cmd)
  const ls = spawnSync(cmd,
    [],
    {shell: true, encoding: 'utf8', ...options}
  )
  debug.log('status:', ls.status)
  debug.log('err:', ls.error)
  debug.log('output', ls.output)

  return ls
}

export function spawnSyncWrap(command, {
  printCommand = true,
  targetStdOut = process.stdout,
  targetStdErr = process.stderr
} = {}) {
  printCommand && debug.log('spawnSync:', command)

  return new BPromise((resolve, reject) => {
    const ls = spawn(command, [], {shell: true, encoding: 'utf8'})
    ls.stdout.pipe(targetStdOut)
    ls.stderr.pipe(targetStdErr)

    let stdoutData = ''
    ls.stdout.on('data', (data) => {
      stdoutData += data
    })

    let stderrData = ''
    ls.stderr.on('error', (data) => {
      stderrData += data
    })

    ls.on('close', (code) => {
      debug.log(`child process exited with code ${code}`)

      if (code !== 0) {
        reject({stdout: stdoutData, stderr: stderrData})
      }
      else {
        resolve(new Error(stdoutData + '\n' + stderrData))
      }
    })
  })
}
