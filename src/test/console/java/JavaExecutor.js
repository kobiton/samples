import {debug} from '@kobiton/core-util'
import fs from 'fs'
import request from 'request'
import moment from 'moment'
import reporterAPI from '../../../framework/common/reporter/api'
import BPromise from 'bluebird'
import * as cmd from '../CmdExecutor'

const LIB_NAMES = ['io.appium:java-client']
const NUMBER_OF_VERSION = 2

export async function execute({
  dirPath = __dirname,
  libNames = LIB_NAMES,
  numberOfVersion = NUMBER_OF_VERSION,
  specificVersions,
  reportToServer = true
  } = {}) {
  const targetDir = dirPath || __dirname

  fs.unlinkSync(`${targetDir}/build.gradle`)

  await initPackages()
  
  await BPromise.mapSeries(libNames, async(libName) => {
    await getTargetLibraryVersions(
      libName,
      NUMBER_OF_VERSION,
      async (versions) => {
        const templatePath = `${targetDir}/gradle-template/build.gradle.template`
        const buildFilePath = `${targetDir}/build.gradle`
        const results = []
        for (const {v} of versions) {
          generateBuildFile(
            templatePath, buildFilePath,
            [
              {
                specifier: '<dependencyName>',
                value: libName
              },
              {
                specifier: '<dependencyVersion>',
                value: v
              }
            ]
          )
  
          debug.log(`execute test with ${libName} - ${v}`)

          //eslint-disable-next-line babel/no-await-in-loop
          const ls = await cmd.executeTestCmdSync(`cd ${targetDir} && gradle build --info`)
          results.push({
            language: 'java',
            libName,
            libVersion: v,
            checkedDate: moment().toDate(),
            state: ls.state,
            stdout: ls.stdout,
            stderr: ls.stderr,
            error: ls.error
          })
          reporterAPI.Availability.add(results, {parallelSending: true})
        }
      })
  })
}

async function initPackages() {
  await cmd.executeTestCmdSync('brew install gradle')
}

function getTargetLibraryVersions(libName, numberToTake, callback) {
  const groupName = libName.match(/.+?(?=:)/)[0]
  const artifactName = libName.match(/:(.*)/)[0].substr(1)
  return request.get(
    `http://search.maven.org/solrsearch/select?q=g:"${groupName}"+AND+a:"${artifactName}"&core=gav&rows=200&wt=json`,
    (err, response, data) => {
      if (!err) {
        const dataJson = JSON.parse(data)
        let versions = dataJson.response.docs.map((doc) => {
          return {
            id: doc.id,
            g: doc.g,
            a: doc.a,
            v: doc.v
          }
        })

        versions = filterVersions(versions, numberToTake)
        callback && callback(versions)
      }
      else {
        debug.log('Error while fetching library versions for ', libName)
        throw err
      }
    }
  )
}

function filterVersions(versions, numberToTake) {
  let filtered = versions.filter(({v}) => !v.includes('BETA'))
  return filtered.slice(versions, numberToTake)
}

function generateBuildFile(templatePath, desPath, formats) {
  const templateText = fs.readFileSync(templatePath, 'utf8')
  let outputText = templateText
  for (const f of formats) {
    outputText = outputText.replace(f.specifier, f.value)
  }
  fs.writeFileSync(desPath, outputText)
}
