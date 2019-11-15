describe('iOS App sample', () => {
  
  it('should get text UIKitCatalog', async () => {
    const ele = await browser.$('//UIAStaticText')
    const title = await ele.getText()
    await browser.pause(3000)
    assert.include(title.toLocaleLowerCase(), 'uikitcatalog')
    await browser.pause(3000)
  })
})
