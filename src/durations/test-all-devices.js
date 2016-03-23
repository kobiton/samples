import {assert} from 'chai'
import servers from '../helpers/servers'
import test from './test'
import {debug} from '@kobiton/core-util'

describe('Run a short script with all of existing devices', () => {
  const onlineCaps = servers.getOnlineCaps()

  it('should be succesfully run a short test with all of existing devices parallel', async () => {
    debug.log('durations', onlineCaps.length)
    assert.isAtLeast(onlineCaps.length, 1, 'There should be atleast 1 online device')
    const jobs = onlineCaps.map((cap) => test.runTestShortDuration(cap))
    await Promise.all(jobs)
  })
})
