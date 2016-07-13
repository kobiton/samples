import AuthenticatedPage from './authenticated'
import MyDevicesPage from './my-devices'
import SessionsPage from './sessions'

const defaultElements = {
  logoImage: '//img[contains(@src,"svg")]',
  productNameLabel: '//h1[(text()= "Kobiton")]',
  headerPickUpProfileMsg: '//span[(text()= "Please pick your profile!")]',
  developerTesterImage: '(//img)[2]',
  developerTesterTitleLabel: '//div[(text()= "Developer/Tester")]',
  developerTesterMsgLabel: '//span[.//text()[contains(.,"thousands of real devices!")]]',
  deviceOwnerImage: '(//img)[3]',
  deviceOnwerTitleLabel: '//div[(text()= "Device Owner")]',
  deviceOwnderMsgLabel: '//span[.//text()[contains(.,"Connect your device")]]',
  pickProfileButton: '//button'
}

export default class SelectProfilePage extends AuthenticatedPage {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open() {
    super.open('select')
  }

  selectDeviceOwner() {
    this.deviceOwnerImage.click()
    this.pickProfileButton.click()
    this.waitForLoadingProgressDone()
    return new MyDevicesPage()
  }

  selectTester() {
    this.developerTesterImage.click()
    this.pickProfileButton.click()
    this.waitForLoadingProgressDone()
    return new SessionsPage()
  }
}
