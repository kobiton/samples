import 'babel-polyfill'
import fs from 'fs'
import gulp from 'gulp'
import mocha from 'gulp-mocha'
import plumber from 'gulp-plumber'
import moment from 'moment'
import path from 'path'
import server from 'gulp-express'
import webdriver from 'gulp-webdriver'
import BPromise from 'bluebird'
import * as $ from '@kobiton/core-build'
import {debug} from '@kobiton/core-util'
import {build, nodemon, copy, Paths, clean} from '@kobiton/core-build'
import mochaConfigMap from './src/test/config/config-map'
import * as yargs from './src/framework/config/args'

debug.enable('*')

gulp.task('default', () => yargs.help())
gulp.task('help', () => yargs.help())

let argv = yargs.parse()

gulp.task('clean', clean([Paths.DIST, Paths.BUILD]))
gulp.task('copy-external-tests', ['clean'], copy(['src/test/console/**/!(*.js)'], 'build/test/console/'))
gulp.task('build', ['copy-external-tests'], build(['src/**/*.js'], 'build'))
gulp.task('run-test', async () => {
  // Initialize value for test such as: default url, username, password
  const preSetupTests = require('./build/test/setup.js')
  await preSetupTests()

  //Execute test base on 'task' then 'input'
  let taskName = argv.task
  if (taskName) {
    return executeDefinedTask(taskName)
  } else {
    let inputPath = argv.input
    if (inputPath.includes('/console')) {
      return startConsoleTests('./build/test' + inputPath)
    } else {
      throw new Error(`File path ${inputPath} is not valid.`)
    }
  }

})

async function executeDefinedTask(taskName) {
  switch (taskName) {
    case 'test-ui':
      return await startUiTest()
    case 'test-aut':
      return await startAutTest()
    case 'multi-version-check':
      return startMultipleVersionCheck(argv.input)
    case 'health-check':
      return await startHealthCheck(argv.input)
  }
}

async function startUiTest() {
  try {
    const launchBrowser = require('./build/test/browser/browser-setup')
    await launchBrowser()
  }
  catch(err) {
    debug.error('test-ui', err)
  }
}

async function startAutTest() {
  try {
    const setupDesktop = require('./build/test/desktop/desktop-setup')
    await setupDesktop()
  }
  catch(err) {
    debug.error('test-aut', err)
  }
}

async function startMultipleVersionCheck(language) {
  const languageExecutorMap = {
    ruby: './build/test/console/ruby/RubyExecutor',
    java: './build/test/console/java/JavaExecutor',
    dotnet: './build/test/console/dotnet/DotNetExecutor',
    nodejs: './build/test/console/nodejs/NodejsExecutor',
    python: './build/test/console/python/PythonExecutor',
    php: './build/test/console/php/PHPExecutor'
  }

  if (language && languageExecutorMap[language]) {
    debug.log('startMultipleVersionCheck language:', language)
    const executor = require(languageExecutorMap[language])
    await executor.execute()
  }
  else {
    throw new Error(`Not valid language: ${language}` )
  }
}

async function startHealthCheck(type) {
  const healthChecker = require('./build/health-check')
  switch (type) {
    case 'daily-web':
      return healthChecker.executeWebCheck()
    case 'android-app':
      return healthChecker.executeAndroidAppCheck()
    case 'ios-app':
      return healthChecker.executeIOSAppCheck()
  }
}

const defaultMochaConfigSrc = './src/framework/config/mocha-conf'
function getMochaConfigMethod(inputPath) {
  const fileName = path.basename(inputPath)
  const mochaConfigSrc = mochaConfigMap[fileName] || defaultMochaConfigSrc
  return require(mochaConfigSrc)
}

function startConsoleTests(inputPath) {
  if (fs.lstatSync(inputPath).isDirectory()) {
    inputPath = path.join(inputPath, '**/*.js')
  }
  const getMochaConfig = getMochaConfigMethod(inputPath)
  const mochaOption = getMochaConfig({
    reporter: argv.reporter,
    reportName: argv.reportName,
    mochaFile: `reports/console/${moment().format('YYYY-MM-DD-HH-mm')}.xml`,
    reportDir: 'reports/console'
  })

  return gulp.src(inputPath, {read: false})
          .pipe(plumber())
          .pipe(mocha(mochaOption))
}

gulp.task('lint', $.lint())
