import 'babel-core/register'
import 'babel-polyfill'
import gulp from 'gulp'
import mocha from 'gulp-mocha'

const servers = require('./src/helpers/servers')

process.env.REMOTE = 'test'
let mochaOption = {timeout: 900000,
                     clearRequireCache: true,
                     reporter: 'mochawesome',
                     reporterOptions: {
                       reportDir: 'reports/' + process.env.REMOTE,
                       reportName: process.env.REMOTE,
                       reportTitle: 'Kobiton Test',
                       inlineAssets: true}
                      }

let scenarios = new Map()
scenarios.set('test-capabilities', 'src/capabilities/test.js')
scenarios.set('test-first-device', 'src/durations/test-first-device.js')
scenarios.set('test-second-device', 'src/durations/test-second-device.js')
scenarios.set('test-all-devices', 'src/durations/test-all-devices.js')

//Common Function
const runAll = () => {
  const promise = new Promise((resolve) => {
    gulp.src(Array.from(scenarios.values()), {read: false})
        .pipe(mocha(mochaOption))
        .finally(resolve())
  })
  return promise
}

const runScenario = (name) => {
  const promise = new Promise((resolve) => {
    gulp.src(scenarios.get(name), {read: false})
        .pipe(mocha(mochaOption))
        .finally(resolve())
  })
  return promise
}

//Define test precondition
const envs = ['test', 'staging', 'production']
envs.forEach((env) => {
  gulp.task(`init-${env}`, async () => {
    console.log('init on ' + env)//eslint-disable-line no-console
    await servers.initServer()
    process.env.REMOTE = env
    mochaOption.reporterOptions.reportName = env
    mochaOption.reporterOptions.reportDir = 'reports/' + env
  })
})

//Define run all test on specific environment
gulp.task('default', ['test'])
envs.forEach((env) => {
  gulp.task(`${env}`, [`init-${env}`], () => {
    console.log('run test on:' + env)//eslint-disable-line no-console
    runAll()
  })
})

//Define run test with a specific scenario on test environment
Array.from(scenarios.keys()).forEach((key) => {
  gulp.task(`${key}`, ['init-test'], () => {
    runScenario(key)
  })
})

gulp.task('test-sequence-one-device', ['init-test'], async () => {
  await runScenario('test-first-device')
  await runScenario('test-second-device')
})
