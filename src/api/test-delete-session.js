import {debug} from '@kobiton/core-util'
import {assert} from 'chai'
import {getSessions, getUserInfo, deleteSessionDetail} from '../core/portal-api'

describe('Verify delete session detail', () => {

  it('DELETE /sessions/sessionId should delete an already session successfully', async () => {
    const token = (await getUserInfo()).token
    const sessionId = await _getSessionId({token})

    const deleteSessionMessage = await deleteSessionDetail({token, sessionId})

    debug.log('test-delete-session', JSON.stringify(deleteSessionMessage))
    assert.equal('OK', deleteSessionMessage)
  })

 /**
  * This function is to get a complete sessionId
  */
  async function _getSessionId({token, state = 'COMPLETE'}) {
    debug.log('test-delete-session', `${token} : ${state}`)
    const sessions = await getSessions({token, page: 1, size: 20})
    const foundSession = sessions.find((session) => {
      debug.log(JSON.stringify(session))
      return session.state === state
    })
    return foundSession.id
  }
})
