import childProcess from 'child_process'
import fs from 'fs'
import moment from 'moment'
import {debug} from '@kobiton/core-util'
import reporterAPI from '../../../framework/common/reporter/api'

const spawnSync = childProcess.spawnSync

const LIB_NAME = 'wd'
const NUMBER_OF_VERSION = 2

export async function execute(dirPath) {
  const targetDir = dirPath || __dirname

  const versions = await getDependencyVersions(LIB_NAME, NUMBER_OF_VERSION)

  const results = []
  for (const v of versions) {
    debug.log(`Execute JS test - lib: ${LIB_NAME} version: ${v}`)

    const templatePath = `${targetDir}/template/package.json.template`
    const destinationPath = `${targetDir}/package.json`
    generatePakageJson(templatePath, destinationPath, LIB_NAME, v)

    const ls = spawnSync(`cd ${targetDir} && yarn install && yarn test`,
      [],
      {shell: true, encoding: 'utf8'}
    )

    debug.log('stderr:', ls.stderr)
    debug.log('status:', ls.status)
    debug.log('err:', ls.error)

    results.push({
      language: 'javascript',
      libName: LIB_NAME,
      libVersion: v,
      checkedDate: moment().toDate(),
      state: ls.status === 0 ? 'passed' : 'failed',
      stdout: ls.stdout,
      stderr: ls.stderr,
      error: ls.error
    })
  }

  reporterAPI.Availability.add(results, {parallelSending: true})
}

async function getDependencyVersions(packageName, numberOfVersion) {
  const ls = spawnSync(`npm show ${packageName} versions`,
    [],
    {
      shell: true, encoding: 'utf8'
    }
  )

  if (ls.err) {
    throw ls.err
  }

  const stdout = ls.stdout.trim()

  const allVersions = stdout.replace(/(\r\n|\n|\r|\[|\]|'|\s)/gm, '').split(',')

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
