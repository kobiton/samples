import moment from 'moment'
import testServerReporter from './test-server'
import testConfig from '../../framework/config/test'

export async function report(results) {
  const testCases = results.map((rs) => {
    return {
      reportName: 'Health-Check Reporter',
      testCaseName: rs.testCaseName,
      specHash: '',
      file: rs.testCaseName,
      start: rs.startedAt.toDate(),
      duration: moment.duration(rs.finishedAt.diff(rs.startedAt)).asMilliseconds(),
      state: rs.state,
      environment: testConfig.environment,
      parents: '',
      metadata: rs.device,
      runner: '',
      error: rs.err
    }
  })

  const reporter = testServerReporter
  await reporter.add(testCases)
}
