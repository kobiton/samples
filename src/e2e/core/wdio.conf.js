import moment from 'moment'
import path from 'path'
import {debug} from '@kobiton/core-util'

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
  specs: ['build/e2e/test-*.js'],
  reporterOptions: {
    outputDir: reportFolder,
    junit: {
      outputDir: jUnitReportDir,
      outputFileFormat: () => jUnitReportFileName
    }
  }
}

debug.log('wdio.conf:e2e', JSON.stringify(exports.config))
