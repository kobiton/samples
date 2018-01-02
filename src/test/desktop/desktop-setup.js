import {debug} from '@kobiton/core-util'
import {Launcher} from 'webdriverio'

export default function () {
  const wdio = new Launcher('build/test/desktop/wdio.conf.js')
  wdio.run().then(function (code) {
    process.exit(code)
  }, function (error) {
    debug.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
  })
}
