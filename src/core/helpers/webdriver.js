import gm from 'gm'
import fs from 'fs'

export function captureElement(selector, outputImagePath) {

  const tempImagePath = './~wd~' + Date.now() + '.png'
  const size = browser.getElementSize(selector)
  const location = browser.getLocation(selector)
  browser.saveScreenshot(tempImagePath)
  gm(tempImagePath)
    .strip()
    .crop(size.width, size.height, location.x, location.y)
    .write(outputImagePath, (error) => {
      fs.unlink(tempImagePath)
      if (error) {
        throw error
      }
    })
}
