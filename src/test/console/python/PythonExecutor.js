import {spawn} from 'child_process'
import {debug} from '@kobiton/core-util'
import BPromise from 'bluebird'
import request from 'request-promise'
import moment from 'moment'
import reporterAPI from '../../../framework/common/reporter/api'

const LIB_NAME = 'selenium'
const NUMBER_OF_VERSION = 2
const ALL_TEST_SCRIPTS = ['androidWebTest', 'androidAppTest', 'iOSWebTest', 'iOSAppTest']

export async function execute({
  dirPath = __dirname,
  libName = LIB_NAME,
  numberOfVersion = NUMBER_OF_VERSION,
  specificVersions,
  testScripts = ALL_TEST_SCRIPTS,
  reportToServer = true
} = {}) {
  const targetDir = dirPath || __dirname
  const versions = specificVersions || (await getTargetPackageVersions(libName, numberOfVersion))

  const results = []
  initPackages(targetDir)
  for (const v of versions) {
    debug.log(`execute python test package: ${libName}-${v}`)

    //eslint-disable-next-line babel/no-await-in-loop
    const testResults = await executeTestScripts(targetDir, libName, v, testScripts)
    results.push(...testResults)
  }

  reportToServer && reporterAPI.Availability.add(results, {parallelSending: true})
}

function initPackages(dirPath) {
  executeTestCmdSync(`cd ${dirPath} && pip3 install requests`)
}

async function getTargetPackageVersions(packageName, numberToTake) {
  const responseText = await request(`https://pypi.python.org/pypi/${packageName}/json`)
  const responseJson = JSON.parse(responseText)
  const allVersions = Object.keys(responseJson.releases)
    .filter((v) => !(v.includes('dev') || v.includes('rc')))
    .sort()

  return allVersions.slice(allVersions.length - numberToTake, allVersions.length)
}

async function executeTestScripts(dirPath, libName, libVersion, testScripts) {
  debug.log('   ---- Execute Python3 Test ----')

  const results = []
  let testCaseResult = null

  for (const scriptName of testScripts) {
    //eslint-disable-next-line babel/no-await-in-loop
    testCaseResult = await executeTestCase(dirPath, libName, libVersion, scriptName)
    results.push(testCaseResult)
  }

  results.forEach((rs) => {
    rs.language = 'python3'
    rs.libName = libName
    rs.libVersion = libVersion
  })
  return results
}

async function executeTestCase(dirPath, libName, libVersion, testCaseName) {
  const setUpCmd = `cd ${dirPath}/tests && pip3 install ${libName}==${libVersion}`

  debug.log(`${testCaseName}.py`)
  let testResult = await executeTestCmdSync(`${setUpCmd} && python3 ${testCaseName}.py`)
  testResult.testCaseName = testCaseName
  return testResult
}

async function executeTestCmdSync(cmd) {
  const ls = await spawnSyncWrap(cmd)
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

function spawnSyncWrap(command, {
  targetStdOut = process.stdout,
  targetStdErr = process.stderr
} = {}) {
  debug.log('spawnSync:', command)

  return new BPromise((resolve) => {
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
      resolve({stdout: stdoutData, stderr: stderrData})
    })
  })
}
