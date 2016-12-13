import {cropImage} from './image'

export async function captureElement(selector, imagePath) {
  const tempImagePath = `./~wd~${Date.now()}.png`
  const size = await browser.getElementSize(selector)
  const location = await browser.getLocation(selector)
  await browser.saveScreenshot(tempImagePath)
  // Crop an image of selector only
  await cropImage({
    tempImagePath,
    outputImagePath: imagePath,
    width: size.width,
    height: size.height,
    x: location.x,
    y: location.y})
}
