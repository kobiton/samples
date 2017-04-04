import {EventEmitter} from 'events'
import {debug} from '@kobiton/core-util'
import db from './db/index'
import {extractEmmbedMetadata} from '../../util'

class WdioTestCaseReporter extends EventEmitter {
  constructor(baseReporter, config, options = {}) {
    super()

    this._baseReporter = baseReporter
    this._config = config
    this._options = options
    this._report = {
      reportName: this._options.reportName,
      testSuites: []
    }
    this._suitesMap = {}
    this._testCases = []

    this
      .on('suite:start', (suite) => {
        const suiteModel = {
          title: suite.title,
          parentTitle: suite.parent,
          specHash: suite.specHash,
          metadata: extractEmmbedMetadata(suite.title)
        }

        this._suitesMap[suite.title] = suiteModel
      })
      .on('test:end', (test) => {
        const tcModel = this._createTestCaseModel(test)
        this._testCases.push(tcModel)
      })
      .on('end', (test) => {
        this._integrateExecutionData()
        this._writeReportData(() => {
          db.closeConnection()
        })
      })
  }

  _createTestCaseModel(test) {
    const tcModel = {
      reportName: this._options.reportName,
      testCaseName: test.title,
      specHash: test.specHash,
      file: test.file,
      state: null, // result will be fill on end event
      parents: this._getAllParents(test.parent),
      metadata: extractEmmbedMetadata(test.title),
      runner: test.runner,
      error: null // wil be fill on end event
    }

    return tcModel
  }

  _getAllParents(parentName) {
    const parents = []

    let currentParentName = parentName
    let isRootSuite = false
    while (!isRootSuite) {
      const suite = this._suitesMap[currentParentName]
      parents.unshift(suite.title)
      currentParentName = suite.parentTitle
      isRootSuite = suite.title === suite.parentTitle
    }

    return parents
  }

  _getSuiteByName(name) {
    return this._suitesMap[name]
  }

  _integrateExecutionData() {
    for (let cid of Object.keys(this._baseReporter.stats.runners)) {
      const runnerInfo = this._baseReporter.stats.runners[cid]
      this._report.start = this._baseReporter.stats.start
      this._report.end = this._baseReporter.stats.end

      for (let specId of Object.keys(runnerInfo.specs)) {
        const spec = runnerInfo.specs[specId]

        for (let suiteUid of Object.keys(spec.suites)) {
          const suite = spec.suites[suiteUid]

          for (let testUid of Object.keys(suite.tests)) {
            const testName = suite.tests[testUid].title
            const testCase = this._getTestCase(suite.title, testName)

            if (testCase) {
              const rawTestCase = suite.tests[testUid]
              testCase.start = rawTestCase.start
              testCase.end = rawTestCase.end
              testCase.duration = rawTestCase.duration
              testCase.state = this._getState(rawTestCase)
              testCase.error = rawTestCase.error

              const parentSuite = this._suitesMap[suite.title] || {}
              testCase.metadata = {
                ...parentSuite.metadata,
                ...testCase.metadata
              }
            }
          }
        }
      }
    }
  }

  _getTestCase(suiteName, testCaseName) {
    const filterResults = this._testCases.filter((t) => {
      const closestParentName = t.parents[t.parents.length - 1] || ''
      return (t.testCaseName === testCaseName) && (closestParentName === suiteName)
    })
    return filterResults[0]
  }

  _writeReportData(done) {
    db.TestCase.create(this._testCases, (err) => {
      if (err) {
        debug.error('_writeReportData save error: ', err.message)
      }

      done && done()
    })
  }

  _getState(rawTestCase) {
    let state = rawTestCase.state

    if (state === 'pending') {
      state = 'skipped'
    }

    return state
  }
}

WdioTestCaseReporter.reporterName = 'WdioTestCaseReporter'
export default WdioTestCaseReporter
