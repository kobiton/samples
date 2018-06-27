import Base from './_base'

const subUrl = {
  register: 'users',
  subscription: 'users/me/subscription'
}

class User extends Base {

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
