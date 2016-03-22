import '../helpers/setup'
import servers from '../helpers/servers'
import test from './test'

describe('Google Search on the second device', () => {
  const cap = servers.getOnlineCaps()[1]

  it('should search Google with short duration', async() => {
    await test.runTestShortDuration(cap)
  })

  it('should search Google with long duration', async() => {
    await test.runTestLongDuration(cap)
  })
})
