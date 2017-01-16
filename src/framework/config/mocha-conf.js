import moment from 'moment'

const defaultConfigs = {
  colors: true,
  slow: 100,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'reports/',
    reportName: `${moment().format('YYYY-MM-DD-HH-mm')}`,
    reportTitle: 'Kobiton Test',
    inlineAssets: true
  },
  ui: 'bdd',
  timeout: moment.duration(6, 'hours').as('milliseconds')
}

export default function createMochaConfig(config = {}) {
  return {
    ...defaultConfigs,
    reporter: config.reporter,
    reporterOptions: {
      ...defaultConfigs.reporterOptions,
      reportDir: config.reportDir,
      reportName: config.reportName,
      mochaFile: config.mochaFile
    }
  }
}
