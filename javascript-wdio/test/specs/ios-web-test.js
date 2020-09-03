describe('iOS Web sample', () => {
  it('should return the title that contains Kobiton', async () => {
    const sessionInfo = await browser.getSession()
    console.log('kobitonSessionId', sessionInfo.kobitonSessionId)
    
    await browser.url('https://google.com')
    await browser.pause(3000)
    const input = await $('//*[@name="q"]')
    await input.setValue('Kobiton')
    await browser.pause(3000)
    const searchBtn = await browser.$('//button[@aria-label="Google Search"]')
    await searchBtn.click()
    await browser.pause(3000)
    const title = await browser.getTitle()
    assert.include(title, 'Kobiton')
  })
})
