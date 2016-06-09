import Page from './page'

const defaultElements = {
  deviceLbl: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div:nth-child(1)', //eslint-disable-line
  todayTimeLbl: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div:nth-child(2)', //eslint-disable-line
  thisWeekTimeLbl: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div:nth-child(3)', //eslint-disable-line
  installImg: '#app div:nth-child(1) > div:nth-child(1) > img',
  installLbl: 'span*=1. Install the Kobiton Desktop App',
  connectDeviceImg: '#app div:nth-child(2) > div:nth-child(1) > img',
  connectDeviceLbl: 'span*=2. Connect devices to your computer',
  activateDeviceImg: '#app div:nth-child(3) > div:nth-child(1) > img',
  activateDeviceLbl: 'span*=3. Activate to start leasing devices',
  win32Lnk: '#app div:nth-child(1) > div:nth-child(2) > span > div > a:nth-child(1)',
  win64Lnk: '#app div:nth-child(1) > div:nth-child(2) > span > div > a:nth-child(2)',
  OSXLnk: '#app div:nth-child(1) > div:nth-child(2) > span > div > a:nth-child(3)',
  findOutMoreLnk: '#app div:nth-child(3) > div:nth-child(2) > span > div > a',
  kobiton32Lnk: 'body > div:nth-child(4) > div > div > div > div > div > div:nth-child(1)',
  kobiton64Lnk: 'body > div:nth-child(4) > div > div > div > div > div > div:nth-child(2)',
  kobitonOSXLnk: 'body > div:nth-child(4) > div > div > div > div > div > div:nth-child(3)'
}

export default class MyDevicesPage extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open() {
    super.open('me/devices')
  }
}
