import moment from 'moment'
import testConfig from '../../framework/config/test'
import apiReporter from '../../framework/common/reporter/api'

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

  await apiReporter.TestCase.add(testCases)
}
