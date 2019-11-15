describe('WebdriverIO', () => {
  it('should return the title that contains Kobiton', async () => {
    await browser.url('https://google.com')
    await browser.pause(3000)
    const input = await $('//*[@name="q"]')
    await input.setValue('Kobiton')
    await browser.pause(3000)
    await driver.pressKeyCode(66)
    await browser.pause(3000);
    const title = await browser.getTitle()
    assert.include(title, 'Kobiton')
    await browser.pause(3000)
  })
})
