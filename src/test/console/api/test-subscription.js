import {assert} from 'chai'
import api from '../../../framework/api'
import validator from 'is-my-json-valid'
import apiData from './_data'

describe('API / Login', () => {
  const validate = validator(apiData.getFormatsSubscription())

  it('Should get Subscription successfully', async () => {
    const body = await api.User.getSubscription()
    const isJsonValid = validate(body)
    assert.isTrue(isJsonValid, 'The format of Subscription is valid.')
  })

})
