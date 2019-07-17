import {assert} from 'chai'
import api from '../../../framework/api'
import config from '../../../framework/config/test'
import apiData from './_data'
import {set} from 'lodash'

const {username1: username, password1: password} = {...config}
let token
let cleanupPolicyId

let samplePolicies
let checkPolicies
let uncheckPolicies

let checkAllPolicies
let uncheckAllPolicies
let uncheckAndroidPolicies
let uncheckiOSPolicies

describe('API / Cleanup Policies', () => {
  before(async () => {
    token = await api.CleanupPolicy.getBearerToken(username, password)

    const [cleanupPolicyInfo] = await api.CleanupPolicy.getCleanupPolicyInfo(token)
    cleanupPolicyId = cleanupPolicyInfo['data']['id']

    uncheckPolicies = apiData.getUncheckPolicies()
    checkPolicies = apiData.getCheckPolicies()
    samplePolicies = apiData.getSamplePolicies()
  })

  it('should check all cleanup policies successfully', async () => {
    await Object.keys(checkPolicies).forEach(async (key) => {
      checkAllPolicies = await set(samplePolicies, `android.${key}`, checkPolicies[key])
      checkAllPolicies = await set(samplePolicies, `ios.${key}`, checkPolicies[key])
    })
    const [resBody, response] = await api.CleanupPolicy.updateCleanupPolicies(token,
      cleanupPolicyId, checkAllPolicies)

    assert.equal(response.statusCode, 200, 'Incorrect status code returned')
    assert.deepEqual(resBody.policy, checkAllPolicies, 'Update cleanup policies unsuccessfully')
  })

  it('should uncheck all cleanup policies successfully', async () => {
    await Object.keys(uncheckPolicies).forEach(async (key) => {
      uncheckAllPolicies = await set(samplePolicies, `android.${key}`, uncheckPolicies[key])
      uncheckAllPolicies = await set(samplePolicies, `ios.${key}`, uncheckPolicies[key])
    })
    const [resBody, response] = await api.CleanupPolicy.updateCleanupPolicies(token,
      cleanupPolicyId, uncheckAllPolicies)

    assert.equal(response.statusCode, 200, 'Incorrect status code returned')
    assert.deepEqual(resBody.policy, uncheckAllPolicies, 'Update cleanup policies unsuccessfully')
  })

  it('should uncheck each Android cleanup policy successfully', async () => {
    Object.keys(uncheckPolicies).forEach(async (key) => {
      uncheckAndroidPolicies = await set(samplePolicies, `android.${key}`, uncheckPolicies[key])
      const [resBody, response] = await api.CleanupPolicy.updateCleanupPolicies(token,
        cleanupPolicyId, uncheckAndroidPolicies)

      assert.equal(response.statusCode, 200, 'Incorrect status code returned')
      assert.deepEqual(resBody.policy, uncheckAndroidPolicies,
        'Update cleanup policies unsuccessfully')
    })
  })

  it('should uncheck each iOS cleanup policy successfully', async () => {
    Object.keys(uncheckPolicies).forEach(async (key) => {
      uncheckiOSPolicies = await set(samplePolicies, `ios.${key}`, uncheckPolicies[key])
      const [resBody, response] = await api.CleanupPolicy.updateCleanupPolicies(token,
        cleanupPolicyId, uncheckiOSPolicies)

      assert.equal(response.statusCode, 200, 'Incorrect status code returned')
      assert.deepEqual(resBody.policy, uncheckiOSPolicies, 'Update cleanup policies unsuccessfully')
    })
  })

})

