import 'babel-polyfill'
import gulp from 'gulp'
import mocha from 'gulp-mocha'
import {debug} from '@kobiton/core-util'
import {build, nodemon, copy, Paths} from '@kobiton/core-build'
import moment from 'moment'
import BPromise from 'bluebird'
import server from 'gulp-express'
import webdriver from 'gulp-webdriver'

debug.enable('*')
global._mocha = {}
const env = process.env.NODE_ENV || 'test'

const scenarios = {
  'test-multiple-devices': 'src/e2e/durations/test-multiple-devices.js',
  'test-response-time': 'src/api/test-unavailable-devices-response-time.js',
  'test-desktop': 'src/desktop/test-*-page.js',
  'install-desktop-app': 'src/desktop/install-desktop-app.js'
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
// Define task for e2e test
gulp.task('build-e2e', build('src/e2e/**/*.js', 'build/e2e'))
gulp.task('build-desktop', build('src/desktop/**/*.js', 'build/desktop'))
gulp.task('test-e2e',['build-e2e','build-portal','build-core', 'build-desktop'], () => {
  return gulp.src('build/e2e/core/wdio.conf.js', {read: false})
  .pipe(webdriver())
})
