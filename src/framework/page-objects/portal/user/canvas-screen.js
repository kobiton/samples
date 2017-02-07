export default class CanvasScreen {
  constructor(specificBrowser = browser, selector) {
    this._browser = specificBrowser
    this._selector = selector
  }

  /**
   * Get next point on a linear through 2 coordinates from,to
   * @param {from} the coordinates on the screen {x, y}
   * @param {to} the coordinates on the screen {x, y}
   * @param {index} the index of the points
   * @param {maxPoint} the maximum number of points on the linear
   */
  getNextPoint(from, to, index, maxPoint) {
    /** linear equation
     * b = toY - fromY
     * a = toX - fromX
     * (y - fromY) = b/a * (x - fromX)
     */
    const a = to.x - from.x
    const b = to.y - from.y
    let x = from.x
    let y = from.y
    if (a === 0) {
      y = from.y + index * b / maxPoint
    }
    else if (b === 0) {
      x = from.x + index * a / maxPoint
    }
    else {
      const t = b / a
      x = from.x + index * a / maxPoint
      y = t * (x - from.x) + from.y
    }

    return {x, y}
  }

  /**
   * Swipe a linear through 2 points by using linear equation
   * @param {from} the coordinates on the screen {x, y}
   * @param {to} the coordinates on the screen {x, y}
   * @param {speed} the time used to swipe an action
   */
  swipe(from, to, speed) {
    const maxPoint = 5
    const timeOut = speed / maxPoint

    this._browser.moveToObject(this._selector, from.x, from.y)
    this._browser.buttonDown()
    for (let i = 0; i <= maxPoint; i++) {
      const nextPoint = this.getNextPoint(from, to, i, maxPoint)
      this._browser.moveToObject(this._selector, nextPoint.x, nextPoint.y)
      this._browser.pause(timeOut)
    }
    this._browser.buttonUp()
  }

  swipeDown() {
    const currentSize = this._browser.getElementSize(this._selector)
    this.swipe({x: currentSize.width / 2, y: 0},
      {x: currentSize.width / 2, y: currentSize.height}, 1000)
  }

  swipeUp() {
    const currentSize = this._browser.getElementSize(this._selector)
    this.swipe({x: currentSize.width / 2, y: currentSize.height},
      {x: currentSize.width / 2, y: 0}, 1000)
  }

  swipeRight() {
    const currentSize = this._browser.getElementSize(this._selector)
    this.swipe({x: 0, y: currentSize.height / 2},
      {x: currentSize.width, y: currentSize.height / 2}, 1000)
  }

  swipeLeft() {
    const currentSize = this._browser.getElementSize(this._selector)
    // Can't touch on the most right of the screen, so the x:width will minus 5 pixels
    this.swipe({x: currentSize.width - 5, y: currentSize.height / 2},
      {x: 0, y: currentSize.height / 2}, 1000)
  }

  swipeCrossRight() {
    const currentSize = this._browser.getElementSize(this._selector)
    this.swipe({x: 0, y: 0},
      {x: currentSize.width, y: currentSize.height}, 1000)
  }

  touch({x = 0, y = 0}) {
    this._size = this._browser.getElementSize(this._selector)
    this._browser.moveToObject(this._selector, x, y)
    this._browser.buttonDown()
    this._browser.buttonPress()
    this._browser.buttonUp()
  }
}
