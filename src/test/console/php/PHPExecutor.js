import fs from 'fs'
import request from 'request-promise'
import Url from 'url'
import {debug} from '@kobiton/core-util'
import * as cmd from '../CmdExecutor'
import configs from '../../../framework/config/test'
import reporterAPI from '../../../framework/common/reporter/api'

const LIB_NAME = 'appium/php-client'
const VERSION_TO_CHECK = 2

const composer = 'php /usr/local/bin/composer.phar'

export async function execute(dirPath) {
  const targetDir = dirPath || __dirname
  const versions = await getTargetPackageVersions(LIB_NAME, VERSION_TO_CHECK)

  initPackages(targetDir)
  const results = []
  for (const v of versions) {
    debug.log(`execute php test package: ${LIB_NAME}-${v}`)

    // eslint-disable-next-line babel/no-await-in-loop
    const testResults = await executeTestScripts(targetDir, LIB_NAME, v)

    results.push(...testResults)
  }

  await reporterAPI.Availability.add(results, {parallelSending: true})
}

function initPackages(dirPath) {
  debug.log('Start initializing packages')
  cmd.executeCmdSync(`cd ${dirPath} && ${composer} install`)
}

async function getTargetPackageVersions(packageFullName, numberToTake) {
  const vendor = packageFullName.match(/^.*?(?=\/)/)[0]
  const packageName = packageFullName.match(/[^/]*$/)[0]
  const responseText = await request(`https://packagist.org/packages/${vendor}/${packageName}.json`)
  const responseJson = JSON.parse(responseText)
  const allVersions = Object.keys(responseJson.package.versions)
    .sort()
    .filter((v) => !(v.includes('dev') || v.includes('rc')))
    .map((v) => v.replace('v', ''))

  return allVersions.slice(allVersions.length - numberToTake, allVersions.length)
}

async function executeTestScripts(dirPath, libName, libVersion) {
  debug.log('   ---- Execute php Test ----')

  const results = []
  let testCaseResult = null

  testCaseResult = executeTestCase(dirPath, libName, libVersion, 'androidWebTest')
  results.push(testCaseResult)

  await prepareAppTestCase(dirPath, 'androidAppTest', 'Android')
  testCaseResult = executeTestCase(dirPath, libName, libVersion, 'androidAppTest')
  results.push(testCaseResult)

  testCaseResult = executeTestCase(dirPath, libName, libVersion, 'iOSWebTest')
  results.push(testCaseResult)

  await prepareAppTestCase(dirPath, 'iOSAppTest', 'iOS')
  testCaseResult = executeTestCase(dirPath, libName, libVersion, 'iOSAppTest')
  results.push(testCaseResult)

  results.forEach((rs) => {
    rs.language = 'php'
    rs.libName = libName
    rs.libVersion = libVersion
  })
  return results
}

async function prepareAppTestCase(dirPath, testCaseName, devicePlatform) {
  const templatePath = `${dirPath}/template/${testCaseName}.php.template`
  const templateContent = fs.readFileSync(templatePath, 'utf8')

  const device = await reporterAPI.Device.getOnlineDevice(devicePlatform)
  const outputText = templateContent
    .replace('<automation-host>', (await getPHPAutomationHost()))
    .replace('<automation-port>', '80')
    .replace('<automation-session-name>', `[Multi-version-check] App sesstion ${testCaseName}`)
    .replace('<automation-session-description>', `Check multiple version for ${testCaseName}`)
    .replace('<automation-deviceName>', device.deviceName)
    .replace('<automation-platformName>', device.platformName)
    .replace('<automation-platformVersion>', device.platformVersion)

  const targetTestCaseFile = `${dirPath}/${testCaseName}.php`
  if (fs.existsSync(targetTestCaseFile)) {
    fs.unlinkSync(targetTestCaseFile)
  }
  fs.writeFileSync(targetTestCaseFile, outputText)
}

async function getPHPAutomationHost() {
  const apiKey = await reporterAPI.Key.getApiKey()

  const apiUrl = Url.parse(configs.apiUrl)
  return `${apiKey.username}:${apiKey.key}@${apiUrl.hostname}`
}

function executeTestCase(dirPath, libName, libVersion, testCaseName) {
  const setUpCmd = `cd ${dirPath} && ${composer} require "${libName}=${libVersion}"`

  debug.log(`${testCaseName}.php`)
  let testResult = cmd.executeTestCmdSync(
    `${setUpCmd} && vendor/phpunit/phpunit/phpunit ${testCaseName}.php`)
  testResult.testCaseName = testCaseName
  return testResult
}
