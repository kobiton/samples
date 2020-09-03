describe('iOS App sample', () => {
  it('should get text UIKitCatalog', async () => {
	const sessionInfo = await browser.getSession()
    console.log('kobitonSessionId', sessionInfo.kobitonSessionId)

    const ele = await browser.$('//UIAStaticText')
    const title = await ele.getText()
    await browser.pause(3000)
    assert.include(title.toLocaleLowerCase(), 'uikitcatalog')
  })
})
