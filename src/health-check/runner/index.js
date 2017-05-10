import BPromise from 'bluebird'
import moment from 'moment'
import {errorToJSON} from '../../framework/util'

export async function execute(devices, test, options = {}) {
  const jobs = devices
    .map((device) => wrapExecution(test, device, onCompleted).then(onCompleted))

  function onCompleted({result, status}) {
    result.finishedAt = moment()
    return result
  }

  const results = await BPromise.all(jobs)
  return results
}

function wrapExecution(test, device) {
  const testCaseName = test.constructor.name
  const startedAt = moment()
  return (test
    .execute(device)
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
