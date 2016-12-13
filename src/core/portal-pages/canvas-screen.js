export default class CanvasScreen {
  constructor(selector) {
    this._selector = selector
  }

  swipe(fromX, fromY, toX, toY, speed) {
    /** Calculate a,b in linear equation
     * b = toY - fromY
     * a = toX - fromX
     * (y - fromY) = b/a * (x - fromX)
     */
    const a = toX - fromX
    const b = toY - fromY
    let xPos = fromX
    let yPos = fromY
    const timeOut = speed / 5

    browser.moveToObject(this._selector, fromX, fromY)
    browser.buttonDown()
    for (let i = 0; i <= 5; i++) {
      if (a === 0) {
        yPos = fromY + i * b / 5
      }
      else if (b === 0) {
        xPos = fromX + i * a / 5
      }
      else {
        const t = b / a
        xPos = fromX + i * a / 5
        yPos = t * (xPos - fromX) + fromY
      }
      browser.moveToObject(this._selector, xPos, yPos)
      browser.pause(timeOut)
    }
    browser.buttonUp()
  }

  swipeDown() {
    const currentSize = browser.getElementSize(this._selector)
    this.swipe(currentSize.width / 2, 0, currentSize.width / 2, currentSize.height, 1000)
  }

  swipeUp() {
    const currentSize = browser.getElementSize(this._selector)
    this.swipe(currentSize.width / 2, currentSize.height, currentSize.width / 2, 0, 1000)
  }

  swipeRight() {
    const currentSize = browser.getElementSize(this._selector)
    this.swipe(0, currentSize.height / 2, currentSize.width, currentSize.height / 2, 1000)
  }

  swipeLeft() {
    const currentSize = browser.getElementSize(this._selector)
    this.swipe(currentSize.width, currentSize.height / 2, 0, currentSize.height / 2, 1000)
  }

  swipeCrossRight() {
    const currentSize = browser.getElementSize(this._selector)
    this.swipe(0, 0, currentSize.width, currentSize.height, 1000)
  }

  touch({x = 0, y = 0}) {
    this._size = browser.getElementSize(this._selector)
    browser.moveToObject(this._selector, x, y)
    browser.buttonDown()
    browser.buttonPress()
    browser.buttonUp()
  }
}
