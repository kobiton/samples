import Page from './page'
import MyDevicesPage from './my-devices'
import SessionsPage from './sessions'

const defaultElements = {
  logoImg: '#app  div  div  div:nth-child(3)  div  div:nth-child(1)  div:nth-child(1)  img',
  productNameLbl: '#app  div  div  div:nth-child(3)  div  div:nth-child(1)  div:nth-child(1)  h1',//eslint-disable-line
  headerPickUpProfileMsg: '#app > div > div > div:nth-child(3) > div > div:nth-child(1) > div:nth-child(2) > div > span', //eslint-disable-line
  developerTesterImg: '#app  div  div  div:nth-child(3)  div  div  div:nth-child(1)  div:nth-child(1)  img',//eslint-disable-line
  developerTesterTitleLbl: '#app  div  div  div:nth-child(3)  div  div div:nth-child(1)  div:nth-child(2)  div:nth-child(1)', //eslint-disable-line
  developerTesterMsgLbl: '#app  div  div  div:nth-child(3)  div  div  div:nth-child(1)  div:nth-child(2)  div:nth-child(2)  span', //eslint-disable-line
  deviceOwnerImg: '#app  div  div  div:nth-child(3)  div  div  div:nth-child(2)  div:nth-child(1)  img',//eslint-disable-line
  deviceOnwerTitleLbl: '#app  div  div  div:nth-child(3)  div  div  div:nth-child(2)  div:nth-child(2)  div:nth-child(1)',//eslint-disable-line
  deviceOwnderMsgLbl: '#app  div  div  div:nth-child(3)  div  div  div:nth-child(2)  div:nth-child(2)  div:nth-child(2)  span',//eslint-disable-line
  pickProfileBtn: '#app > div > div > div:nth-child(3) > div > div:nth-child(3) > button'
}

export default class SelectProfilePage extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open() {
    super.open('select')
  }
  
  selectDeviceOwner() {
    this.deviceOwnerImg.click()
    this.pickProfileBtn.click()
    this.loadingHidden.isExisting()
    return new MyDevicesPage()
  }

  selectTester() {
    this.developerTesterImg.click()
    this.pickProfileBtn.click()
    this.loadingHidden.isExisting()
    return new SessionsPage()
  }
}
