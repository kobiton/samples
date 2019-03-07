describe('Protractor Demo Android Web Testing With Kobiton', function() {
  const firstNumber = element(by.model('first'))
  const secondNumber = element(by.model('second'))
  const goButton = element(by.id('gobutton'))
  const latestResult = element(by.binding('latest'))

  beforeAll(function() {
    browser.get('http://juliemr.github.io/protractor-demo/', 300000)
  })
  
  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Super Calculator')
  })

  it('should add one and two', function() {
    firstNumber.sendKeys(1)
    secondNumber.sendKeys(2)
    goButton.click()
    expect(latestResult.getText()).toEqual('3')
  })

  it('should read the value from an input', function() {
    firstNumber.sendKeys(1)
    expect(firstNumber.getAttribute('value')).toEqual('1')
  })
})
