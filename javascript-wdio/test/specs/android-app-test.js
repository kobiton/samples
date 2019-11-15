describe('Android App sample', () => {
  
    it('should show the app label', async () => {
      const ele = await browser.$('android.widget.TextView')
      const title = await ele.getText()
      await browser.pause(3000)
      assert.include(title.toLocaleLowerCase(), 'api demos')
      await browser.pause(3000)
    });
  })
  