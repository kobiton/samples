import moment from 'moment'
import path from 'path'

global._mocha = {}
const env = process.env.NODE_ENV || 'test'
global._mocha.env = env
const reportFolder = `reports/${env}/${moment().format('YYYY-MM-DD-HH-mm')}`
const jUnitReportFile = process.env.REPORT_FILE || './reports/e2e-test-result.xml'
const jUnitReportFileName = path.basename(jUnitReportFile)
const jUnitReportDir = path.dirname(jUnitReportFile)
const base = require('../../core/wdio.conf')

exports.config = {
  ...base.config,
  logLevel: 'error',
  specs: ['build/e2e/manual/test-manual.js'],
  reporterOptions: {
    outputDir: reportFolder,
    junit: {
      outputDir: jUnitReportDir,
      outputFileFormat: () => jUnitReportFileName
    }
  }
}
