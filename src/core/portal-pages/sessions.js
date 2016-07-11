import AuthenticatedPage from './authenticated'

const defaultElements = {
  deviceHeader: 'div=Device',
  platformHeader: 'div=Platform',
  timeHeader: 'div=Time',
  durationHeader: 'div=Duration',
  logoText: "//h1[text()='Kobiton']",
  noTestSessionLabel: "//div[text()='You currently have no test session.']",
  sessionRows: '#app div[style="margin-top: 1px;"] > div > div.row',
  sessionFirstRow: '#app div[style="margin-top: 1px;"] > div > div.row:nth-child(2)',
  loadMoreSessionsLbl: 'span=Load more sessions',
  loadMoreSessionsButton: "//span[text()='Load more sessions']/../..",
  sessionsLink: "//span[text()='Sessions']",
  cloudDevicesLink: "//span[text()='Cloud Devices']",
  automationSettingLnk: "//span[text()='Automation Settings']"

}

export default class SessionsPage extends AuthenticatedPage {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open() {
    super.open('me/sessions')
  }

  get sessionRows() {
    return browser.elements(defaultElements.sessionRows)
  }
}
