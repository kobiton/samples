import {spawnSync} from 'child_process'
import {debug} from '@kobiton/core-util'
import request from 'request-promise'
import moment from 'moment'
import reporterAPI from '../../../framework/common/reporter/api'

const LIB_NAME = 'selenium'
const VERSION_TO_CHECK = 2

export async function execute(dirPath) {
  const targetDir = dirPath || __dirname
  const versions = await getTargetPackageVersions(LIB_NAME, VERSION_TO_CHECK)

  const results = []
  initPackages(targetDir)
  for (const v of versions) {
    debug.log(`execute python test package: ${LIB_NAME}-${v}`)

    const testResults = executeTestScripts(targetDir, LIB_NAME, v)
    results.push(...testResults)
  }

  reporterAPI.Availability.add(results, {parallelSending: true})
}

function initPackages(dirPath) {
  executeTestCmdSync(`cd ${dirPath} && pip3 install requests`)
}

async function getTargetPackageVersions(packageName, numberToTake) {
  const responseText = await request(`https://pypi.python.org/pypi/${packageName}/json`)
  const responseJson = JSON.parse(responseText)
  const allVersions = Object.keys(responseJson.releases)
    .sort()
    .filter((v) => !(v.includes('dev') || v.includes('rc')))

  return allVersions.slice(allVersions.length - numberToTake, allVersions.length)
}

function executeTestScripts(dirPath, libName, libVersion) {
  debug.log('   ---- Execute Python3 Test ----')

  const results = []
  let testCaseResult = null

  testCaseResult = executeTestCase(dirPath, libName, libVersion, 'androidWebTest')
  results.push(testCaseResult)

  testCaseResult = executeTestCase(dirPath, libName, libVersion, 'androidAppTest')
  results.push(testCaseResult)

  testCaseResult = executeTestCase(dirPath, libName, libVersion, 'iOSWebTest')
  results.push(testCaseResult)

  testCaseResult = executeTestCase(dirPath, libName, libVersion, 'iOSAppTest')
  results.push(testCaseResult)

  results.forEach((rs) => {
    rs.language = 'python3'
    rs.libName = libName
    rs.libVersion = libVersion
  })
  return results
}

function executeTestCase(dirPath, libName, libVersion, testCaseName) {
  const setUpCmd = `cd ${dirPath}/tests && pip3 install ${libName}==${libVersion}`

  debug.log(`${testCaseName}.py`)
  let testResult = executeTestCmdSync(`${setUpCmd} && python3 ${testCaseName}.py`)
  testResult.testCaseName = testCaseName
  return testResult
}

function executeTestCmdSync(cmd) {
  const ls = executeCmdSync(cmd)
  debug.log('status:', ls.status)
  debug.log('err:', ls.error)
  debug.log('stderr:', ls.stderr)
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

function executeCmdSync(cmd, options = {}) {
  const ls = spawnSync(cmd,
    [],
    {shell: true, encoding: 'utf8', ...options}
  )

  return ls
}
