import Base from './_base'

const subUrl = {
  login: 'users/login',
  register: 'users',
  subscription: 'users/me/subscription'
}

class User extends Base {

  async login(username, password) {
    const [userInfo] = await this.post({
      path: subUrl.login,
      body: {
        emailOrUsername: username,
        password
      }
    })

    return userInfo
  }

  async registerAccount({fullname, username, password, email}) {
    const [userInfo] = await this.post({
      path: subUrl.register,
      body: {
        name: fullname,
        username,
        password,
        email
      }
    })

    return userInfo
  }

  async getSubscription() {
    const [subscription] = await this.get({
      path: subUrl.subscription
    })
    return subscription
  }

}

export default new User()
