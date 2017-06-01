import {debug} from '@kobiton/core-util'
import BPromise from 'bluebird'
import childProcess from 'child_process'
import moment from 'moment'
import os from 'os'
import request from 'request'
import reporterAPI from '../../../framework/common/reporter/api'

const requestAsync = BPromise.promisify(request, {multiArgs: true})

const LIB_NAME = 'appium.webdriver'

export async function execute(dirPath) {
  const targetDir = dirPath || __dirname
  const executableFile = `${targetDir}/MobileAutomation/bin/Debug/MobileAutomation.exe`

  const results = []
  const latestVersion = await getLatestPackageVersion(LIB_NAME)

  const spawnSync = childProcess.spawnSync
  const exeCommand = getExectuteCommand(executableFile)
  const ls = spawnSync(
    `cd ${targetDir} && nuget update Kobiton.sln && msbuild && ${exeCommand}`,
    [],
    {
      shell: true, encoding: 'utf8'
    }
  )

  debug.log('status:', ls.status)
  debug.log('stderr:', ls.stderr)
  debug.log('err:', ls.error)

  results.push({
    language: '.Net',
    libName: LIB_NAME,
    libVersion: latestVersion,
    checkedDate: moment().toDate(),
    state: ls.status === 0 ? 'passed' : 'failed',
    stdout: ls.stdout,
    stderr: ls.stderr,
    error: ls.error
  })
  reporterAPI.Availability.add(results)
}

function getExectuteCommand(executableFile) {
  const isWin = /^win/.test(os.platform())
  if (isWin) {
    return executableFile
  }
  else {
    return `mono ${executableFile}`
  }
}

async function getLatestPackageVersion(packageName) {
  const [response, resBody] = await requestAsync({
    url: `https://www.nuget.org/api/v2/package-versions/${packageName}`,
    method: 'get'
  })

  if (response.statusCode >= 400) {
    const bodyMsg = (resBody instanceof String) ? resBody : JSON.stringify(resBody)
    throw new Error(`statusCode: ${response.statusCode}, body message: ${bodyMsg}`)
  }

  const versions = JSON.parse(resBody).sort()
  return versions[versions.length - 1]

}
