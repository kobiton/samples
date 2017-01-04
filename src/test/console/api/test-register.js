import {assert} from 'chai'
import apiData from './_data'
import api from '../../../framework/api'
import moment from 'moment'
import validator from 'is-my-json-valid'

describe('API / Register', () => {
  const validate = validator(apiData.getRegisterSchema(), apiData.getFormatsConfiguration())

  it('Should create a new account successfully', async () => {
    const {fullname, username, password, email} = apiData.generateUser()

    const startedAt = moment.utc()
    const body = await api.User.registerAccount({fullname, username, password, email})
    const endedAt = moment.utc()
    const duration = endedAt.diff(startedAt, 'milliseconds')

    // Follow the documents http://zurb.com/article/830/response-times-the-3-important-limits
    assert.isBelow(duration, 10000, `${duration} should less than 10s`)
    const isJsonRegisterSchemaValid = validate(body)
    assert.isTrue(isJsonRegisterSchemaValid, `${JSON.stringify(validate.errors)}`)
  })

  it('Should return error if input already email', async () => {
    const {fullname, username, password} = apiData.generateUser()
    const email = (await api.User.login()).user.email

    try {
      const body = await api.User.registerAccount({fullname, username, password, email})
      const isJsonRegisterSchemaValid = validate(body)
      assert.isNotTrue(isJsonRegisterSchemaValid,
        `should not register with already email: ${email}`)
    }
    catch (err) {
      // This's an expected error
      assert.equal('Email already exists', err.message)
    }
  })

  it('Should return error register with existing username', async () => {
    const {fullname, password, email} = apiData.generateUser()
    const username = (await api.User.login()).user.username

    try {
      const body = await api.User.registerAccount({fullname, username, password, email})
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
