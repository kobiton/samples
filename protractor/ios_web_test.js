describe('Protractor Demo iOS Web Testing With Kobiton', function() {
  const todoList = element.all(by.repeater('todo in todoList.todos'))
  const todoText = element(by.model('todoList.todoText'))
  const addButton = element(by.css('[value="add"]'))
  const completedAmount = element.all(by.css('.done-true'))

  beforeAll(function() {
    browser.waitForAngularEnabled(false)
    browser.get('https://angularjs.org', 20000)
  })

  it('should add a todo', function() {
    browser.get('https://angularjs.org')
    todoText.sendKeys('new ticket')
    addButton.click()
    expect(todoList.count()).toEqual(3)
  })

  it('should display a new ticket in todo list', function() {
    expect(todoList.get(2).getText()).toEqual('new ticket')
  })

  it('should check completed ticket', function() {
    todoList.get(2).element(by.css('input')).click()
    expect(completedAmount.count()).toEqual(2)
  })
})
