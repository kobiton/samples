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
    if (inputPath.includes('/browser')) {
      return startBrowserTests('./build/test' + inputPath)
    } else if (inputPath.includes('/console')) {
      return startConsoleTests('./build/test' + inputPath)
    } else {
      return startUatTest(inputPath)
    }
  }

})

async function executeDefinedTask(taskName) {
  switch (taskName) {
    case 'test-manual':
      return await startManualTest()
      break
    case 'test-ruby':
      return await startRubyTest()
      break
  }
}

async function startManualTest() {
  try {
    const runManual = require('./build/test/browser/manual/manual-setup')
    await runManual()
  }
  catch(err) {
    debug.error('test-manual', err)
  }
}

async function startRubyTest() {
  const JSExecutor = require('./build/test/console/ruby/JSExecutor')
  await JSExecutor.executeRubyTest()
}

function startBrowserTests(inputPath) {
  if (fs.lstatSync(inputPath).isDirectory()) {
    inputPath = path.join(inputPath, 'wdio.conf.js')
  }

  const getMochaConfig = getMochaConfigMethod(inputPath)
  const mochaOption = getMochaConfig({
    reporter: argv.reporter, 
    reportDir: 'reports/browser'
  })

  return gulp.src(inputPath, {read: false})
          .pipe(plumber())
          .pipe(webdriver(mochaOption))
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
