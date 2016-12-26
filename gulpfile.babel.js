import 'babel-polyfill'
import gulp from 'gulp'
import mocha from 'gulp-mocha'
import {debug} from '@kobiton/core-util'
import {build, nodemon, copy, Paths} from '@kobiton/core-build'
import moment from 'moment'
import BPromise from 'bluebird'
import server from 'gulp-express'
import webdriver from 'gulp-webdriver'
import {cleanUpDesktopResourceData} from './src/core/desktop-util'
import * as downloader from './src/core/installation/downloader'
import {runManual} from './src/e2e/core/wdio-manual-test'

debug.enable('*')
global._mocha = {}
const env = process.env.NODE_ENV || 'test'

const scenarios = {
  'test-multiple-devices': 'src/e2e/durations/test-multiple-devices.js',
  'test-one-device': 'src/e2e/durations/test-one-device.js',
  'test-one-device-android-native-app': 'src/e2e/durations/test-one-device-android-native-app.js',
  'test-multiple-devices-android-native-app': 'src/e2e/durations/test-multiple-devices-android-native-app.js',
  'test-multiple-devices-wdio': 'src/e2e/mobile-web/test-multiple-devices-wdio.js',
  'test-one-device-wdio': 'src/e2e/mobile-web/test-one-device-wdio.js',
  'test-short-one-device': 'src/e2e/durations/test-short-one-device.js',
  'test-response-time': 'src/api/performance/test-unavailable-devices-response-time.js',
  'test-desktop': 'src/desktop/test-*-page.js',
  'test-api': 'src/api/test*.js'
}

function runAllScenarios(env) {
  return runMocha(env, Object.values(scenarios))
}

function runScenario(env, name) {
  return runMocha(env, scenarios[name])
}

function runMocha(env, srcFiles) {
  return new BPromise((resolve, reject) => {
    global._mocha.env = env
    const mochaOption = {
      timeout: moment.duration(6, 'hours').as('milliseconds'),
      clearRequireCache: true,
      reporter: 'mochawesome',
      reporterOptions: {
        globals: ['_mocha'],
        reportDir: 'reports/' + env,
        reportName: `${moment().format('YYYY-MM-DD-HH-mm')}`,
        reportTitle: 'Kobiton Test',
        inlineAssets: true
      }
    }
    gulp.src(srcFiles, {read: false})
    .pipe(mocha(mochaOption))
    .once('error', reject)
    .once('end', () => process.exit())
  })
}

for (const env of ['local', 'test', 'staging', 'production']) {
  gulp.task(`test:${env}`, (cb) => {
    runAllScenarios(env).then(cb, cb)
  })
}

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['test:test'])

// Define task to view reports on http://localhost:3000/
gulp.task('copy-report-asset', copy(['src/support/report-viewer/**/*.html', 'src/support/report-viewer/**/*.ejs'], 'build/support/report-viewer'))
gulp.task('build-report', ['copy-report-asset'], build('src/support/report-viewer/**/*.js', 'build/support/report-viewer'))
gulp.task('report-viewer', ['build-report'], () => {
  server.run(['build/support/report-viewer/server.js'])
  gulp.watch('src/support/report-viewer/*', () => {
       gulp.run('report-viewer')
   })
})

// Define run test with a specific scenario on test environment
Object.keys(scenarios).forEach((key) => {
  gulp.task(`${key}`, (cb) => {
    debug.log('test', 'run scenario: ' + key)
    runScenario(env, key).then(cb, cb)
  })
})

gulp.task('build-core', build(['src/core/**/*.js'], 'build/core'))
gulp.task('build-portal', build('src/portal/**/*.js', 'build/portal'))
gulp.task('test-portal', ['build-core', 'build-portal'], () => {
  return gulp.src('build/portal/core/wdio.conf.js', {read: false})
  .pipe(webdriver())
})

// Define task to download and install kobiton application
gulp.task('install-kobiton-app', async () => {
  let loginPage
  let error = false

  try {
    await cleanUpDesktopResourceData()
    await downloader.removeApp()

    const kobitonAppFile = await downloader.downloadApp()
    await downloader.installApp(kobitonAppFile)

    loginPage = new LoginPage()
    await loginPage.startApplication()
  }
  catch (err) {
    debug.error('gulpfile.babel:install-kobiton-app', err)
    error = true
  }
  finally {
    if (loginPage && loginPage.stopApplication) {
      await loginPage.stopApplication()
    }
  }

  if (error) {
    debug.log('gulpfile.babel:install-kobiton-app', 'exit')
    process.exit(-1)
  }
})

// Define task for e2e test
gulp.task('build-e2e', build('src/e2e/**/*.js', 'build/e2e'))

gulp.task('build-desktop', build('src/desktop/**/*.js', 'build/desktop'))

gulp.task('test-manual', ['build-e2e','build-portal','build-core', 'build-desktop'], async () => {
  try {
    await runManual()
  }
  catch(err) {
    debug.error('test-manual', err)
  }
})

gulp.task('test-e2e',['build-e2e','build-core'], () => {
  return gulp.src('build/e2e/core/wdio.conf.js', {read: false})
  .pipe(webdriver())
})
