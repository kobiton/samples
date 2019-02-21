import BPromise from 'bluebird'
import {spawn} from 'child_process'
import moment from 'moment'
import {debug} from '@kobiton/core-util'

export async function executeTestCmdSync(cmd) {
  const ls = await _spawnCmd(cmd)
  return {
    language: '',
    libName: '',
    libVersion: '',
    testCaseName: '',
    checkedDate: moment().toDate(),
    state: ls.state,
    stdout: ls.stdout,
    stderr: ls.stderr,
    error: ls.error
  }
}

function _spawnCmd(command) {
  debug.log('spawn:', command)
  let stdoutData = ''
  let stderrData = ''

  return new BPromise((resolve, reject) => {
    let ls = spawn(command, [], {shell: true, encoding: 'utf8'})

    ls.stdout.on('data', (chunk) => {
      stdoutData += chunk
    })

    ls.stderr.on('data', (chunk) => {
      stderrData += chunk

    })

    ls.on('close', (code) => {
      debug.log(`child process close with code ${code}`)
      resolve({
        state: code === 0 ? 'passed' : 'failed',
        stdout: stdoutData,
        stderr: stderrData
      })
    })
  })
}

export function compareVersions(v1, v2) {
  const parsedV1 = _parseVersion(v1)
  const parsedV2 = _parseVersion(v2)

  for (let i = 0; i < v1.length; i++) {
    if (parsedV1[i] > parsedV2[i]) return 1
    if (parsedV1[i] < parsedV2[i]) return -1
  }

  return 0
}

function _parseVersion(version) {
  const parts = version.split('.').map((e) => {
    return (!e || isNaN(e)) ? 0 : Math.max(parseInt(e, 10), 0)
  })

  while (parts.length < 3) {
    parts.push(0)
  }

  return parts
}
