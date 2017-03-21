import createMochaConfig from '../../framework/config/mocha-conf'
import MochaTestCaseReporter from '../../framework/common/metrics/mocha-testcase-reporter'

export default function createConfig({reporter, reportDir, reportName, mochaFile} = {}) {
  const defaultConfig = createMochaConfig()
  return {
    ...defaultConfig,
    reporter: reportName || MochaTestCaseReporter,
    delay: true
  }
}
