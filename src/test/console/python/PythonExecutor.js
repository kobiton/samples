import {spawn} from 'child_process'
import {debug} from '@kobiton/core-util'
import BPromise from 'bluebird'
import request from 'request-promise'
import moment from 'moment'
import reporterAPI from '../../../framework/common/reporter/api'

const LIB_NAMES = ['Appium-Python-Client', 'selenium']
const NUMBER_OF_VERSION = 1
const ALL_TEST_SCRIPTS = ['androidWebTest', 'androidAppTest', 'iOSWebTest', 'iOSAppTest']

export async function execute({
  dirPath = __dirname,
  libNames = LIB_NAMES,
  numberOfVersion = NUMBER_OF_VERSION,
  specificVersions,
  testScripts = ALL_TEST_SCRIPTS,
  reportToServer = true
  } = {}) {
  const targetDir = dirPath || __dirname
  initPackages(targetDir)

  await BPromise.mapSeries(libNames, async(libName) => {
    let versions = specificVersions || (await getTargetPackageVersions(libName, numberOfVersion))

    const results = []

    await BPromise.mapSeries(versions, async(version) => {
      debug.log(`execute python test package: ${libName}-${version}`)
      //eslint-disable-next-line babel/no-await-in-loop
      const testResults = await executeTestScripts(targetDir, libName, version, testScripts)
      results.push(...testResults)
    })
    reportToServer && reporterAPI.Availability.add(results, {parallelSending: true})
  })
}

function initPackages(dirPath) {
  executeTestCmdSync(`cd ${dirPath} && pip3 install requests`)
}

async function getTargetPackageVersions(packageName, numberToTake) {
  const responseText = await request(`https://pypi.python.org/pypi/${packageName}/json`)
  const responseJson = JSON.parse(responseText)
  
  const allVersions = Object.keys(responseJson.releases)
    .filter((v) => !(v.includes('dev') || v.includes('rc') || v.includes('b')))
  allVersions.sort(compare)

  return allVersions.slice(allVersions.length - numberToTake, allVersions.length)
}

function compare(v1, v2) {
  const parsedV1 = parseVersion(v1)
  const parsedV2 = parseVersion(v2)

  for (let i = 0; i < v1.length; i++) {
    if (parsedV1[i] > parsedV2[i]) return 1
    if (parsedV1[i] < parsedV2[i]) return -1
  }

  return 0
}

function parseVersion(version) {
  const parts = version.split('.').map((e) => {
    return (!e || isNaN(e)) ? 0 : Math.max(parseInt(e, 10), 0)
  })

  while (parts.length < 3) {
    parts.push(0)
  }

  return parts
}

async function executeTestScripts(dirPath, libName, libVersion, testScripts) {
  debug.log(`Execute Python3 Test with ${libName} - ${libVersion}`)

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
  await executeTestCmdSync(`${setUpCmd}`)
  debug.log(`${testCaseName}.py`)
  let testResult = await executeTestCmdSync(`cd ${dirPath}/tests && python3 ${testCaseName}.py`)
  testResult.testCaseName = testCaseName
  return testResult
}

async function executeTestCmdSync(cmd) {
  const ls = await spawnSyncWrap(cmd)
  debug.log('status:', ls && ls.stdout || '')
  debug.log('err:', ls && ls.stderr || '')
  debug.log('stderr:', ls && ls.error || '')
  return {
    language: '',
    libName: '',
    libVersion: '',
    testCaseName: '',
    checkedDate: moment().toDate(),
    state: ls.status === 0 ? 'passed' : 'failed',
    stdout: ls && ls.stdout || '',
    stderr: ls && ls.stderr || '',
    error: ls && ls.error || ''
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
