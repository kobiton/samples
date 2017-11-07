import fs from 'fs'
import request from 'request-promise'
import Url from 'url'
import {debug} from '@kobiton/core-util'
import * as cmd from '../CmdExecutor'
import configs from '../../../framework/config/test'
import reporterAPI from '../../../framework/common/reporter/api'

const LIB_NAME = 'appium/php-client'
const NUMBER_OF_VERSION = 2

const composer = 'php /usr/local/bin/composer.phar'

export async function execute({
  dirPath = __dirname,
  libName = LIB_NAME,
  numberOfVersion = NUMBER_OF_VERSION,
  specificVersions,
  reportToServer = true
} = {}) {
  const targetDir = dirPath || __dirname
  const versions = specificVersions || (await getTargetPackageVersions(libName, numberOfVersion))

  await initPackages(targetDir)
  const results = []
  for (const v of versions) {
    debug.log(`execute php test package: ${libName} - ${v}`)

    // eslint-disable-next-line babel/no-await-in-loop
    const testResults = await executeTestScripts(targetDir, libName, v)

    results.push(...testResults)
  }

  reportToServer && (await reporterAPI.Availability.add(results, {parallelSending: true}))
}

async function initPackages(dirPath) {
  debug.log('Start initializing packages')
  await cmd.spawnSyncWrap(`cd ${dirPath} && ${composer} install`)
}

async function getTargetPackageVersions(packageFullName, numberToTake) {
  const vendor = packageFullName.match(/^.*?(?=\/)/)[0]
  const packageName = packageFullName.match(/[^/]*$/)[0]
  const responseText = await request(`https://packagist.org/packages/${vendor}/${packageName}.json`)
  const responseJson = JSON.parse(responseText)
  const allVersions = Object.keys(responseJson.package.versions)
    .filter((v) => !(v.includes('dev') || v.includes('rc')))
    .map((v) => v.replace('v', ''))
    .sort()

  return allVersions.slice(allVersions.length - numberToTake, allVersions.length)
}

async function executeTestScripts(dirPath, libName, libVersion) {
  debug.log('   ---- Execute php Test ----')

  let results = []

  switch (libName) {
    case 'facebook/webdriver':
      const remoteWebResults = await executeRemoteWebTest(dirPath, libName, libVersion)
      results = results.concat(remoteWebResults)
      break
    case 'appium/php-client':
      const appResults = await executeAppTest(dirPath, libName, libVersion)
      results = results.concat(appResults)
      break
  }

  results.forEach((rs) => {
    rs.language = 'php'
    rs.libName = libName
    rs.libVersion = libVersion
  })
  return results
}

async function executeRemoteWebTest(dirPath, libName, libVersion) {
  const results = []
  let testCaseResult = await executeTestCase(dirPath, libName, libVersion, 'androidWebTest')
  results.push(testCaseResult)

  testCaseResult = await executeTestCase(dirPath, libName, libVersion, 'iOSWebTest')
  results.push(testCaseResult)

  return results
}

async function executeAppTest(dirPath, libName, libVersion) {
  const results = []

  await prepareAppTestCase(dirPath, libName, 'androidAppTest', 'Android')
  let tcResult = await executeTestCase(dirPath, libName, libVersion, 'androidAppTest')
  results.push(tcResult)

  await prepareAppTestCase(dirPath, libName, 'iOSAppTest', 'iOS')
  tcResult = await executeTestCase(dirPath, libName, libVersion, 'iOSAppTest')
  results.push(tcResult)

  return results
}

async function prepareAppTestCase(rootDir, libName, testCaseName, devicePlatform) {
  const dirPath = `${rootDir}/${libName.replace('/', '-')}`
  const templatePath = `${dirPath}/template/${testCaseName}.php.template`
  const templateContent = fs.readFileSync(templatePath, 'utf8')

  const device = await reporterAPI.Device.getOnlineDevice(devicePlatform)
  const outputText = templateContent
    .replace('<automation-host>', (await getPHPAutomationHost()))
    .replace('<automation-port>', '80')
    .replace('<automation-session-name>', `[Multi-version-check PHP] App sesstion ${testCaseName}`)
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

async function executeTestCase(rootDir, libName, libVersion, testCaseName) {
  const setUpCmd = `cd ${rootDir} && ${composer} require "${libName}=${libVersion}"`

  debug.log(`${testCaseName}.php`)
  const testCaseFolderName = libName.replace('/', '-')
  let testResult = await cmd.spawnSyncWrap(
    `${setUpCmd} && vendor/phpunit/phpunit/phpunit ${testCaseFolderName}/${testCaseName}.php`)
    .catch((err) => {
      return err
    })
  testResult.testCaseName = testCaseName
  return testResult
}
