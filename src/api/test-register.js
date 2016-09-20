import {generateUser, registerSchema, formatsConfiguration} from './core/data'
import {getUserInfo, registerAccount} from '../core/portal-api'
import {debug} from '@kobiton/core-util'
import {assert} from 'chai'
import moment from 'moment'
import validator from 'is-my-json-valid'

describe('Register account api:', () => {
  const validate = validator(registerSchema, formatsConfiguration)

  it('POST /users function should create an account successfully', async () => {
    const {fullname, username, password, email} = generateUser()
    const startedAt = moment.utc()

    const body = await registerAccount({fullname, username, password, email})

    const endedAt = moment.utc()
    const duration = endedAt.diff(startedAt, 'milliseconds')
    debug.log('test-register-api:body', JSON.stringify(body))
    // Follow the documents http://zurb.com/article/830/response-times-the-3-important-limits
    assert.isBelow(duration, 10000, `${duration} should less than 10s`)
    const isJsonRegisterSchemaValid = validate(body)
    assert.isTrue(isJsonRegisterSchemaValid, `${JSON.stringify(validate.errors)}`)
  })

  it('POST /users should return error if input already email', async () => {
    const {fullname, username, password} = generateUser()
    const email = (await getUserInfo()).user.email

    try {
      const body = await registerAccount({fullname, username, password, email})
      const isJsonRegisterSchemaValid = validate(body)
      assert.isNotTrue(isJsonRegisterSchemaValid,
        `should not register with already email: ${email}`)
    }
    catch (err) {
      // This's an expected error
      assert.equal('Email already exists', err.message)
    }
  })

  it('POST /users should return error if input already username', async () => {
    const {fullname, password, email} = generateUser()
    const username = (await getUserInfo()).user.username

    try {
      const body = await registerAccount({fullname, username, password, email})
      const isJsonRegisterSchemaValid = validate(body)
      assert.isNotTrue(isJsonRegisterSchemaValid,
        `should not register with already username: ${username}`)
    }
    catch (err) {
      // This's an expected error
      assert.equal('Username already exists', err.message)
    }
  })
})
