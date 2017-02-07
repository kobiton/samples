import moment from 'moment'

export default function createMochaConfig(config = {}) {
  return {
    colors: true,
    slow: 100,
    reporter: config.reporter,
    reporterOptions: {
      reportDir: 'reports/' || config.reportDir,
      reportName: `${moment().format('YYYY-MM-DD-HH-mm')}` || config.reportName,
      reportTitle: 'Kobiton Test',
      inlineAssets: true,
      mochaFile: config.mochaFile
    },
    ui: 'bdd',
    timeout: moment.duration(6, 'hours').as('milliseconds')
  }
}
