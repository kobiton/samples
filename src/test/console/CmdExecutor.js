import {spawnSync} from 'child_process'
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
