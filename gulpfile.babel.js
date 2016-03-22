import 'babel-polyfill'
import gulp from 'gulp'
import mocha from 'gulp-mocha'
import {debug} from '@kobiton/core-util'
import servers from './src/helpers/servers'

process.env.REMOTE = 'test'
const mochaOption = {
  timeout: 900000,
  clearRequireCache: true,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'reports/' + process.env.REMOTE,
    reportName: process.env.REMOTE,
    reportTitle: 'Kobiton Test',
    inlineAssets: true
  }
}
const scenarios = {
  'test-capabilities': 'src/capabilities/test.js',
  'test-first-device': 'src/durations/test-first-device.js',
  'test-second-device': 'src/durations/test-second-device.js',
  'test-all-devices': 'src/durations/test-all-devices.js',
  'test-response-time': 'src/durations/test-unavailable-devices-response-time.js'
}
debug.enable('test|capabilities|durations|helpers')
// Common Function
const runAllScenarios = () => {
  return new Promise((resolve) => {
    gulp.src(Object.values(scenarios), {read: false})
        .pipe(mocha(mochaOption))
        .once('error', (err) => {
          debug.error('test', err)
        })
        .once('end', (result) => {
          debug.log('test', 'run all scenario done')
        })
  })
}

const runScenario = (name) => {
  return new Promise((resolve) => {
    gulp.src(scenarios[name], {read: false})
         .pipe(mocha(mochaOption))
         .once('error', (err) => {
           debug.error('test', err)
         })
         .once('end', (result) => {
           debug.log('test', `run scenario ${name} done`)
         })
  })
}

const envs = ['test', 'staging', 'production']
envs.forEach((env) => {
  // Define test precondition
  gulp.task(`init-${env}`, async () => {
    debug.log('test', `init-${env}`)
    process.env.REMOTE = env
    mochaOption.reporterOptions.reportName = env
    mochaOption.reporterOptions.reportDir = 'reports/' + env
    return servers.initServer()
  })
  // Define run all test on specific environment
  gulp.task(`${env}`, [`init-${env}`], () => {
    debug.log('test', 'run all scenarios on:' + env)
    return runAllScenarios()
  })
})

// Define run all test on specific environment
gulp.task('default', ['test'])

// Define run test with a specific scenario on test environment
Object.keys(scenarios).forEach((key) => {
  gulp.task(`${key}`, ['init-test'], () => {
    debug.log('test', 'run scenario ' + key)
    return runScenario(key)
  })
})

gulp.task('test-sequence-one-device', ['init-test'], async () => {
  await runScenario('test-first-device')
  await runScenario('test-second-device')
})
