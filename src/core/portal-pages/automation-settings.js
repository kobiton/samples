import AuthenticatedPage from './authenticated'

const defaultElements = {
  titleHeader: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(1) > div', //eslint-disable-line max-len
  regenerateApiKeyLabel: 'span=Regenerate API Key',
  regeneerateApiKeyButton: 'button=Regenerate API Key',
  apiKeyHeader: 'h3=API key',
  apiKeyParagraph: '//*[@id="app"]/div/div/div[2]/div[2]/div/div/div/div[2]/p',
  apiKeyText: '//*[@id="app"]/div/div/div[2]/div[2]/div/div/div/div[2]/div[1]/div[2]', // eslint-disable-line max-len
  apiKeyCopyButton: '//*[@id="app"]/div/div/div[2]/div[2]/div/div/div/div[2]/div[1]/div[3]',
  serverHeader: 'h3=Server configuration',
  serverParagraph: '//*[@id="app"]/div/div/div[2]/div[2]/div/div/div/div[3]/p',
  serverUrlText: '//*[@id="app"]/div/div/div[2]/div[2]/div/div/div/div[3]/div/div[2]', // eslint-disable-line max-len
  serverUrlCopyButton: '//*[@id="app"]/div/div/div[2]/div[2]/div/div/div/div[3]/div/div[3]',
  languageSelectButton: '//*[@id="app"]/div/div/div[2]/div[2]/div/div/div/div[4]/div/div[1]/div[1]/div[1]/div[1]', // eslint-disable-line max-len
  languageText: '//h3[contains(.,"Device configurations")]/../div/div/div/div[position()=1]/div/div[position()=2]', // eslint-disable-line max-len
  platFormSelectButton: '#app  div  div  div:nth-child(3)  div:nth-child(2)  div  div  div:nth-child(4)  div  div:nth-child(1)  div:nth-child(1)  div:nth-child(2)  div:nth-child(1)  svg', //eslint-disable-line
  androidPlatformOption: 'div=Android',
  kOSPlatformOption: 'div=iOS',
  platFormText: '//h3[contains(.,"Device configurations")]/../div/div/div/div[position()=2]/div/div[position()=2]', // eslint-disable-line max-len
  deviceHeader: 'h3=Device configurations', //eslint-disable-line
  deviceSelectButton: '#app  div  div  div:nth-child(3)  div:nth-child(2)  div  div  div:nth-child(4)  div  div:nth-child(1)  div:nth-child(1)  div:nth-child(3)  div:nth-child(1)  svg', //eslint-disable-line
  deviceText: '//h3[contains(.,"Device configurations")]/../div/div/div/div[position()=3]/div/div[position()=2]', // eslint-disable-line max-len
  platformVersionSelectButton: '#app  div  div  div:nth-child(3)  div:nth-child(2)  div  div  div:nth-child(4)  div  div:nth-child(1)  div:nth-child(1)  div:nth-child(4)  div:nth-child(1)  svg', //eslint-disable-line
  platformVersionText: '//h3[contains(.,"Device configurations")]/../div/div/div/div[position()=4]/div/div[position()=2]', // eslint-disable-line max-len
  orientationSelectButton: '#app  div  div  div:nth-child(3)  div:nth-child(2)  div  div  div:nth-child(4)  div  div:nth-child(1)  div:nth-child(1)  div:nth-child(5)  div:nth-child(1)  svg', //eslint-disable-line
  orientationText: '//h3[contains(.,"Device configurations")]/../div/div/div/div[position()=5]/div/div[position()=2]', // eslint-disable-line max-len
  browserSelectButton: '#app  div  div  div:nth-child(3)  div:nth-child(2)  div  div  div:nth-child(4)  div  div:nth-child(1)  div:nth-child(1)  div:nth-child(6)  div:nth-child(1)  svg', //eslint-disable-line
  browserText: '//h3[contains(.,"Device configurations")]/../div/div/div/div[position()=6]/div/div[position()=2]', // eslint-disable-line max-len
  deviceConfigurationCopyButton: '//*[@id="app"]/div/div/div[2]/div[2]/div/div/div/div[4]/div/div[1]/div[2]', // eslint-disable-line max-len
  deviceConfigurationText: 'div pre'
}

export default class AutomationSettingsPage extends AuthenticatedPage {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open() {
    super.open('scripting')
  }

  selectLanguageOption(language) {
    const langOpt = `//body/div[2]/descendant::div/div/span/div/div/div[contains(.,"${language}")]`
    this.languageSelectButton.click()
    browser.waitForVisible(langOpt)
    browser.click(langOpt)
  }

  selectPlatformOption(platform) {
    const platfOpt = `//body/div[2]/descendant::div/div/span/div/div/div[contains(.,"${platform}")]`
    this.platformSelectButton.click()
    browser.click(platfOpt)
  }
}
