import BPromise from 'bluebird'
import config from '../../config/test'
import {androidNativeAppScript} from './android-native-app-script'
import {androidHybridAppScript} from './android-hybrid-app-script'
import {iOSNativeAppScript} from './ios-native-app-script'
import {iOSHybridAppScript} from './ios-hybrid-app-script'
import {fullApisAndroidScript} from './full-apis-android-script'
import {fullApisIosScript} from './full-apis-ios-script'

const expectedDurationInSeconds = config.expectedDurationInMinutes * 60

export async function nativeAppCheck(timeStamp, targetDevice) {
  const platform = targetDevice[0].platformName
  if (platform === 'Android') {
    return await execute(
      timeStamp,
      targetDevice,
      expectedDurationInSeconds,
      androidNativeAppScript
    )
  }
  else if (platform === 'iOS') {
    return await execute(
      timeStamp,
      targetDevice,
      expectedDurationInSeconds,
      iOSNativeAppScript
    )
  }
  else {
    throw new Error('There is not target device')
  }
}

export async function hybridAppCheck(timeStamp, targetDevice) {
  const platform = targetDevice[0].platformName
  if (platform === 'Android') {
    return await execute(
      timeStamp,
      targetDevice,
      expectedDurationInSeconds,
      androidHybridAppScript
    )
  }
  else if (platform === 'iOS') {
    return await execute(
      timeStamp,
      targetDevice,
      expectedDurationInSeconds,
      iOSHybridAppScript
    )
  }
  else {
    throw new Error('There is not target device')
  }
}

export async function fullApisCheck(timeStamp, targetDevice) {
  const platform = targetDevice[0].platformName
  if (platform === 'Android') {
    return await execute(
      timeStamp,
      targetDevice,
      expectedDurationInSeconds,
      fullApisAndroidScript
    )
  }
  else if (platform === 'iOS') {
    return await execute(
      timeStamp,
      targetDevice,
      expectedDurationInSeconds,
      fullApisIosScript
    )
  }
  else {
    throw new Error('There is not target device')
  }
}

async function execute(timeStamp, onlineDevice, expectedDuration, runScript) {
  const jobs = onlineDevice
    .map((cap) => runScript(timeStamp, cap, expectedDuration))
    .map((promise) => reflect(promise).then(onComplete))

  const finishedJobs = await BPromise.all(jobs)
  const errors = []
  let successCount = 0
  finishedJobs.forEach((job) => {
    if (job.resolved) {
      successCount++
    }
    if (job.err) {
      errors.push(job.err)
    }
  })

  function onComplete({status, err}) {
    return {
      resolved: status === 'resolved',
      err
    }
  }

  return {
    resolvedJobs: successCount,
    errors
  }
}

function reflect(promise) {
  return promise.then(
    function (value) {
      return {value, status: 'resolved'}
    },
    function (err) {
      return {err, status: 'rejected'}
    }
  )
}
