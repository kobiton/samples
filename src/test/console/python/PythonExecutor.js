import {debug} from '@kobiton/core-util'
import BPromise from 'bluebird'
import request from 'request-promise'
import reporterAPI from '../../../framework/common/reporter/api'
import * as cmd from '../CmdExecutor'

const LIB_NAMES = ['Appium-Python-Client', 'selenium']
const NUMBER_OF_VERSION = 2
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
      reportToServer && reporterAPI.Availability.add(results, {parallelSending: true})
    })
  })
}

function initPackages(dirPath) {
  cmd.executeTestCmdSync(`cd ${dirPath} && pip3 install requests`)
}

async function getTargetPackageVersions(packageName, numberToTake) {
  const responseText = await request(`https://pypi.python.org/pypi/${packageName}/json`)
  const responseJson = JSON.parse(responseText)
  
  const allVersions = Object.keys(responseJson.releases)
    .filter((v) => !(v.includes('dev') || v.includes('rc') || v.includes('b')))
  allVersions.sort(cmd.compareVersions)

  return allVersions.slice(allVersions.length - numberToTake, allVersions.length)
}

async function executeTestScripts(dirPath, libName, libVersion, testScripts) {
  debug.log(`Execute Python3 Test with ${libName} - ${libVersion}`)
  const setUpCmd = `cd ${dirPath}/tests && pip3 install ${libName}==${libVersion}`
  await cmd.executeTestCmdSync(`${setUpCmd}`)

  const results = []
  let testCaseResult = null

  for (const scriptName of testScripts) {
    //eslint-disable-next-line babel/no-await-in-loop
    testCaseResult = await cmd.executeTestCmdSync(`cd ${dirPath}/tests && python3 ${scriptName}.py`)
    testCaseResult.testCaseName = scriptName
    results.push(testCaseResult)
  }

  results.forEach((rs) => {
    rs.language = 'python3'
    rs.libName = libName
    rs.libVersion = libVersion
  })
  return results
}
