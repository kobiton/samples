import {debug} from '@kobiton/core-util'
import {assert} from 'chai'
import {getSessions, getUserInfo, deleteSessionDetail} from '../core/portal-api'

describe('Session detail:', () => {

  it('DELETE /sessions/sessionId should delete an already session successfully', async () => {
    const token = (await getUserInfo()).token
    const sessionId = await _getSessionId({token})

    const deleteSessionMessage = await deleteSessionDetail({token, sessionId})

    assert.equal('OK', deleteSessionMessage)
  })

 /**
  * This function is to get a complete/timeout/error sessionId
  */
  async function _getSessionId({token}) {
    const states = ['COMPLETE', 'TIMEOUT', 'ERROR']
    const sessions = await getSessions({token, page: 1, size: 20})
    const foundSession = sessions.find((session) => {
      debug.log('test-delete-session: session', `${session.id}: ${session.state}`)
      return (states.includes(session.state))
    })
    debug.log('test-delete-session:found session', JSON.stringify(foundSession))
    return foundSession.id
  }
})
