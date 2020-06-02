const {
    VisualGridRunner,
    Eyes,
    Configuration,
    DeviceName,
    ScreenOrientation,
    Target
} = require('@applitools/eyes-webdriverio');
  
describe('WebdriverIO', () => {
    it('should run scripts in kobiton and send results of mobile simulators to applitools server', async () => {
        const runner = new VisualGridRunner(1)
        const eyes = new Eyes(runner);

        const configuration = new Configuration();
        configuration.setApiKey('APPLITOOLS_API_KEY') // You can get your api key from the Applitools dashboard
        //Add mobile emulation devices with Portrait mode
        configuration.addDeviceEmulation(DeviceName.iPhone_4, ScreenOrientation.PORTRAIT);
        configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
        configuration.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
        
        eyes.setConfiguration(configuration);
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
  