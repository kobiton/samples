import Page from './page'

const defaultElements = {
  profileButton: '(//button)[3]',
  logoutButton: '/html/body/div[2]/div/div/div/div/div/div[2]/span/div/div/div'
}

export default class AuthenticatedPage extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  async logout() {
    await this.client
      .waitForExist(this.elements.profileButton)
      .click(this.elements.profileButton)
      .click(this.elements.logoutButton)
  }
}
