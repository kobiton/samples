import config from '../../../framework/config/test'
import LoginPage from '../../../framework/page-objects/desktop/intro/login'

const {username1: username, password1: password} = {...config}

describe('Users / Login', () => {
  let loginPage

  before(async () => {
    loginPage = new LoginPage()
    await loginPage.startApplication()
    await loginPage.login({username, password})
    
  })

  after(async () => {
    await loginPage.stopApplication()
  })

  it('should activate a first found device', async () => {
    
  })

  it('should deactivate a first found device', async() => {
    
  })

})
