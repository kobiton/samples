import { Eyes, Configuration, Target } from '@applitools/eyes-webdriverio'

describe('WebdriverIO', () => {
  it('should run scripts in Kobiton and send results to Applitools server', async () => {
    const eyes = new Eyes()

    const configuration = new Configuration()
    configuration.setApiKey('APPLITOOLS_API_KEY') // You can get your api key from the Applitools dashboard
    eyes.setConfiguration(configuration)
    await eyes.open(browser, 'Android Web', 'Sample Test')

    await browser.url('https://google.com')
    const input = await $('//*[@name="q"]')
    input.waitForDisplayed()

    await eyes.check('Google Home', Target.window())

    await input.setValue('Kobiton')
    await eyes.check('Drop down list', Target.window())

    await eyes.close()
  })
})
