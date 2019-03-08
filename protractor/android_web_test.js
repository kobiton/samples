describe('Protractor Demo Android Web Testing With Kobiton', function() {
  const todoList = element.all(by.repeater('todo in todoList.todos'))
  const todoText = element(by.model('todoList.todoText'))
  const addButton = element(by.css('[value="add"]'))
  const completedAmount = element.all(by.css('.done-true'))

  it('should add a todo', function() {
    browser.get('https://angularjs.org')
    todoText.sendKeys('write first protractor test')
    addButton.click()
    expect(todoList.count()).toEqual(3)
  })

  it('should display a new ticket in todo list', function(){
    expect(todoList.get(2).getText()).toEqual('write first protractor test')
  })

  it('should check completed ticket', function(){
    todoList.get(2).element(by.css('input')).click()
    expect(completedAmount.count()).toEqual(2)
  })
})
