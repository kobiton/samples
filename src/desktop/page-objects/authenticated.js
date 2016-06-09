import Page from './page'

const defaultElements = {
  profileBtn: '//*[@id="app"]/div/div[1]/div/div[2]/div[1]/div[2]/div/div[2]/button',
  logoutBtn: '/html/body/div[2]/div/div/div/div/div/div[2]/span/div/div/div'
}

export default class AuthenticatedPage extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  async logout() {
    await this.client
      .waitForExist(this.elements.profileBtn)
      .click(this.elements.profileBtn)
      .click(this.elements.logoutBtn)
  }
}
