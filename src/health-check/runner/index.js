import BPromise from 'bluebird'
import moment from 'moment'
import {errorToJSON} from '../../framework/util'

export async function execute(timeStamp, targetDevices, expectedDuration, test,
  options = {}) {
  const jobs = targetDevices
    .map((device) => wrapExecution(
      timeStamp, device, expectedDuration, test, onCompleted
    ).then(onCompleted))

  function onCompleted({result, status}) {
    result.finishedAt = moment()
    return result
  }

  const results = await BPromise.all(jobs)
  return results
}

function wrapExecution(timeStamp, device, expectedDuration, test) {
  const testCaseName = test.constructor.name
  const startedAt = moment()
  return (test
    .execute(timeStamp, device, expectedDuration)
    .then(
      () => {
        const result = createResult({testCaseName, device, startedAt, state: 'passed'})
        return {result, status: 'resolved'}
      },
      (err) => {
        const result = createResult(
          {testCaseName, device, startedAt, state: 'failed', err: errorToJSON(err)}
        )
        return {result, status: 'rejected'}
      }
    ))
}

export function createResult({testCaseName, device, startedAt, finishedAt, state, err} = {}) {
  return {
    testCaseName,
    device,
    startedAt,
    finishedAt,
    state,
    err
  }
}
