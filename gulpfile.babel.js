import 'babel-polyfill'
import gulp from 'gulp'
import mocha from 'gulp-mocha'
import {debug} from '@kobiton/core-util'
import {build, nodemon, copy, Paths} from '@kobiton/core-build'
import moment from 'moment'
import BPromise from 'bluebird'
import server from 'gulp-express'

debug.enable('*')
global._mocha = {}
const env = process.env.NODE_ENV || 'test'
const scenarios = {
  'test-capabilities': 'src/capabilities/test.js',
  'test-multiple-devices': 'src/durations/test-multiple-devices.js',
  'test-response-time': 'src/durations/test-unavailable-devices-response-time.js',
  'test-session-duration': 'src/durations/test-session-duration.js'
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
gulp.task('copy-report-asset', copy(['src/report-viewer/**/*.html'], 'build/report-viewer'))
gulp.task('build-report', ['copy-report-asset'], build('src/report-viewer/**/*.js', 'build/report-viewer'))
gulp.task('report-viewer', ['build-report'], () => {
  server.run(['build/report-viewer/server.js'])
})

// Define run test with a specific scenario on test environment
Object.keys(scenarios).forEach((key) => {
  gulp.task(`${key}`, (cb) => {
    debug.log('test', 'run scenario: ' + key)
    runScenario(env, key).then(cb, cb)
  })
})
