import BPromise from 'bluebird'
import fs from 'fs'
import {debug} from '@kobiton/core-util'
import reporterAPI from '../../../framework/common/reporter/api'
import * as cmd from '../CmdExecutor'

debug.enable('*')

const LIB_NAMES = ['wd', 'selenium-webdriver']
const NUMBER_OF_VERSION = 2

export async function execute({
  dirPath = __dirname,
  libNames = LIB_NAMES,
  numberOfVersion = NUMBER_OF_VERSION,
  specificVersions,
  reportToServer = true
  } = {}) {
  const targetDir = dirPath
  debug.log('execute at:', targetDir)

  await BPromise.mapSeries(libNames, async(libName) => {
    const versions = specificVersions || (await getTargetPackageVersions(libName, numberOfVersion))
    debug.log(`execute lib ${libName}:`, versions)
    const results = []
    await BPromise.mapSeries(versions, async(version) => {
      debug.log(`execute Javascript test package: ${libName} - ${version}`)

      const templatePath = `${targetDir}/template/package.json.template`
      const destinationPath = `${targetDir}/package.json`
      generatePakageJson(templatePath, destinationPath, libName, version)
      // eslint-disable-next-line babel/no-await-in-loop
      let testResults = await executeTestScripts(targetDir, libName, version)

      results.push(...testResults)
    })
    reportToServer && reporterAPI.Availability.add(results, {parallelSending: true})
  })
}

async function getTargetPackageVersions(libName, numberOfVersion) {
  const ls = await cmd.executeTestCmdSync(`npm show ${libName} versions`)
  let allVersions = ls.stdout.replace(/(\r\n|\n|\r|\[|\]|'|\s)/gm, '')
    .split(',')
    .filter((v) => !(v.toLowerCase().includes('beta') || v.toLowerCase().includes('alpha')))
  allVersions.sort(cmd.compareVersions)

  const sliceBegin = allVersions.length - numberOfVersion
  const sliceEnd = allVersions.length
  return allVersions.slice(sliceBegin, sliceEnd)
}

function generatePakageJson(templatePath, destPath, packageName, version) {
  const fileContent = fs.readFileSync(templatePath, {encoding: 'utf8'})
  const packageJson = JSON.parse(fileContent)
  packageJson.devDependencies[packageName] = version
  fs.writeFileSync(destPath, JSON.stringify(packageJson))
}

async function executeTestScripts(dirPath, libName, libVersion) {
  debug.log('   ---- Execute Javascript Test ----')

  let results = []
  const testResults = await cmd.executeTestCmdSync(`cd ${dirPath} && yarn install && yarn ${libName}-test`) // eslint-disable-line max-len
  results.push(testResults)
  
  results.forEach((rs) => {
    rs.language = 'javascript'
    rs.libName = libName
    rs.libVersion = libVersion
  })
  return results
}
