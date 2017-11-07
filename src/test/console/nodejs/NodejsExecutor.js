import {spawn} from 'child_process'
import BPromise from 'bluebird'
import fs from 'fs'
import moment from 'moment'
import {debug} from '@kobiton/core-util'
import reporterAPI from '../../../framework/common/reporter/api'

debug.enable('*')

const LIB_NAME = 'wd'
const NUMBER_OF_VERSION = 2

export async function executeSeleniumWebDriverCheck({dirPath, testCmd}) {
  await execute({
    dirPath,
    libName: 'selenium-webdriver',
    numberOfVersion: 3,
    command: testCmd,
    reportToServer: false
  })
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

export async function execute({
  dirPath = __dirname,
  libName = LIB_NAME,
  numberOfVersion = NUMBER_OF_VERSION,
  specificVersions,
  command = 'yarn test',
  reportToServer = true
} = {}) {
  const targetDir = dirPath
  debug.log('execute at:', targetDir)

  const versions = specificVersions || (await getDependencyVersions(libName, numberOfVersion))
  debug.log(`execute lib ${libName}:`, versions)

  const results = []
  for (const v of versions) {
    debug.log(`Execute JS test - lib: ${libName} version: ${v}`)

    const templatePath = `${targetDir}/template/package.json.template`
    const destinationPath = `${targetDir}/package.json`
    generatePakageJson(templatePath, destinationPath, libName, v)

    const ls = await spawnSyncWrap(`cd ${targetDir} && yarn install && ${command}`)

    results.push({
      language: 'javascript',
      libName,
      libVersion: v,
      checkedDate: moment().toDate(),
      state: ls.status === 0 ? 'passed' : 'failed',
      stdout: ls.stdout,
      stderr: ls.stderr,
      error: ls.error
    })
  }

  reportToServer && reporterAPI.Availability.add(results, {parallelSending: true})
}

async function getDependencyVersions(packageName, numberOfVersion) {
  const ls = await spawnSyncWrap(`npm show ${packageName} versions`)

  if (ls.err) {
    throw ls.err
  }

  const stdout = ls.stdout.trim()

  const allVersions = stdout.replace(/(\r\n|\n|\r|\[|\]|'|\s)/gm, '')
    .split(',')
    .filter((v) => !v.toLowerCase().includes('beta'))

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
