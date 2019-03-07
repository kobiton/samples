describe('Protractor Demo iOS Web Testing With Kobiton', function() {
  const firstNumber = element(by.model('first'))
  const secondNumber = element(by.model('second'))
  const goButton = element(by.id('gobutton'))
  const latestResult = element(by.binding('latest'))

  beforeAll(function() {
    browser.waitForAngularEnabled(false);
    browser.get('http://juliemr.github.io/protractor-demo/', 200000);
  })

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Super Calculator');
  })

  it('should add two and one', function() {
    firstNumber.sendKeys(2)
    secondNumber.sendKeys(1)
    goButton.click()
    expect(latestResult.getText()).toEqual('3')
  })

  it('should read the value from an input', function() {
    firstNumber.sendKeys(3)
    expect(firstNumber.getAttribute('value')).toEqual('3')
  })
})
