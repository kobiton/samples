import AuthenticatedPage from './authenticated'

const defaultElements = {
  deviceLabel: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div:nth-child(1)', // eslint-disable-line max-len
  todayTimeLabel: 'div=Today',
  thisWeekTimeLabel: 'div=This week',
  installImage: '(//img)[2]',
  installLabel: 'span*=1. Install the Kobiton Desktop App',
  connectDeviceImage: '(//img)[3]',
  connectDeviceLabel: 'span*=2. Connect devices to your computer',
  activateDeviceImage: '(//img)[4]',
  activateDeviceLabel: 'span*=3. Activate to start leasing devices',
  win32Link: '//a[contains(.,"Win 32")]',
  win64Link: '//a[contains(.,"Win 64")]',
  OSXLink: '//a[contains(.,"OSX")]',
  findOutMoreLink: '//a[contains(.,"Find out more")]',
  kobitonWin32Link: 'body > div:nth-child(4) > div > div > div > div > div > div:nth-child(1)',
  kobitonWin64Link: 'body > div:nth-child(4) > div > div > div > div > div > div:nth-child(2)',
  kobitonOSXLink: 'body > div:nth-child(4) > div > div > div > div > div > div:nth-child(3)'
}

export default class MyDevicesPage extends AuthenticatedPage {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open() {
    super.open('me/devices')
  }
}
