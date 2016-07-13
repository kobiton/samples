import AuthenticatedPage from './authenticated'

const defaultElements = {
  javaSdkLabel: '//label[contains(.,"Java SDK")]',
  javaSdkTextInput: '(//input)[1]',
  androidSdkLabel: '//label[contains(.,"Android SDK")]',
  androidSdkTextInput: '(//input)[2]',
  nodeJsSdkLabel: '//label[contains(.,"NodeJS")]',
  nodejsTextInput: '(//input)[3]',
  clickhereButton: '//button[contains(., "Click here")]',
  cancelButton: '//button[contains(., "Cancel")]',
  retryButton: '//button[contains(., "Retry")]',
  licenseAgreementLink: '//a[contains(.,"license agreement")]',
  errorTextLabel: '(//div[contains(.,"Please enter")])[10]',
  acceptLicenseLabel: '//*[contains(text(),"to accept")]'
}

export default class SettingPage extends AuthenticatedPage {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }
}
