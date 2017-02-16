import 'babel-polyfill'
import fs from 'fs'
import gulp from 'gulp'
import mocha from 'gulp-mocha'
import moment from 'moment'
import path from 'path'
import server from 'gulp-express'
import webdriver from 'gulp-webdriver'
import BPromise from 'bluebird'
import * as $ from '@kobiton/core-build'
import {debug} from '@kobiton/core-util'
import {build, nodemon, copy, Paths, clean} from '@kobiton/core-build'
import {cleanUpDesktopResourceData} from './src/core/desktop-util'
import createMochaConfig from './src/framework/config/mocha-conf'
import mochaConfigMap from './src/test/config/config-map'
import * as yargs from './src/framework/config/args'

debug.enable('*')

gulp.task('default', () => yargs.help())
gulp.task('help', () => yargs.help())

let argv = yargs.parse()

gulp.task('clean', clean([Paths.DIST, Paths.BUILD]))
gulp.task('build', ['clean'], build(['src/**/*.js'], 'build'))
gulp.task('run-test', ['build'], async () => {
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
      try {
        const runManual = require('./build/test/browser/manual/manual-setup')
        await runManual()
      }
      catch(err) {
        debug.error('test-manual', err)
      }
    break
    case 'summary-metrics':
      const metrics = require('./build/framework/common/metrics')
      await metrics.summaryMetrics()
      await clean([metrics.metricsRawDataFolder])()
    break
  }
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
    mochaFile: `reports/console/${moment().format('YYYY-MM-DD-HH-mm')}.xml`,
    reportDir: 'reports/console'
  })

  return gulp.src(inputPath, {read: false})
          .pipe(mocha(mochaOption))
}

function startUatTest(inputPath) {
  const mochaOption = createMochaConfig({
    reporter: argv.reporter,
    reportDir: 'reports/uat'
  })

  return gulp.src(inputPath, {read: false})
          .pipe(mocha(mochaOption))
}

// Define task to view reports on http://localhost:3000/
gulp.task('copy-report-asset',
  copy(['src/framework/common/report/viewer/**/*.html', 'src/framework/common/report/viewer/**/*.ejs'], // eslint-disable-line max-len
    'build/report/report-viewer'))
gulp.task('build-report',
  ['copy-report-asset'],
  build('src/framework/common/report/viewer/**/*.js', 'build/report/report-viewer'))
gulp.task('report-viewer', ['build-report'], () => {
  server.run(['build/report/report-viewer/server.js'])
  gulp.watch('src/report/report-viewer/*', () => {
    gulp.run('report-viewer')
  })
})

gulp.task('lint', $.lint())
