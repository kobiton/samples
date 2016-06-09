import AuthenticatedPage from './authenticated'

const defaultElements = {
  deviceHeader: 'div=Device',
  platformHeader: 'div=Platform',
  timeHeader: 'div=Time',
  durationHeader: 'div=Duration',
  noTestSessionLbl: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > div > div.rmq-15e5f91f', //eslint-disable-line
  sessionRows: '#app div[style="margin-top: 1px;"] > div > div.row',
  sessionFirstRow: '#app div[style="margin-top: 1px;"] > div > div.row:nth-child(2)',
  loadMoreSessionsLbl: 'span=Load more sessions',
  loadMoreSessionsBtn: '//*[@id="app"]/div/div/div[2]/div[2]/div/div/div/div/div/button'//eslint-disable-line

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
