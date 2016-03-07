import 'babel-core/register'
import 'babel-polyfill'
import gulp from 'gulp'
import mocha from 'gulp-mocha'
const servers = require('./src/helpers/servers')
const remoteOption = {test:'test',staging:'staging', production:'production'}

let mochaOption = {timeout: 900000,
                     clearRequireCache: true,
                     reporter: 'mochawesome',
                     reporterOptions: {
                                      reportDir: 'reports/'+remoteOption.test,
                                      reportName: remoteOption.test,
                                      reportTitle: 'customReportTitle',
                                      inlineAssets: true}
                      }

let scenarios = new Map()
scenarios.set('capabilities', 'src/capabilities/test.js')
scenarios.set('test-device-one', 'src/durations/test-first-device.js')
scenarios.set('test-device-two', 'src/durations/test-second-device.js')
scenarios.set('test-all-devices', 'src/durations/test-all-devices.js')

//Common Function
const runAll = () => {
  const promise  = new Promise((resolve) => {
    gulp.src(Array.from(scenarios.values()), {read: false})
        .pipe(mocha(mochaOption))
        .finally(resolve())
      })
    return promise
}

const runScenario = (name) => {
  const promise  = new Promise((resolve) => {
    gulp.src(scenarios.get(name), {read: false})
        .pipe(mocha(mochaOption))
        .finally(resolve())
      })
  return promise
}
//Define test on specific environment
gulp.task('default',['test'])
gulp.task('test', () => {
  runAll()
})
gulp.task('staging',['init-staging'], () => {
  runAll()
})
gulp.task('production',['init-production'], () => {
  runAll()
})

//Define test precondition
gulp.task('init-staging', () => {
  servers.init(remoteOption.staging)
  mochaOption.reporterOptions.reportName = remoteOption.staging
  mochaOption.reporterOptions.reportDir = 'reports/'+ remoteOption.staging
})
gulp.task('init-production', () => {
  servers.init(remoteOption.production)
  mochaOption.reporterOptions.reportName = remoteOption.production
  mochaOption.reporterOptions.reportDir = 'reports/'+ remoteOption.production
})

//Define test scenarios
gulp.task('test-device-one', () => {
  runScenario('test-device-one')
})

gulp.task('test-device-two', () => {
  runScenario('test-device-two')
})

gulp.task('test-all-devices', () => {
  runScenario('test-all-devices')
})

gulp.task('test-capabilities', () => {
  runScenario('capabilities')
})

gulp.task('test-sequence-one-device',async () => {
 await runScenario('test-device-one')
 await runScenario('test-device-one')
})
