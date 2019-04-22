import * as cmd from '../CmdExecutor'
import fs from 'fs'
import reporterAPI from '../../../framework/common/reporter/api'
import BPromise from 'bluebird'
import {debug} from '@kobiton/core-util'

const LIB_NAMES = ['selenium-webdriver', 'appium_lib']
const NUMBER_OF_VERSION = 2

export async function execute({
  dirPath = __dirname,
  libNames = LIB_NAMES,
  numberOfVersion = NUMBER_OF_VERSION,
  specificVersions,
  reportToServer = true
  } = {}) {
  await init()
  await BPromise.mapSeries(libNames, async(libName) => {
    const versions = specificVersions || (await getTargetPackageVersions(libName, numberOfVersion))
    const results = []
    await BPromise.mapSeries(versions, async(version) => {
      await generateGemfile(dirPath, version, libName)
      const testResults = await executeTest(libName, version)
      results.push(...testResults)
    })
    reportToServer && reporterAPI.Availability.add(results, {parallelSending: true})
  })
}

async function init() {
  await cmd.executeTestCmdSync('curl -sSL https://get.rvm.io | bash -s stable --ruby')
  await cmd.executeTestCmdSync('gem install bundle')
}

async function getTargetPackageVersions(libName, numberOfVersion) {
  let ls = await cmd.executeTestCmdSync(`gem list --exact ${libName} --remote --all`)
  let allVersions = ls.stdout.replace(/selenium-webdriver|appium_lib|[() ]|\n/g, '').split(',')
  allVersions.sort(cmd.compareVersions)
  return allVersions.slice(allVersions.length - numberOfVersion, allVersions.length)
}

async function generateGemfile(dirPath, version, libName) {
  fs.readFile(dirPath + '/Gemfile.template', 'utf8', function (err, data) {
    if (err) return err
    let result = data.replace(/<bundle-name>/g, libName)
    .replace(/<bundle-version>/g, version)
  
    fs.writeFile(dirPath + '/Gemfile', result, 'utf8', function (err) {
      if (err) return err
    })
  })
}

async function executeTest(libName, version) {
  debug.log(`---- Execute Ruby Test ${libName}: ${version} ----`)
  let results
  await cmd.executeTestCmdSync(`gem uninstall ${libName} -a -I`)
  await cmd.executeTestCmdSync(`cd ${__dirname} && bundle update`)
  switch (libName) {
    case 'selenium-webdriver':
      results = await executeSeleniumTest()
      break
    case 'appium_lib':
      results = await executeAppiumTest()
      break
  }
  results.forEach((rs) => {
    rs.language = 'ruby'
    rs.libName = libName
    rs.libVersion = version
  })
  return results
}

async function executeSeleniumTest() {
  const results = []
  let testCaseResult = null
  let testScript = ['AndroidWebTest', 'IOSWebTest']
  let path = `${__dirname}/Tests/Selenium`
  for (const scriptName of testScript) {
    //eslint-disable-next-line babel/no-await-in-loop
    testCaseResult = await cmd.executeTestCmdSync(`cd ${path} && ruby ${scriptName}.rb`)
    testCaseResult.testCaseName = scriptName
    results.push(testCaseResult)
  }
  return await BPromise.all(results)
}

async function executeAppiumTest() {
  const results = []
  let testCaseResult = null
  let testScript = ['AndroidWebTest', 'IOSWebTest', 'AndroidAppTest', 'IOSAppTest']
  let path = `${__dirname}/Tests/Appium`
  for (const scriptName of testScript) {
    //eslint-disable-next-line babel/no-await-in-loop
    testCaseResult = await cmd.executeTestCmdSync(`cd ${path} && ruby ${scriptName}.rb`)
    testCaseResult.testCaseName = scriptName
    results.push(testCaseResult)
  }
  return await BPromise.all(results)
}
