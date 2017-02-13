const elements = {
  url: 'https://portal-test.kobiton.com/login',
  emailOrUsernameTextInput: 'input[name="emailOrUsername"]'
}

export default class WdioKobitonPageTest {
  constructor(browser, timeout) {
    this._browser = browser
    this._timeout = timeout
  }

  async execute() {
    await this._browser
    .init()
    .url(elements.url)
    .waitForExist(elements.emailOrUsernameTextInput, this._timeout)
    .setValue(elements.emailOrUsernameTextInput, 'Test')
    .end()
  }
}
