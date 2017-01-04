import * as util from '../framework/util'

export default class Data {
  generateUser() {
    const username = util.generateUsername()
    const password = util.getDummyPassword()
    return {
      fullname: util.generateFullname(),
      username,
      password,
      email: util.generateEmail(username)
    }
  }
}
