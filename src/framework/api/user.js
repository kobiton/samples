import Base from './_base'

const subUrl = {
  login: 'users/login',
  register: 'users'
}

class User extends Base {

  async login() {
    const username = this.getUsername()
    const password = this.getPassword()

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
}

export default new User()
