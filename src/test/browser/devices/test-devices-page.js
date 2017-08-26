import {assert} from 'chai'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import config from '../../../framework/config/test'

const {username1: username, password1: password} = {...config}

describe('Verifying on the devices page', () => {
  let devicesPage

  before(() => {
    const loginPage = new LoginPage()
    loginPage.windowHandleMaximize()
    loginPage.open()
    devicesPage = loginPage.login({username, password})
  })

  it('should verify url of devices page', () => {
    const urlPage = devicesPage.getUrlPage()
    assert.equal(urlPage, config.portalUrl.concat('/devices'),
    `The current url is ${urlPage} - the expected url is ${config.portalUrl.concat('/devices')}`)
  })

})
