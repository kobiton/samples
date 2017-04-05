import moment from 'moment'
import MochaTestCaseReporter from '../common/reporter/mocha-testcase-reporter'

export default function createMochaConfig(config = {}) {
  return {
    colors: true,
    slow: 100,
    reporter: config.reporter || MochaTestCaseReporter,
    reporterOptions: {
      reportDir: 'reports/' || config.reportDir,
      reportName: config.reportName || `${moment().format('YYYY-MM-DD-HH-mm')}`,
      reportTitle: 'Kobiton Test',
      inlineAssets: true,
      mochaFile: config.mochaFile
    },
    ui: 'bdd',
    timeout: moment.duration(6, 'hours').as('milliseconds')
  }
}
