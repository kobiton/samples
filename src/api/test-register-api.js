import {generateUser, registerSchema, formatsConfiguration} from './core/data'
import * as api from './core/api'
import {debug} from '@kobiton/core-util'
import {assert} from 'chai'
import moment from 'moment'
import validator from 'is-my-json-valid'

describe('Verify register account api', () => {

  it('POST /users function should work successfully', async () => {
    const {fullname, username, password, email} = generateUser()
    const startedAt = moment.utc()

    const [response, body] = await api.registerAccount({fullname, username, password, email})

    const endedAt = moment.utc()
    const duration = endedAt.diff(startedAt, 'milliseconds')
    debug.log('test-register-api:body', JSON.stringify(body))
    assert.equal(response.statusCode, 200, `${response.statusCode} should equal 200`)
    // Follow the documents http://zurb.com/article/830/response-times-the-3-important-limits
    assert.isBelow(duration, 10000, `${duration} should less than 10s`)
    const validate = validator(registerSchema, formatsConfiguration)
    const isJsonRegisterSchemaValid = validate(body)
    assert.isTrue(isJsonRegisterSchemaValid, `${JSON.stringify(validate.errors)}`)
  })
})
