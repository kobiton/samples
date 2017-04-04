import {debug} from '@kobiton/core-util'
import mocha from 'mocha'
import db from './db/index'
import {extractEmmbedMetadata} from '../../util'

export default class MochaTestCaseReporter extends mocha.reporters.Base {
  constructor(runner, config) {
    super(runner)

    this._runner = runner
    this._testCases = []
    this._suitesMap = {}

    runner.on('suite', (suite) => {
      if (suite.title !== '') {
        debug.log('Suite: ', suite.title)
        const suiteModel = {
          title: suite.title,
          parentTitle: suite.parent.title,
          metadata: extractEmmbedMetadata(suite.title)
        }

        this._suitesMap[suite.title] = suiteModel
      }
    })
    .on('test', (test) => {
      debug.log('   Test case: ', test.title)
      const tcModel = this._createTestCaseModel(test)
      tcModel.start = new Date()
      this._testCases.push(tcModel)
    })
    .on('end', () => {
      this._integrateExecutionData()
      this._writeReportData(() => {
        db.closeConnection()
        this.epilogue()
      })
    })
  }

  _createTestCaseModel(test) {
    const tcModel = {
      testCaseName: test.title,
      specHash: test.specHash,
      result: null, // result will be fill on end event
      parents: this._getAllParents(test.parent.title),
      metadata: extractEmmbedMetadata(test.title),
      file: test.file
    }
    return tcModel
  }

  _getAllParents(parentName) {
    const parents = []

    let currentParentName = parentName
    while (currentParentName !== '') {
      const suite = this._suitesMap[currentParentName]
      parents.unshift(suite.title)
      currentParentName = suite.parentTitle
    }

    return parents
  }

  _integrateExecutionData() {
    try {
      const runnerInfo = this._runner
      const rawTests = this._extractTestCases(runnerInfo)
      for (let rawTestCase of rawTests) {
        const testCase = this._getTestCase(rawTestCase.parentTitle, rawTestCase.title)
        if (testCase) {
          testCase.duration = rawTestCase.duration
          testCase.state = this._getState(rawTestCase)
          testCase.error = this._errorJSON(rawTestCase.err)

          const parentSuite = this._suitesMap[rawTestCase.parentTitle] || {}
          testCase.metadata = {
            ...parentSuite.metadata,
            ...testCase.metadata
          }
        }
      }
    }
    catch (err) {
      debug.error('_integrateExecutionData err:', err.message)
    }
  }

  _getTestCase(suiteName, testCaseName) {
    const filterResults = this._testCases.filter((t) => {
      const closestParentName = t.parents[t.parents.length - 1] || ''
      const result = (t.testCaseName === testCaseName) && (closestParentName === suiteName)
      return result
    })
    return filterResults[0]
  }

  _getState(rawTestCase) {
    let state = rawTestCase.state

    if (rawTestCase.pending) {
      state = 'skipped'
    }

    return state
  }

  _extractTestCases(runner) {
    const testSuitesQueue = []
    const testCasesQueue = []

    testSuitesQueue.push(runner.suite)

    while (testSuitesQueue.length > 0) {
      const suite = testSuitesQueue.pop()

      suite.suites.forEach((s) => {
        suite.parentTitle = suite.title
      })
      testSuitesQueue.push(...suite.suites)

      suite.tests.forEach((t) => {
        if (t) {
          t.parentTitle = suite.title
          testCasesQueue.push(t)
        }
      })
    }

    return testCasesQueue
  }

  _writeReportData(done) {
    db.TestCase.create(this._testCases, (err) => {
      if (err) {
        debug.error('_writeReportData save error: ', err.message)
      }
      done && done()
    })
  }

  /**
  * Transform `error` into a JSON object.
  *
  * @api private
  * @param {Error} err
  * @return {Object}
  */
  _errorJSON(err) {
    const res = {}
    if (err) {
      Object.getOwnPropertyNames(err).forEach(function (key) {
        res[key] = err[key]
      }, err)
    }
    return res
  }
}
